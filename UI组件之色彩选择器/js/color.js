/**
 * 
 * @param {Object} o {r,g,b,a}
 */
function color2String(o) {
    o.a = o.a || 1;
    var arr = [o.r, o.g, o.b, o.a];
    return 'rgb(' + arr.join(',') + ')';
};
/**
 * rgb转换成hsl
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 */
function rgb2hsl(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
};
/**
 * hsl转换成rgb
 * @param {number} h 
 * @param {number} s 
 * @param {number} l 
 */
function hsl2rgb(h, s, l) {
    var r, g, b;

    h = h / 360;
    // s = s / 100;
    // l = l / 100;

    function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};