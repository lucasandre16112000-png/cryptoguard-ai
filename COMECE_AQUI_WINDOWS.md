# 🚀 COMECE AQUI - CryptoGuard AI no Windows

**Versão:** 1.0.0 - Totalmente Corrigida  
**Status:** ✅ Pronto para Usar

Este é o guia mais simples possível. Siga exatamente como está escrito.

---

## 📋 Pré-requisitos (Instale Uma Vez)

Antes de começar, baixe e instale estes programas:

1. **Node.js** → https://nodejs.org/ (Clique em LTS)
2. **MySQL** → https://dev.mysql.com/downloads/mysql/ (Versão 8.0+)
3. **Git** → https://git-scm.com/

---

## ▶️ Como Rodar (Primeira Vez)

### Passo 1: Abrir PowerShell

Pressione `Win + X` → Selecione **"Terminal (Admin)"**

### Passo 2: Clonar o Projeto Corrigido

Cole este comando:

```powershell
git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git
cd cryptoguard-ai
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
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"
```

### Passo 6: Aplicar Migrations

```powershell
pnpm db:push
```

### Passo 7: Rodar

```powershell
pnpm dev
```

Quando aparecer:
```
Server running on http://localhost:3000/
```

### Passo 8: Abrir no Navegador

Acesse: **http://localhost:3000**

---

## ✅ Pronto!

Agora você pode:
- ✅ Criar uma conta
- ✅ Fazer login
- ✅ Usar o dashboard completo

---

## 🔄 Próximas Vezes

Só precisa de 2 comandos:

```powershell
cd C:\Users\SEU_USUARIO\cryptoguard-ai
pnpm dev
```

Depois abra: **http://localhost:3000**

---

## 🐛 Se Algo Não Funcionar

| Erro | Solução |
|------|---------|
| **"MySQL não conecta"** | Verifique se MySQL está rodando em Services (Win + R → services.msc) |
| **"Porta 3000 em uso"** | Feche o navegador e tente novamente, ou use outro programa |
| **"pnpm não encontrado"** | Feche PowerShell, abra novamente e tente |

---

**Tudo pronto! Bom uso! 🎉**
