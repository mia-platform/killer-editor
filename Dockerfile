FROM node:10.15.2-alpine as build

ARG COMMIT_SHA=<not-specified>
ENV NODE_ENV=production

WORKDIR /build-dir

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV INLINE_RUNTIME_CHUNK=false

RUN yarn build

COPY LICENSE ./build

RUN echo ": $COMMIT_SHA" >> ./build/commit.sha

################################################################################à

FROM nexus.mia-platform.eu/core/static-files:3.2.1

COPY nginx/website.conf ./conf.d/website.conf

WORKDIR /usr/static

COPY --from=build /build-dir/build ./
