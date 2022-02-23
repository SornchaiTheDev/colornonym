export function blink(seconds, fn) {
  return setInterval(() => fn(), seconds * 1000);
}
