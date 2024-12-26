function main() {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomString = Array.from(
    array,
    (byte) => chars[byte % chars.length],
  ).join("");
  console.log(randomString);
}

main();
