import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";

const pi = Math.PI; // I am tired of writing Math.PI

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xDADADA);

// Camera configuration
// Parameters: FOV, aspect ratio, minimum rendering distance, maximum rendering distance
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 0;
camera.position.z = 0;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
// Set renderer size (window size)
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, -2);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
document.body.appendChild(renderer.domElement);

// const light = new THREE.DirectionalLight(0xffffff, 0);
const light = new THREE.PointLight(0xFFFFFF, 1, 100000);
light.position.set(0, 0, -2).normalize();
scene.add(light);

const boxCenter = [0, 0, -6];
const side = 9;

const [x0, y0, z0] = boxCenter;
const cornellPlaneGeometry = new THREE.PlaneBufferGeometry(side, side, 10, 10)

const whiteLambertianMaterial = new THREE.MeshLambertMaterial({
  color: 0xE1E2D4,
  emissive: 0x2a2a2a,
  emissiveIntensity: .5,
  side: THREE.DoubleSide
});
const redLambertianMaterial = new THREE.MeshLambertMaterial({
  color: 0xE80202,
  emissive: 0x2a2a2a,
  emissiveIntensity: .5,
  side: THREE.DoubleSide
});

const greenLambertianMaterial = new THREE.MeshLambertMaterial({
  color: 0x0FCF02,
  emissive: 0x2a2a2a,
  emissiveIntensity: .5,
  side: THREE.DoubleSide
});

const leftWall = new THREE.Mesh(cornellPlaneGeometry, redLambertianMaterial);
leftWall.rotation.y += pi/2;
leftWall.position.set(x0-side/2,y0,z0);
scene.add(leftWall);

const rightWall = new THREE.Mesh(cornellPlaneGeometry, greenLambertianMaterial);
rightWall.rotation.y -= pi/2;
rightWall.position.set(x0+side/2,y0,z0);
scene.add(rightWall);

const backWall = new THREE.Mesh(cornellPlaneGeometry, whiteLambertianMaterial);
backWall.position.set(x0, y0, z0-side/2);
scene.add(backWall);

const roof = new THREE.Mesh(cornellPlaneGeometry, whiteLambertianMaterial);
roof.rotation.x += pi/2;
roof.position.set(x0, y0+side/2, z0);
scene.add(roof);

const floor = new THREE.Mesh(cornellPlaneGeometry, whiteLambertianMaterial);
floor.rotation.x += pi/2;
floor.position.set(x0, y0-side/2, z0);
scene.add(floor);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
