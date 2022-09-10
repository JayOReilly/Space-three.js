import './style.css'
import * as THREE from 'three';
import { render } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Stars } from '@react-three/drei';
import React from 'react'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(300);
renderer.render(scene, camera);



// Sun
//const sun = new THREE.TextureLoader().load('sun.jpg');
const geom = new THREE.SphereGeometry(50,40,75);
const mats = new THREE.MeshStandardMaterial({});
const suntext = new THREE.TextureLoader().load('../assets/moon.jpg')






const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50,40,75),
  new THREE.MeshBasicMaterial({map: suntext})
);
const ball = new THREE.Mesh(geom, mats,sun);
scene.ball = sun;
scene.add(sun)



////////////////////////////////////
const pointingLight = new THREE.PointLight(0xffffff)
pointingLight.position.set(25,30,20)
scene.add(pointingLight)
const control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = 0.5;



//Adding stars to the browser
function addStars(){
const geom = new THREE.SphereGeometry(1,1,5,1);
const mats = new THREE.MeshLambertMaterial({});
const star = new THREE.Mesh(geom, mats);
const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
star.position.set(x,y,z);
scene.add(star)
}
Array(500).fill().forEach(addStars)
const spaceTexture = new THREE.TextureLoader().load('../assets/uni.jpg');
scene.background = spaceTexture;




	




function animate(){
  requestAnimationFrame(animate);

  

      ball.rotation.x += -1.00;
      ball.rotation.y += -1.00;
      ball.rotation.z += 0.00;
      control.update();
      renderer.render(scene, camera);
}

animate()



