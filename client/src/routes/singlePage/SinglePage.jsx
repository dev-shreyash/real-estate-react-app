import Slider from '../../components/slider/Slider'
import './singlePage.scss'
import { singlePostData, userData } from '../../lib/dummyData'
import Map from '../../components/map/Map';
import { useLoaderData } from 'react-router-dom';
import DOMpurify from 'dompurify'
function SinglePage() {
    const post =useLoaderData()
    console.log(post.data.post)
    return (
        <div className='singlePage'>
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.data.post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.data.post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">
                                    <h2>${post.data.post.price}</h2>
                                </div>
                            </div>
                            <div className="user">
                                <img src={post.data.post.user.avatar || "/noavatar.jpg"} alt="" />
                                <span>{post.data.post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom" dangerouslySetInnerHTML={{__html:DOMpurify.sanitize(post.data.post.postDetail.desc)}}>
                        </div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                {post.data.post.postDetail.utilities==="owner"?(
                                    <p>Owner pays</p>
                                ):(
                                    <p>Tenant is responsible</p>
                                )}
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                {post.data.post.postDetail.pets==="allowed"?(
                                    <p>allowed</p>
                                ):(
                                    <p>not allowed</p>
                                )}                           
                             </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post.data.post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="" />
                            <span>{post.data.post.postDetail.size}sqft</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png" alt="" />
                            <span>{post.data.post.bed} Beds</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png" alt="" />
                            <span>{post.data.post.bathroom} Bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                    <div className="feature">
                            <img src="/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>{post.data.post.postDetail.school > 999 ?post.data.post.school/1000+"km" :post.data.post.postDetail.school+"m" } away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stops</span>
                                <p>{post.data.post.postDetail.bus > 999 ?post.data.post.bus/1000+"km" :post.data.post.postDetail.bus+"m" } away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Restaurants</span>
                                <p>{post.data.post.postDetail.
                                   restaurant
                                    > 999 ?post.data.post.
                                   restaurant
                                   /1000+"km" :post.data.post.postDetail.
                                   restaurant
                                   +"m" } away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                        <div className="mapContainer">
                            <Map items={[post.data.post]}/>
                        </div>
                        <div className="buttons">
                            <button>
                                <img src="/chat.png" alt="" />
                                send a Message
                            </button>
                            <button>
                                <img src="/save.png" alt="" />
                                 save place
                            </button>
                        </div>


                </div>
            </div>
        </div>
    )
}

export default SinglePage