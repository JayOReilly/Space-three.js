import './style.css'
import * as THREE from 'three';
import { render } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CHROME from '../vanilla3d/assets/chrome.jpg';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(150);

renderer.render(scene, camera);

const geom = new THREE.SphereGeometry(50,40,50,1);
const mats = new THREE.MeshBasicMaterial({ color: 0x91a8d0});
const ball = new THREE.Mesh(geom, mats);

const texture1 = new THREE.TextureLoader().load('chrome.jpg')
scene.ball = texture1;

scene.add(ball)

const pointingLight = new THREE.PointLight(0xffffff)
pointingLight.position.set(20,20,20)

scene.add(pointingLight)

const control = new OrbitControls(camera, renderer.domElement);

function addStars(){

const geom = new THREE.SphereGeometry(1,1,5,1);
const mats = new THREE.MeshLambertMaterial({ color: 0x91a8d0});
const star = new THREE.Mesh(geom, mats);

const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));

star.position.set(x,y,z);
scene.add(star)



}

const texture = new THREE.TextureLoader().load('chrome.jpg')
scene.ball = texture;
Array(500).fill().forEach(addStars)


const spacebg = new THREE.TextureLoader().load('milky.jpg')
spacebg.wrapS = THREE.RepeatWrapping;
spacebg.wrapT = THREE.RepeatWrapping;



function animate(){
  requestAnimationFrame(animate);

  ball.rotation.x += 0.00;
  ball.rotation.y += 0.01;
  ball.rotation.z =+ 0.00;


  renderer.render(scene, camera);

  control.update()

}

animate()




