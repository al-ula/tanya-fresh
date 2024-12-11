import { signal } from "@preact/signals";

const registerName = signal("");

function saveName(name: string) {
  localStorage.setItem("registerName", name);
}

function loadName(): string | null {
  const name: string | null = localStorage.getItem("registerName");
  if (name) {
    return name;
  }
  return null;
}

function deleteName() {
  localStorage.removeItem("registerName");
}

export { loadName, registerName, saveName, deleteName };
