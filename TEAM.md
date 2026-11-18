# Team

## Thông tin nhóm

- Tên nhóm (`TenNhom`, không dấu, không khoảng trắng): EHEHE
- Lớp: `L3A`
- Repo của bàn: `K5-L3A-DAY10-EHEHE-PoCtoPilotGate1`
- Thẻ sự cố đã bốc (S1–S8):

## Thành viên

Họ tên đầy đủ và MSSV của **mọi** thành viên; thêm dòng nếu cần. Vai: Kỹ sư cổng · Sản phẩm và kinh doanh · Vận hành và pháp lý (README mục 3, phút 0–15).

| STT | Họ và tên | MSSV | Vai | Trưởng nhóm |
| --: | --------- | ---- | --- | :---------: |
|   1 | Nguyễn Hoàng Việt | 03487 | Kỹ sư cổng | x |
|   2 | Đỗ Hoàng Minh | 03507 | Kỹ sư cổng | |
|   3 | Nguyễn Lâm Hoàng | 03448 | Sản phẩm và kinh doanh | |
|   4 | Đoàn Gia Long | 03443 | Vận hành và pháp lý | |

Ghi `members` trong `submission/submission.json` theo dạng `"HoVaTen-MSSV"`, khớp bảng trên.

## Cá nhân

Mỗi thành viên tự viết một mục bên dưới (chép mẫu, đổi tiêu đề thành họ tên không dấu và MSSV, ví dụ `## NguyenVanAn-20241234`).

## NguyenHoangViet-03487

### Phần việc phụ trách

Kỹ sư cổng (Lead); quản lý repo, chạy các lệnh chính, code cổng phòng ngừa trong `lab10/guards.py`, Phiếu B (B1, B7.1), Phiếu C (C7).

### Đóng góp cụ thể

...

### Bằng chứng

Mã commit, mã lần chạy (`runs/<mã>`), dòng trong phiếu.

### Exit ticket

Một điều học được, một điều còn chưa chắc.

---

## DoHoangMinh-03507

### Phần việc phụ trách

Kỹ sư cổng; phân tích trace lỗi, viết bài kiểm tra hành vi (behavioral test), thêm chỉ số theo dõi trong `lab10/monitors.py`, Phiếu A (A2-Offline, A3), Phiếu B (B2, B7.2, B7.3), Phiếu C (C2, C8).

### Đóng góp cụ thể

...

### Bằng chứng

Mã commit, mã lần chạy (`runs/<mã>`), dòng trong phiếu.

### Exit ticket

Một điều học được, một điều còn chưa chắc.

---

## NguyenLamHoang-03448

### Phần việc phụ trách

Sản phẩm và kinh doanh; mục tiêu hệ thống, viết tiêu chí chấp nhận (`config/acceptance_criteria.json`), cổng kinh doanh (`config/operating_gates.json`), Phiếu A (A1.1, A4), Phiếu B (B3, B7.4, B8-v1), Phiếu C (C5, C12-v2).

### Đóng góp cụ thể

CP2: soạn mục tiêu cấp hệ thống tại Phiếu A câu 1.1; hoàn thiện câu 1.6 (câu tiêu chí, hai ranh giới đầu ra, bốn câu hỏi soát, căn cứ ngưỡng kinh doanh và lịch rà soát). Điền `config/acceptance_criteria.json`, gồm thông tin người ký, ngưỡng và bốn nhánh quyết định; thống nhất nội dung bản thảo giữa Phiếu A và JSON. Chưa thực hiện ký niêm phong hoặc chạy đánh giá. Có sử dụng Codex để hỗ trợ soạn thảo, đối chiếu PRD/eval card Lab 9 và dữ liệu `ops_limits`, `ops_facts`, kiểm tra JSON và tính nhất quán của ngưỡng.

### Bằng chứng

`templates/form-a-criteria.md`: câu 1.1 và mục A4, câu 1.6; `config/acceptance_criteria.json`: `required`, `nice_to_have`, `business_ops`, `stop_condition`, `decision_rule`. Chưa có mã commit cho thay đổi CP2 này; bổ sung sau khi commit. Chưa có mã lần chạy vì CP2 phải chốt và ký tiêu chí trước khi đánh giá.

### Exit ticket

Một điều học được, một điều còn chưa chắc.

---

## DoanGiaLong-03443

### Phần việc phụ trách

Vận hành và pháp lý; mục tiêu góc nhìn các bên, telemetry production, HAZOP mở rộng, checklist 9 nhóm việc, cổng vận hành & pháp lý (`config/operating_gates.json`), Runbook, Phiếu A (A1.2, A2-Prod), Phiếu B (B4, B5, B7.5, B7.6), Phiếu C (C4, C11), gom bài nộp.

### Đóng góp cụ thể

...

### Bằng chứng

Mã commit, mã lần chạy (`runs/<mã>`), dòng trong phiếu.

### Exit ticket

Một điều học được, một điều còn chưa chắc.
