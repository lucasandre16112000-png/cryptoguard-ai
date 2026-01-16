# 🚀 RODAR CRYPTOGUARD AI - VERSÃO 100% FUNCIONAL

**Status:** ✅ **TUDO FUNCIONA!**

---

## 📋 O que está Funcionando

✅ **Monitoramento em Tempo Real** - Gera transações automaticamente a cada 10 segundos  
✅ **Análise de Risco** - ML Engine analisa cada transação  
✅ **Alertas Automáticos** - Gera alertas para transações suspeitas  
✅ **Dashboard** - Exibe estatísticas em tempo real  
✅ **Relatórios em PDF** - Gera relatórios HTML/PDF  
✅ **Painel de Admin** - Gerencia usuários e configurações  
✅ **Seed Data** - Gera dados de teste  

---

## 🎯 Como Rodar (Passo a Passo)

### Passo 1: Atualizar o Projeto

```powershell
cd C:\Users\Pc\cryptoguard-ai\cryptoguard-ai
git pull origin main
```

### Passo 2: Definir Variáveis de Ambiente

```powershell
$env:DB_USER="root"
$env:DB_PASSWORD="161120"
$env:DB_HOST="127.0.0.1"
$env:DB_PORT="3306"
$env:DB_NAME="cryptoguard"
$env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"
$env:NODE_ENV="development"
```

### Passo 3: Criar Banco de Dados

```powershell
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"
```

### Passo 4: Instalar Dependências

```powershell
pnpm install
```

### Passo 5: Aplicar Migrations

```powershell
pnpm db:push
```

### Passo 6: Rodar o Servidor

```powershell
pnpm dev
```

Você verá na saída:

```
[ENV] Database configured: mysql:***@127.0.0.1:3306/cryptoguard
Server running on http://localhost:3000/
[✓] Iniciando monitoramento em tempo real de transações...
```

---

## 🌐 Acessar o Dashboard

1. Abra seu navegador
2. Vá para: **http://localhost:3000**
3. Faça login com sua conta

---

## 🎮 Como Usar o Projeto

### 1️⃣ Gerar Dados de Teste

1. Faça login como **admin** (o primeiro usuário é admin por padrão)
2. Vá para a página **"Admin"** (canto superior direito)
3. Na seção **"Seed Data"**, digite um número (ex: 50)
4. Clique em **"Generate"**
5. Aguarde alguns segundos

### 2️⃣ Ver o Dashboard

1. Volte para o **Dashboard**
2. Você verá as estatísticas atualizadas:
   - Total de transações
   - Transações suspeitas
   - Alertas não lidos
   - Pontuação média de risco

### 3️⃣ Explorar Transações

1. Clique em **"Transactions"** no menu
2. Você verá uma lista de todas as transações
3. Pode filtrar por:
   - Rede (Ethereum, BSC, Polygon)
   - Se é suspeita
   - Score de risco
   - Data

### 4️⃣ Ver Alertas

1. Clique em **"Alerts"** no menu
2. Você verá todos os alertas gerados
3. Pode:
   - Marcar como lido
   - Resolver um alerta
   - Filtrar por severidade

### 5️⃣ Gerar Relatório

1. Clique em **"Reports"** no menu
2. Clique em **"Generate Report"**
3. Preencha o formulário:
   - **Title:** Nome do relatório
   - **Type:** daily, weekly, monthly ou custom
   - **Start Date:** Data inicial
   - **End Date:** Data final
4. Clique em **"Generate"**
5. Um novo relatório será criado e listado

### 6️⃣ Ver Endereços

1. Clique em **"Addresses"** no menu
2. Você verá todos os endereços monitorados
3. Pode ver o score de risco de cada um

---

## 🔄 Monitoramento em Tempo Real

O sistema está **constantemente gerando novas transações** a cada 10 segundos!

- **Cada transação** é analisada pelo ML Engine
- **Transações suspeitas** geram alertas automaticamente
- **Dashboard** é atualizado em tempo real
- **Estatísticas** são recalculadas continuamente

---

## 📊 Dados de Teste

Quando você gera dados de teste (Seed Data), o sistema cria:

- **Transações aleatórias** em Ethereum, BSC e Polygon
- **Endereços aleatórios** para cada transação
- **Análise de risco** para cada transação
- **Alertas** para transações de alto risco

---

## 🛑 Parar o Servidor

Pressione `Ctrl + C` no PowerShell

---

## 🔧 Próximas Vezes

Para rodar novamente, basta:

```powershell
cd C:\Users\Pc\cryptoguard-ai\cryptoguard-ai
$env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"
pnpm dev
```

Ou use o comando de uma linha:

```powershell
$env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"; pnpm dev
```

---

## 📝 Resumo das Funcionalidades

| Funcionalidade | Status | Como Acessar |
| :--- | :--- | :--- |
| **Dashboard** | ✅ Funcionando | Home page após login |
| **Transações** | ✅ Funcionando | Menu → Transactions |
| **Alertas** | ✅ Funcionando | Menu → Alerts |
| **Relatórios** | ✅ Funcionando | Menu → Reports |
| **Endereços** | ✅ Funcionando | Menu → Addresses |
| **Admin** | ✅ Funcionando | Menu → Admin (admin only) |
| **Monitoramento Real-Time** | ✅ Funcionando | Automático no servidor |
| **Análise de Risco** | ✅ Funcionando | Em cada transação |
| **Geração de Alertas** | ✅ Funcionando | Automático |

---

## 🎉 Pronto!

Tudo está 100% funcional! Divirta-se explorando o CryptoGuard AI! 🚀

Se tiver alguma dúvida, consulte o arquivo `GUIA_COMPLETO_CRYPTOGUARD.md` para mais detalhes.
