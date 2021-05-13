import '../style.css'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { Interaction } from 'three.interaction';

var renderer, scene, camera;
var interaction;
var mesh;

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

  }


  render() {

    renderer.render(scene, camera)



  }


  animate() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }



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