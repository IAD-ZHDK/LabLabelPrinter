
import html2canvas from 'html2canvas';

let QRCode = require('qrcode')
let print = document.createElement('button')
// sizes


let sizes = [
    {
        name: "large_62mm_100mm",
        width: 100,
        height: 62,
        index: 0
    },
    {
        name: "small_29mm_62mm",
        width: 62,
        height: 29,
        index: 1
    }
];

let currentSize = sizes[0];

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

    setUpSize()

    document.getElementById('date').value = formattedDate   // set date default
    // buttons 
    document.getElementById('printButton').addEventListener('click', function () {
        console.log("trying to print")
        printCanvas()
    });
    // 

    document.getElementById('sizeChange').addEventListener('click', function () {
        console.log("change size")
        setUpSize();
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
                console.log("empty space")
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

function setUpSize() {

    let index = currentSize.index;
    index++;


    if (index >= sizes.length) {
        index = 0;
    }

    currentSize = sizes[index];

    //remove old style
    document.getElementById("labelContainer").classList.remove('large_62mm_100mm');
    document.getElementById("labelContainer").classList.remove('small_29mm_62mm');


    let label = document.getElementById('sizeLabel'); 
    label.innerHTML = '';
    label.innerHTML = currentSize.name;
    // change size



    // add new style 

    document.getElementById("labelContainer").classList.add(currentSize.name);
}

function printCanvas() {

    let container = document.getElementById('wrapper');

    html2canvas(container).then(function (canvas) {

        var dataUrl = canvas.toDataURL(); //attempt to save base64 string to server using this var  
        console.log(dataUrl);
        var header_str = '<!DOCTYPE html>';
        header_str += '<html>'
        header_str += '<head><title>Print canvas</title><style>@page {size: ' + currentSize.width + 'mm ' + currentSize.height + 'mm; max-height:100%; max-width:100%} html{background: #000000;} body{margin: 0;} img{display: block; width: 100%; height: 100%;}</style></head>';
        header_str += '<body>'
        let new_str = '<img src="' + dataUrl + '">';
        //let new_str = document.getElementById('wrapper');
        let footer_str = '</body></html>';
        let windowContent = header_str + new_str + footer_str;
        var printWin = window.open('', '', 'width=' + currentSize.width * 10 + ', height=' + currentSize.height * 10);
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.print();
    });

}