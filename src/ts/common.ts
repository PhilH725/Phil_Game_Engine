
export function randomNumber(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function compareArrays(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}