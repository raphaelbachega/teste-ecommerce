Nest.js e-commerce application

Este é um sistema de gerenciamento de pedidos de e-commerce desenvolvido com Node.js e Nest.js, utilizando TypeORM para a conexão com o banco de dados PostgreSQL, rabbitMQ e Redis para o gerenciamento do estoque de produtos.

Funcionalidades:

Criar um novo pedido
Alterar um pedido existente
Cancelar um pedido
Listagem de pedidos
Publicar informações do pedido em uma fila de mensagens RabbitMQ
Processar e atualizar o estoque de produtos com base nas informações da fila de mensagens

Tecnologias Utilizadas:

- Node.js
- Nest.js
- TypeORM
- PostgreSQL
- Redis
- TypeScript
- Docker
- Swagger

Execução:

Clone o repositório em sua máquina local e execute o docker compose


Instalação;
Clone o repositorio e
Execute o docker compose --build

Uso:
A collection do postman esta no projeto e existe uma aplicação que sobe junto com o compose para vizualizar o REDIS.

https://drive.google.com/file/d/1-NZpcmwO7Iccjqzf4YHnrS_4Thapbp84/view?usp=share_link
