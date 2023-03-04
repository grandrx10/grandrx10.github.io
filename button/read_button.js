class Read_Button extends Button {
    constructor(x, y, length, width, text){
        super(x, y, length, width, text)
    }

    clicked(text_box){
        let voice = new p5.Speech()
        voice.speak(text_box.text)
    }
}