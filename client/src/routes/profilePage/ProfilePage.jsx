import { useContext } from 'react'
import Chat from '../../components/chat/Chat'
import List from '../../components/list/List'
import './profilePage.scss'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'

function ProfilePage(){

  const {upadateUser, currentUser}=useContext(AuthContext)
  const navigate = useNavigate()


 const handleLogout=async()=>{ 
  try {
   await apiRequest.post('/auth/logout')
    upadateUser(null)
  } catch (error) {
    console.log(error)
  }}
  return (

    <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <Link to="profile/update">
              <button>Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <span>Avatar:<img src={currentUser.avatar || "/noavatar.jpg"} alt="" /></span>
              <span>Username: <b> {currentUser.username} </b></span>
              <span>Email:<b>{currentUser.email} </b></span>
            </div>
            <div className="title">
              <h1>My List</h1>
              <button>Create New Post</button>
            </div>
            <List/>
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List/>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
            <Chat />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage