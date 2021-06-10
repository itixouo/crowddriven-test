import '../../style/interactive/image-drop.css'
import interactive from './image-drop.html';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { InteractionManager } from "three.interactive";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


let camera, scene, renderer;
let composer, renderPass, bloomPass, glitchPass;



var textureLoader = new THREE.TextureLoader();
let interaction, interactionManager;
let round, maxRound = 0;

const raycaster = new THREE.Raycaster();
const fillWidth = 2;
const fillHeight = 3;
const topMargin = 1;

let onTaskComplete;
let onAllTaskComplete;

let colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
let namecolors = ["red", "green", "blue", "yellow"];
let fillObjects = [];
let percentcolors, cumulativePercent, indexcolors;
let selectedIndex, positionIndex, selectedDirection;
let fillSpeed = 0.01;


function init(_renderer, width, height) {


    renderer = _renderer;



    camera = new THREE.PerspectiveCamera(40, width / height, 1, 500);
    camera.position.z = 10;





    scene = new THREE.Scene();
    scene.add(camera)



    //Effect region
    composer = new EffectComposer(renderer);
    renderPass = new RenderPass(scene, camera);

    bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85, 1);
    bloomPass.threshold = 0;
    bloomPass.strength = 1.2;
    bloomPass.radius = 0;

    composer.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(bloomPass);


    interactionManager = new InteractionManager(renderer, camera, renderer.domElement);
    //interactionManager.dispose();
    // interaction = new Interaction(renderer, scene, camera);

    // window.addEventListener( 'mousedown', ()=>{     }, false );
    // window.addEventListener( 'mouseleave', ()=>{     }, false );
    // window.addEventListener( 'mouseup', ()=>{     }, false );




    round = 0;
    setupScene();

    renderer.setSize(width, height);
    render();


}


function initCallback(_onTaskComplete, _onAllTaskComplete) {
    onTaskComplete = _onTaskComplete;
    onAllTaskComplete = _onAllTaskComplete;
}


function initRule(_maxRound, _level) {
    maxRound = _maxRound;
}


function setupPostProcessing() {



}


function setupScene() {


    
    if (scene != undefined) {
        while (scene.children.length > 0) {
            interactionManager.remove(scene.children[0]);
            scene.remove(scene.children[0]);
        }

    }


    round++;
    positionIndex = 0;
    selectedIndex = 0;
    selectedDirection = 0;


    percentcolors = [10, 20, 30, 40];
    shuffleArray(percentcolors);

    indexcolors = [0, 1, 2, 3];
    shuffleArray(indexcolors);

    cumulativePercent = percentcolors.map((sum => value => sum += value)(0));
    cumulativePercent.unshift(0);


    const geometry = new THREE.BoxGeometry(fillWidth, fillHeight, 0.1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const mesh = new THREE.Mesh(geometry, material)



    //scene.add(mesh);




    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 100, linecap: 'round' }));

    line.position.x = 0;
    line.position.y = topMargin;
    scene.add(line);

    //scene.add(new THREE.AmbientLight(0x404040));

    //scene.add(mesh)


    setupHint();





    const map = textureLoader.load('images/interactive/arrow.png', function (texture) {




        for (let x = 0; x < 4; x++) {


            // const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.1)
            // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
            // const mesh = new THREE.Mesh(geometry, material)

            let index = x;
            let color = colors[x];

            const materialC = new THREE.SpriteMaterial({ map: texture.clone(), color: color });
            materialC.map.needsUpdate = true;
            //materialC.map.offset.set((x)/(gridWidth), (y)/(gridHeight)  );
            materialC.map.offset.set(0.1, 0.05);
            //materialC.map.repeat.set(0.2, 0.2);


            let spriteC = new THREE.Sprite(materialC);

            spriteC.center.set(0.5, 0.5);

            let scale = 0.01;
            spriteC.scale.set(1, 1, 1);

            spriteC.position.x = (x * 1.2) - 2.4 + 0.6;
            spriteC.position.y = -2;
            spriteC.position.z = 0.1;


            // spriteC.on('mousedown',()=>{
            //     setScaleDirection(1);
            //     setIndex(index);
            //     mousedown();
            // } );
            // spriteC.on('mouseup', mouseup);
            // spriteC.on('mouseout', mouseup);

            interactionManager.add(spriteC);

            spriteC.addEventListener('mousedown', () => {
                setScaleDirection(1);
                setIndex(index);
                mousedown();
            });
            spriteC.addEventListener('mouseup', mouseup);
            spriteC.addEventListener('mouseout', mouseup);


            scene.add(spriteC)


        }


        for (let x = 0; x < 4; x++) {


            // const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.1)
            // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
            // const mesh = new THREE.Mesh(geometry, material)
            let index = x;
            let color = colors[x];

            const materialC = new THREE.SpriteMaterial({ map: texture.clone(), color: color });
            materialC.map.needsUpdate = true;
            //materialC.map.offset.set((x)/(gridWidth), (y)/(gridHeight)  );
            materialC.map.offset.set(0.1, 0.05);
            //materialC.map.repeat.set(0.2, 0.2);


            let spriteC = new THREE.Sprite(materialC);

            spriteC.center.set(0.5, 0.5);


            let scale = 0.01;
            spriteC.scale.set(1, 1, 1);

            spriteC.position.x = (x * 1.2) - 2.4 + 0.6;
            spriteC.position.y = -3;
            spriteC.position.z = 0.1;
            spriteC.material.rotation = Math.PI;


            interactionManager.add(spriteC);

            spriteC.addEventListener('mousedown', () => {
                setScaleDirection(-1);
                setIndex(index);
                mousedown();
            });
            spriteC.addEventListener('mouseup', mouseup);
            spriteC.addEventListener('mouseout', mouseup);



            // spriteC.on('mousedown',()=>{
            //     setScaleDirection(-1);
            //     setIndex(index);
            //     mousedown();
            // } );
            // spriteC.on('mouseup', mouseup);
            // spriteC.on('mouseout', mouseup);

            scene.add(spriteC)

        }

        render();
    
    });


}



function setupHint() {



    positionIndex = 0;
    let position = 0;
    fillObjects = [];


    const map = textureLoader.load('images/white.png', function (texture) {


        for (let i = 0; i < percentcolors.length; i++) {

            let height = fillHeight * percentcolors[i] * 0.01
            let color = colors[indexcolors[i]];
            //let color = colors[i];

            const materialC = new THREE.SpriteMaterial({ map: texture.clone(), color: color });
            materialC.map.needsUpdate = true;

            materialC.map.offset.set(1, 1);
            materialC.opacity = 0.2;

            let spriteC = new THREE.Sprite(materialC);

            spriteC.center.set(0.5, 0);


            spriteC.scale.set(fillWidth, height, 1);

            spriteC.position.x = 0;
            spriteC.position.y = topMargin + position - (fillHeight / 2)
            spriteC.position.z = 0;
            position += height;


            scene.add(spriteC)
        }

        position = 0;
        for (let i = 0; i < percentcolors.length; i++) {

            let height = fillHeight * percentcolors[i] * 0.01
            let color = colors[indexcolors[i]];

            //let color = colors[i];

            const materialC = new THREE.SpriteMaterial({ map: texture.clone(), color: color });
            materialC.map.needsUpdate = true;

            materialC.map.offset.set(1, 1);


            let spriteC = new THREE.Sprite(materialC);

            spriteC.center.set(0.5, 0);

            spriteC.scale.set(fillWidth, 0, 1);

            spriteC.position.x = 0;
            spriteC.position.y = topMargin + position - (fillHeight / 2)
            spriteC.position.z = 0.01;
            position += height;



            spriteC.name = namecolors[indexcolors[i]];
            spriteC.layers.enable(0);
            fillObjects.push(spriteC);


            scene.add(spriteC)



        }



        render();


    });












}



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function render() {

   // interactionManager.update();
    // renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.clear();
    camera.layers.set(1);
    composer.render();
    renderer.clearDepth();
    camera.layers.set(0);
    renderer.render(scene, camera);
}
function clear() {


}
function destroy() {
    // BufferGeometry.dispose();
    // Material.dispose();
    // Texture.dispose();
    // WebGLRenderTarget.dispose();

    // while (interactionObjects.length > 0) {
    //     console.log("Before : "+interactionObjects.children[0]);
    //     interactionObjects.children[0].off();
    //     console.log("After : "+interactionObjects.children[0]);
    //     interactionObjects.remove(interactionObjects.children[0]);
    // }



    interactionManager.dispose()
}


function getRound() {
    return round;
}


export { init, render, initCallback, initRule, setupScene, getRound, destroy };


let isHold = false;

function checkResult() {


    let isPass = false;
    let object = fillObjects[selectedIndex];
    let height = fillHeight * percentcolors[selectedIndex] * 0.01;


    let diff = Math.abs(object.scale.y - height);
    if (diff < 0.03) {
        isPass = true;
    }



    return isPass;
}

function setIndex(index) {
    selectedIndex = indexcolors.indexOf(index);
}
function setScaleDirection(dir) {
    selectedDirection = dir;
}

function mousedown(event) {

    if (positionIndex != selectedIndex) return;

    isHold = true;



    render();
    mousehold();

}

function mousehold() {

    if (isHold) {


        let object = fillObjects[selectedIndex];


        let max = (100 - cumulativePercent[positionIndex]) * fillHeight * 0.01;

   
        let newScale = THREE.MathUtils.clamp(object.scale.y + (selectedDirection * fillSpeed), 0, max);
        object.scale.y = newScale;

        //console.log(selectedIndex);

        requestAnimationFrame(mousehold);
        render();
    }

}


function mouseup(event) {

    if (!isHold) return;

    isHold = false;



    if (checkResult()) {

        let object = fillObjects[selectedIndex];
        let height = fillHeight * percentcolors[selectedIndex] * 0.01
        object.scale.y = height;

        fillObjects[selectedIndex].layers.enable(1);
        positionIndex++;

        if (positionIndex >= colors.length) {
            if (round >= maxRound) {
                if (onAllTaskComplete != undefined) {
                    onAllTaskComplete();

                }

            } else {
                if (onTaskComplete != undefined) {
                    onTaskComplete();
                    setupScene();
                }

            }
        }
    }














    render();












    // render();


    // if(checkResult()){

    //     if(round >= maxRound){
    //         if(onAllTaskComplete != undefined){
    //             onAllTaskComplete();

    //         }

    //     }else{
    //         if(onTaskComplete != undefined){
    //             onTaskComplete();
    //             setupScene();
    //         }

    //     }

    // }

}




