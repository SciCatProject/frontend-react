# Stage 1: Build the project
FROM --platform=linux/amd64 node:18.17.1-alpine  as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

# Stage 2: Serve the project using Nginx
FROM --platform=linux/amd64 nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
