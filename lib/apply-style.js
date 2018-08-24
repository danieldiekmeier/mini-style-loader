export default function applyStyle (cssText, hash) {
  var styleEl = document.createElement('style')
  styleEl.id = hash
  styleEl.textContent = cssText
  document.head.appendChild(styleEl)
  return hash
}
