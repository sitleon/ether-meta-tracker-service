FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm ci --prefer-offline

COPY /prisma /app/prisma

RUN npx prisma generate

COPY . .

RUN npm run build \
    && npm prune --production

FROM node:14-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/dist ./dist

COPY . .

CMD ["node", "dist/src/main"]
