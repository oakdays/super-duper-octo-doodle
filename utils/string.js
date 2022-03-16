export function decodedString(str) {
  var elem = document.createElement('textarea');
  elem.innerHTML = str;
  return elem.value
}