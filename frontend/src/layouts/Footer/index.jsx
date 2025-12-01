import './Footer.scss';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdMailOutline,  MdOutlineLocationOn } from "react-icons/md";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <img src="/assets/logo.png" alt="Logo" className="footer__logo__image" />
        </div>

        <div className="footer__info">
          <h3 className="footer__title">
            Liên hệ
          </h3>
          <p> 
            <span className="footer__title__icon"><MdOutlineLocationOn /></span> 144 Xuân Thủy, Cầu Giấy, Hà Nội, Việt Nam</p>
          <p>     
            <span className="footer__title__icon"><MdMailOutline /></span> contact@company.com</p>
          <p>
            <span className="footer__title__icon"><FaPhoneAlt /></span> +84 123 456 789
          </p>
        </div>

        <div className="footer__listLink">
          <h3 className="footer__title">
            Liên kết 
          </h3>
          <Link to="/about" className="footer__link">
            Giới thiệu <br />
          </Link>
          <Link to="/services" className="footer__link">
            Dịch vụ <br />
          </Link>
          <Link to="/contact" className="footer__link">
            Liên hệ <br />
          </Link>
          <Link to="/privacy" className="footer__link">
            Chính sách bảo mật <br />
          </Link>
          <Link to="/terms" className="footer__link">
            Điều khoản sử dụng <br />
          </Link>
        </div>

        <div className="footer__social">
          <h3 className="footer__title">
            Theo dõi chúng tôi 
          </h3>

          <div className="footer__icons">
            <a href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icons__link">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icons__link">
              <FaTwitter />
            </a>
            <a href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icons__link">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icons__link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer_copyRight">
          &copy; 2025 Hãng hàng không QAirline. Bảo lưu mọi quyền.
        </div>
      </div>
    </div>
  )
}
export default Footer;