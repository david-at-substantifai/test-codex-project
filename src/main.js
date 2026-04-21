const invoke = window.__TAURI__?.core?.invoke;

async function loadDemoInfo() {
  const platformNode = document.querySelector("#platform");
  const archNode = document.querySelector("#arch");
  const modeNode = document.querySelector("#mode");

  if (!invoke) {
    platformNode.textContent = "Browser preview";
    archNode.textContent = "n/a";
    modeNode.textContent = "Tauri API unavailable";
    return;
  }

  const info = await invoke("demo_info");
  platformNode.textContent = info.platform;
  archNode.textContent = info.arch;
  modeNode.textContent = info.tauri_mode;
}

async function wireGreeting() {
  const button = document.querySelector("#greet-button");
  const input = document.querySelector("#name-input");
  const output = document.querySelector("#greeting-output");

  button.addEventListener("click", async () => {
    if (!invoke) {
      output.textContent =
        "The native backend is only available when the app is launched through Tauri.";
      return;
    }

    const name = input.value.trim() || "friend";
    const message = await invoke("greet", { name });
    output.textContent = message;
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadDemoInfo();
  await wireGreeting();
});
