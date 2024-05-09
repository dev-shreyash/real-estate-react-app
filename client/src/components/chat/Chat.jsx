import { useContext, useEffect, useRef, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';

function Chat({ chats }) {
    const { currentUser } = useContext(AuthContext);
    const [chat, setChat] = useState(null);
    const chatItems = Array.isArray(chats.data) ? chats.data : [];
    const {socket} = useContext(SocketContext)
    const [, forceUpdate] = useState(0)

    const scrollRef =useRef()

    const decrease= useNotificationStore((state)=>state.decrease)

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[chat])

    useEffect(() => {
        console.log("Updated chat state:", chat);
    }, [chat]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest('/chats/' + id);
            console.log(res)
            if(!res.data.data.seenBy.includes(currentUser.data.user.id)){
                decrease()
            }
            console.log("Chat data received from API:", res.data);
            if (res.data) {
                setChat({ ...res.data, receiver });
                console.log("Setting chat state...");
            } else {
                console.log("API returned no data or null");
            }
        } catch (error) {
            console.error("Error fetching chat details:", error);
            setChat(null);  // Reset chat state on error
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const text = formData.get("text")
            if (!text) return
            const res = await apiRequest.post("/messages/" + chat.data.id, { text })
            
            if (res.data) {
                
                setChat(prev => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        messages: [...prev.data.messages, res.data]
                    }
                }));
            }
            socket.emit('sendMessage',{
                receiverId:chat.receiver.id,
                data:res.data,
            })
        } catch (error) {
            console.log("Error when sending message:", error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleSubmit(formData);
        e.target.reset();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const formData = new FormData(e.target.form); // Accessing the form via the input's form property
            handleSubmit(formData);
            e.target.form.reset();
        }
    };


    useEffect(()=>{

        const read=async()=>{
            try {
              await apiRequest.put('/chats/read/'+chat.data.id)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat && socket) {
            socket.on("getMessage", (data) => {
              if (chat.data.id === data.chatId) {
                setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
                read();
              }
            });
          }
          return () => {
            socket.off("getMessage");
          };
    },[socket, chat])

    return (
        <div className='chat'>
            <button >
                test Mod
            </button>
            <div className="messages">
                <h1>Messages</h1>
                {chatItems.length > 0 ? chatItems.map((c) => (
                    <div
                        className="message"
                        key={c.id}
                        style={{
                            backgroundColor: c.seenBy.includes(currentUser.data.user.id) || chat?.data?.id ? "white" : "lightgray"
                        }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img src={c.receiver?.avatar || "/noavatar.jpg"} alt={c.receiver?.username || 'Default Username'} />
                        <span>{c.receiver?.username}</span>
                        <p>{c.lastMessage}</p>
                    </div>
                )) : <p>No chats available.</p>}
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={chat.receiver.avatar || "/noavatar.jpg"} alt={chat.receiver.username || "Default Username"} />
                            <span>{chat.receiver.username}</span>
                        </div>
                        <span className="close" onClick={() => setChat(null)}>X</span>
                    </div>
                    <div className="center">
                        {chat.data.messages.map((message) => (
                            <div className="chatMessage"
                                style={{
                                    alignSelf: message.userId === currentUser.data.user.id ? "flex-end" : "flex-start",
                                    textAlign: message.userId === currentUser.data.user.id ? "right" : "left",
                                    backgroundColor: message.userId === currentUser.data.user.id ? "#5452" : "#5eddd26b",
                                    borderRadius:message.userId === currentUser.data.user.id ? "20px 20px 2px 20px" : "2px 20px 20px 20px"
                                }}
                                key={message.id}>
                                <p>{message.text}</p>
                                <span>{format(new Date(message.createdAt))}</span>
                            </div>
                        ))}
                        <div ref={scrollRef}></div>
                    </div>
                    <form onSubmit={handleFormSubmit} className="bottom">
                        <input
                            type="text"
                            name="text"
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                        />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;