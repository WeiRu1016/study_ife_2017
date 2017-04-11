/**
 * 色板类
 */
function ColorPanel() {
    this.$panel = document.getElementsByClassName('color-panel')[0]; //色板dom
    this.$rule = document.getElementsByClassName('color-point')[0]; //色板游标do
    this.wide = this.$panel.getBoundingClientRect(); //色板的位
    this.ruleWide = this.$rule.getBoundingClientRect();
    this.w = this.ruleWide.width / 2;
    this.h = this.ruleWide.height / 2;
    /**位置转换成颜色 return{s,l}*/
    this.p2c = function(point) {
        return {
            s: (point.x / this.wide.width),
            l: (point.y / this.wide.height)
        }
    };
    /**颜色转换位置 */
    this.c2p = function(color) {
        if (color.s !== undefined && color.l !== undefined) {
            return { x: (color.s * this.wide.width), y: (color.l * this.wide.height) }
        }
        var hsl = rgb2hsl(color.r, color.g, color.b);
        return { x: (hsl.s * this.wide.width), y: (hsl.l * this.wide.height) }
    };
    /**根据颜色设置位置 */
    this.setPositionByColor = function(color) {
        var p = this.c2p(color);
        this.setPosition(p);
    };
    /**根据位置设置位置 */
    this.setPosition = function(p) {
        this.$rule.style.top = (p.y - this.h) + 'px';
        this.$rule.style.left = (p.x - this.w) + 'px';
    };
    this.setPanelBgColor = function(color) {
        var r = color.r;
        var g = color.g;
        var b = color.b;
        this.$panel.style.backgroundColor = "rgb(" + [r, g, b].join(',') + ")";
    }
}