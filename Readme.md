# 📦 Catálogo Ximei

Aplicação fullstack para gerenciamento e exibição de um catálogo de produtos, construída com **Node.js**, **TypeScript** e **React** em um monorepo.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express + Docker + AWS S3
- **Banco de Dados:** PostgreSQL e Redis (cache-aside pattern)
- **ORM:** Prisma
- **Estilização:** Tailwind CSS e Headless UI

---

## 📂 Estrutura do Projeto

```plaintext
ximei-store/
│
├── server/
│   ├── src/   → Aplicação backend (API Restfull)
│   ├── docker-compose.yml → Container postgresql e Redis
│
├── web/
│   ├── src/
│         ├── components/  → Componentes compartilhados
```

## 📦 Instalação

```bash
git clone https://github.com/alvarosena/ximei-store.git
cd ximei-store/
```

Instale as dependências:

```bash
npm run install
```

### 🔑 Variáveis de Ambiente

Crie arquivos .env nas pastas server/ e web/:

server/

```env
DATABASE_URL=

REDIS_URL=

AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

SEED_KEY=
NODE_ENV=
```

web/

```env
VITE_API_URL=
```

### 🏃 Executando o Projeto

Rodar o backend:

```bash
npm run dev
```

Rodar o frontend:

```bash
npm run dev
```

### 🗄 Migrations do Banco

```bash
npx prisma migrate dev
```
