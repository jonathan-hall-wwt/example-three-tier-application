# Runs database migrations against an already-running Postgres instance
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY migrations ./migrations
CMD ["npx", "node-pg-migrate", "up"]
