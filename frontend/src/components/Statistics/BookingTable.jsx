import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/Table';

export function BookingTable({ bookings }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đặt vé</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Mã chuyến bay</TableHead>
            <TableHead>Hành trình</TableHead>
            <TableHead>Ghế</TableHead>
            <TableHead>Thời gian di chuyển</TableHead>
            <TableHead>Thời gian đặt vé</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thanh toán</TableHead>
            <TableHead className="text-right">Giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.booking_code}</TableCell>
              <TableCell>
                {booking.Passengers.map(
                  (p) => `${p.first_name} ${p.last_name}`
                ).join(', ')}
              </TableCell>
              <TableCell>
                {booking.Passengers.map(
                  (p) => p.phone
                )}
              </TableCell>
              <TableCell>
                {booking.outboundFlight.flight_number}
                {booking.returnFlight && (
                  <>
                    <br /><br />
                    {booking.returnFlight.flight_number}
                  </>
                )}
              </TableCell>
              <TableCell>
                {`${booking.outboundFlight.origin} → ${booking.outboundFlight.destination}`} 
                {booking.returnFlight && (
                  <>
                    <br /><br />
                    {`${booking.returnFlight.origin} → ${booking.returnFlight.destination}`}
                  </>
                )}
              </TableCell>
              <TableCell>
                {booking.outboundSeat && (
                  <>
                    {booking.outboundSeat.seat_type === 'Economy' ? 'Phổ thông' : 'Cao cấp'} {booking.outboundSeat.seat_number}
                  </>
                )}

                {booking.returnSeat && (
                  <>
                    <br /><br />
                    {booking.returnSeat.seat_type === 'Economy' ? 'Phổ thông' : 'Cao cấp'} {booking.returnSeat.seat_number}
                  </>
                )}
              </TableCell>
              <TableCell>
                {`${formatDate(booking.outboundFlight.departure_time).replace('lúc ', '')} → ${formatDate(booking.outboundFlight.arrival_time).replace('lúc ', '')}`}
                {booking.returnFlight && (
                  <>
                    <br /><br />
                    {`${formatDate(booking.returnFlight.departure_time).replace('lúc ', '')} → ${formatDate(booking.returnFlight.arrival_time).replace('lúc ', '')}`}
                  </>
                )}
              </TableCell>
              <TableCell>
                {formatDate(booking.booking_date).replace('lúc ', '')}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    booking.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {booking.status === 'Confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                </span>
              </TableCell>
              <TableCell>
                {booking.payment_status === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </TableCell>
              <TableCell className="text-right">
                ${booking.total_price.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
