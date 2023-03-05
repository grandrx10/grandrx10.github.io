class Text_Box{
    constructor(x, y, length, width, text){
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.text = text;
    }

    display(){
        fill("WHITE")
        rect(this.x, this.y, this.length + 10, this.width + 10)
        fill("BLACK")
        rect(this.x, this.y, this.length, this.width)

        fill("WHITE")
        text(this.text, this.x, this.y)
    }
}

// var video
// var text_box

// function setup(){
//     canvas = createCanvas(windowWidth, windowHeight);
//     background(51)
//     video = createCapture(VIDEO)
//     video.size(700)
//     video.hide()

//     let voice = new p5.Speech()
//     voice.speak('This is a test phrase')
//     textAlign(CENTER)
//     imageMode(CENTER)
//     rectMode(CENTER)
//     text_box  = new Text_Box(windowWidth/2, windowHeight/2 + 220, 650, 150, "THIS IS TESTING TEXT")
// }

// function draw(){
//     loadPixels()
//     image(video, windowWidth/2, windowHeight/2 - 100)
//     fill(255,255, 255)
//     text_box.display()
// }

// function keyPressed(){
//     if (key == "s"){
//         console.log(pixels)
//     }
// }


let classifier;
  // Model URL
  let imageModelURL = './';

  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    background(51)
    video = createCapture(VIDEO)
    video.size(700)
    video.hide()

    textAlign(CENTER)
    imageMode(CENTER)
    rectMode(CENTER)
    text_box  = new Text_Box(windowWidth/2, windowHeight/2 + 220, 650, 150, "THIS IS TESTING TEXT")

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }