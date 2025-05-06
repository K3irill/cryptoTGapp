

    export const createStarLayer = (
      id: string,
      size: number,
      count: number,
      duration: number,
      color: string
    ) => {
      const layer = document.createElement('div')
      layer.id = id
      layer.style.position = 'absolute'
      layer.style.top = '0'
      layer.style.left = '0'
      layer.style.width = '100%'
      layer.style.height = `${window.innerHeight * 2}px`
      layer.style.overflow = 'hidden'
  
      for (let i = 0; i < count; i++) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight * 2
  
        const star = document.createElement('div')
        star.className = 'star'
        star.style.position = 'absolute'
        star.style.left = `${x}px`
        star.style.top = `${y}px`
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.background = color
        star.style.borderRadius = '50%'
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`
  
        layer.appendChild(star)
      }
  
      // Анимация слоя
      layer.style.animation = `animStarLayer-${id} ${duration}s linear infinite`
  
      // Создаём CSS keyframes
      const style = document.createElement('style')
      style.textContent = `
        @keyframes animStarLayer-${id} {
          from { transform: translateY(-${window.innerHeight}px); }
          to { transform: translateY(0); }
        }
      `
      document.head.appendChild(style)
  
      return layer
    }
  

  