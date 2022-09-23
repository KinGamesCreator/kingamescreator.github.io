class Button{
    w;h;x=0;y=0;action = ()=>{};
    sprites;
    constructor(_x,_y,_w,_h,_a = ()=>{},_sprites = undefined) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.action = _a;
        this.sprites = _sprites;
    }
}