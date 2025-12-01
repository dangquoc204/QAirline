import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Dialog';
import { CheckCircle, XCircle } from 'lucide-react'; // Import icon

const AlertDialog = ({
  open,
  onClose,
  title = 'QAirline',
  message,
  isSuccess,
}) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer;
    if (isSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0)); // Giảm countdown
      }, 1000);

      // Xử lý điều hướng sau khi countdown kết thúc
      if (countdown === 0) {
        onClose(); // Gọi hàm đóng hoặc điều hướng khi countdown bằng 0
      }
    }

    return () => clearInterval(timer); // Dọn dẹp interval khi component bị unmounted
  }, [isSuccess, countdown, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-lg text-center">
        <DialogHeader>
          <DialogTitle className="text-md font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-foreground">
          <div className="flex justify-center py-4">
            {isSuccess ? (
              <CheckCircle className="h-16 w-16 text-green-500" /> // Tích xanh
            ) : (
              <XCircle className="h-16 w-16 text-red-500" /> // Dấu X đỏ
            )}
          </div>
          {message}
        </DialogDescription>
        <div className="flex justify-center">
          {!isSuccess ? (
            <Link
              onClick={onClose}
              className="min-w-[100px] rounded-lg py-2 bg-[#ff4d4d] text-white hover:bg-[#c84c4c]"
            >
              OK
            </Link>
          ) : (
            <p className="text-center text-gray-600">
              Trang sẽ được chuyển hướng trong <strong>{countdown}</strong>{' '}
              giây.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
