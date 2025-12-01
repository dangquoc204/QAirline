import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { AlertCircle } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          <h1 className="text-2xl text-[#ff4d4d] text-center mb-4">Quản lý hình thức thanh toán</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4 text-muted-foreground">
          <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0" />
          <div>
            <p>Bạn chưa lưu hình thức thanh toán ưa thích nào.</p>
            <p className="mt-2">
              Hãy đánh dấu ô lưu thông tin khi thanh toán lần tới để thẻ và địa chỉ thanh toán của bạn được lưu lại.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
