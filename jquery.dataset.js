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
				data[$.camelCase(name.slice(5))] = attr.value;
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
		return this.attr(name, value);
	}
};

$.fn.dataset.dashizeDelimiter = /([a-z])([A-Z])/g;

$.fn.dataset.dashize = function(value) {
	return value.replace($.fn.dataset.dashizeDelimiter, '$1-$2').toLowerCase();
};

})(jQuery);
