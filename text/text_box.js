class Text_Box{
    constructor(x, y, length, width, text){
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.text = text;
        this.active = false
    }

    display(theme){
        fill("WHITE")
        rect(this.x, this.y, this.length + 10, this.width + 10, 20)
        fill(theme.button_color)
        rect(this.x, this.y, this.length, this.width, 20)

        fill(theme.text_color)
        text(this.text, this.x, this.y)
    }

    update_text(detect_text){
        var returned_text = detect_text.get_text()
        if (returned_text != "" && this.active){
            this.text += returned_text
        }
    }
}