FROM node:14
COPY . app/
WORKDIR /app
RUN npm install
ENV MEMORY 2048
ENV PORT 3000
ENV DATABASE_USER "root"
ENV DATABASE_PWD "root"
ENV DATABASE_HOST "brasil-swing-db"
ENV DATABASE_NAME "brasilswing"
CMD ./wait-for-it.sh $DATABASE_HOST:3306 -- node --max-old-space-size=$MEMORY --optimize-for-size index.js  > application.log 2> error.log
