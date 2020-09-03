["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/history/html5history.js"],"~:js","goog.provide(\"goog.history.Html5History\");\ngoog.provide(\"goog.history.Html5History.TokenTransformer\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.events\");\ngoog.require(\"goog.events.EventTarget\");\ngoog.require(\"goog.events.EventType\");\ngoog.require(\"goog.history.Event\");\ngoog.history.Html5History = function(opt_win, opt_transformer) {\n  goog.events.EventTarget.call(this);\n  goog.asserts.assert(goog.history.Html5History.isSupported(opt_win), \"HTML5 history is not supported.\");\n  this.window_ = opt_win || window;\n  this.transformer_ = opt_transformer || null;\n  this.lastFragment_ = null;\n  goog.events.listen(this.window_, goog.events.EventType.POPSTATE, this.onHistoryEvent_, false, this);\n  goog.events.listen(this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_, false, this);\n};\ngoog.inherits(goog.history.Html5History, goog.events.EventTarget);\ngoog.history.Html5History.isSupported = function(opt_win) {\n  var win = opt_win || window;\n  return !!(win.history && win.history.pushState);\n};\ngoog.history.Html5History.prototype.enabled_ = false;\ngoog.history.Html5History.prototype.useFragment_ = true;\ngoog.history.Html5History.prototype.pathPrefix_ = \"/\";\ngoog.history.Html5History.prototype.setEnabled = function(enable) {\n  if (enable == this.enabled_) {\n    return;\n  }\n  this.enabled_ = enable;\n  if (enable) {\n    this.dispatchEvent(new goog.history.Event(this.getToken(), false));\n  }\n};\ngoog.history.Html5History.prototype.getToken = function() {\n  if (this.useFragment_) {\n    return goog.asserts.assertString(this.getFragment_());\n  } else {\n    return this.transformer_ ? this.transformer_.retrieveToken(this.pathPrefix_, this.window_.location) : this.window_.location.pathname.substr(this.pathPrefix_.length);\n  }\n};\ngoog.history.Html5History.prototype.setToken = function(token, opt_title) {\n  if (token == this.getToken()) {\n    return;\n  }\n  this.window_.history.pushState(null, opt_title || this.window_.document.title || \"\", this.getUrl_(token));\n  this.dispatchEvent(new goog.history.Event(token, false));\n};\ngoog.history.Html5History.prototype.replaceToken = function(token, opt_title) {\n  this.window_.history.replaceState(null, opt_title || this.window_.document.title || \"\", this.getUrl_(token));\n  this.dispatchEvent(new goog.history.Event(token, false));\n};\ngoog.history.Html5History.prototype.disposeInternal = function() {\n  goog.events.unlisten(this.window_, goog.events.EventType.POPSTATE, this.onHistoryEvent_, false, this);\n  if (this.useFragment_) {\n    goog.events.unlisten(this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_, false, this);\n  }\n};\ngoog.history.Html5History.prototype.setUseFragment = function(useFragment) {\n  if (this.useFragment_ != useFragment) {\n    if (useFragment) {\n      goog.events.listen(this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_, false, this);\n    } else {\n      goog.events.unlisten(this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_, false, this);\n    }\n    this.useFragment_ = useFragment;\n  }\n};\ngoog.history.Html5History.prototype.setPathPrefix = function(pathPrefix) {\n  this.pathPrefix_ = pathPrefix;\n};\ngoog.history.Html5History.prototype.getPathPrefix = function() {\n  return this.pathPrefix_;\n};\ngoog.history.Html5History.prototype.getFragment_ = function() {\n  if (this.useFragment_) {\n    var loc = this.window_.location.href;\n    var index = loc.indexOf(\"#\");\n    return index < 0 ? \"\" : loc.substring(index + 1);\n  } else {\n    return null;\n  }\n};\ngoog.history.Html5History.prototype.getUrl_ = function(token) {\n  if (this.useFragment_) {\n    return \"#\" + token;\n  } else {\n    return this.transformer_ ? this.transformer_.createUrl(token, this.pathPrefix_, this.window_.location) : this.pathPrefix_ + token + this.window_.location.search;\n  }\n};\ngoog.history.Html5History.prototype.onHistoryEvent_ = function(e) {\n  if (this.enabled_) {\n    var fragment = this.getFragment_();\n    if (e.type == goog.events.EventType.POPSTATE || fragment != this.lastFragment_) {\n      this.lastFragment_ = fragment;\n      this.dispatchEvent(new goog.history.Event(this.getToken(), true));\n    }\n  }\n};\ngoog.history.Html5History.TokenTransformer = function() {\n};\ngoog.history.Html5History.TokenTransformer.prototype.retrieveToken = function(pathPrefix, location) {\n};\ngoog.history.Html5History.TokenTransformer.prototype.createUrl = function(token, pathPrefix, location) {\n};\n","~:source","// Copyright 2010 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview HTML5 based history implementation, compatible with\n * goog.History.\n *\n * TODO(user): There should really be a history interface and multiple\n * implementations.\n *\n */\n\n\ngoog.provide('goog.history.Html5History');\ngoog.provide('goog.history.Html5History.TokenTransformer');\n\ngoog.require('goog.asserts');\ngoog.require('goog.events');\ngoog.require('goog.events.EventTarget');\ngoog.require('goog.events.EventType');\ngoog.require('goog.history.Event');\n\n\n\n/**\n * An implementation compatible with goog.History that uses the HTML5\n * history APIs.\n *\n * @param {Window=} opt_win The window to listen/dispatch history events on.\n * @param {goog.history.Html5History.TokenTransformer=} opt_transformer\n *     The token transformer that is used to create URL from the token\n *     when storing token without using hash fragment.\n * @constructor\n * @extends {goog.events.EventTarget}\n * @final\n */\ngoog.history.Html5History = function(opt_win, opt_transformer) {\n  goog.events.EventTarget.call(this);\n  goog.asserts.assert(\n      goog.history.Html5History.isSupported(opt_win),\n      'HTML5 history is not supported.');\n\n  /**\n   * The window object to use for history tokens.  Typically the top window.\n   * @type {Window}\n   * @private\n   */\n  this.window_ = opt_win || window;\n\n  /**\n   * The token transformer that is used to create URL from the token\n   * when storing token without using hash fragment.\n   * @type {goog.history.Html5History.TokenTransformer}\n   * @private\n   */\n  this.transformer_ = opt_transformer || null;\n\n  /**\n   * The fragment of the last navigation. Used to eliminate duplicate/redundant\n   * NAVIGATE events when a POPSTATE and HASHCHANGE event are triggered for the\n   * same navigation (e.g., back button click).\n   * @private {?string}\n   */\n  this.lastFragment_ = null;\n\n  goog.events.listen(\n      this.window_, goog.events.EventType.POPSTATE, this.onHistoryEvent_, false,\n      this);\n  goog.events.listen(\n      this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\n      false, this);\n};\ngoog.inherits(goog.history.Html5History, goog.events.EventTarget);\n\n\n/**\n * Returns whether Html5History is supported.\n * @param {Window=} opt_win Optional window to check.\n * @return {boolean} Whether html5 history is supported.\n */\ngoog.history.Html5History.isSupported = function(opt_win) {\n  var win = opt_win || window;\n  return !!(win.history && win.history.pushState);\n};\n\n\n/**\n * Status of when the object is active and dispatching events.\n * @type {boolean}\n * @private\n */\ngoog.history.Html5History.prototype.enabled_ = false;\n\n\n/**\n * Whether to use the fragment to store the token, defaults to true.\n * @type {boolean}\n * @private\n */\ngoog.history.Html5History.prototype.useFragment_ = true;\n\n\n/**\n * If useFragment is false the path will be used, the path prefix will be\n * prepended to all tokens. Defaults to '/'.\n * @type {string}\n * @private\n */\ngoog.history.Html5History.prototype.pathPrefix_ = '/';\n\n\n/**\n * Starts or stops the History.  When enabled, the History object\n * will immediately fire an event for the current location. The caller can set\n * up event listeners between the call to the constructor and the call to\n * setEnabled.\n *\n * @param {boolean} enable Whether to enable history.\n */\ngoog.history.Html5History.prototype.setEnabled = function(enable) {\n  if (enable == this.enabled_) {\n    return;\n  }\n\n  this.enabled_ = enable;\n\n  if (enable) {\n    this.dispatchEvent(new goog.history.Event(this.getToken(), false));\n  }\n};\n\n\n/**\n * Returns the current token.\n * @return {string} The current token.\n */\ngoog.history.Html5History.prototype.getToken = function() {\n  if (this.useFragment_) {\n    return goog.asserts.assertString(this.getFragment_());\n  } else {\n    return this.transformer_ ?\n        this.transformer_.retrieveToken(\n            this.pathPrefix_, this.window_.location) :\n        this.window_.location.pathname.substr(this.pathPrefix_.length);\n  }\n};\n\n\n/**\n * Sets the history state.\n * @param {string} token The history state identifier.\n * @param {string=} opt_title Optional title to associate with history entry.\n */\ngoog.history.Html5History.prototype.setToken = function(token, opt_title) {\n  if (token == this.getToken()) {\n    return;\n  }\n\n  // Per externs/gecko_dom.js document.title can be null.\n  this.window_.history.pushState(\n      null, opt_title || this.window_.document.title || '',\n      this.getUrl_(token));\n  this.dispatchEvent(new goog.history.Event(token, false));\n};\n\n\n/**\n * Replaces the current history state without affecting the rest of the history\n * stack.\n * @param {string} token The history state identifier.\n * @param {string=} opt_title Optional title to associate with history entry.\n */\ngoog.history.Html5History.prototype.replaceToken = function(token, opt_title) {\n  // Per externs/gecko_dom.js document.title can be null.\n  this.window_.history.replaceState(\n      null, opt_title || this.window_.document.title || '',\n      this.getUrl_(token));\n  this.dispatchEvent(new goog.history.Event(token, false));\n};\n\n\n/** @override */\ngoog.history.Html5History.prototype.disposeInternal = function() {\n  goog.events.unlisten(\n      this.window_, goog.events.EventType.POPSTATE, this.onHistoryEvent_, false,\n      this);\n  if (this.useFragment_) {\n    goog.events.unlisten(\n        this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\n        false, this);\n  }\n};\n\n\n/**\n * Sets whether to use the fragment to store tokens.\n * @param {boolean} useFragment Whether to use the fragment.\n */\ngoog.history.Html5History.prototype.setUseFragment = function(useFragment) {\n  if (this.useFragment_ != useFragment) {\n    if (useFragment) {\n      goog.events.listen(\n          this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\n          false, this);\n    } else {\n      goog.events.unlisten(\n          this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\n          false, this);\n    }\n    this.useFragment_ = useFragment;\n  }\n};\n\n\n/**\n * Sets the path prefix to use if storing tokens in the path. The path\n * prefix should start and end with slash.\n * @param {string} pathPrefix Sets the path prefix.\n */\ngoog.history.Html5History.prototype.setPathPrefix = function(pathPrefix) {\n  this.pathPrefix_ = pathPrefix;\n};\n\n\n/**\n * Gets the path prefix.\n * @return {string} The path prefix.\n */\ngoog.history.Html5History.prototype.getPathPrefix = function() {\n  return this.pathPrefix_;\n};\n\n\n/**\n * Gets the current hash fragment, if useFragment_ is enabled.\n * @return {?string} The hash fragment.\n * @private\n */\ngoog.history.Html5History.prototype.getFragment_ = function() {\n  if (this.useFragment_) {\n    var loc = this.window_.location.href;\n    var index = loc.indexOf('#');\n    return index < 0 ? '' : loc.substring(index + 1);\n  } else {\n    return null;\n  }\n};\n\n\n/**\n * Gets the URL to set when calling history.pushState\n * @param {string} token The history token.\n * @return {string} The URL.\n * @private\n */\ngoog.history.Html5History.prototype.getUrl_ = function(token) {\n  if (this.useFragment_) {\n    return '#' + token;\n  } else {\n    return this.transformer_ ?\n        this.transformer_.createUrl(\n            token, this.pathPrefix_, this.window_.location) :\n        this.pathPrefix_ + token + this.window_.location.search;\n  }\n};\n\n\n/**\n * Handles history events dispatched by the browser.\n * @param {goog.events.BrowserEvent} e The browser event object.\n * @private\n */\ngoog.history.Html5History.prototype.onHistoryEvent_ = function(e) {\n  if (this.enabled_) {\n    var fragment = this.getFragment_();\n    // Only fire NAVIGATE event if it's POPSTATE or if the fragment has changed\n    // without a POPSTATE event. The latter is an indication the browser doesn't\n    // support POPSTATE, and the event is a HASHCHANGE instead.\n    if (e.type == goog.events.EventType.POPSTATE ||\n        fragment != this.lastFragment_) {\n      this.lastFragment_ = fragment;\n      this.dispatchEvent(new goog.history.Event(this.getToken(), true));\n    }\n  }\n};\n\n\n\n/**\n * A token transformer that can create a URL from a history\n * token. This is used by `goog.history.Html5History` to create\n * URL when storing token without the hash fragment.\n *\n * Given a `window.location` object containing the location\n * created by `createUrl`, the token transformer allows\n * retrieval of the token back via `retrieveToken`.\n *\n * @interface\n */\ngoog.history.Html5History.TokenTransformer = function() {};\n\n\n/**\n * Retrieves a history token given the path prefix and\n * `window.location` object.\n *\n * @param {string} pathPrefix The path prefix to use when storing token\n *     in a path; always begin with a slash.\n * @param {Location} location The `window.location` object.\n *     Treat this object as read-only.\n * @return {string} token The history token.\n */\ngoog.history.Html5History.TokenTransformer.prototype.retrieveToken = function(\n    pathPrefix, location) {};\n\n\n/**\n * Creates a URL to be pushed into HTML5 history stack when storing\n * token without using hash fragment.\n *\n * @param {string} token The history token.\n * @param {string} pathPrefix The path prefix to use when storing token\n *     in a path; always begin with a slash.\n * @param {Location} location The `window.location` object.\n *     Treat this object as read-only.\n * @return {string} url The complete URL string from path onwards\n *     (without {@code protocol://host:port} part); must begin with a\n *     slash.\n */\ngoog.history.Html5History.TokenTransformer.prototype.createUrl = function(\n    token, pathPrefix, location) {};\n","~:compiled-at",1599160970412,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.history.html5history.js\",\n\"lineCount\":105,\n\"mappings\":\"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\",\n\"sources\":[\"goog/history/html5history.js\"],\n\"sourcesContent\":[\"// Copyright 2010 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview HTML5 based history implementation, compatible with\\n * goog.History.\\n *\\n * TODO(user): There should really be a history interface and multiple\\n * implementations.\\n *\\n */\\n\\n\\ngoog.provide('goog.history.Html5History');\\ngoog.provide('goog.history.Html5History.TokenTransformer');\\n\\ngoog.require('goog.asserts');\\ngoog.require('goog.events');\\ngoog.require('goog.events.EventTarget');\\ngoog.require('goog.events.EventType');\\ngoog.require('goog.history.Event');\\n\\n\\n\\n/**\\n * An implementation compatible with goog.History that uses the HTML5\\n * history APIs.\\n *\\n * @param {Window=} opt_win The window to listen/dispatch history events on.\\n * @param {goog.history.Html5History.TokenTransformer=} opt_transformer\\n *     The token transformer that is used to create URL from the token\\n *     when storing token without using hash fragment.\\n * @constructor\\n * @extends {goog.events.EventTarget}\\n * @final\\n */\\ngoog.history.Html5History = function(opt_win, opt_transformer) {\\n  goog.events.EventTarget.call(this);\\n  goog.asserts.assert(\\n      goog.history.Html5History.isSupported(opt_win),\\n      'HTML5 history is not supported.');\\n\\n  /**\\n   * The window object to use for history tokens.  Typically the top window.\\n   * @type {Window}\\n   * @private\\n   */\\n  this.window_ = opt_win || window;\\n\\n  /**\\n   * The token transformer that is used to create URL from the token\\n   * when storing token without using hash fragment.\\n   * @type {goog.history.Html5History.TokenTransformer}\\n   * @private\\n   */\\n  this.transformer_ = opt_transformer || null;\\n\\n  /**\\n   * The fragment of the last navigation. Used to eliminate duplicate/redundant\\n   * NAVIGATE events when a POPSTATE and HASHCHANGE event are triggered for the\\n   * same navigation (e.g., back button click).\\n   * @private {?string}\\n   */\\n  this.lastFragment_ = null;\\n\\n  goog.events.listen(\\n      this.window_, goog.events.EventType.POPSTATE, this.onHistoryEvent_, false,\\n      this);\\n  goog.events.listen(\\n      this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\\n      false, this);\\n};\\ngoog.inherits(goog.history.Html5History, goog.events.EventTarget);\\n\\n\\n/**\\n * Returns whether Html5History is supported.\\n * @param {Window=} opt_win Optional window to check.\\n * @return {boolean} Whether html5 history is supported.\\n */\\ngoog.history.Html5History.isSupported = function(opt_win) {\\n  var win = opt_win || window;\\n  return !!(win.history && win.history.pushState);\\n};\\n\\n\\n/**\\n * Status of when the object is active and dispatching events.\\n * @type {boolean}\\n * @private\\n */\\ngoog.history.Html5History.prototype.enabled_ = false;\\n\\n\\n/**\\n * Whether to use the fragment to store the token, defaults to true.\\n * @type {boolean}\\n * @private\\n */\\ngoog.history.Html5History.prototype.useFragment_ = true;\\n\\n\\n/**\\n * If useFragment is false the path will be used, the path prefix will be\\n * prepended to all tokens. Defaults to '/'.\\n * @type {string}\\n * @private\\n */\\ngoog.history.Html5History.prototype.pathPrefix_ = '/';\\n\\n\\n/**\\n * Starts or stops the History.  When enabled, the History object\\n * will immediately fire an event for the current location. The caller can set\\n * up event listeners between the call to the constructor and the call to\\n * setEnabled.\\n *\\n * @param {boolean} enable Whether to enable history.\\n */\\ngoog.history.Html5History.prototype.setEnabled = function(enable) {\\n  if (enable == this.enabled_) {\\n    return;\\n  }\\n\\n  this.enabled_ = enable;\\n\\n  if (enable) {\\n    this.dispatchEvent(new goog.history.Event(this.getToken(), false));\\n  }\\n};\\n\\n\\n/**\\n * Returns the current token.\\n * @return {string} The current token.\\n */\\ngoog.history.Html5History.prototype.getToken = function() {\\n  if (this.useFragment_) {\\n    return goog.asserts.assertString(this.getFragment_());\\n  } else {\\n    return this.transformer_ ?\\n        this.transformer_.retrieveToken(\\n            this.pathPrefix_, this.window_.location) :\\n        this.window_.location.pathname.substr(this.pathPrefix_.length);\\n  }\\n};\\n\\n\\n/**\\n * Sets the history state.\\n * @param {string} token The history state identifier.\\n * @param {string=} opt_title Optional title to associate with history entry.\\n */\\ngoog.history.Html5History.prototype.setToken = function(token, opt_title) {\\n  if (token == this.getToken()) {\\n    return;\\n  }\\n\\n  // Per externs/gecko_dom.js document.title can be null.\\n  this.window_.history.pushState(\\n      null, opt_title || this.window_.document.title || '',\\n      this.getUrl_(token));\\n  this.dispatchEvent(new goog.history.Event(token, false));\\n};\\n\\n\\n/**\\n * Replaces the current history state without affecting the rest of the history\\n * stack.\\n * @param {string} token The history state identifier.\\n * @param {string=} opt_title Optional title to associate with history entry.\\n */\\ngoog.history.Html5History.prototype.replaceToken = function(token, opt_title) {\\n  // Per externs/gecko_dom.js document.title can be null.\\n  this.window_.history.replaceState(\\n      null, opt_title || this.window_.document.title || '',\\n      this.getUrl_(token));\\n  this.dispatchEvent(new goog.history.Event(token, false));\\n};\\n\\n\\n/** @override */\\ngoog.history.Html5History.prototype.disposeInternal = function() {\\n  goog.events.unlisten(\\n      this.window_, goog.events.EventType.POPSTATE, this.onHistoryEvent_, false,\\n      this);\\n  if (this.useFragment_) {\\n    goog.events.unlisten(\\n        this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\\n        false, this);\\n  }\\n};\\n\\n\\n/**\\n * Sets whether to use the fragment to store tokens.\\n * @param {boolean} useFragment Whether to use the fragment.\\n */\\ngoog.history.Html5History.prototype.setUseFragment = function(useFragment) {\\n  if (this.useFragment_ != useFragment) {\\n    if (useFragment) {\\n      goog.events.listen(\\n          this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\\n          false, this);\\n    } else {\\n      goog.events.unlisten(\\n          this.window_, goog.events.EventType.HASHCHANGE, this.onHistoryEvent_,\\n          false, this);\\n    }\\n    this.useFragment_ = useFragment;\\n  }\\n};\\n\\n\\n/**\\n * Sets the path prefix to use if storing tokens in the path. The path\\n * prefix should start and end with slash.\\n * @param {string} pathPrefix Sets the path prefix.\\n */\\ngoog.history.Html5History.prototype.setPathPrefix = function(pathPrefix) {\\n  this.pathPrefix_ = pathPrefix;\\n};\\n\\n\\n/**\\n * Gets the path prefix.\\n * @return {string} The path prefix.\\n */\\ngoog.history.Html5History.prototype.getPathPrefix = function() {\\n  return this.pathPrefix_;\\n};\\n\\n\\n/**\\n * Gets the current hash fragment, if useFragment_ is enabled.\\n * @return {?string} The hash fragment.\\n * @private\\n */\\ngoog.history.Html5History.prototype.getFragment_ = function() {\\n  if (this.useFragment_) {\\n    var loc = this.window_.location.href;\\n    var index = loc.indexOf('#');\\n    return index < 0 ? '' : loc.substring(index + 1);\\n  } else {\\n    return null;\\n  }\\n};\\n\\n\\n/**\\n * Gets the URL to set when calling history.pushState\\n * @param {string} token The history token.\\n * @return {string} The URL.\\n * @private\\n */\\ngoog.history.Html5History.prototype.getUrl_ = function(token) {\\n  if (this.useFragment_) {\\n    return '#' + token;\\n  } else {\\n    return this.transformer_ ?\\n        this.transformer_.createUrl(\\n            token, this.pathPrefix_, this.window_.location) :\\n        this.pathPrefix_ + token + this.window_.location.search;\\n  }\\n};\\n\\n\\n/**\\n * Handles history events dispatched by the browser.\\n * @param {goog.events.BrowserEvent} e The browser event object.\\n * @private\\n */\\ngoog.history.Html5History.prototype.onHistoryEvent_ = function(e) {\\n  if (this.enabled_) {\\n    var fragment = this.getFragment_();\\n    // Only fire NAVIGATE event if it's POPSTATE or if the fragment has changed\\n    // without a POPSTATE event. The latter is an indication the browser doesn't\\n    // support POPSTATE, and the event is a HASHCHANGE instead.\\n    if (e.type == goog.events.EventType.POPSTATE ||\\n        fragment != this.lastFragment_) {\\n      this.lastFragment_ = fragment;\\n      this.dispatchEvent(new goog.history.Event(this.getToken(), true));\\n    }\\n  }\\n};\\n\\n\\n\\n/**\\n * A token transformer that can create a URL from a history\\n * token. This is used by `goog.history.Html5History` to create\\n * URL when storing token without the hash fragment.\\n *\\n * Given a `window.location` object containing the location\\n * created by `createUrl`, the token transformer allows\\n * retrieval of the token back via `retrieveToken`.\\n *\\n * @interface\\n */\\ngoog.history.Html5History.TokenTransformer = function() {};\\n\\n\\n/**\\n * Retrieves a history token given the path prefix and\\n * `window.location` object.\\n *\\n * @param {string} pathPrefix The path prefix to use when storing token\\n *     in a path; always begin with a slash.\\n * @param {Location} location The `window.location` object.\\n *     Treat this object as read-only.\\n * @return {string} token The history token.\\n */\\ngoog.history.Html5History.TokenTransformer.prototype.retrieveToken = function(\\n    pathPrefix, location) {};\\n\\n\\n/**\\n * Creates a URL to be pushed into HTML5 history stack when storing\\n * token without using hash fragment.\\n *\\n * @param {string} token The history token.\\n * @param {string} pathPrefix The path prefix to use when storing token\\n *     in a path; always begin with a slash.\\n * @param {Location} location The `window.location` object.\\n *     Treat this object as read-only.\\n * @return {string} url The complete URL string from path onwards\\n *     (without {@code protocol://host:port} part); must begin with a\\n *     slash.\\n */\\ngoog.history.Html5History.TokenTransformer.prototype.createUrl = function(\\n    token, pathPrefix, location) {};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"history\",\"Html5History\",\"goog.history.Html5History\",\"opt_win\",\"opt_transformer\",\"events\",\"EventTarget\",\"call\",\"asserts\",\"assert\",\"isSupported\",\"window_\",\"window\",\"transformer_\",\"lastFragment_\",\"listen\",\"EventType\",\"POPSTATE\",\"onHistoryEvent_\",\"HASHCHANGE\",\"inherits\",\"goog.history.Html5History.isSupported\",\"win\",\"pushState\",\"prototype\",\"enabled_\",\"useFragment_\",\"pathPrefix_\",\"setEnabled\",\"goog.history.Html5History.prototype.setEnabled\",\"enable\",\"dispatchEvent\",\"Event\",\"getToken\",\"goog.history.Html5History.prototype.getToken\",\"assertString\",\"getFragment_\",\"retrieveToken\",\"location\",\"pathname\",\"substr\",\"length\",\"setToken\",\"goog.history.Html5History.prototype.setToken\",\"token\",\"opt_title\",\"document\",\"title\",\"getUrl_\",\"replaceToken\",\"goog.history.Html5History.prototype.replaceToken\",\"replaceState\",\"disposeInternal\",\"goog.history.Html5History.prototype.disposeInternal\",\"unlisten\",\"setUseFragment\",\"goog.history.Html5History.prototype.setUseFragment\",\"useFragment\",\"setPathPrefix\",\"goog.history.Html5History.prototype.setPathPrefix\",\"pathPrefix\",\"getPathPrefix\",\"goog.history.Html5History.prototype.getPathPrefix\",\"goog.history.Html5History.prototype.getFragment_\",\"loc\",\"href\",\"index\",\"indexOf\",\"substring\",\"goog.history.Html5History.prototype.getUrl_\",\"createUrl\",\"search\",\"goog.history.Html5History.prototype.onHistoryEvent_\",\"e\",\"fragment\",\"type\",\"TokenTransformer\",\"goog.history.Html5History.TokenTransformer\",\"goog.history.Html5History.TokenTransformer.prototype.retrieveToken\",\"goog.history.Html5History.TokenTransformer.prototype.createUrl\"]\n}\n"]