import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext.jsx";

function HomePage() {


  const {currentUser}=useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!

          </p>
         
          <div className="search">
          <SearchBar />
          

          </div>
          <div className="boxes">
            <div className="box">
              <h1>10+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Happy Customers</h2>
            </div>
            <div className="box">
              <h1>1400+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
         
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.webp" alt="backgrond" loading="lazy" />
      </div>
    </div>
  );
}

export default HomePage;