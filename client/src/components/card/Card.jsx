import { Link } from 'react-router-dom'
import './card.scss'

function Card({item}){
    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formatter.format(price);
    }
  return (
    <div className='card'>
        <Link to={`/${item.id}`}className='imageContainer'>
              <img src={item.images[0]}/>
        </Link>
        <div className="textContainer">
            <h2 className='title'>
                <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>
            <p className="address">
                <img src="/pin.png" alt="" />
                <span>{item.address}</span>
            </p>
            <p className="price">
                {formatPrice(item.price)}
            </p>

            <div className="bottom">
                <div className="features">
                    <div className="feature">
                        <img src="/bed.png" alt="" />
                        <span>{item.bedroom} bedroom</span>
                    </div>
                    <div className="feature">
                        <img src="/bath.png" alt="" />
                        <span>{item.bathroom} bathroom</span>
                    </div>
                </div>

                <div className="icons">
                    <div className="icon">
                        <img src="/save.png" alt="" />
                    </div>
                    <div className="icon">
                        <img src="chat" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card