import { useEffect } from "preact/hooks";

interface GoogleAuthProps {
  class?: string;
  clientId: string;
  // deno-lint-ignore no-explicit-any
  callback: (response: any) => void;
  buttonText?: string;
}

export default function GoogleAuth(props: GoogleAuthProps) {
  // deno-lint-ignore no-explicit-any
  const global = globalThis as any;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Initialize One Tap prompt
      if (global.google?.accounts?.id) {
        global.google.accounts.id.initialize({
          client_id: props.clientId,
          callback: props.callback,
          ux_mode: "popup",
          context: "use",
          prompt_parent_id: "oneTap",
          auto_select: true, // Optional: automatically select if only one account is available
          cancel_on_tap_outside: true, // Optional: prevent closing on outside click
          use_fedcm_for_prompt: true, // Optional: use federated login for prompt
          itp_support: true, // Optional: enable itp support
        });
        global.google.accounts.id.renderButton(
          document.getElementById("googleButton"),
          {
            type: "standard",
            theme: "outline",
            size: "large",
            text: props.buttonText || "continue_with",
          },
        );
        console.log("Google button rendered");
        // Display the One Tap prompt
        global.google.accounts.id.prompt();
      }
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [props.clientId]);

  return (
    <div
      id="google-auth-wrapper"
      style={{ colorScheme: "light" }}
      class={props.class}
    >
      <div
        id="oneTap"
        style={{ position: "fixed", right: 0, top: 0, zIndex: 999 }}
      />
      <div id="googleButton">
      </div>
    </div>
  );
}
