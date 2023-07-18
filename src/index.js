import P5 from 'p5'; import { sketch } from '@/js/sketch'

// Test import of an asset
import webpackLogo from '@/images/webpack-logo.svg'

let print = document.createElement('button')

//  import of styles
import '@/styles/index.scss'
/*
// Appending to the DOM
const logo = document.createElement('img')
logo.src = webpackLogo

const heading = document.createElement('h1')
heading.textContent = "test"

// Test a background image url in CSS
const imageBackground = document.createElement('div')
imageBackground.classList.add('image')

// Test a public folder asset
const imagePublic = document.createElement('img')
imagePublic.src = '/assets/example.png'

const app = document.querySelector('#root')
app.append(logo, heading, imageBackground, imagePublic)
*/
document.addEventListener("DOMContentLoaded", DOMContentLoadedEvent, false)

async function DOMContentLoadedEvent() {
    const containerElement = document.getElementById('p5container')
    if (containerElement) {
        console.log("new sketch");
        new P5(sketch, containerElement);
    }
    //containerElement.onclick = function() {printCanvas()};

    // document.getElementById('p5container').innerHTML = '<button id="printButton">Print</button>';

    document.getElementById('printButton').addEventListener('click', function () {
        console.log("trying to print")
        printCanvas()
        //  printJS('p5Canvas', 'html')
        //   printJS({
        //       printable: 'p5Canvas', 
        //       type: 'html',
        //       style: '@page {size: 62mm 29mm; overflow: hidden} html{background: #000000;}',
        //   })
    });
}


function printCanvas() {
    
/*
    var header_str = '<html><head><title>' + document.title  + '</title></head><body>';
    var footer_str = '</body></html>';
    var new_str = document.getElementById('labelContainer').innerHTML;
    console.log(new_str);
    var old_str = document.body.innerHTML;
    document.body.innerHTML = header_str + new_str + footer_str;
    window.print();
    document.body.innerHTML = old_str;
    */

//For using html 5 canvas
    var dataUrl = document.getElementById('p5Canvas').toDataURL(); //attempt to save base64 string to server using this var  
    var header_str = '<!DOCTYPE html>';
    header_str += '<html>'
    header_str += '<head><title>Print canvas</title><style>@page {size: 62mm 29mm; max-height:100%; max-width:100%} html{background: #000000;} body{margin: 0;} img{display: block; width: 100%; height: 100%;}</style></head>';
    header_str += '<body>'
    let new_str = '<img src="' + dataUrl + '">';
    //let new_str = document.getElementById('wrapper');
    let footer_str = '</body></html>';
    
    let windowContent = header_str + new_str + footer_str;
    var printWin = window.open('', '', 'width=620, height=290');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();


 
}