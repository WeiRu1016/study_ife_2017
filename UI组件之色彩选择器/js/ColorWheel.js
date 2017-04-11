/**
 * 色轮类
 */
function ColorWheel() {
    this.$dom = document.getElementsByClassName('color-wheel')[0]; //色轮dom
    this.wide = this.$dom.getBoundingClientRect(); //色板h:高度，w：宽度，t：top，b：bottom
    this.$rule = document.getElementsByClassName('rule')[0]; //色轮上的游标
    this.ruleWide = this.$rule.getBoundingClientRect();
    this.h = this.ruleWide.height / 2;
    /**位置专换成颜色 */
    this.p2c = function(top) {
        var colorArray = [{
                baseColor: [255, 0, 0],
                chanel: 2,
                dir: '+'
            },
            {
                baseColor: [255, 0, 255],
                chanel: 0,
                dir: '-'
            },
            {
                baseColor: [0, 0, 255],
                chanel: 1,
                dir: '+'
            },
            {
                baseColor: [0, 255, 255],
                chanel: 2,
                dir: '-'
            },
            {
                baseColor: [0, 255, 0],
                chanel: 0,
                dir: '+'
            },
            {
                baseColor: [255, 255, 0],
                chanel: 1,
                dir: '-'
            },
            {
                baseColor: [255, 0, 0]
            }
        ];
        var h = Math.round(this.wide.height / 6);
        var index = Math.round(top / h);
        var num = Math.round(((top / h) - index) * 256);
        var colorObj = colorArray[index];
        var color = colorObj.baseColor;
        var hue = Math.round((top * 360) / this.wide.height);
        if (colorObj === '-') {
            color[colorObj.chanel] = 255 - num;
        } else {
            color[colorObj.chanel] = num;
        }
        return {
            r: color[0],
            g: color[1],
            b: color[2],
            h: hue
        };
    };
    /**颜色专换成位置 */
    this.c2p = function(color) {
        if (color.h !== undefined) {
            return Math.round((color.h / 360) * this.wide.height)
        }
        var hsl = rgb2hsl(color.r, color.g, color.b);
        return Math.round((hsl.h / 360) * this.wide.height)
    };
    /**根据颜色设置游标位置 */
    this.setPositionByColor = function(color) {
        var top = this.c2p(color);
        this.setPosition(top);
    };
    /**根据位置设置游标位置 */
    this.setPosition = function(top) {
        this.$rule.style.top = (top - this.h) + 'px';
    };
}