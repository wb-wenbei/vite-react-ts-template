import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const { clientWidth, clientHeight } = containerRef.current

    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000)
    camera.position.z = 5

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(clientWidth, clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040) // 环境光
    scene.add(ambientLight)

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 2, 5)
    scene.add(directionalLight)

    // 加载模型
    const loader = new GLTFLoader()
    loader.load(
      '/models/buster_drone.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0) // 设置模型位置
        scene.add(model)
      },
      undefined,
      (error) => {
        console.error(error)
      }
    )

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement)

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate)

      controls.update() // 更新控制器
      renderer.render(scene, camera)
    }
    animate()

    // 调整窗口大小时更新渲染器尺寸和相机纵横比
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
}

export default App
