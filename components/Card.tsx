import { ComponentChildren } from "preact";

interface Props {
  class?: string;
  id?: string;
  children?: ComponentChildren;
}

export function Root(prop: Props) {
  return (
    <div
      id={prop.id}
      class={"card " +
        prop.class}
    >
      {prop.children}
    </div>
  );
}

export function Body(prop: Props) {
  return (
    <div id={prop.id} class={"card-body " + prop.class}>
      {prop.children}
    </div>
  );
}

export function Title(prop: Props) {
  return (
    <div id={prop.id} class={"card-title " + prop.class}>
      {prop.children}
    </div>
  );
}

export function Actions(prop: Props) {
  return (
    <div id={prop.id} class={"card-actions " + prop.class}>
      {prop.children}
    </div>
  );
}

export default {
  Root,
  Body,
  Title,
  Actions,
};
