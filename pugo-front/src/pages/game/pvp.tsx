// import * as THREE from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// const PVP = () => {
// 	if (typeof window !== 'undefined') {
// 		const scene = new THREE.Scene()
// 		const camera = new THREE.PerspectiveCamera(
// 			75,
// 			window.innerWidth / window.innerHeight,
// 			1,
// 			500
// 		)
// 		camera.position.set(0, 0, 100)
// 		camera.lookAt(0, 0, 0)

// 		const renderer = new THREE.WebGLRenderer()
// 		renderer.setSize(window.innerWidth, window.innerHeight)
// 		// renderer.setClearColor(0xffffff) // Белый фон

// 		document.body.appendChild(renderer.domElement)

// 		// Добавляем освещение
// 		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// 		scene.add(ambientLight)

// 		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// 		directionalLight.position.set(5, 5, 5)
// 		scene.add(directionalLight)

// 		const loader = new GLTFLoader()

// 		loader.load(
// 			'/models/scene.gltf',
// 			function (gltf) {
// 				const model = gltf.scene

// 				// Центрируем модель
// 				const box = new THREE.Box3().setFromObject(model)
// 				const center = box.getCenter(new THREE.Vector3())
// 				model.position.sub(center)

// 				// Масштабируем модель если нужно
// 				const size = box.getSize(new THREE.Vector3())
// 				const maxDim = Math.max(size.x, size.y, size.z)
// 				const scale = 50 / maxDim
// 				model.scale.multiplyScalar(scale)

// 				scene.add(model)
// 			},
// 			// Показываем прогресс загрузки
// 			function (xhr) {
// 				console.log((xhr.loaded / xhr.total) * 100 + '% загружено')
// 			},
// 			function (error) {
// 				console.error('Ошибка при загрузке модели:', error)
// 			}
// 		)

// 		// Анимация
// 		function animate() {
// 			requestAnimationFrame(animate)
// 			renderer.render(scene, camera)
// 		}
// 		animate()

// 		// Обработка изменения размера окна
// 		window.addEventListener('resize', () => {
// 			camera.aspect = window.innerWidth / window.innerHeight
// 			camera.updateProjectionMatrix()
// 			renderer.setSize(window.innerWidth, window.innerHeight)
// 		})
// 	}
// }

// export default PVP
