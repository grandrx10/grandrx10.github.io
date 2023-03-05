class Increment extends Button {
    constructor(x, y, length, width, text, increment){
        super(x, y, length, width, text)
        this.increment = increment
    }

    clicked(text_box, detect_text){
        if (detect_text.time_delay + this.increment > 0){
            detect_text.time_delay += this.increment
        }
    }
}