# HTMLDomStorage

A lightweight JavaScript library that provides a novel approach to storing temporary data directly on the HTML DOM. It allows you to store, retrieve, and manage data in the DOM elements.

### Features
- **Lightweight**: No dependencies, small footprint.
- **Efficient Transactions**: Batch multiple operations with transaction support.
- **ES5 Compatible**: Works in legacy and modern browsers.

## Getting Started
---

#### Installation

Install via npm:
```bash
npm install html-dom-storage
```

Or include directly in the browser:
```html
<script src="dist/html-dom-storage.min.js"></script>
```

#### Initialization

Create an instance of `HTMLDomStorage` and initialize the wrapper element:
```javascript
var storage = new HTMLDomStorage();
storage.init(); // Initializes the wrapper in the DOM
```

For module systems (e.g., CommonJS, AMD, or ESM), use the UMD build:
```
const HTMLDomStorage = require('html-dom-storage');
// OR for ES modules
import HTMLDomStorage from 'HTMLDomStorage';
const storage = new HTMLDomStorage();
storage.init();
```

#### Set and Get Items
Store and retrieve JSON-serializable data:
```javascript
// Set a key-value pair
storage.setItem('user', { name: 'Alice', age: 30 });
// Get the value by key
var user = storage.getItem('user');
console.log(user); // { name: 'Alice', age: 30 }
```

#### Use Modules for Organization
Organize data by module names:
```javascript
// Store data in a module
storage.setItem('settings', { theme: 'dark' }, 'preferences');
// Retrieve data from a module
var settings = storage.getItem('settings', 'preferences');
console.log(settings); // { theme: 'dark' }
```

#### Transactions
Batch multiple operations for efficiency:
```javascript
storage.startTransaction();
storage.setItem('user1', { name: 'Bob' });
storage.setItem('user2', { name: 'Eve' });
// Commit all changes at once
storage.commitTransaction();
```

Abort a transaction if needed:
```javascript
storage.startTransaction();
storage.setItem('tempKey', { temp: true });
storage.abortTransaction(); // Discards all changes
```

### Example Usage in HTML
```
<script src="dist/html-dom-storage.min.js"></script>
<script>
  var storage = new HTMLDomStorage();
  storage.init();

  storage.setItem('example', { message: 'Hello, world!' });
  console.log(storage.getItem('example')); // { message: 'Hello, world!' }
</script>
```

## API Reference
---
### `init()`
Initializes the storage wrapper in the DOM.

### `setItem(keyName, value, [moduleName])`
Stores a key-value pair in the DOM.

- **keyName**: `string` - The name of the key.
- **value**: `any` - The value to store (must be JSON-serializable).
- **moduleName** (optional): `string` - The module to organize data.

### `getItem(keyName, [moduleName])`
Retrieves a value by key.

- **keyName**: `string` - The name of the key.
- **moduleName** (optional): `string` - The module where the key is stored.

### `startTransaction()`
Starts a transaction for batching operations.

### `commitTransaction()`
Commits all changes in the current transaction.

### `abortTransaction()`
Aborts the current transaction, discarding all pending changes.
