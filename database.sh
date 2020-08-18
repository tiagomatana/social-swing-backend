docker rm -f brasil-swing-db
docker run --name brasil-swing-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=brasilswing -p 3306:3306 -d mysql:8
