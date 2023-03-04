class Clear_Button extends Button {
    constructor(x, y, length, width, text){
        super(x, y, length, width, text)
    }

    clicked(text_box){
        text_box.text = ""
    }
}