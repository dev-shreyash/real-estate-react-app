import { useContext, useState } from 'react';
import './profileUpdatepPage.scss'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget.jsx';
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(currentUser.data?.user?.id)

    const [avatar, setAvatar] = useState([]);
    console.log(avatar[0])
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/users/${currentUser.data?.user?.id}`, { username, email, password,avatar:avatar[0]});
            updateUser(res.data);
            navigate('/profile');
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };

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
                            defaultValue={currentUser.data?.user?.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.data?.user?.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
            <img src={avatar[0] ||currentUser.data?.user?.avatar || "/noavatar.jpg"} alt="" className="avatar" />
                <UploadWidget
                uwConfig={{
                    cloudName:"shreyash-cloudinary",
                    uploadPreset:"estate",
                    multiple:false,
                    maxImageFileSize:2000000,
                    folder:"avtars"
                }} setState={setAvatar}
                 />
                <p>Click on update to change avatar</p>
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
