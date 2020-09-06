FROM node:14
COPY . app/
WORKDIR /app
RUN npm install
ENV MEMORY 2048
ENV PORT 3000
ENV DATABASE_USER "root"
ENV DATABASE_PORT 27017
ENV DATABASE_PASS "brasilswing"
ENV DATABASE_HOSTNAME "brasil-swing-db"
ENV DATABASE_NAME "brasilswing"
#CMD ./wait-for-it.sh $DATABASE_HOST:3306 -- node --max-old-space-size=$MEMORY --optimize-for-size index.js  > application.log 2> error.log
CMD ./wait-for-it.sh $DATABASE_HOSTNAME:$DATABASE_PORT -- node --max-old-space-size=$MEMORY --optimize-for-size index.js
