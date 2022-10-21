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

import meshUrl from '../assets/fbxmodels/mesh/building.fbx'
import building2MeshUrl from '../assets/fbxmodels/mesh/building2.fbx'
import treeMeshUrl from '../assets/fbxmodels/mesh/tree.fbx'
import terrainMeshUrl from '../assets/fbxmodels/mesh/terrain.fbx'
import deviceMeshUrl from '../assets/fbxmodels/mesh/gass.fbx'
import wallacolorTex from '../assets/fbxmodels/texture/Wall_a_Albedo.jpg'
import wallaaoTex from '../assets/fbxmodels/texture/Wall_a_AO.jpg'
import wallanormalTex from '../assets/fbxmodels/texture/Wall_a_Normal.jpg'
import wallaroughnessTex from '../assets/fbxmodels/texture/Wall_a_Roughness.jpg'

import portalcolorTex from '../assets/fbxmodels/texture/Portal_Albedo.png'
import portalnormalTex from '../assets/fbxmodels/texture/Portal_Normal.png'
import portalroughnessTex from '../assets/fbxmodels/texture/Portal_Roughness.jpg'

import grassacolorTex from '../assets/fbxmodels/texture/grass_a_Albedo.jpg'
import grassaaoTex from '../assets/fbxmodels/texture/grass_a_AO.jpg'
import grassanormalTex from '../assets/fbxmodels/texture/grass_a_Normal.jpg'
import grassaroughnessTex from '../assets/fbxmodels/texture/grass_a_Roughness.jpg'

import wallbcolorTex from '../assets/fbxmodels/texture/Wall_b_Albedo.jpg'
import wallbaoTex from '../assets/fbxmodels/texture/Wall_b_AO.jpg'
import wallbnormalTex from '../assets/fbxmodels/texture/Wall_b_Normal.jpg'
import wallbroughnessTex from '../assets/fbxmodels/texture/Wall_b_Roughness.jpg'

import metelccolorTex from '../assets/fbxmodels/texture/Metal_c_Albedo.jpg'
import metelbcolorTex from '../assets/fbxmodels/texture/Metal_b_Albedo.jpg'
import meteldcolorTex from '../assets/fbxmodels/texture/Metal_d_Albedo.jpg'
import metelbnormalTex from '../assets/fbxmodels/texture/Metal_b_Normal.jpg'
import metelbroughnessTex from '../assets/fbxmodels/texture/Metal_b_Roughness.jpg'

import metelacolorTex from '../assets/fbxmodels/texture/Metal_a_Albedo.jpg'
import metelanormalTex from '../assets/fbxmodels/texture/Metal_a_Normal.jpg'
import metelaroughnessTex from '../assets/fbxmodels/texture/Metal_a_Roughness.jpg'
// import metelametalnessTex from '../assets/fbxmodels/texture/Metal_a_Metalness.jpg'

import tileacolorTex from '../assets/fbxmodels/texture/tile_a_Albedo.jpg'
import tileaaoTex from '../assets/fbxmodels/texture/tile_a_AO.jpg'
import tileanormalTex from '../assets/fbxmodels/texture/tile_a_Normal.jpg'
import tilearoughnessTex from '../assets/fbxmodels/texture/tile_a_Roughness.jpg'

import metalecolorTex from '../assets/fbxmodels/texture/Metal_e_Albedo.jpg'
import metaleaoTex from '../assets/fbxmodels/texture/Metal_e_AO.jpg'
import metalenormalTex from '../assets/fbxmodels/texture/Metal_e_Normal.jpg'
import metaleroughnessTex from '../assets/fbxmodels/texture/Metal_e_Roughness.jpg'

import clothbcolorTex from '../assets/fbxmodels/texture/Cloth_b_Albedo.jpg'
import clothbaoTex from '../assets/fbxmodels/texture/Cloth_b_AO.jpg'
import clothbnormalTex from '../assets/fbxmodels/texture/Cloth_b_Normal.jpg'
import clothbroughnessTex from '../assets/fbxmodels/texture/Cloth_b_Roughness.jpg'

import tilebcolorTex from '../assets/fbxmodels/texture/Tile_b_Albedo.jpg'
import tilebnormalTex from '../assets/fbxmodels/texture/Tile_b_Normal.jpg'
import tilebroughnessTex from '../assets/fbxmodels/texture/Tile_b_Roughness.jpg'

import brickacolorTex from '../assets/fbxmodels/texture/Brick_a_Albedo.jpg'
import brickaaoTex from '../assets/fbxmodels/texture/Brick_a_AO.jpg'
import brickanormalTex from '../assets/fbxmodels/texture/Brick_a_Normal.jpg'
import brickaroughnessTex from '../assets/fbxmodels/texture/Brick_a_Roughness.jpg'

import clothccolorTex from '../assets/fbxmodels/texture/Cloth_c_Albedo.jpg'
import clothcaoTex from '../assets/fbxmodels/texture/Cloth_c_AO.jpg'
import clothcnormalTex from '../assets/fbxmodels/texture/Cloth_c_Normal.jpg'
import clothcroughnessTex from '../assets/fbxmodels/texture/Cloth_c_Roughness.jpg'
import clothacolorTex from '../assets/fbxmodels/texture/Cloth_a_Albedo.jpg'
import clothaaoTex from '../assets/fbxmodels/texture/Cloth_a_AO.jpg'
import clothanormalTex from '../assets/fbxmodels/texture/Cloth_a_Normal.jpg'
import clotharoughnessTex from '../assets/fbxmodels/texture/Cloth_a_Roughness.jpg'

import terraincolorTex from '../assets/fbxmodels/texture/terrain_Albedo.jpg'

import hdrUrl from '../assets/fbxmodels/texture/kloppenheim_06_1k.hdr'

import treecolorTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_A.jpg'
import treeaoTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_AO.jpg'
import treenormalTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_N.jpg'
import treeopacityTex from '../assets/fbxmodels/texture/T_Tree_01_Billboard_O.jpg'

import deviceUnSelectedIconTex from '../assets/fbxmodels/texture/deviceIconUnSelected.png'
import deviceSelectedIconTex from '../assets/fbxmodels/texture/deviceIconSelected.png'

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
    camera.position.set(22, 10, -13)
  }

  const initOrbitControls = () => {
    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.target = new THREE.Vector3(-30, 10, -23)
    orbitControls.minPolarAngle = 0
    orbitControls.maxPolarAngle = Math.PI / 2
    orbitControls.minAzimuthAngle = 0
    orbitControls.maxAzimuthAngle = Math.PI
    orbitControls.minDistance = 0
    orbitControls.maxDistance = 200
    // orbitControls.autoRotate = true
    // orbitControls.object.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), 90)
  }

  const initLight = () => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
    hemiLight.color.set(0x3e4e56)
    hemiLight.groundColor.set(0xb4ab97)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.color.setHSL(0.1, 1, 0.95)
    dirLight.position.set(5, 20, -5)
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
    //
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
        resolve(mesh)
      })
    })
  }

  const loadMesh1 = (meshUrl: string) => {
    return new Promise((resolve: (value: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>) => void, reject) => {
      meshLoader.load(meshUrl, (object: THREE.Group) => {
        const mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial> = object.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>
        resolve(mesh)
      })
    })
  }

  const loadMeshMaterialMap = (meshUrl: string): THREE.Texture => {
    const map = texLoader.load(meshUrl)
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    return map
  }

  const spriteUnSelectedMat: THREE.SpriteMaterial = new THREE.SpriteMaterial({
    map: loadMeshMaterialMap(deviceUnSelectedIconTex)
  })
  const spriteSelectedMat: THREE.SpriteMaterial = new THREE.SpriteMaterial({
    map: loadMeshMaterialMap(deviceSelectedIconTex)
  })

  const sprite1: THREE.Sprite = new THREE.Sprite(spriteUnSelectedMat)
  const sprite2: THREE.Sprite = new THREE.Sprite(spriteUnSelectedMat)

  const spawnModel = async () => {
    const mesh = await loadMesh(meshUrl)
    const building2Mesh = await loadMesh1(building2MeshUrl)
    const treeMesh = await loadMesh1(treeMeshUrl)
    const terrainMesh = await loadMesh1(terrainMeshUrl)
    const deviceMesh1 = await loadMesh(deviceMeshUrl)
    const deviceMesh2 = await loadMesh(deviceMeshUrl)

    deviceMesh1.position.set(-109.921, 31.53, 6.8)
    deviceMesh1.scale.set(2, 2, 2)

    deviceMesh2.position.set(-90.361, 26.086, -54.757)
    deviceMesh2.scale.set(2, 2, 2)

    mesh.castShadow = true
    mesh.receiveShadow = true

    building2Mesh.castShadow = true
    building2Mesh.receiveShadow = true

    treeMesh.castShadow = true
    treeMesh.receiveShadow = true

    deviceMesh1.castShadow = true
    deviceMesh2.castShadow = true

    terrainMesh.castShadow = true
    terrainMesh.receiveShadow = true
    terrainMesh.material = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(terraincolorTex)
    })

    mesh.material[0] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(wallacolorTex),
      roughnessMap: loadMeshMaterialMap(wallaroughnessTex),
      normalMap: loadMeshMaterialMap(wallanormalTex),
      aoMap: loadMeshMaterialMap(wallaaoTex)
    })
    mesh.material[1] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(portalcolorTex),
      roughnessMap: loadMeshMaterialMap(portalroughnessTex),
      normalMap: loadMeshMaterialMap(portalnormalTex)
    })
    mesh.material[2] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(grassacolorTex),
      roughnessMap: loadMeshMaterialMap(grassaroughnessTex),
      normalMap: loadMeshMaterialMap(grassanormalTex),
      aoMap: loadMeshMaterialMap(grassaaoTex)
    })
    mesh.material[3] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(wallbcolorTex),
      roughnessMap: loadMeshMaterialMap(wallbroughnessTex),
      normalMap: loadMeshMaterialMap(wallbnormalTex),
      aoMap: loadMeshMaterialMap(wallbaoTex)
    })
    mesh.material[4] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(metelccolorTex),
      // roughness: 0.1,
      roughnessMap: loadMeshMaterialMap(metelbroughnessTex),
      metalness: 0.8,
      normalMap: loadMeshMaterialMap(metelbnormalTex)
    })
    mesh.material[5] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(metelbcolorTex),
      roughnessMap: loadMeshMaterialMap(metelbroughnessTex),
      normalMap: loadMeshMaterialMap(metelbnormalTex),
      metalness: 0.8
    })
    mesh.material[6] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(meteldcolorTex),
      roughnessMap: loadMeshMaterialMap(metelbroughnessTex),
      normalMap: loadMeshMaterialMap(metelbnormalTex),
      metalness: 0.8
    })
    mesh.material[7] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(metelacolorTex),
      roughnessMap: loadMeshMaterialMap(metelaroughnessTex),
      normalMap: loadMeshMaterialMap(metelanormalTex),
      metalness: 0.8
    })
    mesh.material[8] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(tileacolorTex),
      // roughness: 0,
      roughnessMap: loadMeshMaterialMap(tilearoughnessTex),
      normalMap: loadMeshMaterialMap(tileanormalTex),
      aoMap: loadMeshMaterialMap(tileaaoTex)
      // metalness: 0.5
    })
    mesh.material[9] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(metalecolorTex),
      // roughness: 0.2,
      roughnessMap: loadMeshMaterialMap(metaleroughnessTex),
      normalMap: loadMeshMaterialMap(metalenormalTex),
      aoMap: loadMeshMaterialMap(metaleaoTex),
      metalness: 1
    })
    mesh.material[10] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(clothbcolorTex),
      roughnessMap: loadMeshMaterialMap(clothbroughnessTex),
      normalMap: loadMeshMaterialMap(clothbnormalTex),
      aoMap: loadMeshMaterialMap(clothbaoTex)
    })
    mesh.material[11] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(tilebcolorTex),
      roughnessMap: loadMeshMaterialMap(tilebroughnessTex),
      normalMap: loadMeshMaterialMap(tilebnormalTex)
    })
    mesh.material[13] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(brickacolorTex),
      roughnessMap: loadMeshMaterialMap(brickaroughnessTex),
      normalMap: loadMeshMaterialMap(brickanormalTex),
      aoMap: loadMeshMaterialMap(brickaaoTex)
    })
    mesh.material[14] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(clothccolorTex),
      roughnessMap: loadMeshMaterialMap(clothcroughnessTex),
      normalMap: loadMeshMaterialMap(clothcnormalTex),
      aoMap: loadMeshMaterialMap(clothcaoTex)
    })
    mesh.material[15] = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(clothacolorTex),
      roughnessMap: loadMeshMaterialMap(clotharoughnessTex),
      normalMap: loadMeshMaterialMap(clothanormalTex),
      aoMap: loadMeshMaterialMap(clothaaoTex)
    })

    building2Mesh.material = new THREE.MeshPhysicalMaterial({
      opacity: 0.7,
      transparent: true
    })
    treeMesh.material = new THREE.MeshPhysicalMaterial({
      map: loadMeshMaterialMap(treecolorTex),
      normalMap: loadMeshMaterialMap(treenormalTex),
      aoMap: loadMeshMaterialMap(treeaoTex),
      transparent: true,
      alphaMap: loadMeshMaterialMap(treeopacityTex),
      side: THREE.DoubleSide,
      // depthTest: false
      alphaTest: 0.4
    })

    sprite1.position.copy(deviceMesh1.position)
    sprite1.position.y += 5.2
    sprite1.scale.set(6.7, 2.85, 5)
    sprite1.name = 'sprite1'

    sprite2.position.copy(deviceMesh2.position)
    sprite2.position.y += 5.2
    sprite2.scale.set(6.7, 2.85, 5)
    sprite2.name = 'sprite2'

    scene.add(mesh)
    scene.add(building2Mesh)
    scene.add(terrainMesh)
    scene.add(treeMesh)
    scene.add(deviceMesh1)
    scene.add(deviceMesh2)
    scene.add(sprite1)
    scene.add(sprite2)

    new RGBELoader().load(hdrUrl, function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
    })
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
        if (intersects[i].object.name === 'sprite1') {
          sprite1.material = spriteSelectedMat
          if (isMouseDown) {
            isMouseDown = false
            console.log('ClickSprite1')
          }
        } else {
          sprite2.material = spriteSelectedMat
          if (isMouseDown) {
            isMouseDown = false
            console.log('ClickSprite2')
          }
        }
      }
      if (!isSelected) {
        sprite1.material = spriteUnSelectedMat
        sprite2.material = spriteUnSelectedMat
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
