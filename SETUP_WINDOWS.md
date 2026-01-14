# CryptoGuard AI - Setup Guide for Windows

## 🎯 Visão Geral

Este guia fornece instruções passo a passo para executar o CryptoGuard AI no seu computador Windows usando PowerShell.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Git** - https://git-scm.com/download/win
2. **Node.js 22+** - https://nodejs.org/ (escolha LTS ou Current)
3. **MySQL 8.0+** - https://dev.mysql.com/downloads/mysql/
4. **PowerShell 7+** (opcional, mas recomendado)

### Verificar Instalações

Abra o PowerShell e execute:

```powershell
git --version
node --version
npm --version
mysql --version
```

## 🚀 Instalação Rápida

### Passo 1: Clonar o Repositório

```powershell
git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git
cd cryptoguard-ai
```

### Passo 2: Instalar Dependências

```powershell
npm install -g pnpm
pnpm install
```

### Passo 3: Configurar Banco de Dados

Abra o MySQL Command Line Client ou MySQL Workbench e execute:

```sql
CREATE DATABASE cryptoguard;
CREATE USER 'root'@'127.0.0.1' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON cryptoguard.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

### Passo 4: Criar Arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:root@127.0.0.1:3306/cryptoguard"
JWT_SECRET="sua-chave-secreta-super-segura-com-32-caracteres"
NODE_ENV="development"
```

### Passo 5: Inicializar Banco de Dados

```powershell
pnpm db:push
```

### Passo 6: Iniciar a Aplicação

```powershell
pnpm dev
```

A aplicação estará disponível em: **http://localhost:3000**

## 🔐 Primeiro Acesso

1. Acesse http://localhost:3000
2. Clique em "Create one" para criar uma conta
3. Preencha os dados:
   - **Name**: Seu nome completo
   - **Email**: seu@email.com
   - **Password**: Mínimo 8 caracteres
4. Clique em "Create Account"
5. Você será redirecionado para a página de login
6. Use suas credenciais para fazer login

## 📁 Estrutura do Projeto

```
cryptoguard-ai/
├── client/                 # Frontend React
│   └── src/
│       ├── pages/         # Páginas (Login, Register, Dashboard, etc)
│       ├── components/    # Componentes reutilizáveis
│       └── lib/           # Utilitários (tRPC client, etc)
├── server/                # Backend Node.js
│   ├── _core/            # Núcleo do servidor
│   │   ├── index.ts      # Arquivo principal
│   │   ├── authService.ts # Serviço de autenticação
│   │   └── context.ts    # Contexto tRPC
│   ├── routers.ts        # Rotas tRPC
│   └── db.ts             # Operações de banco de dados
├── drizzle/              # Schema do banco de dados
├── package.json          # Dependências do projeto
└── .env                  # Variáveis de ambiente
```

## 🛠️ Comandos Úteis

```powershell
# Instalar dependências
pnpm install

# Iniciar em modo desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar em modo produção
pnpm start

# Verificar tipos TypeScript
pnpm check

# Formatar código
pnpm format

# Executar testes
pnpm test

# Atualizar schema do banco de dados
pnpm db:push
```

## 🐛 Troubleshooting

### Erro: "Cannot find module 'cookie-parser'"

```powershell
pnpm add cookie-parser @types/cookie-parser
```

### Erro: "MySQL connection refused"

1. Verifique se o MySQL está rodando:
   - Abra Services (Win+R → services.msc)
   - Procure por "MySQL80" ou "MySQL95"
   - Clique com botão direito → Start

2. Verifique as credenciais no `.env`:
   ```env
   DATABASE_URL="mysql://root:root@127.0.0.1:3306/cryptoguard"
   ```

### Erro: "Port 3000 already in use"

```powershell
# Encontre o processo usando a porta 3000
Get-NetTCPConnection -LocalPort 3000

# Mate o processo (substitua PID pelo ID encontrado)
Stop-Process -Id <PID> -Force
```

### Erro: "Cannot find build directory"

```powershell
# Reconstrua a aplicação
pnpm build
```

## 📝 Autenticação

O projeto agora usa autenticação local com:

- **JWT (JSON Web Tokens)** para sessões
- **bcrypt** para hash de senhas
- **Cookies HTTP-only** para armazenar tokens

### Criar Usuário Admin

Após o primeiro login, você pode promover um usuário a admin editando o banco de dados:

```sql
UPDATE users SET role = 'admin' WHERE email = 'seu@email.com';
```

## 🚀 Deploy para Produção

Para fazer deploy da aplicação:

```powershell
# Build para produção
pnpm build

# Inicie em modo produção
$env:NODE_ENV = "production"
pnpm start
```

## 📚 Documentação Adicional

- [React Documentation](https://react.dev)
- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM](https://orm.drizzle.team)
- [Express.js](https://expressjs.com)

## 🤝 Suporte

Se encontrar problemas:

1. Verifique se todos os pré-requisitos estão instalados
2. Limpe o cache: `pnpm store prune`
3. Reinstale as dependências: `pnpm install`
4. Verifique os logs do console para mensagens de erro

## 📄 Licença

MIT

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
