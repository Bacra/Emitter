	// 全局工具函数
	function toArray(args){
		return Array.prototype.slice.call(args);
	}
	function isPlainObject(obj){
		return obj && obj !== null && typeof(obj) == 'object';
	}
	function extend(obj, obj2) {
		for (var i  in obj2) {
			obj[i] = obj2[i];
		}
	}
	function extendDeep(obj, obj2) {
		var temp, temp2;
		for (var i in obj2) {
			temp = obj2[i];
			if (isPlainObject(temp)) {
				temp2 = obj[i];
				if (!temp2) obj[i] = temp2 = {};
				extendDeep(temp2, obj[i]);
			} else {
				obj[i] = temp;
			}
		}
	}
	function forEach(arr, callback){
		for(var i = 0, num = arr.length; i < num; i++) {
			callback(arr[i], i);
		}
	}