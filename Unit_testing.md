# Tài liệu Test Case Kiểm thử Đơn vị – Dự án QAirline
Các test case được nhóm theo từng module chức năng (Frontend và Backend) bao gồm: Xác
thực, Người dùng, Chuyến bay, Đặt vé, Thanh toán, Quản trị, Bài viết/Tin tức, và Middleware (JWT, phân quyền). Mỗi test case được trình bày với
các mục: Mã/Tên test case, Mô tả mục tiêu, Môi trường kiểm thử, Dữ liệu đầu vào, Các bước thực hiện, và Kết quả mong đợi. Mục tiêu là đảm bảo bao phủ đầy đủ mọi chức năng: đăng nhập/đăng ký, xác thực JWT, quản lý người dùng, tìm kiếm chuyến bay, đặt vé, hủy vé, chọn ghế, thanh toán, quản lý bài viết, phân quyền admin, cập nhật hồ sơ, đổi mật khẩu, gửi email, kiểm tra trạng thái đặt chỗ...

## Module Auth (Xác thực người dùng: Đăng nhập, Đăng ký, Quên mật khẩu)

**TC-Auth-001: Đăng ký tài khoản mới – thành công
Mô tả mục tiêu:** Xác minh rằng người dùng có thể đăng ký tài khoản mới thành công khi cung cấp
thông tin hợp lệ.
**Môi trường:** Ứng dụng web QAirline (Frontend Next.js React) chạy trên trình duyệt Chrome; Backend
Node.js/Express với cơ sở dữ liệu (ví dụ MongoDB/MySQL) ở môi trường kiểm thử.
**Dữ liệu đầu vào:** Thông tin đăng ký hợp lệ (ví dụ: Email chưa tồn tại, Mật khẩu hợp lệ và trùng khớp xác
nhận, các trường thông tin bắt buộc khác như tên, số điện thoại hợp lệ).
**Các bước thực hiện:**

1. Mở trang đăng ký tài khoản trên giao diện web.
2. Nhập đầy đủ thông tin hợp lệ vào form đăng ký: email (ví dụ user@example.com), mật khẩu (ví dụ
    Password123), nhập lại mật khẩu khớp, và các thông tin cá nhân cần thiết (tên, số điện thoại, ...).
3. Nhấn nút "Đăng ký" (Submit).
**Kết quả mong đợi:**
- Hệ thống tạo tài khoản mới và lưu vào cơ sở dữ liệu.
- Giao diện chuyển hướng người dùng sang trang xác nhận đăng ký hoặc trang đăng nhập.
- Thông báo thành công xuất hiện (ví dụ: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài
khoản." nếu có bước xác thực email, hoặc "Đăng ký thành công, bạn có thể đăng nhập.").
- Một email xác nhận có thể được gửi tới địa chỉ email đã đăng ký (nếu hệ thống yêu cầu xác thực
email).

**TC-Auth-002: Đăng ký tài khoản – thất bại khi email đã tồn tại
Mô tả mục tiêu:** Đảm bảo hệ thống từ chối đăng ký nếu người dùng sử dụng email đã có trong hệ
thống.
**Môi trường:** Frontend Chrome, Backend Node.js/Express với cơ sở dữ liệu chứa sẵn một tài khoản có
email trùng với email sẽ đăng ký.
**Dữ liệu đầu vào:** Thông tin đăng ký với email đã tồn tại (ví dụ: Email user@example.com đã được
đăng ký trước đó, các trường khác hợp lệ).
**Các bước thực hiện:**

1. Mở trang đăng ký tài khoản.
2. Nhập email user@example.com (đã tồn tại trong DB) và các thông tin khác hợp lệ vào form đăng


ký.

3. Nhấn nút "Đăng ký".
**Kết quả mong đợi:**
- Hệ thống không tạo tài khoản mới.
- Trên giao diện, hiển thị thông báo lỗi tại trường email hoặc chung form (ví dụ: **"Email này đã được sử
dụng. Vui lòng sử dụng email khác."** ).
- Người dùng vẫn ở lại trang đăng ký để chỉnh sửa thông tin.

**TC-Auth-003: Đăng ký tài khoản – thất bại khi email không hợp lệ
Mô tả mục tiêu:** Xác minh hệ thống kiểm tra định dạng email và từ chối đăng ký nếu email không đúng
định dạng.
**Môi trường:** Chrome, Backend Node/Express.
**Dữ liệu đầu vào:** Thông tin đăng ký với email không đúng định dạng (ví dụ: user@@example hoặc
chuỗi không có ký tự @ ), các trường khác hợp lệ.
**Các bước thực hiện:**

1. Mở trang đăng ký.
2. Nhập email không hợp lệ (ví dụ: invalid-email) và điền các trường còn lại hợp lệ.
3. Nhấn "Đăng ký".
**Kết quả mong đợi:**
- Hệ thống không gửi yêu cầu đăng ký (frontend sẽ chặn) **hoặc** nếu có gửi, backend cũng sẽ xác thực và
trả lỗi.
- Trên giao diện, hiển thị thông báo lỗi gần trường email (ví dụ: **"Địa chỉ email không hợp lệ."** ).
- Tài khoản không được tạo trong cơ sở dữ liệu.

**TC-Auth-004: Đăng ký tài khoản – thất bại khi mật khẩu và xác nhận mật khẩu không khớp
Mô tả mục tiêu:** Đảm bảo rằng hệ thống kiểm tra tính trùng khớp của mật khẩu và trường xác nhận
mật khẩu khi đăng ký.
**Môi trường:** Chrome, Node.js/Express.
**Dữ liệu đầu vào:** Thông tin đăng ký trong đó mật khẩu và xác nhận mật khẩu khác nhau (ví dụ: mật
khẩu Password123, xác nhận Password124).
**Các bước thực hiện:**

1. Mở form đăng ký.
2. Nhập email hợp lệ, các thông tin khác hợp lệ, nhập mật khẩu và nhập lại mật khẩu không giống nhau.
3. Nhấn "Đăng ký".
**Kết quả mong đợi:**
- Hệ thống phát hiện mật khẩu không khớp và không tạo tài khoản.
- Giao diện hiển thị lỗi tại trường xác nhận mật khẩu (ví dụ: **"Mật khẩu xác nhận không trùng khớp."** ).
- Người dùng phải nhập lại mật khẩu cho khớp trước khi có thể đăng ký thành công.

**TC-Auth-005: Đăng ký tài khoản – thất bại khi thiếu thông tin bắt buộc
Mô tả mục tiêu:** Xác minh rằng hệ thống không cho phép đăng ký nếu người dùng chưa điền đầy đủ
các trường bắt buộc.
**Môi trường:** Chrome, Node.js/Express.
**Dữ liệu đầu vào:** Thông tin đăng ký thiếu một hoặc nhiều trường bắt buộc (ví dụ: bỏ trống email hoặc
mật khẩu).
**Các bước thực hiện:**

1. Mở trang đăng ký.
2. Để trống một số trường bắt buộc (ví dụ: không nhập email hoặc mật khẩu), các trường khác có thể đã
điền.
3. Nhấn "Đăng ký".
**Kết quả mong đợi:**


- Frontend sẽ chặn gửi form và hiển thị thông báo yêu cầu nhập đầy đủ thông tin. Trường bị bỏ trống sẽ
báo lỗi (ví dụ: **"Vui lòng nhập email."** , **"Vui lòng nhập mật khẩu."** ).
- Nếu frontend không chặn và gửi request, backend trả về lỗi yêu cầu không hợp lệ (mã 400) kèm thông
báo lỗi tương ứng.
- Tài khoản mới không được tạo cho đến khi tất cả thông tin bắt buộc được cung cấp hợp lệ.

**TC-Auth-006: Đăng nhập hệ thống – thành công
Mô tả mục tiêu:** Đảm bảo người dùng có thể đăng nhập thành công với thông tin tài khoản hợp lệ và
được cấp JWT để sử dụng các chức năng bảo mật.
**Môi trường:** Trình duyệt Chrome, Backend Node.js/Express với cơ sở dữ liệu chứa sẵn tài khoản người
dùng hợp lệ.
**Dữ liệu đầu vào:** Email và mật khẩu chính xác của tài khoản đã tồn tại (ví dụ: email
user@example.com, mật khẩu Password123).
**Các bước thực hiện:**

1. Mở trang đăng nhập.
2. Nhập email và mật khẩu hợp lệ vào form đăng nhập.
3. Bấm nút "Đăng nhập".
**Kết quả mong đợi:**
- Hệ thống xác thực thông tin và cho phép đăng nhập.
- Giao diện chuyển hướng người dùng vào trang chính hoặc trang dashboard sau khi đăng nhập.
- JWT (JSON Web Token) phiên đăng nhập được tạo ở backend; token này được lưu trữ ở phía client
(trong localStorage hoặc cookie) để sử dụng cho các yêu cầu sau.
- Hiển thị thông báo chào mừng hoặc tên người dùng trên giao diện (ví dụ: "Xin chào, [Tên người
dùng]!").
- Người dùng có thể truy cập các chức năng yêu cầu đăng nhập (ví dụ: đặt vé, xem hồ sơ, v.v.) sau khi
đăng nhập.

**TC-Auth-007: Đăng nhập – thất bại với mật khẩu sai
Mô tả mục tiêu:** Xác minh hệ thống xử lý đúng trường hợp người dùng nhập mật khẩu không đúng
cho tài khoản.
**Môi trường:** Chrome, Backend với tài khoản tồn tại (user@example.com) nhưng sử dụng mật khẩu
sai.
**Dữ liệu đầu vào:** Email hợp lệ của tài khoản (user@example.com) và mật khẩu không đúng (ví dụ:
WrongPass).
**Các bước thực hiện:**

1. Mở trang đăng nhập, nhập email user@example.com và mật khẩu sai.
2. Nhấn "Đăng nhập".
**Kết quả mong đợi:**
- Hệ thống từ chối đăng nhập.
- Giao diện giữ nguyên ở trang đăng nhập và hiện thông báo lỗi (ví dụ: **"Email hoặc mật khẩu không
đúng."** ).
- Không tạo JWT; người dùng không được chuyển vào trang bảo mật.
- Số lần đăng nhập sai có thể được ghi nhận (nếu có tính năng giới hạn, không bắt buộc).
- Tài khoản không bị ảnh hưởng ngoài việc không thể đăng nhập với mật khẩu sai.

**TC-Auth-008: Đăng nhập – thất bại với tài khoản không tồn tại
Mô tả mục tiêu:** Đảm bảo hệ thống thông báo lỗi nếu người dùng cố đăng nhập bằng email chưa đăng
ký.
**Môi trường:** Chrome, Backend có cơ sở dữ liệu **không** chứa email notexist@example.com.
**Dữ liệu đầu vào:** Email không tồn tại (ví dụ: notexist@example.com) và một mật khẩu bất kỳ.
**Các bước thực hiện:**


1. Mở trang đăng nhập.
2. Nhập email notexist@example.com và mật khẩu bất kỳ.
3. Nhấn "Đăng nhập".
**Kết quả mong đợi:**
- Hệ thống không tìm thấy tài khoản, từ chối đăng nhập.
- Giao diện hiển thị thông báo lỗi (ví dụ: **"Tài khoản không tồn tại."** hoặc gộp chung thành **"Email
hoặc mật khẩu không đúng."** để không lộ thông tin).
- Không tạo phiên đăng nhập/JWT.
- Người dùng cần đăng ký tài khoản trước khi có thể đăng nhập.

**TC-Auth-009: Đăng nhập – kiểm tra thông tin bắt buộc (bỏ trống trường)
Mô tả mục tiêu:** Xác minh rằng form đăng nhập kiểm tra nhập liệu và báo lỗi nếu người dùng để trống
email hoặc mật khẩu.
**Môi trường:** Trình duyệt Chrome (frontend validation), Node.js (backend validation nếu có).
**Dữ liệu đầu vào:** Email hoặc mật khẩu trống (ví dụ: email để trống, chỉ nhập mật khẩu, hoặc ngược lại).
**Các bước thực hiện:**

1. Mở trang đăng nhập.
2. Chỉ nhập email hoặc mật khẩu, để trống trường còn lại **hoặc** không nhập gì cả.
3. Nhấn "Đăng nhập".
**Kết quả mong đợi:**
- Trên giao diện, form không gửi yêu cầu đăng nhập khi thông tin chưa đầy đủ.
- Hiển thị thông báo lỗi tương ứng tại các trường bị bỏ trống (ví dụ: **"Vui lòng nhập email."** , **"Vui lòng
nhập mật khẩu."** ).
- Nếu form vẫn gửi request với giá trị trống, backend trả về mã lỗi (400 Bad Request) kèm thông báo lỗi
về trường thiếu.
- Người dùng không thể đăng nhập cho đến khi điền đầy đủ email và mật khẩu.

**TC-Auth-010: Quên mật khẩu – yêu cầu đặt lại mật khẩu (email hợp lệ)
Mô tả mục tiêu:** Đảm bảo chức năng quên mật khẩu hoạt động đúng: chấp nhận email hợp lệ và gửi
email đặt lại mật khẩu cho người dùng.
**Môi trường:** Chrome, Backend với tài khoản có email hợp lệ trong cơ sở dữ liệu và dịch vụ email cấu
hình (SMTP hoặc API email hoạt động trong môi trường test).
**Dữ liệu đầu vào:** Địa chỉ email hợp lệ đã đăng ký tài khoản (ví dụ: user@example.com).
**Các bước thực hiện:**

1. Tại trang đăng nhập, bấm liên kết "Quên mật khẩu".
2. Nhập địa chỉ email user@example.com vào trường yêu cầu đặt lại mật khẩu.
3. Nhấn nút xác nhận gửi yêu cầu đặt lại mật khẩu.
**Kết quả mong đợi:**
- Hệ thống chấp nhận yêu cầu và tạo một mã hoặc token đặt lại mật khẩu (JWT hoặc token đặc biệt) liên
kết với tài khoản email trên.
- Một email được gửi tới user@example.com chứa hướng dẫn đặt lại mật khẩu (bao gồm link có kèm
token đặt lại).
- Giao diện hiển thị thông báo thành công (ví dụ: **"Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra
hộp thư."** ).
- Không tiết lộ thông tin nhạy cảm (dù email có tồn tại hay không, hệ thống có thể luôn báo "Nếu email
tồn tại, chúng tôi sẽ gửi hướng dẫn", nhằm bảo mật).

**TC-Auth-011: Quên mật khẩu – email không tồn tại
Mô tả mục tiêu:** Xác minh hệ thống xử lý khi người dùng nhập email không có trong hệ thống để đặt
lại mật khẩu.
**Môi trường:** Chrome, Backend với cơ sở dữ liệu **không** chứa email được yêu cầu.


**Dữ liệu đầu vào:** Địa chỉ email chưa đăng ký tài khoản (ví dụ: nouser@example.com).
**Các bước thực hiện:**

1. Mở trang "Quên mật khẩu".
2. Nhập email nouser@example.com và gửi yêu cầu đặt lại mật khẩu.
**Kết quả mong đợi:**
- Hệ thống **có thể** hiển thị một thông báo chung (ví dụ: **"Nếu email tồn tại trong hệ thống, chúng tôi
đã gửi hướng dẫn đặt lại mật khẩu."** ) để tránh lộ liệu.
- Không gửi email thực sự (vì email không tồn tại trong DB).
- Nếu hệ thống thiết kế để thông báo rõ lỗi, thì sẽ hiện lỗi (ví dụ: **"Email này chưa được đăng ký."** ).
(Tùy thuộc vào chính sách bảo mật, nhưng thông thường sẽ không phân biệt rõ để tránh đoán email).
- Kết quả cuối cùng: người dùng sẽ không nhận được email nào (vì tài khoản không tồn tại) và cần kiểm
tra lại email đã nhập hoặc đăng ký tài khoản mới.

**TC-Auth-012: Đặt lại mật khẩu – sử dụng liên kết hợp lệ (token hợp lệ)
Mô tả mục tiêu:** Kiểm thử quá trình người dùng đặt lại mật khẩu thông qua liên kết email và token hợp
lệ, đảm bảo mật khẩu được thay đổi thành công.
**Môi trường:** Trình duyệt web (trang đặt lại mật khẩu), Backend Node.js/Express với token đặt lại mật
khẩu hợp lệ và còn hiệu lực trong cơ sở dữ liệu hoặc bộ nhớ.
**Dữ liệu đầu vào:** Mật khẩu mới hợp lệ và xác nhận mật khẩu trùng khớp; token đặt lại mật khẩu hợp lệ
(ví dụ: đường link chứa token như reset?token=abcd1234).
**Các bước thực hiện:**

1. Mở email đã nhận được từ test case TC-Auth-010, click vào đường link đặt lại mật khẩu (ví dụ:
    https://qairline.com/reset-password?token=XYZ...).
2. Giao diện trang đặt lại mật khẩu mở ra, nhập mật khẩu mới (ví dụ: NewPass456) và nhập lại mật
khẩu mới khớp.
3. Nhấn nút xác nhận đổi mật khẩu.
**Kết quả mong đợi:**
- Backend xác nhận token hợp lệ, chưa hết hạn, và khớp với tài khoản người dùng tương ứng.
- Mật khẩu của tài khoản được cập nhật trong cơ sở dữ liệu (thường dưới dạng đã mã hóa).
- Giao diện thông báo đổi mật khẩu thành công (ví dụ: **"Mật khẩu của bạn đã được cập nhật. Vui lòng
đăng nhập với mật khẩu mới."** ).
- Token đặt lại mật khẩu có thể bị vô hiệu hóa sau khi sử dụng một lần (không thể dùng lại).
- Người dùng có thể sử dụng mật khẩu mới để đăng nhập (các lần đăng nhập sau đó với mật khẩu cũ sẽ
thất bại).

**TC-Auth-013: Đặt lại mật khẩu – thất bại với token không hợp lệ hoặc hết hạn
Mô tả mục tiêu:** Đảm bảo hệ thống từ chối yêu cầu đặt lại mật khẩu nếu token không hợp lệ hoặc đã
hết hạn, giữ an toàn cho tài khoản.
**Môi trường:** Trình duyệt (trang đặt lại mật khẩu), Backend với token không hợp lệ/hết hạn.
**Dữ liệu đầu vào:** Mật khẩu mới và xác nhận (có thể hợp lệ) nhưng token đặt lại mật khẩu không hợp lệ
hoặc đã quá hạn.
**Các bước thực hiện:**

1. Mở trang đặt lại mật khẩu thông qua một đường link không hợp lệ hoặc token đã cũ (ví dụ: tự thay
đổi vài ký tự của token trong URL, hoặc sử dụng link sau 24h khi token hết hạn).
2. Nhập mật khẩu mới và xác nhận, nhấn xác nhận đổi mật khẩu.
**Kết quả mong đợi:**
- Backend phát hiện token không hợp lệ hoặc đã hết hạn, từ chối yêu cầu đổi mật khẩu.
- Giao diện hiện thông báo lỗi (ví dụ: **"Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng thực hiện yêu
cầu quên mật khẩu lại."** ).
- Mật khẩu trong hệ thống **không** bị thay đổi.
- Người dùng được hướng dẫn quay lại màn hình "Quên mật khẩu" để gửi yêu cầu mới nếu cần.


**TC-Auth-014: Đăng xuất – thành công
Mô tả mục tiêu:** Xác minh người dùng có thể đăng xuất khỏi hệ thống, kết thúc phiên đăng nhập và
không còn quyền truy cập các chức năng bảo mật nữa.
**Môi trường:** Trình duyệt Chrome (đã đăng nhập), Backend Node.js/Express.
**Dữ liệu đầu vào:** (Không có dữ liệu form, chỉ thao tác đăng xuất) – người dùng đang trong trạng thái đã
đăng nhập với JWT hợp lệ lưu trên trình duyệt.
**Các bước thực hiện:**

1. Khi đang đăng nhập, nhấp vào nút/đường dẫn "Đăng xuất" trên giao diện ứng dụng (ví dụ ở menu tài
khoản).
2. Xác nhận đăng xuất nếu có yêu cầu xác nhận.
**Kết quả mong đợi:**
- Hệ thống xóa thông tin phiên đăng nhập phía client: JWT bị xóa khỏi storage hoặc cookie bị xóa/hết
hạn.
- Phía server, do sử dụng JWT stateless, không có phiên lưu trên server; nếu hệ thống có duy trì danh
sách token hợp lệ, token này có thể bị đưa vào blacklist. (Nếu không có, bỏ qua bước này).
- Giao diện chuyển hướng về trang chủ hoặc trang đăng nhập. Người dùng thấy thông báo (ví dụ: **"Bạn
đã đăng xuất thành công."** ).
- Người dùng sau đó truy cập lại các trang yêu cầu đăng nhập sẽ bị yêu cầu đăng nhập lại (đảm bảo
phiên đã kết thúc thật sự).

## Module User (Quản lý người dùng: Hồ sơ cá nhân, Đổi mật khẩu)

**TC-User-001: Xem thông tin hồ sơ cá nhân – thành công
Mô tả mục tiêu:** Đảm bảo người dùng đã đăng nhập có thể truy cập trang hồ sơ cá nhân và xem đầy đủ
thông tin của mình.
**Môi trường:** Frontend Next.js (Chrome), Backend Node.js với tài khoản người dùng đã đăng nhập (JWT
hợp lệ).
**Dữ liệu đầu vào:** Token đăng nhập của người dùng (JWT) gửi kèm trong yêu cầu tải trang hồ sơ.
**Các bước thực hiện:**

1. Đăng nhập vào hệ thống (thực hiện thành công bước đăng nhập, ví dụ như TC-Auth-006).
2. Tại giao diện, nhấp vào tên người dùng hoặc menu và chọn "Hồ sơ" (Profile).
3. Trang hồ sơ cá nhân được mở.
**Kết quả mong đợi:**
- Backend xác thực JWT, cho phép truy xuất thông tin người dùng.
- Giao diện hiển thị các thông tin hồ sơ: ví dụ họ tên, email, số điện thoại, địa chỉ, ảnh đại diện (nếu có),
các thông tin khác của tài khoản.
- Dữ liệu hiển thị đúng với thông tin từ cơ sở dữ liệu của tài khoản hiện tại.
- Không hiển thị thông tin nhạy cảm như mật khẩu.
- Giao diện cung cấp tùy chọn để chỉnh sửa hồ sơ (nếu có chức năng).

**TC-User-002: Truy cập trang hồ sơ khi chưa đăng nhập – bị chuyển hướng
Mô tả mục tiêu:** Xác minh hệ thống không cho phép truy cập hồ sơ người dùng nếu chưa đăng nhập
(bảo vệ bởi xác thực JWT).
**Môi trường:** Trình duyệt web (chưa đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** Không có JWT/ thông tin đăng nhập trong yêu cầu (người dùng chưa đăng nhập).
**Các bước thực hiện:**

1. Mở trực tiếp đường dẫn trang hồ sơ người dùng (ví dụ: /profile) trên trình duyệt mà **không** đăng
nhập trước.
**Kết quả mong đợi:**


- Backend nhận yêu cầu không có token xác thực, trả về mã lỗi 401 Unauthorized (ở cấp API).
- Frontend phát hiện trạng thái chưa đăng nhập, tự động chuyển hướng người dùng về trang đăng
nhập.
- Người dùng thấy trang đăng nhập và có thể thấy thông báo yêu cầu đăng nhập (ví dụ: **"Vui lòng đăng
nhập để tiếp tục."** ).
- Trang hồ sơ **không** hiển thị nếu chưa đăng nhập.

**TC-User-003: Chỉnh sửa hồ sơ cá nhân – thành công
Mô tả mục tiêu:** Đảm bảo người dùng có thể cập nhật thông tin hồ sơ của mình với dữ liệu hợp lệ và
thay đổi được lưu lại thành công.
**Môi trường:** Chrome (đã đăng nhập), Backend Node.js/Express kết nối cơ sở dữ liệu.
**Dữ liệu đầu vào:** Thông tin hồ sơ mới hợp lệ (ví dụ: tên mới, số điện thoại mới hợp lệ, địa chỉ, ảnh đại
diện mới nếu cho phép).
**Các bước thực hiện:**

1. Đăng nhập và truy cập trang "Chỉnh sửa hồ sơ" (thường từ trang hồ sơ bấm "Chỉnh sửa" hoặc một
trang riêng).
2. Thay đổi một số thông tin, ví dụ: cập nhật tên hiển thị, số điện thoại, địa chỉ, hoặc upload ảnh đại diện
mới (nếu có tính năng).
3. Nhấn nút "Lưu" hoặc "Cập nhật" trên form.
**Kết quả mong đợi:**
- Hệ thống kiểm tra các thông tin mới hợp lệ và chấp nhận cập nhật.
- Backend lưu các thông tin thay đổi vào cơ sở dữ liệu.
- Giao diện thông báo cập nhật thành công (ví dụ: **"Hồ sơ của bạn đã được cập nhật."** ).
- Trang hồ sơ hiển thị lại với các thông tin vừa được cập nhật (tên, số điện thoại, ... phải hiển thị giá trị
mới).
- Dữ liệu mới cũng sẽ xuất hiện khi người dùng đăng xuất và đăng nhập lại hoặc trong các phần khác
của ứng dụng (ví dụ tên hiển thị mới ở góc màn hình).

**TC-User-004: Chỉnh sửa hồ sơ cá nhân – thất bại do thiếu hoặc sai định dạng thông tin
Mô tả mục tiêu:** Xác minh hệ thống không cho phép cập nhật hồ sơ nếu thông tin cung cấp không hợp
lệ hoặc bỏ trống các trường bắt buộc.
**Môi trường:** Chrome (đã đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** Thông tin cập nhật không hợp lệ, ví dụ: để trống các trường bắt buộc (họ tên, email
nếu cho phép thay đổi) hoặc định dạng sai (nhập số điện thoại chứa ký tự chữ, email không hợp lệ, v.v.).
**Các bước thực hiện:**

1. Vào trang "Chỉnh sửa hồ sơ" khi đã đăng nhập.
2. Xóa nội dung của một trường bắt buộc (ví dụ: xóa họ tên hoặc để trống số điện thoại), **hoặc** nhập giá
trị không hợp lệ (vd: số điện thoại nhập "abc123").
3. Bấm "Lưu/Cập nhật".
**Kết quả mong đợi:**
- Frontend kiểm tra và chặn gửi nếu thông tin không hợp lệ, hiển thị thông báo lỗi tại trường tương ứng
(vd: **"Họ tên không được để trống."** , **"Số điện thoại không hợp lệ."** ).
- Nếu frontend không bắt hết và request gửi lên server, backend từ chối cập nhật, trả về lỗi (400 Bad
Request) kèm thông báo lỗi.
- Giao diện hiển thị thông báo lỗi từ server nếu có (ví dụ: **"Cập nhật thất bại: định dạng email không
hợp lệ."** ).
- Thông tin hồ sơ trong cơ sở dữ liệu không thay đổi. Người dùng phải sửa lại dữ liệu cho đúng rồi mới
lưu được.

**TC-User-005: Đổi mật khẩu tài khoản – thành công
Mô tả mục tiêu:** Đảm bảo người dùng có thể đổi mật khẩu của mình khi cung cấp đúng mật khẩu hiện


tại và mật khẩu mới hợp lệ.
**Môi trường:** Trình duyệt (đã đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** Mật khẩu hiện tại đúng, mật khẩu mới thỏa yêu cầu (độ dài, ký tự) và xác nhận mật
khẩu mới khớp.
**Các bước thực hiện:**

1. Đăng nhập và truy cập chức năng "Đổi mật khẩu" (có thể trên trang hồ sơ hoặc trang riêng).
2. Nhập mật khẩu hiện tại (ví dụ: Password123), nhập mật khẩu mới (ví dụ: NewPass456), nhập lại
mật khẩu mới khớp.
3. Nhấn "Đổi mật khẩu".
**Kết quả mong đợi:**
- Backend xác thực mật khẩu hiện tại chính xác cho tài khoản.
- Nếu đúng, hệ thống cập nhật mật khẩu mới (đã mã hóa) cho tài khoản trong CSDL.
- Giao diện thông báo đổi mật khẩu thành công (ví dụ: **"Mật khẩu đã được thay đổi thành công."** ).
- (Tùy chính sách bảo mật) Có thể hệ thống đăng xuất người dùng khỏi tất cả phiên và yêu cầu đăng
nhập lại bằng mật khẩu mới. Nếu vậy, sau khi đổi sẽ chuyển đến trang đăng nhập. Nếu không, người
dùng có thể tiếp tục phiên cũ nhưng lần đăng nhập sau phải dùng mật khẩu mới.
- Người dùng đăng nhập lần kế tiếp bằng mật khẩu mới sẽ thành công; mật khẩu cũ sẽ không còn hiệu
lực.

**TC-User-006: Đổi mật khẩu – thất bại do mật khẩu hiện tại không chính xác
Mô tả mục tiêu:** Xác minh hệ thống không cho phép đổi mật khẩu nếu người dùng nhập sai mật khẩu
hiện tại, bảo đảm chỉ chủ tài khoản mới thay đổi được mật khẩu.
**Môi trường:** Chrome (đã đăng nhập), Backend Node.js với tài khoản có mật khẩu hiện tại đã biết.
**Dữ liệu đầu vào:** Mật khẩu hiện tại **không đúng** , mật khẩu mới hợp lệ, xác nhận mật khẩu mới khớp.
**Các bước thực hiện:**

1. Mở form "Đổi mật khẩu".
2. Nhập mật khẩu hiện tại sai (ví dụ: WrongPassword), nhập mật khẩu mới và xác nhận (ví dụ:
    NewPass456, NewPass456).
3. Nhấn "Đổi mật khẩu".
**Kết quả mong đợi:**
- Backend so sánh mật khẩu hiện tại thấy không khớp, từ chối đổi mật khẩu.
- Giao diện hiển thị thông báo lỗi (ví dụ: **"Mật khẩu hiện tại không đúng."** ).
- Mật khẩu trong cơ sở dữ liệu **không thay đổi**.
- Người dùng vẫn ở trang đổi mật khẩu để thử lại. Sau lỗi, nếu người dùng nhập đúng mật khẩu hiện tại
và hợp lệ các trường khác mới có thể đổi thành công.

**TC-User-007: Đổi mật khẩu – thất bại do xác nhận mật khẩu mới không khớp
Mô tả mục tiêu:** Đảm bảo rằng người dùng phải nhập đúng trùng khớp mật khẩu mới và xác nhận thì
mới đổi được mật khẩu, tránh sai sót khi nhập.
**Môi trường:** Chrome (đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** Mật khẩu hiện tại đúng, mật khẩu mới và xác nhận không giống nhau (ví dụ:
NewPass456 và NewPass457).
**Các bước thực hiện:**

1. Truy cập form "Đổi mật khẩu".
2. Nhập mật khẩu hiện tại chính xác.
3. Nhập mật khẩu mới và xác nhận mật khẩu mới **không** trùng nhau.
4. Nhấn "Đổi mật khẩu".
**Kết quả mong đợi:**
- Frontend phát hiện hai trường mật khẩu mới không trùng khớp, chặn yêu cầu đổi mật khẩu, hiển thị
lỗi (ví dụ: **"Xác nhận mật khẩu mới không khớp."** ).
- Nếu frontend không chặn, backend cũng sẽ kiểm tra và trả lỗi nếu hai giá trị không khớp.


- Mật khẩu không được thay đổi.
- Người dùng phải nhập lại khớp hai trường mật khẩu mới rồi mới thực hiện lại việc đổi mật khẩu.

## Module Flight (Quản lý Chuyến bay: Tìm kiếm, Xem chi tiết, Thêm/Sửa/Xóa chuyến bay)

**TC-Flight-001: Tìm kiếm chuyến bay – có kết quả
Mô tả mục tiêu:** Đảm bảo chức năng tìm kiếm chuyến bay trả về danh sách chuyến bay phù hợp khi
người dùng nhập tiêu chí hợp lệ và có chuyến bay tương ứng trong hệ thống.
**Môi trường:** Giao diện web (trang tìm kiếm chuyến bay) trên Chrome; Backend Node.js/Express kết nối
CSDL đã có dữ liệu các chuyến bay.
**Dữ liệu đầu vào:** Tiêu chí tìm kiếm hợp lệ, ví dụ: **điểm đi** (Sân bay A), **điểm đến** (Sân bay B), **ngày bay**
cụ thể trong tương lai, số lượng hành khách (nếu có tùy chọn).
**Các bước thực hiện:**

1. Mở trang chủ hoặc trang "Tìm kiếm chuyến bay".
2. Nhập thông tin tìm kiếm: chọn sân bay đi, sân bay đến từ các danh sách; chọn ngày khởi hành; (nếu
có, chọn số lượng hành khách, hạng vé...).
3. Nhấn nút "Tìm chuyến bay".
**Kết quả mong đợi:**
- Hệ thống truy vấn CSDL và tìm các chuyến bay khớp với tiêu chí (đúng điểm đi, điểm đến, ngày bay).
- Nếu có chuyến bay phù hợp, giao diện hiển thị danh sách các chuyến bay kết quả: mỗi chuyến bay
hiển thị thông tin như mã chuyến bay, giờ khởi hành, giờ đến, hãng bay (nếu có), giá vé, số chỗ còn
trống,...
- Số lượng kết quả hiển thị đúng (ví dụ: nếu có 2 chuyến bay thỏa, danh sách hiển thị 2 mục).
- Người dùng có thể chọn một chuyến bay từ danh sách (nhấn "Đặt vé" hoặc "Xem chi tiết").
- Thời gian phản hồi tìm kiếm hợp lý (trong khoảng vài giây).

**TC-Flight-002: Tìm kiếm chuyến bay – không có kết quả
Mô tả mục tiêu:** Kiểm tra rằng hệ thống xử lý tốt trường hợp không tìm thấy chuyến bay nào khớp với
tiêu chí và thông báo rõ ràng cho người dùng.
**Môi trường:** Chrome, Backend có dữ liệu chuyến bay nhưng không có chuyến nào phù hợp tiêu chí đưa
ra.
**Dữ liệu đầu vào:** Tiêu chí tìm kiếm hợp lệ nhưng không trùng với chuyến bay nào (ví dụ: tuyến bay
hoặc ngày bay không có trong cơ sở dữ liệu).
**Các bước thực hiện:**

1. Mở trang tìm kiếm chuyến bay.
2. Nhập thông tin tìm kiếm không trùng khớp chuyến bay nào (ví dụ: Điểm đi X, Điểm đến Y vào một
ngày mà hệ thống không có chuyến bay nào).
3. Nhấn "Tìm chuyến bay".
**Kết quả mong đợi:**
- Backend truy vấn không tìm thấy bản ghi nào.
- Giao diện hiển thị thông báo hoặc trạng thái "Không tìm thấy chuyến bay phù hợp."
- Có thể hiển thị gợi ý cho người dùng (ví dụ: thử ngày khác hoặc tuyến khác) nếu đó là tính năng bổ
sung.
- Danh sách kết quả trống, không có mục chuyến bay nào. Giao diện không bị vỡ.
- Người dùng có thể thay đổi tiêu chí và tìm lại.

**TC-Flight-003: Tìm kiếm chuyến bay – thiếu thông tin bắt buộc
Mô tả mục tiêu:** Xác minh form tìm kiếm kiểm tra đầu vào và yêu cầu người dùng nhập các trường bắt


buộc (đặc biệt là điểm đi, điểm đến, ngày bay) trước khi tìm kiếm.
**Môi trường:** Trình duyệt web (form tìm kiếm), backend Node (sẽ không thực hiện tìm kiếm nếu dữ liệu
thiếu).
**Dữ liệu đầu vào:** Bộ tiêu chí không đầy đủ, ví dụ: chỉ chọn điểm đi mà không chọn điểm đến, hoặc
không chọn ngày bay.
**Các bước thực hiện:**

1. Mở form tìm kiếm chuyến bay.
2. Chỉ điền một phần thông tin, ví dụ: chọn điểm đi nhưng không chọn điểm đến, hoặc bỏ trống ngày
khởi hành.
3. Bấm "Tìm chuyến bay".
**Kết quả mong đợi:**
- Frontend kiểm tra và phát hiện thông tin chưa đủ, không gửi yêu cầu tìm kiếm.
- Hiển thị thông báo lỗi cạnh các trường bỏ trống (ví dụ: **"Vui lòng chọn điểm đến."** , **"Vui lòng chọn
ngày khởi hành."** ).
- Người dùng không thể tiến hành tìm kiếm cho đến khi điền đủ các trường bắt buộc.
- Nếu frontend không chặn và request gửi lên server với dữ liệu thiếu, server trả về mã lỗi (400) hoặc
danh sách rỗng kèm thông báo lỗi input. Nhưng thông thường, phần này được xử lý ở giao diện.

**TC-Flight-004: Xem chi tiết chuyến bay – thành công
Mô tả mục tiêu:** Đảm bảo người dùng có thể xem thông tin chi tiết của một chuyến bay cụ thể từ kết
quả tìm kiếm.
**Môi trường:** Trình duyệt (đang ở trang kết quả tìm kiếm hoặc trang danh sách chuyến bay), Backend
Node.js có thông tin chi tiết chuyến bay.
**Dữ liệu đầu vào:** ID hoặc mã chuyến bay hợp lệ (đại diện cho chuyến bay muốn xem), thường được
nhúng trong link hoặc nút chi tiết.
**Các bước thực hiện:**

1. Thực hiện tìm kiếm chuyến bay (vd TC-Flight-001) để có danh sách kết quả.
2. Trong danh sách kết quả, chọn một chuyến bay cụ thể và nhấp "Xem chi tiết" hoặc vào mã chuyến
bay đó. (Hoặc truy cập trực tiếp URL chi tiết chuyến bay nếu biết).
**Kết quả mong đợi:**
- Backend nhận yêu cầu với ID chuyến bay, truy xuất thông tin chi tiết: lộ trình, thời gian khởi hành/đến,
máy bay, hạng vé, sơ đồ ghế, giá vé, số chỗ còn lại, các điều kiện vé (nếu có)...
- Giao diện hiển thị trang chi tiết chuyến bay với đầy đủ các thông tin trên.
- Người dùng thấy nút "Đặt vé" hoặc lựa chọn ghế trên trang chi tiết.
- Nếu chuyến bay sắp hết chỗ, có thể hiển thị cảnh báo (ví dụ: "Chỉ còn X ghế trống").
- Không có lỗi xảy ra, thông tin đúng với dữ liệu trong CSDL.

**TC-Flight-005: Xem chi tiết chuyến bay – không tồn tại
Mô tả mục tiêu:** Kiểm tra ứng xử của hệ thống khi người dùng cố xem một chuyến bay không tồn tại
hoặc sai ID.
**Môi trường:** Trình duyệt (URL chi tiết chuyến bay), Backend với không có bản ghi ứng với ID đó.
**Dữ liệu đầu vào:** ID chuyến bay không có trong cơ sở dữ liệu (ví dụ: URL chứa flightId không hợp
lệ hoặc đã bị xóa).
**Các bước thực hiện:**

1. Thử truy cập trực tiếp đường dẫn chi tiết chuyến bay với một ID giả mạo hoặc đã bị xóa (ví dụ: /
flights/99999).
**Kết quả mong đợi:**
- Backend tìm kiếm chuyến bay theo ID, không tìm thấy kết quả.
- Trả về mã lỗi thích hợp (404 Not Found).
- Frontend hiển thị trang thông báo lỗi hoặc chuyển hướng sang trang không tìm thấy. Ví dụ: hiển thị
thông báo **"Chuyến bay không tồn tại hoặc đã bị hủy."**


- Giao diện có thể đưa tùy chọn quay lại trang tìm kiếm hoặc trang chủ cho người dùng.
- Không hiển thị bất kỳ thông tin rỗng hay gây hiểu nhầm nào.

**TC-Flight-006: Thêm chuyến bay (Admin) – thành công
Mô tả mục tiêu:** Đảm bảo quản trị viên có thể thêm một chuyến bay mới với thông tin hợp lệ và hệ
thống lưu trữ thành công.
**Môi trường:** Trình duyệt (đăng nhập bằng tài khoản Admin, giao diện quản trị thêm chuyến bay),
Backend Node.js/Express, CSDL có quyền ghi.
**Dữ liệu đầu vào:** Thông tin chuyến bay mới hợp lệ, bao gồm: mã chuyến bay (độc nhất), sân bay đi, sân
bay đến, ngày giờ khởi hành, ngày giờ đến, máy bay (hoặc loại máy bay), tổng số ghế, giá vé, v.v.
**Các bước thực hiện:**

1. Đăng nhập bằng tài khoản Admin (đảm bảo có quyền quản trị).
2. Điều hướng đến trang quản trị "Quản lý chuyến bay" và chọn chức năng "Thêm chuyến bay mới".
3. Nhập đầy đủ các thông tin chuyến bay vào form thêm chuyến bay (ví dụ: Điểm đi: HAN, Điểm đến:
SGN, Ngày giờ cất cánh: 01/12/2025 08:00, Ngày giờ hạ cánh: 01/12/2025 10:00, Máy bay: Airbus A320,
Số ghế: 180, Giá: 1,500,000 VND, ...).
4. Nhấn "Lưu" hoặc "Thêm mới".
**Kết quả mong đợi:**
- Backend kiểm tra tính hợp lệ (các trường không được bỏ trống, mã chuyến bay chưa tồn tại, thời gian
hợp lý, ...), sau đó lưu chuyến bay mới vào cơ sở dữ liệu.
- Giao diện thông báo thêm thành công (ví dụ: **"Đã thêm chuyến bay mới thành công."** ).
- Danh sách chuyến bay trong trang quản trị cập nhật bao gồm chuyến bay vừa thêm (các thông tin
hiển thị đúng như đã nhập).
- Quản trị viên (và người dùng trong tìm kiếm) có thể thấy chuyến bay mới khi tìm kiếm với tiêu chí phù
hợp.
- Hệ thống tạo ID duy nhất cho chuyến bay (nếu dùng ID tự tăng) và không xảy ra lỗi.

**TC-Flight-007: Thêm chuyến bay (Admin) – thất bại do thiếu thông tin hoặc trùng mã
Mô tả mục tiêu:** Xác minh hệ thống không cho phép thêm chuyến bay mới nếu thông tin không đầy đủ
hoặc vi phạm tính duy nhất (ví dụ trùng mã chuyến bay).
**Môi trường:** Trình duyệt (tài khoản Admin), Backend Node.js.
**Dữ liệu đầu vào:** Thông tin chuyến bay mới **không hợp lệ** : bỏ trống một số trường bắt buộc (vd không
nhập mã chuyến bay hoặc thời gian) **hoặc** nhập mã chuyến bay trùng với một chuyến bay đã có.
**Các bước thực hiện:**

1. Đăng nhập Admin và mở form "Thêm chuyến bay".
2. Trường hợp 1: Để trống một trường bắt buộc (ví dụ: bỏ trống mã chuyến bay hoặc không chọn ngày
giờ).
3. Trường hợp 2: Nhập tất cả thông tin nhưng sử dụng mã chuyến bay trùng với chuyến bay đã tồn tại
(ví dụ: dùng lại mã "VN123" đã có).
4. Bấm "Thêm mới".
**Kết quả mong đợi:**
- Trường hợp 1 (thiếu thông tin): Frontend hiển thị lỗi yêu cầu nhập đầy đủ (ví dụ: **"Mã chuyến bay là
bắt buộc."** , **"Chưa chọn thời gian khởi hành."** ). Không gửi request khi form còn lỗi.
- Trường hợp 2 (trùng mã): Backend phát hiện mã trùng, trả về lỗi (ví dụ: mã 400 hoặc 409 Conflict). Giao
diện hiển thị thông báo lỗi (ví dụ: **"Mã chuyến bay đã tồn tại, vui lòng dùng mã khác."** ).
- Chuyến bay không được thêm vào cơ sở dữ liệu.
- Quản trị viên cần điều chỉnh thông tin đúng rồi mới thêm lại.

**TC-Flight-008: Sửa thông tin chuyến bay (Admin) – thành công
Mô tả mục tiêu:** Đảm bảo admin có thể chỉnh sửa thông tin của chuyến bay đã tồn tại và lưu thay đổi
thành công.


**Môi trường:** Trình duyệt (Admin đăng nhập, trang quản lý chuyến bay), Backend Node.js với CSDL có
chuyến bay cần chỉnh sửa.
**Dữ liệu đầu vào:** Thông tin chuyến bay được cập nhật hợp lệ (ví dụ: thay đổi giờ bay, giá vé hoặc trạng
thái).
**Các bước thực hiện:**

1. Đăng nhập bằng tài khoản Admin, mở trang danh sách quản lý chuyến bay.
2. Chọn một chuyến bay cụ thể cần chỉnh sửa, nhấp nút "Sửa" (Edit) tương ứng chuyến bay đó.
3. Thay đổi một số thông tin trong form chỉnh sửa (ví dụ: cập nhật giờ khởi hành mới, tăng giá vé, v.v.).
4. Nhấn "Lưu" để cập nhật.
**Kết quả mong đợi:**
- Backend nhận yêu cầu cập nhật, kiểm tra các trường hợp: các thông tin mới hợp lệ (ví dụ: thời gian
khởi hành mới không trước thời gian hiện tại, mã chuyến bay không đổi hoặc nếu đổi thì không trùng),
v.v.
- Thay đổi được lưu vào CSDL thành công.
- Giao diện thông báo cập nhật thành công (vd: **"Cập nhật chuyến bay thành công."** ).
- Trang danh sách chuyến bay hiển thị thông tin mới (ví dụ: giờ bay, giá vé được thay đổi theo dữ liệu
mới).
- Người dùng khi tìm kiếm hoặc xem chi tiết sẽ thấy thông tin chuyến bay cập nhật mới nhất.

**TC-Flight-009: Sửa thông tin chuyến bay (Admin) – thất bại do dữ liệu không hợp lệ
Mô tả mục tiêu:** Xác minh hệ thống không lưu thay đổi nếu admin nhập dữ liệu không hợp lệ khi chỉnh
sửa chuyến bay (ví dụ: thời gian không hợp lệ, bỏ trống trường cần thiết).
**Môi trường:** Chrome (Admin đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** Thông tin chuyến bay cập nhật **không hợp lệ** (ví dụ: bỏ trống điểm đến, đặt giờ đến
sớm hơn giờ đi, hoặc nhập ký tự không hợp lệ vào trường giá vé).
**Các bước thực hiện:**

1. Admin mở form chỉnh sửa của một chuyến bay.
2. Thay đổi thông tin nhưng nhập giá trị không hợp lệ (vd: để trống trường Điểm đến, hoặc nhập giờ hạ
cánh thành thời điểm trước giờ cất cánh).
3. Nhấn "Lưu".
**Kết quả mong đợi:**
- Frontend kiểm tra và ngăn lưu nếu phát hiện lỗi hiển nhiên (ví dụ: trường bắt buộc bỏ trống sẽ báo
**"Trường này không được để trống."** ; nếu có logic kiểm tra thời gian, có thể kiểm ngay hoặc để
backend xử lý).
- Nếu request gửi lên, backend xác thực và từ chối cập nhật nếu dữ liệu vi phạm (vd: trả về lỗi 400 với
thông báo **"Dữ liệu không hợp lệ: Giờ đến phải sau giờ đi."** ).
- Giao diện hiển thị thông báo lỗi và **không** cập nhật thông tin trong danh sách.
- Dữ liệu chuyến bay trong CSDL giữ nguyên như trước khi chỉnh sửa.

**TC-Flight-010: Xóa chuyến bay (Admin) – thành công
Mô tả mục tiêu:** Đảm bảo quản trị viên có thể xóa một chuyến bay khỏi hệ thống một cách thành công
khi cần thiết.
**Môi trường:** Trình duyệt (Admin), Backend Node.js với CSDL có chuyến bay được chọn để xóa.
**Dữ liệu đầu vào:** ID chuyến bay hợp lệ cần xóa (chuyến bay không còn cần thiết hoặc nhập sai).
**Các bước thực hiện:**

1. Đăng nhập Admin và vào trang quản lý danh sách chuyến bay.
2. Chọn một chuyến bay mục tiêu, nhấn nút "Xóa" (Delete) tương ứng chuyến bay đó.
3. Xác nhận việc xóa khi có hộp thoại hỏi lại (nếu có).
**Kết quả mong đợi:**
- Backend nhận yêu cầu xóa, kiểm tra quyền Admin (được phép xóa).
- Hệ thống xóa bản ghi chuyến bay khỏi cơ sở dữ liệu (cùng các thông tin liên quan như đặt chỗ liên


quan nếu có chính sách xóa cascade hoặc yêu cầu thêm).

- Giao diện thông báo xóa thành công (ví dụ: **"Chuyến bay đã được xóa."** ).
- Danh sách chuyến bay không còn hiển thị chuyến vừa xóa.
- Nếu người dùng từng thấy chuyến bay đó, bây giờ tìm kiếm sẽ không còn kết quả chứa chuyến bay đó
nữa.
- (Trường hợp có đặt vé gắn với chuyến bay đó, tùy yêu cầu hệ thống: có thể không cho xóa nếu đã có
người đặt; nhưng nếu cho xóa, thì các đặt vé đó cần được xử lý - tuy nhiên test này chỉ focus xóa thành
công khi hợp lệ).

**TC-Flight-011: Xóa chuyến bay (Admin) – thất bại
Mô tả mục tiêu:** Kiểm tra các tình huống quản trị viên không thể xóa chuyến bay, chẳng hạn do chuyến
bay không tồn tại hoặc có ràng buộc dữ liệu, hoặc người dùng không có quyền.
**Môi trường:** Chrome (Admin hoặc user thường trong các trường hợp khác nhau), Backend Node.js.
**Dữ liệu đầu vào:**

- Trường hợp A: ID chuyến bay không tồn tại (ví dụ: admin cố xóa một ID không có trong DB).
- Trường hợp B: Tài khoản **không** phải admin cố gọi xóa chuyến bay.
- (Trường hợp C: Chuyến bay đã có người đặt, hệ thống quy định không cho xóa – nếu áp dụng logic
này).
**Các bước thực hiện:**
1. **Trường hợp A:** Admin đăng nhập, gửi yêu cầu xóa chuyến bay với ID giả mạo (có thể bằng cách thay
đổi URL hoặc ID trên giao diện nếu không có trong danh sách).
2. **Trường hợp B:** Người dùng thường (không phải admin) đăng nhập, cố gắng truy cập giao diện quản
lý chuyến bay hoặc gọi API xóa chuyến bay (bằng cách giả mạo request).
3. **(Trường hợp C:** Admin cố xóa một chuyến bay đã có vé đặt – nếu hệ thống chặn).
**Kết quả mong đợi:**
- Trường hợp A (ID không tồn tại): Backend không tìm thấy chuyến bay để xóa, trả về mã lỗi 404. Giao
diện thông báo lỗi (vd: **"Chuyến bay không tồn tại."** ) và không thay đổi danh sách.
- Trường hợp B (user thường): Backend kiểm tra JWT thấy quyền user, trả về 403 Forbidden. Giao diện
không thực hiện hành động gì hoặc hiển thị thông báo **"Bạn không có quyền thực hiện chức năng
này."**.
- (Trường hợp C: Nếu áp dụng, backend trả lỗi (vd 400 hoặc 409) với thông báo **"Không thể xóa chuyến
bay đã có người đặt vé."** ; giao diện thông báo tương tự).
- Kết quả: Chuyến bay không bị xóa trong mọi trường hợp trên. Hệ thống an toàn trước thao tác không
hợp lệ.

## Module Booking (Quản lý Đặt vé: Tạo đặt chỗ, Hủy đặt chỗ, Chọn ghế, Kiểm tra đặt chỗ)

**TC-Booking-001: Đặt vé máy bay – thành công
Mô tả mục tiêu:** Xác minh người dùng có thể đặt vé thành công cho một chuyến bay còn chỗ, bao gồm
chọn ghế và tạo mã đặt chỗ.
**Môi trường:** Trình duyệt Chrome (người dùng đã đăng nhập), Backend Node.js/Express, CSDL có
chuyến bay với ghế trống.
**Dữ liệu đầu vào:** Thông tin đặt vé: chuyến bay đã chọn, ghế muốn đặt, thông tin hành khách (lấy từ hồ
sơ người dùng hoặc nhập).
**Các bước thực hiện:**

1. Đăng nhập vào hệ thống (nếu chưa).
2. Tìm kiếm và chọn một chuyến bay cụ thể (theo TC-Flight-001/004).
3. Tại trang chi tiết chuyến bay, nhấp "Đặt vé" hoặc "Chọn ghế".


4. Trong giao diện chọn ghế, chọn 1 ghế còn trống (ví dụ: ghế 12A).
5. Nhấn xác nhận đặt chỗ và tiến hành thanh toán (nếu quy trình yêu cầu thanh toán ngay, có thể tích
hợp TC-Payment-001 trong bước này, hoặc nếu thanh toán sau thì kết thúc đặt chỗ tại đây).
**Kết quả mong đợi:**
- Hệ thống kiểm tra người dùng đã đăng nhập (nếu chưa thì phải chuyển đến bước đăng nhập trước khi
cho đặt vé).
- Ghế 12A được tạm thời giữ trong quá trình đặt. Backend tạo một bản ghi đặt chỗ với trạng thái ban
đầu (ví dụ: "Chờ thanh toán" nếu chưa trả tiền, hoặc "Đã xác nhận" nếu thanh toán ngay).
- Mã đặt chỗ (PNR) duy nhất được sinh ra cho giao dịch đặt vé này.
- Giao diện thông báo đặt vé thành công, hiển thị mã đặt chỗ và chi tiết vé (ví dụ: **"Đặt vé thành công!
Mã đặt chỗ của bạn là ABC123. Vui lòng thanh toán trước ... để giữ chỗ."** nếu chưa thanh toán, hoặc
**"Đặt vé thành công! Vé của bạn đã được xác nhận."** nếu đã thanh toán).
- Hệ thống gửi email xác nhận đặt chỗ tới email người dùng bao gồm thông tin chuyến bay, ghế, mã đặt
chỗ (để thực hiện yêu cầu "gửi email").
- Ghế vừa chọn bây giờ không còn hiển thị là trống cho các lần tìm kiếm/đặt vé khác (trạng thái ghế cập
nhật thành "đã đặt").
- Người dùng có thể kiểm tra lại đặt chỗ trong mục lịch sử đặt vé của tôi (TC-Booking-008) thấy đặt chỗ
này.

**TC-Booking-002: Đặt vé – thất bại khi chưa đăng nhập
Mô tả mục tiêu:** Đảm bảo hệ thống yêu cầu người dùng đăng nhập trước khi đặt vé, ngăn chặn đặt chỗ
khi chưa xác thực.
**Môi trường:** Trình duyệt (chưa đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** Yêu cầu đặt vé một chuyến bay khi người dùng chưa đăng nhập (không có JWT).
**Các bước thực hiện:**

1. Mở trang chi tiết một chuyến bay khi **không đăng nhập** (có thể truy cập trực tiếp link hoặc từ kết quả
tìm kiếm cho phép xem chi tiết).
2. Nhấn nút "Đặt vé" hoặc "Chọn ghế".
**Kết quả mong đợi:**
- Hệ thống nhận thấy người dùng chưa đăng nhập, chặn quy trình đặt vé.
- Giao diện thực hiện chuyển hướng tới trang đăng nhập, có thể kèm thông báo **"Bạn cần đăng nhập
để đặt vé."**
- Nếu request đặt vé được gửi tới API mà không có JWT, backend trả về 401 Unauthorized.
- Sau khi người dùng đăng nhập xong, hệ thống có thể quay lại trang đặt vé ban đầu (nếu có tính năng
nhớ trạng thái) hoặc người dùng phải chọn lại chuyến bay.
- Kết quả cuối cùng: không tạo đặt chỗ nào khi chưa đăng nhập.

**TC-Booking-003: Đặt vé – thất bại khi chọn ghế đã được đặt trước đó
Mô tả mục tiêu:** Xác minh hệ thống xử lý trường hợp người dùng chọn một ghế đã không còn trống (bị
người khác đặt gần như đồng thời hoặc dữ liệu không cập nhật) và thông báo phù hợp.
**Môi trường:** Hai phiên người dùng hoặc dữ liệu giả lập: ghế mục tiêu đã bị giữ hoặc đặt. Backend
Node.js.
**Dữ liệu đầu vào:** Yêu cầu đặt vé với mã chuyến bay và số ghế đã được đặt bởi người khác.
**Các bước thực hiện:**

1. Người dùng A đã đặt hoặc đang giữ chỗ ghế 12A trên chuyến bay X (có thể thông qua TC-
Booking-001).
2. Người dùng B (hoặc phiên khác) cũng truy cập chuyến bay X và cố gắng chọn ghế 12A.
3. Người dùng B nhấn "Đặt vé" cho ghế 12A.
**Kết quả mong đợi:**
- Backend kiểm tra tính khả dụng của ghế 12A tại thời điểm xác nhận đặt chỗ cho người dùng B, phát
hiện ghế đã bị đặt/hết chỗ.


- Backend từ chối tạo đặt chỗ cho người B, trả về lỗi (ví dụ: 400 Bad Request với thông báo **"Ghế 12A đã
được chọn, vui lòng chọn ghế khác."** ).
- Giao diện hiển thị thông báo lỗi tương ứng và cập nhật lại sơ đồ ghế (đánh dấu ghế 12A là đã bị đặt).
- Người B không có mã đặt chỗ, phải chọn ghế khác nếu muốn tiếp tục đặt.
- Tính nhất quán dữ liệu ghế được đảm bảo: không có hai đặt chỗ trùng một ghế.

**TC-Booking-004: Hiển thị sơ đồ ghế – trạng thái ghế chính xác
Mô tả mục tiêu:** Đảm bảo giao diện sơ đồ chỗ ngồi (seat map) của chuyến bay hiển thị chính xác trạng
thái từng ghế (trống/đã đặt/đang chọn).
**Môi trường:** Giao diện web trang chọn ghế (React), Backend cung cấp dữ liệu ghế; CSDL với thông tin
ghế đã đặt.
**Dữ liệu đầu vào:** Mã chuyến bay và thông tin ghế (bao gồm ghế đã được đặt bởi các đặt chỗ khác).
**Các bước thực hiện:**

1. Người dùng mở trang chọn ghế cho một chuyến bay (sau khi nhấn "Đặt vé" hoặc "Chọn ghế").
2. Frontend tải dữ liệu sơ đồ ghế từ backend (bao gồm danh sách ghế và trạng thái hoặc số ghế đã
bán).
**Kết quả mong đợi:**
- Sơ đồ ghế (ví dụ: dạng lưới các ghế) hiển thị rõ ràng:
- Các ghế **còn trống** có thể chọn được (kí hiệu bằng màu xanh/chưa đánh dấu).
- Ghế **đã được đặt** (đã bán) hiển thị khác biệt (màu xám hoặc dấu X) và **không thể chọn** (bị disable).
- Ghế **đang được người dùng chọn** (nếu đã chọn trong phiên hiện tại) hiển thị nổi bật (màu khác, ví dụ
màu xanh đậm).
- Nếu trong CSDL chuyến bay có một số ghế đã được đặt trước đó, những ghế đó phải xuất hiện dưới
dạng đã bị chiếm trên sơ đồ ngay khi tải trang.
- Khi người dùng click chọn một ghế trống, trạng thái ghế đó đổi thành "đang chọn" và nếu click lần nữa
(bỏ chọn) thì quay về trạng thái trống.
- Không có trường hợp hiển thị sai lệch (ví dụ: ghế đã bán nhưng vẫn cho chọn).
- Trải nghiệm người dùng mượt mà: chọn ghế và bỏ chọn được cập nhật tức thì trên giao diện.

**TC-Booking-005: Hủy đặt vé – thành công
Mô tả mục tiêu:** Xác minh người dùng có thể hủy bỏ một đặt chỗ đã tạo (trước thời hạn cho phép) và
hệ thống cập nhật trạng thái, ghế được giải phóng.
**Môi trường:** Trình duyệt (người dùng đã đăng nhập), Backend Node.js, CSDL có ít nhất một đặt chỗ
thuộc về người dùng, ở trạng thái có thể hủy (ví dụ: đã đặt nhưng chưa bay, hoặc chưa thanh toán).
**Dữ liệu đầu vào:** Mã đặt chỗ (PNR) hợp lệ của người dùng muốn hủy.
**Các bước thực hiện:**

1. Đăng nhập và vào trang "Quản lý đặt chỗ" hoặc "Lịch sử đặt vé" của tôi.
2. Tại danh sách đặt chỗ, chọn một đặt chỗ (ví dụ mã ABC123) có tùy chọn "Hủy".
3. Nhấn nút "Hủy đặt vé" cho mã đặt chỗ đó và xác nhận khi được hỏi.
**Kết quả mong đợi:**
- Backend kiểm tra điều kiện hủy: đặt chỗ thuộc về user hiện tại, vẫn trong trạng thái cho phép hủy (ví
dụ: chuyến bay chưa khởi hành, vé chưa sử dụng, trong thời hạn cho phép hủy).
- Nếu hợp lệ, hệ thống cập nhật trạng thái đặt chỗ trong CSDL thành "Đã hủy".
- Số ghế tương ứng trên chuyến bay được giải phóng (trở lại trạng thái trống để người khác có thể đặt).
- Giao diện thông báo hủy thành công (ví dụ: **"Đặt chỗ ABC123 đã được hủy thành công."** ).
- Đặt chỗ vừa hủy được cập nhật trong danh sách lịch sử với trạng thái "Đã hủy".
- Nếu có hoàn tiền (trường hợp đã thanh toán trước đó), hệ thống sẽ tiến hành quy trình hoàn tiền
(ngoài phạm vi unit test, nhưng có thể ghi chú nếu applicable).

**TC-Booking-006: Hủy đặt vé – thất bại với mã đặt chỗ không hợp lệ
Mô tả mục tiêu:** Đảm bảo hệ thống xử lý tình huống yêu cầu hủy vé cho mã đặt chỗ không tồn tại hoặc


không thuộc về người yêu cầu, và từ chối hành động đó.
**Môi trường:** Chrome (đăng nhập tài khoản người dùng), Backend Node.js.
**Dữ liệu đầu vào:** Mã đặt chỗ sai (ví dụ: XYZ999, không có trong CSDL) hoặc mã của người khác.
**Các bước thực hiện:**

1. Vào trang quản lý đặt chỗ (đã đăng nhập).
2. Thử nhập một mã đặt chỗ ngẫu nhiên không có (nếu có chức năng tìm kiếm đặt chỗ để hủy) **hoặc**
nếu giao diện liệt kê chỉ đặt chỗ của mình, thì giả mạo yêu cầu hủy qua API với mã không thuộc sở hữu.
**Kết quả mong đợi:**
- Nếu mã không tồn tại: backend trả về lỗi 404 (Not Found) hoặc thông báo **"Mã đặt chỗ không hợp
lệ."** ; giao diện hiện thông báo lỗi tương ứng và không thay đổi gì.
- Nếu mã tồn tại nhưng thuộc về user khác: backend kiểm tra quyền sở hữu, trả về lỗi 403 Forbidden;
giao diện báo **"Bạn không có quyền hủy đặt chỗ này."**.
- Không có thay đổi nào trong dữ liệu đặt chỗ.
- Đặt chỗ của người khác vẫn giữ nguyên, không bị hủy.

**TC-Booking-007: Hủy đặt vé – thất bại do quá hạn hoặc không cho phép hủy
Mô tả mục tiêu:** Kiểm tra rằng hệ thống ngăn chặn việc hủy đặt chỗ nếu điều kiện thời gian không cho
phép (ví dụ: đã qua thời hạn hủy vé, hoặc chuyến bay đã khởi hành), hoặc trạng thái không thể hủy (đã
sử dụng).
**Môi trường:** Trình duyệt (user đăng nhập), Backend với đặt chỗ ở trạng thái không hủy được.
**Dữ liệu đầu vào:** Mã đặt chỗ của một vé thuộc một chuyến bay sắp khởi hành rất gần hoặc đã khởi
hành, hoặc vé thuộc loại không cho hủy.
**Các bước thực hiện:**

1. Người dùng vào trang lịch sử đặt vé, tìm đến đặt chỗ thuộc trường hợp không hủy được (ví dụ:
chuyến bay khởi hành trong <24h, nếu chính sách không cho hủy cận giờ).
2. Thử nhấn "Hủy" trên đặt chỗ đó.
**Kết quả mong đợi:**
- Backend kiểm tra, nhận thấy điều kiện hủy không thỏa (quá hạn hoặc chính sách vé không cho phép
hủy), từ chối yêu cầu.
- Trả về lỗi (có thể 400 Bad Request) với thông báo **"Đặt chỗ không thể hủy do đã cận giờ bay."** hoặc
**"Loại vé này không được phép hủy."** tùy trường hợp.
- Giao diện hiển thị thông báo lỗi tương ứng.
- Trạng thái đặt chỗ không thay đổi (vẫn là đã xác nhận).
- Nút "Hủy" có thể bị ẩn hoặc vô hiệu hóa trên giao diện đối với những vé như vậy (để người dùng
không cố hủy).

**TC-Booking-008: Xem lịch sử/ danh sách đặt vé của tôi – thành công
Mô tả mục tiêu:** Đảm bảo người dùng có thể xem danh sách tất cả các đặt chỗ mà mình đã thực hiện
cùng trạng thái của chúng.
**Môi trường:** Chrome (đăng nhập người dùng), Backend Node.js với cơ sở dữ liệu chứa nhiều đặt chỗ
thuộc về user đó (cả đã hủy, đã thanh toán, chờ thanh toán...).
**Dữ liệu đầu vào:** JWT của người dùng để lấy thông tin đặt chỗ tương ứng.
**Các bước thực hiện:**

1. Đăng nhập và truy cập trang "Đặt chỗ của tôi" hoặc "Lịch sử đặt vé".
**Kết quả mong đợi:**
- Backend xác thực người dùng và truy vấn các đặt chỗ thuộc về user đó.
- Giao diện hiển thị danh sách các đặt chỗ: Mỗi mục gồm các thông tin cơ bản như Mã đặt chỗ, tuyến
bay (điểm đi - điểm đến), ngày bay, số ghế, trạng thái (đã xác nhận/đã thanh toán/chờ thanh toán/đã
hủy).
- Danh sách bao gồm cả những đặt chỗ trước đây (có thể phân trang hoặc lọc theo thời gian nếu nhiều).
- Thông tin trạng thái chính xác: ví dụ những đặt chỗ chưa thanh toán hiển thị "Chờ thanh toán", đã


thanh toán "Đã thanh toán", đã hủy "Đã hủy", vé hoàn thành (bay xong) có thể ghi "Đã sử dụng".

- Người dùng có thể chọn từng đặt chỗ để xem chi tiết (ví dụ: bấm vào mã đặt chỗ).
- Giao diện hoạt động mượt mà, không lộ thông tin của người khác.

**TC-Booking-009: Tra cứu trạng thái đặt chỗ bằng mã (guest user) – thành công
Mô tả mục tiêu:** Kiểm thử chức năng cho phép người dùng tra cứu trạng thái đặt chỗ bằng mã đặt chỗ
(và có thể thông tin bổ sung như email) mà không cần đăng nhập, để khách có thể kiểm tra vé.
**Môi trường:** Trang web tra cứu đặt chỗ (có thể là form trên trang chủ hoặc mục "Quản lý đặt chỗ"),
Backend Node.js.
**Dữ liệu đầu vào:** Mã đặt chỗ hợp lệ (ví dụ: ABC123) và thông tin xác minh bổ sung nếu cần (ví dụ: họ
hoặc email đã dùng khi đặt vé).
**Các bước thực hiện:**

1. Mở trang "Kiểm tra tình trạng đặt chỗ" (có thể là một phần trên trang chủ cho khách).
2. Nhập mã đặt chỗ (PNR) ABC123 và (nếu form yêu cầu) nhập thêm họ hoặc email của hành khách để
xác minh.
3. Nhấn "Tra cứu" hoặc "Xem trạng thái".
**Kết quả mong đợi:**
- Backend tìm kiếm đặt chỗ với mã ABC123 và kiểm tra thông tin xác minh (nếu có, ví dụ email khớp với
booking).
- Nếu khớp, hệ thống trả về thông tin chi tiết đặt chỗ: trạng thái hiện tại (đã thanh toán/chưa thanh
toán, đã hủy hay chưa), thông tin chuyến bay, ghế, tên hành khách.
- Giao diện hiển thị kết quả tra cứu: ví dụ: **"Mã đặt chỗ ABC123 - Chuyến bay: HAN->SGN ngày
01/12/2025, Ghế 12A, Trạng thái: Đã xác nhận, Đã thanh toán."**
- Thông tin hiển thị chỉ giới hạn ở đặt chỗ tương ứng, không lộ thông tin của đặt chỗ khác.
- Nếu có yêu cầu thêm (ví dụ cho phép in vé điện tử), có thể có nút để in/xuất PDF vé máy bay.

**TC-Booking-010: Tra cứu trạng thái đặt chỗ – thất bại với mã không đúng
Mô tả mục tiêu:** Đảm bảo hệ thống thông báo thích hợp khi người dùng nhập mã đặt chỗ sai hoặc
thông tin xác minh không khớp, và không tiết lộ thông tin không hợp lệ.
**Môi trường:** Trang tra cứu đặt chỗ, Backend Node.js.
**Dữ liệu đầu vào:** Mã đặt chỗ không tồn tại (ví dụ: XYZ999) hoặc có tồn tại nhưng thông tin xác minh
kèm theo không đúng (email sai).
**Các bước thực hiện:**

1. Mở trang "Kiểm tra tình trạng đặt chỗ".
2. Nhập mã XYZ999 (giả định không có trong hệ thống) và email/họ tùy ý.
3. Nhấn "Tra cứu".
**Kết quả mong đợi:**
- Backend không tìm thấy đặt chỗ nào với mã này, hoặc thông tin xác minh không khớp -> không trả về
dữ liệu đặt chỗ.
- Giao diện hiển thị thông báo lỗi (ví dụ: **"Không tìm thấy đặt chỗ với thông tin đã cung cấp. Vui lòng
kiểm tra lại mã đặt chỗ và email/họ tên."** ).
- Không tiết lộ liệu mã nào gần đúng hay gợi ý khác, đảm bảo bảo mật.
- Người dùng có thể kiểm tra lại mã đã nhập hoặc liên hệ hỗ trợ nếu cần.

## Module Payment (Thanh toán: thanh toán trực tuyến, thanh toán offline)

**TC-Payment-001: Thanh toán trực tuyến – thành công
Mô tả mục tiêu:** Xác minh quy trình thanh toán trực tuyến (online) hoạt động trôi chảy: người dùng


thanh toán thành công và đặt chỗ được cập nhật trạng thái đã thanh toán/xác nhận.
**Môi trường:** Trình duyệt (user đã đặt chỗ và chuyển sang bước thanh toán), cổng thanh toán sandbox
(ví dụ: PayPal Sandbox hoặc cổng nội địa test), Backend Node.js.
**Dữ liệu đầu vào:** Đặt chỗ ở trạng thái "Chờ thanh toán" với số tiền cụ thể; thông tin thanh toán hợp lệ
(thông tin thẻ tín dụng test hoặc tài khoản ví điện tử test).
**Các bước thực hiện:**

1. Sau khi thực hiện đặt vé (TC-Booking-001), ở bước thanh toán chọn phương thức "Thanh toán trực
tuyến".
2. Hệ thống chuyển hướng tới cổng thanh toán (hoặc hiển thị form thanh toán thẻ).
3. Nhập thông tin thanh toán hợp lệ (VD: số thẻ tín dụng test, ngày hết hạn, CVV, hoặc đăng nhập tài
khoản ví test).
4. Xác nhận thanh toán trên cổng.
5. Cổng thanh toán xử lý và trả kết quả thành công, chuyển hướng người dùng về trang kết quả của
QAirline.
**Kết quả mong đợi:**
- Cổng thanh toán thông báo giao dịch thành công, số tiền được trừ (trong môi trường test, giả lập
thành công).
- Backend QAirline nhận callback/response từ cổng thanh toán, xác thực giao dịch.
- Trạng thái đặt chỗ trong CSDL được cập nhật thành "Đã thanh toán" và/hoặc "Đã xác nhận".
- Giao diện QAirline hiển thị trang xác nhận thanh toán thành công: **"Thanh toán thành công. Đặt chỗ
của bạn đã được xác nhận."** kèm thông tin mã đặt chỗ, chuyến bay, ghế.
- Email xác nhận vé (vé điện tử) được gửi tới người dùng, bao gồm thông tin chuyến bay và xác nhận
thanh toán (thực hiện yêu cầu "gửi email" cho thanh toán).
- Người dùng có thể thấy trạng thái đặt chỗ đổi thành "Đã thanh toán" trong lịch sử đặt vé (TC-
Booking-008).

**TC-Payment-002: Thanh toán trực tuyến – thất bại
Mô tả mục tiêu:** Đảm bảo hệ thống xử lý đúng khi thanh toán online thất bại (do thẻ bị từ chối hoặc
người dùng hủy), đặt chỗ vẫn tồn tại nhưng trạng thái phản ánh chưa thanh toán.
**Môi trường:** Trình duyệt, cổng thanh toán (mô phỏng giao dịch bị từ chối hoặc hủy), Backend Node.js.
**Dữ liệu đầu vào:** Đặt chỗ "Chờ thanh toán"; thông tin thanh toán không hợp lệ (vd: số thẻ sai, tài khoản
không đủ tiền) **hoặc** người dùng hủy giao dịch.
**Các bước thực hiện:**

1. Thực hiện quy trình thanh toán online như TC-Payment-001 nhưng sử dụng thông tin thẻ **không hợp
lệ** (ví dụ: thẻ bị từ chối) **hoặc** khi chuyển tới cổng thanh toán, nhấn "Cancel/Hủy" thay vì tiếp tục.
2. Cổng thanh toán từ chối giao dịch hoặc người dùng hủy, hệ thống chuyển hướng về trang QAirline
với trạng thái thất bại.
**Kết quả mong đợi:**
- Nếu thẻ bị từ chối: cổng thanh toán báo lỗi (ví dụ: thẻ không hợp lệ hoặc tài khoản không đủ tiền).
- Nếu người dùng hủy: cổng báo đã hủy giao dịch.
- Backend QAirline nhận kết quả thất bại/hủy, **không** cập nhật trạng thái thành đã thanh toán. Đặt chỗ
có thể vẫn ở trạng thái "Chờ thanh toán" hoặc chuyển thành "Thanh toán thất bại" (tùy thiết kế).
- Giao diện hiển thị thông báo thanh toán không thành công (ví dụ: **"Thanh toán thất bại. Vui lòng thử
lại hoặc chọn phương thức khác."** ).
- Cung cấp tùy chọn để người dùng thử thanh toán lại, hoặc hủy đặt chỗ nếu muốn.
- Ghế có thể được tạm giữ trong một khoảng thời gian. Nếu người dùng không thanh toán kịp, hệ
thống có thể hủy đặt chỗ sau thời gian quy định (nhưng đó là logic khác, ngoài phạm vi test ngay lập
tức).
- Không gửi email xác nhận (có thể gửi email thông báo thanh toán thất bại nếu hệ thống thiết lập,
nhưng thường không gửi cho thất bại).


**TC-Payment-003: Thanh toán trực tuyến – người dùng thoát giữa chừng
Mô tả mục tiêu:** Kiểm tra trường hợp người dùng bỏ dở quy trình thanh toán (đóng trình duyệt hoặc
không quay lại trang sau khi đến cổng thanh toán) và đảm bảo hệ thống xử lý treo giao dịch.
**Môi trường:** Chrome, cổng thanh toán.
**Dữ liệu đầu vào:** Đặt chỗ "Chờ thanh toán".
**Các bước thực hiện:**

1. Sau khi chuyển sang cổng thanh toán, **không** hoàn tất thanh toán (ví dụ: đóng tab hoặc không thực
hiện gì).
2. Quan sát trạng thái đặt chỗ trên hệ thống sau một khoảng thời gian.
**Kết quả mong đợi:**
- Nếu người dùng không hoàn tất thanh toán và không hủy, cổng có thể không gửi callback ngay. Đặt
chỗ ban đầu vẫn ở trạng thái "Chờ thanh toán".
- Hệ thống có thể có cơ chế timeout: sau X phút nếu không có xác nhận thanh toán, đặt chỗ có thể bị tự
động hủy và ghế được mở lại. (Nếu có, test rằng sau khoảng thời gian quy định, trạng thái đổi thành
"Đã hủy do không thanh toán kịp").
- Nếu không có auto-cancel, đặt chỗ sẽ vẫn treo ở "Chờ thanh toán" và người dùng có thể vào lịch sử đặt
vé để tiếp tục thanh toán (nếu hỗ trợ) hoặc hủy thủ công.
- Quan trọng: không xảy ra trường hợp khúc mắc như ghế bị giữ vô hạn mà người khác không đặt
được; hệ thống nên giải phóng sau thời gian hợp lý.

**TC-Payment-004: Thanh toán offline (trả sau) – thành công (đặt ở trạng thái chờ)
Mô tả mục tiêu:** Kiểm thử luồng người dùng chọn thanh toán offline (tại quầy, chuyển khoản sau) và
đảm bảo đặt chỗ được tạo ở trạng thái chờ thanh toán, thông tin hướng dẫn thanh toán hiển thị.
**Môi trường:** Trình duyệt (đặt vé), Backend Node.js.
**Dữ liệu đầu vào:** Đặt chỗ thông tin chuyến bay, chọn phương thức thanh toán "Offline/Trả sau".
**Các bước thực hiện:**

1. Người dùng thực hiện đặt vé (TC-Booking-001) đến bước thanh toán, chọn tùy chọn "Thanh toán sau
tại quầy" hoặc "Thanh toán chuyển khoản".
2. Xác nhận đặt chỗ với phương thức thanh toán offline.
**Kết quả mong đợi:**
- Hệ thống tạo đặt chỗ với trạng thái "Chờ thanh toán" (vì chưa thu tiền).
- Giao diện hiển thị thông tin hướng dẫn thanh toán offline cho người dùng: ví dụ: **"Vui lòng đến quầy
trước ngày X để thanh toán và nhận vé"** hoặc **"Thông tin chuyển khoản: ... Vui lòng thanh toán
trong vòng 24h."**
- Mã đặt chỗ được cấp (ví dụ: DEF456) và thông báo đặt chỗ tạm giữ thành công.
- Email gửi đến người dùng bao gồm mã đặt chỗ, số tiền cần thanh toán, hướng dẫn thanh toán offline.
- Ghế của đặt chỗ này tạm thời bị giữ, không cho người khác đặt.
- Admin hoặc nhân viên có thể thấy đặt chỗ này trong hệ thống với trạng thái chưa thanh toán.

**TC-Payment-005: Xác nhận thanh toán offline bởi Admin – thành công
Mô tả mục tiêu:** Đảm bảo quản trị viên hoặc nhân viên kế toán có thể đánh dấu một đặt chỗ offline là
đã thanh toán khi nhận được tiền, chuyển trạng thái đặt chỗ thành xác nhận hoàn tất.
**Môi trường:** Trình duyệt (Admin đăng nhập), Backend Node.js, CSDL có đặt chỗ ở trạng thái chờ thanh
toán (offline).
**Dữ liệu đầu vào:** Mã đặt chỗ cần xác nhận thanh toán (offline), thông tin xác nhận (ví dụ: đã nhận tiền
mặt hoặc nhận chuyển khoản).
**Các bước thực hiện:**

1. Admin đăng nhập, vào trang quản trị đặt chỗ (nếu có) hoặc trang quản lý thanh toán.
2. Tìm đặt chỗ cần xác nhận (theo mã hoặc danh sách "Chờ thanh toán").
3. Nhấn nút "Xác nhận đã thanh toán" cho đặt chỗ đó. Có thể nhập thông tin (ngày nhận tiền, ghi chú)
nếu form yêu cầu.


**Kết quả mong đợi:**

- Backend cập nhật trạng thái đặt chỗ từ "Chờ thanh toán" thành "Đã thanh toán/Đã xác nhận".
- Ghế đã giữ vẫn thuộc về đặt chỗ (vì giờ đã được thanh toán, vé có hiệu lực).
- Giao diện quản trị thông báo cập nhật thành công, đặt chỗ chuyển sang danh sách đã thanh toán.
- Người dùng (khách) nhận được email thông báo đặt chỗ đã được xác nhận sau khi thanh toán (nếu có
thiết lập gửi email khi admin xác nhận).
- Người dùng khi kiểm tra trạng thái đặt chỗ (TC-Booking-009) hoặc trong lịch sử đặt vé sẽ thấy trạng
thái đổi thành "Đã thanh toán".
- Hệ thống ghi log lại thông tin xác nhận (để audit sau này, nhưng đó là chi tiết nội bộ).

**TC-Payment-006: Hiển thị trạng thái thanh toán chính xác trên vé
Mô tả mục tiêu:** Kiểm tra rằng người dùng có thể thấy rõ trạng thái thanh toán của đặt chỗ của họ
trong lịch sử đặt vé hoặc chi tiết vé.
**Môi trường:** Trình duyệt (user đã đăng nhập), Backend có đặt chỗ với các trạng thái khác nhau.
**Dữ liệu đầu vào:** Không trực tiếp (dựa trên dữ liệu các booking với trạng thái paid/unpaid).
**Các bước thực hiện:**

1. Người dùng mở trang "Đặt chỗ của tôi" (như TC-Booking-008).
2. Quan sát các đặt chỗ trong danh sách, đặc biệt các trường "Trạng thái" hoặc chi tiết từng vé.
**Kết quả mong đợi:**
- Đối với một đặt chỗ đã thanh toán thành công (dù online hay được admin xác nhận offline), trạng thái
hiển thị là "Đã thanh toán" hoặc "Đã xác nhận".
- Đối với đặt chỗ chưa thanh toán (thanh toán sau, còn chờ), trạng thái hiển thị "Chờ thanh toán". Có thể
kèm hạn thanh toán nếu hệ thống có (ví dụ: "Chờ thanh toán - hạn đến 20/12/2025").
- Đối với đặt chỗ thanh toán thất bại hoặc bị hủy do không thanh toán, hiển thị "Đã hủy".
- Thông tin trạng thái rõ ràng để người dùng biết cần làm gì (nếu "Chờ thanh toán" có thể có nút thanh
toán ngay).
- Không có trường hợp hiển thị sai trạng thái (ví dụ đã trả tiền mà ghi là chưa hoặc ngược lại).

## Module Admin (Chức năng Quản trị: Phân quyền, Quản lý tài

## khoản, Quản lý người dùng)

**TC-Admin-001: Truy cập trang quản trị – người dùng thường bị từ chối
Mô tả mục tiêu:** Đảm bảo rằng chỉ admin mới có thể truy cập giao diện quản trị, người dùng thường
không thể truy cập hoặc nhìn thấy các chức năng admin.
**Môi trường:** Trình duyệt (đăng nhập bằng user thường), Backend Node.js.
**Dữ liệu đầu vào:** Tài khoản người dùng bình thường (role User) cố gắng truy cập URL quản trị (ví dụ: /
admin hoặc các trang quản lý).
**Các bước thực hiện:**

1. Đăng nhập bằng tài khoản người dùng thường (không có quyền admin).
2. Thử truy cập thủ công URL trang quản trị (ví dụ: nhập đường dẫn /admin/dashboard trên trình
duyệt).
**Kết quả mong đợi:**
- Backend kiểm tra JWT thấy role user, trả về 403 Forbidden (nếu API).
- Frontend có thể tự kiểm tra role và ngay lập tức chuyển hướng người dùng khỏi trang admin nếu cố
vào, hoặc hiển thị trang lỗi.
- Người dùng thường sẽ thấy thông báo lỗi (ví dụ: **"Bạn không có quyền truy cập trang quản trị."** )
hoặc được đưa về trang chủ.
- Trên menu hay giao diện, các mục chức năng admin không hiển thị đối với user thường (ví dụ: không


thấy menu "Quản trị").

- Hệ thống bảo vệ đầy đủ cả phía client và server đối với truy cập trái phép.

**TC-Admin-002: Truy cập trang quản trị – quản trị viên thành công
Mô tả mục tiêu:** Xác minh tài khoản có quyền admin có thể đăng nhập vào khu vực quản trị và thấy các
chức năng quản lý.
**Môi trường:** Trình duyệt (đăng nhập bằng admin), Backend Node.js.
**Dữ liệu đầu vào:** Tài khoản admin hợp lệ (username/password) đã được gán role Admin.
**Các bước thực hiện:**

1. Đăng nhập vào hệ thống bằng tài khoản quản trị viên.
2. Sau khi đăng nhập, thử truy cập trang quản trị (ví dụ: hệ thống có thể tự động chuyển đến dashboard
admin hoặc nhấn liên kết "Admin Dashboard").
**Kết quả mong đợi:**
- Đăng nhập thành công (như TC-Auth-006 nhưng với tài khoản admin), hệ thống cấp JWT chứa thông
tin role admin.
- Giao diện sau khi đăng nhập hiển thị các menu quản trị (ví dụ: "Quản lý người dùng", "Quản lý chuyến
bay", "Quản lý bài viết", v.v.).
- Truy cập trang admin dashboard thành công: hiển thị các thống kê hoặc danh sách quản lý tùy thiết
kế.
- Không có thông báo lỗi quyền.
- Admin có thể thực thi các chức năng quản trị (thêm/sửa/xóa flights, users, posts...) mà user thường
không làm được.

**TC-Admin-003: Tạo tài khoản quản trị viên mới – thành công
Mô tả mục tiêu:** Kiểm thử việc admin cao cấp có thể tạo thêm một tài khoản admin khác (phân quyền
thêm quản trị viên) thành công khi nhập thông tin hợp lệ.
**Môi trường:** Trình duyệt (đăng nhập bằng tài khoản admin có quyền tạo admin), Backend Node.js,
CSDL.
**Dữ liệu đầu vào:** Thông tin tài khoản admin mới: email/username chưa tồn tại, mật khẩu, tên, và gán
quyền admin.
**Các bước thực hiện:**

1. Admin đăng nhập và vào trang "Quản lý tài khoản" -> "Tạo tài khoản admin mới".
2. Nhập thông tin cho admin mới: tên, email (ví dụ: newadmin@example.com), mật khẩu tạm, chọn
role = Admin.
3. Nhấn "Tạo tài khoản".
**Kết quả mong đợi:**
- Backend kiểm tra quyền người thực hiện (admin hiện tại có quyền tạo admin).
- Thông tin hợp lệ, hệ thống tạo user mới trong CSDL với role Admin. Mật khẩu được mã hóa khi lưu.
- Giao diện thông báo thành công (ví dụ: **"Tạo tài khoản admin mới thành công."** ).
- Tài khoản mới xuất hiện trong danh sách người dùng/ quản trị viên, với phân quyền admin.
- Admin mới có thể dùng thông tin này để đăng nhập sau đó (có thể yêu cầu đổi mật khẩu lần đầu nếu
chính sách).
- Email thông báo có thể được gửi tới email admin mới (nếu hệ thống gửi email thông báo tài khoản).

**TC-Admin-004: Tạo tài khoản quản trị viên – thất bại do trùng email
Mô tả mục tiêu:** Đảm bảo hệ thống từ chối tạo tài khoản admin mới nếu email (hoặc username) đã
được dùng bởi tài khoản khác.
**Môi trường:** Chrome (admin đang login), Backend Node.js với CSDL có user trùng email.
**Dữ liệu đầu vào:** Thông tin tài khoản admin mới có email đã tồn tại (ví dụ: dùng email của một user
hiện có).
**Các bước thực hiện:**


1. Admin mở form tạo tài khoản mới.
2. Nhập email existinguser@example.com (đã có trong hệ thống của một user thường hoặc admin
khác), cùng các thông tin khác hợp lệ.
3. Nhấn "Tạo tài khoản".
**Kết quả mong đợi:**
- Backend kiểm tra thấy email trùng, từ chối tạo.
- Trả về lỗi (ví dụ: 400) với thông báo **"Email đã được sử dụng cho tài khoản khác."**
- Giao diện hiển thị lỗi, không thêm tài khoản mới trong danh sách.
- Admin cần dùng email khác để tạo.
- Nếu username là định danh riêng và trùng, thì tương tự thông báo về trùng username.

**TC-Admin-005: Cập nhật thông tin tài khoản người dùng – thành công
Mô tả mục tiêu:** Xác minh admin có thể chỉnh sửa thông tin tài khoản của người dùng (ví dụ: đổi quyền,
kích hoạt/khoá tài khoản, hoặc cập nhật thông tin cơ bản) thành công.
**Môi trường:** Trình duyệt (admin đăng nhập), Backend Node.js, CSDL có tài khoản user.
**Dữ liệu đầu vào:** ID tài khoản người dùng cần chỉnh, thông tin cập nhật (vd: nâng cấp quyền từ User
lên Admin, hoặc sửa tên, khoá/mở khoá).
**Các bước thực hiện:**

1. Admin vào trang "Quản lý người dùng", chọn một người dùng cần chỉnh sửa.
2. Nhấn "Chỉnh sửa" cạnh tài khoản đó.
3. Thay đổi một số thông tin: ví dụ, đổi quyền từ "User" thành "Admin" hoặc sửa tên người dùng, hoặc
đánh dấu "Khoá tài khoản" nếu có chức năng khoá.
4. Nhấn "Lưu" cập nhật.
**Kết quả mong đợi:**
- Backend thực hiện cập nhật: nếu đổi role, user đó bây giờ có role mới; nếu khoá, trạng thái tài khoản
đổi thành "Disabled".
- Giao diện thông báo cập nhật thành công ( **"Đã cập nhật thông tin tài khoản."** ).
- Danh sách người dùng phản ánh thay đổi (ví dụ: quyền của user đó giờ hiển thị là Admin/khoá...).
- Nếu admin vừa cấp quyền admin cho user, user đó bây giờ thuộc nhóm admin (có thể đăng nhập và
truy cập admin, kiểm tra ở TC-Admin-002).
- Nếu khoá tài khoản: user đó không thể đăng nhập sau đó (có thể test thử đăng nhập bằng tài khoản bị
khoá để đảm bảo bị chặn).

**TC-Admin-006: Cập nhật thông tin tài khoản – thất bại do dữ liệu không hợp lệ
Mô tả mục tiêu:** Đảm bảo khi admin sửa thông tin tài khoản nhưng nhập dữ liệu không hợp lệ, hệ
thống sẽ từ chối (ví dụ: nhập email trùng với tài khoản khác, hoặc xóa thông tin cần thiết).
**Môi trường:** Chrome (admin), Backend Node.js.
**Dữ liệu đầu vào:** Thông tin cập nhật không hợp lệ: ví dụ, đổi email của user A thành email của user B
(gây trùng), hoặc xóa tên khiến trường rỗng.
**Các bước thực hiện:**

1. Admin chọn một người dùng trong danh sách và nhấn "Chỉnh sửa".
2. Sửa email của họ thành một email đã có ở user khác, hoặc xóa nội dung tên.
3. Nhấn "Lưu".
**Kết quả mong đợi:**
- Backend kiểm tra thấy vi phạm (trùng email hoặc thiếu tên), từ chối cập nhật.
- Trả về lỗi 400 với thông báo tương ứng ( **"Email đã tồn tại."** hoặc **"Tên không được bỏ trống."** ).
- Giao diện hiển thị thông báo lỗi, dữ liệu không thay đổi trong danh sách.
- Admin phải điều chỉnh lại thông tin hợp lệ nếu muốn lưu thành công.

**TC-Admin-007: Xóa hoặc khóa tài khoản người dùng – thành công
Mô tả mục tiêu:** Kiểm thử việc admin vô hiệu hóa (khóa) hoặc xóa hẳn một tài khoản người dùng khỏi


hệ thống một cách thành công.
**Môi trường:** Trình duyệt (admin login), Backend Node.js với CSDL có user mục tiêu.
**Dữ liệu đầu vào:** ID tài khoản người dùng cần xóa/khoá.
**Các bước thực hiện:**

1. Admin vào danh sách người dùng.
2. Chọn tài khoản cần xóa hoặc khoá, nhấn nút "Xóa" hoặc "Khoá" tương ứng.
3. Xác nhận hành động khi được hỏi (nếu có).
**Kết quả mong đợi:**
- **Nếu xóa:** Backend xóa user khỏi CSDL (hoặc đánh dấu đã xóa). Giao diện loại bỏ user khỏi danh sách,
thông báo **"Đã xóa tài khoản."**. User đó không còn đăng nhập được (nếu xóa hoàn toàn).
- **Nếu khoá:** Backend cập nhật trạng thái user thành "Disabled/Inactive". Giao diện có thể đánh dấu
user đó là "Đã khoá".
- Tài khoản bị khoá không thể đăng nhập (cố đăng nhập sẽ bị từ chối với thông báo "Tài khoản bị khóa").
- Dữ liệu liên quan đến user (ví dụ bài viết, bình luận) có thể vẫn giữ (tùy hệ thống, nằm ngoài phạm vi
test này).
- Chỉ admin mới thực hiện được hành động này; user thường nếu cố gắng xóa tài khoản của ai đó sẽ bị
chặn (phủ trong test middleware).

**TC-Admin-008: Xóa/khoá tài khoản người dùng – thất bại
Mô tả mục tiêu:** Đảm bảo hệ thống xử lý các trường hợp admin không thể xóa/khoá tài khoản, chẳng
hạn tài khoản không tồn tại hoặc tự xóa chính mình nếu không cho phép.
**Môi trường:** Chrome (admin login), Backend Node.js.
**Dữ liệu đầu vào:** ID tài khoản không tồn tại hoặc trường hợp đặc biệt (ví dụ: admin cố xóa chính tài
khoản mình đang dùng, nếu hệ thống ngăn điều đó).
**Các bước thực hiện:**

1. Admin cố gắng xóa một user ID giả mạo (ví dụ bằng cách chỉnh ID trên URL).
2. (Nếu hệ thống có quy định không cho xóa admin đang đăng nhập hoặc admin cấp cao đặc biệt)
Admin thử xóa chính tài khoản của mình.
**Kết quả mong đợi:**
- TH1: ID không tồn tại -> Backend trả về 404, giao diện thông báo **"Tài khoản không tồn tại."**
- TH2: Xóa chính mình -> Backend từ chối (có thể 400) với thông báo **"Không thể tự xóa tài khoản
đang đăng nhập."** ; giao diện hiển thị lỗi, tài khoản không bị xóa.
- Không có thay đổi gì trong danh sách hoặc phiên đăng nhập.
- Hệ thống duy trì tính toàn vẹn (không xóa user ảo, không làm admin mất quyền đột ngột nếu đó là
cấm).

**TC-Admin-009: Tìm kiếm và lọc danh sách người dùng – thành công
Mô tả mục tiêu:** Đảm bảo chức năng tìm kiếm người dùng theo tiêu chí (tên, email) và lọc (theo quyền,
trạng thái) hoạt động để hỗ trợ admin quản lý nhiều user.
**Môi trường:** Trình duyệt (admin), Backend Node.js với nhiều user trong CSDL.
**Dữ liệu đầu vào:** Từ khóa tìm kiếm (ví dụ: một phần email hoặc tên), hoặc bộ lọc (ví dụ: chỉ admin, chỉ
user đã khóa).
**Các bước thực hiện:**

1. Tại trang quản lý người dùng, nhập từ khóa vào ô tìm kiếm (ví dụ: "example.com" để tìm các email
thuộc domain này) và nhấn biểu tượng tìm kiếm.
2. (Nếu có) Chọn bộ lọc role = "User" hoặc trạng thái = "Active" từ menu lọc.
**Kết quả mong đợi:**
- Backend nhận yêu cầu query danh sách user với điều kiện tương ứng (LIKE tên/email, role = User, v.v.).
- Danh sách người dùng trên giao diện cập nhật chỉ còn những user khớp tiêu chí.
- Kết quả tìm kiếm chính xác, bao gồm mọi user thỏa mãn và không có user không liên quan.
- Nếu không có user nào phù hợp, hiển thị **"Không tìm thấy người dùng phù hợp."**


- Tính năng lọc hoạt động kết hợp với tìm kiếm nếu áp dụng (vd: tìm "anh" trong Admin sẽ chỉ ra admin
có tên chứa "anh").
- Khi xóa từ khóa hoặc bỏ lọc, danh sách trở về đầy đủ.

## Module Post/News (Quản lý Bài viết/Tin tức: Tạo, Sửa, Xóa, Xem bài viết)

**TC-Post-001: Tạo bài viết tin tức (Admin) – thành công
Mô tả mục tiêu:** Xác minh quản trị viên có thể tạo mới một bài viết tin tức trên hệ thống khi cung cấp
đầy đủ nội dung hợp lệ.
**Môi trường:** Trình duyệt (đăng nhập Admin), Backend Node.js/Express, CSDL (bảng posts/news).
**Dữ liệu đầu vào:** Tiêu đề bài viết, nội dung bài viết (có thể kèm ảnh minh họa hoặc trích dẫn nếu có),
các trường khác (tác giả, danh mục) hợp lệ.
**Các bước thực hiện:**

1. Admin truy cập trang "Quản lý bài viết" và nhấn "Tạo bài viết mới".
2. Nhập Tiêu đề (ví dụ: "QAirline ra mắt tính năng mới"), nhập nội dung chi tiết bài viết (văn bản, có thể
định dạng), chọn ảnh (nếu có tính năng upload ảnh), chọn danh mục (nếu có).
3. Nhấn "Đăng bài" hoặc "Lưu".
**Kết quả mong đợi:**
- Backend nhận dữ liệu, kiểm tra các trường bắt buộc (tiêu đề, nội dung không rỗng).
- Lưu bài viết mới vào CSDL, bao gồm thông tin: tiêu đề, nội dung, tác giả (mặc định là admin tạo), ngày
giờ tạo.
- Giao diện thông báo đăng bài thành công ( **"Bài viết đã được tạo/đăng thành công."** ).
- Bài viết mới xuất hiện trong danh sách bài viết quản trị, trạng thái (có thể là "Đã đăng").
- Người dùng (client) ở trang tin tức có thể thấy bài viết mới này xuất hiện (kiểm tra TC-Post-007).

**TC-Post-002: Tạo bài viết – thất bại do thiếu tiêu đề hoặc nội dung
Mô tả mục tiêu:** Đảm bảo hệ thống không cho phép admin tạo bài viết nếu bỏ trống tiêu đề hoặc nội
dung, vì đây là các thông tin bắt buộc.
**Môi trường:** Chrome (Admin), Backend Node.js.
**Dữ liệu đầu vào:** Thông tin bài viết không đầy đủ: ví dụ bỏ trống tiêu đề hoặc bỏ trống nội dung.
**Các bước thực hiện:**

1. Admin mở form "Tạo bài viết mới".
2. Trường hợp 1: Để trống tiêu đề, nhập nội dung đầy đủ.
3. Trường hợp 2: Nhập tiêu đề, nhưng không nhập nội dung.
4. Nhấn "Đăng bài".
**Kết quả mong đợi:**
- Trường hợp 1: Frontend phát hiện tiêu đề trống, hiển thị lỗi **"Tiêu đề không được để trống."** và
không gửi request.
- Trường hợp 2: Frontend/Backend phát hiện nội dung trống, hiển thị lỗi **"Nội dung không được để
trống."**
- Bài viết không được tạo trong CSDL.
- Admin phải điền đầy đủ cả tiêu đề và nội dung mới cho phép đăng.

**TC-Post-003: Chỉnh sửa bài viết (Admin) – thành công
Mô tả mục tiêu:** Xác minh admin có thể chỉnh sửa nội dung hoặc tiêu đề của bài viết tin tức và lưu lại
thành công.
**Môi trường:** Trình duyệt (Admin login, trang quản lý bài viết), Backend Node.js, CSDL có sẵn bài viết.
**Dữ liệu đầu vào:** ID bài viết cần sửa, nội dung cập nhật (ví dụ: thay đổi tiêu đề, chỉnh sửa vài đoạn nội


dung, cập nhật ảnh).
**Các bước thực hiện:**

1. Admin vào danh sách bài viết, chọn một bài viết và nhấn "Sửa".
2. Thay đổi một số nội dung: ví dụ sửa tiêu đề thành "QAirline cập nhật tính năng mới", bổ sung thêm
đoạn văn bản vào nội dung.
3. Nhấn "Lưu" bài viết.
**Kết quả mong đợi:**
- Backend cập nhật bản ghi bài viết tương ứng trong CSDL với tiêu đề/nội dung mới.
- Giao diện thông báo cập nhật thành công ( **"Bài viết đã được cập nhật."** ).
- Danh sách bài viết hiển thị tiêu đề mới (nếu đã thay đổi) và có thể cập nhật thời gian chỉnh sửa (nếu hệ
thống lưu).
- Người dùng xem bài viết (TC-Post-008) sẽ thấy nội dung mới sau chỉnh sửa.

**TC-Post-004: Chỉnh sửa bài viết – thất bại khi nhập dữ liệu không hợp lệ
Mô tả mục tiêu:** Đảm bảo admin không thể lưu chỉnh sửa nếu xóa sạch nội dung quan trọng (tiêu đề/
nội dung rỗng) hoặc nhập dữ liệu không hợp lệ.
**Môi trường:** Chrome (Admin, form chỉnh sửa bài viết), Backend Node.js.
**Dữ liệu đầu vào:** Bài viết hiện có; thao tác chỉnh sửa gây lỗi: ví dụ xóa toàn bộ nội dung khiến trường
nội dung rỗng, hoặc nhập tiêu đề trùng hệt bài khác (ít khả năng, thường tiêu đề không bắt unique).
**Các bước thực hiện:**

1. Admin mở form chỉnh sửa của một bài viết.
2. Xóa hết nội dung trong phần nội dung, giữ tiêu đề như cũ.
3. Nhấn "Lưu".
**Kết quả mong đợi:**
- Frontend chặn lưu vì nội dung bài viết đang trống, hiển thị lỗi **"Nội dung không được để trống."**
- Nếu frontend không chặn, backend cũng trả về lỗi 400 với cùng thông báo.
- Bài viết không thay đổi trong CSDL.
- Admin phải nhập lại nội dung trước khi lưu.
_(Nếu có kiểm tra khác như độ dài tối thiểu, hoặc tiêu đề trùng thì cũng tương tự hiển thị lỗi và không lưu.)_

**TC-Post-005: Xóa bài viết (Admin) – thành công
Mô tả mục tiêu:** Kiểm thử việc admin xóa một bài viết khỏi hệ thống diễn ra thành công, bài viết không
còn hiển thị với người dùng.
**Môi trường:** Trình duyệt (Admin), Backend Node.js, CSDL có bài viết mục tiêu.
**Dữ liệu đầu vào:** ID bài viết cần xóa.
**Các bước thực hiện:**

1. Admin vào danh sách bài viết, chọn một bài và nhấn nút "Xóa".
2. Xác nhận khi có thông báo hỏi lại (nếu có).
**Kết quả mong đợi:**
- Backend xóa bài viết khỏi CSDL (hoặc đánh dấu đã xóa nếu dùng cơ chế ẩn).
- Giao diện thông báo **"Đã xóa bài viết."** và loại bỏ bài đó khỏi danh sách.
- Người dùng (ở trang tin tức) sẽ không tìm thấy bài viết này nữa. Nếu họ đang mở link bài viết đó,
refresh sẽ nhận thông báo không tồn tại (như TC-Post-008 khi id invalid).
- Không ảnh hưởng tới các bài viết khác.

**TC-Post-006: Xóa bài viết – thất bại (không tồn tại hoặc lỗi quyền)
Mô tả mục tiêu:** Đảm bảo hệ thống xử lý khi admin cố xóa một bài không tồn tại, hoặc người không có
quyền cố xóa bài.
**Môi trường:** Chrome (Admin hoặc user tùy trường hợp), Backend Node.js.
**Dữ liệu đầu vào:** ID bài viết không tồn tại, hoặc người dùng thường cố gọi xóa.
**Các bước thực hiện:**


1. Admin thử xóa một bài với ID giả trong URL (không có trong danh sách).
2. Người dùng thường đăng nhập, cố gọi API xóa bài viết (bằng cách giả mạo request hoặc truy cập giao
diện admin nếu có lỗ hổng).
**Kết quả mong đợi:**
- TH1: ID không tồn tại -> Backend trả 404, giao diện admin báo lỗi **"Bài viết không tồn tại."**
- TH2: User thường -> Backend trả 403 Forbidden, không cho phép. Giao diện (nếu user thường không
thấy nút xóa, nhưng nếu cố tình gọi) sẽ không có phản hồi gì rõ ràng ngoài có thể hiển thị thông báo
chung **"Bạn không có quyền."**
- Không có bài viết nào bị xóa thực sự.
- Hệ thống an toàn trước thao tác sai.

**TC-Post-007: Xem danh sách bài viết tin tức (Người dùng) – thành công
Mô tả mục tiêu:** Đảm bảo người dùng (cả chưa đăng nhập và đã đăng nhập) có thể xem danh sách các
bài viết tin tức mà hệ thống cung cấp.
**Môi trường:** Trình duyệt web, Backend Node.js với một số bài viết đã đăng.
**Dữ liệu đầu vào:** (Không cần - hệ thống tự hiển thị danh sách bài viết).
**Các bước thực hiện:**

1. Mở trang "Tin tức" hoặc "Bài viết" trên giao diện (thường là trang hiển thị danh sách tất cả các bài
tin).
**Kết quả mong đợi:**
- Backend lấy danh sách các bài viết (có thể phân trang nếu nhiều).
- Giao diện hiển thị danh sách bài viết: Mỗi bài hiển thị tóm tắt gồm tiêu đề, một phần ngắn nội dung
hoặc mô tả, ảnh thumbnail (nếu có), ngày đăng, và link "Xem chi tiết".
- Danh sách sắp xếp theo bài mới nhất lên đầu (thường).
- Tất cả người dùng, kể cả chưa đăng nhập, đều xem được (vì tin tức thường công khai).
- Không hiển thị các bài đã bị xóa hoặc ẩn.
- Người dùng có thể chọn một bài để xem chi tiết (TC-Post-008).

**TC-Post-008: Xem chi tiết bài viết tin tức – thành công
Mô tả mục tiêu:** Xác minh người dùng có thể đọc nội dung chi tiết của một bài viết tin tức.
**Môi trường:** Trình duyệt (user hoặc guest), Backend Node.js với nội dung bài viết.
**Dữ liệu đầu vào:** ID bài viết hợp lệ (thường thông qua nhấn link từ danh sách tin tức).
**Các bước thực hiện:**

1. Tại trang danh sách tin tức (TC-Post-007), nhấp vào tiêu đề hoặc link "Xem chi tiết" của một bài viết cụ
thể.
**Kết quả mong đợi:**
- Backend trả về nội dung chi tiết của bài viết tương ứng (tiêu đề, nội dung đầy đủ, tác giả, ngày đăng,
v.v.).
- Giao diện hiển thị trang chi tiết bài viết: Tiêu đề nổi bật, bên dưới là toàn bộ nội dung (gồm văn bản,
hình ảnh nếu có, định dạng đầy đủ).
- Thông tin meta: ngày đăng, tác giả có thể hiển thị.
- Người dùng có thể đọc toàn bộ bài viết.
- Không yêu cầu đăng nhập để đọc (tin tức công khai).
- Nếu bài viết không tồn tại (ví dụ: admin đã xóa sau khi user click link): hiển thị thông báo lỗi **"Bài viết
không tồn tại."** hoặc trang 404 tương tự (trường hợp này giống TC-Post-006 TH1).

**TC-Post-009: Ngăn chặn người dùng thường tạo/sửa/xóa bài viết
Mô tả mục tiêu:** Đảm bảo rằng người dùng không có quyền admin sẽ không thể truy cập hoặc thực
hiện các chức năng tạo, chỉnh sửa, xóa bài viết.
**Môi trường:** Trình duyệt (user thường đăng nhập), Backend Node.js.
**Dữ liệu đầu vào:** (Không có, chỉ thao tác trái phép)


**Các bước thực hiện:**

1. Người dùng thường đăng nhập, cố gắng truy cập trang quản lý bài viết (ví dụ: /admin/posts nếu
đó là đường dẫn) hoặc trang tạo bài viết mới.
2. Quan sát giao diện (không có link admin) và thử truy cập trực tiếp URL.
3. (Ngoài ra) Thử gọi API tạo/sửa/xóa bài viết bằng công cụ như Postman với JWT user thường.
**Kết quả mong đợi:**
- Giao diện người dùng thường không hiển thị bất kỳ nút nào cho việc tạo hay chỉnh sửa bài viết.
- Nếu cố truy cập URL admin/posts, backend trả về 403 Forbidden (user role check) -> giao diện bị chặn
với thông báo **"Không có quyền truy cập."**
- Gọi API với JWT user: nhận 403 Forbidden cho các endpoint POST/PUT/DELETE bài viết.
- Không có bài viết nào được thêm/sửa/xóa bởi user thường.
- Hệ thống phân quyền đúng đắn giữa admin và user ở chức năng bài viết.

## Module Middleware & Bảo mật (Xác thực JWT, Phân quyền)

**TC-MW-001: Truy cập API yêu cầu đăng nhập mà không có JWT – bị từ chối
Mô tả mục tiêu:** Đảm bảo middleware xác thực chặn các request đến API bảo vệ khi không có token
JWT, buộc người dùng phải đăng nhập.
**Môi trường:** Sử dụng công cụ như Postman hoặc trình duyệt (với fetch) gọi API; Backend Node.js có
middleware JWT bảo vệ các route.
**Dữ liệu đầu vào:** Yêu cầu HTTP tới một endpoint cần xác thực (ví dụ: GET /api/user/profile)
nhưng **không** gửi kèm JWT trong header.
**Các bước thực hiện:**

1. Gửi request GET đến /api/user/profile (lấy thông tin hồ sơ) mà không đặt header Authorization
hoặc token gì. (Có thể giả lập bằng Postman).
**Kết quả mong đợi:**
- Middleware phát hiện không có JWT, ngăn không cho vào hàm xử lý chính.
- Backend trả về mã **401 Unauthorized** cùng thông báo lỗi (ví dụ JSON: { error:
"Unauthorized" }).
- Phía client (nếu gọi từ ứng dụng) nhận 401 và có thể tự chuyển hướng đến trang đăng nhập.
- Không có dữ liệu nhạy cảm nào được trả về. Yêu cầu bị từ chối hoàn toàn.

**TC-MW-002: Truy cập API với JWT không hợp lệ – bị từ chối
Mô tả mục tiêu:** Xác minh hệ thống từ chối JWT không hợp lệ (bị giả mạo hoặc sai định dạng) và không
cho truy cập tài nguyên.
**Môi trường:** Postman/API client, Backend Node.js với secret JWT để verify.
**Dữ liệu đầu vào:** Yêu cầu đến API bảo vệ kèm Authorization header với JWT sai (ví dụ: một chuỗi token
đã bị thay đổi ký tự hoặc token random).
**Các bước thực hiện:**

1. Gửi request (ví dụ GET /api/user/profile) với header Authorization: Bearer
<jwt_invalid>, trong đó <jwt_invalid> là một token giả (ví dụ tự nhập chuỗi ngẫu nhiên hoặc
một JWT với chữ ký không đúng).
**Kết quả mong đợi:**
- Middleware cố gắng xác thực JWT, không xác nhận được chữ ký hoặc parse thất bại.
- Trả về **401 Unauthorized** với thông báo lỗi (vd: **"Token không hợp lệ."** ).
- Không cho phép truy cập logic bên trong của endpoint.
- Hệ thống có thể log lại sự kiện token không hợp lệ (để theo dõi nếu cần).
- Người dùng cần đăng nhập lại để có token hợp lệ mới.


**TC-MW-003: Truy cập API với JWT hết hạn – bị từ chối
Mô tả mục tiêu:** Đảm bảo hệ thống không chấp nhận token JWT đã hết hạn, yêu cầu người dùng phải
lấy token mới (đăng nhập lại hoặc refresh).
**Môi trường:** Postman/API client, Backend Node.js với cấu hình JWT expiration (ví dụ: token hết hạn sau
1 giờ).
**Dữ liệu đầu vào:** JWT đã hết hạn (có exp trong quá khứ).
**Các bước thực hiện:**

1. Lấy một JWT hợp lệ nhưng đã hết hạn (có thể tạo với thời hạn ngắn rồi đợi, hoặc chỉnh đồng hồ/
token).
2. Gửi request đến API bảo vệ (như /api/user/profile) với token hết hạn trong header.
**Kết quả mong đợi:**
- Middleware kiểm tra và nhận thấy token đã quá hạn sử dụng.
- Trả về **401 Unauthorized** với thông báo (ví dụ: **"Token hết hạn. Vui lòng đăng nhập lại."** ).
- Người dùng sẽ phải đăng nhập lại (hoặc sử dụng refresh token nếu có) để tiếp tục.
- Hệ thống không cho phép sử dụng token cũ để truy cập.

**TC-MW-004: Truy cập chức năng admin với JWT của user thường – bị từ chối
Mô tả mục tiêu:** Xác minh middleware phân quyền chặn người dùng thường truy cập các endpoint chỉ
dành cho admin.
**Môi trường:** Postman hoặc môi trường web (user đã đăng nhập), Backend Node.js có middleware
check role.
**Dữ liệu đầu vào:** JWT hợp lệ của user role=User, request tới endpoint admin (ví dụ: DELETE /api/
flights/123 hoặc POST /api/admin/create-user).
**Các bước thực hiện:**

1. Lấy token JWT của tài khoản user thường (qua đăng nhập bình thường).
2. Gửi request tới một API chỉ dành cho admin, kèm token user này (ví dụ: cố gắng xóa chuyến bay:
    DELETE /api/flights/123 với token user).
**Kết quả mong đợi:**
- Middleware/route handler kiểm tra role từ token (hoặc DB) thấy user không phải admin.
- Trả về **403 Forbidden** với thông báo **"Forbidden - Access denied"** hoặc **"Bạn không có quyền truy
cập tài nguyên này."**.
- Hành động admin không được thực thi.
- Nếu gọi từ giao diện người dùng, kết quả 403 có thể dẫn đến trang lỗi hoặc im lặng (nhưng quan
trọng là không thực hiện được).
- Hệ thống bảo đảm chỉ admin thực sự (token role admin) mới qua được bước này.

**TC-MW-005: Truy cập chức năng admin với JWT admin – thành công
Mô tả mục tiêu:** Đảm bảo token JWT của admin được chấp nhận cho các API admin, cho phép thực hiện
chức năng tương ứng. (Kiểm thử positive case của phân quyền).
**Môi trường:** Postman hoặc web (admin login), Backend Node.js.
**Dữ liệu đầu vào:** JWT hợp lệ của tài khoản admin, request tới endpoint admin (vd: POST /api/
flights để thêm chuyến bay).
**Các bước thực hiện:**

1. Lấy token JWT bằng cách đăng nhập tài khoản admin.
2. Gửi request (ví dụ: POST /api/flights) với header Authorization chứa token admin, và body
thông tin chuyến bay hợp lệ.
**Kết quả mong đợi:**
- Middleware kiểm tra JWT hợp lệ, role=Admin, cho phép request đi tiếp.
- Endpoint thực thi chức năng (ở ví dụ, thêm chuyến bay) và trả về kết quả thành công (201 Created,
kèm dữ liệu chuyến bay mới).


- Phía client, admin thấy thao tác thành công (như trong TC-Flight-006).
- Không có lỗi quyền, xác thực nào cản trở khi token hợp lệ và role phù hợp.

**TC-MW-006: Refresh token – cấp mới JWT thành công
Mô tả mục tiêu:** (Nếu hệ thống có triển khai Refresh token) Kiểm thử việc sử dụng refresh token để lấy
access token mới khi token cũ hết hạn.
**Môi trường:** Postman, Backend Node.js có endpoint refresh (ví dụ: /api/auth/refresh).
**Dữ liệu đầu vào:** Một refresh token hợp lệ (được cấp khi đăng nhập, thường lâu hết hạn hơn).
**Các bước thực hiện:**

1. Giả sử khi đăng nhập, hệ thống cấp cả JWT (access token) và refresh token. Chờ cho access token hết
hạn (hoặc giả lập hết hạn).
2. Gửi request POST tới /api/auth/refresh kèm refresh token (thường trong body hoặc cookie tùy
cơ chế).
**Kết quả mong đợi:**
- Backend kiểm tra refresh token: nếu hợp lệ và chưa hết hạn, tạo mới một JWT access token (và có thể
cấp refresh token mới tùy cơ chế).
- Phản hồi 200 với dữ liệu chứa token mới.
- Người dùng nhận được access token mới mà không cần đăng nhập lại.
- Refresh token có cơ chế bảo mật (ví dụ: lưu httpOnly cookie) – test này chủ yếu logic backend: refresh
đúng sẽ cho token mới.
- Nếu refresh token không hợp lệ/hết hạn thì trả lỗi 401 (có thể test thêm: sai refresh token bị từ chối).
_(Lưu ý: Test này chỉ áp dụng nếu QAirline thực sự có refresh token, nếu không thì có thể bỏ qua.)_

**TC-MW-007: Mật khẩu người dùng được mã hóa trong cơ sở dữ liệu
Mô tả mục tiêu:** Đảm bảo an toàn dữ liệu: kiểm tra rằng mật khẩu người dùng không được lưu dưới
dạng plaintext trong DB. _(Đây là kiểm thử bảo mật nội bộ)_
**Môi trường:** CSDL (ví dụ: truy vấn trực tiếp cơ sở dữ liệu), Backend Node.js sử dụng hashing (Bcrypt).
**Dữ liệu đầu vào:** Tài khoản người dùng với mật khẩu đã biết (ví dụ: Password123).
**Các bước thực hiện:**

1. Sau khi đăng ký tài khoản (TC-Auth-001), truy vấn cơ sở dữ liệu bảng người dùng (hoặc in log trong
code) để xem giá trị trường mật khẩu lưu trữ.
**Kết quả mong đợi:**
- Mật khẩu lưu trong DB **không** phải là Password123 dạng thuần, mà là một chuỗi hash (ví dụ:
    $2a$10$Xyz... nếu dùng bcrypt).
- Độ dài chuỗi mật khẩu mã hóa dài (>=60 ký tự nếu bcrypt).
- Xác nhận rằng hệ thống đã mã hóa mật khẩu trước khi lưu, đảm bảo nếu DB lộ, mật khẩu người dùng
vẫn an toàn.
- (Nếu mật khẩu lưu dạng plaintext hoặc chỉ encode đơn giản => đây là bug bảo mật nghiêm trọng. Kết
quả mong đợi là không có bug này).

**Kết luận:** Các test case trên bao phủ toàn bộ chức năng chính của hệ thống QAirline từ frontend đến
backend, đảm bảo mỗi tính năng được kiểm tra kỹ lưỡng: từ quy trình xác thực người dùng, tìm chuyến
bay, đặt vé với chọn ghế và thanh toán, quản lý bài viết, cho đến các kiểm tra bảo mật JWT và phân
quyền. Tài liệu này giúp đội phát triển và kiểm thử hiểu rõ các trường hợp cần kiểm tra, đảm bảo chất
lượng và độ tin cậy của hệ thống trước khi đưa vào sử dụng thực tế.


