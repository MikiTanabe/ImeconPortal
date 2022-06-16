# nodemodulesを指定
FROM typesense:0.23.0

#WORKDIR /app
# RUN mkdir /tmp/typesense-data
RUN export  TYPESENSE_API_KEY=xyz

COPY ./ /tmp/typesense-data

EXPOSE 8108
# CMD ["npm", "run", "serve"]
