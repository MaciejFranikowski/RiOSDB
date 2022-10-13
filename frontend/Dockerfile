FROM node:13.12.0-alpine

WORKDIR /app/
ARG f_export
EXPOSE $f_export

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/

CMD ["npm", "start"]