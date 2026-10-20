<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Ic from './components/Ic.vue';
import Persona from './components/Persona.vue';
import ShowcaseChat from './components/ShowcaseChat.vue';
import { planos, custos } from './data/planos.js';

const PLATAFORMA = (import.meta.env.VITE_PLATAFORMA_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const linkEntrar = `${PLATAFORMA}/`;
const linkPlanos = `${PLATAFORMA}/planos`;

const formatCost = (cost) => `${cost} crédito${cost > 1 ? 's' : ''}`;
const formatarPreco = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
const accents = ['#4D9FFF', '#8D5BD8', '#B44DFF'];
const accentsInk = ['#1F5FC4', '#6A3BBF', '#8A22C7'];
const tierLabels = ['Nível 1 · Entrada', 'Nível 2 · Intermediário', 'Nível 3 · Completo'];

const links = [
  { href: '#metodo', label: 'Como funciona' },
  { href: '#ferramentas', label: 'Ferramentas' },
  { href: '#planos', label: 'Planos' },
  { href: '#duvidas', label: 'Dúvidas' },
];

const fatos = [
  { icon: 'quote', title: 'Fonte em cada resposta', text: 'Aula e minuto exato' },
  { icon: 'lock', title: 'Só o que você estudou', text: 'Sem antecipar conteúdo' },
  { icon: 'layers', title: '4 jeitos de estudar', text: 'Chat, mapa, resumo e podcast' },
  { icon: 'phones', title: 'Onde você estiver', text: 'No computador e no celular' },
];

const pillars = [
  { pose: 'think', n: '01', title: 'Pensar', text: 'Pergunte do seu jeito. O Mentor explica com calma e sempre mostra de qual aula veio a resposta.' },
  { pose: 'organize', n: '02', title: 'Planejar', text: 'Organize o estudo com resumos e mapas mentais feitos a partir do que você já viu.' },
  { pose: 'evolve', n: '03', title: 'Evoluir', text: 'Revise ouvindo o podcast da aula e avance no curso com mais segurança.' },
];

const topics = [
  { title: 'Modalidades de licitação', seen: true },
  { title: 'Contratação direta', seen: true },
  { title: 'Fase recursal', seen: true },
  { title: 'Diálogo competitivo', seen: false },
  { title: 'Sanções administrativas', seen: false },
];

const faq = [
  { q: 'O que é o Mentor IA?', a: 'É um tutor com inteligência artificial que fica dentro do seu curso na plataforma EAD JML. Ele tira dúvidas e cria materiais de revisão a partir das aulas.' },
  { q: 'De onde vêm as respostas?', a: 'Das aulas do seu curso que você já assistiu. Cada resposta indica a aula e o minuto exato, para você conferir quando quiser.' },
  { q: 'E se eu perguntar algo que ainda não estudei?', a: 'O Mentor avisa que esse conteúdo ainda não foi visto, em vez de inventar uma resposta. Quando você chegar na aula, ele responde com a fonte.' },
  { q: 'O que são os créditos?', a: 'Cada ação usa uma quantidade de créditos, mostrada em cada ferramenta. O saldo renova todo mês, de acordo com o seu plano.' },
  { q: 'Preciso instalar alguma coisa?', a: 'Não. O Mentor funciona direto no navegador, no computador ou no celular, dentro da plataforma EAD JML.' },
];

// Barra do topo ganha fundo e sombra depois que a página rola.
const rolou = ref(false);
const onScroll = () => { rolou.value = window.scrollY > 8; };
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); });
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <div class="mv">
    <a class="mv-skip" href="#conteudo">Pular para o conteúdo</a>

    <header class="mv-top" :class="{ rolou }">
      <div class="mv-w mv-top-inner">
        <a href="#" class="mv-top-logo" aria-label="Mentor IA — início"><Persona pose="logo-robo" :size="118" label="Mentor IA" eager /></a>
        <nav class="mv-nav" aria-label="Seções">
          <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
        </nav>
        <div class="mv-top-actions">
          <a :href="linkEntrar" class="mv-top-login">Entrar</a>
          <a href="#planos" class="mv-btn mv-btn--primary mv-btn--sm">Começar</a>
        </div>
      </div>
    </header>

    <main id="conteudo">
      <!-- Hero -->
      <section class="mv-hero">
        <div class="mv-aurora" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="mv-w mv-hero-grid">
          <div class="mv-hero-copy mv-rise">
            <span class="mv-kicker"><Persona pose="symbol" :size="26" eager /> Tutor com IA dentro do seu curso</span>
            <h1>O mentor que conhece <em>cada aula</em> do seu curso.</h1>
            <p class="mv-lead">Tire dúvidas, revise e transforme as aulas em mapas mentais e podcasts. Cada resposta mostra a aula e o minuto de onde veio. Nada inventado.</p>
            <div class="mv-cta-row">
              <a href="#planos" class="mv-btn mv-btn--primary">Conhecer os planos <Ic name="chevR" :size="18" /></a>
              <a href="#demo" class="mv-btn mv-btn--ghost"><Ic name="play" :size="15" /> Ver funcionando</a>
            </div>
            <ul class="mv-proof">
              <li><Ic name="check" :size="16" /> Respostas com fonte</li>
              <li><Ic name="check" :size="16" /> Só o que você já estudou</li>
              <li><Ic name="check" :size="16" /> Disponível a qualquer hora</li>
            </ul>
          </div>

          <div class="mv-hero-art mv-rise" aria-hidden="true">
            <span class="mv-orbit mv-orbit--1"></span>
            <span class="mv-orbit mv-orbit--2"></span>
            <span class="mv-hero-glow"></span>
            <Persona class="mv-hero-bot" pose="welcome" :size="380" eager />
            <div class="mv-float mv-float--cite">
              <span class="mv-float-ic"><Ic name="play" :size="14" /></span>
              <span><b>Aula 10 · Modalidades</b><small>Fonte da resposta · 08:42</small></span>
            </div>
            <div class="mv-float mv-float--map">
              <span class="mv-float-ic mv-float-ic--map"><Ic name="map" :size="16" /></span>
              <span><b>Mapa mental pronto</b><small>12 conceitos conectados</small></span>
            </div>
            <div class="mv-float mv-float--pod">
              <span class="mv-float-ic mv-float-ic--pod"><Ic name="sound" :size="15" /></span>
              <span><b>Podcast da aula</b><span class="mv-wave"><i v-for="h in [40, 75, 55, 90, 60, 100, 45, 70, 35]" :key="h" :style="{ height: h + '%' }"></i></span></span>
            </div>
          </div>
        </div>

        <div class="mv-w">
          <ul class="mv-facts mv-rise">
            <li v-for="f in fatos" :key="f.title">
              <span class="mv-fact-ic"><Ic :name="f.icon" :size="20" /></span>
              <span><b>{{ f.title }}</b><small>{{ f.text }}</small></span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Método -->
      <section id="metodo" class="mv-pillars">
        <div class="mv-w">
          <header class="mv-head mv-head--center">
            <span class="mv-eyebrow">O método Mentor IA</span>
            <h2>Pensar <i></i> Planejar <i></i> Evoluir</h2>
            <p>Três passos simples, que cabem na sua rotina de estudo.</p>
          </header>
          <div class="mv-pillar-grid">
            <article v-for="p in pillars" :key="p.title" class="mv-pillar">
              <div class="mv-pillar-art"><Persona :pose="p.pose" :size="200" /></div>
              <span class="mv-pillar-n mv-mono">{{ p.n }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Confiança + demonstração -->
      <section id="demo" class="mv-trust">
        <div class="mv-w mv-trust-grid">
          <div class="mv-trust-copy">
            <span class="mv-eyebrow mv-eyebrow--dark">Respostas confiáveis</span>
            <h2>Ele só responde com base <span>no que você estudou.</span></h2>
            <p>Cada resposta indica a aula e o minuto exato. Quando o conteúdo ainda não foi visto, o Mentor avisa, em vez de completar com uma resposta genérica.</p>
            <ul>
              <li><span><Ic name="check" :size="17" /></span> Respostas baseadas nas aulas</li>
              <li><span><Ic name="play" :size="15" /></span> Referência de aula e minuto</li>
              <li><span><Ic name="lock" :size="16" /></span> Sem antecipar conteúdos não estudados</li>
            </ul>

            <aside class="mv-frontier" aria-label="Exemplo de conteúdos liberados">
              <header><b>Conteúdos disponíveis para resposta</b><span>3 de 5</span></header>
              <div v-for="topic in topics" :key="topic.title" class="mv-topic" :class="topic.seen ? 'seen' : 'locked'">
                <span class="mv-topic-icon"><Ic :name="topic.seen ? 'check' : 'lock'" :size="topic.seen ? 14 : 13" /></span>
                <span class="mv-topic-name">{{ topic.title }}</span>
                <span class="mv-topic-status">{{ topic.seen ? 'Disponível' : 'Ainda não estudado' }}</span>
              </div>
            </aside>
          </div>

          <div class="mv-demo">
            <div class="mv-demo-tag"><span><i></i> Experimente</span><small>Conteúdo ilustrativo</small></div>
            <ShowcaseChat :height="560" title="Mentor IA" />
          </div>
        </div>
      </section>

      <!-- Ferramentas -->
      <section id="ferramentas" class="mv-tools">
        <div class="mv-w">
          <header class="mv-head">
            <span class="mv-eyebrow">Ferramentas</span>
            <h2>Suas aulas, de quatro jeitos diferentes.</h2>
            <p>Escolha como prefere estudar. Cada ação mostra quanto usa do seu plano.</p>
          </header>
          <div class="mv-bento">
            <article class="mv-tile mv-tile--chat">
              <div class="mv-tile-copy">
                <span class="mv-tile-ic"><Ic name="chat" :size="22" /></span>
                <h3>Pergunte ao curso</h3>
                <p>Tire dúvidas a qualquer hora. A resposta vem das aulas que você assistiu, com a aula e o minuto.</p>
                <span class="mv-cost">{{ formatCost(custos.chat) }}</span>
              </div>
              <div class="mv-tile-chatmock" aria-hidden="true">
                <span class="mv-bubble mv-bubble--me">O que muda no pregão?</span>
                <span class="mv-bubble mv-bubble--bot">O pregão continua para bens e serviços comuns, agora sob a 14.133…<em><Ic name="play" :size="11" /> Aula 10 · 08:42</em></span>
              </div>
              <Persona class="mv-tile-bot" pose="working" :size="230" />
            </article>

            <article class="mv-tile mv-tile--map">
              <div class="mv-tile-copy">
                <span class="mv-tile-ic"><Ic name="map" :size="22" /></span>
                <h3>Mapa mental</h3>
                <p>Veja como os conceitos estudados se conectam, num mapa que você pode explorar.</p>
                <span class="mv-cost">{{ formatCost(custos.mapa) }}</span>
              </div>
              <img class="mv-tile-img" src="/img/mapa-mental.webp" alt="" width="240" height="240" loading="lazy" />
            </article>

            <article class="mv-tile mv-tile--resumo">
              <span class="mv-tile-ic"><Ic name="doc" :size="22" /></span>
              <h3>Resumo do módulo</h3>
              <p>Os pontos principais em poucos minutos de leitura.</p>
              <div class="mv-lines" aria-hidden="true"><i></i><i></i><i></i></div>
              <span class="mv-cost">{{ formatCost(custos.resumo) }}</span>
            </article>

            <article class="mv-tile mv-tile--pod">
              <img class="mv-tile-img" src="/img/podcast.webp" alt="" width="128" height="160" loading="lazy" />
              <span class="mv-tile-ic"><Ic name="sound" :size="22" /></span>
              <h3>Podcast da aula</h3>
              <p>O conteúdo em áudio, para ouvir quando e onde quiser.</p>
              <span class="mv-cost">{{ formatCost(custos.podcast) }}</span>
            </article>
          </div>
        </div>
      </section>

      <!-- Planos -->
      <section id="planos" class="mv-plans">
        <div class="mv-w">
          <header class="mv-head mv-head--center">
            <span class="mv-eyebrow">Planos</span>
            <h2>Escolha o ritmo do seu estudo.</h2>
            <p>Todos os planos usam a mesma base confiável: as suas aulas.</p>
          </header>
          <div class="mv-plan-grid">
            <article
              v-for="(plan, index) in planos" :key="plan.key"
              class="mv-plan" :class="{ featured: plan.destaque }"
              :style="{ '--plan-color': accents[index], '--plan-ink': accentsInk[index] }"
            >
              <span v-if="plan.destaque" class="mv-plan-flag"><Ic name="star" :size="13" /> Recomendado</span>
              <span class="mv-plan-tier mv-mono">{{ tierLabels[index] }}</span>
              <h3>{{ plan.nome }}</h3>
              <p class="mv-plan-purpose">{{ plan.para }}</p>
              <p class="mv-plan-price"><b>{{ formatarPreco(plan.preco) }}</b><small>/ mês</small></p>
              <div class="mv-plan-meter">
                <strong class="mv-mono">{{ plan.creditos }}<small>créditos por mês<span v-if="plan.audio"> · inclui áudio</span></small></strong>
                <div><i :style="{ width: `${[34, 67, 100][index]}%` }"></i></div>
              </div>
              <ul class="mv-plan-features">
                <li class="mv-plan-features-label">{{ index === 0 ? 'Inclui' : 'Adiciona' }}</li>
                <li v-for="b in plan.beneficios" :key="b"><span><Ic name="check" :size="13" /></span>{{ b }}</li>
              </ul>
              <p v-if="index > 0" class="mv-plan-includes"><Ic name="layers" :size="15" /> Inclui tudo do <b>{{ planos[index - 1].nome }}</b></p>
              <a :href="linkPlanos" class="mv-btn mv-plan-btn" :class="plan.destaque ? 'mv-btn--primary' : 'mv-btn--ghost'">Escolher o {{ plan.nome }}</a>
            </article>
          </div>
          <p class="mv-plan-note"><Ic name="lock" :size="15" /> O Mentor IA é exclusivo para alunos da plataforma EAD JML.</p>
        </div>
      </section>

      <!-- Dúvidas -->
      <section id="duvidas" class="mv-faq">
        <div class="mv-w mv-faq-grid">
          <header class="mv-head">
            <span class="mv-eyebrow">Dúvidas</span>
            <h2>Perguntas frequentes</h2>
            <Persona class="mv-faq-bot" pose="think" :size="170" />
          </header>
          <div class="mv-faq-list">
            <details v-for="(item, i) in faq" :key="item.q" :open="i === 0">
              <summary>{{ item.q }}<span class="mv-faq-plus" aria-hidden="true"></span></summary>
              <p>{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Fechamento -->
      <section class="mv-final">
        <div class="mv-aurora mv-aurora--soft" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="mv-w mv-final-inner">
          <Persona class="mv-final-logo" pose="logo-robo" :size="380" label="Mentor IA — Pensar, Planejar, Evoluir" />
          <h2>Pronto para estudar com o seu Mentor?</h2>
          <div class="mv-cta-row mv-cta-row--center">
            <a href="#planos" class="mv-btn mv-btn--primary mv-btn--lg">Conhecer os planos <Ic name="chevR" :size="19" /></a>
            <a :href="linkEntrar" class="mv-btn mv-btn--ghost mv-btn--lg">Já sou aluno</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="mv-footer">
      <div class="mv-w mv-footer-inner">
        <span class="mv-footer-brand"><Persona pose="symbol" :size="30" /> <span><b>Mentor IA</b><small>Pensar · Planejar · Evoluir</small></span></span>
        <span class="mv-footer-by">Uma solução da plataforma EAD JML <img src="/img/logo_grupo_jml.svg" alt="Grupo JML" width="56" height="36" /></span>
        <small>© {{ new Date().getFullYear() }} Grupo JML. Todos os direitos reservados.</small>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.mv {
  --ink: #12131C; --muted: #4A4E5E; --faint: #5C6172;
  --bg: #F6F5FA; --line: #E6E4EF; --line-soft: #EFEEF5;
  --brand: #5B2EBC; --brand-ink: #4A1FA8; --brand-soft: #F2ECFC; --brand-border: #E1D6F5;
  --navy: #0D0B1F;
  --grad: linear-gradient(90deg, #4D9FFF, #8D5BD8 52%, #B44DFF);
  --grad-d: linear-gradient(135deg, #4D7BFF, #7A3FE0 55%, #B44DFF);
  --mono: 'IBM Plex Mono', ui-monospace, monospace;
  --ease-o: cubic-bezier(.16, 1, .3, 1);
  min-height: 100vh; overflow-x: clip; color: var(--ink); background: var(--bg);
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}
.mv section[id] { scroll-margin-top: 80px; }
.mv-w { width: 100%; max-width: 1200px; margin: 0 auto; padding-right: 56px; padding-left: 56px; }
.mv-mono { font-family: var(--mono); font-feature-settings: 'tnum' 1; }
.mv-rise { animation: mvRise .7s var(--ease-o) both; }
.mv-skip { position: absolute; left: 16px; top: -60px; z-index: 100; padding: 12px 18px; color: #fff; background: var(--brand); border-radius: 10px; font-weight: 800; text-decoration: none; }
.mv-skip:focus { top: 12px; }
.mv a:focus-visible, .mv summary:focus-visible { outline: 3px solid #8D5BD8; outline-offset: 3px; border-radius: 12px; }

/* Topo */
.mv-top { position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,.6); border-bottom: 1px solid transparent; backdrop-filter: saturate(1.4) blur(16px); transition: background-color var(--t-base) var(--ease), border-color var(--t-base) var(--ease), box-shadow var(--t-base) var(--ease); }
.mv-top.rolou { background: rgba(255,255,255,.88); border-color: var(--line); box-shadow: 0 10px 30px -24px rgba(30,20,70,.4); }
.mv-top-inner { height: 76px; display: flex; align-items: center; gap: 28px; }
.mv-top-logo { display: inline-flex; flex: none; }
.mv-nav { display: flex; gap: 4px; margin: 0 auto; }
.mv-nav a { padding: 10px 16px; color: var(--muted); border-radius: 12px; font-size: var(--fs-md); font-weight: 700; text-decoration: none; transition: color var(--t-base) var(--ease), background-color var(--t-base) var(--ease); }
.mv-nav a:hover { color: var(--ink); background: rgba(91,46,188,.07); }
.mv-top-actions { display: flex; align-items: center; gap: 8px; flex: none; }
.mv-top-login { display: inline-flex; align-items: center; min-height: 46px; padding: 0 16px; color: var(--ink); border-radius: 12px; font-size: var(--fs-md); font-weight: 800; text-decoration: none; }
.mv-top-login:hover { background: rgba(91,46,188,.07); }

/* Aurora */
.mv-aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.mv-aurora i { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .55; }
.mv-aurora i:nth-child(1) { width: 560px; height: 420px; top: -160px; right: -60px; background: #C9A8FF; }
.mv-aurora i:nth-child(2) { width: 460px; height: 360px; top: 120px; right: 300px; background: #A9CCFF; opacity: .45; }
.mv-aurora i:nth-child(3) { width: 420px; height: 320px; bottom: -180px; left: -120px; background: #E6B8FF; opacity: .4; }
.mv-aurora--soft i { opacity: .35; }

/* Botões */
.mv-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 0 26px; border-radius: 16px; font-size: var(--fs-lg); font-weight: 800; letter-spacing: -.01em; text-decoration: none; cursor: pointer; transition: transform var(--t-fast) var(--ease), box-shadow var(--t-base) var(--ease), background-color var(--t-base) var(--ease), border-color var(--t-base) var(--ease); }
.mv-btn:active { transform: scale(.98); }
.mv-btn--primary { color: #fff; background: var(--grad-d); border: 0; box-shadow: 0 14px 30px -14px rgba(106, 59, 191, .85), inset 0 1px 0 rgba(255,255,255,.25); }
.mv-btn--primary:hover { box-shadow: 0 18px 38px -14px rgba(106, 59, 191, .95), inset 0 1px 0 rgba(255,255,255,.25); transform: translateY(-1px); }
.mv-btn--ghost { color: var(--ink); background: #fff; border: 1.5px solid var(--line); }
.mv-btn--ghost:hover { border-color: #CFC6E6; background: #FCFBFF; }
.mv-btn--sm { min-height: 46px; padding: 0 20px; border-radius: 13px; font-size: var(--fs-md); }
.mv-btn--lg { min-height: 62px; padding: 0 32px; font-size: var(--fs-xl); }

/* Hero */
.mv-hero { position: relative; overflow: hidden; margin-top: -76px; padding-top: 76px; background: linear-gradient(180deg, #fff, #FBFAFF 70%, var(--bg)); }
.mv-hero::before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(rgba(20,22,29,.05) 1px, transparent 1px); background-size: 24px 24px; mask-image: linear-gradient(180deg, #000, transparent 70%); }
.mv-hero-grid { position: relative; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: 40px; align-items: center; padding-top: 64px; padding-bottom: 36px; }
.mv-kicker { display: inline-flex; align-items: center; gap: 10px; padding: 6px 18px 6px 8px; color: var(--brand-ink); background: rgba(255,255,255,.8); border: 1px solid var(--brand-border); border-radius: 99px; font-size: var(--fs-md); font-weight: 700; box-shadow: 0 4px 14px -8px rgba(91,46,188,.35); }
.mv-hero h1 { margin: 26px 0 0; font-size: clamp(42px, 5vw, 66px); font-weight: 800; line-height: 1.03; letter-spacing: -.04em; text-wrap: balance; }
.mv-hero h1 em { font-style: normal; color: transparent; background: var(--grad); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.mv-lead { max-width: 540px; margin: 22px 0 0; color: var(--muted); font-size: 19px; line-height: 1.6; }
.mv-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.mv-cta-row--center { justify-content: center; margin-top: 0; }
.mv-proof { display: flex; flex-wrap: wrap; gap: 10px 22px; margin: 26px 0 0; padding: 0; list-style: none; }
.mv-proof li { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: var(--fs-md); font-weight: 600; }
.mv-proof li :deep(svg) { color: #17704A; }

.mv-hero-art { position: relative; height: 500px; display: grid; place-items: center; animation-delay: .1s; }
.mv-orbit { position: absolute; border-radius: 50%; border: 1px solid rgba(141,91,216,.22); }
.mv-orbit--1 { width: 420px; height: 420px; }
.mv-orbit--2 { width: 540px; height: 540px; border-style: dashed; border-color: rgba(77,159,255,.2); animation: mvSpin 80s linear infinite; }
.mv-hero-glow { position: absolute; width: 330px; height: 330px; border-radius: 50%; background: radial-gradient(circle, rgba(180,77,255,.35), rgba(77,159,255,.15) 55%, transparent 70%); filter: blur(10px); }
.mv-hero-bot { position: relative; z-index: 1; filter: drop-shadow(0 34px 40px rgba(46, 24, 110, .28)); animation: mvBob 6s ease-in-out infinite; }
.mv-float { position: absolute; z-index: 2; display: flex; align-items: center; gap: 12px; padding: 12px 16px 12px 12px; background: rgba(255,255,255,.88); border: 1px solid rgba(255,255,255,.9); border-radius: 18px; box-shadow: 0 24px 50px -24px rgba(30, 20, 70, .45), 0 0 0 1px rgba(91,46,188,.06); backdrop-filter: blur(12px); animation: mvBob 7s ease-in-out infinite; }
.mv-float b { display: block; font-size: var(--fs-sm); font-weight: 800; }
.mv-float small { display: block; margin-top: 2px; color: var(--faint); font-size: var(--fs-xs); font-weight: 600; }
.mv-float-ic { width: 40px; height: 40px; display: grid; place-items: center; flex: none; color: #fff; background: var(--grad-d); border-radius: 12px; }
.mv-float-ic--pod { background: linear-gradient(135deg, #8D5BD8, #D04DFF); }
.mv-float-ic--map { background: linear-gradient(135deg, #4D9FFF, #8D5BD8); }
.mv-float--cite { top: 64px; left: -6px; animation-delay: -1s; }
.mv-float--map { right: -10px; top: 210px; animation-delay: -3s; }
.mv-float--pod { bottom: 54px; left: 24px; animation-delay: -5s; }
.mv-wave { height: 18px; display: flex; align-items: center; gap: 3px; margin-top: 5px; }
.mv-wave i { width: 3px; background: var(--grad); border-radius: 2px; animation: mvWave 1.2s ease-in-out infinite; }
.mv-wave i:nth-child(2n) { animation-delay: -.3s; } .mv-wave i:nth-child(3n) { animation-delay: -.6s; }

.mv-facts { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin: 0 0 64px; padding: 10px; list-style: none; background: rgba(255,255,255,.92); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 30px 60px -40px rgba(30, 20, 70, .45); animation-delay: .18s; }
.mv-facts li { display: flex; align-items: center; gap: 14px; min-width: 0; padding: 14px 16px; border-radius: 16px; }
.mv-facts li + li { box-shadow: -1px 0 0 var(--line-soft); }
.mv-fact-ic { width: 46px; height: 46px; display: grid; place-items: center; flex: none; color: var(--brand); background: var(--brand-soft); border-radius: 14px; }
.mv-facts b { display: block; font-size: var(--fs-md); font-weight: 800; letter-spacing: -.01em; }
.mv-facts small { display: block; margin-top: 2px; color: var(--muted); font-size: var(--fs-sm); }

/* Cabeçalhos */
.mv-head { max-width: 640px; margin-bottom: 40px; }
.mv-head--center { margin-right: auto; margin-left: auto; text-align: center; }
.mv-eyebrow { display: inline-block; color: var(--brand); font-size: var(--fs-sm); font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
.mv-eyebrow--dark { color: #C7A8FF; }
.mv-head h2 { margin: 12px 0 0; font-size: clamp(32px, 3.6vw, 46px); font-weight: 800; line-height: 1.08; letter-spacing: -.035em; text-wrap: balance; }
.mv-head p { margin: 14px 0 0; color: var(--muted); font-size: var(--fs-lg); line-height: 1.6; }

/* Método */
.mv-pillars { padding: 88px 0 96px; background: #fff; border-top: 1px solid var(--line); }
.mv-pillars h2 { display: inline-flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 22px; }
.mv-pillars h2 i { width: 12px; height: 12px; border-radius: 50%; background: var(--grad-d); box-shadow: 0 0 0 5px #F1EAFE; }
.mv-pillar-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.mv-pillar { position: relative; overflow: hidden; padding: 0 30px 32px; background: linear-gradient(180deg, #F7F3FF, #fff 58%); border: 1px solid var(--line); border-radius: 28px; transition: transform .35s var(--ease-o), box-shadow .35s var(--ease-o); }
.mv-pillar:hover { transform: translateY(-6px); box-shadow: 0 36px 60px -36px rgba(46, 24, 110, .45); }
.mv-pillar-art { height: 230px; display: grid; place-items: end center; margin: 0 -30px 6px; background: radial-gradient(240px 160px at 50% 85%, rgba(180,77,255,.18), transparent 70%); }
.mv-pillar-art :deep(img) { width: auto !important; height: 210px; max-width: 100%; filter: drop-shadow(0 22px 22px rgba(46, 24, 110, .2)); transition: transform .5s var(--ease-o); }
.mv-pillar-art :deep(.persona--think) { height: 184px; }
.mv-pillar:hover .mv-pillar-art :deep(img) { transform: translateY(-6px) scale(1.03); }
.mv-pillar-n { color: var(--brand); font-size: var(--fs-sm); font-weight: 600; letter-spacing: .08em; }
.mv-pillar h3 { margin: 6px 0 0; font-size: 28px; font-weight: 800; letter-spacing: -.03em; }
.mv-pillar p { margin: 10px 0 0; color: var(--muted); font-size: var(--fs-md); line-height: 1.6; }

/* Confiança */
.mv-trust { position: relative; overflow: hidden; color: #ECEAF6; background: radial-gradient(800px 420px at 85% 10%, rgba(141,91,216,.28), transparent 65%), radial-gradient(600px 400px at 0% 100%, rgba(77,159,255,.16), transparent 65%), var(--navy); }
.mv-trust::before { content: ''; position: absolute; top: 0; right: 0; left: 0; height: 3px; background: var(--grad); }
.mv-trust-grid { display: grid; grid-template-columns: minmax(0, 1fr) 460px; gap: 64px; align-items: center; padding-top: 96px; padding-bottom: 96px; }
.mv-trust h2 { margin: 14px 0 0; font-size: clamp(32px, 3.6vw, 46px); font-weight: 800; line-height: 1.1; letter-spacing: -.035em; text-wrap: balance; }
.mv-trust h2 span { color: transparent; background: linear-gradient(90deg, #8FC2FF, #C7A8FF 50%, #E3A8FF); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.mv-trust-copy > p { max-width: 540px; margin: 18px 0 0; color: #B9BCD0; font-size: var(--fs-lg); line-height: 1.6; }
.mv-trust ul { display: flex; flex-direction: column; gap: 14px; margin: 28px 0 0; padding: 0; list-style: none; }
.mv-trust li { display: flex; align-items: center; gap: 13px; color: #E4E4F0; font-size: var(--fs-md); font-weight: 600; }
.mv-trust li > span { width: 36px; height: 36px; display: grid; place-items: center; flex: none; color: #7FE7B6; background: rgba(127,231,182,.13); border-radius: 11px; }
.mv-frontier { max-width: 540px; margin-top: 34px; padding: 20px 22px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); border-radius: 20px; }
.mv-frontier header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
.mv-frontier header b { font-size: var(--fs-md); font-weight: 800; }
.mv-frontier header span { color: #A3A7BC; font-family: var(--mono); font-size: var(--fs-sm); }
.mv-topic { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid rgba(255,255,255,.07); }
.mv-topic:first-of-type { border-top: 0; }
.mv-topic-icon { width: 28px; height: 28px; display: grid; place-items: center; flex: none; border-radius: 8px; }
.mv-topic.seen .mv-topic-icon { color: #fff; background: var(--grad-d); }
.mv-topic.locked .mv-topic-icon { color: #9DA1B5; background: rgba(255,255,255,.06); }
.mv-topic-name { min-width: 0; overflow: hidden; font-size: var(--fs-md); font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.mv-topic.locked .mv-topic-name { color: #9DA1B5; }
.mv-topic-status { margin-left: auto; font-size: var(--fs-sm); font-weight: 700; white-space: nowrap; }
.mv-topic.seen .mv-topic-status { color: #7FE7B6; }
.mv-topic.locked .mv-topic-status { color: #9DA1B5; }
.mv-demo { position: relative; }
.mv-demo::before { content: ''; position: absolute; inset: 40px -30px -30px; z-index: 0; border-radius: 40px; background: radial-gradient(closest-side, rgba(141,91,216,.45), transparent); filter: blur(30px); }
.mv-demo > * { position: relative; z-index: 1; }
.mv-demo-tag { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.mv-demo-tag span { display: inline-flex; align-items: center; gap: 8px; color: #fff; font-size: var(--fs-sm); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.mv-demo-tag span i { width: 9px; height: 9px; border-radius: 50%; background: #7FE7B6; box-shadow: 0 0 0 4px rgba(127,231,182,.18); animation: mvPulse 2s ease-in-out infinite; }
.mv-demo-tag small { color: #A3A7BC; font-size: var(--fs-sm); }
.mv-demo :deep(.mentor-chat) { border-radius: 22px; box-shadow: 0 40px 80px -30px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08); }

/* Ferramentas */
.mv-tools { padding: 96px 0; }
.mv-bento { display: grid; grid-template-columns: 1.15fr 1fr 1fr; grid-template-rows: auto auto; gap: 20px; }
.mv-tile { position: relative; overflow: hidden; display: flex; flex-direction: column; min-width: 0; padding: 30px; background: #fff; border: 1px solid var(--line); border-radius: 28px; transition: transform .35s var(--ease-o), box-shadow .35s var(--ease-o); }
.mv-tile:hover { transform: translateY(-4px); box-shadow: 0 36px 60px -38px rgba(46, 24, 110, .5); }
.mv-tile h3 { margin: 18px 0 0; font-size: 24px; font-weight: 800; letter-spacing: -.025em; }
.mv-tile p { margin: 8px 0 0; color: var(--muted); font-size: var(--fs-md); line-height: 1.55; }
.mv-tile-ic { width: 50px; height: 50px; display: grid; place-items: center; flex: none; color: #fff; background: var(--grad-d); border-radius: 15px; box-shadow: 0 10px 22px -12px rgba(106,59,191,.9); }
.mv-cost { align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; margin-top: 18px; padding: 7px 12px; color: var(--brand-ink); background: var(--brand-soft); border: 1px solid var(--brand-border); border-radius: 10px; font-size: var(--fs-sm); font-weight: 800; }
.mv-cost::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--grad-d); }
.mv-tile--chat { grid-row: span 2; padding-bottom: 0; color: #fff; background: radial-gradient(420px 300px at 80% 100%, rgba(180,77,255,.5), transparent 70%), linear-gradient(160deg, #241B4D, var(--navy)); border-color: transparent; }
.mv-tile--chat p { color: #C5C6DA; }
.mv-tile--chat .mv-tile-ic { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
.mv-tile--chat .mv-cost { color: #fff; background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.16); }
.mv-tile-chatmock { display: flex; flex-direction: column; gap: 10px; margin-top: 26px; }
.mv-bubble { max-width: 88%; padding: 12px 15px; border-radius: 16px; font-size: var(--fs-sm); line-height: 1.5; }
.mv-bubble--me { align-self: flex-end; color: #fff; background: var(--grad-d); border-bottom-right-radius: 6px; }
.mv-bubble--bot { align-self: flex-start; color: #ECEAF6; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.1); border-bottom-left-radius: 6px; }
.mv-bubble em { display: inline-flex; align-items: center; gap: 5px; margin-top: 8px; padding: 3px 9px; color: #E3D3FF; background: rgba(180,77,255,.22); border-radius: 7px; font-size: var(--fs-xs); font-style: normal; font-weight: 700; }
.mv-tile-bot { align-self: center; margin-top: auto; padding-top: 16px; filter: drop-shadow(0 20px 30px rgba(0,0,0,.4)); }
.mv-tile--map { grid-column: span 2; flex-direction: row; align-items: center; gap: 20px; background: linear-gradient(120deg, #fff 40%, #F2EBFF); }
.mv-tile--map .mv-tile-copy { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.mv-tile--map .mv-tile-img { width: 240px; height: 240px; flex: none; margin: -20px -14px -30px 0; object-fit: contain; transition: transform .5s var(--ease-o); }
.mv-tile--map:hover .mv-tile-img { transform: rotate(-3deg) scale(1.04); }
.mv-lines { display: flex; flex-direction: column; gap: 8px; margin-top: 18px; margin-bottom: 18px; padding: 14px; background: var(--bg); border-radius: 14px; }
.mv-lines i { height: 8px; border-radius: 99px; background: linear-gradient(90deg, #D9CCF5, #EEE8FA); }
.mv-lines i:nth-child(1) { width: 92%; } .mv-lines i:nth-child(2) { width: 74%; } .mv-lines i:nth-child(3) { width: 84%; }
.mv-tile--resumo .mv-cost, .mv-tile--pod .mv-cost { margin-top: auto; }
.mv-tile--pod { padding-right: 112px; background: radial-gradient(260px 220px at 100% 100%, rgba(180,77,255,.16), transparent 70%), #fff; }
.mv-tile--pod p { margin-bottom: 18px; }
.mv-tile--pod .mv-tile-img { position: absolute; right: -14px; bottom: -12px; width: 128px; height: 160px; object-fit: contain; transition: transform .5s var(--ease-o); }
.mv-tile--pod:hover .mv-tile-img { transform: translateY(-6px) rotate(3deg); }

/* Planos */
.mv-plans { padding: 96px 0; background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.mv-plan-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.mv-plan { position: relative; display: flex; flex-direction: column; min-width: 0; padding: 34px 30px 30px; background: #fff; border: 1px solid var(--line); border-radius: 28px; transition: transform .35s var(--ease-o), box-shadow .35s var(--ease-o); }
.mv-plan::before { content: ''; position: absolute; top: -1px; right: 30px; left: 30px; height: 4px; border-radius: 0 0 6px 6px; background: var(--plan-color); }
.mv-plan:hover { transform: translateY(-4px); box-shadow: 0 36px 60px -40px rgba(46, 24, 110, .5); }
.mv-plan.featured { background: linear-gradient(#fff, #fff) padding-box, var(--grad) border-box; border: 2px solid transparent; box-shadow: 0 40px 70px -40px rgba(106, 59, 191, .6); }
.mv-plan-flag { position: absolute; top: -15px; left: 50%; display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; color: #fff; background: var(--grad-d); border-radius: 99px; font-size: var(--fs-sm); font-weight: 800; white-space: nowrap; transform: translateX(-50%); box-shadow: 0 10px 20px -10px rgba(106,59,191,.9); }
.mv-plan-tier { color: var(--plan-ink); font-size: var(--fs-xs); font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.mv-plan h3 { margin: 8px 0 0; font-size: 28px; font-weight: 800; letter-spacing: -.03em; }
.mv-plan-purpose { min-height: 46px; margin: 8px 0 0; color: var(--muted); font-size: var(--fs-md); line-height: 1.5; }
.mv-plan-price { display: flex; align-items: baseline; gap: 6px; margin: 12px 0 0; }
.mv-plan-price b { font-size: 38px; font-weight: 800; letter-spacing: -.04em; }
.mv-plan-price small { color: var(--faint); font-size: var(--fs-md); font-weight: 700; }
.mv-plan-meter { margin-top: 22px; padding: 16px 18px; background: var(--bg); border-radius: 16px; }
.mv-plan-meter > strong { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; color: var(--plan-ink); font-size: 30px; font-weight: 600; letter-spacing: -.03em; line-height: 1; }
.mv-plan-meter > strong small { color: var(--muted); font-family: 'Manrope', sans-serif; font-size: var(--fs-sm); font-weight: 700; letter-spacing: 0; }
.mv-plan-meter > div { position: relative; height: 8px; overflow: hidden; margin-top: 14px; background: var(--line); border-radius: 99px; }
.mv-plan-meter > div i { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, #4D9FFF, var(--plan-color)); border-radius: 99px; }
.mv-plan-features { display: flex; flex: 1; flex-direction: column; gap: 13px; margin: 24px 0 0; padding: 0; list-style: none; }
.mv-plan-features li { display: flex; align-items: flex-start; gap: 11px; font-size: var(--fs-md); font-weight: 500; line-height: 1.45; }
.mv-plan-features li > span { width: 22px; height: 22px; display: grid; place-items: center; flex: none; margin-top: 1px; color: var(--plan-ink); background: color-mix(in srgb, var(--plan-color) 14%, #fff); border-radius: 7px; }
.mv-plan-features .mv-plan-features-label { color: var(--faint); font-size: var(--fs-xs); font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.mv-plan-includes { display: flex; align-items: center; gap: 9px; margin: 20px 0 0; padding-top: 16px; color: var(--muted); border-top: 1px dashed var(--line); font-size: var(--fs-sm); }
.mv-plan-includes b { color: var(--ink); }
.mv-plan-btn { width: 100%; margin-top: 22px; font-size: var(--fs-md); }
.mv-plan-note { display: flex; align-items: center; justify-content: center; gap: 9px; margin: 28px 0 0; color: var(--faint); font-size: var(--fs-md); text-align: center; }

/* Dúvidas */
.mv-faq { padding: 96px 0; }
.mv-faq-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 56px; align-items: start; }
.mv-faq-grid .mv-head { position: sticky; top: 110px; margin-bottom: 0; }
.mv-faq-bot { display: block; margin-top: 22px; filter: drop-shadow(0 20px 24px rgba(46, 24, 110, .2)); }
.mv-faq-list { display: flex; flex-direction: column; gap: 12px; }
.mv-faq details { background: #fff; border: 1px solid var(--line); border-radius: 20px; transition: box-shadow var(--t-base) var(--ease), border-color var(--t-base) var(--ease); }
.mv-faq details[open] { border-color: var(--brand-border); box-shadow: 0 24px 50px -36px rgba(46, 24, 110, .5); }
.mv-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 68px; padding: 18px 24px; border-radius: 20px; font-size: var(--fs-lg); font-weight: 800; letter-spacing: -.01em; cursor: pointer; list-style: none; }
.mv-faq summary::-webkit-details-marker { display: none; }
.mv-faq-plus { position: relative; width: 34px; height: 34px; flex: none; border-radius: 50%; background: var(--brand-soft); transition: transform var(--t-slow) var(--ease-o), background-color var(--t-base) var(--ease); }
.mv-faq-plus::before, .mv-faq-plus::after { content: ''; position: absolute; top: 50%; left: 50%; width: 14px; height: 2.5px; border-radius: 2px; background: var(--brand); transform: translate(-50%, -50%); }
.mv-faq-plus::after { transform: translate(-50%, -50%) rotate(90deg); }
.mv-faq details[open] .mv-faq-plus { transform: rotate(45deg); background: #E8DDFB; }
.mv-faq details p { margin: 0; padding: 0 24px 22px; color: var(--muted); font-size: var(--fs-md); line-height: 1.65; }

/* Fechamento */
.mv-final { position: relative; overflow: hidden; padding: 96px 0 104px; background: linear-gradient(180deg, var(--bg), #fff); border-top: 1px solid var(--line); }
.mv-final-inner { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
.mv-final-logo { max-width: 100%; }
.mv-final h2 { margin: 30px 0 28px; font-size: clamp(28px, 3vw, 38px); font-weight: 800; letter-spacing: -.03em; text-wrap: balance; }

/* Rodapé */
.mv-footer { padding: 30px 0; background: #fff; border-top: 1px solid var(--line); }
.mv-footer-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 28px; }
.mv-footer-brand { display: inline-flex; align-items: center; gap: 10px; }
.mv-footer-brand b { display: block; font-size: var(--fs-md); font-weight: 800; }
.mv-footer-brand small { display: block; color: var(--faint); font-size: var(--fs-xs); font-weight: 600; letter-spacing: .04em; }
.mv-footer-by { display: inline-flex; align-items: center; gap: 12px; color: var(--muted); font-size: var(--fs-sm); font-weight: 600; }
.mv-footer-by img { height: 36px; width: auto; }
.mv-footer-inner > small { color: var(--faint); font-size: var(--fs-sm); }

@keyframes mvRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes mvBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes mvSpin { to { transform: rotate(360deg); } }
@keyframes mvWave { 0%, 100% { transform: scaleY(.55); } 50% { transform: scaleY(1); } }
@keyframes mvPulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(127,231,182,.18); } 50% { box-shadow: 0 0 0 8px rgba(127,231,182,.05); } }

@media (max-width: 1100px) {
  .mv-w { padding-right: 36px; padding-left: 36px; }
  .mv-nav { display: none; }
  .mv-top-actions { margin-left: auto; }
  .mv-trust-grid { grid-template-columns: minmax(0, 1fr) 400px; gap: 40px; }
  .mv-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mv-facts li:nth-child(3) { box-shadow: none; }
  .mv-bento { grid-template-columns: 1fr 1fr; }
  .mv-tile--chat { grid-row: auto; grid-column: span 2; padding-bottom: 30px; }
  .mv-tile-bot { position: absolute; right: 10px; bottom: 0; }
  .mv-tile--chat .mv-tile-copy, .mv-tile-chatmock { max-width: 58%; }
}
@media (max-width: 900px) {
  .mv-hero-grid, .mv-trust-grid, .mv-faq-grid { grid-template-columns: 1fr; }
  .mv-hero-grid { padding-top: 44px; gap: 8px; }
  .mv-hero-art { height: 440px; }
  .mv-pillar-grid, .mv-plan-grid { grid-template-columns: 1fr; }
  .mv-plan-grid { gap: 30px; max-width: 520px; margin: 0 auto; }
  .mv-pillar { display: grid; grid-template-columns: 150px 1fr; column-gap: 20px; align-items: center; padding: 20px 24px 20px 0; }
  .mv-pillar-art { grid-row: span 3; height: 170px; margin: 0; }
  .mv-pillar-art :deep(img), .mv-pillar-art :deep(.persona--think) { height: 150px; }
  .mv-faq-grid .mv-head { position: static; }
  .mv-faq-bot { display: none; }
  .mv-demo { max-width: 560px; }
}
@media (max-width: 640px) {
  .mv-w { padding-right: 16px; padding-left: 16px; }
  .mv-top-inner { height: 66px; gap: 10px; }
  .mv-hero { margin-top: -66px; padding-top: 66px; }
  .mv-top-logo :deep(img) { width: 92px !important; }
  .mv-top-login { padding: 0 10px; }
  .mv-btn--sm { padding: 0 16px; }
  .mv-hero h1 { font-size: 38px; }
  .mv-lead { font-size: var(--fs-lg); }
  .mv-cta-row .mv-btn { width: 100%; }
  .mv-hero-art { height: 360px; }
  .mv-hero-bot { width: 260px !important; }
  .mv-orbit--1 { width: 300px; height: 300px; }
  .mv-orbit--2 { width: 380px; height: 380px; }
  .mv-float { padding: 9px 12px 9px 9px; border-radius: 14px; }
  .mv-float--cite { top: 18px; left: 0; }
  .mv-float--map { top: 150px; right: 0; }
  .mv-float--pod { bottom: 20px; left: 0; }
  .mv-facts { grid-template-columns: 1fr; margin-bottom: 44px; }
  .mv-facts li + li { box-shadow: 0 -1px 0 var(--line-soft); }
  .mv-pillars, .mv-tools, .mv-plans, .mv-faq { padding: 64px 0; }
  .mv-trust-grid { padding-top: 64px; padding-bottom: 64px; }
  .mv-pillars h2 { display: flex; flex-direction: column; gap: 4px; }
  .mv-pillars h2 i { width: 9px; height: 9px; box-shadow: 0 0 0 4px #F1EAFE; }
  .mv-pillar { grid-template-columns: 110px 1fr; padding-right: 18px; }
  .mv-pillar-art { height: 130px; }
  .mv-pillar-art :deep(img), .mv-pillar-art :deep(.persona--think) { height: 112px; }
  .mv-pillar h3 { font-size: 24px; }
  .mv-bento { grid-template-columns: 1fr; }
  .mv-tile--chat, .mv-tile--map { grid-column: auto; }
  .mv-tile--chat .mv-tile-copy, .mv-tile-chatmock { max-width: none; }
  .mv-tile-bot { position: static; width: 170px !important; margin-bottom: -30px; }
  .mv-tile--map { flex-direction: column; align-items: stretch; }
  .mv-tile--map .mv-tile-img { align-self: center; width: 200px; height: 200px; margin: 0 0 -26px; }
  .mv-tile--pod { padding-right: 30px; padding-bottom: 150px; }
  .mv-topic-status { display: none; }
  .mv :deep(.mentor-chat) { height: 500px !important; }
  .mv-final-logo { width: 280px !important; }
  .mv-footer-inner { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .mv-rise, .mv-hero-bot, .mv-float, .mv-orbit--2, .mv-wave i, .mv-demo-tag span i { animation: none; }
  .mv-pillar, .mv-tile, .mv-plan, .mv-faq-plus { transition-duration: 1ms; }
}
</style>
