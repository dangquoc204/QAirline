import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [setSidebarOpen, sidebarOpen]);

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#f9f7f3] p-5 text-[#0a0a0a] transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-8 flex">
        <img
          src="/assets/logo.png" // Path to your image
          alt="Logo"
          className="ml-3 h-[40px]" // Adjust size and ensure it fits inside the circle
        />
      </div>

      <nav className="flex flex-col space-y-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/manage-posts"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-[#ff4d4d] ${
                pathname.includes('manage-posts') ? 'bg-[#ff4d4d]' : ''
              }`}
            >
              <span>📋</span>
              Quản lý bài đăng
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-airplanes"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-[#ff4d4d] ${
                pathname.includes('manage-airplanes') ? 'bg-[#ff4d4d]' : ''
              }`}
            >
              <span>✈️</span>
              Quản lý máy bay
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-flights"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-[#ff4d4d] ${
                pathname.includes('manage-flights') ? 'bg-[#ff4d4d]' : ''
              }`}
            >
              <span>🛫</span>
              Quản lý chuyến bay
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/statistics"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-[#ff4d4d] ${
                pathname.includes('statistics') ? 'bg-[#ff4d4d]' : ''
              }`}
            >
              <span>📊</span>
              Theo dõi và phân tích đặt vé
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
