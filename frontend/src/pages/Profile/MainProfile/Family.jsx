import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Plus } from 'lucide-react';

const Family = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#ff4d4d] text-center">
          Đề cử thành viên gia đình
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Bạn có thể đề cử tối đa 9 thành viên gia đình (vợ/chồng, con từ 2 tuổi trở lên, cha mẹ bạn và cha mẹ vợ/chồng) vào hội viên Privilege Club của mình.
          </p>
          <p className="text-[#c84c4c] font-medium">
            Hạng hội viên Privilege Club càng cao, thành viên gia đình bạn càng nhận được nhiều Avios.
          </p>
        </div>

        <Button
          variant="outline"
          className="h-48 w-full border-2 border-dashed hover:border-muted-foreground hover:bg-primary/5"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-muted-foreground">Thêm thành viên gia đình</span>
          </div>
        </Button>

        <Button
          variant="link"
          className="text-[#c84c4c] hover:text-[#ff4d4d]"
        >
          → Tìm hiểu thêm về các gói gia đình
        </Button>
      </CardContent>
    </Card>
  );
};

export default Family;
