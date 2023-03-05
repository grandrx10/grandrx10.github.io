let text_box;
let detect_text;
let classifier;
let buttons = [];
let theme = new Theme()

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
    text_box  = new Text_Box(windowWidth/2, windowHeight/2 + 260, 650, 50, "")
    detect_text = new Detect_Text()

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();

    // UI
    buttons.push(new Clear_Button(this.windowWidth/7, this.windowHeight/2 - 80, 200, 50, "Clear Text"))
    buttons.push(new Read_Button(this.windowWidth/7, this.windowHeight/2, 200, 50, "Read Text"))
    buttons.push(new On_Off_Button(this.windowWidth/7, this.windowHeight/2 + 80, 200, 50))

    // right UI
    buttons.push(new Increment(7*this.windowWidth/8, this.windowHeight/2 + 120, 100, 50, "+0.5", 0.5))
    buttons.push(new Increment(7*this.windowWidth/8- 120, this.windowHeight/2 + 120, 100, 50, "-0.5", -0.5))
    
    // Theme select
    buttons.push(new Label(7*this.windowWidth/8 - 60, this.windowHeight/2 - 60, 200, 60))
    buttons.push(new Label(7*this.windowWidth/8 - 60, this.windowHeight/2 - 110, 200, 30, "Theme Select"))
    buttons.push(new Theme_Select(7*this.windowWidth/8 - 60, this.windowHeight/2 - 60, 50, "Noir", "rgb(1, 1, 1)", "rgb(101, 101, 101)", "white", "Black"))
    buttons.push(new Theme_Select(7*this.windowWidth/8, this.windowHeight/2 - 60, 50, "Violet", "rgb(92, 0, 173)", "rgb(188, 143, 227)", 
    "rgb(204, 169, 235)", "BLACK"))
    buttons.push(new Theme_Select(7*this.windowWidth/8 - 120, this.windowHeight/2 - 60, 50, "Cyan", "rgb(7, 84, 120)", "rgb(143, 200, 227)", 
    "rgb(128, 189, 217)", "BLACK"))

    buttons.push(new Title_Label(this.windowWidth/2, 50, 200, 50, "Signify"))
  }

  function mousePressed(){
    for (var i in buttons){
      buttons[i].mouse_update(mouseX, mouseY, true, text_box, detect_text, theme)
    }
  }

  function draw() {
    background(50)
    // linearGradient(
    //   0, 0, windowWidth, windowHeight,
    //   theme.background_color_1, theme.background_color_2
    // )
    radialGradient(
      windowWidth/2, windowHeight/2, 0,
      windowWidth/2, windowHeight/2, windowWidth/2,
      theme.background_color_2, theme.background_color_1
    )
    rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight)
    // Draw the video

    // Draw the label
    fill(255);
    rect(windowWidth/2, windowHeight/2 - 40, vid_size.length + 30, vid_size.width + 30, 20)
    image(flippedVideo, windowWidth/2, windowHeight/2 - 40);
    
    textSize(16);
    textAlign(CENTER, CENTER);
    detect_text.update_text(label)
    text_box.update_text(detect_text)

    text_box.display(theme)

    for (var i in buttons){
      buttons[i].mouse_update(mouseX, mouseY, false, text_box, detect_text)
      buttons[i].display(theme)
    }

    fill (theme.button_color)
    rect (7*this.windowWidth/8 - 60, this.windowHeight/2 + 60, 220, 50, 20)
    fill (theme.text_color)
    text ("Sign Hold Duration: " + detect_text.time_delay + " sec", 7*this.windowWidth/8 - 60, this.windowHeight/2 + 60)
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

function linearGradient(sX, sY, eX, eY, colorS, colorE){
    let gradient = drawingContext.createLinearGradient(
      sX, sY, eX, eY
    );
    gradient.addColorStop(0, colorS);
    gradient.addColorStop(1, colorE);
    drawingContext.fillStyle = gradient;
    // drawingContext.strokeStyle = gradient;
  }

  function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE){
    let gradient = drawingContext.createRadialGradient(
      sX, sY, sR, eX, eY, eR
    );
    gradient.addColorStop(0, colorS);
    gradient.addColorStop(1, colorE);
  
    drawingContext.fillStyle = gradient;
  }