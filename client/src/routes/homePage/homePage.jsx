import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'
function HomePage(){
  return (
    <div className='homePage'>
        <div className="textContainer">
            <div className="wrapper">
                <h1 className="title">
                    Search and find your dream house in Thane
                </h1>
                <p>
                    Lorem ipsum dolor, 
                    sit amet consectetur adipisicing
                     elit. A eligendi perspiciatis
                      laboriosam possimus mollitia doloribus enim 
                      necessitatibus quae officiis, eveniet modi eos nostrum est nesciunt
                       dolorem doloremque culpa omnis placeat?
                </p>
            </div>
           <SearchBar/>
           <div className="boxes">
            <div className="box">
                <h1>10+</h1>
                <h2>Years of Experience</h2>
            </div>
            <div className="box">
                <h1>100+</h1>
                <h2>Happy Customers</h2>
            </div>
            <div className="box">
                <h1>1400+</h1>
                <h2>Ready Properties</h2>
            </div>
           </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
    
  )
}

export default HomePage