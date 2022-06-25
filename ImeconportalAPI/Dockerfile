FROM node:18

WORKDIR /usr/src/app

COPY . .

#COPY pachakge*.json ./

RUN npm install && \
    npm install -g npm
    
#If want to build this project for production
#RUN npm ci --only=production

#COPY . .

EXPOSE 3000

CMD ["node", "app.js"]