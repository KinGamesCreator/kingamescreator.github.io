
class Animation {

    status = "stopped"
    index = 0;
    frames = [];
    speed = 10;
    interval;
    
    constructor(dir,count,speed=30) {
        for (var i = 0; i < count; i++) {
            this.frames.push(loadImage(`${dir}${i}.png`));
            console.log("cargado")
        }
        this.speed = speed;
    }

    start() {
        if (this.status == "stopped") {
            this.status = "running";
            this.interval = setInterval(this.step,1000/this.speed,this);
        }
    }

    stop() {
        if (this.status == "running") {
            this.status = "stopped";
            clearInterval(this.interval);
        }
    }

    step(t) {
        t.index++;
        if (t.index >= t.frames.length) t.index = 0;
    }

    draw(x,y) {
        image(this.frames[this.index],x,y);
    }

    extDraw(x,y,w,h) {
        image(this.frames[this.index],x,y,w,h);
    }

    get isPlaying() {
        if (this.status == "running") return true;
        else return false;
    }

}