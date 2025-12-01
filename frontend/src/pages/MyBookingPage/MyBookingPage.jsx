import { useState, useEffect } from 'react';
import BookingCard from './BookingCard/BookingCard';

function MyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching bookings with token:', token); // Debug log

        const response = await fetch(
          'http://localhost:5000/api/customer/my-bookings',
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

        console.log('Response status:', response.status); // Debug log

        const data = await response.json();
        console.log('Fetched bookings:', data); // Debug log

        if (response.ok) {
          // Sort bookings: confirmed first, cancelled last
          const sortedBookings = data.sort((a, b) => {
            if (a.status === 'Cancelled' && b.status !== 'Cancelled') return 1;
            if (a.status !== 'Cancelled' && b.status === 'Cancelled') return -1;
            return 0;
          });
          setBookings(sortedBookings);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="h-full">
      <div className="container mx-auto px-3 py-8 pt-14 md:px-28">
        <h1 className="mb-7 text-3xl font-bold text-center">Đặt chỗ của tôi</h1>

        <div className="space-y-6">
          {loading && <div className="py-8 text-center">Đang tải...</div>}
          {error && (
            <div className="py-8 text-center text-red-500">Lỗi: {error}</div>
          )}
          {!loading && !error && bookings.length === 0 && (
            <div className="py-8 text-center">Không tìm thấy đặt chỗ!</div>
          )}
          {!loading && !error && bookings.length > 0 && bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookingPage;
