FROM node:20-alpine AS stage-1
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .

CMD [ "npm","run","dev" ]

# FROM node:20-alpine AS stage-1
# WORKDIR /app
# COPY package.json package.json
# RUN npm i
# COPY . .
# RUN npm run build

# FROM node:20-alpine AS stage-2
# WORKDIR /app
# COPY package.json .
# RUN npm i --only=production
# COPY --from=stage-1 /app/build  /app/build
# CMD [ "npm","start" ]

