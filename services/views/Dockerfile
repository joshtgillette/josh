FROM node:22-alpine

WORKDIR /app
COPY server.mjs ./

# Listen on all interfaces inside the container (no host ports are published,
# so it is only reachable on the Docker network via the gateway).
ENV VIEWS_HOST=0.0.0.0 \
    VIEWS_PORT=8788 \
    VIEWS_DB=/data/views.db

EXPOSE 8788
CMD ["node", "--experimental-sqlite", "server.mjs"]
