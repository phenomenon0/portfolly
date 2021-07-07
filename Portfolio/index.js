import './style.css'

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'; 
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'

//import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader';





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

const spaceTexture = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/space.jpg')
scene.background = spaceTexture;

const femiTexture2 = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/femi2.jpg');
const femi2 = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:femiTexture2})
)
femi2.position.set(0,0,0)
scene.add(femi2)

const femiTexture = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/femibx.jpg');
const femi = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshStandardMaterial({map:femiTexture})
)
femi.position.set(0,0,9);
scene.add(femi)

const moonTexture = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({map:moonTexture,
  normalMap:normalTexture})
);
moon.position.z = 30;
moon.position.x =-10;
scene.add(moon)







// function loadingThings(source,x,y,z,scale,){
//   // Load a glTF resource
//   const loader = new GLTFLoader();
//   loader.load(
//     // resource URL
//     source,
//     // called when the resource is loaded
//     function ( gltf ) {
//       var toy = gltf.scene;
//       toy.scale.set(scale,scale,scale);
//       toy.position.set(x,y,z);
//       scene.add( toy );

//       gltf.animations; // Array<THREE.AnimationClip>
//       gltf.scene; // THREE.Group
//       gltf.scenes; // Array<THREE.Group>
//       gltf.cameras; // Array<THREE.Camera>
//       gltf.asset; // Object

//     },
//     // called while loading is progressing
//     function ( xhr ) {

//       console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//     },
//     // called when loading has errors
//     function ( error ) {

//       console.log( 'An error happened' );

//     }
//   );
//   return {

//   }
// }
// loadingThings('./scene.gltf',2,2,2,0.01);
const marsTexture = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/mars.jpg')
const marsNormal = new THREE.TextureLoader().load('https://omens-basket.s3.eu-west-2.amazonaws.com/mars_normal.jpg')
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


  scene.rotation.y += 0.01251;
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

  torus.rotation.x += 0.0031;
  torus.rotation.y += 0.002;
  mars.rotation.y += 0.0051
  
 
  controls.update();
  

  renderer.render(scene, camera );
}

animate()