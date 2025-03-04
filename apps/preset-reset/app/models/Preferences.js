function Preferences() {
}

Preferences.get = function(key, defaultVal) {
	var cookie = new Mojo.Model.Cookie(key);
	var val = cookie.get();
	if(!val) {
		val = defaultVal;
		cookie.put(defaultVal);
	}
	return val;
}

Preferences.set = function(key, val) {
	var cookie = new Mojo.Model.Cookie(key);
	cookie.put(val);
}