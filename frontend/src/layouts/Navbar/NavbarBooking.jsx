import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import axios from 'axios';

export const NavbarBooking = ({origin, destination, outgoingDate, returnDate, passengers, isSelectingReturnFlight}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  // Kiểm tra nếu người dùng đã đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Người dùng đã đăng nhập
      fetchUserInfo(token);
    } else {
      setIsLoggedIn(false); // Người dùng chưa đăng nhập
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserInfo({ name: '', email: '' });
    navigate('/');
  };

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
      const { first_name, last_name, User } = response.data;
      console.log(response.data);
      setUserInfo({ name: `${first_name} ${last_name}`, email: User.email });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-colors duration-300 bg-[#f9f7f3]"
    >
      <div className="container mx-auto flex h-16 w-full flex-row items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-5">
            <ChevronLeft className="hover:text-[#ff4d4d]  h-5 w-5" />
            {/* Logo bên cạnh */}
            <img
              src="/assets/logo.png" // Path to your image
              alt="Logo"
              className="h-[40px] max-sm:h-[30px]"  // Adjust size and ensure it fits inside the circle
            />
          </a>
        </div>

        {/* Center section */}
        <div
          className="flex flex-col items-center rounded-2xl px-5 pt-1 md:flex-row md:gap-3 md:border md:py-2 border-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{origin}</span>
            <ChevronRight className="h-5 w-5 " />
            <span className="font-medium">{destination}</span>
          </div>
          <div className="hidden h-6 w-px bg-primary/20 xl:block" />
          <div className="hidden items-center gap-2 xl:block">
            <Calendar className="h-4 w-4" />
            <span>{isSelectingReturnFlight ? new Date(returnDate).toLocaleDateString('vi-VN') : new Date(outgoingDate).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="hidden h-6 w-px bg-primary/20 xl:block" />
          <div className="hidden items-center gap-2 xl:block">
            <Users className="h-4 w-4" />
            <span>{passengers} hành khách</span>
          </div>
          <div className="hidden h-6 w-px bg-primary/20 lg:block" />
          <div>
            <Button
              variant="ghost"
              onClick={
                function() {
                  navigate('/book');
                }
              }
              className="hover:text-[#ff4d4d] hover:bg-transparent"
            >
              <Search className="mr-2 h-4 w-4" />
              Thay đổi tìm kiếm
            </Button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
          <>
            <Button
              variant="link"
              onClick={handleLoginClick}
              className="text-[#0a0a0a] font-semibold hover:text-[#ff4d4d]"
            >
              Đăng nhập
            </Button>
            <span className="text-[#cccccc]">|</span>
            <Button
              variant="link"
              onClick={handleSignUp}
              className="text-[#0a0a0a] font-semibold hover:text-[#ff4d4d]"
            >
              Đăng ký
            </Button>
          </>
          ) : (
            <UserProfile
              name={userInfo.name}
              id={userInfo.email}
              tier="Người dùng mới"
              avios={5}
              qpoints={10}
              onLogout={handleLogout}
              isBooking={true}
            />
          )}
          <span className="hidden text-sm font-medium text-gray-800 lg:block hover:text-primary transition-colors">
          </span>
        </div>
      </div>
    </nav>
  );
}
