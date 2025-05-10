var hashFunction = (num) => {
  let x = num * 9301 + 49297;
  x = x % 233280;
  x = x * 7;
  return btoa(x.toString()).substring(0, 6).toUpperCase();
}