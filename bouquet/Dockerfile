# nodemodulesを指定
FROM node:14.15.0-alpine

WORKDIR /app

COPY ./ /app/

#COPY ./src /app/src
#RUN npm install -g @vue/cli
RUN apk update && \
    npm install && \
    npm install -g npm && \
    npm install -g @vue/cli

#COPY ./scripts/docker.start.sh /scripts/start.sh

#RUN chmod +x /scripts/*

#COPY ./package.json ./

#COPY ./package-lock.json ./

#ENTRYPOINT ["/scripts/start.sh"]

EXPOSE 8081
CMD ["npm", "run", "serve"]
