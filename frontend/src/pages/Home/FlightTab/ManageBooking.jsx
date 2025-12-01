import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import AlertDialog from '../../../components/Notification/AlertDialog';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/Dialog';

const ManageBooking = () => {
  const [activeTab, setActiveTab] = useState('manage_booking');
  const [bookingCode, setBookingCode] = useState('');
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
    onClose: null,
  });
  const handleAlertClose = () => {
    setAlert(prev => ({ ...prev, open: false}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingCode.trim()) {
      setAlert({
        open: true,
        title: 'QAirline',
        message: 'Vui lòng điền mã đặt vé.',
        isSuccess: false,
      });
      return;
    } else {
      let apiUrl = `http://localhost:5000/api/customer/booking-detail?booking_code=${bookingCode}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if (data.message !== "Không tìm thấy booking") {
          if (activeTab !== 'manage_booking') {
            setAlert({
              open: true,
              title: 'Làm thủ tục thành công',
              message: `Sau đây là QRCode ứng với mã đặt chỗ ${bookingCode}.`,
              isSuccess: true,
            });
            setTimeout(() => {
              setShowQR(true);
            }, 3000);
          } else {
            setAlert({
              open: true,
              title: 'Đã tìm thấy vé đặt',
              message: `Thông tin đặt chỗ với mã đặt chỗ ${bookingCode} đã được tìm thấy.`,
              isSuccess: true,
            });
            setTimeout(() => {
              sessionStorage.setItem('booking', JSON.stringify(data.booking));
              navigate('/booking-details');
            }, 3000);
          }
        } else {
          setAlert({
            open: true,
            title: 'QAirline',
            message: `Không tìm thấy vé đặt`,
            isSuccess: false,
          });
        }
      } catch (error) {
        setAlert({
          open: true,
          title: 'QAirline',
          message: `Không tìm thấy vé đặt`,
          isSuccess: false,
        });
      }
    }
  };

  return (
    <>
      <Card className="rounded-lg bg-white p-0 shadow-md">
        <CardHeader className="border-b">
          <div className="flex">
            <Button
              variant="ghost"
              onClick={() => setActiveTab('manage_booking')}
              className={`flex-1 py-1 text-center text-lg font-medium ${
                activeTab === 'manage_booking'
                  ? 'rounded-none border-b-2 border-[#ff4d4d] text-[#ff4d4d] hover:text-[#ff4d4d] hover:bg-transparent'
                  : 'text-gray-600 hover:bg-transparent hover:text-[#ff4d4d]'
              }`}
            >
              Quản lý đặt vé
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab('checkin')}
              className={`flex-1 py-2 text-center text-lg font-medium ${
                activeTab === 'checkin'
                  ? 'rounded-none border-b-2 border-[#ff4d4d] text-[#ff4d4d] hover:text-[#ff4d4d] hover:bg-transparent'
                  : 'text-gray-600 hover:bg-transparent hover:text-[#ff4d4d]'
              }`}
            >
              Làm thủ tục
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4 pt-4 md:flex-row md:gap-6">
            {/* Booking Reference */}
            <div className="w-full flex-1 md:w-auto">
              <Label htmlFor="bookingCode">Mã đặt vé</Label>
              <Input
                id="bookingCode"
                placeholder="Nhập mã đặt vé"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-5 w-full md:w-auto">
              <Button
                onClick={handleSubmit}
                className="w-full rounded-lg bg-[#ff4d4d] py-3 text-white hover:bg-[#c84c4c] md:w-auto"
              >
                {activeTab === 'manage_booking' ? 'Tra cứu' : 'Làm thủ tục'}
              </Button>
              {alert.open && (
                <AlertDialog
                  open={true}
                  onClose={handleAlertClose}  // callback cố định
                  title={alert.title}
                  message={alert.message}
                  isSuccess={alert.isSuccess}
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      {showQR && (
        <Dialog open={showQR} onOpenChange={() => setShowQR(false)}>
          <DialogContent className="flex justify-center items-center">
            <QRCodeCanvas
              value={bookingCode}
              size={512}
              bgColor="#ffffff"
              fgColor="#000000"
              level="Q"
              includeMargin={true}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ManageBooking;
