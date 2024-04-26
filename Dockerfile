# Sử dụng một hình ảnh Node.js đã có sẵn
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Biên dịch TypeScript
RUN npm run build-ts

# Mở cổng 5000, bạn có thể điều chỉnh nếu cần thiết
EXPOSE 5000

# Khởi chạy ứng dụng khi container được khởi động
CMD ["npm", "start"]