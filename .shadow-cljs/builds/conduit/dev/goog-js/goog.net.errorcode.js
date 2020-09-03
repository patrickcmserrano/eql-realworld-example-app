["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/net/errorcode.js"],"~:js","goog.provide(\"goog.net.ErrorCode\");\ngoog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};\ngoog.net.ErrorCode.getDebugMessage = function(errorCode) {\n  switch(errorCode) {\n    case goog.net.ErrorCode.NO_ERROR:\n      return \"No Error\";\n    case goog.net.ErrorCode.ACCESS_DENIED:\n      return \"Access denied to content document\";\n    case goog.net.ErrorCode.FILE_NOT_FOUND:\n      return \"File not found\";\n    case goog.net.ErrorCode.FF_SILENT_ERROR:\n      return \"Firefox silently errored\";\n    case goog.net.ErrorCode.CUSTOM_ERROR:\n      return \"Application custom error\";\n    case goog.net.ErrorCode.EXCEPTION:\n      return \"An exception occurred\";\n    case goog.net.ErrorCode.HTTP_ERROR:\n      return \"Http response at 400 or 500 level\";\n    case goog.net.ErrorCode.ABORT:\n      return \"Request was aborted\";\n    case goog.net.ErrorCode.TIMEOUT:\n      return \"Request timed out\";\n    case goog.net.ErrorCode.OFFLINE:\n      return \"The resource is not available offline\";\n    default:\n      return \"Unrecognized error code\";\n  }\n};\n","~:source","// Copyright 2007 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Error codes shared between goog.net.IframeIo and\n * goog.net.XhrIo.\n */\n\ngoog.provide('goog.net.ErrorCode');\n\n\n/**\n * Error codes\n * @enum {number}\n */\ngoog.net.ErrorCode = {\n\n  /**\n   * There is no error condition.\n   */\n  NO_ERROR: 0,\n\n  /**\n   * The most common error from iframeio, unfortunately, is that the browser\n   * responded with an error page that is classed as a different domain. The\n   * situations, are when a browser error page  is shown -- 404, access denied,\n   * DNS failure, connection reset etc.)\n   *\n   */\n  ACCESS_DENIED: 1,\n\n  /**\n   * Currently the only case where file not found will be caused is when the\n   * code is running on the local file system and a non-IE browser makes a\n   * request to a file that doesn't exist.\n   */\n  FILE_NOT_FOUND: 2,\n\n  /**\n   * If Firefox shows a browser error page, such as a connection reset by\n   * server or access denied, then it will fail silently without the error or\n   * load handlers firing.\n   */\n  FF_SILENT_ERROR: 3,\n\n  /**\n   * Custom error provided by the client through the error check hook.\n   */\n  CUSTOM_ERROR: 4,\n\n  /**\n   * Exception was thrown while processing the request.\n   */\n  EXCEPTION: 5,\n\n  /**\n   * The Http response returned a non-successful http status code.\n   */\n  HTTP_ERROR: 6,\n\n  /**\n   * The request was aborted.\n   */\n  ABORT: 7,\n\n  /**\n   * The request timed out.\n   */\n  TIMEOUT: 8,\n\n  /**\n   * The resource is not available offline.\n   */\n  OFFLINE: 9\n};\n\n\n/**\n * Returns a friendly error message for an error code. These messages are for\n * debugging and are not localized.\n * @param {goog.net.ErrorCode} errorCode An error code.\n * @return {string} A message for debugging.\n */\ngoog.net.ErrorCode.getDebugMessage = function(errorCode) {\n  switch (errorCode) {\n    case goog.net.ErrorCode.NO_ERROR:\n      return 'No Error';\n\n    case goog.net.ErrorCode.ACCESS_DENIED:\n      return 'Access denied to content document';\n\n    case goog.net.ErrorCode.FILE_NOT_FOUND:\n      return 'File not found';\n\n    case goog.net.ErrorCode.FF_SILENT_ERROR:\n      return 'Firefox silently errored';\n\n    case goog.net.ErrorCode.CUSTOM_ERROR:\n      return 'Application custom error';\n\n    case goog.net.ErrorCode.EXCEPTION:\n      return 'An exception occurred';\n\n    case goog.net.ErrorCode.HTTP_ERROR:\n      return 'Http response at 400 or 500 level';\n\n    case goog.net.ErrorCode.ABORT:\n      return 'Request was aborted';\n\n    case goog.net.ErrorCode.TIMEOUT:\n      return 'Request timed out';\n\n    case goog.net.ErrorCode.OFFLINE:\n      return 'The resource is not available offline';\n\n    default:\n      return 'Unrecognized error code';\n  }\n};\n","~:compiled-at",1599160970373,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.net.errorcode.js\",\n\"lineCount\":29,\n\"mappings\":\"AAmBAA,IAAA,CAAKC,OAAL,CAAa,oBAAb,CAAA;AAOAD,IAAA,CAAKE,GAAL,CAASC,SAAT,GAAqB,CAKnBC,SAAU,CALS,EAcnBC,cAAe,CAdI,EAqBnBC,eAAgB,CArBG,EA4BnBC,gBAAiB,CA5BE,EAiCnBC,aAAc,CAjCK,EAsCnBC,UAAW,CAtCQ,EA2CnBC,WAAY,CA3CO,EAgDnBC,MAAO,CAhDY,EAqDnBC,QAAS,CArDU,EA0DnBC,QAAS,CA1DU,CAArB;AAoEAb,IAAA,CAAKE,GAAL,CAASC,SAAT,CAAmBW,eAAnB,GAAqCC,QAAQ,CAACC,SAAD,CAAY;AACvD,SAAQA,SAAR;AACE,SAAKhB,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBC,QAAxB;AACE,aAAO,UAAP;AAEF,SAAKJ,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBE,aAAxB;AACE,aAAO,mCAAP;AAEF,SAAKL,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBG,cAAxB;AACE,aAAO,gBAAP;AAEF,SAAKN,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBI,eAAxB;AACE,aAAO,0BAAP;AAEF,SAAKP,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBK,YAAxB;AACE,aAAO,0BAAP;AAEF,SAAKR,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBM,SAAxB;AACE,aAAO,uBAAP;AAEF,SAAKT,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBO,UAAxB;AACE,aAAO,mCAAP;AAEF,SAAKV,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBQ,KAAxB;AACE,aAAO,qBAAP;AAEF,SAAKX,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBS,OAAxB;AACE,aAAO,mBAAP;AAEF,SAAKZ,IAAL,CAAUE,GAAV,CAAcC,SAAd,CAAwBU,OAAxB;AACE,aAAO,uCAAP;AAEF;AACE,aAAO,yBAAP;AAhCJ;AADuD,CAAzD;;\",\n\"sources\":[\"goog/net/errorcode.js\"],\n\"sourcesContent\":[\"// Copyright 2007 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Error codes shared between goog.net.IframeIo and\\n * goog.net.XhrIo.\\n */\\n\\ngoog.provide('goog.net.ErrorCode');\\n\\n\\n/**\\n * Error codes\\n * @enum {number}\\n */\\ngoog.net.ErrorCode = {\\n\\n  /**\\n   * There is no error condition.\\n   */\\n  NO_ERROR: 0,\\n\\n  /**\\n   * The most common error from iframeio, unfortunately, is that the browser\\n   * responded with an error page that is classed as a different domain. The\\n   * situations, are when a browser error page  is shown -- 404, access denied,\\n   * DNS failure, connection reset etc.)\\n   *\\n   */\\n  ACCESS_DENIED: 1,\\n\\n  /**\\n   * Currently the only case where file not found will be caused is when the\\n   * code is running on the local file system and a non-IE browser makes a\\n   * request to a file that doesn't exist.\\n   */\\n  FILE_NOT_FOUND: 2,\\n\\n  /**\\n   * If Firefox shows a browser error page, such as a connection reset by\\n   * server or access denied, then it will fail silently without the error or\\n   * load handlers firing.\\n   */\\n  FF_SILENT_ERROR: 3,\\n\\n  /**\\n   * Custom error provided by the client through the error check hook.\\n   */\\n  CUSTOM_ERROR: 4,\\n\\n  /**\\n   * Exception was thrown while processing the request.\\n   */\\n  EXCEPTION: 5,\\n\\n  /**\\n   * The Http response returned a non-successful http status code.\\n   */\\n  HTTP_ERROR: 6,\\n\\n  /**\\n   * The request was aborted.\\n   */\\n  ABORT: 7,\\n\\n  /**\\n   * The request timed out.\\n   */\\n  TIMEOUT: 8,\\n\\n  /**\\n   * The resource is not available offline.\\n   */\\n  OFFLINE: 9\\n};\\n\\n\\n/**\\n * Returns a friendly error message for an error code. These messages are for\\n * debugging and are not localized.\\n * @param {goog.net.ErrorCode} errorCode An error code.\\n * @return {string} A message for debugging.\\n */\\ngoog.net.ErrorCode.getDebugMessage = function(errorCode) {\\n  switch (errorCode) {\\n    case goog.net.ErrorCode.NO_ERROR:\\n      return 'No Error';\\n\\n    case goog.net.ErrorCode.ACCESS_DENIED:\\n      return 'Access denied to content document';\\n\\n    case goog.net.ErrorCode.FILE_NOT_FOUND:\\n      return 'File not found';\\n\\n    case goog.net.ErrorCode.FF_SILENT_ERROR:\\n      return 'Firefox silently errored';\\n\\n    case goog.net.ErrorCode.CUSTOM_ERROR:\\n      return 'Application custom error';\\n\\n    case goog.net.ErrorCode.EXCEPTION:\\n      return 'An exception occurred';\\n\\n    case goog.net.ErrorCode.HTTP_ERROR:\\n      return 'Http response at 400 or 500 level';\\n\\n    case goog.net.ErrorCode.ABORT:\\n      return 'Request was aborted';\\n\\n    case goog.net.ErrorCode.TIMEOUT:\\n      return 'Request timed out';\\n\\n    case goog.net.ErrorCode.OFFLINE:\\n      return 'The resource is not available offline';\\n\\n    default:\\n      return 'Unrecognized error code';\\n  }\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"net\",\"ErrorCode\",\"NO_ERROR\",\"ACCESS_DENIED\",\"FILE_NOT_FOUND\",\"FF_SILENT_ERROR\",\"CUSTOM_ERROR\",\"EXCEPTION\",\"HTTP_ERROR\",\"ABORT\",\"TIMEOUT\",\"OFFLINE\",\"getDebugMessage\",\"goog.net.ErrorCode.getDebugMessage\",\"errorCode\"]\n}\n"]