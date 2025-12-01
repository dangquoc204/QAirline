import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tab';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Pencil } from 'lucide-react';

const Preferences = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center text-[#ff4d4d] mb-4">
          Lựa chọn du lịch của bạn
        </CardTitle>
        <p className="my-2 text-sm text-muted-foreground">
          Để cá nhân hoá trải nghiệm của bạn, vui lòng chọn sân bay, điểm đến và các tuỳ chọn du lịch ưa thích bên dưới.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="travel" className="w-full">
          <TabsList className="h-auto w-full justify-start rounded-none border-b">
            <TabsTrigger
              value="travel"
              className="rounded-none text-base data-[state=active]:border-b-2 data-[state=active]:border-[#c84c4c] data-[state=active]:text-[#c84c4c]"
            >
              Tùy chọn du lịch
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="rounded-none text-base data-[state=active]:border-b-2 data-[state=active]:border-[#c84c4c] data-[state=active]:text-[#c84c4c]"
            >
              Tùy chọn liên lạc
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="travel"
            className="mt-6 rounded-lg border bg-gray-50 p-6"
          >
            <div className="flex w-full justify-end">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-[#c84c4c]">
                  Sân bay ưa thích :
                </h3>
                <p className="text-muted-foreground">Chưa chọn</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[#c84c4c]">
                  Điểm đến yêu thích :
                </h3>
                <p className="text-muted-foreground">Chưa chọn</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[#c84c4c]">
                  Suất ăn ưa thích :
                </h3>
                <p className="text-muted-foreground">Chưa chọn</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[#c84c4c]">
                  Ghế ngồi ưa thích :
                </h3>
                <p className="text-muted-foreground">Chưa chọn</p>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <h3 className="font-semibold text-[#c84c4c]">
                Tùy chọn kỳ nghỉ :
              </h3>
              <p className="text-muted-foreground">Chưa chọn</p>
            </div>
            <div className="mt-8 space-y-2">
              <h3 className="font-semibold text-[#c84c4c]">
                Sở thích cá nhân :
              </h3>
              <p className="text-muted-foreground">Chưa chọn</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Preferences;
