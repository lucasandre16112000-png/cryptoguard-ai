# 🔐 CryptoGuard AI - Guia Completo para Windows

**Versão:** 1.0.0 - Totalmente Funcional  
**Data:** 14 de Janeiro de 2026  
**Status:** ✅ Pronto para Produção  
**Autor:** Lucas Andre S  

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação Passo a Passo](#instalação-passo-a-passo)
4. [Execução do Projeto](#execução-do-projeto)
5. [Testes e Validação](#testes-e-validação)
6. [Troubleshooting](#troubleshooting)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [API Endpoints](#api-endpoints)

---

## 🎯 Visão Geral

**CryptoGuard AI** é um sistema enterprise-grade de detecção de fraudes em blockchain que utiliza algoritmos de machine learning para identificar transações suspeitas em tempo real.

### Principais Características

- 🔍 **Monitoramento em Tempo Real** - Ethereum, BSC, Polygon
- 🤖 **Machine Learning** - Análise de múltiplos fatores
- 🚨 **Sistema de Alertas** - Notificações automáticas
- 📊 **Dashboard Inteligente** - Visualização em tempo real
- 📄 **Geração de Relatórios** - PDF automático
- 👥 **Gestão de Endereços** - Whitelist/Blacklist
- ⚙️ **Painel Admin** - Controle total do sistema

---

## 📦 Pré-requisitos

### 1. Node.js 22+ (Obrigatório)

**Como instalar:**
1. Acesse https://nodejs.org/
2. Clique em **"LTS"** (Versão Recomendada)
3. Execute o instalador
4. **Importante:** Marque "Add Node.js to PATH"
5. Clique "Install"
6. Reinicie o computador

**Verificar instalação:**
```powershell
node --version
npm --version
```

### 2. Git (Obrigatório)

**Como instalar:**
1. Acesse https://git-scm.com/
2. Clique em **"Download for Windows"**
3. Execute o instalador
4. Siga as instruções padrão

**Verificar instalação:**
```powershell
git --version
```

### 3. MySQL 8.0+ (Obrigatório)

**Como instalar:**
1. Acesse https://dev.mysql.com/downloads/mysql/
2. Baixe a versão 8.0 ou superior
3. Execute o instalador
4. **Importante:** Defina senha do root como `root`
5. Inicie o serviço MySQL

**Verificar instalação:**
```powershell
mysql --version
```

---

## 🚀 Instalação Passo a Passo

### Passo 1: Abrir o PowerShell

1. Pressione `Windows + X`
2. Selecione **"Windows PowerShell"** ou **"Terminal"**

### Passo 2: Clonar o Repositório

```powershell
git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git
```

### Passo 3: Entrar na Pasta

```powershell
cd cryptoguard-ai
```

### Passo 4: Instalar pnpm (Gerenciador de Pacotes)

```powershell
npm install -g pnpm
```

### Passo 5: Instalar Dependências

```powershell
pnpm install
```

**Tempo estimado:** 2-5 minutos

### Passo 6: Configurar Banco de Dados

**Opção A: Automático (Recomendado)**

Se você tem MySQL instalado e rodando:

```powershell
pnpm db:push
```

**Opção B: Manual**

1. Abra MySQL Workbench ou MySQL Command Line
2. Execute:
```sql
CREATE DATABASE IF NOT EXISTS cryptoguard;
```

3. Depois execute:
```powershell
pnpm db:push
```

### Passo 7: Criar Arquivo .env

Crie um arquivo `.env` na raiz do projeto com:

```
DATABASE_URL=mysql://root:root@127.0.0.1:3306/cryptoguard
JWT_SECRET=your-secret-key-here-change-in-production
VITE_APP_ID=cryptoguard-ai-dev
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
NODE_ENV=development
```

---

## ▶️ Execução do Projeto

### Iniciar o Servidor

```powershell
pnpm dev
```

**Você verá:**
```
Server running on http://localhost:3000/
```

### Acessar no Navegador

Abra seu navegador e acesse:
```
http://localhost:3000
```

---

## 🎮 Como Usar o Sistema

### Dashboard
- Visualize métricas gerais
- Veja transações monitoradas
- Acompanhe alertas ativos
- Analise performance

### Transações
1. Clique em **"Transactions"**
2. Filtre por rede (Ethereum, BSC, Polygon)
3. Filtre por nível de risco
4. Veja detalhes de cada transação

### Endereços
1. Clique em **"Addresses"**
2. Visualize endereços monitorados
3. Veja histórico de transações
4. Adicione a whitelist/blacklist

### Alertas
1. Clique em **"Alerts"**
2. Veja alertas ativos
3. Marque como lido
4. Resolva alertas

### Relatórios
1. Clique em **"Reports"**
2. Clique em **"Generate Report"**
3. Selecione tipo (daily, weekly, monthly, custom)
4. Defina período
5. Gere PDF

### Admin
1. Clique em **"Admin"**
2. Gerencie usuários
3. Configure sistema
4. Gere dados de teste

---

## 🧪 Testes e Validação

### Testar Backend

```powershell
curl http://localhost:3000/api/trpc
```

### Gerar Dados de Teste

1. Vá para **Admin**
2. Clique em **"Generate 50 Transactions"**
3. Aguarde alguns segundos
4. Veja os dados no Dashboard

### Testar API

```powershell
# Listar transações
curl http://localhost:3000/api/trpc/transactions.list

# Listar endereços
curl http://localhost:3000/api/trpc/addresses.list

# Listar alertas
curl http://localhost:3000/api/trpc/alerts.list
```

---

## 🐛 Troubleshooting

### ❌ Erro: "MySQL Connection Error"

**Solução:**
1. Verifique se MySQL está rodando
2. Abra Services (Win + R → `services.msc`)
3. Procure por "MySQL"
4. Se não estiver rodando, clique direito → Start

### ❌ Erro: "Porta 3000 já está em uso"

**Solução:**
```powershell
# Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ Erro: "pnpm not found"

**Solução:**
```powershell
npm install -g pnpm
```

### ❌ Erro: "Database connection refused"

**Solução:**
1. Verifique credenciais em `.env`
2. Padrão: `mysql://root:root@127.0.0.1:3306/cryptoguard`
3. Teste conexão com MySQL Workbench

### ❌ Página em branco

**Solução:**
1. Aguarde 30 segundos
2. Pressione F5 para recarregar
3. Limpe cache: Ctrl + Shift + Delete

---

## 📁 Estrutura do Projeto

```
cryptoguard-ai/
├── client/                    # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── App.tsx           # Componente principal
│   │   ├── pages/            # Páginas
│   │   ├── components/       # Componentes
│   │   ├── lib/              # Utilitários
│   │   └── _core/            # Lógica core
│   └── public/               # Assets estáticos
│
├── server/                    # Backend (Node.js + Express)
│   ├── _core/                # Servidor e middleware
│   ├── routers.ts            # Rotas tRPC
│   ├── db.ts                 # Banco de dados
│   └── pdfGenerator.ts       # Geração de PDF
│
├── shared/                    # Código compartilhado
│   └── _core/                # Tipos e constantes
│
├── drizzle/                   # Migrations
│   ├── schema.ts             # Schema do banco
│   └── migrations/           # Arquivos de migração
│
├── package.json              # Dependências
├── vite.config.ts            # Configuração Vite
├── tsconfig.json             # Configuração TypeScript
└── .env                      # Variáveis de ambiente
```

---

## 🔌 API Endpoints

### Autenticação
```
POST   /api/trpc/auth.me              # Usuário atual
POST   /api/trpc/auth.logout          # Logout
```

### Transações
```
GET    /api/trpc/transactions.list    # Listar transações
GET    /api/trpc/transactions.getById # Obter uma transação
GET    /api/trpc/transactions.stats   # Estatísticas
```

### Endereços
```
GET    /api/trpc/addresses.list       # Listar endereços
GET    /api/trpc/addresses.getByAddress # Obter endereço
```

### Alertas
```
GET    /api/trpc/alerts.list          # Listar alertas
POST   /api/trpc/alerts.markAsRead    # Marcar como lido
POST   /api/trpc/alerts.resolve       # Resolver alerta
```

### Relatórios
```
GET    /api/trpc/reports.list         # Listar relatórios
POST   /api/trpc/reports.generate     # Gerar relatório
```

### Admin
```
GET    /api/trpc/admin.users          # Listar usuários
GET    /api/trpc/admin.config         # Configuração
POST   /api/trpc/admin.seedData       # Gerar dados de teste
```

---

## 📊 Dados de Exemplo

O sistema vem com dados pré-carregados após executar:

```powershell
# No Admin → Generate 50 Transactions
```

Isso criará:
- 50 transações de exemplo
- Múltiplas redes (Ethereum, BSC, Polygon)
- Vários níveis de risco
- Alertas automáticos

---

## 🔄 Próximas Vezes

Você só precisa de 2 comandos:

```powershell
cd cryptoguard-ai
pnpm dev
```

Depois acesse: **http://localhost:3000**

---

## 🛑 Parar o Servidor

Pressione `Ctrl + C` no PowerShell

---

## 🔄 Atualizar do GitHub

```powershell
git pull origin main
pnpm install
pnpm db:push
pnpm dev
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique se Node.js está instalado: `node --version`
2. Verifique se MySQL está rodando
3. Verifique credenciais em `.env`
4. Limpe cache: `Ctrl + Shift + Delete`
5. Reinicie o servidor

---

## 🔗 Links Importantes

- **Repositório:** https://github.com/lucasandre16112000-png/cryptoguard-ai
- **Node.js:** https://nodejs.org/
- **Git:** https://git-scm.com/
- **MySQL:** https://dev.mysql.com/
- **pnpm:** https://pnpm.io/

---

## ✅ Checklist de Primeiro Uso

- [ ] Node.js instalado e verificado
- [ ] Git instalado e verificado
- [ ] MySQL instalado e rodando
- [ ] PowerShell aberto
- [ ] Repositório clonado
- [ ] `pnpm install` executado
- [ ] `.env` criado
- [ ] `pnpm db:push` executado
- [ ] `pnpm dev` rodando
- [ ] Navegador aberto em http://localhost:3000
- [ ] Dashboard visível
- [ ] Dados de teste gerados

---

## 🎉 Pronto para Usar!

Seu CryptoGuard AI está pronto para monitorar fraudes em blockchain!

---

**Última atualização:** 14 de Janeiro de 2026  
**Versão:** 1.0.0 - Totalmente Funcional  
**Autor:** Lucas Andre S  
**Analisado e Validado por:** Manus AI
