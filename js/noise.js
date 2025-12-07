// Generador de ruido visual para el fondo
;(() => {
  function generateNoise(canvas, density = 0.25) {
    const ctx = canvas.getContext("2d")
    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)

    const imageData = ctx.createImageData(w, h)
    const buffer = new Uint32Array(imageData.data.buffer)
    const len = buffer.length
    const alpha = 0xff << 24

    // density controla cuán "denso" es el ruido: 0..1
    const threshold = Math.floor(255 * (1 - density))

    for (let i = 0; i < len; i++) {
      // aleatorio suave en escala de gris
      const v = (Math.random() * 255) | 0
      buffer[i] = (v << 16) | (v << 8) | v | alpha
    }

    ctx.putImageData(imageData, 0, 0)
  }

  // rebaja el render y redibuja solo al resize
  function initNoise() {
    const canvas = document.getElementById("noise")
    if (!canvas) return
    generateNoise(canvas, 0.18) // ajustar 0.12 - 0.22 según gusto

    let resizeTimer
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => generateNoise(canvas, 0.18), 200)
    })
  }

  // arrancar cuando DOM listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNoise)
  } else {
    initNoise()
  }
})()
