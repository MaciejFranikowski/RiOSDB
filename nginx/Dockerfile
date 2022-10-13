FROM node:13.12.0-alpine as build-stages

WORKDIR /app
COPY frontend/package*.json /app/
RUN npm install
COPY frontend/ /app/
RUN npm run build


FROM nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx/prod.cfg /etc/nginx/nginx.conf

ARG nginx_port
EXPOSE $nginx_port
CMD ["nginx", "-g", "daemon off;"]
