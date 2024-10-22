FROM node:20.18
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ .
ENV NODE_ENV=production
ENV PORT=3001
RUN npm run build
CMD ["npm", "run" ,"start"]