import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene =  new THREE.Scene( );
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);
renderer.render(scene, camera);
//geometry defines shape of an object 
// torus parameters = 
//(radius of the torus, radius of tube, radialSegments, Tubular segments, arc Math.PI*2)

const geometry = new THREE.TorusGeometry(20,6,20,40, Math.PI*1.8) 
const material = new THREE.MeshStandardMaterial({color:0xffffff, wireframe:true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)





const pointLight =  new THREE.PointLight(0xcAaca)
pointLight.position.set(15,5,5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xfffffd)
scene.add(ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper= new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(300));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(500).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

const femiTexture2 = new THREE.TextureLoader().load('femi2.jpg');
const femi2 = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:femiTexture2})
)

scene.add(femi2)

const femiTexture = new THREE.TextureLoader().load('femibx.jpg');
const femi = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshStandardMaterial({map:femiTexture})
)
femi.position.set(0,0,9);
scene.add(femi)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({map:moonTexture,
  normalMap:normalTexture})
);
moon.position.z = 30;
moon.position.x =-10;
scene.add(moon)

 

const marsTexture = new THREE.TextureLoader().load('mars.jpg')
const marsNormal = new THREE.TextureLoader().load('mars_normal.jpg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(50,23,23),
  new THREE.MeshStandardMaterial({map:marsTexture,normalMap:marsNormal})
);
mars.position.z =-200
mars.position.y= -32
mars.position.x= 32

scene.add(mars)

 

function moveCamera(){
  const t =document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  

  femi.rotation.y += 0.051;


  scene.rotation.y += 0.051;
  scene.rotation.x +=0.00031;

  femi2.rotation.y += -0.051;
  

 

  
  camera.position.z = t*-0.01191;
  
  // mars.rotation.x +=0.04
  // mars.rotation.y +=0.014

}
document.body.onscroll= moveCamera

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  mars.rotation.y += 0.0051
  
 
  controls.update();
  

  renderer.render(scene, camera );
}

animate()