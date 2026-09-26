export function showNotice(message) {
  if (typeof window === "undefined") return;
  const existing = document.getElementById("app-notice");
  if (existing) existing.remove();
  const notice = document.createElement("div");
  notice.id = "app-notice";
  notice.textContent = message;
  notice.style.position = "fixed";
  notice.style.bottom = "24px";
  notice.style.left = "50%";
  notice.style.transform = "translateX(-50%)";
  notice.style.background = "#0e241d";
  notice.style.color = "#d9eee5";
  notice.style.padding = "10px 18px";
  notice.style.borderRadius = "999px";
  notice.style.fontSize = "11px";
  notice.style.fontWeight = "600";
  notice.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
  notice.style.zIndex = "99999";
  notice.style.pointerEvents = "none";
  notice.style.transition = "opacity 0.25s ease";
  document.body.appendChild(notice);
  setTimeout(() => {
    notice.style.opacity = "0";
    setTimeout(() => notice.remove(), 250);
  }, 2800);
}
