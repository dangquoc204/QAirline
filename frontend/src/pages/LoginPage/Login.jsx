import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../components/ui/Card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/Breadcrumb';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AlertDialog from '../../components/Notification/AlertDialog';
import './Login.scss'

function Login() {
  const navigate = useNavigate();

  //alert dialog state
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
    onClose: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;
        localStorage.setItem('token', token); // Lưu token vào localStorage
        setAlert({
          open: true,
          title: 'QAirline',
          message: 'Đăng nhập thành công!',
          isSuccess: true,
          onClose: () => {
            if (email === 'admin1@example.com') {
              navigate('/admin/manage-posts');
            } else {
              setTimeout(() => {
                navigate('/'); // Điều hướng đến trang chính sau khi hiển thị thông báo
              }, 0);
            }
          },
        });
      } else {
        setAlert({
          open: true,
          title: 'QAirline',
          message: `Đăng nhập thất bại! Tài khoản hoặc mật khẩu không đúng.`,
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      setAlert({
        open: true,
        title: 'QAirline',
        message: `Lỗi kết nối. Vui lòng thử lại sau!`,
        isSuccess: false,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sky px-3">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Login</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="mb-3 w-full max-w-sm rounded-lg bg-card shadow-md sm:max-w-md md:max-w-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <h1 className="text-center text-2xl text-[#ff4d4d] font-bold md:text-3xl">
            Chào mừng trở lại
          </h1>
          <h2 className="text-center text-muted-foreground md:text-md">
            Nhập thông tin đăng nhập để truy cập tài khoản của bạn
          </h2>
        </CardHeader>
        <CardContent>
          {/* Input Text (Changed from Email) */}
          <form onSubmit={handleLogin}>
            <div className="relative mb-4 max-w-full">
              <Input
                type="email"
                id="username"
                className="peer block h-11 w-full rounded-lg bg-transparent px-3 pb-2 pt-5 text-sm text-muted-foreground 
                focus:outline-none focus:border-[#ff4d4d]"
                placeholder=""
                required
                onChange={handleEmailChange}
              />
              <label
                htmlFor="username"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate whitespace-nowrap pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#ff4d4d] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ff4d4d]"
              >
                abc@example.com
              </label>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="peer block h-11 w-full rounded-lg border border-border bg-transparent pb-2 pl-3 pr-10 pt-5 text-sm text-muted-foreground focus:border-[#ff4d4d] focus:outline-none"
                  placeholder=""
                  required
                  onChange={handlePasswordChange}
                />
                <label
                  htmlFor="password"
                  className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#ff4d4d] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ff4d4d]"
                >
                  Mật khẩu
                </label>
                <button type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-sm text-[#ff4d4d] font-bold hover:text-[#c84c4c] hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            {/* Log in Button */}
            <div className="mt-4">
              <button type="submit"
                className="w-full rounded-lg bg-[#ff4d4d] py-2 text-white font-bold text-sm hover:bg-[#c84c4c]"
              >
                Đăng nhập
              </button>
              <AlertDialog
                open={alert.open}
                onClose={() => {
                  if (alert.onClose) {
                    alert.onClose();
                  }
                  setAlert({ ...alert, open: false });
                }}
                title={alert.title}
                message={alert.message}
                isSuccess={alert.isSuccess}
              />
            </div>
          </form>

          <div className="my-5 flex items-center">
            <hr className="flex-1 border-muted-foreground" />
            <span className="px-4 text-sm text-muted-foreground">
              hoặc đăng nhập với
            </span>
            <hr className="flex-1 border-muted-foreground" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
              <a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&hl=vi&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S252850339%3A1731953360109578&ddm=1">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png"
                  alt="Google"
                  className="h-6 w-6"
                />
              </a>
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
              <a href="https://www.facebook.com/r.php">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="h-6 w-6"
                />
              </a>
            </button>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-center">
          <p>
            Bạn chưa có tài khoản?{' '}
            <Link to="/signup" className="text-[#ff4d4d] font-bold hover:text-[#c84c4c] hover:underline">
              Đăng ký!
            </Link>{' '}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;