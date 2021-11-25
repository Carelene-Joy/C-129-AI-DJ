var music = ""
var lwx = 0
var rwx = 0
var lwy = 0
var rwy = 0
var lwscore = 0
var rwscore = 0


function setup () {
canvas = createCanvas(500,470)
canvas.position(displayWidth/2-250,displayHeight/2-200)
video = createCapture(VIDEO)
video.hide()
posenet = ml5.poseNet(video,modelloaded)
posenet.on("pose",gotposes)
}

function draw () {
image(video,0,0,500,470)
fill("red")
stroke("black")
if (rwscore>0.2) {
    circle(rwx,rwy,20)
    if (rwy>0&&rwy<=90)  {
        music.rate(0.5)
        document.getElementById("speed").innerHTML="Speed = 0.5x"
    }
    if (rwy>90&&rwy<=180)  {
        music.rate(1)
        document.getElementById("speed").innerHTML="Speed = 1x"
    } 
    if (rwy>180&&rwy<=270)  {
        music.rate(1.5)
        document.getElementById("speed").innerHTML="Speed = 1.5x"
    }
    if (rwy>270&&rwy<=360)  {
        music.rate(2)
        document.getElementById("speed").innerHTML="Speed = 2x"
    }
    if (rwy>360&&rwy<=470)  {
        music.rate(2.5)
        document.getElementById("speed").innerHTML="Speed = 2.5x"
    }
}
if (lwscore>0.2) {
    circle(lwx,lwy,20)
    var lwytonumber = Number(lwy)
    var lwywholenumber = Math.floor(lwytonumber)
    var volume = lwywholemumber/470
    music.setVolume(volume)
    document.getElementById("volume").innerHTML="Volume = "+ volume

}

}          

function preload () {
    music = loadSound("music.mp3")
}

function play () {
    music.play()
    music.setVolume(1)
    music.rate(1)
}
function modelloaded () {
    console.log("Model has been loaded")
}
 
function gotposes (result) {
   if (result.length>0)  {
       console.log(result)
     lwx = result[0].pose.leftWrist.x
     lwy = result[0].pose.leftWrist.y
     rwx = result[0].pose.rightWrist.x
     rwy = result[0].pose.rightWrist.y
     lwscore = result[0].pose.keypoints[9].score
     rwscore = result[0].pose.keypoints[10].score

   }
}

