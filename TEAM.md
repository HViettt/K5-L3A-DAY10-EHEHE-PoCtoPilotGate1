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

- **CP1:** Khởi tạo repository, cấu hình remotes (`origin`, `upstream`), chạy và xác minh 13 unit tests ban đầu.
- **CP2:** Kiểm tra xác thực hash Bản tiêu chí chấp nhận `fc643207ba4b`, niêm phong và ký commit `ac142e5` (`Sign acceptance criteria`), điền Phiếu A câu A5.
- **CP3:** Chạy baseline eval `R-base-before-20261118-154707-bde05c`, phân tích thất bại do model ghi đè ở ticket `T-002@55`. Lập trình các cổng an toàn trong `lab10/guards.py` (`write_gate` đối chiếu `db_delay_days`, ép số tiền theo `entitlement_vnd`, chặn ghi lỗi oan hãng vận chuyển và khống chế trần hoàn tiền ngày). Đạt 100% pass_rate ở lần chạy `R-base-after-20261118-154750-9b3d65`. Thực hiện chốt snapshot cổng vòng 1 (`python -m lab10.checkpoint` in hash `2d6a4b19`). Chạy mốc prepared `R-base-prepared-20261118-163056-616d15`. Hoàn thành mục B0, B1, B7.1 và đồng ký quyết định Gate 1 v1 ở mục B8 trong Phiếu B.
- **CP4 & CP5:** Triển khai cổng phòng ngừa sự cố S7 ở `write_gate` (whitelist 4 trường payload gửi hãng `order_id`, `parcel_id`, `district`, `delay_days`), triệt tiêu 30 ca PII leaks về 0 (`R-S7-after-20261118-163818-42c6e2`). Hoàn thiện mục C7 trong Phiếu C và đồng ký quyết định Gate 1 v2 ở mục C12.

### Bằng chứng

- Commit: `ac142e5` (Sign acceptance criteria), `2734717` (chốt snapshot cổng vòng 1 và S7 guards).
- Hash chốt vòng 1: `2d6a4b19`
- Mã lần chạy: `R-base-before-20261118-154707-bde05c`, `R-base-after-20261118-154750-9b3d65`, `R-base-prepared-20261118-163056-616d15`, `R-S7-after-20261118-163818-42c6e2`.
- File & mục trong phiếu: `lab10/guards.py`, `lab10/guards_round1.py`, `templates/form-b-evaluation-gates.md` (mục B0, B1, B7.1, B8), `templates/form-c-incident.md` (mục C7, C12).

### Exit ticket

- **Một điều học được:** Khi xây dựng AI Agent trong môi trường doanh nghiệp có rủi ro tài chính và pháp lý, tuyệt đối không được để model tự do gọi API ghi đè hoặc chuyển tiếp dữ liệu phi cấu trúc, mà bắt buộc phải thiết lập các Cổng kiểm soát ghi (write gates) cứng rắn với whitelist và kiểm tra chéo nguồn sự thật (Ground Truth) từ Database.
- **Một điều còn chưa chắc:** Việc loại bỏ hoàn toàn trường ghi chú tự do `customer_note` khi gửi thông báo cho hãng vận chuyển có thể làm thiếu các chỉ dẫn giao nhận đặc biệt hợp lệ của khách hàng đối với các đơn hàng phức tạp.

---

## DoHoangMinh-03507

### Phần việc phụ trách

Kỹ sư cổng; phân tích trace lỗi, viết bài kiểm tra hành vi (behavioral test), thêm chỉ số theo dõi trong `lab10/monitors.py`, Phiếu A (A2-Offline, A3), Phiếu B (B2, B6-Kỹ thuật, B7.2, B7.3), Phiếu C (C2, C8).

### Đóng góp cụ thể

- **Phiếu A:** Hoàn thành thiết kế Offline Metric cho bước `file_carrier_fault` (câu 1.3 mục A2) với đầy đủ 3 ô Thước đo / Dữ liệu / Cách tính và điểm mù thực tế; Đọc và phân tích kết quả thống kê có khoảng tin cậy 95% bootstrap (câu 1.5 mục A3).
- **Phiếu B:** Dò trace `T-002@55`, lập bảng soát lỗi chi tiết cho 2 lỗi chìm (hoàn tiền sai và phạt oan hãng vận chuyển), chỉ ra nguồn gốc tầng Đầu vào do `model_override` và đề xuất hướng xử lý trao quyền kiểm soát cho người duyệt (câu 2.2 mục B2); Đóng góp lý do thất bại lăng kính Kỹ thuật trong Pre-mortem 4 lăng kính (câu 2.5 mục B6); Nêu 2 bước cụ thể ngăn ngừa rò rỉ dữ liệu trong kiểm thử cổng (câu 2.7 mục B7.2); Phát biểu tính chất bất biến và thiết kế 2 ticket hiểm chạy trace adhoc kiểm thử hành vi (câu 2.8 mục B7.3).

### Bằng chứng

- Commit: `23c8760` (Phiếu A: hoàn thành câu 1.3 và 1.5) và commit hoàn thành Phiếu B.
- File & mục trong phiếu: `templates/form-a-criteria.md` (mục A2 cột Offline, mục A3); `templates/form-b-evaluation-gates.md` (mục B2, B6, B7.2, B7.3).

### Exit ticket

- **Một điều học được:** Khi model tin tưởng tuyệt đối vào lời khách khai (`trust_claim: true`) và kích hoạt `model_override`, hệ thống sẽ gây ra các lỗi chìm (silent failures) rất nguy hiểm: vừa làm thất thoát quỹ bồi hoàn vừa phạt oan đối tác vận chuyển mà không hề phát sinh lỗi runtime.
- **Một điều còn chưa chắc:** Khi đặt cổng escalate mọi ca có ngày khách khai lệch tracking DB sang người duyệt, liệu dung lượng ca trực (`review_capacity_per_hour = 6`) có bị quá tải trong giờ cao điểm hay không.

---

## NguyenLamHoang-03448

### Phần việc phụ trách

Sản phẩm và kinh doanh; mục tiêu hệ thống, viết tiêu chí chấp nhận (`config/acceptance_criteria.json`), cổng kinh doanh (`config/operating_gates.json`), Phiếu A (A1.1, A4), Phiếu B (B3, B7.4, B8-v1), Phiếu C (C5, C12-v2).

### Đóng góp cụ thể

CP2: soạn mục tiêu cấp hệ thống tại Phiếu A câu 1.1; hoàn thiện câu 1.6 (câu tiêu chí, hai ranh giới đầu ra, bốn câu hỏi soát, căn cứ ngưỡng kinh doanh và lịch rà soát). Điền các ngưỡng và bốn nhánh quyết định trong `config/acceptance_criteria.json`; thống nhất nội dung bản thảo giữa Phiếu A và JSON. Phần ký niêm phong và commit/push tiêu chí do Nguyễn Hoàng Việt phụ trách theo phân công.

CP3: điền bản đồ dữ liệu và phân tích drift chính sách ngày 01/12/2026 ở B3; đặt bốn cổng kinh doanh ở B7.4 và mục `business` trong `config/operating_gates.json`, giải thích bằng `ops_limits`, `ops_facts`.

CP4 — S7: phân tích hai đường rò rỉ từ nội dung ticket và từ dữ liệu người nhận trong DB; viết specification bốn trường được phép gửi hãng và giả định môi trường ở C5. Đối chiếu trace `S7-01@11`, `S7-20@11` và ca hợp lệ `S7-05@11` tại mốc `after`.

CP5: soạn ba dòng bắt buộc ở C12 về giả định chia sẻ dữ liệu người nhận, giới hạn bảo vệ của cổng hiện tại và việc cần đo lại trong pilot thật; đối chiếu các ngưỡng tài chính, vận hành và an toàn đã ký.

### Bằng chứng

CP2: commit `2e562ee` — phần câu 1.1 và A4 trong `templates/form-a-criteria.md`, các ngưỡng và quy tắc trong `config/acceptance_criteria.json`. Bản tiêu chí được niêm phong ở commit `ac142e5` — `Sign acceptance criteria`.

CP3: `templates/form-b-evaluation-gates.md` mục B3, B7.4; `config/operating_gates.json` mục `business`. Căn cứ: `data/world.json` mục `policies`, `orders[].parcels`, `ops_limits`, `ops_facts` và cách chọn chính sách trong `lab10/helpers.py`, `lab10/agent.py`.

CP4: `incidents/S7/card.md`, `tickets.jsonl`, `world_patch.json`; `templates/form-c-incident.md` mục C5. Trace mốc `after`: `S7-01@11` có `customer_note`, `S7-20@11` có `recipient_contact`, cả hai báo `no_pii_to_carrier = False`; `S7-05@11` đạt và hoàn đúng 18.000đ.

CP5: `templates/form-c-incident.md` mục C12, ba dòng bắt buộc; `submission/submission.json` mục `three_lines`.

### Exit ticket

Một điều học được, một điều còn chưa chắc.

---

## DoanGiaLong-03443

### Phần việc phụ trách

Vận hành và pháp lý; mục tiêu góc nhìn các bên, telemetry production, HAZOP mở rộng, checklist 9 nhóm việc, cổng vận hành & pháp lý (`config/operating_gates.json`), Runbook, Phiếu A (A1.2, A2-Prod), Phiếu B (B4, B5, B7.5, B7.6), Phiếu C (C4, C11), gom bài nộp.

### Đóng góp cụ thể

- **CP1 & CP2:** Soạn thảo mục tiêu theo góc nhìn các bên (khách hàng, tài xế, tài chính) tại câu 1.2 Phiếu A; thiết kế Production Telemetry cho bước `file_carrier_fault` (A2) với chỉ số `carrier_dispute_rate` và cơ chế cảnh báo.
- **CP3:** Thực hiện phân tích HAZOP vòng 1 cho 3 công cụ chính (`issue_refund`, `file_carrier_fault`, `notify_carrier`) tại mục B4 Phiếu B; hoàn thiện bảng Checklist go-live 9 nhóm việc (B5); soạn thảo quy trình vận hành và Runbook phần 1–3 cùng kịch bản ứng phó giờ cao điểm (B7.5, B7.6); cấu hình cổng vận hành và pháp lý (`operations`, `legal`) trong `config/operating_gates.json`.
- **CP4 & CP5:** Phân tích HAZOP thẻ S7 tại C4; cập nhật checklist và viết Runbook phần 4–5 (C11) về phương án xử lý sự cố rò rỉ dữ liệu cá nhân sang bên thứ ba.

### Bằng chứng

- Commit: `2efc08c` (Phiếu B: HAZOP B4, checklist B5, pre-mortem B6, runbook B7.5-B7.6; config operations, legal).
- File & mục trong phiếu: `templates/form-a-criteria.md` (mục A1.2, A2), `templates/form-b-evaluation-gates.md` (mục B4, B5, B7.5, B7.6), `config/operating_gates.json` (mục `operations`, `legal`).

### Exit ticket

- **Một điều học được:** Các rủi ro pháp lý và tranh chấp đối tác (như phạt oan hãng vận chuyển hay rò rỉ PII) luôn cần các điều kiện dừng tự động rõ ràng (stop conditions) và quy trình runbook chặt chẽ từ tín hiệu cảnh báo đến người bấm nút dừng tối đa 15 phút.
- **Một điều còn chưa chắc:** Việc phân bổ hạn mức chi phí bồi thường và năng lực duyệt tay 6 ca/giờ có thể chịu áp lực lớn khi lưu lượng ticket tăng đột biến trong các đợt bão lũ kéo dài.
