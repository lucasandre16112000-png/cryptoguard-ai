# 🚀 COMANDE AGORA - CryptoGuard AI

**Solução Final - 100% Funcional**

---

## ⚡ Forma Mais Rápida (1 Comando)

Abra PowerShell **como Admin** na pasta do projeto e execute:

```powershell
$env:DB_PASSWORD="161120"; $env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"; mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"; pnpm install; pnpm db:push; pnpm dev
```

**Pronto!** Acesse: **http://localhost:3000**

---

## 📋 Forma Manual (Se a Anterior Não Funcionar)

Execute estes comandos **um por um** no PowerShell:

### Passo 1: Definir Variáveis de Ambiente

```powershell
$env:DB_USER="root"
$env:DB_PASSWORD="161120"
$env:DB_HOST="127.0.0.1"
$env:DB_PORT="3306"
$env:DB_NAME="cryptoguard"
$env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"
$env:NODE_ENV="development"
```

### Passo 2: Criar Banco de Dados

```powershell
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"
```

### Passo 3: Instalar Dependências

```powershell
pnpm install
```

### Passo 4: Aplicar Migrations

```powershell
pnpm db:push
```

### Passo 5: Rodar

```powershell
pnpm dev
```

---

## ✅ Testando

1. Acesse: **http://localhost:3000**
2. Clique em **"Create Account"**
3. Preencha com seus dados
4. Clique em **"Create Account"**
5. **Deve funcionar agora!** ✅

---

## 🔄 Próximas Vezes

Só precisa de 1 comando:

```powershell
pnpm dev
```

---

**Tudo pronto! Bom uso! 🎉**
