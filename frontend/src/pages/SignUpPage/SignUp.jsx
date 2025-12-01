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
import './SignUp.scss'

function SignUp() {
  const navigate = useNavigate();

  //alert dialog state
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showValidPassword, setShowValidPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    number: false,
    specialChar: false,
    upperCase: false,
    lowerCase: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  // Criteria for password
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleRePasswordVisibility = () => {
    setShowRePassword((prevState) => !prevState);
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= minLength;
    const numberValid = hasNumber.test(password);
    const specialCharValid = hasSpecialChar.test(password);
    const upperCaseValid = hasUpperCase.test(password);
    const lowerCaseValid = hasLowerCase.test(password);
    const isValid =
      lengthValid &&
      numberValid &&
      specialCharValid &&
      upperCaseValid &&
      lowerCaseValid;

    setPasswordCriteria({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      upperCase: upperCaseValid,
      lowerCase: lowerCaseValid,
    });
    if (password.length === 0) {
      setPasswordCriteria({
        length: false,
        number: false,
        specialChar: false,
        upperCase: false,
        lowerCase: false,
      });
      setShowValidPassword(false); // Đặt lại trạng thái khi mật khẩu rỗng
    } else {
      // Cập nhật trạng thái hiển thị kết quả hợp lệ
      setShowValidPassword(isValid);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    validatePassword(newPass);
  };

  const handleRePasswordChange = (e) => {
    const newRePass = e.target.value;
    setRePassword(newRePass);
    setSubmitAttempted(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (repassword !== password) return;
    const payload = {
      email,
      password,
    };
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Đăng ký thành công:', data);
        setAlert({
          open: true,
          title: 'QAirline',
          message: 'Đăng ký thành công, vui lòng đăng nhập để tiếp tục.',
          isSuccess: true,
        });

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Xử lý lỗi trả về từ server
        const error = await response.json();
        const errorMessage =
          error.errors && error.errors.length > 0
            ? error.errors[0].msg
            : 'Lỗi đăng ký';
        console.error('Lỗi đăng ký:', error);
        setAlert({
          open: true,
          title: 'QAirline',
          message: `Đăng ký thất bại: ${errorMessage}`,
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      setAlert({
        open: true,
        title: 'QAirline',
        message: `Lỗi kết nối: ${error}. Vui lòng thử lại sau!`,
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
              <BreadcrumbPage>Sign Up</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="mb-3 w-full max-w-sm rounded-lg bg-card shadow-md sm:max-w-md md:max-w-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <h1 className="text-center text-2xl text-[#ff4d4d] font-bold md:text-3xl">
            Tạo tài khoản
          </h1>
          <h2 className="text-center text-muted-foreground md:text-md">
            Nhập thông tin của bạn để đăng ký tài khoản mới
          </h2>
        </CardHeader>
        <CardContent>
          {/* Input Text (Changed from Email) */}
          <form onSubmit={handleSignup}>
            <div className="relative mb-4 max-w-full">
              <Input
                type="email"
                id="email"
                value={email}
                className="peer block h-11 w-full rounded-lg bg-transparent px-3 pb-2 pt-5 text-sm text-muted-foreground 
                focus:outline-none focus:border-[#ff4d4d]"
                placeholder=""
                required
                onChange={handleEmailChange}
              />
              <label
                htmlFor="email"
                className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate whitespace-nowrap pr-4 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#ff4d4d] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ff4d4d]"
              >
                abc@example.com
              </label>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="peer block h-11 w-full rounded-lg border border-border bg-transparent pb-2 pl-3 pr-10 pt-5 text-sm text-muted-foreground focus:border-[#ff4d4d] focus:outline-none"
                  value={password}
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
              {/* warning pass */}
              {!showValidPassword && password !== '' && (
                <div
                  className={`col-span-full rounded border border-red-600 border-t-white bg-red-200 text-[13px] md:col-span-1`}
                >
                  <ul
                    className={`rounded border py-1 text-gray-600`}
                  >
                    <li className="flex items-center">
                      <span className={`ml-2 w-5 items-center`}>
                        {passwordCriteria.length ? '✔' : '○'}
                      </span>
                      Cần có ít nhất {minLength} ký tự
                    </li>
                    <li className="flex items-center">
                      <span className={`ml-2 w-5 items-center`}>
                        {passwordCriteria.upperCase ? '✔' : '○'}
                      </span>
                      Cần chứa ít nhất 1 ký tự in hoa (A, B, C,..., Z)
                    </li>
                    <li className="flex items-center">
                      <span className={`ml-2 w-5 items-center`}>
                        {passwordCriteria.lowerCase ? '✔' : '○'}
                      </span>
                      Cần chứa ít nhất 1 ký tự in thường (a, b, c,..., z)
                    </li>
                    <li className="flex items-center">
                      <span className={`ml-2 w-5 items-center`}>
                        {passwordCriteria.number ? '✔' : '○'}
                      </span>
                      Cần chứa ít nhất 1 ký tự số (0, 1, 2,..., 9)
                    </li>
                    <li className="flex items-center">
                      <span className={`ml-2 w-5 items-center`}>
                        {passwordCriteria.specialChar ? '✔' : '○'}
                      </span>
                      Cần chứa ít nhất 1 ký tự đặc biệt (!, @, #,...)
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* RePassword Input */}
            <div className="mb-6">
              <div className="relative">
                <Input
                  type={showRePassword ? 'text' : 'password'}
                  id="re-password"
                  className="peer block h-11 w-full rounded-lg border border-border bg-transparent pb-2 pl-3 pr-10 pt-5 text-sm text-muted-foreground focus:border-[#ff4d4d] focus:outline-none"
                  value={repassword}
                  placeholder=""
                  required
                  onChange={handleRePasswordChange}
                />
                <label
                  htmlFor="re-password"
                  className="peer-placeholder-shown:top-2.2 absolute left-3 top-2.5 max-w-full truncate pr-12 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#ff4d4d] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#ff4d4d]"
                >
                  Nhập lại mật khẩu
                </label>
                <button type="button"
                  onClick={toggleRePasswordVisibility}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                {showRePassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
                </button>    
                {/* wanring re-pass */}
                {submitAttempted &&showValidPassword &&
                  repassword !== '' &&
                  (repassword !== password ? (
                    <div className="rounded border border-red-600 border-t-white bg-red-200 text-[13px] p-2 text-gray-600">
                      Mật khẩu không trùng khớp
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="mt-4">
              <button type="submit"
                className="w-full rounded-lg bg-[#ff4d4d] py-2 text-white font-bold text-sm hover:bg-[#c84c4c]"
              >
                Đăng ký
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
            Bạn đã có tài khoản?{' '}
            <Link to="/login" className="text-[#ff4d4d] font-bold hover:text-[#c84c4c] hover:underline">
              Đăng nhập!
            </Link>{' '}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;