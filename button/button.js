class Button {
    constructor(x, y, length, width, text){
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.text = text;
        this.color = "WHITE"
    }

    display(){
        fill (this.color)
        rect (this.x, this.y, this.length, this.width)
        fill ("BLACK")
        text (this.text, this.x, this.y)
    }

    mouse_update(x, y, clicked, text_box, detect_text){
        if (this.contains(x, y)){
            this.color = "GREY"
            if (clicked){
                this.clicked(text_box, detect_text)
            }
        } else {
            this.color = "WHITE"
        }
    }

    clicked(text_box){
        // abstract
    }

    contains(x, y){
        if (x >= this.x - this.length/2 && x <= this.x + this.length/2 &&
            y >= this.y - this.width/2 && y <= this.y + this.width/2){
                return true
        } 

        return false
    }
}