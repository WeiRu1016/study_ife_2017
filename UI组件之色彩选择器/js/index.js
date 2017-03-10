var currentColorDom = document.getElementsByClassName('current-color')[0]; //当前颜色
var ruleDom = document.getElementsByClassName('rule')[0]; //色轮上的游标
var alphaSelectDom = document.getElementsByClassName('alpha-select')[0]; //透明度选择dom
var alphaRuleDom = document.getElementsByClassName('alpha-rule')[0]; //透明度选择游标dom
var colorWheelDom = document.getElementsByClassName('color-wheel')[0]; //色轮dom
var colorPanelDom = document.getElementsByClassName('color-panel')[0]; //色板dom
var colorPointDom = document.getElementsByClassName('color-point')[0]; //色板游标dom
var inputGroupsDom = {
    r: document.getElementsByName('R')[0],
    g: document.getElementsByName('G')[0],
    b: document.getElementsByName('B')[0],
    h: document.getElementsByName('H')[0],
    s: document.getElementsByName('S')[0],
    l: document.getElementsByName('L')[0],
    a: document.getElementsByName('A')[0]
}; //输入框dom组
var wheelWide = colorWheelDom.getBoundingClientRect(); //色轮的位置
var alphaWide = alphaSelectDom.getBoundingClientRect(); //透明度位置
var panelWide = colorPanelDom.getBoundingClientRect(); //色板位置

colorWheelDom.onclick = function(ele) {
    var clickTop = ele.clientY,
        top, color;
    clickTop = clickTop < wheelWide.top ? wheelWide.top : clickTop;
    clickTop = clickTop > wheelWide.bottom ? wheelWide.bottom : clickTop;
    top = clickTop - wheelWide.top - 5;
    ruleDom.style.top = top + 'px';
    color = getHue(top + 5, wheelWide);
    for (var k in color) {
        inputGroupsDom[k].value = color[k];
    }
    colorPanelDom.style.backgroundColor = color2String(color);
    currentColorDom
};
colorPanelDom.onclick = function(ele) {
    var x = ele.clientX - panelWide.left,
        y = ele.clientY - panelWide.top,
        s = Math.floor(x / panelWide.width),
        l = Math.floor(y / panelWide.height),
        h = inputGroupsDom.h.value,
        a = inputGroupsDom.a.value;


};
/**
 * 颜色设置后的变化对应到dom
 * @param {object} color {r,g,b,a,h,s,l,a}
 */
function colorChange2Dom(color) {
    setCurrentColor(color);
    setPanelColor(color);
    setInputGroupVal(color);
    setAlphaColor(color);


    setRulePosition(color);
    setPanelPointPosition(color);
    setAlphaRulePosition(color);
};
/**
 * 设置色轮游标位置
 * @param {object} color 
 */
function setRulePosition(color) {
    var h = color.h;
    if (color.h === undefined) {
        var hsl = rgb2hsl(color.r, color.g, color.b);
        h = hsl.h;
    }
    var top = (h / 360) * wheelWide.height + top - 5;
    ruleDom.style.top = top + 'px';
};
/**
 * 设置色板的颜色
 * @param {object} color {r,g,b,a}
 */
function setPanelColor(color) {
    colorPanelDom.style.backgroundColor = color2String(color);
};
/**
 * 设置色板游标的位置
 * @param {*} color 
 */
function setPanelPointPosition(color) {
    var s = color.s,
        l = color.l;
}
/**
 * 设置当前颜色
 * @param {object} color {r,g,b,a} 
 */
function setCurrentColor(color) {
    currentColorDom.style.backgroundColor = color2String(color)
};
/**
 * 设置透明度选择器的颜色
 * @param {object} color 
 */
function setAlphaColor(color) {
    var from = color2String({ r: color.r, g: color.g, b: color.b, a: 0 }),
        to = color2String({ r: color.r, g: color.g, b: color.b, a: 1 });
    alphaSelectDom.style.background = '-webkit-linear-gradient(left, ' + from + ', ' + to + ');';
};
/**
 * 设置透明度选择游标位置
 * @param {object} color 
 */
function setAlphaRulePosition(color) {

}
/**
 * 设置颜色输入框的值
 * @param {object} color {r,g,b,h,s,l,a}
 */
function setInputGroupVal(color) {
    for (var k in color) {
        if (k === 's' || k === 'l' || k === 'a') {
            inputGroupsDom[k].value = Math.floor(color[k] * 100);
        } else {
            inputGroupsDom[k].value = color[k];
        }
    }
};
/**
 * 
 * @param {number} top 色轮距离顶部的距离 
 * @param {object} wide 色轮的位置
 */
function getHue(top, wide) {
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
    return {
        r: color[0],
        g: color[1],
        b: color[2]
    };
};