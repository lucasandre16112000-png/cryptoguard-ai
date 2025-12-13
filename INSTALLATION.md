# CryptoGuard AI - Guia Completo de Instalação

**Autor:** Lucas André S

Este guia fornece instruções detalhadas para instalar e executar o CryptoGuard AI do zero em qualquer máquina.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js (versão 22.x ou superior)

**Windows:**
1. Acesse https://nodejs.org/
2. Baixe o instalador LTS (Long Term Support)
3. Execute o instalador e siga as instruções
4. Verifique a instalação abrindo o CMD e digitando:
```bash
node --version
npm --version
```

**macOS:**
```bash
# Usando Homebrew
brew install node@22

# Ou baixe diretamente de https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
# Instalar Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

### 2. pnpm (gerenciador de pacotes)

Após instalar o Node.js, instale o pnpm:

```bash
npm install -g pnpm

# Verificar instalação
pnpm --version
```

### 3. MySQL ou TiDB (Banco de Dados)

**Opção A - MySQL (Recomendado para desenvolvimento local):**

**Windows:**
1. Baixe MySQL Community Server: https://dev.mysql.com/downloads/mysql/
2. Execute o instalador
3. Configure senha do root
4. Inicie o MySQL Server

**macOS:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

**Opção B - TiDB Cloud (Recomendado para produção):**
1. Acesse https://tidbcloud.com/
2. Crie uma conta gratuita
3. Crie um cluster
4. Copie a connection string

### 4. Git

**Windows:** Baixe de https://git-scm.com/download/win

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

## Passo a Passo de Instalação

### Passo 1: Clonar o Repositório

Abra o terminal (CMD no Windows, Terminal no macOS/Linux) e execute:

```bash
# Clone o repositório
git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git

# Entre no diretório do projeto
cd cryptoguard-ai
```

### Passo 2: Instalar Dependências

```bash
# Instalar todas as dependências do projeto
pnpm install
```

Este comando pode levar alguns minutos. Aguarde até que todas as dependências sejam instaladas.

### Passo 3: Configurar Banco de Dados

**Criar o banco de dados:**

```bash
# Conectar ao MySQL
mysql -u root -p

# Dentro do MySQL, criar o banco
CREATE DATABASE cryptoguard;
EXIT;
```

### Passo 4: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Windows (CMD)
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Se o arquivo `.env.example` não existir, crie um arquivo `.env` manualmente com o seguinte conteúdo:

```env
# Database
DATABASE_URL=mysql://root:sua_senha_aqui@localhost:3306/cryptoguard

# JWT Secret (gere uma string aleatória)
JWT_SECRET=sua_chave_secreta_aleatoria_aqui_minimo_32_caracteres

# Manus OAuth (para desenvolvimento local, use valores de teste)
VITE_APP_ID=test-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
OWNER_OPEN_ID=test-owner
OWNER_NAME=Admin User

# API URLs (para desenvolvimento local)
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=test-key
VITE_FRONTEND_FORGE_API_KEY=test-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# Analytics (opcional)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# App Config
VITE_APP_TITLE=CryptoGuard AI
VITE_APP_LOGO=/logo.png
```

**IMPORTANTE:** Substitua os valores:
- `sua_senha_aqui` pela senha do seu MySQL
- `sua_chave_secreta_aleatoria_aqui_minimo_32_caracteres` por uma string aleatória longa

### Passo 5: Inicializar o Banco de Dados

```bash
# Gerar e aplicar as migrations do banco de dados
pnpm db:push
```

Este comando criará todas as tabelas necessárias no banco de dados.

### Passo 6: Popular com Dados de Teste (Opcional)

Após iniciar o servidor (próximo passo), você pode gerar dados de teste através do painel Admin.

### Passo 7: Iniciar o Servidor de Desenvolvimento

```bash
# Iniciar o servidor
pnpm dev
```

Aguarde alguns segundos até ver a mensagem:
```
Server running on http://localhost:3000/
```

### Passo 8: Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

Você verá a tela de login. Como estamos em ambiente de desenvolvimento local, o sistema de autenticação OAuth pode não funcionar completamente. Para contornar isso em desenvolvimento:

1. O sistema criará automaticamente um usuário admin baseado no `OWNER_OPEN_ID` do `.env`
2. Ou você pode modificar temporariamente o código para bypass de autenticação em desenvolvimento

### Passo 9: Gerar Dados de Teste

1. Faça login no sistema
2. Navegue até a página **Admin** (último item do menu lateral)
3. Na seção "Database Management", clique em **"Generate 50 Transactions"**
4. Aguarde alguns segundos
5. Volte para o **Dashboard** para ver as transações geradas

## Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento
pnpm build            # Compila para produção
pnpm start            # Inicia servidor de produção
pnpm check            # Verifica erros de TypeScript
pnpm test             # Executa testes

# Banco de Dados
pnpm db:push          # Aplica mudanças no schema
```

## Estrutura do Projeto

```
cryptoguard-ai/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── components/    # Componentes reutilizáveis
│   │   └── lib/           # Configurações e utilitários
├── server/                # Backend Node.js
│   ├── routers.ts         # Definição das rotas tRPC
│   ├── db.ts              # Funções de banco de dados
│   ├── mlEngine.ts        # Motor de Machine Learning
│   └── blockchainMonitor.ts # Monitor de blockchain
├── drizzle/               # Schema do banco de dados
│   └── schema.ts
├── demo_screenshots/      # Screenshots da aplicação
└── README.md             # Documentação principal
```

## Solução de Problemas

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se o MySQL está rodando:
   ```bash
   # Windows
   net start MySQL80
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```
2. Verifique a `DATABASE_URL` no arquivo `.env`
3. Teste a conexão manualmente:
   ```bash
   mysql -u root -p
   ```

### Erro: "Port 3000 already in use"

**Solução:**
1. Feche qualquer aplicação usando a porta 3000
2. Ou modifique a porta no arquivo `server/_core/index.ts`

### Erro: "pnpm: command not found"

**Solução:**
```bash
npm install -g pnpm
```

### Erro ao instalar dependências

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Página em branco após login

**Solução:**
1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Certifique-se de que o servidor backend está rodando
4. Verifique se o banco de dados foi inicializado com `pnpm db:push`

## Produção

Para deploy em produção:

### 1. Build

```bash
pnpm build
```

### 2. Configurar Variáveis de Ambiente de Produção

Atualize o `.env` com valores reais:
- DATABASE_URL com banco de produção
- JWT_SECRET com chave forte e única
- Configurações OAuth reais do Manus

### 3. Iniciar Servidor

```bash
pnpm start
```

### 4. Configurar Reverse Proxy (Nginx)

Exemplo de configuração nginx:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Suporte

Para problemas ou dúvidas:
- Abra uma issue no GitHub: https://github.com/lucasandre16112000-png/cryptoguard-ai/issues
- Entre em contato com o autor: Lucas André S

## Licença

MIT License - Veja o arquivo LICENSE para detalhes.

---

**Desenvolvido por Lucas André S**
