FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm install --workspace frontend --include-workspace-root

FROM node:20-alpine AS builder
WORKDIR /app
ARG VITE_API_BASE_URL=http://localhost:5000/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY package.json tsconfig.base.json eslint.config.mjs ./
COPY frontend ./frontend
RUN npm run build --workspace frontend

FROM nginx:1.27-alpine AS runner
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]