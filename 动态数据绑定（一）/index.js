function Observer (obj) {
	this.data = obj;
	this.walk(this.data);
}
Observer.prototype.walk = function (data) {
	var val;
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			val = data[key];
			if (typeof val === "object") {
				new Observer(val);
			} 
			this.convert(data, key, val)
		}
	}
}
Observer.prototype.convert = function (o, key, val) {
	var v = val;
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
		},
		enumerable: true,
		configurable: true,
		writerable: true
	})
}