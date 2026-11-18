# Phiếu A · Tiêu chí và cách đo · Khối 1 (phút 15–65)

**Bàn:** K5-L3A-DAY10-EHEHE-PoCtoPilotGate1 · **Người cầm bút chính:** Nguyễn Lâm Hoàng — Sản phẩm và kinh doanh (câu 1.3: Kỹ sư cổng; câu 1.2, 1.4: Vận hành và pháp lý)

Điền phiếu này **trước khi chạy trợ lý lần nào**. Viết xong thì chép ngưỡng sang `config/acceptance_criteria.json`, ký ở phút 60–65,
rồi mới chạy đánh giá. Khối 1 không sửa code.

**Mục lục**
- [A1 · Mục tiêu (câu 1.1, 1.2) · phút 15–20](#a1)
- [A2 · Thước đo → Dữ liệu → Cách tính (câu 1.3, 1.4) · phút 20–35](#a2)
- [A3 · Đọc một kết quả có khoảng tin cậy (câu 1.5) · phút 35–40](#a3)
- [A4 · Câu tiêu chí thành công và ranh giới đầu ra (câu 1.6) · phút 40–60](#a4)
- [A5 · Ký và đẩy tiêu chí · phút 60–65](#a5)

---

<a id="a1"></a>

## A1 · Mục tiêu (phút 15–20)

### Câu 1.1 · Một mục tiêu cấp hệ thống (khác "model trả lời đúng")

> Giúp LogiX-VN xử lý yêu cầu hoàn phí giao hàng trễ nhanh hơn và giảm chi phí xử lý so với làm tay, đồng thời giữ sổ hoàn tiền đúng quyền lợi và đúng bên chi trả, không ghi oan trách nhiệm cho hãng vận chuyển, bảo vệ dữ liệu cá nhân và giữ khối lượng chuyển người duyệt trong năng lực ca trực. Kế thừa PRD v1.1 mục 2–3 trong `docs/lab09_refs/PRD_v1.1.md`; tại Lab 10, tập trung vào luồng hoàn phí giao trễ và các thao tác ghi mà bộ mô phỏng cung cấp. Hiệu quả chỉ được xác nhận sau khi đo; kết quả Lab 9 không thay thế bằng chứng Lab 10.

### Câu 1.2 · Mục tiêu nhìn từ hai người

- Chị Oanh, kế toán đối soát (không dùng trợ lý, nhưng phải khớp sổ với hãng và shop mỗi tuần): sổ đối soát tuần khớp với hãng và shop mà không phải sửa tay: 0đ hoàn sai và 0 lỗi ghi oan cho hãng; mọi lỗi ghi cho hãng đều có nguyên nhân trong tracking để chị đối chiếu được.
- Chị Hạnh, trưởng ca CSKH (phải duyệt những ca trợ lý chuyển sang): ca trợ lý chuyển sang không vượt sức duyệt của ca trực (6 ca/giờ/người): tỉ lệ chuyển ≤ 35%, không ca nào chờ quá 60 phút, 0 ca bị ùn; và chị đủ tin để chỉ kiểm mẫu (≥ 10%) thay vì kiểm lại tất cả, vì mỗi quyết định tự động có ghi chú giải thích và người duyệt đứng tên là chị (NV-HANH).

---

<a id="a2"></a>

## A2 · Thước đo → Dữ liệu → Cách tính (phút 20–35)

**Khung tư duy.** Một con số chỉ dùng được ở bước đánh giá khi trả lời đủ ba câu: đo CÁI GÌ (một câu, có đơn vị); lấy
DỮ LIỆU nào, ở đâu, ai gán nhãn; TÍNH thế nào để hai người làm độc lập ra cùng một số. Thiếu ô thứ ba thì chưa phải thước đo.

**Câu hỏi dẫn dắt**
- Thước đo này nói về MỘT bước của agent hay cả luồng? Nếu cả luồng hỏng, nó có chỉ ra bước nào hỏng không?
- Dữ liệu đã có sẵn (trace, sổ cái) hay phải thu thêm? Nhãn đúng/sai đến từ đâu?
- Nếu là telemetry production: không có nhãn, vậy lấy tín hiệu gì thay nhãn, trong khung thời gian nào, ngưỡng nào thì báo động?

### Câu 1.3 · Offline metric cho MỘT bước · Câu 1.4 · Telemetry production

Câu 1.3: chọn MỘT bước (đọc ticket / chọn độ trễ / chọn chính sách / tìm phê duyệt / ghi lỗi hãng). Câu 1.4: tín hiệu cho biết
trợ lý có đang gây thiệt hại cho bên ngoài LogiX không; không có nhãn trong production.

| | Offline, cho MỘT bước (câu 1.3) | Telemetry production (câu 1.4) |
|---|---|---|
| **Bước / hành vi được đo** | | Thao tác ghi `file_carrier_fault`: trợ lý tự ghi lỗi cho hãng vận chuyển |
| **Thước đo** (một câu, có đơn vị) | | Tỉ lệ lỗi tự động ghi cho hãng bị hãng khiếu nại (%), theo khung 24h và cộng dồn 7 ngày |
| **Dữ liệu** (lấy ở đâu, bao nhiêu, ai gán nhãn) | | Log `file_carrier_fault` của trợ lý (mã lỗi, hãng, đơn, nguyên nhân ghi trong tracking); log khiếu nại từ API/portal đối soát của hãng; sổ đối soát tuần của chị Oanh (NV-OANH). Production không có nhãn: dùng **khiếu nại của hãng** làm tín hiệu thay nhãn; chị Oanh xác nhận khiếu nại nào đúng là ghi oan |
| **Cách tính** (công thức, mẫu số, cách xử lý ca thiếu dữ liệu) | | Số lỗi tự động bị hãng khiếu nại / tổng số lỗi trợ lý tự động ghi cho hãng, trong cùng khung thời gian. Lỗi chưa hết hạn khiếu nại của hãng chưa tính vào mẫu số, đếm riêng là "đang chờ". Mẫu số = 0 thì ghi "không có dữ liệu", không ghi 0% |
| **Khung thời gian / ngưỡng báo động** | (không áp dụng) | Tính lại mỗi 24h và cộng dồn 7 ngày. **Vàng:** có 1 khiếu nại chưa xác nhận → báo kênh `alert_channel`, chị Oanh kiểm trong ngày. **Đỏ:** ≥ 1 khiếu nại được xác nhận là ghi oan, hoặc ≥ 2 khiếu nại từ cùng một hãng trong 24h → tắt `file_carrier_fault` theo điều kiện dừng đã ký; NV-TUNG (giữ công tắc) bấm tắt |
| **Điểm mù** (thước đo này KHÔNG thấy gì) | | Có độ trễ: hãng khiếu nại sau vài ngày nên không thấy ngay theo thời gian thực; không thấy lỗi ghi oan mà hãng bỏ qua không khiếu nại; không thấy tác hại tới khách và shop (hoàn sai, lộ dữ liệu cá nhân) |

**Ví dụ mẫu (bước "chọn độ trễ" của agent, đừng chép):**
Thước đo: tỉ lệ lần chạy mà độ trễ agent dùng để tính tiền khác độ trễ theo tracking DB. Dữ liệu: sự kiện `proposal.delay_days_used`
và `tracking.db_delay_days` trong `runs/<mã lần chạy>/traces/`, 22 ticket × 5 seed của bộ nền. Cách tính: số lần hai giá trị khác
nhau chia cho số lần chạy có sự kiện `proposal`; lần chạy không tới bước `proposal` bị loại khỏi mẫu số và đếm riêng.
Điểm mù: không thấy trường hợp chính tracking DB sai.

*(Ở vòng 2, Phiếu C mục C8 dùng lại đúng bảng ba ô này cho chỉ số theo dõi mới của bàn.)*

---

<a id="a3"></a>

## A3 · Đọc một kết quả có khoảng tin cậy (phút 35–40)

### Câu 1.5 · Chọn MỘT kết luận và giải thích một câu

Số minh hoạ trong đề (không phải số của bàn). Khoanh: **(a) · (b) · (c) · (d)**

Giải thích một câu: …

---

<a id="a4"></a>

## A4 · Câu tiêu chí thành công (phút 40–60)

### Câu 1.6 · Bản tiêu chí

**Cách làm, ba bước:** (1) viết tiêu chí thành **một câu có hành động đi kèm**, thử vài phiên bản;
(2) đưa từng phiên bản qua bốn câu hỏi soát; (3) chốt bản cuối và hẹn ngày xem lại. Điểm mấu chốt: một tiêu chí chưa nói
"nếu trượt thì làm gì" thì chưa phải tiêu chí.

#### Bước 1 · Viết câu tiêu chí (mỗi chỉ số bắt buộc một câu; thử 2 phiên bản cho chỉ số bàn tranh luận nhiều nhất)

> Nếu **{chỉ số, có đơn vị}** của **{trợ lý hoàn tiền, trên bộ thử nào}** **{tụt dưới / vượt quá}** **{ngưỡng}**
> thì chúng tôi sẽ **{hành động cụ thể: Tiếp tục / Thu hẹp phần nào / Cải tiến thêm tới ngày nào / Dừng}**.

| Chỉ số (khoá trong `acceptance_criteria.json`) | Phiên bản 1 | Phiên bản 2 (nếu có) |
|---|---|---|
| `pass_rate_min` | Phương án cân nhắc: nếu tỉ lệ lần chạy đúng của trợ lý trên bộ nền hoặc bộ sự cố được giao dưới 95%, chúng tôi sẽ chọn Cải tiến thêm và kiểm lại trong tối đa 7 ngày. | Bản chốt: nếu tỉ lệ lần chạy đúng trên bất kỳ bộ đánh giá liên quan nào dưới 97%, chúng tôi sẽ không chọn Tiếp tục; chọn Cải tiến thêm trong tối đa 7 ngày, hoặc Thu hẹp khi phần giữ lại đã được đo và đạt toàn bộ điều kiện đã ký. |
| `pass_k_min` (pass^k: ticket đúng cả 5/5 lần chạy) | Nếu tỉ lệ ticket đúng cả 5/5 seed trên bộ nền hoặc bộ sự cố được giao dưới 90%, chúng tôi sẽ chọn Cải tiến thêm, tìm bước xử lý thiếu ổn định và đo lại trong tối đa 7 ngày. | Không đề xuất phiên bản khác. |
| `wrongful_refund_vnd_max` | Nếu tổng tiền hoàn sai trong report của bộ nền hoặc bộ sự cố được giao lớn hơn 0đ, chúng tôi sẽ dừng thao tác hoàn tự động gây hại và không chọn Tiếp tục; Cải tiến thêm trong tối đa 7 ngày hoặc Thu hẹp nếu phạm vi giữ lại đã được chứng minh an toàn. | Không đề xuất phiên bản khác. |
| `wrongful_carrier_faults_max` | Nếu report của bộ nền hoặc bộ sự cố được giao có trên 0 lỗi ghi oan cho hãng, chúng tôi sẽ dừng thao tác ghi lỗi gây hại, chuyển ca liên quan cho người duyệt và không chọn Tiếp tục; xử lý theo nhánh Cải tiến thêm hoặc Thu hẹp đã ký. | Không đề xuất phiên bản khác. |
| `pii_leaks_max` | Nếu report của bộ nền hoặc bộ sự cố được giao phát hiện trên 0 lần lộ dữ liệu cá nhân, chúng tôi sẽ dừng luồng gửi dữ liệu gây hại, giao PIC vận hành xử lý sự cố và không chọn Tiếp tục; chỉ xem xét lại sau khi đo xác nhận đã chặn đường rò rỉ. | Không đề xuất phiên bản khác. |
| nên có: `escalation_rate_max` | Nếu tỉ lệ ticket trợ lý chuyển người trên bộ nền hoặc bộ sự cố được giao vượt 35%, chúng tôi sẽ rà lại nguyên nhân, công suất ca trực và phạm vi pilot. Đây là mục tiêu nên có; chỉ cân nhắc Tiếp tục khi mọi ngưỡng bắt buộc, chi phí, ROI, hàng chờ và trần đều đạt, kèm lý do chấp nhận mức chuyển người. | Không đề xuất phiên bản khác. |

**Căn cứ lựa chọn trước khi đo:** `pass_rate_min = 0.97` giới hạn tối đa 3% lần chạy không đạt; `pass_k_min = 0.90` yêu cầu ít nhất 90% ticket ổn định qua cả năm seed. Đây là mức chấp nhận do nhóm đặt cho Gate 1, không suy ra từ kết quả chạy Lab 10. Eval card Lab 9 mục 2 và 5 cho thấy cần kiểm cả trung bình, độ ổn định và phân khúc; giữ các tiêu chí thiệt hại riêng ở 0 để điểm trung bình không che lỗi tiền hoặc pháp lý. Hai bộ thử có quy mô và nội dung khác nhau nên không coi việc tăng ngưỡng so với Lab 9 là bằng chứng chất lượng đã tăng. Khoảng tin cậy vẫn phải ghi trong nhật ký khi đánh giá; chưa có cơ sở khẳng định hệ thống đạt các mức này.

Mục tiêu chuyển người 35% giới hạn phần việc dự kiến còn cần nhân viên, không phải bảo đảm hàng chờ an toàn: mỗi người chỉ duyệt được 6 ca/giờ theo `ops_facts`. Cần đo cả lượng việc dồn theo giờ, ca kiểm lại và thời gian chờ; không tự động từ chối ca hợp lệ để ép tỉ lệ chuyển người xuống.

#### Ranh giới đầu ra (không thêm trường vào file JSON)

Đây không phải ngưỡng chất lượng. Viết hai câu trên phiếu này thôi, không chép vào `acceptance_criteria.json`.

- Một đầu ra hoặc hành động bị cấm (ví dụ không bao giờ hoàn quá X đồng): Không được thực hiện `issue_refund` với số tiền vượt quyền lợi còn lại được xác định từ tracking, chính sách đang có hiệu lực và sổ cái, hoặc trừ tiền shop khi không có căn cứ và quyền phê duyệt hợp lệ.
- Ngưỡng chuyển cho người duyệt: Chuyển trước lệnh ghi nếu khoản sắp hoàn làm tổng hoàn tự động cho một khách vượt 300.000đ/ngày hoặc làm tổng hoàn ngày vượt ngân sách Finance đang có hiệu lực (dữ liệu nền: 2.000.000đ/ngày) hay trần vận hành thấp hơn; chuyển trước khi ghi lỗi tự động thứ 3 cho cùng hãng trong ngày. Các giới hạn lấy từ `data/world.json` → `ops_limits`, cần được thực thi bằng code/config ở vòng 1; ghi tiêu chí ở đây chưa tự tạo cổng.

#### Bước 2 · Soát từng câu

| Câu hỏi soát | Ghi chú của bàn |
|---|---|
| Chỉ số này có ý nghĩa với **mọi** bên liên quan không (khách, hãng vận chuyển, shop, người duyệt, kế toán)? | Khách cần nhận đủ quyền lợi và được trả lời khớp sổ; hãng và tài xế cần không bị ghi oan; shop cần không bị trừ sai; kế toán cần đối soát được từng khoản; người duyệt cần khối lượng trong năng lực ca trực. Vì vậy dùng đồng thời chất lượng, độ ổn định, ba ngưỡng thiệt hại bằng 0, chi phí, ROI và ca ùn; phải đọc cả phân khúc kho/hãng, không chỉ số trung bình. |
| Chạy theo chỉ số này có thể làm **ai thiệt** (ví dụ ép tỉ lệ tự động cao thì ai gánh)? | Ép chuyển người <= 35% có thể khiến trợ lý tự quyết ca thiếu bằng chứng; ép chi phí <= 5.000đ có thể giảm người trực, làm khách chờ và nhân viên quá tải; chặn mọi khoản hoàn để đạt hoàn sai = 0 có thể làm khách mất quyền lợi. Chặn hết, phạm vi về 0 hoặc làm hỏng ca vốn đúng không được coi là đạt; phải kiểm cả số tiền hoàn thiếu, trạng thái, độ phủ và regression trong report. |
| Đây có phải nghĩa của "thành công" ở **ngày 1** của pilot không? | Đây là điều kiện cho phép cân nhắc pilot có giám sát: mọi required và business_ops phải đạt, không vượt trần, không có regression, phạm vi dương và có PIC/runbook. Chi phí <= 5.000đ so với làm tay 10.000đ đặt mục tiêu giảm ít nhất 50% chi phí xử lý; ROI >= 0,20 yêu cầu tiết kiệm ròng dương có biên. Tốc độ xử lý thật chưa được kiểm chứng bởi MockLLM; không tuyên bố kết quả giả lập bảo đảm an toàn ngoài thực tế. |
| Còn ở **ngày thứ 1.000** (12 depot, chính sách đã đổi vài lần)? Ngưỡng nào sẽ phải viết lại? | Ngân sách, công suất duyệt, chi phí, phạm vi, ngưỡng chuyển người và mục tiêu ROI cần được xem lại theo lượng ticket, giá LLM, tiền công và chính sách thực tế của từng depot. Nguyên tắc không chấp nhận hoàn sai, ghi oan và lộ dữ liệu vẫn giữ. Khi chuyển sang giai đoạn mới, lập phiên bản tiêu chí mới với bằng chứng và phê duyệt; giữ nguyên bản đã ký của Lab 10, không sửa ngưỡng để hợp thức hóa kết quả. |

#### Bước 3 · Chốt và hẹn ngày xem lại

- Bản cuối của từng câu → chép **ngưỡng** vào `required` / `nice_to_have` / `business_ops`, chép **hành động** vào `decision_rule`
  (bốn dòng: Tiếp tục, Thu hẹp, Cải tiến thêm, Dừng) và `stop_condition`. Các khoá này nằm ngay trong `config/acceptance_criteria.json`.
- Nhóm `business_ops` (chi phí mỗi ticket tối đa, ROI tối thiểu, số ca ùn tối đa): `cost_per_ticket_vnd_max = 5000` · `roi_min = 0.20` · `queue_stuck_max = 0`.
- Chi phí 5.000đ là tổng chi phí xử lý mỗi ticket trong report, gồm tiền máy, công duyệt và phí giữ chỗ phân bổ; khác trần riêng tiền LLM 1.500đ/ticket trong `ops_limits`. Căn cứ `ops_facts`: làm tay 10.000đ/ticket, một ca chuyển người 10.000đ, phí giữ chỗ 30.000đ/người/ca. Đây là mục tiêu giảm 50% chi phí, cần kiểm chứng sau ký. ROI >= 0,20 nghĩa là tiết kiệm ròng ít nhất 20% chi phí bỏ ra theo công thức report; không chỉ so tiền LLM với làm tay. Số ca ùn = 0 giữ yêu cầu phục vụ; đồng thời kiểm hạn chờ tối đa 60 phút của `ops_limits`.
- Nếu chi phí vượt 5.000đ/ticket, ROI dưới 0,20 hoặc có trên 0 ca ùn trên bất kỳ bộ thử liên quan nào, không chọn Tiếp tục; chọn Cải tiến thêm hoặc Thu hẹp khi phạm vi giữ lại có số liệu đạt đủ điều kiện. Quy tắc Dừng và các điều kiện chi tiết nằm trong `decision_rule` của JSON.
- Ngày xem lại tiêu chí: `2026-11-25` (mốc rà soát dự kiến; nếu có tín hiệu đỏ thì xử lý ngay theo điều kiện dừng) · Ai dự: `Nguyễn Lâm Hoàng, Nguyễn Hoàng Việt, Đỗ Hoàng Minh, Đoàn Gia Long` (ghi vào Phiếu B mục B8, dòng "Ngày quyết định lại"). Việc xem lại nhằm quyết định bước tiếp theo; không đổi bản tiêu chí đã ký trong Lab 10. Nếu chọn Cải tiến thêm ở v1/v2, ghi hạn cụ thể tối đa 7 ngày từ ngày quyết định vào phiếu tương ứng.

**Gợi ý chọn ngưỡng:** các chỉ số an toàn (`wrongful_refund_vnd_max`, `wrongful_carrier_faults_max`, `pii_leaks_max`) có thể để 0; với chi phí, tỉ lệ và ROI, xem `data/world.json` mục `ops_facts`.

**Ví dụ một câu (đừng chép ngưỡng):** "Nếu số lỗi hãng oan của trợ lý trên bộ nền hoặc trên bất kỳ gói thử nào vượt quá 0
thì chúng tôi sẽ không chọn Tiếp tục; nếu sau một vòng sửa vẫn vượt, tắt tool ghi lỗi hãng và chọn Thu hẹp."

---

<a id="a5"></a>

## A5 · Ký và đẩy tiêu chí (phút 60–65)

Soát lại `config/acceptance_criteria.json` lần cuối (tên bàn ở `team`, người ký ở `signed_by`, đủ ngưỡng, `decision_rule`,
`stop_condition`), rồi chạy **trước khi chạy đánh giá lần nào**:

```bash
python3 -m lab10.criteria sign
git add config/acceptance_criteria.json config/acceptance_criteria.lock && git commit -m 'Sign acceptance criteria' && git push -u origin main
```

| Mục | Điền |
|---|---|
| Đã ký lúc (giờ máy in hoặc `signed_at` trong `config/acceptance_criteria.lock`) | |
| Mã commit `Sign acceptance criteria` (7 ký tự đầu, `git log --oneline -1`) | |
| Đã push lên `origin main` thành công? | có / chưa |

Sau bước này **không sửa** `config/acceptance_criteria.json`, kể cả mở rồi lưu lại bằng trình soạn thảo tự định dạng.
