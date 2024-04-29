import { useContext, useState } from 'react';
import './profileUpdatepPage.scss'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const { avatar, setAvatar } = useState([])
    const { error, setError } = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
    }
    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                    {error && <span>error</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
                <UploadWidget
                />
            </div>
        </div>
    );
}

export default ProfileUpdatePage