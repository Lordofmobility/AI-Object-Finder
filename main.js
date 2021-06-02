video = ""
objects = ""
status = ""
object_entered = ""

function setup() {
    canvas = createCanvas(480, 345)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}


function draw() {
    image(video, 0, 0, 480, 345)
    if (status != "") {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"

            fill("#FF0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
    if (object_entered == objects[i]) {
        video.stop()
        objectDetector.detect(gotResult)
        document.getElementById("status").innerHTML = object_entered + " found"

        synth = window.speechSynthesis
        utterThis = new SpeechSynthesisUtterance(object_entered + " found")
        synth.speak(utterThis)
    } else {
        document.getElementById("status").innerHTML = object_entered + " not found"

        synth_1 = window.speechSynthesis
        utterThis_1 = new SpeechSynthesisUtterance(object_entered + " not found")
        synth.speak(utterThis_1)
    }
}

function start_identifying() {
    object = document.getElementById("object_identification")
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    object_entered = document.getElementById("object_identification").innerHTML
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results
    }
}

function modelLoaded() {
    console.log("Object Detection Successfully Started");
    status = true
}