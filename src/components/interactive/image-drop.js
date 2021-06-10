import '../../style/interactive/image-drop.css'
import interactive from './image-drop.html';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { Interaction } from 'three.interaction';


let camera, scene, renderer;
var textureLoader = new THREE.TextureLoader();
let items = [];
let pieces = [];
let piecesData = [];
let controls
let round,maxRound = 0;

const topMargin = -1.3;
const zDepth = 0.2;


let onTaskComplete;
let onAllTaskComplete;

function init(_renderer, width, height) {


    renderer = _renderer;

 


    camera = new THREE.PerspectiveCamera(40, width / height, 1, 500);
    camera.position.z = 10;


    scene = new THREE.Scene();
    scene.add(camera)


    round = 0;
    setupScene();

    renderer.setSize(width, height);
    render();


}

function initCallback( _onTaskComplete , _onAllTaskComplete) {
    onTaskComplete = _onTaskComplete;
    onAllTaskComplete = _onAllTaskComplete;
}


function initRule(_maxRound , _level) {
    maxRound = _maxRound;
}


function setupScene(){

    
 
    if (scene != undefined) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }

    }

    round++;

    items = [];
    pieces = [];
    piecesData = [];






    const map = textureLoader.load('images/interactive/box.png', function (texture) {



        const gridWidth = 4;
        const gridHeight = 5;


        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {

                // const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.1)
                // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
                // const mesh = new THREE.Mesh(geometry, material)

                const materialC = new THREE.SpriteMaterial({ map: texture.clone() });
                materialC.map.needsUpdate = true;
                //materialC.map.offset.set((x)/(gridWidth), (y)/(gridHeight)  );
                materialC.map.offset.set(x / gridWidth, (y) / (gridHeight));
                materialC.map.repeat.set(0.2, 0.2);


                let spriteC = new THREE.Sprite(materialC);

                spriteC.center.set(0.5, 0.5);
                spriteC.position.x = 1;
                spriteC.position.y = 0;
                spriteC.position.z = 0;
                let scale = 0.01;
                spriteC.scale.set(0.95, 0.95, 1);

                spriteC.position.x = x - 2 + 0.5;
                spriteC.position.y = y - 2 + 0.5 + topMargin;

                scene.add(spriteC)

                items.push(spriteC);

            }
        }


        while (pieces.length < 4) {


            var item = items[Math.floor(Math.random() * items.length)];

            if (!pieces.includes(item)) {

                let end = new THREE.Vector3(item.position.x, item.position.y, zDepth);

                item.position.x = (pieces.length * 1.2) - 2.4 + 0.6;
                item.position.y = 2.6;
                item.position.z = zDepth;
                pieces.push(item);

                let start = new THREE.Vector3(item.position.x, item.position.y, zDepth);

                let data = {
                    start: start,
                    destination: end,
              
                };


                piecesData.push(data);
            }

        }

        controls = new DragControls(pieces, camera, renderer.domElement);

        controls.addEventListener('dragstart', dragstart);

        controls.addEventListener('drag', drag);

        controls.addEventListener('dragend', dragend);

        render();


    });






}




function render() {

    renderer.render(scene, camera);

}
function clear() {


}
function destroy() {

    // BufferGeometry.dispose();
    // Material.dispose();
    // Texture.dispose();
    // WebGLRenderTarget.dispose();
}


function getRound(){
    return round;
}


export { init, render , initCallback , initRule, setupScene , getRound, destroy  };









function checkResult(){

    
    let isPass = pieces.length == 0;
    return isPass;
}


function dragstart(event) {

 
}

function drag(event) {
    render();
}

function dragend(event) {

    let index = pieces.indexOf(event.object);
    let data = piecesData[index];


    let d = data.destination.distanceTo(event.object.position);


    if (d < 0.2) {

        event.object.position.x = data.destination.x;
        event.object.position.y = data.destination.y;
        event.object.position.z = 0;

        pieces.splice(index , 1);
        piecesData.splice(index , 1);
    } else {

        event.object.position.x = data.start.x;
        event.object.position.y = data.start.y;
        event.object.position.z = data.start.z;

    }

    render();


    if(checkResult()){

        if(round >= maxRound){
            if(onAllTaskComplete != undefined){
                onAllTaskComplete();
              
            }
    
        }else{
            if(onTaskComplete != undefined){
                onTaskComplete();
                setupScene();
            }
    
        }
       
    }

}




