import { Card, CardContent } from '../../../components/ui/Card';
import { CreditCard } from 'lucide-react';

const PaymentInfo = ({ payment }) => {
  return (
    <Card>
      <CardContent className="p-2 md:p-6">
        <h3 className="mb-2 text-lg font-semibold">Thông tin thanh toán</h3>
        <div className="space-y-2">
          <p>Trạng thái: {payment.payment_status === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
          <p>Hình thức: {payment.payment_method}</p>
          <div className="flex items-center">
            <CreditCard className="mr-2" size={20} />
            <span>**** **** **** {payment.card_number.slice(-4)}</span>
          </div>
          <p>Chủ thẻ: {payment.cardholder_name}</p>
          <p>Hết hạn: {payment.expiry_date}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
