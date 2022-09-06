import './style.css'
import * as THREE from 'three';
import { render } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CHROME from '../vanilla3d/assets/chrome.jpg';
import { Stars } from '@react-three/drei';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);
renderer.render(scene, camera);




/////////////////////////////////////////////


const geom = new THREE.SphereGeometry(50,40,75);
const mats = new THREE.MeshStandardMaterial
    ({ });
const ball = new THREE.Mesh(geom, mats);
scene.add(ball)

////////////////////////////////////

const pointingLight = new THREE.PointLight(0xffffff)
pointingLight.position.set(20,20,20)

scene.add(pointingLight)

const control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = 2;

//Adding stars to the browser

function addStars(){

const geom = new THREE.SphereGeometry(1,1,5,1);
const mats = new THREE.MeshLambertMaterial({ color: 0xffffff});
const star = new THREE.Mesh(geom, mats);

const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(450));

star.position.set(x,y,z);
scene.add(star)
}


Array(500).fill().forEach(addStars)

const spaceTexture = new THREE.TextureLoader().load('../assets/uni.jpg');
scene.background = spaceTexture;

const sunText = new THREE.TextureLoader().load('../assets/sun.jpg');
scene.ball = sunText;






function animate(){
  requestAnimationFrame(animate);

  

      ball.rotation.x += 0.00;
      ball.rotation.y += 0.01;
      ball.rotation.z += 0.00;
      control.update();
      
      renderer.render(scene, camera);

 

}

animate()




