<template>
  <div ref="rootRef" class="root"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Intersection } from 'three'
import { ref, onMounted } from 'vue'

import tunnelInsideMeshUrl from '../assets/fbxmodels/mesh/Tunnel_Inside.fbx'

import soilccolorTex from '../assets/fbxmodels/texture/Soil_C_Albedo.jpg'
import soilcaoTex from '../assets/fbxmodels/texture/Soil_C_AO.jpg'
import soilcnormalTex from '../assets/fbxmodels/texture/Soil_C_Normal.jpg'
import soilcroughnessTex from '../assets/fbxmodels/texture/Soil_C_Roughness.jpg'
import soilbcolorTex from '../assets/fbxmodels/texture/Soil_B_Albedo.jpg'
import soilbaoTex from '../assets/fbxmodels/texture/Soil_B_AO.jpg'
import soilbnormalTex from '../assets/fbxmodels/texture/Soil_B_Normal.jpg'
import soilbroughnessTex from '../assets/fbxmodels/texture/Soil_B_Roughness.jpg'
import soilacolorTex from '../assets/fbxmodels/texture/Soil_A_Albedo.jpg'
import soilaaoTex from '../assets/fbxmodels/texture/Soil_A_AO.jpg'
import soilanormalTex from '../assets/fbxmodels/texture/Soil_A_Normal.jpg'
import soilaroughnessTex from '../assets/fbxmodels/texture/Soil_A_Roughness.jpg'

import wallbcolorTex from '../assets/fbxmodels/texture/Wall_b_Albedo.jpg'
import wallbaoTex from '../assets/fbxmodels/texture/Wall_b_AO.jpg'
import wallbnormalTex from '../assets/fbxmodels/texture/Wall_b_Normal.jpg'
import wallbroughnessTex from '../assets/fbxmodels/texture/Wall_b_Roughness.jpg'

import meteldcolorTex from '../assets/fbxmodels/texture/Metal_d_Albedo.jpg'
import metelbnormalTex from '../assets/fbxmodels/texture/Metal_b_Normal.jpg'
import metelbroughnessTex from '../assets/fbxmodels/texture/Metal_b_Roughness.jpg'

import terraincolorTex from '../assets/fbxmodels/texture/terrain_Albedo.jpg'

import treecolorTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_A.jpg'
import treeaoTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_AO.jpg'
import treenormalTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_N.jpg'
import treeopacityTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_O.jpg'

import hdrUrl from '../assets/fbxmodels/texture/kloppenheim_06_1k.hdr'

const rootRef = ref<HTMLElement>()

const init = () => {
  let renderer: THREE.WebGLRenderer
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let orbitControls: OrbitControls
  const mousePosition: THREE.Vector2 = new THREE.Vector2(0, 0)
  let isMouseDown = false
  const meshLoader: FBXLoader = new FBXLoader()
  const texLoader: THREE.TextureLoader = new THREE.TextureLoader()

  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(rootRef.value!.clientWidth, rootRef.value!.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rootRef.value!.appendChild(renderer.domElement)
  }

  const initScene = () => {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x9ec1e1)
  }

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(45, rootRef.value!.clientWidth / rootRef.value!.clientHeight, 1, 5000)
    camera.position.set(0, 0, 150)
  }

  const initOrbitControls = () => {
    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.target = new THREE.Vector3(0, 0, 0)
    orbitControls.minPolarAngle = 0
    orbitControls.maxPolarAngle = Math.PI / 2
    orbitControls.minAzimuthAngle = -Math.PI / 3
    orbitControls.maxAzimuthAngle = Math.PI / 3
    orbitControls.minDistance = 0
    orbitControls.maxDistance = 200
  }

  const initLight = () => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
    hemiLight.color.set(0x3e4e56)
    hemiLight.groundColor.set(0xb4ab97)
    scene.add(hemiLight)

    // const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    // // ambientLight.
    // scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.color.setHSL(0.1, 1, 0.95)
    dirLight.position.set(-3, 14, 14)
    dirLight.position.multiplyScalar(30)
    scene.add(dirLight)
    dirLight.castShadow = true

    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    // dirLight.shadow.camera.near = 0.5
    const d = 150

    dirLight.shadow.camera.left = -d
    dirLight.shadow.camera.right = d
    dirLight.shadow.camera.top = d
    dirLight.shadow.camera.bottom = -d
    dirLight.shadow.camera.far = 3500
    dirLight.shadow.bias = -0.00001

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, 0)
    scene.add(cube)
  }

  const render = () => {
    requestAnimationFrame(render)
    orbitControls.update()
    renderer.clear()
    renderer.render(scene, camera)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.5
    rayToDeviceIcon()
  }

  const loadMesh = (meshUrl: string) => {
    return new Promise((resolve: (value: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial[]>) => void, reject) => {
      meshLoader.load(meshUrl, (object: THREE.Group) => {
        const mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial[]> = object.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial[]>
        console.log(mesh)
        resolve(mesh)
      })
    })
  }

  // const loadMesh1 = (meshUrl: string) => {
  //   return new Promise((resolve: (value: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>) => void, reject) => {
  //     meshLoader.load(meshUrl, (object: THREE.Group) => {
  //       const mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial> = object.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>
  //       resolve(mesh)
  //     })
  //   })
  // }

  const loadMeshMaterialMap = (meshUrl: string): THREE.Texture => {
    const map = texLoader.load(meshUrl)
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    return map
  }

  const spawnModel = async () => {
    const tunnelInsideMesh = await loadMesh(tunnelInsideMeshUrl)
    tunnelInsideMesh.castShadow = true
    tunnelInsideMesh.receiveShadow = true

    tunnelInsideMesh.material[0] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(soilccolorTex),
      roughnessMap: loadMeshMaterialMap(soilcroughnessTex),
      normalMap: loadMeshMaterialMap(soilcnormalTex),
      aoMap: loadMeshMaterialMap(soilcaoTex)
    })
    tunnelInsideMesh.material[1] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(wallbcolorTex),
      roughnessMap: loadMeshMaterialMap(wallbaoTex),
      normalMap: loadMeshMaterialMap(wallbnormalTex),
      aoMap: loadMeshMaterialMap(wallbroughnessTex)
    })
    tunnelInsideMesh.material[2] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(meteldcolorTex),
      roughnessMap: loadMeshMaterialMap(metelbroughnessTex),
      normalMap: loadMeshMaterialMap(metelbnormalTex),
      metalness: 1
      // aoMap: loadMeshMaterialMap(metel)
    })
    tunnelInsideMesh.material[3] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(soilbcolorTex),
      roughnessMap: loadMeshMaterialMap(soilbroughnessTex),
      normalMap: loadMeshMaterialMap(soilbnormalTex),
      aoMap: loadMeshMaterialMap(soilbaoTex)
    })
    tunnelInsideMesh.material[4] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(terraincolorTex)
    })
    tunnelInsideMesh.material[5] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(treecolorTex),
      normalMap: loadMeshMaterialMap(treenormalTex),
      aoMap: loadMeshMaterialMap(treeaoTex),
      transparent: true,
      alphaMap: loadMeshMaterialMap(treeopacityTex),
      side: THREE.DoubleSide,
      // depthTest: false
      alphaTest: 0.4
    })
    tunnelInsideMesh.material[6] = new THREE.MeshPhysicalMaterial({
      opacity: 0.3,
      roughness: 0,
      reflectivity: 1,
      transparent: true
    })
    tunnelInsideMesh.material[7] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(soilacolorTex),
      roughnessMap: loadMeshMaterialMap(soilaroughnessTex),
      normalMap: loadMeshMaterialMap(soilanormalTex),
      aoMap: loadMeshMaterialMap(soilaaoTex)
    })
    new RGBELoader().load(hdrUrl, function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
    })
    scene.add(tunnelInsideMesh)
  }

  const onMouseDown = (event: MouseEvent): void => {
    if (!isMouseDown) {
      isMouseDown = true
    }
  }

  const onMouseUp = (event: MouseEvent): void => {
    if (isMouseDown) {
      isMouseDown = false
    }
  }

  const onMouseMove = (event: MouseEvent): void => {
    mousePosition.x = ((event.clientX - rootRef.value!.getBoundingClientRect().left) / rootRef.value!.clientWidth) * 2 - 1
    mousePosition.y = -((event.clientY - rootRef.value!.getBoundingClientRect().top) / rootRef.value!.clientHeight) * 2 + 1
  }

  const rayToDeviceIcon = (): void => {
    const raycaster: THREE.Raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mousePosition, camera)
    const intersects: Array<Intersection> = raycaster.intersectObjects(scene.children)
    let isSelected: boolean = false
    for (let i: number = 0; i < intersects.length; i++) {
      // sprite1.material = spriteUnSelectedMat
      // sprite2.material = spriteUnSelectedMat
      if (intersects[i].object.type === 'Sprite') {
        isSelected = true
      }
      if (!isSelected) {
        isSelected = false
      }
    }
  }
  rootRef.value!.addEventListener('mouseup', onMouseUp, false)
  rootRef.value!.addEventListener('mousedown', onMouseDown, false)
  rootRef.value!.addEventListener('mousemove', onMouseMove, false)

  initRenderer()
  initScene()
  initCamera()
  initLight()
  initOrbitControls()
  render()
  spawnModel()
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.root {
  width: 1920px;
  height: 1080px;
}
</style>
