FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=docker
CMD ["npm", "start"]
