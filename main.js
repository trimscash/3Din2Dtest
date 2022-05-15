let cameraAngle;//roll,pitch,yow
let starAngle;

let camera;
let stars=[];




let canvas;
let ctx;


let canvasWidth;
let canvasHeight;

$(() => {


	cameraAngle = new Angle(0, 0, 0);//roll,pitch,yow
	camera = new Camera(cameraAngle, 180, 180);//カメラの角度の初期値と，視野角


	for(let i=0;i<10;i++){
		stars.push(new Star(new Angle(getRand(-90, 90), getRand(-90, 90), getRand(-90, 90)),camera,10));
	}



	canvas = document.getElementById('mycanvas');
	ctx = canvas.getContext('2d');


	canvasWidth = canvas.width;
	canvasHeight = canvas.height;



	setInterval(()=>{
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		stars.forEach((e)=>{e.plot()});
	},300);
	drawCircle(10, 10, 10);
	console.log("aa");



	// $("#rollp").click(rollPlus(10));
	// $("#rollm").on('click', rollPlus(-10));
	// $("#pitchp").on('click', pitchPlus(10));
	// $("#pitchm").on('click', pitchPlus(-10));


});

function getRand(min,max){
	//min以上max未満　での乱数
	return (Math.floor(Math.random() * (max - min))) + min
}


function drawCircle(x, y, r) {
	ctx.fillStyle = '#ffffff'
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function rollPlus(x) {
	stars[0].camera.angle.roll += x;
	console.log("w");
}
function pitchPlus(x) {
	stars[0].camera.angle.pitch += x;
}


//わざわざクラスにした理由は特にないごめんね
class Angle {
	constructor(roll, pitch, yow) {
		this.roll = roll;
		this.pitch = pitch;
		this.yow = yow;
	}
}

class Camera {
	constructor(cameraAngle, xViewAngle, yViewAngle) {
		this.angle = cameraAngle;
		this.xViewAngle = xViewAngle;
		this.yViewAngle = yViewAngle;
	}
}

class Star {
	static camera;
	constructor(starAngle, camera, distance) {//distance:中心から天球への距離
		this.angle = starAngle;
		this.camera = camera;
		this.distance = distance;
	}

	plot() {
		this.angle.roll = this.angle.roll % (360);
		if (this.camera.xViewAngle / 2 <= Math.abs(this.angle.roll - this.camera.angle.roll) && Math.abs(this.angle.roll - this.camera.angle.roll) <= (360 - this.camera.xViewAngle / 2)) {
			return;
		}
		if (this.camera.yViewAngle / 2 <= Math.abs(this.angle.pitch - this.camera.angle.pitch) && Math.abs(this.angle.pitch - this.camera.angle.pitch) <= (360 - this.camera.yViewAngle / 2)) {
			return;
		}
		let x = (canvasWidth / 2) + (canvasWidth / 2) * Math.sin((this.angle.roll - this.camera.angle.roll) * Math.PI / 180);//画面中心を0とした2d画面上のX
		let y = (canvasHeight / 2) - (canvasHeight / 2) * Math.sin((this.angle.pitch - this.camera.angle.pitch) * Math.PI / 180);//画面中心を0とした2d画面上のY
		drawCircle(x, y, 2);
	}
}

