
//skilgreining á leikhlutum: kallinum(myGamePice), hindrun(myObstacle), bakgrunnur(myBackground), stigatafala(myScore)
var myGamePiece;
var myObstacle;
var myBackground;
var myScore;



// hér eru uppharsgildi leikhlutarnir skilgreindir með fallinu component
function startGame() {
    myGamePiece = new component(30, 30, "happy.png", 10, 120, "image");
    myObstacle = new component(10,100,"black",300,180)
    myBackground = new component(656, 270, "Black_sand_beach,_Iceland.jpg", 0, 0, "image");
    myScore = new component("20px", "Consolas", "black", 280, 40, "text");
    // hér fyrir neðan er upphafssvæðið gert í canvas og leikja lúbban keyrir í gang 
    myGameArea.start();
}


//þetta fall er fyrir leikjasvæðið 
var myGameArea = {
    canvas : document.createElement("canvas"),
    //start býr til leikjasvæðið í upphafi
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
        // clear hreinsar leikjasvæðið
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // stop stopar leikjasvæðið
    stop : function() {
        clearInterval(this.interval);
    }
}


// fall sem býr til alla leikhlutina, breytir þeim og færir þá til
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    //crashWith athugar hvort þú ert að klessa á annan hlut 
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    //ef botnin á hlutnum er undir topnum á hinum hlutnum o.s.frv þá er árekstur þá true
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
  
  // þetta fall uppfærir leikhlutana 
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            //hér myndin á leikhlutanum teiknuð uppá nýt á nýjum stað
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }  else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //nýji staðurinn reiknaður fyrir leikhlutan miðað við hraðanum sem hann er á 
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;    
        if (this.x < 0){
            this.x = 480;
        }    
        if (this.x > 480){
            this.x = 0;
        }
        if (this.y < 0){
            this.y = 270;
        }
        if (this.y > 270){
            this.y = 0;
        }
    }    

}
// fall sem uppfærir leikjasvæðið
function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
    } else {
        myGameArea.clear();
        myGameArea.frameNo +=1; 
        myBackground.newPos();    
        myBackground.update();
        myObstacle.update();
        myScore.text = "Stig:" + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();    
        myGamePiece.update();
    }
}
//ákveður hvaða átt kallinn fer og setur angry look á hann
function move(dir) {
    myGamePiece.image.src = "angry.png";
    if (dir == "up") {myGamePiece.speedY = -1; }
    if (dir == "down") {myGamePiece.speedY = 1; }
    if (dir == "left") {myGamePiece.speedX = -1; }
    if (dir == "right") {myGamePiece.speedX = 1; }
}
//þetta er fallið sem er notað þegar er ekki verið að ýta á pílurnar þá er happy andlitið notað og hluturinn verður kurr.
function clearmove() {
    myGamePiece.image.src = "happy.png";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}