# 🔒 CryptoGuard AI - Detecção de Fraudes em Criptomoedas

[![Node.js](https://img.shields.io/badge/Node.js-v24-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://www.mysql.com/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

**CryptoGuard AI** é um sistema de monitoramento e detecção de fraudes para transações de criptomoedas. Ele analisa transações em tempo real, identifica atividades suspeitas e gera alertas automáticos.

---

## 🚀 Início Rápido (Para Iniciantes)

### ⚡ Comando Único (Copie e Cole)

Abra **PowerShell como Admin** e execute:

```powershell
cd C:\Users\Pc; rm -r cryptoguard-ai -Force -ErrorAction SilentlyContinue; git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git; cd cryptoguard-ai; $env:DATABASE_URL="mysql://root:161120@127.0.0.1:3306/cryptoguard"; mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;"; npm install -g pnpm; pnpm install; pnpm db:push; pnpm dev
```

### ✅ Quando Funcionar

Você verá:
```
Server running on http://localhost:3000/
[✓] Iniciando monitoramento em tempo real de transações...
```

### 🌐 Acessar

Abra seu navegador e vá para: **http://localhost:3000**

---

## 📋 Pré-requisitos

Antes de começar, instale:

1. **Git** - https://git-scm.com/download/win
2. **Node.js (LTS)** - https://nodejs.org/
3. **MySQL** - https://dev.mysql.com/downloads/mysql/
   - Senha: `161120`

---

## 📖 Guias Disponíveis

- **[README_LEIGO.md](README_LEIGO.md)** - Guia completo para iniciantes (RECOMENDADO)
- **[RODAR_COMPLETO.md](RODAR_COMPLETO.md)** - Guia detalhado de uso
- **[GUIA_COMPLETO_CRYPTOGUARD.md](GUIA_COMPLETO_CRYPTOGUARD.md)** - Análise técnica completa

---

## 🎮 Como Usar

### 1. Criar Conta
- Clique em "Create one"
- Preencha nome, email e senha
- Clique em "Create Account"

### 2. Fazer Login
- Digite seu email e senha
- Clique em "Sign In"

### 3. Gerar Dados de Teste
- Vá para "Admin"
- Digite um número (ex: 50) em "Seed Data"
- Clique em "Generate"

### 4. Explorar o Sistema
- **Dashboard** - Veja estatísticas em tempo real
- **Transactions** - Veja todas as transações analisadas
- **Alerts** - Veja alertas de transações suspeitas
- **Reports** - Gere relatórios em PDF
- **Addresses** - Monitore endereços

---

## ✨ Funcionalidades

✅ **Monitoramento em Tempo Real** - Analisa transações a cada 10 segundos  
✅ **Detecção de Fraudes** - Identifica atividades suspeitas com ML  
✅ **Alertas Automáticos** - Notifica transações de alto risco  
✅ **Dashboard** - Exibe estatísticas em tempo real  
✅ **Relatórios em PDF** - Gera relatórios customizáveis  
✅ **Painel de Admin** - Gerencia usuários e configurações  
✅ **Múltiplas Redes** - Suporta Ethereum, BSC e Polygon  

---

## 🏗️ Arquitetura

```
CryptoGuard AI
├── Frontend (React + TypeScript)
│   ├── Dashboard
│   ├── Transactions
│   ├── Alerts
│   ├── Reports
│   └── Admin Panel
│
├── Backend (Express + tRPC)
│   ├── Authentication
│   ├── Transaction Processing
│   ├── ML Engine (Risk Analysis)
│   ├── Alert Generation
│   └── Report Generation
│
└── Database (MySQL)
    ├── Users
    ├── Transactions
    ├── Alerts
    ├── Addresses
    └── Reports
```

---

## 🔧 Stack Tecnológico

**Frontend:**
- React 19
- TypeScript
- TailwindCSS
- Recharts (Gráficos)
- React Hook Form

**Backend:**
- Express.js
- tRPC
- TypeScript
- JWT Authentication
- Bcrypt (Senha)

**Database:**
- MySQL 8.0
- Drizzle ORM

**DevTools:**
- Vite
- pnpm
- tsx

---

## 📊 Análise de Risco

O sistema analisa as seguintes características:

| Fator | Descrição | Impacto |
|-------|-----------|--------|
| **Valor da Transação** | Transações muito altas | +25 pontos |
| **Gas Price** | Preço de gás anormal | +20 pontos |
| **Horário** | Transações em horários incomuns | +8 pontos |
| **Endereço Novo** | Endereço com menos de 24h | +15 pontos |
| **Padrão Rápido** | Múltiplas transações rápidas | +10 pontos |
| **Contrato** | Interação com contrato complexo | +10 pontos |

**Score Final:** 0-100 (quanto maior, mais suspeito)

---

## 🚀 Próximos Passos

Depois de rodar com sucesso:

1. **Explore o Dashboard** - Veja as estatísticas
2. **Gere dados de teste** - Crie transações simuladas
3. **Analise os alertas** - Entenda como o sistema detecta fraudes
4. **Gere relatórios** - Crie relatórios em PDF

---

## 🛠️ Desenvolvimento

### Instalar Dependências
```bash
pnpm install
```

### Rodar em Desenvolvimento
```bash
pnpm dev
```

### Build para Produção
```bash
pnpm build
```

### Aplicar Migrations
```bash
pnpm db:push
```

### Gerar Migrations
```bash
pnpm db:generate
```

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` com:

```env
DATABASE_URL=mysql://root:161120@127.0.0.1:3306/cryptoguard
NODE_ENV=development
JWT_SECRET=jwt-secret-key-change-in-production-87654321
COOKIE_SECRET=cryptoguard-secret-key-change-in-production-12345678
```

---

## 🐛 Troubleshooting

### Erro: "jwt.verify is not a function"
- Execute: `git pull origin main`
- Reinicie: `pnpm dev`

### Erro: "Database connection failed"
- Verifique se MySQL está rodando
- Verifique a senha: `161120`
- Recrie o banco: `mysql -u root -p161120 -e "DROP DATABASE cryptoguard; CREATE DATABASE cryptoguard;"`

### Erro: "Port 3000 already in use"
- Mude a porta: `PORT=3001 pnpm dev`
- Ou finalize o processo: `netstat -ano | findstr :3000`

---

## 📚 Documentação

- [Guia para Iniciantes](README_LEIGO.md)
- [Guia Completo de Uso](RODAR_COMPLETO.md)
- [Análise Técnica](GUIA_COMPLETO_CRYPTOGUARD.md)

---

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 📞 Suporte

Se tiver dúvidas:

1. Consulte o [README_LEIGO.md](README_LEIGO.md)
2. Verifique a seção [Troubleshooting](#-troubleshooting)
3. Abra uma issue no GitHub

---

## 🎯 Roadmap

- [ ] Integração com blockchain real (Infura/Alchemy)
- [ ] Machine Learning avançado
- [ ] Notificações por email
- [ ] API pública
- [ ] Mobile app
- [ ] Suporte a mais blockchains

---

**Desenvolvido com ❤️ para a comunidade de criptomoedas**

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2025
