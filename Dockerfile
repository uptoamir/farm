# FROM node:10@sha256:8c94a0291133e16b92be5c667e0bc35930940dfa7be544fb142e25f8e4510a45 AS node
FROM node:18-alpine

ARG NODE_ENV=development

ARG GOOGLE_ANALYTICS_API_ID

ARG SENTRY_DSN

ARG FARM_CORE_URL

## envs

ENV GOOGLE_ANALYTICS_API_ID=$GOOGLE_ANALYTICS_API_ID

ENV SENTRY_DSN=$SENTRY_DSN

ENV FARM_CORE_URL=$FARM_CORE_URL

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn add @swc/core-linux-musl
 
COPY . .

RUN mkdir -p /home/node/app/dist

RUN yarn build:tailwind

EXPOSE 3000

RUN yarn build

ENTRYPOINT [ "npx", "next", "start" ]

CMD [ "-p", "3000" ]
