FROM node:21.5.0-bookworm-slim AS build
WORKDIR /app
COPY package*.json /app
RUN --mount=type=secret,mode=0600,id=npmrc,target=/app/.npmrc npm ci

FROM node:21.5.0-bookworm-slim

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

ENV NODE_ENV=production

WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY *.js /app

RUN chown -R node:node /app
USER node

CMD ["node","index.js"]
EXPOSE 8080