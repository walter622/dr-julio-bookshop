import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lock, MonitorSmartphone, Zap, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ebookImg from "@/assets/ebook-tablet.jpg";
import retrato from "@/assets/dr-julio-peres-retrato.webp.asset.json";
import quadrado from "@/assets/dr-julio-peres-quadrado.jpeg.asset.json";

/** Troque aqui o link do checkout da Hotmart */
const HOTMART_URL = "https://pay.hotmart.com/SEU-LINK-AQUI";
/** Cole aqui o link de incorporação do vídeo (ex.: https://www.youtube.com/embed/ID ou https://player.vimeo.com/video/ID) */
const VIDEO_EMBED_URL = "";

const DESC =
  "Mude a forma como você interpreta sua história e comece a viver com mais clareza, equilíbrio emocional e direção. E-book do Dr. Julio Peres.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Razão & Prática | E-book do Dr. Julio Peres" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Razão & Prática | E-book do Dr. Julio Peres" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORDS = [
  ["Coragem", "Para olhar para o medo sem permitir que ele decida sozinho os rumos da sua vida."],
  ["Perdão", "Para refletir sobre dores antigas, culpa, liberdade interior e elaboração."],
  ["Gratidão", "Para ampliar a percepção da vida sem negar aquilo que foi difícil."],
  ["Flexibilidade", "Para perceber onde a rigidez pode estar limitando sua forma de viver."],
  ["Equilíbrio", "Para compreender melhor seus limites, suas escolhas e a distribuição da sua energia."],
  ["Propósito", "Para refletir sobre a direção que tem orientado suas decisões."],
  ["Resiliência", "Para olhar para experiências difíceis sem deixar que elas sejam a definição inteira da sua história."],
];

const DIFF = [
  ["Coragem", "pode mudar a relação com o medo."],
  ["Perdão", "pode mudar a forma de carregar uma dor."],
  ["Gratidão", "pode ampliar a percepção de vida."],
  ["Flexibilidade", "pode revelar onde existe rigidez."],
  ["Propósito", "pode devolver direção."],
  ["Resiliência", "pode ajudar a reorganizar a história sem reduzi-la ao sofrimento."],
];

const FAQ = [
  ["O e-book é digital?", "Sim. Você receberá acesso ao e-book em formato digital pela Hotmart."],
  ["O livro é para quem está fazendo terapia?", "Ele pode ser lido por qualquer pessoa interessada em psicologia, linguagem, virtudes, sentido e amadurecimento humano. Mas ele não substitui um processo terapêutico."],
  ["O livro substitui psicoterapia?", "Não. O e-book é uma obra de reflexão e educação. Ele não substitui acompanhamento psicológico, médico ou qualquer tratamento profissional."],
  ["Vou receber acesso imediato?", "Sim. Após a confirmação do pagamento, o acesso é liberado pela Hotmart."],
  ["Posso ler pelo celular?", "Sim. Você pode acessar o conteúdo pelo celular, tablet ou computador."],
  ["O conteúdo é muito técnico?", "Não. O livro tem profundidade, mas conversa com experiências humanas reais, como medo, culpa, dor, escolhas, vínculos, gratidão, perdão, coragem e sentido."],
];

function Cta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={HOTMART_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-14 items-center justify-center rounded-[15px] bg-cta px-8 py-4 text-center font-display text-base font-semibold text-cta-foreground shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-lg ${className}`}
    >
      {children}
    </a>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-cta" : "text-accent"}`}>
      {children}
    </p>
  );
}

function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2 className={`text-balance text-2xl font-semibold md:text-[2.1rem] ${light ? "text-primary-foreground" : ""}`}>
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-8 space-y-4">
      {items.map((t) => (
        <li key={t} className="flex gap-4">
          <span className="mt-[0.85em] h-[2px] w-5 shrink-0 bg-accent" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-display text-lg font-semibold ${light ? "text-primary-foreground" : "text-primary"}`}>
        Dr. Julio Peres
      </span>
      <span className={`mt-1 text-[0.68rem] uppercase tracking-[0.22em] ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        Psicologia clínica
      </span>
    </span>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const h = heroRef.current;
      setPastHero(!!h && h.getBoundingClientRect().bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-background transition-shadow duration-300 ${scrolled ? "shadow-soft" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
          <Logo />
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-[15px] bg-cta px-5 py-2.5 font-display text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover sm:inline-flex"
          >
            Quero acessar o e-book
          </a>
        </div>
      </header>

      <main>
        {/* BLOCO 1 — HERO */}
        <section ref={heroRef} className="bg-secondary pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <Eyebrow>E-book • Dr. Julio Peres</Eyebrow>
              <h1 className="text-balance text-[1.9rem] font-bold md:text-[2.7rem]">
                Mude a forma como você interpreta sua história e comece a viver com mais clareza, equilíbrio emocional e direção
              </h1>
              <span className="rule-orange my-7" />
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg font-semibold text-foreground">
                  Muitas pessoas sofrem não apenas pelo que aconteceu, mas pelo significado que passaram a carregar depois da dor.
                </p>
                <p>
                  O Razão & Prática ajuda você a olhar para palavras essenciais da vida humana e perceber como elas podem influenciar suas escolhas, relações, culpas, medos e decisões.
                </p>
                <p>
                  Um livro para quem deseja parar de viver apenas reagindo ao passado e começar a construir uma vida com mais consciência, maturidade e sentido.
                </p>
              </div>
              <div className="mt-9">
                <Cta className="w-full sm:w-auto">Quero acessar o e-book agora</Cta>
                <p className="mt-4 text-sm text-muted-foreground">
                  E-book digital em PDF • Acesso pela Hotmart • Valor: R$ 79,00
                </p>
              </div>
            </Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-6 rounded-full bg-cta/20 blur-3xl" aria-hidden />
              <img
                src={ebookImg}
                alt="E-book Razão & Prática, de Dr. Julio Peres, exibido em um tablet"
                className="animate-float relative w-full mix-blend-multiply"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </section>

        {/* BLOCO 2 — VÍDEO */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5">
            <Reveal className="text-center">
              <Eyebrow>Assista antes de continuar</Eyebrow>
              <H2>Por que algumas pessoas continuam sofrendo por histórias que já aconteceram há muito tempo?</H2>
            </Reveal>
            <Reveal className="mt-10">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-primary shadow-book">
                {VIDEO_EMBED_URL ? (
                  <iframe
                    src={VIDEO_EMBED_URL}
                    title="Vídeo de apresentação do e-book Razão & Prática"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={quadrado.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary-foreground">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cta shadow-cta">
                        <Play className="ml-1 h-7 w-7 fill-current" />
                      </span>
                      <span className="text-sm opacity-80">Vídeo em breve</span>
                    </div>
                  </>
                )}
              </div>
            </Reveal>
            <Reveal className="mx-auto mt-12 max-w-[720px] space-y-4">
              <p>Às vezes, uma dor não permanece apenas pela lembrança do que aconteceu.</p>
              <p>
                Ela permanece porque aquela experiência passou a influenciar a forma como a pessoa se enxerga, se relaciona, decide, confia, se protege e interpreta a própria vida.
              </p>
              <div className="border-l-2 border-gold py-1 pl-6 font-serif text-2xl italic leading-snug text-primary">
                <p>Uma palavra pode carregar culpa.</p>
                <p>Uma lembrança pode carregar medo.</p>
                <p>Uma experiência pode carregar um significado que continua organizando escolhas anos depois.</p>
              </div>
              <p>
                O Razão & Prática nasce como um convite para olhar melhor para esses significados e começar a construir uma relação mais consciente com a própria história.
              </p>
              <div className="pt-6 text-center">
                <Cta>Quero ler Razão & Prática</Cta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BLOCO 3 — IDENTIFICAÇÃO */}
        <section className="bg-secondary py-20 md:py-28">
          <Reveal className="mx-auto max-w-[720px] px-5">
            <H2>Talvez você esteja reagindo a histórias antigas sem perceber</H2>
            <span className="rule-orange my-7" />
            <p>Algumas pessoas passam anos tentando seguir em frente, mas continuam presas a certos padrões.</p>
            <Bullets
              items={[
                "Escolhem relações parecidas.",
                "Carregam culpas antigas.",
                "Sentem dificuldade de confiar.",
                "Têm medo de tomar decisões importantes.",
                "Se cobram para serem fortes o tempo todo.",
                "Interpretam mudanças como ameaça.",
                "Sentem que precisam controlar tudo para não sofrer de novo.",
              ]}
            />
            <div className="space-y-4">
              <p>Muitas vezes, o problema não está apenas na situação atual.</p>
              <p className="font-semibold text-primary">
                Está no significado que experiências antigas passaram a ocupar dentro da pessoa.
              </p>
              <p>E quando esse significado não é percebido, ele continua influenciando a vida silenciosamente.</p>
            </div>
          </Reveal>
        </section>

        {/* BLOCO 4 — NOVA EXPLICAÇÃO */}
        <section className="bg-primary py-20 text-primary-foreground/85 md:py-28">
          <Reveal className="mx-auto max-w-[720px] space-y-4 px-5">
            <H2 light>O que aconteceu importa. Mas o significado que ficou também importa muito.</H2>
            <span className="rule-orange my-7" />
            <p>Duas pessoas podem viver experiências difíceis e carregar marcas completamente diferentes.</p>
            <ul className="space-y-2 border-l border-gold/60 pl-6 text-primary-foreground">
              <li>Uma pode transformar uma dor em culpa.</li>
              <li>Outra pode transformar uma perda em medo de se vincular novamente.</li>
              <li>Outra pode passar a acreditar que precisa dar conta de tudo sozinha.</li>
            </ul>
            <p>O acontecimento deixa uma marca.</p>
            <p className="text-primary-foreground">
              Mas o significado construído a partir dele pode continuar interferindo na vida por muito tempo.
            </p>
            <p>
              O Razão & Prática ajuda o leitor a olhar para palavras fundamentais da existência e perceber como elas participam da forma como cada pessoa atravessa perdas, vínculos, escolhas, medos, culpas e reconstruções.
            </p>
          </Reveal>
        </section>

        {/* BLOCO 5 — CUSTO INVISÍVEL */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-5">
            <Reveal>
              <H2>Uma vida pode ficar limitada por significados que nunca foram examinados</H2>
              <span className="rule-orange my-7" />
              <p>A pessoa começa a repetir certas frases sobre si mesma:</p>
            </Reveal>
            <div className="my-12 space-y-6 text-center">
              {["eu sou assim.", "eu não consigo mudar.", "eu tenho que ser forte.", "eu não posso errar.", "eu nunca vou superar isso."].map((q) => (
                <Reveal key={q}>
                  <blockquote className="font-serif text-3xl italic leading-tight text-primary md:text-[2.6rem]">
                    <span className="text-gold">“</span>
                    {q}
                    <span className="text-gold">”</span>
                  </blockquote>
                </Reveal>
              ))}
            </div>
            <Reveal className="space-y-4">
              <p>Com o tempo, essas frases deixam de parecer interpretações e começam a funcionar como verdades.</p>
              <p>
                E quando alguém vive a partir de uma verdade que nasceu da dor, pode passar anos tomando decisões para se proteger de uma ameaça que já não pertence ao presente da mesma forma.
              </p>
              <p className="font-semibold text-primary">
                Esse é um dos grandes convites do livro: olhar com mais cuidado para aquilo que você passou a acreditar sobre si, sobre os outros e sobre a vida.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BLOCO 6 — PROPOSTA */}
        <section className="bg-secondary py-20 md:py-28">
          <Reveal className="mx-auto max-w-[720px] space-y-4 px-5">
            <H2>Para viver melhor, às vezes é preciso reinterpretar melhor</H2>
            <span className="rule-orange my-7" />
            <p className="font-semibold text-foreground">O Razão & Prática não é uma coleção de frases bonitas.</p>
            <p>
              É uma reflexão sobre palavras que atravessam a vida humana e influenciam a forma como alguém sente, decide, se relaciona e reconstrói a própria história.
            </p>
            <p>
              Palavras como coragem, perdão, gratidão, flexibilidade, equilíbrio, propósito e resiliência parecem conhecidas.
            </p>
            <p>
              Mas, quando compreendidas com mais profundidade, podem ajudar a pessoa a sair de respostas automáticas e construir atitudes mais conscientes diante da vida.
            </p>
            <div className="mt-8 rounded-2xl bg-background p-8 shadow-soft">
              <p className="mb-3 font-display font-semibold text-accent">A proposta é simples e profunda:</p>
              <p className="font-serif text-2xl italic leading-snug text-primary">
                olhar para a própria história com mais clareza,
                <br />
                compreender os significados que foram carregados ao longo do caminho,
                <br />e começar a transformar reflexão em prática de vida.
              </p>
            </div>
          </Reveal>
        </section>

        {/* BLOCO 7 — O QUE VAI ENCONTRAR */}
        <section className="bg-primary py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="mx-auto max-w-[720px] text-center">
              <Eyebrow light>O que você vai encontrar no e-book</Eyebrow>
              <H2 light>Palavras que ajudam você a olhar para sua vida com mais consciência</H2>
              <p className="mt-6 text-primary-foreground/80">
                Dentro do e-book, Dr. Julio Peres conduz reflexões sobre palavras fundamentais da experiência humana.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WORDS.map(([w, d], i) => (
                <Reveal
                  key={w}
                  className={`rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-7 transition-colors hover:border-gold/50 ${i === 6 ? "lg:col-span-2" : ""}`}
                >
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-gold">0{i + 1}</span>
                  <h3 className="mt-3 font-serif text-[2.1rem] italic text-primary-foreground">{w}</h3>
                  <span className="my-4 block h-px w-10 bg-accent" />
                  <p className="text-base text-primary-foreground/80">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCO 8 — PARA QUEM É */}
        <section className="bg-background py-20 md:py-28">
          <Reveal className="mx-auto max-w-[720px] px-5">
            <H2>Razão & Prática faz sentido para você se:</H2>
            <span className="rule-orange mt-7" />
            <Bullets
              items={[
                "Você sente que algumas experiências ainda influenciam sua forma de viver.",
                "Você deseja compreender melhor suas escolhas, emoções e reações.",
                "Você quer olhar para sua história com mais maturidade.",
                "Você percebe que algumas culpas, medos ou padrões podem estar limitando sua vida.",
                "Você busca mais clareza emocional, equilíbrio e direção.",
                "Você gosta de psicologia, linguagem, virtudes e reflexões profundas sobre a existência.",
                "Você quer uma leitura que ajude a transformar pensamento em prática.",
              ]}
            />
            <Cta className="w-full sm:w-auto">Quero acessar o e-book agora</Cta>
          </Reveal>
        </section>

        {/* BLOCO 9 — PARA QUEM NÃO É */}
        <section className="bg-muted py-20 md:py-24">
          <Reveal className="mx-auto max-w-[720px] px-5 text-muted-foreground">
            <h2 className="text-xl font-semibold md:text-2xl">Este e-book provavelmente não é para você se:</h2>
            <ul className="my-8 space-y-3">
              {[
                "procura promessa de cura rápida;",
                "quer uma fórmula pronta para resolver todos os problemas;",
                "busca motivação superficial;",
                "não tem interesse em olhar para a própria história com honestidade;",
                "espera um conteúdo raso ou meramente técnico;",
                "não está disposto a refletir sobre seus próprios significados, escolhas e padrões.",
              ].map((t) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-sm leading-[1.9] text-muted-foreground/70" aria-hidden>✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-primary">
              Razão & Prática é para quem deseja viver com mais consciência, maturidade e sentido.
            </p>
          </Reveal>
        </section>

        {/* BLOCO 10 — QUEM É */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="relative mx-auto w-full max-w-sm">
              <div className="absolute -bottom-5 -left-5 h-full w-full rounded-2xl bg-primary" aria-hidden />
              <img
                src={retrato.url}
                alt="Retrato do Dr. Julio Peres, psicólogo clínico"
                className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-book"
                loading="lazy"
              />
              <div className="absolute -right-3 top-8 rounded-2xl bg-cta px-5 py-4 text-center text-cta-foreground shadow-cta md:-right-8">
                <p className="font-display text-3xl font-bold leading-none">35</p>
                <p className="mt-1 text-xs font-semibold leading-tight">anos de experiência
                  <br />clínica</p>
              </div>
            </Reveal>
            <Reveal className="space-y-4">
              <Eyebrow>Quem é o autor</Eyebrow>
              <H2>Dr. Julio Peres</H2>
              <span className="rule-orange my-7" />
              <p className="font-semibold text-foreground">
                Dr. Julio Peres é psicólogo clínico, neuropsicólogo, pesquisador e autor.
              </p>
              <p>
                Sua trajetória integra prática clínica, produção científica, neurociências, psicoterapia, resiliência, espiritualidade tratada com discernimento e reflexão sobre a experiência humana.
              </p>
              <p>
                Ao longo de sua carreira, Dr. Julio tem investigado como memória, sofrimento, linguagem, vínculos, virtudes e sentido participam da vida emocional.
              </p>
              <p>
                O Razão & Prática nasce dessa experiência: uma obra para quem deseja olhar para a própria história com mais clareza e transformar reflexão em prática de vida.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BLOCO 11 — DIFERENTE */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="mx-auto max-w-[720px] space-y-4">
              <H2>O Razão & Prática ajuda você a olhar para aquilo que talvez esteja conduzindo sua vida sem perceber</H2>
              <span className="rule-orange my-7" />
              <p>Muitas vezes, a pessoa acredita que está decidindo livremente.</p>
              <p>
                Mas suas decisões podem estar sendo influenciadas por culpas antigas, medos não elaborados, interpretações rígidas ou significados construídos em momentos de dor.
              </p>
              <p>
                O livro conduz o leitor a observar melhor palavras que parecem simples, mas que podem carregar grande peso emocional.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DIFF.map(([w, d]) => (
                <Reveal key={w} className="rounded-2xl bg-secondary p-7">
                  <h3 className="font-serif text-[2rem] italic">{w}</h3>
                  <span className="my-3 block h-px w-10 bg-gold" />
                  <p className="text-muted-foreground">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCO 12 — OFERTA */}
        <section id="oferta" className="bg-primary py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal className="grid items-center gap-10 overflow-hidden rounded-3xl bg-background p-7 shadow-book md:grid-cols-2 md:p-12">
              <div className="relative mx-auto w-full max-w-xs bg-secondary md:max-w-sm rounded-2xl">
                <img
                  src={ebookImg}
                  alt="E-book Razão & Prática em um tablet"
                  className="animate-float w-full mix-blend-multiply"
                  loading="lazy"
                />
              </div>
              <div className="text-center md:text-left">
                <H2>Acesse agora o e‑book Razão & Prática</H2>
                <p className="mt-5 text-muted-foreground">
                  Uma leitura para quem deseja compreender melhor sua história, suas escolhas e os significados que influenciam sua forma de viver.
                </p>
                <p className="mt-4 text-base text-muted-foreground">
                  Ao acessar o e-book, você poderá ler com calma, anotar, voltar aos trechos mais importantes e refletir sobre palavras que atravessam diretamente sua vida emocional.
                </p>
                <div className="my-8 border-y border-border py-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Valor</p>
                  <p className="font-display text-5xl font-bold text-primary md:text-6xl">
                    <span className="mr-1 align-top text-2xl">R$</span>79,00
                  </p>
                </div>
                <Cta className="w-full">Quero acessar o e-book agora</Cta>
                <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground md:justify-start">
                  <li className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-accent" />Compra segura pela Hotmart</li>
                  <li className="flex items-center gap-1.5"><MonitorSmartphone className="h-4 w-4 text-accent" />Acesso digital</li>
                  <li className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-accent" />Liberação imediata após confirmação do pagamento</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BLOCO 13 — FAQ */}
        <section className="bg-secondary py-20 md:py-28">
          <Reveal className="mx-auto max-w-[720px] px-5">
            <div className="text-center">
              <Eyebrow>Dúvidas frequentes</Eyebrow>
              <H2>Perguntas frequentes</H2>
            </div>
            <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-background px-6 shadow-soft">
              {FAQ.map(([q, a], i) => (
                <AccordionItem key={q} value={`f${i}`} className={i === FAQ.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-primary hover:text-accent hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>

        {/* BLOCO 14 — FECHAMENTO */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.3fr_0.7fr]">
            <Reveal className="space-y-4">
              <H2>Sua história não precisa ser conduzida apenas pelos significados que a dor deixou</H2>
              <span className="rule-orange my-7" />
              <div className="font-serif text-2xl italic leading-snug text-primary">
                <p>Algumas experiências marcam.</p>
                <p>Algumas palavras pesam.</p>
                <p>Algumas interpretações acompanham a pessoa por muitos anos.</p>
              </div>
              <p>
                Mas olhar para tudo isso com mais consciência pode abrir novas formas de viver, decidir, se relacionar e seguir.
              </p>
              <p className="font-semibold text-foreground">
                Razão & Prática é uma leitura para quem deseja sair do automático e construir uma vida com mais clareza, equilíbrio emocional e sentido.
              </p>
              <div className="pt-4">
                <Cta className="w-full sm:w-auto">Quero acessar o e-book Razão & Prática</Cta>
              </div>
            </Reveal>
            <Reveal className="relative mx-auto hidden w-full max-w-xs md:block">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-secondary" aria-hidden />
              <img
                src={quadrado.url}
                alt="Dr. Julio Peres"
                className="relative aspect-square w-full rounded-2xl object-cover shadow-soft"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-primary pb-28 pt-14 text-primary-foreground/75 md:pb-14">
        <div className="mx-auto max-w-6xl space-y-4 px-5 text-center">
          <div className="flex justify-center"><Logo light /></div>
          <span className="mx-auto block h-px w-12 bg-gold" />
          <p className="font-display font-semibold text-primary-foreground">Razão & Prática — Dr. Julio Peres</p>
          <p className="text-base">Psicologia, linguagem, virtudes e sentido para uma vida com mais consciência.</p>
          <p className="text-sm text-primary-foreground/55">© 2026 — Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* CTA fixo mobile */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 bg-background/95 p-3 shadow-soft backdrop-blur transition-transform duration-300 md:hidden ${pastHero ? "translate-y-0" : "translate-y-full"}`}
      >
        <Cta className="w-full">Quero acessar o e-book • R$ 79,00</Cta>
      </div>
    </div>
  );
}
