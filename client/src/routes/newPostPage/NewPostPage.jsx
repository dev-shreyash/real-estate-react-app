import { useContext, useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function NewPostPage() {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
   // const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [type, setType] = useState('rent'); // default to 'rent'
    const [property, setProperty] = useState('apartment'); // default to 'apartment'
    const [utilities, setUtilities] = useState('owner'); // default setting
    const [petPolicy, setPetPolicy] = useState('allowed');
    const [income, setIncome] = useState('');
    const [size, setSize] = useState('');
    const [school, setSchool] = useState('');
    const [bus, setBus] = useState('');
    const [restaurant, setRestaurant] = useState('');
    
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const inputs = Object.fromEntries(formData);
     // console.log(inputs);
  
      // Validate form inputs
      if (Object.values(inputs).some(input => input === "")) {
        console.error("Please fill all fields");
        setError('Please fill all fields');
        return; // Prevent further execution
      }
  
      try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      console.log(res)
      console.log(res.data)
      console.log(res.data.data.newPost.id)
     
      navigate("/"+res.data.data.newPost.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
    <div className="formContainer">
      <h1>Add New Post</h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {/* Each field is set up as a controlled component */}
          <div className="item">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />          
          </div>
          <div className="item">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
          <div className="item">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom Number</label>
            <input
              min={1}
              id="bedroom"
              name="bedroom"
              type="number"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="bathroom">Bathroom Number</label>
            <input
              min={1}
              id="bathroom"
              name="bathroom"
              type="number"
              value={bathrooms}
              onChange={e => setBathrooms(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              name="latitude"
              type="text"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              name="longitude"
              type="text"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select
              name="property"
              value={property}
              onChange={e => setProperty(e.target.value)}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="utilities">Utilities Policy</label>
            <select
              name="utilities"
              value={utilities}
              onChange={e => setUtilities(e.target.value)}
            >
              <option value="owner">Owner is responsible</option>
              <option value="tenant">Tenant is responsible</option>
              <option value="shared">Shared</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="pet">Pet Policy</label>
            <select
              name="pet"
              value={petPolicy}
              onChange={e => setPetPolicy(e.target.value)}
            >
              <option value="allowed">Allowed</option>
              <option value="not-allowed">Not Allowed</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="income">Income Policy</label>
            <input
              id="income"
              name="income"
              type="text"
              value={income}
              onChange={e => setIncome(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="size">Total Size (sqft)</label>
            <input
              min={0}
              id="size"
              name="size"
              type="number"
              value={size}
              onChange={e => setSize(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="school">School</label>
            <input
              min={0}
              id="school"
              name="school"
              type="number"
              value={school}
              onChange={e => setSchool(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="bus">Bus</label>
            <input
              min={0}
              id="bus"
              name="bus"
              type="number"
              value={bus}
              onChange={e => setBus(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="restaurant">Restaurant</label>
            <input
              min={0}
              id="restaurant"
              name="restaurant"
              type="number"
              value={restaurant}
              onChange={e => setRestaurant(e.target.value)}
            />
          </div>
          <button className="sendButton">Add</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName:"shreyash-cloudinary",
            uploadPreset:"estate",
            maxImageFileSize:20000000,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;