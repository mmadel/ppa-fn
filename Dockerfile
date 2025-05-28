# Stage 1: Build Angular App
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the build output to Nginx HTML directory
COPY --from=builder /app/dist/ppa_fn /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
