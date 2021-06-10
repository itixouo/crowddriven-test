import * as THREE from 'three'
import '../style/page.css'
import page from './page/page.html';
import * as numberFinding from './interactive/number-finding.js';
import * as imageDrop from './interactive/image-drop.js';
import * as colorFill from './interactive/color-fill.js';

let interactiveRenderer;
let maxRound;

let selectedId = "";
let selectedInteractive;

const interactives = {
    "interactive1": colorFill,
    "interactive2": imageDrop
};


document.getElementById('ui').innerHTML += page;
const interactiveBox = document.getElementById('interactive');



init();
bind();

updateRender();




clearRender();
//imageDrop.init(interactiveRenderer);




// const aButton = document.getElementById("a-button");
// aButton.addEventListener("click", () => {


//     // clearRender();
//     // colorFill.init(interactiveRenderer, interactiveBox.offsetHeight * 0.75, interactiveBox.offsetHeight);
//     // activeEvents("main", false);
//     // activeEvents("interactive", true);
//     console.log(selectedId);


// });

// const bButton = document.getElementById("b-button");
// bButton.addEventListener("click", () => {


//     maxRound = 2;

//     clearRender();
//     imageDrop.init(interactiveRenderer, interactiveBox.offsetHeight * 0.75, interactiveBox.offsetHeight);
//     imageDrop.initCallback(onTaskComplete, onAllTaskComplete)
//     imageDrop.initRule(maxRound, 1);



//     document.getElementById("task-text").innerHTML = "&#10063; 0/" + maxRound;
// });


function onTaskComplete() {
    document.getElementById("task-text").innerHTML = "&#10063; " + selectedInteractive.getRound() + "/" + maxRound;

}
function onAllTaskComplete() {
    activeWindow("content", false);
    activeWindow("content-complete", true);

    activeWindow("token-text", false);
    activeWindow("task-text", false);
    activeWindow("bonus-box", false);

}



function init() {

    const canvas = document.querySelector('canvas.interactive');
    interactiveRenderer = new THREE.WebGLRenderer({
        canvas: canvas
    })

   // initPage();
    activeWindow("content", false);
    activeWindow("content-complete", false);

    activeWindow("token-text", false);
    activeWindow("task-text", false);
    activeWindow("bonus-box", false);
    activeWindow("dismiss-description", false);


    activeEvents("main", true);
    activeEvents("interactive", false);

}


function initInteractive(id) {

    selectedInteractive = interactives[id];
    selectedId = id;

    document.getElementById("description-title").innerHTML = id;
    initPage();
}

function initPage() {


    activeWindow("content", true);
    activeWindow("content-complete", false);

    activeWindow("token-text", false);
    activeWindow("task-text", false);
    activeWindow("bonus-box", false);

    activeWindow("dismiss-description", true);
    activeWindow("start-box", true);

    activeEvents("main", false);
    activeEvents("interactive", true);

}


function bind() {

  
    document.getElementById("dismiss-description").addEventListener("click", () => {
        activeWindow("content", false);
        activeEvents("main", true);
        activeEvents("interactive", false);

        activeWindow("dismiss-description", false);
        activeWindow("start-box", false);
    });

    document.getElementById("dismiss-complete").addEventListener("click",
        () => {

            selectedInteractive.destroy();

            activeWindow("content-complete", false);
            activeEvents("main", true);
            activeEvents("interactive", false);

            activeWindow("dismiss-description", false);
            activeWindow("start-box", false);

       
        }
    );

    document.getElementById("start-box").addEventListener("click",
        () => {
            startInteractive();
        }
    );

}

function activeWindow(id, isActive) {


    var element = document.getElementById(id);

    if (isActive) {

        element.style.visibility = "visible";

    } else {
        element.style.visibility = "hidden";
    }




}

function startInteractive() {


    maxRound = 2;

    clearRender();
    selectedInteractive.init(interactiveRenderer, interactiveBox.offsetHeight * 0.75, interactiveBox.offsetHeight);
    selectedInteractive.initCallback(onTaskComplete, onAllTaskComplete)
    selectedInteractive.initRule(maxRound, 1);



    document.getElementById("task-text").innerHTML = "&#10063; 0/" + maxRound;

    activeWindow("start-box", false);
    activeWindow("token-text", true);
    activeWindow("task-text", true);
    activeWindow("bonus-box", true);
    activeWindow("dismiss-description", false);
}


function fixRender() {

    console.log(interactiveBox.clientWidth);
    console.log(interactiveBox.clientHeight);
    interactiveRenderer.setSize(interactiveBox.offsetHeight * 0.75, interactiveBox.offsetHeight);
}

function clearRender() {
    interactiveRenderer.clear();
}

function updateRender() {

    requestAnimationFrame(updateRender);


}


function activeEvents(id, isActive) {
    var element = document.getElementById(id);

    if (isActive) {
        if (element.classList != null) {
            element.classList.remove("disable-events");
        }
    } else {
        element.classList.add("disable-events");
    }



}


export { initInteractive, startInteractive };

