export function smoothScrollTo(href: string) {
  if (!href.startsWith("#")) {
    return;
  }

  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}
