# Hướng dẫn Cấu hình Triển khai (Deployment Configuration)

Để tính năng Đăng nhập Google hoạt động chính xác trên môi trường production (Vercel), bạn cần thực hiện các bước sau:

## 1. Cấu hình Vercel Environment Variables

Truy cập vào Dashboard của dự án trên Vercel -> **Settings** -> **Environment Variables** và thêm/cập nhật các biến sau:

| Key | Value | Ghi chú |
|-----|-------|---------|
| `NEXTAUTH_URL` | `https://journeyofit.vercel.app` | URL chính của trang web |
| `AUTH_URL` | `https://journeyofit.vercel.app` | Cần thiết cho NextAuth v5 |
| `AUTH_TRUST_HOST` | `true` | Tin cậy host của Vercel |

**Lưu ý:** Sau khi thêm biến môi trường, bạn cần **Redeploy** (Triển khai lại) để thay đổi có hiệu lực.
- Vào tab **Deployments**.
- Chọn deployment gần nhất (hoặc đang chạy).
- Bấm vào dấu 3 chấm (...) -> **Redeploy**.

## 2. Cấu hình Google Cloud Console

Truy cập [Google Cloud Console](https://console.cloud.google.com/apis/credentials) và cập nhật cấu hình OAuth Client:

1. Chọn project của bạn.
2. Vào **APIs & Services** > **Credentials**.
3. Chọn **OAuth 2.0 Client ID** mà bạn đang sử dụng.
4. Tìm mục **Authorized redirect URIs** (URI chuyển hướng được ủy quyền).
5. Thêm đường dẫn sau:
   ```
   https://journeyofit.vercel.app/api/auth/callback/google
   ```
6. Bấm **Save**.

## 3. Kiểm tra lại

Sau khi hoàn tất 2 bước trên và redeploy xong:
1. Truy cập `https://journeyofit.vercel.app/`.
2. Thử đăng nhập lại bằng Google.
3. Hệ thống sẽ chuyển hướng đúng về trang web thay vì `localhost`.
