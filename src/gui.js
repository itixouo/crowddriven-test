
import * as THREE from 'three'
import { Interaction } from 'three.interaction';
import Icon from './images/icon.svg';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const sceneUI = new THREE.Scene()



const cameraUI = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
cameraUI.position.z = 1

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)


sceneUI.add(mesh)
sceneUI.add(cameraUI)


renderer.clearDepth();
renderer.render(sceneUI, camera)










// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// let cameraUI, sceneUI, rendererUI;


// let icon;

// const canvasUI = document.querySelector('canvas.gui')
// sceneUI = new THREE.Scene()
// rendererUI = new THREE.WebGLRenderer({
//     canvas: canvasUI
// })

// //const interaction = new Interaction(rendererUI, sceneUI, cameraUI);



// cameraUI = new THREE.OrthographicCamera(- sizes.width / 2, sizes.width / 2, sizes.height / 2, - sizes.height / 2, 1, 10);
// cameraUI.position.z = 10;






// const map = new THREE.TextureLoader().load( Icon );
// const material = new THREE.SpriteMaterial( { map: map} );



// icon = new THREE.Sprite(material);
// icon.center.set( 0.0, 1.0 );
// icon.scale.set( 0.3, 0.3, 0.3 );
// sceneUI.add( icon );

// icon.cursor = 'pointer';
// icon.on('click', function(ev) { console.log("ccccc");   });



// rendererUI.setSize(sizes.width, sizes.height)
// rendererUI.render(scene, camera)































// import * as PIXI from 'pixi.js';
// import Icon from './images/icon.svg';

// // The application will create a renderer using WebGL, if possible,
// // with a fallback to a canvas render. It will also setup the ticker
// // and the root stage PIXI.Container
// const app = new PIXI.Application({ 
//     width: 100, 
//     height: 100,
//     transparent: true 

// });

// // The application will create a canvas element for you that you
// // can then insert into the DOM
// //document.getElementById('gui').appendChild(app.view);
// document.getElementById('gui').appendChild(app.view);


// // create a new Sprite from an image path
// const icon = PIXI.Sprite.from(Icon);


// // center the sprite's anchor point
// icon.anchor.set(0.5);

// // move the sprite to the center of the screen
// icon.x = app.screen.width /2;
// icon.y = app.screen.height / 2;
// icon.scale.x = 0.2;
// icon.scale.y = 0.2;
// icon.on('pointerdown', onClick);

// icon.interactive = true;
// icon.buttonMode = true;



// app.stage.addChild(icon);

// // Listen for animate update
// app.ticker.add((delta) => {

//    // icon.rotation += 0.1 * delta;


// });


// function onClick() {
//     console.log("bbbb");
// }
