import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import LoginCard, { Locale, LocaleContent } from "../islands/LoginCard.tsx";
import { Language } from "../locale/index.ts";

const LoginCardLocale: Locale = {
  [Language.ID]: {
    "continueButton": "Lanjutkan",
    "or": "atau",
  } satisfies LocaleContent,
  [Language.EN]: {
    "continueButton": "Continue",
    "or": "or",
  } satisfies LocaleContent,
};

export default function Login(props: PageProps) {
  const lang: Language = props.state?.lang === Language.ID
    ? Language.ID
    : Language.EN;
  const gis_client_id: string = Deno.env.get("GIS_CLIENT_ID") || (() => {
    throw new Error("GIS_CLIENT_ID is not set");
  })();
  return (
    <>
      <Head>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </Head>
      <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
        <LoginCard
          gis_client_id={gis_client_id}
          locale={LoginCardLocale[lang]}
        />
      </div>
    </>
  );
}
