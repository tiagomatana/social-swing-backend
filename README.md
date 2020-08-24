# Brasil Swing

Repositório de backend da rede social para adultos.

## Requisitos
- **DOCKER**
- **DOCKER-COMPOSE**
- **NPM**
- **NODEJS** _version 14_
- **MYSQL** _version 8_


### Comandos Manuais

Instalar dependencias:
```shell script
npm install
```

Executar banco de dados:
```shell script
./database.sh
```

Executar aplicação:
```shell script
node index.js
```

### Comandos Automáticos

Executar a aplicação completa (com o banco de dados):
```shell script
docker-compose up -d --build
```
