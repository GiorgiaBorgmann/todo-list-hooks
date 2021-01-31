export function callToServer() {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, 2000));
}