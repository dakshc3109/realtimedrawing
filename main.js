//main.js
noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;
function setup(){
    video = createCapture(VIDEO);
    video.size(500, 500);

    canvas = createCanvas(500, 400);
    canvas.position(600, 100);

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    document.getElementById("name").innerHTML = "The side of square is "+difference+" px";
    canvas.background("#FF0000");
    fill("#ecfc03");
    stroke("#ecfc03");
    square(noseX, noseY, difference);
}

function modelLoaded(){
    console.log("PoseNet is Loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX- "+noseX+" noseY- "+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("left wrist x- "+leftWristX+" right wrist x- "+rightWristX+" difference- "+difference);
    }
}