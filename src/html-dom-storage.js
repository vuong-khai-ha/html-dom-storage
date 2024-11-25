'use strict';

function HTMLDomStorage() {
	this.__fragment = null;
	this.SELECTOR_WRAPPER = 'js-domStorage';
	this.DEFAULT_MODULE_NAME = 'common';
}

HTMLDomStorage.prototype.__getItemKey = function(moduleName, keyName) {
	return 'js-hds-' + (moduleName || this.DEFAULT_MODULE_NAME) + '-' + keyName;
};

HTMLDomStorage.prototype.__parseData = function(data) {
	return JSON.parse(data);
};

HTMLDomStorage.prototype.__stringifyData = function(data) {
	return JSON.stringify(data);
};

HTMLDomStorage.prototype.__getWrapper = function() {
	return document.getElementById(this.SELECTOR_WRAPPER);
};

HTMLDomStorage.prototype.init = function() {
	if (this.__getWrapper()) return;

	var wrapper = document.createElement('div');
	wrapper.id = this.SELECTOR_WRAPPER;
	document.body.appendChild(wrapper);
};

HTMLDomStorage.prototype.setItem = function(keyName, value, moduleName) {
	var item = document.getElementById(this.__getItemKey(moduleName, keyName));
	if (item) {
		item.textContent = this.__stringifyData(value);
	}
	else {
		item = document.createElement('script');
		item.id = this.__getItemKey(moduleName, keyName);
		item.type = 'application/json';
		item.textContent = this.__stringifyData(value);
		if (this.__fragment !== null) {
			this.__fragment.appendChild(item);
		}
		else {
			this.__getWrapper().appendChild(item);
		}
	}
};

HTMLDomStorage.prototype.getItem = function(keyName, moduleName) {
	var item = document.getElementById(this.__getItemKey(moduleName, keyName));
	return item ? this.__parseData(item.textContent) : null;
};

HTMLDomStorage.prototype.startTransaction = function() {
	this.__fragment = document.createDocumentFragment();
};

HTMLDomStorage.prototype.abortTransaction = function() {
	this.__fragment = null;
};

HTMLDomStorage.prototype.commitTransaction = function() {
	if (this.__fragment) {
		this.__getWrapper().appendChild(this.__fragment);
	}
	this.__fragment = null;
};

module.exports = HTMLDomStorage;
