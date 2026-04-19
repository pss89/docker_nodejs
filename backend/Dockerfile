FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
# 실행 명령어는 docker-compose의 command가 덮어씁니다.