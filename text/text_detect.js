class Detect_Text {
    constructor(){
        this.text = ""
        this.start_time = new Date()
        this.time_delay = 1
    }

    update_text(text){
        if (text != this.text){
            this.text = text
            this.start_time = new Date()
        }
    }

    get_text(){
        var current_time = new Date()
        var difference = (current_time.getTime() - this.start_time.getTime()) / 1000
        if (difference >= this.time_delay) {
            this.start_time = new Date()
            return this.text
        } else {
            return ""   
        }
    }
}