const cache = {}

export default function applyStyleHot (cssText, hash) {
  if (cache[hash]) {
    document.getElementById(hash).textContent = cssText
  } else {
    var styleEl = document.createElement('style')
    styleEl.id = hash
    styleEl.textContent = cssText
    document.head.appendChild(styleEl)
    cache[hash] = styleEl
  }

  return hash
}
