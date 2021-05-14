video = ""
object = ""
status = ""

function setup() {
    canvas = createCanvas(480, 345)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}


function draw() {
    image(video, 0, 0, 480, 345)
}

function start() {
    object = document.getElementById("object_identification")   
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Object Detection Successfully Started");
    status = true
}