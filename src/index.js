
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
    },
    {
        name: "monitoni_price_64mm_100mm",
        width: 100,
        height: 64,
        index: 2
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
    updateLabLineBreaks()

    document.getElementById('date').value = formattedDate   // set date default
    // buttons 
    document.getElementById('printButton').addEventListener('click', function () {
        console.log("trying to print")
        printCanvas()
    });
    // 

    document.getElementById('sizeChange').addEventListener('change', function (event) {
        console.log("change size")
        let selectedIndex = parseInt(event.target.value);
        setUpSize(selectedIndex);
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

    const inputDelegate = delegate('input[type=text], textarea');

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

    window.addEventListener('resize', () => {
        updateLabLineBreaks();
        if (url) {
            updateQRCode(url);
        }
    });
}

function updateLabLineBreaks() {
    const labText = document.querySelector('.lab b');
    if (!labText) {
        return;
    }

    const variants = [
        'PHYSICAL COMPUTING LAB',           // 1 line
        'PHYSICAL<br>COMPUTING<br>LAB'      // 3 lines (fallback)
    ];

    for (let variant of variants) {
        labText.innerHTML = variant;
        // Force layout recalculation multiple times to ensure browser recalculates
        labText.offsetHeight;
        labText.offsetHeight;

        // Check if content is overflowing visually
        const isOverflowing = labText.scrollWidth > labText.clientWidth ||
            labText.scrollHeight > labText.clientHeight;

        if (!isOverflowing) {
            return; // This variant fits, we're done
        }
    }

    // Fallback to last variant if nothing else fits
    labText.innerHTML = variants[variants.length - 1];
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

    let qrWidth = 145;
    if (currentSize.name === 'monitoni_price_64mm_100mm') {
        const qrContainer = document.querySelector('.monitoni_price_64mm_100mm .header');
        if (qrContainer) {
            qrWidth = Math.floor(qrContainer.clientWidth - 24);
        }
    }

    QRCode.toCanvas(canvas, text, {
        width: qrWidth, margin: 0
    }, function (error) {
        console.log('no QR code generated');
    })
}

function goToUrl() {
    console.log("go to: " + url);
    window.open(url, '', 'width=800, height=400');
}

function setUpSize(index) {

    // If no index provided, use the current size index
    if (index === undefined) {
        index = currentSize.index;
    }

    currentSize = sizes[index];

    //remove old style
    document.getElementById("labelContainer").classList.remove('large_62mm_100mm');
    document.getElementById("labelContainer").classList.remove('small_29mm_62mm');
    document.getElementById("labelContainer").classList.remove('monitoni_price_64mm_100mm');


    let label = document.getElementById('sizeLabel');
    label.innerHTML = '';
    label.innerHTML = currentSize.name;
    // change size



    // add new style 

    document.getElementById("labelContainer").classList.add(currentSize.name);

    updateLabLineBreaks();

    // Update QR code size for the new format
    let urlText = document.getElementById("url");
    if (urlText && urlText.value) {
        updateQRCode(urlText.value);
    }
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