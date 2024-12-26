import { useEffect } from "preact/hooks";

export default function Language() {
  useEffect(() => {
    const browserLanguage = navigator.language;
    // console.log("browserLanguage: ", browserLanguage);
    document.cookie = `lang=${browserLanguage}; SameSite=Strict; Secure`;
  }, []);
  return <></>;
}
