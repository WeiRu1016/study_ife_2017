/**
 *1.要显示的标签数量、标签内容都可以支持用户自定义
 *2.标签云的转速也可以通过自定义来进行调节
 *3.不同的标签需要由不同的颜色和字体大小区分开来
 */
/**
 * 分析：
 * 1.设置一个数组，进行读取标签内容
 * 2.生成标签
 * 3.设置标签位置，样式
 * 4.转动，根据速度来
 * 计算：
 * 1.球体坐标
 * x = r*sina*cosb;
 * y = r.sina*sinb;
 * z = r.cosa
 * 设置每个点在a角度里面平均分配
 * a = arccos(2*i/(len-1)-1) 
 * 同理b角度
 * b = 2*PI*i/(len-1)-PI
 * 2.旋转
 * 绕着x轴旋转
 * y = y*cosa - z*sina
 * z = y*sina + z*cosa
 * 绕着y轴旋转
 * x = xcosθ - zsinθ;
 * z = xsinθ + zcosθ;
 */
var tagList = [
    'javascript',
    'java',
    'jquey',
    'html',
    'css',
    'angular',
    'vue',
    'react',
    'react-native',
    'weex'
]; //标签内容数组
var speed = 1; //旋转速度，10度／秒
var step = 10; //速度步长
var $cloud = document.getElementById('tag-cloud');
var r = 150;

function init() {
    $cloud.innerHTML = "";
    for (var i = 0, l = tagList.length; i < l; i++) {
        var value = tagList[i],
            a = Math.acos(2 * i / (l - 1) - 1),
            b = 2 * Math.PI * i / (l - 1) - Math.PI,
            x = r * Math.sin(a) * Math.cos(b),
            y = r * Math.sin(a) * Math.sin(b),
            z = r * Math.cos(a),
            tag = new Tag(value, { x: x, y: y, z: z, a: a, b: b });
        $cloud.appendChild(tag);
    }
    animate(speed * step); //旋转
}
init();
/**
 * @param{string}:value标签内容
 * @param{object}:x,y,z,a,b:坐标，x,y,z,角度a，角度b
 */
function Tag(value, point) {
    this.value = value;
    this.$dom = document.createElement('span');
    this.$dom.className = "tag";
    this.$dom.innerText = value;
    this.$dom.style.color = '#' + Math.floor((Math.random * parseInt('ffffff', 16)).toString(16));
    this.$dom.style.top = (point.y + point.z / r) + r + 'px';
    this.$dom.style.left = (point.x + point.z / r) + r + 'px';
    this.$dom.style.opacity = (Math.abs(point.z) / r);
    return this.$dom;
}
/**
 * 旋转函数
 * @param {number}:speed 旋转速度
 */
function animate(speed) {
    var deg = 0;
    var i = 0;
    var $tagList = document.getElementsByClassName('tag');
    var count = Math.floor(360 / speed);
    var handler = setInterval(function() {
        console.log(i);
        if (i === count) {
            clearInterval(handler);
            return;
        }
        i++;
        deg = i * speed;
        for (var j = 0, l = $tagList.length; j < l; j++) {
            angelX(deg, $tagList[j]);
        }

    }, 1000);
}
/**
 * 绕着x轴旋转
 * y = y*cosa - z*sina
 * z = y*sina + z*cosa
 */
function angelX(deg, $dom) {
    var wide = $dom.getBoundingClientRect();
    var hdeg = deg * Math.PI / 180;
    $dom.style.top = (wide.top * Math.cos(hdeg) - wide.left * Math.sin(hdeg)) + 'px';
    $dom.style.left = (wide.top * Math.sin(hdeg) + wide.left * Math.cos(hdeg)) + 'px';
}