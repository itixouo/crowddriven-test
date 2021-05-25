import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { Interaction } from 'three.interaction';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var renderer, scene, camera;
var interaction;
var mesh;

var fbxLoader = new FBXLoader();
var objLoader = new OBJLoader();
var glftLoader = new GLTFLoader();

var textureLoader = new THREE.TextureLoader();


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


export class OverWorld {




  constructor(_renderer) {


    renderer = _renderer;
    scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    mesh = new THREE.Mesh(geometry, material)


    scene.add(mesh)
    //loadMesh();
    loadImage();

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 10
    camera.position.x = 0
    scene.add(camera)

    interaction = new Interaction(renderer, scene, camera);

    mesh.cursor = 'pointer';
    mesh.on('click', function (ev) {
      toggleUI();

    });
    //toggleUI();


    lighting();

  }




  render() {

    renderer.render(scene, camera)



  }


  animate() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }



}


function lighting() {
  // LIGHTS

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  scene.add(hemiLightHelper);

  //

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(- 1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  const d = 50;

  dirLight.shadow.camera.left = - d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = - d;

  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = - 0.0001;

  //const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
  //scene.add(dirLightHelper);
}
function loadImage() {

  const map = textureLoader.load('images/main.jpg', function (texture) {
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);

    const width = material.map.image.width;
    const height = material.map.image.height;
    let spriteC = new THREE.Sprite(material);
    spriteC.center.set(0.5, 0.5);
    let scale = 0.0045;
    spriteC.scale.set(width * scale, height * scale, 1);

    scene.add(spriteC);


  });


}

function loadMesh() {

  let modelPath = 'models/fbx/test.fbx';

  let bodyTexture = textureLoader.load('models/texture/free_male_1_body_diffuse.png',

    () => { console.log("Loaded"); },
    () => { console.log("progress"); },
    () => { console.log("error"); }


  );




  fbxLoader.load(modelPath, function (object) {



    textureLoader.crossOrigin = true;
    textureLoader.load('models/texture/free_male_1_body_diffuse.png', function (texture) {
      texture.anisotropy = 16;
      var material = new THREE.MeshPhongMaterial({ map: texture, opacity: 1, transparent: true });
      object.material = material;


    });

    object.traverse(function (child) {

      if (child.isMesh) {

        child.castShadow = true;
        child.receiveShadow = true;

      }

    });





    const s = 0.01;
    object.scale.set(s, s, s);
    object.position.set(0, -5, 0);
    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);


  });



  objLoader.load('models/obj/astronaught.obj', function (object) {



    object.traverse(function (child) {

      if (child.isMesh) {

        child.castShadow = true;
        child.receiveShadow = true;

      }

    });



    const s = 5;
    object.scale.set(s, s, s);
    object.position.set(10, -5, 0);
    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);


  });


  glftLoader.load('models/duck/Duck.gltf', function (gltf) {



    const object = gltf.scene.children[0];



    const s = 0.05;
    object.scale.set(s, s, s);
    object.position.set(-10, -5, 0);
    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);


  });







}


async function loadTexture() {

  let texture = await new THREE.TextureLoader().load(texturePath);
  return texture;
}


function toggleUI() {


  var x = document.getElementById("ui");
  if (x.style.display === "none") {
    x.style.display = "block";
    x.style.pointerEvents = "auto";
  } else {
    x.style.pointerEvents = "none";
    x.style.display = "none";
  }

}



// const renderer ;
// const scene = new THREE.Scene();


// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const mesh = new THREE.Mesh(geometry, material)


// scene.add(mesh)


// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 2
// scene.add(camera)



// renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)