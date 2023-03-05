class Title_Label extends Label{
    constructor(x, y, length, width, text){
        super(x, y, length, width, text)
    }

    display(theme){
        fill ("WHITE")
        rect (this.x, this.y, this.length, this.width, 20)
        textSize (32)
        fill ("BLACK")
        textFont('Georgia');
        text (this.text, this.x, this.y)
        textSize (16)
        textFont('Arial')
    }
}