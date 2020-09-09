#FROM node:14
#COPY . /src

FROM node:14
COPY wait-for-it.sh /src/
COPY dist /src/app
COPY package.json /src/
COPY index.js /src/
WORKDIR /src
RUN npm i --production
ENV MEMORY 2048
ENV PORT 3000
ENV DATABASE_URI "mongodb://root:brasilswing@brasil-swing-db:27017/brasilswing?authSource=admin"
#CMD ./wait-for-it.sh brasil-swing-db:27017 -- node --max-old-space-size=$MEMORY --optimize-for-size index.js  > application.log 2> error.log
CMD node --max-old-space-size=$MEMORY --optimize-for-size index.js
