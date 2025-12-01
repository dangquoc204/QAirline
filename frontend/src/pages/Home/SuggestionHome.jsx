import { useState } from 'react';

const tabs = [
  {
    id: 'privilege',
    title: 'Privilege Club',
    description:
      'Tích lũy Avios và tận hưởng những đặc quyền như vé bay miễn phí, thăng hạng, ưu tiên làm thủ tục và nhiều ưu đãi khác. Nâng tầm trải nghiệm chuyến đi của bạn cùng QAirline.',
    buttonText: 'Tham gia ngay',
    image:
      'https://c.ekstatic.net/ecl/photo-gallery/a380/economy-class/dining/emirates-a380-economy-class-dining-inflight-meal-720x480.jpg?h=SH-0t5qnKXrW539DzbBbqge',
  },
  {
    id: 'mobile',
    title: 'Ứng dụng di động',
    description:
      'Đặt vé máy bay, quản lý đặt chỗ và nhận vé bay online – tất cả chỉ trong một ứng dụng. Tải ngay ứng dụng QAirline để tận hưởng sự tiện lợi tối đa.',
    buttonText: 'Tải ngay',
    image:
      'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/News/News_expe_9924/9924.png?version=180812',
  },
  {
    id: 'stopover',
    title: 'Gói dừng chân QAirline',
    description:
      'Trải nghiệm trọn vẹn thành phố trung chuyển của chúng tôi với gói dừng chân chỉ từ 14 USD. Khám phá văn hoá, ẩm thực và những điểm tham quan độc đáo như chưa từng có trước đây.',
    buttonText: 'Khám phá thêm',
    image:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/07/hinh-nen-ai-1.jpg',
  },
  {
    id: 'student',
    title: 'Câu lạc bộ sinh viên',
    description:
      'Tận hưởng ưu đãi giảm giá và quyền lợi đặc biệt dành riêng cho sinh viên. Du lịch thông minh hơn với những khuyến mãi độc quyền được thiết kế chỉ dành cho bạn.',
    buttonText: 'Tham gia ngay',
    image:
      'https://cdn.baohatinh.vn/images/77aa7d2e98b7f36166ba739628db583d914ebed3e3a748f37b351256ef230d3b0c4bae7e2d2e7774ea2fb1eedeed2720/105d3145200t51452205l4.jpg',
  },
];

const SuggestionHome = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div
      className="relative my-8 min-h-[225px] overflow-hidden bg-cover bg-center text-white shadow-lg md:min-h-[300px] lg:min-h-[375px]"
      style={{
        backgroundImage: `url(${activeTab.image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-6">
        {/* Tabs */}
        <div className="mb-6 flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`border-b-2 pb-1 text-sm font-medium md:text-base ${
                activeTab.id === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Information Section */}
        <div className="max-w-md rounded-lg bg-black bg-opacity-50 p-6">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            {activeTab.title}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#cccccc] md:text-base">
            {activeTab.description}
          </p>
          <button className="rounded-md bg-[#ff4d4d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c84c4c]">
            {activeTab.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionHome;
