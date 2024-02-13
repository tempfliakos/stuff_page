# Stuff Pages



## Start docker environment

```
docker-compose up
```

## Clean up docker images for fresh start
```
docker ps
docker stop [CONTAINER ID]
docker system prune --all
```

## Generate model in Sequelize
```
cd server
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```