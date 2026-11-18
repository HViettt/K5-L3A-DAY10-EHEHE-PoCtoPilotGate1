# LogiX Gate 1 — UI demo

Chạy từ thư mục gốc repo, không cần cài thư viện:

```powershell
python -X utf8 -B demo/export_data.py
python -m http.server 8765 --bind 127.0.0.1 --directory demo
```

Mở http://127.0.0.1:8765 trong trình duyệt. Dừng server bằng Ctrl+C.

- `export_data.py` tạo ba snapshot trace thật của S7 tại seed 11, mốc `after`, và đọc các report S7 đã tồn tại trong `runs/`. Script chỉ ghi `demo/data.js`; không chạy eval/grade, không tạo hoặc sửa journal, tiêu chí, bản chốt hay code lab.
- Chạy lại script sau khi code/config/report thay đổi rồi tải lại trang. Snapshot không phải bảng đánh giá đầy đủ và không thay report ba mốc.
- Nút **Đề xuất 4 trường** chỉ minh họa payload trên trình duyệt, không thực thi sửa guard, không khẳng định lỗi đã được ngăn.
- Có thể nhập nhiều `report.json` của S7 để so sánh base/prepared/after. File chỉ nằm trong bộ nhớ phiên trình duyệt; không tải lên dịch vụ ngoài. Nếu cùng một mốc, report nhập sau cùng được hiển thị.
- Quyết định v2 đọc từ `submission/submission.json`; UI không quyết định thay nhóm. Nhập report không tự cập nhật quyết định.

Toàn bộ dữ liệu lab là giả lập. UI là công cụ trình bày bổ sung, không thay ba phiếu và gói bài nộp.
