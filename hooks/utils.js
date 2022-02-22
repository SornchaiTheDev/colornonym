export function blink(seconds, fn) {
  setTimeout(() => fn(), seconds * 1000);
}
