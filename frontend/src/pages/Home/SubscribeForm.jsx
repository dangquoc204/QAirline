import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';

const SubscribeForm = () => {
  return (
    <div
      className="relative mx-auto mb-8 flex max-w-6xl flex-col justify-center overflow-hidden rounded-lg bg-cover bg-center text-white lg:min-h-0"
      style={{
        backgroundImage: `url('https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/treemdimaybay3-1662997543109.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative flex min-h-[55vh] flex-col items-center justify-between gap-8 overflow-visible p-8 md:h-auto lg:flex-row lg:items-start lg:p-16">
        {/* Form section */}
        <div className="w-full text-white lg:w-1/2">
          <h2 className="mb-4 text-center text-3xl font-bold lg:text-left lg:text-4xl">
            Đừng bỏ lỡ bất kì ưu đãi nào
          </h2>
          <p className="mb-6 text-center text-lg text-[#cccccc] lg:text-left">
            Đăng ký để trở thành người đầu tiên nhận các ưu đãi độc quyền của chúng tôi
          </p>
          <form className="space-y-4">
            {/* Inputs */}
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                type="email"
                placeholder="Nhập email"
                className="flex-1 bg-white text-black focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <Input
                type="text"
                placeholder="Thành phố khởi hành ưu tiên"
                className="flex-1 bg-white text-black focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox id="agreement" required />
              <Label
                htmlFor="agreement"
                className="text-sm leading-relaxed text-[#cccccc]"
              >
                Tôi muốn nhận ưu đãi và tin tức từ QAirline. Tôi đã đọc và hiểu về{' '}
                <a
                  href="#"
                  className="text-[#10a7cd] hover:underline focus:outline-none"
                >
                  quyền riêng tư
                </a>
              </Label>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full rounded-md bg-[#ff4d4d] py-3 text-lg text-white hover:bg-[#c84c4c]"
            >
              Đăng ký
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;
