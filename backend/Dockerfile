FROM node:17.9.0

WORKDIR /code/

ARG b_export
EXPOSE $b_export

RUN curl -sSL https://get.docker.com/ | sh
RUN apt-get update && apt-get -y install gosu


COPY package*.json /code/
RUN npm install

COPY ./ /code/

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]