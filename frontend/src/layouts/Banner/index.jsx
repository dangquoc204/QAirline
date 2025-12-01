import './Banner.scss';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book');
  }
  
  return (
    <div className="banner">
      <div className="banner__content">
        <div className="banner__container">
          <div className="banner__text">
            <span className="banner__text--highlight">
              Đặc biệt:
            </span>
            <span>
              Giảm 15% cho chuyến bay quốc tế
            </span>
          </div>
        </div>
        <button className="banner__button" onClick={handleClick}>Đặt ngay</button>
      </div>
    </div>
  )
}
export default Banner;