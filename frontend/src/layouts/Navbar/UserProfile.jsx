import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/PopOver';
import { CircleUserRound } from 'lucide-react';

const UserProfile = ({
  name,
  id,
  tier,
  avios,
  qpoints,
  onLogout,
  className
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link
          className={`${className}`}
        >
          <CircleUserRound size={24}/>
        </Link>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 z-[1001]">
        <div className="rounded-md bg-gradient-to-r from-[#10A7CD] to-[#3DCDF0] p-6">
          <div className="space-y-1 text-white">
            <h4 className="text-xl font-semibold">{name}</h4>
            <p className="text-sm opacity-90">
              {id} | {tier}
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
          <Link to="/mybooking" className="text-gray-700 hover:text-[#ff4d4d] hover:underline mr-3"
          >
            Đặt chỗ của tôi
          </Link>
          <Link to="/profile"
          className="text-gray-700 hover:text-[#ff4d4d] hover:underline mr-3" 
          >
            Sửa hồ sơ
          </Link>
          <Link onClick={onLogout}className="text-gray-700 hover:text-[#ff4d4d] hover:underline mr-3"
          >
            Đăng xuất
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
