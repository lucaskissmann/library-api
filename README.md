# Instruções para utilizar a aplicação
- Na raíz do projeto há um arquivo `docker-compose.yml`, responsável por subir o banco de dados da aplicação. Para executá-lo basta digitar `docker-compose up` no console.
- Para iniciar a aplicação bastar digitar `npm run start` no console.
- Também na raíz do projeto, há uma collection do Postman para facilitar a utilização da API. Basta importar o arquivo no Postman.
- O link para acesso do Swagger é `http://localhost:3000/api`.
- A aplicação possui testes, para executá-los basta digitar `npm run test` no console.
- Para executar os testes de performance basta digitar `npm run artillery` no console.

# Geral

A aplicação se trata de um backend para gerenciamento de bibliotecas. Foi desenvolvida em NodeJS, utilizando TypeScript, TypeORM para gerenciar as operações com o banco e NestJS como framework principal de desenvolvimento.

### Estrutura do Projeto
- **Módulos:**
    - A aplicação está dividida em módulos, que agrupam as respectivas camadas do MVC (Model, View, Controller).
    - Cada módulo possui seus próprios DTOs (Data Transfer Objects), ENUMs e testes.

- **Validadores Personalizados:**
    - A aplicação inclui validadores personalizados, como o validador de CPF e o validador de ISBN, que utiliza uma API do Google.

### Funcionalidades
- **Gerenciamento de Autores**
    - Criação, leitura, atualização e exclusão de autores.
    - Busca de livros pelo autor.

- **Gerenciamento de Livros**
    - Criação, leitura, atualização e exclusão de livros.
    - Filtragem de livros por status.

- **Gerenciamento de Locatários**
    - Criação, leitura, atualização e exclusão de locatários.

- **Gerenciamento de Aluguéis**
    - Criação, leitura e atualização. Neste módulo não há um endpoint para remover um aluguel, mas sim um endpoint para devolução dos livros de um determinado aluguel, mudando apenas o status do mesmo.
    - Retorno de livros alugados.

### Tecnologias Utilizadas
- Node.js: Plataforma utilizada para o desenvolvimento do backend.
- TypeScript: Linguagem utilizada para garantir tipagem estática.
- TypeORM: ORM utilizado para gerenciar as operações com o banco de dados.
- NestJS: Framework utilizado para o desenvolvimento modular e escalável do backend.
- Docker: Utilizado para containerização do banco de dados.
- Swagger: Utilizado para documentação da API.
- Jest: Framework utilizado para os testes.
- Artillery: Ferramenta utilizada para os testes de performance.
