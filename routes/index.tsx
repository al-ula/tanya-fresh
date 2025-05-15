import CardActionLogin, {
  CardLocaleContent,
  CardLocaleMap,
} from "../islands/CardActionLogin.tsx";
import Card from "../components/Card.tsx";
import { PageProps } from "$fresh/server.ts";
import { Language } from "../locale/index.ts";

interface IndexLocaleContent {
  title: string;
  pitch: string[];
  "onboard-title": string;
  "onboard-assert": string;
}

interface LocaleMap {
  [Language.ID]: IndexLocaleContent;
  [Language.EN]: IndexLocaleContent;
}

const indexLocale: LocaleMap = {
  [Language.ID]: {
    "title": "Papan Pesan Rahasia",
    "pitch": [
      "Dapatkan curhatan anonim dari teman-temanmu.",
      "Menjadi orang yang lebih baik tanpa saling menyakiti.",
    ],
    "onboard-title": "Buat papan",
    "onboard-assert": "Sudah punya akun?",
  },
  [Language.EN]: {
    "title": "Anonymous Messages Board",
    "pitch": [
      "Listen to your friends anonymously.",
      "Be a better person without hurting each other.",
    ],
    "onboard-title": "Create board",
    "onboard-assert": "Already have an account?",
  },
};

const cardLocale: CardLocaleMap = {
  [Language.ID]: {
    "name--placeholder": "Masukkan nama Anda...",
    "button-label": "Lanjutkan",
  },
  [Language.EN]: {
    "name--placeholder": "Enter your name...",
    "button-label": "Continue",
  },
};

export default function Home(props: PageProps) {
  // Get language from state, default to 'en' if not set
  const lang: Language = props.state?.lang === Language.ID
    ? Language.ID
    : Language.EN;
  const locale: IndexLocaleContent = indexLocale[lang];
  const card: CardLocaleContent = cardLocale[lang];

  return (
    <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
      <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
        <Card.Body>
          <Card.Title class="justify-center mb-2">
            <h2>{locale.title}</h2>
          </Card.Title>
          <ul class="list-disc list-inside">
            {locale.pitch.map((text: string, index: number) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </Card.Body>
      </Card.Root>
      <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
        <Card.Body>
          <Card.Title class="justify-start mb-2">
            <h3>{locale["onboard-title"]}</h3>
          </Card.Title>
          <CardActionLogin locale={card} />
          <p>
            {locale["onboard-assert"]}{" "}
            <a href="/login" class={"btn btn-sm btn-ghost text-accent !p-1"}>
              Login
            </a>
          </p>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
