/**
*简易vue实现$watch
**/
var MySimpleVue = function (options) {
	this.$options = options;
	this._init();
}
MySimpleVue.prototype._init = function () {
	var data = this._data = this.$options.data;
	observer(this, data);
	this._create();
}
MySimpleVue.prototype._create = function() {
	var el = this.$options.el;
	if (el) {
		var dom = this.$options.template || document.querySelector(el).outerHTML;
		var data = this._data;
		var matchArr = dom.match(/{{(\w+|(\w+.)*\w+)}}/g);
		matchArr.forEach(function(ele) {
			var temp = ele.replace(/{{(.*)}}/, '$1');
			temp = temp.split('.')
			temp = temp.reduce(function(pre, next){
				if (pre.hasOwnProperty(next)) {
					return pre[next]
				}
			}, data);
			dom = dom.replace(ele, temp)
		})
	}
	document.querySelector(el).outerHTML = dom;
}
MySimpleVue.prototype.$watch = function (key, callback) {
	new Watcher(this._data, key, callback);
}
/**
*创建实例函数
**/
var observer = function (vm, value) {
	if (!value || typeof value !== 'object') {
		return ;
	}
	return new Observer(value);
}
/**
*实例对象，用来把data的属性变成带get，set读取函数
**/
function Observer(value) {
	this._data = value;
	this.walk(value);
}
Observer.prototype.walk = function(value) {
	var val;
	for(var key in value) {
		if (value.hasOwnProperty(key)) {
			val = value[key];
			if (typeof val === 'object') {
				new Observer(val)
			}
			this.convert(value, key, val);
		}
	}
}
Observer.prototype.convert = function (obj, key, value) {
	var val = value;
	var pubSub = new PubSub();
	Object.defineProperty(obj, key, {
		get: function () {
			console.log('你访问了' + key);
			if (PubSub.target) {
				pubSub.on(PubSub.target);
			}
			return val;
		},
		set: function (newVal) {
			console.log('你设置了' + key + '新值是' + newVal);
			if (typeof newVal === 'object') {
				new Observer(newVal);
			}
			val = newVal;
			pubSub.emit();
		}
	}) 
}

/**
*订阅者模式
**/
function PubSub() {
	this.subs = [];
}
/**
*全局变量，控制get判断是否有观察者
**/
PubSub.target = null;

PubSub.prototype.on = function (sub) {
	this.subs.push(sub);
}
PubSub.prototype.emit = function () {
	var subs = this.subs;
	for(var i = 0, l = subs.length; i < l;i ++) {
		subs[i].update();
	}
}
/**
*观察者
**/
function Watcher (vm, key, callback) {
	this.vm = vm;
	this.callback = callback;
	this.key = key;
	this.value = this.get();
}
Watcher.prototype.get = function () {
	PubSub.target = this;
	var value = this.vm[this.key];
	if (typeof value === 'object') {
		for (var k in value) {
			new Watcher(value, k, this.callback)
		}
	}
	PubSub.target = null;
	return value;
}
Watcher.prototype.update = function () {
	var val = this.vm[this.key];
	if (val === this.value) {
		return ;
	}
	this.callback.call(this.vm, val);
}

