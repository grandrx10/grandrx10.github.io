let text_box;
let detect_text;
let classifier;
let buttons = [];

let vid_size = {length: 650, width: 500}

  // Model URL
  let imageModelURL = './data/';

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
    video.size(vid_size.length, vid_size.width)
    video.hide()

    textAlign(CENTER)
    imageMode(CENTER)
    rectMode(CENTER)
    text_box  = new Text_Box(windowWidth/2, windowHeight/2 + 220, 650, 150, "")
    detect_text = new Detect_Text()

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();

    // UI
    buttons.push(new Clear_Button(this.windowWidth/7, this.windowHeight/2 - 80, 200, 50, "Clear Text"))
    buttons.push(new Read_Button(this.windowWidth/7, this.windowHeight/2, 200, 50, "Read Text"))
    buttons.push(new On_Off_Button(this.windowWidth/7, this.windowHeight/2 + 80, 200, 50))

    // right UI
    buttons.push(new Increment(7*this.windowWidth/8, this.windowHeight/2 + 30, 100, 50, "+0.5", 0.5))
    buttons.push(new Increment(7*this.windowWidth/8- 120, this.windowHeight/2 + 30, 100, 50, "-0.5", -0.5))
  }

  function mousePressed(){
    for (var i in buttons){
      buttons[i].mouse_update(mouseX, mouseY, true, text_box, detect_text)
    }
  }

  function draw() {
    background(51);
    // Draw the video

    // Draw the label
    fill(255);
    rect(windowWidth/2, windowHeight/2 - 100, vid_size.length + 10, vid_size.width + 10)
    image(flippedVideo, windowWidth/2, windowHeight/2 - 100);
    
    textSize(16);
    textAlign(CENTER, CENTER);
    detect_text.update_text(label)
    text_box.update_text(detect_text)

    text_box.display()

    for (var i in buttons){
      buttons[i].mouse_update(mouseX, mouseY, false, text_box, detect_text)
      buttons[i].display()
    }

    fill ("WHITE")
    rect (7*this.windowWidth/8 - 60, this.windowHeight/2 - 30, 220, 50)
    fill ("BLACK")
    text ("Sign Hold Duration: " + detect_text.time_delay, 7*this.windowWidth/8 - 60, this.windowHeight/2 - 30)
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