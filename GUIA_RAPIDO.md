# ⚡ CryptoGuard AI - Guia Rápido

## 🚀 Primeira Execução (5 minutos)

### 1. Instalar Pré-requisitos
```powershell
# Node.js: https://nodejs.org/
# Git: https://git-scm.com/
# MySQL: https://dev.mysql.com/
```

### 2. Clonar e Instalar
```powershell
git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git
cd cryptoguard-ai
npm install -g pnpm
pnpm install
```

### 3. Configurar Banco
```powershell
pnpm db:push
```

### 4. Rodar
```powershell
pnpm dev
```

### 5. Acessar
```
http://localhost:3000
```

---

## 📋 Comandos Principais

```powershell
# Desenvolvimento
pnpm dev                # Rodar servidor
pnpm check             # Verificar TypeScript
pnpm format            # Formatar código

# Banco de Dados
pnpm db:push           # Executar migrations
pnpm db:generate       # Gerar migrations

# Build
pnpm build             # Build para produção
pnpm start             # Rodar produção

# Testes
pnpm test              # Executar testes
```

---

## 🔌 URLs Principais

| Recurso | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **API tRPC** | http://localhost:3000/api/trpc |
| **Dashboard** | http://localhost:3000 |
| **Transactions** | http://localhost:3000/transactions |
| **Addresses** | http://localhost:3000/addresses |
| **Alerts** | http://localhost:3000/alerts |
| **Reports** | http://localhost:3000/reports |
| **Admin** | http://localhost:3000/admin |

---

## 🛠️ Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| MySQL não conecta | `systemctl start mysql` (Linux) ou Services (Windows) |
| Porta 3000 em uso | `netstat -ano \| findstr :3000` → `taskkill /PID <PID> /F` |
| pnpm não encontrado | `npm install -g pnpm` |
| Erros TypeScript | `pnpm check` para ver erros |
| Página em branco | Aguarde 30s, F5, Ctrl+Shift+Delete |

---

## 📁 Estrutura Essencial

```
cryptoguard-ai/
├── client/src/          # Frontend
├── server/              # Backend
├── drizzle/             # Banco de dados
├── package.json         # Dependências
└── .env                 # Configuração
```

---

## 🔐 Arquivo .env

```
DATABASE_URL=mysql://root:root@127.0.0.1:3306/cryptoguard
JWT_SECRET=seu-secret-aqui
VITE_APP_ID=cryptoguard-ai-dev
NODE_ENV=development
```

---

## 📊 Dados de Teste

1. Vá para **Admin**
2. Clique **"Generate 50 Transactions"**
3. Aguarde
4. Veja no Dashboard

---

## 🔄 Próximas Vezes

```powershell
cd cryptoguard-ai
pnpm dev
# Acesse http://localhost:3000
```

---

## 📞 Ajuda Rápida

- **Guia Completo:** GUIA_WINDOWS_CRYPTOGUARD.md
- **Relatório Técnico:** RELATORIO_ANALISE_MANUS.md
- **README Original:** README.md
- **Quick Start:** QUICK_START.md

---

**Versão:** 1.0.0 | **Status:** ✅ Funcional | **Atualizado:** 14/01/2026
