# Mentor IA — landing page

Página pública de apresentação do **Mentor IA**, o tutor com inteligência artificial da plataforma EAD JML.

Vue 3 + Vite, sem backend: os botões "Entrar" e "Escolher plano" levam para a plataforma.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em **http://127.0.0.1:5180**. A porta é fixa (`strictPort`) para não disputar com o EAD JML
(8000), o Vite dele (5173) e os workers (3000+): se a 5180 estiver ocupada, o servidor avisa e para.

## Configuração

Copie `.env.example` para `.env` e ajuste:

| Variável | Para quê |
| --- | --- |
| `VITE_PLATAFORMA_URL` | Endereço da plataforma EAD JML (padrão `http://127.0.0.1:8000`) |

## Build

```bash
npm run build     # gera dist/
npm run preview   # serve o dist/ em http://127.0.0.1:5181
```

## Onde mexer

- `src/App.vue` — todas as seções da página
- `src/data/planos.js` — preços, créditos e benefícios dos planos (copiados da plataforma; manter em sincronia)
- `public/img/` — artes do Mentor (as mesmas da plataforma)
