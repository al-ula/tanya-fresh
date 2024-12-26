import { PageProps } from "$fresh/server.ts";
import SignupCard, { Locale, LocaleContent } from "../islands/SignupCard.tsx";
import { Language } from "../locale/index.ts";

const locale: Locale = {
  [Language.ID]: {
    "name": "Nama: ",
    "continueButton": "Lanjutkan",
    "or": "atau",
    "cancelButton": "Batal",
  } satisfies LocaleContent,
  [Language.EN]: {
    "name": "Name: ",
    "continueButton": "Continue",
    "or": "or",
    "cancelButton": "Cancel",
  } satisfies LocaleContent,
};

export default function Signup(props: PageProps) {
  const lang = props.state?.lang === Language.ID ? Language.ID : Language.EN;
  const gis_client_id: string = Deno.env.get("GIS_CLIENT_ID") || (() => {
    throw new Error("GIS_CLIENT_ID is not set");
  })();
  return (
    <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
      <SignupCard gis_client_id={gis_client_id} locale={locale[lang]} />
    </div>
  );
}
