class Theme_Select extends Button {
    constructor(x, y, radius, theme, back_color_1, back_color_2, button_color, text_color){
        super(x, y, radius, radius, "")
        this.theme = theme
        this.background_color_1 = back_color_1;
        this.background_color_2 = back_color_2;
        this.button_color = button_color;
        this.text_color = text_color
    }

    clicked(text_box, detect_text, theme){
        theme.background_color_1 = this.background_color_1
        theme.background_color_2 = this.background_color_2
        theme.button_color = this.button_color
        theme.text_color = this.text_color
        theme.name = this.theme
    }

    display(theme){
        fill (this.background_color_1)
        ellipse (this.x, this.y, this.length, this.width)
    }
}