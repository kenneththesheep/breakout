


//Global variable objets
var ctx=document.getElementById('ctx').getContext('2d');
ctx.font= '20px Calibri';
ctx.fillText('Click to start', 150, 250);
const WIDTH=500;
const HEIGHT=500;//constant width and height of canvas
var numOfTiles, tileList,tileX, tileY,score, intervalVar, hitCount;
var running=false;
var tileList=[];

var ball={
x:0,
y:0,
radius:5,
colour:'blue',
spdX:-5,
spdY:-5

};

var base={
    x:0,
    y:400,
    height:20,
    width:100,
    colour:'red',
    pressingLeft:false,
    pressingRight:false,
    lives:3
};

var tile={
    height:20,
    width:40,
    colour:'#1F802D'
};

document.getElementById('ctx').onmousedown=()=>{
    if(running){
        running=false;

        clearInterval(intervalVar);}
        startGame();
}

document.onkeydown=event=>{
    //console.log(event.keyCode);
if(event.keyCode===37){
    base.pressingLeft=true;
    base.pressingRight=false;
}
else if (event.keyCode===39){
    base.pressingLeft=false;
    base.pressingRight=true;
}
}

document.onkeyup=function(event){
    if(event.keyCode===37){
        base.pressingLeft=false;
    }else
    if(event.keyCode===39){
        base.pressingRight=false;
    }
}
//collision
testCollision=(base,ball)=>{
    return ( (base.x<ball.x+2*ball.radius)&&(ball.x<base.x+base.width)&&(base.y<ball.y+2*ball.radius)&&(ball.y<base.y+base.height));
}
testCollisionTile=(t,ball)=>{
    return ( (t.x<ball.x+2*ball.radius)&&(ball.x<t.x+tile.width)&&(t.y<ball.y+2*ball.radius)&&(ball.y<t.y+tile.height));
}
//drawing

drawBall=()=>{
    ctx.save();
    ctx.fillStyle=ball.colour;
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
    ctx.fill();
    ctx.restore();
}
drawBase=()=>{
    ctx.save();
    ctx.fillStyle=base.colour;
    ctx.fillRect(base.x,base.y,base.width,base.height);
    ctx.restore();
}
drawTile=(t,i)=>{
    ctx.save();
    ctx.fillStyle=tile.colour;
    ctx.fillRect(t.x,t.y,tile.width,tile.height);
    ctx.restore();
}
updateBasePosition=()=>
{
    if(base.pressingLeft){
        if((base.x-5)>=0){
                base.x=base.x-5;
        }
    }else
    if(base.pressingRight){


            if(base.x>WIDTH-base.width){
                    base.x=WIDTH-base.width;
                }
                else{
                    base.x=base.x+5;
                }
    }

}

updateBallPosition=()=>{
    ball.x+=ball.spdX;
    ball.y+=ball.spdY;
    if(ball.x>WIDTH||ball.x<0){

        hitCount++;
        if(hitCount%10===0){
            if(ball.spdX<0)
            {
                ball.spdX=-(Math.abs(ball.spdX)+1);
            }
            else{
            ball.spdX++;
            }
            }
        ball.spdX=-ball.spdX;;
    }
    else if(ball.y<0){
        hitCount++;
        if(hitCount%10===0){
            if(ball.spdY<0)
            {
                ball.spdY=-(Math.abs(ball.spdY)+1);
            }
            else{
            ball.spdY++;
            }
            }
        ball.spdY=-ball.spdY;;
    } else
    if(ball.y>HEIGHT){

        base.lives--;
        hitCount++;
                if(hitCount%2===0){
            if(ball.spdY<0)
            {
                ball.spdY=-(Math.abs(ball.spdY)+1);
            }
            else{
            ball.spdY++;
            }
            }
        ball.spdY=-ball.spdY;;
    }
}
//consitions
isGameover=()=>{
    if(base.lives<=0||score===330){
        clearInterval(intervalVar);
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.fillText('Game over. Click to restart',150,250);

    }
}

//movement

update=()=>{
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    tileList.forEach(drawTile);
    drawBall();
    drawBase();
    if(testCollision(base,ball)){
        ball.spdY=-ball.spdY;
    }
    for(key in tileList){
        if(testCollisionTile(tileList[key],ball)){
            delete tileList[key];
            ball.spdY=-ball.spdY;
            score+=5;
        }
    }
    ctx.fillText("Score "+score, 5, 490);
    ctx.fillText("Lives" + base.lives, 430, 490);
    isGameover();
    updateBasePosition();
    updateBallPosition();
}

//startGame
startGame=()=>{
    base.x=150;
    ball.x=base.x+100;
    ball.y=base.y-100;
    numOfTiles=0;
    score=0;
    base.lives=3;
    running=true;
    tileX=5;
    tileY=5;
    hitCount=0;
    tileList=[]
    for(var i=1;i<=6;i++){
        tileX=5;
        for(var j=1;j<=11;j++){
            tileList[numOfTiles]={x:tileX,y:tileY};
            numOfTiles++;
            tileX +=45;

        }
        tileY +=25;
    }
    intervalVar=setInterval(update,20);
}
//startGame();