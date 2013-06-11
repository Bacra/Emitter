/** tEmitter v1.0.0 */
module.exports = (function(){

	// 全局工具函数
	function toArray(args){
		return Array.prototype.slice.call(args);
	}
	function isPlainObject(obj){
		return obj && obj !== null && typeof(obj) == 'object';
	}
	function getParamFunc(getParam, setParam, obj){
		return function(data, widthBaseParam){
			if (isPlainObject(data)) {
				setParam(data, widthBaseParam);
				return obj;
			} else {
				return getParam(data, widthBaseParam);
			}
		};
	}
	function getRunParamFunc(run, base, paramFunc){
		extendDeep(paramFunc, base);
		extend(paramFunc, run);
		return paramFunc;
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
			if (callback(arr[i], i) === false) return;
		}
	}

	function setDisabledCall(funcData){
		funcData.disabled = true;
	}

	function findFuncInList(func, list, callback){
		forEach(list, function(funcData){
			if (funcData.func === func) callback(funcData);
		});
	}
	


	return function(defaultCall, _obj){
		var _before = [],
			_after = [],
			_final = [],
			_baseParam = {},
			_runParam = {};
		

		function getList(stepName) {
			return stepName == 'after' ? _after : stepName == 'final' ? _final : _before;	
		}
		function addEventListener(stepName, data, func){
			if (!func) {
				func = data;
				data = {};
			}
			if (!func) {
				func = stepName;
				stepName = '';
			}

			var funcData = {
				data: data,
				func: func,
				off: function(){
					funcData.disabled = true;
				}
			};

			getList(stepName).push(funcData);

			return funcData;
		}
		function setParam(data, widthBaseParam){
			if (widthBaseParam) extend(_baseParam, data);
			extend(_runParam, data);
		}
		function getParam(name, isBaseParam){
			return isBaseParam ? _baseParam[name] : _runParam[name];
		}
		function removeParam(name, widthBaseParam) {
			if (widthBaseParam) delete _baseParam[name];
			delete _runParam[name];
		}
		
		

		return {
			'on': function(){
				addEventListener.apply(null, arguments);
				return _obj;
			},
			'off': function(stepName, func){
				if (stepName && func) {
					findFuncInList(func, getList(stepName), setDisabledCall);
				} else if (stepName) {
					if (typeof(stepName) == 'function') {
						findFuncInList(stepName, _before, setDisabledCall);
						findFuncInList(stepName, _after, setDisabledCall);
						findFuncInList(stepName, _final, setDisabledCall);
					} else {
						forEach(getList(stepName), setDisabledCall);
					}
				} else {
					forEach(_before, setDisabledCall);
					forEach(_after, setDisabledCall);
					forEach(_final, setDisabledCall);
				}

				return _obj;
			},
			'once': function(){
				var funcData = addEventListener.apply(null, arguments);
				addEventListener('final', function(){
					funcData.disabled = true;
				});
			},
			'param': getParamFunc(getParam, setParam, _obj),
			'removeParam': removeParam,
			'trigger': function(){
				if (defaultCall) return defaultCall.apply(_obj, arguments);
			},
			'emit': function(){
				var args = toArray(arguments),
					preReturn, defaultReturn,
					i, funcData,

					isStop = false,
					isDefaultPrevented = false,
					preventDefaultFn = function(){
						isDefaultPrevented = true;
					},
					getAvailableFuncData = function(list, index){
						var funcData = list[index];
						if (!funcData) return false;

						if (funcData.disabled) {
							list.splice(index, 1);
							return getAvailableFuncData(list, index);
						}
						return funcData;
					},
					runList = function(list){
						// before list run
						for (i = 0; !isStop && i < list.length; i++) {
							funcData = list[i];
							if (funcData.disabled) {
								list.splice(i, 1);
								i--;
								continue;
							}

							args[0] = new Event(funcData);

							preReturn = funcData.func.apply(_obj, args);
							if (preReturn === false) {
								isStop = true;
								break;
							}
						}
					},
					myRunParam = getRunParamFunc(_runParam, _baseParam, getParamFunc(getParam, setParam, _obj));

				_runParam = {};			// 清空 防止影响到内部的嵌套调用

				var Event = function(funcData){
					this['data'] = funcData.data;
					this['off'] = funcData.off;
					this['preReturn'] = preReturn;
					this['next'] = function(){					// 调用next只可能返回两种值 true 和 false
						if (isStop) return false;

						var funcData = getAvailableFuncData(_before, ++i);
						if (funcData) {
							args[0] = new Event(funcData);
							preReturn = funcData.func.apply(_obj, args);
							if (preReturn === false) {
								isStop = true;
								return false;
							}
						}

						return true;
					};
				};
				Event.prototype = {
					'param': myRunParam,
					'removeParam': removeParam,
					'preventDefault': preventDefaultFn
				};

				args.unshift(null);			// Event placeholder


				// after list run
				runList(_before);

				// defaultCall run
				if (!isStop && !isDefaultPrevented && defaultCall) {
					args[0] = {
						'preReturn': preReturn,
						'param': myRunParam,
						'removeParam': removeParam
					};
					preReturn = defaultReturn = defaultCall.apply(_obj, args);
					if (preReturn === false) isStop = true;
				}


				Event.prototype['defaultReturn'] = defaultReturn;

				// after list run
				runList(_after);

				// final list run
				isStop = false;		// 为final 重置isStop
				runList(_final);

				return defaultReturn;
			}
		};
	};

})();