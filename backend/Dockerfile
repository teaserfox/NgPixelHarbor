FROM node:18-alpine
WORKDIR /NgPixelHarbor/frontend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]