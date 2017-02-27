function Observer (obj) {
	this.data = obj;
	this.walk(this.data);
}
Observer.prototype.watch = function (key, callback) {
	this.data[key].watch(callback);
}
Observer.prototype.walk = function (data) {
	var val;
	for (var key in data) {
		val = data[key];
		if (typeof val === "object") {
			new Observer(val);
		} 
		this.convert(data, key, val)
	}
}
Observer.prototype.convert = function (o, key, val) {
	var v = val;
	var pubSub = new PubSub();
	Object.defineProperty(o, key, {
		get: function(){
			console.log("你访问了", key)
			return v;
		},
		set: function(value){
			if (typeof value === "object") {
				new Observer(value);
			}
			v = value;
			console.log("你设置了" + key + "，新的值为" + v)
			pubSub.emit('change');
		},
		watch: function(callback) {
			pubSub.on('change', callback)
		},
		enumerable: true,
		configurable: true,
		writerable: true
	})
}
var PubSub = function () {
	this.handlers = {}
}
PubSub.prototype.on = function (eventType, handler) {
	if (!this.handlers[eventType]) {
		this.handlers[eventType] = []
	}
	this.handlers[eventType].push(handler);
}
PubSub.prototype.emit = function (eventType) {
	var handlers = this.handlers[eventType];
	for (var i = 0,l = handlers.length;i < l;i ++) {
		handlers[i]();
	}
}