const hashFunction = (num) => {
  let x = num * 9301 + 49297;
  x = x % 233280;
  x = x * 3;
  return btoa(x.toString()).substring(0, 6).toUpperCase();
}

setTimeout(() => {
  const y = hashFunction("{{level_session.level_metadata.input_number}}");
  return y;
}, 1000);
