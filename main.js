song="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist=0;
song_name = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY,20)

   
    
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 700 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY=Number(leftWristY);
        new_leftWristY=floor(InNumberleftWristY*2)/1000;
        document.getElementById("volume").innerHTML="Volume = " + new_leftWristY;
        song.setVolume(new_leftWristY);

    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist +"scoreLeftWrist = " + scoreLeftWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWristX+" leftWrist_y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWristX+" rightWrist_y = "+rightWristY);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}