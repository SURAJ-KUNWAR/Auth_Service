for sequelize

1)npm i mysql2, sequelize , sequelize-cli,
2)do npx sequelize init,
3)inside config/config.json give password for db and your db name e.g auth_db_dev
4)npx sequelize db:create -> your db will be created
5)npx sequelize model:generate --name User --attributes email:string,password:string --> this will create a model and migration in the respective folder there we can make any changes as we wish , like making it unique etc.....
6)npx sequelize db:migrate --> this will create a table named User in our db named auth_db_dev
