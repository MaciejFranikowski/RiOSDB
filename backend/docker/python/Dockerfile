FROM python:3.10

WORKDIR /workspace
COPY ./python-entrypoint.sh /python-entrypoint.sh
RUN chmod +x /python-entrypoint.sh

ENTRYPOINT ["/python-entrypoint.sh"]
