# App

GymPass style app.

**RFs (Requisitos funcionais)**
[x] - Deve ser possível se cadastrar;
[x] - Deve ser possível se autenticar;
[x] - Deve ser possível obter o perfil de um usuário logado;
[x] - Deve ser possível obter o numero de check-ins realizados pelo usuário logado;
[x] - Deve ser possível o usuário seu histórico de check-ins;
[x] - Deve ser possível o usuário buscar academias próximas até 10km;
[x] - Deve ser possível o usuario buscar academias pelo nome;
[x] - Deve ser possível o usuario realizar check-in em uma academia;
[] - Deve ser possível validar o check-in de um usuario;
[x] - Deve ser possível cadastrar uma academia;

**RNs (Regras de Negócio)**
[x] - O usuário nao deve poder se cadastrar com um email duplicado;
[x] - O usuário nao pode fazer 2 check-ins no mesmo dia;
[x] - O usuário nao pode fazer check-in se nao estiver perto (100m) da academia;
[x] - O check-in só pode ser validado até 20 minutos após ser criado;
[] - O check-in só pode ser validado por administradores;
[] - A academia só poder ser cadastrada por administradores;

**RFs (Requisitos funcionais)**
[x] - A senha precisa estar criptografada;
[x] - Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
[x] - Todas as listas de dados precisam estar paginadas com 20 itens por página;
[] - O usuario deve ser identificado por um JWT (JSON Web Token);

JWT: JSON Web Token

Usuário faz login, envia email/senha, o back-end cria um token ÚNICO, não-modoficável e STATELESS

Stateless: Não armazenado em nenhuma estrutura de persistência de dados (banco de dados);

Back-end: Quando vai ser criado o token, o back-end usa uma PALAVRA-CHAVE (string)
Palavra-chave: jij9hbnvk654jfdvoirjtnghfgn89fkdhgdfgrdgfh8

Qdo o backend receber email e senha, e vai compor um token: header.payload.sign

como somente o backend possui a palavra chave, somente ele pode criar novos tokens, e soh ele pode validar atraves da assinatura que o token criado é um token que originou desta palavra chave

Resumo: Usuario faz login => a rota retorna um jwt

esse jwt vai ser utilizado em todas as requisicoes dali em diante
Header(cabecalho): Authorization: Bearer  JWT