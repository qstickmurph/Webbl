# Base stage
FROM node:24.7.0-alpine AS base
ARG WEB_DIR=./web
WORKDIR /app
COPY ${WEB_DIR}/package*.json ./
RUN npm ci
COPY ${WEB_DIR}/ .

# Development stage
FROM base AS development
EXPOSE 8080
ENV CHOKIDAR_USEPOLLING=true
ENV NODE_ENV=development
ENTRYPOINT ["npm", "run", "ng", "serve", "--", "--configuration", "development"]
CMD ["--port", "8080", "--host", "0.0.0.0", "--poll", "2000"]

# Production build stage
FROM base AS prod-builder
RUN npm run ng build -- --configuration production

# Production run stage
FROM nginx:alpine AS production
ARG NGINX_CONF=./tools/config/nginx.conf.production
COPY ${NGINX_CONF} /etc/nginx/nginx.conf
COPY --from=prod-builder /app/dist/Webbl /srv/http
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
