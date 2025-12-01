import './Navbar.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';
import UserProfile from './UserProfile';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' }); // State to store user info

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Người dùng đã đăng nhập
      fetchUserInfo(token); // Fetch user info
    } else {
      setIsLoggedIn(false) // Người dùng chưa đăng nhập
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false);
    setUserInfo({ name: '', email: '' }); // Clear user info
    navigate('/');
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/customer/my-info',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { first_name, last_name, User } = response.data.customer;
      setUserInfo({ name: `${first_name || ''} ${last_name || ''}`, email: User.email });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <>
      <button className="menu" onClick={handleMenuOpen}>
        {isMenuOpen ? <TiDeleteOutline /> : <FaBars />} 
      </button>

      <div className={`nav ${isMenuOpen && "nav--active"}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">
              <img src="/assets/logo.png" alt="Logo" className="nav__item__logo"/>
            </Link>
          </li>

          <li className="nav__item">
            <Link to="/book">
              <p className="nav__item__link">Đặt vé</p>
            </Link>
          </li>

          <li className="nav__item">
            <Link to="/guide">
              <p className="nav__item__link">Hướng dẫn</p>
            </Link>
          </li>

          <li className="nav__item">
            <Link to="/farerules">
              <p className="nav__item__link">
                Điều kiện giá vé
              </p>
            </Link>
          </li>

          <li className="nav__item">
            <Link to="/about">
              <p className="nav__item__link">
                Về chúng tôi
              </p>
            </Link>
          </li>

          <li className="nav__item">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav__item__link">
                  Đăng nhập
                </Link>
                <span className="text-[#cccccc]">|</span>
                <Link to="/signup" className="nav__item__link">
                  Đăng ký
                </Link>
              </>
            ) : (
              <UserProfile
                name={userInfo.name}
                id={userInfo.email}
                tier="Người dùng mới"
                avios={5}
                qpoints={10}
                onLogout={handleLogout}
                isBooking={false}
                className="nav__item__link"
              />
            )}
          </li>
        </ul>
      </div>
    </>
  )
}
export default Navbar;