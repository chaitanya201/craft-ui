FROM node:20-alpine as init
WORKDIR /app
COPY package.json package.json
COPY tsconfig.json tsconfig.json
RUN npm install

FROM node:20-alpine as build-stage
WORKDIR /app
COPY . .
COPY  --from=init /app/package.json /app/package-lock.json/ /app/node_modules /app/tsconfig.json /app/
RUN npm run build

FROM node:20-alpine as production-stage
WORKDIR /app
COPY  --from=build-stage /app/package.json /app/package-lock.json/ /app/node_modules /app/build /app/

CMD [ "node","/app/build/src/index.js" ]



