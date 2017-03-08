var ruleDom = document.getElementsByClassName('rule')[0];
var colorWheelDom = document.getElementsByClassName('color-wheel')[0];
var wide = colorWheel.getBoundingClientRect();

colorWheel.onclick = function(ele) {
    var top = ele.clientY - wide.top - 5;
    rule.style.top = top + 'px';
}


var colorArray = [
    { baseColor: }
]