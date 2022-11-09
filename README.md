# TasksBoard
[![Abrir no Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/DanielSCustodio/TasksBoard)
![2022-10-25_19-10](https://user-images.githubusercontent.com/29557187/197891812-cfa8eee3-bc11-4b5c-8b57-43b6b56c72df.png)


## Contexto
Esta aplicação se trata de um organizador de tarefas, a partir da criação de notas/lembretes. Para ter acesso a criação de notas é necessário realizar login. <br>
O login poderá ser realizado via conta Google ou conta do GitHub. Após logado, o usuário poderá criar notas e também excluí-las. <br>
Existe a opção do usuário ser um apoiador do projeto, realizando pagamento através do PayPal. Os apoiadores terão os seguintes diferencias dentro da aplicação: editar tarefa, foto na página inicial, página de detalhes da tarefa.

## Tecnologias

Front-end:
> Next.js, React, Typescript, SASS

Back-end:
> Firebase

## Firebase
Os dados de usuários e tarefas estão sendo armazenados no Firestore. Caso tenha dificuldade ou não tenha conhecimento em configurar e criar uma coleção de dados no Firestore, recomendo fortemente que leia a documentação abaixo:

Documentação: https://firebase.google.com/docs/firestore/

## Método de pagamento
Atualmente o método de pagamento está em modo teste, mas basta alterar as configurações no console developer do PayPayl para o pagamento entrar em produção e ser 100% funcional.<br>
Documentação para realizar a integração: https://developer.paypal.com/docs/checkout/standard/integrate/

Caso queira testar esta aplicação em produção, utilize o acesso abaixo:
> Email: sb-47tsjv21940376@personal.example.com<br>
> Senha: apenasumteste

## Variáveis de ambiente
Crie um arquivo chamado ``.env.local`` <br>
utilize o arquivo ``.env.example`` para se guiar <br>
As variáveis contidas nesse aquivo se trata das credencias necessárias realizar o login via conta Google e GitHub. Para isso foi utilizado a biblioteca `NextAuth.js` <br>

Abaixo estão os links para obter as credencias e configurar o login.

> Provider GitHub: https://next-auth.js.org/providers/github <br>
> Provider Google: https://next-auth.js.org/providers/google

Ao fazer o deploy da aplicação e obter uma url, lembre-se de trocar a url nas configurações de cada serviço.

## Instalando dependências

> Na raiz do projeto, execute o comando abaixo:
```bash
npm install
``` 

## Executando aplicação

* Para executar o projeto em modo de desenvolvimento:
>  Na raiz do projeto, execute um dos comandos abaixo:
  ```
  npm run dev
  ```
  ou 

  ```
  yarn dev
  ```
* Build da aplicação:
> Execute a sequência de comandos abaixo:

 1º - Criando build

  ```
    yarn build
  ```
  ou
  ```
    npm run build
  ```
  2º - Executando a  aplicação em modo build
  ```
    yarn start
  ```
  ou
  ```
    npm run start
  ```
