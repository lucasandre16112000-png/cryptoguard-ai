# 🔒 CryptoGuard AI - Guia Completo para Iniciantes

**Bem-vindo ao CryptoGuard AI!** Este é um sistema que monitora transações de criptomoedas e detecta atividades suspeitas automaticamente.

---

## 📋 O que você precisa antes de começar?

Antes de rodar o projeto, você precisa ter instalado no seu computador:

### 1️⃣ **Git** (para clonar o projeto)
- Baixe em: https://git-scm.com/download/win
- Clique em "Download for Windows"
- Execute o instalador e siga as instruções (clique "Next" em tudo)

### 2️⃣ **Node.js** (para rodar o projeto)
- Baixe em: https://nodejs.org/
- Escolha a versão **LTS** (a mais estável)
- Execute o instalador e siga as instruções (clique "Next" em tudo)

### 3️⃣ **MySQL** (banco de dados)
- Baixe em: https://dev.mysql.com/downloads/mysql/
- Execute o instalador
- **IMPORTANTE:** Quando pedir a senha, use: `161120`
- Anote essa senha, você vai precisar dela

---

## 🚀 Passo a Passo para Rodar (DO ZERO)

### Passo 1: Abrir PowerShell

1. Pressione **Windows + X** no seu teclado
2. Clique em **"Terminal (Admin)"** ou **"Windows PowerShell (Admin)"**
3. Se pedir confirmação, clique em **"Sim"**

### Passo 2: Copiar e Colar o Comando Completo

Copie **TUDO** isto abaixo e **cole no PowerShell**:

```powershell
cd C:\Users\Pc; rm -r cryptoguard-ai -Force -ErrorAction SilentlyContinue; git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git; cd cryptoguard-ai; $env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"; mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"; npm install -g pnpm; pnpm install; pnpm db:push; pnpm dev
```

### Passo 3: Pressionar Enter

Pressione **Enter** no seu teclado e **aguarde**.

O processo vai:
- ✅ Baixar o projeto do GitHub
- ✅ Instalar as dependências
- ✅ Criar o banco de dados
- ✅ Rodar o servidor

---

## ✅ Como Saber que Funcionou?

Você verá na tela:

```
Server running on http://localhost:3000/
[✓] Iniciando monitoramento em tempo real de transações...
```

Se vir isso, **funcionou!** 🎉

---

## 🌐 Acessar o Sistema

1. Abra seu navegador (Chrome, Firefox, Edge, etc)
2. Digite na barra de endereço: `http://localhost:3000`
3. Pressione Enter

---

## 🎮 Como Usar o CryptoGuard AI

### Criar uma Conta

1. Clique em **"Create one"** (ou "Criar Conta")
2. Preencha:
   - **Name:** Seu nome (ex: Lucas)
   - **Email:** Seu email (ex: lucas@gmail.com)
   - **Password:** Uma senha (mínimo 8 caracteres)
   - **Confirm Password:** Repita a senha
3. Clique em **"Create Account"**

### Fazer Login

1. Digite seu email
2. Digite sua senha
3. Clique em **"Sign In"**

### Explorar o Dashboard

Você verá um painel com:
- **Total de Transações** - Quantas transações foram analisadas
- **Transações Suspeitas** - Quantas foram detectadas como suspeitas
- **Alertas Não Lidos** - Quantos alertas novos você tem
- **Score Médio de Risco** - Qual é o risco médio

### Gerar Dados de Teste

1. Clique em **"Admin"** (canto superior direito)
2. Na seção **"Seed Data"**, digite um número (ex: 50)
3. Clique em **"Generate"**
4. Aguarde alguns segundos

Isso vai criar 50 transações simuladas para você testar o sistema!

### Ver Transações

1. Clique em **"Transactions"** no menu
2. Você verá uma lista de todas as transações
3. Pode filtrar por:
   - **Rede** (Ethereum, BSC, Polygon)
   - **Se é suspeita**
   - **Score de risco**
   - **Data**

### Ver Alertas

1. Clique em **"Alerts"** no menu
2. Você verá todos os alertas gerados
3. Pode:
   - **Marcar como lido** - Clique no alerta
   - **Resolver** - Clique em "Resolve"

### Gerar Relatório

1. Clique em **"Reports"** no menu
2. Clique em **"Generate Report"**
3. Preencha:
   - **Title:** Nome do relatório (ex: "Relatório Janeiro")
   - **Type:** Escolha (daily, weekly, monthly, custom)
   - **Start Date:** Data inicial
   - **End Date:** Data final
4. Clique em **"Generate"**

Um novo relatório será criado e listado!

### Ver Endereços

1. Clique em **"Addresses"** no menu
2. Você verá todos os endereços monitorados
3. Cada um tem um score de risco

---

## 🛑 Parar o Sistema

Se quiser parar o servidor:

1. Vá para o PowerShell
2. Pressione **Ctrl + C**
3. Pronto! O servidor parou

---

## 🔄 Rodar Novamente (Próximas Vezes)

Se você fechou o PowerShell e quer rodar novamente:

1. Abra PowerShell como Admin
2. Execute:

```powershell
cd C:\Users\Pc\cryptoguard-ai; $env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"; pnpm dev
```

3. Pressione Enter
4. Acesse: `http://localhost:3000`

---

## ❓ Dúvidas Frequentes

### P: Deu erro ao instalar?
**R:** Tente rodar o comando novamente. Se persistir, verifique se você tem Git, Node.js e MySQL instalados.

### P: Não consigo acessar http://localhost:3000?
**R:** Verifique se o servidor está rodando (você deve ver "Server running on http://localhost:3000/" no PowerShell).

### P: Esqueci a senha do MySQL?
**R:** Se instalou recentemente, a senha padrão é `161120`. Se não funcionar, desinstale e reinstale o MySQL.

### P: Como faço para parar o servidor?
**R:** Pressione **Ctrl + C** no PowerShell.

### P: Posso rodar em outro computador?
**R:** Sim! Repita os mesmos passos em qualquer computador com Windows, Git, Node.js e MySQL instalados.

---

## 📊 O que o Sistema Faz?

O **CryptoGuard AI** monitora transações de criptomoedas e:

1. ✅ **Analisa cada transação** - Calcula um score de risco (0-100)
2. ✅ **Detecta atividades suspeitas** - Identifica padrões anormais
3. ✅ **Gera alertas** - Notifica quando encontra algo suspeito
4. ✅ **Exibe estatísticas** - Mostra dados em tempo real
5. ✅ **Gera relatórios** - Cria relatórios em PDF

---

## 🎯 Próximos Passos

Depois que você rodar com sucesso:

1. **Explore o Dashboard** - Veja as estatísticas
2. **Gere dados de teste** - Crie transações simuladas
3. **Veja os alertas** - Entenda como o sistema detecta fraudes
4. **Gere um relatório** - Crie um relatório em PDF

---

## 💡 Dicas Importantes

- **Sempre rode como Admin** - O PowerShell precisa de permissão de administrador
- **Não feche o PowerShell** - Enquanto estiver rodando, deixe o PowerShell aberto
- **Use a senha correta** - A senha do MySQL é `161120`
- **Aguarde a instalação** - A primeira vez pode levar alguns minutos

---

## 🚀 Pronto!

Você está pronto para usar o **CryptoGuard AI**! 

Se tiver dúvidas, releia este guia ou consulte a documentação técnica no repositório.

**Divirta-se monitorando transações de criptomoedas!** 🎉

---

**Versão:** 1.0  
**Última atualização:** Janeiro 2025  
**Autor:** CryptoGuard Team
