/**
 * 透明度选择类
 */
function ColorAlpha() {
    this.$alpha = document.getElementsByClassName('alpha-select')[0]; //透明度选择dom
    this.$rule = document.getElementsByClassName('alpha-rule')[0]; //透明度选择游标d
    this.wide = this.$alpha.getBoundingClientRect();
    this.ruleWide = this.$rule.getBoundingClientRect();
    this.w = this.ruleWide.width / 2;
    /**位置转换透明度 */
    this.p2a = function(left) {
        return left / this.wide.width
    };
    /**透明度转换位置 */
    this.a2p = function(alpha) {
        return alpha * this.wide.width
    };
    /**根据颜色设置位置 */
    this.setPositionByColor = function(color) {
        var left = this.a2p(color.a);
        this.setPosition(left);
    };
    this.setPosition = function(left) {
        this.$rule.style.left = (left - this.w) + 'px';
    }
}