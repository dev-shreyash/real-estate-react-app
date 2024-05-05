import { Suspense, useContext } from 'react'
import Chat from '../../components/chat/Chat'
import List from '../../components/list/List'
import './profilePage.scss'
import { AuthContext } from '../../context/AuthContext'
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'

function ProfilePage() {
  const data=useLoaderData()
  const { updateUser, currentUser } = useContext(AuthContext)
  console.log(currentUser)
  const navigate = useNavigate()
  

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout')
      localStorage.removeItem("user");
      updateUser({})
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.data?.user?.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.data?.user?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.data?.user?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
              // console.log(postResponse.data.data.userPosts)
                 <List posts={postResponse.data.data.userPosts}/>
              }
            </Await>
          </Suspense>
         
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
             // console.log(postResponse)
                  <List posts={postResponse.data.data.savedPost}/>
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
            {(chatResponse) => <Chat chats={chatResponse.data}/>}

              
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
