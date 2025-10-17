# Stage 1: Build
FROM node:25-alpine AS build
WORKDIR /app
COPY package*.json ./
# install ALL dependencies (include devDependencies)
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.29-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
