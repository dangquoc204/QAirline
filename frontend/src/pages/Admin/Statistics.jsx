import { useEffect, useState } from 'react';
import { Users, CreditCard, Plane, Calendar } from 'lucide-react';
import { StatisticsCard } from '../../components/Statistics/StatisticsCard';
import { BookingTable } from '../../components/Statistics/BookingTable';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Toaster } from '../../components/ui/Sonner';

const Statistics = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => { 
    fetch('http://localhost:5000/api/admin/bookings' , {
      headers: {
      Authorization: `Bearer ${token}`,
    },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookingsData(Array.isArray(data) ? data : data.bookings || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi tải các lượt đặt chỗ:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500 italic">Đang tải...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalBookings = bookingsData.length;
  const totalPassengers = bookingsData.reduce(
    (sum, booking) => sum + booking.passengers,
    0
  );
  const totalRevenue = bookingsData.reduce(
    (sum, booking) => sum + parseFloat(booking.total_price),
    0
  );
  const averageBookingValue = totalRevenue / totalBookings;

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">
            Phân tích đặt vé
          </h1>
        </CardHeader>
        <CardContent>
          {/* Statistics Section */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatisticsCard
              title="Tổng số lượt đặt vé"
              value={totalBookings}
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            />
            <StatisticsCard
              title="Tổng số hành khách"
              value={totalPassengers}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatisticsCard
              title="Tổng doanh thu"
              value={`$${totalRevenue.toLocaleString()}`}
              icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            />
            <StatisticsCard
              title="Giá trị đặt vé trung bình"
              value={`$${averageBookingValue.toLocaleString()}`}
              icon={<Plane className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Bookings Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Đặt vé gần đây</h2>
            <div className="overflow-x-auto">
              <BookingTable bookings={bookingsData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
