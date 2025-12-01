import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Plus } from 'lucide-react';

const Companion = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#ff4d4d] text-center">
          Thêm bạn đồng hành
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="h-48 w-full border-2 border-dashed hover:border-muted-foreground hover:bg-primary/5"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-muted-foreground">Thêm bạn đồng hành</span>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Companion;
