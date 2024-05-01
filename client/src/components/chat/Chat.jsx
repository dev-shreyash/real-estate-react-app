import { useContext, useState } from 'react'
import './chat.scss'
import { AuthContext } from '../../context/AuthContext'

function Chat() {
    const {currentUser}=useContext(AuthContext)

    const [chat, setChat]=useState(true)
    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                <img src="" alt="" />
                <span>User name</span>
                <p>
                    Lorem ipsum dolor sit.... 
                     </p>
            </div>
            {chat &&<div className="chatBox">
                <div className="top">
                    <div className="user">
                     <img src={currentUser.data?.user?.avatar || "/noavatar.jpg"} alt="" />
                        <span>user name</span>
                    </div>
                    <span className="close" onClick={()=>setChat(null)}>x</span>
                </div>
                <div className="center">
                    <div className="chatMessage own">
                        <p>random messasge</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>random messasge</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="bottom">
                    <textarea name="chats" id="chatText" placeholder='Type Message' cols="30" rows="1"></textarea>
                    <button>Send</button>
                </div>
            </div>}
        </div>
    )
}

export default Chat