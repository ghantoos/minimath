# === Stage 1: Build both apps ===
FROM node:25-alpine AS build
WORKDIR /app

# Copy both app folders
COPY apps/minimath/package*.json ./apps/minimath/
COPY apps/miniverbe/package*.json ./apps/miniverbe/

# Install dependencies for each app
RUN cd apps/minimath && npm install
RUN cd apps/miniverbe && npm install

# Copy source
COPY apps ./apps

# Build both apps
RUN cd apps/minimath && npm run build
RUN cd apps/miniverbe && npm run build

# === Stage 2: Serve with nginx ===
FROM nginx:1.29-alpine

COPY --from=build /app/apps/minimath/build /usr/share/nginx/html/minimath
COPY --from=build /app/apps/miniverbe/build /usr/share/nginx/html/miniverbe
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
