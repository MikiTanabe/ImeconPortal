FROM node:10

WORKDIR /usr/src/app

COPY pachakge*.json ./

RUN npm install

#If want to build this project for production
#RUN npm ci --only=production

COPY . .

CMD ["node", "app.js"]