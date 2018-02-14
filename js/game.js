var mapWidth=10;
var mapHeight=23;
var map=[];
var colormap=[];
var cleanLine=0;
var Timer=setInterval(draw,80);
var speed=0;
var level=5;
var gameOver=false;
var m=document.querySelector('.map'); 
var no=document.querySelector('.nocell'); 
 m.style.width=mapWidth*4+'vh';
 m.style.height=mapHeight*4+'vh';  
no.style.width=mapWidth*4+'vh';
no.style.height=4+'vh';  
  for (var i = 0; i <mapWidth* mapHeight; i++) {
  	var div=document.createElement('div');
	div.className='cell'; 
  	m.appendChild(div);
  	map.push(0);

  }
var cells=document.querySelectorAll('.cell'); 
var terisShape=[	['00','10','01','11'],
  					['00','10','20','30'],['00','01','02','03'],
  					['00','10','11','21'],['10','01','11','02'],
  					['10','20','01','11'],['00','01','11','12'],
  					['00','01','02','12'],['00','10','20','01'],['00','10','11','12'],['20','01','11','21'],
  					['10','11','02','12'],['00','01','11','21'],['00','10','01','02'],['00','10','20','21'],
  					['00','10','20','11'],['10','01','11','12'],['10','01','11','21'],['00','01','11','02']
  					];
var terisShapeIndex=[[0],[1,2],[3,4],[5,6],[7,8,9,10],[11,12,13,14],[15,16,17,18]]; 
var colors=["color_red","color_blue","color_yellow","color_green","color_pink","color_orange","color_lightblue"];
var randomNumber=Math.floor(Math.random()*7); 
 function tetrisBlock(n) { 
  	this.shape=terisShapeIndex[n];
  	this.color=n;
  	this.x=[];
  	this.y=[];
  	this.index=Math.floor(Math.random()*this.shape.length);
  	var tmp=terisShape[terisShapeIndex[n][this.index]];
  	for (var i = 0; i < 4; i++) {
  		this.x.push(parseInt(tmp[i][0])+5);
  		this.y.push(parseInt(tmp[i][1]));
  	} //	console.log(this);
  }

var teris=new tetrisBlock(randomNumber);

document.addEventListener("keydown",keydownHandler);
function keydownHandler(e){
	e.preventDefault();
	//console.log(e.keyCode);
	if (e.keyCode==37) {
		moveLeft();
	}else if (e.keyCode==39) {
		moveRight();
	}else if (e.keyCode==38) {
		rotate();
	}else if (e.keyCode==40) {
		down();
	}else if (e.keyCode==32) {
		 if (!gameOver) {
	var shadow=0;
	var canshadow=true;
		do{
			 shadow++;
			 canshadow=true;
  			for (var i = 0; i <4; i++) {
	  			if(teris.y[i]+shadow==mapHeight||map[teris.x[i]+(teris.y[i]+shadow)*mapWidth]==1){
	  				canshadow=false;
	  			}
  			}
  			
		}while(canshadow);
		
		for (var i = 0; i < 4; i++) {
			teris.y[i]=teris.y[i]+shadow-1;
		}
	}
	}
}

function moveRight(){
 var canmove=true;
  		for (var i = 0; i <4; i++) {
  			if(teris.x[i]>=mapWidth-1||map[teris.x[i]+1+teris.y[i]*mapWidth]==1){
  				canmove=false;
  			}
  		}
  	if (canmove) {
  		for (var i = 0; i < 4; i++) {
  			teris.x[i]++;
  		}
}}

function moveLeft(){
 var canmove=true;
  		for (var i = 0; i <4; i++) {
  			if(teris.x[i]<=0||map[teris.x[i]-1+teris.y[i]*mapWidth]==1){
  				canmove=false;
  			}
  		}
  	if (canmove) {
  		for (var i = 0; i < 4; i++) {
  			teris.x[i]--;
  		}

}}
function rotate(){
	var num=teris.shape[(teris.index+1)%teris.shape.length];
	var canmove=[true,true,true,true];
	for (var j = 0; j < 4; j++) {
	for (var i = 0; i < 4; i++) {
		var newX=teris.x[j]+parseInt(terisShape[num][i][0]);
		var newY=teris.y[j]+parseInt(terisShape[num][i][1]);
		if (newX>=mapWidth||newY>=mapHeight|| map[newX+newY*mapWidth]==1) {
			canmove[j]=false;
		}
	}
	}
	for (var j = 0; j < canmove.length; j++) {
		if (canmove[j]) {
			teris.index=(teris.index+1)%teris.shape.length;
			var tmpX=teris.x[j];
			var tmpY=teris.y[j];
			for (var i = 0; i < 4; i++) {
				teris.x[i]=tmpX+parseInt(terisShape[num][i][0]);
				teris.y[i]=tmpY+parseInt(terisShape[num][i][1]);

			} 
		break;

		}
	}
}
 
  function down(){ 
  	 var canmove=true;
  		for (var i = 0; i <4; i++) {
  			if(teris.y[i]>=mapHeight-1||map[teris.x[i]+(teris.y[i]+1)*mapWidth]==1){
  				canmove=false;
  			}
  		}
  	if (canmove) {
  		for (var i = 0; i < 4; i++) {
  			teris.y[i]++;
  		}
  	}else{
  		for (var i = 0; i <4; i++) {
  			map[teris.x[i]+teris.y[i]*mapWidth]=1;
  			colormap[teris.x[i]+teris.y[i]*mapWidth]=teris.color;
  		}
  		 
  		randomNumber=Math.floor(Math.random()*7);
  		teris=new tetrisBlock(randomNumber); 
  	} 
  }

function draw(){
 
	clearLine(); 
	for (var i = 0; i < mapWidth*2; i++) {
		if(map[i]==1){
			gameover();
		}
	}

	if (!gameOver) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].className="cell"
			if (map[i]==1) {
				cells[i].classList.add(colors[colormap[i]]);
			}
		}
		for (var i = 0; i < 4; i++) { 
			cells[teris.x[i]+teris.y[i]*mapWidth].classList.add(colors[teris.color]);
		}
	 
		var shadow=0;
		var canshadow=true;
			do{
				shadow++;
				 canshadow=true;
	  			for (var i = 0; i <4; i++) {
		  			if(teris.y[i]+shadow==mapHeight||map[teris.x[i]+(teris.y[i]+shadow)*mapWidth]==1){
		  				canshadow=false;
		  			}
	  			} 
			}while(canshadow);

			for (var i = 0; i < 4; i++) { 
			cells[teris.x[i]+(teris.y[i]+shadow-1)*mapWidth].classList.add("cellshadow");
			}
	}

speed++;
if (speed%level==0) {down();}
if (level>0) {
	if (cleanLine>10) {level=4;}
	if (cleanLine>25) {level=3;}
	if (cleanLine>40) {level=2;}
	if (cleanLine>50) {level=1;}
}


}
function gameover(){
	clearInterval(Timer);
	gameOver=true;
}
function clearLine(){
	var clear=true;
	for (var i = 0; i < mapHeight; i++) {
		for (var j = 0; j < mapWidth; j++) {
			if (map[i*mapWidth+j]==0) {
				clear=false;
			}
		} 
		if (clear) {
			map.splice(i*mapWidth, mapWidth);
			colormap.splice(i*mapWidth,mapWidth);
				for (var m = 0; m <mapWidth; m++) {
					map.unshift(0);
					colormap.unshift(8); 
				}
			cleanLine++;
			document.querySelector(".score span").innerHTML=cleanLine*100;

		}

		clear=true;
	}
}