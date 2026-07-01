FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm install --workspace backend --include-workspace-root

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json tsconfig.base.json eslint.config.mjs ./
COPY backend ./backend
RUN npm run build --workspace backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm install --omit=dev --workspace backend && npm cache clean --force

COPY --from=builder /app/backend/dist ./backend/dist

USER node
EXPOSE 5000
CMD ["node", "backend/dist/server.js"]