var QRCode = require('qrcode')

export const sketch = (p) => {
  let font;
  let project = "Phonoluminescent Paper"
  let material = "Exhibition Prototype"
  let contact = "L.Franzke";
  let year = "2022"; 
  let htmlString = "https://github.com/IAD-ZHDK/ReactiveSigns_2023"
  let vw;
  let vh;
  let qrImg;
  let tagDiv;
  let img;
  let cellsize = 15;
let marginsize = 40;
  

    /////////////////////////
    /// P5 Events
    ///////////////////////

    p.preload = function () {
        font = p.loadFont('/assets/fonts/OCRAM.ttf');
    }

    p.setup = function () {
        console.log("new sketch")
        let cnv = p.createCanvas(62*15, 29*15);
        cnv.id('p5Canvas');
        vw = p.width/100;
        vh = p.height/100;
        p.textFont(font);
        p.textAlign(p.LEFT);
        p.textSize(vh*7);
        //tagDiv = createDiv();
        //tagDiv.position(marginsize, marginsize);
        p.imageMode( p.CORNER);
        QRCode.toDataURL(htmlString, function (err, qrImg) {
            console.log(qrImg)
            img = p.loadImage(qrImg);
          })
       
    }

    p.draw = function () {
        p.background(255,255,255);
        p.noStroke();
        //
        p.image(img,p.width-img.width,0)
        p.translate(vh*5,vw*5)
        p.text("PROJECT: \n"+project, 0,0)
        p.text("MATERIAL: \n"+material, 0,vh*25)
        p.text("CONTACT: \n"+contact, 0,vh*50)
        // 
   
      //  p.text(htmlString, vw*70,vh*60)
        //
    }

    p.windowResized = function () {
    }
    p.keyPressed = function () {

        if (p.key == "r" || p.key == "R") {
           
        }

      }

      function makeQR(){
        let qr = QRCode(0, 'L');
        qr.addData(htmlString);
        qr.make();
        qrImg = qr.createImgTag(cellsize, marginsize, "qr code");
        console.log(qrImg);
      }
      
}