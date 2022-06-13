var oceanBlue = "";
var lightSwitch = "";

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;
var statLeftWrist = "";
var statRightWrist = "";


function preload() {
    oceanBlue = loadSound("ocean-blue.mp3");
    lightSwitch = loadSound("light-switch.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(480, 160);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function gotPoses(results)
{
  if(results.length > 0) {
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    scoreLeftWrist = results[0].pose.keypoints[9].score + 0.07;
    scoreRightWrist = results[0].pose.keypoints[10].score + 0.07;
  }
}

function draw() {
  image(video, 0, 0, 400, 400); 
  statLeftWrist = oceanBlue.isPlaying();
  if(scoreLeftWrist > 0.099){
    lightSwitch.stop();
    if(statLeftWrist == false){
      oceanBlue.play();
      document.getElementById("song-name").innerHTML = "Song Name: Ocean Blue"
    }
  }
  statRightWrist = lightSwitch.isPlaying();
  if(scoreRightWrist > 0.099){
    oceanBlue.stop();
    if(statRightWrist == false){
      lightSwitch.play();
      document.getElementById("song-name").innerHTML = "Song Name: Light Switch"
    }
  }
}