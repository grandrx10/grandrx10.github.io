class On_Off_Button extends Button {
    constructor(x, y, length, width){
        super(x, y, length, width, "Detect: Off")
    }

    clicked(text_box){

        if (!text_box.active){
            this.text = "Detect: On"
            text_box.active = true
        } else {
            this.text = "Detect: Off"
            text_box.active = false
        }
    }
}