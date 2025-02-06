//@ts-ignore
import "normalize.css";
//@ts-ignore
import modelUrl from "../assets/MaterialsVariantsShoe.glb";
import {
  Color,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const container = document.getElementById("app");

const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container?.appendChild(renderer.domElement);
const pmremGenerator = new PMREMGenerator(renderer);
const scene = new Scene();
scene.background = new Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(
  new RoomEnvironment(),
  0.04
).texture;
const camera = new PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100
);
camera.position.set(1.5, 1.5, 7);
const loader = new GLTFLoader();
loader.load(
  modelUrl,
  function (gltf) {
    const model = gltf.scene;
    model.position.set(1.4, 1, 0);
    model.scale.set(10, 10, 10);
    model.rotation.x += 0.5;
    scene.add(model);
    renderer.setAnimationLoop(animate);

    function animate() {
      model.rotation.y -= 0.01;
      renderer.render(scene, camera);
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
