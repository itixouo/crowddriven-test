import './style.css'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { Interaction } from 'three.interaction';
import { OverWorld } from "./components/overworld.js"



const canvas = document.querySelector('canvas.abc')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


let overworld = new OverWorld(renderer);



const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)


scene.add(mesh)


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)



renderer.setSize(sizes.width, sizes.height)
renderer.autoClear = false;

function animate() {
    mesh.rotation.x -= 0.01;
    mesh.rotation.y -= 0.01;
}


/**
 * Renderer
 */



updateRender();



function updateRender() {

    requestAnimationFrame(updateRender);

    renderer.clear();

    animate();
    renderer.render(scene, camera);

    renderer.clearDepth();
    overworld.animate();
    overworld.render();
}



const interaction = new Interaction(renderer, scene, camera);

mesh.cursor = 'pointer';
mesh.on('click', function (ev) { console.log("aaaaa"); });



// var options = {
//     x: 0,
//     y: 0,
//     stop: function () {
//         this.x = 0;
//         this.y = 0;
//     }

// }


// const gui = new GUI()

// var position = gui.addFolder('Position');
// position.add(options, 'x', -0.2, 0.2).name('X').listen();
// position.add(options, 'y', -0.2, 0.2).name('Y').listen();
// position.open();




// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// let selectedObjects = [];
// let composer, outlinePass;


// composer = new EffectComposer( renderer );

// outlinePass = new OutlinePass( new THREE.Vector2( sizes.width, sizes.height ), scene, camera );

// outlinePass.edgeStrength = 100;
// outlinePass.edgeThickness = 100;
// outlinePass.visibleEdgeColor.set( '#ffffff' );
// outlinePass.hiddenEdgeColor.set( '#190a05' );
// composer.addPass( outlinePass );

// composer.setSize(sizes.width, sizes.height);

// //renderer.domElement.addEventListener('pointermove', onPointerMove);
// //renderer.domElement.addEventListener('pointerdown', onClick);


// function addSelectedObject(object) {

//     selectedObjects = [];
//     selectedObjects.push(object);

// }

// function onPointerMove(event) {


//     if (event.isPrimary === false) return;

//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//     checkIntersection();


// }


// function checkIntersection() {

//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObject(scene, true);

//     if (intersects.length > 0) {

//         const selectedObject = intersects[0].object;
//         addSelectedObject(selectedObject);
//         outlinePass.selectedObjects = selectedObjects;
//         console.log("aaaa");
//     } else {

//         // outlinePass.selectedObjects = [];

//     }

// }

// function onClick() {



// }

