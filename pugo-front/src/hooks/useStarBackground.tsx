import { createStarLayer } from '@/utils/starBackground'
import React, { useEffect } from 'react'

const useStarBackground = () => {

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const bgAnimation = document.createElement('div')
      bgAnimation.className = 'bg-animation'
      document.body.appendChild(bgAnimation)

      const starParams = [
        { id: 'stars', size: 1, count: 100, duration: 50, color: '#CED8E1' },
        { id: 'stars2', size: 2, count: 50, duration: 100, color: '#CED8E1' },
        { id: 'stars3', size: 3, count: 25, duration: 150, color: '#CED8E1' },
        {
          id: 'stars4',
          size: 1,
          count: 150,
          duration: 600,
          color: '#CED8E1',
        },
      ]


      const generateStarLayers = () => {
        bgAnimation.innerHTML = '' 
        starParams.forEach(params => {
          const layer = createStarLayer(
            params.id,
            params.size,
            params.count,
            params.duration,
            params.color
          )
          bgAnimation.appendChild(layer)
        })
      }


      generateStarLayers()


      const style = document.createElement('style')
      style.textContent = `
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
      `
      document.head.appendChild(style)

 
      let resizeTimeout: number | NodeJS.Timeout
      const updateStarsOnResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(generateStarLayers, 300)
      }

      window.addEventListener('resize', updateStarsOnResize)

     
      return () => {
        window.removeEventListener('resize', updateStarsOnResize)
        document.body.removeChild(bgAnimation)
      }
    }
  }, [])

}

export default useStarBackground
