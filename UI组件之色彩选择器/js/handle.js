/**
 * 分析：
 * dom的联动事件
 * 1.色轮点击：改变色板的background，改变6个输入框，改变当前颜色,只会改变r,g,b,h
 * 2.色板点击：改变6个输入框，改变当前颜色，只会改变r,g,b,s,l
 * 3.透明度点击：改变透明度输入框的值，改变当前颜色，只会改变a
 * 4.r,g,b,h,s,l输入框输入: 改变色轮rule位置，改变色板background，改变point，改变当前颜色
 * 5.a输入框输入:改变透明度rule位置，改变当前颜色
 * 总结：需要以下函数
 * - 改变色板background（rgb）
 * - 改变6个输入框的值（rgbhsla）
 * - 改变当前颜色（rgba）
 * - 改变色轮rule位置（h）
 * - 改变色板point（sl）
 * - 改变透明度rule位置（a）
 */
var RGBAHSL = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    h: 0,
    s: 1,
    l: 0.5
};
var rulePosition = 0;
var panelPointPosition = {
    x: 0,
    y: 0
};
var alphaRulePosition = 0;
var $inputGroupsDom = {
    r: document.getElementsByName('R')[0],
    g: document.getElementsByName('G')[0],
    b: document.getElementsByName('B')[0],
    h: document.getElementsByName('H')[0],
    s: document.getElementsByName('S')[0],
    l: document.getElementsByName('L')[0],
    a: document.getElementsByName('A')[0]
}; //输入框dom组
var $currentColorDom = document.getElementsByClassName('current-color')[0]; //当前颜色
var wheel = new ColorWheel();
var panel = new ColorPanel();
var alpha = new ColorAlpha();

function init() {
    wheel.setPositionByColor(RGBAHSL);
    panel.setPanelBgColor(RGBAHSL);
    panel.setPositionByColor(RGBAHSL);
    alpha.setPositionByColor(RGBAHSL);
    setInputGroupVal(RGBAHSL);
    setCurrentColor(RGBAHSL);
}
init();
bindEvent();

function bindEvent() {
    wheel.$dom.onclick = function(ele) {
        /**1.色轮点击：
         * 改变色板的background，
         * 改变6个输入框，
         * 改变当前颜色,
         * 只会改变r,g,b,h 
         */
        var clickTop = ele.clientY,
            top, h, rgbh;
        top = clickTop - wheel.wide.top;
        wheel.setPosition(top);

        h = wheel.p2c(top).h;
        rgbh = hsl2rgb(h, RGBAHSL.s, RGBAHSL.l);
        rgbh['h'] = h;

        setRGBAHSL(rgbh);

        panel.setPanelBgColor(RGBAHSL);
        setInputGroupVal(rgbh);
        setCurrentColor(RGBAHSL);
    };
    panel.$panel.onclick = function(ele) {
        /**
         * 2.色板点击：
         * 改变6个输入框，
         * 改变当前颜色，
         * 只会改变r,g,b,s,l
         */
        var p = {
                x: ele.clientX - panel.wide.left,
                y: ele.clientY - panel.wide.top
            },
            sl, rgbsl;
        panel.setPosition(p);
        sl = panel.p2c(p);
        rgbsl = hsl2rgb(RGBAHSL.h, sl.s, sl.l);
        rgbsl['s'] = sl.s;
        rgbsl['l'] = sl.l;

        setRGBAHSL(rgbsl);
        setInputGroupVal(rgbsl);
        setCurrentColor(RGBAHSL);
    };
    alpha.$alpha.onclick = function() {
        /**
         * 透明度点击：
         * 改变透明度输入框的值，
         * 改变当前颜色，
         * 只会改变a
         */
        var clickLeft = ele.clientX,
            left, a;
        left = clickLeft - alpha.wide.left;
        alpha.setPosition(left);
        a = alpha.p2a(left);

        setRGBAHSL({ a: a });
        setInputGroupVal({ a: a });
        setCurrentColor(RGBAHSL);
    };
    /**4.r,g,b,h,s,l输入框输入:
     * 改变色轮rule位置，
     * 改变色板background，
     * 改变point，
     * 改变当前颜色
     * 5.a输入框输入:
     * 改变透明度rule位置，
     * 改变当前颜色 */
    for (var k in $inputGroupsDom) {
        var $tempDom = $inputGroupsDom[k];
        $tempDom.onchange = function(ele) {
            var value = $tempDom.value;
            if (k === "a" || k == "s" || k === "l") {
                value = value / 100;
            }
            setRGBAHSL({ k: value });
            if (k !== 'a') {
                wheel.setPositionByColor(RGBAHSL);
                panel.setPanelBgColor(RGBAHSL);
                panel.setPositionByColor(RGBAHSL);
            } else {
                alpha.setPositionByColor({ a: value });
            }
            setCurrentColor(RGBAHSL);
        }
    }
}

function setRGBAHSL(color) {
    for (var k in color) {
        RGBAHSL[k] = color[k];
    }
}

function setInputGroupVal(color) {
    for (var k in color) {
        if (k === 's' || k === 'l' || k === 'a') {
            $inputGroupsDom[k].value = Math.round(color[k] * 100);
        } else {
            $inputGroupsDom[k].value = color[k];
        }
    }
}

function setCurrentColor(color) {
    var r = color.r;
    var g = color.g;
    var b = color.b;
    var a = color.a;
    $currentColorDom.style.backgroundColor = "rgba(" + [r, g, b, a].join(',') + ")"
}