# ✅ Guia de Correção - CryptoGuard AI para Windows

**Status:** 🚀 Correção Aplicada e Subida para o GitHub!

Este guia rápido vai te ajudar a aplicar a correção no seu ambiente Windows. O problema estava nas migrations do banco de dados, que não estavam sendo aplicadas corretamente.

---

## 🛠️ Passos para Aplicar a Correção

Siga estes passos no **Windows PowerShell**.

### Passo 1: Abrir o PowerShell

Pressione `Win + X` e selecione **"Terminal (Admin)"** ou **"Windows PowerShell (Admin)"**.

### Passo 2: Navegar até a Pasta do Projeto

Se você já tem o projeto, entre na pasta:

```powershell
cd C:\Users\SEU_USUARIO\cryptoguard-ai
```
(Substitua `SEU_USUARIO` pelo seu nome de usuário no Windows)

### Passo 3: Baixar a Correção do GitHub

Execute o comando abaixo para baixar as atualizações que eu fiz:

```powershell
git pull origin main
```

Você verá uma mensagem indicando que os arquivos foram atualizados.

### Passo 4: Apagar e Recriar o Banco de Dados

Para garantir que a correção seja aplicada corretamente, vamos apagar e recriar o banco de dados. **Isso vai apagar todos os dados que você já cadastrou.**

```powershell
mysql -u root -proot -e "DROP DATABASE IF EXISTS cryptoguard; CREATE DATABASE cryptoguard;"
```

### Passo 5: Aplicar as Novas Migrations

Agora, execute o comando para aplicar as migrations corrigidas:

```powershell
pnpm db:push
```

Você deverá ver uma mensagem de `[✓] migrations applied successfully!`.

### Passo 6: Rodar a Aplicação

Finalmente, inicie o projeto novamente:

```powershell
pnpm dev
```

---

## ✅ Testando a Correção

1.  Acesse [**http://localhost:3000**](http://localhost:3000) no seu navegador.
2.  Tente se cadastrar novamente.
3.  **O cadastro deve funcionar perfeitamente agora!**

---

## 📝 Resumo da Correção

*   **Problema:** A migração inicial do banco de dados estava definindo o campo `openId` como `NOT NULL`, o que causava um erro ao tentar registrar um usuário sem esse campo.
*   **Solução:** Corrigi o arquivo de migração para permitir que o campo `openId` seja nulo e adicionei a coluna `passwordHash` na migração correta para evitar conflitos.
*   **Resultado:** O schema do banco de dados agora está consistente com o código da aplicação, e o registro de usuários funciona como esperado.

Se tiver qualquer problema, me avise!
