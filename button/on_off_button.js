class On_Off_Button extends Button {
    constructor(x, y, length, width){
        super(x, y, length, width, "Detect: Off")
    }

    clicked(text_box, detect_text){

        if (!text_box.active){
            this.text = "Detect: On"
            text_box.active = true
            detect_text.start_time = new Date()
        } else {
            this.text = "Detect: Off"
            text_box.active = false
            detect_text.start_time = new Date()
        }
    }
}