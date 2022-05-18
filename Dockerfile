FROM node:16.4-buster AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
RUN yarn install

# copy over source code
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

# Build
RUN yarn build

# Cleaning image
RUN yarn global add node-prune
RUN node-prune


FROM node:16.4-buster-slim
RUN apt-get update
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "yarn", "start:prod" ]
