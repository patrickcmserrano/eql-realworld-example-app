["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/net/xmlhttp.js"],"~:js","goog.provide(\"goog.net.DefaultXmlHttpFactory\");\ngoog.provide(\"goog.net.XmlHttp\");\ngoog.provide(\"goog.net.XmlHttp.OptionType\");\ngoog.provide(\"goog.net.XmlHttp.ReadyState\");\ngoog.provide(\"goog.net.XmlHttpDefines\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.net.WrapperXmlHttpFactory\");\ngoog.require(\"goog.net.XmlHttpFactory\");\ngoog.net.XmlHttp = function() {\n  return goog.net.XmlHttp.factory_.createInstance();\n};\ngoog.net.XmlHttp.ASSUME_NATIVE_XHR = goog.define(\"goog.net.XmlHttp.ASSUME_NATIVE_XHR\", false);\ngoog.net.XmlHttpDefines = {};\ngoog.net.XmlHttpDefines.ASSUME_NATIVE_XHR = goog.define(\"goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR\", false);\ngoog.net.XmlHttp.getOptions = function() {\n  return goog.net.XmlHttp.factory_.getOptions();\n};\ngoog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};\ngoog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};\ngoog.net.XmlHttp.factory_;\ngoog.net.XmlHttp.setFactory = function(factory, optionsFactory) {\n  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(factory), goog.asserts.assert(optionsFactory)));\n};\ngoog.net.XmlHttp.setGlobalFactory = function(factory) {\n  goog.net.XmlHttp.factory_ = factory;\n};\ngoog.net.DefaultXmlHttpFactory = function() {\n  goog.net.XmlHttpFactory.call(this);\n};\ngoog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);\ngoog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {\n  var progId = this.getProgId_();\n  if (progId) {\n    return new ActiveXObject(progId);\n  } else {\n    return new XMLHttpRequest;\n  }\n};\ngoog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {\n  var progId = this.getProgId_();\n  var options = {};\n  if (progId) {\n    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;\n    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true;\n  }\n  return options;\n};\ngoog.net.DefaultXmlHttpFactory.prototype.ieProgId_;\ngoog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {\n  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {\n    return \"\";\n  }\n  if (!this.ieProgId_ && typeof XMLHttpRequest == \"undefined\" && typeof ActiveXObject != \"undefined\") {\n    var ACTIVE_X_IDENTS = [\"MSXML2.XMLHTTP.6.0\", \"MSXML2.XMLHTTP.3.0\", \"MSXML2.XMLHTTP\", \"Microsoft.XMLHTTP\"];\n    for (var i = 0; i < ACTIVE_X_IDENTS.length; i++) {\n      var candidate = ACTIVE_X_IDENTS[i];\n      try {\n        new ActiveXObject(candidate);\n        this.ieProgId_ = candidate;\n        return candidate;\n      } catch (e) {\n      }\n    }\n    throw new Error(\"Could not create ActiveXObject. ActiveX might be disabled,\" + \" or MSXML might not be installed\");\n  }\n  return this.ieProgId_;\n};\ngoog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);\n","~:source","// Copyright 2006 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Low level handling of XMLHttpRequest.\n * @author arv@google.com (Erik Arvidsson)\n * @author dbk@google.com (David Barrett-Kahn)\n */\n\ngoog.provide('goog.net.DefaultXmlHttpFactory');\ngoog.provide('goog.net.XmlHttp');\ngoog.provide('goog.net.XmlHttp.OptionType');\ngoog.provide('goog.net.XmlHttp.ReadyState');\ngoog.provide('goog.net.XmlHttpDefines');\n\ngoog.require('goog.asserts');\ngoog.require('goog.net.WrapperXmlHttpFactory');\ngoog.require('goog.net.XmlHttpFactory');\n\n\n/**\n * Static class for creating XMLHttpRequest objects.\n * @return {!goog.net.XhrLike.OrNative} A new XMLHttpRequest object.\n */\ngoog.net.XmlHttp = function() {\n  return goog.net.XmlHttp.factory_.createInstance();\n};\n\n\n/**\n * @define {boolean} Whether to assume XMLHttpRequest exists. Setting this to\n *     true bypasses the ActiveX probing code.\n * NOTE(ruilopes): Due to the way JSCompiler works, this define *will not* strip\n * out the ActiveX probing code from binaries.  To achieve this, use\n * `goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR` instead.\n * TODO(ruilopes): Collapse both defines.\n */\ngoog.net.XmlHttp.ASSUME_NATIVE_XHR =\n    goog.define('goog.net.XmlHttp.ASSUME_NATIVE_XHR', false);\n\n\n/** @const */\ngoog.net.XmlHttpDefines = {};\n\n\n/**\n * @define {boolean} Whether to assume XMLHttpRequest exists. Setting this to\n *     true eliminates the ActiveX probing code.\n */\ngoog.net.XmlHttpDefines.ASSUME_NATIVE_XHR =\n    goog.define('goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR', false);\n\n\n/**\n * Gets the options to use with the XMLHttpRequest objects obtained using\n * the static methods.\n * @return {Object} The options.\n */\ngoog.net.XmlHttp.getOptions = function() {\n  return goog.net.XmlHttp.factory_.getOptions();\n};\n\n\n/**\n * Type of options that an XmlHttp object can have.\n * @enum {number}\n */\ngoog.net.XmlHttp.OptionType = {\n  /**\n   * Whether a goog.nullFunction should be used to clear the onreadystatechange\n   * handler instead of null.\n   */\n  USE_NULL_FUNCTION: 0,\n\n  /**\n   * NOTE(user): In IE if send() errors on a *local* request the readystate\n   * is still changed to COMPLETE.  We need to ignore it and allow the\n   * try/catch around send() to pick up the error.\n   */\n  LOCAL_REQUEST_ERROR: 1\n};\n\n\n/**\n * Status constants for XMLHTTP, matches:\n * https://msdn.microsoft.com/en-us/library/ms534361(v=vs.85).aspx\n * @enum {number}\n */\ngoog.net.XmlHttp.ReadyState = {\n  /**\n   * Constant for when xmlhttprequest.readyState is uninitialized\n   */\n  UNINITIALIZED: 0,\n\n  /**\n   * Constant for when xmlhttprequest.readyState is loading.\n   */\n  LOADING: 1,\n\n  /**\n   * Constant for when xmlhttprequest.readyState is loaded.\n   */\n  LOADED: 2,\n\n  /**\n   * Constant for when xmlhttprequest.readyState is in an interactive state.\n   */\n  INTERACTIVE: 3,\n\n  /**\n   * Constant for when xmlhttprequest.readyState is completed\n   */\n  COMPLETE: 4\n};\n\n\n/**\n * The global factory instance for creating XMLHttpRequest objects.\n * @type {goog.net.XmlHttpFactory}\n * @private\n */\ngoog.net.XmlHttp.factory_;\n\n\n/**\n * Sets the factories for creating XMLHttpRequest objects and their options.\n * @param {Function} factory The factory for XMLHttpRequest objects.\n * @param {Function} optionsFactory The factory for options.\n * @deprecated Use setGlobalFactory instead.\n */\ngoog.net.XmlHttp.setFactory = function(factory, optionsFactory) {\n  goog.net.XmlHttp.setGlobalFactory(\n      new goog.net.WrapperXmlHttpFactory(\n          goog.asserts.assert(factory), goog.asserts.assert(optionsFactory)));\n};\n\n\n/**\n * Sets the global factory object.\n * @param {!goog.net.XmlHttpFactory} factory New global factory object.\n */\ngoog.net.XmlHttp.setGlobalFactory = function(factory) {\n  goog.net.XmlHttp.factory_ = factory;\n};\n\n\n\n/**\n * Default factory to use when creating xhr objects.  You probably shouldn't be\n * instantiating this directly, but rather using it via goog.net.XmlHttp.\n * @extends {goog.net.XmlHttpFactory}\n * @constructor\n */\ngoog.net.DefaultXmlHttpFactory = function() {\n  goog.net.XmlHttpFactory.call(this);\n};\ngoog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);\n\n\n/** @override */\ngoog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {\n  var progId = this.getProgId_();\n  if (progId) {\n    return new ActiveXObject(progId);\n  } else {\n    return new XMLHttpRequest();\n  }\n};\n\n\n/** @override */\ngoog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {\n  var progId = this.getProgId_();\n  var options = {};\n  if (progId) {\n    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;\n    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true;\n  }\n  return options;\n};\n\n\n/**\n * The ActiveX PROG ID string to use to create xhr's in IE. Lazily initialized.\n * @type {string|undefined}\n * @private\n */\ngoog.net.DefaultXmlHttpFactory.prototype.ieProgId_;\n\n\n/**\n * Initialize the private state used by other functions.\n * @return {string} The ActiveX PROG ID string to use to create xhr's in IE.\n * @private\n */\ngoog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {\n  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR ||\n      goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {\n    return '';\n  }\n\n  // The following blog post describes what PROG IDs to use to create the\n  // XMLHTTP object in Internet Explorer:\n  // http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx\n  // However we do not (yet) fully trust that this will be OK for old versions\n  // of IE on Win9x so we therefore keep the last 2.\n  if (!this.ieProgId_ && typeof XMLHttpRequest == 'undefined' &&\n      typeof ActiveXObject != 'undefined') {\n    // Candidate Active X types.\n    var ACTIVE_X_IDENTS = [\n      'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP',\n      'Microsoft.XMLHTTP'\n    ];\n    for (var i = 0; i < ACTIVE_X_IDENTS.length; i++) {\n      var candidate = ACTIVE_X_IDENTS[i];\n\n      try {\n        new ActiveXObject(candidate);\n        // NOTE(user): cannot assign progid and return candidate in one line\n        // because JSCompiler complaings: BUG 658126\n        this.ieProgId_ = candidate;\n        return candidate;\n      } catch (e) {\n        // do nothing; try next choice\n      }\n    }\n\n    // couldn't find any matches\n    throw new Error(\n        'Could not create ActiveXObject. ActiveX might be disabled,' +\n        ' or MSXML might not be installed');\n  }\n\n  return /** @type {string} */ (this.ieProgId_);\n};\n\n\n// Set the global factory to an instance of the default factory.\ngoog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory());\n","~:compiled-at",1599160970375,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.net.xmlhttp.js\",\n\"lineCount\":69,\n\"mappings\":\"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\",\n\"sources\":[\"goog/net/xmlhttp.js\"],\n\"sourcesContent\":[\"// Copyright 2006 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Low level handling of XMLHttpRequest.\\n * @author arv@google.com (Erik Arvidsson)\\n * @author dbk@google.com (David Barrett-Kahn)\\n */\\n\\ngoog.provide('goog.net.DefaultXmlHttpFactory');\\ngoog.provide('goog.net.XmlHttp');\\ngoog.provide('goog.net.XmlHttp.OptionType');\\ngoog.provide('goog.net.XmlHttp.ReadyState');\\ngoog.provide('goog.net.XmlHttpDefines');\\n\\ngoog.require('goog.asserts');\\ngoog.require('goog.net.WrapperXmlHttpFactory');\\ngoog.require('goog.net.XmlHttpFactory');\\n\\n\\n/**\\n * Static class for creating XMLHttpRequest objects.\\n * @return {!goog.net.XhrLike.OrNative} A new XMLHttpRequest object.\\n */\\ngoog.net.XmlHttp = function() {\\n  return goog.net.XmlHttp.factory_.createInstance();\\n};\\n\\n\\n/**\\n * @define {boolean} Whether to assume XMLHttpRequest exists. Setting this to\\n *     true bypasses the ActiveX probing code.\\n * NOTE(ruilopes): Due to the way JSCompiler works, this define *will not* strip\\n * out the ActiveX probing code from binaries.  To achieve this, use\\n * `goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR` instead.\\n * TODO(ruilopes): Collapse both defines.\\n */\\ngoog.net.XmlHttp.ASSUME_NATIVE_XHR =\\n    goog.define('goog.net.XmlHttp.ASSUME_NATIVE_XHR', false);\\n\\n\\n/** @const */\\ngoog.net.XmlHttpDefines = {};\\n\\n\\n/**\\n * @define {boolean} Whether to assume XMLHttpRequest exists. Setting this to\\n *     true eliminates the ActiveX probing code.\\n */\\ngoog.net.XmlHttpDefines.ASSUME_NATIVE_XHR =\\n    goog.define('goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR', false);\\n\\n\\n/**\\n * Gets the options to use with the XMLHttpRequest objects obtained using\\n * the static methods.\\n * @return {Object} The options.\\n */\\ngoog.net.XmlHttp.getOptions = function() {\\n  return goog.net.XmlHttp.factory_.getOptions();\\n};\\n\\n\\n/**\\n * Type of options that an XmlHttp object can have.\\n * @enum {number}\\n */\\ngoog.net.XmlHttp.OptionType = {\\n  /**\\n   * Whether a goog.nullFunction should be used to clear the onreadystatechange\\n   * handler instead of null.\\n   */\\n  USE_NULL_FUNCTION: 0,\\n\\n  /**\\n   * NOTE(user): In IE if send() errors on a *local* request the readystate\\n   * is still changed to COMPLETE.  We need to ignore it and allow the\\n   * try/catch around send() to pick up the error.\\n   */\\n  LOCAL_REQUEST_ERROR: 1\\n};\\n\\n\\n/**\\n * Status constants for XMLHTTP, matches:\\n * https://msdn.microsoft.com/en-us/library/ms534361(v=vs.85).aspx\\n * @enum {number}\\n */\\ngoog.net.XmlHttp.ReadyState = {\\n  /**\\n   * Constant for when xmlhttprequest.readyState is uninitialized\\n   */\\n  UNINITIALIZED: 0,\\n\\n  /**\\n   * Constant for when xmlhttprequest.readyState is loading.\\n   */\\n  LOADING: 1,\\n\\n  /**\\n   * Constant for when xmlhttprequest.readyState is loaded.\\n   */\\n  LOADED: 2,\\n\\n  /**\\n   * Constant for when xmlhttprequest.readyState is in an interactive state.\\n   */\\n  INTERACTIVE: 3,\\n\\n  /**\\n   * Constant for when xmlhttprequest.readyState is completed\\n   */\\n  COMPLETE: 4\\n};\\n\\n\\n/**\\n * The global factory instance for creating XMLHttpRequest objects.\\n * @type {goog.net.XmlHttpFactory}\\n * @private\\n */\\ngoog.net.XmlHttp.factory_;\\n\\n\\n/**\\n * Sets the factories for creating XMLHttpRequest objects and their options.\\n * @param {Function} factory The factory for XMLHttpRequest objects.\\n * @param {Function} optionsFactory The factory for options.\\n * @deprecated Use setGlobalFactory instead.\\n */\\ngoog.net.XmlHttp.setFactory = function(factory, optionsFactory) {\\n  goog.net.XmlHttp.setGlobalFactory(\\n      new goog.net.WrapperXmlHttpFactory(\\n          goog.asserts.assert(factory), goog.asserts.assert(optionsFactory)));\\n};\\n\\n\\n/**\\n * Sets the global factory object.\\n * @param {!goog.net.XmlHttpFactory} factory New global factory object.\\n */\\ngoog.net.XmlHttp.setGlobalFactory = function(factory) {\\n  goog.net.XmlHttp.factory_ = factory;\\n};\\n\\n\\n\\n/**\\n * Default factory to use when creating xhr objects.  You probably shouldn't be\\n * instantiating this directly, but rather using it via goog.net.XmlHttp.\\n * @extends {goog.net.XmlHttpFactory}\\n * @constructor\\n */\\ngoog.net.DefaultXmlHttpFactory = function() {\\n  goog.net.XmlHttpFactory.call(this);\\n};\\ngoog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);\\n\\n\\n/** @override */\\ngoog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {\\n  var progId = this.getProgId_();\\n  if (progId) {\\n    return new ActiveXObject(progId);\\n  } else {\\n    return new XMLHttpRequest();\\n  }\\n};\\n\\n\\n/** @override */\\ngoog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {\\n  var progId = this.getProgId_();\\n  var options = {};\\n  if (progId) {\\n    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;\\n    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true;\\n  }\\n  return options;\\n};\\n\\n\\n/**\\n * The ActiveX PROG ID string to use to create xhr's in IE. Lazily initialized.\\n * @type {string|undefined}\\n * @private\\n */\\ngoog.net.DefaultXmlHttpFactory.prototype.ieProgId_;\\n\\n\\n/**\\n * Initialize the private state used by other functions.\\n * @return {string} The ActiveX PROG ID string to use to create xhr's in IE.\\n * @private\\n */\\ngoog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {\\n  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR ||\\n      goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {\\n    return '';\\n  }\\n\\n  // The following blog post describes what PROG IDs to use to create the\\n  // XMLHTTP object in Internet Explorer:\\n  // http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx\\n  // However we do not (yet) fully trust that this will be OK for old versions\\n  // of IE on Win9x so we therefore keep the last 2.\\n  if (!this.ieProgId_ && typeof XMLHttpRequest == 'undefined' &&\\n      typeof ActiveXObject != 'undefined') {\\n    // Candidate Active X types.\\n    var ACTIVE_X_IDENTS = [\\n      'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP',\\n      'Microsoft.XMLHTTP'\\n    ];\\n    for (var i = 0; i < ACTIVE_X_IDENTS.length; i++) {\\n      var candidate = ACTIVE_X_IDENTS[i];\\n\\n      try {\\n        new ActiveXObject(candidate);\\n        // NOTE(user): cannot assign progid and return candidate in one line\\n        // because JSCompiler complaings: BUG 658126\\n        this.ieProgId_ = candidate;\\n        return candidate;\\n      } catch (e) {\\n        // do nothing; try next choice\\n      }\\n    }\\n\\n    // couldn't find any matches\\n    throw new Error(\\n        'Could not create ActiveXObject. ActiveX might be disabled,' +\\n        ' or MSXML might not be installed');\\n  }\\n\\n  return /** @type {string} */ (this.ieProgId_);\\n};\\n\\n\\n// Set the global factory to an instance of the default factory.\\ngoog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory());\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"net\",\"XmlHttp\",\"goog.net.XmlHttp\",\"factory_\",\"createInstance\",\"ASSUME_NATIVE_XHR\",\"define\",\"XmlHttpDefines\",\"getOptions\",\"goog.net.XmlHttp.getOptions\",\"OptionType\",\"USE_NULL_FUNCTION\",\"LOCAL_REQUEST_ERROR\",\"ReadyState\",\"UNINITIALIZED\",\"LOADING\",\"LOADED\",\"INTERACTIVE\",\"COMPLETE\",\"setFactory\",\"goog.net.XmlHttp.setFactory\",\"factory\",\"optionsFactory\",\"setGlobalFactory\",\"WrapperXmlHttpFactory\",\"asserts\",\"assert\",\"goog.net.XmlHttp.setGlobalFactory\",\"DefaultXmlHttpFactory\",\"goog.net.DefaultXmlHttpFactory\",\"XmlHttpFactory\",\"call\",\"inherits\",\"prototype\",\"goog.net.DefaultXmlHttpFactory.prototype.createInstance\",\"progId\",\"getProgId_\",\"ActiveXObject\",\"XMLHttpRequest\",\"internalGetOptions\",\"goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions\",\"options\",\"ieProgId_\",\"goog.net.DefaultXmlHttpFactory.prototype.getProgId_\",\"ACTIVE_X_IDENTS\",\"i\",\"length\",\"candidate\",\"e\",\"Error\"]\n}\n"]