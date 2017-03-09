var ruleDom = document.getElementsByClassName('rule')[0];
var colorPaintDom = document.getElementsByClassName('color-paine')[0];
var colorWheelDom = document.getElementsByClassName('color-wheel')[0];
var colorPanelDom = document.getElementsByClassName('color-panel')[0];
var wide = colorWheelDom.getBoundingClientRect();

colorWheelDom.onclick = function(ele) {
    var clickTop = ele.clientY,
        top, color;
    clickTop = clickTop < wide.top ? wide.top : clickTop;
    clickTop = clickTop > wide.bottom ? wide.bottom : clickTop;
    top = clickTop - wide.top - 5;
    ruleDom.style.top = top + 'px';
    color = getHue(top + 5);
    colorPanelDom.style.backgroundColor = "rgb(" + color.join(',') + ")";
}


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
]

function getHue(top) {
    var h = Math.floor(wide.height / 6);
    var index = Math.floor(top / h);
    var num = Math.floor(((top / h) - index) * 256);
    var colorObj = colorArray[index];
    var color = colorObj.baseColor;
    if (colorObj === '-') {
        color[colorObj.chanel] = 255 - num;
    } else {
        color[colorObj.chanel] = num;
    }
    return color;
}

function rgb2hsl(r, g, b) {
    r = r / 256;
    g = g / 256;
    b = b / 256;
    var h, s, l;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    if (max === min) {
        h = 0;
    } else if (r === max && g >= b) {
        h = Math.floor(60 * ((g - b) / (max - min)));
    } else if (r === max && g < b) {
        h = Math.floor(60 * ((g - b) / (max - min)) + 360)
    } else if (max === g) {
        h = Math.floor(60 * ((b - r) / (max - min)) + 120)
    } else if (max === b) {
        h = Math.floor(60 * ((r - g) / (max - min)) + 240)
    }

    l = (max + min) / 2;

    if (l === 0 || max === min) {
        s = 0;
    } else if (l > 0 && l <= 0.5) {
        s = (max - min) / (2 * l);
    } else {
        s = (max - min) / (2 - 2 * l);
    }
    return [h, s, l];
}