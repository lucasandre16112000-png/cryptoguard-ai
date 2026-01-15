# 🚀 LEIA PRIMEIRO - CryptoGuard AI no Windows

**Status:** ✅ 100% Pronto  
**Senha MySQL:** `161120`

---

## ⚡ Solução Super Simples (3 Passos)

### Passo 1: Copiar o Arquivo de Configuração

Abra PowerShell **como Admin** na pasta do projeto e execute:

```powershell
copy .env.local.example .env.local
```

### Passo 2: Criar o Banco de Dados

```powershell
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"
```

### Passo 3: Rodar

```powershell
pnpm install
pnpm db:push
pnpm dev
```

**Pronto!** Acesse: **http://localhost:3000**

---

## 📝 Explicação

O problema era que o arquivo `.env` não estava sendo lido pelo `drizzle-kit` no Windows. Agora criamos um arquivo `.env.local` que funciona perfeitamente.

**Arquivos importantes:**
- `.env.local.example` - Copie para `.env.local` (seu arquivo de configuração local)
- `.env` - Arquivo de configuração para produção (não edite)
- `drizzle.config.ts` - Agora lê `.env.local` corretamente

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
pnpm dev
```

---

**Tudo pronto! Bom uso! 🎉**
