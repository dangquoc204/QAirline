# BÁO CÁO KIỂM THỬ UNIT TESTING - DỰ ÁN QAIRLINE

**Ngày báo cáo:** 01/12/2025  
**Thư mục test:** `server/__tests__/`  
**Framework:** Jest

---

## 📊 TỔNG QUAN KẾT QUẢ

| Chỉ số | Giá trị | Tỷ lệ |
|--------|---------|-------|
| **Tổng số test** | 94 | 100% |
| **Test đạt** | 80 | 85.11% |
| **Test lỗi** | 14 | 14.89% |
| **Bộ test đạt** | 7/11 | 63.64% |
| **Bộ test lỗi** | 4/11 | 36.36% |
| **Tổng dòng code (LOC)** | 11,996 dòng | - |
| **KLOC** | 11.996 | - |
| **Tỷ lệ lỗi/KLOC** | **1.167 lỗi/KLOC** | - |

---

## 📁 CHI TIẾT THEO BỘ KIỂM THỬ

### ✅ Bộ Kiểm Thử ĐẠT (7/11)

| # | Bộ Kiểm Thử | Số Test | Đạt | Lỗi | Tỷ Lệ Đạt |
|---|------------|---------|-----|-----|-----------|
| 1 | `post.controller.test.js` | 5 | 5 | 0 | 100% |
| 2 | `admin.service.test.js` | 19 | 19 | 0 | 100% |
| 3 | `flight.service.test.js` | 9 | 9 | 0 | 100% |
| 4 | `payment.service.test.js` | 7 | 7 | 0 | 100% |
| 5 | `auth.middleware.test.js` | 5 | 5 | 0 | 100% |
| 6 | `admin.post.controller.test.js` | 8 | 8 | 0 | 100% |
| 7 | `admin.middleware.test.js` | 2 | 2 | 0 | 100% |

### ❌ Bộ Kiểm Thử LỖI (4/11)

| # | Bộ Kiểm Thử | Số Test | Đạt | Lỗi | Tỷ Lệ Đạt |
|---|-------------|---------|-----|-----|-----------|
| 1 | `customer.controller.test.js` | 12 | 9 | 3 | 75.00% |
| 2 | `auth.controller.test.js` | 14 | 10 | 4 | 71.43% |
| 3 | `booking.controller.test.js` | 10 | 7 | 3 | 70.00% |
| 4 | `admin.flight.controller.test.js` | 7 | 3 | 4 | 57.14% |

---

## 📋 BẢNG TỔNG HỢP CHI TIẾT TẤT CẢ CÁC KIỂM THỬ

| # | Module | Mô Tả Kiểm Thử | Kết Quả |
|---|--------|----------------|---------|
| 1 | Xác Thực (Auth) | Tạo tài khoản mới khi email chưa được sử dụng | ✅ ĐẠT |
| 2 | Xác Thực (Auth) | Từ chối đăng ký khi email đã tồn tại | ✅ ĐẠT |
| 3 | Xác Thực (Auth) | Xác thực trường mật khẩu bắt buộc | ❌ LỖI |
| 4 | Xác Thực (Auth) | Xác thực yêu cầu email | ❌ LỖI |
| 5 | Xác Thực (Auth) | Trả về lỗi 500 khi database gặp sự cố | ✅ ĐẠT |
| 6 | Xác Thực (Auth) | Đăng nhập thành công khi thông tin hợp lệ | ✅ ĐẠT |
| 7 | Xác Thực (Auth) | Từ chối khi email không tồn tại | ✅ ĐẠT |
| 8 | Xác Thực (Auth) | Từ chối khi tài khoản bị vô hiệu hóa | ❌ LỖI |
| 9 | Xác Thực (Auth) | Từ chối khi mật khẩu không hợp lệ | ❌ LỖI |
| 10 | Xác Thực (Auth) | Trả về lỗi 500 khi đăng nhập gặp sự cố | ✅ ĐẠT |
| 11 | Xác Thực (Auth) | Trả về token đặt lại khi email tồn tại | ✅ ĐẠT |
| 12 | Xác Thực (Auth) | Trả về thông báo chung khi email không có trong hệ thống | ✅ ĐẠT |
| 13 | Xác Thực (Auth) | Xác thực sự hiện diện của email | ✅ ĐẠT |
| 14 | Xác Thực (Auth) | Trả về lỗi 500 khi có sự cố | ✅ ĐẠT |
| 15 | Đặt Vé - Khách Hàng | Tạo booking cho người dùng đã đăng nhập và đánh dấu ghế không khả dụng | ✅ ĐẠT |
| 16 | Đặt Vé - Khách Hàng | Trả về lỗi 400 khi thiếu trường bắt buộc | ✅ ĐẠT |
| 17 | Đặt Vé - Khách Hàng | Trả về lỗi 404 khi không tìm thấy chuyến bay đi | ✅ ĐẠT |
| 18 | Đặt Vé - Khách Hàng | Tạo booking mà không có ID khách hàng và cập nhật cả hai ghế | ✅ ĐẠT |
| 19 | Đặt Vé - Khách Hàng | Trả về lỗi 404 khi chuyến bay về bị thiếu | ❌ LỖI |
| 20 | Đặt Vé - Khách Hàng | Hủy booking thuộc sở hữu của khách hàng đã đăng nhập | ✅ ĐẠT |
| 21 | Đặt Vé - Khách Hàng | Trả về lỗi 403 khi booking thuộc về khách hàng khác | ❌ LỖI |
| 22 | Đặt Vé - Khách Hàng | Hủy booking mà không kiểm tra quyền sở hữu | ✅ ĐẠT |
| 23 | Đặt Vé - Khách Hàng | Trả về lỗi 404 khi booking bị thiếu | ✅ ĐẠT |
| 24 | Đặt Vé - Khách Hàng | Trả về chi tiết booking khi mã booking khớp | ✅ ĐẠT |
| 25 | Đặt Vé - Khách Hàng | Trả về lỗi 404 khi không tìm thấy booking | ❌ LỖI |
| 26 | Thông Tin - Khách Hàng | Trả về thông tin hồ sơ khi khách hàng tồn tại | ✅ ĐẠT |
| 27 | Thông Tin - Khách Hàng | Trả về lỗi 404 khi khách hàng bị thiếu | ✅ ĐẠT |
| 28 | Thông Tin - Khách Hàng | Trả về lỗi 500 khi có lỗi không mong đợi | ✅ ĐẠT |
| 29 | Thông Tin - Khách Hàng | Cập nhật thông tin người dùng và khách hàng | ✅ ĐẠT |
| 30 | Thông Tin - Khách Hàng | Trả về lỗi 404 khi không tìm thấy người dùng | ✅ ĐẠT |
| 31 | Thông Tin - Khách Hàng | Trả về lỗi 404 khi bản ghi khách hàng bị thiếu | ✅ ĐẠT |
| 32 | Thông Tin - Khách Hàng | Trả về lỗi 500 khi cập nhật gặp sự cố | ✅ ĐẠT |
| 33 | Thông Tin - Khách Hàng | Đổi mật khẩu thành công | ✅ ĐẠT |
| 34 | Thông Tin - Khách Hàng | Xác thực các trường bắt buộc | ❌ LỖI |
| 35 | Thông Tin - Khách Hàng | Từ chối khi xác nhận mật khẩu mới không khớp | ❌ LỖI |
| 36 | Thông Tin - Khách Hàng | Trả về lỗi 404 khi không tìm thấy người dùng | ✅ ĐẠT |
| 37 | Thông Tin - Khách Hàng | Từ chối khi mật khẩu hiện tại không đúng | ❌ LỖI |
| 38 | Thông Tin - Khách Hàng | Trả về lỗi 500 khi mã hóa thất bại | ✅ ĐẠT |
| 39 | Chuyến Bay - Admin | Tạo chuyến bay và trả về bản ghi đầy đủ | ✅ ĐẠT |
| 40 | Chuyến Bay - Admin | Trả về lỗi 500 khi service gặp sự cố | ❌ LỖI |
| 41 | Chuyến Bay - Admin | Cập nhật chuyến bay và trả về dữ liệu | ✅ ĐẠT |
| 42 | Chuyến Bay - Admin | Trả về lỗi 500 khi chỉnh sửa thất bại | ❌ LỖI |
| 43 | Chuyến Bay - Admin | Xóa chuyến bay và trả về thông báo thành công | ✅ ĐẠT |
| 44 | Chuyến Bay - Admin | Ánh xạ lỗi chuyến bay thiếu sang mã 404 | ❌ LỖI |
| 45 | Chuyến Bay - Admin | Trả về lỗi 500 cho lỗi xóa không mong đợi | ❌ LỖI |
| 46 | Bài Viết | Trả về danh sách bài viết | ✅ ĐẠT |
| 47 | Bài Viết | Trả về lỗi 500 khi service thất bại | ✅ ĐẠT |
| 48 | Bài Viết | Trả về chi tiết bài viết | ✅ ĐẠT |
| 49 | Bài Viết | Ánh xạ lỗi không tìm thấy sang mã 404 | ✅ ĐẠT |
| 50 | Bài Viết | Ánh xạ lỗi không mong đợi sang mã 500 | ✅ ĐẠT |
| 51 | Dịch Vụ Admin | Tạo tài khoản admin mới khi email duy nhất | ✅ ĐẠT |
| 52 | Dịch Vụ Admin | Từ chối tạo khi email đã tồn tại | ✅ ĐẠT |
| 53 | Dịch Vụ Admin | Cập nhật vai trò và email khi dữ liệu hợp lệ | ✅ ĐẠT |
| 54 | Dịch Vụ Admin | Từ chối cập nhật khi email xung đột với người dùng khác | ✅ ĐẠT |
| 55 | Dịch Vụ Admin | Đánh dấu người dùng là bị vô hiệu hóa | ✅ ĐẠT |
| 56 | Dịch Vụ Admin | Ngăn admin tự xóa chính mình | ✅ ĐẠT |
| 57 | Dịch Vụ Admin | Xóa người dùng khác thành công | ✅ ĐẠT |
| 58 | Dịch Vụ Admin | Xây dựng bộ lọc chính xác cho từ khóa, vai trò và trạng thái | ✅ ĐẠT |
| 59 | Dịch Vụ Admin | Tạo bài viết với giá trị đã cắt khoảng trắng | ✅ ĐẠT |
| 60 | Dịch Vụ Admin | Từ chối tạo bài viết khi thiếu tiêu đề | ✅ ĐẠT |
| 61 | Dịch Vụ Admin | Từ chối chỉnh sửa khi không tìm thấy bài viết | ✅ ĐẠT |
| 62 | Dịch Vụ Admin | Từ chối chỉnh sửa khi nội dung mới trống | ✅ ĐẠT |
| 63 | Dịch Vụ Admin | Trả về bài viết theo ID hoặc báo lỗi | ✅ ĐẠT |
| 64 | Dịch Vụ Chuyến Bay | Trả về danh sách chuyến bay với thông tin máy bay | ✅ ĐẠT |
| 65 | Dịch Vụ Chuyến Bay | Báo lỗi khi database thất bại | ✅ ĐẠT |
| 66 | Dịch Vụ Chuyến Bay | Tạo chuyến bay khi máy bay tồn tại | ✅ ĐẠT |
| 67 | Dịch Vụ Chuyến Bay | Báo lỗi khi máy bay không tồn tại | ✅ ĐẠT |
| 68 | Dịch Vụ Chuyến Bay | Cập nhật dữ liệu chuyến bay và trả về chuyến bay đã làm mới | ✅ ĐẠT |
| 69 | Dịch Vụ Chuyến Bay | Báo lỗi khi không tìm thấy chuyến bay | ✅ ĐẠT |
| 70 | Dịch Vụ Chuyến Bay | Báo lỗi khi không tìm thấy máy bay | ✅ ĐẠT |
| 71 | Dịch Vụ Chuyến Bay | Xóa chuyến bay khi tồn tại | ✅ ĐẠT |
| 72 | Dịch Vụ Chuyến Bay | Báo lỗi khi chuyến bay bị thiếu | ✅ ĐẠT |
| 73 | Dịch Vụ Thanh Toán | Đánh dấu booking đã thanh toán khi cổng thanh toán thành công | ✅ ĐẠT |
| 74 | Dịch Vụ Thanh Toán | Trả về phản hồi thất bại khi cổng thanh toán thất bại | ✅ ĐẠT |
| 75 | Dịch Vụ Thanh Toán | Báo lỗi khi không tìm thấy booking | ✅ ĐẠT |
| 76 | Dịch Vụ Thanh Toán | Đặt booking thành đang chờ với hướng dẫn | ✅ ĐẠT |
| 77 | Dịch Vụ Thanh Toán | Xác nhận thanh toán khi trạng thái đang chờ | ✅ ĐẠT |
| 78 | Dịch Vụ Thanh Toán | Báo lỗi khi booking không ở trạng thái đang chờ | ✅ ĐẠT |
| 79 | Dịch Vụ Thanh Toán | Trả về tóm tắt thanh toán cho giao diện | ✅ ĐẠT |
| 80 | Middleware Xác Thực | Từ chối khi thiếu header Authorization | ✅ ĐẠT |
| 81 | Middleware Xác Thực | Từ chối khi không cung cấp token sau Bearer | ✅ ĐẠT |
| 82 | Middleware Xác Thực | Từ chối token không hợp lệ với mã 401 | ✅ ĐẠT |
| 83 | Middleware Xác Thực | Từ chối token hết hạn với thông báo chuyên dụng | ✅ ĐẠT |
| 84 | Middleware Xác Thực | Đính kèm thông tin đã giải mã và gọi next khi thành công | ✅ ĐẠT |
| 85 | Bài Viết - Admin | Tạo bài viết khi dữ liệu hợp lệ và admin tồn tại | ✅ ĐẠT |
| 86 | Bài Viết - Admin | Từ chối khi thiếu tiêu đề | ✅ ĐẠT |
| 87 | Bài Viết - Admin | Từ chối khi không tìm thấy admin | ✅ ĐẠT |
| 88 | Bài Viết - Admin | Cập nhật bài viết thành công | ✅ ĐẠT |
| 89 | Bài Viết - Admin | Trả về lỗi 404 khi bài viết không tồn tại | ✅ ĐẠT |
| 90 | Bài Viết - Admin | Từ chối khi nội dung trở nên trống | ✅ ĐẠT |
| 91 | Bài Viết - Admin | Xóa bài viết thành công | ✅ ĐẠT |
| 92 | Bài Viết - Admin | Trả về lỗi 404 khi xóa bài viết không tồn tại | ✅ ĐẠT |
| 93 | Middleware Admin | Chặn người dùng không phải admin với mã 403 | ✅ ĐẠT |
| 94 | Middleware Admin | Cho phép vai trò admin tiếp tục | ✅ ĐẠT |

**Tổng kết:** 80 ✅ ĐẠT | 14 ❌ LỖI

---

## 🔴 CHI TIẾT CÁC KIỂM THỬ LỖI

### 1. Xác Thực (Auth Controller) - 4 lỗi

| Trường Hợp Kiểm Thử | Chức Năng | Mô Tả Lỗi | Mức Độ |
|---------------------|-----------|-----------|--------|
| Xác thực trường mật khẩu bắt buộc | `register` | Không kiểm tra mật khẩu bắt buộc | CAO |
| Xác thực yêu cầu email | `register` | Không kiểm tra email bắt buộc | CAO |
| Từ chối khi tài khoản bị vô hiệu hóa | `login` | Không kiểm tra trạng thái tài khoản | CAO |
| Từ chối khi mật khẩu không hợp lệ | `login` | Không xác thực mật khẩu đúng | NGHIÊM TRỌNG |

**Nguyên nhân:** Đã loại bỏ validation cho các trường bắt buộc trong `register` và kiểm tra trạng thái/mật khẩu trong `login`

---

### 2. Quản Lý Khách Hàng - Module Người Dùng (3 lỗi)

| Trường Hợp Kiểm Thử | Chức Năng | Mô Tả Lỗi | Mức Độ |
|---------------------|-----------|-----------|--------|
| Xác thực các trường bắt buộc | `changePassword` | Không kiểm tra trường bắt buộc | CAO |
| Từ chối khi xác nhận mật khẩu mới không khớp | `changePassword` | Không kiểm tra xác nhận mật khẩu | CAO |
| Từ chối khi mật khẩu hiện tại không đúng | `changePassword` | Không xác thực mật khẩu hiện tại | CAO |

**Nguyên nhân:** Đã loại bỏ các kiểm tra validation trong hàm changePassword

---

### 3. Quản Lý Đặt Vé (Booking Controller) - 3 lỗi

| Trường Hợp Kiểm Thử | Chức Năng | Mô Tả Lỗi | Mức Độ |
|---------------------|-----------|-----------|--------|
| Trả về 404 khi chuyến bay về bị thiếu | `createBookingNotLogin` | Không kiểm tra chuyến bay về | CAO |
| Trả về 403 khi booking thuộc về khách hàng khác | `cancelBooking` | Không kiểm tra quyền sở hữu | NGHIÊM TRỌNG |
| Trả về 404 khi không tìm thấy booking | `getBookingsDetail` | Trả về mã 200 thay vì 404 | TRUNG BÌNH |

**Nguyên nhân:** Đã loại bỏ validation cho kiểm tra chuyến bay và kiểm tra quyền sở hữu

---

### 4. Quản Lý Chuyến Bay - Admin (4 lỗi)

| Trường Hợp Kiểm Thử | Chức Năng | Mô Tả Lỗi | Mức Độ |
|---------------------|-----------|-----------|--------|
| Trả về 500 khi service gặp sự cố | `addFlight` | Không xử lý lỗi từ service | CAO |
| Trả về 500 khi chỉnh sửa thất bại | `editFlight` | Không xử lý lỗi khi cập nhật | CAO |
| Ánh xạ lỗi chuyến bay thiếu sang mã 404 | `deleteFlight` | Không ánh xạ lỗi đúng mã trạng thái | TRUNG BÌNH |
| Trả về 500 cho lỗi xóa không mong đợi | `deleteFlight` | Không xử lý lỗi không mong đợi | CAO |

**Nguyên nhân:** Đã loại bỏ khối try-catch xử lý lỗi trong các hàm quản lý chuyến bay của admin

---

## 📈 PHÂN TÍCH THEO LOẠI LỖI

### Phân loại lỗi

| Loại Lỗi | Số Lượng | Tỷ Lệ |
|-----------|----------|-------|
| **Thiếu kiểm tra đầu vào (validation)** | 5 | 35.71% |
| **Thiếu kiểm tra xác thực** | 4 | 28.57% |
| **Thiếu xử lý lỗi (error handling)** | 4 | 28.57% |
| **Thiếu kiểm tra phân quyền** | 1 | 7.15% |

### Mức độ nghiêm trọng

| Mức Độ | Số Lượng | Tỷ Lệ | Mô Tả |
|--------|----------|-------|-------|
| **NGHIÊM TRỌNG** | 2 | 14.29% | Lỗi bảo mật nghiêm trọng |
| **CAO** | 10 | 71.43% | Lỗi ảnh hưởng chức năng chính |
| **TRUNG BÌNH** | 2 | 14.29% | Lỗi ảnh hưởng trải nghiệm người dùng |
| **THẤP** | 0 | 0% | - |

---

## 🎯 PHÂN TÍCH ĐỘ BAO PHỦ THEO MODULE

| Module | Tổng Test | Đạt | Lỗi | Độ Bao Phủ |
|--------|-----------|-----|-----|------------|
| **Xác Thực** | 14 | 10 | 4 | 71.43% |
| **Quản Lý Khách Hàng** | 22 | 19 | 3 | 86.36% |
| **Quản Lý Admin** | 34 | 30 | 4 | 88.24% |
| **Dịch Vụ Chuyến Bay** | 9 | 9 | 0 | 100% |
| **Dịch Vụ Thanh Toán** | 7 | 7 | 0 | 100% |
| **Middleware** | 7 | 7 | 0 | 100% |
| **Quản Lý Bài Viết** | 13 | 13 | 0 | 100% |

---

## 🔢 TỶ LỆ LỖI THEO MODULE (Server-side)

> Ghi chú: bảng này sử dụng LOC chỉ từ các file server liên quan trực tiếp đến từng module (controllers, services, routers, models, middlewares). Các file frontend hoặc file phụ khác không được tính ở đây.

| Module | LOC | KLOC | Số Lỗi | Lỗi / KLOC |
|--------|-----:|-----:|--------:|-----------:|
| **Xác Thực (Auth)** | 159 | 0.159 | 4 | 25.158 |
| **Đặt Vé - Khách Hàng (Booking)** | 422 | 0.422 | 3 | 7.109 |
| **Thông Tin - Khách Hàng (Customer Info)** | 312 | 0.312 | 3 | 9.615 |
| **Quản Lý Admin** | 679 | 0.679 | 4 | 5.892 |
| **Dịch Vụ Chuyến Bay** | 186 | 0.186 | 0 | 0.000 |
| **Dịch Vụ Thanh Toán** | 74 | 0.074 | 0 | 0.000 |
| **Middlewares** | 29 | 0.029 | 0 | 0.000 |
| **Bài Viết (Post)** | 33 | 0.033 | 0 | 0.000 |

**Giải thích:** Lỗi / KLOC = `Số Lỗi` chia cho `KLOC` (lỗi trên 1.000 dòng). Những module nhỏ (ví dụ `Auth`) có KLOC thấp dẫn tới hệ số lỗi/KLOC rất lớn — điều này phản ánh mật độ lỗi trên các file đã kiểm tra chứ không phải chất lượng toàn bộ dự án.


## 🔍 DANH SÁCH CÁC LỖI ĐÃ ĐƯỢC THÊM VÀO (MỤC ĐÍCH KIỂM THỬ)

### Tệp: `auth.controller.js`
```javascript
// Dòng ~23: LỖI - Đã loại bỏ validation cho trường password và email trong register
// Dòng ~149: LỖI - Đã loại bỏ kiểm tra tài khoản bị vô hiệu hóa trong login
// Dòng ~154: LỖI - Đã loại bỏ kiểm tra mật khẩu không hợp lệ trong login
```

### Tệp: `customer.controller.js`
```javascript
// Dòng ~218: LỖI - Đã loại bỏ validation đầu vào và kiểm tra chuyến bay trong createBookingNotLogin
// Dòng ~307: LỖI - Đã loại bỏ kiểm tra quyền sở hữu trong cancelBooking (BẢO MẬT NGHIÊM TRỌNG)
// Dòng ~387: LỖI - Đã loại bỏ kiểm tra null trong getBookingsDetail
// Dòng ~621: LỖI - Đã loại bỏ validation đầu vào trong changePassword
// Dòng ~639: LỖI - Đã loại bỏ kiểm tra xác thực mật khẩu trong changePassword
```

### Tệp: `admin.controller.js`
```javascript
// Dòng ~261: LỖI - Đã loại bỏ khối try-catch xử lý lỗi trong addFlight
// Dòng ~288: LỖI - Đã loại bỏ khối try-catch xử lý lỗi trong editFlight
// Dòng ~314: LỖI - Đã loại bỏ xử lý lỗi trong deleteFlight
```

---

## 📋 KHUYẾN NGHỊ

### 🔴 Ưu Tiên CAO (Cần sửa ngay lập tức)

1. **Bảo mật nghiêm trọng:** 
   - Khôi phục kiểm tra quyền sở hữu trong `cancelBooking` (customer.controller.js)
   - Khôi phục kiểm tra mật khẩu hợp lệ trong `login` (auth.controller.js)
2. **Xác thực:** 
   - Thêm lại validation cho mật khẩu và email trong chức năng đăng ký
   - Thêm lại kiểm tra tài khoản bị khóa trong login
3. **Xử lý lỗi:** Khôi phục các khối try-catch trong các controller quản lý chuyến bay của admin

### 🟡 Ưu Tiên TRUNG BÌNH

1. Khôi phục các kiểm tra validation trong module đổi mật khẩu
2. Cải thiện mã phản hồi lỗi (404, 400, 500) cho phù hợp với từng trường hợp
3. Thêm kiểm tra chuyến bay về trong createBookingNotLogin

### 🟢 Cải Thiện Dài Hạn

1. Tăng độ bao phủ kiểm thử cho các trường hợp biên
2. Thêm kiểm thử tích hợp cho các luồng chính
3. Triển khai tài liệu API cho các phản hồi lỗi
4. Thêm ghi nhật ký và giám sát cho môi trường sản xuất

---

## 📊 BIỂU ĐỒ PHÂN BỐ KẾT QUẢ

```
Phân Bố Kết Quả Kiểm Thử:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
████████████████████████████████████░░░░  85.11% Đạt
                                    ░░░░  14.89% Lỗi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🏁 KẾT LUẬN

**Tình trạng dự án:** ⚠️ **CẦN CẢI THIỆN**

- Tỷ lệ đạt **85.11%** nằm dưới ngưỡng khuyến nghị (>95%)
- Có **2 lỗi NGHIÊM TRỌNG** về bảo mật cần được xử lý ngay lập tức
- Có **10 lỗi mức CAO** ảnh hưởng đến chức năng chính
- Các lỗi được phân bổ đều giữa các module
- **Tỷ lệ lỗi: 1.167 lỗi/KLOC** (14 lỗi trên 11.996 KLOC)
  - *Lưu ý: Ngưỡng chất lượng tốt là < 1 lỗi/KLOC*

**Đánh giá chất lượng code:**
- 📊 **11,996 dòng code** được kiểm thử
- 🔴 Tỷ lệ lỗi cao hơn ~1.2 lần so với tiêu chuẩn công nghiệp (< 1 lỗi/KLOC)
- ⚠️ Cần cải thiện nghiêm túc về validation, authentication checks và error handling

**Phân bổ lỗi theo module:**
- Module Xác Thực: 4 lỗi (28.57%)
- Module Quản Lý Admin: 4 lỗi (28.57%)
- Module Khách Hàng: 3 lỗi (21.43%)
- Module Đặt Vé: 3 lỗi (21.43%)

**Các Hành Động Tiếp Theo:**
1. ✅ Sửa lỗi NGHIÊM TRỌNG về phân quyền
2. ✅ Khôi phục các validation đã bị loại bỏ
3. ✅ Thêm lại xử lý lỗi cho các controller admin
4. ✅ Chạy lại bộ kiểm thử để đạt tỷ lệ >95%
5. ✅ Triển khai sau khi tất cả kiểm thử đạt

---

**Người thực hiện:** Trợ lý AI  
**Đánh giá bởi:** Đang chờ  
**Trạng thái:** Bản nháp - Chờ xử lý lỗi
