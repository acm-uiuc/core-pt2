FROM node:lts-alpine AS base
WORKDIR "/app"

FROM base AS install
COPY package*.json ./
COPY . .
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3


FROM install as builder
RUN npm run build

FROM builder AS release
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]