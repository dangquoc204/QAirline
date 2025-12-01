import { Card, CardContent } from '../../../components/ui/Card';

const PassengerInfo = ({ passengers }) => {
  return (
    <Card>
      <CardContent className="p-2 md:p-6">
        <h3 className="mb-2 text-lg font-semibold">Thông tin hành khách</h3>
        {passengers && passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <div key={index} className="mb-2">
              <p>
                Tên: {passenger.first_name} {passenger.last_name}
              </p>
              <p>Email: {passenger.email}</p>
              <p>Số điện thoại: {passenger.phone}</p>
            </div>
          ))
        ) : (
          <p>Không có thông tin hành khách</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PassengerInfo;
