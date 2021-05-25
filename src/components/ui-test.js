import '../style/page.css'
import page from './page/page.html';
import * as numberFinding from './interactive/number-finding.js';
import * as imageDrop from './interactive/image-drop.js';


document.getElementById('ui').innerHTML += page;

var interactive = document.getElementById('interactive-box');
imageDrop.init();




const aButton = document.getElementById("a-button");
aButton.addEventListener("click",()=>{

    numberFinding.init();

} );

const bButton = document.getElementById("b-button");
bButton.addEventListener("click",()=>{

    imageDrop.init();

} );
