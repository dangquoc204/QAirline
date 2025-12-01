import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../PopOver';
import Avatar from 'react-avatar';

const AdminProfile = ({
  tier,
  avios,
  qpoints,
}) => {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link>
          <Avatar 
            name="Admin" 
            size="40" 
            round={true} 
            color="#10a7cd" // Tùy chỉnh màu sắc
            fgColor="#ffffff" // Màu chữ
          />
        </Link>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 z-[1001]">
        <div className="rounded-md bg-gradient-to-r from-[#10A7CD] to-[#3DCDF0] p-6">
          <div className="space-y-1 text-white">
            <p className="text-sm opacity-90">
              {tier}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white p-4 pl-8">
          <div>
            <div className="text-2xl font-bold">{avios}</div>
            <div className="text-sm text-[#0a0a0a]">Apoints</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{qpoints}</div>
            <div className="text-sm text-[#0a0a0a]">Qpoints</div>
          </div>
        </div>

        <div className="flex justify-self-center border-t p-4">
          <a href="#" onClick={handleLogout} className="text-gray-700 hover:text-[#ff4d4d] hover:underline mr-3"
          >
            Đăng xuất
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminProfile;
