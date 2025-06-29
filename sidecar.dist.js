#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except2, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except2)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/better-sqlite3/lib/util.js
var require_util = __commonJS({
  "node_modules/better-sqlite3/lib/util.js"(exports2) {
    "use strict";
    exports2.getBooleanOption = (options, key) => {
      let value = false;
      if (key in options && typeof (value = options[key]) !== "boolean") {
        throw new TypeError(`Expected the "${key}" option to be a boolean`);
      }
      return value;
    };
    exports2.cppdb = Symbol();
    exports2.inspect = Symbol.for("nodejs.util.inspect.custom");
  }
});

// node_modules/better-sqlite3/lib/sqlite-error.js
var require_sqlite_error = __commonJS({
  "node_modules/better-sqlite3/lib/sqlite-error.js"(exports2, module2) {
    "use strict";
    var descriptor = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
    function SqliteError(message, code) {
      if (new.target !== SqliteError) {
        return new SqliteError(message, code);
      }
      if (typeof code !== "string") {
        throw new TypeError("Expected second argument to be a string");
      }
      Error.call(this, message);
      descriptor.value = "" + message;
      Object.defineProperty(this, "message", descriptor);
      Error.captureStackTrace(this, SqliteError);
      this.code = code;
    }
    Object.setPrototypeOf(SqliteError, Error);
    Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
    Object.defineProperty(SqliteError.prototype, "name", descriptor);
    module2.exports = SqliteError;
  }
});

// node_modules/file-uri-to-path/index.js
var require_file_uri_to_path = __commonJS({
  "node_modules/file-uri-to-path/index.js"(exports2, module2) {
    var sep = require("path").sep || "/";
    module2.exports = fileUriToPath;
    function fileUriToPath(uri) {
      if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) {
        throw new TypeError("must pass in a file:// URI to convert to a file path");
      }
      var rest = decodeURI(uri.substring(7));
      var firstSlash = rest.indexOf("/");
      var host = rest.substring(0, firstSlash);
      var path2 = rest.substring(firstSlash + 1);
      if ("localhost" == host) host = "";
      if (host) {
        host = sep + sep + host;
      }
      path2 = path2.replace(/^(.+)\|/, "$1:");
      if (sep == "\\") {
        path2 = path2.replace(/\//g, "\\");
      }
      if (/^.+\:/.test(path2)) {
      } else {
        path2 = sep + path2;
      }
      return host + path2;
    }
  }
});

// node_modules/bindings/bindings.js
var require_bindings = __commonJS({
  "node_modules/bindings/bindings.js"(exports2, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var fileURLToPath = require_file_uri_to_path();
    var join = path2.join;
    var dirname = path2.dirname;
    var exists2 = fs2.accessSync && function(path3) {
      try {
        fs2.accessSync(path3);
      } catch (e) {
        return false;
      }
      return true;
    } || fs2.existsSync || path2.existsSync;
    var defaults = {
      arrow: process.env.NODE_BINDINGS_ARROW || " \u2192 ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function bindings(opts) {
      if (typeof opts == "string") {
        opts = { bindings: opts };
      } else if (!opts) {
        opts = {};
      }
      Object.keys(defaults).map(function(i2) {
        if (!(i2 in opts)) opts[i2] = defaults[i2];
      });
      if (!opts.module_root) {
        opts.module_root = exports2.getRoot(exports2.getFileName());
      }
      if (path2.extname(opts.bindings) != ".node") {
        opts.bindings += ".node";
      }
      var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      var tries = [], i = 0, l = opts.try.length, n, b, err;
      for (; i < l; i++) {
        n = join.apply(
          null,
          opts.try[i].map(function(p) {
            return opts[p] || p;
          })
        );
        tries.push(n);
        try {
          b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
          if (!opts.path) {
            b.path = n;
          }
          return b;
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) {
            throw e;
          }
        }
      }
      err = new Error(
        "Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
          return opts.arrow + a;
        }).join("\n")
      );
      err.tries = tries;
      throw err;
    }
    module2.exports = exports2 = bindings;
    exports2.getFileName = function getFileName(calling_file) {
      var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
      Error.stackTraceLimit = 10;
      Error.prepareStackTrace = function(e, st) {
        for (var i = 0, l = st.length; i < l; i++) {
          fileName = st[i].getFileName();
          if (fileName !== __filename) {
            if (calling_file) {
              if (fileName !== calling_file) {
                return;
              }
            } else {
              return;
            }
          }
        }
      };
      Error.captureStackTrace(dummy);
      dummy.stack;
      Error.prepareStackTrace = origPST;
      Error.stackTraceLimit = origSTL;
      var fileSchema = "file://";
      if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath(fileName);
      }
      return fileName;
    };
    exports2.getRoot = function getRoot(file) {
      var dir = dirname(file), prev;
      while (true) {
        if (dir === ".") {
          dir = process.cwd();
        }
        if (exists2(join(dir, "package.json")) || exists2(join(dir, "node_modules"))) {
          return dir;
        }
        if (prev === dir) {
          throw new Error(
            'Could not find module root given file: "' + file + '". Do you have a `package.json` file? '
          );
        }
        prev = dir;
        dir = join(dir, "..");
      }
    };
  }
});

// node_modules/better-sqlite3/lib/methods/wrappers.js
var require_wrappers = __commonJS({
  "node_modules/better-sqlite3/lib/methods/wrappers.js"(exports2) {
    "use strict";
    var { cppdb } = require_util();
    exports2.prepare = function prepare(sql2) {
      return this[cppdb].prepare(sql2, this, false);
    };
    exports2.exec = function exec(sql2) {
      this[cppdb].exec(sql2);
      return this;
    };
    exports2.close = function close() {
      this[cppdb].close();
      return this;
    };
    exports2.loadExtension = function loadExtension(...args) {
      this[cppdb].loadExtension(...args);
      return this;
    };
    exports2.defaultSafeIntegers = function defaultSafeIntegers(...args) {
      this[cppdb].defaultSafeIntegers(...args);
      return this;
    };
    exports2.unsafeMode = function unsafeMode(...args) {
      this[cppdb].unsafeMode(...args);
      return this;
    };
    exports2.getters = {
      name: {
        get: function name() {
          return this[cppdb].name;
        },
        enumerable: true
      },
      open: {
        get: function open() {
          return this[cppdb].open;
        },
        enumerable: true
      },
      inTransaction: {
        get: function inTransaction() {
          return this[cppdb].inTransaction;
        },
        enumerable: true
      },
      readonly: {
        get: function readonly() {
          return this[cppdb].readonly;
        },
        enumerable: true
      },
      memory: {
        get: function memory() {
          return this[cppdb].memory;
        },
        enumerable: true
      }
    };
  }
});

// node_modules/better-sqlite3/lib/methods/transaction.js
var require_transaction = __commonJS({
  "node_modules/better-sqlite3/lib/methods/transaction.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    var controllers = /* @__PURE__ */ new WeakMap();
    module2.exports = function transaction(fn) {
      if (typeof fn !== "function") throw new TypeError("Expected first argument to be a function");
      const db = this[cppdb];
      const controller = getController(db, this);
      const { apply } = Function.prototype;
      const properties = {
        default: { value: wrapTransaction(apply, fn, db, controller.default) },
        deferred: { value: wrapTransaction(apply, fn, db, controller.deferred) },
        immediate: { value: wrapTransaction(apply, fn, db, controller.immediate) },
        exclusive: { value: wrapTransaction(apply, fn, db, controller.exclusive) },
        database: { value: this, enumerable: true }
      };
      Object.defineProperties(properties.default.value, properties);
      Object.defineProperties(properties.deferred.value, properties);
      Object.defineProperties(properties.immediate.value, properties);
      Object.defineProperties(properties.exclusive.value, properties);
      return properties.default.value;
    };
    var getController = (db, self) => {
      let controller = controllers.get(db);
      if (!controller) {
        const shared = {
          commit: db.prepare("COMMIT", self, false),
          rollback: db.prepare("ROLLBACK", self, false),
          savepoint: db.prepare("SAVEPOINT `	_bs3.	`", self, false),
          release: db.prepare("RELEASE `	_bs3.	`", self, false),
          rollbackTo: db.prepare("ROLLBACK TO `	_bs3.	`", self, false)
        };
        controllers.set(db, controller = {
          default: Object.assign({ begin: db.prepare("BEGIN", self, false) }, shared),
          deferred: Object.assign({ begin: db.prepare("BEGIN DEFERRED", self, false) }, shared),
          immediate: Object.assign({ begin: db.prepare("BEGIN IMMEDIATE", self, false) }, shared),
          exclusive: Object.assign({ begin: db.prepare("BEGIN EXCLUSIVE", self, false) }, shared)
        });
      }
      return controller;
    };
    var wrapTransaction = (apply, fn, db, { begin, commit, rollback, savepoint, release, rollbackTo }) => function sqliteTransaction() {
      let before, after, undo;
      if (db.inTransaction) {
        before = savepoint;
        after = release;
        undo = rollbackTo;
      } else {
        before = begin;
        after = commit;
        undo = rollback;
      }
      before.run();
      try {
        const result = apply.call(fn, this, arguments);
        if (result && typeof result.then === "function") {
          throw new TypeError("Transaction function cannot return a promise");
        }
        after.run();
        return result;
      } catch (ex) {
        if (db.inTransaction) {
          undo.run();
          if (undo !== rollback) after.run();
        }
        throw ex;
      }
    };
  }
});

// node_modules/better-sqlite3/lib/methods/pragma.js
var require_pragma = __commonJS({
  "node_modules/better-sqlite3/lib/methods/pragma.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function pragma(source, options) {
      if (options == null) options = {};
      if (typeof source !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      const simple = getBooleanOption(options, "simple");
      const stmt = this[cppdb].prepare(`PRAGMA ${source}`, this, true);
      return simple ? stmt.pluck().get() : stmt.all();
    };
  }
});

// node_modules/better-sqlite3/lib/methods/backup.js
var require_backup = __commonJS({
  "node_modules/better-sqlite3/lib/methods/backup.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var path2 = require("path");
    var { promisify } = require("util");
    var { cppdb } = require_util();
    var fsAccess = promisify(fs2.access);
    module2.exports = async function backup(filename, options) {
      if (options == null) options = {};
      if (typeof filename !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      filename = filename.trim();
      const attachedName = "attached" in options ? options.attached : "main";
      const handler = "progress" in options ? options.progress : null;
      if (!filename) throw new TypeError("Backup filename cannot be an empty string");
      if (filename === ":memory:") throw new TypeError('Invalid backup filename ":memory:"');
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      if (handler != null && typeof handler !== "function") throw new TypeError('Expected the "progress" option to be a function');
      await fsAccess(path2.dirname(filename)).catch(() => {
        throw new TypeError("Cannot save backup because the directory does not exist");
      });
      const isNewFile = await fsAccess(filename).then(() => false, () => true);
      return runBackup(this[cppdb].backup(this, attachedName, filename, isNewFile), handler || null);
    };
    var runBackup = (backup, handler) => {
      let rate = 0;
      let useDefault = true;
      return new Promise((resolve, reject) => {
        setImmediate(function step() {
          try {
            const progress = backup.transfer(rate);
            if (!progress.remainingPages) {
              backup.close();
              resolve(progress);
              return;
            }
            if (useDefault) {
              useDefault = false;
              rate = 100;
            }
            if (handler) {
              const ret = handler(progress);
              if (ret !== void 0) {
                if (typeof ret === "number" && ret === ret) rate = Math.max(0, Math.min(2147483647, Math.round(ret)));
                else throw new TypeError("Expected progress callback to return a number or undefined");
              }
            }
            setImmediate(step);
          } catch (err) {
            backup.close();
            reject(err);
          }
        });
      });
    };
  }
});

// node_modules/better-sqlite3/lib/methods/serialize.js
var require_serialize = __commonJS({
  "node_modules/better-sqlite3/lib/methods/serialize.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    module2.exports = function serialize(options) {
      if (options == null) options = {};
      if (typeof options !== "object") throw new TypeError("Expected first argument to be an options object");
      const attachedName = "attached" in options ? options.attached : "main";
      if (typeof attachedName !== "string") throw new TypeError('Expected the "attached" option to be a string');
      if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
      return this[cppdb].serialize(attachedName);
    };
  }
});

// node_modules/better-sqlite3/lib/methods/function.js
var require_function = __commonJS({
  "node_modules/better-sqlite3/lib/methods/function.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineFunction(name, options, fn) {
      if (options == null) options = {};
      if (typeof options === "function") {
        fn = options;
        options = {};
      }
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof fn !== "function") throw new TypeError("Expected last argument to be a function");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options, "deterministic");
      const directOnly = getBooleanOption(options, "directOnly");
      const varargs = getBooleanOption(options, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = fn.length;
        if (!Number.isInteger(argCount) || argCount < 0) throw new TypeError("Expected function.length to be a positive integer");
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].function(fn, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
  }
});

// node_modules/better-sqlite3/lib/methods/aggregate.js
var require_aggregate = __commonJS({
  "node_modules/better-sqlite3/lib/methods/aggregate.js"(exports2, module2) {
    "use strict";
    var { getBooleanOption, cppdb } = require_util();
    module2.exports = function defineAggregate(name, options) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object" || options === null) throw new TypeError("Expected second argument to be an options object");
      if (!name) throw new TypeError("User-defined function name cannot be an empty string");
      const start = "start" in options ? options.start : null;
      const step = getFunctionOption(options, "step", true);
      const inverse = getFunctionOption(options, "inverse", false);
      const result = getFunctionOption(options, "result", false);
      const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
      const deterministic = getBooleanOption(options, "deterministic");
      const directOnly = getBooleanOption(options, "directOnly");
      const varargs = getBooleanOption(options, "varargs");
      let argCount = -1;
      if (!varargs) {
        argCount = Math.max(getLength(step), inverse ? getLength(inverse) : 0);
        if (argCount > 0) argCount -= 1;
        if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
      }
      this[cppdb].aggregate(start, step, inverse, result, name, argCount, safeIntegers, deterministic, directOnly);
      return this;
    };
    var getFunctionOption = (options, key, required) => {
      const value = key in options ? options[key] : null;
      if (typeof value === "function") return value;
      if (value != null) throw new TypeError(`Expected the "${key}" option to be a function`);
      if (required) throw new TypeError(`Missing required option "${key}"`);
      return null;
    };
    var getLength = ({ length }) => {
      if (Number.isInteger(length) && length >= 0) return length;
      throw new TypeError("Expected function.length to be a positive integer");
    };
  }
});

// node_modules/better-sqlite3/lib/methods/table.js
var require_table = __commonJS({
  "node_modules/better-sqlite3/lib/methods/table.js"(exports2, module2) {
    "use strict";
    var { cppdb } = require_util();
    module2.exports = function defineTable(name, factory) {
      if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
      if (!name) throw new TypeError("Virtual table module name cannot be an empty string");
      let eponymous = false;
      if (typeof factory === "object" && factory !== null) {
        eponymous = true;
        factory = defer(parseTableDefinition(factory, "used", name));
      } else {
        if (typeof factory !== "function") throw new TypeError("Expected second argument to be a function or a table definition object");
        factory = wrapFactory(factory);
      }
      this[cppdb].table(factory, name, eponymous);
      return this;
    };
    function wrapFactory(factory) {
      return function virtualTableFactory(moduleName, databaseName, tableName, ...args) {
        const thisObject = {
          module: moduleName,
          database: databaseName,
          table: tableName
        };
        const def = apply.call(factory, thisObject, args);
        if (typeof def !== "object" || def === null) {
          throw new TypeError(`Virtual table module "${moduleName}" did not return a table definition object`);
        }
        return parseTableDefinition(def, "returned", moduleName);
      };
    }
    function parseTableDefinition(def, verb, moduleName) {
      if (!hasOwnProperty.call(def, "rows")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "rows" property`);
      }
      if (!hasOwnProperty.call(def, "columns")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "columns" property`);
      }
      const rows = def.rows;
      if (typeof rows !== "function" || Object.getPrototypeOf(rows) !== GeneratorFunctionPrototype) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "rows" property (should be a generator function)`);
      }
      let columns = def.columns;
      if (!Array.isArray(columns) || !(columns = [...columns]).every((x) => typeof x === "string")) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "columns" property (should be an array of strings)`);
      }
      if (columns.length !== new Set(columns).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate column names`);
      }
      if (!columns.length) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with zero columns`);
      }
      let parameters;
      if (hasOwnProperty.call(def, "parameters")) {
        parameters = def.parameters;
        if (!Array.isArray(parameters) || !(parameters = [...parameters]).every((x) => typeof x === "string")) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "parameters" property (should be an array of strings)`);
        }
      } else {
        parameters = inferParameters(rows);
      }
      if (parameters.length !== new Set(parameters).size) {
        throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate parameter names`);
      }
      if (parameters.length > 32) {
        throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with more than the maximum number of 32 parameters`);
      }
      for (const parameter of parameters) {
        if (columns.includes(parameter)) {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with column "${parameter}" which was ambiguously defined as both a column and parameter`);
        }
      }
      let safeIntegers = 2;
      if (hasOwnProperty.call(def, "safeIntegers")) {
        const bool = def.safeIntegers;
        if (typeof bool !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
        }
        safeIntegers = +bool;
      }
      let directOnly = false;
      if (hasOwnProperty.call(def, "directOnly")) {
        directOnly = def.directOnly;
        if (typeof directOnly !== "boolean") {
          throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "directOnly" property (should be a boolean)`);
        }
      }
      const columnDefinitions = [
        ...parameters.map(identifier).map((str) => `${str} HIDDEN`),
        ...columns.map(identifier)
      ];
      return [
        `CREATE TABLE x(${columnDefinitions.join(", ")});`,
        wrapGenerator(rows, new Map(columns.map((x, i) => [x, parameters.length + i])), moduleName),
        parameters,
        safeIntegers,
        directOnly
      ];
    }
    function wrapGenerator(generator, columnMap, moduleName) {
      return function* virtualTable(...args) {
        const output = args.map((x) => Buffer.isBuffer(x) ? Buffer.from(x) : x);
        for (let i = 0; i < columnMap.size; ++i) {
          output.push(null);
        }
        for (const row of generator(...args)) {
          if (Array.isArray(row)) {
            extractRowArray(row, output, columnMap.size, moduleName);
            yield output;
          } else if (typeof row === "object" && row !== null) {
            extractRowObject(row, output, columnMap, moduleName);
            yield output;
          } else {
            throw new TypeError(`Virtual table module "${moduleName}" yielded something that isn't a valid row object`);
          }
        }
      };
    }
    function extractRowArray(row, output, columnCount, moduleName) {
      if (row.length !== columnCount) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an incorrect number of columns`);
      }
      const offset = output.length - columnCount;
      for (let i = 0; i < columnCount; ++i) {
        output[i + offset] = row[i];
      }
    }
    function extractRowObject(row, output, columnMap, moduleName) {
      let count = 0;
      for (const key of Object.keys(row)) {
        const index = columnMap.get(key);
        if (index === void 0) {
          throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an undeclared column "${key}"`);
        }
        output[index] = row[key];
        count += 1;
      }
      if (count !== columnMap.size) {
        throw new TypeError(`Virtual table module "${moduleName}" yielded a row with missing columns`);
      }
    }
    function inferParameters({ length }) {
      if (!Number.isInteger(length) || length < 0) {
        throw new TypeError("Expected function.length to be a positive integer");
      }
      const params = [];
      for (let i = 0; i < length; ++i) {
        params.push(`$${i + 1}`);
      }
      return params;
    }
    var { hasOwnProperty } = Object.prototype;
    var { apply } = Function.prototype;
    var GeneratorFunctionPrototype = Object.getPrototypeOf(function* () {
    });
    var identifier = (str) => `"${str.replace(/"/g, '""')}"`;
    var defer = (x) => () => x;
  }
});

// node_modules/better-sqlite3/lib/methods/inspect.js
var require_inspect = __commonJS({
  "node_modules/better-sqlite3/lib/methods/inspect.js"(exports2, module2) {
    "use strict";
    var DatabaseInspection = function Database2() {
    };
    module2.exports = function inspect(depth, opts) {
      return Object.assign(new DatabaseInspection(), this);
    };
  }
});

// node_modules/better-sqlite3/lib/database.js
var require_database = __commonJS({
  "node_modules/better-sqlite3/lib/database.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var path2 = require("path");
    var util = require_util();
    var SqliteError = require_sqlite_error();
    var DEFAULT_ADDON;
    function Database2(filenameGiven, options) {
      if (new.target == null) {
        return new Database2(filenameGiven, options);
      }
      let buffer;
      if (Buffer.isBuffer(filenameGiven)) {
        buffer = filenameGiven;
        filenameGiven = ":memory:";
      }
      if (filenameGiven == null) filenameGiven = "";
      if (options == null) options = {};
      if (typeof filenameGiven !== "string") throw new TypeError("Expected first argument to be a string");
      if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
      if ("readOnly" in options) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
      if ("memory" in options) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
      const filename = filenameGiven.trim();
      const anonymous = filename === "" || filename === ":memory:";
      const readonly = util.getBooleanOption(options, "readonly");
      const fileMustExist = util.getBooleanOption(options, "fileMustExist");
      const timeout = "timeout" in options ? options.timeout : 5e3;
      const verbose = "verbose" in options ? options.verbose : null;
      const nativeBinding = "nativeBinding" in options ? options.nativeBinding : null;
      if (readonly && anonymous && !buffer) throw new TypeError("In-memory/temporary databases cannot be readonly");
      if (!Number.isInteger(timeout) || timeout < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
      if (timeout > 2147483647) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
      if (verbose != null && typeof verbose !== "function") throw new TypeError('Expected the "verbose" option to be a function');
      if (nativeBinding != null && typeof nativeBinding !== "string" && typeof nativeBinding !== "object") throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
      let addon;
      if (nativeBinding == null) {
        addon = DEFAULT_ADDON || (DEFAULT_ADDON = require_bindings()("better_sqlite3.node"));
      } else if (typeof nativeBinding === "string") {
        const requireFunc = typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : require;
        addon = requireFunc(path2.resolve(nativeBinding).replace(/(\.node)?$/, ".node"));
      } else {
        addon = nativeBinding;
      }
      if (!addon.isInitialized) {
        addon.setErrorConstructor(SqliteError);
        addon.isInitialized = true;
      }
      if (!anonymous && !fs2.existsSync(path2.dirname(filename))) {
        throw new TypeError("Cannot open database because the directory does not exist");
      }
      Object.defineProperties(this, {
        [util.cppdb]: { value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null) },
        ...wrappers.getters
      });
    }
    var wrappers = require_wrappers();
    Database2.prototype.prepare = wrappers.prepare;
    Database2.prototype.transaction = require_transaction();
    Database2.prototype.pragma = require_pragma();
    Database2.prototype.backup = require_backup();
    Database2.prototype.serialize = require_serialize();
    Database2.prototype.function = require_function();
    Database2.prototype.aggregate = require_aggregate();
    Database2.prototype.table = require_table();
    Database2.prototype.loadExtension = wrappers.loadExtension;
    Database2.prototype.exec = wrappers.exec;
    Database2.prototype.close = wrappers.close;
    Database2.prototype.defaultSafeIntegers = wrappers.defaultSafeIntegers;
    Database2.prototype.unsafeMode = wrappers.unsafeMode;
    Database2.prototype[util.inspect] = require_inspect();
    module2.exports = Database2;
  }
});

// node_modules/better-sqlite3/lib/index.js
var require_lib = __commonJS({
  "node_modules/better-sqlite3/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_database();
    module2.exports.SqliteError = require_sqlite_error();
  }
});

// node_modules/drizzle-orm/entity.js
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
var entityKind, hasOwnEntityKind;
var init_entity = __esm({
  "node_modules/drizzle-orm/entity.js"() {
    entityKind = Symbol.for("drizzle:entityKind");
    hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
  }
});

// node_modules/drizzle-orm/logger.js
var ConsoleLogWriter, DefaultLogger, NoopLogger;
var init_logger = __esm({
  "node_modules/drizzle-orm/logger.js"() {
    init_entity();
    ConsoleLogWriter = class {
      static [entityKind] = "ConsoleLogWriter";
      write(message) {
        console.log(message);
      }
    };
    DefaultLogger = class {
      static [entityKind] = "DefaultLogger";
      writer;
      constructor(config) {
        this.writer = config?.writer ?? new ConsoleLogWriter();
      }
      logQuery(query, params) {
        const stringifiedParams = params.map((p) => {
          try {
            return JSON.stringify(p);
          } catch {
            return String(p);
          }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
      }
    };
    NoopLogger = class {
      static [entityKind] = "NoopLogger";
      logQuery() {
      }
    };
  }
});

// node_modules/drizzle-orm/table.utils.js
var TableName;
var init_table_utils = __esm({
  "node_modules/drizzle-orm/table.utils.js"() {
    TableName = Symbol.for("drizzle:Name");
  }
});

// node_modules/drizzle-orm/table.js
function getTableName(table) {
  return table[TableName];
}
function getTableUniqueName(table) {
  return `${table[Schema] ?? "public"}.${table[TableName]}`;
}
var Schema, Columns, ExtraConfigColumns, OriginalName, BaseName, IsAlias, ExtraConfigBuilder, IsDrizzleTable, Table;
var init_table = __esm({
  "node_modules/drizzle-orm/table.js"() {
    init_entity();
    init_table_utils();
    Schema = Symbol.for("drizzle:Schema");
    Columns = Symbol.for("drizzle:Columns");
    ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
    OriginalName = Symbol.for("drizzle:OriginalName");
    BaseName = Symbol.for("drizzle:BaseName");
    IsAlias = Symbol.for("drizzle:IsAlias");
    ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
    IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
    Table = class {
      static [entityKind] = "Table";
      /** @internal */
      static Symbol = {
        Name: TableName,
        Schema,
        OriginalName,
        Columns,
        ExtraConfigColumns,
        BaseName,
        IsAlias,
        ExtraConfigBuilder
      };
      /**
       * @internal
       * Can be changed if the table is aliased.
       */
      [TableName];
      /**
       * @internal
       * Used to store the original name of the table, before any aliasing.
       */
      [OriginalName];
      /** @internal */
      [Schema];
      /** @internal */
      [Columns];
      /** @internal */
      [ExtraConfigColumns];
      /**
       *  @internal
       * Used to store the table name before the transformation via the `tableCreator` functions.
       */
      [BaseName];
      /** @internal */
      [IsAlias] = false;
      /** @internal */
      [IsDrizzleTable] = true;
      /** @internal */
      [ExtraConfigBuilder] = void 0;
      constructor(name, schema, baseName) {
        this[TableName] = this[OriginalName] = name;
        this[Schema] = schema;
        this[BaseName] = baseName;
      }
    };
  }
});

// node_modules/drizzle-orm/column.js
var Column;
var init_column = __esm({
  "node_modules/drizzle-orm/column.js"() {
    init_entity();
    Column = class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
        this.name = config.name;
        this.keyAsName = config.keyAsName;
        this.notNull = config.notNull;
        this.default = config.default;
        this.defaultFn = config.defaultFn;
        this.onUpdateFn = config.onUpdateFn;
        this.hasDefault = config.hasDefault;
        this.primary = config.primaryKey;
        this.isUnique = config.isUnique;
        this.uniqueName = config.uniqueName;
        this.uniqueType = config.uniqueType;
        this.dataType = config.dataType;
        this.columnType = config.columnType;
        this.generated = config.generated;
        this.generatedIdentity = config.generatedIdentity;
      }
      static [entityKind] = "Column";
      name;
      keyAsName;
      primary;
      notNull;
      default;
      defaultFn;
      onUpdateFn;
      hasDefault;
      isUnique;
      uniqueName;
      uniqueType;
      dataType;
      columnType;
      enumValues = void 0;
      generated = void 0;
      generatedIdentity = void 0;
      config;
      mapFromDriverValue(value) {
        return value;
      }
      mapToDriverValue(value) {
        return value;
      }
      // ** @internal */
      shouldDisableInsert() {
        return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
      }
    };
  }
});

// node_modules/drizzle-orm/column-builder.js
var ColumnBuilder;
var init_column_builder = __esm({
  "node_modules/drizzle-orm/column-builder.js"() {
    init_entity();
    ColumnBuilder = class {
      static [entityKind] = "ColumnBuilder";
      config;
      constructor(name, dataType, columnType) {
        this.config = {
          name,
          keyAsName: name === "",
          notNull: false,
          default: void 0,
          hasDefault: false,
          primaryKey: false,
          isUnique: false,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType,
          columnType,
          generated: void 0
        };
      }
      /**
       * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
       *
       * @example
       * ```ts
       * const users = pgTable('users', {
       * 	id: integer('id').$type<UserId>().primaryKey(),
       * 	details: json('details').$type<UserDetails>().notNull(),
       * });
       * ```
       */
      $type() {
        return this;
      }
      /**
       * Adds a `not null` clause to the column definition.
       *
       * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
       */
      notNull() {
        this.config.notNull = true;
        return this;
      }
      /**
       * Adds a `default <value>` clause to the column definition.
       *
       * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
       *
       * If you need to set a dynamic default value, use {@link $defaultFn} instead.
       */
      default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a dynamic default value to the column.
       * The function will be called when the row is inserted, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $defaultFn}.
       */
      $default = this.$defaultFn;
      /**
       * Adds a dynamic update value to the column.
       * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
       * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $onUpdateFn(fn) {
        this.config.onUpdateFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $onUpdateFn}.
       */
      $onUpdate = this.$onUpdateFn;
      /**
       * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
       *
       * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
       */
      primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
      }
      /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
      setName(name) {
        if (this.config.name !== "") return;
        this.config.name = name;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder, ForeignKey;
var init_foreign_keys = __esm({
  "node_modules/drizzle-orm/pg-core/foreign-keys.js"() {
    init_entity();
    init_table_utils();
    ForeignKeyBuilder = class {
      static [entityKind] = "PgForeignKeyBuilder";
      /** @internal */
      reference;
      /** @internal */
      _onUpdate = "no action";
      /** @internal */
      _onDelete = "no action";
      constructor(config, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action === void 0 ? "no action" : action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action === void 0 ? "no action" : action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey(table, this);
      }
    };
    ForeignKey = class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      static [entityKind] = "PgForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[TableName],
          ...columnNames,
          foreignColumns[0].table[TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    };
  }
});

// node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}
var init_tracing_utils = __esm({
  "node_modules/drizzle-orm/tracing-utils.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder, UniqueOnConstraintBuilder, UniqueConstraint;
var init_unique_constraint = __esm({
  "node_modules/drizzle-orm/pg-core/unique-constraint.js"() {
    init_entity();
    init_table_utils();
    UniqueConstraintBuilder = class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      static [entityKind] = "PgUniqueConstraintBuilder";
      /** @internal */
      columns;
      /** @internal */
      nullsNotDistinctConfig = false;
      nullsNotDistinct() {
        this.nullsNotDistinctConfig = true;
        return this;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    };
    UniqueOnConstraintBuilder = class {
      static [entityKind] = "PgUniqueOnConstraintBuilder";
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
      }
    };
    UniqueConstraint = class {
      constructor(table, columns, nullsNotDistinct, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
        this.nullsNotDistinct = nullsNotDistinct;
      }
      static [entityKind] = "PgUniqueConstraint";
      columns;
      name;
      nullsNotDistinct = false;
      getName() {
        return this.name;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char = arrayString[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char === "," || char === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char = arrayString[i];
    if (char === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char === "}") {
      return [result, i + 1];
    }
    if (char === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}
var init_array = __esm({
  "node_modules/drizzle-orm/pg-core/utils/array.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder, PgColumn, ExtraConfigColumn, IndexedColumn, PgArrayBuilder, PgArray;
var init_common = __esm({
  "node_modules/drizzle-orm/pg-core/columns/common.js"() {
    init_column_builder();
    init_column();
    init_entity();
    init_foreign_keys();
    init_tracing_utils();
    init_unique_constraint();
    init_array();
    PgColumnBuilder = class extends ColumnBuilder {
      foreignKeyConfigs = [];
      static [entityKind] = "PgColumnBuilder";
      array(size) {
        return new PgArrayBuilder(this.config.name, this, size);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name, config) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        this.config.uniqueType = config?.nulls;
        return this;
      }
      generatedAlwaysAs(as) {
        this.config.generated = {
          as,
          type: "always",
          mode: "stored"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return iife(
            (ref2, actions2) => {
              const builder = new ForeignKeyBuilder(() => {
                const foreignColumn = ref2();
                return { columns: [column], foreignColumns: [foreignColumn] };
              });
              if (actions2.onUpdate) {
                builder.onUpdate(actions2.onUpdate);
              }
              if (actions2.onDelete) {
                builder.onDelete(actions2.onDelete);
              }
              return builder.build(table);
            },
            ref,
            actions
          );
        });
      }
      /** @internal */
      buildExtraConfigColumn(table) {
        return new ExtraConfigColumn(table, this.config);
      }
    };
    PgColumn = class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
      static [entityKind] = "PgColumn";
    };
    ExtraConfigColumn = class extends PgColumn {
      static [entityKind] = "ExtraConfigColumn";
      getSQLType() {
        return this.getSQLType();
      }
      indexConfig = {
        order: this.config.order ?? "asc",
        nulls: this.config.nulls ?? "last",
        opClass: this.config.opClass
      };
      defaultConfig = {
        order: "asc",
        nulls: "last",
        opClass: void 0
      };
      asc() {
        this.indexConfig.order = "asc";
        return this;
      }
      desc() {
        this.indexConfig.order = "desc";
        return this;
      }
      nullsFirst() {
        this.indexConfig.nulls = "first";
        return this;
      }
      nullsLast() {
        this.indexConfig.nulls = "last";
        return this;
      }
      /**
       * ### PostgreSQL documentation quote
       *
       * > An operator class with optional parameters can be specified for each column of an index.
       * The operator class identifies the operators to be used by the index for that column.
       * For example, a B-tree index on four-byte integers would use the int4_ops class;
       * this operator class includes comparison functions for four-byte integers.
       * In practice the default operator class for the column's data type is usually sufficient.
       * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
       * For example, we might want to sort a complex-number data type either by absolute value or by real part.
       * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
       * More information about operator classes check:
       *
       * ### Useful links
       * https://www.postgresql.org/docs/current/sql-createindex.html
       *
       * https://www.postgresql.org/docs/current/indexes-opclass.html
       *
       * https://www.postgresql.org/docs/current/xindex.html
       *
       * ### Additional types
       * If you have the `pg_vector` extension installed in your database, you can use the
       * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
       *
       * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
       *
       * @param opClass
       * @returns
       */
      op(opClass) {
        this.indexConfig.opClass = opClass;
        return this;
      }
    };
    IndexedColumn = class {
      static [entityKind] = "IndexedColumn";
      constructor(name, keyAsName, type, indexConfig) {
        this.name = name;
        this.keyAsName = keyAsName;
        this.type = type;
        this.indexConfig = indexConfig;
      }
      name;
      keyAsName;
      type;
      indexConfig;
    };
    PgArrayBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgArrayBuilder";
      constructor(name, baseBuilder, size) {
        super(name, "array", "PgArray");
        this.config.baseBuilder = baseBuilder;
        this.config.size = size;
      }
      /** @internal */
      build(table) {
        const baseColumn = this.config.baseBuilder.build(table);
        return new PgArray(
          table,
          this.config,
          baseColumn
        );
      }
    };
    PgArray = class _PgArray extends PgColumn {
      constructor(table, config, baseColumn, range) {
        super(table, config);
        this.baseColumn = baseColumn;
        this.range = range;
        this.size = config.size;
      }
      size;
      static [entityKind] = "PgArray";
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          value = parsePgArray(value);
        }
        return value.map((v) => this.baseColumn.mapFromDriverValue(v));
      }
      mapToDriverValue(value, isNestedArray = false) {
        const a = value.map(
          (v) => v === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v)
        );
        if (isNestedArray) return a;
        return makePgArray(a);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/enum.js
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
var PgEnumObjectColumnBuilder, PgEnumObjectColumn, isPgEnumSym, PgEnumColumnBuilder, PgEnumColumn;
var init_enum = __esm({
  "node_modules/drizzle-orm/pg-core/columns/enum.js"() {
    init_entity();
    init_common();
    PgEnumObjectColumnBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgEnumObjectColumnBuilder";
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumObjectColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumObjectColumn(
          table,
          this.config
        );
      }
    };
    PgEnumObjectColumn = class extends PgColumn {
      static [entityKind] = "PgEnumObjectColumn";
      enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config) {
        super(table, config);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
    isPgEnumSym = Symbol.for("drizzle:isPgEnum");
    PgEnumColumnBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgEnumColumnBuilder";
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumColumn(
          table,
          this.config
        );
      }
    };
    PgEnumColumn = class extends PgColumn {
      static [entityKind] = "PgEnumColumn";
      enum = this.config.enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config) {
        super(table, config);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
  }
});

// node_modules/drizzle-orm/subquery.js
var Subquery, WithSubquery;
var init_subquery = __esm({
  "node_modules/drizzle-orm/subquery.js"() {
    init_entity();
    Subquery = class {
      static [entityKind] = "Subquery";
      constructor(sql2, fields, alias, isWith = false, usedTables = []) {
        this._ = {
          brand: "Subquery",
          sql: sql2,
          selectedFields: fields,
          alias,
          isWith,
          usedTables
        };
      }
      // getSQL(): SQL<unknown> {
      // 	return new SQL([this]);
      // }
    };
    WithSubquery = class extends Subquery {
      static [entityKind] = "WithSubquery";
    };
  }
});

// node_modules/drizzle-orm/version.js
var version;
var init_version = __esm({
  "node_modules/drizzle-orm/version.js"() {
    version = "0.44.2";
  }
});

// node_modules/drizzle-orm/tracing.js
var otel, rawTracer, tracer;
var init_tracing = __esm({
  "node_modules/drizzle-orm/tracing.js"() {
    init_tracing_utils();
    init_version();
    tracer = {
      startActiveSpan(name, fn) {
        if (!otel) {
          return fn();
        }
        if (!rawTracer) {
          rawTracer = otel.trace.getTracer("drizzle-orm", version);
        }
        return iife(
          (otel2, rawTracer2) => rawTracer2.startActiveSpan(
            name,
            (span) => {
              try {
                return fn(span);
              } catch (e) {
                span.setStatus({
                  code: otel2.SpanStatusCode.ERROR,
                  message: e instanceof Error ? e.message : "Unknown error"
                  // eslint-disable-line no-instanceof/no-instanceof
                });
                throw e;
              } finally {
                span.end();
              }
            }
          ),
          otel,
          rawTracer
        );
      }
    };
  }
});

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig;
var init_view_common = __esm({
  "node_modules/drizzle-orm/view-common.js"() {
    ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");
  }
});

// node_modules/drizzle-orm/sql/sql.js
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    if (is(p, Param) && is(p.value, Placeholder)) {
      if (!(p.value.name in values)) {
        throw new Error(`No value for placeholder "${p.value.name}" was provided`);
      }
      return p.encoder.mapToDriverValue(values[p.value.name]);
    }
    return p;
  });
}
var FakePrimitiveParam, StringChunk, SQL, Name, noopDecoder, noopEncoder, noopMapper, Param, Placeholder, IsDrizzleView, View;
var init_sql = __esm({
  "node_modules/drizzle-orm/sql/sql.js"() {
    init_entity();
    init_enum();
    init_subquery();
    init_tracing();
    init_view_common();
    init_column();
    init_table();
    FakePrimitiveParam = class {
      static [entityKind] = "FakePrimitiveParam";
    };
    StringChunk = class {
      static [entityKind] = "StringChunk";
      value;
      constructor(value) {
        this.value = Array.isArray(value) ? value : [value];
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    SQL = class _SQL {
      constructor(queryChunks) {
        this.queryChunks = queryChunks;
        for (const chunk of queryChunks) {
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            this.usedTables.push(
              schemaName === void 0 ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]
            );
          }
        }
      }
      static [entityKind] = "SQL";
      /** @internal */
      decoder = noopDecoder;
      shouldInlineParams = false;
      /** @internal */
      usedTables = [];
      append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
      }
      toQuery(config) {
        return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
          const query = this.buildQueryFromSourceParams(this.queryChunks, config);
          span?.setAttributes({
            "drizzle.query.text": query.sql,
            "drizzle.query.params": JSON.stringify(query.params)
          });
          return query;
        });
      }
      buildQueryFromSourceParams(chunks, _config) {
        const config = Object.assign({}, _config, {
          inlineParams: _config.inlineParams || this.shouldInlineParams,
          paramStartIndex: _config.paramStartIndex || { value: 0 }
        });
        const {
          casing,
          escapeName,
          escapeParam,
          prepareTyping,
          inlineParams,
          paramStartIndex
        } = config;
        return mergeQueries(chunks.map((chunk) => {
          if (is(chunk, StringChunk)) {
            return { sql: chunk.value.join(""), params: [] };
          }
          if (is(chunk, Name)) {
            return { sql: escapeName(chunk.value), params: [] };
          }
          if (chunk === void 0) {
            return { sql: "", params: [] };
          }
          if (Array.isArray(chunk)) {
            const result = [new StringChunk("(")];
            for (const [i, p] of chunk.entries()) {
              result.push(p);
              if (i < chunk.length - 1) {
                result.push(new StringChunk(", "));
              }
            }
            result.push(new StringChunk(")"));
            return this.buildQueryFromSourceParams(result, config);
          }
          if (is(chunk, _SQL)) {
            return this.buildQueryFromSourceParams(chunk.queryChunks, {
              ...config,
              inlineParams: inlineParams || chunk.shouldInlineParams
            });
          }
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            const tableName = chunk[Table.Symbol.Name];
            return {
              sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
              params: []
            };
          }
          if (is(chunk, Column)) {
            const columnName = casing.getColumnCasing(chunk);
            if (_config.invokeSource === "indexes") {
              return { sql: escapeName(columnName), params: [] };
            }
            const schemaName = chunk.table[Table.Symbol.Schema];
            return {
              sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
              params: []
            };
          }
          if (is(chunk, View)) {
            const schemaName = chunk[ViewBaseConfig].schema;
            const viewName = chunk[ViewBaseConfig].name;
            return {
              sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
              params: []
            };
          }
          if (is(chunk, Param)) {
            if (is(chunk.value, Placeholder)) {
              return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
            }
            const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
            if (is(mappedValue, _SQL)) {
              return this.buildQueryFromSourceParams([mappedValue], config);
            }
            if (inlineParams) {
              return { sql: this.mapInlineParam(mappedValue, config), params: [] };
            }
            let typings = ["none"];
            if (prepareTyping) {
              typings = [prepareTyping(chunk.encoder)];
            }
            return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
          }
          if (is(chunk, Placeholder)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
          }
          if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
            return { sql: escapeName(chunk.fieldAlias), params: [] };
          }
          if (is(chunk, Subquery)) {
            if (chunk._.isWith) {
              return { sql: escapeName(chunk._.alias), params: [] };
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk._.sql,
              new StringChunk(") "),
              new Name(chunk._.alias)
            ], config);
          }
          if (isPgEnum(chunk)) {
            if (chunk.schema) {
              return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
            }
            return { sql: escapeName(chunk.enumName), params: [] };
          }
          if (isSQLWrapper(chunk)) {
            if (chunk.shouldOmitSQLParens?.()) {
              return this.buildQueryFromSourceParams([chunk.getSQL()], config);
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk.getSQL(),
              new StringChunk(")")
            ], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(chunk, config), params: [] };
          }
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }));
      }
      mapInlineParam(chunk, { escapeString }) {
        if (chunk === null) {
          return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
          return chunk.toString();
        }
        if (typeof chunk === "string") {
          return escapeString(chunk);
        }
        if (typeof chunk === "object") {
          const mappedValueAsString = chunk.toString();
          if (mappedValueAsString === "[object Object]") {
            return escapeString(JSON.stringify(chunk));
          }
          return escapeString(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
      }
      getSQL() {
        return this;
      }
      as(alias) {
        if (alias === void 0) {
          return this;
        }
        return new _SQL.Aliased(this, alias);
      }
      mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
        return this;
      }
      inlineParams() {
        this.shouldInlineParams = true;
        return this;
      }
      /**
       * This method is used to conditionally include a part of the query.
       *
       * @param condition - Condition to check
       * @returns itself if the condition is `true`, otherwise `undefined`
       */
      if(condition) {
        return condition ? this : void 0;
      }
    };
    Name = class {
      constructor(value) {
        this.value = value;
      }
      static [entityKind] = "Name";
      brand;
      getSQL() {
        return new SQL([this]);
      }
    };
    noopDecoder = {
      mapFromDriverValue: (value) => value
    };
    noopEncoder = {
      mapToDriverValue: (value) => value
    };
    noopMapper = {
      ...noopDecoder,
      ...noopEncoder
    };
    Param = class {
      /**
       * @param value - Parameter value
       * @param encoder - Encoder to convert the value to a driver parameter
       */
      constructor(value, encoder = noopEncoder) {
        this.value = value;
        this.encoder = encoder;
      }
      static [entityKind] = "Param";
      brand;
      getSQL() {
        return new SQL([this]);
      }
    };
    ((sql2) => {
      function empty() {
        return new SQL([]);
      }
      sql2.empty = empty;
      function fromList(list) {
        return new SQL(list);
      }
      sql2.fromList = fromList;
      function raw(str) {
        return new SQL([new StringChunk(str)]);
      }
      sql2.raw = raw;
      function join(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()) {
          if (i > 0 && separator !== void 0) {
            result.push(separator);
          }
          result.push(chunk);
        }
        return new SQL(result);
      }
      sql2.join = join;
      function identifier(value) {
        return new Name(value);
      }
      sql2.identifier = identifier;
      function placeholder2(name2) {
        return new Placeholder(name2);
      }
      sql2.placeholder = placeholder2;
      function param2(value, encoder) {
        return new Param(value, encoder);
      }
      sql2.param = param2;
    })(sql || (sql = {}));
    ((SQL2) => {
      class Aliased {
        constructor(sql2, fieldAlias) {
          this.sql = sql2;
          this.fieldAlias = fieldAlias;
        }
        static [entityKind] = "SQL.Aliased";
        /** @internal */
        isSelectionField = false;
        getSQL() {
          return this.sql;
        }
        /** @internal */
        clone() {
          return new Aliased(this.sql, this.fieldAlias);
        }
      }
      SQL2.Aliased = Aliased;
    })(SQL || (SQL = {}));
    Placeholder = class {
      constructor(name2) {
        this.name = name2;
      }
      static [entityKind] = "Placeholder";
      getSQL() {
        return new SQL([this]);
      }
    };
    IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");
    View = class {
      static [entityKind] = "View";
      /** @internal */
      [ViewBaseConfig];
      /** @internal */
      [IsDrizzleView] = true;
      constructor({ name: name2, schema, selectedFields, query }) {
        this[ViewBaseConfig] = {
          name: name2,
          originalName: name2,
          schema,
          selectedFields,
          query,
          isExisting: !query,
          isAlias: false
        };
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    Column.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Table.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Subquery.prototype.getSQL = function() {
      return new SQL([this]);
    };
  }
});

// node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce(
    (result2, { path: path2, field }, columnIndex) => {
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      let node = result2;
      for (const [pathChunkIndex, pathChunk] of path2.entries()) {
        if (pathChunkIndex < path2.length - 1) {
          if (!(pathChunk in node)) {
            node[pathChunk] = {};
          }
          node = node[pathChunk];
        } else {
          const rawValue = row[columnIndex];
          const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
          if (joinsNotNullableMap && is(field, Column) && path2.length === 2) {
            const objectName = path2[0];
            if (!(objectName in nullifyMap)) {
              nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
            } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
              nullifyMap[objectName] = false;
            }
          }
        }
      }
      return result2;
    },
    {}
  );
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (is(value, SQL) || is(value, Column)) {
      return [key, value];
    } else {
      return [key, new Param(value, table[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === "constructor") continue;
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null)
      );
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return is(table, Subquery) ? table._.alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}
function isConfig(data) {
  if (typeof data !== "object" || data === null) return false;
  if (data.constructor.name !== "Object") return false;
  if ("logger" in data) {
    const type = typeof data["logger"];
    if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined") return false;
    return true;
  }
  if ("schema" in data) {
    const type = typeof data["schema"];
    if (type !== "object" && type !== "undefined") return false;
    return true;
  }
  if ("casing" in data) {
    const type = typeof data["casing"];
    if (type !== "string" && type !== "undefined") return false;
    return true;
  }
  if ("mode" in data) {
    if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== void 0) return false;
    return true;
  }
  if ("connection" in data) {
    const type = typeof data["connection"];
    if (type !== "string" && type !== "object" && type !== "undefined") return false;
    return true;
  }
  if ("client" in data) {
    const type = typeof data["client"];
    if (type !== "object" && type !== "function" && type !== "undefined") return false;
    return true;
  }
  if (Object.keys(data).length === 0) return true;
  return false;
}
var init_utils = __esm({
  "node_modules/drizzle-orm/utils.js"() {
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_table();
    init_view_common();
  }
});

// node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys, EnableRLS, PgTable;
var init_table2 = __esm({
  "node_modules/drizzle-orm/pg-core/table.js"() {
    init_entity();
    init_table();
    InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");
    EnableRLS = Symbol.for("drizzle:EnableRLS");
    PgTable = class extends Table {
      static [entityKind] = "PgTable";
      /** @internal */
      static Symbol = Object.assign({}, Table.Symbol, {
        InlineForeignKeys,
        EnableRLS
      });
      /**@internal */
      [InlineForeignKeys] = [];
      /** @internal */
      [EnableRLS] = false;
      /** @internal */
      [Table.Symbol.ExtraConfigBuilder] = void 0;
      /** @internal */
      [Table.Symbol.ExtraConfigColumns] = {};
    };
  }
});

// node_modules/drizzle-orm/pg-core/primary-keys.js
var PrimaryKeyBuilder, PrimaryKey;
var init_primary_keys = __esm({
  "node_modules/drizzle-orm/pg-core/primary-keys.js"() {
    init_entity();
    init_table2();
    PrimaryKeyBuilder = class {
      static [entityKind] = "PgPrimaryKeyBuilder";
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns, this.name);
      }
    };
    PrimaryKey = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      static [entityKind] = "PgPrimaryKey";
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
  }
});

// node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function not(condition) {
  return sql`not ${condition}`;
}
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`false`;
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`true`;
    }
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql`${value} is null`;
}
function isNotNull(value) {
  return sql`${value} is not null`;
}
function exists(subquery) {
  return sql`exists ${subquery}`;
}
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(
    max,
    column
  )}`;
}
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(
    min,
    column
  )} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql`${column} like ${value}`;
}
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
var eq, ne, gt, gte, lt, lte;
var init_conditions = __esm({
  "node_modules/drizzle-orm/sql/expressions/conditions.js"() {
    init_column();
    init_entity();
    init_table();
    init_sql();
    eq = (left, right) => {
      return sql`${left} = ${bindIfParam(right, left)}`;
    };
    ne = (left, right) => {
      return sql`${left} <> ${bindIfParam(right, left)}`;
    };
    gt = (left, right) => {
      return sql`${left} > ${bindIfParam(right, left)}`;
    };
    gte = (left, right) => {
      return sql`${left} >= ${bindIfParam(right, left)}`;
    };
    lt = (left, right) => {
      return sql`${left} < ${bindIfParam(right, left)}`;
    };
    lte = (left, right) => {
      return sql`${left} <= ${bindIfParam(right, left)}`;
    };
  }
});

// node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}
var init_select = __esm({
  "node_modules/drizzle-orm/sql/expressions/select.js"() {
    init_sql();
  }
});

// node_modules/drizzle-orm/sql/expressions/index.js
var init_expressions = __esm({
  "node_modules/drizzle-orm/sql/expressions/index.js"() {
    init_conditions();
    init_select();
  }
});

// node_modules/drizzle-orm/relations.js
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
function extractTablesRelationalConfig(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (is(value, Table)) {
      const dbName = getTableUniqueName(value);
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column of Object.values(
        value[Table.Symbol.Columns]
      )) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value[Table.Symbol.ExtraConfigColumns]);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = getTableUniqueName(value.table);
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(
        configHelpers(value.table)
      );
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
function createOne(sourceTable) {
  return function one(table, config) {
    return new One(
      sourceTable,
      table,
      config,
      config?.fields.reduce((res, f) => res && f.notNull, true) ?? false
    );
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
  if (!referencedTableTsName) {
    throw new Error(
      `Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[getTableUniqueName(sourceTable)];
  if (!sourceTableTsName) {
    throw new Error(
      `Table "${sourceTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(
    referencedTableConfig.relations
  )) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(
      `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
    ) : new Error(
      `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`
    );
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(
    `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
  );
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(
        tablesConfig,
        tablesConfig[selectionItem.relationTableTsKey],
        subRows,
        selectionItem.selection,
        mapColumnValue
      ) : subRows.map(
        (subRow) => mapRelationalRow(
          tablesConfig,
          tablesConfig[selectionItem.relationTableTsKey],
          subRow,
          selectionItem.selection,
          mapColumnValue
        )
      );
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
var Relation, Relations, One, Many;
var init_relations = __esm({
  "node_modules/drizzle-orm/relations.js"() {
    init_table();
    init_column();
    init_entity();
    init_primary_keys();
    init_expressions();
    init_sql();
    Relation = class {
      constructor(sourceTable, referencedTable, relationName) {
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[Table.Symbol.Name];
      }
      static [entityKind] = "Relation";
      referencedTableName;
      fieldName;
    };
    Relations = class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
      }
      static [entityKind] = "Relations";
    };
    One = class _One extends Relation {
      constructor(sourceTable, referencedTable, config, isNullable) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
        this.isNullable = isNullable;
      }
      static [entityKind] = "One";
      withFieldName(fieldName) {
        const relation = new _One(
          this.sourceTable,
          this.referencedTable,
          this.config,
          this.isNullable
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
    Many = class _Many extends Relation {
      constructor(sourceTable, referencedTable, config) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
      }
      static [entityKind] = "Many";
      withFieldName(fieldName) {
        const relation = new _Many(
          this.sourceTable,
          this.referencedTable,
          this.config
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
  }
});

// node_modules/drizzle-orm/alias.js
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(
    column,
    new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false)))
  );
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) {
      return aliasedTableColumn(c, alias);
    }
    if (is(c, SQL)) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (is(c, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
}
var ColumnAliasProxyHandler, TableAliasProxyHandler, RelationTableAliasProxyHandler;
var init_alias = __esm({
  "node_modules/drizzle-orm/alias.js"() {
    init_column();
    init_entity();
    init_sql();
    init_table();
    init_view_common();
    ColumnAliasProxyHandler = class {
      constructor(table) {
        this.table = table;
      }
      static [entityKind] = "ColumnAliasProxyHandler";
      get(columnObj, prop) {
        if (prop === "table") {
          return this.table;
        }
        return columnObj[prop];
      }
    };
    TableAliasProxyHandler = class {
      constructor(alias, replaceOriginalName) {
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
      }
      static [entityKind] = "TableAliasProxyHandler";
      get(target, prop) {
        if (prop === Table.Symbol.IsAlias) {
          return true;
        }
        if (prop === Table.Symbol.Name) {
          return this.alias;
        }
        if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
          return this.alias;
        }
        if (prop === ViewBaseConfig) {
          return {
            ...target[ViewBaseConfig],
            name: this.alias,
            isAlias: true
          };
        }
        if (prop === Table.Symbol.Columns) {
          const columns = target[Table.Symbol.Columns];
          if (!columns) {
            return columns;
          }
          const proxiedColumns = {};
          Object.keys(columns).map((key) => {
            proxiedColumns[key] = new Proxy(
              columns[key],
              new ColumnAliasProxyHandler(new Proxy(target, this))
            );
          });
          return proxiedColumns;
        }
        const value = target[prop];
        if (is(value, Column)) {
          return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
      }
    };
    RelationTableAliasProxyHandler = class {
      constructor(alias) {
        this.alias = alias;
      }
      static [entityKind] = "RelationTableAliasProxyHandler";
      get(target, prop) {
        if (prop === "sourceTable") {
          return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
      }
    };
  }
});

// node_modules/drizzle-orm/selection-proxy.js
var SelectionProxyHandler;
var init_selection_proxy = __esm({
  "node_modules/drizzle-orm/selection-proxy.js"() {
    init_alias();
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_view_common();
    SelectionProxyHandler = class _SelectionProxyHandler {
      static [entityKind] = "SelectionProxyHandler";
      config;
      constructor(config) {
        this.config = { ...config };
      }
      get(subquery, prop) {
        if (prop === "_") {
          return {
            ...subquery["_"],
            selectedFields: new Proxy(
              subquery._.selectedFields,
              this
            )
          };
        }
        if (prop === ViewBaseConfig) {
          return {
            ...subquery[ViewBaseConfig],
            selectedFields: new Proxy(
              subquery[ViewBaseConfig].selectedFields,
              this
            )
          };
        }
        if (typeof prop === "symbol") {
          return subquery[prop];
        }
        const columns = is(subquery, Subquery) ? subquery._.selectedFields : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
        const value = columns[prop];
        if (is(value, SQL.Aliased)) {
          if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
            return value.sql;
          }
          const newValue = value.clone();
          newValue.isSelectionField = true;
          return newValue;
        }
        if (is(value, SQL)) {
          if (this.config.sqlBehavior === "sql") {
            return value;
          }
          throw new Error(
            `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
          );
        }
        if (is(value, Column)) {
          if (this.config.alias) {
            return new Proxy(
              value,
              new ColumnAliasProxyHandler(
                new Proxy(
                  value.table,
                  new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false)
                )
              )
            );
          }
          return value;
        }
        if (typeof value !== "object" || value === null) {
          return value;
        }
        return new Proxy(value, new _SelectionProxyHandler(this.config));
      }
    };
  }
});

// node_modules/drizzle-orm/query-promise.js
var QueryPromise;
var init_query_promise = __esm({
  "node_modules/drizzle-orm/query-promise.js"() {
    init_entity();
    QueryPromise = class {
      static [entityKind] = "QueryPromise";
      [Symbol.toStringTag] = "QueryPromise";
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
      then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/foreign-keys.js
var ForeignKeyBuilder2, ForeignKey2;
var init_foreign_keys2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/foreign-keys.js"() {
    init_entity();
    init_table_utils();
    ForeignKeyBuilder2 = class {
      static [entityKind] = "SQLiteForeignKeyBuilder";
      /** @internal */
      reference;
      /** @internal */
      _onUpdate;
      /** @internal */
      _onDelete;
      constructor(config, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey2(table, this);
      }
    };
    ForeignKey2 = class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      static [entityKind] = "SQLiteForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[TableName],
          ...columnNames,
          foreignColumns[0].table[TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/unique-constraint.js
function uniqueKeyName2(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder2, UniqueOnConstraintBuilder2, UniqueConstraint2;
var init_unique_constraint2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/unique-constraint.js"() {
    init_entity();
    init_table_utils();
    UniqueConstraintBuilder2 = class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      static [entityKind] = "SQLiteUniqueConstraintBuilder";
      /** @internal */
      columns;
      /** @internal */
      build(table) {
        return new UniqueConstraint2(table, this.columns, this.name);
      }
    };
    UniqueOnConstraintBuilder2 = class {
      static [entityKind] = "SQLiteUniqueOnConstraintBuilder";
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder2(columns, this.name);
      }
    };
    UniqueConstraint2 = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName2(this.table, this.columns.map((column) => column.name));
      }
      static [entityKind] = "SQLiteUniqueConstraint";
      columns;
      name;
      getName() {
        return this.name;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/common.js
var SQLiteColumnBuilder, SQLiteColumn;
var init_common2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/common.js"() {
    init_column_builder();
    init_column();
    init_entity();
    init_foreign_keys2();
    init_unique_constraint2();
    SQLiteColumnBuilder = class extends ColumnBuilder {
      static [entityKind] = "SQLiteColumnBuilder";
      foreignKeyConfigs = [];
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        return this;
      }
      generatedAlwaysAs(as, config) {
        this.config.generated = {
          as,
          type: "always",
          mode: config?.mode ?? "virtual"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return ((ref2, actions2) => {
            const builder = new ForeignKeyBuilder2(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions2.onUpdate) {
              builder.onUpdate(actions2.onUpdate);
            }
            if (actions2.onDelete) {
              builder.onDelete(actions2.onDelete);
            }
            return builder.build(table);
          })(ref, actions);
        });
      }
    };
    SQLiteColumn = class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName2(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
      static [entityKind] = "SQLiteColumn";
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/blob.js
function blob(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "json") {
    return new SQLiteBlobJsonBuilder(name);
  }
  if (config?.mode === "bigint") {
    return new SQLiteBigIntBuilder(name);
  }
  return new SQLiteBlobBufferBuilder(name);
}
var SQLiteBigIntBuilder, SQLiteBigInt, SQLiteBlobJsonBuilder, SQLiteBlobJson, SQLiteBlobBufferBuilder, SQLiteBlobBuffer;
var init_blob = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/blob.js"() {
    init_entity();
    init_utils();
    init_common2();
    SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteBigIntBuilder";
      constructor(name) {
        super(name, "bigint", "SQLiteBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteBigInt(table, this.config);
      }
    };
    SQLiteBigInt = class extends SQLiteColumn {
      static [entityKind] = "SQLiteBigInt";
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return BigInt(value.toString());
        }
        if (value instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          return BigInt(decoder.decode(value));
        }
        return BigInt(String.fromCodePoint(...value));
      }
      mapToDriverValue(value) {
        return Buffer.from(value.toString());
      }
    };
    SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteBlobJsonBuilder";
      constructor(name) {
        super(name, "json", "SQLiteBlobJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobJson(
          table,
          this.config
        );
      }
    };
    SQLiteBlobJson = class extends SQLiteColumn {
      static [entityKind] = "SQLiteBlobJson";
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return JSON.parse(value.toString());
        }
        if (value instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          return JSON.parse(decoder.decode(value));
        }
        return JSON.parse(String.fromCodePoint(...value));
      }
      mapToDriverValue(value) {
        return Buffer.from(JSON.stringify(value));
      }
    };
    SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteBlobBufferBuilder";
      constructor(name) {
        super(name, "buffer", "SQLiteBlobBuffer");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobBuffer(table, this.config);
      }
    };
    SQLiteBlobBuffer = class extends SQLiteColumn {
      static [entityKind] = "SQLiteBlobBuffer";
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return value;
        }
        return Buffer.from(value);
      }
      getSQLType() {
        return "blob";
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/custom.js
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(
      name,
      config,
      customTypeParams
    );
  };
}
var SQLiteCustomColumnBuilder, SQLiteCustomColumn;
var init_custom = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/custom.js"() {
    init_entity();
    init_utils();
    init_common2();
    SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteCustomColumnBuilder";
      constructor(name, fieldConfig, customTypeParams) {
        super(name, "custom", "SQLiteCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new SQLiteCustomColumn(
          table,
          this.config
        );
      }
    };
    SQLiteCustomColumn = class extends SQLiteColumn {
      static [entityKind] = "SQLiteCustomColumn";
      sqlName;
      mapTo;
      mapFrom;
      constructor(table, config) {
        super(table, config);
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/integer.js
function integer(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}
var SQLiteBaseIntegerBuilder, SQLiteBaseInteger, SQLiteIntegerBuilder, SQLiteInteger, SQLiteTimestampBuilder, SQLiteTimestamp, SQLiteBooleanBuilder, SQLiteBoolean;
var init_integer = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/integer.js"() {
    init_entity();
    init_sql();
    init_utils();
    init_common2();
    SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteBaseIntegerBuilder";
      constructor(name, dataType, columnType) {
        super(name, dataType, columnType);
        this.config.autoIncrement = false;
      }
      primaryKey(config) {
        if (config?.autoIncrement) {
          this.config.autoIncrement = true;
        }
        this.config.hasDefault = true;
        return super.primaryKey();
      }
    };
    SQLiteBaseInteger = class extends SQLiteColumn {
      static [entityKind] = "SQLiteBaseInteger";
      autoIncrement = this.config.autoIncrement;
      getSQLType() {
        return "integer";
      }
    };
    SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
      static [entityKind] = "SQLiteIntegerBuilder";
      constructor(name) {
        super(name, "number", "SQLiteInteger");
      }
      build(table) {
        return new SQLiteInteger(
          table,
          this.config
        );
      }
    };
    SQLiteInteger = class extends SQLiteBaseInteger {
      static [entityKind] = "SQLiteInteger";
    };
    SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
      static [entityKind] = "SQLiteTimestampBuilder";
      constructor(name, mode) {
        super(name, "date", "SQLiteTimestamp");
        this.config.mode = mode;
      }
      /**
       * @deprecated Use `default()` with your own expression instead.
       *
       * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
       */
      defaultNow() {
        return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
      }
      build(table) {
        return new SQLiteTimestamp(
          table,
          this.config
        );
      }
    };
    SQLiteTimestamp = class extends SQLiteBaseInteger {
      static [entityKind] = "SQLiteTimestamp";
      mode = this.config.mode;
      mapFromDriverValue(value) {
        if (this.config.mode === "timestamp") {
          return new Date(value * 1e3);
        }
        return new Date(value);
      }
      mapToDriverValue(value) {
        const unix = value.getTime();
        if (this.config.mode === "timestamp") {
          return Math.floor(unix / 1e3);
        }
        return unix;
      }
    };
    SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
      static [entityKind] = "SQLiteBooleanBuilder";
      constructor(name, mode) {
        super(name, "boolean", "SQLiteBoolean");
        this.config.mode = mode;
      }
      build(table) {
        return new SQLiteBoolean(
          table,
          this.config
        );
      }
    };
    SQLiteBoolean = class extends SQLiteBaseInteger {
      static [entityKind] = "SQLiteBoolean";
      mode = this.config.mode;
      mapFromDriverValue(value) {
        return Number(value) === 1;
      }
      mapToDriverValue(value) {
        return value ? 1 : 0;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/numeric.js
function numeric(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  const mode = config?.mode;
  return mode === "number" ? new SQLiteNumericNumberBuilder(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name) : new SQLiteNumericBuilder(name);
}
var SQLiteNumericBuilder, SQLiteNumeric, SQLiteNumericNumberBuilder, SQLiteNumericNumber, SQLiteNumericBigIntBuilder, SQLiteNumericBigInt;
var init_numeric = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/numeric.js"() {
    init_entity();
    init_utils();
    init_common2();
    SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteNumericBuilder";
      constructor(name) {
        super(name, "string", "SQLiteNumeric");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumeric(
          table,
          this.config
        );
      }
    };
    SQLiteNumeric = class extends SQLiteColumn {
      static [entityKind] = "SQLiteNumeric";
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return String(value);
      }
      getSQLType() {
        return "numeric";
      }
    };
    SQLiteNumericNumberBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteNumericNumberBuilder";
      constructor(name) {
        super(name, "number", "SQLiteNumericNumber");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumericNumber(
          table,
          this.config
        );
      }
    };
    SQLiteNumericNumber = class extends SQLiteColumn {
      static [entityKind] = "SQLiteNumericNumber";
      mapFromDriverValue(value) {
        if (typeof value === "number") return value;
        return Number(value);
      }
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    };
    SQLiteNumericBigIntBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteNumericBigIntBuilder";
      constructor(name) {
        super(name, "bigint", "SQLiteNumericBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumericBigInt(
          table,
          this.config
        );
      }
    };
    SQLiteNumericBigInt = class extends SQLiteColumn {
      static [entityKind] = "SQLiteNumericBigInt";
      mapFromDriverValue = BigInt;
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/real.js
function real(name) {
  return new SQLiteRealBuilder(name ?? "");
}
var SQLiteRealBuilder, SQLiteReal;
var init_real = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/real.js"() {
    init_entity();
    init_common2();
    SQLiteRealBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteRealBuilder";
      constructor(name) {
        super(name, "number", "SQLiteReal");
      }
      /** @internal */
      build(table) {
        return new SQLiteReal(table, this.config);
      }
    };
    SQLiteReal = class extends SQLiteColumn {
      static [entityKind] = "SQLiteReal";
      getSQLType() {
        return "real";
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/text.js
function text(a, b = {}) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config.mode === "json") {
    return new SQLiteTextJsonBuilder(name);
  }
  return new SQLiteTextBuilder(name, config);
}
var SQLiteTextBuilder, SQLiteText, SQLiteTextJsonBuilder, SQLiteTextJson;
var init_text = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/text.js"() {
    init_entity();
    init_utils();
    init_common2();
    SQLiteTextBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteTextBuilder";
      constructor(name, config) {
        super(name, "string", "SQLiteText");
        this.config.enumValues = config.enum;
        this.config.length = config.length;
      }
      /** @internal */
      build(table) {
        return new SQLiteText(
          table,
          this.config
        );
      }
    };
    SQLiteText = class extends SQLiteColumn {
      static [entityKind] = "SQLiteText";
      enumValues = this.config.enumValues;
      length = this.config.length;
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
      }
    };
    SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
      static [entityKind] = "SQLiteTextJsonBuilder";
      constructor(name) {
        super(name, "json", "SQLiteTextJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteTextJson(
          table,
          this.config
        );
      }
    };
    SQLiteTextJson = class extends SQLiteColumn {
      static [entityKind] = "SQLiteTextJson";
      getSQLType() {
        return "text";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value);
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/all.js
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType,
    integer,
    numeric,
    real,
    text
  };
}
var init_all = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/all.js"() {
    init_blob();
    init_custom();
    init_integer();
    init_numeric();
    init_real();
    init_text();
  }
});

// node_modules/drizzle-orm/sqlite-core/table.js
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var InlineForeignKeys2, SQLiteTable, sqliteTable;
var init_table3 = __esm({
  "node_modules/drizzle-orm/sqlite-core/table.js"() {
    init_entity();
    init_table();
    init_all();
    InlineForeignKeys2 = Symbol.for("drizzle:SQLiteInlineForeignKeys");
    SQLiteTable = class extends Table {
      static [entityKind] = "SQLiteTable";
      /** @internal */
      static Symbol = Object.assign({}, Table.Symbol, {
        InlineForeignKeys: InlineForeignKeys2
      });
      /** @internal */
      [Table.Symbol.Columns];
      /** @internal */
      [InlineForeignKeys2] = [];
      /** @internal */
      [Table.Symbol.ExtraConfigBuilder] = void 0;
    };
    sqliteTable = (name, columns, extraConfig) => {
      return sqliteTableBase(name, columns, extraConfig);
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/checks.js
var CheckBuilder, Check;
var init_checks = __esm({
  "node_modules/drizzle-orm/sqlite-core/checks.js"() {
    init_entity();
    CheckBuilder = class {
      constructor(name, value) {
        this.name = name;
        this.value = value;
      }
      static [entityKind] = "SQLiteCheckBuilder";
      brand;
      build(table) {
        return new Check(table, this);
      }
    };
    Check = class {
      constructor(table, builder) {
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
      static [entityKind] = "SQLiteCheck";
      name;
      value;
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/indexes.js
var IndexBuilderOn, IndexBuilder, Index;
var init_indexes = __esm({
  "node_modules/drizzle-orm/sqlite-core/indexes.js"() {
    init_entity();
    IndexBuilderOn = class {
      constructor(name, unique) {
        this.name = name;
        this.unique = unique;
      }
      static [entityKind] = "SQLiteIndexBuilderOn";
      on(...columns) {
        return new IndexBuilder(this.name, columns, this.unique);
      }
    };
    IndexBuilder = class {
      static [entityKind] = "SQLiteIndexBuilder";
      /** @internal */
      config;
      constructor(name, columns, unique) {
        this.config = {
          name,
          columns,
          unique,
          where: void 0
        };
      }
      /**
       * Condition for partial index.
       */
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index(this.config, table);
      }
    };
    Index = class {
      static [entityKind] = "SQLiteIndex";
      config;
      constructor(config, table) {
        this.config = { ...config, table };
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/primary-keys.js
var PrimaryKeyBuilder2, PrimaryKey2;
var init_primary_keys2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/primary-keys.js"() {
    init_entity();
    init_table3();
    PrimaryKeyBuilder2 = class {
      static [entityKind] = "SQLitePrimaryKeyBuilder";
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey2(table, this.columns, this.name);
      }
    };
    PrimaryKey2 = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      static [entityKind] = "SQLitePrimaryKey";
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/utils.js
function extractUsedTable(table) {
  if (is(table, SQLiteTable)) {
    return [`${table[Table.Symbol.BaseName]}`];
  }
  if (is(table, Subquery)) {
    return table._.usedTables ?? [];
  }
  if (is(table, SQL)) {
    return table.usedTables ?? [];
  }
  return [];
}
var init_utils2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/utils.js"() {
    init_entity();
    init_sql();
    init_subquery();
    init_table();
    init_table3();
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/delete.js
var SQLiteDeleteBase;
var init_delete = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/delete.js"() {
    init_entity();
    init_query_promise();
    init_selection_proxy();
    init_table3();
    init_table();
    init_utils();
    init_utils2();
    SQLiteDeleteBase = class extends QueryPromise {
      constructor(table, session, dialect, withList) {
        super();
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = { table, withList };
      }
      static [entityKind] = "SQLiteDelete";
      /** @internal */
      config;
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will delete only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be deleted.
       *
       * ```ts
       * // Delete all cars with green color
       * db.delete(cars).where(eq(cars.color, 'green'));
       * // or
       * db.delete(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Delete all BMW cars with a green color
       * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Delete all cars with the green or blue color
       * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.table[Table.Symbol.Columns],
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          this.config.orderBy = orderByArray;
        } else {
          const orderByArray = columns;
          this.config.orderBy = orderByArray;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "delete",
            tables: extractUsedTable(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute(placeholderValues) {
        return this._prepare().execute(placeholderValues);
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/casing.js
function toSnakeCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.map((word) => word.toLowerCase()).join("_");
}
function toCamelCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.reduce((acc, word, i) => {
    const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
    return acc + formattedWord;
  }, "");
}
function noopCase(input) {
  return input;
}
var CasingCache;
var init_casing = __esm({
  "node_modules/drizzle-orm/casing.js"() {
    init_entity();
    init_table();
    CasingCache = class {
      static [entityKind] = "CasingCache";
      /** @internal */
      cache = {};
      cachedTables = {};
      convert;
      constructor(casing) {
        this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
      }
      getColumnCasing(column) {
        if (!column.keyAsName) return column.name;
        const schema = column.table[Table.Symbol.Schema] ?? "public";
        const tableName = column.table[Table.Symbol.OriginalName];
        const key = `${schema}.${tableName}.${column.name}`;
        if (!this.cache[key]) {
          this.cacheTable(column.table);
        }
        return this.cache[key];
      }
      cacheTable(table) {
        const schema = table[Table.Symbol.Schema] ?? "public";
        const tableName = table[Table.Symbol.OriginalName];
        const tableKey = `${schema}.${tableName}`;
        if (!this.cachedTables[tableKey]) {
          for (const column of Object.values(table[Table.Symbol.Columns])) {
            const columnKey = `${tableKey}.${column.name}`;
            this.cache[columnKey] = this.convert(column.name);
          }
          this.cachedTables[tableKey] = true;
        }
      }
      clearCache() {
        this.cache = {};
        this.cachedTables = {};
      }
    };
  }
});

// node_modules/drizzle-orm/errors.js
var DrizzleError, TransactionRollbackError;
var init_errors = __esm({
  "node_modules/drizzle-orm/errors.js"() {
    init_entity();
    DrizzleError = class extends Error {
      static [entityKind] = "DrizzleError";
      constructor({ message, cause }) {
        super(message);
        this.name = "DrizzleError";
        this.cause = cause;
      }
    };
    TransactionRollbackError = class extends DrizzleError {
      static [entityKind] = "TransactionRollbackError";
      constructor() {
        super({ message: "Rollback" });
      }
    };
  }
});

// node_modules/drizzle-orm/sql/functions/aggregate.js
var init_aggregate = __esm({
  "node_modules/drizzle-orm/sql/functions/aggregate.js"() {
  }
});

// node_modules/drizzle-orm/sql/functions/vector.js
var init_vector = __esm({
  "node_modules/drizzle-orm/sql/functions/vector.js"() {
  }
});

// node_modules/drizzle-orm/sql/functions/index.js
var init_functions = __esm({
  "node_modules/drizzle-orm/sql/functions/index.js"() {
    init_aggregate();
    init_vector();
  }
});

// node_modules/drizzle-orm/sql/index.js
var init_sql2 = __esm({
  "node_modules/drizzle-orm/sql/index.js"() {
    init_expressions();
    init_functions();
    init_sql();
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/index.js
var init_columns = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/index.js"() {
    init_blob();
    init_common2();
    init_custom();
    init_integer();
    init_numeric();
    init_real();
    init_text();
  }
});

// node_modules/drizzle-orm/sqlite-core/view-base.js
var SQLiteViewBase;
var init_view_base = __esm({
  "node_modules/drizzle-orm/sqlite-core/view-base.js"() {
    init_entity();
    init_sql();
    SQLiteViewBase = class extends View {
      static [entityKind] = "SQLiteViewBase";
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/dialect.js
var SQLiteDialect, SQLiteSyncDialect, SQLiteAsyncDialect;
var init_dialect = __esm({
  "node_modules/drizzle-orm/sqlite-core/dialect.js"() {
    init_alias();
    init_casing();
    init_column();
    init_entity();
    init_errors();
    init_relations();
    init_sql2();
    init_sql();
    init_columns();
    init_table3();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_view_base();
    SQLiteDialect = class {
      static [entityKind] = "SQLiteDialect";
      /** @internal */
      casing;
      constructor(config) {
        this.casing = new CasingCache(config?.casing);
      }
      escapeName(name) {
        return `"${name}"`;
      }
      escapeParam(_num) {
        return "?";
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildWithCTE(queries) {
        if (!queries?.length) return void 0;
        const withSqlChunks = [sql`with `];
        for (const [i, w] of queries.entries()) {
          withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
          if (i < queries.length - 1) {
            withSqlChunks.push(sql`, `);
          }
        }
        withSqlChunks.push(sql` `);
        return sql.join(withSqlChunks);
      }
      buildDeleteQuery({ table, where, returning, withList, limit, orderBy }) {
        const withSql = this.buildWithCTE(withList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return sql`${withSql}delete from ${table}${whereSql}${returningSql}${orderBySql}${limitSql}`;
      }
      buildUpdateSet(table, set) {
        const tableColumns = table[Table.Symbol.Columns];
        const columnNames = Object.keys(tableColumns).filter(
          (colName) => set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0
        );
        const setSize = columnNames.length;
        return sql.join(columnNames.flatMap((colName, i) => {
          const col = tableColumns[colName];
          const value = set[colName] ?? sql.param(col.onUpdateFn(), col);
          const res = sql`${sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
          if (i < setSize - 1) {
            return [res, sql.raw(", ")];
          }
          return [res];
        }));
      }
      buildUpdateQuery({ table, set, where, returning, withList, joins, from, limit, orderBy }) {
        const withSql = this.buildWithCTE(withList);
        const setSql = this.buildUpdateSet(table, set);
        const fromSql = from && sql.join([sql.raw(" from "), this.buildFromTable(from)]);
        const joinsSql = this.buildJoins(joins);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return sql`${withSql}update ${table} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}${orderBySql}${limitSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(
                new SQL(
                  query.queryChunks.map((c) => {
                    if (is(c, Column)) {
                      return sql.identifier(this.casing.getColumnCasing(c));
                    }
                    return c;
                  })
                )
              );
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            const tableName = field.table[Table.Symbol.Name];
            if (field.columnType === "SQLiteNumericBigInt") {
              if (isSingleTable) {
                chunk.push(sql`cast(${sql.identifier(this.casing.getColumnCasing(field))} as text)`);
              } else {
                chunk.push(
                  sql`cast(${sql.identifier(tableName)}.${sql.identifier(this.casing.getColumnCasing(field))} as text)`
                );
              }
            } else {
              if (isSingleTable) {
                chunk.push(sql.identifier(this.casing.getColumnCasing(field)));
              } else {
                chunk.push(sql`${sql.identifier(tableName)}.${sql.identifier(this.casing.getColumnCasing(field))}`);
              }
            }
          }
          if (i < columnsLen - 1) {
            chunk.push(sql`, `);
          }
          return chunk;
        });
        return sql.join(chunks);
      }
      buildJoins(joins) {
        if (!joins || joins.length === 0) {
          return void 0;
        }
        const joinsArray = [];
        if (joins) {
          for (const [index, joinMeta] of joins.entries()) {
            if (index === 0) {
              joinsArray.push(sql` `);
            }
            const table = joinMeta.table;
            const onSql = joinMeta.on ? sql` on ${joinMeta.on}` : void 0;
            if (is(table, SQLiteTable)) {
              const tableName = table[SQLiteTable.Symbol.Name];
              const tableSchema = table[SQLiteTable.Symbol.Schema];
              const origTableName = table[SQLiteTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(
                sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
              );
            } else {
              joinsArray.push(
                sql`${sql.raw(joinMeta.joinType)} join ${table}${onSql}`
              );
            }
            if (index < joins.length - 1) {
              joinsArray.push(sql` `);
            }
          }
        }
        return sql.join(joinsArray);
      }
      buildLimit(limit) {
        return typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
      }
      buildOrderBy(orderBy) {
        const orderByList = [];
        if (orderBy) {
          for (const [index, orderByValue] of orderBy.entries()) {
            orderByList.push(orderByValue);
            if (index < orderBy.length - 1) {
              orderByList.push(sql`, `);
            }
          }
        }
        return orderByList.length > 0 ? sql` order by ${sql.join(orderByList)}` : void 0;
      }
      buildFromTable(table) {
        if (is(table, Table) && table[Table.Symbol.IsAlias]) {
          return sql`${sql`${sql.identifier(table[Table.Symbol.Schema] ?? "")}.`.if(table[Table.Symbol.Schema])}${sql.identifier(table[Table.Symbol.OriginalName])} ${sql.identifier(table[Table.Symbol.Name])}`;
        }
        return table;
      }
      buildSelectQuery({
        withList,
        fields,
        fieldsFlat,
        where,
        having,
        table,
        joins,
        orderBy,
        groupBy,
        limit,
        offset,
        distinct,
        setOperators
      }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f of fieldsList) {
          if (is(f.field, Column) && getTableName(f.field.table) !== (is(table, Subquery) ? table._.alias : is(table, SQLiteViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(
            ({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])
          ))(f.field.table)) {
            const tableName = getTableName(f.field.table);
            throw new Error(
              `Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
            );
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        const withSql = this.buildWithCTE(withList);
        const distinctSql = distinct ? sql` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = this.buildFromTable(table);
        const joinsSql = this.buildJoins(joins);
        const whereSql = where ? sql` where ${where}` : void 0;
        const havingSql = having ? sql` having ${having}` : void 0;
        const groupByList = [];
        if (groupBy) {
          for (const [index, groupByValue] of groupBy.entries()) {
            groupByList.push(groupByValue);
            if (index < groupBy.length - 1) {
              groupByList.push(sql`, `);
            }
          }
        }
        const groupBySql = groupByList.length > 0 ? sql` group by ${sql.join(groupByList)}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
        if (setOperators.length > 0) {
          return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
      }
      buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
          throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
          return this.buildSetOperationQuery({ leftSelect, setOperator });
        }
        return this.buildSetOperations(
          this.buildSetOperationQuery({ leftSelect, setOperator }),
          rest
        );
      }
      buildSetOperationQuery({
        leftSelect,
        setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
      }) {
        const leftChunk = sql`${leftSelect.getSQL()} `;
        const rightChunk = sql`${rightSelect.getSQL()}`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          const orderByValues = [];
          for (const singleOrderBy of orderBy) {
            if (is(singleOrderBy, SQLiteColumn)) {
              orderByValues.push(sql.identifier(singleOrderBy.name));
            } else if (is(singleOrderBy, SQL)) {
              for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
                const chunk = singleOrderBy.queryChunks[i];
                if (is(chunk, SQLiteColumn)) {
                  singleOrderBy.queryChunks[i] = sql.identifier(this.casing.getColumnCasing(chunk));
                }
              }
              orderByValues.push(sql`${singleOrderBy}`);
            } else {
              orderByValues.push(sql`${singleOrderBy}`);
            }
          }
          orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)}`;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
        const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
      }
      buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns).filter(
          ([_, col]) => !col.shouldDisableInsert()
        );
        const insertOrder = colEntries.map(([, column]) => sql.identifier(this.casing.getColumnCasing(column)));
        if (select) {
          const select2 = valuesOrSelect;
          if (is(select2, SQL)) {
            valuesSqlList.push(select2);
          } else {
            valuesSqlList.push(select2.getSQL());
          }
        } else {
          const values = valuesOrSelect;
          valuesSqlList.push(sql.raw("values "));
          for (const [valueIndex, value] of values.entries()) {
            const valueList = [];
            for (const [fieldName, col] of colEntries) {
              const colValue = value[fieldName];
              if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
                let defaultValue;
                if (col.default !== null && col.default !== void 0) {
                  defaultValue = is(col.default, SQL) ? col.default : sql.param(col.default, col);
                } else if (col.defaultFn !== void 0) {
                  const defaultFnResult = col.defaultFn();
                  defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
                } else if (!col.default && col.onUpdateFn !== void 0) {
                  const onUpdateFnResult = col.onUpdateFn();
                  defaultValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
                } else {
                  defaultValue = sql`null`;
                }
                valueList.push(defaultValue);
              } else {
                valueList.push(colValue);
              }
            }
            valuesSqlList.push(valueList);
            if (valueIndex < values.length - 1) {
              valuesSqlList.push(sql`, `);
            }
          }
        }
        const withSql = this.buildWithCTE(withList);
        const valuesSql = sql.join(valuesSqlList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict?.length ? sql.join(onConflict) : void 0;
        return sql`${withSql}insert into ${table} ${insertOrder} ${valuesSql}${onConflictSql}${returningSql}`;
      }
      sqlToQuery(sql2, invokeSource) {
        return sql2.toQuery({
          casing: this.casing,
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString,
          invokeSource
        });
      }
      buildRelationalQuery({
        fullSchema,
        schema,
        tableNamesMap,
        table,
        tableConfig,
        queryConfig: config,
        tableAlias,
        nestedQueryRelation,
        joinOn
      }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key, value]) => ({
            dbKey: value.name,
            tsKey: key,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(
            Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)])
          );
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const {
            tsKey: selectedRelationTsKey,
            queryConfig: selectedRelationConfigValue,
            relation
          } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
            const relationTableName = getTableUniqueName(relation.referencedTable);
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(
              ...normalizedRelation.fields.map(
                (field2, i) => eq(
                  aliasedTableColumn(normalizedRelation.references[i], relationTableAlias),
                  aliasedTableColumn(field2, tableAlias)
                )
              )
            );
            const builtRelation = this.buildRelationalQuery({
              fullSchema,
              schema,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError({
            message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
          });
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql`json_array(${sql.join(
            selection.map(
              ({ field: field2 }) => is(field2, SQLiteColumn) ? sql.identifier(this.casing.getColumnCasing(field2)) : is(field2, SQL.Aliased) ? field2.sql : field2
            ),
            sql`, `
          )})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql`coalesce(json_group_array(${field}), json_array())`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: sql.raw("*")
                }
              ],
              where,
              limit,
              offset,
              orderBy,
              setOperators: []
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
    SQLiteSyncDialect = class extends SQLiteDialect {
      static [entityKind] = "SQLiteSyncDialect";
      migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        session.run(migrationTableCreate);
        const dbMigrations = session.values(
          sql`SELECT id, hash, created_at FROM ${sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        session.run(sql`BEGIN`);
        try {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                session.run(sql.raw(stmt));
              }
              session.run(
                sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
          session.run(sql`COMMIT`);
        } catch (e) {
          session.run(sql`ROLLBACK`);
          throw e;
        }
      }
    };
    SQLiteAsyncDialect = class extends SQLiteDialect {
      static [entityKind] = "SQLiteAsyncDialect";
      async migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        await session.run(migrationTableCreate);
        const dbMigrations = await session.values(
          sql`SELECT id, hash, created_at FROM ${sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        await session.transaction(async (tx) => {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.run(sql.raw(stmt));
              }
              await tx.run(
                sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
        });
      }
    };
  }
});

// node_modules/drizzle-orm/query-builders/query-builder.js
var TypedQueryBuilder;
var init_query_builder = __esm({
  "node_modules/drizzle-orm/query-builders/query-builder.js"() {
    init_entity();
    TypedQueryBuilder = class {
      static [entityKind] = "TypedQueryBuilder";
      /** @internal */
      getSelectedFields() {
        return this._.selectedFields;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/select.js
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
var SQLiteSelectBuilder, SQLiteSelectQueryBuilderBase, SQLiteSelectBase, getSQLiteSetOperators, union, unionAll, intersect, except;
var init_select2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/select.js"() {
    init_entity();
    init_query_builder();
    init_query_promise();
    init_selection_proxy();
    init_sql();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_utils2();
    init_view_base();
    SQLiteSelectBuilder = class {
      static [entityKind] = "SQLiteSelectBuilder";
      fields;
      session;
      dialect;
      withList;
      distinct;
      constructor(config) {
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        this.withList = config.withList;
        this.distinct = config.distinct;
      }
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(source, Subquery)) {
          fields = Object.fromEntries(
            Object.keys(source._.selectedFields).map((key) => [key, source[key]])
          );
        } else if (is(source, SQLiteViewBase)) {
          fields = source[ViewBaseConfig].selectedFields;
        } else if (is(source, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(source);
        }
        return new SQLiteSelectBase({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    };
    SQLiteSelectQueryBuilderBase = class extends TypedQueryBuilder {
      static [entityKind] = "SQLiteSelectQueryBuilder";
      _;
      /** @internal */
      config;
      joinsNotNullableMap;
      tableName;
      isPartialSelect;
      session;
      dialect;
      cacheConfig = void 0;
      usedTables = /* @__PURE__ */ new Set();
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct,
          setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields,
          config: this.config
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
        for (const item of extractUsedTable(table)) this.usedTables.add(item);
      }
      /** @internal */
      getUsedTables() {
        return [...this.usedTables];
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          for (const item of extractUsedTable(table)) this.usedTables.add(item);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table._.selectedFields : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(
              new Proxy(
                this.config.fields,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "cross":
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      /**
       * Executes a `left join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      leftJoin = this.createJoin("left");
      /**
       * Executes a `right join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      rightJoin = this.createJoin("right");
      /**
       * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
       *
       * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      innerJoin = this.createJoin("inner");
      /**
       * Executes a `full join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      fullJoin = this.createJoin("full");
      /**
       * Executes a `cross join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
       *
       * @param table the table to join.
       *
       * @example
       *
       * ```ts
       * // Select all users, each user with every pet
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .crossJoin(pets)
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .crossJoin(pets)
       * ```
       */
      crossJoin = this.createJoin("cross");
      createSetOperator(type, isAll) {
        return (rightSelection) => {
          const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
          if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
            throw new Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
            );
          }
          this.config.setOperators.push({ type, isAll, rightSelect });
          return this;
        };
      }
      /**
       * Adds `union` set operator to the query.
       *
       * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
       *
       * @example
       *
       * ```ts
       * // Select all unique names from customers and users tables
       * await db.select({ name: users.name })
       *   .from(users)
       *   .union(
       *     db.select({ name: customers.name }).from(customers)
       *   );
       * // or
       * import { union } from 'drizzle-orm/sqlite-core'
       *
       * await union(
       *   db.select({ name: users.name }).from(users),
       *   db.select({ name: customers.name }).from(customers)
       * );
       * ```
       */
      union = this.createSetOperator("union", false);
      /**
       * Adds `union all` set operator to the query.
       *
       * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
       *
       * @example
       *
       * ```ts
       * // Select all transaction ids from both online and in-store sales
       * await db.select({ transaction: onlineSales.transactionId })
       *   .from(onlineSales)
       *   .unionAll(
       *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       *   );
       * // or
       * import { unionAll } from 'drizzle-orm/sqlite-core'
       *
       * await unionAll(
       *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
       *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       * );
       * ```
       */
      unionAll = this.createSetOperator("union", true);
      /**
       * Adds `intersect` set operator to the query.
       *
       * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
       *
       * @example
       *
       * ```ts
       * // Select course names that are offered in both departments A and B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .intersect(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { intersect } from 'drizzle-orm/sqlite-core'
       *
       * await intersect(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      intersect = this.createSetOperator("intersect", false);
      /**
       * Adds `except` set operator to the query.
       *
       * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
       *
       * @example
       *
       * ```ts
       * // Select all courses offered in department A but not in department B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .except(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { except } from 'drizzle-orm/sqlite-core'
       *
       * await except(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      except = this.createSetOperator("except", false);
      /** @internal */
      addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
      }
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be selected.
       *
       * ```ts
       * // Select all cars with green color
       * await db.select().from(cars).where(eq(cars.color, 'green'));
       * // or
       * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Select all BMW cars with a green color
       * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Select all cars with the green or blue color
       * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        if (typeof where === "function") {
          where = where(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.where = where;
        return this;
      }
      /**
       * Adds a `having` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
       *
       * @param having the `having` clause.
       *
       * @example
       *
       * ```ts
       * // Select all brands with more than one car
       * await db.select({
       * 	brand: cars.brand,
       * 	count: sql<number>`cast(count(${cars.id}) as int)`,
       * })
       *   .from(cars)
       *   .groupBy(cars.brand)
       *   .having(({ count }) => gt(count, 1));
       * ```
       */
      having(having) {
        if (typeof having === "function") {
          having = having(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        } else {
          const orderByArray = columns;
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        }
        return this;
      }
      /**
       * Adds a `limit` clause to the query.
       *
       * Calling this method will set the maximum number of rows that will be returned by this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param limit the `limit` clause.
       *
       * @example
       *
       * ```ts
       * // Get the first 10 people from this query.
       * await db.select().from(people).limit(10);
       * ```
       */
      limit(limit) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).limit = limit;
        } else {
          this.config.limit = limit;
        }
        return this;
      }
      /**
       * Adds an `offset` clause to the query.
       *
       * Calling this method will skip a number of rows when returning results from this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param offset the `offset` clause.
       *
       * @example
       *
       * ```ts
       * // Get the 10th-20th people from this query.
       * await db.select().from(people).offset(10).limit(10);
       * ```
       */
      offset(offset) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).offset = offset;
        } else {
          this.config.offset = offset;
        }
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        const usedTables = [];
        usedTables.push(...extractUsedTable(this.config.table));
        if (this.config.joins) {
          for (const it of this.config.joins) usedTables.push(...extractUsedTable(it.table));
        }
        return new Proxy(
          new Subquery(this.getSQL(), this.config.fields, alias, false, [...new Set(usedTables)]),
          new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      /** @internal */
      getSelectedFields() {
        return new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      $dynamic() {
        return this;
      }
    };
    SQLiteSelectBase = class extends SQLiteSelectQueryBuilderBase {
      static [entityKind] = "SQLiteSelect";
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        if (!this.session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = orderSelectedFields(this.config.fields);
        const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          fieldsList,
          "all",
          true,
          void 0,
          {
            type: "select",
            tables: [...this.usedTables]
          },
          this.cacheConfig
        );
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
      $withCache(config) {
        this.cacheConfig = config === void 0 ? { config: {}, enable: true, autoInvalidate: true } : config === false ? { enable: false } : { enable: true, autoInvalidate: true, ...config };
        return this;
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.all();
      }
    };
    applyMixins(SQLiteSelectBase, [QueryPromise]);
    getSQLiteSetOperators = () => ({
      union,
      unionAll,
      intersect,
      except
    });
    union = createSetOperator("union", false);
    unionAll = createSetOperator("union", true);
    intersect = createSetOperator("intersect", false);
    except = createSetOperator("except", false);
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js
var QueryBuilder;
var init_query_builder2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js"() {
    init_entity();
    init_selection_proxy();
    init_dialect();
    init_subquery();
    init_select2();
    QueryBuilder = class {
      static [entityKind] = "SQLiteQueryBuilder";
      dialect;
      dialectConfig;
      constructor(dialect) {
        this.dialect = is(dialect, SQLiteDialect) ? dialect : void 0;
        this.dialectConfig = is(dialect, SQLiteDialect) ? void 0 : dialect;
      }
      $with = (alias, selection) => {
        const queryBuilder = this;
        const as = (qb) => {
          if (typeof qb === "function") {
            qb = qb(queryBuilder);
          }
          return new Proxy(
            new WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        };
        return { as };
      };
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: void 0, dialect: this.getDialect() });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new SQLiteSyncDialect(this.dialectConfig);
        }
        return this.dialect;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/insert.js
var SQLiteInsertBuilder, SQLiteInsertBase;
var init_insert = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/insert.js"() {
    init_entity();
    init_query_promise();
    init_sql();
    init_table3();
    init_table();
    init_utils();
    init_utils2();
    init_query_builder2();
    SQLiteInsertBuilder = class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      static [entityKind] = "SQLiteInsertBuilder";
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
      }
      select(selectQuery) {
        const select = typeof selectQuery === "function" ? selectQuery(new QueryBuilder()) : selectQuery;
        if (!is(select, SQL) && !haveSameKeys(this.table[Columns], select._.selectedFields)) {
          throw new Error(
            "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
          );
        }
        return new SQLiteInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
      }
    };
    SQLiteInsertBase = class extends QueryPromise {
      constructor(table, values, session, dialect, withList, select) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values, withList, select };
      }
      static [entityKind] = "SQLiteInsert";
      /** @internal */
      config;
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /**
       * Adds an `on conflict do nothing` clause to the query.
       *
       * Calling this method simply avoids inserting a row as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
       *
       * @param config The `target` and `where` clauses.
       *
       * @example
       * ```ts
       * // Insert one row and cancel the insert if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing();
       *
       * // Explicitly specify conflict target
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing({ target: cars.id });
       * ```
       */
      onConflictDoNothing(config = {}) {
        if (!this.config.onConflict) this.config.onConflict = [];
        if (config.target === void 0) {
          this.config.onConflict.push(sql` on conflict do nothing`);
        } else {
          const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
          const whereSql = config.where ? sql` where ${config.where}` : sql``;
          this.config.onConflict.push(sql` on conflict ${targetSql} do nothing${whereSql}`);
        }
        return this;
      }
      /**
       * Adds an `on conflict do update` clause to the query.
       *
       * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
       *
       * @param config The `target`, `set` and `where` clauses.
       *
       * @example
       * ```ts
       * // Update the row if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'Porsche' }
       *   });
       *
       * // Upsert with 'where' clause
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'newBMW' },
       *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
       *   });
       * ```
       */
      onConflictDoUpdate(config) {
        if (config.where && (config.targetWhere || config.setWhere)) {
          throw new Error(
            'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
          );
        }
        if (!this.config.onConflict) this.config.onConflict = [];
        const whereSql = config.where ? sql` where ${config.where}` : void 0;
        const targetWhereSql = config.targetWhere ? sql` where ${config.targetWhere}` : void 0;
        const setWhereSql = config.setWhere ? sql` where ${config.setWhere}` : void 0;
        const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
        this.config.onConflict.push(
          sql` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`
        );
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "insert",
            tables: extractUsedTable(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/select.types.js
var init_select_types = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/select.types.js"() {
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/update.js
var SQLiteUpdateBuilder, SQLiteUpdateBase;
var init_update = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/update.js"() {
    init_entity();
    init_query_promise();
    init_selection_proxy();
    init_table3();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_utils2();
    init_view_base();
    SQLiteUpdateBuilder = class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      static [entityKind] = "SQLiteUpdateBuilder";
      set(values) {
        return new SQLiteUpdateBase(
          this.table,
          mapUpdateSet(this.table, values),
          this.session,
          this.dialect,
          this.withList
        );
      }
    };
    SQLiteUpdateBase = class extends QueryPromise {
      constructor(table, set, session, dialect, withList) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table, withList, joins: [] };
      }
      static [entityKind] = "SQLiteUpdate";
      /** @internal */
      config;
      from(source) {
        this.config.from = source;
        return this;
      }
      createJoin(joinType) {
        return (table, on) => {
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (typeof on === "function") {
            const from = this.config.from ? is(table, SQLiteTable) ? table[Table.Symbol.Columns] : is(table, Subquery) ? table._.selectedFields : is(table, SQLiteViewBase) ? table[ViewBaseConfig].selectedFields : void 0 : void 0;
            on = on(
              new Proxy(
                this.config.table[Table.Symbol.Columns],
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              ),
              from && new Proxy(
                from,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          return this;
        };
      }
      leftJoin = this.createJoin("left");
      rightJoin = this.createJoin("right");
      innerJoin = this.createJoin("inner");
      fullJoin = this.createJoin("full");
      /**
       * Adds a 'where' clause to the query.
       *
       * Calling this method will update only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param where the 'where' clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be updated.
       *
       * ```ts
       * // Update all cars with green color
       * db.update(cars).set({ color: 'red' })
       *   .where(eq(cars.color, 'green'));
       * // or
       * db.update(cars).set({ color: 'red' })
       *   .where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Update all BMW cars with a green color
       * db.update(cars).set({ color: 'red' })
       *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Update all cars with the green or blue color
       * db.update(cars).set({ color: 'red' })
       *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.table[Table.Symbol.Columns],
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          this.config.orderBy = orderByArray;
        } else {
          const orderByArray = columns;
          this.config.orderBy = orderByArray;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "insert",
            tables: extractUsedTable(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/index.js
var init_query_builders = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/index.js"() {
    init_delete();
    init_insert();
    init_query_builder2();
    init_select2();
    init_select_types();
    init_update();
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/count.js
var SQLiteCountBuilder;
var init_count = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/count.js"() {
    init_entity();
    init_sql();
    SQLiteCountBuilder = class _SQLiteCountBuilder extends SQL {
      constructor(params) {
        super(_SQLiteCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
        this.params = params;
        this.session = params.session;
        this.sql = _SQLiteCountBuilder.buildCount(
          params.source,
          params.filters
        );
      }
      sql;
      static [entityKind] = "SQLiteCountBuilderAsync";
      [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
      session;
      static buildEmbeddedCount(source, filters) {
        return sql`(select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters})`;
      }
      static buildCount(source, filters) {
        return sql`select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters}`;
      }
      then(onfulfilled, onrejected) {
        return Promise.resolve(this.session.count(this.sql)).then(
          onfulfilled,
          onrejected
        );
      }
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/query.js
var RelationalQueryBuilder, SQLiteRelationalQuery, SQLiteSyncRelationalQuery;
var init_query = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/query.js"() {
    init_entity();
    init_query_promise();
    init_relations();
    RelationalQueryBuilder = class {
      constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
        this.mode = mode;
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      static [entityKind] = "SQLiteAsyncRelationalQueryBuilder";
      findMany(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        );
      }
      findFirst(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        );
      }
    };
    SQLiteRelationalQuery = class extends QueryPromise {
      constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
        super();
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
      }
      static [entityKind] = "SQLiteAsyncRelationalQuery";
      /** @internal */
      mode;
      /** @internal */
      getSQL() {
        return this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        }).sql;
      }
      /** @internal */
      _prepare(isOneTimeQuery = false) {
        const { query, builtQuery } = this._toSQL();
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          builtQuery,
          void 0,
          this.mode === "first" ? "get" : "all",
          true,
          (rawRows, mapColumnValue) => {
            const rows = rawRows.map(
              (row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
            );
            if (this.mode === "first") {
              return rows[0];
            }
            return rows;
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      _toSQL() {
        const query = this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      /** @internal */
      executeRaw() {
        if (this.mode === "first") {
          return this._prepare(false).get();
        }
        return this._prepare(false).all();
      }
      async execute() {
        return this.executeRaw();
      }
    };
    SQLiteSyncRelationalQuery = class extends SQLiteRelationalQuery {
      static [entityKind] = "SQLiteSyncRelationalQuery";
      sync() {
        return this.executeRaw();
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/raw.js
var SQLiteRaw;
var init_raw = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/raw.js"() {
    init_entity();
    init_query_promise();
    SQLiteRaw = class extends QueryPromise {
      constructor(execute, getSQL, action, dialect, mapBatchResult) {
        super();
        this.execute = execute;
        this.getSQL = getSQL;
        this.dialect = dialect;
        this.mapBatchResult = mapBatchResult;
        this.config = { action };
      }
      static [entityKind] = "SQLiteRaw";
      /** @internal */
      config;
      getQuery() {
        return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
      }
      mapResult(result, isFromBatch) {
        return isFromBatch ? this.mapBatchResult(result) : result;
      }
      _prepare() {
        return this;
      }
      /** @internal */
      isResponseInArrayMode() {
        return false;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/db.js
var BaseSQLiteDatabase;
var init_db = __esm({
  "node_modules/drizzle-orm/sqlite-core/db.js"() {
    init_entity();
    init_selection_proxy();
    init_sql();
    init_query_builders();
    init_subquery();
    init_count();
    init_query();
    init_raw();
    BaseSQLiteDatabase = class {
      constructor(resultKind, dialect, session, schema) {
        this.resultKind = resultKind;
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? {
          schema: schema.schema,
          fullSchema: schema.fullSchema,
          tableNamesMap: schema.tableNamesMap
        } : {
          schema: void 0,
          fullSchema: {},
          tableNamesMap: {}
        };
        this.query = {};
        const query = this.query;
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            query[tableName] = new RelationalQueryBuilder(
              resultKind,
              schema.fullSchema,
              this._.schema,
              this._.tableNamesMap,
              schema.fullSchema[tableName],
              columns,
              dialect,
              session
            );
          }
        }
        this.$cache = { invalidate: async (_params) => {
        } };
      }
      static [entityKind] = "BaseSQLiteDatabase";
      query;
      /**
       * Creates a subquery that defines a temporary named result set as a CTE.
       *
       * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param alias The alias for the subquery.
       *
       * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
       *
       * @example
       *
       * ```ts
       * // Create a subquery with alias 'sq' and use it in the select query
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * const result = await db.with(sq).select().from(sq);
       * ```
       *
       * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
       *
       * ```ts
       * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
       * const sq = db.$with('sq').as(db.select({
       *   name: sql<string>`upper(${users.name})`.as('name'),
       * })
       * .from(users));
       *
       * const result = await db.with(sq).select({ name: sq.name }).from(sq);
       * ```
       */
      $with = (alias, selection) => {
        const self = this;
        const as = (qb) => {
          if (typeof qb === "function") {
            qb = qb(new QueryBuilder(self.dialect));
          }
          return new Proxy(
            new WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        };
        return { as };
      };
      $count(source, filters) {
        return new SQLiteCountBuilder({ source, filters, session: this.session });
      }
      /**
       * Incorporates a previously defined CTE (using `$with`) into the main query.
       *
       * This method allows the main query to reference a temporary named result set.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param queries The CTEs to incorporate into the main query.
       *
       * @example
       *
       * ```ts
       * // Define a subquery 'sq' as a CTE using $with
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * // Incorporate the CTE 'sq' into the main query and select from it
       * const result = await db.with(sq).select().from(sq);
       * ```
       */
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        function update(table) {
          return new SQLiteUpdateBuilder(table, self.session, self.dialect, queries);
        }
        function insert(into) {
          return new SQLiteInsertBuilder(into, self.session, self.dialect, queries);
        }
        function delete_(from) {
          return new SQLiteDeleteBase(from, self.session, self.dialect, queries);
        }
        return { select, selectDistinct, update, insert, delete: delete_ };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: this.session, dialect: this.dialect });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      /**
       * Creates an update query.
       *
       * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
       *
       * Use `.set()` method to specify which values to update.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param table The table to update.
       *
       * @example
       *
       * ```ts
       * // Update all rows in the 'cars' table
       * await db.update(cars).set({ color: 'red' });
       *
       * // Update rows with filters and conditions
       * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
       *
       * // Update with returning clause
       * const updatedCar: Car[] = await db.update(cars)
       *   .set({ color: 'red' })
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      update(table) {
        return new SQLiteUpdateBuilder(table, this.session, this.dialect);
      }
      $cache;
      /**
       * Creates an insert query.
       *
       * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert}
       *
       * @param table The table to insert into.
       *
       * @example
       *
       * ```ts
       * // Insert one row
       * await db.insert(cars).values({ brand: 'BMW' });
       *
       * // Insert multiple rows
       * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
       *
       * // Insert with returning clause
       * const insertedCar: Car[] = await db.insert(cars)
       *   .values({ brand: 'BMW' })
       *   .returning();
       * ```
       */
      insert(into) {
        return new SQLiteInsertBuilder(into, this.session, this.dialect);
      }
      /**
       * Creates a delete query.
       *
       * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param table The table to delete from.
       *
       * @example
       *
       * ```ts
       * // Delete all rows in the 'cars' table
       * await db.delete(cars);
       *
       * // Delete rows with filters and conditions
       * await db.delete(cars).where(eq(cars.color, 'green'));
       *
       * // Delete with returning clause
       * const deletedCar: Car[] = await db.delete(cars)
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      delete(from) {
        return new SQLiteDeleteBase(from, this.session, this.dialect);
      }
      run(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.run(sequel),
            () => sequel,
            "run",
            this.dialect,
            this.session.extractRawRunValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.run(sequel);
      }
      all(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.all(sequel),
            () => sequel,
            "all",
            this.dialect,
            this.session.extractRawAllValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.all(sequel);
      }
      get(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.get(sequel),
            () => sequel,
            "get",
            this.dialect,
            this.session.extractRawGetValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.get(sequel);
      }
      values(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.values(sequel),
            () => sequel,
            "values",
            this.dialect,
            this.session.extractRawValuesValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.values(sequel);
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    };
  }
});

// node_modules/drizzle-orm/cache/core/cache.js
async function hashQuery(sql2, params) {
  const dataToHash = `${sql2}-${JSON.stringify(params)}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToHash);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = [...new Uint8Array(hashBuffer)];
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
var Cache, NoopCache;
var init_cache = __esm({
  "node_modules/drizzle-orm/cache/core/cache.js"() {
    init_entity();
    Cache = class {
      static [entityKind] = "Cache";
    };
    NoopCache = class extends Cache {
      strategy() {
        return "all";
      }
      static [entityKind] = "NoopCache";
      async get(_key) {
        return void 0;
      }
      async put(_hashedQuery, _response, _tables, _config) {
      }
      async onMutate(_params) {
      }
    };
  }
});

// node_modules/drizzle-orm/cache/core/index.js
var init_core = __esm({
  "node_modules/drizzle-orm/cache/core/index.js"() {
    init_cache();
  }
});

// node_modules/drizzle-orm/sqlite-core/alias.js
var init_alias2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/alias.js"() {
  }
});

// node_modules/drizzle-orm/errors/index.js
var DrizzleQueryError;
var init_errors2 = __esm({
  "node_modules/drizzle-orm/errors/index.js"() {
    DrizzleQueryError = class _DrizzleQueryError extends Error {
      constructor(query, params, cause) {
        super(`Failed query: ${query}
params: ${params}`);
        this.query = query;
        this.params = params;
        this.cause = cause;
        Error.captureStackTrace(this, _DrizzleQueryError);
        if (cause) this.cause = cause;
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/session.js
var ExecuteResultSync, SQLitePreparedQuery, SQLiteSession, SQLiteTransaction;
var init_session = __esm({
  "node_modules/drizzle-orm/sqlite-core/session.js"() {
    init_cache();
    init_entity();
    init_errors();
    init_errors2();
    init_query_promise();
    init_db();
    ExecuteResultSync = class extends QueryPromise {
      constructor(resultCb) {
        super();
        this.resultCb = resultCb;
      }
      static [entityKind] = "ExecuteResultSync";
      async execute() {
        return this.resultCb();
      }
      sync() {
        return this.resultCb();
      }
    };
    SQLitePreparedQuery = class {
      constructor(mode, executeMethod, query, cache, queryMetadata, cacheConfig) {
        this.mode = mode;
        this.executeMethod = executeMethod;
        this.query = query;
        this.cache = cache;
        this.queryMetadata = queryMetadata;
        this.cacheConfig = cacheConfig;
        if (cache && cache.strategy() === "all" && cacheConfig === void 0) {
          this.cacheConfig = { enable: true, autoInvalidate: true };
        }
        if (!this.cacheConfig?.enable) {
          this.cacheConfig = void 0;
        }
      }
      static [entityKind] = "PreparedQuery";
      /** @internal */
      joinsNotNullableMap;
      /** @internal */
      async queryWithCache(queryString, params, query) {
        if (this.cache === void 0 || is(this.cache, NoopCache) || this.queryMetadata === void 0) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.cacheConfig && !this.cacheConfig.enable) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) {
          try {
            const [res] = await Promise.all([
              query(),
              this.cache.onMutate({ tables: this.queryMetadata.tables })
            ]);
            return res;
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (!this.cacheConfig) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.queryMetadata.type === "select") {
          const fromCache = await this.cache.get(
            this.cacheConfig.tag ?? await hashQuery(queryString, params),
            this.queryMetadata.tables,
            this.cacheConfig.tag !== void 0,
            this.cacheConfig.autoInvalidate
          );
          if (fromCache === void 0) {
            let result;
            try {
              result = await query();
            } catch (e) {
              throw new DrizzleQueryError(queryString, params, e);
            }
            await this.cache.put(
              this.cacheConfig.tag ?? await hashQuery(queryString, params),
              result,
              // make sure we send tables that were used in a query only if user wants to invalidate it on each write
              this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [],
              this.cacheConfig.tag !== void 0,
              this.cacheConfig.config
            );
            return result;
          }
          return fromCache;
        }
        try {
          return await query();
        } catch (e) {
          throw new DrizzleQueryError(queryString, params, e);
        }
      }
      getQuery() {
        return this.query;
      }
      mapRunResult(result, _isFromBatch) {
        return result;
      }
      mapAllResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      mapGetResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      execute(placeholderValues) {
        if (this.mode === "async") {
          return this[this.executeMethod](placeholderValues);
        }
        return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
      }
      mapResult(response, isFromBatch) {
        switch (this.executeMethod) {
          case "run": {
            return this.mapRunResult(response, isFromBatch);
          }
          case "all": {
            return this.mapAllResult(response, isFromBatch);
          }
          case "get": {
            return this.mapGetResult(response, isFromBatch);
          }
        }
      }
    };
    SQLiteSession = class {
      constructor(dialect) {
        this.dialect = dialect;
      }
      static [entityKind] = "SQLiteSession";
      prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        return this.prepareQuery(
          query,
          fields,
          executeMethod,
          isResponseInArrayMode,
          customResultMapper,
          queryMetadata,
          cacheConfig
        );
      }
      run(query) {
        const staticQuery = this.dialect.sqlToQuery(query);
        try {
          return this.prepareOneTimeQuery(staticQuery, void 0, "run", false).run();
        } catch (err) {
          throw new DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
        }
      }
      /** @internal */
      extractRawRunValueFromBatchResult(result) {
        return result;
      }
      all(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).all();
      }
      /** @internal */
      extractRawAllValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      get(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).get();
      }
      /** @internal */
      extractRawGetValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      values(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).values();
      }
      async count(sql2) {
        const result = await this.values(sql2);
        return result[0][0];
      }
      /** @internal */
      extractRawValuesValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
    };
    SQLiteTransaction = class extends BaseSQLiteDatabase {
      constructor(resultType, dialect, session, schema, nestedIndex = 0) {
        super(resultType, dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
      }
      static [entityKind] = "SQLiteTransaction";
      rollback() {
        throw new TransactionRollbackError();
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/subquery.js
var init_subquery2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/subquery.js"() {
  }
});

// node_modules/drizzle-orm/sqlite-core/view.js
var ViewBuilderCore, ViewBuilder, ManualViewBuilder, SQLiteView;
var init_view = __esm({
  "node_modules/drizzle-orm/sqlite-core/view.js"() {
    init_entity();
    init_selection_proxy();
    init_utils();
    init_query_builder2();
    init_table3();
    init_view_base();
    ViewBuilderCore = class {
      constructor(name) {
        this.name = name;
      }
      static [entityKind] = "SQLiteViewBuilderCore";
      config = {};
    };
    ViewBuilder = class extends ViewBuilderCore {
      static [entityKind] = "SQLiteViewBuilder";
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelectedFields = qb.getSelectedFields();
        return new Proxy(
          new SQLiteView({
            // sqliteConfig: this.config,
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: aliasedSelectedFields,
              query: qb.getSQL().inlineParams()
            }
          }),
          selectionProxy
        );
      }
    };
    ManualViewBuilder = class extends ViewBuilderCore {
      static [entityKind] = "SQLiteManualViewBuilder";
      columns;
      constructor(name, columns) {
        super(name);
        this.columns = getTableColumns(sqliteTable(name, columns));
      }
      existing() {
        return new Proxy(
          new SQLiteView({
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: void 0
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
      as(query) {
        return new Proxy(
          new SQLiteView({
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: query.inlineParams()
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
    };
    SQLiteView = class extends SQLiteViewBase {
      static [entityKind] = "SQLiteView";
      constructor({ config }) {
        super(config);
      }
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/index.js
var init_sqlite_core = __esm({
  "node_modules/drizzle-orm/sqlite-core/index.js"() {
    init_alias2();
    init_checks();
    init_columns();
    init_db();
    init_dialect();
    init_foreign_keys2();
    init_indexes();
    init_primary_keys2();
    init_query_builders();
    init_session();
    init_subquery2();
    init_table3();
    init_unique_constraint2();
    init_utils2();
    init_view();
  }
});

// node_modules/drizzle-orm/better-sqlite3/session.js
var BetterSQLiteSession, BetterSQLiteTransaction, PreparedQuery;
var init_session2 = __esm({
  "node_modules/drizzle-orm/better-sqlite3/session.js"() {
    init_core();
    init_entity();
    init_logger();
    init_sql();
    init_sqlite_core();
    init_session();
    init_utils();
    BetterSQLiteSession = class extends SQLiteSession {
      constructor(client, dialect, schema, options = {}) {
        super(dialect);
        this.client = client;
        this.schema = schema;
        this.logger = options.logger ?? new NoopLogger();
        this.cache = options.cache ?? new NoopCache();
      }
      static [entityKind] = "BetterSQLiteSession";
      logger;
      cache;
      prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        const stmt = this.client.prepare(query.sql);
        return new PreparedQuery(
          stmt,
          query,
          this.logger,
          this.cache,
          queryMetadata,
          cacheConfig,
          fields,
          executeMethod,
          isResponseInArrayMode,
          customResultMapper
        );
      }
      transaction(transaction, config = {}) {
        const tx = new BetterSQLiteTransaction("sync", this.dialect, this, this.schema);
        const nativeTx = this.client.transaction(transaction);
        return nativeTx[config.behavior ?? "deferred"](tx);
      }
    };
    BetterSQLiteTransaction = class _BetterSQLiteTransaction extends SQLiteTransaction {
      static [entityKind] = "BetterSQLiteTransaction";
      transaction(transaction) {
        const savepointName = `sp${this.nestedIndex}`;
        const tx = new _BetterSQLiteTransaction("sync", this.dialect, this.session, this.schema, this.nestedIndex + 1);
        this.session.run(sql.raw(`savepoint ${savepointName}`));
        try {
          const result = transaction(tx);
          this.session.run(sql.raw(`release savepoint ${savepointName}`));
          return result;
        } catch (err) {
          this.session.run(sql.raw(`rollback to savepoint ${savepointName}`));
          throw err;
        }
      }
    };
    PreparedQuery = class extends SQLitePreparedQuery {
      constructor(stmt, query, logger, cache, queryMetadata, cacheConfig, fields, executeMethod, _isResponseInArrayMode, customResultMapper) {
        super("sync", executeMethod, query, cache, queryMetadata, cacheConfig);
        this.stmt = stmt;
        this.logger = logger;
        this.fields = fields;
        this._isResponseInArrayMode = _isResponseInArrayMode;
        this.customResultMapper = customResultMapper;
      }
      static [entityKind] = "BetterSQLitePreparedQuery";
      run(placeholderValues) {
        const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        return this.stmt.run(...params);
      }
      all(placeholderValues) {
        const { fields, joinsNotNullableMap, query, logger, stmt, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          const params = fillPlaceholders(query.params, placeholderValues ?? {});
          logger.logQuery(query.sql, params);
          return stmt.all(...params);
        }
        const rows = this.values(placeholderValues);
        if (customResultMapper) {
          return customResultMapper(rows);
        }
        return rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
      }
      get(placeholderValues) {
        const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        const { fields, stmt, joinsNotNullableMap, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          return stmt.get(...params);
        }
        const row = stmt.raw().get(...params);
        if (!row) {
          return void 0;
        }
        if (customResultMapper) {
          return customResultMapper([row]);
        }
        return mapResultRow(fields, row, joinsNotNullableMap);
      }
      values(placeholderValues) {
        const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        return this.stmt.raw().all(...params);
      }
      /** @internal */
      isResponseInArrayMode() {
        return this._isResponseInArrayMode;
      }
    };
  }
});

// node_modules/drizzle-orm/better-sqlite3/driver.js
function construct(client, config = {}) {
  const dialect = new SQLiteSyncDialect({ casing: config.casing });
  let logger;
  if (config.logger === true) {
    logger = new DefaultLogger();
  } else if (config.logger !== false) {
    logger = config.logger;
  }
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(
      config.schema,
      createTableRelationsHelpers
    );
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const session = new BetterSQLiteSession(client, dialect, schema, { logger });
  const db = new BetterSQLite3Database("sync", dialect, session, schema);
  db.$client = client;
  return db;
}
function drizzle(...params) {
  if (params[0] === void 0 || typeof params[0] === "string") {
    const instance = params[0] === void 0 ? new import_better_sqlite3.default() : new import_better_sqlite3.default(params[0]);
    return construct(instance, params[1]);
  }
  if (isConfig(params[0])) {
    const { connection, client, ...drizzleConfig } = params[0];
    if (client) return construct(client, drizzleConfig);
    if (typeof connection === "object") {
      const { source, ...options } = connection;
      const instance2 = new import_better_sqlite3.default(source, options);
      return construct(instance2, drizzleConfig);
    }
    const instance = new import_better_sqlite3.default(connection);
    return construct(instance, drizzleConfig);
  }
  return construct(params[0], params[1]);
}
var import_better_sqlite3, BetterSQLite3Database;
var init_driver = __esm({
  "node_modules/drizzle-orm/better-sqlite3/driver.js"() {
    import_better_sqlite3 = __toESM(require_lib(), 1);
    init_entity();
    init_logger();
    init_relations();
    init_db();
    init_dialect();
    init_utils();
    init_session2();
    BetterSQLite3Database = class extends BaseSQLiteDatabase {
      static [entityKind] = "BetterSQLite3Database";
    };
    ((drizzle2) => {
      function mock(config) {
        return construct({}, config);
      }
      drizzle2.mock = mock;
    })(drizzle || (drizzle = {}));
  }
});

// node_modules/drizzle-orm/better-sqlite3/index.js
var init_better_sqlite3 = __esm({
  "node_modules/drizzle-orm/better-sqlite3/index.js"() {
    init_driver();
    init_session2();
  }
});

// node_modules/batch-cluster/dist/Deferred.js
var require_Deferred = __commonJS({
  "node_modules/batch-cluster/dist/Deferred.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Deferred_resolve;
    var _Deferred_reject;
    var _Deferred_state;
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Deferred = void 0;
    var State;
    (function(State2) {
      State2[State2["pending"] = 0] = "pending";
      State2[State2["fulfilled"] = 1] = "fulfilled";
      State2[State2["rejected"] = 2] = "rejected";
    })(State || (State = {}));
    var Deferred = class {
      constructor() {
        this[_a] = "Deferred";
        _Deferred_resolve.set(this, void 0);
        _Deferred_reject.set(this, void 0);
        _Deferred_state.set(this, State.pending);
        this.promise = new Promise((resolve, reject) => {
          __classPrivateFieldSet(this, _Deferred_resolve, resolve, "f");
          __classPrivateFieldSet(this, _Deferred_reject, reject, "f");
        });
      }
      /**
       * @return `true` iff neither `resolve` nor `rejected` have been invoked
       */
      get pending() {
        return __classPrivateFieldGet(this, _Deferred_state, "f") === State.pending;
      }
      /**
       * @return `true` iff `resolve` has been invoked
       */
      get fulfilled() {
        return __classPrivateFieldGet(this, _Deferred_state, "f") === State.fulfilled;
      }
      /**
       * @return `true` iff `rejected` has been invoked
       */
      get rejected() {
        return __classPrivateFieldGet(this, _Deferred_state, "f") === State.rejected;
      }
      /**
       * @return `true` iff `resolve` or `rejected` have been invoked
       */
      get settled() {
        return __classPrivateFieldGet(this, _Deferred_state, "f") !== State.pending;
      }
      then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.promise.catch(onrejected);
      }
      resolve(value) {
        if (this.settled) {
          return false;
        } else {
          __classPrivateFieldSet(this, _Deferred_state, State.fulfilled, "f");
          __classPrivateFieldGet(this, _Deferred_resolve, "f").call(this, value);
          return true;
        }
      }
      reject(reason) {
        const wasSettled = this.settled;
        __classPrivateFieldSet(this, _Deferred_state, State.rejected, "f");
        if (wasSettled) {
          return false;
        } else {
          __classPrivateFieldGet(this, _Deferred_reject, "f").call(this, reason);
          return true;
        }
      }
      observe(p) {
        void observe(this, p);
        return this;
      }
      observeQuietly(p) {
        void observeQuietly(this, p);
        return this;
      }
    };
    exports2.Deferred = Deferred;
    _Deferred_resolve = /* @__PURE__ */ new WeakMap(), _Deferred_reject = /* @__PURE__ */ new WeakMap(), _Deferred_state = /* @__PURE__ */ new WeakMap(), _a = Symbol.toStringTag;
    async function observe(d, p) {
      try {
        d.resolve(await p);
      } catch (err) {
        d.reject(err instanceof Error ? err : new Error(String(err)));
      }
    }
    async function observeQuietly(d, p) {
      try {
        d.resolve(await p);
      } catch {
        d.resolve(void 0);
      }
    }
  }
});

// node_modules/batch-cluster/dist/Object.js
var require_Object = __commonJS({
  "node_modules/batch-cluster/dist/Object.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.map = map;
    exports2.isFunction = isFunction;
    exports2.fromEntries = fromEntries;
    exports2.omit = omit;
    function map(obj, f) {
      return obj != null ? f(obj) : void 0;
    }
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function fromEntries(arr) {
      const o = {};
      for (const [key, value] of arr) {
        if (key != null) {
          o[key] = value;
        }
      }
      return o;
    }
    function omit(t, ...keysToOmit) {
      const result = { ...t };
      for (const ea of keysToOmit) {
        delete result[ea];
      }
      return result;
    }
  }
});

// node_modules/batch-cluster/dist/String.js
var require_String = __commonJS({
  "node_modules/batch-cluster/dist/String.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.blank = blank;
    exports2.notBlank = notBlank;
    exports2.toNotBlank = toNotBlank;
    exports2.ensureSuffix = ensureSuffix;
    exports2.toS = toS;
    function blank(s) {
      return s == null || toS(s).trim().length === 0;
    }
    function notBlank(s) {
      return !blank(s);
    }
    function toNotBlank(s) {
      const result = toS(s).trim();
      return result.length === 0 ? void 0 : result;
    }
    function ensureSuffix(s, suffix) {
      return s.endsWith(suffix) ? s : s + suffix;
    }
    function toS(s) {
      return s == null ? "" : s.toString();
    }
  }
});

// node_modules/batch-cluster/dist/Logger.js
var require_Logger = __commonJS({
  "node_modules/batch-cluster/dist/Logger.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Log = exports2.NoLogger = exports2.ConsoleLogger = exports2.LogLevels = void 0;
    exports2.setLogger = setLogger;
    exports2.logger = logger;
    var node_util_1 = __importDefault(require("node:util"));
    var Object_1 = require_Object();
    var String_1 = require_String();
    exports2.LogLevels = [
      "trace",
      "debug",
      "info",
      "warn",
      "error"
    ];
    var _debuglog = node_util_1.default.debuglog("batch-cluster");
    var noop = () => void 0;
    exports2.ConsoleLogger = Object.freeze({
      /**
       * No-ops by default, as this is very low-level information.
       */
      trace: noop,
      /**
       * Delegates to `util.debuglog("batch-cluster")`:
       * <https://nodejs.org/api/util.html#util_util_debuglog_section>
       */
      debug: _debuglog,
      /**
       * Delegates to `util.debuglog("batch-cluster")`:
       * <https://nodejs.org/api/util.html#util_util_debuglog_section>
       */
      info: _debuglog,
      /**
       * Delegates to `console.warn`
       */
      warn: (...args) => {
        console.warn(...args);
      },
      /**
       * Delegates to `console.error`
       */
      error: (...args) => {
        console.error(...args);
      }
    });
    exports2.NoLogger = Object.freeze({
      trace: noop,
      debug: noop,
      info: noop,
      warn: noop,
      error: noop
    });
    var _logger = _debuglog.enabled ? exports2.ConsoleLogger : exports2.NoLogger;
    function setLogger(l) {
      if (exports2.LogLevels.some((ea) => typeof l[ea] !== "function")) {
        throw new Error("invalid logger, must implement " + exports2.LogLevels.join(", "));
      }
      _logger = l;
    }
    function logger() {
      return _logger;
    }
    exports2.Log = {
      withLevels: (delegate) => {
        const timestamped = {};
        exports2.LogLevels.forEach((ea) => {
          const prefix = (ea + " ").substring(0, 5) + " | ";
          timestamped[ea] = (message, ...optionalParams) => {
            if ((0, String_1.notBlank)(String(message))) {
              delegate[ea](prefix + String(message), ...optionalParams);
            }
          };
        });
        return timestamped;
      },
      withTimestamps: (delegate) => {
        const timestamped = {};
        exports2.LogLevels.forEach((level) => timestamped[level] = (message, ...optionalParams) => (0, Object_1.map)(message, (ea) => delegate[level]((/* @__PURE__ */ new Date()).toISOString() + " | " + String(ea), ...optionalParams)));
        return timestamped;
      },
      filterLevels: (l, minLogLevel) => {
        const minLogLevelIndex = exports2.LogLevels.indexOf(minLogLevel);
        const filtered = {};
        exports2.LogLevels.forEach((ea, idx) => filtered[ea] = idx < minLogLevelIndex ? noop : l[ea].bind(l));
        return filtered;
      }
    };
  }
});

// node_modules/batch-cluster/dist/Platform.js
var require_Platform = __commonJS({
  "node_modules/batch-cluster/dist/Platform.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isLinux = exports2.isMac = exports2.isWin = void 0;
    var node_os_1 = __importDefault(require("node:os"));
    var _platform = node_os_1.default.platform();
    exports2.isWin = ["win32", "cygwin"].includes(_platform);
    exports2.isMac = _platform === "darwin";
    exports2.isLinux = _platform === "linux";
  }
});

// node_modules/batch-cluster/dist/BatchClusterOptions.js
var require_BatchClusterOptions = __commonJS({
  "node_modules/batch-cluster/dist/BatchClusterOptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchClusterOptions = exports2.minuteMs = exports2.secondMs = void 0;
    var Logger_1 = require_Logger();
    var Platform_1 = require_Platform();
    exports2.secondMs = 1e3;
    exports2.minuteMs = 60 * exports2.secondMs;
    var BatchClusterOptions = class {
      constructor() {
        this.maxProcs = 1;
        this.maxProcAgeMillis = 5 * exports2.minuteMs;
        this.onIdleIntervalMillis = 10 * exports2.secondMs;
        this.maxReasonableProcessFailuresPerMinute = 10;
        this.spawnTimeoutMillis = 15 * exports2.secondMs;
        this.minDelayBetweenSpawnMillis = 1.5 * exports2.secondMs;
        this.taskTimeoutMillis = 10 * exports2.secondMs;
        this.maxTasksPerProcess = 500;
        this.endGracefulWaitTimeMillis = 500;
        this.streamFlushMillis = Platform_1.isMac ? 100 : Platform_1.isWin ? 200 : 30;
        this.cleanupChildProcs = true;
        this.maxIdleMsPerProcess = 0;
        this.maxFailedTasksPerProcess = 2;
        this.healthCheckIntervalMillis = 0;
        this.pidCheckIntervalMillis = 2 * exports2.minuteMs;
        this.logger = Logger_1.logger;
      }
    };
    exports2.BatchClusterOptions = BatchClusterOptions;
  }
});

// node_modules/batch-cluster/dist/OptionsVerifier.js
var require_OptionsVerifier = __commonJS({
  "node_modules/batch-cluster/dist/OptionsVerifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.verifyOptions = verifyOptions;
    var BatchClusterOptions_1 = require_BatchClusterOptions();
    var String_1 = require_String();
    function verifyOptions(opts) {
      const result = {
        ...new BatchClusterOptions_1.BatchClusterOptions(),
        ...opts,
        passRE: toRe(opts.pass),
        failRE: toRe(opts.fail)
      };
      const errors = [];
      function notBlank(fieldName) {
        const v = (0, String_1.toS)(result[fieldName]);
        if ((0, String_1.blank)(v)) {
          errors.push(fieldName + " must not be blank");
        }
      }
      function gte2(fieldName, value, why) {
        const v = result[fieldName];
        if (v < value) {
          const msg = `${fieldName} must be greater than or equal to ${value}${(0, String_1.blank)(why) ? "" : ": " + why}`;
          errors.push(msg);
        }
      }
      notBlank("versionCommand");
      notBlank("pass");
      notBlank("fail");
      gte2("maxTasksPerProcess", 1);
      gte2("maxProcs", 1);
      if (opts.maxProcAgeMillis != null && opts.maxProcAgeMillis > 0 && result.taskTimeoutMillis) {
        gte2("maxProcAgeMillis", Math.max(result.spawnTimeoutMillis, result.taskTimeoutMillis), `the max value of spawnTimeoutMillis (${result.spawnTimeoutMillis}) and taskTimeoutMillis (${result.taskTimeoutMillis})`);
      }
      gte2("minDelayBetweenSpawnMillis", 0);
      gte2("onIdleIntervalMillis", 0);
      gte2("endGracefulWaitTimeMillis", 0);
      gte2("maxReasonableProcessFailuresPerMinute", 0);
      gte2("streamFlushMillis", 0);
      if (errors.length > 0) {
        throw new Error("BatchCluster was given invalid options: " + errors.join("; "));
      }
      return result;
    }
    function escapeRegExp(s) {
      return (0, String_1.toS)(s).replace(/[-.,\\^$*+?()|[\]{}]/g, "\\$&");
    }
    function toRe(s) {
      return s instanceof RegExp ? s : (0, String_1.blank)(s) ? /$./ : s.includes("*") ? new RegExp(s.split("*").map((ea) => escapeRegExp(ea)).join(".*")) : new RegExp(escapeRegExp(s));
    }
  }
});

// node_modules/batch-cluster/dist/Mean.js
var require_Mean = __commonJS({
  "node_modules/batch-cluster/dist/Mean.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Mean = void 0;
    var Mean = class _Mean {
      constructor(n = 0, sum = 0) {
        this.sum = sum;
        this._min = void 0;
        this._max = void 0;
        this._n = n;
      }
      push(x) {
        this._n++;
        this.sum += x;
        this._min = this._min == null || this._min > x ? x : this._min;
        this._max = this._max == null || this._max < x ? x : this._max;
      }
      get n() {
        return this._n;
      }
      get min() {
        return this._min;
      }
      get max() {
        return this._max;
      }
      get mean() {
        return this.sum / this.n;
      }
      clone() {
        return new _Mean(this.n, this.sum);
      }
    };
    exports2.Mean = Mean;
  }
});

// node_modules/batch-cluster/dist/Rate.js
var require_Rate = __commonJS({
  "node_modules/batch-cluster/dist/Rate.js"(exports2) {
    "use strict";
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _Rate_instances;
    var _Rate_start;
    var _Rate_priorEventTimestamps;
    var _Rate_lastEventTs;
    var _Rate_eventCount;
    var _Rate_vacuum;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Rate = void 0;
    var BatchClusterOptions_1 = require_BatchClusterOptions();
    var Rate = class {
      /**
       * @param periodMs the length of time to retain event timestamps for computing
       * rate. Events older than this value will be discarded.
       * @param warmupMs return `null` from {@link Rate#msPerEvent} if it's been less
       * than `warmupMs` since construction or {@link Rate#clear}.
       */
      constructor(periodMs = BatchClusterOptions_1.minuteMs, warmupMs = BatchClusterOptions_1.secondMs) {
        _Rate_instances.add(this);
        this.periodMs = periodMs;
        this.warmupMs = warmupMs;
        _Rate_start.set(this, Date.now());
        _Rate_priorEventTimestamps.set(this, []);
        _Rate_lastEventTs.set(this, null);
        _Rate_eventCount.set(
          this,
          0
          /**
           * @param periodMs the length of time to retain event timestamps for computing
           * rate. Events older than this value will be discarded.
           * @param warmupMs return `null` from {@link Rate#msPerEvent} if it's been less
           * than `warmupMs` since construction or {@link Rate#clear}.
           */
        );
      }
      onEvent() {
        var _a;
        __classPrivateFieldSet(this, _Rate_eventCount, (_a = __classPrivateFieldGet(this, _Rate_eventCount, "f"), _a++, _a), "f");
        const now = Date.now();
        __classPrivateFieldGet(this, _Rate_priorEventTimestamps, "f").push(now);
        __classPrivateFieldSet(this, _Rate_lastEventTs, now, "f");
      }
      get eventCount() {
        return __classPrivateFieldGet(this, _Rate_eventCount, "f");
      }
      get msSinceLastEvent() {
        return __classPrivateFieldGet(this, _Rate_lastEventTs, "f") == null ? null : Date.now() - __classPrivateFieldGet(this, _Rate_lastEventTs, "f");
      }
      get msPerEvent() {
        const msSinceStart = Date.now() - __classPrivateFieldGet(this, _Rate_start, "f");
        if (__classPrivateFieldGet(this, _Rate_lastEventTs, "f") == null || msSinceStart < this.warmupMs)
          return null;
        __classPrivateFieldGet(this, _Rate_instances, "m", _Rate_vacuum).call(this);
        const events = __classPrivateFieldGet(this, _Rate_priorEventTimestamps, "f").length;
        return events === 0 ? null : Math.min(this.periodMs, msSinceStart) / events;
      }
      get eventsPerMs() {
        const mpe = this.msPerEvent;
        return mpe == null ? 0 : mpe < 1 ? 1 : 1 / mpe;
      }
      get eventsPerSecond() {
        return this.eventsPerMs * BatchClusterOptions_1.secondMs;
      }
      get eventsPerMinute() {
        return this.eventsPerMs * BatchClusterOptions_1.minuteMs;
      }
      clear() {
        __classPrivateFieldSet(this, _Rate_start, Date.now(), "f");
        __classPrivateFieldGet(this, _Rate_priorEventTimestamps, "f").length = 0;
        __classPrivateFieldSet(this, _Rate_lastEventTs, null, "f");
        __classPrivateFieldSet(this, _Rate_eventCount, 0, "f");
        return this;
      }
    };
    exports2.Rate = Rate;
    _Rate_start = /* @__PURE__ */ new WeakMap(), _Rate_priorEventTimestamps = /* @__PURE__ */ new WeakMap(), _Rate_lastEventTs = /* @__PURE__ */ new WeakMap(), _Rate_eventCount = /* @__PURE__ */ new WeakMap(), _Rate_instances = /* @__PURE__ */ new WeakSet(), _Rate_vacuum = function _Rate_vacuum2() {
      const expired = Date.now() - this.periodMs;
      const firstValidIndex = __classPrivateFieldGet(this, _Rate_priorEventTimestamps, "f").findIndex((ea) => ea > expired);
      if (firstValidIndex === -1)
        __classPrivateFieldGet(this, _Rate_priorEventTimestamps, "f").length = 0;
      else if (firstValidIndex > 0) {
        __classPrivateFieldGet(this, _Rate_priorEventTimestamps, "f").splice(0, firstValidIndex);
      }
    };
  }
});

// node_modules/batch-cluster/dist/BatchClusterEventCoordinator.js
var require_BatchClusterEventCoordinator = __commonJS({
  "node_modules/batch-cluster/dist/BatchClusterEventCoordinator.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _BatchClusterEventCoordinator_instances;
    var _BatchClusterEventCoordinator_logger;
    var _BatchClusterEventCoordinator_tasksPerProc;
    var _BatchClusterEventCoordinator_startErrorRate;
    var _BatchClusterEventCoordinator_childEndCounts;
    var _BatchClusterEventCoordinator_internalErrorCount;
    var _BatchClusterEventCoordinator_setupEventHandlers;
    var _BatchClusterEventCoordinator_handleChildEnd;
    var _BatchClusterEventCoordinator_handleInternalError;
    var _BatchClusterEventCoordinator_handleNoTaskData;
    var _BatchClusterEventCoordinator_handleStartError;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchClusterEventCoordinator = void 0;
    var Mean_1 = require_Mean();
    var Rate_1 = require_Rate();
    var String_1 = require_String();
    var BatchClusterEventCoordinator = class {
      constructor(emitter, options, onIdleLater, endCluster) {
        _BatchClusterEventCoordinator_instances.add(this);
        this.emitter = emitter;
        this.options = options;
        this.onIdleLater = onIdleLater;
        this.endCluster = endCluster;
        _BatchClusterEventCoordinator_logger.set(this, void 0);
        _BatchClusterEventCoordinator_tasksPerProc.set(this, new Mean_1.Mean());
        _BatchClusterEventCoordinator_startErrorRate.set(this, new Rate_1.Rate());
        _BatchClusterEventCoordinator_childEndCounts.set(this, /* @__PURE__ */ new Map());
        _BatchClusterEventCoordinator_internalErrorCount.set(this, 0);
        __classPrivateFieldSet(this, _BatchClusterEventCoordinator_logger, options.logger, "f");
        __classPrivateFieldGet(this, _BatchClusterEventCoordinator_instances, "m", _BatchClusterEventCoordinator_setupEventHandlers).call(this);
      }
      /**
       * Get the mean number of tasks completed by child processes
       */
      get meanTasksPerProc() {
        const mean = __classPrivateFieldGet(this, _BatchClusterEventCoordinator_tasksPerProc, "f").mean;
        return isNaN(mean) ? 0 : mean;
      }
      /**
       * Get internal error count
       */
      get internalErrorCount() {
        return __classPrivateFieldGet(this, _BatchClusterEventCoordinator_internalErrorCount, "f");
      }
      /**
       * Get start error rate per minute
       */
      get startErrorRatePerMinute() {
        return __classPrivateFieldGet(this, _BatchClusterEventCoordinator_startErrorRate, "f").eventsPerMinute;
      }
      /**
       * Get count of ended child processes by reason
       */
      countEndedChildProcs(reason) {
        var _a;
        return (_a = __classPrivateFieldGet(this, _BatchClusterEventCoordinator_childEndCounts, "f").get(reason)) !== null && _a !== void 0 ? _a : 0;
      }
      /**
       * Get all child end counts
       */
      get childEndCounts() {
        return Object.fromEntries([...__classPrivateFieldGet(this, _BatchClusterEventCoordinator_childEndCounts, "f").entries()]);
      }
      /**
       * Get event statistics for monitoring
       */
      getEventStats() {
        return {
          meanTasksPerProc: this.meanTasksPerProc,
          internalErrorCount: this.internalErrorCount,
          startErrorRatePerMinute: this.startErrorRatePerMinute,
          totalChildEndEvents: [...__classPrivateFieldGet(this, _BatchClusterEventCoordinator_childEndCounts, "f").values()].reduce((sum, count) => sum + count, 0),
          childEndReasons: Object.keys(this.childEndCounts)
        };
      }
      /**
       * Reset event statistics (useful for testing)
       */
      resetStats() {
        __classPrivateFieldSet(this, _BatchClusterEventCoordinator_tasksPerProc, new Mean_1.Mean(), "f");
        __classPrivateFieldSet(this, _BatchClusterEventCoordinator_startErrorRate, new Rate_1.Rate(), "f");
        __classPrivateFieldGet(this, _BatchClusterEventCoordinator_childEndCounts, "f").clear();
        __classPrivateFieldSet(this, _BatchClusterEventCoordinator_internalErrorCount, 0, "f");
      }
      /**
       * Get the underlying emitter for direct event access
       */
      get events() {
        return this.emitter;
      }
    };
    exports2.BatchClusterEventCoordinator = BatchClusterEventCoordinator;
    _BatchClusterEventCoordinator_logger = /* @__PURE__ */ new WeakMap(), _BatchClusterEventCoordinator_tasksPerProc = /* @__PURE__ */ new WeakMap(), _BatchClusterEventCoordinator_startErrorRate = /* @__PURE__ */ new WeakMap(), _BatchClusterEventCoordinator_childEndCounts = /* @__PURE__ */ new WeakMap(), _BatchClusterEventCoordinator_internalErrorCount = /* @__PURE__ */ new WeakMap(), _BatchClusterEventCoordinator_instances = /* @__PURE__ */ new WeakSet(), _BatchClusterEventCoordinator_setupEventHandlers = function _BatchClusterEventCoordinator_setupEventHandlers2() {
      this.emitter.on("childEnd", (bp, why) => __classPrivateFieldGet(this, _BatchClusterEventCoordinator_instances, "m", _BatchClusterEventCoordinator_handleChildEnd).call(this, bp, why));
      this.emitter.on("internalError", (error) => __classPrivateFieldGet(this, _BatchClusterEventCoordinator_instances, "m", _BatchClusterEventCoordinator_handleInternalError).call(this, error));
      this.emitter.on("noTaskData", (stdout, stderr, proc) => __classPrivateFieldGet(this, _BatchClusterEventCoordinator_instances, "m", _BatchClusterEventCoordinator_handleNoTaskData).call(this, stdout, stderr, proc));
      this.emitter.on("startError", (error) => __classPrivateFieldGet(this, _BatchClusterEventCoordinator_instances, "m", _BatchClusterEventCoordinator_handleStartError).call(this, error));
    }, _BatchClusterEventCoordinator_handleChildEnd = function _BatchClusterEventCoordinator_handleChildEnd2(process2, reason) {
      var _a;
      __classPrivateFieldGet(this, _BatchClusterEventCoordinator_tasksPerProc, "f").push(process2.taskCount);
      __classPrivateFieldGet(this, _BatchClusterEventCoordinator_childEndCounts, "f").set(reason, ((_a = __classPrivateFieldGet(this, _BatchClusterEventCoordinator_childEndCounts, "f").get(reason)) !== null && _a !== void 0 ? _a : 0) + 1);
      this.onIdleLater();
    }, _BatchClusterEventCoordinator_handleInternalError = function _BatchClusterEventCoordinator_handleInternalError2(error) {
      var _a;
      __classPrivateFieldGet(this, _BatchClusterEventCoordinator_logger, "f").call(this).error("BatchCluster: INTERNAL ERROR: " + String(error));
      __classPrivateFieldSet(this, _BatchClusterEventCoordinator_internalErrorCount, (_a = __classPrivateFieldGet(this, _BatchClusterEventCoordinator_internalErrorCount, "f"), _a++, _a), "f");
    }, _BatchClusterEventCoordinator_handleNoTaskData = function _BatchClusterEventCoordinator_handleNoTaskData2(stdout, stderr, proc) {
      var _a;
      __classPrivateFieldGet(this, _BatchClusterEventCoordinator_logger, "f").call(this).warn("BatchCluster: child process emitted data with no current task. Consider setting streamFlushMillis to a higher value.", {
        streamFlushMillis: this.options.streamFlushMillis,
        stdout: (0, String_1.toS)(stdout),
        stderr: (0, String_1.toS)(stderr),
        proc_pid: proc === null || proc === void 0 ? void 0 : proc.pid
      });
      __classPrivateFieldSet(this, _BatchClusterEventCoordinator_internalErrorCount, (_a = __classPrivateFieldGet(this, _BatchClusterEventCoordinator_internalErrorCount, "f"), _a++, _a), "f");
    }, _BatchClusterEventCoordinator_handleStartError = function _BatchClusterEventCoordinator_handleStartError2(error) {
      __classPrivateFieldGet(this, _BatchClusterEventCoordinator_logger, "f").call(this).warn("BatchCluster.onStartError(): " + String(error));
      __classPrivateFieldGet(this, _BatchClusterEventCoordinator_startErrorRate, "f").onEvent();
      if (this.options.maxReasonableProcessFailuresPerMinute > 0 && __classPrivateFieldGet(this, _BatchClusterEventCoordinator_startErrorRate, "f").eventsPerMinute > this.options.maxReasonableProcessFailuresPerMinute) {
        this.emitter.emit("fatalError", new Error(String(error) + "(start errors/min: " + __classPrivateFieldGet(this, _BatchClusterEventCoordinator_startErrorRate, "f").eventsPerMinute.toFixed(2) + ")"));
        this.endCluster();
      } else {
        this.onIdleLater();
      }
    };
  }
});

// node_modules/batch-cluster/dist/Array.js
var require_Array = __commonJS({
  "node_modules/batch-cluster/dist/Array.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.filterInPlace = filterInPlace;
    exports2.count = count;
    function filterInPlace(arr, filter) {
      const len = arr.length;
      let j = 0;
      for (let i = 0; i < len; i++) {
        const ea = arr[i];
        if (filter(ea)) {
          if (i !== j)
            arr[j] = ea;
          j++;
        }
      }
      arr.length = j;
      return arr;
    }
    function count(arr, predicate) {
      let acc = 0;
      for (let idx = 0; idx < arr.length; idx++) {
        if (predicate(arr[idx], idx))
          acc++;
      }
      return acc;
    }
  }
});

// node_modules/batch-cluster/dist/Error.js
var require_Error = __commonJS({
  "node_modules/batch-cluster/dist/Error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tryEach = tryEach;
    exports2.cleanError = cleanError;
    exports2.asError = asError;
    var String_1 = require_String();
    function tryEach(arr) {
      for (const f of arr) {
        try {
          f();
        } catch {
        }
      }
    }
    function cleanError(s) {
      return String(s).trim().replace(/^error: /i, "");
    }
    function asError(err) {
      var _a, _b;
      return err instanceof Error ? err : new Error((_b = (_a = (0, String_1.toNotBlank)(err != null && typeof err === "object" && "message" in err ? err === null || err === void 0 ? void 0 : err.message : void 0)) !== null && _a !== void 0 ? _a : (0, String_1.toNotBlank)(err)) !== null && _b !== void 0 ? _b : "(unknown)");
    }
  }
});

// node_modules/batch-cluster/dist/Parser.js
var require_Parser = __commonJS({
  "node_modules/batch-cluster/dist/Parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SimpleParser = void 0;
    var String_1 = require_String();
    var SimpleParser = (stdout, stderr, passed) => {
      if (!passed)
        throw new Error("task failed");
      if ((0, String_1.notBlank)(stderr))
        throw new Error(stderr);
      return stdout;
    };
    exports2.SimpleParser = SimpleParser;
  }
});

// node_modules/batch-cluster/dist/Pids.js
var require_Pids = __commonJS({
  "node_modules/batch-cluster/dist/Pids.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pidExists = pidExists;
    exports2.kill = kill;
    exports2.pids = pids;
    var node_child_process_1 = __importDefault(require("node:child_process"));
    var node_fs_1 = require("node:fs");
    var promises_1 = require("node:fs/promises");
    var Error_1 = require_Error();
    var Platform_1 = require_Platform();
    function pidExists(pid) {
      if (pid == null || !isFinite(pid) || pid <= 0)
        return false;
      try {
        return process.kill(pid, 0);
      } catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.code) === "EPERM")
          return true;
        return false;
      }
    }
    function kill(pid, force = false) {
      if (pid == null || !isFinite(pid) || pid <= 0)
        return false;
      try {
        return process.kill(pid, force ? "SIGKILL" : void 0);
      } catch (err) {
        if (!String(err).includes("ESRCH"))
          throw err;
        return false;
      }
    }
    async function pids() {
      if (!Platform_1.isWin && (0, node_fs_1.existsSync)("/proc")) {
        const names = await (0, promises_1.readdir)("/proc");
        return names.filter((d) => /^\d+$/.test(d)).map((d) => parseInt(d, 10));
      }
      const cmd = Platform_1.isWin ? "tasklist" : "ps";
      const args = Platform_1.isWin ? ["/NH", "/FO", "CSV"] : ["-e", "-o", "pid="];
      return new Promise((resolve, reject) => {
        node_child_process_1.default.execFile(cmd, args, (err, stdout, stderr) => {
          if (err)
            return reject((0, Error_1.asError)(err));
          if (stderr.trim())
            return reject(new Error(stderr));
          const pids2 = stdout.trim().split(/[\r\n]+/).map((line) => {
            var _a;
            if (Platform_1.isWin) {
              const cols = line.split('","');
              const pidStr = (_a = cols[1]) === null || _a === void 0 ? void 0 : _a.replace(/"/g, "");
              return Number(pidStr);
            }
            return Number(line.trim());
          }).filter((n) => Number.isFinite(n) && n > 0);
          resolve(pids2);
        });
      });
    }
  }
});

// node_modules/batch-cluster/dist/HealthCheckStrategy.js
var require_HealthCheckStrategy = __commonJS({
  "node_modules/batch-cluster/dist/HealthCheckStrategy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CompositeHealthCheckStrategy = exports2.TaskTimeoutHealthCheck = exports2.AgeHealthCheck = exports2.FailureCountHealthCheck = exports2.IdleTimeHealthCheck = exports2.TaskLimitHealthCheck = exports2.StreamHealthCheck = exports2.LifecycleHealthCheck = void 0;
    var LifecycleHealthCheck = class {
      assess(process2) {
        if (process2.ended) {
          return "ended";
        } else if (process2.ending) {
          return "ending";
        }
        return null;
      }
    };
    exports2.LifecycleHealthCheck = LifecycleHealthCheck;
    var StreamHealthCheck = class {
      assess(process2) {
        if (process2.proc.stdin == null || process2.proc.stdin.destroyed) {
          return "closed";
        }
        return null;
      }
    };
    exports2.StreamHealthCheck = StreamHealthCheck;
    var TaskLimitHealthCheck = class {
      assess(process2, options) {
        if (options.maxTasksPerProcess > 0 && process2.taskCount >= options.maxTasksPerProcess) {
          return "worn";
        }
        return null;
      }
    };
    exports2.TaskLimitHealthCheck = TaskLimitHealthCheck;
    var IdleTimeHealthCheck = class {
      assess(process2, options) {
        if (options.maxIdleMsPerProcess > 0 && process2.idleMs > options.maxIdleMsPerProcess) {
          return "idle";
        }
        return null;
      }
    };
    exports2.IdleTimeHealthCheck = IdleTimeHealthCheck;
    var FailureCountHealthCheck = class {
      assess(process2, options) {
        if (options.maxFailedTasksPerProcess > 0 && process2.failedTaskCount >= options.maxFailedTasksPerProcess) {
          return "broken";
        }
        return null;
      }
    };
    exports2.FailureCountHealthCheck = FailureCountHealthCheck;
    var AgeHealthCheck = class {
      assess(process2, options) {
        if (options.maxProcAgeMillis > 0 && process2.start + options.maxProcAgeMillis < Date.now()) {
          return "old";
        }
        return null;
      }
    };
    exports2.AgeHealthCheck = AgeHealthCheck;
    var TaskTimeoutHealthCheck = class {
      assess(process2, options) {
        var _a, _b;
        if (options.taskTimeoutMillis > 0 && ((_b = (_a = process2.currentTask) === null || _a === void 0 ? void 0 : _a.runtimeMs) !== null && _b !== void 0 ? _b : 0) > options.taskTimeoutMillis) {
          return "timeout";
        }
        return null;
      }
    };
    exports2.TaskTimeoutHealthCheck = TaskTimeoutHealthCheck;
    var CompositeHealthCheckStrategy = class {
      constructor() {
        this.strategies = [
          new LifecycleHealthCheck(),
          new StreamHealthCheck(),
          new TaskLimitHealthCheck(),
          new IdleTimeHealthCheck(),
          new FailureCountHealthCheck(),
          new AgeHealthCheck(),
          new TaskTimeoutHealthCheck()
        ];
      }
      assess(process2, options) {
        for (const strategy of this.strategies) {
          const result = strategy.assess(process2, options);
          if (result != null) {
            return result;
          }
        }
        return null;
      }
    };
    exports2.CompositeHealthCheckStrategy = CompositeHealthCheckStrategy;
  }
});

// node_modules/batch-cluster/dist/Async.js
var require_Async = __commonJS({
  "node_modules/batch-cluster/dist/Async.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.delay = delay;
    exports2.until = until;
    var node_timers_1 = __importDefault(require("node:timers"));
    function delay(millis, unref = false) {
      return new Promise((resolve) => {
        const t = node_timers_1.default.setTimeout(() => resolve(), millis);
        if (unref)
          t.unref();
      });
    }
    async function until(f, timeoutMs, delayMs = 50) {
      const timeoutAt = Date.now() + timeoutMs;
      let count = 0;
      while (Date.now() < timeoutAt) {
        if (await f(count)) {
          return true;
        } else {
          count++;
          await delay(delayMs);
        }
      }
      return false;
    }
  }
});

// node_modules/batch-cluster/dist/Task.js
var require_Task = __commonJS({
  "node_modules/batch-cluster/dist/Task.js"(exports2) {
    "use strict";
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _Task_instances;
    var _Task_opts;
    var _Task_startedAt;
    var _Task_parsing;
    var _Task_settledAt;
    var _Task_d;
    var _Task_stdout;
    var _Task_stderr;
    var _Task_onSettle;
    var _Task_resolve;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Task = void 0;
    var Async_1 = require_Async();
    var Deferred_1 = require_Deferred();
    var _taskId = 1;
    var Task = class {
      /**
       * @param {string} command is the value written to stdin to perform the given
       * task.
       * @param {Parser<T>} parser is used to parse resulting data from the
       * underlying process to a typed object.
       */
      constructor(command, parser) {
        _Task_instances.add(this);
        this.command = command;
        this.parser = parser;
        this.taskId = _taskId++;
        _Task_opts.set(this, void 0);
        _Task_startedAt.set(this, void 0);
        _Task_parsing.set(this, false);
        _Task_settledAt.set(this, void 0);
        _Task_d.set(this, new Deferred_1.Deferred());
        _Task_stdout.set(this, "");
        _Task_stderr.set(
          this,
          ""
          /**
           * @param {string} command is the value written to stdin to perform the given
           * task.
           * @param {Parser<T>} parser is used to parse resulting data from the
           * underlying process to a typed object.
           */
        );
        __classPrivateFieldGet(this, _Task_d, "f").promise.then(() => __classPrivateFieldGet(this, _Task_instances, "m", _Task_onSettle).call(this), () => __classPrivateFieldGet(this, _Task_instances, "m", _Task_onSettle).call(this));
      }
      /**
       * @return the resolution or rejection of this task.
       */
      get promise() {
        return __classPrivateFieldGet(this, _Task_d, "f").promise;
      }
      get pending() {
        return __classPrivateFieldGet(this, _Task_d, "f").pending;
      }
      get state() {
        return __classPrivateFieldGet(this, _Task_d, "f").pending ? "pending" : __classPrivateFieldGet(this, _Task_d, "f").rejected ? "rejected" : "resolved";
      }
      onStart(opts) {
        __classPrivateFieldSet(this, _Task_opts, opts, "f");
        __classPrivateFieldSet(this, _Task_startedAt, Date.now(), "f");
      }
      get runtimeMs() {
        var _a;
        return __classPrivateFieldGet(this, _Task_startedAt, "f") == null ? void 0 : ((_a = __classPrivateFieldGet(this, _Task_settledAt, "f")) !== null && _a !== void 0 ? _a : Date.now()) - __classPrivateFieldGet(this, _Task_startedAt, "f");
      }
      toString() {
        return this.constructor.name + "(" + this.command.replace(/\s+/gm, " ").slice(0, 80).trim() + ")#" + this.taskId;
      }
      onStdout(buf) {
        var _a, _b;
        __classPrivateFieldSet(this, _Task_stdout, __classPrivateFieldGet(this, _Task_stdout, "f") + buf.toString(), "f");
        const passRE = (_a = __classPrivateFieldGet(this, _Task_opts, "f")) === null || _a === void 0 ? void 0 : _a.passRE;
        if (passRE != null && passRE.exec(__classPrivateFieldGet(this, _Task_stdout, "f")) != null) {
          __classPrivateFieldSet(this, _Task_stdout, __classPrivateFieldGet(this, _Task_stdout, "f").replace(passRE, ""), "f");
          void __classPrivateFieldGet(this, _Task_instances, "m", _Task_resolve).call(this, true);
        } else {
          const failRE = (_b = __classPrivateFieldGet(this, _Task_opts, "f")) === null || _b === void 0 ? void 0 : _b.failRE;
          if (failRE != null && failRE.exec(__classPrivateFieldGet(this, _Task_stdout, "f")) != null) {
            __classPrivateFieldSet(this, _Task_stdout, __classPrivateFieldGet(this, _Task_stdout, "f").replace(failRE, ""), "f");
            void __classPrivateFieldGet(this, _Task_instances, "m", _Task_resolve).call(this, false);
          }
        }
      }
      onStderr(buf) {
        var _a;
        __classPrivateFieldSet(this, _Task_stderr, __classPrivateFieldGet(this, _Task_stderr, "f") + buf.toString(), "f");
        const failRE = (_a = __classPrivateFieldGet(this, _Task_opts, "f")) === null || _a === void 0 ? void 0 : _a.failRE;
        if (failRE != null && failRE.exec(__classPrivateFieldGet(this, _Task_stderr, "f")) != null) {
          __classPrivateFieldSet(this, _Task_stderr, __classPrivateFieldGet(this, _Task_stderr, "f").replace(failRE, ""), "f");
          void __classPrivateFieldGet(this, _Task_instances, "m", _Task_resolve).call(this, false);
        }
      }
      /**
       * @return true if the wrapped promise was rejected
       */
      reject(error) {
        return __classPrivateFieldGet(this, _Task_d, "f").reject(error);
      }
    };
    exports2.Task = Task;
    _Task_opts = /* @__PURE__ */ new WeakMap(), _Task_startedAt = /* @__PURE__ */ new WeakMap(), _Task_parsing = /* @__PURE__ */ new WeakMap(), _Task_settledAt = /* @__PURE__ */ new WeakMap(), _Task_d = /* @__PURE__ */ new WeakMap(), _Task_stdout = /* @__PURE__ */ new WeakMap(), _Task_stderr = /* @__PURE__ */ new WeakMap(), _Task_instances = /* @__PURE__ */ new WeakSet(), _Task_onSettle = function _Task_onSettle2() {
      var _a;
      __classPrivateFieldSet(this, _Task_settledAt, (_a = __classPrivateFieldGet(this, _Task_settledAt, "f")) !== null && _a !== void 0 ? _a : Date.now(), "f");
    }, _Task_resolve = async function _Task_resolve2(passed) {
      var _a, _b, _c;
      passed = !__classPrivateFieldGet(this, _Task_d, "f").rejected && passed;
      const flushMs = (_b = (_a = __classPrivateFieldGet(this, _Task_opts, "f")) === null || _a === void 0 ? void 0 : _a.streamFlushMillis) !== null && _b !== void 0 ? _b : 0;
      if (flushMs > 0) {
        await (0, Async_1.delay)(flushMs);
      }
      if (!this.pending || __classPrivateFieldGet(this, _Task_parsing, "f"))
        return;
      __classPrivateFieldSet(this, _Task_parsing, true, "f");
      try {
        const parseResult = await this.parser(__classPrivateFieldGet(this, _Task_stdout, "f"), __classPrivateFieldGet(this, _Task_stderr, "f"), passed);
        if (__classPrivateFieldGet(this, _Task_d, "f").resolve(parseResult)) {
        } else {
          (_c = __classPrivateFieldGet(this, _Task_opts, "f")) === null || _c === void 0 ? void 0 : _c.observer.emit("internalError", new Error(this.toString() + " ._resolved() more than once"));
        }
      } catch (error) {
        this.reject(error instanceof Error ? error : new Error(String(error)));
      }
    };
  }
});

// node_modules/batch-cluster/dist/ProcessHealthMonitor.js
var require_ProcessHealthMonitor = __commonJS({
  "node_modules/batch-cluster/dist/ProcessHealthMonitor.js"(exports2) {
    "use strict";
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _ProcessHealthMonitor_healthCheckStates;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProcessHealthMonitor = void 0;
    var HealthCheckStrategy_1 = require_HealthCheckStrategy();
    var Parser_1 = require_Parser();
    var String_1 = require_String();
    var Task_1 = require_Task();
    var ProcessHealthMonitor = class {
      constructor(options, emitter, healthStrategy) {
        this.options = options;
        this.emitter = emitter;
        _ProcessHealthMonitor_healthCheckStates.set(this, /* @__PURE__ */ new Map());
        this.healthStrategy = healthStrategy !== null && healthStrategy !== void 0 ? healthStrategy : new HealthCheckStrategy_1.CompositeHealthCheckStrategy();
      }
      /**
       * Initialize health monitoring for a process
       */
      initializeProcess(pid) {
        __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").set(pid, {
          lastHealthCheck: Date.now(),
          healthCheckFailures: 0,
          lastJobFailed: false
        });
      }
      /**
       * Clean up health monitoring for a process
       */
      cleanupProcess(pid) {
        __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").delete(pid);
      }
      /**
       * Record that a job failed for a process
       */
      recordJobFailure(pid) {
        const state = __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").get(pid);
        if (state != null) {
          state.lastJobFailed = true;
        }
      }
      /**
       * Record that a job succeeded for a process
       */
      recordJobSuccess(pid) {
        const state = __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").get(pid);
        if (state != null) {
          state.lastJobFailed = false;
        }
      }
      /**
       * Assess the health of a process and return why it's not healthy, or null if healthy
       */
      assessHealth(process2, overrideReason) {
        if (overrideReason != null)
          return overrideReason;
        const state = __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").get(process2.pid);
        if (state != null && state.healthCheckFailures > 0) {
          return "unhealthy";
        }
        return this.healthStrategy.assess(process2, this.options);
      }
      /**
       * Check if a process is healthy
       */
      isHealthy(process2, overrideReason) {
        return this.assessHealth(process2, overrideReason) == null;
      }
      /**
       * Assess why a process is not ready (combines health and business)
       */
      assessReadiness(process2, overrideReason) {
        return !process2.idle ? "busy" : this.assessHealth(process2, overrideReason);
      }
      /**
       * Check if a process is ready to handle tasks
       */
      isReady(process2, overrideReason) {
        return this.assessReadiness(process2, overrideReason) == null;
      }
      /**
       * Run a health check on a process if needed
       */
      maybeRunHealthcheck(process2) {
        const hcc = this.options.healthCheckCommand;
        if (hcc == null || (0, String_1.blank)(hcc))
          return;
        if (!this.isReady(process2))
          return;
        const state = __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").get(process2.pid);
        if (state == null)
          return;
        if (state.lastJobFailed || this.options.healthCheckIntervalMillis > 0 && Date.now() - state.lastHealthCheck > this.options.healthCheckIntervalMillis) {
          state.lastHealthCheck = Date.now();
          const t = new Task_1.Task(hcc, Parser_1.SimpleParser);
          t.promise.catch((err) => {
            this.emitter.emit(
              "healthCheckError",
              err instanceof Error ? err : new Error(String(err)),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
              process2
            );
            state.healthCheckFailures++;
          }).finally(() => {
            state.lastHealthCheck = Date.now();
          });
          if (process2.execTask(t)) {
            return t;
          }
        }
        return;
      }
      /**
       * Get health statistics for monitoring
       */
      getHealthStats() {
        let totalFailures = 0;
        let processesWithFailures = 0;
        for (const state of __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").values()) {
          totalFailures += state.healthCheckFailures;
          if (state.healthCheckFailures > 0) {
            processesWithFailures++;
          }
        }
        return {
          monitoredProcesses: __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").size,
          totalHealthCheckFailures: totalFailures,
          processesWithFailures
        };
      }
      /**
       * Reset health check failures for a process (useful for recovery scenarios)
       */
      resetHealthCheckFailures(pid) {
        const state = __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").get(pid);
        if (state != null) {
          state.healthCheckFailures = 0;
        }
      }
      /**
       * Get health check state for a specific process
       */
      getProcessHealthState(pid) {
        return __classPrivateFieldGet(this, _ProcessHealthMonitor_healthCheckStates, "f").get(pid);
      }
    };
    exports2.ProcessHealthMonitor = ProcessHealthMonitor;
    _ProcessHealthMonitor_healthCheckStates = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/batch-cluster/dist/Stream.js
var require_Stream = __commonJS({
  "node_modules/batch-cluster/dist/Stream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.destroy = destroy;
    function destroy(stream) {
      var _a;
      try {
        stream === null || stream === void 0 ? void 0 : stream.removeAllListeners("error");
        (_a = stream === null || stream === void 0 ? void 0 : stream.destroy) === null || _a === void 0 ? void 0 : _a.call(stream);
      } catch {
      }
    }
  }
});

// node_modules/batch-cluster/dist/Timeout.js
var require_Timeout = __commonJS({
  "node_modules/batch-cluster/dist/Timeout.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Timeout = void 0;
    exports2.thenOrTimeout = thenOrTimeout;
    var node_timers_1 = __importDefault(require("node:timers"));
    exports2.Timeout = Symbol("timeout");
    async function thenOrTimeout(p, timeoutMs) {
      return timeoutMs <= 1 ? p : new Promise((resolve, reject) => {
        let pending = true;
        const t = node_timers_1.default.setTimeout(() => {
          if (pending) {
            pending = false;
            resolve(exports2.Timeout);
          }
        }, timeoutMs);
        p.then((result) => {
          if (pending) {
            pending = false;
            clearTimeout(t);
            resolve(result);
          }
        }, (err) => {
          if (pending) {
            pending = false;
            clearTimeout(t);
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        });
      });
    }
  }
});

// node_modules/batch-cluster/dist/ProcessTerminator.js
var require_ProcessTerminator = __commonJS({
  "node_modules/batch-cluster/dist/ProcessTerminator.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _ProcessTerminator_instances;
    var _ProcessTerminator_logger;
    var _ProcessTerminator_waitForTaskCompletion;
    var _ProcessTerminator_removeErrorListeners;
    var _ProcessTerminator_sendExitCommand;
    var _ProcessTerminator_destroyStreams;
    var _ProcessTerminator_handleGracefulShutdown;
    var _ProcessTerminator_forceKillIfRunning;
    var _ProcessTerminator_awaitNotRunning;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProcessTerminator = void 0;
    var Async_1 = require_Async();
    var Pids_1 = require_Pids();
    var Stream_1 = require_Stream();
    var String_1 = require_String();
    var Timeout_1 = require_Timeout();
    var ProcessTerminator = class {
      constructor(opts) {
        _ProcessTerminator_instances.add(this);
        this.opts = opts;
        _ProcessTerminator_logger.set(this, void 0);
        __classPrivateFieldSet(this, _ProcessTerminator_logger, opts.logger, "f");
      }
      /**
       * Terminates a child process gracefully or forcefully
       *
       * @param proc The child process to terminate
       * @param processName Name for logging purposes
       * @param pid Process ID
       * @param lastTask Current task being processed
       * @param startupTaskId ID of the startup task
       * @param gracefully Whether to wait for current task completion
       * @param reason Reason for termination
       * @param isExited Whether the process has already exited
       * @param isRunning Function to check if process is still running
       * @returns Promise that resolves when termination is complete
       */
      async terminate(proc, processName, lastTask, startupTaskId, gracefully, isExited, isRunning) {
        var _a;
        await __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_waitForTaskCompletion).call(this, lastTask, startupTaskId, gracefully);
        __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_removeErrorListeners).call(this, proc);
        __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_sendExitCommand).call(this, proc);
        __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_destroyStreams).call(this, proc);
        await __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_handleGracefulShutdown).call(this, proc, gracefully, isExited, isRunning);
        __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_forceKillIfRunning).call(this, proc, processName, isRunning);
        try {
          (_a = proc.disconnect) === null || _a === void 0 ? void 0 : _a.call(proc);
        } catch {
        }
      }
    };
    exports2.ProcessTerminator = ProcessTerminator;
    _ProcessTerminator_logger = /* @__PURE__ */ new WeakMap(), _ProcessTerminator_instances = /* @__PURE__ */ new WeakSet(), _ProcessTerminator_waitForTaskCompletion = async function _ProcessTerminator_waitForTaskCompletion2(lastTask, startupTaskId, gracefully) {
      if (lastTask == null || lastTask.taskId === startupTaskId) {
        return;
      }
      try {
        await (0, Timeout_1.thenOrTimeout)(lastTask.promise, gracefully ? 2e3 : 250);
      } catch {
      }
      if (lastTask.pending) {
        lastTask.reject(new Error(`Process terminated before task completed (${JSON.stringify({
          gracefully,
          lastTask
        })})`));
      }
    }, _ProcessTerminator_removeErrorListeners = function _ProcessTerminator_removeErrorListeners2(proc) {
      for (const stream of [proc, proc.stdin, proc.stdout, proc.stderr]) {
        stream === null || stream === void 0 ? void 0 : stream.removeAllListeners("error");
      }
    }, _ProcessTerminator_sendExitCommand = function _ProcessTerminator_sendExitCommand2(proc) {
      var _a;
      if (((_a = proc.stdin) === null || _a === void 0 ? void 0 : _a.writable) !== true) {
        return;
      }
      const exitCmd = this.opts.exitCommand == null ? null : (0, String_1.ensureSuffix)(this.opts.exitCommand, "\n");
      try {
        proc.stdin.end(exitCmd);
      } catch {
      }
    }, _ProcessTerminator_destroyStreams = function _ProcessTerminator_destroyStreams2(proc) {
      (0, Stream_1.destroy)(proc.stdin);
      (0, Stream_1.destroy)(proc.stdout);
      (0, Stream_1.destroy)(proc.stderr);
    }, _ProcessTerminator_handleGracefulShutdown = async function _ProcessTerminator_handleGracefulShutdown2(proc, gracefully, isExited, isRunning) {
      if (!this.opts.cleanupChildProcs || !gracefully || this.opts.endGracefulWaitTimeMillis <= 0 || isExited) {
        return;
      }
      await __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_awaitNotRunning).call(this, this.opts.endGracefulWaitTimeMillis / 2, isRunning);
      if (isRunning() && proc.pid != null) {
        proc.kill();
      }
      await __classPrivateFieldGet(this, _ProcessTerminator_instances, "m", _ProcessTerminator_awaitNotRunning).call(this, this.opts.endGracefulWaitTimeMillis / 2, isRunning);
    }, _ProcessTerminator_forceKillIfRunning = function _ProcessTerminator_forceKillIfRunning2(proc, processName, isRunning) {
      if (this.opts.cleanupChildProcs && proc.pid != null && isRunning()) {
        __classPrivateFieldGet(this, _ProcessTerminator_logger, "f").call(this).warn(`${processName}.terminate(): force-killing still-running child.`);
        (0, Pids_1.kill)(proc.pid, true);
      }
    }, _ProcessTerminator_awaitNotRunning = async function _ProcessTerminator_awaitNotRunning2(timeout, isRunning) {
      await (0, Async_1.until)(() => !isRunning(), timeout);
    };
  }
});

// node_modules/batch-cluster/dist/StreamHandler.js
var require_StreamHandler = __commonJS({
  "node_modules/batch-cluster/dist/StreamHandler.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _StreamHandler_instances;
    var _StreamHandler_logger;
    var _StreamHandler_onStdout;
    var _StreamHandler_onStderr;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StreamHandler = void 0;
    var Object_1 = require_Object();
    var String_1 = require_String();
    var StreamHandler = class {
      constructor(options, emitter) {
        _StreamHandler_instances.add(this);
        this.emitter = emitter;
        _StreamHandler_logger.set(this, void 0);
        __classPrivateFieldSet(this, _StreamHandler_logger, options.logger, "f");
      }
      /**
       * Set up stream event listeners for a child process
       */
      setupStreamListeners(proc, context) {
        const stdin = proc.stdin;
        if (stdin == null)
          throw new Error("Given proc had no stdin");
        stdin.on("error", (err) => context.onError("stdin.error", err));
        const stdout = proc.stdout;
        if (stdout == null)
          throw new Error("Given proc had no stdout");
        stdout.on("error", (err) => context.onError("stdout.error", err));
        stdout.on("data", (data) => __classPrivateFieldGet(this, _StreamHandler_instances, "m", _StreamHandler_onStdout).call(this, data, context));
        (0, Object_1.map)(proc.stderr, (stderr) => {
          stderr.on("error", (err) => context.onError("stderr.error", err));
          stderr.on("data", (data) => __classPrivateFieldGet(this, _StreamHandler_instances, "m", _StreamHandler_onStderr).call(this, data, context));
        });
      }
      /**
       * Process stdout data directly (for testing or manual processing)
       */
      processStdout(data, context) {
        __classPrivateFieldGet(this, _StreamHandler_instances, "m", _StreamHandler_onStdout).call(this, data, context);
      }
      /**
       * Process stderr data directly (for testing or manual processing)
       */
      processStderr(data, context) {
        __classPrivateFieldGet(this, _StreamHandler_instances, "m", _StreamHandler_onStderr).call(this, data, context);
      }
      /**
       * Check if data is considered blank/empty
       */
      isBlankData(data) {
        return (0, String_1.blank)(data);
      }
      /**
       * Get stream handler statistics
       */
      getStats() {
        return {
          handlerActive: true,
          emitterConnected: this.emitter != null
        };
      }
    };
    exports2.StreamHandler = StreamHandler;
    _StreamHandler_logger = /* @__PURE__ */ new WeakMap(), _StreamHandler_instances = /* @__PURE__ */ new WeakSet(), _StreamHandler_onStdout = function _StreamHandler_onStdout2(data, context) {
      if (data == null)
        return;
      const task = context.getCurrentTask();
      if (task != null && task.pending) {
        this.emitter.emit("taskData", data, task, context);
        task.onStdout(data);
      } else if (context.isEnding()) {
      } else if (!(0, String_1.blank)(data)) {
        this.emitter.emit("noTaskData", data, null, context);
        context.end(false, "stdout.error");
      }
    }, _StreamHandler_onStderr = function _StreamHandler_onStderr2(data, context) {
      if ((0, String_1.blank)(data))
        return;
      __classPrivateFieldGet(this, _StreamHandler_logger, "f").call(this).warn(context.name + ".onStderr(): " + String(data));
      const task = context.getCurrentTask();
      if (task != null && task.pending) {
        task.onStderr(data);
      } else if (!context.isEnding()) {
        this.emitter.emit("noTaskData", null, data, context);
        context.end(false, "stderr");
      }
    };
  }
});

// node_modules/batch-cluster/dist/BatchProcess.js
var require_BatchProcess = __commonJS({
  "node_modules/batch-cluster/dist/BatchProcess.js"(exports2) {
    "use strict";
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _BatchProcess_instances;
    var _BatchProcess_logger;
    var _BatchProcess_terminator;
    var _BatchProcess_healthMonitor;
    var _BatchProcess_streamHandler;
    var _BatchProcess_lastJobFinshedAt;
    var _BatchProcess_starting;
    var _BatchProcess_exited;
    var _BatchProcess_whyNotHealthy;
    var _BatchProcess_taskCount;
    var _BatchProcess_currentTask;
    var _BatchProcess_createStreamContext;
    var _BatchProcess_currentTaskTimeout;
    var _BatchProcess_endPromise;
    var _BatchProcess_execTask;
    var _BatchProcess_end;
    var _BatchProcess_onTimeout;
    var _BatchProcess_onError;
    var _BatchProcess_clearCurrentTask;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchProcess = void 0;
    var node_timers_1 = __importDefault(require("node:timers"));
    var Deferred_1 = require_Deferred();
    var Error_1 = require_Error();
    var Object_1 = require_Object();
    var Parser_1 = require_Parser();
    var Pids_1 = require_Pids();
    var ProcessHealthMonitor_1 = require_ProcessHealthMonitor();
    var ProcessTerminator_1 = require_ProcessTerminator();
    var StreamHandler_1 = require_StreamHandler();
    var String_1 = require_String();
    var Task_1 = require_Task();
    var BatchProcess = class {
      /**
       * Getter for current task (required by StreamContext interface)
       */
      get currentTask() {
        return __classPrivateFieldGet(this, _BatchProcess_currentTask, "f");
      }
      /**
       * @param onIdle to be called when internal state changes (like the current
       * task is resolved, or the process exits)
       */
      constructor(proc, opts, onIdle, healthMonitor) {
        _BatchProcess_instances.add(this);
        this.proc = proc;
        this.opts = opts;
        this.onIdle = onIdle;
        this.start = Date.now();
        _BatchProcess_logger.set(this, void 0);
        _BatchProcess_terminator.set(this, void 0);
        _BatchProcess_healthMonitor.set(this, void 0);
        _BatchProcess_streamHandler.set(this, void 0);
        _BatchProcess_lastJobFinshedAt.set(
          this,
          Date.now()
          // Only set to true when `proc.pid` is no longer in the process table.
        );
        _BatchProcess_starting.set(this, true);
        _BatchProcess_exited.set(
          this,
          false
          // override for .whyNotHealthy()
        );
        _BatchProcess_whyNotHealthy.set(this, void 0);
        this.failedTaskCount = 0;
        _BatchProcess_taskCount.set(
          this,
          -1
          /**
           * Should be undefined if this instance is not currently processing a task.
           */
        );
        _BatchProcess_currentTask.set(this, void 0);
        _BatchProcess_createStreamContext.set(this, () => {
          return {
            name: this.name,
            isEnding: () => this.ending,
            getCurrentTask: () => __classPrivateFieldGet(this, _BatchProcess_currentTask, "f"),
            onError: (reason, error) => __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_onError).call(this, reason, error),
            end: (gracefully, reason) => void this.end(gracefully, reason)
          };
        });
        _BatchProcess_currentTaskTimeout.set(this, void 0);
        _BatchProcess_endPromise.set(this, void 0);
        this.name = "BatchProcess(" + proc.pid + ")";
        __classPrivateFieldSet(this, _BatchProcess_logger, opts.logger, "f");
        __classPrivateFieldSet(this, _BatchProcess_terminator, new ProcessTerminator_1.ProcessTerminator(opts), "f");
        __classPrivateFieldSet(this, _BatchProcess_healthMonitor, healthMonitor !== null && healthMonitor !== void 0 ? healthMonitor : new ProcessHealthMonitor_1.ProcessHealthMonitor(opts, opts.observer), "f");
        __classPrivateFieldSet(this, _BatchProcess_streamHandler, new StreamHandler_1.StreamHandler({ logger: __classPrivateFieldGet(this, _BatchProcess_logger, "f") }, opts.observer), "f");
        this.proc.unref();
        if (proc.pid == null) {
          throw new Error("BatchProcess.constructor: child process pid is null");
        }
        this.pid = proc.pid;
        this.proc.on("error", (err) => __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_onError).call(this, "proc.error", err));
        this.proc.on("close", () => {
          void this.end(false, "proc.close");
        });
        this.proc.on("exit", () => {
          void this.end(false, "proc.exit");
        });
        this.proc.on("disconnect", () => {
          void this.end(false, "proc.disconnect");
        });
        __classPrivateFieldGet(this, _BatchProcess_streamHandler, "f").setupStreamListeners(this.proc, __classPrivateFieldGet(this, _BatchProcess_createStreamContext, "f").call(this));
        const startupTask = new Task_1.Task(opts.versionCommand, Parser_1.SimpleParser);
        this.startupTaskId = startupTask.taskId;
        if (!this.execTask(startupTask)) {
          this.opts.observer.emit("internalError", new Error(this.name + " startup task was not submitted"));
        }
        __classPrivateFieldGet(this, _BatchProcess_healthMonitor, "f").initializeProcess(this.pid);
        this.opts.observer.emit("childStart", this);
      }
      get taskCount() {
        return __classPrivateFieldGet(this, _BatchProcess_taskCount, "f");
      }
      get starting() {
        return __classPrivateFieldGet(this, _BatchProcess_starting, "f");
      }
      /**
       * @return true if `this.end()` has been requested (which may be due to the
       * child process exiting)
       */
      get ending() {
        return __classPrivateFieldGet(this, _BatchProcess_endPromise, "f") != null;
      }
      /**
       * @return true if `this.end()` has completed running, which includes child
       * process cleanup. Note that this may return `true` and the process table may
       * still include the child pid. Call {@link BatchProcess#running()} for an authoritative
       * (but expensive!) answer.
       */
      get ended() {
        var _a;
        return true === ((_a = __classPrivateFieldGet(this, _BatchProcess_endPromise, "f")) === null || _a === void 0 ? void 0 : _a.settled);
      }
      /**
       * @return true if the child process has exited and is no longer in the
       * process table. Note that this may be erroneously false if the process table
       * hasn't been checked. Call {@link BatchProcess#running()} for an authoritative (but
       * expensive!) answer.
       */
      get exited() {
        return __classPrivateFieldGet(this, _BatchProcess_exited, "f");
      }
      /**
       * @return a string describing why this process should be recycled, or null if
       * the process passes all health checks. Note that this doesn't include if
       * we're already busy: see {@link BatchProcess.whyNotReady} if you need to
       * know if a process can handle a new task.
       */
      get whyNotHealthy() {
        return __classPrivateFieldGet(this, _BatchProcess_healthMonitor, "f").assessHealth(this, __classPrivateFieldGet(this, _BatchProcess_whyNotHealthy, "f"));
      }
      /**
       * @return true if the process doesn't need to be recycled.
       */
      get healthy() {
        return this.whyNotHealthy == null;
      }
      /**
       * @return true iff no current task. Does not take into consideration if the
       * process has ended or should be recycled: see {@link BatchProcess.ready}.
       */
      get idle() {
        return __classPrivateFieldGet(this, _BatchProcess_currentTask, "f") == null;
      }
      /**
       * @return a string describing why this process cannot currently handle a new
       * task, or `undefined` if this process is idle and healthy.
       */
      get whyNotReady() {
        return !this.idle ? "busy" : this.whyNotHealthy;
      }
      /**
       * @return true iff this process is  both healthy and idle, and ready for a
       * new task.
       */
      get ready() {
        return this.whyNotReady == null;
      }
      get idleMs() {
        return this.idle ? Date.now() - __classPrivateFieldGet(this, _BatchProcess_lastJobFinshedAt, "f") : -1;
      }
      /**
       * @return true if the child process is in the process table
       */
      running() {
        if (__classPrivateFieldGet(this, _BatchProcess_exited, "f"))
          return false;
        const alive = (0, Pids_1.pidExists)(this.pid);
        if (!alive) {
          __classPrivateFieldSet(this, _BatchProcess_exited, true, "f");
          void this.end(false, "proc.exit");
        }
        return alive;
      }
      notRunning() {
        return !this.running();
      }
      maybeRunHealthcheck() {
        return __classPrivateFieldGet(this, _BatchProcess_healthMonitor, "f").maybeRunHealthcheck(this);
      }
      // This must not be async, or new instances aren't started as busy (until the
      // startup task is complete)
      execTask(task) {
        return this.ready ? __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_execTask).call(this, task) : false;
      }
      /**
       * End this child process.
       *
       * @param gracefully Wait for any current task to be resolved or rejected
       * before shutting down the child process.
       * @param reason who called end() (used for logging)
       * @return Promise that will be resolved when the process has completed.
       * Subsequent calls to end() will ignore the parameters and return the first
       * endPromise.
       */
      // NOT ASYNC! needs to change state immediately.
      end(gracefully = true, reason) {
        var _a, _b;
        return __classPrivateFieldSet(this, _BatchProcess_endPromise, (_a = __classPrivateFieldGet(this, _BatchProcess_endPromise, "f")) !== null && _a !== void 0 ? _a : new Deferred_1.Deferred().observe(__classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_end).call(this, gracefully, __classPrivateFieldSet(this, _BatchProcess_whyNotHealthy, (_b = __classPrivateFieldGet(this, _BatchProcess_whyNotHealthy, "f")) !== null && _b !== void 0 ? _b : reason, "f"))), "f").promise;
      }
    };
    exports2.BatchProcess = BatchProcess;
    _BatchProcess_logger = /* @__PURE__ */ new WeakMap(), _BatchProcess_terminator = /* @__PURE__ */ new WeakMap(), _BatchProcess_healthMonitor = /* @__PURE__ */ new WeakMap(), _BatchProcess_streamHandler = /* @__PURE__ */ new WeakMap(), _BatchProcess_lastJobFinshedAt = /* @__PURE__ */ new WeakMap(), _BatchProcess_starting = /* @__PURE__ */ new WeakMap(), _BatchProcess_exited = /* @__PURE__ */ new WeakMap(), _BatchProcess_whyNotHealthy = /* @__PURE__ */ new WeakMap(), _BatchProcess_taskCount = /* @__PURE__ */ new WeakMap(), _BatchProcess_currentTask = /* @__PURE__ */ new WeakMap(), _BatchProcess_createStreamContext = /* @__PURE__ */ new WeakMap(), _BatchProcess_currentTaskTimeout = /* @__PURE__ */ new WeakMap(), _BatchProcess_endPromise = /* @__PURE__ */ new WeakMap(), _BatchProcess_instances = /* @__PURE__ */ new WeakSet(), _BatchProcess_execTask = function _BatchProcess_execTask2(task) {
      var _a;
      var _b;
      if (this.ending)
        return false;
      __classPrivateFieldSet(this, _BatchProcess_taskCount, (_b = __classPrivateFieldGet(this, _BatchProcess_taskCount, "f"), _b++, _b), "f");
      __classPrivateFieldSet(this, _BatchProcess_currentTask, task, "f");
      const cmd = (0, String_1.ensureSuffix)(task.command, "\n");
      const isStartupTask = task.taskId === this.startupTaskId;
      const taskTimeoutMs = isStartupTask ? this.opts.spawnTimeoutMillis : this.opts.taskTimeoutMillis;
      if (taskTimeoutMs > 0) {
        __classPrivateFieldSet(this, _BatchProcess_currentTaskTimeout, node_timers_1.default.setTimeout(() => __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_onTimeout).call(this, task, taskTimeoutMs), taskTimeoutMs + this.opts.streamFlushMillis), "f");
      }
      void task.promise.then(() => {
        __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_clearCurrentTask).call(this, task);
        if (isStartupTask) {
          __classPrivateFieldSet(this, _BatchProcess_starting, false, "f");
        } else {
          this.opts.observer.emit("taskResolved", task, this);
        }
        this.onIdle();
      }, (error) => {
        __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_clearCurrentTask).call(this, task);
        if (isStartupTask) {
          this.opts.observer.emit("startError", error instanceof Error ? error : new Error(String(error)));
          void this.end(false, "startError");
        } else {
          this.opts.observer.emit("taskError", error instanceof Error ? error : new Error(String(error)), task, this);
        }
        this.onIdle();
      });
      try {
        task.onStart(this.opts);
        const stdin = (_a = this.proc) === null || _a === void 0 ? void 0 : _a.stdin;
        if (stdin == null || stdin.destroyed) {
          task.reject(new Error("proc.stdin unexpectedly closed"));
          return false;
        } else {
          stdin.write(cmd, (err) => {
            if (err != null) {
              task.reject(err);
            }
          });
          return true;
        }
      } catch {
        void this.end(false, "stdin.error");
        return false;
      }
    }, _BatchProcess_end = // NOTE: Must only be invoked by this.end(), and only expected to be invoked
    // once per instance.
    async function _BatchProcess_end2(gracefully, reason) {
      const lastTask = __classPrivateFieldGet(this, _BatchProcess_currentTask, "f");
      __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_clearCurrentTask).call(this);
      await __classPrivateFieldGet(this, _BatchProcess_terminator, "f").terminate(this.proc, this.name, lastTask, this.startupTaskId, gracefully, __classPrivateFieldGet(this, _BatchProcess_exited, "f"), () => this.running());
      __classPrivateFieldGet(this, _BatchProcess_healthMonitor, "f").cleanupProcess(this.pid);
      this.opts.observer.emit("childEnd", this, reason);
    }, _BatchProcess_onTimeout = function _BatchProcess_onTimeout2(task, timeoutMs) {
      if (task.pending) {
        this.opts.observer.emit("taskTimeout", timeoutMs, task, this);
        __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_onError).call(this, "timeout", new Error("waited " + timeoutMs + "ms"), task);
      }
    }, _BatchProcess_onError = function _BatchProcess_onError2(reason, error, task) {
      if (task == null) {
        task = __classPrivateFieldGet(this, _BatchProcess_currentTask, "f");
      }
      const cleanedError = new Error(reason + ": " + (0, Error_1.cleanError)(error.message));
      if (error.stack != null) {
        cleanedError.stack = (0, Error_1.cleanError)(error.stack);
      }
      __classPrivateFieldGet(this, _BatchProcess_logger, "f").call(this).warn(this.name + ".onError()", {
        reason,
        task: (0, Object_1.map)(task, (t) => t.command),
        error: cleanedError
      });
      if (this.ending) {
        return;
      }
      __classPrivateFieldGet(this, _BatchProcess_instances, "m", _BatchProcess_clearCurrentTask).call(this);
      void this.end(false, reason);
      if (task != null && this.taskCount === 1) {
        __classPrivateFieldGet(this, _BatchProcess_logger, "f").call(this).warn(this.name + ".onError(): startup task failed: " + String(cleanedError));
        this.opts.observer.emit("startError", cleanedError);
      }
      if (task != null) {
        if (task.pending) {
          task.reject(cleanedError);
        } else {
          this.opts.observer.emit("internalError", new Error(`${this.name}.onError(${cleanedError}) cannot reject already-fulfilled task.`));
        }
      }
    }, _BatchProcess_clearCurrentTask = function _BatchProcess_clearCurrentTask2(task) {
      var _a;
      const taskFailed = (task === null || task === void 0 ? void 0 : task.state) === "rejected";
      if (taskFailed) {
        __classPrivateFieldGet(this, _BatchProcess_healthMonitor, "f").recordJobFailure(this.pid);
      } else if (task != null) {
        __classPrivateFieldGet(this, _BatchProcess_healthMonitor, "f").recordJobSuccess(this.pid);
      }
      if (task != null && task.taskId !== ((_a = __classPrivateFieldGet(this, _BatchProcess_currentTask, "f")) === null || _a === void 0 ? void 0 : _a.taskId))
        return;
      (0, Object_1.map)(__classPrivateFieldGet(this, _BatchProcess_currentTaskTimeout, "f"), (ea) => clearTimeout(ea));
      __classPrivateFieldSet(this, _BatchProcess_currentTaskTimeout, void 0, "f");
      __classPrivateFieldSet(this, _BatchProcess_currentTask, void 0, "f");
      __classPrivateFieldSet(this, _BatchProcess_lastJobFinshedAt, Date.now(), "f");
    };
  }
});

// node_modules/batch-cluster/dist/ProcessPoolManager.js
var require_ProcessPoolManager = __commonJS({
  "node_modules/batch-cluster/dist/ProcessPoolManager.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _ProcessPoolManager_instances;
    var _ProcessPoolManager_procs;
    var _ProcessPoolManager_logger;
    var _ProcessPoolManager_healthMonitor;
    var _ProcessPoolManager_nextSpawnTime;
    var _ProcessPoolManager_lastPidsCheckTime;
    var _ProcessPoolManager_spawnedProcs;
    var _ProcessPoolManager_maybeCheckPids;
    var _ProcessPoolManager_maxSpawnDelay;
    var _ProcessPoolManager_procsToSpawn;
    var _ProcessPoolManager_spawnNewProc;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProcessPoolManager = void 0;
    var node_timers_1 = __importDefault(require("node:timers"));
    var Array_1 = require_Array();
    var BatchProcess_1 = require_BatchProcess();
    var Error_1 = require_Error();
    var ProcessHealthMonitor_1 = require_ProcessHealthMonitor();
    var Timeout_1 = require_Timeout();
    var ProcessPoolManager = class {
      constructor(options, emitter, onIdle) {
        _ProcessPoolManager_instances.add(this);
        this.options = options;
        this.emitter = emitter;
        this.onIdle = onIdle;
        _ProcessPoolManager_procs.set(this, []);
        _ProcessPoolManager_logger.set(this, void 0);
        _ProcessPoolManager_healthMonitor.set(this, void 0);
        _ProcessPoolManager_nextSpawnTime.set(this, 0);
        _ProcessPoolManager_lastPidsCheckTime.set(this, 0);
        _ProcessPoolManager_spawnedProcs.set(this, 0);
        __classPrivateFieldSet(this, _ProcessPoolManager_logger, options.logger, "f");
        __classPrivateFieldSet(this, _ProcessPoolManager_healthMonitor, new ProcessHealthMonitor_1.ProcessHealthMonitor(options, emitter), "f");
      }
      /**
       * Get all current processes
       */
      get processes() {
        return __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f");
      }
      /**
       * Get the current number of spawned child processes
       */
      get procCount() {
        return __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f").length;
      }
      /**
       * Alias for procCount to match BatchCluster interface
       */
      get processCount() {
        return this.procCount;
      }
      /**
       * Get the current number of child processes currently servicing tasks
       */
      get busyProcCount() {
        return (0, Array_1.count)(
          __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f"),
          // don't count procs that are starting up as "busy":
          (ea) => !ea.starting && !ea.ending && !ea.idle
        );
      }
      /**
       * Get the current number of starting processes
       */
      get startingProcCount() {
        return (0, Array_1.count)(
          __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f"),
          // don't count procs that are starting up as "busy":
          (ea) => ea.starting && !ea.ending
        );
      }
      /**
       * Get the current number of ready processes
       */
      get readyProcCount() {
        return (0, Array_1.count)(__classPrivateFieldGet(this, _ProcessPoolManager_procs, "f"), (ea) => ea.ready);
      }
      /**
       * Get the total number of child processes created by this instance
       */
      get spawnedProcCount() {
        return __classPrivateFieldGet(this, _ProcessPoolManager_spawnedProcs, "f");
      }
      /**
       * Get the milliseconds until the next spawn is allowed
       */
      get msBeforeNextSpawn() {
        return Math.max(0, __classPrivateFieldGet(this, _ProcessPoolManager_nextSpawnTime, "f") - Date.now());
      }
      /**
       * Get all currently running tasks from all processes
       */
      currentTasks() {
        const tasks = [];
        for (const proc of __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f")) {
          if (proc.currentTask != null) {
            tasks.push(proc.currentTask);
          }
        }
        return tasks;
      }
      /**
       * Find the first ready process that can handle a new task
       */
      findReadyProcess() {
        return __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f").find((ea) => ea.ready);
      }
      /**
       * Verify that each BatchProcess PID is actually alive.
       * @return the spawned PIDs that are still in the process table.
       */
      pids() {
        const arr = [];
        for (const proc of [...__classPrivateFieldGet(this, _ProcessPoolManager_procs, "f")]) {
          if (proc != null && proc.running()) {
            arr.push(proc.pid);
          }
        }
        return arr;
      }
      /**
       * Shut down any currently-running child processes.
       */
      async closeChildProcesses(gracefully = true) {
        const procs = [...__classPrivateFieldGet(this, _ProcessPoolManager_procs, "f")];
        __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f").length = 0;
        await Promise.all(procs.map((proc) => proc.end(gracefully, "ending").catch((err) => this.emitter.emit("endError", (0, Error_1.asError)(err), proc))));
      }
      /**
       * Run maintenance on currently spawned child processes.
       * Removes unhealthy processes and enforces maxProcs limit.
       */
      vacuumProcs() {
        __classPrivateFieldGet(this, _ProcessPoolManager_instances, "m", _ProcessPoolManager_maybeCheckPids).call(this);
        const endPromises = [];
        let pidsToReap = Math.max(0, __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f").length - this.options.maxProcs);
        (0, Array_1.filterInPlace)(__classPrivateFieldGet(this, _ProcessPoolManager_procs, "f"), (proc) => {
          var _a;
          if (proc.idle) {
            const why = (_a = proc.whyNotHealthy) !== null && _a !== void 0 ? _a : --pidsToReap >= 0 ? "tooMany" : null;
            if (why != null) {
              endPromises.push(proc.end(true, why));
              return false;
            }
            proc.maybeRunHealthcheck();
          }
          return true;
        });
        return Promise.all(endPromises);
      }
      /**
       * Spawn new processes if needed based on pending task count and capacity
       */
      async maybeSpawnProcs(pendingTaskCount, ended) {
        var _a;
        let procsToSpawn = __classPrivateFieldGet(this, _ProcessPoolManager_instances, "m", _ProcessPoolManager_procsToSpawn).call(this, pendingTaskCount);
        if (ended || __classPrivateFieldGet(this, _ProcessPoolManager_nextSpawnTime, "f") > Date.now() || procsToSpawn === 0) {
          return;
        }
        __classPrivateFieldSet(this, _ProcessPoolManager_nextSpawnTime, Date.now() + __classPrivateFieldGet(this, _ProcessPoolManager_instances, "m", _ProcessPoolManager_maxSpawnDelay).call(this), "f");
        for (let i = 0; i < procsToSpawn; i++) {
          if (ended) {
            break;
          }
          __classPrivateFieldSet(this, _ProcessPoolManager_nextSpawnTime, Date.now() + __classPrivateFieldGet(this, _ProcessPoolManager_instances, "m", _ProcessPoolManager_maxSpawnDelay).call(this), "f");
          __classPrivateFieldSet(this, _ProcessPoolManager_spawnedProcs, (_a = __classPrivateFieldGet(this, _ProcessPoolManager_spawnedProcs, "f"), _a++, _a), "f");
          try {
            const proc = __classPrivateFieldGet(this, _ProcessPoolManager_instances, "m", _ProcessPoolManager_spawnNewProc).call(this);
            const result = await (0, Timeout_1.thenOrTimeout)(proc, this.options.spawnTimeoutMillis);
            if (result === Timeout_1.Timeout) {
              void proc.then((bp) => {
                void bp.end(false, "startError");
                this.emitter.emit("startError", (0, Error_1.asError)("Failed to spawn process in " + this.options.spawnTimeoutMillis + "ms"), bp);
              }).catch((err) => {
                this.emitter.emit("startError", (0, Error_1.asError)(err));
              });
            } else {
              __classPrivateFieldGet(this, _ProcessPoolManager_logger, "f").call(this).debug("ProcessPoolManager.maybeSpawnProcs() started healthy child process", { pid: result.pid });
            }
            procsToSpawn = Math.min(__classPrivateFieldGet(this, _ProcessPoolManager_instances, "m", _ProcessPoolManager_procsToSpawn).call(this, pendingTaskCount), procsToSpawn);
          } catch (err) {
            this.emitter.emit("startError", (0, Error_1.asError)(err));
          }
        }
        const delay = Math.max(100, this.options.minDelayBetweenSpawnMillis);
        __classPrivateFieldSet(this, _ProcessPoolManager_nextSpawnTime, Date.now() + delay, "f");
        node_timers_1.default.setTimeout(this.onIdle, delay).unref();
      }
      /**
       * Update the maximum number of processes allowed
       */
      setMaxProcs(maxProcs) {
        this.options.maxProcs = maxProcs;
      }
    };
    exports2.ProcessPoolManager = ProcessPoolManager;
    _ProcessPoolManager_procs = /* @__PURE__ */ new WeakMap(), _ProcessPoolManager_logger = /* @__PURE__ */ new WeakMap(), _ProcessPoolManager_healthMonitor = /* @__PURE__ */ new WeakMap(), _ProcessPoolManager_nextSpawnTime = /* @__PURE__ */ new WeakMap(), _ProcessPoolManager_lastPidsCheckTime = /* @__PURE__ */ new WeakMap(), _ProcessPoolManager_spawnedProcs = /* @__PURE__ */ new WeakMap(), _ProcessPoolManager_instances = /* @__PURE__ */ new WeakSet(), _ProcessPoolManager_maybeCheckPids = function _ProcessPoolManager_maybeCheckPids2() {
      if (this.options.cleanupChildProcs && this.options.pidCheckIntervalMillis > 0 && __classPrivateFieldGet(this, _ProcessPoolManager_lastPidsCheckTime, "f") + this.options.pidCheckIntervalMillis < Date.now()) {
        __classPrivateFieldSet(this, _ProcessPoolManager_lastPidsCheckTime, Date.now(), "f");
        void this.pids();
      }
    }, _ProcessPoolManager_maxSpawnDelay = function _ProcessPoolManager_maxSpawnDelay2() {
      return Math.max(1e4, this.options.spawnTimeoutMillis);
    }, _ProcessPoolManager_procsToSpawn = function _ProcessPoolManager_procsToSpawn2(pendingTaskCount) {
      const remainingCapacity = this.options.maxProcs - __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f").length;
      const requestedCapacity = pendingTaskCount - this.startingProcCount;
      const atLeast0 = Math.max(0, Math.min(remainingCapacity, requestedCapacity));
      return this.options.minDelayBetweenSpawnMillis === 0 ? (
        // we can spin up multiple processes in parallel.
        atLeast0
      ) : (
        // Don't spin up more than 1:
        Math.min(1, atLeast0)
      );
    }, _ProcessPoolManager_spawnNewProc = // must only be called by this.maybeSpawnProcs()
    async function _ProcessPoolManager_spawnNewProc2() {
      const procOrPromise = this.options.processFactory();
      const proc = await procOrPromise;
      const result = new BatchProcess_1.BatchProcess(proc, this.options, this.onIdle, __classPrivateFieldGet(this, _ProcessPoolManager_healthMonitor, "f"));
      __classPrivateFieldGet(this, _ProcessPoolManager_procs, "f").push(result);
      return result;
    };
  }
});

// node_modules/batch-cluster/dist/ProcpsChecker.js
var require_ProcpsChecker = __commonJS({
  "node_modules/batch-cluster/dist/ProcpsChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProcpsMissingError = void 0;
    exports2.validateProcpsAvailable = validateProcpsAvailable;
    var node_child_process_1 = __importDefault(require("node:child_process"));
    var node_fs_1 = require("node:fs");
    var Platform_1 = require_Platform();
    var ProcpsMissingError = class extends Error {
      constructor(originalError) {
        const message = Platform_1.isWin ? "tasklist command not available" : "ps command not available. Please install procps package (e.g., 'apt-get install procps' on Ubuntu/Debian)";
        super(message);
        this.name = "ProcpsMissingError";
        if (originalError != null) {
          this.originalError = originalError;
        }
      }
    };
    exports2.ProcpsMissingError = ProcpsMissingError;
    function validateProcpsAvailable() {
      if (!Platform_1.isWin && (0, node_fs_1.existsSync)("/proc")) {
        const entries = (0, node_fs_1.readdirSync)("/proc");
        if (entries.some((d) => /^\d+$/.test(d))) {
          return;
        }
      }
      try {
        const command = Platform_1.isWin ? "tasklist" : "ps";
        const args = Platform_1.isWin ? ["/NH", "/FO", "CSV", "/FI", "PID eq 1"] : ["-p", "1"];
        const timeout = Platform_1.isWin ? 15e3 : 5e3;
        node_child_process_1.default.execFileSync(command, args, {
          stdio: "pipe",
          timeout
        });
      } catch (err) {
        throw new ProcpsMissingError(err instanceof Error ? err : void 0);
      }
    }
  }
});

// node_modules/batch-cluster/dist/TaskQueueManager.js
var require_TaskQueueManager = __commonJS({
  "node_modules/batch-cluster/dist/TaskQueueManager.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _TaskQueueManager_tasks;
    var _TaskQueueManager_logger;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TaskQueueManager = void 0;
    var TaskQueueManager = class {
      constructor(logger, emitter) {
        this.emitter = emitter;
        _TaskQueueManager_tasks.set(this, []);
        _TaskQueueManager_logger.set(this, void 0);
        __classPrivateFieldSet(this, _TaskQueueManager_logger, logger, "f");
      }
      /**
       * Add a task to the queue for processing
       */
      enqueueTask(task, ended) {
        if (ended) {
          task.reject(new Error("BatchCluster has ended, cannot enqueue " + task.command));
        } else {
          __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").push(task);
        }
        return task.promise;
      }
      /**
       * Simple enqueue method (alias for enqueueTask without ended check)
       */
      enqueue(task) {
        __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").push(task);
      }
      /**
       * Get the number of pending tasks in the queue
       */
      get pendingTaskCount() {
        return __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").length;
      }
      /**
       * Get all pending tasks (mostly for testing)
       */
      get pendingTasks() {
        return __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f");
      }
      /**
       * Check if the queue is empty
       */
      get isEmpty() {
        return __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").length === 0;
      }
      /**
       * Attempt to assign the next task to a ready process.
       * Returns true if a task was successfully assigned.
       */
      tryAssignNextTask(readyProcess, retries = 1) {
        var _a;
        if (__classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").length === 0 || retries < 0) {
          return false;
        }
        if (readyProcess == null) {
          return false;
        }
        const task = __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").shift();
        if (task == null) {
          (_a = this.emitter) === null || _a === void 0 ? void 0 : _a.emit("internalError", new Error("unexpected null task"));
          return false;
        }
        const submitted = readyProcess.execTask(task);
        if (!submitted) {
          __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").push(task);
          return this.tryAssignNextTask(readyProcess, retries - 1);
        }
        __classPrivateFieldGet(this, _TaskQueueManager_logger, "f").call(this).trace("TaskQueueManager.tryAssignNextTask(): submitted task", {
          child_pid: readyProcess.pid,
          task
        });
        return submitted;
      }
      /**
       * Process all pending tasks by assigning them to ready processes.
       * Returns the number of tasks successfully assigned.
       */
      processQueue(findReadyProcess) {
        let assignedCount = 0;
        while (__classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").length > 0) {
          const readyProcess = findReadyProcess();
          if (!this.tryAssignNextTask(readyProcess)) {
            break;
          }
          assignedCount++;
        }
        return assignedCount;
      }
      /**
       * Clear all pending tasks (used during shutdown)
       */
      clearAllTasks() {
        __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").length = 0;
      }
      /**
       * Get statistics about task assignment and queue state
       */
      getQueueStats() {
        return {
          pendingTaskCount: __classPrivateFieldGet(this, _TaskQueueManager_tasks, "f").length,
          isEmpty: this.isEmpty
        };
      }
    };
    exports2.TaskQueueManager = TaskQueueManager;
    _TaskQueueManager_tasks = /* @__PURE__ */ new WeakMap(), _TaskQueueManager_logger = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/batch-cluster/dist/BatchCluster.js
var require_BatchCluster = __commonJS({
  "node_modules/batch-cluster/dist/BatchCluster.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _BatchCluster_instances;
    var _BatchCluster_logger;
    var _BatchCluster_processPool;
    var _BatchCluster_taskQueue;
    var _BatchCluster_eventCoordinator;
    var _BatchCluster_onIdleRequested;
    var _BatchCluster_onIdleInterval;
    var _BatchCluster_endPromise;
    var _BatchCluster_beforeExitListener;
    var _BatchCluster_exitListener;
    var _BatchCluster_onIdleLater;
    var _BatchCluster_onIdle;
    var _BatchCluster_execNextTask;
    var _BatchCluster_maybeSpawnProcs;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchCluster = exports2.Task = exports2.Rate = exports2.ProcpsMissingError = exports2.pids = exports2.pidExists = exports2.kill = exports2.SimpleParser = exports2.Deferred = exports2.BatchProcess = exports2.BatchClusterOptions = void 0;
    var node_events_1 = __importDefault(require("node:events"));
    var node_process_1 = __importDefault(require("node:process"));
    var node_timers_1 = __importDefault(require("node:timers"));
    var Deferred_1 = require_Deferred();
    var OptionsVerifier_1 = require_OptionsVerifier();
    var BatchClusterEventCoordinator_1 = require_BatchClusterEventCoordinator();
    var ProcessPoolManager_1 = require_ProcessPoolManager();
    var ProcpsChecker_1 = require_ProcpsChecker();
    var TaskQueueManager_1 = require_TaskQueueManager();
    var BatchClusterOptions_1 = require_BatchClusterOptions();
    Object.defineProperty(exports2, "BatchClusterOptions", { enumerable: true, get: function() {
      return BatchClusterOptions_1.BatchClusterOptions;
    } });
    var BatchProcess_1 = require_BatchProcess();
    Object.defineProperty(exports2, "BatchProcess", { enumerable: true, get: function() {
      return BatchProcess_1.BatchProcess;
    } });
    var Deferred_2 = require_Deferred();
    Object.defineProperty(exports2, "Deferred", { enumerable: true, get: function() {
      return Deferred_2.Deferred;
    } });
    __exportStar(require_Logger(), exports2);
    var Parser_1 = require_Parser();
    Object.defineProperty(exports2, "SimpleParser", { enumerable: true, get: function() {
      return Parser_1.SimpleParser;
    } });
    var Pids_1 = require_Pids();
    Object.defineProperty(exports2, "kill", { enumerable: true, get: function() {
      return Pids_1.kill;
    } });
    Object.defineProperty(exports2, "pidExists", { enumerable: true, get: function() {
      return Pids_1.pidExists;
    } });
    Object.defineProperty(exports2, "pids", { enumerable: true, get: function() {
      return Pids_1.pids;
    } });
    var ProcpsChecker_2 = require_ProcpsChecker();
    Object.defineProperty(exports2, "ProcpsMissingError", { enumerable: true, get: function() {
      return ProcpsChecker_2.ProcpsMissingError;
    } });
    var Rate_1 = require_Rate();
    Object.defineProperty(exports2, "Rate", { enumerable: true, get: function() {
      return Rate_1.Rate;
    } });
    var Task_1 = require_Task();
    Object.defineProperty(exports2, "Task", { enumerable: true, get: function() {
      return Task_1.Task;
    } });
    var BatchCluster = class {
      constructor(opts) {
        _BatchCluster_instances.add(this);
        _BatchCluster_logger.set(this, void 0);
        _BatchCluster_processPool.set(this, void 0);
        _BatchCluster_taskQueue.set(this, void 0);
        _BatchCluster_eventCoordinator.set(this, void 0);
        _BatchCluster_onIdleRequested.set(this, false);
        _BatchCluster_onIdleInterval.set(this, void 0);
        _BatchCluster_endPromise.set(this, void 0);
        this.emitter = new node_events_1.default.EventEmitter();
        this.on = this.emitter.on.bind(this.emitter);
        this.off = this.emitter.off.bind(this.emitter);
        _BatchCluster_beforeExitListener.set(this, () => {
          void this.end(true);
        });
        _BatchCluster_exitListener.set(this, () => {
          void this.end(false);
        });
        _BatchCluster_onIdleLater.set(
          this,
          () => {
            if (!__classPrivateFieldGet(this, _BatchCluster_onIdleRequested, "f")) {
              __classPrivateFieldSet(this, _BatchCluster_onIdleRequested, true, "f");
              node_timers_1.default.setTimeout(() => __classPrivateFieldGet(this, _BatchCluster_instances, "m", _BatchCluster_onIdle).call(this), 1);
            }
          }
          // NOT ASYNC: updates internal state:
        );
        (0, ProcpsChecker_1.validateProcpsAvailable)();
        this.options = (0, OptionsVerifier_1.verifyOptions)({ ...opts, observer: this.emitter });
        __classPrivateFieldSet(this, _BatchCluster_logger, this.options.logger, "f");
        __classPrivateFieldSet(this, _BatchCluster_processPool, new ProcessPoolManager_1.ProcessPoolManager(this.options, this.emitter, () => __classPrivateFieldGet(this, _BatchCluster_onIdleLater, "f").call(this)), "f");
        __classPrivateFieldSet(this, _BatchCluster_taskQueue, new TaskQueueManager_1.TaskQueueManager(__classPrivateFieldGet(this, _BatchCluster_logger, "f"), this.emitter), "f");
        __classPrivateFieldSet(this, _BatchCluster_eventCoordinator, new BatchClusterEventCoordinator_1.BatchClusterEventCoordinator(this.emitter, {
          streamFlushMillis: this.options.streamFlushMillis,
          maxReasonableProcessFailuresPerMinute: this.options.maxReasonableProcessFailuresPerMinute,
          logger: __classPrivateFieldGet(this, _BatchCluster_logger, "f")
        }, () => __classPrivateFieldGet(this, _BatchCluster_onIdleLater, "f").call(this), () => void this.end()), "f");
        if (this.options.onIdleIntervalMillis > 0) {
          __classPrivateFieldSet(this, _BatchCluster_onIdleInterval, node_timers_1.default.setInterval(() => __classPrivateFieldGet(this, _BatchCluster_onIdleLater, "f").call(this), this.options.onIdleIntervalMillis), "f");
          __classPrivateFieldGet(this, _BatchCluster_onIdleInterval, "f").unref();
        }
        __classPrivateFieldSet(this, _BatchCluster_logger, this.options.logger, "f");
        node_process_1.default.once("beforeExit", __classPrivateFieldGet(this, _BatchCluster_beforeExitListener, "f"));
        node_process_1.default.once("exit", __classPrivateFieldGet(this, _BatchCluster_exitListener, "f"));
      }
      get ended() {
        return __classPrivateFieldGet(this, _BatchCluster_endPromise, "f") != null;
      }
      /**
       * Shut down this instance, and all child processes.
       * @param gracefully should an attempt be made to finish in-flight tasks, or
       * should we force-kill child PIDs.
       */
      // NOT ASYNC so state transition happens immediately
      end(gracefully = true) {
        __classPrivateFieldGet(this, _BatchCluster_logger, "f").call(this).info("BatchCluster.end()", { gracefully });
        if (__classPrivateFieldGet(this, _BatchCluster_endPromise, "f") == null) {
          this.emitter.emit("beforeEnd");
          if (__classPrivateFieldGet(this, _BatchCluster_onIdleInterval, "f") != null)
            node_timers_1.default.clearInterval(__classPrivateFieldGet(this, _BatchCluster_onIdleInterval, "f"));
          __classPrivateFieldSet(this, _BatchCluster_onIdleInterval, void 0, "f");
          node_process_1.default.removeListener("beforeExit", __classPrivateFieldGet(this, _BatchCluster_beforeExitListener, "f"));
          node_process_1.default.removeListener("exit", __classPrivateFieldGet(this, _BatchCluster_exitListener, "f"));
          __classPrivateFieldSet(this, _BatchCluster_endPromise, new Deferred_1.Deferred().observe(this.closeChildProcesses(gracefully).then(() => {
            this.emitter.emit("end");
          })), "f");
        }
        return __classPrivateFieldGet(this, _BatchCluster_endPromise, "f");
      }
      /**
       * Submits `task` for processing by a `BatchProcess` instance
       *
       * @return a Promise that is resolved or rejected once the task has been
       * attempted on an idle BatchProcess
       */
      enqueueTask(task) {
        if (this.ended) {
          task.reject(new Error("BatchCluster has ended, cannot enqueue " + task.command));
        }
        __classPrivateFieldGet(this, _BatchCluster_taskQueue, "f").enqueue(task);
        __classPrivateFieldGet(this, _BatchCluster_onIdleLater, "f").call(this);
        return task.promise;
      }
      /**
       * @return true if all previously-enqueued tasks have settled
       */
      get isIdle() {
        return this.pendingTaskCount === 0 && this.busyProcCount === 0;
      }
      /**
       * @return the number of pending tasks
       */
      get pendingTaskCount() {
        return __classPrivateFieldGet(this, _BatchCluster_taskQueue, "f").pendingTaskCount;
      }
      /**
       * @returns {number} the mean number of tasks completed by child processes
       */
      get meanTasksPerProc() {
        return __classPrivateFieldGet(this, _BatchCluster_eventCoordinator, "f").meanTasksPerProc;
      }
      /**
       * @return the total number of child processes created by this instance
       */
      get spawnedProcCount() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").spawnedProcCount;
      }
      /**
       * @return the current number of spawned child processes. Some (or all) may be idle.
       */
      get procCount() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").processCount;
      }
      /**
       * @return the current number of child processes currently servicing tasks
       */
      get busyProcCount() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").busyProcCount;
      }
      get startingProcCount() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").startingProcCount;
      }
      /**
       * @return the current pending Tasks (mostly for testing)
       */
      get pendingTasks() {
        return __classPrivateFieldGet(this, _BatchCluster_taskQueue, "f").pendingTasks;
      }
      /**
       * @return the current running Tasks (mostly for testing)
       */
      get currentTasks() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").currentTasks();
      }
      /**
       * For integration tests:
       */
      get internalErrorCount() {
        return __classPrivateFieldGet(this, _BatchCluster_eventCoordinator, "f").internalErrorCount;
      }
      /**
       * Verify that each BatchProcess PID is actually alive.
       *
       * @return the spawned PIDs that are still in the process table.
       */
      pids() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").pids();
      }
      /**
       * For diagnostics. Contents may change.
       */
      stats() {
        var _a;
        return {
          pendingTaskCount: this.pendingTaskCount,
          currentProcCount: this.procCount,
          readyProcCount: __classPrivateFieldGet(this, _BatchCluster_processPool, "f").readyProcCount,
          maxProcCount: this.options.maxProcs,
          internalErrorCount: __classPrivateFieldGet(this, _BatchCluster_eventCoordinator, "f").internalErrorCount,
          startErrorRatePerMinute: __classPrivateFieldGet(this, _BatchCluster_eventCoordinator, "f").startErrorRatePerMinute,
          msBeforeNextSpawn: __classPrivateFieldGet(this, _BatchCluster_processPool, "f").msBeforeNextSpawn,
          spawnedProcCount: this.spawnedProcCount,
          childEndCounts: this.childEndCounts,
          ending: __classPrivateFieldGet(this, _BatchCluster_endPromise, "f") != null,
          ended: false === ((_a = __classPrivateFieldGet(this, _BatchCluster_endPromise, "f")) === null || _a === void 0 ? void 0 : _a.pending)
        };
      }
      /**
       * Get ended process counts (used for tests)
       */
      countEndedChildProcs(why) {
        return __classPrivateFieldGet(this, _BatchCluster_eventCoordinator, "f").countEndedChildProcs(why);
      }
      get childEndCounts() {
        return __classPrivateFieldGet(this, _BatchCluster_eventCoordinator, "f").childEndCounts;
      }
      /**
       * Shut down any currently-running child processes. New child processes will
       * be started automatically to handle new tasks.
       */
      async closeChildProcesses(gracefully = true) {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").closeChildProcesses(gracefully);
      }
      /**
       * Reset the maximum number of active child processes to `maxProcs`. Note that
       * this is handled gracefully: child processes are only reduced as tasks are
       * completed.
       */
      setMaxProcs(maxProcs) {
        __classPrivateFieldGet(this, _BatchCluster_processPool, "f").setMaxProcs(maxProcs);
        __classPrivateFieldGet(this, _BatchCluster_onIdleLater, "f").call(this);
      }
      /**
       * Run maintenance on currently spawned child processes. This method is
       * normally invoked automatically as tasks are enqueued and processed.
       *
       * Only public for tests.
       */
      // NOT ASYNC: updates internal state. only exported for tests.
      vacuumProcs() {
        return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").vacuumProcs();
      }
    };
    exports2.BatchCluster = BatchCluster;
    _BatchCluster_logger = /* @__PURE__ */ new WeakMap(), _BatchCluster_processPool = /* @__PURE__ */ new WeakMap(), _BatchCluster_taskQueue = /* @__PURE__ */ new WeakMap(), _BatchCluster_eventCoordinator = /* @__PURE__ */ new WeakMap(), _BatchCluster_onIdleRequested = /* @__PURE__ */ new WeakMap(), _BatchCluster_onIdleInterval = /* @__PURE__ */ new WeakMap(), _BatchCluster_endPromise = /* @__PURE__ */ new WeakMap(), _BatchCluster_beforeExitListener = /* @__PURE__ */ new WeakMap(), _BatchCluster_exitListener = /* @__PURE__ */ new WeakMap(), _BatchCluster_onIdleLater = /* @__PURE__ */ new WeakMap(), _BatchCluster_instances = /* @__PURE__ */ new WeakSet(), _BatchCluster_onIdle = function _BatchCluster_onIdle2() {
      __classPrivateFieldSet(this, _BatchCluster_onIdleRequested, false, "f");
      void this.vacuumProcs();
      while (__classPrivateFieldGet(this, _BatchCluster_instances, "m", _BatchCluster_execNextTask).call(this)) {
      }
      void __classPrivateFieldGet(this, _BatchCluster_instances, "m", _BatchCluster_maybeSpawnProcs).call(this);
    }, _BatchCluster_execNextTask = function _BatchCluster_execNextTask2(retries = 1) {
      if (this.ended)
        return false;
      const readyProc = __classPrivateFieldGet(this, _BatchCluster_processPool, "f").findReadyProcess();
      return __classPrivateFieldGet(this, _BatchCluster_taskQueue, "f").tryAssignNextTask(readyProc, retries);
    }, _BatchCluster_maybeSpawnProcs = async function _BatchCluster_maybeSpawnProcs2() {
      return __classPrivateFieldGet(this, _BatchCluster_processPool, "f").maybeSpawnProcs(__classPrivateFieldGet(this, _BatchCluster_taskQueue, "f").pendingTaskCount, this.ended);
    };
  }
});

// node_modules/exiftool-vendored/dist/Object.js
var require_Object2 = __commonJS({
  "node_modules/exiftool-vendored/dist/Object.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isObject = isObject;
    exports2.keys = keys;
    exports2.isFunction = isFunction;
    exports2.fromEntries = fromEntries;
    exports2.omit = omit;
    exports2.keysOf = keysOf;
    function isObject(obj) {
      return typeof obj === "object" && obj !== null;
    }
    function keys(o) {
      return o == null ? [] : Object.keys(o).filter((ea) => ({}).propertyIsEnumerable.call(o, ea));
    }
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function fromEntries(pairs, base = {}) {
      if (pairs == null || pairs.length === 0)
        return base ?? {};
      for (const pair of pairs) {
        if (pair?.[0] != null && pair[1] !== void 0) {
          base[pair[0]] = pair[1];
        }
      }
      return base;
    }
    function omit(t, ...keysToOmit) {
      const result = {};
      for (const k of keys(t).filter((ea) => !keysToOmit.includes(ea))) {
        result[k] = t[k];
      }
      return result;
    }
    function keysOf(t) {
      return Object.keys(t);
    }
  }
});

// node_modules/exiftool-vendored/dist/Number.js
var require_Number = __commonJS({
  "node_modules/exiftool-vendored/dist/Number.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isNumber = isNumber;
    exports2.isInteger = isInteger;
    exports2.isFloat = isFloat;
    exports2.toFloat = toFloat;
    exports2.toInt = toInt;
    exports2.roundToDecimalPlaces = roundToDecimalPlaces;
    function isNumber(n) {
      return typeof n === "number" && isFinite(n);
    }
    function isInteger(n) {
      return isNumber(n) && Number.isInteger(n);
    }
    function isFloat(n) {
      return isNumber(n) && !Number.isInteger(n);
    }
    function toFloat(n) {
      if (n == null)
        return;
      if (isNumber(n))
        return n;
      try {
        const f = parseFloat(String(n).trim());
        return isNumber(f) ? f : void 0;
      } catch {
        return void 0;
      }
    }
    function toInt(n) {
      if (n == null)
        return;
      if (isNumber(n)) {
        return Math.floor(n);
      }
      try {
        return parseInt(String(n).trim());
      } catch {
        return void 0;
      }
    }
    function roundToDecimalPlaces(value, precision) {
      if (!isNumber(value))
        throw new Error("Value must be a number");
      if (precision < 0)
        throw new Error("Precision must be non-negative");
      if (value === 0)
        return 0;
      const multiplier = Math.pow(10, precision);
      return Math.abs(value) < Number.EPSILON ? 0 : Math.round(value * multiplier) / multiplier;
    }
  }
});

// node_modules/exiftool-vendored/dist/String.js
var require_String2 = __commonJS({
  "node_modules/exiftool-vendored/dist/String.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isString = isString;
    exports2.blank = blank;
    exports2.notBlank = notBlank;
    exports2.notBlankString = notBlankString;
    exports2.toNotBlank = toNotBlank;
    exports2.compactBlanks = compactBlanks;
    exports2.toS = toS;
    exports2.leftPad = leftPad;
    exports2.pad2 = pad2;
    exports2.pad3 = pad3;
    exports2.stripPrefix = stripPrefix;
    exports2.stripSuffix = stripSuffix;
    exports2.splitLines = splitLines;
    var Number_1 = require_Number();
    function isString(o) {
      return typeof o === "string";
    }
    function blank(s) {
      return s == null || String(s).trim().length === 0;
    }
    function notBlank(s) {
      return !blank(s);
    }
    function notBlankString(s) {
      return isString(s) && s.trim().length > 0;
    }
    function toNotBlank(s) {
      if (s == null)
        return;
      s = String(s).trim();
      return s.length === 0 ? void 0 : s;
    }
    function compactBlanks(arr) {
      return arr.filter(notBlank);
    }
    function padding(padChar, count) {
      return count <= 0 ? "" : padChar.repeat(count);
    }
    function toS(s) {
      return s == null ? "" : String(s);
    }
    function leftPad(i, minLen, padChar) {
      if (i == null || (0, Number_1.isNumber)(i) && isNaN(i))
        i = 0;
      const s = String(i);
      if ((0, Number_1.isNumber)(i) && i < 0 && padChar === "0") {
        return "-" + padding(padChar, minLen - s.length) + Math.abs(i);
      } else {
        return padding(padChar, minLen - s.length) + s;
      }
    }
    function pad2(...numbers) {
      return numbers.map((i) => leftPad(i, 2, "0"));
    }
    function pad3(...numbers) {
      return numbers.map((i) => leftPad(i, 3, "0"));
    }
    function stripPrefix(s, prefix) {
      return toS(s).toLowerCase().startsWith(prefix.toLowerCase()) ? s.slice(prefix.length) : s;
    }
    function stripSuffix(s, suffix) {
      const str = toS(s);
      return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
    }
    function splitLines(...arr) {
      return arr.join("\n").split(/\r?\n/).map((ea) => ea.trim()).filter((ea) => ea.length > 0);
    }
  }
});

// node_modules/exiftool-vendored/dist/Array.js
var require_Array2 = __commonJS({
  "node_modules/exiftool-vendored/dist/Array.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isIterable = isIterable;
    exports2.ifArray = ifArray;
    exports2.toArray = toArray;
    exports2.compact = compact;
    exports2.filterInPlace = filterInPlace;
    exports2.uniq = uniq;
    exports2.shallowArrayEql = shallowArrayEql;
    exports2.sortBy = sortBy;
    exports2.leastBy = leastBy;
    var Object_1 = require_Object2();
    var String_1 = require_String2();
    function isIterable(obj) {
      return (0, Object_1.isObject)(obj) && Symbol.iterator in obj || Array.isArray(obj);
    }
    function ifArray(arr) {
      return Array.isArray(arr) ? arr : void 0;
    }
    function toArray(arr) {
      return Array.isArray(arr) ? arr : arr == null ? [] : (0, String_1.isString)(arr) ? [arr] : isIterable(arr) ? Array.from(arr) : [arr];
    }
    function compact(array) {
      return array.filter((elem) => elem != null);
    }
    function filterInPlace(arr, filter) {
      let j = 0;
      arr.forEach((ea, i) => {
        if (filter(ea)) {
          if (i !== j)
            arr[j] = ea;
          j++;
        }
      });
      arr.length = j;
      return arr;
    }
    function uniq(arr) {
      return arr.reduce((acc, ea) => {
        if (acc.indexOf(ea) === -1)
          acc.push(ea);
        return acc;
      }, []);
    }
    function shallowArrayEql(a, b) {
      return a != null && b != null && a.length === b.length && a.every((ea, idx) => ea === b[idx]);
    }
    function sortBy(arr, f) {
      return toArray(arr).filter((ea) => ea != null).map((item) => ({
        item,
        cmp: f(item)
      })).filter((ea) => ea.cmp != null).sort((a, b) => cmp(a.cmp, b.cmp)).map((ea) => ea.item);
    }
    function cmp(a, b) {
      if (a == null && b == null)
        return 0;
      if (a == null)
        return -1;
      if (b == null)
        return 1;
      const aType = typeof a;
      const bType = typeof b;
      if ((aType === "string" || aType === "symbol") && (bType === "string" || bType === "symbol")) {
        return String(a).localeCompare(String(b));
      }
      return a > b ? 1 : a < b ? -1 : 0;
    }
    function leastBy(haystack, f) {
      let min;
      let result;
      for (const ea of haystack) {
        const val = f(ea);
        if (val != null && (min == null || val < min)) {
          min = val;
          result = ea;
        }
      }
      return result;
    }
  }
});

// node_modules/exiftool-vendored/dist/AsyncRetry.js
var require_AsyncRetry = __commonJS({
  "node_modules/exiftool-vendored/dist/AsyncRetry.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.retryOnReject = retryOnReject;
    function retryOnReject(f, maxRetries) {
      let retries = 0;
      const g = async () => {
        try {
          return await f();
        } catch (err) {
          if (retries < maxRetries) {
            retries++;
            return g();
          } else {
            throw err;
          }
        }
      };
      return g();
    }
  }
});

// node_modules/exiftool-vendored/dist/IsWarning.js
var require_IsWarning = __commonJS({
  "node_modules/exiftool-vendored/dist/IsWarning.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isWarning = isWarning;
    var String_1 = require_String2();
    var WarningRE = /\bwarning: |\bnothing to (?:write|do)\b/i;
    function isWarning(err) {
      if (err == null)
        return true;
      const msg = (err instanceof Error ? err.message : (0, String_1.toS)(err)).trim();
      return (0, String_1.blank)(msg) || WarningRE.test(msg);
    }
  }
});

// node_modules/exiftool-vendored/dist/ExifToolTask.js
var require_ExifToolTask = __commonJS({
  "node_modules/exiftool-vendored/dist/ExifToolTask.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExifToolTask = void 0;
    var bc = __importStar(require_BatchCluster());
    var IsWarning_1 = require_IsWarning();
    var String_1 = require_String2();
    var BadPerlInstallationRE = /Can't locate \S+ in @INC/i;
    var ExifToolTask = class _ExifToolTask extends bc.Task {
      args;
      options;
      static renderCommand(args, options) {
        const result = args.filter((ea) => !(0, String_1.blank)(ea));
        if (options?.ignoreMinorErrors === true) {
          result.push("-ignoreMinorErrors");
        }
        result.push("-execute");
        return result.join("\n") + "\n";
      }
      errors = [];
      warnings = [];
      constructor(args, options) {
        super(_ExifToolTask.renderCommand(args, options), (stdout, stderr, passed) => this.#parser(stdout, stderr, passed));
        this.args = args;
        this.options = options;
      }
      onStderr(buf) {
        if (BadPerlInstallationRE.test(buf.toString())) {
          throw new Error(buf.toString());
        }
        super.onStderr(buf);
      }
      #parser(stdout, stderr, passed) {
        let error;
        if ((0, String_1.notBlank)(stderr) || !passed) {
          for (const line of (0, String_1.splitLines)(stderr ?? "")) {
            if ((0, IsWarning_1.isWarning)(line)) {
              this.warnings.push(line);
            } else if (/error|warning/i.test(line)) {
              this.errors.push(line);
              error ??= new Error(line.replace(/^error: /i, ""));
            }
          }
        }
        return this.parse(stdout, error);
      }
    };
    exports2.ExifToolTask = ExifToolTask;
  }
});

// node_modules/exiftool-vendored/dist/ErrorsAndWarnings.js
var require_ErrorsAndWarnings = __commonJS({
  "node_modules/exiftool-vendored/dist/ErrorsAndWarnings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.errorsAndWarnings = errorsAndWarnings;
    exports2.toError = toError;
    var Array_1 = require_Array2();
    var String_1 = require_String2();
    function errorsAndWarnings(task, t) {
      return {
        errors: (0, Array_1.uniq)((0, String_1.compactBlanks)([t?.Error, ...task.errors])),
        warnings: (0, Array_1.uniq)((0, String_1.compactBlanks)([t?.Warning, ...task.warnings]))
      };
    }
    function toError(e, messageIfBlank = "Unknown error") {
      return e instanceof Error ? e : new Error((0, String_1.toNotBlank)((0, String_1.toS)(e)) ?? messageIfBlank);
    }
  }
});

// node_modules/exiftool-vendored/dist/Lazy.js
var require_Lazy = __commonJS({
  "node_modules/exiftool-vendored/dist/Lazy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.lazy = lazy;
    var ErrorsAndWarnings_1 = require_ErrorsAndWarnings();
    function lazy(thunk) {
      let invoked = false;
      let result;
      let error;
      return () => {
        if (!invoked) {
          try {
            invoked = true;
            result = thunk();
          } catch (e) {
            error = (0, ErrorsAndWarnings_1.toError)(e);
            throw e;
          }
        }
        if (error != null)
          throw error;
        return result;
      };
    }
  }
});

// node_modules/exiftool-vendored/dist/IsWin32.js
var require_IsWin32 = __commonJS({
  "node_modules/exiftool-vendored/dist/IsWin32.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isWin32 = void 0;
    var _os = __importStar(require("node:os"));
    var Lazy_1 = require_Lazy();
    exports2.isWin32 = (0, Lazy_1.lazy)(() => _os.platform() === "win32");
  }
});

// node_modules/exiftool-vendored/dist/FilenameCharsetArgs.js
var require_FilenameCharsetArgs = __commonJS({
  "node_modules/exiftool-vendored/dist/FilenameCharsetArgs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Utf8FilenameCharsetArgs = void 0;
    var IsWin32_1 = require_IsWin32();
    exports2.Utf8FilenameCharsetArgs = (0, IsWin32_1.isWin32)() ? ["-charset", "filename=utf8"] : [];
  }
});

// node_modules/exiftool-vendored/dist/BinaryExtractionTask.js
var require_BinaryExtractionTask = __commonJS({
  "node_modules/exiftool-vendored/dist/BinaryExtractionTask.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BinaryExtractionTask = void 0;
    var node_fs_1 = require("node:fs");
    var node_path_1 = __importDefault(require("node:path"));
    var ExifToolTask_1 = require_ExifToolTask();
    var FilenameCharsetArgs_1 = require_FilenameCharsetArgs();
    var String_1 = require_String2();
    var StdoutRe = /\b(\d+) output files? created/i;
    var BinaryExtractionTask = class _BinaryExtractionTask extends ExifToolTask_1.ExifToolTask {
      constructor(args, options) {
        super(args, options);
      }
      static for(tagname, imgSrc, imgDest, options) {
        (0, node_fs_1.mkdirSync)(node_path_1.default.dirname(imgDest), { recursive: true });
        const forceWrite = options?.forceWrite ?? false;
        const args = [
          ...FilenameCharsetArgs_1.Utf8FilenameCharsetArgs,
          "-b",
          // -binary
          "-" + tagname,
          // Capital W allows destination files to not have a pattern. See
          // https://exiftool.org/exiftool_pod.html#W-FMT--tagOut
          //
          // Prior code used -w with %0f "to avoid shell expansion", but as this
          // command gets sent directly to exiftool thanks to stay_open mode, we
          // don't need to worry about shell expansion.
          //
          // I also tried `-out` instead of `-W`, and that didn't work at least on
          // ExifTool 13.17.
          forceWrite ? "-W!" : "-W",
          node_path_1.default.resolve(imgDest),
          node_path_1.default.resolve(imgSrc)
        ];
        return new _BinaryExtractionTask(args, options);
      }
      parse(stdout, err) {
        const s = (0, String_1.toS)(stdout).trim();
        const m = StdoutRe.exec(s);
        if (err != null) {
          throw err;
        } else if (m == null) {
          throw new Error("Missing expected status message (got " + stdout + ")");
        } else if (m[1] === "1") {
          return;
        } else {
          return s;
        }
      }
    };
    exports2.BinaryExtractionTask = BinaryExtractionTask;
  }
});

// node_modules/exiftool-vendored/dist/BinaryToBufferTask.js
var require_BinaryToBufferTask = __commonJS({
  "node_modules/exiftool-vendored/dist/BinaryToBufferTask.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BinaryToBufferTask = void 0;
    var node_path_1 = __importDefault(require("node:path"));
    var ExifToolTask_1 = require_ExifToolTask();
    var FilenameCharsetArgs_1 = require_FilenameCharsetArgs();
    var String_1 = require_String2();
    var BinaryToBufferTask = class _BinaryToBufferTask extends ExifToolTask_1.ExifToolTask {
      tagname;
      constructor(tagname, args, options) {
        super(args, options);
        this.tagname = tagname;
      }
      static for(tagname, imgSrc, options) {
        const args = [...FilenameCharsetArgs_1.Utf8FilenameCharsetArgs, "-json", "-b", "-" + tagname];
        args.push(node_path_1.default.resolve(imgSrc));
        return new _BinaryToBufferTask(tagname, args, options);
      }
      parse(data, err) {
        try {
          const obj = JSON.parse(data)?.[0];
          {
            const result = decode(obj[this.tagname]);
            if (result != null)
              return result;
          }
          for (const k of Object.keys(obj)) {
            if (k.toLowerCase() === this.tagname.toLowerCase()) {
              const result = decode(obj[k]);
              if (result != null)
                return result;
            }
          }
        } catch (caught) {
          err ??= (0, String_1.notBlank)(data) ? new Error(data) : caught instanceof Error ? caught : new Error(String(caught));
        }
        return err ?? new Error(this.tagname + " not found");
      }
    };
    exports2.BinaryToBufferTask = BinaryToBufferTask;
    var B64Prefix = "base64:";
    function decode(data) {
      return !data?.startsWith(B64Prefix) ? void 0 : Buffer.from(data.substring(B64Prefix.length), "base64");
    }
  }
});

// node_modules/exiftool-vendored/dist/Boolean.js
var require_Boolean = __commonJS({
  "node_modules/exiftool-vendored/dist/Boolean.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toBoolean = toBoolean;
    var Truthy = ["true", "yes", "1", "on"];
    var Falsy = ["false", "no", "0", "off"];
    function toBoolean(value) {
      if (value == null)
        return void 0;
      if (typeof value === "boolean")
        return value;
      const s = String(value).trim().toLowerCase();
      return Truthy.includes(s) ? true : Falsy.includes(s) ? false : void 0;
    }
  }
});

// node_modules/exiftool-vendored/dist/CapturedAtTagNames.js
var require_CapturedAtTagNames = __commonJS({
  "node_modules/exiftool-vendored/dist/CapturedAtTagNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CapturedAtTagNames = void 0;
    exports2.CapturedAtTagNames = [
      "SubSecDateTimeOriginal",
      "SubSecCreateDate",
      "SubSecMediaCreateDate",
      "DateTimeOriginal",
      "CreateDate",
      "MediaCreateDate",
      "CreationDate",
      // < Found in some transcoded Apple movies
      "DateTimeCreated",
      "TimeCreated"
      // < may not have the date
    ];
  }
});

// node_modules/exiftool-vendored/dist/DefaultExiftoolArgs.js
var require_DefaultExiftoolArgs = __commonJS({
  "node_modules/exiftool-vendored/dist/DefaultExiftoolArgs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DefaultExiftoolArgs = void 0;
    exports2.DefaultExiftoolArgs = ["-stay_open", "True", "-@", "-"];
  }
});

// node_modules/exiftool-vendored/dist/DefaultMaxProcs.js
var require_DefaultMaxProcs = __commonJS({
  "node_modules/exiftool-vendored/dist/DefaultMaxProcs.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DefaultMaxProcs = void 0;
    var _os = __importStar(require("node:os"));
    var Object_1 = require_Object2();
    function maxCpus() {
      return Math.max(1, (0, Object_1.isFunction)(_os.availableParallelism) ? _os.availableParallelism() : _os.cpus().length);
    }
    exports2.DefaultMaxProcs = Math.ceil(maxCpus() / 4);
  }
});

// node_modules/exiftool-vendored/dist/Which.js
var require_Which = __commonJS({
  "node_modules/exiftool-vendored/dist/Which.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.which = which;
    var node_fs_1 = require("node:fs");
    var promises_1 = require("node:fs/promises");
    var node_path_1 = require("node:path");
    var node_process_1 = require("node:process");
    var IsWin32_1 = require_IsWin32();
    var String_1 = require_String2();
    async function which(binaryOrPath) {
      if ((0, node_path_1.isAbsolute)(binaryOrPath) && await canRX(binaryOrPath)) {
        return binaryOrPath;
      }
      const base = (0, node_path_1.basename)(binaryOrPath);
      for (const dir of (0, String_1.toS)(node_process_1.env.PATH).split(node_path_1.delimiter)) {
        const fullPath = (0, node_path_1.join)(dir, base);
        if (await canRX(fullPath)) {
          return fullPath;
        }
      }
      return;
    }
    async function canRX(fullpath) {
      if ((0, IsWin32_1.isWin32)())
        return (0, node_fs_1.existsSync)(fullpath);
      try {
        await (0, promises_1.access)(fullpath, node_fs_1.constants.R_OK | node_fs_1.constants.X_OK);
        return true;
      } catch {
        return false;
      }
    }
  }
});

// node_modules/exiftool-vendored/dist/ExiftoolPath.js
var require_ExiftoolPath = __commonJS({
  "node_modules/exiftool-vendored/dist/ExiftoolPath.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exiftoolPath = exiftoolPath;
    var _fs = __importStar(require("node:fs"));
    var _path = __importStar(require("node:path"));
    var IsWin32_1 = require_IsWin32();
    var Which_1 = require_Which();
    function vendorPackage() {
      return "exiftool-vendored." + ((0, IsWin32_1.isWin32)() ? "exe" : "pl");
    }
    async function tryImport({ prefix = "", logger } = {}) {
      const id = prefix + vendorPackage();
      try {
        const module3 = await Promise.resolve(`${id}`).then((s) => __importStar(require(s)));
        return module3.default ?? module3;
      } catch (error) {
        logger?.warn(id + " not found: ", error);
        return;
      }
    }
    async function exiftoolPath(logger) {
      const path2 = await tryImport({ prefix: "", logger });
      const asarUnpackedPath = path2?.split(_path.sep).map((ea) => ea === "app.asar" ? "app.asar.unpacked" : ea).join(_path.sep);
      if (asarUnpackedPath != null && _fs.existsSync(asarUnpackedPath)) {
        return asarUnpackedPath;
      }
      if (path2 != null && _fs.existsSync(path2)) {
        return path2;
      }
      logger?.warn("Failed to find exiftool via " + vendorPackage());
      const electronResourcePath = process.resourcesPath;
      if (electronResourcePath != null) {
        const forgePath = _path.join(electronResourcePath, vendorPackage(), "bin", "exiftool" + ((0, IsWin32_1.isWin32)() ? ".exe" : ""));
        if (_fs.existsSync(forgePath)) {
          return forgePath;
        } else {
          logger?.warn("Failed to find exiftool in electron forge resources path: " + forgePath);
        }
      }
      const fromPath = await (0, Which_1.which)("exiftool");
      if (fromPath != null) {
        return fromPath;
      }
      throw new Error(`Failed to find ExifTool installation: set exiftoolPath explicitly.`);
    }
  }
});

// node_modules/@photostructure/tz-lookup/tz.js
var require_tz = __commonJS({
  "node_modules/@photostructure/tz-lookup/tz.js"(exports2, module2) {
    function tzlookup(Y, W) {
      var X = "XKXJXJXIXIXSXSXRXRXQXQXP##U;U;U;#$UZUZUZUZUZXHXGXGXTXTXXXXXYXYXZXZY#Y#Y$Y$Y%Y%Y&Y&Y'Y'XUXUXVXVXWXKXJXJXIXIXSXSU:U$#%#&V,#'U;#(#)UZUZUZUZUZ#*UZXGXGVPVPVP#+YIYIYIYI#,W@W@W@W@W@W@Y&X/X/X/X/X/XVXWVTUV#-T,T,#.U:U:#/#0#1#2#3U;U;U;UZUZUZUZ#4#5YJYJXGYJ#6#7#8YIYIYI#9X1#:W@W@W@#;X/X/#<#=#>#?#@VTVT#A#B#CT,T,#D#E#F#G#H#IV,#J#K#L#MUZUZUZUZX9X9#N#OYJ#P#Q#R#SYI#T#U#VX1#W#XW@W@#Y#ZX/$#$$$%$&$'$($)$*$+$,T,T,$-$.$/U$$0$1$2$3$4$5$6$7UZUZXLXLXH$8$9$:$;$<$=$>YI$?$@$A$B$C$D$E$FW6$G$H$I$J$K$LW;$MT+T+T+XJXIXIXSVB$N$O$P$Q$R$S$T$U$V$WV7XMXLXLXHY6$X$Y$Z%#%$%%%&%'%(%)VR%*%+%,%-%.%/%0%1%2%3%4W;XVT+XKXJXJXIXIXSXSUC%5%6%7TN%8%9%:%;U0XMXMX3X3XH%<%=%>%?%@%A%B%C%D%E%F%G%HX+%I%J%KWX%L%M%N%OXUXVXVXWXKXJXJXIXIXSXSUC%P%Q%RTN%SUUXOX4XNXMXMXLX3X8%T%US2%V%W%X%Y%Z&#&$&%&&&'WXWXWXWXWX&(&)X(XUXUXVXVXW&*ZCZCXIXIXSXSXR&+&,&-&.&/&0UTXNXNXMXMXLXL&1&2&3S2&4T(&5&6WT&7&8&9&:&;&<&=&>&?&@&AX(X(XUX(XVXVXWXKZCZCZCXIXSXSXRUK&B&C&D&E&F&G&HXNXMXMXLX6&I&J&K&L&M&N&O&P&Q&R&SWHW?W?&T&U&V&W&X&YY'X(ZUXUXVZYXWXKXJXJXIXIXSXSXRXRXQXQ&Z'#'$'%'&''XMXMXLX6'(')'*'+','-'.'/'0'1VQXZW?'2Y$'3'4'5'6WGZPZ9'7'8ZH'9XWXKXJZEZEXIXSXSXRXRXQXQZ?':';'<'='>'?XMXLUWXH'@'A'B'C'D'E'F'G'HXZXZZ1W*Y$'I'J'K'L'M'NW8Z9'O'P'QZWZDZDXJZEXIXSXSXRXRXQXQZ?'R'S'TUG'U'V'W'XXLXHXHXGSS'Y'Z(#($(%XYZ0XZ(&Y#Y$Y$W7('((()W8(*ZS(+ZA(,(-(.(/ZTZE(0(1XSXRXRXQXQXPUBUB(2(3(4(5(6(7XLXHX;XGXGSP(8(9(:(;(<Z2XZY#Y#Y$Z-Y%(=(>(?(@(A(B(CZA(D(E(FZLZT(GZV(HXSXRXRXQXQXPXPUB(I(J(K(L(MXLV3XHXHX;XG(N(O(P(Q(RZ*(SZ2Y#Y#Y$Y$Y%Y%XEXE(T(UX>X>ZN(VZ=(WXJXJZVZVZ@(XZQXRZ:XQXPXPV1(Y(Z)#V3V3XLXLXHXHXGXGT*)$)%)&Z*Z*XZXZY#Y#Y$Y$Y%Y%XEXE)')()))*XV)+XWZ6XJXJXIXIXSXSXRXRXQXQXPXPV1),)-).V3XMXLXLXHX;XGXGXTSG)/SGXYXYXZXZY#Y#Y$Y$Y%Y%XE)0)1)2)3XFXCZ6Z6Z8XJXJXIXIXSXSXRXRXQXQXPXPTR)4)5T0XMXMXLXLXHX;XGXGXTXTXXXXXYXYXZXZY#Z/Y$Y$Y%Y%Y&Y&Y')6)7XDXVZ6Z6XKXJXJXIXIXSXSXRXRXQXQXPXP)8)9):X<XMXMXLXLXHXHXGXGXTXTXXSGSGZ/Z/XZZ/Y#Y$Y$Y%Y%Y&Y&Y'Y'XUXUXVZ6Z6XKXJXJXIXIXSXSXRXRXQXQXPXPV+);)<X<XMX:X:X:XHXHXGXGXTXTXXXXXYXYXZXZY#Y#Y$Y$Y%Y%Y&Y&Y'Y'XUXUVIZ6XWXKXJXJXIXIXSXSXRXRXQXQXPXPVLVL)=)>T;T;XLXLXHXHXGXGXTXTVMVMVMVM)?VJVJVG)@VOVFVFVFVHVHVHVHVH)AVKXWXKXJXJXIXIXSXSXRXRXQXQXPXPVLVLT;T;T;T;)BVL)CY()DVNVNVN)EVMVMVM)FVJVJ)G)HVO)I)J)K)L)M)N)O)P)QVKVKVKVKVKVKXIXSXSXRXRXQXQXPXPVLVLT;T;T;T;)RVL)SY()TVNVNVN)UVMVMVM)VVJVJ)W)XVOVOVO)YXEXEXEXEXE)ZVKVKVKVKVKVKVKVKVKVKVKVKVKVKVK*#*$*%*&*'*(*)***+*,*-*.*/*0*1*2*3*4*5*6*7*8*9*:*;*<*=*>*?*@*A*B*CVKVKXPXPV,*CXNXNU;UZ*BTH*CTHTHV,THV,V,*BV,*CU;*CV>V>*CUZ*DUZUZUZTV*DVP*DVPXXY#W@YIY#XJT,UVT,XSXS*B*CU$U$*C*D*DTH*ETHTH*ETHTH*EV,THTHV,*E*F*GUZ*GUZ*HUZUZV4XHVPVPYJ*GYJYJ*G*HXXXX*HYIYIX1YI*H*HW@X1*IW@*I*J*KX/*KX/*L*L*MX.*N*N*OWZWZ*OWZWZWZXVXVWZ*OVTVTVTUV*NUVUVUVUVT,UVT,*MVC*NVC*NU:VC*OU:U:*OU:U$*OU$U$*O*PU$U$THV,U$V,V,*OV,*P*PU;*Q*RU;U;*RU;U;U;U;*RX9XHXHX7XGXGX7YBYJ*PYJ*QYWYWYW*Q*QY9Y9*R*RYIYIYIYIYI*RYIYIYI*R*S*S*TX1X1X1X1*T*U*UW@*VW@*VX/*W*XX/X/*XX/X/*XX/*Y*Y*ZW>+#+#WZ+$WE+$+%WEWE+%+&WE+'VTVTW;+'VTVT+'VTXKUVXKT+UVUVT+UV+%T,UVT,VE+%XSV5+%VB+&VB+&+'VB+(+(V.+)+*V.VD+*VDVD+*VDVDV,+*V@++U;++U;V@V@++V@V@++U*+,U*XNXNU*V7YBYBXH++YBYB++YBXGYJYB+++++,+-+.YW+.+/+0+0+1+2+3YIYI+3YI+3+4+5+6+6X1+7X1X1X1+7+8X1+8+9+:+:+;+<+=+=+>+?+@W@W@W@+@+@+AW6W6W6+A+BW)X/X/+B+CX/+CX/X.X.X.X.+CX.WEWUXUWE+BXUW;W;W;W;T+VB+A+B+C+C+D+E+F+F+GTYTYV.VD+G+HVDVDTN+HV@V@+H+I+IV@V@V@V@V@V@+IV@+I+J+K+KV7+LV7+L+MYKYK+M+NYK+O+O+P+Q+R+R+S+T+U+U+V+W+X+X+Y+Z,#,#,$,%,&,&,',(,),),*,+VV,+,,,-,.VR,.VRVR,.,/,0X+,0,1,2X*X*,2X*X*,2,3X*X*,3,4X*,5,5,6WXWX,6,7,8,9X.,9X.,:WUXUWUWEWZ,9,:WZ,:,;UC,<,<TYTYTYTY,<TYTN,<,=,>,?,?,@UUUU,@UUUUUU,@U0XNXNXH,@XHY@,@,A,BYD,B,CYDYD,C,DYOYO,D,EYO,F,F,G,H,I,I,JY;Y;,J,KY;,L,L,M,N,O,O,PVW,Q,Q,R,S,T,T,U,V,W,W,X,YX+X+,YWXWX,Y,ZWXWX,Z-#WXWXWX-#WX-$-$X.-%Y'X.X(X(X(-$WEXUXUUC-$-%-&-&TY-'-(-(TN-)TNTN-)TN-*XH-*XHS<-*-+S<-,-,---.-/YOY,T(T(Y,-.-/S;-/-0S;-1-1-2-3-4-4X&-5X&X&-5X&X&-5-6-7-8-8-9-:-;-;-<-=->WXWWWXWW-=X(X(X(ZJZCXKZCV?-<XRUK-<-=UK->->-?-@-ATNTN-AUMTN-AUM-B-BUT-CUTXHX5XHSC-B-C-DT$S2S2-D-E-ET(-F-G-GS;-HS;S;-HS;-I-I-JWT-KX&-K-L-M-MW<-NW<-N-O-PW?W?-PW?W?-P-QW?-R-R-S-T-U-UWX-V-WWXWX-WWXWXWX-W-XWXX(-XX(UK-XUKXQ-X-YUNUNUNUMUN-Y-YU1-ZV=-Z.#.$.%.%V2.&.'VAT-.'.(XH.(X6.).)T$.*T$.*S4.+S4.+.,S4T#.,T#T#T#SZ.,SZSZ.,SJ.-SJ.-SJSJ....WT./.0WTWT.0VQ.0WH.1WHW?.1W?Y$.1X0X0X0.1.2.3.4.4WX.5.6.6X#WX.7.7Y&WGY&XP.7XPXP.7UFXPTQTFTFV$.7TF.7.8TKTK.8TK.9TAXNU/XNXH.8XHS7.8.9.:.;.;.<.=.>.>.?.@SM.@.ASM.B.BSZ.C.DSJSJ.D.ESJ.E.FS1.F.GS1.H.H.ISWSWW?W?W?.IW?.IW?.J.J.K.L.M.MW3W3W3.M.N.OWGZBXUZ9Z9XUXUZ9ZRZHZH.MZHTQV$Z?XP.LTF.MTFTF.MTF.NTK.N.O.P.P.Q.R.S.SXMTBTBSD.SXHXHS/.SXGXG.SSMXGT'.SSB.T.U.U.V.WSL.W.X.Y.ZSH.Z/#/$S1/$SYSW/$SWSWXYW?W7Y$W7/#/$W7/%W7W7W7/%/%/&/'WFWG/'WF/(ZPZP/(/)Z9ZRXUZRZRZFXVXVZHZHXVZWZ?UBXPUB/%/&/'UB/'/(/)/*/*V0/+V0TB/+TB/,U(U(U(/,U(UWU(UWSN/+SN/,/,/-/./////0SQ/1/1/2S@S@/2/3/4XYY#Z1Z+Z+W7WOW7/3/3WF/4WFWFW8WF/4W8/4W8/5ZSZ7ZS/5ZKZWXVXVZWZWZ>Z>Z>Z<ZZ/3/3ZT/4/5ZEXIZVZVZIZIZVZV/3/4UB/5/5/6UA/7/7/8TTTT/8/9/:/;/;/<T?/=/=XLT?XLSP/=SPSPSQ/=/>/?/?S@/@/AS@Z.ST/AZ0Z0/AZ*/AW7Y%Y%/AWFY&Y&WF/AXEXE/A/B/CX@/C/DX@X>/DZSX>XUZS/DZSZSZAXV/DZAXWZ>XWZ=Z=ZX/CZXZVZV/CZVZVZVZV/CUB/CUB/DUAUA/D/E/E/F/G/H/HV3/IV3V3/IV3V3XT/IXTT*/ISPT*/J/J/KSE/L/L/M/NSTSTZ*XYZ*XZZ2Z4Z2/LX@/MX@X@X>/MX>Z;Z;ZN/MZXZXZ6XKZ@ZQXSXSXOV1V1/K/K/L/MT2/M/N/O/PT*/P/Q/R/R/SSG/T/TST/UXX/UX@/VX=X@X>X=/VX>X>/V/WX>X>/W/XZNZNZMXVV1/WV1/X/X/Y/Z0#0#0$0%0&SG0&SGSGXE0&XEXE0&X=Y'X=X=0&X=0'XFXF0'0(0(0)0*T1T70*0+T7Y'0+Y'Y'0+0,XBXBXOTRXOV+0+0,0-0.0.XNT6X<V+0.XOV+T;0.XNXNV+V+T;T;0-T;T;T;XZXZ0-VJY$Y$VGVOXVXV0,VKXLXL0,VLXH0,VL0-0-SG0.SG0.VM0/VM0/VJ00VJ00VG01VGVGVOVGVO0001VOVO0102VOVO020304XE0405XEXE0506XEXE0607XEXE0708XEXE0809XEXE09VK0:VK0:VL0;VLVL0;VL0<0<SG0=SG0=VM0>VM0>VJ0?VJ0?VG0@VGVGVOVGVO0?XE0@XE0@VK0AVK0AVLVKVKVLVLVKVKT;T;VKVKT;T;VKVKT;T;VKVKT;T;VKVK0<VLVKVKVLVLVKVKVL0;VKVKY(Y(VKVK0:SGVKVKVNVNVKVKVNVNVKVKVNVNVKVK07VMVKVKVMVMVKVKVMVMVKVKVMVMVKVK04VJVKVKVJVJVKVKVJVJVKVK02VGVKVKVGVOVKVKVOVOVKVKVOVOVKVKVOVOVKVK0.XEVKVKXEXEVKVKXEXEVKVKXEXEVKVKXEXEVKVKXEXEVKVK0)VKVKVKXPXPV,U;XQXQU$THU$THU$THV,U;V,U;V,U;V,U;U;U;U;UZU;U;UZUZV>UZV>V>TVTVUZUZXXXXVPYIT,TWT,TWTWU:VCU:U$U$THTHU$U$THTHU$THU$THU$THTHTHV,V,THTHV,V,THTHV,U;V,U;V,V,THV,V,U;V,U;UZUZUZV4UZV4UZUZYJYJYWYWYJYJ/IY9YJYJY9YI/HYIYIYIYIX1/HX1X1W@X1X1X1W@X1X1W@X/W@X/W@W@W@X/W@X/X/X/Y'X/X.X.X/X.X/X.X/X/X.X.X/X/X.X.X.X.X.WZX/X/X.WZX/X/WZWZX/XUWZWZWZVTVTVTVTVTVTUVT,TWT,TWT,TWT,TWVCU:VCVCVCU:VCVCU:U:VCU:THTHU$U$THTHU$U$THTHU$THV,U;T>T>T>T>V,U;U;U;T>U;T>U;U;U;U;U;U;V@U;U;V@V@U;XNU*XNYJYJ/*YWYWYW/*YWYW/*/+/,YWY9/,Y9Y9Y9/,/-YIYI/-YIYIYIYI/-YIYIYIX1YIYIX1X1YIYIX1X1/*X1X1X1X1X1X1/*X1X1/*X1W@W@X1W@X1W@X1W@W@X/W@X/W@W6W6W6X/X/W6X/X/X/X//%X.X.X/W>X//$X/W>X.X.W>W>WZWZW>X,W>X,X.X.WZWZX,WZX,WEX.X.WZWZWZWEWZWZWEWEWZVTWEWEVTVTWEW;WEW;W;W;W;VTW;W;VTVTW;VTUVT,XJXJVBU=U=V5.NVBV5VBV5V5VBVBU'U'VBVBU'U'TXTXVBTXVBVBU$V.U$V.U$V.U$.IV.V.V<V.V..HV..IV,V,VDV,V,U;V,U;V@U;V@V@V@V@U;V@V@U;V@V@U;V@V@V@V@V@U*U*Y6.BY6Y6.BYB.C.DXGXGY).DYJ.D.E.F.FYW.GYW.G.HY.Y..H.IY..J.J.K.L.M.M.NZ'Z'.N.OZ'Z'.OYX.P.Q.Q.R.SYI.S.T.U.V.V.WYGYG.WYI.X.YYIY>YI.Y.Y.Z/#/$/$/%/&/'YI/'/(/)/)X1/*/+/+X1/,X1X1X1/,WRX1X1WRVRX1X1WLWL/*/+VRVRWLWLVRVR/*X)/+/,X)X)/,X)/,WKVR/-WKWKW%/-X)X)X)/-X)W@X)W@/,/-/.//WJ///0/1W@/1W@W@W@W@/1W6W@W@W6W6W6X/W)W)W6W6W6W)W)X/W)/.X/X//.X/X/X.X.X.X.WUX.WUWEWEW;W;VBVB/+VBVBUCXRUC/*UCUCUCVB/*/+/,U$U$/,/-UCUCUC/-TYTYUCTYU$V<U$V<V<V.V<V.TY/*TYTYTNTN/*TN/*TNTN/+/+TZ/,/-V@V@/-/.V@U;V@V@V@/-/.//TDTDV@TD/.UPUP//U0U0U0U)TD/.V7V7V7V7U)UO/-YBYB/.YBYB/./////0YK/1/1/2/3/4YK/4YK/5Y.Y./5Y.Y./5/6/7/7/8/9/:/:/;/</=/=Z'/>/?Z'Z'/?/@/@/A/B/C/C/D/E/F/F/G/HY?/H/IY?Y?/I/JY1Y1/J/KY1/L/L/MY?Y?/MYI/N/OY?Y?Y?/OY?Y?/O/PYIYI/P/Q/Q/R/SZ&/S/TYIYI/T/UYIYI/UYSZ&/V/V/WWMWM/W/XYI/YVXVXVX/Y/YX1WMVV/Y/ZVVVVVXVV/Z0#X1WRVVWRWRVRWRWRVVVVWSWSVRVRWSWSW%/WVRVRW%W%VRVRW%W@W%W%VRVR/UX+W@W@W5W5W@W@W5X*W5W5X+W5W6W6X*X*W6W6/QX*/QW)W)W)W)W)X*X*W)W)/P/QX*WXWXWX/PWXWXWXWXWXWX/PX/X//PX//PX.X.X.WX/PWXWX/PWX/Q/RX.WUX.WUX.WUX./QWZW;WZWZWEWZWEWEUC/OUCUCTGTG/O/PUC/PUCTY/PTY/QTY/QTNTNTNTN/QTN/RTZTZ/R/STN/STN/T/TUU/UUUV@/U/V/W/W/XUUUU/XUUUUUU/XU0XNXNYDYDYD/XYDYD/XYDYD/XYD/Y/YYD/ZYDYKYK/Z0#YK0#YKYK0#YO0$0%0%0&YOYO0&0'0(0)0)0*0+0,0,0-Y,Y,0-0.0/0000010203Y,03Y,04Y;Y;04Y;XXYTY;Y;YT03Y;Y;YI03Y;04YIYI0405Y;05Y;06YIYI0607VUVUW#VU06070809W#W#09XYVUVUVWVUWVWVWV08VWVW0809WVWS09WVWSWSWVVRVW08VW09WV090:0;0;VR0<0=VRVR0=0>0>0?0@0A0A0BW/W/VRVR0B0CVRX+X+X+0BX+X+X+X+X*WXWXX*X*WXWXX*X*WXX*X*X*X*0?X*WX0?WXWXWXWX0?0?0@WP0AWX0A0B0CWPWP0CWWX(0CX(X(0C0D0E0FUC0FXRV?0FV&0GU20GTY0H0IV&0I0J0KTYTYTP0KTY0KTYTNTY0KTNTN0KUU0LUU0LUU0MUUXHY@XHS<0L0MS<S<YD0M0N0OS<0OS2S20OT)0PT)YO0PT)YE0PT)S2T(0PT(T(T(0P0QY,XXT(T(T(S;Y;Y;XX0P0P0Q0R0S0S0T0UVS0U0VW+0W0W0XVYVYVSVYWT0XVYVYWTVY0WX&0XX&0X0YVY0ZX&0ZX&X&0ZVW1#1$1$1%W:W:W:W:1%W:W:W:W:1%1%1&W:1'1'1(1)1*1*1+W<W<W<1+W<1,X+X+W<W?X+WXWXWX1*W?W?W?WXWXW?WXWWWW1)1*V?1*UKUKU2U21*U2TO1*TO1+UKUQUK1+1+UJ1,1-1-TN1.1/UQUQ1/UN1/1011UQ11XPUQXP11UUXPUUXPUUU1U1UUUUUU10UU1011UTX5S<1112S<S<SC12SCSCSCT$T$S2T$S4S2S2S4S2S2T(S2T(S2T(S2S2T(T(T#T(T(1,T(S;T(S;T(S;1+1,1-WTS;1-S;S;1-1.WTWT1.X&1/X&1/10WTWTX&X&10X&1011W.1212X&WHWH12W<X&13X&W<WHXZW<W<W<121213W?W?W<13W?W?13W=W?1414WX1516WXWX16171718W?19WXWX19W?W?WX19X0191:1;W?1;X0X0X0WXWXX0WX1:WX1;WXWXWXWX1;WXWX1;WXWXWX1;1<WX1<WX1=1=1>X#X(UK1>XQUN1>UNUNUNUN1>UNUNUN1>UNU-UM1>1?TJ1?TCU-1@U1U1TMTMU1UTU1U1XOXOV=TFU<1=U<XOUTU+U1V'V'1<XOXOV21<XOXOV*1<XNTK1<T.US1=1=SCT$T$XHT$S?1=SCT$T$T$T$T$S?T$T$S4T$S4T$S4T$S4S2S2S4S4S2S2S218S2T#T#T#SZT(SZSZT(SJSZSJSZSJSZSJ14SJSJSJSJSJSJ1414WTSJWT14WTS3S3WT1415VQWTWTVQVQWTWTWTWHWHWHVQWHW?12W?Y$W,12Y$X0X0121314X-W$X-X-13W$14W$1415W$16W$16W$1717W3X-18WXWXW3WX17WXY&Y&Y&WGWXWG16WGWGWG16U-XPXP1617U&UFV$TFV$TFXOXO1617TF17TF18XN18TKV;TK18TKTK1819S?1:S?1:S7S>S4S4S41:S>S>1:SDS>1:1;S>S4S4S41;1;T%T%T%1;1<S/S/T%1<1=S01=T#T%T#1=T#1>SM1>T&1?1@T#T#SM1@T#SZSM1@SM1@1ASBSZSZ1ASZ1ASZSZ1BSZSZS5S5SJSJS5SHSJ1@SHSHSJ1@SJS1SJSHSHSH1?1@S1S11@VQ1A1BS1SWS1S1VQVQVQSWVQVQSWSW1?W*1@W*W?X0W?X0Y$X0W?W$X0W$X01>1>1?1@WN1@W$W$W$WNWNW$W3WN1?WN1@Y&Y&W3WGWXWGY&WGWXWGW3WBZHZGZHZHV$V$TFXOXOTFU.U.TF1:TFTFTFTFTFUGTKU/TKTETKTKUGUGTETEUGTEU/16U/V%V%TLV%TLU/U/TEV0V%TLV0TBXMXM13XMSX13SXSX13S014S01415S0XGSM1516SBSSSBSN16SBSBSNS9S5S5S515S5S5SLS5SBS9S914S5S514SQSHSHSQ1414SQSQSQSQSQSQ14S1S1SHS113SI14SISISY14SYS1S1S1SWS1SWSWSWW$12W7WA12WAWAWA12WA1314W7WB14WOW(WB1415WBWG15WBWBWFWOWFWG14WFWFWFWFWFW8W8ZPW8W8ZPY'W8W8U.U.1112U.U.12UBUB12UBUBTFTFUBUBTFUGTFUGUBUBUBU%U%UGU%UGUGV0UGUGUGV0UGV0TBU(TBU(1+U(1,U(U(U(1,U(SN1,S9S91,1-1.1/S91/S9SLSLSLSLSQ1.SLSPSL1.SQSLSQSLSQSQSQSQ1-SQ1.SQ1.SQSQ1.SI1/S@1/SYS@10SYSY10SYSWSWSYXY1/10S@S@W7WOW7W7WOWOWO1/WOWFW7W7WFW8WFW8W8ZSW8ZSW8ZSW8ZSZ7Z7Z7ZAZZXKZZZ5Z<XJZOXJZOXJZ5ZOXJZTZOXJ1&V/UBUBV/U%V/1&UBUAUBUAUG1%UAV)V)UGV)TTV)1$UAUAUGV0TTTTV0V0TTTTTBTBTTT/T/U(T/U(TTT/TTV3T/0W0XT?U(U(T?T?0W0X0Y0ZT?0ZT?T?0Z1#UEUESPSPSP1#SQSQSQSRSPSRSRSR0Y0ZSRSR0Z1#SRSRSR1#SR1$1$ST1%STZ.Z.XYZ3Z3Z*Z3Z*W7W7Z,Y%W70ZY&Y&WFW-WFW-W8W8Y'X@W8Y'X@X@Y'X@XEX@Y'W8X@X@W8ZSY'X>ZSZSX>X>ZAZAZSZSZAZAZ;Z;Z=Z=Z=ZXZTXIXIZVZVZVZVZ@UBUA0NUAV10NV10OUAUAUA0OUAT=0OT=TTTTUATITTTTTITIT=0MT=TITITI0MTI0MV3V3V30MV30NV30NT?0OT?SPSPT*T*SPSP0NT*T*SET*SESRSRSE0MSR0M0NSFSFSF0N0OSFSTSFSF0NSTSTSTSF0N0OSTXEX@XEX@XEX@XEX@X@0MX@X@Z;XVZNZNV1T10L0MT30MT70N0NT=T2T20N0O0P0QT=T=0Q0R0R0S0TV3T2T=T20T0T0U0VV3T*SET*SET*T*T*SGT*SGSGSGSESESE0S0SSGSGSGSGSG0S0TSGST0TST0TSGSGSGXEX@XEX@XEX=XEX=X=X>X=XFX>X>XFXFX>X>XF0PX>X>0P0QX>XUXFXU0PT80Q0R0RT50S0TT4T2T90TT2T2T20TT90TT7T70T0U0VT0T20V0W0X0XV3UR0Y0Y0ZT0T0URURT0XN0YSGSGSGXEXEXEXA0XX=XAY'X=XFX=0XX=0XX=0YXFXFXD0YXFXF0YXFV1V1V10Y0YT7T7T7V10YTRTRT0T00YT0T10YT1T1X=0YY'Y'XDXDXBXB0XXDXBXBTR0XTRT60X0YT6T6V+T6V+V+T6T60XT60XT1T6T6V+T;V+V+XNX<T;XNT;T;V+T;VMVJVMVJVHVKVHVKXLXLT;VLXHXHVLY(VLY(VLY(Y(SGY(SGY(SGY(SGVNVMVNVMVNVMVNVMVMVJVMVJVMVJVMVJVJVGVJVGVJVGVJVGVFVFVOVOVFVFVOVOVFVFVOVOVFVFVOVOVFVFVOXEVFVFXEXEVOXEVOXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVHXEXEVHVKXEVKXEVKXEVKT;VLT;VLT;VLT;VLVLY(VLY(VLY(VLY(Y(SGY(SGY(SGY(SGVNVMVNVMVNVMVNVMVMVJVMVJVMVJVMVJVJVGVJVGVJVGVJVGVOXEVOXEVOXEVOXEXEVKXEVKXEVKXEVKXOVLVKVLT;VLT;VLVLY(VLY(Y(SGY(SGVNVMVNVMVMVJVMVJVJVGVJVGVOXEVOXEXEVKXEVKYJYJ/T/UYJYJ/UYIYIX1YIYIYJYJYJ/TYJ/TYJYW/TY9Y9Y9XTY9/TYFY9Y9/TY9YW/TY9Y9Y9Y9/T/UY9/UYIYIYIYI/UYIYIYI/UY>YIX1X1X1X1X1/T/UX1X1X)X)X/X//TW6X/W>X/X/VBVBU=VBU$V<U$V<V.VDV.VDV./PV.V.Y6Y6Y6/PYBYB/PYB/P/QY6Y6Y:/QYBYBY)Y.Y)/QYJYJYJ/QYJY5Y5Y5Y5/PY5Y5/PYWYWYWYWYWY5YWY5Y5/O/PY5Y5/P/QY5/QY5Y5YW/Q/R/SY./SY./TYWYFYWYWYFY9YXYXYWYWYWYNYN/QYN/R/RYWY5Z'YWXTZ'Z'XTY=/QY=/QZ%Y=/RY9/RYXYXYNYNYN/RYN/RYNYN/R/SYXYI/SYIYIYI/SYIYN/TZ%Z%/TZ%Z%Z%Z%/T/T/UZ'/V/V/WYGYG/WYGYGYG/WYGYGYGYIYIYGYIYG/VYGYGYIYI/VYI/VY>/WYI/WY>Y>Y>Y>Y>Y>/WY>Y>YIY>Y>YP/VYPYIYIYI/VYIYIYI/VYI/VYIYIYZYZYZ/V/V/W/X/Y/Y/ZYPYPYP/ZYP0#Y>X10#X1YP0#0$0%X1X10%X10%0&0'0(0(X1X1X1X10(X1WRX1X1VRVRX1WLVR0'0'0(0)X)WLX)WLWKX)X)WKWKX)X)WKX)WKWKWLWKWK0%VR0&0&WKW%W%X)X)X)0&WK0&WKWK0&WJ0'WJWK0'W%W%W%0'W%W%0'0(W@W@0(WJW%WJWJW@WJW@W@0'W@W60'W6W6W6X/X/WXWXX/X/WXWXVBVB0%0&0&UCUCUCU$U$VBU$VBVB0%0&VBVB0&TSU$U$0&U$U$U$U$0&UCUCUC0&TNTN0&UX0&TNTYTN0&TNTNTNTN0&TNTNV@V@TZTZ0%TZTNTN0%TZ0&0'TZ0'TZTZ0'V@TZ0(V@V@UU0(V@UUV@UUUU0'UU0(V@V@UPUPUPU0UPU0U*V70&V7Y6Y6XGYBYBYBYKYKYB0$YK0%YBYBYKYKYBYBYB0$YBY)0$0%YK0%YKYKY)Y)0%0&0&0'0(Y.0(0)YKYK0)Y.0*0+YKYKYK0+0+0,YK0-Y.Y.0-Y.Y.0-0.0/Y.0/Y.0000YM01YM01Y.0203Y.Y.03040405YO060607YOYOY.070809090:Z$Z$YO0:YOYO0:0;0<0=Z'Z'0=Z'YM0=0>0?0?0@0A0BZ'Z'0B0CZ'Z'0C0DZ$0DZ$0E0EY/0F0G0G0H0I0J0JY20K0L0L0MY2Y20M0NY20O0O0P0QY-0QY10RY10R0SZ'0T0T0UY?Y?0U0VY?Y?0VYGY?Y?YGYGY?Y?0U0VY1Y1Y?0VY1Y10V0WY10X0XY?Y40Y0Y0Z1#1$1$1%1&Y?1&Y?Y?Y?YIYIY?1&Y?1&Y?Y?1&1'Y?Y?Y?1'YTYT1'Y?YTYTY?Y?YTYI1&1'Y?Y?YIYI1'YIYI1'1(1)1)1*1+1,Z&Z&YIZ&Y?Y?1+1,1,YIYIYIYI1,YI1-Z&1-1.YI1.YS1/1010YSWMWMYS10YSWM10X1WMWM1011YIYIWMWMY+11Y+Y+YIY+VXVXVUVUX1X11/WMX1X1X11/X1X11/X1VX1/10VU10VUVUVUW%W%10W%X+X+10X+X*10X*X*W6W610W)10W)WX1111WXWXWXW)WXWXWXWX10WXWX10X/WXWXX/X.X.X.WXX.WXWXX.X.WXWXWXWX1-WX1-X.1.X.WUWUX(1.UCTGTGTGTGTGUCUCTGTGTYTY1+TYTYTYTGTYTGTGTGTG1*TY1*TNTNTNTN1*TNTZTNTZTN1*TZTZ1*TZTZ1*1+1,1,1-1.U31.1/1011U311U312U31213UUV@V@V@1313V@14UU1415UUUUV@V@1516V@16UUUU16UUUUUU16U0U0U0YDYD1617YDYD1718YKYK18YK1819YDYD19YD1:YD1:YDYDYD1:1;YDYD1;1<YDYDYK1<YK1=1=YO1>YOYKYKYK1>1>YO1?YOYOYOYO1?Z(Z(YOZ(1>1?Z(Z(YRYR1?YRZ(Z(YOYO1>1?YOYL1?Y-YRY-Y-1?Y-1@1@1A1B1CY-1C1DYUYYYYY,Y,1C1DY,Y,1DY11E1FY1Y11F1GYVYV1G1HYVYV1HYV1H1I1J1KY1Y11KXXYVYV1KY;YVXXY;Y;Y,1JY,Y;Y,Y,Y,1J1JY;1KY;YTYIXXXXYIYI1JYIX%X%Y;Y;X%X%X%1IX%1IX%X%1IX21J1KY;1KY;1L1LYI1MX%YIYI1M1N1NW#1O1PW#W#W#1P1P1QX&X&1Q1RX&X&1RW#X&X&1R1SVWVWVWVWX&1SVWVW1S1TWVWV1TWVWVWV1T1UVW1UVWVWWVX$WV1U1U1VVWVWWVWVVWWV1UVR1VVRVRVRVR1VVRVR1V1W1W1X1YW'1Y1ZW'W'X$1Z2#2$2$2%2&2'2'W/2(W/W/W/2(W:2(2)2*W'W'W'W'X+2)W'W'W'W'2)W'W'W'W'X+X+X*X*WXWXX*WXWXWXWXWXWX2&WX2&2'WP2'WPWPWPWPWP2'2(WX2(WXWXWXWX2(WP2(2)WPWP2)WW2*WWX(WEX(WEUCUCUC2)2)TYV&V&UC2)UCUCV&V&2)V&UCUC2)2*UCUC2*2+V?2+V?V?TY2+V&TYV&2+V&V&V&2+V&2,V&2,V&V&U22,U2U22,2-U2U22-TYTOTPTYTNTNTNTNTN2,TN2,2-TN2.2.2/TNUUTN2/TN20TN20TN2121YDYD22YDYD22YDYDYDS2S22122S<S<22S223S2S2S2S<S2S2T)22T)22T)23T)YOYOYEYET)T)S2T)21T(T(T(Y,21Y,22Y;Y;2223WI23WIWIY;Y;23Y;Y;23242525W+WIW&W+W+25W+XX25W92626W+27282829S;W929Y;W+W+292:W+W+W+2:W+2;2;2<2=VY2=VYVYVYWT2=WTWT2=X&2>2?VY2?2@X&VY2@VYVYX&X&2@X&2@X&VY2AX&2AX&X&2A2BX&2CX&W:2CW:2CW:W:W:VW2CW:W:W:2CW:W:X&2CX&X&W:W:W:W<W:2BW:W:2BW:W:W:W:W:2B2CW/W/2CW<W:W<W<W<2BW<W<W<W<W<W<W?W:W:W:2A2AW<2BW<2B2CW<2DW<2D2E2FW?W?2FW?WW2FWWX(2FX(X(X(V?U2V?2FUKU2UKUKTOV#TOTOTOTOTO2DUKUQUKUK2CTNTOUJTO2C2D2EUJUQUQUQTNTN2DTNUQ2DUQUQTNTN2DTNUQUNUQUNUQUQ2CUQUQ2CUQUQ2CUQUNUQ2CXPUJXP2CUUXPXPUUUTUUUTUUUTUUUTUUU1U1U1X5SCSCSCS<S<SCSCSCS2SCT$2=S;T(S;S;2=2>2?VSWTWTWTS;WTS;S;WTWTS;WTVYVYWTWTWC2;WT2<X&X&WTX&WTWTWT2;WT2;WTWT2;WQ2<2=X&X&2=X&WQX&W.W.X&2<W.2=W.2=W.WH2=X&2>XZX&2>X&2?X&W<X&W<2>W?W?W?W<2>W<2?2?W?W?W?W<W?W<W<W?2>W?2?W?2?W?W?W=WXW=W=W=W=W?W?W=W=2=W=2=W=W=2>W?X'2>2?W?W?W?2?2?2@2AW,2AW,W?W,X'X'2AW?W?W?W?2AW?W?W,2AW?W?2AW?W,2AW,2BW?X0W?X0X0WX2AWX2AWXX0X0WXWXWX2AWXWXW$WXWXWXWX2@WXWX2@WXWXWX2@WXWXX#Y&X#WXX#2?X#X#Y&2?X(UKUKUK2?UKUN2?UNUN2?UNUNUMUMUNU-UMTJ2>TJUM2>UMTJUM2>U-TCTCV=V=V=U<V'U<U<V'V2XOV2V2V*XOXO2:VAV:V:2:V6U@2;U,U,U#UIXHSCXH2:2:S?S?S?S2T#T#T#S;29SJSJSJS3SJS3XYWTSJWTSJSJS3S3WTWTVQ26WT26VQVQW?W,W?W,W,X025X0WXWXX0X-X0X0W$W$23X-W$W$W$W$X0W$X022X0W$X-22W$W$W$X-W$22W$22W$W$WXWXW$WXW$W$Y%WX20W$X-W$20W3X-W3WX20WXWXX#X#Y&WGUN2/XPU-U-V=U&U&V=V=2.2/TK2/TKTKTUU@2/TKTFTKTKTKTKTK2.TKUIUIV;V9V(V(2-TKXHS?XHS6S?S?2,2-2-S?S7S7S?S4S?S4S4S4S>S4XH2+XHSDS>S4S>S/SDS>2*SXS4T%S4T%S4S4S4T%S4S4S/S/T%T%2'T%S02'S0S0S/S0S/2'T#T#2'T#T#T#T#2'2'SMSMSM2'T&SOT&S02'S0SOT&SMT&SM2&SMSMSMSMSBSM2&2&SB2'SZSM2'SMSBSZSZ2'SZ2'SZ2(SZSZSZSZS5SJSJSJSHSJS3SJS1S12%S1S12%S3S1S1S3VQS3S3S12$S1SAVQVQ2$XYW?W?2$W*W?W*W*W*W$W$2#Y%W$W$W$WN1ZW$WNWNW$1ZW$W$X01ZX0W$X-W3WNW3WNW3W3W3TKTKTF1XU/XNU/V%TLTLTLTBSX1VSXSX1VS0S/S01VS0XGS01V1W1X1Y1YSM1ZSMSMSMSBSBSMSB1Y1ZSSSSSNSNS5S5S51YS9SLS9SL1XS5SQSQSHSH1XSQSQSQSLSQSQSQSQ1WSQSISQ1W1WSISISISI1W1XSYW$W$WA1XW$W$W$WAWAWA1WWAW71WW7W71WW7W7W7WO1WWOWOY&W(WB1W1WWBWBWBWBWBWF1WWGWGWGWFXOU.UBU.U.U.1UU.U.U.1UUBUBU.UBUBTBU(TB1TT/U(T/U(U(U(U(1SSNS9SNS9S91R1S1TS9S9SL1TSP1TXTSP1TSPSPSPS9SLSLSL1SSLSLSLSLSLSLSQSQ1RSQ1S1S1TSQ1USQS:SQ1USISI1US@1US@S:S@1USY1V1WS@SYS@S@SYSY1VSYS@SYS@S@SYXY1UXYWOWF1UWFUBV/UBUBV/V/V/UAUGUGUG1SV)V)V)1ST/T?T/T?1RV3V3V3U(V-1RT?V-V-T?1R1RT?T?T?T?1RT?UET?1RT?T?1R1S1T1UV-V-1UXLSPSPSP1USQ1USR1VSRSR1VSQSQS@SRSRS@S@1US@SRSRSR1U1U1VST1WS8STS8STS8ST1VS8WFWF1VWFUBUB1V1W1WUA1XUAV1UAV1UAUAUA1WUAUAUA1WT=1WTITITITITI1WTI1WV3V3V3TIV3TI1W1WV3V3V3T?T?V31WV3T?V3V31VSPT*T*SRSRSE1VSRSRSRSFSRSFSFSFSE1TSESESFSFSE1TSTS8ST1T1TSTSFSTSFSF1TSFX@X>X@X>V1V1V1T8T4T4T8T4T3T7T3T71PT7T7T7T71PT7T7T1T1T11PT:T21PT2T41PT4T41PT2T1T2T2T2T21P1PT=1QT=1QTIT=TITIV3V3V3T=T=T=1PT2T2T21PT=T21P1QT2V3V3V31PV3V3V3SE1PSG1QSE1QSESGSG1QSG1R1RSGSUSGSGSGSG1RSGSVSGSGX>X>XFXFX>X>XFXF1O1PXFXFV1T8V1T8V1T8V1T51NT5T5T5V1T5V1T5V1T5T71MT5T51MT71MT21NT2T2T2T21NT9T2T91NT21N1OT01OT0T0T01OT0T0T01O1P1QURT21Q1R1S1SURURUR1SV3UR1T1T1UURV3T01UT0T01UURT01VSG1VSGSGXEXEXA1V1VXFXFXFXD1VXDXDXDXD1VXD1V1WXDXD1WXDXDXDV11WV11X1XT7T7T7V1T7V1T1T0T01WT0T7T7T1T11VXDXDXDXDXDXDXBTR1UTRT6T1T1T61UT1T11U1VT6T6V+T6T1T1T6T6YW1TYWYW1TY91UY9YJYJ1U1VYJYJYJYWYWYWYJ1UYWY9Y9Y9YWYFYWYFYFY9YFY9YWY9Y9Y9Y9Y9Y91QY9Y9YIYIY9Y9YIYIYIYIY9YI1NY>Y>Y>1N1OX)X)X)1OX)X)X/X/X/W6VDVDV.VDY6Y6Y61M1MYBYB1N1N1OY6Y6YBYBY6Y6Y:Y:YBYB1M1N1O1PYJ1PYWYWY5YWY5Y5YJYW1OYWY.1OY.Y.1OY5Y.1PY5Y51PY.Y5Y5Y51P1PYWY51QYWYWYWY5YWYWY.Y.Y5Y5Z'Y5Z'Z'1NZ'1NZ'1O1PYXYXYNYNYNYNYN1OYWYWY5YWZ'Y=Z'Z'Z%1MZ%Z%Y=Z%Y=Y=Y9Y9YXYXYNYN1KYNYN1KYNYNYXYIYXYXYIYIYX1JYIYI1JYIYXYXYNYNYNYIYNYNZ%Z%Y=Z%Z%Z%Z%YGZ'1FZ'Z'Z%Z%1FYG1FYGZ'YGZ%1FYGYG1FYGYGYGYNYNZ%YGYGYIYGYGYGYIYG1DYGYIYIYI1CY>Y>Y>Y>Y>YIYIYIYIY>1BY>Y>Y>1BY>Y>Y>1BYIYIYI1BYIYIYZ1BYIYZ1BYZ1B1CYSYP1C1DYIYIYP1DYIYIYIYIYI1DYIYIYI1DYZYZ1DYPYZYP1DYPYPYPYP1DYPX1X1X1Y>Y>1CYPYPX1YPYPYPYP1B1CYP1CYP1DX1X11DX11DYIYIYIYP1DYI1EYIYIYI1EX1X11EX1X11EX1X1X11EX1WRVR1EVRVRX1X1X11EX1X1X)X)X11DX)X)WKWK1DWKW%W%VR1DW%WKW%W%X)X)X)WJX)WKWKWKWJWJ1AWJWKWJWKWJWKW%W%W%W%1?W%W%WJWJWJW@W@W@1>W@WJWJ1>WJW@1>W@W6W@W@1>W6VBVBVB1>VBVB1>1?VB1?UCUCVBVBUCUCVBVBUC1>VBVB1>UCU$U$TSTYU$U$TYTYUCTGUC1<TY1<TYTY1<1=TNTN1=TNTNTNTN1=TNTN1=TZ1>1?TZTZULTZ1>UL1?1@TZTZTNTNTZ1?TZTZ1?V@TZV@V@V@TZTZ1>UPUUUPUU1>UUUPUU1>UUUUTDTDTDV7YBYBY81=1=Y8YK1>YBYB1>YKYK1>YK1?1?1@1AY0YK1AYKYK1A1BY0Y01B1CY0Y0Y)Y)1C1D1D1E1FY.1F1G1H1I1IY0YK1JY0Y01JY0Y0Y.1J1K1K1LYKYK1LY.1M1N1N1OZ)Z)YK1O1P1Q1QZ)1RZ)1R1S1T1UY.Y.1U1VY.1VY.1WY.Y.Y.1WY.1W1X1Y1Y1Z2#YMY.YMY.Y.1ZYMYMYMYMYMY.YM1YY.1ZY.1Z2#Z)Z)2#2$Z)Z)2$2%2&Z$2&Y.Z$2'Z)Z)Z)2'Z)Z)2'2(YO2(YOYOZ)2(2)2*2*YOYOYOY.Y.Y.2*2*2+2,2-Z$2-Z$Z$2-Z$Z$Z$2-2.Z$Z$2.2/YOYO2/2021222223YAYA2324Z(Z(YAYAZ(Z(Z'Z'2324YMZ'YMYMYMYMYM23YMYM232424Z'YMYMZ'Z'2425YMYM2526YM2627Y/2728Y/Y/Z'Z'Y/Y/2728Y/Y/28Z'Y/Y/Z$28Z$Z$Z$28292:2:Y/2;2<Y22<Y2Y22<2=Y2Y2YA2=YAYA2=2>Z(Z(2>2?Z(Z(Z(Z(2?2@Y2Y2Y22@Z(Z(Z(2@Z(2@2A2BY/Y/2B2CY/2C2D2E2E2FY2Y22F2GY2Y2Y2Y12GY1Y2Y22G2HY2Y22H2I2IY-2JY-Y22JY12KY1Y1Y-2KZ'2KZ'Z'2KYGYGYG2KY?Z'2LYGYG2LY?YGYGY?Y?Z'Z'2KY?2KY?Y?Y?YGYGY?YGY?Y?2JY?Y?Y?2J2KY?Y?Y?2KY?Y?Y1Y1Y?2JY4Y4Y4Y4Y12JY?Y?2J2K2KY?Y42LY4Y4Y42LY42LY?Y?2LY?2M2NY?Y?2NY1YGYGYG2NYGYGY?Y?2M2NY?Y?YIY?Y?Y?YIYIY?Y?Y?2LY?Y?2L2MY?Y?2MY?Y?Y?Y?Y?Y?2MY?Y?2MY?YIYIY?2MYIYIY?YIY?2LY?YIYIYIYIYSYIYI2KZ&2K2LZ&Z&YS2LYSYS2LYSYSYSYSYSZ&2LYSYSZ&Z&Y?2KY?Y?2KYIYIYIY?2K2L2M2MZ&Z&Z&YI2MYIYIZ&Z&Z&YI2LYIYIYI2LYSYSYSYSYS2L2MYSYS2MYSZ&WM2MWMYPYPYSYSYPYPYP2L2L2MYIY+Y+WMY+Y+Y+VXY+Y+WM2KWMWMX1X1VVVV2JX1VVX1VXVX2J2KVU2KVUVUVXVX2KVUW%W%VRVRX+X+2JX+2J2KX*X*2KW)W)W)W)W)X*W)2J2KWXWXW)W)2KWXWX2KWXWX2KX/X/X/WXWXWXX.WXWXWXX.2IX.X.X.X(WUX(X(2HTY2ITYTY2ITYTYTYTYTY2ITNTZTNTZ2H2ITN2J2JTZU3U3TZTZ2J2KTZ2KUUUU2KV@UUUUTNTNTNU32J2K2LU3TN2LTN2MTNU3TN2MU3U3U8U3TN2LTNTN2LU52MTNU3UUU3UUU32LU32MU3UUUUUU2L2MUUUUV@V@V@2M2MV@V@V@V@UUUUUUV@V@V@UUV@2KUUUUV@V@UUUUV@V@UUUU2IUUUUUU2IUUUUUUUUUPUUUPYD2HY@Y@Y@2HY@Y@2H2IY@Y@YDYD2IYDYKYK2IYKYD2IYDYDYKYKYDYDY@2HY@2IY@2IY@YDY@2IY@YDYKYKYDYDYKYKYD2HYKYK2H2IYKYK2I2J2JYO2K2LYK2LYKYKYOYO2LYO2LYOYKXTYKYKYK2L2LYOYKYOYKYOYKXT2KYOYOYOZ(2KZ(Z(YRYR2KYRYRYRZ(2KZ(2KZ(Z(2K2L2M2N2N2O2P2QY1Y1Y-Y-Y-2PY-Y-YLYLYL2PYL2PYY2QYL2QYYYYYYYYYY2QY-Y-2QY-2Q2RYUYU2R2SYYY,2SY,Y,Y,2SY1Y1Y12S2T2UYVY1Y1YVYVY12TYVYV2T2UYVYVYUYVYUYVYVYVYVY,YVYV2SYVY1Y12SY1Y1Y12SY12SYVYVYVYV2SYVYV2S2TYVYV2TY;2UY;Y,Y,Y,Y;Y,2TY,Y,Y,Y;Y;Y;Y;Y;Y,Y,YIYIYI2RX%X%Y;X%YIYIX%X%Y;2PY;2QY;2QY;Y;2Q2R2SX&2SX&X&X&Y;X&Y;X&YIYIX%YIX%X%2QX%YIYI2QYIYI2QYIW#X2W#X2W#X2X22PX2W#W#X2W#W#W#2OW#2O2PX&X&2P2QX&X&2QX&X&X&X&W#X&2QW#W#2QW#WVWVVWVWWVWV2P2QVWVWX&X&VWVW2PVWVWVW2PVW2PWV2QWVVW2QVWVWWVWVVWWVVW2PVWVWWVX$WV2P2P2QVW2RWVWV2RWVVRVR2RVRWS2RWSVRVRVRVR2RVRVR2RX$X$W'W'W'2QVRW'W'VRVRW'W'W'W'2P2QVRW'W'W'W'2PW'W'2P2Q2RX$X$X$2R2S2S2T2UW/X$2U2V2W2W2X2Y2Z2Z3#W'3$3$3%W'W'W/3%WV3&WV3&WVW/W/W/3&W/3&3'3(3)3)3*3+3,3,3-W'W'3-3.W'W'VRVRW'W'3-WXWPWPWXWX3-WPWX3-3.WPWX3.WPWPWPWPWP3.3.3/30WWWXWXWX30WXWXWX30WX30WPWP30X.WPX.WPWPWP303031WWWWUCUCUC31UCTYUCV&UC30UC3131V&V&V&UC31XRV?3132V?V?V?32V?V?V?32V?U2V?U2V?V?TYTY31TY31TYV&V&TYTYV&TYV&TYV&30V&TYV&TYV&V&U23/V&V&U2U2V&TY3.U23.3/TPTP3/TNTNTNTN3/TNTNUUUU3/30TNUUTNUUTNTNTN3/3/UUUUUUUUUU3/UU3/UU30UU30UUTNUUTNUUUUUU3/YDYDYDYDYDS<3/3/YD30S<S<30S<S<S<S2S<30S2S230S230S2S2S2S230S231S2S2S231S231T)T)T)T(31T(Y;Y;3132Y,32Y,Y,32Y;Y,XX32Y;Y,Y;W032WI33Y;Y;W0W0Y;Y;3233Y;33343535W+W+W+W0W035WI35363738W&W&3839393:3;W23;W+3<W+3<3=VSVSW+W+VSVSW13<S;3=3=3>W93?Y;Y;3?3@Y;Y;Y;W+Y;3?W+W+W+W+W+3?W+3?VYVY3?Y;W+W+3?3@VYVY3@VYVYVY3@3AVYVYWTVYWTWTX&X&3@X&3@X&VY3AX&X&3AX&3AX&X&X&VY3A3B3C3CX&3DX&3DX&VY3EVYVYVY3E3EX&3F3G3GVWX&X&VWVWVW3GVWVW3GVW3GVWX&VWX&X&X&W:VWVWW:W:3E3FW:W:W:3FW:W:W:W:X&3FW/3FW:W:3FW:W:W:W:W:W:3FW:W:3F3GW:W<3GW<W:W<W<W<W:3FW:W:W:3F3G3H3HW<W<W<W<3HW<3I3IW?3JW?W<3JW<W<W<3J3K3LW<3LW<3M3MW?W?W?W?W?3MW?WWWWWW3MWWY'X(Y'V?U2V?V?TOTOUQUQV#3JV#V#UQUJUQ3JTO3JTOUQ3JUQUQUQUJ3JUJUJUJTNUJ3JTNTNUJ3JUQUQ3JUQ3J3KUJUJUNUQUN3K3KTNUJUJTN3KXPTNT(S;T(3K3KVSWTVSS;S;S;3K3KWTWTWTWC3KWCWCWCWCWT3KWTWTWT3KWT3KWTWTVZWQ3KWQWQWQWTWQWQWQW.W.X&X&WHX&X&3HW.3IW.W.W.WH3H3IWHWHWHX&3IX&3IXZWHWH3IW:3J3KX&3KX&X&W<W<W<W?W<W<W<3JW<W?W?W?3IW?W?W?W?W?3IW=3IW=W?W?W?W=W?W?3H3IW?W?W=3IW=W=W=W=3IW=W?W?3IW?X'X'W?W?W?W?W?3HW,W,3H3I3IW?W,W,3I3J3KW,3K3LW?W,X'X'W?W?W?W?W?X0W,3JW,W,3JW?W,W?W,W,3JW?W,W?W,W,X0WXWXWX3HWXX0X0WXWXW$W$WXWXWX3GWXWX3GWXWXWX3GWXWXX#X#X#X#Y&X#X(UKUKT@3EUKUKUNUNUN3DUNUNUM3DUM3EUMUM3ETJTJ3ETJTCV*3EV*V:T-T-T-3EV8T.3ET.XHSCXH3ET$T$3ES?S;S;SJSJ3DWTVQVQWTWTVQVQ3CX0W,X0X03CW$W$W$W$X0W$X-X-3B3CW$3CW$W$W$3CW$W$W$W$X-W$W3W3X-W33A3BWXWXUN3BUNU-U&V=U&V=V=V=V=UFT<T<3@T<3@TUTKTKTFTFTF3@3@V(TKTKS?S?3@S6S?3@3A3BS?S?S?3BS>S>XHSDSDSDSDSXS/T%S/S/T%3?S0S03?S0S0S0T%T#T%T%T#T#SMSMT#SMSMSMSOT%SO3<SOT&SOT&T#SMSMSMSM3:SMSBSMSBSMSB39SBSBSBSMSBSMSB38SZSZSZSZSZ38SZ38SZSZSZS3S3S1S1S3S3S1S1S3S3SASASASA35SWW?W?W?W*34W$W$W$W$W$WNWNW$WNW$WNX0W$X0W$TKTKTF3131S/S/S/S/S/S/S0S/S/S/S0S03/S030SOSOSO30S030S0S0303132SOT&T&T&32T&32T&XGSMSMXTSSSBSBSSSBS530S5S5S5S530S530SQSQSQSQSQSQ3030SI31SISQSQ31SISISYSYSY3031SISYWAW$WAWAWAWAW730W730W7W7WA30W731WBWBWOWBWB30WBWBW(WBW(30WBWBWFWFU.U.UBU.U.U.U.UBU(U(3-U(U(U(U(3-S9S9S93-S93-XTSPSPSL3-SL3-SLSLSL3-SLSPSP3-SLSPSPS9S93-SLSQSISQ3-SQ3-3.SKSQSQSQ3.SKSKSK3.S:S:3.S:SQS@SQS@3-S@SKSKSK3-3.3/3/SYSYSYS@3/S@S@3/SYS@SYSYSY3/SY3/S@S@S@3/WFWFWFUG3/V)V)V)V)V)3/V33/V3V3V-V-T?3/V-V-3/UET?3/T?T?3/UET?UET?UET?T?V-U(3.V-3.U(V-V-V-V-3.V-V-V-V-UE3-V-UEUESP3-SPSQSQSQ3-SQSR3-SRSR3-SQ3.3/S@S@SR3/SRS8S8S8SRSRSR3.S8S8S83.ST3.ST3/S83/STSTW7WFW7WFUBUBUB3.UBV1V1V1V1UAV1V1V1V1V1UAUAUA3+T7UAUAT7T73*TITITITITITI3*TTTT3*V3TIV33*V3TI3*TIV3V3T?T?T?SPSPT*T*SF3(SESFSESFSESFSFSFSG3'S8S83'STSF3'SFSFSFSF3'SFT73'T7T7T7T=T73'T13'T1T1T:3'T:T2T1T1T4T1T1T23&3'T2T2T23'T=T=3'T=3'3(T=T=T=3(T=TIT=3(T=T2T23(3)V33)T2T2T2T2T2V3V3T2V33(V3SE3(3)SGSESGSGSGSESESE3(SGSGSG3(3(SUSUSUSGSGSUSUSGSG3'SV3'XFXFXFXF3'XFXFT5T8T5T5T73&T73'T5T53'3(3(3)T93*T9T2T9T2T2T2T23)T2T2T7T7T2T23(T0T2T0T7T0T23'T0T0T7T0T7T0T23&3'URUR3'URUR3'UR3(URT23(T23)T2T23)T2T23)T2UR3)URURURV3V3V33)V3V3URURURV3URURV3V33'V33'URT0T0URUR3'URURURT0T03&SUSGSGXEX=XAX=X=3%X=XFXF3%XDXDX=XD3%XDXFXF3%XDXFXFXDXDXF3$XD3%V1T7V1T7V1T7V1T7T7T7V1T7T7T0T72Z2ZXDX=XDTRTRTRT1T62YT6T62YT6T6T6T62YT6T6Y9Y92Y2ZY9Y92ZY92ZY9Y9Y9YJYJ2ZYIYJYJ2Z3#YJYWYWYWY9Y9YIYIYIY>Y>Y>2X2YX1X)2Y2ZX)X)2ZX1X)X)Y62Z3#YBY6Y63#YBYBYB3#YBYBY63#Y6Y63#Y6Y6Y)3#Y)Y)3#Y.3$Y.Y)Y)Y)3$3$Y.3%Y.YJ3%YWYWYJYJ3%YJY5Y5Y.Y.Y5Y5Y.3$Y.3$Y.Y.3$Y.Y.Y.Y5Y5Y.Y.Y53#Y5Y53#YWYWYWY.Z'Y.Z'Y.2Z3#3$3$Z'Y.Y.Z'Z'3$Z'YNYN3$3%YNZ%Z%Z%YNYN3$YNYXYX3$3%YX3%YXYI3%YIYIYIZ'Z%Z'Z'Z'YGZ'YGZ'YGZ'Z'Z%Z%YGYGYGZ%YGYGYG2XYGYG2X2YYIYIY>YIY>Y>Y>Y>YPYPYPYP2WYP2WYIYZYZYIYIYZYZYI2VYIYIYZYPYZ2VYPYP2VYPYI2VYIYI2VYPYIYIYPYP2VYIYIYIYPYPYIYIYI2UYZYPYPYPYP2TYPYPYP2T2UX1Y>Y>YPYPYP2TYPYI2TYPYPYPYPYP2TX12TX1YPYPX1X12TX1YPYIYIYIYP2SX1X12SX1X1X1YIYIYI2S2SX12TX12TYIX12UX1X12UX1WLWLVRWLX1X12T2UX1X)X)X)WKWKWKW%W%W%VRW%WKWJWKWKWJWJW%WJ2PW@W@W@WJWJW%WJ2OW@W6W6W@W62OW6VB2OVBUC2O2PUCUC2PVBUCUCUCUC2PUC2PVBUCUCVBVBUCUC2OTGTGTGTNTN2OTYUY2OUYUYTNTNUYTNVD2NTNTNTNTZTN2NTZTZULTZTN2MTNTNUL2MTNTN2MULTNULTNTNTN2MULUL2MTNV@V@TZ2MV@V@2MV@UPUP2MUPUUUP2MUPUUUPUU2MY8YKY8YKY8Y8Y82LY<Y<YKYKYB2KYBYKY0Y02KY02KY0YK2LY02LY0Y02LY)2M2NY0Y02N2O2O2PYK2QY)Y)2Q2R2R2SY0Y02S2TY0Y0Y)Y)2T2UY)2UY)2V2V2W2XY.2X2YY)2Z2ZY.3#Y.3#Y.Y.Y.Y)Y)3#3$3$Y.3%Y.3%3&3'3(Y.Y.3(Y.Y0Y03(3)Y0Y0YKYK3(Y0YK3)Y0YC3)3*Y.Y.YCY.3)3*YKYK3*3+YKYKY.Y.3+Y.3+3,YKYK3,YKYKYKYKYKYK3,YKYKZ)YKYKZ)Z)3+YK3+YK3,3,YK3-YKZ)Z)3-Z)YKZ)YK3-YK3-YK3.3.YO3/YOYKYK3/30YOYO30YO3031YKYK31Y.323333Z'34Z'34Z'35Z'Y.Y.3536Y.Y.Y.36Y.3637YM3738YMYMY.Y.Y.YMY.37YMYM37YMY.YM37YMYMYMYK37YK3838Y.39Y.393:3;3<3<3=3>Z)3>3?Z)Z)3?3@Z)Z)3@Y.3A3BY.Y.Z$Y.3AZ$Z)Z)Y.Y.Y.Z$Z$Z$Z$3@3@YO3AYOZ)Z)YO3AZ)YO3AYO3AYOYOYOZ)Z)3A3B3BYOYOYO3B3CYOYOZ)YO3CYO3C3DY.3EY.Y.Y.3EY.Y.Z$Z$Z$Z$Z$YOZ$Z$YOYOY.3BZ$Z$Y.3B3CZ$YMYMZ$Z$YMZ$Z$Z$YOZ$YOYOZ$Z$YOYOZ$Z$YOYOZ$Z$3>3?YOYAYO3?YAYA3?YAZ$Z$3?Z$Z$Z$Z$YAYO3>3?3@3@YA3A3BYMZ'YMYMZ'Z'3AZ'YMYMZ$YMYMYM3@YMYMYM3@3AZ'Z'YMYM3@3AYMYM3AZ'3B3CYMYM3C3DYMYM3DY/YMYMY/Y/YM3CY/Y/Z'Z'Y/Y/3BZ'Y/Y/Z'Z'Y/Y/Z'Z'Y/Y/Z'Z'Y/Y/Z$3?Z$Z$3?3@Z$Y2Z$Z$Z$3@3@Y23AY23AY/Y/Y/3AY/3B3CY/Y/3CY/Y23CY2Y23C3DY2Y23D3EY2Y23EZ$YAYA3E3FYA3G3GY23HY2YAYAYAZ(3GZ(Z(Z(Z(Z(YRZ(Z(Z(YRYRY2Y23EY2Z(Z(YRZ(Y2Z(Z(Z(Z(Z(3C3DZ(Z(Z(3DY/Y/3DY23DY2Y2Y2Y/Y/Y/3D3DY2Y2Y23DY2Y2Y2Y/Y/Y2Y2Y/Y/Y2Y2Y/Y/3B3C3C3D3E3FY23F3GY1Y2Y2Y23GY23GY23H3HY2Y-Y-Y23H3I3JZ(Y-Z(Y-Z(Y-Z(3IY2Y23IY13IY1Y1Y1Y1Y1Y-3IZ'YGZ'3IYGYG3IYGZ'Y?Z'Y?Y?Y?Z'Y?YG3GY?Y?Z'Z'Z'3GZ'Z'Z'Y?Y?Y?Y23FY?Y?Y13FY?Y?3FY?Y?Y?Y1Y1Y?Y?3EY?3EY4Y1Y13EY?Y4Y4Y?Y?Y43E3EY?3FY?Y?Y?3FY?Y43FY4Y4Y43FY43GY4Y43GY43GY?Y1Y13G3H3IY13IY1Y1Y1YGY?Y?Y?3HYGY?Y?YGY?Y?Y?Y?YIY?Y?YIYIY?Y?3EYI3FY?YIYIYI3FY?Y?Y?3FY?Y?YTYTYIY?Y?Y?Y?YIY?3DYI3DZ&Z&YIYI3DYIYSYSZ&YS3C3DYSYS3DYSYSYS3DZ&Z&Z&Y?Y?Y?YI3C3DYIYIYIYI3DYIY?Y?Y?3D3DYIYIYIYI3DZ&Z&YIZ&YIYIZ&Z&YIYIYI3BYSYSZ&YSZ&YSYSYSYSZ&YSYS3@YSZ&Z&WMWM3?X1X1X1Z&Z&Y+Y+3>3?Y+Y+WM3?WMWMX1X13?X1VXVXVXVUVX3>VUVUVX3>VUVU3>VUVUVU3>X+3?X+W6W63?X*W6W63?X*W6W)W)W)3>3?WXWX3?WXWXWXW)W)W)WXWXX/WX3>X/X/3>X/WXWXWX3>UCTYUC3>UC3>UCTYTGTGTYTYTY3=TYTNTZTZTZ3=TZTZTZ3=3=U3U4U3TZTZ3=3>TZTZTZ3>TZV@3>V@TZTZ3>3?TZ3?3@UUTN3@TNU33@3AU3U33AU3U3U33AU3TNU33AU33BU33BU83CU8TNU6TNTNU8U8TN3BTN3BTNTNUUUU3BUU3BUUUUUUU>U>U>3B3B3C3D3EV@UU3EUU3EV@3FV@3F3G3H3IV@V@3I3J3JUUUUUUYD3J3KY@YDYDY@3KYDYD3KY@YDYDY@Y@Y@3JY@3K3KYK3LYDYDYKYDYDY@YDY@YDY@YDY@YDYDYDY@YDYDYD3HYD3H3IYDYD3IYK3JYDYKYK3JYD3J3KYDYDYKYDYDYD3J3KYKYKYKYOYKYKYOYO3JYOYKYKYK3JYOYO3JYO3JYO3KYOYKYKYK3KYKYOYKYK3J3KYOYOZ(YRZ(Z(Z(YRZ(3JYRYR3JYRZ(3JZ(Z(YRYR3J3KYRYLYRYLZ(3JZ(Z(3JYLZ(YLZ(3JYR3K3KY-3LY-YR3LYRYRY-Y-YRY-Y-3KY-3LYLYL3LYYY-Y-3LY-Y-Y-3L3M3MYY3NYYYY3NYYYYY-Y-3NYUY-3NYUYU3NYUYUYUYUYUYYYUYUYU3M3NYUYUY,Y,Y1Y13MY1YV3MYVYV3MY1YVYVYVYVY-Y-Y1Y1Y13LY1Y13LY13L3M3NYVYVYVY,Y,Y1Y1Y13MY1Y13MY1YV3MYVYVYVY1YVYVY1Y1YV3LY1Y13LY1YVYVYV3LY,3LY,3MY,3MY,Y,YIYIYIX%X%X23LX2Y;X2X2X2X2X2Y;3KX2X23K3LX2X23LX2Y;Y;Y;3LX&X&Y;X&X%X%X%W#W#YIW#3JYIYIYIW#X2X23IW#3IW#X&X&3IW#X&X&W#W#3IW#X2X2W#X23HW#X2X&W#X&X&X&W#W#3GW#W#W#3GW#WVWVVW3GWVWV3GWVVWVWX&X&VWVW3FVWWVWV3FWVVWWVVW3F3FWVVWWVVW3FVWVWWV3FWV3GWVWVVW3GWVWV3GWVVW3GVWVW3GWVVWVWVRVRWS3G3GVRVRVRVRVR3G3H3HX$3IX$VRVR3I3JW'W'3J3KW'W'3KW'3K3LW'W'VRVR3L3M3MX$X$X$VRX$X$X$3L3MW/W/X$X$3M3N3N3OX$X$3O3PW/W/X$W/3PW/X$X$X$3PW/3PW/W/3PW/W/W/X$X$3P3QX$3QX$X$W/3Q3R3S3SX$X$3TW/3TW'W'3TW/W'W'W'W'W/W/W/3S3T3U3U3VW'3WW/W/3WW/WVW/3WW/3WW/WVWVW/W/3WW/3WX$X$X$3W3XX$X$X$X$3XX$X$X$X$3X3XW'X$3YW'W'3Y3Z3ZX$4#W'4#4$W'W'W'4$W'W'4$4%W'W'VRVR4%4&VRVR4&4'WXWXWX4'WXWXWXWP4&4'4(WPWX4(WXWP4(WPWPWPWP4(WWWWWPWPWP4(4(4)WWWW4)WWWWWWWX4)WXWXWXWP4)WP4)WXWPWPWXWX4)X.WPWPWP4)WW4)WWWW4)WWWWWW4)V&UCV&UCV&UC4)4)4*UCV&V&V&UCV&UCUCV?V?UCUC4(4)UCUCV?V?4(4)V?V?4)4*4+V&4+TYTYTYV&TYV&TY4*TYV&TY4*U2U2U24*U2U2U2TP4*TPTP4*TY4+TY4+TNTNTNTN4+TNTNTN4+TNU?4+UUU?UUTN4+TNUUTNUU4+UUUUUU4+UUUUUU4+4,TNUU4,UU4,UUTNUUYDYD4,YDYDYDS<S<YDYDYD4+YD4+S<S<S<S<S<4+4+4,S<4-S2S24-S24-S2S<S2S2T)S2S2S2T)S2T)S2S2S2T)S2T)T)T)T)T(T)T(4(Y;Y;Y;Y;Y;4(Y;Y,4(Y,Y,4(XXY,XXY;Y;Y;4(W0W04(W04(4)WIWIY;Y;W+W+Y;Y;4(Y;Y;Y;Y;4(W+4(W+W+Y;W+W+W+W+W+4'W+4'WIWIWIW&4'W&W&4'4(W&W&W&W&W&4(W&W&4(W+W9W&W9W9W&4'W9W9W9W9W94'W9W94'4(W94(W94)W&4)4*W+4*W+W9W+4*4+VS4,W+W+4,W+W9W9W14,4,W9W9W9W9W9W9W24+W2W2VSW9VSW94+Y;Y;W+W+4*Y;W+W+Y;Y;Y;4*W+4*W+W+W+VY4*VYY;Y;4*Y;Y;Y;W+4*Y;Y;VYVY4)VYVYVYY;Y;VY4)Y;Y;4)VYX&X&4)X&VYX&VY4)X&X&VYVYX&X&VYX&4'X&VYX&4'X&X&X&VY4'VY4(4(X&4)X&X&X&VYX&4(X&VYVYX&X&VY4(VYX&VYVYVYX&VYVYVYX&VYX&VY4%4&VY4&X&4'X&X&VWX&X&VWVW4&4'VWVW4'4(4(4)X&VWVWVWVWW:VWVWW:W:4'WV4(4)X&W:X&X&4(W/4)4*4*W:W:W:W:W:4*W<W:W:W<W<W:4)W<W<W<W<W:W<W:W:W:4(4(4)W:W:4)4*4+W<W:W<W<W<4*W<W<W<W<4*W<W<W<4*W<W<W?W?4*W?W?W?W<W?4)W?4*W<W?W?4*W?W<W<W<4*W?W?4*W?W<W<W<4*W<4*W<W?W<W?W?W?W<W?W?W?WWWWWWX(TNTN4'TNUJUJUQUJTOTOTO4&TO4&TO4'UJTNUJ4'UJ4'UJUJTNTN4'TNUQUQ4'UN4'4(UJUJTNTNUJ4(UNUQUNUQTNTN4'UJTN4'TNTNS;S;T(S;W9W9S;4&S;4&S;WT4&WTWTWT4&4'WCVY4'WTWTWTWTVZ4'VZ4'VZWTVZVZWQWQWQW.WHW.4&W.4&W.W.W.4&W.WH4&WHWHWH4&W.W.W.4&W.4'WHW:W:4'W<X&W<X&X&W<W<4&W<4&W<X&W<W<W<W<4&W<W?4&W?W?W?W?4&W?4&W?W?W?4&W?W?4&W=W?W=4&WXW=W=W=W=4&W?W?4&W?W,W?4&W?W?W?4&W?W?W,W,W?W,W,W?W,W,W?W?4$W,4$4%W,W,W,W,4%W,W?4%W?W?4%W,W?W,W?W?W,W,W?W?W,W,4#4$4%4&X0WXX04&WXWX4&4'WXWX4'WXWXWX4'4(UKUK4(UNUQUQ4(UNUMTJ4(TJ4(TJTJTJUMTJTJTJTJTJTC4'V:VAV:4'4'4(4)4*V8V8V8T.SC4)SCT$T$T$S?4)WTWT4)WTW,W,W,X04(X-W$W$X-X-W$4(X-X-4(W$X-X-4(4)W$X-4)X-WX4)4*WX4*W44+4,4,U-UNU-T<T<TK4,TUTUTKTU4+TKTFTKV(V(TKTKS6S6S64*S?S?4*S6S6S6S?S?S6S?S?S?S?S?S7S74'4(S0S0S/S04(S0SOT&SOT&SB4'SBSBSMSBSMSB4&SZSZSZSBSZ4&SZSB4&SZSB4&SWSWSWX0W$X0W$TFTFTF4%S/S/SXS/S0SO4$SO4$SO4%SOSOT&SOT&S0SOS0S0SOSO4#4$SO4$4%4&S0SOS0S0T&T&T&4%T&4%T&T&S5S5S54%S5S5S54%SHSHSQSHSQ4$SQSISISI4$SI4$SISQSISQSQSQSISISISI4#4#SY4$SYWAWAW7W7WAWAW7WAWAWA3Z4#4#4$W7W74$W(WBWBW(WB4$W(U(U(T/4$U(U(V-U(S9S9SPSPS9S9S9SPSPSLSPSLSL3XSLSL3XSL3Y3ZSLSLSPSP3Y3Z4#SL4#SI4$SISISISI4$SQ4$4%SKSQ4%SQ4&SK4&SKSK4&S:SQS:SISI4&SKSKSKSK4&4&S:S:4'S@4'S@S@SISYSISYSYSYS@4&SYSY4&SY4&SYS@SYSYS@S@S@WOWF4%WFUGV)V)V)V)4$V)TTV3T/V3V3V-V-4#4$V-V-4$4%4%4&T?T?T?4&T?T?V-U(V-V-U(U(U(4%V-V-UE4%V-V-4%V-SPSQSPSQ4$SQSRSQ4$SQSRSRSQSQSRSQSRSRSR4#SQSQSRSQS@S@SR3ZSR3ZSRSRS8S83ZS83ZS8ST4#ST4#STSTS8S84#S8UB4#V1V14#T3T3T7UAUAUA4#TITI4#TITTTTTT4#TITIV3V3TI3ZTIV33ZSRSFSFSGSFSGSGS83YSTS8SF3YSFSFSFSF3YSG3YT3T7T7T23YT2T2T:T:T1T:T:T2T:T2T13WT1T13WT2T1T2T2T2T23WT=T=T23WT23WT2T23WT=T=T=3WTIT=TI3W3XT=3Y3YV3V3V33YV3V3V3T=3YT2T23YV3V3V3SESE3YSGSESESE3YSESGSGSGSGSG3X3YSG3YSG3ZSGSVSVSVX>X>X>XF3X3YXFXFT5T53YT53Y3ZT7T73ZT5T74#T5T54#T5T94#T9T9T2T24#T2T9T2T9T23Z4#T0T04#T2T0T0T24#T0T04#V34$URT2URT2URV3V34#4$T2UR4$UR4$URURURT2T2T24$T24$T2T24$T2T04%T2T2T2URURUR4$URV3V34$4%V3V34%V3T2T2T0T04$URT0UR4$SUSGSUX?X?XFX?XFXF4#XFX=XDX=XDXD3ZXDXDXFXF3Z4#4#XDXDXDT74#T7T7X=XDX=XD3Z4#T6T64#4$T6T6T64$T6T6YW4$YWYW4$4%YW4&Y9Y94&Y94&4'Y9Y9YJYIYIYIYJYJYIYIYJYJYIYIX14$X1X14$X1X)X)X1X14$4%X1X1X)X)X1X1X)4$Y64$YBYBY64$YBYBY64$YBYBYBYB4$YBY64$Y6Y6YBYB4$YBY)4$Y)Y)Y.Y.Y)Y.Y)Y.Y)Y.3ZY)Y.Y.Y)Y.3ZY.3ZY.Y.Y.YJYWYWYWYJYJ3Y3ZY5Y5Y53ZY.3ZY.Y.3ZY.Y.Y.YWYWY53ZY5YWY5Y5Y.Z'Y.Z'Y.Y.Y.3X3XZ'3YZ'3YZ'Y.Y.Z'Z'3YZ'3Y3ZZ%Z%YNYNZ%Z%YNYNZ%Z%YN3XYNYN3XYX3YYXYXYIYXYXYIYI3XYIYGYIYGYGY>Y>YIYIY>Y>YIYIY>YPY>Y>YIYIYIYZYZYZYIYZYZYPYZYZYPYP3QYPYIY>YIYIY>Y>YIYIYPYIYIYIYIYIYIYPYZYPYPYPYPX13LX1YP3LYPX1YPYPYP3LYPYP3L3MYPYP3M3N3NX1YPYPX1X13NX13NX1X1X1YI3NYIYIYI3NYI3OYIYI3OX13OX1X1X13O3PYIYI3PYIX1X13PX1WRWRX13PX1X13P3QX)X)3Q3RW@W@W@W@W@3R3RW6W6W6VBVBVB3RVBVB3RVBVBVBVB3RVBVB3RVBVBUCVBUCVBVB3Q3RUCTGTGTGTYTNTYTYUY3PUYUYVDVD3P3QULUL3QULULULTNTNTZTZULUL3OUL3PTNTN3PTNTNULUL3PTNV@V@TZTZV@V@3OTZUPUP3O3PUUUUUU3PUP3PUUUUY8Y8Y8Y<YBYBYBYKYKY0YK3NYK3NYKYKYKY0YKYKY0Y)Y0Y0Y)Y)3LY)Y0Y)Y0Y03KY0Y0Y0Y03K3L3M3M3NYK3OY03OYKYKY0Y03O3PYK3PYKYK3PY)Y0Y03P3QY0Y0Y)Y)3Q3R3RY)Y0Y03RY)Y03SY)Y)3S3T3T3UY0Y03U3VY0Y0Y)Y)Y)3V3V3WY)3XY)Y)3X3YY)Y)3YY.Y.Y.3YY.Y)3YY)Y)Y)3YY)Y)3Y3Z4#Y.4#Y.Y.Y.4#Y.Y.Y.Y)4#4$4%Y)Y)4%4&Y)4&Y)4'4'4(4)4*4*Y.4+Y.Y04+4,4-4-Y.Y)4.4.4/Y0Y0Y)4/Y0Y0Y.Y.4/Y.YK4/YKYK4/40YKYK4041YKY0Y0Y0YKYKY0YCY040YCYC40YCY040414242YC4344YCYC44YC44Y.45Y.Y.Y.4546YK46YKYK4647YKYK47Y.YKYKYKYKYKZ)Z)Z)Z)46YKYKYK46YK46YKYK4647484949YKYKYKZ)Z)494:Z)Z)YKYKYK49YOYOYKYOYK4949YOYOYOYOYO49YOYK494:YOYKYOYOYO49YOYOYOY.Y.YKYKY.Y.YK48Y.Y.48Y.YK48494:4:Y.Y.Y.4:Z'4;Z'Y.4;Y.4<Y.4<4=Z'Y.4=Y.Y.Y.Y.YMYMY.YM4<YMY.Y.Y.4<4<4=YMYM4=YMYMYM4=Y.4>Y.Y.4>4?4@Y.Y.Y.YMYMYMY.Y.Y.YMYMYM4=4>4?Y.4?Y.Y.Y.YKY.4?Y.4?Y.4@Y.4@Y.4A4BY.Y.4BY.4B4CZ)Z)4C4DZ)Z)Y.Y.Y.4DY.Y.4DY.4DZ)Z)Z)Z)4DZ)4E4E4FZ)4GY.Y.4GZ)Y.Y.4GZ)Y.Y.4GY.Z)4GZ)Z)4GZ$4HZ$Z)4HZ)4IZ$Z$4IYOZ)Z)Z)YO4HYOYOYO4H4IYOZ)Z)4I4JYO4J4KYOYOZ)4KZ)Z)4KYOYOYO4KZ)YOYOYOZ)YOYOYOYO4JYO4J4KYOYOY.4KY.4L4L4MZ$Z$Z$Z$4MZ$Y.Z$Z$Z$4LZ$Y.Y.Y.Y.4L4MY.Y.Y.4MZ$Z$YOYAZ$Z$YA4LYO4LYO4MYAYA4MYAZ$Z$4MZ$YO4MYOYOYOYOYOZ(YOYOZ(4L4LYA4M4NYO4NYAYA4NYAYAYAZ'Z'YMYMYMYM4MYMYMYM4M4NYMYM4NYMZ'Z'4N4OZ'Z'YM4OZ'Z'4O4PYM4PYMYM4PZ'4Q4RYMYMYM4R4RYM4S4TYMYMY/Y/YMY/4SY/Z'Z'Y/Y/Z$4RZ$Z$4R4S4T4U4UZ$Y2Y2Z$4U4VY2Z$Y2Y2Y2Z$Y2Y2Y24TY/Z$Y/4TY/Z$4UZ$4UZ$4V4V4WY2Y2Y/Y/Y24W4W4XY2Y2Y/4XY2Y24X4YY2Y24Y4ZY2Y24Z5#Y2Y2Z$Z$Z$5#Z$YA5#YAYAY2YAYAYAYAYAZ(Y2Y24YY24YY2Z(Z(YA4YZ(Z(Y2Y24YY2Z(4YZ(YR4YZ(YRYRZ(Z(YR4YY2Y24YY2Y/Y/4YY/Y/Y2Y2Y2Y/Y/4XY24X4YY2Y2Y2Y/Y2Y2Y/Y/Y2Y2Y/4WY/4X4XY?Y?Y?4X4Y4ZY2Y?Y?4ZY?Y2Y14ZY1Y24ZY2Y1Y2Y2Y2Y-Y2Y2Y24Y4YY-Y-Y-Y2Y24YY2Y2Y24YY2Y-Y1Y-4YY1Y14YY1Z(Z(Z(Y-Y24XY2Y2Y2Y1Y1Y1Y-Y14WY1Z'YGZ'Z'YGYGZ'4VYGYG4V4WZ'Z'Z'Y?Y2Y?4VY1Y14VY1Y14VY?Y1Y14V4WY4Y4Y4Y4Y14WY44WY44XY4Y?Y4Y4Y4Y?Y4Y?Y4Y?Y4Y4Y4Y?4U4VY44VY4Y4Y44VY44WY44WY4Y4Y4Y4Y44WY14WY1Y1Y?Y?Y?4WY?Y?4WY1Y14WY1Y1Y?4WY1Y1YGYGY?Y?YIYI4VYIY?4VY?Y?4V4WY?Y?Y?YTYTYT4VYIY?YIYIYIZ&Z&YIYI4UYIYIYIYSYSYIYIYSYSYIYIYSYI4RZ&Z&Z&Y?Y?YIYIY?YIYIYI4PYI4Q4RY?Y?Y?4RY?YI4RYIYIYI4RYIYIYIYSYSYSYS4QYSYPX1X1X1Z&Z&Y+Y+4OY+Y+Y+X14OWMWMX1X1X14OVXVXVU4OVXVXVUVUVXVX4NVUX+X+4NX+4NX+X+X+X*4NX*X*4NX*X*X*WX4NWXWX4N4OWXWXW)W)4O4PWXX/WX4PX/X/4PX/WXX.X.X.UCTY4OTY4OTYUCTYTNTNTY4OTZTZ4OTZTZTZTZ4OTN4OTNTNTZTZ4OTZTZTZ4OTZTZ4O4PV@4P4QV@V@TZTZTZ4QTZTZ4Q4R4RV@TZV@TZTZ4RUU4RU44SU9U44SU9U94SU3U3U34SU3U3U3TNU3TNU3TNU3TNU3TNU3TNU3TNU8TN4P4PU8U8TNTNU7TN4PTN4PTNTNUUUU4PUU4PUUUUUUU>U>U>UUU>4OU>U>UUUU4OUUU>U>UUUUU>UUUUUUV@UUV@4M4MV@4NV@4NV@4OV@V@4OV@V@UUUU4OUUV@V@UUUU4NUUUUUUV@V@V@4NV@V@4NUU4NUUUUUUYDYD4NY@4NY@Y@Y@YDYDY@Y@YDYDY@Y@YDYD4LYD4LYDYDYDYDYK4LYK4L4MYDYDYDYD4MYDY*4MY*Y*4MYKYDYDYKYK4M4N4NYKYDYDYDYKYDYDYKYK4M4NYKYK4N4OYK4OYKYKYOYOYKYKYO4NYKYKYK4NYKYKYOYOYKYKYKYO4MYO4MYOYKYOYKYKYKYOYO4LYO4M4MYO4NYOYRYRZ(YRYRYRZ(YR4LYRZ(YRZ(YRZ(Z(YRYR4KYRZ(4KZ(Z(Z(YRZ(4KZ(Y-YRYRYRYRYR4JY-Y-YRY-4IY-Y-Y-YR4IYRY-Y-Y-Y-YVY-YVY-Y-YLYLYLYYYLY-Y-Y-YYY-YYYYY-Y-YYY-YLYYYLYYYLYYYLYYYYYU4A4BY-Y-YU4BY-YUYUYUYUY-YUYUYUYUY,Y,YUYUY,Y,4>Y14?4@YV4@YVY14@Y1Y1Y1Y1Y1YV4@Y1Y14@Y1Y1Y1Y14@Y1Y14@YVY14@YVYVY1Y1Y14@Y1Y14@Y1YV4@YVYVY1Y1YVYVY1Y1YVYVYVY;Y;Y;4=Y;4>Y;Y,Y;Y;Y;Y,4=Y,4>X2X2Y;X2Y;4=Y;Y;4=Y;Y;Y;Y;X2Y;Y;X2X24<X2Y;X&4<4=W#YIW#W#W#W#4<W#W#W#4<4=4=W#X&X&W#W#4=4>X2W#4>W#W#W#X&X&W#W#4=W#4=WVVWVWWVWVVWVWVWVW4<VW4<WV4=WVWVWVVWWV4<WVVWWVVWWVVW4<WVWVWVX$WV4;WVWVWVWVVWVWWVWVVW4:VW4:VW4;WVWV4;WVVRVR4;4<WSVRVRVRVR4;VR4<4<4=X$X$VRVRVR4=4=X$X$X$VRVRW'W'VRVRW'W'W'W'W'4;W'W'4;4<X$W'X$4<W'4<W'W'VRVR4<4=VRX$VRX$4<X$X$X$4<X$X$X$X$X$X$4<X$X$4<X$4<4=W/W/4=4>W/W/X$X$4>4?X$4?W/W/4?4@W/W/4@4AW/W/X$W/W/W/X$X$X$W/X$4?W/W/4?W/W/W/X$W/W/W/X$X$W/X$4=4>X$X$W/4>4?4@W/X$4@4AX$X$4AX$4AX$X$X$X$X$4A4BW/W/4B4CW/W/W'W'X$X$4B4CW'4CW'W'4CW'W'W'4CX$4DW'4DW'4EW'4E4F4G4HW/W/WVWVWVW/WVW/4F4GWVWVW/W/W/4GW'4GX$X$X$4GX$X$W'4G4H4IX$X$4IX$X$4I4JW'W'W'W'4J4J4KX$X$W'W'4K4LW'W'4L4MX$X$X$4M4MX$W'W'X$4M4NW'4N4OW'W'4O4PW'4QX$4Q4RW'4RW'W'W'W'4RW'W'4RW'W'W'W'4RW'W'4RW'W'W'WXWX4R4SWXWXWX4SWXWP4SWPWX4SWPWPWX4SWXWPWXWX4SWPWPWPWW4SWP4SWWWWWP4S4T4UWPWPWWWWWPWW4T4UWXX.WX4UWX4UWPWPWXWX4UWPWXWXWXX.WPWP4TWWWP4TWWWWWP4T4UWWUCV&UCV&V&V&4TV&UC4TUCUC4TV&V&V&4T4UV?V?4UV?V?V?UCUCV?4UUCUC4U4VUC4VV?V&4VV&V&V&4VV&U2U24V4W4X4YV&TYV&TY4X4YU2U24Y4ZU2U24Z5#TP5$TYTY5$TY5$TYTPTP5$TNTYTNUUUUTNUUTNTNU?U?U?UUU?U?TN4YUUUUTNUUUUUUTNUU4XUUTNUUTNTNUUUU4WUUTNTNTN4WTN4WTNTN4WYDY@YDYDYD4WYDYDS=4WS=4W4XS<S<S<S2S<4XS2S24XS2S<S2S<S<S2S24WS24WS2S<S2Y;Y;Y,Y,Y;Y;Y,Y,Y,Y;Y,Y,4TY,Y,Y,Y;Y;Y;Y,W0W04S4TWI4TWIWIW0W0WIWIY;Y;4SW+Y;4SW+W+Y;Y;W+Y;4RW+W+W+W04RWIWI4R4SW&W&4S4TW&W&4T4UW&W+W&W&W&4UW&W&4UW+W&4UW&W9W9W9W9W24T4UW2W2W9W9W9VSW9W24TW2W9W2W9W9W&W+W&W+W&W&4R4SW94SW9W9W9W+VSVSW+W+VS4RVS4RVSVS4R4SVSVS4SW94TW9W14TS;W9W9W24TW24TVS4UVSY;Y;Y;W+Y;Y;W+4TW+W+W+4TW+4TVYVYY;Y;4TY;Y;4TVYVYW+VYW+VYVY4SVYVY4SVYVYVY4SX&4TX&X&X&VYX&VYX&VYX&VYVY4R4SVYVYVY4SVY4SVYVYVYX&4SX&4SX&VYX&VYVYVY4S4S4TVYVY4T4UVY4VVYVY4VVYX&X&4VX&VYX&VY4VVWVWX&4VVWVW4VX&VWVWX&4VVWVW4VVWX&4VX&X&4VVWVWVWWVWVW:WVW:4UW:W:4UW:W:W:W/W/4UW/W:4UW:W:4UW/4VW:W:W:4VW:4VW<4WW<4WW<4XW<W:W<W:W<W:4WW:W:4WW<W:W<W:W:W:4WW:W:W:4WW:4W4X4Y4YW<4ZW<W<W?W<4ZW<4ZW<W<W<W?4ZW?W<W?W<W?W<W?W<W<4XW?W<W?W<4XW<4YW?W?4YW?W<W<4Y4Z4ZW?W<W?TNTN4Z5#TOTOUQTOUQUQ4ZUQ4ZUQTOUQ4ZTN5#TN5#TN5$5%TNTNUJTNUN5$UNUN5$TNUJ5%TNTN5%TNUJ5%UJ5&TNTN5&UJTN5&TNUUW9VS5&VSS;S;S;WT5%WTWTWTVY5%WCVY5%X&VYVYWC5%WTWTWTWTWTVZWTVZWTVZW.WHW.WHW.WHW.4ZW.4ZW.5#5#WH5$WHWHWH5$W.5$W.W.W.W.W.W.WHX&W<X&W<W<W<4ZW<4ZW<X&X&W<W<W<W?W<W<W<W?W?W?W?4XW?4XW?W=W?W=W?4XW=W=4XW=WXWXW=4X4X4YW?W?W?W?W,W?W?W?W?W,W,W,W?W,W?W?W,W?W?W?W,W,W?W,W,W,W,W,W?W?W?4RW?W?4RW,W?W,W,W,W,4R4RW?4SW?W,4SW,W,4SW?4TW?WXWX4T4UWXWXWX4UWXWX4U4VWXWX4VWXWXWX4VX#4VWXX#WXT@T@T@4V4V4WUNUNUMTJUMTJUMTJUMTJ4UTJTCTCVAVAV:V:T-T-T-4TT-T-4TUHUHUDUDUD4SV6V6V6SCT$4ST$T$T$S?S?WTWTWTVQX0X04QX0X-4QW$4RX-4R4SW$W$4SW$4TX-X-4TX-W$4TW$W$WX4TWXWX4T4U4V4W4WW4W4W4W4W4WXWXW4W4WXWXUNUNUNU-T<T<TKTKTF4STF4TS6S64TS6S?S6S6S6T%T%S0S0T%T%S0S0S/S/S/S0SB4PSBSB4PSZ4QSZSB4QSBSB4Q4RSBSBSASASASWTFTK4QTKS0SOS0SOS0SOS0SOS0SOS0S04NSOS04OSOSO4OSO4OT&SOT&SO4OSOSO4OT&T&T&T&4OT&4PT&4PT&4Q4Q4RSLSLS5S54R4SSQ4SSQSISISI4SSISQ4SSQSQSI4SSISYSISISISY4RSYSYSYWAWA4R4SWAWA4S4T4TWYWYWYWYWY4T4UWBW(WBWBW(4TWBWB4TU(4UU(SLS94US9SPSPSLSLSLSLSPSLSLSLSLSPS94RS94S4S4TSLSLS9SLSLSLSQSI4S4T4TSISQSISISISKSISQSQ4SSKSQ4SSQSKSQSK4SSK4SSKSQSQSKSKSKS:SQ4RSQS:SISISI4RSKS@SKS@4Q4RS:S:S:4RS:S:4RS@S@S@SYSYS@4RSYSY4RSYS@S@4RSYWOWFWFWFV)4QV)TTT?V-V-V-V-V-4PV-T?V-T?4PV-UEUEUEV-4OT?T?4OT?T?T?4OUET?T?U(V-V-V-V-V-UEUEV-V-UEUE4LSQSRSRSQSRSRSRSR4KSRSRS@S@SR4K4KSRSRSRS8S84KS84KS8STS8S8S8ST4KST4KSTST4KS84L4MUBV1V1V14LUAT3T3UA4LTITITITI4LTITTTT4LTTTITITI4L4LSRSFSRS8S8S84LSFSFSF4L4LSGSGSGT3T3T7T3T2T=T2T2T14JT1T14JT2T1T2T2T2T24JT2T=T24JT24JT2T24JT=4KT=4KTIT=TIT=T=T=4KV3V34KV34KV3T2T2T24KT2V3T2T24K4LT=T=4L4MT24MV3V3SESESESGSESESE4LSG4LSUSU4LSUSUSUSGSG4LSU4LSUSUSUX>4LXFXF4LXFXFXFT5T5T7T5T74KT7T7T5T54KT7T5T5T74K4K4LT7T7T5T54LT7T2T2T9T2T2T24K4LT24LT2T04L4MT04NT2T2T0T04MT0T0T0T2T24MV34MURURURURV3UR4MV3V34MV3T2T2T24M4MURT2URT24MT2T2T24MT24NT2T24NT2T2T2T04NURUR4NURV3V3V34NV3V34NV34NURURURURURT04NSGSUSG4NXFXF4N4OXD4OXDXDXFXF4O4PXFXF4PXDXD4PXDXD4PT0T7T74P4QT6T6T1T1T6T6T14PT6T64PT1T6T6T14PT6T6YWY9YW4PY9Y9YWYWY9Y94OY9YW4OYWYW4OY9YWYWYWYWYWY9YW4NY9Y9X1X1X14NX1X14N4OX)4OX)X)4OX)X)X)4O4PX)X)Y6Y64P4Q4Q4R4SYB4S4TYBYBYBYB4T4U4UY6Y6Y6YBYB4U4VY.Y.4VY.Y)Y)Y.Y.4UY.4VY.4VY.4WY.YJYJ4W4XYJYJ4XYJY5Y5Y.Y.Y54WY.Y.4WY.Y.Y.YWYWY54WY.Y.Y.Z'Y.Z'Y.Z'4UZ'Z'Z'Y.Z'Y.4UY.4UY.Z'YNYNZ%Z%YNYNZ%4TYX4TYNYNYXYX4TYX4TYNYNYN4T4U4VYI4V4WYZYPYPX1X1X1YP4VYPX1YPYPYP4VYPYP4V4WYPYP4WYPYPYP4W4X4XX14YX1X1X1YPYPX1X14XX1YPYP4XX14X4YYIYIYIYIYI4YYI4YYIX1YIYIYI4Y4YX1X1X1YI4YX1X1YIYIX1YIYIYIX14XX1X1WR4XX1X1X1X)4W4XX)X)4XX)X)X)WJWJW@4X4XWJW@W@W64XW6W6W@W@W@W6VBVBVB4WVBVB4WVBVBVBVB4WVBVB4W4XVBVBVB4XVBVB4XVB4XTNUY4Y4Y4ZVDTN4ZTNTNTN4ZUL5#5$ULUL5$UL5$5%TNTNTNULTN5%5%TNTNTN5%5&TZTZUPUPUP5&UPUP5&UPUUUPUUUPUPUP5%UPY0Y0YK5%YK5%YKYKY0Y)Y05%Y)Y)Y0Y0Y0Y05$5%5%5&YKYK5&YKYKYKY0Y05&5'Y0Y05'Y05'5(YK5)Y0Y0Y05)5)5*YKYK5*Y05+Y05+Y0YKYKY)Y)5+Y)Y)Y)5+5,5,5-Y0Y0Y)Y)5-5.Y)Y05.5/Y)Y)Y0Y)Y)Y)Y)Y0Y0Y)Y0Y05,Y0Y0Y0Y0Y)Y05,Y05,Y0Y0Y)Y)5,Y0Y)5,Y0Y05,Y)5-5.Y)Y)Y.Y.Y)5-Y)Y)Y.Y.Y)Y.Y)5,Y)Y)Y)5,Y.Y.5,5-Y.Y.Y)Y)Y.Y.Y.Y.5,Y.Y)Y.Y)Y)Y.5+Y)5,Y)Y)Y)5,Y)5,5-Y.Y)Y.Y.Y.Y.Y.5,Y.5,Y.Y.Y.Y)5,Y)Y)5,5-Y.Y.5-Y.Y.Y.5-Y0Y0Y0Y)5-Y05.Y)Y)Y)5.Y)5.Y)5/Y)5/Y)Y)Y.Y.5/Y.Y)Y)Y)5/Y.Y.5/Y.5/50Y.Y.50Y.51Y.51Y)52Y)Y052535454Y)Y)Y)54Y)55565657Y)585859Y05:Y)Y)5:Y)5:5;Y)Y.Y.Y.Y0Y.Y0Y0YKYKY0Y0YK59Y0Y059Y0Y059YKYKYKY0YKY0Y0YCY058YCYC58YCY0Y0Y058YK58YKYK5859YKYK59YCYCYCYCYC595:YCYCYC5:YCYC5:YKYCYC5:5;5;Y.YCY.YK5;YK5<Y.Y.5<Y.5<Y.YKYK5<5=5>YK5>5?YKYKY.Y.5?5@Z)Z)YKYKYK5?Z)Z)Z)5?YKYK5?5@5AZ)5A5BYKYK5BZ)Z)5CZ)YK5C5D5D5EYKYKZ)Z)YKYKZ)Z)YKYKYKYKYOYOYKYOYK5BZ)Z)YOYOYOYO5AYOYKYK5A5BYKYOYKYK5AYOYOYOY.5AYKYKY.Y.5AY.YK5A5B5CYKYK5CY.5CY.Y.Y.5CY.Y.Y.Y.Z'5CZ'5CZ'5DZ'Y.Z'5DZ'5DZ'Y.Y.Y.5DY.5EY.Y.Y.Z'5DZ'5EZ'5EYMYMYMY.Y.Y.5EY.Y.YMYMY.Y.YMYMY.YMYMYMY.Y.5BY.YMY.YMYMY.5A5BZ'Y.5BY.5C5CZ'Z'Z'YKYKYK5CYK5C5DY.YK5DYK5E5E5F5GY.YKYKYK5GYK5GYKYKYKY.5GY.5GY.YKY.5GY.YK5HY.Y.5HY.Y.Y.Y.5H5HZ)Z)Z)5H5IZ)Z)5I5JZ)Z)Z)5JZ)Z)Y.Y.Y.5JY.Y.5JY.5J5KZ)Z)Z)Y.Z)Z)5JZ)Z)Z)Y.Y.5JY.Y.Y.5JY.Z)Y.Z)Z)Y.Z)Z)Z)5H5IZ)Z)Y.Y.Z)Y.Y.Y.Z)5HY.Y.Z$Z$5GZ$5HZ$Z)Z$Z)5H5HZ$5IZ#Z$Z$Z$YOZ)Z)Z)YOZ)Z)YOYOZ)Z)YOZ)Z)Z)Z)YOZ)Z)Z)5D5DZ)5E5FZ)YO5FYOZ)Z)Z)5F5FYO5GYOYO5GYOYOZ)5GYOYOZ)Z)Z)5GZ)YO5GYOY.Y.Y.5G5GZ$Z$Z$Y.Y.Z$Z$5FZ$Z$Z$Y.Z$Y.5FY.5FY.Z$Y.Y.Y.5FY.Y.5FZ$Y.Y.Y.Z$YAZ$YAYAYOYOYOYA5CYA5D5EYAYA5EYAZ$Z$YAYAYOYOYO5DYAYAZ(5D5DYAYAYA5D5EYOYOYAYA5E5FYOYO5FYO5FYA5G5HYMYMZ$YMYMYMYMZ$YMYMZ$5FYMYM5FYMZ'Z'YMYMZ'YMYMYMZ'Z'YM5DZ'Z'5D5EZ'Z'5EZ'YM5EYMYM5EZ'YM5FYM5FYMYMZ'Z'5FZ'YMYMYMY/YMYMYM5E5EY/Y/Y/5EY/Y/Y/YMY/Y/Y/YM5DZ$Z$Z$Z$Z$5DZ$Z$5DY2Z$Y2Z$Z$Y2Y2Z$Z$Z$Z$5BZ$Z$Z$5BZ$Z$5BY2Y25BYMZ$YMZ$5BZ$5C5C5DZ$5EZ$5EZ$5FZ$5FZ$Y25FY/Y2Y2Y/Y/Y2Y2Y/Y/Y25EY25EY2Y2Y/Y/Y2Y2Y/Y/Y2Y2Y/Y/Y25CY/Y/5C5DY/Y/5D5EY/5EY2Y25EY/Y2Y25E5FY2Y2Z$5FYAYAZ$5F5G5HY2Y25HY25HY2YAYAYAYAYA5HY2Y25HY2Z(Z(5H5IZ(Z(5IZ(5IZ(YR5JY2Y25JY2Y/Y/5J5KY25KY2Y2Y/Y2Y2Y25JY2Y2Y2Y/Y/Y/5JY/Y?Y?Y?Y/Y?5IY?Y/Y/Y/5IY?Y?5I5J5J5KY2Y2Y?Y?Y2Y?Y2Y1Y1Y1Y2Y1Y1Y1Y2Y2Y25HY25HY-Y-Y2Y25HY2Y2Y2Y25HY-Y1Y-Y-Y1Y15G5HY25HY2Y1Y-Y-Y-Y15GYGZ'5HY?5HY?Y?5HY?Y?Y?Y2Y1Y1Y1Y?Y?Y15GY?Y?5GY1Y?Y?Y4Y4Y?Y?5FY?5FY4Y1Y4Y?Y?Y4Y4Y45EY4Y4Y4Y?Y4Y4Y?Y?Y4Y?5CY?5DY?Y?Y?Y45DY45DY45EY45EY4Y?Y4Y4Y?Y?5DY?5EY?Y?5EY?Y15EY?Y1Y15EY1Y1Y1Y?5EY1Y1YIYIY?5E5EYIY?YIYIYIY?Y?YIYIY?Y?YIYI5C5DYIYIZ&Z&YSZ&Z&Z&YIYIY?5BY?5B5C5DYIYI5DYIY?YIYIYIY?YI5CYIYIYIYI5CYSYSZ&Z&Z&Z&5BY+X1X1WMWMX1X1VVVVVX5@VUVU5@VUVUVUVRX+VR5@5@5AX+X+5AW6X*X*W65A5B5CW)W)WXWXW)W)WX5BW)W)5BW)WXW)WXWXW)W)WXWXWX5@WXWX5@5AWXWXUCUCUC5A5A5BUCUC5BTNTNTNTZTZ5B5CTZTZ5C5DTN5DTN5ETZTZ5E5FTZTZ5F5GTZTZ5G5HTZ5HTZ5ITZTZ5IV@TZV@V@V@TZTZTZ5HTZTZ5H5ITZTZ5I5JTZ5JTZ5KTZTZ5KUUU4U45K5L5LU9U9U9U4U4U95L5LU35MU35M5NU3U3TNU85NU8TNU8U8U8TNU7TNU7TN5LTNTNU3UU5LUU5LUUU3UUU>UUU>5L5LUUU>U>5LUU5MUUTZTZTZ5MTZ5M5NV@5NV@5OV@5OV@V@V@5OUUV@V@5OUUV@5PV@UUUUUUV@V@V@5OV@UU5OUUUU5OUUUU5O5PY@Y@YD5P5QY@Y@Y@Y@5Q5QYDYDYDYDYDYD5QYD5QYDYD5QYKYDYDY@YD5QYDY*5QY*Y*YKYKY*Y*YK5P5Q5RYKYK5RYKYD5RYDYDYKYK5R5SYKYKYDYDYKYK5R5SYKYK5SYKYKYOYKYOYOYO5RYOYKYK5R5SYKYO5SYO5SYOYKYOYOYOYO5SYO5SYOYOYOYO5S5T5T5UYOYO5U5VZ(5W5WYRZ(5X5XYRZ(Z(5XYLZ(5YYRYRYR5YYRYRYRY-YRY-YRY-YY5WYY5X5XYUYUYUY-Y-YUYUY1Y15WY1Y-5WY-Y-5W5XY-Y-YVYV5XY1YVY1Y1Y1YVY1YVYVY1Y15V5WY1Y15W5X5XYVYVYV5XYVYVYVY1Y1Y15XY1Y1YV5X5XYVYVYV5XY;5YY;Y,5YY,5ZY,Y;Y,Y;5YY;Y,Y;X2X2Y;Y;X2X2Y;Y;X2X2Y;X2Y;Y;5V5WX&X&5WX&W#W#5WW#W#W#X&X&5VW#X&X&X&5VX&X&W#W#X&X&W#W#5U5VX2X25VW#W#W#5V5WWVWVVWVWX&VWX&X&5UWVVWVWVWVWVWWV5TWV5UWVVWWVVWVWWVWV5TW/5TWVVW5UWVWV5UWVVW5UVWVW5UWVVWVWWS5UWSWSVRVRWS5UVRVRVR5UX$5UX$X$5U5V5WX$5W5XX$X$VRX$X$X$5W5XX$X$W'W'W'5XW'W'5X5Y5YX$X$X$5YW'X$W'VRVR5Y5ZW'5ZW'W'VRVRW'W'5Y5ZX$X$VRVRX$X$X$X$X$5YX$X$5YW/W/5YW/W/X$X$W/W/X$X$W/W/X$X$W/W/X$5VX$5W5WW/W/W/X$X$X$5WX$X$5WX$X$X$W/5WX$5W5X5Y5YW/5ZW/X$X$X$5ZX$X$W/W/W'W'X$5YW'W'5YX$W/W/W/5YW/5YW/X$5Y5ZX$X$W/X$W/W/X$X$5Y5ZX$X$5ZX$5ZX$X$X$X$X$X$5ZX$X$X$5ZW/5ZW'W'5Z6#W'W'W/6#W/W/6#6$6%W'W'W/W'6%W/6%6&6'X$X$6'X$6'W'W'W'6'W'6(W'6(W'X$W'X$X$W'6(W'W'6(W'W'6(W'W'X$W'W'W'WV6'WVWV6'W/WVWVW/6'W:W:W'6'W'X$6'W'X$W'W'W'6'6(X$6(X$X$6(6)X$X$X$X$6)X$X$X$X$W'X$X$6(6)W'W'6)6*X$6*X$X$W'W'6*W'W'6*X$X$6*W'X$X$W'W'6*6+W'W'X$X$X$X$X$W'X$X$W'6)X$X$6)6*X$6*6+6,6,6-W'W'6-X$W'W'6-X$W'6.6.X$6/W'W'6/W'W'X$X$W'W'6.W'W'W'6.6/W'W'W'6/W'W'6/60W'W'VRVR6061VRW'61W'WX61WXWP61WXWPWPWX6162WP62WPWPWP62WP63WPWXWPWXWPWX62WPWP62WPWW6363WW64WWWPWPWP64WP64WWWW64WWWWWWWP64656666WWWWWWWXX.WXX.WXWXWX6565WPWPWPWP65WPWPWPWP65WPWPWP65WWWW65WWWW65V&66V&UC66UC6767V&V&V&UC67V?V?6768V?V?6869V?V?UC69V?V?696:V?V?6:6;V?V?UCUC6;6<UCV&6<V&6<V&6=6>TYTYV&V&TYTY6=TYV&6=TYTY6=TYTYTYV&V&U26=V&V&6=6>V&V&U26>V&V&6>U2TYTY6>6?TYTY6?TY6?6@TPTP6@TYTP6ATP6ATPTPTYTNTYTNTNUUTNUUTNUUTNUUUUUUUU6>TNTNTN6>TNUUTNUUY@6=Y@6>YDYDY7Y7S=S=6=S=S<S<S<6=S<S=6=S<S<6=S<S<S2S26=S2S<S2S<S<S<S2S<S2Y;Y,Y,Y,W0W06:6;W0W06;W06;W0WIWI6;6<W+W+Y;Y;Y;6<Y;Y;6<Y;6<W0WI6=W+W+W&W&6<W+W&W&6<W+W&W&W+W+W&W&W&W+W&6;6;W+6<W+W&W&6<W+W&W+W+W+W&W96;W9W9W9W2W2W9W9W2W969W9W9W9W&W&W&W9W&W+W9W+6768W969W+W+696:VS6:VSVSW+W+VSVSW+W+VSW+68W9W1W168W9W9W968W9W1W96869W2W2W9VS69VS69VSVSVSY;Y;W+69W+VYW+69W+69VYVYY;Y;69W+Y;Y;69VYVY69VYVY69Y;VYVYX&X&VYX&VYX&VYX&VY67VYX&67X&X&X&VYVYVY67VY67VYVY67X&X&X&67X&VYX&VY67VY68X&X&68X&X&X&6869VY69VYVYX&X&69X&696:VYVYVYVYWC6:6:X&VY6;X&X&6;X&VWVWX&X&VWVWX&X&VW69X&6:VWVW6:VWX&6:X&X&6:VWVWVW6:6;W:6<WVWV6<W:W/W/W:6<6<6=W:6>W/W/6>W/6>6?W:W:6?W:6@W:6@W<6A6BW:6BW:W:W:W:W:6BW:W<W<W<W:6AW:W:6A6BW:6CW:W:W:W<6BW:W<W<6BW<W<W<W:W:W:6BW<W<6BW<W<W<6BW<W:W<W:W<W<W?W<W<W<6@W<W<W<W<6@6A6AW?W<W?W<6AW<W<W<W<6A6B6BW?W?W?W<W<W<6BW<W<6BW?W<6BW<W?V#TNV#V#TNTN6ATNTOUQ6AUQUQUQ6AUQTNTN6ATN6ATNUJUJTN6AUJ6BUJ6BUJUJ6BTN6CTNUNUQUNUNTNTNUJ6B6BTNUJUJTNTNUJUJTNTN6A6BUJ6BUJUJ6BTNUJUJ6BTN6CUUW9VSW9VSS;WTS;WTVY6AVYVY6AX&VYVYWCWTWTWTW.WHW.W.W.W.W.6?W.6?W.W.W.WH6?WH6?6@W.W.6@6AW.W.WH6AW.W.W<W<X&6AX&6AX&X&W?W?W?6AW?6AW?W=W=W=W?W?W=W=6@W=W=6@W=W=W=W=W?W=W=W=W=W?W,W,W?W?W,W,W?W?W,W,W,6<W,6<W,6=W,W?6=W?W,6=W,W,6=W?W?W?W,W?W,W?WXWXWXX06;X0X0X0WXWX6;6<WXWX6<W4WXWXW4W4WXWXW4WXWX6:6;X#WXWXX#X#T@T@T@6:UN6:UNUN6:UNUNUN6:6;TCTCT-6;UH6<UHUH6<UHUDUHUDV6SCT$6;T$X06;6<W$X-X-6<6=W$6=W$X-X-X-6=W$6=6>6?W$X-X-W$6?W$6?W$W$6?X-6@X-W$W$W$6@WXWXWX6@WX6@WX6AWXWXWDWXWX6@WXWX6@WXWXWX6@6AW4W4TF6ATF6BTFTKTFTKS6S6S?S?SZSZSB6@SZSZ6@SZSBSZSBSZ6?SZSBSBSB6?SBSB6?SZ6@SZTFTFTF6@S0SOS06@6@6AS0S06ASO6BSO6BT&SOSOSOSOSO6BSOSO6BT&T&SMT&6B6BSM6CSM6CSM6DSMSMSM6DSMS5S5S56DS5S56DSLS5S56D6E6ESQ6FSQ6FSISISISISISQ6F6FSI6G6HSISISI6HSISYSYSYWAWAWA6GWA6G6H6I6IWA6J6KWAWA6KWYWAWY6KWYWYWYWYW7WYW7W7W76IW(6JW(U(U(T/U(T/6IT/T/SL6ISL6JS9S9S96JS9SLSLSLS9S96ISLS9S9SLSLSQSQSQ6H6HSISISISQ6HSQSQSQSKSKSKSQ6GSQSKSQSKSQ6GSQ6GSQSK6GS:6HS:6HSKSKSKS:SKS:S:SK6GSKS:S:6GS:S@6G6HS@S@S@SYS@6HSYSY6HSYS@6HS@S@V)TT6HTTV-V-V-6HT?V-T?6HV-V-V-6H6H6IT?T?6IUET?T?6ISQ6J6KSR6KSRSR6K6LSR6MSR6MSRSRS8S86MS8STS8S8S8S8S8S86LS86L6MSTS8S8S86M6MSTSTSTSTS8STST6L6MT3T3UA6MTITIT=TI6MTITTTT6MV3TIV3TIV3SRSR6L6MS86MS8S8STST6MSTSG6MSGSGT16MT1T16MT26NT2T26NT26O6OT=6P6QT26QT2T2T=T=6Q6RT26RT2T=6RTIT=6ST=6ST=T=V3V36SV36S6T6UT2T26U6VV3T2T2T26V6VV36WV3T=6WT2T26WT=6XT=T26XV3V3SESGSESGSGSGSU6W6WSGSUSUSGSGSG6W6WSUSUSUX>6WXFXF6WXFXFXFT5T56W6XT76XT7T7T7T5T7T7T76WT76XT5T5T56X6XT7T7T7T2T2T26XT2T26XT2T26XT0T06XT2T06YT2T26YT2T0T2T06YT2T2T2T0T2T26X6Y6Y6ZURURUR6ZURUR6ZV37#7$7$UR7%URT27%T2URT2URT27%T2UR7%UR7%URT2URT2T27%T27%T0T0T07%UR7&URV37&URURV3V37&V3UR7&URURURURT0URSG7%SG7&XFXFXD7&7&XF7'7(7(7)XDXDXFXFXD7)XFXF7)XFXFXF7)XFXD7)XDXD7)7*T7T7T1T1T6T6T1T1T6T6T1T1T6T6T1T1T6T6T1T1T6T67%YWYWYWY9Y97%Y9Y9Y9YW7%Y9Y97%Y9YWY9YWY9X1X1X1X)7#7$X)X)X1X1X)X)7#7$X)X)7$X)X)X)X1X17$7%X1X1X17%Y6Y6YB7%7%YB7&YBY6Y6Y67&Y67&YBYB7&YBYBYBY6Y67&YBY6Y6YBYBYBYBY6Y6YBYB7$YB7$7%Y6Y6Y67%Y6Y67%Y6Y6Y6Y)Y.Y)Y)Y)Y)Y)7$Y)7$Y)Y.Y)Y.Y)Y.Y)Y.Y.Y.YJ6ZYWYW6ZYWYWYWYJYJYWYJY5Y56YY.Y.6YY.Y.Y5YWY5Y5Y.Y.6XZ'Y.6X6YZ'6YZ'Y.6Z6ZYNZ%Z%YXYXYNYNYNYX6YYXYN6YYNYNYX6YYXYX6YYI6ZYIYX6ZYXYI6Z7#YZYZYPYP7#YPYP7#7$X1YP7$YPYI7$7%YIYI7%7&YIYI7&YPYPYPX17&X1X1YPYPX1X1YPYPYP7%7%X1X1X1YPX17%X1YPX1X1X1X1YIYIYIYIX1YIYIYI6ZYI7#YI7#YIX1YIYIYIX1YI6ZX1X1YIYIX16ZX1YIX1YIX1X1WRX1X1X1X16XX1X16XX)X1X)X)X)WJW@W@W@WJWJ6V6WW@W@W6W@VBVBUCUCVBVBUCUCVBVBUCUCVBVBUCUCVBVBUCUCVBVBUCUCVBVBUCUC6OTNUY6P6PTNTNTNVDVDVD6PVDVD6PTNVDVDTNTNULULTN6OTN6OTNTNULULTNULTN6N6OUL6OULTNTNULULTNTNULULTN6N6N6OTNTNV@6OTZTZV@V@TZTZUPUP6N6OUPUP6OUPUPUPUUUPY0Y06NY0YK6NYKYK6NY)Y0Y)Y0Y0Y06NY0Y06NYKY0Y0YKYKY0Y06M6N6NYKYKYK6N6OYKYK6O6PYKYKY0Y06PY0YK6PYKYKY0Y0YKY06OY0YKY0Y0Y0YKYKYK6NYKYK6N6OYKYKY0Y06OY0YK6OYK6PYKY0YKY0Y06OY06PY)Y)Y0Y0Y)6OY0Y0Y)Y)Y)6OY)6OY0Y0Y06O6PY06P6QY0Y0Y)Y)Y0Y0Y)Y0Y0Y0Y)Y)Y0Y06NY)Y0Y)Y)Y)6NY)6NY0Y0Y0Y)Y)6NY0Y)Y)6NY)Y06NY06OY)Y)6OY)Y)Y)Y)6OY)Y.Y)Y)Y.Y)Y.6NY)Y)6N6OY)Y)6OY)Y.Y.Y)6OY.Y.Y)Y.Y)6NY)Y)Y)Y)Y)Y.Y)Y)Y.6MY)6MY.Y.Y.Y.6MY.6MY.6NY.Y)Y.Y)Y)Y)6MY.Y.6MY.Y.Y.Y.Y)Y.Y.Y0Y)Y0Y0Y)Y)6KY)Y06K6LY)Y)Y)Y)Y.Y)Y.Y)6KY)Y)6KY.Y)Y.Y)6K6KY.6LY.Y)Y)Y)6L6LY.Y.Y.Y)Y)Y)6L6LY.Y.Y.Y.Y.6LY)6L6MY.Y.Y0Y0Y0Y)Y0Y)6LY)Y06LY06MY0Y06M6N6N6OY)Y)6OY)Y)Y)Y)Y)6O6P6PY.Y)6QY.Y.6QY.Y)6QY)6RY.Y.6RY.Y)6RY)6S6SY)Y06TY)Y)6TY)6TY)6U6V6VY)Y0Y0Y)6VY)Y.6V6WY.Y.YK6WYKYKY0Y06WY0Y06WYKYKY0YCY0Y0YCYC6VYCY0Y0Y06VY0Y0YKYK6U6VYKYK6V6WYK6X6X6YY06Z6Z7#YKYK7#7$YKYKYCYC7$7%YCYC7%YKYCYCYC7%YCY.Y.Y.YC7$YCY.Y.Y.7$Y.YK7$YKYKY.Y.7$Y.YK7$YK7%Y.7%Y.7&YK7&YKYKYK7&YKYKYK7&YKYK7&Y.YKYK7&Y.7'7(7(7)YKYKYKYK7)7*7*7+YKYKYKZ)YKYKZ)Z)7*Z)YK7*YKZ)Z)Z)Z)7*Z)YKYKYK7)Z)7*Z)Z)Z)Z)7*Z)7*YKYK7*YKYKYKZ)Z)YKYK7)YKYKYKYKYOYKYKYOYO7(YOYKYKYO7(YKYKYOYOYOYKYOYOY.Y.Y.7&7&Y.YKYKYK7&YKY.YKYKYK7&7&Y.Y.Y.YKYK7&YKYKY.YKY.7%Y.Y.Y.Y.Z'7%Z'7%Z'Y.Z'Y.7%Y.Y.Y.7%Y.7&Y.Z'Y.Y.7%Z'7&Z'7&Z'Z'Z'Z'Z'7&Z'7&Z'Y.Y.Y.YMYMYMY.Y.Y.7%Y.Y.YM7%Y.7%Y.Z'Y.Y.Y.7%Y.Y.Y.7%7%Z'7&7'7'Z'7(Z'YKYKYK7(YKYKYKY.YKYK7'Y.YK7'7(Y.7(Y.7)Y.YK7)YKY.7)Y.Y.Y.YKY.Y.Y.7(Y.7)Y.7)Y.YKYKYKYKYK7)YK7)YKY.7)Y.YK7*7*Y.YK7+Y.Y.7+7,Y.Y.Y.7,YK7,Z)Z)Z)7,Z)7-Y.Y.7-7.Y.Y.Z)Z)7-Z)Z)Z)Y.7-Z)Z)Y.7-Z)Z)7-Y.Z)Z)Y.Y.Z)Z)7,7-Z)Z)Z)Z)Y.Y.Z)Z)7,Z)Y.Y.Z)Z)Y.Y.Z)7+Y.Y.7+Z)7+Z$Z)7,Z)7,Z)7-Z)Z)7-Z$Z$Z$7-Z$7-Z#Z#Z#7-Z#7.Z#7.YOZ)Z)Z)Z)7.Z)YOZ)7.7/Z)Z)7/Z)Z)YO7/YOZ)Z)Z)YOZ)Z)7.YO7.YOYOYOYOZ)YO7.Z)YO7.YOZ)Z)YOYOZ)Z)7-7.Y.7.7/Z$Y.7/Z$Z$7/70Z$Z$Y.70Y.7171Z$Z$Z$7172Y.Z$72Z$Z$Z$YOYA72YA72YAYOYOYA72YOYO7273YO74YO74YO75YAYAZ(75YO7576YA76YAYOYOYAYAYO76YO76YOYO76YAYO77YOYO777878YAYO79YOYOYO7979YAYAYAYMYMZ$Z$YMYMZ$YMYMZ'YMYMZ'Z'76Z'Z'Z'7677Z'Z'77787879YMYM79YMYMYM79Z'7:Z'7:Z'YM7;Z'Z'YM7;YMYMYM7;YM7;Y/Y/Y/7;Y/Y/YMYMZ$Z$Z$Z$Z$7:7:Y27;Y27;7<Y2Y2Z$Z$7<Z$Z$7<7=Y2YMYMZ$YMY/Y/7<Y/Z$Y/Z$Z$7;Y/Z$Z$Y/Y/7;Y/Z$7;Z$Y/Z$Y/Z$Z$Z$Z$Z$7:Z$7:Z$Y2Y/Y/Z$Y279Y/Y2Y/Y/Y/Y279Y279Y2Y2797:Y2Y27:7;Y2Y27;Y/Y2Y27;Y2Y2Y2Y/Y/7;Y/Y/Y/7;Y/Y/Y/Y/7;Y/7;7<Y2Z$Z$7<Z$YAYA7<YA7<7=YAYAZ$7=YAYAYAY27=Y27=Y2YAYAYAYAZ(7=7=Y27>7?Z(Z(Z(7?Z(Z(YR7?Z(Z(YRZ(Z(Z(Z(7>7>Z(YRZ(Y/Y/Y/7>Y/Y/Y/Y27=7>Y2Y2Y27>Y2Y27>7?Y2Y2Y/Y/Y/7?Y/7?Y?Y?Y/7?Y/7@Y?Y?7@7AY?Y?7AY?Y/Y/Y2Y27@7AY2Y2Y2Y27A7BY27BY-Y-Y2Y27BY2Y2Y2Y27BY1Y1Y-Y-Y1Y17AY1Y27AY2Y1YGYGZ'Z'Z'7@Z'YGYG7@Y?Y?YGYGY?Y?Y?Y?Y?7?Y?Y?7?7@7@Y?Y4Y47@Y4Y1Y4Y?Y?Y4Y4Y?Y?Y4Y?Y47>Y4Y?Y?Y?Y4Y?Y4Y?Y4Y?Y4Y?7<Y?7<Y?Y4Y?7<Y?Y17=Y17=Y1Y17=7>Y?Y1Y?Y?Y1Y17=Y1Y1Y1Y?Y?Y1Y1YIYI7<7=YIYIY?Y?Y?7<Y?Y?7<YIY?Y?YIYI7<YI7<YI7=YIYIYIY?Y?YIYI7<7=YIYIY?YIY?YI7<YIYIYIYI7<Z&Y+Y+Y+VX7;VUVU7;7<VUVUVRX+VRX+VRVR7;7<7<X+X+X+X*W6X*W6W6W6W67;W67;X*X*7;X*X*X*7;7<WXWXW)W)WXW)7;7<WXWX7<X/WXWXX/X/WX7<UCTYUC7<UCUCUCTYUC7;TYTYTY7;TYTYTZTZTNTNTZTZTNTNTZTZU3U37879U3U3TNU379U3797:TNTN7:TZU3U3TZTZU3U3797:U3U3TZTZU3U3TZTZ797:TZTZV@V@TZ79TZ7:7:V@7;V@7;7<V@V@TZTZTZ7<TZTZ7<7=TZTZ7=7>TZTZ7>7?TZTZ7?7@7@V@7AV@7AV@V@V@TZTZUUUUTNU4TNU9U4U4U9U9TNU9TNU9U47=U9U9U4U37=U37=U3U9U3TNTNTN7=TNU37=U37=U87>U8U7U7TNU7U3UUU3UUU3UUU3UUUUUUU>7;U>7;U>U>V@7;V@7<V@7<V@7=TZTZTZ7=7=V@7>V@TZ7>TZ7?TZV@TZV@7>V@TZV@TZV@TZV@V@7=V@7>UUUU7>7?7?UU7@UUV@V@V@UU7?UUUUUUV@UUUUUUYD7>YDY@7>YDY@Y@YDYDYDY@YD7=Y@Y@Y@YD7=YDY@7=Y@YDYDYDYDYKYD7<YDYDYKYKYDYKY@YDYDYDYKYKY*Y*YKYKYK79YKYKYDYDYKYD78YK78YKYKYKYDYKYDYKYKYKYDYDYKYKYDYDYKYKYDYKYKYK7475YKYK75YKYOYOYK75YK75YK76YKYKYHYKYOYO75YO75YOYKYOYOYOYO75YO75YOYOYOYO75YQ75YOYQYOYQYQ757676YOYOYO76YRZ(Z(YRYR76YR76YRZ(YRYRYRZ(76YRYRZ(76Z(YRZ(Z(Z(YLZ(7575YLZ(Z(YR75YRY-YYYYYY75YUYUYYYUYY7475YU75Y1Y-7676Y1Y-Y-Y1Y1Y-Y-Y1Y1Y-Y1YV7475Y17576YVYVY1Y1YVYVY1Y1Y17575YVYVYVY1Y1757676YVYVYVY1Y176YVYVY1YVYV75YVYVYVY;Y;75Y;Y,Y;Y,Y,Y,Y,Y,74Y,74Y,Y,Y,74Y,Y;Y;Y;Y;X&Y;73X&X&73X&X&X&W#W#X&73W#7374X&74W#X&W#X&74X&X&7475X&X&X2W#X2X2W#W#W#74W#W#7475VWWVVW75VWVWVW75VW75VWVW75WVWVW/WVWV75WVWVWVVWWVWVWV74757576VWVWWVWVVWWVWSVRWSWS74VRWS75VRVR75X$75X$X$X$VRVR7576VR76X$X$76X$X$X$VRVR7677VR77X$X$7778X$X$VRX$X$X$W'77W'X$7778X$X$78X$X$X$W'X$X$X$W'X$X$X$VRVRW'W'VRVR75VRW'VRW'W'VRVRVR7474X$75X$X$75W/W/75X$W/W/X$X$W/W/X$X$X$74X$74X$X$X$X$W/W/X$X$7374X$X$74W/X$X$W/W/X$X$X$73X$X$7374X$X$747575X$W/W/X$75X$76X$X$W/W/W'W'X$75W'W'75X$W/W/7576W/W/W/7676X$X$X$76X$X$X$W/76W/W/76X$W/W/X$X$W/X$X$X$75X$X$X$X$75X$X$W'W'W/W/W/74W/W/W'W'73W'W'W'7374W/W/7475W/W/75W/W/W/W/W/W'W'W'W'W'74W/W/W/W'W'W/W/7373W'74W'X$X$74X$W/W/W/W'X$X$W'W'72W'W'W'7273X$X$W'737475X$X$X$W'W'X$X$X$WV73WV74W/W/74WVW/W/7475W'X$W'X$X$74X$W'W'W'W'74W'W'X$W'X$73X$X$73X$X$X$X$W'X$X$X$X$7273X$X$73W'73W'W'W'W'W'X$X$W'W'72W'W'W'727373W'X$X$W'W'W'73W'W'737474W'X$757576X$X$X$X$W'X$X$X$7576X$7677W'X$X$X$777778W'W'7879W'W'X$X$X$79X$797:W'7:X$W'W'X$X$W'X$X$X$W'W'X$X$787979W'W'W'W'79W'W'X$797:W'X$7:X$7;7;W'7<W'VRVRW'W'VRVRW'W'VRVRW'7:W'7:W'W'7:VRW'W'VRW'W'W'WXWXWX79WXWX79WXWXWXWX79WXWXWXWP78WPWPWPWPWP78WPWXWPWPWPWX77WPWPWPWPWW77WW77WWWWWPWPWP777778WWWWWPWPWP78WP7879WW79WWWWWWWPWPWP79WP79WWWW797:WWWW7:WWWWWWWX7:WPWPWXWP7:7;WP7;WP7<WPWPWP7<WPWP7<7=WW7=WWWWUCV&UCV&UC7<UC7=UCUCUC7=UC7=UCUCUCV&V&V&UCUC7<7=UCUC7=V?UCUCV?V?UCUCV?V?UC7;V?V?UCUC7;V?UCUCV?V?UCUCV?V?UC79V?V?79UCV?V?UC79V&V&79UCV&V&797:V&V&V?V&V?7:V?V&7:U2V&V&7:7;V&V&7;TYV&V&TYTY7:TYTYTYV&7:U2U27:7;U2U27;U2U2U2U27;U2U27;7<U2U2TYTYTPTPTYTYTPTPTYTY7:TYTP7:TPTPTP7:TPTP7:TYTP7;TYTY7;TYTPTYTPTPUUUU7:UUTNUU7:UU7:YDY@YDY@YDY@7:7:S=S<7;S<7;7<S=S=S=7<S<S2S27<7=7=S2S<S<W0W07=7>W07>7?WIW0W07?W0WIW0WIWIY;Y;W+7>7>W+W+W+Y;Y;W+7>Y;Y;7>Y;W0W0WIW0W0W0WIWIW+W+7<7=W+W+7=7>7>W&W&W+W+W+7>W+7>W+W+W+W&W&W&W+W&W9W&W9W9W9W9W2W97;W9W9W+W+7;W+7;W+W9W+VS7;VSVSW+W+7;W+VSW+VSW+W9W9W17:W1W17:W9W1W1W1W9W9W9W2W2W9W9W9W2W9W9W977W9VSW9VS7677W+W+W+VYW+VYW+76W+VY76W+W+W+Y;Y;Y;76VY76VYVYY;Y;VYY;X&75X&X&7576X&X&VYVY767777X&VYVY77X&78X&X&X&VYX&VY7778X&X&X&VYX&X&X&7778X&X&X&78X&X&VYVYX&X&VY7777X&78X&VYX&VYVY7778VYVYVYVYWCVYX&X&77X&X&X&VYX&VY76VY77VWVWX&VWX&76X&X&VWVW76VWX&X&X&7676VWVWVWW:76W:W:76WVW:WVW:76W:W:7677W:W:7778W:7979W/W:7:W/W/7:W/7:W/W:7;W/W/7;W/W:7;W:W:7;W/W:W/W:W:W/W:W/W:W/W/W:W<W:W<W:78W:W:W<W<78W<78W<W:W:W:78W<W<7879W:W:W<W<W:W:W<W<78W<78W<W:W<W:W:78W<78W<W<W<W:W<W:W<77W<W<W<W:W<W:W:76W?W?W?W<W<W<7676W?W?W?76W?W<W<W<W?W<W<W<W<W<75W<75W?W?W<W?W?W?W<W<W<74W<W<W<W?W<73W<W<73TNV#74TO7475UQ75UQ767777TNUJ78UJ78UJUJTNTN78TN78TNUJ79UJTNUJ79TNTN79TN79TNTNTNTNTNUJ79797:UJ7;UJ7;UJUJ7;TN7<TNUJ7<UJUJ7<7=UJUJTNUUTN7=TN7=UUUU7=X&VYVYX&X&7=7>W.W.W.7>W.WHW.W.7=WH7>WHWHWH7>7?WHWH7?7@WHWH7@W.WHW.W.W.WH7?WHW.W<W<7?W<X&7?X&W<W?7?W?7@W?W=W?W=7?W=W?W?7?WXW=7@W,W?W,7@W?W?7@W?7@W?W?W?W?W?7@W?W,7@W,7A7AW?W?W?WX7A7B7CWXWXWX7CWX7CW4W47CW4W4W4WXWXWXX#WXX#X#X#7AUNUNUNUQUQ7A7BUQ7B7CUNTJTJTCTCTJTJTCTJT-T-UHUHUHUHUH7@UHUH7@UHSC7@SCT$X0X0X07@7@W$W$W$7@X-W$W$X-X-7@X-7@X-X-X-X-X-7@X-X-X-X-7@X-X-7@7AX-W$X-W$X-X-W$X-W$7?W$W$X-X-7?X-W$7?W$7@W$X-W$X-WXW4WXW4WXWXWX7>WX7>WX7?WX7?WXWXWDWD7?WDWX7?W4W47?W4W4W47?TK7@TK7@TKTFTKSZ7@SB7A7ASZSB7BSB7BSBSBSB7BSBSBSZSZ7BSZSB7BSBSBTF7BTF7CS0SOS0S0S0SOS0S0SOSO7A7BSOSO7BSOS0SOS0SOSO7ASOSOSOSOSO7A7A7BT&T&T&SM7BSMT&7BT&7CT&7CT&7DT&7D7ESMT&SMSMSM7DSMT&SMS5S57D7ES5S5SLSLS5S5S57D7DS5SQ7ES5SQS5SQ7DSQSQSQSQ7D7ESI7ESISQSQSQSISQSISQ7DSQSQ7DSQSQSQSISISYSYWAWAWAWYWAWAWA7BWY7BWYWY7BWYWYWYWAWA7BWAWY7BWYWYWAWA7BWYWAWAWYWYWAWYWAWYW(W(W(WBW(WBWBWB7>U(T/U(SLSLSL7>SL7>SLSLS9S97>7?S97?7@SLSQSQSQ7@SISI7@SISQ7@SQSI7@SKSKSKSKSK7@SKSKSKSQSKSQS:SQS:SQS:SQS:SI7=SI7>SKSKSKS:S:S:S:S@SKSKS@S@SKSKS@S@S@7:S@S@7:SYS@7;S@S@S@SYV)7:V)V)V-V-V-7:7:UET?7;V-V-T?T?V-V-7:T?V-7:7;T?UEUE7;UESRSQSR7;SR7;SRSR7;SQSRSRSR7;SRSRS@S@SRSRS@S@7:S@SR7:SRSRSRS8SRSRS8S8STS8S8S8S8STSTST77ST7778STSTS8S87879S879STSTUAUAUA79UAUA79UAUATITITIT=TIT=TI777879V3SFSRSFSFSRSR78SRS8S8S878STST78STSGSFSGSGT177T17878T279T279T2T1T2T2T2T279T279T2T2T2T=T279T279T2T2T=T=79T=T2T=T2T27879T2T2T=T=79T=T279T2T=T=79T=7:T=TIT=T=T=T=T=7979V37:V37:V37;7<V3V37<V3T2T2T=T2T2T27;V37;V3V3V3T2T27;V3T2T2T2V37:V3V3V3T=T=7:7;T=T=7;T=T27;T2T2T2T27;V3SGSGSUSUSGSGSGSUSGSG797:SG7:SGSUX>X>7:7;X>X>7;7<T77<T7T7T5T57<7=7=7>T7T7T7T5T7T5T7T5T7T7T5T57<7=T77=T7T7T2T2T9T9T2T2T9T9T2T0T0T0T0T2T0T0797:T0T0T2T27:T2T07:T0T0URURT2URV3V3URV3T278T2URURV3URURURV3UR77V3V377V3UR77URURV3V3URV3T2URT2UR75UR76UR7677URUR77URT278T2T2T2URT2URT2T276T0T0T0T2T276T276URT2URT2UR76URV3V3UR7676V3UR777778URURSUSUSG78SGSUSUSU77XDXDXDXFXF77XF7778XDXD78XF79XF79XFXDXDXFXDXDXDXFXFXD78XFXF7879XFXF79XF797:XDXD7:7;T7T7T0T0T7T0YWY9YWYWYWY9YWYWY9Y9YWYWY9Y9YWY9X1X1X)X)X1X1X)X)X)X1X)X)X1X1X)X)X1X)X)X)X1X1X)X)X1X1X)X)X1X1X1X)Y6Y6YBYBY6YBY6YBY6YBYBYBY6Y6YBYBY6Y6YBYBY6YBYBYBY6YBYBYBY6YBY6Y6YBYBY6Y6YBYBY6Y6Y6YBY6Y6YBYBY6Y6Y)Y.Y)Y.Y)Y.Y)Y.YJYJYWYWYJYJYWYWY5Y5Y.Y.Y.Y5Y.Y.Y.Y.Y.Z'Z'Z'Y.Z'Y.Y.Y.Z'Z'Z'Y.Z'Z'Z'Y.Z'YNYNZ%Z%YNYXYNYXYXYXYNYNYXYIYXYXYIYIYXYIYXYXYXYIYXYXYXYIYPYPYZYZYPYPYZYPYZYZYZYPYPYPX1X1YPYPYPX1YPYIYPYPYIYPYIYIYPYPYIYIYIYPYIYIYPYPYIYIYPYPYPYIYPYPX1X1YPX1X1X1YPYPX1X1YPX1YPX1YIYIYIX1YIX1YIX1YIYIYIX1YIYIX1X1X1YIX1YIX1X1X1X)X1X)X)X)WJWJW@W@WJWJW@W@UYTNUYUYUYTNUYUYUYTNUYTNVDVDVDTNVDVDTNTNULULTNULTNULTNTNTNULULULTNULULULULULTNULULULTNULULULTNTNULULTNTNV@V@TZV@UPUPUPUUUPUPUUUUUPUPUUUUY0Y0YKY0Y0Y0YKY0Y0Y)Y0Y0Y0Y0YKYKY0YKYKYKY0Y0YKYKY0Y0YKYKY0YKYKYKY0Y0YKY0Y0Y0Y0YKY0Y0YKYKY0Y0YKY0Y0Y0YKY0Y0Y0YKY0YKYKYKY0Y0Y0YKYKY0Y0YKYKY0Y0YKY0Y0Y0YKYKY0Y0YKY0YKY0YKY0Y)Y)Y0Y)Y0Y)Y0Y)Y)Y)Y0Y0Y)Y)Y0Y0Y)Y0Y0Y0Y)Y)Y0Y0Y)Y0Y0Y0Y)Y)Y0Y0Y)Y)Y0Y0Y)Y)Y0Y)Y0Y)Y0Y)Y0Y)Y0Y0Y)Y)Y0Y0Y0Y)Y0Y0Y0Y)Y0Y)Y0Y)Y0Y0Y)Y)Y0Y)Y)Y)Y.Y.Y.Y)Y.Y.Y)Y)Y.Y.Y)Y)Y.Y.Y)Y)Y.Y.Y.Y.Y)Y)Y)Y.Y)Y.Y)Y)Y.Y.Y)Y)Y)Y.Y.Y.Y)Y)Y)Y.Y)Y)Y)Y.Y.Y.Y)Y)Y.Y.Y)Y)Y.Y.Y)Y)Y0Y0Y0Y)Y)Y)Y0Y)Y0Y0Y)Y.Y)Y)Y)Y)Y)Y.Y)Y.Y)Y)Y.Y.Y)Y.Y)Y.Y)Y.Y)Y)Y.Y.Y)Y.Y)Y.Y)Y.Y.Y.Y)Y.Y.Y.Y.Y)Y)Y)Y)Y)Y.Y.Y)Y.Y.Y.Y0Y0Y0Y)Y0Y)Y0Y0Y0Y0Y0Y)Y0Y0Y0Y)Y0Y)Y)Y)Y0Y)Y0Y)Y0Y)Y)Y)Y)Y)Y0Y)Y)Y)Y)Y.Y)Y.Y.Y.Y)Y.Y)Y)Y)Y.Y)Y.Y.Y.Y.Y)Y)Y.Y.Y.Y)Y.Y)Y)Y.Y.Y)Y.Y)Y.Y)Y.Y)Y.Y)Y.Y0Y)Y0Y)Y)Y)Y0Y0Y)Y)Y0Y)Y0Y)Y0Y)Y)Y)Y0Y0Y)Y)Y0Y0Y)Y)Y)Y0Y)Y)Y)Y.Y)Y.Y.Y.Y)Y.Y.Y.Y0Y0YKYKYKY0YKYKY0Y0YKYKY0Y0Y0YCY0YCY0Y0Y0Y0Y0YKY0Y0YKYKY0Y0YKYCY0YCYCYCYKYCYKYCYCYCY0Y0YCYCY0YCY0YCY0YCYCYCYKYKYCYCYKYKYCYCYKYKYCYCYKYCYCYCYCYKYCYCYKYCYCYCYKYKYCY.YCY.YCY.YCY.Y.Y.YKYKYKY.YKYKYKY.YKY.YKY.YKY.Y.Y.YKYKY.YKY.Y.Y.Y.Y.YKY.YKYKYKY.YKYKYKY.Y.YKYKY.Y.YKYKY.Y.YKY.YKY.YKYKY.YKYKYKYKY.YKYKY.Y.YKY.YKYKYKZ)YKYKZ)Z)Z)Z)Z)YKZ)Z)Z)YKYKZ)Z)Z)YKZ)YKZ)Z)Z)Z)YKYKZ)YKZ)YKYKZ)Z)Z)Z)Z)YKZ)Z)Z)YKZ)YKYKYKZ)Z)YKYKYKYOYKYOYOYKYOYOY.Y.YKY.Y.Y.YKYKYKY.YKYKYKY.YKY.YKY.Y.Y.YKYKY.Y.Y.Y.YKY.Y.Z'Z'Z'Y.Z'Y.Z'Y.Z'Y.Z'Y.Z'Y.Z'Y.Y.Y.Z'Y.Y.Y.Z'Y.Z'Z'Z'Z'Z'Y.Z'Y.Z'Y.Z'Y.Z'Y.Y.Y.Z'Y.Z'YMY.YMYMY.Z'Z'Z'Y.Z'Z'Z'Y.Y.Y.Z'Y.Y.Y.Z'Z'Z'YMYMZ'Z'YMYMY.Y.Y.Z'Y.Z'Z'Z'YKYKYKY.YKY.Y.Y.YKY.Y.Y.YKY.YKY.YKY.YKY.YKY.YKY.YKYKYKY.YKY.Y.Y.YKY.YKY.YKY.YKY.YKY.YKY.YKYKYKY.YKY.Y.Y.YKY.YKY.Y.Y.YKY.YKY.YKY.Y.Y.Z)Y.Y.Y.Y.Z)Y.Y.Z)Z)Y.Y.Z)Y.YKYKZ)Z)Z)Z)Y.Y.Z)Y.Z)Z)Y.Y.Z)Z)Y.Z)Z)Z)Y.Z)Z)Z)Y.Y.Y.Z)Y.Y.Y.Z)Y.Y.Z)Y.Y.Y.Y.Z)Y.Y.Z)Z)Z)Z)Y3Y3Y.Y.Z)Z)Y.Y.Z)Z)Z)Z$Z)Z$Z$Z$Z)Z$Z)Z$Z)Z$Z)Z$Z)Z$Z)Z$Z$Z$Z#Z$Z#Z$Z)Z#Z#Z#Z#Z#Z)Z#Z)Z#Z)Z)Z)Z)YOZ)YOZ)YOYOYOZ)YOYOZ)Z)YOYOZ)Z)YOYOZ)YOZ)YOZ)Z)Z)YOZ)YOYOYOYOZ)YOYOZ)Z)Z)YOZ)Z)YOYOZ)YOYOYOY.Y.Y.Z$Y.Y.Y.Z$Y.Y.Z$Z$Y.Y.Y.Z$Y.Y.Z$Z$Y.Z$Y.Y.Y.Z$Z$Z$Y.Z$Z$Z$Y.Y.Y.Z$Y.Y.Z$Z$Y.Z$Z$Z$YOYAYAYAYOYAYOYOYAYAYAYOYAYAYOYOYAYAYOYAYOYAYOYAYOYOYOYAYOYAYOYOYAYAZ(Z(YOYAYAYAYOYAYAYAYAYAYOYOYOYAYOYOYOYAYOYOYAYAYOYOYOYAYOYOYOYOYAYAYOYOYAYOYAYAYOYAYAYAYOYOYOYAYAYAYOYOYOYAZ'Z'YMZ'Z'Z'YMYMZ'Z'YMYMZ'Z'YMYMZ'Z'YMZ'YMZ'YMYMZ'Z'YMYMZ'Z'YMYMYMYMYMZ'Z'Z'YMZ'YMZ'YMYMZ'Z'YMZ'Z'Z'YMYMYMYMY/YMYMYMYMY/Y/YMY/Y/Z$Z$Y2Y2Z$Z$Z$Y2Z$Y2Y2Y2Z$Z$Y2Y2Z$Z$Y2Y2Z$Z$Y2Y2Z$Y2Z$Y2Z$Y2Y2Y2Z$Y/Z$Y/Z$Y/Z$Z$Z$Y/Z$Z$Z$Y/Y/Y/Z$Z$Z$Y2Z$Z$Z$Y2Y2Y/Y2Y2Y2Y/Y2Y2Y2Y/Y2Y2Y/Y/Y2Y2Y/Y/Y2Y2Y/Y/Y2Y2Y/Y/Y2Y2Y/Y/Y/Y2Y/Y/Y2Y2Y/Y/Y2Y/Y/Y/Y/Y2Y/Y/Y2Y2Y/Y2Y2Y2Y/Y2Y2Y2Z$Z$Z$YAYAYAZ$Z$Z$Z$YAYAZ$Z$YAYAZ$YAZ$YAYAY2Y2Y2Y2Y2YAY2YAZ(Z(Z(Y2Z(Z(Z(Z(Y2Y2Y2Y2Y2Z(Y2Z(Z(Z(YRYRZ(YRYRYRYRYRZ(Z(Z(YRYRY/Y/Y2Y2Y/Y/Y/Y2Y/Y/Y2Y2Y2Y/Y2Y2Y/Y/Y2Y2Y/Y2Y2Y2Y/Y/Y/Y?Y/Y/Y?Y?Y/Y?Y/Y?Y/Y?Y/Y/Y?Y?Y2Y2Y?Y2Y2Y2Y2Y?Y2Y2Y/Y/Y2Y2Y/Y2Y2Y2Y2Y2Y2Y-Y2Y2Y-Y-Y2Y-Y-Y-Y2Y2Y-Y-Y2Y2Y2Y1Y-Y1Y-Y-Y2Y2Y2Y1YGYGZ'YGYGYGY?Y?Y?Y?Y1Y1Y?Y?Y1Y1Y?Y1Y1Y1Y?Y?Y4Y4Y4Y4Y1Y4Y4Y?Y4Y4Y4Y?Y?Y?Y4Y?Y4Y?Y?Y?Y1Y1Y1Y?Y1Y?Y1Y?Y1Y1Y?Y?Y?Y1Y?Y?Y1Y1Y?Y1Y1Y1Y?YIY?Y?YIYIY?YIYIYIY?Y?YIYIY?YIYIYIY?YIY?YIY?YIY?Y?Y?YIYIYIY?YIYIYIY?Y?YIYIY?YIYIYIZ&Z&VXVXVXVUVXVXVUVUVXVUVUVUVRVRX+X+VRX+X+X+VRVRVRX+W6W6W6X*W6W6X*X*W6W6X*X*W)W)WXWXW)W)WXW)WXX/WXWXX/X/WXWXX/X/WXWXWXX/WXX/UCTYUCTYUCTYTYTYTYTNTYTYTZTZU3U3TZTZU3U3TNU3TNU3TNU3TNTNU3U3TNTNTZTZU3U3TZTZU3U3TZTZU3U3TZTZTZV@TZTZV@V@TZTZTZV@TZV@V@V@TZV@TZV@TZV@TZV@TZTZTZV@TZTZV@V@TZTZTZUUTZTZUUUUTZTZUUUUTZTZUUUUTZTZUUUUTZTZUUUUTZTZUUUUTZTZUUUUTZTZUUUUTZV@TZV@TZV@TZV@TZV@TZV@U4U4U9U9U4U3U4U3U4U3U9U3TNTNU3U3TNTNU3U3TNTNTNU8TNU8U8U8UUUUU>U>UUUUU>U>V@UUV@UUV@UUV@UUV@UUV@V@V@V@V@UUTZV@V@V@TZV@TZV@TZTZTZV@TZTZTZV@TZV@V@V@TZV@TZV@V@UUV@UUUUUUV@UUUUUUV@V@UUUUV@UUV@UUV@UUV@UUV@UUV@V@UUUUYDYDYDY@YDYDY@Y@YDYDYDY@Y@YDYDYDY@YDYDYDYKYKYDYDYKYKYKYDYDYKYDYKYKYKYDYKYKYKYDYDYKYKYDYDYKYKYDYDYOYOYKYOYKYKYKYHYHYHYKYHYOYOYKYOYKYOYKYOYOYOYOYQYOYQYOYQYOYOYQYQYOYOYQYQYQYQYOYOYQYQYOYOYQYQYQYOYRYRZ(Z(YRYRZ(YRZ(YRZ(Z(YRYRZ(YRYRYRZ(YRZ(YLZ(YLYLYLZ(YLYRY-Y-Y-YYYYYUYUYYYUYYYUYYYUYUYUY1Y1Y-Y1Y1Y1Y-Y1Y-Y1Y-Y-YVYVY1Y1YVYVYVY1Y1Y1YVYVY1Y1YVY1Y1YVYVYVY1Y1YVYVY1Y1Y1YVY1YVYVYVY1YVYVYVY1Y1YVYVY1YVYVYVY;Y;Y,Y;Y,Y;Y,Y,Y,Y,Y,Y;Y,Y,Y,Y;Y;Y;X&X&Y;X&X&X&W#W#X&W#W#W#W#X&W#W#X&X&W#W#X&X&W#W#X&X&W#W#X&X&W#W#X&X&W#W#X&X&W#W#X&X&W#W#X&X&WVWVVWVWVWWVVWWVVWWVVWWVWVWVWVW/WVWVVWVWVWWVVWVWWVWVVWWVVWWVVWVWWVWVVWWVVRVRWSVRVRVRWSWSVRVRVRX$VRX$X$X$VRVRVRX$VRX$X$X$VRVRVRX$VRX$VRVRX$VRX$X$VRVRX$X$VRVRX$X$VRVRX$X$VRVRX$X$W'W'X$X$W'X$X$X$W'W'X$X$W'W'X$X$VRVRW'VRVRVRX$X$VRX$VRX$VRX$X$X$X$X$W/W/X$X$W/X$X$X$X$W/W/W/X$W/X$X$W/W/X$X$W/W/X$W/W/W/X$W/X$X$X$X$W/W/X$X$W/W/X$X$W/W/X$X$W/W/X$X$W/W/W/W/X$W/W/W/X$W/W'W'X$X$W'X$X$X$W/W/W/X$W/X$X$X$W/X$X$X$W/W/W/X$W/X$X$X$X$X$W/W/X$X$W/W/X$X$W/X$X$X$W'W'W/W/W/W'W/W/W'W'W/X$W/W/X$X$W/W/X$X$W/W/X$W/W/W/W/X$W/W/W'W'W/W/W/W/W/W'W/W/W/W'W/W'W'W'X$X$X$W/W'X$W'X$W'W'X$X$W'W'X$W'W'X$W'X$W'X$W'W'X$X$W'X$WVWVWVW/W/W/WVWVW/W/WVWVW/W/W:W:W/W/W:W:X$W'X$W'W'W'X$X$X$W'X$X$W'X$X$X$X$W'W'W'W'X$W'X$X$X$X$W'X$X$W'W'X$W'X$X$X$W'X$X$W'W'X$W'X$W'X$X$W'W'X$X$W'W'X$X$W'W'X$X$W'W'X$W'X$W'X$X$W'W'W'X$W'X$X$X$X$X$X$W'X$X$W'W'X$X$W'W'X$X$W'W'X$W'X$W'X$X$X$W'X$X$W'W'X$X$W'X$W'W'X$W'X$X$X$W'X$X$W'W'X$W'W'W'X$X$W'W'X$X$X$W'X$X$W'W'X$W'X$W'X$X$W'W'X$W'W'W'X$W'W'W'W'W'X$X$X$X$W'W'W'W'X$X$X$X$W'W'W'VRW'W'VRVRW'W'VRVRW'VRWXWXWPWPWPWPWPWXWXWPWPWPWXWXWPWPWXWPWXWXWXWXWPWPWPWPWWWWWPWPWWWWWPWWWPWWWPWPWPWWWPWWWWWWWPWPWWWPWPWPWWWWWPWWWWWWWPWPWWWWWPWWWPWWWPWPWPWWWPWPWWWWWPWWWWWWWPWWWWWWWXWXWPWPWXWPWPWPWPWXWPWPWPWWWPWWWPWPWPWWWPWPWWWPWPWPWPWWWPWPWWWWWPWWWWWWV&V&UCV&UCV&UCV&UCV&V&V&UCV&UCUCUCUCV?V?UCUCV?V?UCUCV?V?UCUCV?V?UCUCV?V?UCUCUCV?UCUCV?V?UCUCV&V&UCUCV&V&UCUCV&V&UCV&V&V&V?V&V?V&V?V?U2U2U2V&U2U2V&V&U2U2V&TYV&V&V&V&V&TYV&V&U2U2V&V&U2U2V&V&U2U2V&V&U2U2V&V&U2U2V&V&U2U2V&V&U2U2TYTYTPTYTYTPTPTPTPTYTPTPTYTYTPTYTYTYTPTYTPTYTPTPUUUUTNUUTNTNUUUUY@YDY@YDY@YDY@YDS<S=S<S=S=S=S<S<S<S=S=S=S<S=S<S<S=S=S<S<S<S2S<S<S2S2S<S2S2S2S<S2W0W0WIWIW0WIWIWIW0W0W0WIWIW0WIWIWIW0WIW0Y;Y;W+W+Y;Y;Y;W+W+Y;W+W+W+Y;W+W+W+W+W&W&W+W+W&W+W+W+W+W&W+W+W&W+W&W&W&W+W+W+W&W+W&W+W&W+W9W+W9W9W9W+W9W+W9W+W9W9VSW+VSW+W+W+VSW+W9W9W1W9W1W1W1W9W9W9W9VSY;Y;W+Y;Y;Y;W+W+W+W+W+VYY;Y;W+W+Y;VYY;VYY;Y;VYY;X&VYX&X&VYVYX&X&VYVYX&X&VYVYVYX&VYX&X&X&X&X&VYX&VYVYVYX&X&X&VYX&VYVYVYX&VYVYX&X&VYX&VYVYX&X&VYX&X&VYVYVYVYX&VYVYVYX&VYX&VYX&VYVYX&X&X&VYX&X&VYVYVYX&VYVYVYX&VYX&VYX&VYVYX&VWX&X&VWVWX&VWX&X&X&VWX&VWVWVWW:WVW:W:WVWVW:WVWVWVW:WVWVWVWVW:WVWVW:W:W:W/W:W:W/W/W:W/W:W/W:W:W/W/W:W/W:W/W:W:W/W/W:W/W:W/W:W:W:W/W:W:W/W/W:W/W:W/W:W:W/W/W:W/W:W<W:W:W:W<W:W<W:W<W:W:W:W<W<W<W<W<W:W:W<W<W:W<W<W<W:W<W:W<W:W<W:W:W:W<W:W:W:W<W:W<W<W<W<W<W<W?W<W<W?W?W<W<W<W?W<W?W<W?W<W?W?W?W<W<W<W?W<W<W<W?W<W?W<W?TNTNV#TNTNTNV#TNTOUQTOUQTOTOTOUQUQUQTOUQTOUQTOTOUQUQTOUQUJTNUJUJUJTNUJTNTNTNUJTNTNTNUJTNUJTNUJUJUJTNTNTNTNTNUJUJTNTNUJTNUJTNTNTNUJTNUJTNTNTNUJUJTNTNUJTNUJTNUJUJTNTNUJTNTNTNUJTNUJTNUJUJUJTNUJUJTNTNUJUJTNTNUJTNTNUUTNUUTNUUUUUUX&X&VYVYX&X&VYVYX&X&VYX&W.W.W.WHW.W.W.WHW.WHWHWHW.WHW.W.WHWHW.WHWHWHW.W.WHWHW.W.WHWHWHW.WHW.WHW.X&W<X&X&X&W<W<W<W?W?W?W=W?W=W=W=W?W=W?W=WXWXW=W=W=WXW=W=W,W?W,W,W,W?W,W?W,W,W,W?W?W?W,W,W,W,W,W?W,W?W,W?W,W,W?W,WXX0X0X0WXWXX0X0WXX0X0X0WXW4W4W4WXWXWXW4WXW4W4W4T@UNUNUNUNUQUNUNUQUQUNUQUQUQUNUNUQUNUQUNUHUHUDUDUHUHUDUDSCT$SCT$X0X0X0W$X0X0X0W$X-X-W$W$W$X-W$X-W$X-W$X-X-X-X-W$X-X-X-W$X-X-W$W$X-W$W$W$W$X-W$W$W$X-W$W$X-X-W$X-W$X-W$X-WXWXWXWDWXWDWDWDWXWDWXWDWXWXWXWDWDWDWXWDWXWXWXW4WXW4W4W4TFTKTKTKTKTKTFTKTFTKTFTFSZSZSZSBSZSZSBSBSZSZSBSBSZSZSBSZSZSZSBSZSZSZSBSBSZSZSBSBSBSZSBSBTFTKTFTKTFTKTFTKSOSOS0S0SOSOS0S0SOSOS0S0SOT&SOSOSOT&SOT&SOSOSOT&SOSOT&T&T&T&T&SMT&T&T&SMT&SMT&SMT&SMT&SMT&SMT&T&T&SMSMSMT&SMT&SMT&SMT&SMS5SLSLSLSLS5SLSLS5SQS5SQS5S5SQSQSQS5SQSQS5SQS5SQSQSISISISQSQSQSISQSISQSQSQSISQSQSISISQSQWAWAWYWYWAWAWYWYWAWYWYWYWAWAWYWAWYWAWYWYWYWAWYWYT/U(T/U(SLS9SLS9SLS9SLSLS9S9S9SLS9S9SLSLS9S9S9SLS9SLSLSLSQSISQSISQSISQSISQSISQSISQSQSQSKSKSKSQSKSISISISKSISKSISKS@SYS@S@SYSYS@SYSYSYS@S@V)TTV)TTV-V-V-T?T?V-T?T?T?UET?T?V-T?T?T?V-T?T?T?V-V-T?T?UEUET?T?SQSQSRSQSRSQSRSRSQSQSQSRSQSRSRSRS@S@SRS@S@S@SRS@S8S8S8STSTS8STSTS8S8S8STS8S8S8STS8S8STSTS8S8STSTUAUAUAT3UAUAT3UATTTTTTV3TTTTV3V3TTV3V3V3SFSRSFSRS8STS8S8SFSTSFSTT1T1T2T2T1T2T1T1T1T1T2T2T2T2T1T2T1T2T1T2T2T2T=T=T2T=T2T2T=T=T2T=T2T=T2T2T2T=T2T=T2T=T2T2T=T=T2T=T=T=T2T=T=T=T2T=TITIT=TIT=TIT=T=T=V3T=T=V3V3T=V3T=V3T=V3T=V3T=V3T=V3T=T2V3V3T2T2V3V3T2V3T2T2V3V3T2V3V3V3T2T2T2V3T2V3V3V3T=T=T2T2T=T=T2T2T=T=T2T=T=T=T2T=T2V3V3V3SGSGSGSUSGSUSUSUSGSUSGSUX>XFXFXFXFX>XFXFX>X>XFXFX>XFXFXFT5T5T7T5T7T5T7T7T5T5T7T5T5T5T7T5T5T5T7T5T5T5T7T7T5T5T5T7T5T5T7T7T0T2T0T0T2T2T0T2T0T2T0T0T0T2T0T0URURT2URURV3URURV3URURURV3V3URV3T2URT2URT2T2T2URT2T2T2URT2URURURT2URT2T2T2URT2T2T2T2T0T0T0T2T0T0T2URT2URT2URURURURV3URV3V3V3URURURV3URURURV3URURV3V3URURSGSUSUSUXFXFXDXDXFXFXDXFXDXFXDXFXFXFXDXFXFXFXDXFXDXFXDXDXFXFXDXFXDXFXDXDXFXFXDXDXFXFXDXFXFXFXDXFXDXFXDXDXFXFXDXDT7T0T7T7T0T0T7T7", T = ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua", "America/Ciudad_Juarez", "America/Costa_Rica", "America/Coyhaique", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fort_Nelson", "America/Fortaleza", "America/Glace_Bay", "America/Goose_Bay", "America/Grand_Turk", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Menominee", "America/Merida", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/New_Salem", "America/Nuuk", "America/Ojinaga", "America/Panama", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Rio_Branco", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Arctic/Longyearbyen", "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Chita", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kathmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Riyadh", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney", "Etc/GMT", "Etc/GMT+1", "Etc/GMT+10", "Etc/GMT+11", "Etc/GMT+12", "Etc/GMT+2", "Etc/GMT+3", "Etc/GMT+4", "Etc/GMT+5", "Etc/GMT+6", "Etc/GMT+7", "Etc/GMT+8", "Etc/GMT+9", "Etc/GMT-1", "Etc/GMT-10", "Etc/GMT-11", "Etc/GMT-12", "Etc/GMT-2", "Etc/GMT-3", "Etc/GMT-4", "Etc/GMT-5", "Etc/GMT-6", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-9", "Etc/UTC", "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kirov", "Europe/Kyiv", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Ulyanovsk", "Europe/Vaduz", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zurich", "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion", "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Kanton", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Wake", "Pacific/Wallis"];
      if (W = +W, !(-90 <= (Y = +Y) && Y <= 90 && -180 <= W && W <= 180)) throw new RangeError("invalid coordinates");
      if (90 <= Y) return "Etc/GMT";
      for (var V = -1, S = 48 * (180 + W) / 360.00000000000006, U = 24 * (90 - Y) / 180.00000000000003, Z = 0 | S, $ = 0 | U, K = 96 * $ + 2 * Z, K = 56 * X.charCodeAt(K) + X.charCodeAt(K + 1) - 1995; K + T.length < 3136; ) K = 56 * X.charCodeAt(K = 8 * (V = V + K + 1) + 4 * ($ = 0 | (U = 2 * (U - $) % 2)) + 2 * (Z = 0 | (S = 2 * (S - Z) % 2)) + 2304) + X.charCodeAt(K + 1) - 1995;
      return T[K + T.length - 3136];
    }
    "undefined" != typeof module2 && (module2.exports = tzlookup);
  }
});

// node_modules/exiftool-vendored/dist/GeoTz.js
var require_GeoTz = __commonJS({
  "node_modules/exiftool-vendored/dist/GeoTz.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.geoTz = geoTz;
    var tz_lookup_1 = __importDefault(require_tz());
    function geoTz(lat, lon) {
      return (0, tz_lookup_1.default)(lat, lon);
    }
  }
});

// node_modules/exiftool-vendored/dist/VersionTask.js
var require_VersionTask = __commonJS({
  "node_modules/exiftool-vendored/dist/VersionTask.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VersionTask = void 0;
    var ExifToolTask_1 = require_ExifToolTask();
    var VersionTask = class _VersionTask extends ExifToolTask_1.ExifToolTask {
      static versionRegex = /^\d{1,3}\.\d{1,3}(?:\.\d{1,3})?$/;
      constructor(options) {
        super(["-ver"], options);
      }
      parse(input) {
        const value = input.trim();
        if (_VersionTask.versionRegex.test(value)) {
          return value;
        } else {
          throw new Error(`Unexpected version ${value}`);
        }
      }
    };
    exports2.VersionTask = VersionTask;
  }
});

// node_modules/exiftool-vendored/dist/DefaultExifToolOptions.js
var require_DefaultExifToolOptions = __commonJS({
  "node_modules/exiftool-vendored/dist/DefaultExifToolOptions.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DefaultExifToolOptions = exports2.ConsoleLogger = void 0;
    exports2.defaultAdjustTimeZoneIfDaylightSavings = defaultAdjustTimeZoneIfDaylightSavings;
    var bc = __importStar(require_BatchCluster());
    var node_util_1 = require("node:util");
    var Boolean_1 = require_Boolean();
    var CapturedAtTagNames_1 = require_CapturedAtTagNames();
    var DefaultExiftoolArgs_1 = require_DefaultExiftoolArgs();
    var DefaultMaxProcs_1 = require_DefaultMaxProcs();
    var ExiftoolPath_1 = require_ExiftoolPath();
    var GeoTz_1 = require_GeoTz();
    var IsWin32_1 = require_IsWin32();
    var VersionTask_1 = require_VersionTask();
    var _debuglog = (0, node_util_1.debuglog)("exiftool-vendored");
    function noop() {
    }
    exports2.ConsoleLogger = {
      trace: noop,
      debug: _debuglog,
      info: _debuglog,
      warn: console.warn,
      error: console.error
    };
    function logger() {
      return (0, node_util_1.debuglog)("exiftool-vendored").enabled ? exports2.ConsoleLogger : bc.NoLogger;
    }
    exports2.DefaultExifToolOptions = Object.freeze({
      ...new bc.BatchClusterOptions(),
      maxProcs: DefaultMaxProcs_1.DefaultMaxProcs,
      maxTasksPerProcess: 500,
      spawnTimeoutMillis: 3e4,
      streamFlushMillis: 10,
      // see https://github.com/photostructure/exiftool-vendored.js/issues/34 :
      taskTimeoutMillis: 2e4,
      onIdleIntervalMillis: 2e3,
      taskRetries: 1,
      exiftoolPath: ExiftoolPath_1.exiftoolPath,
      exiftoolArgs: DefaultExiftoolArgs_1.DefaultExiftoolArgs,
      exiftoolEnv: {},
      checkPerl: !(0, IsWin32_1.isWin32)(),
      pass: "{ready}",
      fail: "{ready}",
      exitCommand: "-stay_open\nFalse\n",
      versionCommand: new VersionTask_1.VersionTask().command,
      healthCheckIntervalMillis: 3e4,
      healthCheckCommand: "-ver\n-execute\n",
      backfillTimezones: true,
      defaultVideosToUTC: true,
      geoTz: GeoTz_1.geoTz,
      geolocation: false,
      ignoreZeroZeroLatLon: true,
      ignoreMinorErrors: true,
      forceWrite: false,
      imageHashType: false,
      includeImageDataMD5: void 0,
      inferTimezoneFromDatestamps: false,
      // to retain prior behavior
      inferTimezoneFromDatestampTags: [...CapturedAtTagNames_1.CapturedAtTagNames],
      inferTimezoneFromTimeStamp: false,
      // to retain prior behavior
      logger,
      numericTags: [
        "*Duration*",
        "GPSAltitude",
        "GPSLatitude",
        "GPSLongitude",
        "GPSPosition",
        "GeolocationPosition",
        "Orientation"
        // NOT Rotation! Rotation can be encoded as degrees rotated clockwise, or a
        // EXIF-Orientation string (!!). If we ask ExifTool for numeric rotations of HEICs,
        // we get "3" (when it means "Rotate 90 CW"):
        // $ exiftool -j -Rotation -Orientation IMG_6947.HEIC
        // [{
        //   "Rotation": "Rotate 90 CW",
        //   "Orientation": "Rotate 90 CW"
        // }]
        // $ exiftool -j -Rotation# -Orientation# IMG_6947.HEIC
        // [{
        //   "Rotation": 3,   // < WTH is this? 3 means 180º (!?)
        //   "Orientation": 6 // < expected
        // }]
      ],
      useMWG: false,
      struct: 1,
      readArgs: ["-fast"],
      writeArgs: [],
      adjustTimeZoneIfDaylightSavings: defaultAdjustTimeZoneIfDaylightSavings,
      preferTimezoneInferenceFromGps: false,
      // to retain prior behavior
      keepUTCTime: true,
      disposalTimeoutMs: 1e3,
      asyncDisposalTimeoutMs: 5e3
    });
    function defaultAdjustTimeZoneIfDaylightSavings(t) {
      return true === (0, Boolean_1.toBoolean)(t.DaylightSavings) && // Daggum Nikon likes "FS-Nikon", "Nikon", "NIKON", and "NIKON CORPORATION"
      /\bnikon\b/i.test(String(t.Make)) ? 60 : void 0;
    }
  }
});

// node_modules/exiftool-vendored/dist/DeleteAllTagsArgs.js
var require_DeleteAllTagsArgs = __commonJS({
  "node_modules/exiftool-vendored/dist/DeleteAllTagsArgs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DeleteAllTagsArgs = void 0;
    exports2.DeleteAllTagsArgs = ["-all="];
  }
});

// node_modules/exiftool-vendored/dist/ExifToolOptions.js
var require_ExifToolOptions = __commonJS({
  "node_modules/exiftool-vendored/dist/ExifToolOptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.handleDeprecatedOptions = handleDeprecatedOptions;
    function handleDeprecatedOptions(options) {
      if (options.imageHashType == null && options.includeImageDataMD5 != null) {
        options.imageHashType = options.includeImageDataMD5 ? "MD5" : false;
      }
      return options;
    }
  }
});

// node_modules/exiftool-vendored/dist/Pick.js
var require_Pick = __commonJS({
  "node_modules/exiftool-vendored/dist/Pick.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pick = pick;
    function pick(obj, ...keyNames) {
      if (obj == null)
        return obj;
      const result = {};
      for (const key of keyNames) {
        const v = obj[key];
        if (v !== void 0)
          result[key] = obj[key];
      }
      return result;
    }
  }
});

// node_modules/exiftool-vendored/dist/ReadRawTask.js
var require_ReadRawTask = __commonJS({
  "node_modules/exiftool-vendored/dist/ReadRawTask.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadRawTask = void 0;
    var batch_cluster_1 = require_BatchCluster();
    var _path = __importStar(require("node:path"));
    var ErrorsAndWarnings_1 = require_ErrorsAndWarnings();
    var ExifToolTask_1 = require_ExifToolTask();
    var FilenameCharsetArgs_1 = require_FilenameCharsetArgs();
    var ReadRawTask = class _ReadRawTask extends ExifToolTask_1.ExifToolTask {
      sourceFile;
      args;
      static for(filename, exiftoolArgs = [], options) {
        const args = [...FilenameCharsetArgs_1.Utf8FilenameCharsetArgs, ...exiftoolArgs];
        if (!args.includes("-json"))
          args.push("-json");
        const sourceFile = _path.resolve(filename);
        args.push(sourceFile);
        return new _ReadRawTask(sourceFile, args, options);
      }
      constructor(sourceFile, args, options) {
        super(args, options);
        this.sourceFile = sourceFile;
        this.args = args;
      }
      toString() {
        return "ReadRawTask" + this.sourceFile + ")";
      }
      parse(data, err) {
        try {
          const tags2 = JSON.parse(data)[0];
          const { errors, warnings } = (0, ErrorsAndWarnings_1.errorsAndWarnings)(this, tags2);
          tags2.errors = errors;
          tags2.warnings = warnings;
          return tags2;
        } catch (jsonError) {
          (0, batch_cluster_1.logger)().error("ExifTool.ReadRawTask(): Invalid JSON", { data });
          throw err ?? jsonError;
        }
      }
    };
    exports2.ReadRawTask = ReadRawTask;
  }
});

// node_modules/exiftool-vendored/dist/BinaryField.js
var require_BinaryField = __commonJS({
  "node_modules/exiftool-vendored/dist/BinaryField.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BinaryField = void 0;
    var Number_1 = require_Number();
    var BinaryFieldRE = (
      // 1000000000 bytes is 1 GB. The largest binary field I've seen is ~5 MB (7
      // chars): 10 chars is absurdly large, and is just to avoid the
      // `js/polynomial-redos` eslint rule.
      /Binary(?: data)? (\d{1,10}) bytes/i
    );
    var BinaryField = class _BinaryField {
      bytes;
      rawValue;
      constructor(bytes, rawValue) {
        this.bytes = bytes;
        this.rawValue = rawValue;
      }
      toJSON() {
        return {
          _ctor: "BinaryField",
          bytes: this.bytes,
          rawValue: this.rawValue
        };
      }
      static fromJSON(json) {
        return new _BinaryField(json.bytes, json.rawValue);
      }
      static fromRawValue(rawValue) {
        const m = rawValue.match(BinaryFieldRE);
        if (m != null) {
          const bytes = (0, Number_1.toInt)(m[1]);
          if (bytes != null) {
            return new _BinaryField(bytes, rawValue);
          }
        }
        return;
      }
    };
    exports2.BinaryField = BinaryField;
  }
});

// node_modules/luxon/build/node/luxon.js
var require_luxon = __commonJS({
  "node_modules/luxon/build/node/luxon.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var LuxonError = class extends Error {
    };
    var InvalidDateTimeError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid DateTime: ${reason.toMessage()}`);
      }
    };
    var InvalidIntervalError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid Interval: ${reason.toMessage()}`);
      }
    };
    var InvalidDurationError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid Duration: ${reason.toMessage()}`);
      }
    };
    var ConflictingSpecificationError = class extends LuxonError {
    };
    var InvalidUnitError = class extends LuxonError {
      constructor(unit) {
        super(`Invalid unit ${unit}`);
      }
    };
    var InvalidArgumentError = class extends LuxonError {
    };
    var ZoneIsAbstractError = class extends LuxonError {
      constructor() {
        super("Zone is an abstract class");
      }
    };
    var n = "numeric";
    var s = "short";
    var l = "long";
    var DATE_SHORT = {
      year: n,
      month: n,
      day: n
    };
    var DATE_MED = {
      year: n,
      month: s,
      day: n
    };
    var DATE_MED_WITH_WEEKDAY = {
      year: n,
      month: s,
      day: n,
      weekday: s
    };
    var DATE_FULL = {
      year: n,
      month: l,
      day: n
    };
    var DATE_HUGE = {
      year: n,
      month: l,
      day: n,
      weekday: l
    };
    var TIME_SIMPLE = {
      hour: n,
      minute: n
    };
    var TIME_WITH_SECONDS = {
      hour: n,
      minute: n,
      second: n
    };
    var TIME_WITH_SHORT_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      timeZoneName: s
    };
    var TIME_WITH_LONG_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      timeZoneName: l
    };
    var TIME_24_SIMPLE = {
      hour: n,
      minute: n,
      hourCycle: "h23"
    };
    var TIME_24_WITH_SECONDS = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23"
    };
    var TIME_24_WITH_SHORT_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23",
      timeZoneName: s
    };
    var TIME_24_WITH_LONG_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23",
      timeZoneName: l
    };
    var DATETIME_SHORT = {
      year: n,
      month: n,
      day: n,
      hour: n,
      minute: n
    };
    var DATETIME_SHORT_WITH_SECONDS = {
      year: n,
      month: n,
      day: n,
      hour: n,
      minute: n,
      second: n
    };
    var DATETIME_MED = {
      year: n,
      month: s,
      day: n,
      hour: n,
      minute: n
    };
    var DATETIME_MED_WITH_SECONDS = {
      year: n,
      month: s,
      day: n,
      hour: n,
      minute: n,
      second: n
    };
    var DATETIME_MED_WITH_WEEKDAY = {
      year: n,
      month: s,
      day: n,
      weekday: s,
      hour: n,
      minute: n
    };
    var DATETIME_FULL = {
      year: n,
      month: l,
      day: n,
      hour: n,
      minute: n,
      timeZoneName: s
    };
    var DATETIME_FULL_WITH_SECONDS = {
      year: n,
      month: l,
      day: n,
      hour: n,
      minute: n,
      second: n,
      timeZoneName: s
    };
    var DATETIME_HUGE = {
      year: n,
      month: l,
      day: n,
      weekday: l,
      hour: n,
      minute: n,
      timeZoneName: l
    };
    var DATETIME_HUGE_WITH_SECONDS = {
      year: n,
      month: l,
      day: n,
      weekday: l,
      hour: n,
      minute: n,
      second: n,
      timeZoneName: l
    };
    var Zone = class {
      /**
       * The type of zone
       * @abstract
       * @type {string}
       */
      get type() {
        throw new ZoneIsAbstractError();
      }
      /**
       * The name of this zone.
       * @abstract
       * @type {string}
       */
      get name() {
        throw new ZoneIsAbstractError();
      }
      /**
       * The IANA name of this zone.
       * Defaults to `name` if not overwritten by a subclass.
       * @abstract
       * @type {string}
       */
      get ianaName() {
        return this.name;
      }
      /**
       * Returns whether the offset is known to be fixed for the whole year.
       * @abstract
       * @type {boolean}
       */
      get isUniversal() {
        throw new ZoneIsAbstractError();
      }
      /**
       * Returns the offset's common name (such as EST) at the specified timestamp
       * @abstract
       * @param {number} ts - Epoch milliseconds for which to get the name
       * @param {Object} opts - Options to affect the format
       * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
       * @param {string} opts.locale - What locale to return the offset name in.
       * @return {string}
       */
      offsetName(ts, opts) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Returns the offset's value as a string
       * @abstract
       * @param {number} ts - Epoch milliseconds for which to get the offset
       * @param {string} format - What style of offset to return.
       *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
       * @return {string}
       */
      formatOffset(ts, format) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Return the offset in minutes for this zone at the specified timestamp.
       * @abstract
       * @param {number} ts - Epoch milliseconds for which to compute the offset
       * @return {number}
       */
      offset(ts) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Return whether this Zone is equal to another zone
       * @abstract
       * @param {Zone} otherZone - the zone to compare
       * @return {boolean}
       */
      equals(otherZone) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Return whether this Zone is valid.
       * @abstract
       * @type {boolean}
       */
      get isValid() {
        throw new ZoneIsAbstractError();
      }
    };
    var singleton$1 = null;
    var SystemZone = class _SystemZone extends Zone {
      /**
       * Get a singleton instance of the local zone
       * @return {SystemZone}
       */
      static get instance() {
        if (singleton$1 === null) {
          singleton$1 = new _SystemZone();
        }
        return singleton$1;
      }
      /** @override **/
      get type() {
        return "system";
      }
      /** @override **/
      get name() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
      /** @override **/
      get isUniversal() {
        return false;
      }
      /** @override **/
      offsetName(ts, {
        format,
        locale
      }) {
        return parseZoneInfo(ts, format, locale);
      }
      /** @override **/
      formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
      }
      /** @override **/
      offset(ts) {
        return -new Date(ts).getTimezoneOffset();
      }
      /** @override **/
      equals(otherZone) {
        return otherZone.type === "system";
      }
      /** @override **/
      get isValid() {
        return true;
      }
    };
    var dtfCache = /* @__PURE__ */ new Map();
    function makeDTF(zoneName) {
      let dtf = dtfCache.get(zoneName);
      if (dtf === void 0) {
        dtf = new Intl.DateTimeFormat("en-US", {
          hour12: false,
          timeZone: zoneName,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          era: "short"
        });
        dtfCache.set(zoneName, dtf);
      }
      return dtf;
    }
    var typeToPos = {
      year: 0,
      month: 1,
      day: 2,
      era: 3,
      hour: 4,
      minute: 5,
      second: 6
    };
    function hackyOffset(dtf, date) {
      const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
      return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
    }
    function partsOffset(dtf, date) {
      const formatted = dtf.formatToParts(date);
      const filled = [];
      for (let i = 0; i < formatted.length; i++) {
        const {
          type,
          value
        } = formatted[i];
        const pos = typeToPos[type];
        if (type === "era") {
          filled[pos] = value;
        } else if (!isUndefined(pos)) {
          filled[pos] = parseInt(value, 10);
        }
      }
      return filled;
    }
    var ianaZoneCache = /* @__PURE__ */ new Map();
    var IANAZone = class _IANAZone extends Zone {
      /**
       * @param {string} name - Zone name
       * @return {IANAZone}
       */
      static create(name) {
        let zone = ianaZoneCache.get(name);
        if (zone === void 0) {
          ianaZoneCache.set(name, zone = new _IANAZone(name));
        }
        return zone;
      }
      /**
       * Reset local caches. Should only be necessary in testing scenarios.
       * @return {void}
       */
      static resetCache() {
        ianaZoneCache.clear();
        dtfCache.clear();
      }
      /**
       * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
       * @param {string} s - The string to check validity on
       * @example IANAZone.isValidSpecifier("America/New_York") //=> true
       * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
       * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
       * @return {boolean}
       */
      static isValidSpecifier(s2) {
        return this.isValidZone(s2);
      }
      /**
       * Returns whether the provided string identifies a real zone
       * @param {string} zone - The string to check
       * @example IANAZone.isValidZone("America/New_York") //=> true
       * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
       * @example IANAZone.isValidZone("Sport~~blorp") //=> false
       * @return {boolean}
       */
      static isValidZone(zone) {
        if (!zone) {
          return false;
        }
        try {
          new Intl.DateTimeFormat("en-US", {
            timeZone: zone
          }).format();
          return true;
        } catch (e) {
          return false;
        }
      }
      constructor(name) {
        super();
        this.zoneName = name;
        this.valid = _IANAZone.isValidZone(name);
      }
      /**
       * The type of zone. `iana` for all instances of `IANAZone`.
       * @override
       * @type {string}
       */
      get type() {
        return "iana";
      }
      /**
       * The name of this zone (i.e. the IANA zone name).
       * @override
       * @type {string}
       */
      get name() {
        return this.zoneName;
      }
      /**
       * Returns whether the offset is known to be fixed for the whole year:
       * Always returns false for all IANA zones.
       * @override
       * @type {boolean}
       */
      get isUniversal() {
        return false;
      }
      /**
       * Returns the offset's common name (such as EST) at the specified timestamp
       * @override
       * @param {number} ts - Epoch milliseconds for which to get the name
       * @param {Object} opts - Options to affect the format
       * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
       * @param {string} opts.locale - What locale to return the offset name in.
       * @return {string}
       */
      offsetName(ts, {
        format,
        locale
      }) {
        return parseZoneInfo(ts, format, locale, this.name);
      }
      /**
       * Returns the offset's value as a string
       * @override
       * @param {number} ts - Epoch milliseconds for which to get the offset
       * @param {string} format - What style of offset to return.
       *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
       * @return {string}
       */
      formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
      }
      /**
       * Return the offset in minutes for this zone at the specified timestamp.
       * @override
       * @param {number} ts - Epoch milliseconds for which to compute the offset
       * @return {number}
       */
      offset(ts) {
        if (!this.valid) return NaN;
        const date = new Date(ts);
        if (isNaN(date)) return NaN;
        const dtf = makeDTF(this.name);
        let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
        if (adOrBc === "BC") {
          year = -Math.abs(year) + 1;
        }
        const adjustedHour = hour === 24 ? 0 : hour;
        const asUTC = objToLocalTS({
          year,
          month,
          day,
          hour: adjustedHour,
          minute,
          second,
          millisecond: 0
        });
        let asTS = +date;
        const over = asTS % 1e3;
        asTS -= over >= 0 ? over : 1e3 + over;
        return (asUTC - asTS) / (60 * 1e3);
      }
      /**
       * Return whether this Zone is equal to another zone
       * @override
       * @param {Zone} otherZone - the zone to compare
       * @return {boolean}
       */
      equals(otherZone) {
        return otherZone.type === "iana" && otherZone.name === this.name;
      }
      /**
       * Return whether this Zone is valid.
       * @override
       * @type {boolean}
       */
      get isValid() {
        return this.valid;
      }
    };
    var intlLFCache = {};
    function getCachedLF(locString, opts = {}) {
      const key = JSON.stringify([locString, opts]);
      let dtf = intlLFCache[key];
      if (!dtf) {
        dtf = new Intl.ListFormat(locString, opts);
        intlLFCache[key] = dtf;
      }
      return dtf;
    }
    var intlDTCache = /* @__PURE__ */ new Map();
    function getCachedDTF(locString, opts = {}) {
      const key = JSON.stringify([locString, opts]);
      let dtf = intlDTCache.get(key);
      if (dtf === void 0) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache.set(key, dtf);
      }
      return dtf;
    }
    var intlNumCache = /* @__PURE__ */ new Map();
    function getCachedINF(locString, opts = {}) {
      const key = JSON.stringify([locString, opts]);
      let inf = intlNumCache.get(key);
      if (inf === void 0) {
        inf = new Intl.NumberFormat(locString, opts);
        intlNumCache.set(key, inf);
      }
      return inf;
    }
    var intlRelCache = /* @__PURE__ */ new Map();
    function getCachedRTF(locString, opts = {}) {
      const {
        base,
        ...cacheKeyOpts
      } = opts;
      const key = JSON.stringify([locString, cacheKeyOpts]);
      let inf = intlRelCache.get(key);
      if (inf === void 0) {
        inf = new Intl.RelativeTimeFormat(locString, opts);
        intlRelCache.set(key, inf);
      }
      return inf;
    }
    var sysLocaleCache = null;
    function systemLocale() {
      if (sysLocaleCache) {
        return sysLocaleCache;
      } else {
        sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
        return sysLocaleCache;
      }
    }
    var intlResolvedOptionsCache = /* @__PURE__ */ new Map();
    function getCachedIntResolvedOptions(locString) {
      let opts = intlResolvedOptionsCache.get(locString);
      if (opts === void 0) {
        opts = new Intl.DateTimeFormat(locString).resolvedOptions();
        intlResolvedOptionsCache.set(locString, opts);
      }
      return opts;
    }
    var weekInfoCache = /* @__PURE__ */ new Map();
    function getCachedWeekInfo(locString) {
      let data = weekInfoCache.get(locString);
      if (!data) {
        const locale = new Intl.Locale(locString);
        data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
        if (!("minimalDays" in data)) {
          data = {
            ...fallbackWeekSettings,
            ...data
          };
        }
        weekInfoCache.set(locString, data);
      }
      return data;
    }
    function parseLocaleString(localeStr) {
      const xIndex = localeStr.indexOf("-x-");
      if (xIndex !== -1) {
        localeStr = localeStr.substring(0, xIndex);
      }
      const uIndex = localeStr.indexOf("-u-");
      if (uIndex === -1) {
        return [localeStr];
      } else {
        let options;
        let selectedStr;
        try {
          options = getCachedDTF(localeStr).resolvedOptions();
          selectedStr = localeStr;
        } catch (e) {
          const smaller = localeStr.substring(0, uIndex);
          options = getCachedDTF(smaller).resolvedOptions();
          selectedStr = smaller;
        }
        const {
          numberingSystem,
          calendar
        } = options;
        return [selectedStr, numberingSystem, calendar];
      }
    }
    function intlConfigString(localeStr, numberingSystem, outputCalendar) {
      if (outputCalendar || numberingSystem) {
        if (!localeStr.includes("-u-")) {
          localeStr += "-u";
        }
        if (outputCalendar) {
          localeStr += `-ca-${outputCalendar}`;
        }
        if (numberingSystem) {
          localeStr += `-nu-${numberingSystem}`;
        }
        return localeStr;
      } else {
        return localeStr;
      }
    }
    function mapMonths(f) {
      const ms = [];
      for (let i = 1; i <= 12; i++) {
        const dt = DateTime.utc(2009, i, 1);
        ms.push(f(dt));
      }
      return ms;
    }
    function mapWeekdays(f) {
      const ms = [];
      for (let i = 1; i <= 7; i++) {
        const dt = DateTime.utc(2016, 11, 13 + i);
        ms.push(f(dt));
      }
      return ms;
    }
    function listStuff(loc, length, englishFn, intlFn) {
      const mode = loc.listingMode();
      if (mode === "error") {
        return null;
      } else if (mode === "en") {
        return englishFn(length);
      } else {
        return intlFn(length);
      }
    }
    function supportsFastNumbers(loc) {
      if (loc.numberingSystem && loc.numberingSystem !== "latn") {
        return false;
      } else {
        return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || getCachedIntResolvedOptions(loc.locale).numberingSystem === "latn";
      }
    }
    var PolyNumberFormatter = class {
      constructor(intl, forceSimple, opts) {
        this.padTo = opts.padTo || 0;
        this.floor = opts.floor || false;
        const {
          padTo,
          floor,
          ...otherOpts
        } = opts;
        if (!forceSimple || Object.keys(otherOpts).length > 0) {
          const intlOpts = {
            useGrouping: false,
            ...opts
          };
          if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
          this.inf = getCachedINF(intl, intlOpts);
        }
      }
      format(i) {
        if (this.inf) {
          const fixed = this.floor ? Math.floor(i) : i;
          return this.inf.format(fixed);
        } else {
          const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
          return padStart(fixed, this.padTo);
        }
      }
    };
    var PolyDateFormatter = class {
      constructor(dt, intl, opts) {
        this.opts = opts;
        this.originalZone = void 0;
        let z = void 0;
        if (this.opts.timeZone) {
          this.dt = dt;
        } else if (dt.zone.type === "fixed") {
          const gmtOffset = -1 * (dt.offset / 60);
          const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
          if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
            z = offsetZ;
            this.dt = dt;
          } else {
            z = "UTC";
            this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({
              minutes: dt.offset
            });
            this.originalZone = dt.zone;
          }
        } else if (dt.zone.type === "system") {
          this.dt = dt;
        } else if (dt.zone.type === "iana") {
          this.dt = dt;
          z = dt.zone.name;
        } else {
          z = "UTC";
          this.dt = dt.setZone("UTC").plus({
            minutes: dt.offset
          });
          this.originalZone = dt.zone;
        }
        const intlOpts = {
          ...this.opts
        };
        intlOpts.timeZone = intlOpts.timeZone || z;
        this.dtf = getCachedDTF(intl, intlOpts);
      }
      format() {
        if (this.originalZone) {
          return this.formatToParts().map(({
            value
          }) => value).join("");
        }
        return this.dtf.format(this.dt.toJSDate());
      }
      formatToParts() {
        const parts = this.dtf.formatToParts(this.dt.toJSDate());
        if (this.originalZone) {
          return parts.map((part) => {
            if (part.type === "timeZoneName") {
              const offsetName = this.originalZone.offsetName(this.dt.ts, {
                locale: this.dt.locale,
                format: this.opts.timeZoneName
              });
              return {
                ...part,
                value: offsetName
              };
            } else {
              return part;
            }
          });
        }
        return parts;
      }
      resolvedOptions() {
        return this.dtf.resolvedOptions();
      }
    };
    var PolyRelFormatter = class {
      constructor(intl, isEnglish, opts) {
        this.opts = {
          style: "long",
          ...opts
        };
        if (!isEnglish && hasRelative()) {
          this.rtf = getCachedRTF(intl, opts);
        }
      }
      format(count, unit) {
        if (this.rtf) {
          return this.rtf.format(count, unit);
        } else {
          return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
        }
      }
      formatToParts(count, unit) {
        if (this.rtf) {
          return this.rtf.formatToParts(count, unit);
        } else {
          return [];
        }
      }
    };
    var fallbackWeekSettings = {
      firstDay: 1,
      minimalDays: 4,
      weekend: [6, 7]
    };
    var Locale = class _Locale {
      static fromOpts(opts) {
        return _Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.weekSettings, opts.defaultToEN);
      }
      static create(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
        const specifiedLocale = locale || Settings.defaultLocale;
        const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
        const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
        const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
        const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
        return new _Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
      }
      static resetCache() {
        sysLocaleCache = null;
        intlDTCache.clear();
        intlNumCache.clear();
        intlRelCache.clear();
        intlResolvedOptionsCache.clear();
        weekInfoCache.clear();
      }
      static fromObject({
        locale,
        numberingSystem,
        outputCalendar,
        weekSettings
      } = {}) {
        return _Locale.create(locale, numberingSystem, outputCalendar, weekSettings);
      }
      constructor(locale, numbering, outputCalendar, weekSettings, specifiedLocale) {
        const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
        this.locale = parsedLocale;
        this.numberingSystem = numbering || parsedNumberingSystem || null;
        this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
        this.weekSettings = weekSettings;
        this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
        this.weekdaysCache = {
          format: {},
          standalone: {}
        };
        this.monthsCache = {
          format: {},
          standalone: {}
        };
        this.meridiemCache = null;
        this.eraCache = {};
        this.specifiedLocale = specifiedLocale;
        this.fastNumbersCached = null;
      }
      get fastNumbers() {
        if (this.fastNumbersCached == null) {
          this.fastNumbersCached = supportsFastNumbers(this);
        }
        return this.fastNumbersCached;
      }
      listingMode() {
        const isActuallyEn = this.isEnglish();
        const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
        return isActuallyEn && hasNoWeirdness ? "en" : "intl";
      }
      clone(alts) {
        if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
          return this;
        } else {
          return _Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, validateWeekSettings(alts.weekSettings) || this.weekSettings, alts.defaultToEN || false);
        }
      }
      redefaultToEN(alts = {}) {
        return this.clone({
          ...alts,
          defaultToEN: true
        });
      }
      redefaultToSystem(alts = {}) {
        return this.clone({
          ...alts,
          defaultToEN: false
        });
      }
      months(length, format = false) {
        return listStuff(this, length, months, () => {
          const intl = format ? {
            month: length,
            day: "numeric"
          } : {
            month: length
          }, formatStr = format ? "format" : "standalone";
          if (!this.monthsCache[formatStr][length]) {
            this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
          }
          return this.monthsCache[formatStr][length];
        });
      }
      weekdays(length, format = false) {
        return listStuff(this, length, weekdays, () => {
          const intl = format ? {
            weekday: length,
            year: "numeric",
            month: "long",
            day: "numeric"
          } : {
            weekday: length
          }, formatStr = format ? "format" : "standalone";
          if (!this.weekdaysCache[formatStr][length]) {
            this.weekdaysCache[formatStr][length] = mapWeekdays((dt) => this.extract(dt, intl, "weekday"));
          }
          return this.weekdaysCache[formatStr][length];
        });
      }
      meridiems() {
        return listStuff(this, void 0, () => meridiems, () => {
          if (!this.meridiemCache) {
            const intl = {
              hour: "numeric",
              hourCycle: "h12"
            };
            this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map((dt) => this.extract(dt, intl, "dayperiod"));
          }
          return this.meridiemCache;
        });
      }
      eras(length) {
        return listStuff(this, length, eras, () => {
          const intl = {
            era: length
          };
          if (!this.eraCache[length]) {
            this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) => this.extract(dt, intl, "era"));
          }
          return this.eraCache[length];
        });
      }
      extract(dt, intlOpts, field) {
        const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m) => m.type.toLowerCase() === field);
        return matching ? matching.value : null;
      }
      numberFormatter(opts = {}) {
        return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
      }
      dtFormatter(dt, intlOpts = {}) {
        return new PolyDateFormatter(dt, this.intl, intlOpts);
      }
      relFormatter(opts = {}) {
        return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
      }
      listFormatter(opts = {}) {
        return getCachedLF(this.intl, opts);
      }
      isEnglish() {
        return this.locale === "en" || this.locale.toLowerCase() === "en-us" || getCachedIntResolvedOptions(this.intl).locale.startsWith("en-us");
      }
      getWeekSettings() {
        if (this.weekSettings) {
          return this.weekSettings;
        } else if (!hasLocaleWeekInfo()) {
          return fallbackWeekSettings;
        } else {
          return getCachedWeekInfo(this.locale);
        }
      }
      getStartOfWeek() {
        return this.getWeekSettings().firstDay;
      }
      getMinDaysInFirstWeek() {
        return this.getWeekSettings().minimalDays;
      }
      getWeekendDays() {
        return this.getWeekSettings().weekend;
      }
      equals(other) {
        return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
      }
      toString() {
        return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
      }
    };
    var singleton = null;
    var FixedOffsetZone = class _FixedOffsetZone extends Zone {
      /**
       * Get a singleton instance of UTC
       * @return {FixedOffsetZone}
       */
      static get utcInstance() {
        if (singleton === null) {
          singleton = new _FixedOffsetZone(0);
        }
        return singleton;
      }
      /**
       * Get an instance with a specified offset
       * @param {number} offset - The offset in minutes
       * @return {FixedOffsetZone}
       */
      static instance(offset2) {
        return offset2 === 0 ? _FixedOffsetZone.utcInstance : new _FixedOffsetZone(offset2);
      }
      /**
       * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
       * @param {string} s - The offset string to parse
       * @example FixedOffsetZone.parseSpecifier("UTC+6")
       * @example FixedOffsetZone.parseSpecifier("UTC+06")
       * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
       * @return {FixedOffsetZone}
       */
      static parseSpecifier(s2) {
        if (s2) {
          const r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
          if (r) {
            return new _FixedOffsetZone(signedOffset(r[1], r[2]));
          }
        }
        return null;
      }
      constructor(offset2) {
        super();
        this.fixed = offset2;
      }
      /**
       * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
       * @override
       * @type {string}
       */
      get type() {
        return "fixed";
      }
      /**
       * The name of this zone.
       * All fixed zones' names always start with "UTC" (plus optional offset)
       * @override
       * @type {string}
       */
      get name() {
        return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
      }
      /**
       * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
       *
       * @override
       * @type {string}
       */
      get ianaName() {
        if (this.fixed === 0) {
          return "Etc/UTC";
        } else {
          return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
        }
      }
      /**
       * Returns the offset's common name at the specified timestamp.
       *
       * For fixed offset zones this equals to the zone name.
       * @override
       */
      offsetName() {
        return this.name;
      }
      /**
       * Returns the offset's value as a string
       * @override
       * @param {number} ts - Epoch milliseconds for which to get the offset
       * @param {string} format - What style of offset to return.
       *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
       * @return {string}
       */
      formatOffset(ts, format) {
        return formatOffset(this.fixed, format);
      }
      /**
       * Returns whether the offset is known to be fixed for the whole year:
       * Always returns true for all fixed offset zones.
       * @override
       * @type {boolean}
       */
      get isUniversal() {
        return true;
      }
      /**
       * Return the offset in minutes for this zone at the specified timestamp.
       *
       * For fixed offset zones, this is constant and does not depend on a timestamp.
       * @override
       * @return {number}
       */
      offset() {
        return this.fixed;
      }
      /**
       * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
       * @override
       * @param {Zone} otherZone - the zone to compare
       * @return {boolean}
       */
      equals(otherZone) {
        return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
      }
      /**
       * Return whether this Zone is valid:
       * All fixed offset zones are valid.
       * @override
       * @type {boolean}
       */
      get isValid() {
        return true;
      }
    };
    var InvalidZone = class extends Zone {
      constructor(zoneName) {
        super();
        this.zoneName = zoneName;
      }
      /** @override **/
      get type() {
        return "invalid";
      }
      /** @override **/
      get name() {
        return this.zoneName;
      }
      /** @override **/
      get isUniversal() {
        return false;
      }
      /** @override **/
      offsetName() {
        return null;
      }
      /** @override **/
      formatOffset() {
        return "";
      }
      /** @override **/
      offset() {
        return NaN;
      }
      /** @override **/
      equals() {
        return false;
      }
      /** @override **/
      get isValid() {
        return false;
      }
    };
    function normalizeZone(input, defaultZone2) {
      if (isUndefined(input) || input === null) {
        return defaultZone2;
      } else if (input instanceof Zone) {
        return input;
      } else if (isString(input)) {
        const lowered = input.toLowerCase();
        if (lowered === "default") return defaultZone2;
        else if (lowered === "local" || lowered === "system") return SystemZone.instance;
        else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
        else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
      } else if (isNumber(input)) {
        return FixedOffsetZone.instance(input);
      } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
        return input;
      } else {
        return new InvalidZone(input);
      }
    }
    var numberingSystems = {
      arab: "[\u0660-\u0669]",
      arabext: "[\u06F0-\u06F9]",
      bali: "[\u1B50-\u1B59]",
      beng: "[\u09E6-\u09EF]",
      deva: "[\u0966-\u096F]",
      fullwide: "[\uFF10-\uFF19]",
      gujr: "[\u0AE6-\u0AEF]",
      hanidec: "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
      khmr: "[\u17E0-\u17E9]",
      knda: "[\u0CE6-\u0CEF]",
      laoo: "[\u0ED0-\u0ED9]",
      limb: "[\u1946-\u194F]",
      mlym: "[\u0D66-\u0D6F]",
      mong: "[\u1810-\u1819]",
      mymr: "[\u1040-\u1049]",
      orya: "[\u0B66-\u0B6F]",
      tamldec: "[\u0BE6-\u0BEF]",
      telu: "[\u0C66-\u0C6F]",
      thai: "[\u0E50-\u0E59]",
      tibt: "[\u0F20-\u0F29]",
      latn: "\\d"
    };
    var numberingSystemsUTF16 = {
      arab: [1632, 1641],
      arabext: [1776, 1785],
      bali: [6992, 7001],
      beng: [2534, 2543],
      deva: [2406, 2415],
      fullwide: [65296, 65303],
      gujr: [2790, 2799],
      khmr: [6112, 6121],
      knda: [3302, 3311],
      laoo: [3792, 3801],
      limb: [6470, 6479],
      mlym: [3430, 3439],
      mong: [6160, 6169],
      mymr: [4160, 4169],
      orya: [2918, 2927],
      tamldec: [3046, 3055],
      telu: [3174, 3183],
      thai: [3664, 3673],
      tibt: [3872, 3881]
    };
    var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
    function parseDigits(str) {
      let value = parseInt(str, 10);
      if (isNaN(value)) {
        value = "";
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          if (str[i].search(numberingSystems.hanidec) !== -1) {
            value += hanidecChars.indexOf(str[i]);
          } else {
            for (const key in numberingSystemsUTF16) {
              const [min, max] = numberingSystemsUTF16[key];
              if (code >= min && code <= max) {
                value += code - min;
              }
            }
          }
        }
        return parseInt(value, 10);
      } else {
        return value;
      }
    }
    var digitRegexCache = /* @__PURE__ */ new Map();
    function resetDigitRegexCache() {
      digitRegexCache.clear();
    }
    function digitRegex({
      numberingSystem
    }, append = "") {
      const ns = numberingSystem || "latn";
      let appendCache = digitRegexCache.get(ns);
      if (appendCache === void 0) {
        appendCache = /* @__PURE__ */ new Map();
        digitRegexCache.set(ns, appendCache);
      }
      let regex = appendCache.get(append);
      if (regex === void 0) {
        regex = new RegExp(`${numberingSystems[ns]}${append}`);
        appendCache.set(append, regex);
      }
      return regex;
    }
    var now = () => Date.now();
    var defaultZone = "system";
    var defaultLocale = null;
    var defaultNumberingSystem = null;
    var defaultOutputCalendar = null;
    var twoDigitCutoffYear = 60;
    var throwOnInvalid;
    var defaultWeekSettings = null;
    var Settings = class {
      /**
       * Get the callback for returning the current timestamp.
       * @type {function}
       */
      static get now() {
        return now;
      }
      /**
       * Set the callback for returning the current timestamp.
       * The function should return a number, which will be interpreted as an Epoch millisecond count
       * @type {function}
       * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
       * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
       */
      static set now(n2) {
        now = n2;
      }
      /**
       * Set the default time zone to create DateTimes in. Does not affect existing instances.
       * Use the value "system" to reset this value to the system's time zone.
       * @type {string}
       */
      static set defaultZone(zone) {
        defaultZone = zone;
      }
      /**
       * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
       * The default value is the system's time zone (the one set on the machine that runs this code).
       * @type {Zone}
       */
      static get defaultZone() {
        return normalizeZone(defaultZone, SystemZone.instance);
      }
      /**
       * Get the default locale to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static get defaultLocale() {
        return defaultLocale;
      }
      /**
       * Set the default locale to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static set defaultLocale(locale) {
        defaultLocale = locale;
      }
      /**
       * Get the default numbering system to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static get defaultNumberingSystem() {
        return defaultNumberingSystem;
      }
      /**
       * Set the default numbering system to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static set defaultNumberingSystem(numberingSystem) {
        defaultNumberingSystem = numberingSystem;
      }
      /**
       * Get the default output calendar to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static get defaultOutputCalendar() {
        return defaultOutputCalendar;
      }
      /**
       * Set the default output calendar to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static set defaultOutputCalendar(outputCalendar) {
        defaultOutputCalendar = outputCalendar;
      }
      /**
       * @typedef {Object} WeekSettings
       * @property {number} firstDay
       * @property {number} minimalDays
       * @property {number[]} weekend
       */
      /**
       * @return {WeekSettings|null}
       */
      static get defaultWeekSettings() {
        return defaultWeekSettings;
      }
      /**
       * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
       * how many days are required in the first week of a year.
       * Does not affect existing instances.
       *
       * @param {WeekSettings|null} weekSettings
       */
      static set defaultWeekSettings(weekSettings) {
        defaultWeekSettings = validateWeekSettings(weekSettings);
      }
      /**
       * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
       * @type {number}
       */
      static get twoDigitCutoffYear() {
        return twoDigitCutoffYear;
      }
      /**
       * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
       * @type {number}
       * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
       * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
       * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
       * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
       * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
       */
      static set twoDigitCutoffYear(cutoffYear) {
        twoDigitCutoffYear = cutoffYear % 100;
      }
      /**
       * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
       * @type {boolean}
       */
      static get throwOnInvalid() {
        return throwOnInvalid;
      }
      /**
       * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
       * @type {boolean}
       */
      static set throwOnInvalid(t) {
        throwOnInvalid = t;
      }
      /**
       * Reset Luxon's global caches. Should only be necessary in testing scenarios.
       * @return {void}
       */
      static resetCaches() {
        Locale.resetCache();
        IANAZone.resetCache();
        DateTime.resetCache();
        resetDigitRegexCache();
      }
    };
    var Invalid = class {
      constructor(reason, explanation) {
        this.reason = reason;
        this.explanation = explanation;
      }
      toMessage() {
        if (this.explanation) {
          return `${this.reason}: ${this.explanation}`;
        } else {
          return this.reason;
        }
      }
    };
    var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    function unitOutOfRange(unit, value) {
      return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
    }
    function dayOfWeek(year, month, day) {
      const d = new Date(Date.UTC(year, month - 1, day));
      if (year < 100 && year >= 0) {
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
      }
      const js = d.getUTCDay();
      return js === 0 ? 7 : js;
    }
    function computeOrdinal(year, month, day) {
      return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
    }
    function uncomputeOrdinal(year, ordinal) {
      const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i) => i < ordinal), day = ordinal - table[month0];
      return {
        month: month0 + 1,
        day
      };
    }
    function isoWeekdayToLocal(isoWeekday, startOfWeek) {
      return (isoWeekday - startOfWeek + 7) % 7 + 1;
    }
    function gregorianToWeek(gregObj, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const {
        year,
        month,
        day
      } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
      let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7), weekYear;
      if (weekNumber < 1) {
        weekYear = year - 1;
        weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
      } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
        weekYear = year + 1;
        weekNumber = 1;
      } else {
        weekYear = year;
      }
      return {
        weekYear,
        weekNumber,
        weekday,
        ...timeObject(gregObj)
      };
    }
    function weekToGregorian(weekData, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const {
        weekYear,
        weekNumber,
        weekday
      } = weekData, weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek), yearInDays = daysInYear(weekYear);
      let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek, year;
      if (ordinal < 1) {
        year = weekYear - 1;
        ordinal += daysInYear(year);
      } else if (ordinal > yearInDays) {
        year = weekYear + 1;
        ordinal -= daysInYear(weekYear);
      } else {
        year = weekYear;
      }
      const {
        month,
        day
      } = uncomputeOrdinal(year, ordinal);
      return {
        year,
        month,
        day,
        ...timeObject(weekData)
      };
    }
    function gregorianToOrdinal(gregData) {
      const {
        year,
        month,
        day
      } = gregData;
      const ordinal = computeOrdinal(year, month, day);
      return {
        year,
        ordinal,
        ...timeObject(gregData)
      };
    }
    function ordinalToGregorian(ordinalData) {
      const {
        year,
        ordinal
      } = ordinalData;
      const {
        month,
        day
      } = uncomputeOrdinal(year, ordinal);
      return {
        year,
        month,
        day,
        ...timeObject(ordinalData)
      };
    }
    function usesLocalWeekValues(obj, loc) {
      const hasLocaleWeekData = !isUndefined(obj.localWeekday) || !isUndefined(obj.localWeekNumber) || !isUndefined(obj.localWeekYear);
      if (hasLocaleWeekData) {
        const hasIsoWeekData = !isUndefined(obj.weekday) || !isUndefined(obj.weekNumber) || !isUndefined(obj.weekYear);
        if (hasIsoWeekData) {
          throw new ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
        }
        if (!isUndefined(obj.localWeekday)) obj.weekday = obj.localWeekday;
        if (!isUndefined(obj.localWeekNumber)) obj.weekNumber = obj.localWeekNumber;
        if (!isUndefined(obj.localWeekYear)) obj.weekYear = obj.localWeekYear;
        delete obj.localWeekday;
        delete obj.localWeekNumber;
        delete obj.localWeekYear;
        return {
          minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
          startOfWeek: loc.getStartOfWeek()
        };
      } else {
        return {
          minDaysInFirstWeek: 4,
          startOfWeek: 1
        };
      }
    }
    function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)), validWeekday = integerBetween(obj.weekday, 1, 7);
      if (!validYear) {
        return unitOutOfRange("weekYear", obj.weekYear);
      } else if (!validWeek) {
        return unitOutOfRange("week", obj.weekNumber);
      } else if (!validWeekday) {
        return unitOutOfRange("weekday", obj.weekday);
      } else return false;
    }
    function hasInvalidOrdinalData(obj) {
      const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
      if (!validYear) {
        return unitOutOfRange("year", obj.year);
      } else if (!validOrdinal) {
        return unitOutOfRange("ordinal", obj.ordinal);
      } else return false;
    }
    function hasInvalidGregorianData(obj) {
      const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
      if (!validYear) {
        return unitOutOfRange("year", obj.year);
      } else if (!validMonth) {
        return unitOutOfRange("month", obj.month);
      } else if (!validDay) {
        return unitOutOfRange("day", obj.day);
      } else return false;
    }
    function hasInvalidTimeData(obj) {
      const {
        hour,
        minute,
        second,
        millisecond
      } = obj;
      const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
      if (!validHour) {
        return unitOutOfRange("hour", hour);
      } else if (!validMinute) {
        return unitOutOfRange("minute", minute);
      } else if (!validSecond) {
        return unitOutOfRange("second", second);
      } else if (!validMillisecond) {
        return unitOutOfRange("millisecond", millisecond);
      } else return false;
    }
    function isUndefined(o) {
      return typeof o === "undefined";
    }
    function isNumber(o) {
      return typeof o === "number";
    }
    function isInteger(o) {
      return typeof o === "number" && o % 1 === 0;
    }
    function isString(o) {
      return typeof o === "string";
    }
    function isDate(o) {
      return Object.prototype.toString.call(o) === "[object Date]";
    }
    function hasRelative() {
      try {
        return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
      } catch (e) {
        return false;
      }
    }
    function hasLocaleWeekInfo() {
      try {
        return typeof Intl !== "undefined" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
      } catch (e) {
        return false;
      }
    }
    function maybeArray(thing) {
      return Array.isArray(thing) ? thing : [thing];
    }
    function bestBy(arr, by, compare) {
      if (arr.length === 0) {
        return void 0;
      }
      return arr.reduce((best, next) => {
        const pair = [by(next), next];
        if (!best) {
          return pair;
        } else if (compare(best[0], pair[0]) === best[0]) {
          return best;
        } else {
          return pair;
        }
      }, null)[1];
    }
    function pick(obj, keys) {
      return keys.reduce((a, k) => {
        a[k] = obj[k];
        return a;
      }, {});
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function validateWeekSettings(settings2) {
      if (settings2 == null) {
        return null;
      } else if (typeof settings2 !== "object") {
        throw new InvalidArgumentError("Week settings must be an object");
      } else {
        if (!integerBetween(settings2.firstDay, 1, 7) || !integerBetween(settings2.minimalDays, 1, 7) || !Array.isArray(settings2.weekend) || settings2.weekend.some((v) => !integerBetween(v, 1, 7))) {
          throw new InvalidArgumentError("Invalid week settings");
        }
        return {
          firstDay: settings2.firstDay,
          minimalDays: settings2.minimalDays,
          weekend: Array.from(settings2.weekend)
        };
      }
    }
    function integerBetween(thing, bottom, top) {
      return isInteger(thing) && thing >= bottom && thing <= top;
    }
    function floorMod(x, n2) {
      return x - n2 * Math.floor(x / n2);
    }
    function padStart(input, n2 = 2) {
      const isNeg = input < 0;
      let padded;
      if (isNeg) {
        padded = "-" + ("" + -input).padStart(n2, "0");
      } else {
        padded = ("" + input).padStart(n2, "0");
      }
      return padded;
    }
    function parseInteger(string) {
      if (isUndefined(string) || string === null || string === "") {
        return void 0;
      } else {
        return parseInt(string, 10);
      }
    }
    function parseFloating(string) {
      if (isUndefined(string) || string === null || string === "") {
        return void 0;
      } else {
        return parseFloat(string);
      }
    }
    function parseMillis(fraction) {
      if (isUndefined(fraction) || fraction === null || fraction === "") {
        return void 0;
      } else {
        const f = parseFloat("0." + fraction) * 1e3;
        return Math.floor(f);
      }
    }
    function roundTo(number, digits, towardZero = false) {
      const factor = 10 ** digits, rounder = towardZero ? Math.trunc : Math.round;
      return rounder(number * factor) / factor;
    }
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    function daysInMonth(year, month) {
      const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
      if (modMonth === 2) {
        return isLeapYear(modYear) ? 29 : 28;
      } else {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
      }
    }
    function objToLocalTS(obj) {
      let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
      if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
      }
      return +d;
    }
    function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
      const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
      return -fwdlw + minDaysInFirstWeek - 1;
    }
    function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
      const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
      return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
    }
    function untruncateYear(year) {
      if (year > 99) {
        return year;
      } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
    }
    function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
      const date = new Date(ts), intlOpts = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      };
      if (timeZone) {
        intlOpts.timeZone = timeZone;
      }
      const modified = {
        timeZoneName: offsetFormat,
        ...intlOpts
      };
      const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find((m) => m.type.toLowerCase() === "timezonename");
      return parsed ? parsed.value : null;
    }
    function signedOffset(offHourStr, offMinuteStr) {
      let offHour = parseInt(offHourStr, 10);
      if (Number.isNaN(offHour)) {
        offHour = 0;
      }
      const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
      return offHour * 60 + offMinSigned;
    }
    function asNumber(value) {
      const numericValue = Number(value);
      if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) throw new InvalidArgumentError(`Invalid unit value ${value}`);
      return numericValue;
    }
    function normalizeObject(obj, normalizer) {
      const normalized = {};
      for (const u in obj) {
        if (hasOwnProperty(obj, u)) {
          const v = obj[u];
          if (v === void 0 || v === null) continue;
          normalized[normalizer(u)] = asNumber(v);
        }
      }
      return normalized;
    }
    function formatOffset(offset2, format) {
      const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
      switch (format) {
        case "short":
          return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
        case "narrow":
          return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
        case "techie":
          return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
        default:
          throw new RangeError(`Value format ${format} is out of range for property format`);
      }
    }
    function timeObject(obj) {
      return pick(obj, ["hour", "minute", "second", "millisecond"]);
    }
    var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    function months(length) {
      switch (length) {
        case "narrow":
          return [...monthsNarrow];
        case "short":
          return [...monthsShort];
        case "long":
          return [...monthsLong];
        case "numeric":
          return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        case "2-digit":
          return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        default:
          return null;
      }
    }
    var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
    function weekdays(length) {
      switch (length) {
        case "narrow":
          return [...weekdaysNarrow];
        case "short":
          return [...weekdaysShort];
        case "long":
          return [...weekdaysLong];
        case "numeric":
          return ["1", "2", "3", "4", "5", "6", "7"];
        default:
          return null;
      }
    }
    var meridiems = ["AM", "PM"];
    var erasLong = ["Before Christ", "Anno Domini"];
    var erasShort = ["BC", "AD"];
    var erasNarrow = ["B", "A"];
    function eras(length) {
      switch (length) {
        case "narrow":
          return [...erasNarrow];
        case "short":
          return [...erasShort];
        case "long":
          return [...erasLong];
        default:
          return null;
      }
    }
    function meridiemForDateTime(dt) {
      return meridiems[dt.hour < 12 ? 0 : 1];
    }
    function weekdayForDateTime(dt, length) {
      return weekdays(length)[dt.weekday - 1];
    }
    function monthForDateTime(dt, length) {
      return months(length)[dt.month - 1];
    }
    function eraForDateTime(dt, length) {
      return eras(length)[dt.year < 0 ? 0 : 1];
    }
    function formatRelativeTime(unit, count, numeric2 = "always", narrow = false) {
      const units = {
        years: ["year", "yr."],
        quarters: ["quarter", "qtr."],
        months: ["month", "mo."],
        weeks: ["week", "wk."],
        days: ["day", "day", "days"],
        hours: ["hour", "hr."],
        minutes: ["minute", "min."],
        seconds: ["second", "sec."]
      };
      const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
      if (numeric2 === "auto" && lastable) {
        const isDay = unit === "days";
        switch (count) {
          case 1:
            return isDay ? "tomorrow" : `next ${units[unit][0]}`;
          case -1:
            return isDay ? "yesterday" : `last ${units[unit][0]}`;
          case 0:
            return isDay ? "today" : `this ${units[unit][0]}`;
        }
      }
      const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
      return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
    }
    function stringifyTokens(splits, tokenToString) {
      let s2 = "";
      for (const token of splits) {
        if (token.literal) {
          s2 += token.val;
        } else {
          s2 += tokenToString(token.val);
        }
      }
      return s2;
    }
    var macroTokenToFormatOpts = {
      D: DATE_SHORT,
      DD: DATE_MED,
      DDD: DATE_FULL,
      DDDD: DATE_HUGE,
      t: TIME_SIMPLE,
      tt: TIME_WITH_SECONDS,
      ttt: TIME_WITH_SHORT_OFFSET,
      tttt: TIME_WITH_LONG_OFFSET,
      T: TIME_24_SIMPLE,
      TT: TIME_24_WITH_SECONDS,
      TTT: TIME_24_WITH_SHORT_OFFSET,
      TTTT: TIME_24_WITH_LONG_OFFSET,
      f: DATETIME_SHORT,
      ff: DATETIME_MED,
      fff: DATETIME_FULL,
      ffff: DATETIME_HUGE,
      F: DATETIME_SHORT_WITH_SECONDS,
      FF: DATETIME_MED_WITH_SECONDS,
      FFF: DATETIME_FULL_WITH_SECONDS,
      FFFF: DATETIME_HUGE_WITH_SECONDS
    };
    var Formatter = class _Formatter {
      static create(locale, opts = {}) {
        return new _Formatter(locale, opts);
      }
      static parseFormat(fmt) {
        let current = null, currentFull = "", bracketed = false;
        const splits = [];
        for (let i = 0; i < fmt.length; i++) {
          const c = fmt.charAt(i);
          if (c === "'") {
            if (currentFull.length > 0) {
              splits.push({
                literal: bracketed || /^\s+$/.test(currentFull),
                val: currentFull
              });
            }
            current = null;
            currentFull = "";
            bracketed = !bracketed;
          } else if (bracketed) {
            currentFull += c;
          } else if (c === current) {
            currentFull += c;
          } else {
            if (currentFull.length > 0) {
              splits.push({
                literal: /^\s+$/.test(currentFull),
                val: currentFull
              });
            }
            currentFull = c;
            current = c;
          }
        }
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed || /^\s+$/.test(currentFull),
            val: currentFull
          });
        }
        return splits;
      }
      static macroTokenToFormatOpts(token) {
        return macroTokenToFormatOpts[token];
      }
      constructor(locale, formatOpts) {
        this.opts = formatOpts;
        this.loc = locale;
        this.systemLoc = null;
      }
      formatWithSystemDefault(dt, opts) {
        if (this.systemLoc === null) {
          this.systemLoc = this.loc.redefaultToSystem();
        }
        const df = this.systemLoc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
        return df.format();
      }
      dtFormatter(dt, opts = {}) {
        return this.loc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
      }
      formatDateTime(dt, opts) {
        return this.dtFormatter(dt, opts).format();
      }
      formatDateTimeParts(dt, opts) {
        return this.dtFormatter(dt, opts).formatToParts();
      }
      formatInterval(interval, opts) {
        const df = this.dtFormatter(interval.start, opts);
        return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
      }
      resolvedOptions(dt, opts) {
        return this.dtFormatter(dt, opts).resolvedOptions();
      }
      num(n2, p = 0) {
        if (this.opts.forceSimple) {
          return padStart(n2, p);
        }
        const opts = {
          ...this.opts
        };
        if (p > 0) {
          opts.padTo = p;
        }
        return this.loc.numberFormatter(opts).format(n2);
      }
      formatDateTimeFromString(dt, fmt) {
        const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
          if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
            return "Z";
          }
          return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
        }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({
          hour: "numeric",
          hourCycle: "h12"
        }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
          month: length
        } : {
          month: length,
          day: "numeric"
        }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
          weekday: length
        } : {
          weekday: length,
          month: "long",
          day: "numeric"
        }, "weekday"), maybeMacro = (token) => {
          const formatOpts = _Formatter.macroTokenToFormatOpts(token);
          if (formatOpts) {
            return this.formatWithSystemDefault(dt, formatOpts);
          } else {
            return token;
          }
        }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({
          era: length
        }, "era"), tokenToString = (token) => {
          switch (token) {
            // ms
            case "S":
              return this.num(dt.millisecond);
            case "u":
            // falls through
            case "SSS":
              return this.num(dt.millisecond, 3);
            // seconds
            case "s":
              return this.num(dt.second);
            case "ss":
              return this.num(dt.second, 2);
            // fractional seconds
            case "uu":
              return this.num(Math.floor(dt.millisecond / 10), 2);
            case "uuu":
              return this.num(Math.floor(dt.millisecond / 100));
            // minutes
            case "m":
              return this.num(dt.minute);
            case "mm":
              return this.num(dt.minute, 2);
            // hours
            case "h":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
            case "hh":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
            case "H":
              return this.num(dt.hour);
            case "HH":
              return this.num(dt.hour, 2);
            // offset
            case "Z":
              return formatOffset2({
                format: "narrow",
                allowZ: this.opts.allowZ
              });
            case "ZZ":
              return formatOffset2({
                format: "short",
                allowZ: this.opts.allowZ
              });
            case "ZZZ":
              return formatOffset2({
                format: "techie",
                allowZ: this.opts.allowZ
              });
            case "ZZZZ":
              return dt.zone.offsetName(dt.ts, {
                format: "short",
                locale: this.loc.locale
              });
            case "ZZZZZ":
              return dt.zone.offsetName(dt.ts, {
                format: "long",
                locale: this.loc.locale
              });
            // zone
            case "z":
              return dt.zoneName;
            // meridiems
            case "a":
              return meridiem();
            // dates
            case "d":
              return useDateTimeFormatter ? string({
                day: "numeric"
              }, "day") : this.num(dt.day);
            case "dd":
              return useDateTimeFormatter ? string({
                day: "2-digit"
              }, "day") : this.num(dt.day, 2);
            // weekdays - standalone
            case "c":
              return this.num(dt.weekday);
            case "ccc":
              return weekday("short", true);
            case "cccc":
              return weekday("long", true);
            case "ccccc":
              return weekday("narrow", true);
            // weekdays - format
            case "E":
              return this.num(dt.weekday);
            case "EEE":
              return weekday("short", false);
            case "EEEE":
              return weekday("long", false);
            case "EEEEE":
              return weekday("narrow", false);
            // months - standalone
            case "L":
              return useDateTimeFormatter ? string({
                month: "numeric",
                day: "numeric"
              }, "month") : this.num(dt.month);
            case "LL":
              return useDateTimeFormatter ? string({
                month: "2-digit",
                day: "numeric"
              }, "month") : this.num(dt.month, 2);
            case "LLL":
              return month("short", true);
            case "LLLL":
              return month("long", true);
            case "LLLLL":
              return month("narrow", true);
            // months - format
            case "M":
              return useDateTimeFormatter ? string({
                month: "numeric"
              }, "month") : this.num(dt.month);
            case "MM":
              return useDateTimeFormatter ? string({
                month: "2-digit"
              }, "month") : this.num(dt.month, 2);
            case "MMM":
              return month("short", false);
            case "MMMM":
              return month("long", false);
            case "MMMMM":
              return month("narrow", false);
            // years
            case "y":
              return useDateTimeFormatter ? string({
                year: "numeric"
              }, "year") : this.num(dt.year);
            case "yy":
              return useDateTimeFormatter ? string({
                year: "2-digit"
              }, "year") : this.num(dt.year.toString().slice(-2), 2);
            case "yyyy":
              return useDateTimeFormatter ? string({
                year: "numeric"
              }, "year") : this.num(dt.year, 4);
            case "yyyyyy":
              return useDateTimeFormatter ? string({
                year: "numeric"
              }, "year") : this.num(dt.year, 6);
            // eras
            case "G":
              return era("short");
            case "GG":
              return era("long");
            case "GGGGG":
              return era("narrow");
            case "kk":
              return this.num(dt.weekYear.toString().slice(-2), 2);
            case "kkkk":
              return this.num(dt.weekYear, 4);
            case "W":
              return this.num(dt.weekNumber);
            case "WW":
              return this.num(dt.weekNumber, 2);
            case "n":
              return this.num(dt.localWeekNumber);
            case "nn":
              return this.num(dt.localWeekNumber, 2);
            case "ii":
              return this.num(dt.localWeekYear.toString().slice(-2), 2);
            case "iiii":
              return this.num(dt.localWeekYear, 4);
            case "o":
              return this.num(dt.ordinal);
            case "ooo":
              return this.num(dt.ordinal, 3);
            case "q":
              return this.num(dt.quarter);
            case "qq":
              return this.num(dt.quarter, 2);
            case "X":
              return this.num(Math.floor(dt.ts / 1e3));
            case "x":
              return this.num(dt.ts);
            default:
              return maybeMacro(token);
          }
        };
        return stringifyTokens(_Formatter.parseFormat(fmt), tokenToString);
      }
      formatDurationFromString(dur, fmt) {
        const tokenToField = (token) => {
          switch (token[0]) {
            case "S":
              return "millisecond";
            case "s":
              return "second";
            case "m":
              return "minute";
            case "h":
              return "hour";
            case "d":
              return "day";
            case "w":
              return "week";
            case "M":
              return "month";
            case "y":
              return "year";
            default:
              return null;
          }
        }, tokenToString = (lildur) => (token) => {
          const mapped = tokenToField(token);
          if (mapped) {
            return this.num(lildur.get(mapped), token.length);
          } else {
            return token;
          }
        }, tokens = _Formatter.parseFormat(fmt), realTokens = tokens.reduce((found, {
          literal,
          val
        }) => literal ? found : found.concat(val), []), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t));
        return stringifyTokens(tokens, tokenToString(collapsed));
      }
    };
    var ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
    function combineRegexes(...regexes) {
      const full = regexes.reduce((f, r) => f + r.source, "");
      return RegExp(`^${full}$`);
    }
    function combineExtractors(...extractors) {
      return (m) => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
        const [val, zone, next] = ex(m, cursor);
        return [{
          ...mergedVals,
          ...val
        }, zone || mergedZone, next];
      }, [{}, null, 1]).slice(0, 2);
    }
    function parse(s2, ...patterns) {
      if (s2 == null) {
        return [null, null];
      }
      for (const [regex, extractor] of patterns) {
        const m = regex.exec(s2);
        if (m) {
          return extractor(m);
        }
      }
      return [null, null];
    }
    function simpleParse(...keys) {
      return (match2, cursor) => {
        const ret = {};
        let i;
        for (i = 0; i < keys.length; i++) {
          ret[keys[i]] = parseInteger(match2[cursor + i]);
        }
        return [ret, null, cursor + i];
      };
    }
    var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
    var isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
    var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
    var isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
    var isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
    var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
    var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
    var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
    var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
    var extractISOOrdinalData = simpleParse("year", "ordinal");
    var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
    var sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`);
    var sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
    function int(match2, pos, fallback) {
      const m = match2[pos];
      return isUndefined(m) ? fallback : parseInteger(m);
    }
    function extractISOYmd(match2, cursor) {
      const item = {
        year: int(match2, cursor),
        month: int(match2, cursor + 1, 1),
        day: int(match2, cursor + 2, 1)
      };
      return [item, null, cursor + 3];
    }
    function extractISOTime(match2, cursor) {
      const item = {
        hours: int(match2, cursor, 0),
        minutes: int(match2, cursor + 1, 0),
        seconds: int(match2, cursor + 2, 0),
        milliseconds: parseMillis(match2[cursor + 3])
      };
      return [item, null, cursor + 4];
    }
    function extractISOOffset(match2, cursor) {
      const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
      return [{}, zone, cursor + 3];
    }
    function extractIANAZone(match2, cursor) {
      const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
      return [{}, zone, cursor + 1];
    }
    var isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
    var isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
    function extractISODuration(match2) {
      const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
      const hasNegativePrefix = s2[0] === "-";
      const negativeSeconds = secondStr && secondStr[0] === "-";
      const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
      return [{
        years: maybeNegate(parseFloating(yearStr)),
        months: maybeNegate(parseFloating(monthStr)),
        weeks: maybeNegate(parseFloating(weekStr)),
        days: maybeNegate(parseFloating(dayStr)),
        hours: maybeNegate(parseFloating(hourStr)),
        minutes: maybeNegate(parseFloating(minuteStr)),
        seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
        milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
      }];
    }
    var obsOffsets = {
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };
    function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
      const result = {
        year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
        month: monthsShort.indexOf(monthStr) + 1,
        day: parseInteger(dayStr),
        hour: parseInteger(hourStr),
        minute: parseInteger(minuteStr)
      };
      if (secondStr) result.second = parseInteger(secondStr);
      if (weekdayStr) {
        result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
      }
      return result;
    }
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
    function extractRFC2822(match2) {
      const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      let offset2;
      if (obsOffset) {
        offset2 = obsOffsets[obsOffset];
      } else if (milOffset) {
        offset2 = 0;
      } else {
        offset2 = signedOffset(offHourStr, offMinuteStr);
      }
      return [result, new FixedOffsetZone(offset2)];
    }
    function preprocessRFC2822(s2) {
      return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
    }
    var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
    var rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
    var ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
    function extractRFC1123Or850(match2) {
      const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      return [result, FixedOffsetZone.utcInstance];
    }
    function extractASCII(match2) {
      const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      return [result, FixedOffsetZone.utcInstance];
    }
    var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
    var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
    var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
    var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
    var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
    function parseISODate(s2) {
      return parse(s2, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
    }
    function parseRFC2822Date(s2) {
      return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
    }
    function parseHTTPDate(s2) {
      return parse(s2, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
    }
    function parseISODuration(s2) {
      return parse(s2, [isoDuration, extractISODuration]);
    }
    var extractISOTimeOnly = combineExtractors(extractISOTime);
    function parseISOTimeOnly(s2) {
      return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
    }
    var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
    var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
    var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
    function parseSQL(s2) {
      return parse(s2, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
    }
    var INVALID$2 = "Invalid Duration";
    var lowOrderMatrix = {
      weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1e3
      },
      days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1e3
      },
      hours: {
        minutes: 60,
        seconds: 60 * 60,
        milliseconds: 60 * 60 * 1e3
      },
      minutes: {
        seconds: 60,
        milliseconds: 60 * 1e3
      },
      seconds: {
        milliseconds: 1e3
      }
    };
    var casualMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1e3
      },
      quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        seconds: 91 * 24 * 60 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1e3
      },
      months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1e3
      },
      ...lowOrderMatrix
    };
    var daysInYearAccurate = 146097 / 400;
    var daysInMonthAccurate = 146097 / 4800;
    var accurateMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
      },
      quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: daysInYearAccurate * 24 / 4,
        minutes: daysInYearAccurate * 24 * 60 / 4,
        seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
      },
      months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
      },
      ...lowOrderMatrix
    };
    var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
    var reverseUnits = orderedUnits$1.slice(0).reverse();
    function clone$1(dur, alts, clear = false) {
      const conf = {
        values: clear ? alts.values : {
          ...dur.values,
          ...alts.values || {}
        },
        loc: dur.loc.clone(alts.loc),
        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
        matrix: alts.matrix || dur.matrix
      };
      return new Duration(conf);
    }
    function durationToMillis(matrix, vals) {
      var _vals$milliseconds;
      let sum = (_vals$milliseconds = vals.milliseconds) != null ? _vals$milliseconds : 0;
      for (const unit of reverseUnits.slice(1)) {
        if (vals[unit]) {
          sum += vals[unit] * matrix[unit]["milliseconds"];
        }
      }
      return sum;
    }
    function normalizeValues(matrix, vals) {
      const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
      orderedUnits$1.reduceRight((previous, current) => {
        if (!isUndefined(vals[current])) {
          if (previous) {
            const previousVal = vals[previous] * factor;
            const conv = matrix[current][previous];
            const rollUp = Math.floor(previousVal / conv);
            vals[current] += rollUp * factor;
            vals[previous] -= rollUp * conv * factor;
          }
          return current;
        } else {
          return previous;
        }
      }, null);
      orderedUnits$1.reduce((previous, current) => {
        if (!isUndefined(vals[current])) {
          if (previous) {
            const fraction = vals[previous] % 1;
            vals[previous] -= fraction;
            vals[current] += fraction * matrix[previous][current];
          }
          return current;
        } else {
          return previous;
        }
      }, null);
    }
    function removeZeroes(vals) {
      const newVals = {};
      for (const [key, value] of Object.entries(vals)) {
        if (value !== 0) {
          newVals[key] = value;
        }
      }
      return newVals;
    }
    var Duration = class _Duration {
      /**
       * @private
       */
      constructor(config) {
        const accurate = config.conversionAccuracy === "longterm" || false;
        let matrix = accurate ? accurateMatrix : casualMatrix;
        if (config.matrix) {
          matrix = config.matrix;
        }
        this.values = config.values;
        this.loc = config.loc || Locale.create();
        this.conversionAccuracy = accurate ? "longterm" : "casual";
        this.invalid = config.invalid || null;
        this.matrix = matrix;
        this.isLuxonDuration = true;
      }
      /**
       * Create Duration from a number of milliseconds.
       * @param {number} count of milliseconds
       * @param {Object} opts - options for parsing
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @return {Duration}
       */
      static fromMillis(count, opts) {
        return _Duration.fromObject({
          milliseconds: count
        }, opts);
      }
      /**
       * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
       * If this object is empty then a zero milliseconds duration is returned.
       * @param {Object} obj - the object to create the DateTime from
       * @param {number} obj.years
       * @param {number} obj.quarters
       * @param {number} obj.months
       * @param {number} obj.weeks
       * @param {number} obj.days
       * @param {number} obj.hours
       * @param {number} obj.minutes
       * @param {number} obj.seconds
       * @param {number} obj.milliseconds
       * @param {Object} [opts=[]] - options for creating this Duration
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
       * @param {string} [opts.matrix=Object] - the custom conversion system to use
       * @return {Duration}
       */
      static fromObject(obj, opts = {}) {
        if (obj == null || typeof obj !== "object") {
          throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
        }
        return new _Duration({
          values: normalizeObject(obj, _Duration.normalizeUnit),
          loc: Locale.fromObject(opts),
          conversionAccuracy: opts.conversionAccuracy,
          matrix: opts.matrix
        });
      }
      /**
       * Create a Duration from DurationLike.
       *
       * @param {Object | number | Duration} durationLike
       * One of:
       * - object with keys like 'years' and 'hours'.
       * - number representing milliseconds
       * - Duration instance
       * @return {Duration}
       */
      static fromDurationLike(durationLike) {
        if (isNumber(durationLike)) {
          return _Duration.fromMillis(durationLike);
        } else if (_Duration.isDuration(durationLike)) {
          return durationLike;
        } else if (typeof durationLike === "object") {
          return _Duration.fromObject(durationLike);
        } else {
          throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
        }
      }
      /**
       * Create a Duration from an ISO 8601 duration string.
       * @param {string} text - text to parse
       * @param {Object} opts - options for parsing
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
       * @param {string} [opts.matrix=Object] - the preset conversion system to use
       * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
       * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
       * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
       * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
       * @return {Duration}
       */
      static fromISO(text2, opts) {
        const [parsed] = parseISODuration(text2);
        if (parsed) {
          return _Duration.fromObject(parsed, opts);
        } else {
          return _Duration.invalid("unparsable", `the input "${text2}" can't be parsed as ISO 8601`);
        }
      }
      /**
       * Create a Duration from an ISO 8601 time string.
       * @param {string} text - text to parse
       * @param {Object} opts - options for parsing
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
       * @param {string} [opts.matrix=Object] - the conversion system to use
       * @see https://en.wikipedia.org/wiki/ISO_8601#Times
       * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
       * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @return {Duration}
       */
      static fromISOTime(text2, opts) {
        const [parsed] = parseISOTimeOnly(text2);
        if (parsed) {
          return _Duration.fromObject(parsed, opts);
        } else {
          return _Duration.invalid("unparsable", `the input "${text2}" can't be parsed as ISO 8601`);
        }
      }
      /**
       * Create an invalid Duration.
       * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
       * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
       * @return {Duration}
       */
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidDurationError(invalid);
        } else {
          return new _Duration({
            invalid
          });
        }
      }
      /**
       * @private
       */
      static normalizeUnit(unit) {
        const normalized = {
          year: "years",
          years: "years",
          quarter: "quarters",
          quarters: "quarters",
          month: "months",
          months: "months",
          week: "weeks",
          weeks: "weeks",
          day: "days",
          days: "days",
          hour: "hours",
          hours: "hours",
          minute: "minutes",
          minutes: "minutes",
          second: "seconds",
          seconds: "seconds",
          millisecond: "milliseconds",
          milliseconds: "milliseconds"
        }[unit ? unit.toLowerCase() : unit];
        if (!normalized) throw new InvalidUnitError(unit);
        return normalized;
      }
      /**
       * Check if an object is a Duration. Works across context boundaries
       * @param {object} o
       * @return {boolean}
       */
      static isDuration(o) {
        return o && o.isLuxonDuration || false;
      }
      /**
       * Get  the locale of a Duration, such 'en-GB'
       * @type {string}
       */
      get locale() {
        return this.isValid ? this.loc.locale : null;
      }
      /**
       * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
       *
       * @type {string}
       */
      get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
      }
      /**
       * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
       * * `S` for milliseconds
       * * `s` for seconds
       * * `m` for minutes
       * * `h` for hours
       * * `d` for days
       * * `w` for weeks
       * * `M` for months
       * * `y` for years
       * Notes:
       * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
       * * Tokens can be escaped by wrapping with single quotes.
       * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
       * @param {string} fmt - the format string
       * @param {Object} opts - options
       * @param {boolean} [opts.floor=true] - floor numerical values
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
       * @return {string}
       */
      toFormat(fmt, opts = {}) {
        const fmtOpts = {
          ...opts,
          floor: opts.round !== false && opts.floor !== false
        };
        return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
      }
      /**
       * Returns a string representation of a Duration with all units included.
       * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
       * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
       * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
       * @example
       * ```js
       * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
       * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
       * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
       * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
       * ```
       */
      toHuman(opts = {}) {
        if (!this.isValid) return INVALID$2;
        const l2 = orderedUnits$1.map((unit) => {
          const val = this.values[unit];
          if (isUndefined(val)) {
            return null;
          }
          return this.loc.numberFormatter({
            style: "unit",
            unitDisplay: "long",
            ...opts,
            unit: unit.slice(0, -1)
          }).format(val);
        }).filter((n2) => n2);
        return this.loc.listFormatter({
          type: "conjunction",
          style: opts.listStyle || "narrow",
          ...opts
        }).format(l2);
      }
      /**
       * Returns a JavaScript object with this Duration's values.
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
       * @return {Object}
       */
      toObject() {
        if (!this.isValid) return {};
        return {
          ...this.values
        };
      }
      /**
       * Returns an ISO 8601-compliant string representation of this Duration.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
       * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
       * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
       * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
       * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
       * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
       * @return {string}
       */
      toISO() {
        if (!this.isValid) return null;
        let s2 = "P";
        if (this.years !== 0) s2 += this.years + "Y";
        if (this.months !== 0 || this.quarters !== 0) s2 += this.months + this.quarters * 3 + "M";
        if (this.weeks !== 0) s2 += this.weeks + "W";
        if (this.days !== 0) s2 += this.days + "D";
        if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s2 += "T";
        if (this.hours !== 0) s2 += this.hours + "H";
        if (this.minutes !== 0) s2 += this.minutes + "M";
        if (this.seconds !== 0 || this.milliseconds !== 0)
          s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
        if (s2 === "P") s2 += "T0S";
        return s2;
      }
      /**
       * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
       * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Times
       * @param {Object} opts - options
       * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
       * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
       * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
       * @return {string}
       */
      toISOTime(opts = {}) {
        if (!this.isValid) return null;
        const millis = this.toMillis();
        if (millis < 0 || millis >= 864e5) return null;
        opts = {
          suppressMilliseconds: false,
          suppressSeconds: false,
          includePrefix: false,
          format: "extended",
          ...opts,
          includeOffset: false
        };
        const dateTime = DateTime.fromMillis(millis, {
          zone: "UTC"
        });
        return dateTime.toISOTime(opts);
      }
      /**
       * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
       * @return {string}
       */
      toJSON() {
        return this.toISO();
      }
      /**
       * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
       * @return {string}
       */
      toString() {
        return this.toISO();
      }
      /**
       * Returns a string representation of this Duration appropriate for the REPL.
       * @return {string}
       */
      [Symbol.for("nodejs.util.inspect.custom")]() {
        if (this.isValid) {
          return `Duration { values: ${JSON.stringify(this.values)} }`;
        } else {
          return `Duration { Invalid, reason: ${this.invalidReason} }`;
        }
      }
      /**
       * Returns an milliseconds value of this Duration.
       * @return {number}
       */
      toMillis() {
        if (!this.isValid) return NaN;
        return durationToMillis(this.matrix, this.values);
      }
      /**
       * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
       * @return {number}
       */
      valueOf() {
        return this.toMillis();
      }
      /**
       * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
       * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       * @return {Duration}
       */
      plus(duration) {
        if (!this.isValid) return this;
        const dur = _Duration.fromDurationLike(duration), result = {};
        for (const k of orderedUnits$1) {
          if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
            result[k] = dur.get(k) + this.get(k);
          }
        }
        return clone$1(this, {
          values: result
        }, true);
      }
      /**
       * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
       * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       * @return {Duration}
       */
      minus(duration) {
        if (!this.isValid) return this;
        const dur = _Duration.fromDurationLike(duration);
        return this.plus(dur.negate());
      }
      /**
       * Scale this Duration by the specified amount. Return a newly-constructed Duration.
       * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
       * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
       * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
       * @return {Duration}
       */
      mapUnits(fn) {
        if (!this.isValid) return this;
        const result = {};
        for (const k of Object.keys(this.values)) {
          result[k] = asNumber(fn(this.values[k], k));
        }
        return clone$1(this, {
          values: result
        }, true);
      }
      /**
       * Get the value of unit.
       * @param {string} unit - a unit such as 'minute' or 'day'
       * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
       * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
       * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
       * @return {number}
       */
      get(unit) {
        return this[_Duration.normalizeUnit(unit)];
      }
      /**
       * "Set" the values of specified units. Return a newly-constructed Duration.
       * @param {Object} values - a mapping of units to numbers
       * @example dur.set({ years: 2017 })
       * @example dur.set({ hours: 8, minutes: 30 })
       * @return {Duration}
       */
      set(values) {
        if (!this.isValid) return this;
        const mixed = {
          ...this.values,
          ...normalizeObject(values, _Duration.normalizeUnit)
        };
        return clone$1(this, {
          values: mixed
        });
      }
      /**
       * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
       * @example dur.reconfigure({ locale: 'en-GB' })
       * @return {Duration}
       */
      reconfigure({
        locale,
        numberingSystem,
        conversionAccuracy,
        matrix
      } = {}) {
        const loc = this.loc.clone({
          locale,
          numberingSystem
        });
        const opts = {
          loc,
          matrix,
          conversionAccuracy
        };
        return clone$1(this, opts);
      }
      /**
       * Return the length of the duration in the specified unit.
       * @param {string} unit - a unit such as 'minutes' or 'days'
       * @example Duration.fromObject({years: 1}).as('days') //=> 365
       * @example Duration.fromObject({years: 1}).as('months') //=> 12
       * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
       * @return {number}
       */
      as(unit) {
        return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
      }
      /**
       * Reduce this Duration to its canonical representation in its current units.
       * Assuming the overall value of the Duration is positive, this means:
       * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
       * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
       *   the overall value would be negative, see third example)
       * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
       *
       * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
       * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
       * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
       * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
       * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
       * @return {Duration}
       */
      normalize() {
        if (!this.isValid) return this;
        const vals = this.toObject();
        normalizeValues(this.matrix, vals);
        return clone$1(this, {
          values: vals
        }, true);
      }
      /**
       * Rescale units to its largest representation
       * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
       * @return {Duration}
       */
      rescale() {
        if (!this.isValid) return this;
        const vals = removeZeroes(this.normalize().shiftToAll().toObject());
        return clone$1(this, {
          values: vals
        }, true);
      }
      /**
       * Convert this Duration into its representation in a different set of units.
       * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
       * @return {Duration}
       */
      shiftTo(...units) {
        if (!this.isValid) return this;
        if (units.length === 0) {
          return this;
        }
        units = units.map((u) => _Duration.normalizeUnit(u));
        const built = {}, accumulated = {}, vals = this.toObject();
        let lastUnit;
        for (const k of orderedUnits$1) {
          if (units.indexOf(k) >= 0) {
            lastUnit = k;
            let own = 0;
            for (const ak in accumulated) {
              own += this.matrix[ak][k] * accumulated[ak];
              accumulated[ak] = 0;
            }
            if (isNumber(vals[k])) {
              own += vals[k];
            }
            const i = Math.trunc(own);
            built[k] = i;
            accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
          } else if (isNumber(vals[k])) {
            accumulated[k] = vals[k];
          }
        }
        for (const key in accumulated) {
          if (accumulated[key] !== 0) {
            built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
          }
        }
        normalizeValues(this.matrix, built);
        return clone$1(this, {
          values: built
        }, true);
      }
      /**
       * Shift this Duration to all available units.
       * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
       * @return {Duration}
       */
      shiftToAll() {
        if (!this.isValid) return this;
        return this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds");
      }
      /**
       * Return the negative of this Duration.
       * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
       * @return {Duration}
       */
      negate() {
        if (!this.isValid) return this;
        const negated = {};
        for (const k of Object.keys(this.values)) {
          negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
        }
        return clone$1(this, {
          values: negated
        }, true);
      }
      /**
       * Get the years.
       * @type {number}
       */
      get years() {
        return this.isValid ? this.values.years || 0 : NaN;
      }
      /**
       * Get the quarters.
       * @type {number}
       */
      get quarters() {
        return this.isValid ? this.values.quarters || 0 : NaN;
      }
      /**
       * Get the months.
       * @type {number}
       */
      get months() {
        return this.isValid ? this.values.months || 0 : NaN;
      }
      /**
       * Get the weeks
       * @type {number}
       */
      get weeks() {
        return this.isValid ? this.values.weeks || 0 : NaN;
      }
      /**
       * Get the days.
       * @type {number}
       */
      get days() {
        return this.isValid ? this.values.days || 0 : NaN;
      }
      /**
       * Get the hours.
       * @type {number}
       */
      get hours() {
        return this.isValid ? this.values.hours || 0 : NaN;
      }
      /**
       * Get the minutes.
       * @type {number}
       */
      get minutes() {
        return this.isValid ? this.values.minutes || 0 : NaN;
      }
      /**
       * Get the seconds.
       * @return {number}
       */
      get seconds() {
        return this.isValid ? this.values.seconds || 0 : NaN;
      }
      /**
       * Get the milliseconds.
       * @return {number}
       */
      get milliseconds() {
        return this.isValid ? this.values.milliseconds || 0 : NaN;
      }
      /**
       * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
       * on invalid DateTimes or Intervals.
       * @return {boolean}
       */
      get isValid() {
        return this.invalid === null;
      }
      /**
       * Returns an error code if this Duration became invalid, or null if the Duration is valid
       * @return {string}
       */
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      /**
       * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
       * @type {string}
       */
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      /**
       * Equality check
       * Two Durations are equal iff they have the same units and the same values for each unit.
       * @param {Duration} other
       * @return {boolean}
       */
      equals(other) {
        if (!this.isValid || !other.isValid) {
          return false;
        }
        if (!this.loc.equals(other.loc)) {
          return false;
        }
        function eq2(v1, v2) {
          if (v1 === void 0 || v1 === 0) return v2 === void 0 || v2 === 0;
          return v1 === v2;
        }
        for (const u of orderedUnits$1) {
          if (!eq2(this.values[u], other.values[u])) {
            return false;
          }
        }
        return true;
      }
    };
    var INVALID$1 = "Invalid Interval";
    function validateStartEnd(start, end) {
      if (!start || !start.isValid) {
        return Interval.invalid("missing or invalid start");
      } else if (!end || !end.isValid) {
        return Interval.invalid("missing or invalid end");
      } else if (end < start) {
        return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
      } else {
        return null;
      }
    }
    var Interval = class _Interval {
      /**
       * @private
       */
      constructor(config) {
        this.s = config.start;
        this.e = config.end;
        this.invalid = config.invalid || null;
        this.isLuxonInterval = true;
      }
      /**
       * Create an invalid Interval.
       * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
       * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
       * @return {Interval}
       */
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidIntervalError(invalid);
        } else {
          return new _Interval({
            invalid
          });
        }
      }
      /**
       * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
       * @param {DateTime|Date|Object} start
       * @param {DateTime|Date|Object} end
       * @return {Interval}
       */
      static fromDateTimes(start, end) {
        const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
        const validateError = validateStartEnd(builtStart, builtEnd);
        if (validateError == null) {
          return new _Interval({
            start: builtStart,
            end: builtEnd
          });
        } else {
          return validateError;
        }
      }
      /**
       * Create an Interval from a start DateTime and a Duration to extend to.
       * @param {DateTime|Date|Object} start
       * @param {Duration|Object|number} duration - the length of the Interval.
       * @return {Interval}
       */
      static after(start, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
        return _Interval.fromDateTimes(dt, dt.plus(dur));
      }
      /**
       * Create an Interval from an end DateTime and a Duration to extend backwards to.
       * @param {DateTime|Date|Object} end
       * @param {Duration|Object|number} duration - the length of the Interval.
       * @return {Interval}
       */
      static before(end, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
        return _Interval.fromDateTimes(dt.minus(dur), dt);
      }
      /**
       * Create an Interval from an ISO 8601 string.
       * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
       * @param {string} text - the ISO string to parse
       * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @return {Interval}
       */
      static fromISO(text2, opts) {
        const [s2, e] = (text2 || "").split("/", 2);
        if (s2 && e) {
          let start, startIsValid;
          try {
            start = DateTime.fromISO(s2, opts);
            startIsValid = start.isValid;
          } catch (e2) {
            startIsValid = false;
          }
          let end, endIsValid;
          try {
            end = DateTime.fromISO(e, opts);
            endIsValid = end.isValid;
          } catch (e2) {
            endIsValid = false;
          }
          if (startIsValid && endIsValid) {
            return _Interval.fromDateTimes(start, end);
          }
          if (startIsValid) {
            const dur = Duration.fromISO(e, opts);
            if (dur.isValid) {
              return _Interval.after(start, dur);
            }
          } else if (endIsValid) {
            const dur = Duration.fromISO(s2, opts);
            if (dur.isValid) {
              return _Interval.before(end, dur);
            }
          }
        }
        return _Interval.invalid("unparsable", `the input "${text2}" can't be parsed as ISO 8601`);
      }
      /**
       * Check if an object is an Interval. Works across context boundaries
       * @param {object} o
       * @return {boolean}
       */
      static isInterval(o) {
        return o && o.isLuxonInterval || false;
      }
      /**
       * Returns the start of the Interval
       * @type {DateTime}
       */
      get start() {
        return this.isValid ? this.s : null;
      }
      /**
       * Returns the end of the Interval
       * @type {DateTime}
       */
      get end() {
        return this.isValid ? this.e : null;
      }
      /**
       * Returns the last DateTime included in the interval (since end is not part of the interval)
       * @type {DateTime}
       */
      get lastDateTime() {
        return this.isValid ? this.e ? this.e.minus(1) : null : null;
      }
      /**
       * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
       * @type {boolean}
       */
      get isValid() {
        return this.invalidReason === null;
      }
      /**
       * Returns an error code if this Interval is invalid, or null if the Interval is valid
       * @type {string}
       */
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      /**
       * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
       * @type {string}
       */
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      /**
       * Returns the length of the Interval in the specified unit.
       * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
       * @return {number}
       */
      length(unit = "milliseconds") {
        return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
      }
      /**
       * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
       * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
       * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
       * @param {string} [unit='milliseconds'] - the unit of time to count.
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
       * @return {number}
       */
      count(unit = "milliseconds", opts) {
        if (!this.isValid) return NaN;
        const start = this.start.startOf(unit, opts);
        let end;
        if (opts != null && opts.useLocaleWeeks) {
          end = this.end.reconfigure({
            locale: start.locale
          });
        } else {
          end = this.end;
        }
        end = end.startOf(unit, opts);
        return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
      }
      /**
       * Returns whether this Interval's start and end are both in the same unit of time
       * @param {string} unit - the unit of time to check sameness on
       * @return {boolean}
       */
      hasSame(unit) {
        return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
      }
      /**
       * Return whether this Interval has the same start and end DateTimes.
       * @return {boolean}
       */
      isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
      }
      /**
       * Return whether this Interval's start is after the specified DateTime.
       * @param {DateTime} dateTime
       * @return {boolean}
       */
      isAfter(dateTime) {
        if (!this.isValid) return false;
        return this.s > dateTime;
      }
      /**
       * Return whether this Interval's end is before the specified DateTime.
       * @param {DateTime} dateTime
       * @return {boolean}
       */
      isBefore(dateTime) {
        if (!this.isValid) return false;
        return this.e <= dateTime;
      }
      /**
       * Return whether this Interval contains the specified DateTime.
       * @param {DateTime} dateTime
       * @return {boolean}
       */
      contains(dateTime) {
        if (!this.isValid) return false;
        return this.s <= dateTime && this.e > dateTime;
      }
      /**
       * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
       * @param {Object} values - the values to set
       * @param {DateTime} values.start - the starting DateTime
       * @param {DateTime} values.end - the ending DateTime
       * @return {Interval}
       */
      set({
        start,
        end
      } = {}) {
        if (!this.isValid) return this;
        return _Interval.fromDateTimes(start || this.s, end || this.e);
      }
      /**
       * Split this Interval at each of the specified DateTimes
       * @param {...DateTime} dateTimes - the unit of time to count.
       * @return {Array}
       */
      splitAt(...dateTimes) {
        if (!this.isValid) return [];
        const sorted = dateTimes.map(friendlyDateTime).filter((d) => this.contains(d)).sort((a, b) => a.toMillis() - b.toMillis()), results = [];
        let {
          s: s2
        } = this, i = 0;
        while (s2 < this.e) {
          const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
          results.push(_Interval.fromDateTimes(s2, next));
          s2 = next;
          i += 1;
        }
        return results;
      }
      /**
       * Split this Interval into smaller Intervals, each of the specified length.
       * Left over time is grouped into a smaller interval
       * @param {Duration|Object|number} duration - The length of each resulting interval.
       * @return {Array}
       */
      splitBy(duration) {
        const dur = Duration.fromDurationLike(duration);
        if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
          return [];
        }
        let {
          s: s2
        } = this, idx = 1, next;
        const results = [];
        while (s2 < this.e) {
          const added = this.start.plus(dur.mapUnits((x) => x * idx));
          next = +added > +this.e ? this.e : added;
          results.push(_Interval.fromDateTimes(s2, next));
          s2 = next;
          idx += 1;
        }
        return results;
      }
      /**
       * Split this Interval into the specified number of smaller intervals.
       * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
       * @return {Array}
       */
      divideEqually(numberOfParts) {
        if (!this.isValid) return [];
        return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
      }
      /**
       * Return whether this Interval overlaps with the specified Interval
       * @param {Interval} other
       * @return {boolean}
       */
      overlaps(other) {
        return this.e > other.s && this.s < other.e;
      }
      /**
       * Return whether this Interval's end is adjacent to the specified Interval's start.
       * @param {Interval} other
       * @return {boolean}
       */
      abutsStart(other) {
        if (!this.isValid) return false;
        return +this.e === +other.s;
      }
      /**
       * Return whether this Interval's start is adjacent to the specified Interval's end.
       * @param {Interval} other
       * @return {boolean}
       */
      abutsEnd(other) {
        if (!this.isValid) return false;
        return +other.e === +this.s;
      }
      /**
       * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
       * @param {Interval} other
       * @return {boolean}
       */
      engulfs(other) {
        if (!this.isValid) return false;
        return this.s <= other.s && this.e >= other.e;
      }
      /**
       * Return whether this Interval has the same start and end as the specified Interval.
       * @param {Interval} other
       * @return {boolean}
       */
      equals(other) {
        if (!this.isValid || !other.isValid) {
          return false;
        }
        return this.s.equals(other.s) && this.e.equals(other.e);
      }
      /**
       * Return an Interval representing the intersection of this Interval and the specified Interval.
       * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
       * Returns null if the intersection is empty, meaning, the intervals don't intersect.
       * @param {Interval} other
       * @return {Interval}
       */
      intersection(other) {
        if (!this.isValid) return this;
        const s2 = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
        if (s2 >= e) {
          return null;
        } else {
          return _Interval.fromDateTimes(s2, e);
        }
      }
      /**
       * Return an Interval representing the union of this Interval and the specified Interval.
       * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
       * @param {Interval} other
       * @return {Interval}
       */
      union(other) {
        if (!this.isValid) return this;
        const s2 = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
        return _Interval.fromDateTimes(s2, e);
      }
      /**
       * Merge an array of Intervals into an equivalent minimal set of Intervals.
       * Combines overlapping and adjacent Intervals.
       * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
       * and ending with the latest.
       *
       * @param {Array} intervals
       * @return {Array}
       */
      static merge(intervals) {
        const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(([sofar, current], item) => {
          if (!current) {
            return [sofar, item];
          } else if (current.overlaps(item) || current.abutsStart(item)) {
            return [sofar, current.union(item)];
          } else {
            return [sofar.concat([current]), item];
          }
        }, [[], null]);
        if (final) {
          found.push(final);
        }
        return found;
      }
      /**
       * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
       * @param {Array} intervals
       * @return {Array}
       */
      static xor(intervals) {
        let start = null, currentCount = 0;
        const results = [], ends = intervals.map((i) => [{
          time: i.s,
          type: "s"
        }, {
          time: i.e,
          type: "e"
        }]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
        for (const i of arr) {
          currentCount += i.type === "s" ? 1 : -1;
          if (currentCount === 1) {
            start = i.time;
          } else {
            if (start && +start !== +i.time) {
              results.push(_Interval.fromDateTimes(start, i.time));
            }
            start = null;
          }
        }
        return _Interval.merge(results);
      }
      /**
       * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
       * @param {...Interval} intervals
       * @return {Array}
       */
      difference(...intervals) {
        return _Interval.xor([this].concat(intervals)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
      }
      /**
       * Returns a string representation of this Interval appropriate for debugging.
       * @return {string}
       */
      toString() {
        if (!this.isValid) return INVALID$1;
        return `[${this.s.toISO()} \u2013 ${this.e.toISO()})`;
      }
      /**
       * Returns a string representation of this Interval appropriate for the REPL.
       * @return {string}
       */
      [Symbol.for("nodejs.util.inspect.custom")]() {
        if (this.isValid) {
          return `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`;
        } else {
          return `Interval { Invalid, reason: ${this.invalidReason} }`;
        }
      }
      /**
       * Returns a localized string representing this Interval. Accepts the same options as the
       * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
       * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
       * is browser-specific, but in general it will return an appropriate representation of the
       * Interval in the assigned locale. Defaults to the system's locale if no locale has been
       * specified.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
       * Intl.DateTimeFormat constructor options.
       * @param {Object} opts - Options to override the configuration of the start DateTime.
       * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
       * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
       * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
       * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
       * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
       * @return {string}
       */
      toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
        return this.isValid ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID$1;
      }
      /**
       * Returns an ISO 8601-compliant string representation of this Interval.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @param {Object} opts - The same options as {@link DateTime#toISO}
       * @return {string}
       */
      toISO(opts) {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
      }
      /**
       * Returns an ISO 8601-compliant string representation of date of this Interval.
       * The time components are ignored.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @return {string}
       */
      toISODate() {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toISODate()}/${this.e.toISODate()}`;
      }
      /**
       * Returns an ISO 8601-compliant string representation of time of this Interval.
       * The date components are ignored.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @param {Object} opts - The same options as {@link DateTime#toISO}
       * @return {string}
       */
      toISOTime(opts) {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
      }
      /**
       * Returns a string representation of this Interval formatted according to the specified format
       * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
       * formatting tool.
       * @param {string} dateFormat - The format string. This string formats the start and end time.
       * See {@link DateTime#toFormat} for details.
       * @param {Object} opts - Options.
       * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
       * representations.
       * @return {string}
       */
      toFormat(dateFormat, {
        separator = " \u2013 "
      } = {}) {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
      }
      /**
       * Return a Duration representing the time spanned by this interval.
       * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
       * @param {Object} opts - options that affect the creation of the Duration
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
       * @return {Duration}
       */
      toDuration(unit, opts) {
        if (!this.isValid) {
          return Duration.invalid(this.invalidReason);
        }
        return this.e.diff(this.s, unit, opts);
      }
      /**
       * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
       * @param {function} mapFn
       * @return {Interval}
       * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
       * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
       */
      mapEndpoints(mapFn) {
        return _Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
      }
    };
    var Info = class {
      /**
       * Return whether the specified zone contains a DST.
       * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
       * @return {boolean}
       */
      static hasDST(zone = Settings.defaultZone) {
        const proto = DateTime.now().setZone(zone).set({
          month: 12
        });
        return !zone.isUniversal && proto.offset !== proto.set({
          month: 6
        }).offset;
      }
      /**
       * Return whether the specified zone is a valid IANA specifier.
       * @param {string} zone - Zone to check
       * @return {boolean}
       */
      static isValidIANAZone(zone) {
        return IANAZone.isValidZone(zone);
      }
      /**
       * Converts the input into a {@link Zone} instance.
       *
       * * If `input` is already a Zone instance, it is returned unchanged.
       * * If `input` is a string containing a valid time zone name, a Zone instance
       *   with that name is returned.
       * * If `input` is a string that doesn't refer to a known time zone, a Zone
       *   instance with {@link Zone#isValid} == false is returned.
       * * If `input is a number, a Zone instance with the specified fixed offset
       *   in minutes is returned.
       * * If `input` is `null` or `undefined`, the default zone is returned.
       * @param {string|Zone|number} [input] - the value to be converted
       * @return {Zone}
       */
      static normalizeZone(input) {
        return normalizeZone(input, Settings.defaultZone);
      }
      /**
       * Get the weekday on which the week starts according to the given locale.
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
       */
      static getStartOfWeek({
        locale = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale)).getStartOfWeek();
      }
      /**
       * Get the minimum number of days necessary in a week before it is considered part of the next year according
       * to the given locale.
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @returns {number}
       */
      static getMinimumDaysInFirstWeek({
        locale = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale)).getMinDaysInFirstWeek();
      }
      /**
       * Get the weekdays, which are considered the weekend according to the given locale
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
       */
      static getWeekendWeekdays({
        locale = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale)).getWeekendDays().slice();
      }
      /**
       * Return an array of standalone month names.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @param {string} [opts.outputCalendar='gregory'] - the calendar
       * @example Info.months()[0] //=> 'January'
       * @example Info.months('short')[0] //=> 'Jan'
       * @example Info.months('numeric')[0] //=> '1'
       * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
       * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
       * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
       * @return {Array}
       */
      static months(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null,
        outputCalendar = "gregory"
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
      }
      /**
       * Return an array of format month names.
       * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
       * changes the string.
       * See {@link Info#months}
       * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @param {string} [opts.outputCalendar='gregory'] - the calendar
       * @return {Array}
       */
      static monthsFormat(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null,
        outputCalendar = "gregory"
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
      }
      /**
       * Return an array of standalone week names.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @example Info.weekdays()[0] //=> 'Monday'
       * @example Info.weekdays('short')[0] //=> 'Mon'
       * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
       * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
       * @return {Array}
       */
      static weekdays(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
      }
      /**
       * Return an array of format week names.
       * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
       * changes the string.
       * See {@link Info#weekdays}
       * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
       * @param {Object} opts - options
       * @param {string} [opts.locale=null] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @return {Array}
       */
      static weekdaysFormat(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
      }
      /**
       * Return an array of meridiems.
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @example Info.meridiems() //=> [ 'AM', 'PM' ]
       * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
       * @return {Array}
       */
      static meridiems({
        locale = null
      } = {}) {
        return Locale.create(locale).meridiems();
      }
      /**
       * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
       * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @example Info.eras() //=> [ 'BC', 'AD' ]
       * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
       * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
       * @return {Array}
       */
      static eras(length = "short", {
        locale = null
      } = {}) {
        return Locale.create(locale, null, "gregory").eras(length);
      }
      /**
       * Return the set of available features in this environment.
       * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
       * Keys:
       * * `relative`: whether this environment supports relative time formatting
       * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
       * @example Info.features() //=> { relative: false, localeWeek: true }
       * @return {Object}
       */
      static features() {
        return {
          relative: hasRelative(),
          localeWeek: hasLocaleWeekInfo()
        };
      }
    };
    function dayDiff(earlier, later) {
      const utcDayStart = (dt) => dt.toUTC(0, {
        keepLocalTime: true
      }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
      return Math.floor(Duration.fromMillis(ms).as("days"));
    }
    function highOrderDiffs(cursor, later, units) {
      const differs = [["years", (a, b) => b.year - a.year], ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4], ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12], ["weeks", (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }], ["days", dayDiff]];
      const results = {};
      const earlier = cursor;
      let lowestOrder, highWater;
      for (const [unit, differ] of differs) {
        if (units.indexOf(unit) >= 0) {
          lowestOrder = unit;
          results[unit] = differ(cursor, later);
          highWater = earlier.plus(results);
          if (highWater > later) {
            results[unit]--;
            cursor = earlier.plus(results);
            if (cursor > later) {
              highWater = cursor;
              results[unit]--;
              cursor = earlier.plus(results);
            }
          } else {
            cursor = highWater;
          }
        }
      }
      return [cursor, results, highWater, lowestOrder];
    }
    function diff(earlier, later, units, opts) {
      let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
      const remainingMillis = later - cursor;
      const lowerOrderUnits = units.filter((u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
      if (lowerOrderUnits.length === 0) {
        if (highWater < later) {
          highWater = cursor.plus({
            [lowestOrder]: 1
          });
        }
        if (highWater !== cursor) {
          results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
        }
      }
      const duration = Duration.fromObject(results, opts);
      if (lowerOrderUnits.length > 0) {
        return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
      } else {
        return duration;
      }
    }
    var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
    function intUnit(regex, post = (i) => i) {
      return {
        regex,
        deser: ([s2]) => post(parseDigits(s2))
      };
    }
    var NBSP = String.fromCharCode(160);
    var spaceOrNBSP = `[ ${NBSP}]`;
    var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
    function fixListRegex(s2) {
      return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
    }
    function stripInsensitivities(s2) {
      return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
    }
    function oneOf(strings, startIndex) {
      if (strings === null) {
        return null;
      } else {
        return {
          regex: RegExp(strings.map(fixListRegex).join("|")),
          deser: ([s2]) => strings.findIndex((i) => stripInsensitivities(s2) === stripInsensitivities(i)) + startIndex
        };
      }
    }
    function offset(regex, groups) {
      return {
        regex,
        deser: ([, h, m]) => signedOffset(h, m),
        groups
      };
    }
    function simple(regex) {
      return {
        regex,
        deser: ([s2]) => s2
      };
    }
    function escapeToken(value) {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    function unitForToken(token, loc) {
      const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t) => ({
        regex: RegExp(escapeToken(t.val)),
        deser: ([s2]) => s2,
        literal: true
      }), unitate = (t) => {
        if (token.literal) {
          return literal(t);
        }
        switch (t.val) {
          // era
          case "G":
            return oneOf(loc.eras("short"), 0);
          case "GG":
            return oneOf(loc.eras("long"), 0);
          // years
          case "y":
            return intUnit(oneToSix);
          case "yy":
            return intUnit(twoToFour, untruncateYear);
          case "yyyy":
            return intUnit(four);
          case "yyyyy":
            return intUnit(fourToSix);
          case "yyyyyy":
            return intUnit(six);
          // months
          case "M":
            return intUnit(oneOrTwo);
          case "MM":
            return intUnit(two);
          case "MMM":
            return oneOf(loc.months("short", true), 1);
          case "MMMM":
            return oneOf(loc.months("long", true), 1);
          case "L":
            return intUnit(oneOrTwo);
          case "LL":
            return intUnit(two);
          case "LLL":
            return oneOf(loc.months("short", false), 1);
          case "LLLL":
            return oneOf(loc.months("long", false), 1);
          // dates
          case "d":
            return intUnit(oneOrTwo);
          case "dd":
            return intUnit(two);
          // ordinals
          case "o":
            return intUnit(oneToThree);
          case "ooo":
            return intUnit(three);
          // time
          case "HH":
            return intUnit(two);
          case "H":
            return intUnit(oneOrTwo);
          case "hh":
            return intUnit(two);
          case "h":
            return intUnit(oneOrTwo);
          case "mm":
            return intUnit(two);
          case "m":
            return intUnit(oneOrTwo);
          case "q":
            return intUnit(oneOrTwo);
          case "qq":
            return intUnit(two);
          case "s":
            return intUnit(oneOrTwo);
          case "ss":
            return intUnit(two);
          case "S":
            return intUnit(oneToThree);
          case "SSS":
            return intUnit(three);
          case "u":
            return simple(oneToNine);
          case "uu":
            return simple(oneOrTwo);
          case "uuu":
            return intUnit(one);
          // meridiem
          case "a":
            return oneOf(loc.meridiems(), 0);
          // weekYear (k)
          case "kkkk":
            return intUnit(four);
          case "kk":
            return intUnit(twoToFour, untruncateYear);
          // weekNumber (W)
          case "W":
            return intUnit(oneOrTwo);
          case "WW":
            return intUnit(two);
          // weekdays
          case "E":
          case "c":
            return intUnit(one);
          case "EEE":
            return oneOf(loc.weekdays("short", false), 1);
          case "EEEE":
            return oneOf(loc.weekdays("long", false), 1);
          case "ccc":
            return oneOf(loc.weekdays("short", true), 1);
          case "cccc":
            return oneOf(loc.weekdays("long", true), 1);
          // offset/zone
          case "Z":
          case "ZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
          case "ZZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
          // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
          // because we don't have any way to figure out what they are
          case "z":
            return simple(/[a-z_+-/]{1,256}?/i);
          // this special-case "token" represents a place where a macro-token expanded into a white-space literal
          // in this case we accept any non-newline white-space
          case " ":
            return simple(/[^\S\n\r]/);
          default:
            return literal(t);
        }
      };
      const unit = unitate(token) || {
        invalidReason: MISSING_FTP
      };
      unit.token = token;
      return unit;
    }
    var partTypeStyleToTokenVal = {
      year: {
        "2-digit": "yy",
        numeric: "yyyyy"
      },
      month: {
        numeric: "M",
        "2-digit": "MM",
        short: "MMM",
        long: "MMMM"
      },
      day: {
        numeric: "d",
        "2-digit": "dd"
      },
      weekday: {
        short: "EEE",
        long: "EEEE"
      },
      dayperiod: "a",
      dayPeriod: "a",
      hour12: {
        numeric: "h",
        "2-digit": "hh"
      },
      hour24: {
        numeric: "H",
        "2-digit": "HH"
      },
      minute: {
        numeric: "m",
        "2-digit": "mm"
      },
      second: {
        numeric: "s",
        "2-digit": "ss"
      },
      timeZoneName: {
        long: "ZZZZZ",
        short: "ZZZ"
      }
    };
    function tokenForPart(part, formatOpts, resolvedOpts) {
      const {
        type,
        value
      } = part;
      if (type === "literal") {
        const isSpace = /^\s+$/.test(value);
        return {
          literal: !isSpace,
          val: isSpace ? " " : value
        };
      }
      const style = formatOpts[type];
      let actualType = type;
      if (type === "hour") {
        if (formatOpts.hour12 != null) {
          actualType = formatOpts.hour12 ? "hour12" : "hour24";
        } else if (formatOpts.hourCycle != null) {
          if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
            actualType = "hour12";
          } else {
            actualType = "hour24";
          }
        } else {
          actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
        }
      }
      let val = partTypeStyleToTokenVal[actualType];
      if (typeof val === "object") {
        val = val[style];
      }
      if (val) {
        return {
          literal: false,
          val
        };
      }
      return void 0;
    }
    function buildRegex(units) {
      const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
      return [`^${re}$`, units];
    }
    function match(input, regex, handlers) {
      const matches = input.match(regex);
      if (matches) {
        const all = {};
        let matchIndex = 1;
        for (const i in handlers) {
          if (hasOwnProperty(handlers, i)) {
            const h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
            if (!h.literal && h.token) {
              all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
            }
            matchIndex += groups;
          }
        }
        return [matches, all];
      } else {
        return [matches, {}];
      }
    }
    function dateTimeFromMatches(matches) {
      const toField = (token) => {
        switch (token) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
          case "H":
            return "hour";
          case "d":
            return "day";
          case "o":
            return "ordinal";
          case "L":
          case "M":
            return "month";
          case "y":
            return "year";
          case "E":
          case "c":
            return "weekday";
          case "W":
            return "weekNumber";
          case "k":
            return "weekYear";
          case "q":
            return "quarter";
          default:
            return null;
        }
      };
      let zone = null;
      let specificOffset;
      if (!isUndefined(matches.z)) {
        zone = IANAZone.create(matches.z);
      }
      if (!isUndefined(matches.Z)) {
        if (!zone) {
          zone = new FixedOffsetZone(matches.Z);
        }
        specificOffset = matches.Z;
      }
      if (!isUndefined(matches.q)) {
        matches.M = (matches.q - 1) * 3 + 1;
      }
      if (!isUndefined(matches.h)) {
        if (matches.h < 12 && matches.a === 1) {
          matches.h += 12;
        } else if (matches.h === 12 && matches.a === 0) {
          matches.h = 0;
        }
      }
      if (matches.G === 0 && matches.y) {
        matches.y = -matches.y;
      }
      if (!isUndefined(matches.u)) {
        matches.S = parseMillis(matches.u);
      }
      const vals = Object.keys(matches).reduce((r, k) => {
        const f = toField(k);
        if (f) {
          r[f] = matches[k];
        }
        return r;
      }, {});
      return [vals, zone, specificOffset];
    }
    var dummyDateTimeCache = null;
    function getDummyDateTime() {
      if (!dummyDateTimeCache) {
        dummyDateTimeCache = DateTime.fromMillis(1555555555555);
      }
      return dummyDateTimeCache;
    }
    function maybeExpandMacroToken(token, locale) {
      if (token.literal) {
        return token;
      }
      const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
      const tokens = formatOptsToTokens(formatOpts, locale);
      if (tokens == null || tokens.includes(void 0)) {
        return token;
      }
      return tokens;
    }
    function expandMacroTokens(tokens, locale) {
      return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
    }
    var TokenParser = class {
      constructor(locale, format) {
        this.locale = locale;
        this.format = format;
        this.tokens = expandMacroTokens(Formatter.parseFormat(format), locale);
        this.units = this.tokens.map((t) => unitForToken(t, locale));
        this.disqualifyingUnit = this.units.find((t) => t.invalidReason);
        if (!this.disqualifyingUnit) {
          const [regexString, handlers] = buildRegex(this.units);
          this.regex = RegExp(regexString, "i");
          this.handlers = handlers;
        }
      }
      explainFromTokens(input) {
        if (!this.isValid) {
          return {
            input,
            tokens: this.tokens,
            invalidReason: this.invalidReason
          };
        } else {
          const [rawMatches, matches] = match(input, this.regex, this.handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
          if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
            throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
          }
          return {
            input,
            tokens: this.tokens,
            regex: this.regex,
            rawMatches,
            matches,
            result,
            zone,
            specificOffset
          };
        }
      }
      get isValid() {
        return !this.disqualifyingUnit;
      }
      get invalidReason() {
        return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
      }
    };
    function explainFromTokens(locale, input, format) {
      const parser = new TokenParser(locale, format);
      return parser.explainFromTokens(input);
    }
    function parseFromTokens(locale, input, format) {
      const {
        result,
        zone,
        specificOffset,
        invalidReason
      } = explainFromTokens(locale, input, format);
      return [result, zone, specificOffset, invalidReason];
    }
    function formatOptsToTokens(formatOpts, locale) {
      if (!formatOpts) {
        return null;
      }
      const formatter = Formatter.create(locale, formatOpts);
      const df = formatter.dtFormatter(getDummyDateTime());
      const parts = df.formatToParts();
      const resolvedOpts = df.resolvedOptions();
      return parts.map((p) => tokenForPart(p, formatOpts, resolvedOpts));
    }
    var INVALID = "Invalid DateTime";
    var MAX_DATE = 864e13;
    function unsupportedZone(zone) {
      return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
    }
    function possiblyCachedWeekData(dt) {
      if (dt.weekData === null) {
        dt.weekData = gregorianToWeek(dt.c);
      }
      return dt.weekData;
    }
    function possiblyCachedLocalWeekData(dt) {
      if (dt.localWeekData === null) {
        dt.localWeekData = gregorianToWeek(dt.c, dt.loc.getMinDaysInFirstWeek(), dt.loc.getStartOfWeek());
      }
      return dt.localWeekData;
    }
    function clone(inst, alts) {
      const current = {
        ts: inst.ts,
        zone: inst.zone,
        c: inst.c,
        o: inst.o,
        loc: inst.loc,
        invalid: inst.invalid
      };
      return new DateTime({
        ...current,
        ...alts,
        old: current
      });
    }
    function fixOffset(localTS, o, tz) {
      let utcGuess = localTS - o * 60 * 1e3;
      const o2 = tz.offset(utcGuess);
      if (o === o2) {
        return [utcGuess, o];
      }
      utcGuess -= (o2 - o) * 60 * 1e3;
      const o3 = tz.offset(utcGuess);
      if (o2 === o3) {
        return [utcGuess, o2];
      }
      return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
    }
    function tsToObj(ts, offset2) {
      ts += offset2 * 60 * 1e3;
      const d = new Date(ts);
      return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds()
      };
    }
    function objToTS(obj, offset2, zone) {
      return fixOffset(objToLocalTS(obj), offset2, zone);
    }
    function adjustTime(inst, dur) {
      const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = {
        ...inst.c,
        year,
        month,
        day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
      }, millisToAdd = Duration.fromObject({
        years: dur.years - Math.trunc(dur.years),
        quarters: dur.quarters - Math.trunc(dur.quarters),
        months: dur.months - Math.trunc(dur.months),
        weeks: dur.weeks - Math.trunc(dur.weeks),
        days: dur.days - Math.trunc(dur.days),
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds
      }).as("milliseconds"), localTS = objToLocalTS(c);
      let [ts, o] = fixOffset(localTS, oPre, inst.zone);
      if (millisToAdd !== 0) {
        ts += millisToAdd;
        o = inst.zone.offset(ts);
      }
      return {
        ts,
        o
      };
    }
    function parseDataToDateTime(parsed, parsedZone, opts, format, text2, specificOffset) {
      const {
        setZone,
        zone
      } = opts;
      if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
        const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, {
          ...opts,
          zone: interpretationZone,
          specificOffset
        });
        return setZone ? inst : inst.setZone(zone);
      } else {
        return DateTime.invalid(new Invalid("unparsable", `the input "${text2}" can't be parsed as ${format}`));
      }
    }
    function toTechFormat(dt, format, allowZ = true) {
      return dt.isValid ? Formatter.create(Locale.create("en-US"), {
        allowZ,
        forceSimple: true
      }).formatDateTimeFromString(dt, format) : null;
    }
    function toISODate(o, extended) {
      const longFormat = o.c.year > 9999 || o.c.year < 0;
      let c = "";
      if (longFormat && o.c.year >= 0) c += "+";
      c += padStart(o.c.year, longFormat ? 6 : 4);
      if (extended) {
        c += "-";
        c += padStart(o.c.month);
        c += "-";
        c += padStart(o.c.day);
      } else {
        c += padStart(o.c.month);
        c += padStart(o.c.day);
      }
      return c;
    }
    function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
      let c = padStart(o.c.hour);
      if (extended) {
        c += ":";
        c += padStart(o.c.minute);
        if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
          c += ":";
        }
      } else {
        c += padStart(o.c.minute);
      }
      if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
        c += padStart(o.c.second);
        if (o.c.millisecond !== 0 || !suppressMilliseconds) {
          c += ".";
          c += padStart(o.c.millisecond, 3);
        }
      }
      if (includeOffset) {
        if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
          c += "Z";
        } else if (o.o < 0) {
          c += "-";
          c += padStart(Math.trunc(-o.o / 60));
          c += ":";
          c += padStart(Math.trunc(-o.o % 60));
        } else {
          c += "+";
          c += padStart(Math.trunc(o.o / 60));
          c += ":";
          c += padStart(Math.trunc(o.o % 60));
        }
      }
      if (extendedZone) {
        c += "[" + o.zone.ianaName + "]";
      }
      return c;
    }
    var defaultUnitValues = {
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var defaultWeekUnitValues = {
      weekNumber: 1,
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var defaultOrdinalUnitValues = {
      ordinal: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"];
    var orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"];
    var orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
    function normalizeUnit(unit) {
      const normalized = {
        year: "year",
        years: "year",
        month: "month",
        months: "month",
        day: "day",
        days: "day",
        hour: "hour",
        hours: "hour",
        minute: "minute",
        minutes: "minute",
        quarter: "quarter",
        quarters: "quarter",
        second: "second",
        seconds: "second",
        millisecond: "millisecond",
        milliseconds: "millisecond",
        weekday: "weekday",
        weekdays: "weekday",
        weeknumber: "weekNumber",
        weeksnumber: "weekNumber",
        weeknumbers: "weekNumber",
        weekyear: "weekYear",
        weekyears: "weekYear",
        ordinal: "ordinal"
      }[unit.toLowerCase()];
      if (!normalized) throw new InvalidUnitError(unit);
      return normalized;
    }
    function normalizeUnitWithLocalWeeks(unit) {
      switch (unit.toLowerCase()) {
        case "localweekday":
        case "localweekdays":
          return "localWeekday";
        case "localweeknumber":
        case "localweeknumbers":
          return "localWeekNumber";
        case "localweekyear":
        case "localweekyears":
          return "localWeekYear";
        default:
          return normalizeUnit(unit);
      }
    }
    function guessOffsetForZone(zone) {
      if (zoneOffsetTs === void 0) {
        zoneOffsetTs = Settings.now();
      }
      if (zone.type !== "iana") {
        return zone.offset(zoneOffsetTs);
      }
      const zoneName = zone.name;
      let offsetGuess = zoneOffsetGuessCache.get(zoneName);
      if (offsetGuess === void 0) {
        offsetGuess = zone.offset(zoneOffsetTs);
        zoneOffsetGuessCache.set(zoneName, offsetGuess);
      }
      return offsetGuess;
    }
    function quickDT(obj, opts) {
      const zone = normalizeZone(opts.zone, Settings.defaultZone);
      if (!zone.isValid) {
        return DateTime.invalid(unsupportedZone(zone));
      }
      const loc = Locale.fromObject(opts);
      let ts, o;
      if (!isUndefined(obj.year)) {
        for (const u of orderedUnits) {
          if (isUndefined(obj[u])) {
            obj[u] = defaultUnitValues[u];
          }
        }
        const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
        if (invalid) {
          return DateTime.invalid(invalid);
        }
        const offsetProvis = guessOffsetForZone(zone);
        [ts, o] = objToTS(obj, offsetProvis, zone);
      } else {
        ts = Settings.now();
      }
      return new DateTime({
        ts,
        zone,
        loc,
        o
      });
    }
    function diffRelative(start, end, opts) {
      const round = isUndefined(opts.round) ? true : opts.round, format = (c, unit) => {
        c = roundTo(c, round || opts.calendary ? 0 : 2, true);
        const formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c, unit);
      }, differ = (unit) => {
        if (opts.calendary) {
          if (!end.hasSame(start, unit)) {
            return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
          } else return 0;
        } else {
          return end.diff(start, unit).get(unit);
        }
      };
      if (opts.unit) {
        return format(differ(opts.unit), opts.unit);
      }
      for (const unit of opts.units) {
        const count = differ(unit);
        if (Math.abs(count) >= 1) {
          return format(count, unit);
        }
      }
      return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
    }
    function lastOpts(argList) {
      let opts = {}, args;
      if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
        opts = argList[argList.length - 1];
        args = Array.from(argList).slice(0, argList.length - 1);
      } else {
        args = Array.from(argList);
      }
      return [opts, args];
    }
    var zoneOffsetTs;
    var zoneOffsetGuessCache = /* @__PURE__ */ new Map();
    var DateTime = class _DateTime {
      /**
       * @access private
       */
      constructor(config) {
        const zone = config.zone || Settings.defaultZone;
        let invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
        this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
        let c = null, o = null;
        if (!invalid) {
          const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
          if (unchanged) {
            [c, o] = [config.old.c, config.old.o];
          } else {
            const ot = isNumber(config.o) && !config.old ? config.o : zone.offset(this.ts);
            c = tsToObj(this.ts, ot);
            invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
            c = invalid ? null : c;
            o = invalid ? null : ot;
          }
        }
        this._zone = zone;
        this.loc = config.loc || Locale.create();
        this.invalid = invalid;
        this.weekData = null;
        this.localWeekData = null;
        this.c = c;
        this.o = o;
        this.isLuxonDateTime = true;
      }
      // CONSTRUCT
      /**
       * Create a DateTime for the current instant, in the system's time zone.
       *
       * Use Settings to override these default values if needed.
       * @example DateTime.now().toISO() //~> now in the ISO format
       * @return {DateTime}
       */
      static now() {
        return new _DateTime({});
      }
      /**
       * Create a local DateTime
       * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
       * @param {number} [month=1] - The month, 1-indexed
       * @param {number} [day=1] - The day of the month, 1-indexed
       * @param {number} [hour=0] - The hour of the day, in 24-hour time
       * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
       * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
       * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
       * @example DateTime.local()                                  //~> now
       * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
       * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
       * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
       * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
       * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
       * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
       * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
       * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
       * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
       * @return {DateTime}
       */
      static local() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        return quickDT({
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        }, opts);
      }
      /**
       * Create a DateTime in UTC
       * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
       * @param {number} [month=1] - The month, 1-indexed
       * @param {number} [day=1] - The day of the month
       * @param {number} [hour=0] - The hour of the day, in 24-hour time
       * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
       * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
       * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
       * @param {Object} options - configuration options for the DateTime
       * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
       * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
       * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
       * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
       * @example DateTime.utc()                                              //~> now
       * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
       * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
       * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
       * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
       * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
       * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
       * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
       * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
       * @return {DateTime}
       */
      static utc() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        opts.zone = FixedOffsetZone.utcInstance;
        return quickDT({
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        }, opts);
      }
      /**
       * Create a DateTime from a JavaScript Date object. Uses the default zone.
       * @param {Date} date - a JavaScript Date object
       * @param {Object} options - configuration options for the DateTime
       * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
       * @return {DateTime}
       */
      static fromJSDate(date, options = {}) {
        const ts = isDate(date) ? date.valueOf() : NaN;
        if (Number.isNaN(ts)) {
          return _DateTime.invalid("invalid input");
        }
        const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
          return _DateTime.invalid(unsupportedZone(zoneToUse));
        }
        return new _DateTime({
          ts,
          zone: zoneToUse,
          loc: Locale.fromObject(options)
        });
      }
      /**
       * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
       * @param {number} milliseconds - a number of milliseconds since 1970 UTC
       * @param {Object} options - configuration options for the DateTime
       * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
       * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
       * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
       * @return {DateTime}
       */
      static fromMillis(milliseconds, options = {}) {
        if (!isNumber(milliseconds)) {
          throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
        } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
          return _DateTime.invalid("Timestamp out of range");
        } else {
          return new _DateTime({
            ts: milliseconds,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
          });
        }
      }
      /**
       * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
       * @param {number} seconds - a number of seconds since 1970 UTC
       * @param {Object} options - configuration options for the DateTime
       * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
       * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
       * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
       * @return {DateTime}
       */
      static fromSeconds(seconds, options = {}) {
        if (!isNumber(seconds)) {
          throw new InvalidArgumentError("fromSeconds requires a numerical input");
        } else {
          return new _DateTime({
            ts: seconds * 1e3,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
          });
        }
      }
      /**
       * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
       * @param {Object} obj - the object to create the DateTime from
       * @param {number} obj.year - a year, such as 1987
       * @param {number} obj.month - a month, 1-12
       * @param {number} obj.day - a day of the month, 1-31, depending on the month
       * @param {number} obj.ordinal - day of the year, 1-365 or 366
       * @param {number} obj.weekYear - an ISO week year
       * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
       * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
       * @param {number} obj.localWeekYear - a week year, according to the locale
       * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
       * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
       * @param {number} obj.hour - hour of the day, 0-23
       * @param {number} obj.minute - minute of the hour, 0-59
       * @param {number} obj.second - second of the minute, 0-59
       * @param {number} obj.millisecond - millisecond of the second, 0-999
       * @param {Object} opts - options for creating this DateTime
       * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
       * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
       * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
       * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
       * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
       * @return {DateTime}
       */
      static fromObject(obj, opts = {}) {
        obj = obj || {};
        const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
          return _DateTime.invalid(unsupportedZone(zoneToUse));
        }
        const loc = Locale.fromObject(opts);
        const normalized = normalizeObject(obj, normalizeUnitWithLocalWeeks);
        const {
          minDaysInFirstWeek,
          startOfWeek
        } = usesLocalWeekValues(normalized, loc);
        const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
          throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
          throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
        let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
        if (useWeekData) {
          units = orderedWeekUnits;
          defaultValues = defaultWeekUnitValues;
          objNow = gregorianToWeek(objNow, minDaysInFirstWeek, startOfWeek);
        } else if (containsOrdinal) {
          units = orderedOrdinalUnits;
          defaultValues = defaultOrdinalUnitValues;
          objNow = gregorianToOrdinal(objNow);
        } else {
          units = orderedUnits;
          defaultValues = defaultUnitValues;
        }
        let foundFirst = false;
        for (const u of units) {
          const v = normalized[u];
          if (!isUndefined(v)) {
            foundFirst = true;
          } else if (foundFirst) {
            normalized[u] = defaultValues[u];
          } else {
            normalized[u] = objNow[u];
          }
        }
        const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
        if (invalid) {
          return _DateTime.invalid(invalid);
        }
        const gregorian = useWeekData ? weekToGregorian(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new _DateTime({
          ts: tsFinal,
          zone: zoneToUse,
          o: offsetFinal,
          loc
        });
        if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
          return _DateTime.invalid("mismatched weekday", `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
        }
        if (!inst.isValid) {
          return _DateTime.invalid(inst.invalid);
        }
        return inst;
      }
      /**
       * Create a DateTime from an ISO 8601 string
       * @param {string} text - the ISO string
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
       * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
       * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
       * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
       * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromISO('2016-05-25T09:08:34.123')
       * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
       * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
       * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
       * @example DateTime.fromISO('2016-W05-4')
       * @return {DateTime}
       */
      static fromISO(text2, opts = {}) {
        const [vals, parsedZone] = parseISODate(text2);
        return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text2);
      }
      /**
       * Create a DateTime from an RFC 2822 string
       * @param {string} text - the RFC 2822 string
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
       * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
       * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
       * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
       * @return {DateTime}
       */
      static fromRFC2822(text2, opts = {}) {
        const [vals, parsedZone] = parseRFC2822Date(text2);
        return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text2);
      }
      /**
       * Create a DateTime from an HTTP header date
       * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
       * @param {string} text - the HTTP header date
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
       * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
       * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
       * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
       * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
       * @return {DateTime}
       */
      static fromHTTP(text2, opts = {}) {
        const [vals, parsedZone] = parseHTTPDate(text2);
        return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
      }
      /**
       * Create a DateTime from an input string and format string.
       * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
       * @param {string} text - the string to parse
       * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
       * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
       * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @return {DateTime}
       */
      static fromFormat(text2, fmt, opts = {}) {
        if (isUndefined(text2) || isUndefined(fmt)) {
          throw new InvalidArgumentError("fromFormat requires an input string and a format");
        }
        const {
          locale = null,
          numberingSystem = null
        } = opts, localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true
        }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text2, fmt);
        if (invalid) {
          return _DateTime.invalid(invalid);
        } else {
          return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text2, specificOffset);
        }
      }
      /**
       * @deprecated use fromFormat instead
       */
      static fromString(text2, fmt, opts = {}) {
        return _DateTime.fromFormat(text2, fmt, opts);
      }
      /**
       * Create a DateTime from a SQL date, time, or datetime
       * Defaults to en-US if no locale has been specified, regardless of the system's locale
       * @param {string} text - the string to parse
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
       * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
       * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @example DateTime.fromSQL('2017-05-15')
       * @example DateTime.fromSQL('2017-05-15 09:12:34')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
       * @example DateTime.fromSQL('09:12:34.342')
       * @return {DateTime}
       */
      static fromSQL(text2, opts = {}) {
        const [vals, parsedZone] = parseSQL(text2);
        return parseDataToDateTime(vals, parsedZone, opts, "SQL", text2);
      }
      /**
       * Create an invalid DateTime.
       * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
       * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
       * @return {DateTime}
       */
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidDateTimeError(invalid);
        } else {
          return new _DateTime({
            invalid
          });
        }
      }
      /**
       * Check if an object is an instance of DateTime. Works across context boundaries
       * @param {object} o
       * @return {boolean}
       */
      static isDateTime(o) {
        return o && o.isLuxonDateTime || false;
      }
      /**
       * Produce the format string for a set of options
       * @param formatOpts
       * @param localeOpts
       * @returns {string}
       */
      static parseFormatForOpts(formatOpts, localeOpts = {}) {
        const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
        return !tokenList ? null : tokenList.map((t) => t ? t.val : null).join("");
      }
      /**
       * Produce the the fully expanded format token for the locale
       * Does NOT quote characters, so quoted tokens will not round trip correctly
       * @param fmt
       * @param localeOpts
       * @returns {string}
       */
      static expandFormat(fmt, localeOpts = {}) {
        const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
        return expanded.map((t) => t.val).join("");
      }
      static resetCache() {
        zoneOffsetTs = void 0;
        zoneOffsetGuessCache.clear();
      }
      // INFO
      /**
       * Get the value of unit.
       * @param {string} unit - a unit such as 'minute' or 'day'
       * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
       * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
       * @return {number}
       */
      get(unit) {
        return this[unit];
      }
      /**
       * Returns whether the DateTime is valid. Invalid DateTimes occur when:
       * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
       * * The DateTime was created by an operation on another invalid date
       * @type {boolean}
       */
      get isValid() {
        return this.invalid === null;
      }
      /**
       * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
       * @type {string}
       */
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      /**
       * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
       * @type {string}
       */
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      /**
       * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
       *
       * @type {string}
       */
      get locale() {
        return this.isValid ? this.loc.locale : null;
      }
      /**
       * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
       *
       * @type {string}
       */
      get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
      }
      /**
       * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
       *
       * @type {string}
       */
      get outputCalendar() {
        return this.isValid ? this.loc.outputCalendar : null;
      }
      /**
       * Get the time zone associated with this DateTime.
       * @type {Zone}
       */
      get zone() {
        return this._zone;
      }
      /**
       * Get the name of the time zone.
       * @type {string}
       */
      get zoneName() {
        return this.isValid ? this.zone.name : null;
      }
      /**
       * Get the year
       * @example DateTime.local(2017, 5, 25).year //=> 2017
       * @type {number}
       */
      get year() {
        return this.isValid ? this.c.year : NaN;
      }
      /**
       * Get the quarter
       * @example DateTime.local(2017, 5, 25).quarter //=> 2
       * @type {number}
       */
      get quarter() {
        return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
      }
      /**
       * Get the month (1-12).
       * @example DateTime.local(2017, 5, 25).month //=> 5
       * @type {number}
       */
      get month() {
        return this.isValid ? this.c.month : NaN;
      }
      /**
       * Get the day of the month (1-30ish).
       * @example DateTime.local(2017, 5, 25).day //=> 25
       * @type {number}
       */
      get day() {
        return this.isValid ? this.c.day : NaN;
      }
      /**
       * Get the hour of the day (0-23).
       * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
       * @type {number}
       */
      get hour() {
        return this.isValid ? this.c.hour : NaN;
      }
      /**
       * Get the minute of the hour (0-59).
       * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
       * @type {number}
       */
      get minute() {
        return this.isValid ? this.c.minute : NaN;
      }
      /**
       * Get the second of the minute (0-59).
       * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
       * @type {number}
       */
      get second() {
        return this.isValid ? this.c.second : NaN;
      }
      /**
       * Get the millisecond of the second (0-999).
       * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
       * @type {number}
       */
      get millisecond() {
        return this.isValid ? this.c.millisecond : NaN;
      }
      /**
       * Get the week year
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
       * @type {number}
       */
      get weekYear() {
        return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
      }
      /**
       * Get the week number of the week year (1-52ish).
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
       * @type {number}
       */
      get weekNumber() {
        return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
      }
      /**
       * Get the day of the week.
       * 1 is Monday and 7 is Sunday
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2014, 11, 31).weekday //=> 4
       * @type {number}
       */
      get weekday() {
        return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
      }
      /**
       * Returns true if this date is on a weekend according to the locale, false otherwise
       * @returns {boolean}
       */
      get isWeekend() {
        return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
      }
      /**
       * Get the day of the week according to the locale.
       * 1 is the first day of the week and 7 is the last day of the week.
       * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
       * @returns {number}
       */
      get localWeekday() {
        return this.isValid ? possiblyCachedLocalWeekData(this).weekday : NaN;
      }
      /**
       * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
       * because the week can start on different days of the week (see localWeekday) and because a different number of days
       * is required for a week to count as the first week of a year.
       * @returns {number}
       */
      get localWeekNumber() {
        return this.isValid ? possiblyCachedLocalWeekData(this).weekNumber : NaN;
      }
      /**
       * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
       * differently, see localWeekNumber.
       * @returns {number}
       */
      get localWeekYear() {
        return this.isValid ? possiblyCachedLocalWeekData(this).weekYear : NaN;
      }
      /**
       * Get the ordinal (meaning the day of the year)
       * @example DateTime.local(2017, 5, 25).ordinal //=> 145
       * @type {number|DateTime}
       */
      get ordinal() {
        return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
      }
      /**
       * Get the human readable short month name, such as 'Oct'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
       * @type {string}
       */
      get monthShort() {
        return this.isValid ? Info.months("short", {
          locObj: this.loc
        })[this.month - 1] : null;
      }
      /**
       * Get the human readable long month name, such as 'October'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).monthLong //=> October
       * @type {string}
       */
      get monthLong() {
        return this.isValid ? Info.months("long", {
          locObj: this.loc
        })[this.month - 1] : null;
      }
      /**
       * Get the human readable short weekday, such as 'Mon'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
       * @type {string}
       */
      get weekdayShort() {
        return this.isValid ? Info.weekdays("short", {
          locObj: this.loc
        })[this.weekday - 1] : null;
      }
      /**
       * Get the human readable long weekday, such as 'Monday'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
       * @type {string}
       */
      get weekdayLong() {
        return this.isValid ? Info.weekdays("long", {
          locObj: this.loc
        })[this.weekday - 1] : null;
      }
      /**
       * Get the UTC offset of this DateTime in minutes
       * @example DateTime.now().offset //=> -240
       * @example DateTime.utc().offset //=> 0
       * @type {number}
       */
      get offset() {
        return this.isValid ? +this.o : NaN;
      }
      /**
       * Get the short human name for the zone's current offset, for example "EST" or "EDT".
       * Defaults to the system's locale if no locale has been specified
       * @type {string}
       */
      get offsetNameShort() {
        if (this.isValid) {
          return this.zone.offsetName(this.ts, {
            format: "short",
            locale: this.locale
          });
        } else {
          return null;
        }
      }
      /**
       * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
       * Defaults to the system's locale if no locale has been specified
       * @type {string}
       */
      get offsetNameLong() {
        if (this.isValid) {
          return this.zone.offsetName(this.ts, {
            format: "long",
            locale: this.locale
          });
        } else {
          return null;
        }
      }
      /**
       * Get whether this zone's offset ever changes, as in a DST.
       * @type {boolean}
       */
      get isOffsetFixed() {
        return this.isValid ? this.zone.isUniversal : null;
      }
      /**
       * Get whether the DateTime is in a DST.
       * @type {boolean}
       */
      get isInDST() {
        if (this.isOffsetFixed) {
          return false;
        } else {
          return this.offset > this.set({
            month: 1,
            day: 1
          }).offset || this.offset > this.set({
            month: 5
          }).offset;
        }
      }
      /**
       * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
       * in this DateTime's zone. During DST changes local time can be ambiguous, for example
       * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
       * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
       * @returns {DateTime[]}
       */
      getPossibleOffsets() {
        if (!this.isValid || this.isOffsetFixed) {
          return [this];
        }
        const dayMs = 864e5;
        const minuteMs = 6e4;
        const localTS = objToLocalTS(this.c);
        const oEarlier = this.zone.offset(localTS - dayMs);
        const oLater = this.zone.offset(localTS + dayMs);
        const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
        const o2 = this.zone.offset(localTS - oLater * minuteMs);
        if (o1 === o2) {
          return [this];
        }
        const ts1 = localTS - o1 * minuteMs;
        const ts2 = localTS - o2 * minuteMs;
        const c1 = tsToObj(ts1, o1);
        const c2 = tsToObj(ts2, o2);
        if (c1.hour === c2.hour && c1.minute === c2.minute && c1.second === c2.second && c1.millisecond === c2.millisecond) {
          return [clone(this, {
            ts: ts1
          }), clone(this, {
            ts: ts2
          })];
        }
        return [this];
      }
      /**
       * Returns true if this DateTime is in a leap year, false otherwise
       * @example DateTime.local(2016).isInLeapYear //=> true
       * @example DateTime.local(2013).isInLeapYear //=> false
       * @type {boolean}
       */
      get isInLeapYear() {
        return isLeapYear(this.year);
      }
      /**
       * Returns the number of days in this DateTime's month
       * @example DateTime.local(2016, 2).daysInMonth //=> 29
       * @example DateTime.local(2016, 3).daysInMonth //=> 31
       * @type {number}
       */
      get daysInMonth() {
        return daysInMonth(this.year, this.month);
      }
      /**
       * Returns the number of days in this DateTime's year
       * @example DateTime.local(2016).daysInYear //=> 366
       * @example DateTime.local(2013).daysInYear //=> 365
       * @type {number}
       */
      get daysInYear() {
        return this.isValid ? daysInYear(this.year) : NaN;
      }
      /**
       * Returns the number of weeks in this DateTime's year
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2004).weeksInWeekYear //=> 53
       * @example DateTime.local(2013).weeksInWeekYear //=> 52
       * @type {number}
       */
      get weeksInWeekYear() {
        return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
      }
      /**
       * Returns the number of weeks in this DateTime's local week year
       * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
       * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
       * @type {number}
       */
      get weeksInLocalWeekYear() {
        return this.isValid ? weeksInWeekYear(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
      }
      /**
       * Returns the resolved Intl options for this DateTime.
       * This is useful in understanding the behavior of formatting methods
       * @param {Object} opts - the same options as toLocaleString
       * @return {Object}
       */
      resolvedLocaleOptions(opts = {}) {
        const {
          locale,
          numberingSystem,
          calendar
        } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
        return {
          locale,
          numberingSystem,
          outputCalendar: calendar
        };
      }
      // TRANSFORM
      /**
       * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
       *
       * Equivalent to {@link DateTime#setZone}('utc')
       * @param {number} [offset=0] - optionally, an offset from UTC in minutes
       * @param {Object} [opts={}] - options to pass to `setZone()`
       * @return {DateTime}
       */
      toUTC(offset2 = 0, opts = {}) {
        return this.setZone(FixedOffsetZone.instance(offset2), opts);
      }
      /**
       * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
       *
       * Equivalent to `setZone('local')`
       * @return {DateTime}
       */
      toLocal() {
        return this.setZone(Settings.defaultZone);
      }
      /**
       * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
       *
       * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
       * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
       * @param {Object} opts - options
       * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
       * @return {DateTime}
       */
      setZone(zone, {
        keepLocalTime = false,
        keepCalendarTime = false
      } = {}) {
        zone = normalizeZone(zone, Settings.defaultZone);
        if (zone.equals(this.zone)) {
          return this;
        } else if (!zone.isValid) {
          return _DateTime.invalid(unsupportedZone(zone));
        } else {
          let newTS = this.ts;
          if (keepLocalTime || keepCalendarTime) {
            const offsetGuess = zone.offset(this.ts);
            const asObj = this.toObject();
            [newTS] = objToTS(asObj, offsetGuess, zone);
          }
          return clone(this, {
            ts: newTS,
            zone
          });
        }
      }
      /**
       * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
       * @param {Object} properties - the properties to set
       * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
       * @return {DateTime}
       */
      reconfigure({
        locale,
        numberingSystem,
        outputCalendar
      } = {}) {
        const loc = this.loc.clone({
          locale,
          numberingSystem,
          outputCalendar
        });
        return clone(this, {
          loc
        });
      }
      /**
       * "Set" the locale. Returns a newly-constructed DateTime.
       * Just a convenient alias for reconfigure({ locale })
       * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
       * @return {DateTime}
       */
      setLocale(locale) {
        return this.reconfigure({
          locale
        });
      }
      /**
       * "Set" the values of specified units. Returns a newly-constructed DateTime.
       * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
       *
       * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
       * They cannot be mixed with ISO-week units like `weekday`.
       * @param {Object} values - a mapping of units to numbers
       * @example dt.set({ year: 2017 })
       * @example dt.set({ hour: 8, minute: 30 })
       * @example dt.set({ weekday: 5 })
       * @example dt.set({ year: 2005, ordinal: 234 })
       * @return {DateTime}
       */
      set(values) {
        if (!this.isValid) return this;
        const normalized = normalizeObject(values, normalizeUnitWithLocalWeeks);
        const {
          minDaysInFirstWeek,
          startOfWeek
        } = usesLocalWeekValues(normalized, this.loc);
        const settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
          throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
          throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        let mixed;
        if (settingWeekStuff) {
          mixed = weekToGregorian({
            ...gregorianToWeek(this.c, minDaysInFirstWeek, startOfWeek),
            ...normalized
          }, minDaysInFirstWeek, startOfWeek);
        } else if (!isUndefined(normalized.ordinal)) {
          mixed = ordinalToGregorian({
            ...gregorianToOrdinal(this.c),
            ...normalized
          });
        } else {
          mixed = {
            ...this.toObject(),
            ...normalized
          };
          if (isUndefined(normalized.day)) {
            mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
          }
        }
        const [ts, o] = objToTS(mixed, this.o, this.zone);
        return clone(this, {
          ts,
          o
        });
      }
      /**
       * Add a period of time to this DateTime and return the resulting DateTime
       *
       * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
       * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       * @example DateTime.now().plus(123) //~> in 123 milliseconds
       * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
       * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
       * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
       * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
       * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
       * @return {DateTime}
       */
      plus(duration) {
        if (!this.isValid) return this;
        const dur = Duration.fromDurationLike(duration);
        return clone(this, adjustTime(this, dur));
      }
      /**
       * Subtract a period of time to this DateTime and return the resulting DateTime
       * See {@link DateTime#plus}
       * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       @return {DateTime}
       */
      minus(duration) {
        if (!this.isValid) return this;
        const dur = Duration.fromDurationLike(duration).negate();
        return clone(this, adjustTime(this, dur));
      }
      /**
       * "Set" this DateTime to the beginning of a unit of time.
       * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
       * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
       * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
       * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
       * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
       * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
       * @return {DateTime}
       */
      startOf(unit, {
        useLocaleWeeks = false
      } = {}) {
        if (!this.isValid) return this;
        const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
        switch (normalizedUnit) {
          case "years":
            o.month = 1;
          // falls through
          case "quarters":
          case "months":
            o.day = 1;
          // falls through
          case "weeks":
          case "days":
            o.hour = 0;
          // falls through
          case "hours":
            o.minute = 0;
          // falls through
          case "minutes":
            o.second = 0;
          // falls through
          case "seconds":
            o.millisecond = 0;
            break;
        }
        if (normalizedUnit === "weeks") {
          if (useLocaleWeeks) {
            const startOfWeek = this.loc.getStartOfWeek();
            const {
              weekday
            } = this;
            if (weekday < startOfWeek) {
              o.weekNumber = this.weekNumber - 1;
            }
            o.weekday = startOfWeek;
          } else {
            o.weekday = 1;
          }
        }
        if (normalizedUnit === "quarters") {
          const q = Math.ceil(this.month / 3);
          o.month = (q - 1) * 3 + 1;
        }
        return this.set(o);
      }
      /**
       * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
       * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
       * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
       * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
       * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
       * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
       * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
       * @return {DateTime}
       */
      endOf(unit, opts) {
        return this.isValid ? this.plus({
          [unit]: 1
        }).startOf(unit, opts).minus(1) : this;
      }
      // OUTPUT
      /**
       * Returns a string representation of this DateTime formatted according to the specified format string.
       * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
       * Defaults to en-US if no locale has been specified, regardless of the system's locale.
       * @param {string} fmt - the format string
       * @param {Object} opts - opts to override the configuration options on this DateTime
       * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
       * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
       * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
       * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
       * @return {string}
       */
      toFormat(fmt, opts = {}) {
        return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
      }
      /**
       * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
       * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
       * of the DateTime in the assigned locale.
       * Defaults to the system's locale if no locale has been specified
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
       * @param {Object} opts - opts to override the configuration options on this DateTime
       * @example DateTime.now().toLocaleString(); //=> 4/20/2017
       * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
       * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
       * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
       * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
       * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
       * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
       * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
       * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
       * @return {string}
       */
      toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
        return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
      }
      /**
       * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
       * Defaults to the system's locale if no locale has been specified
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
       * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
       * @example DateTime.now().toLocaleParts(); //=> [
       *                                   //=>   { type: 'day', value: '25' },
       *                                   //=>   { type: 'literal', value: '/' },
       *                                   //=>   { type: 'month', value: '05' },
       *                                   //=>   { type: 'literal', value: '/' },
       *                                   //=>   { type: 'year', value: '1982' }
       *                                   //=> ]
       */
      toLocaleParts(opts = {}) {
        return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime
       * @param {Object} opts - options
       * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
       * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
       * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
       * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
       * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
       * @return {string|null}
       */
      toISO({
        format = "extended",
        suppressSeconds = false,
        suppressMilliseconds = false,
        includeOffset = true,
        extendedZone = false
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        const ext = format === "extended";
        let c = toISODate(this, ext);
        c += "T";
        c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
        return c;
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime's date component
       * @param {Object} opts - options
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
       * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
       * @return {string|null}
       */
      toISODate({
        format = "extended"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        return toISODate(this, format === "extended");
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime's week date
       * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
       * @return {string}
       */
      toISOWeekDate() {
        return toTechFormat(this, "kkkk-'W'WW-c");
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime's time component
       * @param {Object} opts - options
       * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
       * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
       * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
       * @return {string}
       */
      toISOTime({
        suppressMilliseconds = false,
        suppressSeconds = false,
        includeOffset = true,
        includePrefix = false,
        extendedZone = false,
        format = "extended"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        let c = includePrefix ? "T" : "";
        return c + toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
      }
      /**
       * Returns an RFC 2822-compatible string representation of this DateTime
       * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
       * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
       * @return {string}
       */
      toRFC2822() {
        return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
       * Specifically, the string conforms to RFC 1123.
       * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
       * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
       * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
       * @return {string}
       */
      toHTTP() {
        return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in SQL Date
       * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
       * @return {string|null}
       */
      toSQLDate() {
        if (!this.isValid) {
          return null;
        }
        return toISODate(this, true);
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in SQL Time
       * @param {Object} opts - options
       * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
       * @example DateTime.utc().toSQL() //=> '05:15:16.345'
       * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
       * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
       * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
       * @return {string}
       */
      toSQLTime({
        includeOffset = true,
        includeZone = false,
        includeOffsetSpace = true
      } = {}) {
        let fmt = "HH:mm:ss.SSS";
        if (includeZone || includeOffset) {
          if (includeOffsetSpace) {
            fmt += " ";
          }
          if (includeZone) {
            fmt += "z";
          } else if (includeOffset) {
            fmt += "ZZ";
          }
        }
        return toTechFormat(this, fmt, true);
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in SQL DateTime
       * @param {Object} opts - options
       * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
       * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
       * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
       * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
       * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
       * @return {string}
       */
      toSQL(opts = {}) {
        if (!this.isValid) {
          return null;
        }
        return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
      }
      /**
       * Returns a string representation of this DateTime appropriate for debugging
       * @return {string}
       */
      toString() {
        return this.isValid ? this.toISO() : INVALID;
      }
      /**
       * Returns a string representation of this DateTime appropriate for the REPL.
       * @return {string}
       */
      [Symbol.for("nodejs.util.inspect.custom")]() {
        if (this.isValid) {
          return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
        } else {
          return `DateTime { Invalid, reason: ${this.invalidReason} }`;
        }
      }
      /**
       * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
       * @return {number}
       */
      valueOf() {
        return this.toMillis();
      }
      /**
       * Returns the epoch milliseconds of this DateTime.
       * @return {number}
       */
      toMillis() {
        return this.isValid ? this.ts : NaN;
      }
      /**
       * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
       * @return {number}
       */
      toSeconds() {
        return this.isValid ? this.ts / 1e3 : NaN;
      }
      /**
       * Returns the epoch seconds (as a whole number) of this DateTime.
       * @return {number}
       */
      toUnixInteger() {
        return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
      }
      /**
       * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
       * @return {string}
       */
      toJSON() {
        return this.toISO();
      }
      /**
       * Returns a BSON serializable equivalent to this DateTime.
       * @return {Date}
       */
      toBSON() {
        return this.toJSDate();
      }
      /**
       * Returns a JavaScript object with this DateTime's year, month, day, and so on.
       * @param opts - options for generating the object
       * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
       * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
       * @return {Object}
       */
      toObject(opts = {}) {
        if (!this.isValid) return {};
        const base = {
          ...this.c
        };
        if (opts.includeConfig) {
          base.outputCalendar = this.outputCalendar;
          base.numberingSystem = this.loc.numberingSystem;
          base.locale = this.loc.locale;
        }
        return base;
      }
      /**
       * Returns a JavaScript Date equivalent to this DateTime.
       * @return {Date}
       */
      toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
      }
      // COMPARE
      /**
       * Return the difference between two DateTimes as a Duration.
       * @param {DateTime} otherDateTime - the DateTime to compare this one to
       * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
       * @param {Object} opts - options that affect the creation of the Duration
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @example
       * var i1 = DateTime.fromISO('1982-05-25T09:45'),
       *     i2 = DateTime.fromISO('1983-10-14T10:30');
       * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
       * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
       * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
       * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
       * @return {Duration}
       */
      diff(otherDateTime, unit = "milliseconds", opts = {}) {
        if (!this.isValid || !otherDateTime.isValid) {
          return Duration.invalid("created by diffing an invalid DateTime");
        }
        const durOpts = {
          locale: this.locale,
          numberingSystem: this.numberingSystem,
          ...opts
        };
        const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
        return otherIsLater ? diffed.negate() : diffed;
      }
      /**
       * Return the difference between this DateTime and right now.
       * See {@link DateTime#diff}
       * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
       * @param {Object} opts - options that affect the creation of the Duration
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @return {Duration}
       */
      diffNow(unit = "milliseconds", opts = {}) {
        return this.diff(_DateTime.now(), unit, opts);
      }
      /**
       * Return an Interval spanning between this DateTime and another DateTime
       * @param {DateTime} otherDateTime - the other end point of the Interval
       * @return {Interval|DateTime}
       */
      until(otherDateTime) {
        return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
      }
      /**
       * Return whether this DateTime is in the same unit of time as another DateTime.
       * Higher-order units must also be identical for this function to return `true`.
       * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
       * @param {DateTime} otherDateTime - the other DateTime
       * @param {string} unit - the unit of time to check sameness on
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
       * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
       * @return {boolean}
       */
      hasSame(otherDateTime, unit, opts) {
        if (!this.isValid) return false;
        const inputMs = otherDateTime.valueOf();
        const adjustedToZone = this.setZone(otherDateTime.zone, {
          keepLocalTime: true
        });
        return adjustedToZone.startOf(unit, opts) <= inputMs && inputMs <= adjustedToZone.endOf(unit, opts);
      }
      /**
       * Equality check
       * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
       * To compare just the millisecond values, use `+dt1 === +dt2`.
       * @param {DateTime} other - the other DateTime
       * @return {boolean}
       */
      equals(other) {
        return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
      }
      /**
       * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
       * platform supports Intl.RelativeTimeFormat. Rounds down by default.
       * @param {Object} options - options that affect the output
       * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
       * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
       * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
       * @param {boolean} [options.round=true] - whether to round the numbers in the output.
       * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
       * @param {string} options.locale - override the locale of this DateTime
       * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
       * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
       * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
       * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
       * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
       * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
       * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
       */
      toRelative(options = {}) {
        if (!this.isValid) return null;
        const base = options.base || _DateTime.fromObject({}, {
          zone: this.zone
        }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
        let units = ["years", "months", "days", "hours", "minutes", "seconds"];
        let unit = options.unit;
        if (Array.isArray(options.unit)) {
          units = options.unit;
          unit = void 0;
        }
        return diffRelative(base, this.plus(padding), {
          ...options,
          numeric: "always",
          units,
          unit
        });
      }
      /**
       * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
       * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
       * @param {Object} options - options that affect the output
       * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
       * @param {string} options.locale - override the locale of this DateTime
       * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
       * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
       * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
       * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
       * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
       * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
       */
      toRelativeCalendar(options = {}) {
        if (!this.isValid) return null;
        return diffRelative(options.base || _DateTime.fromObject({}, {
          zone: this.zone
        }), this, {
          ...options,
          numeric: "auto",
          units: ["years", "months", "days"],
          calendary: true
        });
      }
      /**
       * Return the min of several date times
       * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
       * @return {DateTime} the min DateTime, or undefined if called with no argument
       */
      static min(...dateTimes) {
        if (!dateTimes.every(_DateTime.isDateTime)) {
          throw new InvalidArgumentError("min requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
      }
      /**
       * Return the max of several date times
       * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
       * @return {DateTime} the max DateTime, or undefined if called with no argument
       */
      static max(...dateTimes) {
        if (!dateTimes.every(_DateTime.isDateTime)) {
          throw new InvalidArgumentError("max requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
      }
      // MISC
      /**
       * Explain how a string would be parsed by fromFormat()
       * @param {string} text - the string to parse
       * @param {string} fmt - the format the string is expected to be in (see description)
       * @param {Object} options - options taken by fromFormat()
       * @return {Object}
       */
      static fromFormatExplain(text2, fmt, options = {}) {
        const {
          locale = null,
          numberingSystem = null
        } = options, localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true
        });
        return explainFromTokens(localeToUse, text2, fmt);
      }
      /**
       * @deprecated use fromFormatExplain instead
       */
      static fromStringExplain(text2, fmt, options = {}) {
        return _DateTime.fromFormatExplain(text2, fmt, options);
      }
      /**
       * Build a parser for `fmt` using the given locale. This parser can be passed
       * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
       * can be used to optimize cases where many dates need to be parsed in a
       * specific format.
       *
       * @param {String} fmt - the format the string is expected to be in (see
       * description)
       * @param {Object} options - options used to set locale and numberingSystem
       * for parser
       * @returns {TokenParser} - opaque object to be used
       */
      static buildFormatParser(fmt, options = {}) {
        const {
          locale = null,
          numberingSystem = null
        } = options, localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true
        });
        return new TokenParser(localeToUse, fmt);
      }
      /**
       * Create a DateTime from an input string and format parser.
       *
       * The format parser must have been created with the same locale as this call.
       *
       * @param {String} text - the string to parse
       * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
       * @param {Object} opts - options taken by fromFormat()
       * @returns {DateTime}
       */
      static fromFormatParser(text2, formatParser, opts = {}) {
        if (isUndefined(text2) || isUndefined(formatParser)) {
          throw new InvalidArgumentError("fromFormatParser requires an input string and a format parser");
        }
        const {
          locale = null,
          numberingSystem = null
        } = opts, localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true
        });
        if (!localeToUse.equals(formatParser.locale)) {
          throw new InvalidArgumentError(`fromFormatParser called with a locale of ${localeToUse}, but the format parser was created for ${formatParser.locale}`);
        }
        const {
          result,
          zone,
          specificOffset,
          invalidReason
        } = formatParser.explainFromTokens(text2);
        if (invalidReason) {
          return _DateTime.invalid(invalidReason);
        } else {
          return parseDataToDateTime(result, zone, opts, `format ${formatParser.format}`, text2, specificOffset);
        }
      }
      // FORMAT PRESETS
      /**
       * {@link DateTime#toLocaleString} format like 10/14/1983
       * @type {Object}
       */
      static get DATE_SHORT() {
        return DATE_SHORT;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
       * @type {Object}
       */
      static get DATE_MED() {
        return DATE_MED;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
       * @type {Object}
       */
      static get DATE_MED_WITH_WEEKDAY() {
        return DATE_MED_WITH_WEEKDAY;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'October 14, 1983'
       * @type {Object}
       */
      static get DATE_FULL() {
        return DATE_FULL;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
       * @type {Object}
       */
      static get DATE_HUGE() {
        return DATE_HUGE;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_SIMPLE() {
        return TIME_SIMPLE;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_WITH_SECONDS() {
        return TIME_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_WITH_SHORT_OFFSET() {
        return TIME_WITH_SHORT_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_WITH_LONG_OFFSET() {
        return TIME_WITH_LONG_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_SIMPLE() {
        return TIME_24_SIMPLE;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_WITH_SECONDS() {
        return TIME_24_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_WITH_SHORT_OFFSET() {
        return TIME_24_WITH_SHORT_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_WITH_LONG_OFFSET() {
        return TIME_24_WITH_LONG_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_SHORT() {
        return DATETIME_SHORT;
      }
      /**
       * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_SHORT_WITH_SECONDS() {
        return DATETIME_SHORT_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_MED() {
        return DATETIME_MED;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_MED_WITH_SECONDS() {
        return DATETIME_MED_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_MED_WITH_WEEKDAY() {
        return DATETIME_MED_WITH_WEEKDAY;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_FULL() {
        return DATETIME_FULL;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_FULL_WITH_SECONDS() {
        return DATETIME_FULL_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_HUGE() {
        return DATETIME_HUGE;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_HUGE_WITH_SECONDS() {
        return DATETIME_HUGE_WITH_SECONDS;
      }
    };
    function friendlyDateTime(dateTimeish) {
      if (DateTime.isDateTime(dateTimeish)) {
        return dateTimeish;
      } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
        return DateTime.fromJSDate(dateTimeish);
      } else if (dateTimeish && typeof dateTimeish === "object") {
        return DateTime.fromObject(dateTimeish);
      } else {
        throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
      }
    }
    var VERSION = "3.6.1";
    exports2.DateTime = DateTime;
    exports2.Duration = Duration;
    exports2.FixedOffsetZone = FixedOffsetZone;
    exports2.IANAZone = IANAZone;
    exports2.Info = Info;
    exports2.Interval = Interval;
    exports2.InvalidZone = InvalidZone;
    exports2.Settings = Settings;
    exports2.SystemZone = SystemZone;
    exports2.VERSION = VERSION;
    exports2.Zone = Zone;
  }
});

// node_modules/exiftool-vendored/dist/Maybe.js
var require_Maybe = __commonJS({
  "node_modules/exiftool-vendored/dist/Maybe.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.map = map;
    exports2.map2 = map2;
    exports2.first = first;
    exports2.firstDefinedThunk = firstDefinedThunk;
    exports2.denull = denull;
    function map(maybeT, f) {
      return maybeT == null ? void 0 : f(maybeT);
    }
    function map2(a, b, f) {
      return a == null || b == null ? void 0 : f(a, b);
    }
    function first(iter, f) {
      for (const t of iter) {
        if (t != null) {
          const v = f(t);
          if (v != null)
            return v;
        }
      }
      return;
    }
    function firstDefinedThunk(iter) {
      for (const f of iter) {
        const result = f();
        if (result != null)
          return result;
      }
      return;
    }
    function denull(t) {
      return t ?? void 0;
    }
  }
});

// node_modules/exiftool-vendored/dist/ExifTime.js
var require_ExifTime = __commonJS({
  "node_modules/exiftool-vendored/dist/ExifTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExifTime = void 0;
    var luxon_1 = require_luxon();
    var DateTime_1 = require_DateTime();
    var String_1 = require_String2();
    var TimeParsing_1 = require_TimeParsing();
    var Timezones_1 = require_Timezones();
    var ExifTime = class _ExifTime {
      hour;
      minute;
      second;
      millisecond;
      rawValue;
      inferredZone;
      static fromEXIF(text2, defaultZone) {
        const s = (0, String_1.toS)(text2).trim();
        if (s.length === 0)
          return;
        const result = (0, TimeParsing_1.parseDateTime)(text2, (0, TimeParsing_1.timeFormats)({ defaultZone }));
        if (result != null) {
          return this.fromDateTime(result.dt, text2, result.unsetZone ? void 0 : (0, Timezones_1.getZoneName)({ zone: result.dt.zone }), result.inferredZone, result.unsetMilliseconds);
        }
        return;
      }
      static fromDateTime(dt, rawValue, zone, inferredZone, unsetMilliseconds) {
        return !(0, DateTime_1.validDateTime)(dt) ? void 0 : new _ExifTime(dt.hour, dt.minute, dt.second, unsetMilliseconds ? void 0 : dt.millisecond, rawValue, zone, inferredZone);
      }
      #dt;
      #z;
      zone;
      constructor(hour, minute, second, millisecond, rawValue, zoneName, inferredZone) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
        this.rawValue = rawValue;
        this.inferredZone = inferredZone;
        this.zone = (0, Timezones_1.getZoneName)({ zoneName });
      }
      toDateTime() {
        return this.#dt ??= luxon_1.DateTime.fromObject({
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          millisecond: this.millisecond
        }, {
          zone: this.zone
        });
      }
      /**
       * Alias for `.millisecond`
       */
      get millis() {
        return this.millisecond;
      }
      get hasZone() {
        return this.zone != null;
      }
      #subsec() {
        return this.millisecond == null ? "" : "." + (0, String_1.pad3)(this.millisecond);
      }
      #shortZone() {
        return this.#z ??= (0, Timezones_1.zoneToShortOffset)(this.zone);
      }
      toString() {
        return (0, String_1.pad2)(this.hour, this.minute, this.second).join(":") + this.#subsec() + this.#shortZone();
      }
      toISOString() {
        return this.toString();
      }
      toExifString() {
        return this.toString();
      }
      setZone(zone, opts) {
        const dt = (0, TimeParsing_1.setZone)({
          zone,
          src: this.toDateTime(),
          srcHasZone: this.hasZone,
          opts
        });
        return _ExifTime.fromDateTime(dt, this.rawValue, this.zone, this.inferredZone, this.millisecond == null);
      }
      toJSON() {
        return {
          _ctor: "ExifTime",
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          millisecond: this.millisecond,
          rawValue: this.rawValue,
          zone: this.zone,
          inferredZone: this.inferredZone
        };
      }
      static fromJSON(json) {
        return new _ExifTime(json.hour, json.minute, json.second, json.millisecond, json.rawValue, json.zone, json.inferredZone);
      }
    };
    exports2.ExifTime = ExifTime;
  }
});

// node_modules/exiftool-vendored/dist/Timezones.js
var require_Timezones = __commonJS({
  "node_modules/exiftool-vendored/dist/Timezones.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TimezoneOffsetTagnames = exports2.defaultVideosToUTC = exports2.UnsetZoneName = exports2.UnsetZone = exports2.UnsetZoneOffsetMinutes = void 0;
    exports2.isUTC = isUTC;
    exports2.isZoneUnset = isZoneUnset;
    exports2.isZoneValid = isZoneValid;
    exports2.isZone = isZone;
    exports2.normalizeZone = normalizeZone;
    exports2.zoneToShortOffset = zoneToShortOffset;
    exports2.validTzOffsetMinutes = validTzOffsetMinutes;
    exports2.offsetMinutesToZoneName = offsetMinutesToZoneName;
    exports2.extractZone = extractZone;
    exports2.incrementZone = incrementZone;
    exports2.extractTzOffsetFromTags = extractTzOffsetFromTags;
    exports2.extractTzOffsetFromDatestamps = extractTzOffsetFromDatestamps;
    exports2.extractTzOffsetFromTimeStamp = extractTzOffsetFromTimeStamp;
    exports2.inferLikelyOffsetMinutes = inferLikelyOffsetMinutes;
    exports2.extractTzOffsetFromUTCOffset = extractTzOffsetFromUTCOffset;
    exports2.equivalentZones = equivalentZones;
    exports2.getZoneName = getZoneName;
    var luxon_1 = require_luxon();
    var Array_1 = require_Array2();
    var BinaryField_1 = require_BinaryField();
    var CapturedAtTagNames_1 = require_CapturedAtTagNames();
    var DefaultExifToolOptions_1 = require_DefaultExifToolOptions();
    var ExifDate_1 = require_ExifDate();
    var ExifDateTime_1 = require_ExifDateTime();
    var ExifTime_1 = require_ExifTime();
    var Lazy_1 = require_Lazy();
    var Maybe_1 = require_Maybe();
    var Number_1 = require_Number();
    var Object_1 = require_Object2();
    var Pick_1 = require_Pick();
    var String_1 = require_String2();
    var ValidTimezoneOffsets = [
      // "-12:00", // not used for any populated land
      "-11:00",
      // "-10:30", // used by Hawaii 1896-1947
      "-10:00",
      "-09:30",
      "-09:00",
      "-08:30",
      "-08:00",
      "-07:00",
      "-06:00",
      "-05:00",
      "-04:30",
      // used by Venezuela 1912-1965 and 2007-2016
      "-04:00",
      "-03:30",
      "-03:00",
      "-02:30",
      "-02:00",
      "-01:00",
      // "-00:44", // used by Liberia until 1972
      // "-00:25:21", // Ireland 1880-1916 https://en.wikipedia.org/wiki/UTC%E2%88%9200:25:21
      "+00:00",
      // "+00:20", // used by Netherlands until 1940
      // "+00:30", // used by Switzerland until 1936
      "+01:00",
      // "+01:24", // used by Warsaw until 1915
      // "+01:30", // used by some southern African countries until 1903
      "+02:00",
      // "+02:30", // archaic Moscow time
      "+03:00",
      "+03:30",
      "+04:00",
      "+04:30",
      // "+04:51", // used by Bombay until 1955 https://en.wikipedia.org/wiki/UTC%2B04:51
      "+05:00",
      "+05:30",
      // "+05:40", // used by Nepal until 1920
      "+05:45",
      // Nepal
      "+06:00",
      "+06:30",
      "+07:00",
      // "+07:20", // used by Singapore and Malaya until 1941
      "+07:30",
      // used by Mayasia until 1982
      "+08:00",
      "+08:30",
      // used by North Korea until 2018
      "+08:45",
      // used by Western Australia, but not in tz database
      "+09:00",
      "+09:30",
      "+09:45",
      // used by Western Australia, but not in tz database
      "+10:00",
      "+10:30",
      "+11:00",
      "+12:00",
      "+12:45",
      // New Zealand islands
      "+13:00",
      // New Zealand and Antarctica
      "+13:45",
      // New Zealand islands
      "+14:00"
    ];
    function offsetToMinutes(offset) {
      const [h, m] = offset.split(":").map(Number);
      const sign = h < 0 ? -1 : 1;
      return h * 60 + sign * m;
    }
    var ValidOffsetMinutes = (0, Lazy_1.lazy)(() => new Set(ValidTimezoneOffsets.map(offsetToMinutes)));
    exports2.UnsetZoneOffsetMinutes = -1;
    exports2.UnsetZone = luxon_1.Info.normalizeZone(exports2.UnsetZoneOffsetMinutes);
    exports2.UnsetZoneName = exports2.UnsetZone.name;
    var Zulus = [
      luxon_1.FixedOffsetZone.utcInstance,
      0,
      -0,
      "UTC",
      "GMT",
      "Z",
      "+0",
      "+00:00",
      "UTC+0",
      "GMT+0",
      "UTC+00:00",
      "GMT+00:00"
    ];
    function isUTC(zone) {
      if (zone == null) {
        return false;
      }
      if (typeof zone === "string" || typeof zone === "number") {
        return Zulus.includes(zone);
      }
      if (zone instanceof luxon_1.Zone) {
        return zone.isUniversal && zone.offset(Date.now()) === 0;
      }
      return false;
    }
    function isZoneUnset(zone) {
      return zone.isUniversal && zone.offset(0) === exports2.UnsetZoneOffsetMinutes;
    }
    function isZoneValid(zone) {
      return zone != null && zone.isValid && !isZoneUnset(zone) && Math.abs(zone.offset(Date.now())) < 14 * 60;
    }
    function isZone(zone) {
      return (0, Object_1.isObject)(zone) && (zone instanceof luxon_1.Zone || zone.constructor.name === "Zone");
    }
    exports2.defaultVideosToUTC = "defaultVideosToUTC";
    var IanaFormatRE = /^\w{2,15}(?:\/\w{3,15}){0,2}$/;
    var FixedFormatRE = /^UTC(?<sign>[+-])(?<hours>\d+)(?::(?<minutes>\d{2}))?$/;
    function parseFixedOffset(str) {
      const match = FixedFormatRE.exec(str)?.groups;
      if (match == null)
        return;
      const h = (0, Number_1.toInt)(match.hours);
      const m = (0, Number_1.toInt)(match.minutes) ?? 0;
      if (h == null || h < 0 || h > 14 || m < 0 || m >= 60)
        return;
      const result = (match.sign === "-" ? -1 : 1) * (h * 60 + m);
      return (ValidOffsetMinutes().has(result) ? result : void 0) ?? void 0;
    }
    function normalizeZone(input) {
      if (input == null || (0, String_1.blank)(input) || !(0, Number_1.isNumber)(input) && !(0, String_1.isString)(input) && !isZone(input)) {
        return;
      }
      try {
        if (isUTC(input))
          return luxon_1.FixedOffsetZone.utcInstance;
        let z = input;
        if ((0, String_1.isString)(z)) {
          let s = z;
          z = s = s.replace(/^(?:Zulu|Z|GMT)(?:\b|$)/i, "UTC");
          if ((0, String_1.blank)(s))
            return;
          const fixed = parseFixedOffset(s);
          if (fixed != null) {
            return luxon_1.Info.normalizeZone(fixed);
          }
          if (!IanaFormatRE.test(s)) {
            return;
          }
        }
        const result = luxon_1.Info.normalizeZone(z);
        return isZoneValid(result) && result.name !== exports2.UnsetZoneName ? result : void 0;
      } catch {
        return;
      }
    }
    function zoneToShortOffset(zone, ts) {
      return normalizeZone(zone)?.formatOffset(ts ?? Date.now(), "short") ?? "";
    }
    function validTzOffsetMinutes(tzOffsetMinutes) {
      return tzOffsetMinutes != null && (0, Number_1.isNumber)(tzOffsetMinutes) && tzOffsetMinutes !== exports2.UnsetZoneOffsetMinutes && ValidOffsetMinutes().has(tzOffsetMinutes);
    }
    function offsetMinutesToZoneName(offsetMinutes) {
      if (!validTzOffsetMinutes(offsetMinutes)) {
        return void 0;
      }
      if (offsetMinutes === 0)
        return "UTC";
      const sign = offsetMinutes < 0 ? "-" : "+";
      const absMinutes = Math.abs(offsetMinutes);
      const hours = Math.floor(absMinutes / 60);
      const minutes = Math.abs(absMinutes % 60);
      return `UTC${sign}` + hours + (minutes === 0 ? "" : `:${(0, String_1.pad2)(minutes)}`);
    }
    function tzHourToOffset(n) {
      return (0, Number_1.isNumber)(n) && validTzOffsetMinutes(n * 60) ? offsetMinutesToZoneName(n * 60) : void 0;
    }
    var tzRe = /(?<Z>Z)|((UTC)?(?<sign>[+-])(?<hours>\d\d?)(?::(?<minutes>\d\d))?)$/;
    function extractOffsetFromHours(hourOffset) {
      return (0, Number_1.isNumber)(hourOffset) ? (0, Maybe_1.map)(tzHourToOffset(hourOffset), (zone) => ({
        zone,
        tz: zone,
        src: "hourOffset"
      })) : Array.isArray(hourOffset) ? extractOffsetFromHours(hourOffset[0]) : void 0;
    }
    function extractZone(value, opts) {
      if (value == null || typeof value === "boolean" || value instanceof BinaryField_1.BinaryField || value instanceof ExifDate_1.ExifDate) {
        return;
      }
      if (Array.isArray(value)) {
        return extractZone(value.find((ea) => ea != null));
      }
      if (value instanceof ExifDateTime_1.ExifDateTime || value instanceof ExifTime_1.ExifTime) {
        return value.zone == null ? void 0 : {
          zone: value.zone,
          tz: value.zone,
          src: value.constructor.name + ".zone"
        };
      }
      if ((0, Number_1.isNumber)(value)) {
        return extractOffsetFromHours(value);
      }
      if (typeof value !== "string" || (0, String_1.blank)(value)) {
        return;
      }
      {
        const z = normalizeZone(value);
        if (z != null) {
          return { zone: z.name, tz: z.name, src: "normalizeZone" };
        }
      }
      let str = value.trim();
      if (opts?.stripTZA !== false && // We only want to strip off the TZA if the input _doesn't_ end with "UTC"
      // or "Z"
      !/[.\d\s](?:UTC|Z)$/.test(str)) {
        str = str.replace(/\s[a-z]{2,5}$/i, "");
      }
      {
        if ((0, String_1.blank)(str))
          return;
        const z = normalizeZone(str);
        if (z != null) {
          return { zone: z.name, tz: z.name, src: "normalizeZone" };
        }
      }
      const match = tzRe.exec(str);
      const capturedGroups = match?.groups;
      if (match != null && capturedGroups != null) {
        const leftovers = str.slice(0, match.index);
        if (capturedGroups.Z === "Z")
          return {
            zone: "UTC",
            tz: "UTC",
            src: "Z",
            ...(0, String_1.blank)(leftovers) ? {} : { leftovers }
          };
        const offsetMinutes = (capturedGroups.sign === "-" ? -1 : 1) * (parseInt(capturedGroups.hours ?? "0") * 60 + parseInt(capturedGroups.minutes ?? "0"));
        const zone = offsetMinutesToZoneName(offsetMinutes);
        if (zone != null) {
          return {
            zone,
            tz: zone,
            src: "offsetMinutesToZoneName",
            ...(0, String_1.blank)(leftovers) ? {} : { leftovers }
          };
        }
      }
      return;
    }
    exports2.TimezoneOffsetTagnames = [
      "TimeZone",
      // We **don't** look at "OffsetTime", as that is the offset for `ModifyDate`,
      // which is the _file_ modification time.
      // time zone for DateTimeOriginal, "-08:00"
      "OffsetTimeOriginal",
      // time zone for CreateDate, "-08:00"
      "OffsetTimeDigitized",
      // srsly who came up with these wholly inconsistent tag names? _why not just
      // prefix tag names with "Offset"?!11_ SADNESS AND WOE
      // 1 or 2 values: 1. The time zone offset of DateTimeOriginal from GMT in
      // hours, 2. If present, the time zone offset of ModifyDate (which we
      // ignore) @see https://www.exiftool.org/TagNames/EXIF.html
      "TimeZoneOffset"
      // number | number[] | string
      // We DON'T use "GeolocationTimezone" here, as at this layer in the glue
      // factory we don't have access to the ExifTool option "ignoreZeroZeroLatLon"
    ];
    function incrementZone(z, minutes) {
      const norm = normalizeZone(z);
      if (norm == null || true !== norm.isUniversal)
        return;
      const fixed = norm.offset(Date.now());
      return (0, Number_1.isNumber)(fixed) ? luxon_1.FixedOffsetZone.instance(fixed + minutes) : void 0;
    }
    function extractTzOffsetFromTags(t, opts) {
      const adjustFn = opts?.adjustTimeZoneIfDaylightSavings ?? DefaultExifToolOptions_1.defaultAdjustTimeZoneIfDaylightSavings;
      for (const tagName of exports2.TimezoneOffsetTagnames) {
        const offset = extractZone(t[tagName]);
        if (offset == null)
          continue;
        const minutes = adjustFn(t, offset.tz);
        if (minutes != null) {
          const adjustedZone = incrementZone(offset.tz, minutes);
          if (adjustedZone != null)
            return {
              zone: adjustedZone.name,
              tz: adjustedZone.name,
              src: tagName + " (adjusted for DaylightSavings)"
            };
        }
        return { ...offset, src: tagName };
      }
      return;
    }
    function extractTzOffsetFromDatestamps(t, opts) {
      if (opts?.inferTimezoneFromDatestamps === true) {
        for (const tagName of opts.inferTimezoneFromDatestampTags ?? []) {
          if (t[tagName] != null) {
            const offset = extractZone(t[tagName]);
            if (offset != null && !isUTC(offset.tz)) {
              return { ...offset, src: tagName };
            }
          }
        }
      }
      return;
    }
    function extractTzOffsetFromTimeStamp(t, opts) {
      if (opts?.inferTimezoneFromTimeStamp !== true)
        return;
      const ts = ExifDateTime_1.ExifDateTime.from(t.TimeStamp);
      if (ts == null)
        return;
      for (const tagName of opts.inferTimezoneFromDatestampTags ?? []) {
        const v = t[tagName];
        if (!(0, String_1.isString)(v) && !(v instanceof ExifDateTime_1.ExifDateTime))
          continue;
        const ea = ExifDateTime_1.ExifDateTime.from(v);
        if (ea == null)
          continue;
        if (ea.zone != null) {
          return { zone: ea.zone, tz: ea.zone, src: tagName };
        }
        const deltaMinutes = Math.floor((ea.toEpochSeconds("UTC") - ts.toEpochSeconds()) / 60);
        const likelyOffsetZone = inferLikelyOffsetMinutes(deltaMinutes);
        const zone = offsetMinutesToZoneName(likelyOffsetZone);
        if (zone != null) {
          return {
            zone,
            tz: zone,
            src: "offset between " + tagName + " and TimeStamp"
          };
        }
      }
      return;
    }
    var LikelyOffsetMinutes = ValidTimezoneOffsets.map(offsetToMinutes);
    function inferLikelyOffsetMinutes(deltaMinutes) {
      const nearest = (0, Array_1.leastBy)(LikelyOffsetMinutes, (ea) => Math.abs(ea - deltaMinutes));
      return nearest != null && Math.abs(nearest - deltaMinutes) < 30 ? nearest : void 0;
    }
    function toNotBlank(x) {
      return x == null || typeof x === "string" && (0, String_1.blank)(x) ? void 0 : x;
    }
    function extractTzOffsetFromUTCOffset(t) {
      const utcSources = {
        ...(0, Pick_1.pick)(t, "GPSDateTime", "DateTimeUTC", "SonyDateTime2"),
        GPSDateTimeStamp: (0, Maybe_1.map2)(
          toNotBlank(t.GPSDateStamp),
          // Example: "2022:04:13"
          toNotBlank(t.GPSTimeStamp),
          // Example: "23:59:41.001"
          (a, b) => a + " " + b
        )
      };
      const utc = (0, Maybe_1.first)([
        "GPSDateTime",
        "DateTimeUTC",
        "GPSDateTimeStamp",
        "SonyDateTime2"
      ], (tagName) => {
        const v = utcSources[tagName];
        const edt = v instanceof ExifDateTime_1.ExifDateTime ? v : ExifDateTime_1.ExifDateTime.fromExifStrict(v);
        const s = edt != null && (edt.zone == null || isUTC(edt.zone)) ? edt.setZone("UTC", { keepLocalTime: true })?.toEpochSeconds() : void 0;
        return s != null ? {
          tagName,
          s
        } : void 0;
      });
      if (utc == null)
        return;
      const dt = (0, Maybe_1.first)(CapturedAtTagNames_1.CapturedAtTagNames, (tagName) => {
        const edt = ExifDateTime_1.ExifDateTime.fromExifStrict(t[tagName]);
        const s = edt != null && edt.zone == null ? edt.setZone("UTC", { keepLocalTime: true })?.toEpochSeconds() : void 0;
        return s != null ? {
          tagName,
          s
        } : void 0;
      });
      if (dt == null)
        return;
      const diffSeconds = dt.s - utc.s;
      const offsetMinutes = inferLikelyOffsetMinutes(diffSeconds / 60);
      return (0, Maybe_1.map)(offsetMinutesToZoneName(offsetMinutes), (zone) => ({
        zone,
        tz: zone,
        src: `offset between ${dt.tagName} and ${utc.tagName}`
      }));
    }
    function equivalentZones(a, b) {
      const az = normalizeZone(a);
      const bz = normalizeZone(b);
      return az != null && bz != null && (az.equals(bz) || az.offset(Date.now()) === bz.offset(Date.now()));
    }
    function getZoneName(args = {}) {
      const result = normalizeZone(args.zone)?.name ?? normalizeZone(args.zoneName)?.name ?? offsetMinutesToZoneName(args.tzoffsetMinutes);
      return (0, String_1.blank)(result) || result === exports2.UnsetZoneName ? void 0 : result;
    }
  }
});

// node_modules/exiftool-vendored/dist/TimeParsing.js
var require_TimeParsing = __commonJS({
  "node_modules/exiftool-vendored/dist/TimeParsing.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timeFormats = timeFormats;
    exports2.parseDateTime = parseDateTime;
    exports2.setZone = setZone;
    var luxon_1 = require_luxon();
    var String_1 = require_String2();
    var Timezones_1 = require_Timezones();
    var TimeFmts = [
      // I haven't seen times without padded hours, minutes, or seconds in the
      // wild (yet), so those aren't handled here:
      { fmt: "HH:mm:ss.u", unsetMilliseconds: false },
      { fmt: "HH:mm:ss", unsetMilliseconds: true },
      { fmt: "HH:mm", unsetMilliseconds: true }
    ];
    function* timeFormats(args) {
      const inferredZone = (0, String_1.notBlank)(args.defaultZone);
      for (const prefix of args.formatPrefixes ?? [""]) {
        for (const timeFmt of TimeFmts) {
          yield {
            fmt: prefix + timeFmt.fmt,
            zone: args.defaultZone,
            unsetMilliseconds: timeFmt.unsetMilliseconds,
            inferredZone
          };
        }
      }
    }
    function parseDateTime(text2, fmts) {
      const s = (0, String_1.toS)(text2).trim();
      if (s.length === 0)
        return;
      const extractedZone = (0, Timezones_1.extractZone)(s);
      const input = extractedZone?.leftovers ?? s;
      for (const ea of fmts) {
        const dt = luxon_1.DateTime.fromFormat(input, ea.fmt, {
          setZone: true,
          zone: extractedZone?.tz ?? ea.zone ?? Timezones_1.UnsetZone
        });
        if (dt?.isValid !== true)
          continue;
        const unsetZone = extractedZone?.tz == null && (dt.zone == null || dt.zone === Timezones_1.UnsetZone);
        let inferredZone = extractedZone?.tz != null || unsetZone ? false : ea.inferredZone;
        if (inferredZone == null) {
          const dt2 = luxon_1.DateTime.fromFormat(input, ea.fmt, { setZone: true });
          inferredZone = dt.zone !== dt2.zone;
        }
        return {
          dt,
          fmt: ea.fmt,
          unsetZone,
          inferredZone,
          input,
          unsetMilliseconds: ea.unsetMilliseconds ?? false
        };
      }
      return;
    }
    function setZone(args) {
      return args.src.setZone(args.zone, {
        keepLocalTime: !args.srcHasZone,
        ...args.opts
      });
    }
  }
});

// node_modules/exiftool-vendored/dist/ExifDateTime.js
var require_ExifDateTime = __commonJS({
  "node_modules/exiftool-vendored/dist/ExifDateTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExifDateTime = void 0;
    var luxon_1 = require_luxon();
    var DateTime_1 = require_DateTime();
    var Maybe_1 = require_Maybe();
    var Object_1 = require_Object2();
    var String_1 = require_String2();
    var TimeParsing_1 = require_TimeParsing();
    var Timezones_1 = require_Timezones();
    var ExifDateTime2 = class _ExifDateTime {
      year;
      month;
      day;
      hour;
      minute;
      second;
      millisecond;
      tzoffsetMinutes;
      rawValue;
      zoneName;
      inferredZone;
      static from(exifOrIso, defaultZone) {
        return exifOrIso instanceof _ExifDateTime ? exifOrIso : (0, String_1.blank)(exifOrIso) ? void 0 : this.fromExifStrict(exifOrIso, defaultZone) ?? this.fromISO(exifOrIso, defaultZone) ?? this.fromExifLoose(exifOrIso, defaultZone);
      }
      static fromISO(iso, defaultZone) {
        if ((0, String_1.blank)(iso) || null != iso.match(/^\d+$/))
          return void 0;
        return this.#fromPatterns(iso, (0, TimeParsing_1.timeFormats)({
          formatPrefixes: ["y-MM-dd'T'", "y-MM-dd ", "y-M-d "],
          defaultZone
        }));
      }
      /**
       * Try to parse a date-time string from EXIF. If there is not both a date
       * and a time component, returns `undefined`.
       *
       * @param text from EXIF metadata
       * @param defaultZone a "zone name" to use as a backstop, or default, if
       * `text` doesn't specify a zone. This may be IANA-formatted, like
       * "America/Los_Angeles", or an offset, like "UTC-3". See
       * `offsetMinutesToZoneName`.
       */
      static fromEXIF(text2, defaultZone) {
        if ((0, String_1.blank)(text2))
          return void 0;
        return (
          // .fromExifStrict() uses .fromISO() as a backstop
          this.fromExifStrict(text2, defaultZone) ?? this.fromExifLoose(text2, defaultZone)
        );
      }
      static #fromPatterns(text2, fmts) {
        const result = (0, TimeParsing_1.parseDateTime)(text2, fmts);
        return result == null ? void 0 : _ExifDateTime.fromDateTime(result.dt, {
          rawValue: text2,
          unsetMilliseconds: result.unsetMilliseconds,
          inferredZone: result.inferredZone
        });
      }
      /**
         * Parse the given date-time string, EXIF-formatted.
         *
         * @param text from EXIF metadata, in `y:M:d H:m:s` format (with optional
         * sub-seconds and/or timezone)
      
         * @param defaultZone a "zone name" to use as a backstop, or default, if
         * `text` doesn't specify a zone. This may be IANA-formatted, like
         * "America/Los_Angeles", or an offset, like "UTC-3". See
         * `offsetMinutesToZoneName`.
         */
      static fromExifStrict(text2, defaultZone) {
        if ((0, String_1.blank)(text2) || !(0, String_1.isString)(text2))
          return void 0;
        return this.#fromPatterns(text2, (0, TimeParsing_1.timeFormats)({ formatPrefixes: ["y:MM:dd ", "y:M:d "], defaultZone })) ?? // Not found yet? Maybe it's in ISO format? See
        // https://github.com/photostructure/exiftool-vendored.js/issues/71
        this.fromISO(text2, defaultZone);
      }
      static *#looseExifFormats(defaultZone) {
        const formats = [
          "MMM d y HH:mm:ss",
          "MMM d y, HH:mm:ss",
          // Thu Oct 13 00:12:27 2016:
          "ccc MMM d HH:mm:ss y"
        ];
        const zone = (0, String_1.notBlank)(defaultZone) ? defaultZone : Timezones_1.UnsetZone;
        for (const fmt of formats) {
          yield { fmt, zone, inferredZone: true };
        }
      }
      static fromExifLoose(text2, defaultZone) {
        return (0, String_1.blank)(text2) || !(0, String_1.isString)(text2) ? void 0 : this.#fromPatterns(text2, this.#looseExifFormats(defaultZone));
      }
      static fromDateTime(dt, opts) {
        if (dt == null || !dt.isValid || dt.year === 0 || dt.year === 1) {
          return void 0;
        }
        return new _ExifDateTime(dt.year, dt.month, dt.day, dt.hour, dt.minute, dt.second, dt.millisecond === 0 && true === opts?.unsetMilliseconds ? void 0 : dt.millisecond, dt.offset === Timezones_1.UnsetZoneOffsetMinutes ? void 0 : dt.offset, opts?.rawValue, dt.zoneName == null || dt.zone?.name === Timezones_1.UnsetZone.name ? void 0 : dt.zoneName, opts?.inferredZone);
      }
      /**
       * Create an ExifDateTime from a number of milliseconds since the epoch
       * (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
       *
       * @param millis - a number of milliseconds since 1970 UTC
       *
       * @param options.rawValue - the original parsed string input
       * @param options.zone - the zone to place the DateTime into. Defaults to 'local'.
       * @param options.locale - a locale to set on the resulting DateTime instance
       * @param options.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param options.numberingSystem - the numbering system to set on the resulting DateTime instance
       */
      static fromMillis(millis, options = {}) {
        if (options.zone == null || [Timezones_1.UnsetZoneName, Timezones_1.UnsetZone].includes(options.zone)) {
          delete options.zone;
        }
        let dt = luxon_1.DateTime.fromMillis(millis, {
          ...(0, Object_1.omit)(options, "rawValue")
        });
        if (options.zone == null) {
          dt = dt.setZone(Timezones_1.UnsetZone, { keepLocalTime: true });
        }
        const result = this.fromDateTime(dt, { rawValue: options.rawValue });
        if (result == null) {
          throw new Error(`Failed to create ExifDateTime from millis: ${millis}`);
        }
        return result;
      }
      static now(opts = {}) {
        return this.fromMillis(Date.now(), opts);
      }
      #dt;
      zone;
      constructor(year, month, day, hour, minute, second, millisecond, tzoffsetMinutes, rawValue, zoneName, inferredZone) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
        this.tzoffsetMinutes = tzoffsetMinutes;
        this.rawValue = rawValue;
        this.zoneName = zoneName;
        this.inferredZone = inferredZone;
        this.zone = (0, Timezones_1.getZoneName)({ zoneName, tzoffsetMinutes });
      }
      get millis() {
        return this.millisecond;
      }
      get hasZone() {
        return this.zone != null;
      }
      get unsetMilliseconds() {
        return this.millisecond == null;
      }
      setZone(zone, opts) {
        const dt = (0, TimeParsing_1.setZone)({
          zone,
          src: this.toDateTime(),
          srcHasZone: this.hasZone,
          opts
        });
        return _ExifDateTime.fromDateTime(dt, {
          rawValue: this.rawValue,
          unsetMilliseconds: this.millisecond == null,
          inferredZone: opts?.inferredZone ?? true
        });
      }
      /**
       * CAUTION: This instance will inherit the system timezone if this instance
       * has an unset zone (as Luxon doesn't support "unset" timezones)
       */
      toDateTime(overrideZone) {
        return this.#dt ??= luxon_1.DateTime.fromObject({
          year: this.year,
          month: this.month,
          day: this.day,
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          millisecond: this.millisecond
        }, {
          zone: overrideZone ?? this.zone
        });
      }
      toEpochSeconds(overrideZone) {
        return this.toDateTime(overrideZone).toUnixInteger();
      }
      toDate() {
        return this.toDateTime().toJSDate();
      }
      toISOString(options = {}) {
        return (0, Maybe_1.denull)(this.toDateTime().toISO({
          suppressMilliseconds: options.suppressMilliseconds ?? this.millisecond == null,
          includeOffset: this.hasZone && options.includeOffset !== false
        }));
      }
      toExifString() {
        return (0, DateTime_1.dateTimeToExif)(this.toDateTime(), {
          includeOffset: this.hasZone,
          includeMilliseconds: this.millisecond != null
        });
      }
      toString() {
        return this.toISOString();
      }
      /**
       * @return the epoch milliseconds of this
       */
      toMillis() {
        return this.toDateTime().toMillis();
      }
      get isValid() {
        return this.toDateTime().isValid;
      }
      toJSON() {
        return {
          _ctor: "ExifDateTime",
          // < magick field used by the JSON parser
          year: this.year,
          month: this.month,
          day: this.day,
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          millisecond: this.millisecond,
          tzoffsetMinutes: this.tzoffsetMinutes,
          rawValue: this.rawValue,
          zoneName: this.zoneName,
          inferredZone: this.inferredZone
        };
      }
      /**
       * @return a new ExifDateTime from the given JSON. Note that this instance **may not be valid**.
       */
      static fromJSON(json) {
        return new _ExifDateTime(json.year, json.month, json.day, json.hour, json.minute, json.second, json.millisecond, json.tzoffsetMinutes, json.rawValue, json.zoneName, json.inferredZone);
      }
      maybeMatchZone(target, maxDeltaMs = 14 * DateTime_1.MinuteMs) {
        const targetZone = target.zone;
        if (targetZone == null || !target.hasZone)
          return;
        return this.setZone(targetZone, { keepLocalTime: false })?.ifClose(target, maxDeltaMs) ?? this.setZone(targetZone, { keepLocalTime: true })?.ifClose(target, maxDeltaMs);
      }
      ifClose(target, maxDeltaMs = 14 * DateTime_1.MinuteMs) {
        const ts = this.toMillis();
        const targetTs = target.toMillis();
        return Math.abs(ts - targetTs) <= maxDeltaMs ? this : void 0;
      }
      plus(duration) {
        let dt = this.toDateTime().plus(duration);
        if (!this.hasZone) {
          dt = dt.setZone(Timezones_1.UnsetZone, { keepLocalTime: true });
        }
        return _ExifDateTime.fromDateTime(dt, this);
      }
    };
    exports2.ExifDateTime = ExifDateTime2;
  }
});

// node_modules/exiftool-vendored/dist/DateTime.js
var require_DateTime = __commonJS({
  "node_modules/exiftool-vendored/dist/DateTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DayMs = exports2.HourMs = exports2.MinuteMs = exports2.SecondMs = void 0;
    exports2.validDateTime = validDateTime;
    exports2.isDateOrTime = isDateOrTime;
    exports2.dateTimeToExif = dateTimeToExif;
    exports2.toExifString = toExifString;
    exports2.hms = hms;
    var luxon_1 = require_luxon();
    var ExifDate_1 = require_ExifDate();
    var ExifDateTime_1 = require_ExifDateTime();
    var ExifTime_1 = require_ExifTime();
    function validDateTime(dt) {
      return dt?.isValid === true;
    }
    exports2.SecondMs = 1e3;
    exports2.MinuteMs = 60 * exports2.SecondMs;
    exports2.HourMs = 60 * exports2.MinuteMs;
    exports2.DayMs = 24 * exports2.HourMs;
    function isDateOrTime(o) {
      return o instanceof ExifDateTime_1.ExifDateTime || o instanceof ExifDate_1.ExifDate || o instanceof ExifTime_1.ExifTime || luxon_1.DateTime.isDateTime(o);
    }
    function dateTimeToExif(d, opts) {
      return d.toFormat("y:MM:dd HH:mm:ss" + (opts?.includeMilliseconds === true ? ".u" : "") + (opts?.includeOffset === false ? "" : "ZZ"));
    }
    function toExifString(d) {
      if (luxon_1.DateTime.isDateTime(d)) {
        return dateTimeToExif(d);
      } else {
        return d?.toExifString?.();
      }
    }
    function hms(d, opts) {
      return d.toFormat("HH:mm:ss" + (opts?.includeMilliseconds === true ? ".SSS" : ""));
    }
  }
});

// node_modules/exiftool-vendored/dist/ExifDate.js
var require_ExifDate = __commonJS({
  "node_modules/exiftool-vendored/dist/ExifDate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExifDate = void 0;
    var luxon_1 = require_luxon();
    var DateTime_1 = require_DateTime();
    var Maybe_1 = require_Maybe();
    var String_1 = require_String2();
    var StrictExifRE = /^\d{1,4}:\d{1,2}:\d{1,2}|\d{1,4}-\d{1,2}-\d{1,2}$/;
    var YearMonthRE = /^\d{1,4}[:-]\d{1,2}$/;
    var YearOnlyRE = /^\d{1,4}$/;
    var LooseExifRE = /^\S+\s+\S+\s+\S+$/;
    var ExifDate = class _ExifDate {
      year;
      month;
      day;
      rawValue;
      static from(exifOrIso) {
        if (typeof exifOrIso === "number") {
          return this.fromYear(exifOrIso);
        }
        return (
          // in order of strictness:
          this.fromExifStrict(exifOrIso) ?? this.fromYearMonth(exifOrIso) ?? this.fromYear(exifOrIso) ?? this.fromISO(exifOrIso) ?? this.fromExifLoose(exifOrIso)
        );
      }
      static fromISO(text2) {
        return StrictExifRE.test((0, String_1.toS)(text2).trim()) ? this.fromDateTime(luxon_1.DateTime.fromISO(text2), text2) : void 0;
      }
      static fromPatterns(text2, fmts) {
        if ((0, String_1.blank)(text2))
          return;
        text2 = (0, String_1.toS)(text2).trim();
        for (const fmt of fmts) {
          const dt = luxon_1.DateTime.fromFormat(text2, fmt);
          if ((0, DateTime_1.validDateTime)(dt)) {
            return this.fromDateTime(dt, text2);
          }
        }
        return;
      }
      // These are all formats I've seen in the wild from exiftool's output.
      // More iterations might make sense, like "d MMM, y" or "MMM d, y", but I
      // want to be constrained in what I consider a valid date to lessen the
      // chance of misinterpreting a given value.
      static fromExifStrict(text2) {
        return StrictExifRE.test((0, String_1.toS)(text2).trim()) ? this.fromPatterns(text2, ["y:MM:dd", "y-MM-dd", "y:M:d"]) : void 0;
      }
      static fromYearMonth(text2) {
        const textStr = (0, String_1.toS)(text2).trim();
        if (!YearMonthRE.test(textStr))
          return void 0;
        for (const fmt of ["y:MM", "y-MM", "y:M", "y-M"]) {
          const dt = luxon_1.DateTime.fromFormat(textStr, fmt);
          if ((0, DateTime_1.validDateTime)(dt)) {
            return new _ExifDate(dt.year, dt.month, void 0, textStr);
          }
        }
        return void 0;
      }
      static fromYear(yearValue) {
        const textStr = (0, String_1.toS)(yearValue).trim();
        if (YearOnlyRE.test(textStr)) {
          const year = parseInt(textStr, 10);
          if (!isNaN(year) && year > 0 && year <= 9999) {
            return new _ExifDate(year, void 0, void 0, textStr);
          }
        }
        return void 0;
      }
      static fromExifLoose(text2) {
        return LooseExifRE.test((0, String_1.toS)(text2).trim()) ? this.fromPatterns(text2, ["MMM d y", "MMMM d y"]) : void 0;
      }
      static fromEXIF(text2) {
        return (0, Maybe_1.firstDefinedThunk)([
          () => this.fromExifStrict(text2),
          () => this.fromExifLoose(text2)
        ]);
      }
      static fromDateTime(dt, rawValue) {
        return (0, DateTime_1.validDateTime)(dt) ? new _ExifDate(dt.year, dt.month, dt.day, rawValue) : void 0;
      }
      constructor(year, month, day, rawValue) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.rawValue = rawValue;
      }
      toDate() {
        return new Date(this.year, (this.month ?? 1) - 1, this.day ?? 1);
      }
      /**
       * @param deltaMs defaults to 12 hours, so toMillis() is in the middle of the day.
       *
       * @return the epoch milliseconds for this day in UTC, plus `deltaMs` milliseconds.
       */
      toMillis(deltaMs = 12 * DateTime_1.HourMs) {
        return this.toDate().getTime() + deltaMs;
      }
      toISOString() {
        return this.toString("-");
      }
      toExifString() {
        return this.toString(":");
      }
      toString(sep = "-") {
        if (this.month == null) {
          return `${this.year}`;
        }
        if (this.day == null) {
          return `${this.year}${sep}${(0, String_1.pad2)(this.month).join("")}`;
        }
        return `${this.year}${sep}${(0, String_1.pad2)(this.month, this.day).join(sep)}`;
      }
      toJSON() {
        return {
          _ctor: "ExifDate",
          year: this.year,
          month: this.month,
          day: this.day,
          rawValue: this.rawValue
        };
      }
      static fromJSON(json) {
        return new _ExifDate(json.year, json.month, json.day, json.rawValue);
      }
      /**
       * @returns true if this is a partial date (year-only or year-month)
       */
      isPartial() {
        return this.month == null || this.day == null;
      }
      /**
       * @returns true if this is a year-only date
       */
      isYearOnly() {
        return this.month == null;
      }
      /**
       * @returns true if this is a year-month date (no day)
       */
      isYearMonth() {
        return this.month != null && this.day == null;
      }
      /**
       * @returns true if this is a full date (year, month, and day)
       */
      isFullDate() {
        return this.month != null && this.day != null;
      }
    };
    exports2.ExifDate = ExifDate;
  }
});

// node_modules/exiftool-vendored/dist/File.js
var require_File = __commonJS({
  "node_modules/exiftool-vendored/dist/File.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPlatformCaseSensitive = void 0;
    exports2.isFileEmpty = isFileEmpty;
    exports2.compareFilePaths = compareFilePaths;
    var node_fs_1 = require("node:fs");
    var node_path_1 = require("node:path");
    var Lazy_1 = require_Lazy();
    var String_1 = require_String2();
    async function isFileEmpty(path2) {
      if ((0, String_1.blank)(path2)) {
        throw new Error("isFileEmpty(): blank path");
      }
      try {
        const s = await new Promise((res, rej) => {
          try {
            (0, node_fs_1.stat)(path2, (err, val) => err == null ? res(val) : rej(err));
          } catch (err) {
            rej(err);
          }
        });
        return s == null || s.size === 0;
      } catch (err) {
        if (err && typeof err === "object" && "code" in err && err.code === "ENOENT")
          return true;
        else
          throw err;
      }
    }
    exports2.isPlatformCaseSensitive = (0, Lazy_1.lazy)(() => process.platform !== "win32" && process.platform !== "darwin");
    function compareFilePaths(a, b) {
      const aNorm = (0, node_path_1.normalize)(a);
      const bNorm = (0, node_path_1.normalize)(b);
      return (0, exports2.isPlatformCaseSensitive)() ? aNorm === bNorm : aNorm.localeCompare(bNorm, void 0, { sensitivity: "base" }) === 0;
    }
  }
});

// node_modules/exiftool-vendored/dist/CoordinateParser.js
var require_CoordinateParser = __commonJS({
  "node_modules/exiftool-vendored/dist/CoordinateParser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseCoordinates = parseCoordinates;
    exports2.parseDecimalCoordinate = parseDecimalCoordinate;
    exports2.parseCoordinate = parseCoordinate;
    exports2.roundGpsDecimal = roundGpsDecimal;
    exports2.parsePosition = parsePosition;
    exports2.processCoordinate = processCoordinate;
    var Number_1 = require_Number();
    var String_1 = require_String2();
    var MAX_LATITUDE_DEGREES = 90;
    var MAX_LONGITUDE_DEGREES = 180;
    var CoordinateParseError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "CoordinateParseError";
      }
    };
    var DecimalCoordsRE = /^(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)$/;
    function parseCoordinates(input) {
      input = (0, String_1.toS)(input).trim();
      if (input.length === 0) {
        throw new CoordinateParseError("Input string cannot be empty");
      }
      if (DecimalCoordsRE.test(input)) {
        const split = input.split(/[\s,]+/);
        const [latitude2, longitude2] = split.map(Number_1.toFloat).map((ea) => ea == null ? null : roundGpsDecimal(ea));
        if (latitude2 == null || longitude2 == null) {
          throw new CoordinateParseError("Failed to parse decimal coordinates");
        }
        return { latitude: latitude2, longitude: longitude2 };
      }
      let latitude;
      let longitude;
      for (const coord of parseStringCoordinates(input)) {
        if (!coord.direction) {
          throw new CoordinateParseError("Direction is required for position parsing");
        }
        if (coord.direction === "S" || coord.direction === "N") {
          if (latitude !== void 0) {
            throw new CoordinateParseError("Multiple latitude values found");
          }
          latitude = toDecimalDegrees(coord);
        } else {
          if (longitude != null) {
            throw new CoordinateParseError("Multiple longitude values found");
          }
          longitude = toDecimalDegrees(coord);
        }
      }
      const missing = [];
      if (latitude == null)
        missing.push("latitude");
      if (longitude == null)
        missing.push("longitude");
      if (latitude == null || longitude == null) {
        throw new CoordinateParseError(`Missing ${missing.join(" and ")}`);
      } else {
        return { latitude, longitude };
      }
    }
    function parseStringCoordinates(input) {
      if (!input?.trim()) {
        throw new CoordinateParseError("Input string cannot be empty");
      }
      const lat = parseCoordinate(input, true);
      const remainders = lat.remainder;
      if ((0, String_1.blank)(remainders)) {
        throw new CoordinateParseError("Expected multiple coordinates");
      }
      return [lat, parseCoordinate(remainders)];
    }
    function parseDecimalCoordinate(input) {
      if (!input?.trim()) {
        throw new CoordinateParseError("Input string cannot be empty");
      }
      const coord = parseCoordinate(input);
      if (coord.format !== "D") {
        throw new CoordinateParseError("Expected decimal degrees format");
      }
      if (!coord.direction) {
        throw new CoordinateParseError("Missing direction");
      }
      return { decimal: toDecimalDegrees(coord), direction: coord.direction };
    }
    var DecimalCoordRE = /^(-?\d+(?:\.\d+)?)$/;
    function parseCoordinate(input, expectRemainders = false) {
      input = (0, String_1.toS)(input).trim();
      if (input.length === 0) {
        throw new CoordinateParseError("Input string cannot be empty");
      }
      if (DecimalCoordRE.test(input)) {
        const f = (0, Number_1.toFloat)(input);
        if (f == null) {
          throw new CoordinateParseError("Failed to parse decimal coordinate");
        }
        const r = roundGpsDecimal(f);
        return {
          degrees: r,
          decimal: r,
          format: "D",
          direction: void 0,
          minutes: void 0,
          seconds: void 0,
          remainder: ""
        };
      }
      const dmsPattern = /^(?<degrees>-?\d+)\s*(?:°|DEG)\s*(?<minutes>\d+)\s*['′]\s*(?<seconds>\d+(?:\.\d+)?)\s*["″]\s?(?<direction>[NSEW])?[\s,]{0,3}(?<remainder>.*)$/i;
      const dmPattern = /^(?<degrees>-?\d+)\s*(?:°|DEG)\s*(?<minutes>\d+(?:\.\d+)?)\s?['′]\s?(?<direction>[NSEW])?(?<remainder>.*)$/i;
      const dPattern = /^(?<degrees>-?\d+(?:\.\d+)?)\s*(?:°|DEG)\s?(?<direction>[NSEW])?(?<remainder>.*)$/i;
      const trimmedInput = input.trimStart();
      let match;
      let format = null;
      if (match = trimmedInput.match(dmsPattern)) {
        format = "DMS";
      } else if (match = trimmedInput.match(dmPattern)) {
        format = "DM";
      } else if (match = trimmedInput.match(dPattern)) {
        format = "D";
      }
      if (match == null || format == null || !expectRemainders && !(0, String_1.blank)(match?.groups?.remainder)) {
        throw new CoordinateParseError(`Invalid coordinate format. Expected one of:
  DDD\xB0 MM' SS.S" k (deg/min/sec)
  DDD\xB0 MM.MMM' k (deg/decimal minutes)
  DDD.DDDDD\xB0 (decimal degrees)
  (where k indicates direction: N, S, E, or W)`);
      }
      if (!match.groups) {
        throw new CoordinateParseError("Failed to parse coordinate components");
      }
      const { degrees: degreesStr, minutes: minutesStr, seconds: secondsStr, direction: directionStr, remainder } = match.groups;
      const direction = directionStr?.toUpperCase();
      if (degreesStr == null) {
        throw new CoordinateParseError("Missing degrees in coordinate");
      }
      const degrees = parseFloat(degreesStr);
      let minutes;
      let seconds;
      if (format === "DMS") {
        if (minutesStr == null || secondsStr == null) {
          throw new CoordinateParseError("Missing minutes or seconds in DMS coordinate");
        }
        minutes = parseInt(minutesStr, 10);
        seconds = parseFloat(secondsStr);
        if (minutes >= 60) {
          throw new CoordinateParseError("Minutes must be between 0 and 59");
        }
        if (seconds >= 60) {
          throw new CoordinateParseError("Seconds must be between 0 and 59.999...");
        }
      } else if (format === "DM") {
        if (minutesStr == null) {
          throw new CoordinateParseError("Missing minutes in DM coordinate");
        }
        minutes = parseFloat(minutesStr);
        if (minutes >= 60) {
          throw new CoordinateParseError("Minutes must be between 0 and 59.999...");
        }
      }
      const maxDegrees = direction === "N" || direction === "S" ? MAX_LATITUDE_DEGREES : MAX_LONGITUDE_DEGREES;
      if (Math.abs(degrees) > maxDegrees) {
        throw new CoordinateParseError(`Degrees must be between -${maxDegrees} and ${maxDegrees} for ${direction} direction`);
      }
      const coords = {
        degrees,
        minutes,
        seconds,
        direction,
        format,
        remainder: remainder?.trim()
      };
      const decimal = toDecimalDegrees(coords);
      return {
        ...coords,
        decimal
      };
    }
    function toDecimalDegrees(coord) {
      const degrees = (0, Number_1.toFloat)(coord.degrees) ?? 0;
      const sign = Math.sign(degrees);
      let decimal = Math.abs(degrees);
      decimal += Math.abs((0, Number_1.toFloat)(coord.minutes) ?? 0) / 60;
      decimal += Math.abs((0, Number_1.toFloat)(coord.seconds) ?? 0) / 3600;
      if (coord.direction === "S" || coord.direction === "W" || sign < 0) {
        decimal = -decimal;
      }
      const maxDegrees = coord.direction === "N" || coord.direction === "S" ? MAX_LATITUDE_DEGREES : MAX_LONGITUDE_DEGREES;
      const axis = coord.direction === "N" || coord.direction === "S" ? "latitude" : "longitude";
      if (Math.abs(decimal) > maxDegrees) {
        throw new CoordinateParseError(`Degrees must be between -${maxDegrees} and ${maxDegrees} for ${axis}`);
      }
      return roundGpsDecimal(decimal);
    }
    var MAX_LAT_LON_DIFF = 1;
    function roundGpsDecimal(decimal) {
      return (0, Number_1.roundToDecimalPlaces)(decimal, 6);
    }
    function parsePosition(position) {
      if ((0, String_1.blank)(position))
        return;
      const [lat, lon] = (0, String_1.toS)(position).split(/[, ]+/).map(Number_1.toFloat);
      return lat != null && lon != null ? [lat, lon] : void 0;
    }
    function processCoordinate(config, warnings) {
      let { value, ref } = config;
      const { geoValue, coordinateType } = config;
      const { expectedRefPositive, expectedRefNegative, max } = config;
      let isInvalid = false;
      ref = (0, String_1.toS)(ref).trim().toUpperCase().slice(0, 1);
      if (!(0, String_1.blank)(config.ref) && ref !== expectedRefPositive && ref !== expectedRefNegative) {
        warnings.push(`Invalid GPS${coordinateType}Ref: ${JSON.stringify(config.ref)}.`);
        ref = value < 0 ? expectedRefNegative : expectedRefPositive;
      }
      if (Math.abs(value) > max) {
        isInvalid = true;
        warnings.push(`Invalid GPS${coordinateType}: ${value} is out of range`);
        return { value, ref, isInvalid };
      }
      if (ref === expectedRefNegative) {
        value = -Math.abs(value);
      }
      if (geoValue != null && Math.abs(Math.abs(geoValue) - Math.abs(value)) < MAX_LAT_LON_DIFF) {
        if (Math.sign(geoValue) !== Math.sign(value)) {
          value = -value;
          warnings.push(`Corrected GPS${coordinateType} sign based on GeolocationPosition`);
        }
        const expectedRef2 = geoValue < 0 ? expectedRefNegative : expectedRefPositive;
        if (ref !== expectedRef2) {
          ref = expectedRef2;
          if (!(0, String_1.blank)(config.ref)) {
            warnings.push(`Corrected GPS${coordinateType}Ref to ${expectedRef2} based on GeolocationPosition`);
          }
        }
      }
      const expectedRef = value < 0 ? expectedRefNegative : expectedRefPositive;
      if (ref != null && ref !== expectedRef && !(0, String_1.blank)(config.ref)) {
        warnings.push(`Corrected GPS${coordinateType}Ref to ${ref} to match coordinate sign`);
      }
      ref = expectedRef;
      return { value: roundGpsDecimal(value), ref, isInvalid };
    }
  }
});

// node_modules/exiftool-vendored/dist/StrEnum.js
var require_StrEnum = __commonJS({
  "node_modules/exiftool-vendored/dist/StrEnum.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Directions = void 0;
    exports2.strEnum = strEnum;
    function lessThan(a, b) {
      return a == null || b == null ? false : a < b;
    }
    function strEnum(...o) {
      const values = Object.freeze([...new Set(o)]);
      const lcToValue = new Map(values.map((ea) => [ea.toLowerCase(), ea]));
      const valueToIndex = Object.fromEntries(values.map((ea, idx) => [ea, idx]));
      const dict = {};
      for (const ea of values) {
        dict[ea] = ea;
      }
      const getCI = (s) => s == null ? void 0 : lcToValue.get(s?.toLowerCase());
      const indexOf = (s) => s != null ? valueToIndex[s] : void 0;
      const ordinal = (s) => indexOf(s) ?? values.length;
      const includes = (s) => indexOf(s) != null;
      const pick = (...t) => values.filter((ea) => t.includes(ea));
      const omit = (...t) => values.filter((ea) => !t.includes(ea));
      const toValid = (s) => s == null ? void 0 : includes(s) ? s : getCI(s);
      const firstValid = (...s) => {
        for (const ea of s) {
          const v = toValid(ea);
          if (v != null)
            return v;
        }
        return;
      };
      const mapValid = (s, f) => includes(s) ? f(s) : void 0;
      const cmp = (a, b) => {
        const a_ = indexOf(a);
        const b_ = indexOf(b);
        return a_ == null || b_ == null ? void 0 : a_ > b_ ? 1 : a_ < b_ ? -1 : 0;
      };
      const lt2 = (a, b) => lessThan(indexOf(a), indexOf(b));
      const next = (s) => {
        const i = indexOf(s);
        return i == null ? void 0 : values[i];
      };
      const toReversed = () => strEnum(...[...values].reverse());
      return {
        ...dict,
        values,
        length: values.length,
        has: includes,
        // alias for includes
        includes,
        getCI,
        pick,
        omit,
        indexOf,
        ordinal,
        toValid,
        firstValid,
        mapValid,
        cmp,
        lt: lt2,
        next,
        toReversed,
        [Symbol.iterator]: () => values[Symbol.iterator](),
        [Symbol.toStringTag]: "StrEnum"
      };
    }
    exports2.Directions = strEnum("North", "South", "East", "West");
  }
});

// node_modules/exiftool-vendored/dist/GPS.js
var require_GPS = __commonJS({
  "node_modules/exiftool-vendored/dist/GPS.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GpsLocationTagNames = void 0;
    exports2.parseGPSLocation = parseGPSLocation;
    var CoordinateParser_1 = require_CoordinateParser();
    var Lazy_1 = require_Lazy();
    var Number_1 = require_Number();
    var StrEnum_1 = require_StrEnum();
    var String_1 = require_String2();
    exports2.GpsLocationTagNames = (0, StrEnum_1.strEnum)("GPSLatitude", "GPSLatitudeRef", "GPSLongitude", "GPSLongitudeRef", "GPSPosition", "GeolocationPosition");
    function _parseCoordinate(v) {
      return (0, String_1.blank)(v) ? void 0 : (0, Number_1.isNumber)(v) ? v : (0, CoordinateParser_1.parseCoordinate)(v).decimal;
    }
    function _parseCoordinates(v) {
      return (0, String_1.blank)(v) ? void 0 : (0, CoordinateParser_1.parseCoordinates)(v);
    }
    function parseGPSLocation(tags2, opts) {
      const warnings = [];
      try {
        let latitude = void 0;
        let longitude = void 0;
        try {
          latitude = _parseCoordinate(tags2.GPSLatitude);
        } catch (e) {
          warnings.push(`Error parsing GPSLatitude: ${e}`);
        }
        try {
          longitude = _parseCoordinate(tags2.GPSLongitude);
        } catch (e) {
          warnings.push(`Error parsing GPSLongitude: ${e}`);
        }
        if (latitude == null || longitude == null) {
          const gpsPos = (0, Lazy_1.lazy)(() => {
            try {
              return _parseCoordinates(tags2.GPSPosition);
            } catch (e) {
              warnings.push(`Error parsing GPSPosition: ${e}`);
              return void 0;
            }
          });
          latitude ??= gpsPos()?.latitude;
          longitude ??= gpsPos()?.longitude;
        }
        if (latitude == null || longitude == null) {
          return { invalid: false, warnings };
        }
        if (opts.ignoreZeroZeroLatLon && latitude === 0 && longitude === 0) {
          warnings.push("Ignoring zero coordinates from GPSLatitude/GPSLongitude");
          return { invalid: true, warnings };
        }
        let geoPos = void 0;
        try {
          geoPos = _parseCoordinates(tags2.GeolocationPosition);
        } catch (e) {
          warnings.push(`Error parsing GeolocationPosition: ${e}`);
        }
        const latResult = (0, CoordinateParser_1.processCoordinate)({
          value: latitude,
          ref: tags2.GPSLatitudeRef,
          geoValue: geoPos?.latitude,
          expectedRefPositive: "N",
          expectedRefNegative: "S",
          max: 90,
          coordinateType: "Latitude"
        }, warnings);
        const lonResult = (0, CoordinateParser_1.processCoordinate)({
          value: longitude,
          ref: tags2.GPSLongitudeRef,
          geoValue: geoPos?.longitude,
          expectedRefPositive: "E",
          expectedRefNegative: "W",
          max: 180,
          coordinateType: "Longitude"
        }, warnings);
        if (latResult.isInvalid || lonResult.isInvalid) {
          return { invalid: true, warnings };
        }
        return {
          result: {
            GPSLatitude: latResult.value,
            GPSLongitude: lonResult.value,
            GPSLatitudeRef: latResult.ref,
            GPSLongitudeRef: lonResult.ref
          },
          invalid: false,
          warnings
        };
      } catch (e) {
        warnings.push(`Error parsing coordinates: ${e}`);
        return { invalid: true, warnings };
      }
    }
  }
});

// node_modules/exiftool-vendored/dist/OnlyZerosRE.js
var require_OnlyZerosRE = __commonJS({
  "node_modules/exiftool-vendored/dist/OnlyZerosRE.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OnlyZerosRE = void 0;
    exports2.OnlyZerosRE = /^0+$/;
  }
});

// node_modules/exiftool-vendored/dist/ReadTask.js
var require_ReadTask = __commonJS({
  "node_modules/exiftool-vendored/dist/ReadTask.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadTask = exports2.DefaultReadTaskOptions = exports2.ReadTaskOptionFields = void 0;
    exports2.nullish = nullish;
    var batch_cluster_1 = require_BatchCluster();
    var _path = __importStar(require("node:path"));
    var Array_1 = require_Array2();
    var BinaryField_1 = require_BinaryField();
    var Boolean_1 = require_Boolean();
    var DefaultExifToolOptions_1 = require_DefaultExifToolOptions();
    var ErrorsAndWarnings_1 = require_ErrorsAndWarnings();
    var ExifDate_1 = require_ExifDate();
    var ExifDateTime_1 = require_ExifDateTime();
    var ExifTime_1 = require_ExifTime();
    var ExifToolOptions_1 = require_ExifToolOptions();
    var ExifToolTask_1 = require_ExifToolTask();
    var File_1 = require_File();
    var FilenameCharsetArgs_1 = require_FilenameCharsetArgs();
    var GPS_1 = require_GPS();
    var Lazy_1 = require_Lazy();
    var Number_1 = require_Number();
    var Object_1 = require_Object2();
    var OnlyZerosRE_1 = require_OnlyZerosRE();
    var Pick_1 = require_Pick();
    var String_1 = require_String2();
    var Timezones_1 = require_Timezones();
    var PassthroughTags = [
      "ExifToolVersion",
      "DateStampMode",
      "Sharpness",
      "Firmware",
      "DateDisplayFormat"
    ];
    exports2.ReadTaskOptionFields = [
      "adjustTimeZoneIfDaylightSavings",
      "backfillTimezones",
      "defaultVideosToUTC",
      "geolocation",
      "geoTz",
      "ignoreMinorErrors",
      "ignoreZeroZeroLatLon",
      "imageHashType",
      "includeImageDataMD5",
      "inferTimezoneFromDatestamps",
      "inferTimezoneFromDatestampTags",
      "inferTimezoneFromTimeStamp",
      "keepUTCTime",
      "numericTags",
      "preferTimezoneInferenceFromGps",
      "readArgs",
      "struct",
      "useMWG"
    ];
    var NullIsh = ["undef", "null", "undefined"];
    function nullish(s) {
      return s == null || (0, String_1.isString)(s) && NullIsh.includes(s.trim());
    }
    exports2.DefaultReadTaskOptions = {
      ...(0, Pick_1.pick)(DefaultExifToolOptions_1.DefaultExifToolOptions, ...exports2.ReadTaskOptionFields)
    };
    var MaybeDateOrTimeRe = /when|date|time|subsec|creat|modif/i;
    var ReadTask = class _ReadTask extends ExifToolTask_1.ExifToolTask {
      sourceFile;
      args;
      options;
      degroup;
      #raw = {};
      #rawDegrouped = {};
      #tags = {};
      /**
       * @param sourceFile the file to read
       * @param args the full arguments to pass to exiftool that take into account
       * the flags in `options`
       */
      constructor(sourceFile, args, options) {
        super(args, options);
        this.sourceFile = sourceFile;
        this.args = args;
        this.options = options;
        this.degroup = this.args.includes("-G");
        this.#tags = { SourceFile: sourceFile };
        this.#tags.errors = this.errors;
      }
      static for(filename, options) {
        const opts = (0, ExifToolOptions_1.handleDeprecatedOptions)({
          ...exports2.DefaultReadTaskOptions,
          ...options
        });
        const sourceFile = _path.resolve(filename);
        const args = [
          ...FilenameCharsetArgs_1.Utf8FilenameCharsetArgs,
          "-json",
          ...(0, Array_1.toArray)(opts.readArgs)
        ];
        args.push("-api", "struct=" + ((0, Number_1.isNumber)(opts.struct) ? opts.struct : "0"));
        if (opts.useMWG) {
          args.push("-use", "MWG");
        }
        if (opts.imageHashType != null && opts.imageHashType !== false) {
          args.push("-api", "requesttags=imagedatahash");
          args.push("-api", "imagehashtype=" + opts.imageHashType);
        }
        if (true === opts.geolocation) {
          args.push("-api", "geolocation");
        }
        if (true === opts.keepUTCTime) {
          args.push("-api", "keepUTCTime");
        }
        args.push(...opts.numericTags.map((ea) => "-" + ea + "#"));
        args.push("-all", sourceFile);
        return new _ReadTask(sourceFile, args, opts);
      }
      toString() {
        return "ReadTask" + this.sourceFile + ")";
      }
      // only exposed for tests
      parse(data, err) {
        try {
          const versionFixedData = data.replace(/"ExifToolVersion"\s*:\s*(\d+(?:\.\d+)?)/, '"ExifToolVersion":"$1"');
          this.#raw = JSON.parse(versionFixedData)[0];
        } catch (jsonError) {
          (0, batch_cluster_1.logger)().warn("ExifTool.ReadTask(): Invalid JSON", {
            data,
            err,
            jsonError
          });
          throw err ?? jsonError;
        }
        if ((0, String_1.notBlank)(this.#raw.SourceFile)) {
          if (!(0, File_1.compareFilePaths)(this.#raw.SourceFile, this.sourceFile)) {
            throw new Error(`Internal error: unexpected SourceFile of ${this.#raw.SourceFile} for file ${this.sourceFile}`);
          }
        }
        return this.#parseTags();
      }
      #isVideo() {
        return String(this.#rawDegrouped?.MIMEType).startsWith("video/");
      }
      #defaultToUTC() {
        return this.#isVideo() && this.options.defaultVideosToUTC;
      }
      #tagName(k) {
        return this.degroup ? k.split(":")[1] ?? k : k;
      }
      #parseTags() {
        if (this.degroup) {
          this.#rawDegrouped = {};
          for (const [key, value] of Object.entries(this.#raw)) {
            const k = this.#tagName(key);
            this.#rawDegrouped[k] = value;
          }
        } else {
          this.#rawDegrouped = this.#raw;
        }
        const tags2 = this.#tags;
        this.#extractGpsMetadata();
        const tzSrc = this.#extractTzOffset();
        if (tzSrc) {
          tags2.zone = tzSrc.zone;
          tags2.tz = tzSrc.tz;
          tags2.tzSource = tzSrc.src;
        }
        for (const [key, value] of Object.entries(this.#raw)) {
          const k = this.#tagName(key);
          if (key in tags2)
            continue;
          const v = this.#parseTag(k, value);
          if (v == null) {
            Reflect.deleteProperty(tags2, key);
          } else {
            tags2[key] = v;
          }
        }
        const { errors, warnings } = (0, ErrorsAndWarnings_1.errorsAndWarnings)(this, tags2);
        tags2.errors = errors;
        tags2.warnings = warnings;
        return tags2;
      }
      #extractGpsMetadata = (0, Lazy_1.lazy)(() => {
        const result = (0, GPS_1.parseGPSLocation)(this.#rawDegrouped, this.options);
        if (result?.warnings != null && (result.warnings.length ?? 0) > 0) {
          this.warnings.push(...result.warnings);
        }
        if (result?.invalid !== true) {
          for (const [k, v] of Object.entries(result?.result ?? {})) {
            this.#tags[k] = v;
          }
        }
        return result;
      });
      #gpsIsInvalid = (0, Lazy_1.lazy)(() => this.#extractGpsMetadata()?.invalid ?? false);
      #gpsResults = (0, Lazy_1.lazy)(() => this.#gpsIsInvalid() ? {} : this.#extractGpsMetadata()?.result ?? {});
      #extractTzOffsetFromGps = (0, Lazy_1.lazy)(() => {
        const gps = this.#extractGpsMetadata();
        const lat = gps?.result?.GPSLatitude;
        const lon = gps?.result?.GPSLongitude;
        if (gps == null || gps.invalid === true || lat == null || lon == null)
          return;
        const geolocZone = (0, Timezones_1.normalizeZone)(this.#rawDegrouped.GeolocationTimeZone);
        if (geolocZone != null) {
          return {
            zone: geolocZone.name,
            tz: geolocZone.name,
            src: "GeolocationTimeZone"
          };
        }
        try {
          const geoTz = this.options.geoTz(lat, lon);
          const zone = (0, Timezones_1.normalizeZone)(geoTz);
          if (zone != null) {
            return {
              zone: zone.name,
              tz: zone.name,
              src: "GPSLatitude/GPSLongitude"
            };
          }
        } catch (error) {
          this.warnings.push("Failed to determine timezone from GPS coordinates: " + error);
        }
        return;
      });
      #tz = (0, Lazy_1.lazy)(() => this.#extractTzOffset()?.tz);
      #extractTzOffset = (0, Lazy_1.lazy)(() => {
        if (true === this.options.preferTimezoneInferenceFromGps) {
          const fromGps = this.#extractTzOffsetFromGps();
          if (fromGps != null) {
            return fromGps;
          }
        }
        return (0, Timezones_1.extractTzOffsetFromTags)(this.#rawDegrouped, this.options) ?? this.#extractTzOffsetFromGps() ?? (0, Timezones_1.extractTzOffsetFromDatestamps)(this.#rawDegrouped, this.options) ?? // See https://github.com/photostructure/exiftool-vendored.js/issues/113
        // and https://github.com/photostructure/exiftool-vendored.js/issues/156
        // Videos are frequently encoded in UTC, but don't include the
        // timezone offset in their datetime stamps.
        (this.#defaultToUTC() ? {
          zone: "UTC",
          tz: "UTC",
          src: "defaultVideosToUTC"
        } : (
          // not applicable:
          void 0
        )) ?? // This is a last-ditch estimation heuristic:
        (0, Timezones_1.extractTzOffsetFromUTCOffset)(this.#rawDegrouped) ?? // No, really, this is the even worse than UTC offset heuristics:
        (0, Timezones_1.extractTzOffsetFromTimeStamp)(this.#rawDegrouped, this.options);
      });
      #parseTag(tagName, value) {
        if (nullish(value))
          return void 0;
        try {
          if (PassthroughTags.indexOf(tagName) >= 0) {
            return value;
          }
          if (tagName.startsWith("GPS") || tagName.startsWith("Geolocation")) {
            if (this.#gpsIsInvalid())
              return void 0;
            const parsed = this.#gpsResults()[tagName];
            if (parsed != null)
              return parsed;
          }
          if (Array.isArray(value)) {
            return value.map((ea) => this.#parseTag(tagName, ea));
          }
          if ((0, Object_1.isObject)(value)) {
            const result = {};
            for (const [k, v] of Object.entries(value)) {
              result[k] = this.#parseTag(tagName + "." + k, v);
            }
            return result;
          }
          if (typeof value === "string") {
            const b = BinaryField_1.BinaryField.fromRawValue(value);
            if (b != null)
              return b;
            if (/Valid$/.test(tagName)) {
              const b2 = (0, Boolean_1.toBoolean)(value);
              if (b2 != null)
                return b2;
            }
            if (MaybeDateOrTimeRe.test(tagName) && // Reject date/time keys that are "0" or "00" (found in Canon
            // SubSecTime values)
            !OnlyZerosRE_1.OnlyZerosRE.test(value)) {
              const tz = isUtcTagName(tagName) || this.#defaultToUTC() ? "UTC" : this.options.backfillTimezones ? this.#tz() : void 0;
              const keyIncludesTime = /subsec|time/i.test(tagName);
              const keyIncludesDate = /date/i.test(tagName);
              const keyIncludesWhen = /when/i.test(tagName);
              const result = (keyIncludesTime || keyIncludesDate || keyIncludesWhen ? ExifDateTime_1.ExifDateTime.from(value, tz) : void 0) ?? (keyIncludesTime || keyIncludesWhen ? ExifTime_1.ExifTime.fromEXIF(value, tz) : void 0) ?? (keyIncludesDate || keyIncludesWhen ? ExifDate_1.ExifDate.from(value) : void 0) ?? value;
              const defaultTz = this.#tz();
              if (this.options.backfillTimezones && result != null && defaultTz != null && result instanceof ExifDateTime_1.ExifDateTime && this.#defaultToUTC() && !isUtcTagName(tagName) && true === result.inferredZone) {
                return result.setZone(defaultTz);
              }
              return result;
            }
          }
          return value;
        } catch (e) {
          this.warnings.push(`Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`);
          return value;
        }
      }
    };
    exports2.ReadTask = ReadTask;
    function isUtcTagName(tagName) {
      return tagName.includes("UTC") || tagName.startsWith("GPS");
    }
  }
});

// node_modules/exiftool-vendored/dist/RewriteAllTagsTask.js
var require_RewriteAllTagsTask = __commonJS({
  "node_modules/exiftool-vendored/dist/RewriteAllTagsTask.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RewriteAllTagsTask = void 0;
    var _path = __importStar(require("node:path"));
    var Array_1 = require_Array2();
    var ExifToolTask_1 = require_ExifToolTask();
    var FilenameCharsetArgs_1 = require_FilenameCharsetArgs();
    var RewriteAllTagsTask = class _RewriteAllTagsTask extends ExifToolTask_1.ExifToolTask {
      constructor(args, options) {
        super(args, options);
      }
      static for(imgSrc, imgDest, opts) {
        const args = (0, Array_1.compact)([
          ...FilenameCharsetArgs_1.Utf8FilenameCharsetArgs,
          "-all=",
          "-tagsfromfile",
          "@",
          "-all:all",
          "-unsafe",
          "-icc_profile",
          opts.allowMakerNoteRepair ? "-F" : void 0,
          "-out",
          _path.resolve(imgDest),
          _path.resolve(imgSrc)
        ]);
        return new _RewriteAllTagsTask(args, opts);
      }
      parse(data, error) {
        if (error != null) {
          const str = String(error);
          if (str.match(/\berror\b/i) != null && !str.match(/\bwarning\b/i)) {
            throw error;
          }
        }
        if (null == data.match(/^\s*1 image files creat/i)) {
          throw error ?? new Error(data.trim().split("\n")[0] ?? "Missing expected status message");
        }
      }
    };
    exports2.RewriteAllTagsTask = RewriteAllTagsTask;
  }
});

// node_modules/he/he.js
var require_he = __commonJS({
  "node_modules/he/he.js"(exports2, module2) {
    (function(root) {
      var freeExports = typeof exports2 == "object" && exports2;
      var freeModule = typeof module2 == "object" && module2 && module2.exports == freeExports && module2;
      var freeGlobal = typeof global == "object" && global;
      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
      }
      var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      var regexAsciiWhitelist = /[\x01-\x7F]/g;
      var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
      var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
      var encodeMap = { "\xAD": "shy", "\u200C": "zwnj", "\u200D": "zwj", "\u200E": "lrm", "\u2063": "ic", "\u2062": "it", "\u2061": "af", "\u200F": "rlm", "\u200B": "ZeroWidthSpace", "\u2060": "NoBreak", "\u0311": "DownBreve", "\u20DB": "tdot", "\u20DC": "DotDot", "	": "Tab", "\n": "NewLine", "\u2008": "puncsp", "\u205F": "MediumSpace", "\u2009": "thinsp", "\u200A": "hairsp", "\u2004": "emsp13", "\u2002": "ensp", "\u2005": "emsp14", "\u2003": "emsp", "\u2007": "numsp", "\xA0": "nbsp", "\u205F\u200A": "ThickSpace", "\u203E": "oline", "_": "lowbar", "\u2010": "dash", "\u2013": "ndash", "\u2014": "mdash", "\u2015": "horbar", ",": "comma", ";": "semi", "\u204F": "bsemi", ":": "colon", "\u2A74": "Colone", "!": "excl", "\xA1": "iexcl", "?": "quest", "\xBF": "iquest", ".": "period", "\u2025": "nldr", "\u2026": "mldr", "\xB7": "middot", "'": "apos", "\u2018": "lsquo", "\u2019": "rsquo", "\u201A": "sbquo", "\u2039": "lsaquo", "\u203A": "rsaquo", '"': "quot", "\u201C": "ldquo", "\u201D": "rdquo", "\u201E": "bdquo", "\xAB": "laquo", "\xBB": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "\u2308": "lceil", "\u2309": "rceil", "\u230A": "lfloor", "\u230B": "rfloor", "\u2985": "lopar", "\u2986": "ropar", "\u298B": "lbrke", "\u298C": "rbrke", "\u298D": "lbrkslu", "\u298E": "rbrksld", "\u298F": "lbrksld", "\u2990": "rbrkslu", "\u2991": "langd", "\u2992": "rangd", "\u2993": "lparlt", "\u2994": "rpargt", "\u2995": "gtlPar", "\u2996": "ltrPar", "\u27E6": "lobrk", "\u27E7": "robrk", "\u27E8": "lang", "\u27E9": "rang", "\u27EA": "Lang", "\u27EB": "Rang", "\u27EC": "loang", "\u27ED": "roang", "\u2772": "lbbrk", "\u2773": "rbbrk", "\u2016": "Vert", "\xA7": "sect", "\xB6": "para", "@": "commat", "*": "ast", "/": "sol", "undefined": null, "&": "amp", "#": "num", "%": "percnt", "\u2030": "permil", "\u2031": "pertenk", "\u2020": "dagger", "\u2021": "Dagger", "\u2022": "bull", "\u2043": "hybull", "\u2032": "prime", "\u2033": "Prime", "\u2034": "tprime", "\u2057": "qprime", "\u2035": "bprime", "\u2041": "caret", "`": "grave", "\xB4": "acute", "\u02DC": "tilde", "^": "Hat", "\xAF": "macr", "\u02D8": "breve", "\u02D9": "dot", "\xA8": "die", "\u02DA": "ring", "\u02DD": "dblac", "\xB8": "cedil", "\u02DB": "ogon", "\u02C6": "circ", "\u02C7": "caron", "\xB0": "deg", "\xA9": "copy", "\xAE": "reg", "\u2117": "copysr", "\u2118": "wp", "\u211E": "rx", "\u2127": "mho", "\u2129": "iiota", "\u2190": "larr", "\u219A": "nlarr", "\u2192": "rarr", "\u219B": "nrarr", "\u2191": "uarr", "\u2193": "darr", "\u2194": "harr", "\u21AE": "nharr", "\u2195": "varr", "\u2196": "nwarr", "\u2197": "nearr", "\u2198": "searr", "\u2199": "swarr", "\u219D": "rarrw", "\u219D\u0338": "nrarrw", "\u219E": "Larr", "\u219F": "Uarr", "\u21A0": "Rarr", "\u21A1": "Darr", "\u21A2": "larrtl", "\u21A3": "rarrtl", "\u21A4": "mapstoleft", "\u21A5": "mapstoup", "\u21A6": "map", "\u21A7": "mapstodown", "\u21A9": "larrhk", "\u21AA": "rarrhk", "\u21AB": "larrlp", "\u21AC": "rarrlp", "\u21AD": "harrw", "\u21B0": "lsh", "\u21B1": "rsh", "\u21B2": "ldsh", "\u21B3": "rdsh", "\u21B5": "crarr", "\u21B6": "cularr", "\u21B7": "curarr", "\u21BA": "olarr", "\u21BB": "orarr", "\u21BC": "lharu", "\u21BD": "lhard", "\u21BE": "uharr", "\u21BF": "uharl", "\u21C0": "rharu", "\u21C1": "rhard", "\u21C2": "dharr", "\u21C3": "dharl", "\u21C4": "rlarr", "\u21C5": "udarr", "\u21C6": "lrarr", "\u21C7": "llarr", "\u21C8": "uuarr", "\u21C9": "rrarr", "\u21CA": "ddarr", "\u21CB": "lrhar", "\u21CC": "rlhar", "\u21D0": "lArr", "\u21CD": "nlArr", "\u21D1": "uArr", "\u21D2": "rArr", "\u21CF": "nrArr", "\u21D3": "dArr", "\u21D4": "iff", "\u21CE": "nhArr", "\u21D5": "vArr", "\u21D6": "nwArr", "\u21D7": "neArr", "\u21D8": "seArr", "\u21D9": "swArr", "\u21DA": "lAarr", "\u21DB": "rAarr", "\u21DD": "zigrarr", "\u21E4": "larrb", "\u21E5": "rarrb", "\u21F5": "duarr", "\u21FD": "loarr", "\u21FE": "roarr", "\u21FF": "hoarr", "\u2200": "forall", "\u2201": "comp", "\u2202": "part", "\u2202\u0338": "npart", "\u2203": "exist", "\u2204": "nexist", "\u2205": "empty", "\u2207": "Del", "\u2208": "in", "\u2209": "notin", "\u220B": "ni", "\u220C": "notni", "\u03F6": "bepsi", "\u220F": "prod", "\u2210": "coprod", "\u2211": "sum", "+": "plus", "\xB1": "pm", "\xF7": "div", "\xD7": "times", "<": "lt", "\u226E": "nlt", "<\u20D2": "nvlt", "=": "equals", "\u2260": "ne", "=\u20E5": "bne", "\u2A75": "Equal", ">": "gt", "\u226F": "ngt", ">\u20D2": "nvgt", "\xAC": "not", "|": "vert", "\xA6": "brvbar", "\u2212": "minus", "\u2213": "mp", "\u2214": "plusdo", "\u2044": "frasl", "\u2216": "setmn", "\u2217": "lowast", "\u2218": "compfn", "\u221A": "Sqrt", "\u221D": "prop", "\u221E": "infin", "\u221F": "angrt", "\u2220": "ang", "\u2220\u20D2": "nang", "\u2221": "angmsd", "\u2222": "angsph", "\u2223": "mid", "\u2224": "nmid", "\u2225": "par", "\u2226": "npar", "\u2227": "and", "\u2228": "or", "\u2229": "cap", "\u2229\uFE00": "caps", "\u222A": "cup", "\u222A\uFE00": "cups", "\u222B": "int", "\u222C": "Int", "\u222D": "tint", "\u2A0C": "qint", "\u222E": "oint", "\u222F": "Conint", "\u2230": "Cconint", "\u2231": "cwint", "\u2232": "cwconint", "\u2233": "awconint", "\u2234": "there4", "\u2235": "becaus", "\u2236": "ratio", "\u2237": "Colon", "\u2238": "minusd", "\u223A": "mDDot", "\u223B": "homtht", "\u223C": "sim", "\u2241": "nsim", "\u223C\u20D2": "nvsim", "\u223D": "bsim", "\u223D\u0331": "race", "\u223E": "ac", "\u223E\u0333": "acE", "\u223F": "acd", "\u2240": "wr", "\u2242": "esim", "\u2242\u0338": "nesim", "\u2243": "sime", "\u2244": "nsime", "\u2245": "cong", "\u2247": "ncong", "\u2246": "simne", "\u2248": "ap", "\u2249": "nap", "\u224A": "ape", "\u224B": "apid", "\u224B\u0338": "napid", "\u224C": "bcong", "\u224D": "CupCap", "\u226D": "NotCupCap", "\u224D\u20D2": "nvap", "\u224E": "bump", "\u224E\u0338": "nbump", "\u224F": "bumpe", "\u224F\u0338": "nbumpe", "\u2250": "doteq", "\u2250\u0338": "nedot", "\u2251": "eDot", "\u2252": "efDot", "\u2253": "erDot", "\u2254": "colone", "\u2255": "ecolon", "\u2256": "ecir", "\u2257": "cire", "\u2259": "wedgeq", "\u225A": "veeeq", "\u225C": "trie", "\u225F": "equest", "\u2261": "equiv", "\u2262": "nequiv", "\u2261\u20E5": "bnequiv", "\u2264": "le", "\u2270": "nle", "\u2264\u20D2": "nvle", "\u2265": "ge", "\u2271": "nge", "\u2265\u20D2": "nvge", "\u2266": "lE", "\u2266\u0338": "nlE", "\u2267": "gE", "\u2267\u0338": "ngE", "\u2268\uFE00": "lvnE", "\u2268": "lnE", "\u2269": "gnE", "\u2269\uFE00": "gvnE", "\u226A": "ll", "\u226A\u0338": "nLtv", "\u226A\u20D2": "nLt", "\u226B": "gg", "\u226B\u0338": "nGtv", "\u226B\u20D2": "nGt", "\u226C": "twixt", "\u2272": "lsim", "\u2274": "nlsim", "\u2273": "gsim", "\u2275": "ngsim", "\u2276": "lg", "\u2278": "ntlg", "\u2277": "gl", "\u2279": "ntgl", "\u227A": "pr", "\u2280": "npr", "\u227B": "sc", "\u2281": "nsc", "\u227C": "prcue", "\u22E0": "nprcue", "\u227D": "sccue", "\u22E1": "nsccue", "\u227E": "prsim", "\u227F": "scsim", "\u227F\u0338": "NotSucceedsTilde", "\u2282": "sub", "\u2284": "nsub", "\u2282\u20D2": "vnsub", "\u2283": "sup", "\u2285": "nsup", "\u2283\u20D2": "vnsup", "\u2286": "sube", "\u2288": "nsube", "\u2287": "supe", "\u2289": "nsupe", "\u228A\uFE00": "vsubne", "\u228A": "subne", "\u228B\uFE00": "vsupne", "\u228B": "supne", "\u228D": "cupdot", "\u228E": "uplus", "\u228F": "sqsub", "\u228F\u0338": "NotSquareSubset", "\u2290": "sqsup", "\u2290\u0338": "NotSquareSuperset", "\u2291": "sqsube", "\u22E2": "nsqsube", "\u2292": "sqsupe", "\u22E3": "nsqsupe", "\u2293": "sqcap", "\u2293\uFE00": "sqcaps", "\u2294": "sqcup", "\u2294\uFE00": "sqcups", "\u2295": "oplus", "\u2296": "ominus", "\u2297": "otimes", "\u2298": "osol", "\u2299": "odot", "\u229A": "ocir", "\u229B": "oast", "\u229D": "odash", "\u229E": "plusb", "\u229F": "minusb", "\u22A0": "timesb", "\u22A1": "sdotb", "\u22A2": "vdash", "\u22AC": "nvdash", "\u22A3": "dashv", "\u22A4": "top", "\u22A5": "bot", "\u22A7": "models", "\u22A8": "vDash", "\u22AD": "nvDash", "\u22A9": "Vdash", "\u22AE": "nVdash", "\u22AA": "Vvdash", "\u22AB": "VDash", "\u22AF": "nVDash", "\u22B0": "prurel", "\u22B2": "vltri", "\u22EA": "nltri", "\u22B3": "vrtri", "\u22EB": "nrtri", "\u22B4": "ltrie", "\u22EC": "nltrie", "\u22B4\u20D2": "nvltrie", "\u22B5": "rtrie", "\u22ED": "nrtrie", "\u22B5\u20D2": "nvrtrie", "\u22B6": "origof", "\u22B7": "imof", "\u22B8": "mumap", "\u22B9": "hercon", "\u22BA": "intcal", "\u22BB": "veebar", "\u22BD": "barvee", "\u22BE": "angrtvb", "\u22BF": "lrtri", "\u22C0": "Wedge", "\u22C1": "Vee", "\u22C2": "xcap", "\u22C3": "xcup", "\u22C4": "diam", "\u22C5": "sdot", "\u22C6": "Star", "\u22C7": "divonx", "\u22C8": "bowtie", "\u22C9": "ltimes", "\u22CA": "rtimes", "\u22CB": "lthree", "\u22CC": "rthree", "\u22CD": "bsime", "\u22CE": "cuvee", "\u22CF": "cuwed", "\u22D0": "Sub", "\u22D1": "Sup", "\u22D2": "Cap", "\u22D3": "Cup", "\u22D4": "fork", "\u22D5": "epar", "\u22D6": "ltdot", "\u22D7": "gtdot", "\u22D8": "Ll", "\u22D8\u0338": "nLl", "\u22D9": "Gg", "\u22D9\u0338": "nGg", "\u22DA\uFE00": "lesg", "\u22DA": "leg", "\u22DB": "gel", "\u22DB\uFE00": "gesl", "\u22DE": "cuepr", "\u22DF": "cuesc", "\u22E6": "lnsim", "\u22E7": "gnsim", "\u22E8": "prnsim", "\u22E9": "scnsim", "\u22EE": "vellip", "\u22EF": "ctdot", "\u22F0": "utdot", "\u22F1": "dtdot", "\u22F2": "disin", "\u22F3": "isinsv", "\u22F4": "isins", "\u22F5": "isindot", "\u22F5\u0338": "notindot", "\u22F6": "notinvc", "\u22F7": "notinvb", "\u22F9": "isinE", "\u22F9\u0338": "notinE", "\u22FA": "nisd", "\u22FB": "xnis", "\u22FC": "nis", "\u22FD": "notnivc", "\u22FE": "notnivb", "\u2305": "barwed", "\u2306": "Barwed", "\u230C": "drcrop", "\u230D": "dlcrop", "\u230E": "urcrop", "\u230F": "ulcrop", "\u2310": "bnot", "\u2312": "profline", "\u2313": "profsurf", "\u2315": "telrec", "\u2316": "target", "\u231C": "ulcorn", "\u231D": "urcorn", "\u231E": "dlcorn", "\u231F": "drcorn", "\u2322": "frown", "\u2323": "smile", "\u232D": "cylcty", "\u232E": "profalar", "\u2336": "topbot", "\u233D": "ovbar", "\u233F": "solbar", "\u237C": "angzarr", "\u23B0": "lmoust", "\u23B1": "rmoust", "\u23B4": "tbrk", "\u23B5": "bbrk", "\u23B6": "bbrktbrk", "\u23DC": "OverParenthesis", "\u23DD": "UnderParenthesis", "\u23DE": "OverBrace", "\u23DF": "UnderBrace", "\u23E2": "trpezium", "\u23E7": "elinters", "\u2423": "blank", "\u2500": "boxh", "\u2502": "boxv", "\u250C": "boxdr", "\u2510": "boxdl", "\u2514": "boxur", "\u2518": "boxul", "\u251C": "boxvr", "\u2524": "boxvl", "\u252C": "boxhd", "\u2534": "boxhu", "\u253C": "boxvh", "\u2550": "boxH", "\u2551": "boxV", "\u2552": "boxdR", "\u2553": "boxDr", "\u2554": "boxDR", "\u2555": "boxdL", "\u2556": "boxDl", "\u2557": "boxDL", "\u2558": "boxuR", "\u2559": "boxUr", "\u255A": "boxUR", "\u255B": "boxuL", "\u255C": "boxUl", "\u255D": "boxUL", "\u255E": "boxvR", "\u255F": "boxVr", "\u2560": "boxVR", "\u2561": "boxvL", "\u2562": "boxVl", "\u2563": "boxVL", "\u2564": "boxHd", "\u2565": "boxhD", "\u2566": "boxHD", "\u2567": "boxHu", "\u2568": "boxhU", "\u2569": "boxHU", "\u256A": "boxvH", "\u256B": "boxVh", "\u256C": "boxVH", "\u2580": "uhblk", "\u2584": "lhblk", "\u2588": "block", "\u2591": "blk14", "\u2592": "blk12", "\u2593": "blk34", "\u25A1": "squ", "\u25AA": "squf", "\u25AB": "EmptyVerySmallSquare", "\u25AD": "rect", "\u25AE": "marker", "\u25B1": "fltns", "\u25B3": "xutri", "\u25B4": "utrif", "\u25B5": "utri", "\u25B8": "rtrif", "\u25B9": "rtri", "\u25BD": "xdtri", "\u25BE": "dtrif", "\u25BF": "dtri", "\u25C2": "ltrif", "\u25C3": "ltri", "\u25CA": "loz", "\u25CB": "cir", "\u25EC": "tridot", "\u25EF": "xcirc", "\u25F8": "ultri", "\u25F9": "urtri", "\u25FA": "lltri", "\u25FB": "EmptySmallSquare", "\u25FC": "FilledSmallSquare", "\u2605": "starf", "\u2606": "star", "\u260E": "phone", "\u2640": "female", "\u2642": "male", "\u2660": "spades", "\u2663": "clubs", "\u2665": "hearts", "\u2666": "diams", "\u266A": "sung", "\u2713": "check", "\u2717": "cross", "\u2720": "malt", "\u2736": "sext", "\u2758": "VerticalSeparator", "\u27C8": "bsolhsub", "\u27C9": "suphsol", "\u27F5": "xlarr", "\u27F6": "xrarr", "\u27F7": "xharr", "\u27F8": "xlArr", "\u27F9": "xrArr", "\u27FA": "xhArr", "\u27FC": "xmap", "\u27FF": "dzigrarr", "\u2902": "nvlArr", "\u2903": "nvrArr", "\u2904": "nvHarr", "\u2905": "Map", "\u290C": "lbarr", "\u290D": "rbarr", "\u290E": "lBarr", "\u290F": "rBarr", "\u2910": "RBarr", "\u2911": "DDotrahd", "\u2912": "UpArrowBar", "\u2913": "DownArrowBar", "\u2916": "Rarrtl", "\u2919": "latail", "\u291A": "ratail", "\u291B": "lAtail", "\u291C": "rAtail", "\u291D": "larrfs", "\u291E": "rarrfs", "\u291F": "larrbfs", "\u2920": "rarrbfs", "\u2923": "nwarhk", "\u2924": "nearhk", "\u2925": "searhk", "\u2926": "swarhk", "\u2927": "nwnear", "\u2928": "toea", "\u2929": "tosa", "\u292A": "swnwar", "\u2933": "rarrc", "\u2933\u0338": "nrarrc", "\u2935": "cudarrr", "\u2936": "ldca", "\u2937": "rdca", "\u2938": "cudarrl", "\u2939": "larrpl", "\u293C": "curarrm", "\u293D": "cularrp", "\u2945": "rarrpl", "\u2948": "harrcir", "\u2949": "Uarrocir", "\u294A": "lurdshar", "\u294B": "ldrushar", "\u294E": "LeftRightVector", "\u294F": "RightUpDownVector", "\u2950": "DownLeftRightVector", "\u2951": "LeftUpDownVector", "\u2952": "LeftVectorBar", "\u2953": "RightVectorBar", "\u2954": "RightUpVectorBar", "\u2955": "RightDownVectorBar", "\u2956": "DownLeftVectorBar", "\u2957": "DownRightVectorBar", "\u2958": "LeftUpVectorBar", "\u2959": "LeftDownVectorBar", "\u295A": "LeftTeeVector", "\u295B": "RightTeeVector", "\u295C": "RightUpTeeVector", "\u295D": "RightDownTeeVector", "\u295E": "DownLeftTeeVector", "\u295F": "DownRightTeeVector", "\u2960": "LeftUpTeeVector", "\u2961": "LeftDownTeeVector", "\u2962": "lHar", "\u2963": "uHar", "\u2964": "rHar", "\u2965": "dHar", "\u2966": "luruhar", "\u2967": "ldrdhar", "\u2968": "ruluhar", "\u2969": "rdldhar", "\u296A": "lharul", "\u296B": "llhard", "\u296C": "rharul", "\u296D": "lrhard", "\u296E": "udhar", "\u296F": "duhar", "\u2970": "RoundImplies", "\u2971": "erarr", "\u2972": "simrarr", "\u2973": "larrsim", "\u2974": "rarrsim", "\u2975": "rarrap", "\u2976": "ltlarr", "\u2978": "gtrarr", "\u2979": "subrarr", "\u297B": "suplarr", "\u297C": "lfisht", "\u297D": "rfisht", "\u297E": "ufisht", "\u297F": "dfisht", "\u299A": "vzigzag", "\u299C": "vangrt", "\u299D": "angrtvbd", "\u29A4": "ange", "\u29A5": "range", "\u29A6": "dwangle", "\u29A7": "uwangle", "\u29A8": "angmsdaa", "\u29A9": "angmsdab", "\u29AA": "angmsdac", "\u29AB": "angmsdad", "\u29AC": "angmsdae", "\u29AD": "angmsdaf", "\u29AE": "angmsdag", "\u29AF": "angmsdah", "\u29B0": "bemptyv", "\u29B1": "demptyv", "\u29B2": "cemptyv", "\u29B3": "raemptyv", "\u29B4": "laemptyv", "\u29B5": "ohbar", "\u29B6": "omid", "\u29B7": "opar", "\u29B9": "operp", "\u29BB": "olcross", "\u29BC": "odsold", "\u29BE": "olcir", "\u29BF": "ofcir", "\u29C0": "olt", "\u29C1": "ogt", "\u29C2": "cirscir", "\u29C3": "cirE", "\u29C4": "solb", "\u29C5": "bsolb", "\u29C9": "boxbox", "\u29CD": "trisb", "\u29CE": "rtriltri", "\u29CF": "LeftTriangleBar", "\u29CF\u0338": "NotLeftTriangleBar", "\u29D0": "RightTriangleBar", "\u29D0\u0338": "NotRightTriangleBar", "\u29DC": "iinfin", "\u29DD": "infintie", "\u29DE": "nvinfin", "\u29E3": "eparsl", "\u29E4": "smeparsl", "\u29E5": "eqvparsl", "\u29EB": "lozf", "\u29F4": "RuleDelayed", "\u29F6": "dsol", "\u2A00": "xodot", "\u2A01": "xoplus", "\u2A02": "xotime", "\u2A04": "xuplus", "\u2A06": "xsqcup", "\u2A0D": "fpartint", "\u2A10": "cirfnint", "\u2A11": "awint", "\u2A12": "rppolint", "\u2A13": "scpolint", "\u2A14": "npolint", "\u2A15": "pointint", "\u2A16": "quatint", "\u2A17": "intlarhk", "\u2A22": "pluscir", "\u2A23": "plusacir", "\u2A24": "simplus", "\u2A25": "plusdu", "\u2A26": "plussim", "\u2A27": "plustwo", "\u2A29": "mcomma", "\u2A2A": "minusdu", "\u2A2D": "loplus", "\u2A2E": "roplus", "\u2A2F": "Cross", "\u2A30": "timesd", "\u2A31": "timesbar", "\u2A33": "smashp", "\u2A34": "lotimes", "\u2A35": "rotimes", "\u2A36": "otimesas", "\u2A37": "Otimes", "\u2A38": "odiv", "\u2A39": "triplus", "\u2A3A": "triminus", "\u2A3B": "tritime", "\u2A3C": "iprod", "\u2A3F": "amalg", "\u2A40": "capdot", "\u2A42": "ncup", "\u2A43": "ncap", "\u2A44": "capand", "\u2A45": "cupor", "\u2A46": "cupcap", "\u2A47": "capcup", "\u2A48": "cupbrcap", "\u2A49": "capbrcup", "\u2A4A": "cupcup", "\u2A4B": "capcap", "\u2A4C": "ccups", "\u2A4D": "ccaps", "\u2A50": "ccupssm", "\u2A53": "And", "\u2A54": "Or", "\u2A55": "andand", "\u2A56": "oror", "\u2A57": "orslope", "\u2A58": "andslope", "\u2A5A": "andv", "\u2A5B": "orv", "\u2A5C": "andd", "\u2A5D": "ord", "\u2A5F": "wedbar", "\u2A66": "sdote", "\u2A6A": "simdot", "\u2A6D": "congdot", "\u2A6D\u0338": "ncongdot", "\u2A6E": "easter", "\u2A6F": "apacir", "\u2A70": "apE", "\u2A70\u0338": "napE", "\u2A71": "eplus", "\u2A72": "pluse", "\u2A73": "Esim", "\u2A77": "eDDot", "\u2A78": "equivDD", "\u2A79": "ltcir", "\u2A7A": "gtcir", "\u2A7B": "ltquest", "\u2A7C": "gtquest", "\u2A7D": "les", "\u2A7D\u0338": "nles", "\u2A7E": "ges", "\u2A7E\u0338": "nges", "\u2A7F": "lesdot", "\u2A80": "gesdot", "\u2A81": "lesdoto", "\u2A82": "gesdoto", "\u2A83": "lesdotor", "\u2A84": "gesdotol", "\u2A85": "lap", "\u2A86": "gap", "\u2A87": "lne", "\u2A88": "gne", "\u2A89": "lnap", "\u2A8A": "gnap", "\u2A8B": "lEg", "\u2A8C": "gEl", "\u2A8D": "lsime", "\u2A8E": "gsime", "\u2A8F": "lsimg", "\u2A90": "gsiml", "\u2A91": "lgE", "\u2A92": "glE", "\u2A93": "lesges", "\u2A94": "gesles", "\u2A95": "els", "\u2A96": "egs", "\u2A97": "elsdot", "\u2A98": "egsdot", "\u2A99": "el", "\u2A9A": "eg", "\u2A9D": "siml", "\u2A9E": "simg", "\u2A9F": "simlE", "\u2AA0": "simgE", "\u2AA1": "LessLess", "\u2AA1\u0338": "NotNestedLessLess", "\u2AA2": "GreaterGreater", "\u2AA2\u0338": "NotNestedGreaterGreater", "\u2AA4": "glj", "\u2AA5": "gla", "\u2AA6": "ltcc", "\u2AA7": "gtcc", "\u2AA8": "lescc", "\u2AA9": "gescc", "\u2AAA": "smt", "\u2AAB": "lat", "\u2AAC": "smte", "\u2AAC\uFE00": "smtes", "\u2AAD": "late", "\u2AAD\uFE00": "lates", "\u2AAE": "bumpE", "\u2AAF": "pre", "\u2AAF\u0338": "npre", "\u2AB0": "sce", "\u2AB0\u0338": "nsce", "\u2AB3": "prE", "\u2AB4": "scE", "\u2AB5": "prnE", "\u2AB6": "scnE", "\u2AB7": "prap", "\u2AB8": "scap", "\u2AB9": "prnap", "\u2ABA": "scnap", "\u2ABB": "Pr", "\u2ABC": "Sc", "\u2ABD": "subdot", "\u2ABE": "supdot", "\u2ABF": "subplus", "\u2AC0": "supplus", "\u2AC1": "submult", "\u2AC2": "supmult", "\u2AC3": "subedot", "\u2AC4": "supedot", "\u2AC5": "subE", "\u2AC5\u0338": "nsubE", "\u2AC6": "supE", "\u2AC6\u0338": "nsupE", "\u2AC7": "subsim", "\u2AC8": "supsim", "\u2ACB\uFE00": "vsubnE", "\u2ACB": "subnE", "\u2ACC\uFE00": "vsupnE", "\u2ACC": "supnE", "\u2ACF": "csub", "\u2AD0": "csup", "\u2AD1": "csube", "\u2AD2": "csupe", "\u2AD3": "subsup", "\u2AD4": "supsub", "\u2AD5": "subsub", "\u2AD6": "supsup", "\u2AD7": "suphsub", "\u2AD8": "supdsub", "\u2AD9": "forkv", "\u2ADA": "topfork", "\u2ADB": "mlcp", "\u2AE4": "Dashv", "\u2AE6": "Vdashl", "\u2AE7": "Barv", "\u2AE8": "vBar", "\u2AE9": "vBarv", "\u2AEB": "Vbar", "\u2AEC": "Not", "\u2AED": "bNot", "\u2AEE": "rnmid", "\u2AEF": "cirmid", "\u2AF0": "midcir", "\u2AF1": "topcir", "\u2AF2": "nhpar", "\u2AF3": "parsim", "\u2AFD": "parsl", "\u2AFD\u20E5": "nparsl", "\u266D": "flat", "\u266E": "natur", "\u266F": "sharp", "\xA4": "curren", "\xA2": "cent", "$": "dollar", "\xA3": "pound", "\xA5": "yen", "\u20AC": "euro", "\xB9": "sup1", "\xBD": "half", "\u2153": "frac13", "\xBC": "frac14", "\u2155": "frac15", "\u2159": "frac16", "\u215B": "frac18", "\xB2": "sup2", "\u2154": "frac23", "\u2156": "frac25", "\xB3": "sup3", "\xBE": "frac34", "\u2157": "frac35", "\u215C": "frac38", "\u2158": "frac45", "\u215A": "frac56", "\u215D": "frac58", "\u215E": "frac78", "\u{1D4B6}": "ascr", "\u{1D552}": "aopf", "\u{1D51E}": "afr", "\u{1D538}": "Aopf", "\u{1D504}": "Afr", "\u{1D49C}": "Ascr", "\xAA": "ordf", "\xE1": "aacute", "\xC1": "Aacute", "\xE0": "agrave", "\xC0": "Agrave", "\u0103": "abreve", "\u0102": "Abreve", "\xE2": "acirc", "\xC2": "Acirc", "\xE5": "aring", "\xC5": "angst", "\xE4": "auml", "\xC4": "Auml", "\xE3": "atilde", "\xC3": "Atilde", "\u0105": "aogon", "\u0104": "Aogon", "\u0101": "amacr", "\u0100": "Amacr", "\xE6": "aelig", "\xC6": "AElig", "\u{1D4B7}": "bscr", "\u{1D553}": "bopf", "\u{1D51F}": "bfr", "\u{1D539}": "Bopf", "\u212C": "Bscr", "\u{1D505}": "Bfr", "\u{1D520}": "cfr", "\u{1D4B8}": "cscr", "\u{1D554}": "copf", "\u212D": "Cfr", "\u{1D49E}": "Cscr", "\u2102": "Copf", "\u0107": "cacute", "\u0106": "Cacute", "\u0109": "ccirc", "\u0108": "Ccirc", "\u010D": "ccaron", "\u010C": "Ccaron", "\u010B": "cdot", "\u010A": "Cdot", "\xE7": "ccedil", "\xC7": "Ccedil", "\u2105": "incare", "\u{1D521}": "dfr", "\u2146": "dd", "\u{1D555}": "dopf", "\u{1D4B9}": "dscr", "\u{1D49F}": "Dscr", "\u{1D507}": "Dfr", "\u2145": "DD", "\u{1D53B}": "Dopf", "\u010F": "dcaron", "\u010E": "Dcaron", "\u0111": "dstrok", "\u0110": "Dstrok", "\xF0": "eth", "\xD0": "ETH", "\u2147": "ee", "\u212F": "escr", "\u{1D522}": "efr", "\u{1D556}": "eopf", "\u2130": "Escr", "\u{1D508}": "Efr", "\u{1D53C}": "Eopf", "\xE9": "eacute", "\xC9": "Eacute", "\xE8": "egrave", "\xC8": "Egrave", "\xEA": "ecirc", "\xCA": "Ecirc", "\u011B": "ecaron", "\u011A": "Ecaron", "\xEB": "euml", "\xCB": "Euml", "\u0117": "edot", "\u0116": "Edot", "\u0119": "eogon", "\u0118": "Eogon", "\u0113": "emacr", "\u0112": "Emacr", "\u{1D523}": "ffr", "\u{1D557}": "fopf", "\u{1D4BB}": "fscr", "\u{1D509}": "Ffr", "\u{1D53D}": "Fopf", "\u2131": "Fscr", "\uFB00": "fflig", "\uFB03": "ffilig", "\uFB04": "ffllig", "\uFB01": "filig", "fj": "fjlig", "\uFB02": "fllig", "\u0192": "fnof", "\u210A": "gscr", "\u{1D558}": "gopf", "\u{1D524}": "gfr", "\u{1D4A2}": "Gscr", "\u{1D53E}": "Gopf", "\u{1D50A}": "Gfr", "\u01F5": "gacute", "\u011F": "gbreve", "\u011E": "Gbreve", "\u011D": "gcirc", "\u011C": "Gcirc", "\u0121": "gdot", "\u0120": "Gdot", "\u0122": "Gcedil", "\u{1D525}": "hfr", "\u210E": "planckh", "\u{1D4BD}": "hscr", "\u{1D559}": "hopf", "\u210B": "Hscr", "\u210C": "Hfr", "\u210D": "Hopf", "\u0125": "hcirc", "\u0124": "Hcirc", "\u210F": "hbar", "\u0127": "hstrok", "\u0126": "Hstrok", "\u{1D55A}": "iopf", "\u{1D526}": "ifr", "\u{1D4BE}": "iscr", "\u2148": "ii", "\u{1D540}": "Iopf", "\u2110": "Iscr", "\u2111": "Im", "\xED": "iacute", "\xCD": "Iacute", "\xEC": "igrave", "\xCC": "Igrave", "\xEE": "icirc", "\xCE": "Icirc", "\xEF": "iuml", "\xCF": "Iuml", "\u0129": "itilde", "\u0128": "Itilde", "\u0130": "Idot", "\u012F": "iogon", "\u012E": "Iogon", "\u012B": "imacr", "\u012A": "Imacr", "\u0133": "ijlig", "\u0132": "IJlig", "\u0131": "imath", "\u{1D4BF}": "jscr", "\u{1D55B}": "jopf", "\u{1D527}": "jfr", "\u{1D4A5}": "Jscr", "\u{1D50D}": "Jfr", "\u{1D541}": "Jopf", "\u0135": "jcirc", "\u0134": "Jcirc", "\u0237": "jmath", "\u{1D55C}": "kopf", "\u{1D4C0}": "kscr", "\u{1D528}": "kfr", "\u{1D4A6}": "Kscr", "\u{1D542}": "Kopf", "\u{1D50E}": "Kfr", "\u0137": "kcedil", "\u0136": "Kcedil", "\u{1D529}": "lfr", "\u{1D4C1}": "lscr", "\u2113": "ell", "\u{1D55D}": "lopf", "\u2112": "Lscr", "\u{1D50F}": "Lfr", "\u{1D543}": "Lopf", "\u013A": "lacute", "\u0139": "Lacute", "\u013E": "lcaron", "\u013D": "Lcaron", "\u013C": "lcedil", "\u013B": "Lcedil", "\u0142": "lstrok", "\u0141": "Lstrok", "\u0140": "lmidot", "\u013F": "Lmidot", "\u{1D52A}": "mfr", "\u{1D55E}": "mopf", "\u{1D4C2}": "mscr", "\u{1D510}": "Mfr", "\u{1D544}": "Mopf", "\u2133": "Mscr", "\u{1D52B}": "nfr", "\u{1D55F}": "nopf", "\u{1D4C3}": "nscr", "\u2115": "Nopf", "\u{1D4A9}": "Nscr", "\u{1D511}": "Nfr", "\u0144": "nacute", "\u0143": "Nacute", "\u0148": "ncaron", "\u0147": "Ncaron", "\xF1": "ntilde", "\xD1": "Ntilde", "\u0146": "ncedil", "\u0145": "Ncedil", "\u2116": "numero", "\u014B": "eng", "\u014A": "ENG", "\u{1D560}": "oopf", "\u{1D52C}": "ofr", "\u2134": "oscr", "\u{1D4AA}": "Oscr", "\u{1D512}": "Ofr", "\u{1D546}": "Oopf", "\xBA": "ordm", "\xF3": "oacute", "\xD3": "Oacute", "\xF2": "ograve", "\xD2": "Ograve", "\xF4": "ocirc", "\xD4": "Ocirc", "\xF6": "ouml", "\xD6": "Ouml", "\u0151": "odblac", "\u0150": "Odblac", "\xF5": "otilde", "\xD5": "Otilde", "\xF8": "oslash", "\xD8": "Oslash", "\u014D": "omacr", "\u014C": "Omacr", "\u0153": "oelig", "\u0152": "OElig", "\u{1D52D}": "pfr", "\u{1D4C5}": "pscr", "\u{1D561}": "popf", "\u2119": "Popf", "\u{1D513}": "Pfr", "\u{1D4AB}": "Pscr", "\u{1D562}": "qopf", "\u{1D52E}": "qfr", "\u{1D4C6}": "qscr", "\u{1D4AC}": "Qscr", "\u{1D514}": "Qfr", "\u211A": "Qopf", "\u0138": "kgreen", "\u{1D52F}": "rfr", "\u{1D563}": "ropf", "\u{1D4C7}": "rscr", "\u211B": "Rscr", "\u211C": "Re", "\u211D": "Ropf", "\u0155": "racute", "\u0154": "Racute", "\u0159": "rcaron", "\u0158": "Rcaron", "\u0157": "rcedil", "\u0156": "Rcedil", "\u{1D564}": "sopf", "\u{1D4C8}": "sscr", "\u{1D530}": "sfr", "\u{1D54A}": "Sopf", "\u{1D516}": "Sfr", "\u{1D4AE}": "Sscr", "\u24C8": "oS", "\u015B": "sacute", "\u015A": "Sacute", "\u015D": "scirc", "\u015C": "Scirc", "\u0161": "scaron", "\u0160": "Scaron", "\u015F": "scedil", "\u015E": "Scedil", "\xDF": "szlig", "\u{1D531}": "tfr", "\u{1D4C9}": "tscr", "\u{1D565}": "topf", "\u{1D4AF}": "Tscr", "\u{1D517}": "Tfr", "\u{1D54B}": "Topf", "\u0165": "tcaron", "\u0164": "Tcaron", "\u0163": "tcedil", "\u0162": "Tcedil", "\u2122": "trade", "\u0167": "tstrok", "\u0166": "Tstrok", "\u{1D4CA}": "uscr", "\u{1D566}": "uopf", "\u{1D532}": "ufr", "\u{1D54C}": "Uopf", "\u{1D518}": "Ufr", "\u{1D4B0}": "Uscr", "\xFA": "uacute", "\xDA": "Uacute", "\xF9": "ugrave", "\xD9": "Ugrave", "\u016D": "ubreve", "\u016C": "Ubreve", "\xFB": "ucirc", "\xDB": "Ucirc", "\u016F": "uring", "\u016E": "Uring", "\xFC": "uuml", "\xDC": "Uuml", "\u0171": "udblac", "\u0170": "Udblac", "\u0169": "utilde", "\u0168": "Utilde", "\u0173": "uogon", "\u0172": "Uogon", "\u016B": "umacr", "\u016A": "Umacr", "\u{1D533}": "vfr", "\u{1D567}": "vopf", "\u{1D4CB}": "vscr", "\u{1D519}": "Vfr", "\u{1D54D}": "Vopf", "\u{1D4B1}": "Vscr", "\u{1D568}": "wopf", "\u{1D4CC}": "wscr", "\u{1D534}": "wfr", "\u{1D4B2}": "Wscr", "\u{1D54E}": "Wopf", "\u{1D51A}": "Wfr", "\u0175": "wcirc", "\u0174": "Wcirc", "\u{1D535}": "xfr", "\u{1D4CD}": "xscr", "\u{1D569}": "xopf", "\u{1D54F}": "Xopf", "\u{1D51B}": "Xfr", "\u{1D4B3}": "Xscr", "\u{1D536}": "yfr", "\u{1D4CE}": "yscr", "\u{1D56A}": "yopf", "\u{1D4B4}": "Yscr", "\u{1D51C}": "Yfr", "\u{1D550}": "Yopf", "\xFD": "yacute", "\xDD": "Yacute", "\u0177": "ycirc", "\u0176": "Ycirc", "\xFF": "yuml", "\u0178": "Yuml", "\u{1D4CF}": "zscr", "\u{1D537}": "zfr", "\u{1D56B}": "zopf", "\u2128": "Zfr", "\u2124": "Zopf", "\u{1D4B5}": "Zscr", "\u017A": "zacute", "\u0179": "Zacute", "\u017E": "zcaron", "\u017D": "Zcaron", "\u017C": "zdot", "\u017B": "Zdot", "\u01B5": "imped", "\xFE": "thorn", "\xDE": "THORN", "\u0149": "napos", "\u03B1": "alpha", "\u0391": "Alpha", "\u03B2": "beta", "\u0392": "Beta", "\u03B3": "gamma", "\u0393": "Gamma", "\u03B4": "delta", "\u0394": "Delta", "\u03B5": "epsi", "\u03F5": "epsiv", "\u0395": "Epsilon", "\u03DD": "gammad", "\u03DC": "Gammad", "\u03B6": "zeta", "\u0396": "Zeta", "\u03B7": "eta", "\u0397": "Eta", "\u03B8": "theta", "\u03D1": "thetav", "\u0398": "Theta", "\u03B9": "iota", "\u0399": "Iota", "\u03BA": "kappa", "\u03F0": "kappav", "\u039A": "Kappa", "\u03BB": "lambda", "\u039B": "Lambda", "\u03BC": "mu", "\xB5": "micro", "\u039C": "Mu", "\u03BD": "nu", "\u039D": "Nu", "\u03BE": "xi", "\u039E": "Xi", "\u03BF": "omicron", "\u039F": "Omicron", "\u03C0": "pi", "\u03D6": "piv", "\u03A0": "Pi", "\u03C1": "rho", "\u03F1": "rhov", "\u03A1": "Rho", "\u03C3": "sigma", "\u03A3": "Sigma", "\u03C2": "sigmaf", "\u03C4": "tau", "\u03A4": "Tau", "\u03C5": "upsi", "\u03A5": "Upsilon", "\u03D2": "Upsi", "\u03C6": "phi", "\u03D5": "phiv", "\u03A6": "Phi", "\u03C7": "chi", "\u03A7": "Chi", "\u03C8": "psi", "\u03A8": "Psi", "\u03C9": "omega", "\u03A9": "ohm", "\u0430": "acy", "\u0410": "Acy", "\u0431": "bcy", "\u0411": "Bcy", "\u0432": "vcy", "\u0412": "Vcy", "\u0433": "gcy", "\u0413": "Gcy", "\u0453": "gjcy", "\u0403": "GJcy", "\u0434": "dcy", "\u0414": "Dcy", "\u0452": "djcy", "\u0402": "DJcy", "\u0435": "iecy", "\u0415": "IEcy", "\u0451": "iocy", "\u0401": "IOcy", "\u0454": "jukcy", "\u0404": "Jukcy", "\u0436": "zhcy", "\u0416": "ZHcy", "\u0437": "zcy", "\u0417": "Zcy", "\u0455": "dscy", "\u0405": "DScy", "\u0438": "icy", "\u0418": "Icy", "\u0456": "iukcy", "\u0406": "Iukcy", "\u0457": "yicy", "\u0407": "YIcy", "\u0439": "jcy", "\u0419": "Jcy", "\u0458": "jsercy", "\u0408": "Jsercy", "\u043A": "kcy", "\u041A": "Kcy", "\u045C": "kjcy", "\u040C": "KJcy", "\u043B": "lcy", "\u041B": "Lcy", "\u0459": "ljcy", "\u0409": "LJcy", "\u043C": "mcy", "\u041C": "Mcy", "\u043D": "ncy", "\u041D": "Ncy", "\u045A": "njcy", "\u040A": "NJcy", "\u043E": "ocy", "\u041E": "Ocy", "\u043F": "pcy", "\u041F": "Pcy", "\u0440": "rcy", "\u0420": "Rcy", "\u0441": "scy", "\u0421": "Scy", "\u0442": "tcy", "\u0422": "Tcy", "\u045B": "tshcy", "\u040B": "TSHcy", "\u0443": "ucy", "\u0423": "Ucy", "\u045E": "ubrcy", "\u040E": "Ubrcy", "\u0444": "fcy", "\u0424": "Fcy", "\u0445": "khcy", "\u0425": "KHcy", "\u0446": "tscy", "\u0426": "TScy", "\u0447": "chcy", "\u0427": "CHcy", "\u045F": "dzcy", "\u040F": "DZcy", "\u0448": "shcy", "\u0428": "SHcy", "\u0449": "shchcy", "\u0429": "SHCHcy", "\u044A": "hardcy", "\u042A": "HARDcy", "\u044B": "ycy", "\u042B": "Ycy", "\u044C": "softcy", "\u042C": "SOFTcy", "\u044D": "ecy", "\u042D": "Ecy", "\u044E": "yucy", "\u042E": "YUcy", "\u044F": "yacy", "\u042F": "YAcy", "\u2135": "aleph", "\u2136": "beth", "\u2137": "gimel", "\u2138": "daleth" };
      var regexEscape = /["&'<>`]/g;
      var escapeMap = {
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#x27;",
        "<": "&lt;",
        // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
        // following is not strictly necessary unless it’s part of a tag or an
        // unquoted attribute value. We’re only escaping it to support those
        // situations, and for XML support.
        ">": "&gt;",
        // In Internet Explorer ≤ 8, the backtick character can be used
        // to break out of (un)quoted attribute values or HTML comments.
        // See http://html5sec.org/#102, http://html5sec.org/#108, and
        // http://html5sec.org/#133.
        "`": "&#x60;"
      };
      var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
      var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
      var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
      var decodeMap = { "aacute": "\xE1", "Aacute": "\xC1", "abreve": "\u0103", "Abreve": "\u0102", "ac": "\u223E", "acd": "\u223F", "acE": "\u223E\u0333", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "acy": "\u0430", "Acy": "\u0410", "aelig": "\xE6", "AElig": "\xC6", "af": "\u2061", "afr": "\u{1D51E}", "Afr": "\u{1D504}", "agrave": "\xE0", "Agrave": "\xC0", "alefsym": "\u2135", "aleph": "\u2135", "alpha": "\u03B1", "Alpha": "\u0391", "amacr": "\u0101", "Amacr": "\u0100", "amalg": "\u2A3F", "amp": "&", "AMP": "&", "and": "\u2227", "And": "\u2A53", "andand": "\u2A55", "andd": "\u2A5C", "andslope": "\u2A58", "andv": "\u2A5A", "ang": "\u2220", "ange": "\u29A4", "angle": "\u2220", "angmsd": "\u2221", "angmsdaa": "\u29A8", "angmsdab": "\u29A9", "angmsdac": "\u29AA", "angmsdad": "\u29AB", "angmsdae": "\u29AC", "angmsdaf": "\u29AD", "angmsdag": "\u29AE", "angmsdah": "\u29AF", "angrt": "\u221F", "angrtvb": "\u22BE", "angrtvbd": "\u299D", "angsph": "\u2222", "angst": "\xC5", "angzarr": "\u237C", "aogon": "\u0105", "Aogon": "\u0104", "aopf": "\u{1D552}", "Aopf": "\u{1D538}", "ap": "\u2248", "apacir": "\u2A6F", "ape": "\u224A", "apE": "\u2A70", "apid": "\u224B", "apos": "'", "ApplyFunction": "\u2061", "approx": "\u2248", "approxeq": "\u224A", "aring": "\xE5", "Aring": "\xC5", "ascr": "\u{1D4B6}", "Ascr": "\u{1D49C}", "Assign": "\u2254", "ast": "*", "asymp": "\u2248", "asympeq": "\u224D", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "awconint": "\u2233", "awint": "\u2A11", "backcong": "\u224C", "backepsilon": "\u03F6", "backprime": "\u2035", "backsim": "\u223D", "backsimeq": "\u22CD", "Backslash": "\u2216", "Barv": "\u2AE7", "barvee": "\u22BD", "barwed": "\u2305", "Barwed": "\u2306", "barwedge": "\u2305", "bbrk": "\u23B5", "bbrktbrk": "\u23B6", "bcong": "\u224C", "bcy": "\u0431", "Bcy": "\u0411", "bdquo": "\u201E", "becaus": "\u2235", "because": "\u2235", "Because": "\u2235", "bemptyv": "\u29B0", "bepsi": "\u03F6", "bernou": "\u212C", "Bernoullis": "\u212C", "beta": "\u03B2", "Beta": "\u0392", "beth": "\u2136", "between": "\u226C", "bfr": "\u{1D51F}", "Bfr": "\u{1D505}", "bigcap": "\u22C2", "bigcirc": "\u25EF", "bigcup": "\u22C3", "bigodot": "\u2A00", "bigoplus": "\u2A01", "bigotimes": "\u2A02", "bigsqcup": "\u2A06", "bigstar": "\u2605", "bigtriangledown": "\u25BD", "bigtriangleup": "\u25B3", "biguplus": "\u2A04", "bigvee": "\u22C1", "bigwedge": "\u22C0", "bkarow": "\u290D", "blacklozenge": "\u29EB", "blacksquare": "\u25AA", "blacktriangle": "\u25B4", "blacktriangledown": "\u25BE", "blacktriangleleft": "\u25C2", "blacktriangleright": "\u25B8", "blank": "\u2423", "blk12": "\u2592", "blk14": "\u2591", "blk34": "\u2593", "block": "\u2588", "bne": "=\u20E5", "bnequiv": "\u2261\u20E5", "bnot": "\u2310", "bNot": "\u2AED", "bopf": "\u{1D553}", "Bopf": "\u{1D539}", "bot": "\u22A5", "bottom": "\u22A5", "bowtie": "\u22C8", "boxbox": "\u29C9", "boxdl": "\u2510", "boxdL": "\u2555", "boxDl": "\u2556", "boxDL": "\u2557", "boxdr": "\u250C", "boxdR": "\u2552", "boxDr": "\u2553", "boxDR": "\u2554", "boxh": "\u2500", "boxH": "\u2550", "boxhd": "\u252C", "boxhD": "\u2565", "boxHd": "\u2564", "boxHD": "\u2566", "boxhu": "\u2534", "boxhU": "\u2568", "boxHu": "\u2567", "boxHU": "\u2569", "boxminus": "\u229F", "boxplus": "\u229E", "boxtimes": "\u22A0", "boxul": "\u2518", "boxuL": "\u255B", "boxUl": "\u255C", "boxUL": "\u255D", "boxur": "\u2514", "boxuR": "\u2558", "boxUr": "\u2559", "boxUR": "\u255A", "boxv": "\u2502", "boxV": "\u2551", "boxvh": "\u253C", "boxvH": "\u256A", "boxVh": "\u256B", "boxVH": "\u256C", "boxvl": "\u2524", "boxvL": "\u2561", "boxVl": "\u2562", "boxVL": "\u2563", "boxvr": "\u251C", "boxvR": "\u255E", "boxVr": "\u255F", "boxVR": "\u2560", "bprime": "\u2035", "breve": "\u02D8", "Breve": "\u02D8", "brvbar": "\xA6", "bscr": "\u{1D4B7}", "Bscr": "\u212C", "bsemi": "\u204F", "bsim": "\u223D", "bsime": "\u22CD", "bsol": "\\", "bsolb": "\u29C5", "bsolhsub": "\u27C8", "bull": "\u2022", "bullet": "\u2022", "bump": "\u224E", "bumpe": "\u224F", "bumpE": "\u2AAE", "bumpeq": "\u224F", "Bumpeq": "\u224E", "cacute": "\u0107", "Cacute": "\u0106", "cap": "\u2229", "Cap": "\u22D2", "capand": "\u2A44", "capbrcup": "\u2A49", "capcap": "\u2A4B", "capcup": "\u2A47", "capdot": "\u2A40", "CapitalDifferentialD": "\u2145", "caps": "\u2229\uFE00", "caret": "\u2041", "caron": "\u02C7", "Cayleys": "\u212D", "ccaps": "\u2A4D", "ccaron": "\u010D", "Ccaron": "\u010C", "ccedil": "\xE7", "Ccedil": "\xC7", "ccirc": "\u0109", "Ccirc": "\u0108", "Cconint": "\u2230", "ccups": "\u2A4C", "ccupssm": "\u2A50", "cdot": "\u010B", "Cdot": "\u010A", "cedil": "\xB8", "Cedilla": "\xB8", "cemptyv": "\u29B2", "cent": "\xA2", "centerdot": "\xB7", "CenterDot": "\xB7", "cfr": "\u{1D520}", "Cfr": "\u212D", "chcy": "\u0447", "CHcy": "\u0427", "check": "\u2713", "checkmark": "\u2713", "chi": "\u03C7", "Chi": "\u03A7", "cir": "\u25CB", "circ": "\u02C6", "circeq": "\u2257", "circlearrowleft": "\u21BA", "circlearrowright": "\u21BB", "circledast": "\u229B", "circledcirc": "\u229A", "circleddash": "\u229D", "CircleDot": "\u2299", "circledR": "\xAE", "circledS": "\u24C8", "CircleMinus": "\u2296", "CirclePlus": "\u2295", "CircleTimes": "\u2297", "cire": "\u2257", "cirE": "\u29C3", "cirfnint": "\u2A10", "cirmid": "\u2AEF", "cirscir": "\u29C2", "ClockwiseContourIntegral": "\u2232", "CloseCurlyDoubleQuote": "\u201D", "CloseCurlyQuote": "\u2019", "clubs": "\u2663", "clubsuit": "\u2663", "colon": ":", "Colon": "\u2237", "colone": "\u2254", "Colone": "\u2A74", "coloneq": "\u2254", "comma": ",", "commat": "@", "comp": "\u2201", "compfn": "\u2218", "complement": "\u2201", "complexes": "\u2102", "cong": "\u2245", "congdot": "\u2A6D", "Congruent": "\u2261", "conint": "\u222E", "Conint": "\u222F", "ContourIntegral": "\u222E", "copf": "\u{1D554}", "Copf": "\u2102", "coprod": "\u2210", "Coproduct": "\u2210", "copy": "\xA9", "COPY": "\xA9", "copysr": "\u2117", "CounterClockwiseContourIntegral": "\u2233", "crarr": "\u21B5", "cross": "\u2717", "Cross": "\u2A2F", "cscr": "\u{1D4B8}", "Cscr": "\u{1D49E}", "csub": "\u2ACF", "csube": "\u2AD1", "csup": "\u2AD0", "csupe": "\u2AD2", "ctdot": "\u22EF", "cudarrl": "\u2938", "cudarrr": "\u2935", "cuepr": "\u22DE", "cuesc": "\u22DF", "cularr": "\u21B6", "cularrp": "\u293D", "cup": "\u222A", "Cup": "\u22D3", "cupbrcap": "\u2A48", "cupcap": "\u2A46", "CupCap": "\u224D", "cupcup": "\u2A4A", "cupdot": "\u228D", "cupor": "\u2A45", "cups": "\u222A\uFE00", "curarr": "\u21B7", "curarrm": "\u293C", "curlyeqprec": "\u22DE", "curlyeqsucc": "\u22DF", "curlyvee": "\u22CE", "curlywedge": "\u22CF", "curren": "\xA4", "curvearrowleft": "\u21B6", "curvearrowright": "\u21B7", "cuvee": "\u22CE", "cuwed": "\u22CF", "cwconint": "\u2232", "cwint": "\u2231", "cylcty": "\u232D", "dagger": "\u2020", "Dagger": "\u2021", "daleth": "\u2138", "darr": "\u2193", "dArr": "\u21D3", "Darr": "\u21A1", "dash": "\u2010", "dashv": "\u22A3", "Dashv": "\u2AE4", "dbkarow": "\u290F", "dblac": "\u02DD", "dcaron": "\u010F", "Dcaron": "\u010E", "dcy": "\u0434", "Dcy": "\u0414", "dd": "\u2146", "DD": "\u2145", "ddagger": "\u2021", "ddarr": "\u21CA", "DDotrahd": "\u2911", "ddotseq": "\u2A77", "deg": "\xB0", "Del": "\u2207", "delta": "\u03B4", "Delta": "\u0394", "demptyv": "\u29B1", "dfisht": "\u297F", "dfr": "\u{1D521}", "Dfr": "\u{1D507}", "dHar": "\u2965", "dharl": "\u21C3", "dharr": "\u21C2", "DiacriticalAcute": "\xB4", "DiacriticalDot": "\u02D9", "DiacriticalDoubleAcute": "\u02DD", "DiacriticalGrave": "`", "DiacriticalTilde": "\u02DC", "diam": "\u22C4", "diamond": "\u22C4", "Diamond": "\u22C4", "diamondsuit": "\u2666", "diams": "\u2666", "die": "\xA8", "DifferentialD": "\u2146", "digamma": "\u03DD", "disin": "\u22F2", "div": "\xF7", "divide": "\xF7", "divideontimes": "\u22C7", "divonx": "\u22C7", "djcy": "\u0452", "DJcy": "\u0402", "dlcorn": "\u231E", "dlcrop": "\u230D", "dollar": "$", "dopf": "\u{1D555}", "Dopf": "\u{1D53B}", "dot": "\u02D9", "Dot": "\xA8", "DotDot": "\u20DC", "doteq": "\u2250", "doteqdot": "\u2251", "DotEqual": "\u2250", "dotminus": "\u2238", "dotplus": "\u2214", "dotsquare": "\u22A1", "doublebarwedge": "\u2306", "DoubleContourIntegral": "\u222F", "DoubleDot": "\xA8", "DoubleDownArrow": "\u21D3", "DoubleLeftArrow": "\u21D0", "DoubleLeftRightArrow": "\u21D4", "DoubleLeftTee": "\u2AE4", "DoubleLongLeftArrow": "\u27F8", "DoubleLongLeftRightArrow": "\u27FA", "DoubleLongRightArrow": "\u27F9", "DoubleRightArrow": "\u21D2", "DoubleRightTee": "\u22A8", "DoubleUpArrow": "\u21D1", "DoubleUpDownArrow": "\u21D5", "DoubleVerticalBar": "\u2225", "downarrow": "\u2193", "Downarrow": "\u21D3", "DownArrow": "\u2193", "DownArrowBar": "\u2913", "DownArrowUpArrow": "\u21F5", "DownBreve": "\u0311", "downdownarrows": "\u21CA", "downharpoonleft": "\u21C3", "downharpoonright": "\u21C2", "DownLeftRightVector": "\u2950", "DownLeftTeeVector": "\u295E", "DownLeftVector": "\u21BD", "DownLeftVectorBar": "\u2956", "DownRightTeeVector": "\u295F", "DownRightVector": "\u21C1", "DownRightVectorBar": "\u2957", "DownTee": "\u22A4", "DownTeeArrow": "\u21A7", "drbkarow": "\u2910", "drcorn": "\u231F", "drcrop": "\u230C", "dscr": "\u{1D4B9}", "Dscr": "\u{1D49F}", "dscy": "\u0455", "DScy": "\u0405", "dsol": "\u29F6", "dstrok": "\u0111", "Dstrok": "\u0110", "dtdot": "\u22F1", "dtri": "\u25BF", "dtrif": "\u25BE", "duarr": "\u21F5", "duhar": "\u296F", "dwangle": "\u29A6", "dzcy": "\u045F", "DZcy": "\u040F", "dzigrarr": "\u27FF", "eacute": "\xE9", "Eacute": "\xC9", "easter": "\u2A6E", "ecaron": "\u011B", "Ecaron": "\u011A", "ecir": "\u2256", "ecirc": "\xEA", "Ecirc": "\xCA", "ecolon": "\u2255", "ecy": "\u044D", "Ecy": "\u042D", "eDDot": "\u2A77", "edot": "\u0117", "eDot": "\u2251", "Edot": "\u0116", "ee": "\u2147", "efDot": "\u2252", "efr": "\u{1D522}", "Efr": "\u{1D508}", "eg": "\u2A9A", "egrave": "\xE8", "Egrave": "\xC8", "egs": "\u2A96", "egsdot": "\u2A98", "el": "\u2A99", "Element": "\u2208", "elinters": "\u23E7", "ell": "\u2113", "els": "\u2A95", "elsdot": "\u2A97", "emacr": "\u0113", "Emacr": "\u0112", "empty": "\u2205", "emptyset": "\u2205", "EmptySmallSquare": "\u25FB", "emptyv": "\u2205", "EmptyVerySmallSquare": "\u25AB", "emsp": "\u2003", "emsp13": "\u2004", "emsp14": "\u2005", "eng": "\u014B", "ENG": "\u014A", "ensp": "\u2002", "eogon": "\u0119", "Eogon": "\u0118", "eopf": "\u{1D556}", "Eopf": "\u{1D53C}", "epar": "\u22D5", "eparsl": "\u29E3", "eplus": "\u2A71", "epsi": "\u03B5", "epsilon": "\u03B5", "Epsilon": "\u0395", "epsiv": "\u03F5", "eqcirc": "\u2256", "eqcolon": "\u2255", "eqsim": "\u2242", "eqslantgtr": "\u2A96", "eqslantless": "\u2A95", "Equal": "\u2A75", "equals": "=", "EqualTilde": "\u2242", "equest": "\u225F", "Equilibrium": "\u21CC", "equiv": "\u2261", "equivDD": "\u2A78", "eqvparsl": "\u29E5", "erarr": "\u2971", "erDot": "\u2253", "escr": "\u212F", "Escr": "\u2130", "esdot": "\u2250", "esim": "\u2242", "Esim": "\u2A73", "eta": "\u03B7", "Eta": "\u0397", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "euro": "\u20AC", "excl": "!", "exist": "\u2203", "Exists": "\u2203", "expectation": "\u2130", "exponentiale": "\u2147", "ExponentialE": "\u2147", "fallingdotseq": "\u2252", "fcy": "\u0444", "Fcy": "\u0424", "female": "\u2640", "ffilig": "\uFB03", "fflig": "\uFB00", "ffllig": "\uFB04", "ffr": "\u{1D523}", "Ffr": "\u{1D509}", "filig": "\uFB01", "FilledSmallSquare": "\u25FC", "FilledVerySmallSquare": "\u25AA", "fjlig": "fj", "flat": "\u266D", "fllig": "\uFB02", "fltns": "\u25B1", "fnof": "\u0192", "fopf": "\u{1D557}", "Fopf": "\u{1D53D}", "forall": "\u2200", "ForAll": "\u2200", "fork": "\u22D4", "forkv": "\u2AD9", "Fouriertrf": "\u2131", "fpartint": "\u2A0D", "frac12": "\xBD", "frac13": "\u2153", "frac14": "\xBC", "frac15": "\u2155", "frac16": "\u2159", "frac18": "\u215B", "frac23": "\u2154", "frac25": "\u2156", "frac34": "\xBE", "frac35": "\u2157", "frac38": "\u215C", "frac45": "\u2158", "frac56": "\u215A", "frac58": "\u215D", "frac78": "\u215E", "frasl": "\u2044", "frown": "\u2322", "fscr": "\u{1D4BB}", "Fscr": "\u2131", "gacute": "\u01F5", "gamma": "\u03B3", "Gamma": "\u0393", "gammad": "\u03DD", "Gammad": "\u03DC", "gap": "\u2A86", "gbreve": "\u011F", "Gbreve": "\u011E", "Gcedil": "\u0122", "gcirc": "\u011D", "Gcirc": "\u011C", "gcy": "\u0433", "Gcy": "\u0413", "gdot": "\u0121", "Gdot": "\u0120", "ge": "\u2265", "gE": "\u2267", "gel": "\u22DB", "gEl": "\u2A8C", "geq": "\u2265", "geqq": "\u2267", "geqslant": "\u2A7E", "ges": "\u2A7E", "gescc": "\u2AA9", "gesdot": "\u2A80", "gesdoto": "\u2A82", "gesdotol": "\u2A84", "gesl": "\u22DB\uFE00", "gesles": "\u2A94", "gfr": "\u{1D524}", "Gfr": "\u{1D50A}", "gg": "\u226B", "Gg": "\u22D9", "ggg": "\u22D9", "gimel": "\u2137", "gjcy": "\u0453", "GJcy": "\u0403", "gl": "\u2277", "gla": "\u2AA5", "glE": "\u2A92", "glj": "\u2AA4", "gnap": "\u2A8A", "gnapprox": "\u2A8A", "gne": "\u2A88", "gnE": "\u2269", "gneq": "\u2A88", "gneqq": "\u2269", "gnsim": "\u22E7", "gopf": "\u{1D558}", "Gopf": "\u{1D53E}", "grave": "`", "GreaterEqual": "\u2265", "GreaterEqualLess": "\u22DB", "GreaterFullEqual": "\u2267", "GreaterGreater": "\u2AA2", "GreaterLess": "\u2277", "GreaterSlantEqual": "\u2A7E", "GreaterTilde": "\u2273", "gscr": "\u210A", "Gscr": "\u{1D4A2}", "gsim": "\u2273", "gsime": "\u2A8E", "gsiml": "\u2A90", "gt": ">", "Gt": "\u226B", "GT": ">", "gtcc": "\u2AA7", "gtcir": "\u2A7A", "gtdot": "\u22D7", "gtlPar": "\u2995", "gtquest": "\u2A7C", "gtrapprox": "\u2A86", "gtrarr": "\u2978", "gtrdot": "\u22D7", "gtreqless": "\u22DB", "gtreqqless": "\u2A8C", "gtrless": "\u2277", "gtrsim": "\u2273", "gvertneqq": "\u2269\uFE00", "gvnE": "\u2269\uFE00", "Hacek": "\u02C7", "hairsp": "\u200A", "half": "\xBD", "hamilt": "\u210B", "hardcy": "\u044A", "HARDcy": "\u042A", "harr": "\u2194", "hArr": "\u21D4", "harrcir": "\u2948", "harrw": "\u21AD", "Hat": "^", "hbar": "\u210F", "hcirc": "\u0125", "Hcirc": "\u0124", "hearts": "\u2665", "heartsuit": "\u2665", "hellip": "\u2026", "hercon": "\u22B9", "hfr": "\u{1D525}", "Hfr": "\u210C", "HilbertSpace": "\u210B", "hksearow": "\u2925", "hkswarow": "\u2926", "hoarr": "\u21FF", "homtht": "\u223B", "hookleftarrow": "\u21A9", "hookrightarrow": "\u21AA", "hopf": "\u{1D559}", "Hopf": "\u210D", "horbar": "\u2015", "HorizontalLine": "\u2500", "hscr": "\u{1D4BD}", "Hscr": "\u210B", "hslash": "\u210F", "hstrok": "\u0127", "Hstrok": "\u0126", "HumpDownHump": "\u224E", "HumpEqual": "\u224F", "hybull": "\u2043", "hyphen": "\u2010", "iacute": "\xED", "Iacute": "\xCD", "ic": "\u2063", "icirc": "\xEE", "Icirc": "\xCE", "icy": "\u0438", "Icy": "\u0418", "Idot": "\u0130", "iecy": "\u0435", "IEcy": "\u0415", "iexcl": "\xA1", "iff": "\u21D4", "ifr": "\u{1D526}", "Ifr": "\u2111", "igrave": "\xEC", "Igrave": "\xCC", "ii": "\u2148", "iiiint": "\u2A0C", "iiint": "\u222D", "iinfin": "\u29DC", "iiota": "\u2129", "ijlig": "\u0133", "IJlig": "\u0132", "Im": "\u2111", "imacr": "\u012B", "Imacr": "\u012A", "image": "\u2111", "ImaginaryI": "\u2148", "imagline": "\u2110", "imagpart": "\u2111", "imath": "\u0131", "imof": "\u22B7", "imped": "\u01B5", "Implies": "\u21D2", "in": "\u2208", "incare": "\u2105", "infin": "\u221E", "infintie": "\u29DD", "inodot": "\u0131", "int": "\u222B", "Int": "\u222C", "intcal": "\u22BA", "integers": "\u2124", "Integral": "\u222B", "intercal": "\u22BA", "Intersection": "\u22C2", "intlarhk": "\u2A17", "intprod": "\u2A3C", "InvisibleComma": "\u2063", "InvisibleTimes": "\u2062", "iocy": "\u0451", "IOcy": "\u0401", "iogon": "\u012F", "Iogon": "\u012E", "iopf": "\u{1D55A}", "Iopf": "\u{1D540}", "iota": "\u03B9", "Iota": "\u0399", "iprod": "\u2A3C", "iquest": "\xBF", "iscr": "\u{1D4BE}", "Iscr": "\u2110", "isin": "\u2208", "isindot": "\u22F5", "isinE": "\u22F9", "isins": "\u22F4", "isinsv": "\u22F3", "isinv": "\u2208", "it": "\u2062", "itilde": "\u0129", "Itilde": "\u0128", "iukcy": "\u0456", "Iukcy": "\u0406", "iuml": "\xEF", "Iuml": "\xCF", "jcirc": "\u0135", "Jcirc": "\u0134", "jcy": "\u0439", "Jcy": "\u0419", "jfr": "\u{1D527}", "Jfr": "\u{1D50D}", "jmath": "\u0237", "jopf": "\u{1D55B}", "Jopf": "\u{1D541}", "jscr": "\u{1D4BF}", "Jscr": "\u{1D4A5}", "jsercy": "\u0458", "Jsercy": "\u0408", "jukcy": "\u0454", "Jukcy": "\u0404", "kappa": "\u03BA", "Kappa": "\u039A", "kappav": "\u03F0", "kcedil": "\u0137", "Kcedil": "\u0136", "kcy": "\u043A", "Kcy": "\u041A", "kfr": "\u{1D528}", "Kfr": "\u{1D50E}", "kgreen": "\u0138", "khcy": "\u0445", "KHcy": "\u0425", "kjcy": "\u045C", "KJcy": "\u040C", "kopf": "\u{1D55C}", "Kopf": "\u{1D542}", "kscr": "\u{1D4C0}", "Kscr": "\u{1D4A6}", "lAarr": "\u21DA", "lacute": "\u013A", "Lacute": "\u0139", "laemptyv": "\u29B4", "lagran": "\u2112", "lambda": "\u03BB", "Lambda": "\u039B", "lang": "\u27E8", "Lang": "\u27EA", "langd": "\u2991", "langle": "\u27E8", "lap": "\u2A85", "Laplacetrf": "\u2112", "laquo": "\xAB", "larr": "\u2190", "lArr": "\u21D0", "Larr": "\u219E", "larrb": "\u21E4", "larrbfs": "\u291F", "larrfs": "\u291D", "larrhk": "\u21A9", "larrlp": "\u21AB", "larrpl": "\u2939", "larrsim": "\u2973", "larrtl": "\u21A2", "lat": "\u2AAB", "latail": "\u2919", "lAtail": "\u291B", "late": "\u2AAD", "lates": "\u2AAD\uFE00", "lbarr": "\u290C", "lBarr": "\u290E", "lbbrk": "\u2772", "lbrace": "{", "lbrack": "[", "lbrke": "\u298B", "lbrksld": "\u298F", "lbrkslu": "\u298D", "lcaron": "\u013E", "Lcaron": "\u013D", "lcedil": "\u013C", "Lcedil": "\u013B", "lceil": "\u2308", "lcub": "{", "lcy": "\u043B", "Lcy": "\u041B", "ldca": "\u2936", "ldquo": "\u201C", "ldquor": "\u201E", "ldrdhar": "\u2967", "ldrushar": "\u294B", "ldsh": "\u21B2", "le": "\u2264", "lE": "\u2266", "LeftAngleBracket": "\u27E8", "leftarrow": "\u2190", "Leftarrow": "\u21D0", "LeftArrow": "\u2190", "LeftArrowBar": "\u21E4", "LeftArrowRightArrow": "\u21C6", "leftarrowtail": "\u21A2", "LeftCeiling": "\u2308", "LeftDoubleBracket": "\u27E6", "LeftDownTeeVector": "\u2961", "LeftDownVector": "\u21C3", "LeftDownVectorBar": "\u2959", "LeftFloor": "\u230A", "leftharpoondown": "\u21BD", "leftharpoonup": "\u21BC", "leftleftarrows": "\u21C7", "leftrightarrow": "\u2194", "Leftrightarrow": "\u21D4", "LeftRightArrow": "\u2194", "leftrightarrows": "\u21C6", "leftrightharpoons": "\u21CB", "leftrightsquigarrow": "\u21AD", "LeftRightVector": "\u294E", "LeftTee": "\u22A3", "LeftTeeArrow": "\u21A4", "LeftTeeVector": "\u295A", "leftthreetimes": "\u22CB", "LeftTriangle": "\u22B2", "LeftTriangleBar": "\u29CF", "LeftTriangleEqual": "\u22B4", "LeftUpDownVector": "\u2951", "LeftUpTeeVector": "\u2960", "LeftUpVector": "\u21BF", "LeftUpVectorBar": "\u2958", "LeftVector": "\u21BC", "LeftVectorBar": "\u2952", "leg": "\u22DA", "lEg": "\u2A8B", "leq": "\u2264", "leqq": "\u2266", "leqslant": "\u2A7D", "les": "\u2A7D", "lescc": "\u2AA8", "lesdot": "\u2A7F", "lesdoto": "\u2A81", "lesdotor": "\u2A83", "lesg": "\u22DA\uFE00", "lesges": "\u2A93", "lessapprox": "\u2A85", "lessdot": "\u22D6", "lesseqgtr": "\u22DA", "lesseqqgtr": "\u2A8B", "LessEqualGreater": "\u22DA", "LessFullEqual": "\u2266", "LessGreater": "\u2276", "lessgtr": "\u2276", "LessLess": "\u2AA1", "lesssim": "\u2272", "LessSlantEqual": "\u2A7D", "LessTilde": "\u2272", "lfisht": "\u297C", "lfloor": "\u230A", "lfr": "\u{1D529}", "Lfr": "\u{1D50F}", "lg": "\u2276", "lgE": "\u2A91", "lHar": "\u2962", "lhard": "\u21BD", "lharu": "\u21BC", "lharul": "\u296A", "lhblk": "\u2584", "ljcy": "\u0459", "LJcy": "\u0409", "ll": "\u226A", "Ll": "\u22D8", "llarr": "\u21C7", "llcorner": "\u231E", "Lleftarrow": "\u21DA", "llhard": "\u296B", "lltri": "\u25FA", "lmidot": "\u0140", "Lmidot": "\u013F", "lmoust": "\u23B0", "lmoustache": "\u23B0", "lnap": "\u2A89", "lnapprox": "\u2A89", "lne": "\u2A87", "lnE": "\u2268", "lneq": "\u2A87", "lneqq": "\u2268", "lnsim": "\u22E6", "loang": "\u27EC", "loarr": "\u21FD", "lobrk": "\u27E6", "longleftarrow": "\u27F5", "Longleftarrow": "\u27F8", "LongLeftArrow": "\u27F5", "longleftrightarrow": "\u27F7", "Longleftrightarrow": "\u27FA", "LongLeftRightArrow": "\u27F7", "longmapsto": "\u27FC", "longrightarrow": "\u27F6", "Longrightarrow": "\u27F9", "LongRightArrow": "\u27F6", "looparrowleft": "\u21AB", "looparrowright": "\u21AC", "lopar": "\u2985", "lopf": "\u{1D55D}", "Lopf": "\u{1D543}", "loplus": "\u2A2D", "lotimes": "\u2A34", "lowast": "\u2217", "lowbar": "_", "LowerLeftArrow": "\u2199", "LowerRightArrow": "\u2198", "loz": "\u25CA", "lozenge": "\u25CA", "lozf": "\u29EB", "lpar": "(", "lparlt": "\u2993", "lrarr": "\u21C6", "lrcorner": "\u231F", "lrhar": "\u21CB", "lrhard": "\u296D", "lrm": "\u200E", "lrtri": "\u22BF", "lsaquo": "\u2039", "lscr": "\u{1D4C1}", "Lscr": "\u2112", "lsh": "\u21B0", "Lsh": "\u21B0", "lsim": "\u2272", "lsime": "\u2A8D", "lsimg": "\u2A8F", "lsqb": "[", "lsquo": "\u2018", "lsquor": "\u201A", "lstrok": "\u0142", "Lstrok": "\u0141", "lt": "<", "Lt": "\u226A", "LT": "<", "ltcc": "\u2AA6", "ltcir": "\u2A79", "ltdot": "\u22D6", "lthree": "\u22CB", "ltimes": "\u22C9", "ltlarr": "\u2976", "ltquest": "\u2A7B", "ltri": "\u25C3", "ltrie": "\u22B4", "ltrif": "\u25C2", "ltrPar": "\u2996", "lurdshar": "\u294A", "luruhar": "\u2966", "lvertneqq": "\u2268\uFE00", "lvnE": "\u2268\uFE00", "macr": "\xAF", "male": "\u2642", "malt": "\u2720", "maltese": "\u2720", "map": "\u21A6", "Map": "\u2905", "mapsto": "\u21A6", "mapstodown": "\u21A7", "mapstoleft": "\u21A4", "mapstoup": "\u21A5", "marker": "\u25AE", "mcomma": "\u2A29", "mcy": "\u043C", "Mcy": "\u041C", "mdash": "\u2014", "mDDot": "\u223A", "measuredangle": "\u2221", "MediumSpace": "\u205F", "Mellintrf": "\u2133", "mfr": "\u{1D52A}", "Mfr": "\u{1D510}", "mho": "\u2127", "micro": "\xB5", "mid": "\u2223", "midast": "*", "midcir": "\u2AF0", "middot": "\xB7", "minus": "\u2212", "minusb": "\u229F", "minusd": "\u2238", "minusdu": "\u2A2A", "MinusPlus": "\u2213", "mlcp": "\u2ADB", "mldr": "\u2026", "mnplus": "\u2213", "models": "\u22A7", "mopf": "\u{1D55E}", "Mopf": "\u{1D544}", "mp": "\u2213", "mscr": "\u{1D4C2}", "Mscr": "\u2133", "mstpos": "\u223E", "mu": "\u03BC", "Mu": "\u039C", "multimap": "\u22B8", "mumap": "\u22B8", "nabla": "\u2207", "nacute": "\u0144", "Nacute": "\u0143", "nang": "\u2220\u20D2", "nap": "\u2249", "napE": "\u2A70\u0338", "napid": "\u224B\u0338", "napos": "\u0149", "napprox": "\u2249", "natur": "\u266E", "natural": "\u266E", "naturals": "\u2115", "nbsp": "\xA0", "nbump": "\u224E\u0338", "nbumpe": "\u224F\u0338", "ncap": "\u2A43", "ncaron": "\u0148", "Ncaron": "\u0147", "ncedil": "\u0146", "Ncedil": "\u0145", "ncong": "\u2247", "ncongdot": "\u2A6D\u0338", "ncup": "\u2A42", "ncy": "\u043D", "Ncy": "\u041D", "ndash": "\u2013", "ne": "\u2260", "nearhk": "\u2924", "nearr": "\u2197", "neArr": "\u21D7", "nearrow": "\u2197", "nedot": "\u2250\u0338", "NegativeMediumSpace": "\u200B", "NegativeThickSpace": "\u200B", "NegativeThinSpace": "\u200B", "NegativeVeryThinSpace": "\u200B", "nequiv": "\u2262", "nesear": "\u2928", "nesim": "\u2242\u0338", "NestedGreaterGreater": "\u226B", "NestedLessLess": "\u226A", "NewLine": "\n", "nexist": "\u2204", "nexists": "\u2204", "nfr": "\u{1D52B}", "Nfr": "\u{1D511}", "nge": "\u2271", "ngE": "\u2267\u0338", "ngeq": "\u2271", "ngeqq": "\u2267\u0338", "ngeqslant": "\u2A7E\u0338", "nges": "\u2A7E\u0338", "nGg": "\u22D9\u0338", "ngsim": "\u2275", "ngt": "\u226F", "nGt": "\u226B\u20D2", "ngtr": "\u226F", "nGtv": "\u226B\u0338", "nharr": "\u21AE", "nhArr": "\u21CE", "nhpar": "\u2AF2", "ni": "\u220B", "nis": "\u22FC", "nisd": "\u22FA", "niv": "\u220B", "njcy": "\u045A", "NJcy": "\u040A", "nlarr": "\u219A", "nlArr": "\u21CD", "nldr": "\u2025", "nle": "\u2270", "nlE": "\u2266\u0338", "nleftarrow": "\u219A", "nLeftarrow": "\u21CD", "nleftrightarrow": "\u21AE", "nLeftrightarrow": "\u21CE", "nleq": "\u2270", "nleqq": "\u2266\u0338", "nleqslant": "\u2A7D\u0338", "nles": "\u2A7D\u0338", "nless": "\u226E", "nLl": "\u22D8\u0338", "nlsim": "\u2274", "nlt": "\u226E", "nLt": "\u226A\u20D2", "nltri": "\u22EA", "nltrie": "\u22EC", "nLtv": "\u226A\u0338", "nmid": "\u2224", "NoBreak": "\u2060", "NonBreakingSpace": "\xA0", "nopf": "\u{1D55F}", "Nopf": "\u2115", "not": "\xAC", "Not": "\u2AEC", "NotCongruent": "\u2262", "NotCupCap": "\u226D", "NotDoubleVerticalBar": "\u2226", "NotElement": "\u2209", "NotEqual": "\u2260", "NotEqualTilde": "\u2242\u0338", "NotExists": "\u2204", "NotGreater": "\u226F", "NotGreaterEqual": "\u2271", "NotGreaterFullEqual": "\u2267\u0338", "NotGreaterGreater": "\u226B\u0338", "NotGreaterLess": "\u2279", "NotGreaterSlantEqual": "\u2A7E\u0338", "NotGreaterTilde": "\u2275", "NotHumpDownHump": "\u224E\u0338", "NotHumpEqual": "\u224F\u0338", "notin": "\u2209", "notindot": "\u22F5\u0338", "notinE": "\u22F9\u0338", "notinva": "\u2209", "notinvb": "\u22F7", "notinvc": "\u22F6", "NotLeftTriangle": "\u22EA", "NotLeftTriangleBar": "\u29CF\u0338", "NotLeftTriangleEqual": "\u22EC", "NotLess": "\u226E", "NotLessEqual": "\u2270", "NotLessGreater": "\u2278", "NotLessLess": "\u226A\u0338", "NotLessSlantEqual": "\u2A7D\u0338", "NotLessTilde": "\u2274", "NotNestedGreaterGreater": "\u2AA2\u0338", "NotNestedLessLess": "\u2AA1\u0338", "notni": "\u220C", "notniva": "\u220C", "notnivb": "\u22FE", "notnivc": "\u22FD", "NotPrecedes": "\u2280", "NotPrecedesEqual": "\u2AAF\u0338", "NotPrecedesSlantEqual": "\u22E0", "NotReverseElement": "\u220C", "NotRightTriangle": "\u22EB", "NotRightTriangleBar": "\u29D0\u0338", "NotRightTriangleEqual": "\u22ED", "NotSquareSubset": "\u228F\u0338", "NotSquareSubsetEqual": "\u22E2", "NotSquareSuperset": "\u2290\u0338", "NotSquareSupersetEqual": "\u22E3", "NotSubset": "\u2282\u20D2", "NotSubsetEqual": "\u2288", "NotSucceeds": "\u2281", "NotSucceedsEqual": "\u2AB0\u0338", "NotSucceedsSlantEqual": "\u22E1", "NotSucceedsTilde": "\u227F\u0338", "NotSuperset": "\u2283\u20D2", "NotSupersetEqual": "\u2289", "NotTilde": "\u2241", "NotTildeEqual": "\u2244", "NotTildeFullEqual": "\u2247", "NotTildeTilde": "\u2249", "NotVerticalBar": "\u2224", "npar": "\u2226", "nparallel": "\u2226", "nparsl": "\u2AFD\u20E5", "npart": "\u2202\u0338", "npolint": "\u2A14", "npr": "\u2280", "nprcue": "\u22E0", "npre": "\u2AAF\u0338", "nprec": "\u2280", "npreceq": "\u2AAF\u0338", "nrarr": "\u219B", "nrArr": "\u21CF", "nrarrc": "\u2933\u0338", "nrarrw": "\u219D\u0338", "nrightarrow": "\u219B", "nRightarrow": "\u21CF", "nrtri": "\u22EB", "nrtrie": "\u22ED", "nsc": "\u2281", "nsccue": "\u22E1", "nsce": "\u2AB0\u0338", "nscr": "\u{1D4C3}", "Nscr": "\u{1D4A9}", "nshortmid": "\u2224", "nshortparallel": "\u2226", "nsim": "\u2241", "nsime": "\u2244", "nsimeq": "\u2244", "nsmid": "\u2224", "nspar": "\u2226", "nsqsube": "\u22E2", "nsqsupe": "\u22E3", "nsub": "\u2284", "nsube": "\u2288", "nsubE": "\u2AC5\u0338", "nsubset": "\u2282\u20D2", "nsubseteq": "\u2288", "nsubseteqq": "\u2AC5\u0338", "nsucc": "\u2281", "nsucceq": "\u2AB0\u0338", "nsup": "\u2285", "nsupe": "\u2289", "nsupE": "\u2AC6\u0338", "nsupset": "\u2283\u20D2", "nsupseteq": "\u2289", "nsupseteqq": "\u2AC6\u0338", "ntgl": "\u2279", "ntilde": "\xF1", "Ntilde": "\xD1", "ntlg": "\u2278", "ntriangleleft": "\u22EA", "ntrianglelefteq": "\u22EC", "ntriangleright": "\u22EB", "ntrianglerighteq": "\u22ED", "nu": "\u03BD", "Nu": "\u039D", "num": "#", "numero": "\u2116", "numsp": "\u2007", "nvap": "\u224D\u20D2", "nvdash": "\u22AC", "nvDash": "\u22AD", "nVdash": "\u22AE", "nVDash": "\u22AF", "nvge": "\u2265\u20D2", "nvgt": ">\u20D2", "nvHarr": "\u2904", "nvinfin": "\u29DE", "nvlArr": "\u2902", "nvle": "\u2264\u20D2", "nvlt": "<\u20D2", "nvltrie": "\u22B4\u20D2", "nvrArr": "\u2903", "nvrtrie": "\u22B5\u20D2", "nvsim": "\u223C\u20D2", "nwarhk": "\u2923", "nwarr": "\u2196", "nwArr": "\u21D6", "nwarrow": "\u2196", "nwnear": "\u2927", "oacute": "\xF3", "Oacute": "\xD3", "oast": "\u229B", "ocir": "\u229A", "ocirc": "\xF4", "Ocirc": "\xD4", "ocy": "\u043E", "Ocy": "\u041E", "odash": "\u229D", "odblac": "\u0151", "Odblac": "\u0150", "odiv": "\u2A38", "odot": "\u2299", "odsold": "\u29BC", "oelig": "\u0153", "OElig": "\u0152", "ofcir": "\u29BF", "ofr": "\u{1D52C}", "Ofr": "\u{1D512}", "ogon": "\u02DB", "ograve": "\xF2", "Ograve": "\xD2", "ogt": "\u29C1", "ohbar": "\u29B5", "ohm": "\u03A9", "oint": "\u222E", "olarr": "\u21BA", "olcir": "\u29BE", "olcross": "\u29BB", "oline": "\u203E", "olt": "\u29C0", "omacr": "\u014D", "Omacr": "\u014C", "omega": "\u03C9", "Omega": "\u03A9", "omicron": "\u03BF", "Omicron": "\u039F", "omid": "\u29B6", "ominus": "\u2296", "oopf": "\u{1D560}", "Oopf": "\u{1D546}", "opar": "\u29B7", "OpenCurlyDoubleQuote": "\u201C", "OpenCurlyQuote": "\u2018", "operp": "\u29B9", "oplus": "\u2295", "or": "\u2228", "Or": "\u2A54", "orarr": "\u21BB", "ord": "\u2A5D", "order": "\u2134", "orderof": "\u2134", "ordf": "\xAA", "ordm": "\xBA", "origof": "\u22B6", "oror": "\u2A56", "orslope": "\u2A57", "orv": "\u2A5B", "oS": "\u24C8", "oscr": "\u2134", "Oscr": "\u{1D4AA}", "oslash": "\xF8", "Oslash": "\xD8", "osol": "\u2298", "otilde": "\xF5", "Otilde": "\xD5", "otimes": "\u2297", "Otimes": "\u2A37", "otimesas": "\u2A36", "ouml": "\xF6", "Ouml": "\xD6", "ovbar": "\u233D", "OverBar": "\u203E", "OverBrace": "\u23DE", "OverBracket": "\u23B4", "OverParenthesis": "\u23DC", "par": "\u2225", "para": "\xB6", "parallel": "\u2225", "parsim": "\u2AF3", "parsl": "\u2AFD", "part": "\u2202", "PartialD": "\u2202", "pcy": "\u043F", "Pcy": "\u041F", "percnt": "%", "period": ".", "permil": "\u2030", "perp": "\u22A5", "pertenk": "\u2031", "pfr": "\u{1D52D}", "Pfr": "\u{1D513}", "phi": "\u03C6", "Phi": "\u03A6", "phiv": "\u03D5", "phmmat": "\u2133", "phone": "\u260E", "pi": "\u03C0", "Pi": "\u03A0", "pitchfork": "\u22D4", "piv": "\u03D6", "planck": "\u210F", "planckh": "\u210E", "plankv": "\u210F", "plus": "+", "plusacir": "\u2A23", "plusb": "\u229E", "pluscir": "\u2A22", "plusdo": "\u2214", "plusdu": "\u2A25", "pluse": "\u2A72", "PlusMinus": "\xB1", "plusmn": "\xB1", "plussim": "\u2A26", "plustwo": "\u2A27", "pm": "\xB1", "Poincareplane": "\u210C", "pointint": "\u2A15", "popf": "\u{1D561}", "Popf": "\u2119", "pound": "\xA3", "pr": "\u227A", "Pr": "\u2ABB", "prap": "\u2AB7", "prcue": "\u227C", "pre": "\u2AAF", "prE": "\u2AB3", "prec": "\u227A", "precapprox": "\u2AB7", "preccurlyeq": "\u227C", "Precedes": "\u227A", "PrecedesEqual": "\u2AAF", "PrecedesSlantEqual": "\u227C", "PrecedesTilde": "\u227E", "preceq": "\u2AAF", "precnapprox": "\u2AB9", "precneqq": "\u2AB5", "precnsim": "\u22E8", "precsim": "\u227E", "prime": "\u2032", "Prime": "\u2033", "primes": "\u2119", "prnap": "\u2AB9", "prnE": "\u2AB5", "prnsim": "\u22E8", "prod": "\u220F", "Product": "\u220F", "profalar": "\u232E", "profline": "\u2312", "profsurf": "\u2313", "prop": "\u221D", "Proportion": "\u2237", "Proportional": "\u221D", "propto": "\u221D", "prsim": "\u227E", "prurel": "\u22B0", "pscr": "\u{1D4C5}", "Pscr": "\u{1D4AB}", "psi": "\u03C8", "Psi": "\u03A8", "puncsp": "\u2008", "qfr": "\u{1D52E}", "Qfr": "\u{1D514}", "qint": "\u2A0C", "qopf": "\u{1D562}", "Qopf": "\u211A", "qprime": "\u2057", "qscr": "\u{1D4C6}", "Qscr": "\u{1D4AC}", "quaternions": "\u210D", "quatint": "\u2A16", "quest": "?", "questeq": "\u225F", "quot": '"', "QUOT": '"', "rAarr": "\u21DB", "race": "\u223D\u0331", "racute": "\u0155", "Racute": "\u0154", "radic": "\u221A", "raemptyv": "\u29B3", "rang": "\u27E9", "Rang": "\u27EB", "rangd": "\u2992", "range": "\u29A5", "rangle": "\u27E9", "raquo": "\xBB", "rarr": "\u2192", "rArr": "\u21D2", "Rarr": "\u21A0", "rarrap": "\u2975", "rarrb": "\u21E5", "rarrbfs": "\u2920", "rarrc": "\u2933", "rarrfs": "\u291E", "rarrhk": "\u21AA", "rarrlp": "\u21AC", "rarrpl": "\u2945", "rarrsim": "\u2974", "rarrtl": "\u21A3", "Rarrtl": "\u2916", "rarrw": "\u219D", "ratail": "\u291A", "rAtail": "\u291C", "ratio": "\u2236", "rationals": "\u211A", "rbarr": "\u290D", "rBarr": "\u290F", "RBarr": "\u2910", "rbbrk": "\u2773", "rbrace": "}", "rbrack": "]", "rbrke": "\u298C", "rbrksld": "\u298E", "rbrkslu": "\u2990", "rcaron": "\u0159", "Rcaron": "\u0158", "rcedil": "\u0157", "Rcedil": "\u0156", "rceil": "\u2309", "rcub": "}", "rcy": "\u0440", "Rcy": "\u0420", "rdca": "\u2937", "rdldhar": "\u2969", "rdquo": "\u201D", "rdquor": "\u201D", "rdsh": "\u21B3", "Re": "\u211C", "real": "\u211C", "realine": "\u211B", "realpart": "\u211C", "reals": "\u211D", "rect": "\u25AD", "reg": "\xAE", "REG": "\xAE", "ReverseElement": "\u220B", "ReverseEquilibrium": "\u21CB", "ReverseUpEquilibrium": "\u296F", "rfisht": "\u297D", "rfloor": "\u230B", "rfr": "\u{1D52F}", "Rfr": "\u211C", "rHar": "\u2964", "rhard": "\u21C1", "rharu": "\u21C0", "rharul": "\u296C", "rho": "\u03C1", "Rho": "\u03A1", "rhov": "\u03F1", "RightAngleBracket": "\u27E9", "rightarrow": "\u2192", "Rightarrow": "\u21D2", "RightArrow": "\u2192", "RightArrowBar": "\u21E5", "RightArrowLeftArrow": "\u21C4", "rightarrowtail": "\u21A3", "RightCeiling": "\u2309", "RightDoubleBracket": "\u27E7", "RightDownTeeVector": "\u295D", "RightDownVector": "\u21C2", "RightDownVectorBar": "\u2955", "RightFloor": "\u230B", "rightharpoondown": "\u21C1", "rightharpoonup": "\u21C0", "rightleftarrows": "\u21C4", "rightleftharpoons": "\u21CC", "rightrightarrows": "\u21C9", "rightsquigarrow": "\u219D", "RightTee": "\u22A2", "RightTeeArrow": "\u21A6", "RightTeeVector": "\u295B", "rightthreetimes": "\u22CC", "RightTriangle": "\u22B3", "RightTriangleBar": "\u29D0", "RightTriangleEqual": "\u22B5", "RightUpDownVector": "\u294F", "RightUpTeeVector": "\u295C", "RightUpVector": "\u21BE", "RightUpVectorBar": "\u2954", "RightVector": "\u21C0", "RightVectorBar": "\u2953", "ring": "\u02DA", "risingdotseq": "\u2253", "rlarr": "\u21C4", "rlhar": "\u21CC", "rlm": "\u200F", "rmoust": "\u23B1", "rmoustache": "\u23B1", "rnmid": "\u2AEE", "roang": "\u27ED", "roarr": "\u21FE", "robrk": "\u27E7", "ropar": "\u2986", "ropf": "\u{1D563}", "Ropf": "\u211D", "roplus": "\u2A2E", "rotimes": "\u2A35", "RoundImplies": "\u2970", "rpar": ")", "rpargt": "\u2994", "rppolint": "\u2A12", "rrarr": "\u21C9", "Rrightarrow": "\u21DB", "rsaquo": "\u203A", "rscr": "\u{1D4C7}", "Rscr": "\u211B", "rsh": "\u21B1", "Rsh": "\u21B1", "rsqb": "]", "rsquo": "\u2019", "rsquor": "\u2019", "rthree": "\u22CC", "rtimes": "\u22CA", "rtri": "\u25B9", "rtrie": "\u22B5", "rtrif": "\u25B8", "rtriltri": "\u29CE", "RuleDelayed": "\u29F4", "ruluhar": "\u2968", "rx": "\u211E", "sacute": "\u015B", "Sacute": "\u015A", "sbquo": "\u201A", "sc": "\u227B", "Sc": "\u2ABC", "scap": "\u2AB8", "scaron": "\u0161", "Scaron": "\u0160", "sccue": "\u227D", "sce": "\u2AB0", "scE": "\u2AB4", "scedil": "\u015F", "Scedil": "\u015E", "scirc": "\u015D", "Scirc": "\u015C", "scnap": "\u2ABA", "scnE": "\u2AB6", "scnsim": "\u22E9", "scpolint": "\u2A13", "scsim": "\u227F", "scy": "\u0441", "Scy": "\u0421", "sdot": "\u22C5", "sdotb": "\u22A1", "sdote": "\u2A66", "searhk": "\u2925", "searr": "\u2198", "seArr": "\u21D8", "searrow": "\u2198", "sect": "\xA7", "semi": ";", "seswar": "\u2929", "setminus": "\u2216", "setmn": "\u2216", "sext": "\u2736", "sfr": "\u{1D530}", "Sfr": "\u{1D516}", "sfrown": "\u2322", "sharp": "\u266F", "shchcy": "\u0449", "SHCHcy": "\u0429", "shcy": "\u0448", "SHcy": "\u0428", "ShortDownArrow": "\u2193", "ShortLeftArrow": "\u2190", "shortmid": "\u2223", "shortparallel": "\u2225", "ShortRightArrow": "\u2192", "ShortUpArrow": "\u2191", "shy": "\xAD", "sigma": "\u03C3", "Sigma": "\u03A3", "sigmaf": "\u03C2", "sigmav": "\u03C2", "sim": "\u223C", "simdot": "\u2A6A", "sime": "\u2243", "simeq": "\u2243", "simg": "\u2A9E", "simgE": "\u2AA0", "siml": "\u2A9D", "simlE": "\u2A9F", "simne": "\u2246", "simplus": "\u2A24", "simrarr": "\u2972", "slarr": "\u2190", "SmallCircle": "\u2218", "smallsetminus": "\u2216", "smashp": "\u2A33", "smeparsl": "\u29E4", "smid": "\u2223", "smile": "\u2323", "smt": "\u2AAA", "smte": "\u2AAC", "smtes": "\u2AAC\uFE00", "softcy": "\u044C", "SOFTcy": "\u042C", "sol": "/", "solb": "\u29C4", "solbar": "\u233F", "sopf": "\u{1D564}", "Sopf": "\u{1D54A}", "spades": "\u2660", "spadesuit": "\u2660", "spar": "\u2225", "sqcap": "\u2293", "sqcaps": "\u2293\uFE00", "sqcup": "\u2294", "sqcups": "\u2294\uFE00", "Sqrt": "\u221A", "sqsub": "\u228F", "sqsube": "\u2291", "sqsubset": "\u228F", "sqsubseteq": "\u2291", "sqsup": "\u2290", "sqsupe": "\u2292", "sqsupset": "\u2290", "sqsupseteq": "\u2292", "squ": "\u25A1", "square": "\u25A1", "Square": "\u25A1", "SquareIntersection": "\u2293", "SquareSubset": "\u228F", "SquareSubsetEqual": "\u2291", "SquareSuperset": "\u2290", "SquareSupersetEqual": "\u2292", "SquareUnion": "\u2294", "squarf": "\u25AA", "squf": "\u25AA", "srarr": "\u2192", "sscr": "\u{1D4C8}", "Sscr": "\u{1D4AE}", "ssetmn": "\u2216", "ssmile": "\u2323", "sstarf": "\u22C6", "star": "\u2606", "Star": "\u22C6", "starf": "\u2605", "straightepsilon": "\u03F5", "straightphi": "\u03D5", "strns": "\xAF", "sub": "\u2282", "Sub": "\u22D0", "subdot": "\u2ABD", "sube": "\u2286", "subE": "\u2AC5", "subedot": "\u2AC3", "submult": "\u2AC1", "subne": "\u228A", "subnE": "\u2ACB", "subplus": "\u2ABF", "subrarr": "\u2979", "subset": "\u2282", "Subset": "\u22D0", "subseteq": "\u2286", "subseteqq": "\u2AC5", "SubsetEqual": "\u2286", "subsetneq": "\u228A", "subsetneqq": "\u2ACB", "subsim": "\u2AC7", "subsub": "\u2AD5", "subsup": "\u2AD3", "succ": "\u227B", "succapprox": "\u2AB8", "succcurlyeq": "\u227D", "Succeeds": "\u227B", "SucceedsEqual": "\u2AB0", "SucceedsSlantEqual": "\u227D", "SucceedsTilde": "\u227F", "succeq": "\u2AB0", "succnapprox": "\u2ABA", "succneqq": "\u2AB6", "succnsim": "\u22E9", "succsim": "\u227F", "SuchThat": "\u220B", "sum": "\u2211", "Sum": "\u2211", "sung": "\u266A", "sup": "\u2283", "Sup": "\u22D1", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "supdot": "\u2ABE", "supdsub": "\u2AD8", "supe": "\u2287", "supE": "\u2AC6", "supedot": "\u2AC4", "Superset": "\u2283", "SupersetEqual": "\u2287", "suphsol": "\u27C9", "suphsub": "\u2AD7", "suplarr": "\u297B", "supmult": "\u2AC2", "supne": "\u228B", "supnE": "\u2ACC", "supplus": "\u2AC0", "supset": "\u2283", "Supset": "\u22D1", "supseteq": "\u2287", "supseteqq": "\u2AC6", "supsetneq": "\u228B", "supsetneqq": "\u2ACC", "supsim": "\u2AC8", "supsub": "\u2AD4", "supsup": "\u2AD6", "swarhk": "\u2926", "swarr": "\u2199", "swArr": "\u21D9", "swarrow": "\u2199", "swnwar": "\u292A", "szlig": "\xDF", "Tab": "	", "target": "\u2316", "tau": "\u03C4", "Tau": "\u03A4", "tbrk": "\u23B4", "tcaron": "\u0165", "Tcaron": "\u0164", "tcedil": "\u0163", "Tcedil": "\u0162", "tcy": "\u0442", "Tcy": "\u0422", "tdot": "\u20DB", "telrec": "\u2315", "tfr": "\u{1D531}", "Tfr": "\u{1D517}", "there4": "\u2234", "therefore": "\u2234", "Therefore": "\u2234", "theta": "\u03B8", "Theta": "\u0398", "thetasym": "\u03D1", "thetav": "\u03D1", "thickapprox": "\u2248", "thicksim": "\u223C", "ThickSpace": "\u205F\u200A", "thinsp": "\u2009", "ThinSpace": "\u2009", "thkap": "\u2248", "thksim": "\u223C", "thorn": "\xFE", "THORN": "\xDE", "tilde": "\u02DC", "Tilde": "\u223C", "TildeEqual": "\u2243", "TildeFullEqual": "\u2245", "TildeTilde": "\u2248", "times": "\xD7", "timesb": "\u22A0", "timesbar": "\u2A31", "timesd": "\u2A30", "tint": "\u222D", "toea": "\u2928", "top": "\u22A4", "topbot": "\u2336", "topcir": "\u2AF1", "topf": "\u{1D565}", "Topf": "\u{1D54B}", "topfork": "\u2ADA", "tosa": "\u2929", "tprime": "\u2034", "trade": "\u2122", "TRADE": "\u2122", "triangle": "\u25B5", "triangledown": "\u25BF", "triangleleft": "\u25C3", "trianglelefteq": "\u22B4", "triangleq": "\u225C", "triangleright": "\u25B9", "trianglerighteq": "\u22B5", "tridot": "\u25EC", "trie": "\u225C", "triminus": "\u2A3A", "TripleDot": "\u20DB", "triplus": "\u2A39", "trisb": "\u29CD", "tritime": "\u2A3B", "trpezium": "\u23E2", "tscr": "\u{1D4C9}", "Tscr": "\u{1D4AF}", "tscy": "\u0446", "TScy": "\u0426", "tshcy": "\u045B", "TSHcy": "\u040B", "tstrok": "\u0167", "Tstrok": "\u0166", "twixt": "\u226C", "twoheadleftarrow": "\u219E", "twoheadrightarrow": "\u21A0", "uacute": "\xFA", "Uacute": "\xDA", "uarr": "\u2191", "uArr": "\u21D1", "Uarr": "\u219F", "Uarrocir": "\u2949", "ubrcy": "\u045E", "Ubrcy": "\u040E", "ubreve": "\u016D", "Ubreve": "\u016C", "ucirc": "\xFB", "Ucirc": "\xDB", "ucy": "\u0443", "Ucy": "\u0423", "udarr": "\u21C5", "udblac": "\u0171", "Udblac": "\u0170", "udhar": "\u296E", "ufisht": "\u297E", "ufr": "\u{1D532}", "Ufr": "\u{1D518}", "ugrave": "\xF9", "Ugrave": "\xD9", "uHar": "\u2963", "uharl": "\u21BF", "uharr": "\u21BE", "uhblk": "\u2580", "ulcorn": "\u231C", "ulcorner": "\u231C", "ulcrop": "\u230F", "ultri": "\u25F8", "umacr": "\u016B", "Umacr": "\u016A", "uml": "\xA8", "UnderBar": "_", "UnderBrace": "\u23DF", "UnderBracket": "\u23B5", "UnderParenthesis": "\u23DD", "Union": "\u22C3", "UnionPlus": "\u228E", "uogon": "\u0173", "Uogon": "\u0172", "uopf": "\u{1D566}", "Uopf": "\u{1D54C}", "uparrow": "\u2191", "Uparrow": "\u21D1", "UpArrow": "\u2191", "UpArrowBar": "\u2912", "UpArrowDownArrow": "\u21C5", "updownarrow": "\u2195", "Updownarrow": "\u21D5", "UpDownArrow": "\u2195", "UpEquilibrium": "\u296E", "upharpoonleft": "\u21BF", "upharpoonright": "\u21BE", "uplus": "\u228E", "UpperLeftArrow": "\u2196", "UpperRightArrow": "\u2197", "upsi": "\u03C5", "Upsi": "\u03D2", "upsih": "\u03D2", "upsilon": "\u03C5", "Upsilon": "\u03A5", "UpTee": "\u22A5", "UpTeeArrow": "\u21A5", "upuparrows": "\u21C8", "urcorn": "\u231D", "urcorner": "\u231D", "urcrop": "\u230E", "uring": "\u016F", "Uring": "\u016E", "urtri": "\u25F9", "uscr": "\u{1D4CA}", "Uscr": "\u{1D4B0}", "utdot": "\u22F0", "utilde": "\u0169", "Utilde": "\u0168", "utri": "\u25B5", "utrif": "\u25B4", "uuarr": "\u21C8", "uuml": "\xFC", "Uuml": "\xDC", "uwangle": "\u29A7", "vangrt": "\u299C", "varepsilon": "\u03F5", "varkappa": "\u03F0", "varnothing": "\u2205", "varphi": "\u03D5", "varpi": "\u03D6", "varpropto": "\u221D", "varr": "\u2195", "vArr": "\u21D5", "varrho": "\u03F1", "varsigma": "\u03C2", "varsubsetneq": "\u228A\uFE00", "varsubsetneqq": "\u2ACB\uFE00", "varsupsetneq": "\u228B\uFE00", "varsupsetneqq": "\u2ACC\uFE00", "vartheta": "\u03D1", "vartriangleleft": "\u22B2", "vartriangleright": "\u22B3", "vBar": "\u2AE8", "Vbar": "\u2AEB", "vBarv": "\u2AE9", "vcy": "\u0432", "Vcy": "\u0412", "vdash": "\u22A2", "vDash": "\u22A8", "Vdash": "\u22A9", "VDash": "\u22AB", "Vdashl": "\u2AE6", "vee": "\u2228", "Vee": "\u22C1", "veebar": "\u22BB", "veeeq": "\u225A", "vellip": "\u22EE", "verbar": "|", "Verbar": "\u2016", "vert": "|", "Vert": "\u2016", "VerticalBar": "\u2223", "VerticalLine": "|", "VerticalSeparator": "\u2758", "VerticalTilde": "\u2240", "VeryThinSpace": "\u200A", "vfr": "\u{1D533}", "Vfr": "\u{1D519}", "vltri": "\u22B2", "vnsub": "\u2282\u20D2", "vnsup": "\u2283\u20D2", "vopf": "\u{1D567}", "Vopf": "\u{1D54D}", "vprop": "\u221D", "vrtri": "\u22B3", "vscr": "\u{1D4CB}", "Vscr": "\u{1D4B1}", "vsubne": "\u228A\uFE00", "vsubnE": "\u2ACB\uFE00", "vsupne": "\u228B\uFE00", "vsupnE": "\u2ACC\uFE00", "Vvdash": "\u22AA", "vzigzag": "\u299A", "wcirc": "\u0175", "Wcirc": "\u0174", "wedbar": "\u2A5F", "wedge": "\u2227", "Wedge": "\u22C0", "wedgeq": "\u2259", "weierp": "\u2118", "wfr": "\u{1D534}", "Wfr": "\u{1D51A}", "wopf": "\u{1D568}", "Wopf": "\u{1D54E}", "wp": "\u2118", "wr": "\u2240", "wreath": "\u2240", "wscr": "\u{1D4CC}", "Wscr": "\u{1D4B2}", "xcap": "\u22C2", "xcirc": "\u25EF", "xcup": "\u22C3", "xdtri": "\u25BD", "xfr": "\u{1D535}", "Xfr": "\u{1D51B}", "xharr": "\u27F7", "xhArr": "\u27FA", "xi": "\u03BE", "Xi": "\u039E", "xlarr": "\u27F5", "xlArr": "\u27F8", "xmap": "\u27FC", "xnis": "\u22FB", "xodot": "\u2A00", "xopf": "\u{1D569}", "Xopf": "\u{1D54F}", "xoplus": "\u2A01", "xotime": "\u2A02", "xrarr": "\u27F6", "xrArr": "\u27F9", "xscr": "\u{1D4CD}", "Xscr": "\u{1D4B3}", "xsqcup": "\u2A06", "xuplus": "\u2A04", "xutri": "\u25B3", "xvee": "\u22C1", "xwedge": "\u22C0", "yacute": "\xFD", "Yacute": "\xDD", "yacy": "\u044F", "YAcy": "\u042F", "ycirc": "\u0177", "Ycirc": "\u0176", "ycy": "\u044B", "Ycy": "\u042B", "yen": "\xA5", "yfr": "\u{1D536}", "Yfr": "\u{1D51C}", "yicy": "\u0457", "YIcy": "\u0407", "yopf": "\u{1D56A}", "Yopf": "\u{1D550}", "yscr": "\u{1D4CE}", "Yscr": "\u{1D4B4}", "yucy": "\u044E", "YUcy": "\u042E", "yuml": "\xFF", "Yuml": "\u0178", "zacute": "\u017A", "Zacute": "\u0179", "zcaron": "\u017E", "Zcaron": "\u017D", "zcy": "\u0437", "Zcy": "\u0417", "zdot": "\u017C", "Zdot": "\u017B", "zeetrf": "\u2128", "ZeroWidthSpace": "\u200B", "zeta": "\u03B6", "Zeta": "\u0396", "zfr": "\u{1D537}", "Zfr": "\u2128", "zhcy": "\u0436", "ZHcy": "\u0416", "zigrarr": "\u21DD", "zopf": "\u{1D56B}", "Zopf": "\u2124", "zscr": "\u{1D4CF}", "Zscr": "\u{1D4B5}", "zwj": "\u200D", "zwnj": "\u200C" };
      var decodeMapLegacy = { "aacute": "\xE1", "Aacute": "\xC1", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "aelig": "\xE6", "AElig": "\xC6", "agrave": "\xE0", "Agrave": "\xC0", "amp": "&", "AMP": "&", "aring": "\xE5", "Aring": "\xC5", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "brvbar": "\xA6", "ccedil": "\xE7", "Ccedil": "\xC7", "cedil": "\xB8", "cent": "\xA2", "copy": "\xA9", "COPY": "\xA9", "curren": "\xA4", "deg": "\xB0", "divide": "\xF7", "eacute": "\xE9", "Eacute": "\xC9", "ecirc": "\xEA", "Ecirc": "\xCA", "egrave": "\xE8", "Egrave": "\xC8", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "frac12": "\xBD", "frac14": "\xBC", "frac34": "\xBE", "gt": ">", "GT": ">", "iacute": "\xED", "Iacute": "\xCD", "icirc": "\xEE", "Icirc": "\xCE", "iexcl": "\xA1", "igrave": "\xEC", "Igrave": "\xCC", "iquest": "\xBF", "iuml": "\xEF", "Iuml": "\xCF", "laquo": "\xAB", "lt": "<", "LT": "<", "macr": "\xAF", "micro": "\xB5", "middot": "\xB7", "nbsp": "\xA0", "not": "\xAC", "ntilde": "\xF1", "Ntilde": "\xD1", "oacute": "\xF3", "Oacute": "\xD3", "ocirc": "\xF4", "Ocirc": "\xD4", "ograve": "\xF2", "Ograve": "\xD2", "ordf": "\xAA", "ordm": "\xBA", "oslash": "\xF8", "Oslash": "\xD8", "otilde": "\xF5", "Otilde": "\xD5", "ouml": "\xF6", "Ouml": "\xD6", "para": "\xB6", "plusmn": "\xB1", "pound": "\xA3", "quot": '"', "QUOT": '"', "raquo": "\xBB", "reg": "\xAE", "REG": "\xAE", "sect": "\xA7", "shy": "\xAD", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "szlig": "\xDF", "thorn": "\xFE", "THORN": "\xDE", "times": "\xD7", "uacute": "\xFA", "Uacute": "\xDA", "ucirc": "\xFB", "Ucirc": "\xDB", "ugrave": "\xF9", "Ugrave": "\xD9", "uml": "\xA8", "uuml": "\xFC", "Uuml": "\xDC", "yacute": "\xFD", "Yacute": "\xDD", "yen": "\xA5", "yuml": "\xFF" };
      var decodeMapNumeric = { "0": "\uFFFD", "128": "\u20AC", "130": "\u201A", "131": "\u0192", "132": "\u201E", "133": "\u2026", "134": "\u2020", "135": "\u2021", "136": "\u02C6", "137": "\u2030", "138": "\u0160", "139": "\u2039", "140": "\u0152", "142": "\u017D", "145": "\u2018", "146": "\u2019", "147": "\u201C", "148": "\u201D", "149": "\u2022", "150": "\u2013", "151": "\u2014", "152": "\u02DC", "153": "\u2122", "154": "\u0161", "155": "\u203A", "156": "\u0153", "158": "\u017E", "159": "\u0178" };
      var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
      var stringFromCharCode = String.fromCharCode;
      var object = {};
      var hasOwnProperty = object.hasOwnProperty;
      var has2 = function(object2, propertyName) {
        return hasOwnProperty.call(object2, propertyName);
      };
      var contains = function(array, value) {
        var index = -1;
        var length = array.length;
        while (++index < length) {
          if (array[index] == value) {
            return true;
          }
        }
        return false;
      };
      var merge = function(options, defaults) {
        if (!options) {
          return defaults;
        }
        var result = {};
        var key2;
        for (key2 in defaults) {
          result[key2] = has2(options, key2) ? options[key2] : defaults[key2];
        }
        return result;
      };
      var codePointToSymbol = function(codePoint, strict) {
        var output = "";
        if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
          if (strict) {
            parseError("character reference outside the permissible Unicode range");
          }
          return "\uFFFD";
        }
        if (has2(decodeMapNumeric, codePoint)) {
          if (strict) {
            parseError("disallowed character reference");
          }
          return decodeMapNumeric[codePoint];
        }
        if (strict && contains(invalidReferenceCodePoints, codePoint)) {
          parseError("disallowed character reference");
        }
        if (codePoint > 65535) {
          codePoint -= 65536;
          output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        output += stringFromCharCode(codePoint);
        return output;
      };
      var hexEscape = function(codePoint) {
        return "&#x" + codePoint.toString(16).toUpperCase() + ";";
      };
      var decEscape = function(codePoint) {
        return "&#" + codePoint + ";";
      };
      var parseError = function(message) {
        throw Error("Parse error: " + message);
      };
      var encode = function(string, options) {
        options = merge(options, encode.options);
        var strict = options.strict;
        if (strict && regexInvalidRawCodePoint.test(string)) {
          parseError("forbidden code point");
        }
        var encodeEverything = options.encodeEverything;
        var useNamedReferences = options.useNamedReferences;
        var allowUnsafeSymbols = options.allowUnsafeSymbols;
        var escapeCodePoint = options.decimal ? decEscape : hexEscape;
        var escapeBmpSymbol = function(symbol) {
          return escapeCodePoint(symbol.charCodeAt(0));
        };
        if (encodeEverything) {
          string = string.replace(regexAsciiWhitelist, function(symbol) {
            if (useNamedReferences && has2(encodeMap, symbol)) {
              return "&" + encodeMap[symbol] + ";";
            }
            return escapeBmpSymbol(symbol);
          });
          if (useNamedReferences) {
            string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
          }
          if (useNamedReferences) {
            string = string.replace(regexEncodeNonAscii, function(string2) {
              return "&" + encodeMap[string2] + ";";
            });
          }
        } else if (useNamedReferences) {
          if (!allowUnsafeSymbols) {
            string = string.replace(regexEscape, function(string2) {
              return "&" + encodeMap[string2] + ";";
            });
          }
          string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
          string = string.replace(regexEncodeNonAscii, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        } else if (!allowUnsafeSymbols) {
          string = string.replace(regexEscape, escapeBmpSymbol);
        }
        return string.replace(regexAstralSymbols, function($0) {
          var high = $0.charCodeAt(0);
          var low = $0.charCodeAt(1);
          var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
          return escapeCodePoint(codePoint);
        }).replace(regexBmpWhitelist, escapeBmpSymbol);
      };
      encode.options = {
        "allowUnsafeSymbols": false,
        "encodeEverything": false,
        "strict": false,
        "useNamedReferences": false,
        "decimal": false
      };
      var decode = function(html, options) {
        options = merge(options, decode.options);
        var strict = options.strict;
        if (strict && regexInvalidEntity.test(html)) {
          parseError("malformed character reference");
        }
        return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
          var codePoint;
          var semicolon;
          var decDigits;
          var hexDigits;
          var reference;
          var next;
          if ($1) {
            reference = $1;
            return decodeMap[reference];
          }
          if ($2) {
            reference = $2;
            next = $3;
            if (next && options.isAttributeValue) {
              if (strict && next == "=") {
                parseError("`&` did not start a character reference");
              }
              return $0;
            } else {
              if (strict) {
                parseError(
                  "named character reference was not terminated by a semicolon"
                );
              }
              return decodeMapLegacy[reference] + (next || "");
            }
          }
          if ($4) {
            decDigits = $4;
            semicolon = $5;
            if (strict && !semicolon) {
              parseError("character reference was not terminated by a semicolon");
            }
            codePoint = parseInt(decDigits, 10);
            return codePointToSymbol(codePoint, strict);
          }
          if ($6) {
            hexDigits = $6;
            semicolon = $7;
            if (strict && !semicolon) {
              parseError("character reference was not terminated by a semicolon");
            }
            codePoint = parseInt(hexDigits, 16);
            return codePointToSymbol(codePoint, strict);
          }
          if (strict) {
            parseError(
              "named character reference was not terminated by a semicolon"
            );
          }
          return $0;
        });
      };
      decode.options = {
        "isAttributeValue": false,
        "strict": false
      };
      var escape = function(string) {
        return string.replace(regexEscape, function($0) {
          return escapeMap[$0];
        });
      };
      var he = {
        "version": "1.2.0",
        "encode": encode,
        "decode": decode,
        "escape": escape,
        "unescape": decode
      };
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(function() {
          return he;
        });
      } else if (freeExports && !freeExports.nodeType) {
        if (freeModule) {
          freeModule.exports = he;
        } else {
          for (var key in he) {
            has2(he, key) && (freeExports[key] = he[key]);
          }
        }
      } else {
        root.he = he;
      }
    })(exports2);
  }
});

// node_modules/exiftool-vendored/dist/Struct.js
var require_Struct = __commonJS({
  "node_modules/exiftool-vendored/dist/Struct.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isStruct = isStruct;
    var DateTime_1 = require_DateTime();
    function isStruct(o) {
      return o != null && o.constructor?.name === "Object" && Object.values(o).every((v) => {
        const t = typeof v;
        return t === "string" || t === "number" || (0, DateTime_1.isDateOrTime)(v) || isStruct(v) || Array.isArray(v);
      });
    }
  }
});

// node_modules/exiftool-vendored/dist/WriteTask.js
var require_WriteTask = __commonJS({
  "node_modules/exiftool-vendored/dist/WriteTask.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WriteTask = exports2.DefaultWriteTaskOptions = exports2.WriteTaskOptionFields = void 0;
    exports2.htmlEncode = htmlEncode;
    var he_1 = require_he();
    var _path = __importStar(require("node:path"));
    var Array_1 = require_Array2();
    var DateTime_1 = require_DateTime();
    var DefaultExifToolOptions_1 = require_DefaultExifToolOptions();
    var ErrorsAndWarnings_1 = require_ErrorsAndWarnings();
    var ExifToolTask_1 = require_ExifToolTask();
    var FilenameCharsetArgs_1 = require_FilenameCharsetArgs();
    var Number_1 = require_Number();
    var Object_1 = require_Object2();
    var Pick_1 = require_Pick();
    var String_1 = require_String2();
    var Struct_1 = require_Struct();
    var sep = String.fromCharCode(31);
    function htmlEncode(s) {
      return (
        // allowUnsafeSymbols is true because ExifTool doesn't care about &, <, >, ", ', * and `
        (0, he_1.encode)(s, { decimal: true, allowUnsafeSymbols: true }).replace(/\s/g, (m) => m === " " ? " " : `&#${m.charCodeAt(0)};`)
      );
    }
    function enc(o, structValue = false) {
      if (o == null) {
        return "";
      } else if ((0, Number_1.isNumber)(o)) {
        return String(o);
      } else if (typeof o === "boolean") {
        return o ? "True" : "False";
      } else if ((0, String_1.isString)(o)) {
        return htmlEncode(structValue ? o.replace(/[,[\]{}|]/g, (ea) => "|" + ea) : o);
      } else if ((0, DateTime_1.isDateOrTime)(o)) {
        return (0, DateTime_1.toExifString)(o);
      } else if (Array.isArray(o)) {
        const primitiveArray = o.every((ea) => (0, String_1.isString)(ea) || (0, Number_1.isNumber)(ea));
        return primitiveArray ? `${o.map((ea) => enc(ea)).join(sep)}` : `[${o.map((ea) => enc(ea)).join(",")}]`;
      } else if ((0, Struct_1.isStruct)(o)) {
        return `{${(0, Object_1.keys)(o).map((k) => enc(k, true) + "=" + enc(o[k], true)).join(",")}}`;
      } else {
        throw new Error("cannot encode " + JSON.stringify(o));
      }
    }
    exports2.WriteTaskOptionFields = [
      "useMWG",
      "struct",
      "ignoreMinorErrors",
      "writeArgs"
    ];
    exports2.DefaultWriteTaskOptions = {
      ...(0, Pick_1.pick)(DefaultExifToolOptions_1.DefaultExifToolOptions, ...exports2.WriteTaskOptionFields)
    };
    var WriteTask = class _WriteTask extends ExifToolTask_1.ExifToolTask {
      sourceFile;
      args;
      options;
      constructor(sourceFile, args, options) {
        super(args, options);
        this.sourceFile = sourceFile;
        this.args = args;
        this.options = options;
      }
      static for(filename, tags2, options) {
        const sourceFile = _path.resolve(filename);
        const args = [
          // ensure exiftool thinks this is a write command:
          ...FilenameCharsetArgs_1.Utf8FilenameCharsetArgs,
          `-sep`,
          `${sep}`,
          "-E"
          // < html encoding https://exiftool.org/faq.html#Q10
        ];
        args.push("-api", "struct=" + ((0, Number_1.isNumber)(options?.struct) ? options.struct : "2"));
        if (options?.useMWG ?? exports2.DefaultWriteTaskOptions.useMWG) {
          args.push("-use", "MWG");
        }
        if ((0, Number_1.isNumber)(tags2.GPSLatitude)) {
          tags2.GPSLatitudeRef ??= tags2.GPSLatitude;
        } else if (tags2.GPSLatitude === null) {
          tags2.GPSLatitudeRef ??= null;
        }
        if ((0, Number_1.isNumber)(tags2.GPSLongitude)) {
          tags2.GPSLongitudeRef ??= tags2.GPSLongitude;
        } else if (tags2.GPSLongitude === null) {
          tags2.GPSLongitudeRef ??= null;
        }
        if ((0, Number_1.isNumber)(tags2.GPSLatitude) && (0, Number_1.isNumber)(tags2.GPSLongitude)) {
          tags2.GPSPosition = tags2.GPSLatitude + "," + tags2.GPSLongitude;
        }
        if ((0, Number_1.isNumber)(tags2.GPSAltitude)) {
          tags2.GPSAltitudeRef ??= tags2.GPSAltitude;
        } else if (tags2.GPSAltitude === null) {
          tags2.GPSAltitudeRef ??= null;
        }
        const fieldsToSet = [];
        for (const key of (0, Object_1.keys)(tags2)) {
          const val = tags2[key];
          fieldsToSet.push(`-${key}=${enc(val)}`);
        }
        if (fieldsToSet.length === 0) {
          fieldsToSet.push("-FileName<FileName");
        }
        args.push(...fieldsToSet, ...(0, Array_1.toArray)(options.writeArgs), sourceFile);
        return new _WriteTask(sourceFile, args, options);
      }
      toString() {
        return "WriteTask(" + this.sourceFile + ")";
      }
      // we're handling the stderr output ourselves, so we tell ExifToolTask that
      // all stderr output is not ignorable so we can capture the warnings
      parse(data, error) {
        if (error != null)
          throw error;
        let created = 0;
        let updated = 0;
        let unchanged = 0;
        for (const line of (0, String_1.splitLines)(data)) {
          const m_created = CreatedRE.exec(line)?.groups?.count;
          if (m_created != null) {
            created += (0, Number_1.toInt)(m_created) ?? 0;
            continue;
          }
          const m_unchanged = UnchangedRE.exec(line)?.groups?.count;
          if (m_unchanged != null) {
            unchanged += (0, Number_1.toInt)(m_unchanged) ?? 0;
            continue;
          }
          const m_updated = UpdatedRE.exec(line)?.groups?.count;
          if (m_updated != null) {
            updated += (0, Number_1.toInt)(m_updated) ?? 0;
            continue;
          }
          this.warnings.push("Unexpected output from ExifTool: " + JSON.stringify(line));
        }
        const w = (0, ErrorsAndWarnings_1.errorsAndWarnings)(this).warnings ?? [];
        return {
          created,
          updated,
          unchanged,
          ...w.length === 0 ? {} : { warnings: w }
        };
      }
    };
    exports2.WriteTask = WriteTask;
    var CreatedRE = /(?<count>\d{1,5}) [\w ]{1,12}\bcreated$/i;
    var UnchangedRE = /(?<count>\d{1,5}) [\w ]{1,12}\b(?:weren't updated|unchanged)$/i;
    var UpdatedRE = /(?<count>\d{1,5}) [\w ]{1,12}\bupdated$/i;
  }
});

// node_modules/exiftool-vendored/dist/GeolocationTags.js
var require_GeolocationTags = __commonJS({
  "node_modules/exiftool-vendored/dist/GeolocationTags.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GeolocationTagNames = void 0;
    exports2.isGeolocationTag = isGeolocationTag;
    var StrEnum_1 = require_StrEnum();
    exports2.GeolocationTagNames = (0, StrEnum_1.strEnum)("GeolocationBearing", "GeolocationCity", "GeolocationCountry", "GeolocationCountryCode", "GeolocationDistance", "GeolocationFeatureCode", "GeolocationFeatureType", "GeolocationPopulation", "GeolocationPosition", "GeolocationRegion", "GeolocationSubregion", "GeolocationTimeZone", "GeolocationWarning");
    function isGeolocationTag(tag) {
      return exports2.GeolocationTagNames.has(tag);
    }
  }
});

// node_modules/exiftool-vendored/dist/JSON.js
var require_JSON = __commonJS({
  "node_modules/exiftool-vendored/dist/JSON.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseJSON = parseJSON;
    var BinaryField_1 = require_BinaryField();
    var ExifDate_1 = require_ExifDate();
    var ExifDateTime_1 = require_ExifDateTime();
    var ExifTime_1 = require_ExifTime();
    var Revivers = {
      BinaryField: (ea) => BinaryField_1.BinaryField.fromJSON(ea),
      ExifDateTime: (ea) => ExifDateTime_1.ExifDateTime.fromJSON(ea),
      ExifDate: (ea) => ExifDate_1.ExifDate.fromJSON(ea),
      ExifTime: (ea) => ExifTime_1.ExifTime.fromJSON(ea)
    };
    function parseJSON(s) {
      return JSON.parse(s, (_key, value) => {
        if (typeof value === "object" && value !== null && "_ctor" in value && typeof value._ctor === "string") {
          return Revivers[value._ctor]?.(value) ?? value;
        }
        return value;
      });
    }
  }
});

// node_modules/exiftool-vendored/dist/ExifTool.js
var require_ExifTool = __commonJS({
  "node_modules/exiftool-vendored/dist/ExifTool.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exiftool = exports2.ExifTool = exports2.WriteTaskOptionFields = exports2.DefaultWriteTaskOptions = exports2.UnsetZoneOffsetMinutes = exports2.UnsetZoneName = exports2.UnsetZone = exports2.TimezoneOffsetTagnames = exports2.offsetMinutesToZoneName = exports2.defaultVideosToUTC = exports2.strEnum = exports2.DefaultReadTaskOptions = exports2.parseJSON = exports2.isGeolocationTag = exports2.GeolocationTagNames = exports2.exiftoolPath = exports2.ExifToolTask = exports2.ExifTime = exports2.ExifDateTime = exports2.ExifDate = exports2.DefaultMaxProcs = exports2.DefaultExiftoolArgs = exports2.DefaultExifToolOptions = exports2.CapturedAtTagNames = exports2.BinaryField = exports2.retryOnReject = void 0;
    var bc = __importStar(require_BatchCluster());
    var _cp = __importStar(require("node:child_process"));
    var _fs = __importStar(require("node:fs"));
    var node_process_1 = __importDefault(require("node:process"));
    var Array_1 = require_Array2();
    var AsyncRetry_1 = require_AsyncRetry();
    var BinaryExtractionTask_1 = require_BinaryExtractionTask();
    var BinaryToBufferTask_1 = require_BinaryToBufferTask();
    var DefaultExifToolOptions_1 = require_DefaultExifToolOptions();
    var DeleteAllTagsArgs_1 = require_DeleteAllTagsArgs();
    var ExifToolOptions_1 = require_ExifToolOptions();
    var ExiftoolPath_1 = require_ExiftoolPath();
    var IsWin32_1 = require_IsWin32();
    var Lazy_1 = require_Lazy();
    var Object_1 = require_Object2();
    var Pick_1 = require_Pick();
    var ReadRawTask_1 = require_ReadRawTask();
    var ReadTask_1 = require_ReadTask();
    var RewriteAllTagsTask_1 = require_RewriteAllTagsTask();
    var String_1 = require_String2();
    var VersionTask_1 = require_VersionTask();
    var Which_1 = require_Which();
    var WriteTask_1 = require_WriteTask();
    var AsyncRetry_2 = require_AsyncRetry();
    Object.defineProperty(exports2, "retryOnReject", { enumerable: true, get: function() {
      return AsyncRetry_2.retryOnReject;
    } });
    var BinaryField_1 = require_BinaryField();
    Object.defineProperty(exports2, "BinaryField", { enumerable: true, get: function() {
      return BinaryField_1.BinaryField;
    } });
    var CapturedAtTagNames_1 = require_CapturedAtTagNames();
    Object.defineProperty(exports2, "CapturedAtTagNames", { enumerable: true, get: function() {
      return CapturedAtTagNames_1.CapturedAtTagNames;
    } });
    var DefaultExifToolOptions_2 = require_DefaultExifToolOptions();
    Object.defineProperty(exports2, "DefaultExifToolOptions", { enumerable: true, get: function() {
      return DefaultExifToolOptions_2.DefaultExifToolOptions;
    } });
    var DefaultExiftoolArgs_1 = require_DefaultExiftoolArgs();
    Object.defineProperty(exports2, "DefaultExiftoolArgs", { enumerable: true, get: function() {
      return DefaultExiftoolArgs_1.DefaultExiftoolArgs;
    } });
    var DefaultMaxProcs_1 = require_DefaultMaxProcs();
    Object.defineProperty(exports2, "DefaultMaxProcs", { enumerable: true, get: function() {
      return DefaultMaxProcs_1.DefaultMaxProcs;
    } });
    var ExifDate_1 = require_ExifDate();
    Object.defineProperty(exports2, "ExifDate", { enumerable: true, get: function() {
      return ExifDate_1.ExifDate;
    } });
    var ExifDateTime_1 = require_ExifDateTime();
    Object.defineProperty(exports2, "ExifDateTime", { enumerable: true, get: function() {
      return ExifDateTime_1.ExifDateTime;
    } });
    var ExifTime_1 = require_ExifTime();
    Object.defineProperty(exports2, "ExifTime", { enumerable: true, get: function() {
      return ExifTime_1.ExifTime;
    } });
    var ExifToolTask_1 = require_ExifToolTask();
    Object.defineProperty(exports2, "ExifToolTask", { enumerable: true, get: function() {
      return ExifToolTask_1.ExifToolTask;
    } });
    var ExiftoolPath_2 = require_ExiftoolPath();
    Object.defineProperty(exports2, "exiftoolPath", { enumerable: true, get: function() {
      return ExiftoolPath_2.exiftoolPath;
    } });
    var GeolocationTags_1 = require_GeolocationTags();
    Object.defineProperty(exports2, "GeolocationTagNames", { enumerable: true, get: function() {
      return GeolocationTags_1.GeolocationTagNames;
    } });
    Object.defineProperty(exports2, "isGeolocationTag", { enumerable: true, get: function() {
      return GeolocationTags_1.isGeolocationTag;
    } });
    var JSON_1 = require_JSON();
    Object.defineProperty(exports2, "parseJSON", { enumerable: true, get: function() {
      return JSON_1.parseJSON;
    } });
    var ReadTask_2 = require_ReadTask();
    Object.defineProperty(exports2, "DefaultReadTaskOptions", { enumerable: true, get: function() {
      return ReadTask_2.DefaultReadTaskOptions;
    } });
    var StrEnum_1 = require_StrEnum();
    Object.defineProperty(exports2, "strEnum", { enumerable: true, get: function() {
      return StrEnum_1.strEnum;
    } });
    var Timezones_1 = require_Timezones();
    Object.defineProperty(exports2, "defaultVideosToUTC", { enumerable: true, get: function() {
      return Timezones_1.defaultVideosToUTC;
    } });
    Object.defineProperty(exports2, "offsetMinutesToZoneName", { enumerable: true, get: function() {
      return Timezones_1.offsetMinutesToZoneName;
    } });
    Object.defineProperty(exports2, "TimezoneOffsetTagnames", { enumerable: true, get: function() {
      return Timezones_1.TimezoneOffsetTagnames;
    } });
    Object.defineProperty(exports2, "UnsetZone", { enumerable: true, get: function() {
      return Timezones_1.UnsetZone;
    } });
    Object.defineProperty(exports2, "UnsetZoneName", { enumerable: true, get: function() {
      return Timezones_1.UnsetZoneName;
    } });
    Object.defineProperty(exports2, "UnsetZoneOffsetMinutes", { enumerable: true, get: function() {
      return Timezones_1.UnsetZoneOffsetMinutes;
    } });
    var WriteTask_2 = require_WriteTask();
    Object.defineProperty(exports2, "DefaultWriteTaskOptions", { enumerable: true, get: function() {
      return WriteTask_2.DefaultWriteTaskOptions;
    } });
    Object.defineProperty(exports2, "WriteTaskOptionFields", { enumerable: true, get: function() {
      return WriteTask_2.WriteTaskOptionFields;
    } });
    var PERL = "/usr/bin/perl";
    var _ignoreShebang = (0, Lazy_1.lazy)(() => !(0, IsWin32_1.isWin32)() && !_fs.existsSync(PERL));
    var whichPerl = (0, Lazy_1.lazy)(async () => {
      const result = await (0, Which_1.which)(PERL);
      if (result == null) {
        throw new Error("Perl must be installed. Please add perl to your $PATH and try again.");
      }
      return result;
    });
    var ExifTool = class {
      options;
      batchCluster;
      constructor(options = {}) {
        if (options != null && typeof options !== "object") {
          throw new Error("Please update caller to the new ExifTool constructor API");
        }
        const o = (0, ExifToolOptions_1.handleDeprecatedOptions)({
          ...DefaultExifToolOptions_1.DefaultExifToolOptions,
          ...options
        });
        const ignoreShebang = o.ignoreShebang ?? _ignoreShebang();
        const env = { ...o.exiftoolEnv, LANG: "C" };
        if ((0, String_1.notBlank)(node_process_1.default.env.EXIFTOOL_HOME) && (0, String_1.blank)(env.EXIFTOOL_HOME)) {
          env.EXIFTOOL_HOME = node_process_1.default.env.EXIFTOOL_HOME;
        }
        const spawnOpts = {
          stdio: "pipe",
          shell: false,
          detached: false,
          // < no orphaned exiftool procs, please
          env
        };
        const processFactory = async () => ignoreShebang ? _cp.spawn(await whichPerl(), [await this.exiftoolPath(), ...o.exiftoolArgs], spawnOpts) : _cp.spawn(await this.exiftoolPath(), o.exiftoolArgs, spawnOpts);
        this.options = {
          ...o,
          ignoreShebang,
          processFactory
        };
        this.batchCluster = new bc.BatchCluster(this.options);
      }
      exiftoolPath = (0, Lazy_1.lazy)(async () => {
        const o = await this.options.exiftoolPath;
        if ((0, String_1.isString)(o) && (0, String_1.notBlank)(o))
          return o;
        if ((0, Object_1.isFunction)(o))
          return o(this.options.logger());
        return (0, ExiftoolPath_1.exiftoolPath)(this.options.logger());
      });
      #taskOptions = (0, Lazy_1.lazy)(() => (0, Pick_1.pick)(this.options, "ignoreMinorErrors"));
      /**
       * Register life cycle event listeners. Delegates to BatchProcess.
       */
      on = (event, listener) => this.batchCluster.on(event, listener);
      /**
       * Unregister life cycle event listeners. Delegates to BatchProcess.
       */
      off = (event, listener) => this.batchCluster.off(event, listener);
      /**
       * @return a promise holding the version number of the vendored ExifTool
       */
      version() {
        return this.enqueueTask(() => new VersionTask_1.VersionTask(this.options));
      }
      read(file, argsOrOptions, options) {
        const opts = {
          ...(0, Pick_1.pick)(this.options, ...ReadTask_1.ReadTaskOptionFields),
          ...(0, Object_1.isObject)(argsOrOptions) ? argsOrOptions : options
        };
        opts.readArgs = (0, Array_1.ifArray)(argsOrOptions) ?? (0, Array_1.ifArray)(opts.readArgs) ?? this.options.readArgs;
        return this.enqueueTask(() => ReadTask_1.ReadTask.for(file, opts));
      }
      /**
       * Read the tags from `file`, without any post-processing of ExifTool values.
       *
       * **You probably want `read`, not this method. READ THE REST OF THIS COMMENT
       * CAREFULLY.**
       *
       * If you want to extract specific tag values from a file, you may want to use
       * this, but all data validation and inference heuristics provided by `read`
       * will be skipped.
       *
       * Note that performance will be very similar to `read`, and will actually be
       * worse if you don't include `-fast` or `-fast2` (as the most expensive bit
       * is the perl interpreter and scanning the file on disk).
       *
       * @param args any additional arguments other than the file path. Note that
       * "-json", and the Windows unicode filename handler flags, "-charset
       * filename=utf8", will be added automatically.
       *
       * @return Note that the return value will be similar to `Tags`, but with no
       * date, time, or other rich type parsing that you get from `.read()`. The
       * field values will be `string | number | string[]`.
       *
       * @see https://github.com/photostructure/exiftool-vendored.js/issues/44 for
       * typing details.
       */
      readRaw(file, args = []) {
        return this.enqueueTask(() => ReadRawTask_1.ReadRawTask.for(file, args, this.#taskOptions()));
      }
      /**
       * Write the given `tags` to `file`.
       *
       * **NOTE: no input validation is done by this library.** ExifTool, however,
       * is strict about tag names and values in the context of the format of file
       * being written to.
       *
       * **IMPORTANT:** Partial dates (year-only or year-month) are only supported
       * for XMP tags. Use group-prefixed tag names like `"XMP:CreateDate"` for
       * partial date support. EXIF tags require complete dates.
       *
       * @param file an existing file to write `tags` to
       *
       * @param tags the tags to write to `file`.
       *
       * @param options overrides to the default ExifTool options provided to the
       * ExifTool constructor.
       *
       * @returns Either the promise will be resolved if the tags are written to
       * successfully, or the promise will be rejected if there are errors or
       * warnings.
       *
       * @see https://exiftool.org/exiftool_pod.html#overwrite_original
       */
      write(file, tags2, writeArgsOrOptions, options) {
        const opts = {
          ...(0, Pick_1.pick)(this.options, ...WriteTask_1.WriteTaskOptionFields),
          ...(0, Object_1.isObject)(writeArgsOrOptions) ? writeArgsOrOptions : options
        };
        opts.writeArgs = (0, Array_1.ifArray)(writeArgsOrOptions) ?? (0, Array_1.ifArray)(opts.writeArgs) ?? this.options.writeArgs;
        const retriable = false;
        return this.enqueueTask(() => WriteTask_1.WriteTask.for(file, tags2, opts), retriable);
      }
      /**
       * This will strip `file` of all metadata tags. The original file (with the
       * name `${FILENAME}_original`) will be retained. Note that some tags, like
       * stat information and image dimensions, are intrinsic to the file and will
       * continue to exist if you re-`read` the file.
       *
       * @param {string} file the file to strip of metadata
       *
       * @param {(keyof Tags | string)[]} opts.retain optional. If provided, this is
       * a list of metadata keys to **not** delete.
       */
      deleteAllTags(file, opts) {
        const writeArgs = [...DeleteAllTagsArgs_1.DeleteAllTagsArgs];
        for (const ea of opts?.retain ?? []) {
          writeArgs.push(`-${ea}<${ea}`);
        }
        return this.write(file, {}, { ...(0, Object_1.omit)(opts ?? {}, "retain"), writeArgs });
      }
      /**
       * Extract the low-resolution thumbnail in `path/to/image.jpg` and write it to
       * `path/to/thumbnail.jpg`.
       *
       * Note that these images can be less than .1 megapixels in size.
       *
       * @return a `Promise<void>`
       *
       * @throws if the file could not be read or the output not written
       */
      extractThumbnail(imageFile, thumbnailFile, opts) {
        return this.extractBinaryTag("ThumbnailImage", imageFile, thumbnailFile, opts);
      }
      /**
       * Extract the "preview" image in `path/to/image.jpg` and write it to
       * `path/to/preview.jpg`.
       *
       * The size of these images varies widely, and is present in dSLR images.
       * Canon, Fuji, Olympus, and Sony use this tag.
       *
       * @return a `Promise<void>`
       *
       * @throws if the file could not be read or the output not written
       */
      extractPreview(imageFile, previewFile, opts) {
        return this.extractBinaryTag("PreviewImage", imageFile, previewFile, opts);
      }
      /**
       * Extract the "JpgFromRaw" image in `path/to/image.jpg` and write it to
       * `path/to/fromRaw.jpg`.
       *
       * This size of these images varies widely, and is not present in all RAW
       * images. Nikon and Panasonic use this tag.
       *
       * @return a `Promise<void>`
       *
       * @throws if the file could not be read or the output not written.
       */
      extractJpgFromRaw(imageFile, outputFile, opts) {
        return this.extractBinaryTag("JpgFromRaw", imageFile, outputFile, opts);
      }
      /**
       * Extract a given binary value from "tagname" tag associated to
       * `path/to/image.jpg` and write it to `dest` (which cannot exist and whose
       * directory must already exist).
       *
       * @return a `Promise<void>`
       *
       * @throws if the binary output not be written to `dest`.
       */
      async extractBinaryTag(tagname, src, dest, opts) {
        const maybeError = await this.enqueueTask(() => BinaryExtractionTask_1.BinaryExtractionTask.for(tagname, src, dest, {
          ...this.#taskOptions(),
          ...opts
        }));
        if (maybeError != null) {
          throw new Error(maybeError);
        }
      }
      /**
       * Extract a given binary value from "tagname" tag associated to
       * `path/to/image.jpg` as a `Buffer`. This has the advantage of not writing to
       * a file, but if the payload associated to `tagname` is large, this can cause
       * out-of-memory errors.
       *
       * @return a `Promise<Buffer>`
       *
       * @throws if the file or tag is missing.
       */
      async extractBinaryTagToBuffer(tagname, imageFile, opts) {
        const result = await this.enqueueTask(() => BinaryToBufferTask_1.BinaryToBufferTask.for(tagname, imageFile, {
          ...this.#taskOptions(),
          ...opts
        }));
        if (Buffer.isBuffer(result)) {
          return result;
        } else if (result instanceof Error) {
          throw result;
        } else {
          throw new Error("Unexpected result from BinaryToBufferTask: " + JSON.stringify(result));
        }
      }
      /**
       * Attempt to fix metadata problems in JPEG images by deleting all metadata
       * and rebuilding from scratch. After repairing an image you should be able to
       * write to it without errors, but some metadata from the original image may
       * be lost in the process.
       *
       * This should only be applied as a last resort to images whose metadata is
       * not readable via {@link ExifTool.read}.
       *
       * @see https://exiftool.org/faq.html#Q20
       *
       * @param {string} inputFile the path to the problematic image
       * @param {string} outputFile the path to write the repaired image
       * @param {boolean} opts.allowMakerNoteRepair if there are problems with MakerNote
       * tags, allow ExifTool to apply heuristics to recover corrupt tags. See
       * exiftool's `-F` flag.
       * @return {Promise<void>} resolved after the outputFile has been written.
       */
      rewriteAllTags(inputFile, outputFile, opts) {
        return this.enqueueTask(() => RewriteAllTagsTask_1.RewriteAllTagsTask.for(inputFile, outputFile, {
          allowMakerNoteRepair: false,
          ...this.#taskOptions(),
          ...opts
        }));
      }
      /**
       * Shut down running ExifTool child processes. No subsequent requests will be
       * accepted.
       *
       * This may need to be called in `after` or `finally` clauses in tests or
       * scripts for them to exit cleanly.
       */
      end(gracefully = true) {
        return this.batchCluster.end(gracefully).promise;
      }
      /**
       * @return true if `.end()` has been invoked
       */
      get ended() {
        return this.batchCluster.ended;
      }
      // calling whichPerl through this lazy() means we only do that task once per
      // instance.
      #checkForPerl = (0, Lazy_1.lazy)(async () => {
        if (this.options.checkPerl) {
          await whichPerl();
        }
      });
      /**
       * Most users will not need to use `enqueueTask` directly. This method
       * supports submitting custom `BatchCluster` tasks.
       *
       * @param task is a thunk to support retries by providing new instances on retries.
       *
       * @see BinaryExtractionTask for an example task implementation
       */
      enqueueTask(task, retriable = true) {
        const f = async () => {
          await this.#checkForPerl();
          return this.batchCluster.enqueueTask(task());
        };
        return retriable ? (0, AsyncRetry_1.retryOnReject)(f, this.options.taskRetries) : f();
      }
      /**
       * @return the currently running ExifTool processes. Note that on Windows,
       * these are only the process IDs of the directly-spawned ExifTool wrapper,
       * and not the actual perl vm. This should only really be relevant for
       * integration tests that verify processes are cleaned up properly.
       */
      get pids() {
        return this.batchCluster.pids();
      }
      /**
       * @return the number of pending (not currently worked on) tasks
       */
      get pendingTasks() {
        return this.batchCluster.pendingTaskCount;
      }
      /**
       * @return the total number of child processes created by this instance
       */
      get spawnedProcs() {
        return this.batchCluster.spawnedProcCount;
      }
      /**
       * @return the current number of child processes currently servicing tasks
       */
      get busyProcs() {
        return this.batchCluster.busyProcCount;
      }
      /**
       * @return report why child processes were recycled
       */
      childEndCounts() {
        return this.batchCluster.childEndCounts;
      }
      /**
       * Shut down any currently-running child processes. New child processes will
       * be started automatically to handle new tasks.
       */
      closeChildProcesses(gracefully = true) {
        return this.batchCluster.closeChildProcesses(gracefully);
      }
      /**
       * Implements the Disposable interface for automatic cleanup with the `using` keyword.
       * This allows ExifTool instances to be automatically cleaned up when they go out of scope.
       *
       * Note: This is a synchronous disposal method that initiates graceful cleanup but doesn't
       * wait for completion. If graceful cleanup times out, forceful cleanup is attempted.
       * For guaranteed cleanup completion, use `await using` with the async disposal method instead.
       *
       * @example
       * ```typescript
       * {
       *   using et = new ExifTool();
       *   const tags = await et.read("photo.jpg");
       *   // ExifTool cleanup will be initiated when this block exits
       * }
       * ```
       */
      [Symbol.dispose]() {
        if (!this.ended) {
          const cleanup = this.end(true);
          const timeoutMs = this.options.disposalTimeoutMs ?? 1e3;
          const timeoutHandle = setTimeout(() => {
            const logger = this.options.logger();
            logger.error(`ExifTool synchronous disposal timeout after ${timeoutMs}ms, forcing cleanup`);
            try {
              this.batchCluster.closeChildProcesses(false);
            } catch (err) {
              logger.error("Error during forced child process cleanup during sync disposal:", err);
            }
          }, timeoutMs);
          cleanup.then(() => {
            clearTimeout(timeoutHandle);
          }).catch((err) => {
            clearTimeout(timeoutHandle);
            const logger = this.options.logger();
            logger.error("ExifTool synchronous disposal error:", err);
          });
        }
      }
      /**
       * Implements the AsyncDisposable interface for automatic async cleanup with the `await using` keyword.
       * This allows ExifTool instances to be automatically cleaned up when they go out of scope.
       *
       * This method provides robust cleanup with timeout protection to prevent hanging.
       * If graceful cleanup times out, forceful cleanup is attempted automatically.
       *
       * @example
       * ```typescript
       * {
       *   await using et = new ExifTool();
       *   const tags = await et.read("photo.jpg");
       *   // ExifTool will be automatically ended when this block exits
       * }
       * ```
       */
      async [Symbol.asyncDispose]() {
        if (!this.ended) {
          const timeoutMs = this.options.asyncDisposalTimeoutMs ?? 5e3;
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error(`ExifTool async disposal timeout after ${timeoutMs}ms`));
            }, timeoutMs);
          });
          try {
            await Promise.race([this.end(true), timeoutPromise]);
          } catch (err) {
            const logger = this.options.logger();
            if (err instanceof Error && err.message.includes("timeout")) {
              logger.error(`ExifTool async disposal timed out after ${timeoutMs}ms, attempting forceful cleanup`);
              try {
                await this.end(false);
              } catch (forcefulErr) {
                logger.error("ExifTool forceful cleanup during async disposal also failed:", forcefulErr);
                throw err;
              }
            } else {
              logger.error("ExifTool async disposal error:", err);
              throw err;
            }
          }
        }
      }
    };
    exports2.ExifTool = ExifTool;
    exports2.exiftool = new ExifTool();
  }
});

// node_modules/drizzle-orm/operations.js
var init_operations = __esm({
  "node_modules/drizzle-orm/operations.js"() {
  }
});

// node_modules/drizzle-orm/index.js
var init_drizzle_orm = __esm({
  "node_modules/drizzle-orm/index.js"() {
    init_alias();
    init_column_builder();
    init_column();
    init_entity();
    init_errors();
    init_logger();
    init_operations();
    init_query_promise();
    init_relations();
    init_sql2();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
  }
});

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  folders: () => folders,
  photoTags: () => photoTags,
  photos: () => photos,
  settings: () => settings,
  tags: () => tags
});
var photos, tags, photoTags, settings, folders;
var init_schema = __esm({
  "src/db/schema.ts"() {
    "use strict";
    init_sqlite_core();
    init_drizzle_orm();
    photos = sqliteTable("photos", {
      id: integer("id").primaryKey({ autoIncrement: true }),
      filePath: text("file_path").notNull().unique(),
      fileName: text("file_name").notNull(),
      fileSize: integer("file_size").notNull(),
      width: integer("width").notNull(),
      height: integer("height").notNull(),
      createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
      importedAt: integer("imported_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
      title: text("title"),
      description: text("description"),
      cameraModel: text("camera_model"),
      latitude: real("latitude"),
      longitude: real("longitude"),
      folderId: integer("folder_id").references(() => folders.id, { onDelete: "cascade" })
    });
    tags = sqliteTable("tags", {
      id: integer("id").primaryKey(),
      name: text("name").unique()
    });
    photoTags = sqliteTable("photo_tags", {
      photoId: integer("photo_id").references(() => photos.id),
      tagId: integer("tag_id").references(() => tags.id)
    });
    settings = sqliteTable("settings", {
      id: integer("id").primaryKey().$default(() => 1),
      json: text("json")
    });
    folders = sqliteTable("folders", {
      id: integer("id").primaryKey({ autoIncrement: true }),
      path: text("path").notNull().unique(),
      addedAt: integer("added_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`)
    });
  }
});

// sidecars/index.ts
var index_exports = {};
function has(flag) {
  return import_process.argv.includes(flag);
}
function getValue(flag) {
  const index = import_process.argv.indexOf(flag);
  if (index > -1 && import_process.argv.length > index + 1) {
    return import_process.argv[index + 1];
  }
  return void 0;
}
async function* scanForImages(dirPath) {
  try {
    const entries = await import_promises.default.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = import_node_path.default.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        yield* scanForImages(fullPath);
      } else if (entry.isFile() && IMAGE_EXTENSIONS.has(import_node_path.default.extname(entry.name).toLowerCase())) {
        yield fullPath;
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
}
function getBestDate(tags2) {
  const dt = tags2.DateTimeOriginal || tags2.CreateDate;
  if (dt instanceof import_exiftool_vendored.ExifDateTime) {
    return dt.toDate();
  }
  return new Date(tags2.FileModifyDate);
}
function safeParseFloat(value) {
  if (value === null || value === void 0) {
    return null;
  }
  const num = Number.parseFloat(value);
  return Number.isNaN(num) ? null : num;
}
async function canonicalPath(filePath) {
  const resolved = await import_promises.default.realpath(filePath);
  if (process.platform === "darwin") return resolved.toLowerCase();
  return resolved;
}
async function processImage(filePath, db, folderId) {
  try {
    const [meta, stats] = await Promise.all([import_exiftool_vendored.exiftool.read(filePath), import_promises.default.stat(filePath)]);
    const canonical = await canonicalPath(filePath);
    const newPhoto = {
      filePath: canonical,
      fileName: import_node_path.default.basename(filePath),
      fileSize: stats.size,
      width: meta.ImageWidth ?? 0,
      height: meta.ImageHeight ?? 0,
      createdAt: getBestDate(meta),
      folderId,
      title: meta.Title,
      description: meta.Description,
      cameraModel: meta.Model,
      latitude: safeParseFloat(meta.GPSLatitude),
      longitude: safeParseFloat(meta.GPSLongitude)
    };
    await db.insert(photos).values(newPhoto).onConflictDoNothing().run();
    console.log(JSON.stringify({ type: "progress", path: filePath }));
  } catch (e) {
    const message = e instanceof Error ? e.message : "An unknown error occurred";
    console.error(JSON.stringify({ type: "error", path: filePath, message }));
  }
}
async function main() {
  if (has("--scan")) {
    const folder = getValue("--scan");
    const dbPath = getValue("--db");
    if (!folder || !dbPath) {
      console.error("Error: --scan and --db flags are required.");
      process.exit(1);
    }
    const sqlite = new import_better_sqlite32.default(dbPath);
    const db = drizzle(sqlite, { schema: schema_exports });
    console.log(JSON.stringify({ type: "start", folder }));
    const allImagePaths = [];
    for await (const imagePath of scanForImages(folder)) {
      allImagePaths.push(imagePath);
    }
    const folderIdArg = parseInt(getValue("--folder-id") ?? "0", 10);
    if (Number.isNaN(folderIdArg) || folderIdArg <= 0) {
      console.error(JSON.stringify({ type: "error", message: "Invalid or missing --folder-id" }));
      process.exit(1);
    }
    for (const imagePath of allImagePaths) {
      await processImage(imagePath, db, folderIdArg);
    }
    await import_exiftool_vendored.exiftool.end();
    console.log(JSON.stringify({ type: "done", total: allImagePaths.length }));
  } else {
    console.log("No command specified. Use --scan <folder_path> --db <db_path>");
  }
}
var import_process, import_node_path, import_promises, import_better_sqlite32, import_exiftool_vendored, IMAGE_EXTENSIONS;
var init_index = __esm({
  "sidecars/index.ts"() {
    "use strict";
    import_process = require("process");
    import_node_path = __toESM(require("node:path"), 1);
    import_promises = __toESM(require("node:fs/promises"), 1);
    import_better_sqlite32 = __toESM(require_lib(), 1);
    init_better_sqlite3();
    import_exiftool_vendored = __toESM(require_ExifTool(), 1);
    init_schema();
    IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".avif"]);
    main().catch((e) => {
      const message = e instanceof Error ? e.message : "An unknown error occurred";
      console.error(JSON.stringify({ type: "error", message }));
      import_exiftool_vendored.exiftool.end();
    });
  }
});

// sidecars/pkg-entry.js
if (process.pkg) {
  const path2 = require("node:path");
  process.env.BETTER_SQLITE3_BINARY = path2.join(path2.dirname(process.execPath), "better_sqlite3.node");
}
init_index();
/*! Bundled license information:

he/he.js:
  (*! https://mths.be/he v1.2.0 by @mathias | MIT license *)
*/
