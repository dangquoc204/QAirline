import { useEffect, useState } from 'react';
import BookingCard from '../MyBookingPage/BookingCard/BookingCard';

export default function BookingDetails() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('booking');
    if (raw) {
      setBookingData(JSON.parse(raw));
      sessionStorage.removeItem('booking');
    }
  }, []);

  if (!bookingData) {
    return <div className="my-3 text-center text-red-500">Không có dữ liệu đặt vé để hiển thị.</div>;
  }
  return (
    <div>
      <BookingCard booking={bookingData} />
    </div>
  );
}