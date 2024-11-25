'use strict';

var HTMLDomStorage = require('html-dom-storage');

describe('HTMLDomStorage', function () {
  var storage;

  beforeEach(function () {
    document.body.innerHTML = '';
    storage = new HTMLDomStorage();
  });

  describe('Initialization', function () {
    it('should create the wrapper if not present', function () {
      expect(document.getElementById(storage.SELECTOR_WRAPPER)).toBeNull();
      storage.init();
      expect(document.getElementById(storage.SELECTOR_WRAPPER)).not.toBeNull();
    });

    it('should not re-create if wrapper already exists', function () {
      storage.init();
      var wrapper = document.getElementById(storage.SELECTOR_WRAPPER);
      storage.init();
      expect(document.getElementById(storage.SELECTOR_WRAPPER)).toBe(wrapper);
    });
  });

  describe('setItem and getItem', function () {
    beforeEach(function () {
      storage.init();
    });

    it('should set and get a value', function () {
      storage.setItem('test-key', { data: 'value' });
      expect(storage.getItem('test-key')).toEqual({ data: 'value' });
    });

    it('should overwrite an existing value', function () {
      storage.setItem('test-key', { data: 'value-1' });
      storage.setItem('test-key', { data: 'value-2' });
      expect(storage.getItem('test-key')).toEqual({ data: 'value-2' });
    });

    it('should return null if the key does not exist', function () {
      expect(storage.getItem('non-existent-key')).toBeNull();
    });

    it('should support module-specific keys', function () {
      storage.setItem('test-key', { data: 'value' }, 'customModule');
      var retrieved = storage.getItem('test-key', 'customModule');
      expect(retrieved).toEqual({ data: 'value' });
      expect(storage.getItem('test-key')).toBeNull();
    });
  });

  describe('Transactions', function () {
    beforeEach(function () {
      storage.init();
    });

    it('should not commit changes when transaction is aborted', function () {
      storage.startTransaction();
      storage.setItem('key-1', { data: 'tempValue' });
      storage.abortTransaction();
      expect(storage.getItem('key-1')).toBeNull();
    });

    it('should commit changes in a transaction', function () {
      storage.startTransaction();
      storage.setItem('key-1', { data: 'tempValue' });
      storage.commitTransaction();
      expect(storage.getItem('key-1')).toEqual({ data: 'tempValue' });
    });

    it('should support multiple operations in a single transaction', function () {
      storage.startTransaction();
      storage.setItem('key-1', { data: 'value-1' });
      storage.setItem('key-2', { data: 'value-2' });
      storage.commitTransaction();
      expect(storage.getItem('key-1')).toEqual({ data: 'value-1' });
      expect(storage.getItem('key-2')).toEqual({ data: 'value-2' });
    });
  });

  describe('Internal methods', function () {
    it('should generate correct item keys', function () {
      expect(storage.__getItemKey('customModule', 'test-key')).toBe('js-hds-customModule-test-key');
      expect(storage.__getItemKey(null, 'test-key')).toBe('js-hds-common-test-key');
    });

    it('should parse and stringify data correctly', function () {
      var data = { key: 'value' };
      var stringified = storage.__stringifyData(data);
      expect(stringified).toBe(JSON.stringify(data));
      expect(storage.__parseData(stringified)).toEqual(data);
    });
  });
});
