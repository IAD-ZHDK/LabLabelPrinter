
import html2canvas from 'html2canvas';

var QRCode = require('qrcode')
let print = document.createElement('button')

//  import of styles
import '@/styles/index.scss'

let url;
document.addEventListener("DOMContentLoaded", DOMContentLoadedEvent, false)

async function DOMContentLoadedEvent() {
    /*
    const containerElement = document.getElementById('p5container')
    if (containerElement) {
        console.log("new sketch");
        new P5(sketch, containerElement);
    }
    */
    //containerElement.onclick = function() {printCanvas()};

    // document.getElementById('p5container').innerHTML = '<button id="printButton">Print</button>';
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    document.getElementById('date').value = formattedDate   // set date default
    document.getElementById('printButton').addEventListener('click', function () {
        console.log("trying to print")
        printCanvas()
    });
    let urlText = document.getElementById("url");
    updateQRCode(urlText.value)
    urlText.addEventListener("change", (event) => {
        updateQRCode(urlText.value)
    });
    let canvas = document.getElementById('qrCode')
    canvas.addEventListener('click', (event) => { goToUrl() });
    canvas.style.cursor = "pointer";


    urlText.addEventListener("change", (event) => {
        updateQRCode(urlText.value)
    });

    const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);

    const inputDelegate = delegate('input[type=text]');

    ['input', 'change'].forEach(function (evt) {
        document.body.addEventListener(evt, inputDelegate((el) => {
            console.log('focus in', el.target.value)
            if (el.target.value == null || el.target.value == "") {
                el.target.parentNode.classList.add("emptySpace");
            } else {
                el.target.parentNode.classList.remove("emptySpace");
            }
        }
        ));
    });
}

function updateQRCode(text) {
    let canvas = document.getElementById('qrCode')
    if (text == null || text == "") {
        console.log("no text")
        canvas.style.display = "none";
    } else {
        canvas.style.display = "block";
    }

    url = text;
    let QRCode = require('qrcode')
    QRCode.toCanvas(canvas, text, {
        width: 145, margin: 0
    }, function (error) {
        if (error) console.error(error)
        console.log('success!');
    })
}

function goToUrl() {
    console.log("go to: " + url);
    window.open(url, '', 'width=800, height=400');
}

function printCanvas() {

    let container = document.getElementById('wrapper');

    html2canvas(container).then(function (canvas) {
        //   document.body.appendChild(canvas);
        var dataUrl = canvas.toDataURL(); //attempt to save base64 string to server using this var  
        console.log(dataUrl);
        var header_str = '<!DOCTYPE html>';
        header_str += '<html>'
        header_str += '<head><title>Print canvas</title><style>@page {size: 100mm 62mm; max-height:100%; max-width:100%} html{background: #000000;} body{margin: 0;} img{display: block; width: 100%; height: 100%;}</style></head>';
        header_str += '<body>'
        let new_str = '<img src="' + dataUrl + '">';
        //let new_str = document.getElementById('wrapper');
        let footer_str = '</body></html>';
        let windowContent = header_str + new_str + footer_str;
        var printWin = window.open('', '', 'width=1000, height=620');
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.print();
    });

}