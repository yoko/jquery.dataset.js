(function($) {

$.fn.dataset = function(key, value) {
	var name;

	if (key === undefined) {
		if (!this.length || this[0].nodeType != 1) return this;

		var data = {},
			attrs = this[0].attributes, attr;

		for (var i = 0, l = attrs.length; i < l; ++i) {
			attr = attrs[i];
			name = attr.name;
			if (name.indexOf('data-') === 0) {
				data[$.fn.dataset.camelize(name.slice(5))] = attr.value;
			}
		}
		return data;
	}
	else if (typeof key == 'object') {
		for (var k in key) {
			name = 'data-' + $.fn.dataset.dashize(k);
			this.attr(name, key[k]);
		}
		return this;
	}
	else {
		name = 'data-' + $.fn.dataset.dashize(key);
		// [1.7.2] undefined な value を渡すと挙動が変わる（arguments.length を見るようになった）ので事前に値を確認して渡さないように
		return value === undefined ? this.attr(name) : this.attr(name, value);
	}
};

var dashize_pattern = /([a-z])([A-Z])/g,
	camelize_pattern = /-([a-z]|[0-9])/ig;

$.fn.dataset.dashize = function(value) {
	return value.replace(dashize_pattern, '$1-$2').toLowerCase();
};

$.fn.dataset.camelize = function(str, upper) {
	str = str.replace(camelize_pattern, function(_, letter) {
		return letter.toUpperCase();
	});
	return upper ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

})(jQuery);
