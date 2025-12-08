# Báo cáo Kiểm thử Hệ thống (Jest + Supertest)

**Ngày chạy**: 2025-12-08  \
**Lệnh**: `npm test -- --runInBand`  \
**Nền tảng**: Node (sqlite in-memory cho môi trường test)

## Tổng quan
- **Test suites**: 18 (11 passed, 7 failed)
- **Test cases**: 93 (77 passed, 16 failed)
- **Tỷ lệ pass**: ~82.8% (dưới mục tiêu 85-90%)

## Kết quả chi tiết theo file
| File | Trạng thái | Pass/Total | Lỗi/Quan sát chính |
| --- | --- | --- | --- |
| `tests/auth-security.test.js` | Failed | 2/9 | `/api/auth/register` thiếu password/email trả 500 thay vì 400; login sai mật khẩu/disabled vẫn 200; login thiếu body trả 500. |
| `tests/booking-integrity.test.js` | Failed | 3/10 | Cho phép double-book ghế (201); guest booking thiếu payment trả 500 thay vì 400; hủy booking bởi user khác không bị chặn (200); booking-detail thiếu mã trả 500; booking-cancelNotLogin id sai trả 500/404 không ổn định. |
| `tests/booking.test.js` | Failed | 4/5 | Guest booking với totalPrice null gây 500 (Sequelize notNull total_price); test kỳ vọng bug-path 201 nhưng hệ thống trả 500. |
| `tests/profile-security.test.js` | Failed | 3/8 | `/change-password` thiếu field trả 500; sai mật khẩu hiện tại vẫn 200; bcrypt lỗi data/hash khi thiếu payload. |
| `tests/passenger.test.js` | Failed | 2/3 | `/booking-detail` thiếu booking_code gây 500 (WHERE undefined); track booking không trả 404/200 ổn định. |
| `tests/admin-flights.test.js` | Failed | 3/7 | Edit flight / update status trên flight không tồn tại trả 500 nhưng không 404; status update kỳ vọng 404 trong đường lỗi. |
| `tests/payment.test.js` | Failed | 2/3 | Guest booking thiếu paymentDetails gây 500 (TypeError đọc paymentMethod null) thay vì validate. |
| `tests/customer-search.test.js` | Passed | 5/5 | — |
| `tests/profile.test.js` | Passed | 5/5 | Có log profile ra console. |
| `tests/auth.test.js` | Passed | 6/6 | — |
| `tests/admin-airplanes.test.js` | Passed | 4/4 | Update airplane thiếu dữ liệu log validation warning nhưng test pass. |
| `tests/admin-bookings.test.js` | Passed | 2/2 | — |
| `tests/security.test.js` | Passed | 4/4 | — |
| `tests/flights.test.js` | Passed | 3/3 | — |
| `tests/security-hardening.test.js` | Passed | 8/8 | — |
| `tests/admin-posts.test.js` | Passed | 4/4 | — |
| `tests/posts.test.js` | Passed | 3/3 | — |
| `tests/airplanes-public.test.js` | Passed | 2/2 | — |

## Lỗi nổi bật cần xử lý
- **Auth**: Thiếu validation email/password ở register & login; không chặn tài khoản disabled; login thiếu body ném 500.
- **Booking**: Cho phép double-book, thiếu check paymentDetails/totalPrice dẫn tới 500; thiếu ownership check khi hủy; booking-detail không kiểm tra booking_code null.
- **Profile/Password**: `/change-password` không kiểm tra input, gây bcrypt lỗi và cho phép đổi với mật khẩu sai.
- **Payment**: booking guest đọc `paymentDetails.paymentMethod` khi null -> TypeError.
- **Admin Flights**: edit/status update flight không tồn tại trả 500 thay vì 404.
- **Passenger/Tracking**: booking-detail và track booking không kiểm tra đầu vào, lỗi WHERE undefined.

## Đề xuất khắc phục ưu tiên
1) Bổ sung validation cứng (400) cho auth register/login, booking (totalPrice, paymentDetails, booking_code), change-password.  
2) Thêm kiểm tra quyền sở hữu booking và chặn double-book ghế (is_available + transaction/lock).  
3) Bọc try/catch cho admin flight edit/delete/status, trả 404 khi không tìm thấy.  
4) Sửa booking-detail: yêu cầu `booking_code`, trả 400/404 hợp lý; track booking phải trả 404 khi không tồn tại.  
5) Kiểm soát paymentDetails null để trả 400, không ném TypeError.

## Số liệu so với mục tiêu
- Số test cases: 93 (đạt khung 80-120).  
- Tỷ lệ pass: ~82.8% (cần ≥85-90% ⇒ cần fix lỗi trên và chạy lại).
