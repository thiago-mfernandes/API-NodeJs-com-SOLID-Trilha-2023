# App

GymPass style app.

**RFs (Requisitos funcionais)**
[] - Deve ser possível se cadastrar;
[] - Deve ser possível se autenticar;
[] - Deve ser possível obter o perfil de um usuário logado;
[] - Deve ser possível obter o numero de check-ins realizados pelo usuário logado;
[] - Deve ser possível o usuário seu histórico de check-ins;
[] - Deve ser possível o usuário buscar academias próximas;
[] - Deve ser possível o usuario buscar academias pelo nome;
[] - Deve ser possível o usuario realizar check-in em uma academia;
[] - Deve ser possível validar o check-in de um usuario;
[] - Deve ser possível cadastrar uma academia;

**RNs (Regras de Negócio)**
[] - O usuário nao deve poder se cadastrar com um email duplicado;
[] - O usuário nao pode fazer 2 check-ins no mesmo dia;
[] - O usuário nao pode fazer check-in se nao estiver perto (100m) da academia;
[] - O check-in só pode ser validado até 20 minutos após ser criado;
[] - O check-in só pode ser validado por administradores;
[] - A academia só poder ser cadastrada por administradores;

**RFs (Requisitos funcionais)**
[] - A senha precisa estar criptografada;
[] - Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
[] - Todas as listas de dados precisam estar paginadas com 20 itens por página;
[] - O usuario deve ser identificado por um JWT (JSON Web Token);