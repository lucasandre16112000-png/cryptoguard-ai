# 🚀 RODAR NO WINDOWS - CryptoGuard AI

**Status:** ✅ 100% Pronto  
**Senha MySQL:** `161120`

---

## ⚡ Forma Mais Rápida (Recomendado)

### Passo 1: Abrir PowerShell como Admin

1. Pressione `Win + X`
2. Selecione **"Terminal (Admin)"** ou **"Windows PowerShell (Admin)"**

### Passo 2: Ir para a Pasta do Projeto

```powershell
cd C:\Users\Pc\cryptoguard-ai\cryptoguard-ai
```

### Passo 3: Rodar o Script Automático

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\SETUP_AUTOMATICO.ps1
```

**Pronto!** O script faz tudo automaticamente. Quando terminar, a aplicação vai estar rodando em `http://localhost:3000`

---

## 📋 Forma Manual (Se o Script Não Funcionar)

Se o script automático não funcionar, siga estes passos:

### Passo 1: Abrir PowerShell como Admin

```powershell
Win + X → Terminal (Admin)
```

### Passo 2: Ir para a Pasta

```powershell
cd C:\Users\Pc\cryptoguard-ai\cryptoguard-ai
```

### Passo 3: Instalar pnpm

```powershell
npm install -g pnpm
```

### Passo 4: Instalar Dependências

```powershell
pnpm install
```

### Passo 5: Criar Banco de Dados

```powershell
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"
```

### Passo 6: Aplicar Migrations

```powershell
pnpm db:push
```

### Passo 7: Rodar

```powershell
pnpm dev
```

Quando aparecer `Server running on http://localhost:3000/`, abra seu navegador e acesse esse endereço.

---

## ✅ Testando

1. Clique em **"Create Account"**
2. Preencha com seus dados
3. Clique em **"Create Account"**
4. **Deve funcionar agora!** ✅

---

## 🔄 Próximas Vezes

Só precisa de 1 comando:

```powershell
cd C:\Users\Pc\cryptoguard-ai\cryptoguard-ai
pnpm dev
```

---

## 🐛 Se Algo Não Funcionar

| Erro | Solução |
|------|---------|
| **"Access denied"** | Verifique se MySQL está rodando (Services → MySQL) |
| **"pnpm not found"** | Feche PowerShell, abra novamente e tente |
| **"Porta 3000 em uso"** | Feche o navegador e tente novamente |
| **"Script not allowed"** | Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |

---

**Tudo pronto! Bom uso! 🎉**
