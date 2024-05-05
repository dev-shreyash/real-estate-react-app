import { useContext, useEffect, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';

function Chat({ chats }) {
    const { currentUser } = useContext(AuthContext);
    const [chat, setChat] = useState(null);
    const chatItems = Array.isArray(chats.data) ? chats.data : [];

    useEffect(() => {
        console.log("Updated chat state:", chat);
    }, [chat]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest('/chats/' + id);
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


    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                {chatItems.length > 0 ? chatItems.map((c) => (
                    <div
                        className="message"
                        key={c.id}
                        style={{
                            backgroundColor: c.seenBy.includes(currentUser.data.user.id) ? "white" : "lightgray"
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
                        {chat.data.messages && chat.data.messages.map((message) => (
                            <div className="chatMessage own" key={message.id}>
                                <p>{message.text}</p>
                                <span>{format(new Date(message.createdAt))}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bottom">
                        {/* Components to send new messages could go here */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
