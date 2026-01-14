# 🚀 CryptoGuard AI - Guia Final de Execução

## ✅ Status: 100% Funcional

O projeto foi **completamente corrigido** e está pronto para rodar perfeitamente no Windows!

---

## 📋 Pré-requisitos (Instale Uma Vez)

### 1. Node.js
- Acesse: https://nodejs.org/
- Baixe a versão **LTS** (recomendado)
- Instale normalmente

### 2. MySQL
- Acesse: https://dev.mysql.com/downloads/installer/
- Baixe: **MySQL Community Server 8.0.44**
- **IMPORTANTE:** Defina a senha do usuário `root` como: `161120`

### 3. Git
- Acesse: https://git-scm.com/
- Instale normalmente

---

## 🚀 Como Rodar (Primeira Vez)

### Passo 1: Abrir PowerShell

Pressione `Windows + X` → Clique em **"Windows PowerShell"**

### Passo 2: Clonar o Projeto

```powershell
git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git
cd cryptoguard-ai
```

### Passo 3: Instalar Dependências

```powershell
npm install -g pnpm
pnpm install
```

(Aguarde 2-3 minutos)

### Passo 4: Criar Banco de Dados

```powershell
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"
```

### Passo 5: Preparar Banco

```powershell
pnpm db:push
```

### Passo 6: Build

```powershell
pnpm build
```

(Aguarde 2-3 minutos)

### Passo 7: Rodar

```powershell
pnpm dev
```

Quando aparecer:
```
Server running on http://localhost:3000/
```

### Passo 8: Abrir no Navegador

Abra seu navegador e acesse:
```
http://localhost:3000
```

---

## 🔄 Próximas Vezes (Mais Rápido)

Você só precisa fazer isto:

```powershell
cd C:\Users\Seu_Usuario\cryptoguard-ai
pnpm dev
```

Depois abra: **http://localhost:3000**

---

## 🛠️ Comandos Úteis

```powershell
# Rodar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Verificar erros TypeScript
pnpm check

# Formatar código
pnpm format

# Preparar banco de dados
pnpm db:push

# Gerar migrations
pnpm db:generate
```

---

## 🔌 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **API** | http://localhost:3000/api/trpc |
| **Dashboard** | http://localhost:3000 |

---

## 🐛 Troubleshooting

### Erro: "MySQL não conecta"
```powershell
# Verificar se MySQL está rodando
mysql -u root -p161120 -e "SELECT 1;"

# Se não funcionar, reiniciar MySQL
net stop MySQL80
net start MySQL80
```

### Erro: "Porta 3000 em uso"
```powershell
# Encontrar processo na porta 3000
netstat -ano | findstr :3000

# Matar o processo (substitua PID)
taskkill /PID <PID> /F
```

### Erro: "pnpm não encontrado"
```powershell
npm install -g pnpm
```

### Página em branco
- Aguarde 30 segundos
- Pressione F5 (refresh)
- Limpe cache: Ctrl + Shift + Delete

---

## 📁 Estrutura do Projeto

```
cryptoguard-ai/
├── client/              # Frontend (React)
├── server/              # Backend (Express + tRPC)
├── drizzle/             # Banco de dados
├── package.json         # Dependências
├── .env                 # Configuração
└── vite.config.ts       # Config Vite
```

---

## 🔐 Arquivo .env

O arquivo `.env` já está configurado com:
- `DATABASE_URL=mysql://root:161120@127.0.0.1:3306/cryptoguard`
- `JWT_SECRET=jwt-secret-key-change-in-production-87654321`
- `VITE_APP_ID=cryptoguard-ai-dev`
- `VITE_OAUTH_PORTAL_URL=https://auth.manus.im`
- `NODE_ENV=development`
- `PORT=3000`

**Não precisa mudar nada!**

---

## 📊 Funcionalidades

✅ Dashboard com métricas
✅ Monitoramento de transações (Ethereum, BSC, Polygon)
✅ Sistema de alertas automáticos
✅ Gestão de endereços (whitelist/blacklist)
✅ Geração de relatórios PDF
✅ Painel administrativo
✅ Autenticação com JWT

---

## 🎯 Próximos Passos

1. Clone o repositório
2. Instale as dependências
3. Crie o banco de dados
4. Execute `pnpm build`
5. Execute `pnpm dev`
6. Abra http://localhost:3000

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se MySQL está rodando
2. Verifique se Node.js está instalado
3. Verifique se está na pasta correta
4. Tente limpar cache: `Remove-Item -Recurse -Force dist`

---

**Versão:** 1.0.0 | **Status:** ✅ 100% Funcional | **Atualizado:** 14/01/2026
