FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g serve
COPY build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]