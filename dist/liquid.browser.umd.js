/*
 * liquidjs@10.16.1, https://github.com/harttle/liquidjs
 * (c) 2016-2025 harttle
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('path'), require('crypto'), require('request-promise-cache')) :
    typeof define === 'function' && define.amd ? define(['exports', 'path', 'crypto', 'request-promise-cache'], factory) :
    (global = global || self, factory(global.liquidjs = {}, global.path, global.crypto, global.rp_));
}(this, (function (exports, path, crypto, rp_) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var Token = /** @class */ (function () {
        function Token(kind, input, begin, end, file) {
            this.kind = kind;
            this.input = input;
            this.begin = begin;
            this.end = end;
            this.file = file;
        }
        Token.prototype.getText = function () {
            return this.input.slice(this.begin, this.end);
        };
        Token.prototype.getPosition = function () {
            var _a = __read([1, 1], 2), row = _a[0], col = _a[1];
            for (var i = 0; i < this.begin; i++) {
                if (this.input[i] === '\n') {
                    row++;
                    col = 1;
                }
                else
                    col++;
            }
            return [row, col];
        };
        Token.prototype.size = function () {
            return this.end - this.begin;
        };
        return Token;
    }());

    var Drop = /** @class */ (function () {
        function Drop() {
        }
        Drop.prototype.liquidMethodMissing = function (key) {
            return undefined;
        };
        return Drop;
    }());

    var toString$1 = Object.prototype.toString;
    var toLowerCase = String.prototype.toLowerCase;
    var hasOwnProperty = Object.hasOwnProperty;
    function isString(value) {
        return typeof value === 'string';
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    function isFunction(value) {
        return typeof value === 'function';
    }
    function isPromise(val) {
        return val && isFunction(val.then);
    }
    function isIterator(val) {
        return val && isFunction(val.next) && isFunction(val.throw) && isFunction(val.return);
    }
    function escapeRegex(str) {
        return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    function stringify(value) {
        value = toValue(value);
        if (isString(value))
            return value;
        if (isNil(value))
            return '';
        if (isArray(value))
            return value.map(function (x) { return stringify(x); }).join('');
        return String(value);
    }
    function toEnumerable(val) {
        val = toValue(val);
        if (isArray(val))
            return val;
        if (isString(val) && val.length > 0)
            return [val];
        if (isIterable(val))
            return Array.from(val);
        if (isObject(val))
            return Object.keys(val).map(function (key) { return [key, val[key]]; });
        return [];
    }
    function toArray(val) {
        val = toValue(val);
        if (isNil(val))
            return [];
        if (isArray(val))
            return val;
        return [val];
    }
    function toValue(value) {
        return (value instanceof Drop && isFunction(value.valueOf)) ? value.valueOf() : value;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function toLiquid(value) {
        if (value && isFunction(value.toLiquid))
            return toLiquid(value.toLiquid());
        return value;
    }
    function isNil(value) {
        return value == null;
    }
    function isUndefined(value) {
        return value === undefined;
    }
    function isArray(value) {
        // be compatible with IE 8
        return toString$1.call(value) === '[object Array]';
    }
    function isIterable(value) {
        return isObject(value) && Symbol.iterator in value;
    }
    /*
     * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
     * The iteratee is invoked with three arguments: (value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning false.
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @return {Object} Returns object.
     */
    function forOwn(obj, iteratee) {
        obj = obj || {};
        for (var k in obj) {
            if (hasOwnProperty.call(obj, k)) {
                if (iteratee(obj[k], k, obj) === false)
                    break;
            }
        }
        return obj;
    }
    function last(arr) {
        return arr[arr.length - 1];
    }
    /*
     * Checks if value is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
     * @param {any} value The value to check.
     * @return {Boolean} Returns true if value is an object, else false.
     */
    function isObject(value) {
        var type = typeof value;
        return value !== null && (type === 'object' || type === 'function');
    }
    function range(start, stop, step) {
        if (step === void 0) { step = 1; }
        var arr = [];
        for (var i = start; i < stop; i += step) {
            arr.push(i);
        }
        return arr;
    }
    function padStart(str, length, ch) {
        if (ch === void 0) { ch = ' '; }
        return pad(str, length, ch, function (str, ch) { return ch + str; });
    }
    function padEnd(str, length, ch) {
        if (ch === void 0) { ch = ' '; }
        return pad(str, length, ch, function (str, ch) { return str + ch; });
    }
    function pad(str, length, ch, add) {
        str = String(str);
        var n = length - str.length;
        while (n-- > 0)
            str = add(str, ch);
        return str;
    }
    function identify(val) {
        return val;
    }
    function changeCase(str) {
        var hasLowerCase = __spreadArray([], __read(str), false).some(function (ch) { return ch >= 'a' && ch <= 'z'; });
        return hasLowerCase ? str.toUpperCase() : str.toLowerCase();
    }
    function ellipsis(str, N) {
        return str.length > N ? str.slice(0, N - 3) + '...' : str;
    }
    // compare string in case-insensitive way, undefined values to the tail
    function caseInsensitiveCompare(a, b) {
        if (a == null && b == null)
            return 0;
        if (a == null)
            return 1;
        if (b == null)
            return -1;
        a = toLowerCase.call(a);
        b = toLowerCase.call(b);
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }
    function argumentsToValue(fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fn.call.apply(fn, __spreadArray([this], __read(args.map(toValue)), false));
        };
    }
    function escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    /**
     * targeting ES5, extends Error won't create a proper prototype chain, need a trait to keep track of classes
     */
    var TRAIT = '__liquidClass__';
    var LiquidError = /** @class */ (function (_super) {
        __extends(LiquidError, _super);
        function LiquidError(err, token) {
            var _this = 
            /**
             * note: for ES5 targeting, `this` will be replaced by return value of Error(),
             * thus everything on `this` will be lost, avoid calling `LiquidError` methods here
             */
            _super.call(this, typeof err === 'string' ? err : err.message) || this;
            _this.context = '';
            if (typeof err !== 'string')
                Object.defineProperty(_this, 'originalError', { value: err, enumerable: false });
            Object.defineProperty(_this, 'token', { value: token, enumerable: false });
            Object.defineProperty(_this, TRAIT, { value: 'LiquidError', enumerable: false });
            return _this;
        }
        LiquidError.prototype.update = function () {
            Object.defineProperty(this, 'context', { value: mkContext(this.token), enumerable: false });
            this.message = mkMessage(this.message, this.token);
            this.stack = this.message + '\n' + this.context +
                '\n' + this.stack;
            if (this.originalError)
                this.stack += '\nFrom ' + this.originalError.stack;
        };
        LiquidError.is = function (obj) {
            return (obj === null || obj === void 0 ? void 0 : obj[TRAIT]) === 'LiquidError';
        };
        return LiquidError;
    }(Error));
    var TokenizationError = /** @class */ (function (_super) {
        __extends(TokenizationError, _super);
        function TokenizationError(message, token) {
            var _this = _super.call(this, message, token) || this;
            _this.name = 'TokenizationError';
            _super.prototype.update.call(_this);
            return _this;
        }
        return TokenizationError;
    }(LiquidError));
    var ParseError = /** @class */ (function (_super) {
        __extends(ParseError, _super);
        function ParseError(err, token) {
            var _this = _super.call(this, err, token) || this;
            _this.name = 'ParseError';
            _this.message = err.message;
            _super.prototype.update.call(_this);
            return _this;
        }
        return ParseError;
    }(LiquidError));
    var RenderError = /** @class */ (function (_super) {
        __extends(RenderError, _super);
        function RenderError(err, tpl) {
            var _this = _super.call(this, err, tpl.token) || this;
            _this.name = 'RenderError';
            _this.message = err.message;
            _super.prototype.update.call(_this);
            return _this;
        }
        RenderError.is = function (obj) {
            return obj.name === 'RenderError';
        };
        return RenderError;
    }(LiquidError));
    var LiquidErrors = /** @class */ (function (_super) {
        __extends(LiquidErrors, _super);
        function LiquidErrors(errors) {
            var _this = _super.call(this, errors[0], errors[0].token) || this;
            _this.errors = errors;
            _this.name = 'LiquidErrors';
            var s = errors.length > 1 ? 's' : '';
            _this.message = "".concat(errors.length, " error").concat(s, " found");
            _super.prototype.update.call(_this);
            return _this;
        }
        LiquidErrors.is = function (obj) {
            return obj.name === 'LiquidErrors';
        };
        return LiquidErrors;
    }(LiquidError));
    var UndefinedVariableError = /** @class */ (function (_super) {
        __extends(UndefinedVariableError, _super);
        function UndefinedVariableError(err, token) {
            var _this = _super.call(this, err, token) || this;
            _this.name = 'UndefinedVariableError';
            _this.message = err.message;
            _super.prototype.update.call(_this);
            return _this;
        }
        return UndefinedVariableError;
    }(LiquidError));
    // only used internally; raised where we don't have token information,
    // so it can't be an UndefinedVariableError.
    var InternalUndefinedVariableError = /** @class */ (function (_super) {
        __extends(InternalUndefinedVariableError, _super);
        function InternalUndefinedVariableError(variableName) {
            var _this = _super.call(this, "undefined variable: ".concat(variableName)) || this;
            _this.name = 'InternalUndefinedVariableError';
            _this.variableName = variableName;
            return _this;
        }
        return InternalUndefinedVariableError;
    }(Error));
    var AssertionError = /** @class */ (function (_super) {
        __extends(AssertionError, _super);
        function AssertionError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = 'AssertionError';
            _this.message = message + '';
            return _this;
        }
        return AssertionError;
    }(Error));
    function mkContext(token) {
        var _a = __read(token.getPosition(), 2), line = _a[0], col = _a[1];
        var lines = token.input.split('\n');
        var begin = Math.max(line - 2, 1);
        var end = Math.min(line + 3, lines.length);
        var context = range(begin, end + 1)
            .map(function (lineNumber) {
            var rowIndicator = (lineNumber === line) ? '>> ' : '   ';
            var num = padStart(String(lineNumber), String(end).length);
            var text = "".concat(rowIndicator).concat(num, "| ");
            var colIndicator = lineNumber === line
                ? '\n' + padStart('^', col + text.length)
                : '';
            text += lines[lineNumber - 1];
            text += colIndicator;
            return text;
        })
            .join('\n');
        return context;
    }
    function mkMessage(msg, token) {
        if (token.file)
            msg += ", file:".concat(token.file);
        var _a = __read(token.getPosition(), 2), line = _a[0], col = _a[1];
        msg += ", line:".concat(line, ", col:").concat(col);
        return msg;
    }

    // **DO NOT CHANGE THIS FILE**
    //
    // This file is generated by bin/character-gen.js
    // bitmask character types to boost performance
    var TYPES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 4, 4, 4, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 8, 0, 0, 0, 0, 8, 0, 0, 0, 64, 0, 65, 0, 0, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
    var WORD = 1;
    var BLANK = 4;
    var QUOTE = 8;
    var INLINE_BLANK = 16;
    var NUMBER = 32;
    var SIGN = 64;
    var PUNCTUATION = 128;
    function isWord(char) {
        var code = char.charCodeAt(0);
        return code >= 128 ? !TYPES[code] : !!(TYPES[code] & WORD);
    }
    TYPES[160] = TYPES[5760] = TYPES[6158] = TYPES[8192] = TYPES[8193] = TYPES[8194] = TYPES[8195] = TYPES[8196] = TYPES[8197] = TYPES[8198] = TYPES[8199] = TYPES[8200] = TYPES[8201] = TYPES[8202] = TYPES[8232] = TYPES[8233] = TYPES[8239] = TYPES[8287] = TYPES[12288] = BLANK;
    TYPES[8220] = TYPES[8221] = PUNCTUATION;

    function assert(predicate, message) {
        if (!predicate) {
            var msg = typeof message === 'function'
                ? message()
                : (message || "expect ".concat(predicate, " to be true"));
            throw new AssertionError(msg);
        }
    }
    function assertEmpty(predicate, message) {
        if (message === void 0) { message = "unexpected ".concat(JSON.stringify(predicate)); }
        assert(!predicate, message);
    }

    var NullDrop = /** @class */ (function (_super) {
        __extends(NullDrop, _super);
        function NullDrop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NullDrop.prototype.equals = function (value) {
            return isNil(toValue(value));
        };
        NullDrop.prototype.gt = function () {
            return false;
        };
        NullDrop.prototype.geq = function () {
            return false;
        };
        NullDrop.prototype.lt = function () {
            return false;
        };
        NullDrop.prototype.leq = function () {
            return false;
        };
        NullDrop.prototype.valueOf = function () {
            return null;
        };
        return NullDrop;
    }(Drop));

    var EmptyDrop = /** @class */ (function (_super) {
        __extends(EmptyDrop, _super);
        function EmptyDrop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmptyDrop.prototype.equals = function (value) {
            if (value instanceof EmptyDrop)
                return false;
            value = toValue(value);
            if (isString(value) || isArray(value))
                return value.length === 0;
            if (isObject(value))
                return Object.keys(value).length === 0;
            return false;
        };
        EmptyDrop.prototype.gt = function () {
            return false;
        };
        EmptyDrop.prototype.geq = function () {
            return false;
        };
        EmptyDrop.prototype.lt = function () {
            return false;
        };
        EmptyDrop.prototype.leq = function () {
            return false;
        };
        EmptyDrop.prototype.valueOf = function () {
            return '';
        };
        return EmptyDrop;
    }(Drop));

    var BlankDrop = /** @class */ (function (_super) {
        __extends(BlankDrop, _super);
        function BlankDrop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlankDrop.prototype.equals = function (value) {
            if (value === false)
                return true;
            if (isNil(toValue(value)))
                return true;
            if (isString(value))
                return /^\s*$/.test(value);
            return _super.prototype.equals.call(this, value);
        };
        return BlankDrop;
    }(EmptyDrop));

    var ForloopDrop = /** @class */ (function (_super) {
        __extends(ForloopDrop, _super);
        function ForloopDrop(length, collection, variable) {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.length = length;
            _this.name = "".concat(variable, "-").concat(collection);
            return _this;
        }
        ForloopDrop.prototype.next = function () {
            this.i++;
        };
        ForloopDrop.prototype.index0 = function () {
            return this.i;
        };
        ForloopDrop.prototype.index = function () {
            return this.i + 1;
        };
        ForloopDrop.prototype.first = function () {
            return this.i === 0;
        };
        ForloopDrop.prototype.last = function () {
            return this.i === this.length - 1;
        };
        ForloopDrop.prototype.rindex = function () {
            return this.length - this.i;
        };
        ForloopDrop.prototype.rindex0 = function () {
            return this.length - this.i - 1;
        };
        ForloopDrop.prototype.valueOf = function () {
            return JSON.stringify(this);
        };
        return ForloopDrop;
    }(Drop));

    var BlockDrop = /** @class */ (function (_super) {
        __extends(BlockDrop, _super);
        function BlockDrop(
        // the block render from layout template
        superBlockRender) {
            if (superBlockRender === void 0) { superBlockRender = function () { return ''; }; }
            var _this = _super.call(this) || this;
            _this.superBlockRender = superBlockRender;
            return _this;
        }
        /**
         * Provide parent access in child block by
         * {{ block.super }}
         */
        BlockDrop.prototype.super = function () {
            return this.superBlockRender();
        };
        return BlockDrop;
    }(Drop));

    function isComparable(arg) {
        return (arg &&
            isFunction(arg.equals) &&
            isFunction(arg.gt) &&
            isFunction(arg.geq) &&
            isFunction(arg.lt) &&
            isFunction(arg.leq));
    }

    var nil = new NullDrop();
    var literalValues = {
        'true': true,
        'false': false,
        'nil': nil,
        'null': nil,
        'empty': new EmptyDrop(),
        'blank': new BlankDrop()
    };

    function createTrie(input) {
        var e_1, _a;
        var trie = {};
        try {
            for (var _b = __values(Object.entries(input)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_1 = _d[0], data = _d[1];
                var node = trie;
                for (var i = 0; i < name_1.length; i++) {
                    var c = name_1[i];
                    node[c] = node[c] || {};
                    if (i === name_1.length - 1 && isWord(name_1[i])) {
                        node[c].needBoundary = true;
                    }
                    node = node[c];
                }
                node.data = data;
                node.end = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return trie;
    }

    // convert an async iterator to a Promise
    function toPromise(val) {
        return __awaiter(this, void 0, void 0, function () {
            var value, done, next, state, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isIterator(val))
                            return [2 /*return*/, val];
                        done = false;
                        next = 'next';
                        _a.label = 1;
                    case 1:
                        state = val[next](value);
                        done = state.done;
                        value = state.value;
                        next = 'next';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        if (isIterator(value))
                            value = toPromise(value);
                        if (!isPromise(value)) return [3 /*break*/, 4];
                        return [4 /*yield*/, value];
                    case 3:
                        value = _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        next = 'throw';
                        value = err_1;
                        return [3 /*break*/, 6];
                    case 6:
                        if (!done) return [3 /*break*/, 1];
                        _a.label = 7;
                    case 7: return [2 /*return*/, value];
                }
            });
        });
    }
    // convert an async iterator to a value in a synchronous manner
    function toValueSync(val) {
        if (!isIterator(val))
            return val;
        var value;
        var done = false;
        var next = 'next';
        do {
            var state = val[next](value);
            done = state.done;
            value = state.value;
            next = 'next';
            if (isIterator(value)) {
                try {
                    value = toValueSync(value);
                }
                catch (err) {
                    next = 'throw';
                    value = err;
                }
            }
        } while (!done);
        return value;
    }

    var rFormat = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
    // prototype extensions
    function daysInMonth(d) {
        var feb = isLeapYear(d) ? 29 : 28;
        return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    function getDayOfYear(d) {
        var num = 0;
        for (var i = 0; i < d.getMonth(); ++i) {
            num += daysInMonth(d)[i];
        }
        return num + d.getDate();
    }
    function getWeekOfYear(d, startDay) {
        // Skip to startDay of this week
        var now = getDayOfYear(d) + (startDay - d.getDay());
        // Find the first startDay of the year
        var jan1 = new Date(d.getFullYear(), 0, 1);
        var then = (7 - jan1.getDay() + startDay);
        return String(Math.floor((now - then) / 7) + 1);
    }
    function isLeapYear(d) {
        var year = d.getFullYear();
        return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    }
    function ordinal(d) {
        var date = d.getDate();
        if ([11, 12, 13].includes(date))
            return 'th';
        switch (date % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    function century(d) {
        return parseInt(d.getFullYear().toString().substring(0, 2), 10);
    }
    // default to 0
    var padWidths = {
        d: 2,
        e: 2,
        H: 2,
        I: 2,
        j: 3,
        k: 2,
        l: 2,
        L: 3,
        m: 2,
        M: 2,
        S: 2,
        U: 2,
        W: 2
    };
    var padSpaceChars = new Set('aAbBceklpP');
    function getTimezoneOffset(d, opts) {
        var nOffset = Math.abs(d.getTimezoneOffset());
        var h = Math.floor(nOffset / 60);
        var m = nOffset % 60;
        return (d.getTimezoneOffset() > 0 ? '-' : '+') +
            padStart(h, 2, '0') +
            (opts.flags[':'] ? ':' : '') +
            padStart(m, 2, '0');
    }
    var formatCodes = {
        a: function (d) { return d.getShortWeekdayName(); },
        A: function (d) { return d.getLongWeekdayName(); },
        b: function (d) { return d.getShortMonthName(); },
        B: function (d) { return d.getLongMonthName(); },
        c: function (d) { return d.toLocaleString(); },
        C: function (d) { return century(d); },
        d: function (d) { return d.getDate(); },
        e: function (d) { return d.getDate(); },
        H: function (d) { return d.getHours(); },
        I: function (d) { return String(d.getHours() % 12 || 12); },
        j: function (d) { return getDayOfYear(d); },
        k: function (d) { return d.getHours(); },
        l: function (d) { return String(d.getHours() % 12 || 12); },
        L: function (d) { return d.getMilliseconds(); },
        m: function (d) { return d.getMonth() + 1; },
        M: function (d) { return d.getMinutes(); },
        N: function (d, opts) {
            var width = Number(opts.width) || 9;
            var str = String(d.getMilliseconds()).slice(0, width);
            return padEnd(str, width, '0');
        },
        p: function (d) { return (d.getHours() < 12 ? 'AM' : 'PM'); },
        P: function (d) { return (d.getHours() < 12 ? 'am' : 'pm'); },
        q: function (d) { return ordinal(d); },
        s: function (d) { return Math.round(d.getTime() / 1000); },
        S: function (d) { return d.getSeconds(); },
        u: function (d) { return d.getDay() || 7; },
        U: function (d) { return getWeekOfYear(d, 0); },
        w: function (d) { return d.getDay(); },
        W: function (d) { return getWeekOfYear(d, 1); },
        x: function (d) { return d.toLocaleDateString(); },
        X: function (d) { return d.toLocaleTimeString(); },
        y: function (d) { return d.getFullYear().toString().slice(2, 4); },
        Y: function (d) { return d.getFullYear(); },
        z: getTimezoneOffset,
        Z: function (d, opts) { return d.getTimeZoneName() || getTimezoneOffset(d, opts); },
        't': function () { return '\t'; },
        'n': function () { return '\n'; },
        '%': function () { return '%'; }
    };
    formatCodes.h = formatCodes.b;
    function strftime(d, formatStr) {
        var output = '';
        var remaining = formatStr;
        var match;
        while ((match = rFormat.exec(remaining))) {
            output += remaining.slice(0, match.index);
            remaining = remaining.slice(match.index + match[0].length);
            output += format(d, match);
        }
        return output + remaining;
    }
    function format(d, match) {
        var e_1, _a;
        var _b = __read(match, 5), input = _b[0], _c = _b[1], flagStr = _c === void 0 ? '' : _c, width = _b[2], modifier = _b[3], conversion = _b[4];
        var convert = formatCodes[conversion];
        if (!convert)
            return input;
        var flags = {};
        try {
            for (var flagStr_1 = __values(flagStr), flagStr_1_1 = flagStr_1.next(); !flagStr_1_1.done; flagStr_1_1 = flagStr_1.next()) {
                var flag = flagStr_1_1.value;
                flags[flag] = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (flagStr_1_1 && !flagStr_1_1.done && (_a = flagStr_1.return)) _a.call(flagStr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var ret = String(convert(d, { flags: flags, width: width, modifier: modifier }));
        var padChar = padSpaceChars.has(conversion) ? ' ' : '0';
        var padWidth = width || padWidths[conversion] || 0;
        if (flags['^'])
            ret = ret.toUpperCase();
        else if (flags['#'])
            ret = changeCase(ret);
        if (flags['_'])
            padChar = ' ';
        else if (flags['0'])
            padChar = '0';
        if (flags['-'])
            padWidth = 0;
        return padStart(ret, padWidth, padChar);
    }

    function getDateTimeFormat() {
        return (typeof Intl !== 'undefined' ? Intl.DateTimeFormat : undefined);
    }

    // one minute in milliseconds
    var OneMinute = 60000;
    var ISO8601_TIMEZONE_PATTERN = /([zZ]|([+-])(\d{2}):(\d{2}))$/;
    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    var monthNamesShort = monthNames.map(function (name) { return name.slice(0, 3); });
    var dayNames = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    var dayNamesShort = dayNames.map(function (name) { return name.slice(0, 3); });
    /**
     * A date implementation with timezone info, just like Ruby date
     *
     * Implementation:
     * - create a Date offset by it's timezone difference, avoiding overriding a bunch of methods
     * - rewrite getTimezoneOffset() to trick strftime
     */
    var LiquidDate = /** @class */ (function () {
        function LiquidDate(init, locale, timezone) {
            this.locale = locale;
            this.DateTimeFormat = getDateTimeFormat();
            this.date = new Date(init);
            this.timezoneFixed = timezone !== undefined;
            if (timezone === undefined) {
                timezone = this.date.getTimezoneOffset();
            }
            this.timezoneOffset = isString(timezone) ? LiquidDate.getTimezoneOffset(timezone, this.date) : timezone;
            this.timezoneName = isString(timezone) ? timezone : '';
            var diff = (this.date.getTimezoneOffset() - this.timezoneOffset) * OneMinute;
            var time = this.date.getTime() + diff;
            this.displayDate = new Date(time);
        }
        LiquidDate.prototype.getTime = function () {
            return this.displayDate.getTime();
        };
        LiquidDate.prototype.getMilliseconds = function () {
            return this.displayDate.getMilliseconds();
        };
        LiquidDate.prototype.getSeconds = function () {
            return this.displayDate.getSeconds();
        };
        LiquidDate.prototype.getMinutes = function () {
            return this.displayDate.getMinutes();
        };
        LiquidDate.prototype.getHours = function () {
            return this.displayDate.getHours();
        };
        LiquidDate.prototype.getDay = function () {
            return this.displayDate.getDay();
        };
        LiquidDate.prototype.getDate = function () {
            return this.displayDate.getDate();
        };
        LiquidDate.prototype.getMonth = function () {
            return this.displayDate.getMonth();
        };
        LiquidDate.prototype.getFullYear = function () {
            return this.displayDate.getFullYear();
        };
        LiquidDate.prototype.toLocaleString = function (locale, init) {
            if (init === null || init === void 0 ? void 0 : init.timeZone) {
                return this.date.toLocaleString(locale, init);
            }
            return this.displayDate.toLocaleString(locale, init);
        };
        LiquidDate.prototype.toLocaleTimeString = function (locale) {
            return this.displayDate.toLocaleTimeString(locale);
        };
        LiquidDate.prototype.toLocaleDateString = function (locale) {
            return this.displayDate.toLocaleDateString(locale);
        };
        LiquidDate.prototype.getTimezoneOffset = function () {
            return this.timezoneOffset;
        };
        LiquidDate.prototype.getTimeZoneName = function () {
            if (this.timezoneFixed)
                return this.timezoneName;
            if (!this.DateTimeFormat)
                return;
            return this.DateTimeFormat().resolvedOptions().timeZone;
        };
        LiquidDate.prototype.getLongMonthName = function () {
            var _a;
            return (_a = this.format({ month: 'long' })) !== null && _a !== void 0 ? _a : monthNames[this.getMonth()];
        };
        LiquidDate.prototype.getShortMonthName = function () {
            var _a;
            return (_a = this.format({ month: 'short' })) !== null && _a !== void 0 ? _a : monthNamesShort[this.getMonth()];
        };
        LiquidDate.prototype.getLongWeekdayName = function () {
            var _a;
            return (_a = this.format({ weekday: 'long' })) !== null && _a !== void 0 ? _a : dayNames[this.displayDate.getDay()];
        };
        LiquidDate.prototype.getShortWeekdayName = function () {
            var _a;
            return (_a = this.format({ weekday: 'short' })) !== null && _a !== void 0 ? _a : dayNamesShort[this.displayDate.getDay()];
        };
        LiquidDate.prototype.valid = function () {
            return !isNaN(this.getTime());
        };
        LiquidDate.prototype.format = function (options) {
            return this.DateTimeFormat && this.DateTimeFormat(this.locale, options).format(this.displayDate);
        };
        /**
         * Create a Date object fixed to it's declared Timezone. Both
         * - 2021-08-06T02:29:00.000Z and
         * - 2021-08-06T02:29:00.000+08:00
         * will always be displayed as
         * - 2021-08-06 02:29:00
         * regardless timezoneOffset in JavaScript realm
         *
         * The implementation hack:
         * Instead of calling `.getMonth()`/`.getUTCMonth()` respect to `preserveTimezones`,
         * we create a different Date to trick strftime, it's both simpler and more performant.
         * Given that a template is expected to be parsed fewer times than rendered.
         */
        LiquidDate.createDateFixedToTimezone = function (dateString, locale) {
            var m = dateString.match(ISO8601_TIMEZONE_PATTERN);
            // representing a UTC timestamp
            if (m && m[1] === 'Z') {
                return new LiquidDate(+new Date(dateString), locale, 0);
            }
            // has a timezone specified
            if (m && m[2] && m[3] && m[4]) {
                var _a = __read(m, 5), sign = _a[2], hours = _a[3], minutes = _a[4];
                var offset = (sign === '+' ? -1 : 1) * (parseInt(hours, 10) * 60 + parseInt(minutes, 10));
                return new LiquidDate(+new Date(dateString), locale, offset);
            }
            return new LiquidDate(dateString, locale);
        };
        LiquidDate.getTimezoneOffset = function (timezoneName, date) {
            var localDateString = date.toLocaleString('en-US', { timeZone: timezoneName });
            var utcDateString = date.toLocaleString('en-US', { timeZone: 'UTC' });
            var localDate = new Date(localDateString);
            var utcDate = new Date(utcDateString);
            return (+utcDate - +localDate) / (60 * 1000);
        };
        return LiquidDate;
    }());

    var Limiter = /** @class */ (function () {
        function Limiter(resource, limit) {
            this.base = 0;
            this.message = "".concat(resource, " limit exceeded");
            this.limit = limit;
        }
        Limiter.prototype.use = function (count) {
            assert(this.base + count <= this.limit, this.message);
            this.base += count;
        };
        Limiter.prototype.check = function (count) {
            assert(count <= this.limit, this.message);
        };
        return Limiter;
    }());

    var DelimitedToken = /** @class */ (function (_super) {
        __extends(DelimitedToken, _super);
        function DelimitedToken(kind, _a, input, begin, end, trimLeft, trimRight, file) {
            var _b = __read(_a, 2), contentBegin = _b[0], contentEnd = _b[1];
            var _this = _super.call(this, kind, input, begin, end, file) || this;
            _this.trimLeft = false;
            _this.trimRight = false;
            var tl = input[contentBegin] === '-';
            var tr = input[contentEnd - 1] === '-';
            var l = tl ? contentBegin + 1 : contentBegin;
            var r = tr ? contentEnd - 1 : contentEnd;
            while (l < r && (TYPES[input.charCodeAt(l)] & BLANK))
                l++;
            while (r > l && (TYPES[input.charCodeAt(r - 1)] & BLANK))
                r--;
            _this.contentRange = [l, r];
            _this.trimLeft = tl || trimLeft;
            _this.trimRight = tr || trimRight;
            return _this;
        }
        Object.defineProperty(DelimitedToken.prototype, "content", {
            get: function () {
                return this.input.slice(this.contentRange[0], this.contentRange[1]);
            },
            enumerable: false,
            configurable: true
        });
        return DelimitedToken;
    }(Token));

    var TagToken = /** @class */ (function (_super) {
        __extends(TagToken, _super);
        function TagToken(input, begin, end, options, file) {
            var _this = this;
            var trimTagLeft = options.trimTagLeft, trimTagRight = options.trimTagRight, tagDelimiterLeft = options.tagDelimiterLeft, tagDelimiterRight = options.tagDelimiterRight;
            var _a = __read([begin + tagDelimiterLeft.length, end - tagDelimiterRight.length], 2), valueBegin = _a[0], valueEnd = _a[1];
            _this = _super.call(this, exports.TokenKind.Tag, [valueBegin, valueEnd], input, begin, end, trimTagLeft, trimTagRight, file) || this;
            _this.tokenizer = new Tokenizer(input, options.operators, file, _this.contentRange);
            _this.name = _this.tokenizer.readTagName();
            _this.tokenizer.assert(_this.name, "illegal tag syntax, tag name expected");
            _this.tokenizer.skipBlank();
            return _this;
        }
        Object.defineProperty(TagToken.prototype, "args", {
            get: function () {
                return this.tokenizer.input.slice(this.tokenizer.p, this.contentRange[1]);
            },
            enumerable: false,
            configurable: true
        });
        return TagToken;
    }(DelimitedToken));

    var OutputToken = /** @class */ (function (_super) {
        __extends(OutputToken, _super);
        function OutputToken(input, begin, end, options, file) {
            var trimOutputLeft = options.trimOutputLeft, trimOutputRight = options.trimOutputRight, outputDelimiterLeft = options.outputDelimiterLeft, outputDelimiterRight = options.outputDelimiterRight;
            var valueRange = [begin + outputDelimiterLeft.length, end - outputDelimiterRight.length];
            return _super.call(this, exports.TokenKind.Output, valueRange, input, begin, end, trimOutputLeft, trimOutputRight, file) || this;
        }
        return OutputToken;
    }(DelimitedToken));
    /*
    export class OutputToken extends DelimitedToken {
      public constructor (
        input: string,
        begin: number,
        end: number,
        options: NormalizedFullOptions,
        file?: string
      ) {
        const { trimOutputLeft, trimOutputRight, outputDelimiterLeft, outputDelimiterRight } = options
        const valueRange: [number, number] = [begin + outputDelimiterLeft.length, end - outputDelimiterRight.length]

        // Extract the content within the delimiters
        let content = input.slice(valueRange[0], valueRange[1]).trim();

        // Check for and handle `${}` syntax
        const regex = /\$\{([^}]+)\}/g;
        content = content.replace(regex, (match, p1) => p1.trim());

        // Use the modified content in the parent constructor
        super(TokenKind.Output, [begin + outputDelimiterLeft.length, begin + outputDelimiterLeft.length + content.length], content, begin, end, trimOutputLeft, trimOutputRight, file)
      }
    }
    */

    var HTMLToken = /** @class */ (function (_super) {
        __extends(HTMLToken, _super);
        function HTMLToken(input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.HTML, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            _this.trimLeft = 0;
            _this.trimRight = 0;
            return _this;
        }
        HTMLToken.prototype.getContent = function () {
            return this.input.slice(this.begin + this.trimLeft, this.end - this.trimRight);
        };
        return HTMLToken;
    }(Token));

    var NumberToken = /** @class */ (function (_super) {
        __extends(NumberToken, _super);
        function NumberToken(input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.Number, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            _this.content = Number(_this.getText());
            return _this;
        }
        return NumberToken;
    }(Token));

    var IdentifierToken = /** @class */ (function (_super) {
        __extends(IdentifierToken, _super);
        function IdentifierToken(input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.Word, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            _this.content = _this.getText();
            return _this;
        }
        return IdentifierToken;
    }(Token));

    var LiteralToken = /** @class */ (function (_super) {
        __extends(LiteralToken, _super);
        function LiteralToken(input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.Literal, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            _this.literal = _this.getText();
            _this.content = literalValues[_this.literal];
            return _this;
        }
        return LiteralToken;
    }(Token));

    var operatorPrecedences = {
        '==': 2,
        '!=': 2,
        '>': 2,
        '<': 2,
        '>=': 2,
        '<=': 2,
        'contains': 2,
        'not': 1,
        'and': 0,
        'or': 0
    };
    var operatorTypes = {
        '==': 0 /* OperatorType.Binary */,
        '!=': 0 /* OperatorType.Binary */,
        '>': 0 /* OperatorType.Binary */,
        '<': 0 /* OperatorType.Binary */,
        '>=': 0 /* OperatorType.Binary */,
        '<=': 0 /* OperatorType.Binary */,
        'contains': 0 /* OperatorType.Binary */,
        'not': 1 /* OperatorType.Unary */,
        'and': 0 /* OperatorType.Binary */,
        'or': 0 /* OperatorType.Binary */
    };
    var OperatorToken = /** @class */ (function (_super) {
        __extends(OperatorToken, _super);
        function OperatorToken(input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.Operator, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            _this.operator = _this.getText();
            return _this;
        }
        OperatorToken.prototype.getPrecedence = function () {
            var key = this.getText();
            return key in operatorPrecedences ? operatorPrecedences[key] : 1;
        };
        return OperatorToken;
    }(Token));

    var PropertyAccessToken = /** @class */ (function (_super) {
        __extends(PropertyAccessToken, _super);
        function PropertyAccessToken(variable, props, input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.PropertyAccess, input, begin, end, file) || this;
            _this.variable = variable;
            _this.props = props;
            return _this;
        }
        return PropertyAccessToken;
    }(Token));

    var FilterToken = /** @class */ (function (_super) {
        __extends(FilterToken, _super);
        function FilterToken(name, args, input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.Filter, input, begin, end, file) || this;
            _this.name = name;
            _this.args = args;
            return _this;
        }
        return FilterToken;
    }(Token));

    var HashToken = /** @class */ (function (_super) {
        __extends(HashToken, _super);
        function HashToken(input, begin, end, name, value, file) {
            var _this = _super.call(this, exports.TokenKind.Hash, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.name = name;
            _this.value = value;
            _this.file = file;
            return _this;
        }
        return HashToken;
    }(Token));

    var rHex = /[\da-fA-F]/;
    var rOct = /[0-7]/;
    var escapeChar = {
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t',
        v: '\x0B'
    };
    function hexVal(c) {
        var code = c.charCodeAt(0);
        if (code >= 97)
            return code - 87;
        if (code >= 65)
            return code - 55;
        return code - 48;
    }
    function parseStringLiteral(str) {
        var ret = '';
        for (var i = 1; i < str.length - 1; i++) {
            if (str[i] !== '\\') {
                ret += str[i];
                continue;
            }
            if (escapeChar[str[i + 1]] !== undefined) {
                ret += escapeChar[str[++i]];
            }
            else if (str[i + 1] === 'u') {
                var val = 0;
                var j = i + 2;
                while (j <= i + 5 && rHex.test(str[j])) {
                    val = val * 16 + hexVal(str[j++]);
                }
                i = j - 1;
                ret += String.fromCharCode(val);
            }
            else if (!rOct.test(str[i + 1])) {
                ret += str[++i];
            }
            else {
                var j = i + 1;
                var val = 0;
                while (j <= i + 3 && rOct.test(str[j])) {
                    val = val * 8 + hexVal(str[j++]);
                }
                i = j - 1;
                ret += String.fromCharCode(val);
            }
        }
        return ret;
    }

    var QuotedToken = /** @class */ (function (_super) {
        __extends(QuotedToken, _super);
        function QuotedToken(input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.Quoted, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            _this.content = parseStringLiteral(_this.getText());
            return _this;
        }
        return QuotedToken;
    }(Token));

    var RangeToken = /** @class */ (function (_super) {
        __extends(RangeToken, _super);
        function RangeToken(input, begin, end, lhs, rhs, file) {
            var _this = _super.call(this, exports.TokenKind.Range, input, begin, end, file) || this;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.lhs = lhs;
            _this.rhs = rhs;
            _this.file = file;
            return _this;
        }
        return RangeToken;
    }(Token));

    /**
     * LiquidTagToken is different from TagToken by not having delimiters `{%` or `%}`
     */
    var LiquidTagToken = /** @class */ (function (_super) {
        __extends(LiquidTagToken, _super);
        function LiquidTagToken(input, begin, end, options, file) {
            var _this = _super.call(this, exports.TokenKind.Tag, [begin, end], input, begin, end, false, false, file) || this;
            _this.tokenizer = new Tokenizer(input, options.operators, file, _this.contentRange);
            _this.name = _this.tokenizer.readTagName();
            _this.tokenizer.assert(_this.name, 'illegal liquid tag syntax');
            _this.tokenizer.skipBlank();
            _this.args = _this.tokenizer.remaining();
            // Handle ${} syntax within arguments
            _this.args = _this.processDollarCurlySyntax(_this.args);
            return _this;
        }
        LiquidTagToken.prototype.processDollarCurlySyntax = function (args) {
            return args.replace(/\$\{([^}]+)\}/g, '$1');
        };
        return LiquidTagToken;
    }(DelimitedToken));

    /**
     * value expression with optional filters
     * e.g.
     * {% assign foo="bar" | append: "coo" %}
     */
    var FilteredValueToken = /** @class */ (function (_super) {
        __extends(FilteredValueToken, _super);
        function FilteredValueToken(initial, filters, input, begin, end, file) {
            var _this = _super.call(this, exports.TokenKind.FilteredValue, input, begin, end, file) || this;
            _this.initial = initial;
            _this.filters = filters;
            _this.input = input;
            _this.begin = begin;
            _this.end = end;
            _this.file = file;
            return _this;
        }
        return FilteredValueToken;
    }(Token));

    var SimpleEmitter = /** @class */ (function () {
        function SimpleEmitter() {
            this.buffer = '';
        }
        SimpleEmitter.prototype.write = function (html) {
            this.buffer += stringify(html);
        };
        return SimpleEmitter;
    }());

    var StreamedEmitter = /** @class */ (function () {
        function StreamedEmitter() {
            this.buffer = '';
            this.stream = null;
            throw new Error('streaming not supported in browser');
        }
        return StreamedEmitter;
    }());

    var KeepingTypeEmitter = /** @class */ (function () {
        function KeepingTypeEmitter() {
            this.buffer = '';
        }
        KeepingTypeEmitter.prototype.write = function (html) {
            html = toValue(html);
            // This will only preserve the type if the value is isolated.
            // I.E:
            // {{ my-port }} -> 42
            // {{ my-host }}:{{ my-port }} -> 'host:42'
            if (typeof html !== 'string' && this.buffer === '') {
                this.buffer = html;
            }
            else {
                this.buffer = stringify(this.buffer) + stringify(html);
            }
        };
        return KeepingTypeEmitter;
    }());

    var Render = /** @class */ (function () {
        function Render() {
        }
        Render.prototype.renderTemplatesToNodeStream = function (templates, ctx) {
            var _this = this;
            var emitter = new StreamedEmitter();
            Promise.resolve().then(function () { return toPromise(_this.renderTemplates(templates, ctx, emitter)); })
                .then(function () { return emitter.end(); }, function (err) { return emitter.error(err); });
            return emitter.stream;
        };
        Render.prototype.renderTemplates = function (templates, ctx, emitter) {
            var errors, templates_1, templates_1_1, tpl, html, e_1, err, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!emitter) {
                            emitter = ctx.opts.keepOutputType ? new KeepingTypeEmitter() : new SimpleEmitter();
                        }
                        errors = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        templates_1 = __values(templates), templates_1_1 = templates_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!templates_1_1.done) return [3 /*break*/, 7];
                        tpl = templates_1_1.value;
                        ctx.renderLimit.check(performance.now());
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, tpl.render(ctx, emitter)
                            // if not, it'll return an `html`, write to the emitter for it
                        ];
                    case 4:
                        html = _b.sent();
                        // if not, it'll return an `html`, write to the emitter for it
                        html && emitter.write(html);
                        if (emitter['break'] || emitter['continue'])
                            return [3 /*break*/, 7];
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        err = LiquidError.is(e_1) ? e_1 : new RenderError(e_1, tpl);
                        if (ctx.opts.catchAllErrors)
                            errors.push(err);
                        else
                            throw err;
                        return [3 /*break*/, 6];
                    case 6:
                        templates_1_1 = templates_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (templates_1_1 && !templates_1_1.done && (_a = templates_1.return)) _a.call(templates_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (errors.length) {
                            throw new LiquidErrors(errors);
                        }
                        return [2 /*return*/, emitter.buffer];
                }
            });
        };
        return Render;
    }());

    var Expression = /** @class */ (function () {
        function Expression(tokens) {
            this.postfix = __spreadArray([], __read(toPostfix(tokens)), false);
        }
        Expression.prototype.evaluate = function (ctx, lenient) {
            var operands, _a, _b, token, r, result, l, _c, _d, e_1_1;
            var e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        assert(ctx, 'unable to evaluate: context not defined');
                        operands = [];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 11, 12, 13]);
                        _a = __values(this.postfix), _b = _a.next();
                        _f.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 10];
                        token = _b.value;
                        if (!isOperatorToken(token)) return [3 /*break*/, 7];
                        r = operands.pop();
                        result = void 0;
                        if (!(operatorTypes[token.operator] === 1 /* OperatorType.Unary */)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ctx.opts.operators[token.operator](r, ctx)];
                    case 3:
                        result = _f.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        l = operands.pop();
                        return [4 /*yield*/, ctx.opts.operators[token.operator](l, r, ctx)];
                    case 5:
                        result = _f.sent();
                        _f.label = 6;
                    case 6:
                        operands.push(result);
                        return [3 /*break*/, 9];
                    case 7:
                        _d = (_c = operands).push;
                        return [4 /*yield*/, evalToken(token, ctx, lenient)];
                    case 8:
                        _d.apply(_c, [_f.sent()]);
                        _f.label = 9;
                    case 9:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, operands[0]];
                }
            });
        };
        Expression.prototype.valid = function () {
            return !!this.postfix.length;
        };
        return Expression;
    }());
    function evalToken(token, ctx, lenient) {
        var content;
        if (lenient === void 0) { lenient = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!token)
                        return [2 /*return*/];
                    if ('content' in token) {
                        content = token.content;
                        return [2 /*return*/, content];
                    }
                    if (!isPropertyAccessToken(token)) return [3 /*break*/, 2];
                    return [4 /*yield*/, evalPropertyAccessToken(token, ctx, lenient)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!isRangeToken(token)) return [3 /*break*/, 4];
                    return [4 /*yield*/, evalRangeToken(token, ctx)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
            }
        });
    }
    function evalPropertyAccessToken(token, ctx, lenient) {
        var props, _a, _b, prop, _c, _d, e_2_1, variable, e_3;
        var e_2, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    props = [];
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, 7, 8]);
                    _a = __values(token.props), _b = _a.next();
                    _f.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    prop = _b.value;
                    _d = (_c = props).push;
                    return [4 /*yield*/, evalToken(prop, ctx, false)];
                case 3:
                    _d.apply(_c, [(_f.sent())]);
                    _f.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_2_1 = _f.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 8:
                    _f.trys.push([8, 14, , 15]);
                    if (!token.variable) return [3 /*break*/, 11];
                    return [4 /*yield*/, evalToken(token.variable, ctx, lenient)];
                case 9:
                    variable = _f.sent();
                    return [4 /*yield*/, ctx._getFromScope(variable, props)];
                case 10: return [2 /*return*/, _f.sent()];
                case 11: return [4 /*yield*/, ctx._get(props)];
                case 12: return [2 /*return*/, _f.sent()];
                case 13: return [3 /*break*/, 15];
                case 14:
                    e_3 = _f.sent();
                    if (lenient && e_3.name === 'InternalUndefinedVariableError')
                        return [2 /*return*/, null];
                    throw (new UndefinedVariableError(e_3, token));
                case 15: return [2 /*return*/];
            }
        });
    }
    function evalQuotedToken(token) {
        return token.content;
    }
    function evalRangeToken(token, ctx) {
        var low, high;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, evalToken(token.lhs, ctx)];
                case 1:
                    low = _a.sent();
                    return [4 /*yield*/, evalToken(token.rhs, ctx)];
                case 2:
                    high = _a.sent();
                    return [2 /*return*/, range(+low, +high + 1)];
            }
        });
    }
    function toPostfix(tokens) {
        var ops, tokens_1, tokens_1_1, token, e_4_1;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ops = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, 11, 12]);
                    tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next();
                    _b.label = 2;
                case 2:
                    if (!!tokens_1_1.done) return [3 /*break*/, 9];
                    token = tokens_1_1.value;
                    if (!isOperatorToken(token)) return [3 /*break*/, 6];
                    _b.label = 3;
                case 3:
                    if (!(ops.length && ops[ops.length - 1].getPrecedence() > token.getPrecedence())) return [3 /*break*/, 5];
                    return [4 /*yield*/, ops.pop()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 5:
                    ops.push(token);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, token];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    tokens_1_1 = tokens_1.next();
                    return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 12:
                    if (!ops.length) return [3 /*break*/, 14];
                    return [4 /*yield*/, ops.pop()];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 14: return [2 /*return*/];
            }
        });
    }

    function isTruthy(val, ctx) {
        return !isFalsy(val, ctx);
    }
    function isFalsy(val, ctx) {
        val = toValue(val);
        if (ctx.opts.jsTruthy) {
            return !val;
        }
        else {
            return val === false || undefined === val || val === null;
        }
    }

    var defaultOperators = {
        '==': equals,
        '!=': function (l, r) { return !equals(l, r); },
        '>': function (l, r) {
            if (isComparable(l))
                return l.gt(r);
            if (isComparable(r))
                return r.lt(l);
            return toValue(l) > toValue(r);
        },
        '<': function (l, r) {
            if (isComparable(l))
                return l.lt(r);
            if (isComparable(r))
                return r.gt(l);
            return toValue(l) < toValue(r);
        },
        '>=': function (l, r) {
            if (isComparable(l))
                return l.geq(r);
            if (isComparable(r))
                return r.leq(l);
            return toValue(l) >= toValue(r);
        },
        '<=': function (l, r) {
            if (isComparable(l))
                return l.leq(r);
            if (isComparable(r))
                return r.geq(l);
            return toValue(l) <= toValue(r);
        },
        'contains': function (l, r) {
            l = toValue(l);
            if (isArray(l))
                return l.some(function (i) { return equals(i, r); });
            if (isFunction(l === null || l === void 0 ? void 0 : l.indexOf))
                return l.indexOf(toValue(r)) > -1;
            return false;
        },
        'not': function (v, ctx) { return isFalsy(toValue(v), ctx); },
        'and': function (l, r, ctx) { return isTruthy(toValue(l), ctx) && isTruthy(toValue(r), ctx); },
        'or': function (l, r, ctx) { return isTruthy(toValue(l), ctx) || isTruthy(toValue(r), ctx); }
    };
    function equals(lhs, rhs) {
        if (isComparable(lhs))
            return lhs.equals(rhs);
        if (isComparable(rhs))
            return rhs.equals(lhs);
        lhs = toValue(lhs);
        rhs = toValue(rhs);
        if (isArray(lhs)) {
            return isArray(rhs) && arrayEquals(lhs, rhs);
        }
        return lhs === rhs;
    }
    function arrayEquals(lhs, rhs) {
        if (lhs.length !== rhs.length)
            return false;
        return !lhs.some(function (value, i) { return !equals(value, rhs[i]); });
    }

    var Node = /** @class */ (function () {
        function Node(key, value, next, prev) {
            this.key = key;
            this.value = value;
            this.next = next;
            this.prev = prev;
        }
        return Node;
    }());
    var LRU = /** @class */ (function () {
        function LRU(limit, size) {
            if (size === void 0) { size = 0; }
            this.limit = limit;
            this.size = size;
            this.cache = {};
            this.head = new Node('HEAD', null, null, null);
            this.tail = new Node('TAIL', null, null, null);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        LRU.prototype.write = function (key, value) {
            if (this.cache[key]) {
                this.cache[key].value = value;
            }
            else {
                var node = new Node(key, value, this.head.next, this.head);
                this.head.next.prev = node;
                this.head.next = node;
                this.cache[key] = node;
                this.size++;
                this.ensureLimit();
            }
        };
        LRU.prototype.read = function (key) {
            if (!this.cache[key])
                return;
            var value = this.cache[key].value;
            this.remove(key);
            this.write(key, value);
            return value;
        };
        LRU.prototype.remove = function (key) {
            var node = this.cache[key];
            node.prev.next = node.next;
            node.next.prev = node.prev;
            delete this.cache[key];
            this.size--;
        };
        LRU.prototype.clear = function () {
            this.head.next = this.tail;
            this.tail.prev = this.head;
            this.size = 0;
            this.cache = {};
        };
        LRU.prototype.ensureLimit = function () {
            if (this.size > this.limit)
                this.remove(this.tail.prev.key);
        };
        return LRU;
    }());

    function domResolve(root, path) {
        var base = document.createElement('base');
        base.href = root;
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(base, head.firstChild);
        var a = document.createElement('a');
        a.href = path;
        var resolved = a.href;
        head.removeChild(base);
        return resolved;
    }
    function resolve(root, filepath, ext) {
        if (root.length && last(root) !== '/')
            root += '/';
        var url = domResolve(root, filepath);
        return url.replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/, function (str, origin, path) {
            var last = path.split('/').pop();
            if (/\.\w+$/.test(last))
                return str;
            return origin + path + ext;
        });
    }
    function readFile(url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(xhr.responseText);
                            }
                            else {
                                reject(new Error(xhr.statusText));
                            }
                        };
                        xhr.onerror = function () {
                            reject(new Error('An error occurred whilst receiving the response.'));
                        };
                        xhr.open('GET', url);
                        xhr.send();
                    })];
            });
        });
    }
    function readFileSync(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status < 200 || xhr.status >= 300) {
            throw new Error(xhr.statusText);
        }
        return xhr.responseText;
    }
    function exists(filepath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    }
    function existsSync(filepath) {
        return true;
    }
    function dirname(filepath) {
        return domResolve(filepath, '.');
    }
    var sep = '/';

    var fs = /*#__PURE__*/Object.freeze({
        __proto__: null,
        resolve: resolve,
        readFile: readFile,
        readFileSync: readFileSync,
        exists: exists,
        existsSync: existsSync,
        dirname: dirname,
        sep: sep
    });

    function defaultFilter(value, defaultValue) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        value = toValue(value);
        if (isArray(value) || isString(value))
            return value.length ? value : defaultValue;
        if (value === false && (new Map(args)).get('allow_false'))
            return false;
        return isFalsy(value, this.context) ? defaultValue : value;
    }
    function json(value, space) {
        if (space === void 0) { space = 0; }
        return JSON.stringify(value, null, space);
    }
    function inspect(value, space) {
        if (space === void 0) { space = 0; }
        var ancestors = [];
        return JSON.stringify(value, function (_key, value) {
            if (typeof value !== 'object' || value === null)
                return value;
            // `this` is the object that value is contained in, i.e., its direct parent.
            while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this)
                ancestors.pop();
            if (ancestors.includes(value))
                return '[Circular]';
            ancestors.push(value);
            return value;
        }, space);
    }
    function to_integer(value) {
        return Number(value);
    }
    var raw = {
        raw: true,
        handler: identify
    };
    var misc = {
        default: defaultFilter,
        raw: raw,
        jsonify: json,
        to_integer: to_integer,
        json: json,
        inspect: inspect
    };

    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#34;',
        "'": '&#39;'
    };
    var unescapeMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#34;': '"',
        '&#39;': "'"
    };
    function escape(str) {
        str = stringify(str);
        this.context.memoryLimit.use(str.length);
        return str.replace(/&|<|>|"|'/g, function (m) { return escapeMap[m]; });
    }
    function xml_escape(str) {
        return escape.call(this, str);
    }
    function unescape(str) {
        str = stringify(str);
        this.context.memoryLimit.use(str.length);
        return str.replace(/&(amp|lt|gt|#34|#39);/g, function (m) { return unescapeMap[m]; });
    }
    function escape_once(str) {
        return escape.call(this, unescape.call(this, str));
    }
    function newline_to_br(v) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.replace(/\r?\n/gm, '<br />\n');
    }
    function strip_html(v) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<.*?>|<!--[\s\S]*?-->/g, '');
    }

    var htmlFilters = /*#__PURE__*/Object.freeze({
        __proto__: null,
        escape: escape,
        xml_escape: xml_escape,
        escape_once: escape_once,
        newline_to_br: newline_to_br,
        strip_html: strip_html
    });

    var MapFS = /** @class */ (function () {
        function MapFS(mapping) {
            this.mapping = mapping;
            this.sep = '/';
        }
        MapFS.prototype.exists = function (filepath) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.existsSync(filepath)];
                });
            });
        };
        MapFS.prototype.existsSync = function (filepath) {
            return !isNil(this.mapping[filepath]);
        };
        MapFS.prototype.readFile = function (filepath) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.readFileSync(filepath)];
                });
            });
        };
        MapFS.prototype.readFileSync = function (filepath) {
            var content = this.mapping[filepath];
            if (isNil(content))
                throw new Error("ENOENT: ".concat(filepath));
            return content;
        };
        MapFS.prototype.dirname = function (filepath) {
            var segments = filepath.split(this.sep);
            segments.pop();
            return segments.join(this.sep);
        };
        MapFS.prototype.resolve = function (dir, file, ext) {
            var e_1, _a;
            file += ext;
            if (dir === '.')
                return file;
            var segments = dir.split(/\/+/);
            try {
                for (var _b = __values(file.split(this.sep)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var segment = _c.value;
                    if (segment === '.' || segment === '')
                        continue;
                    else if (segment === '..') {
                        if (segments.length > 1 || segments[0] !== '')
                            segments.pop();
                    }
                    else
                        segments.push(segment);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return segments.join(this.sep);
        };
        return MapFS;
    }());

    var defaultOptions = {
        root: ['.'],
        layouts: ['.'],
        partials: ['.'],
        relativeReference: true,
        jekyllInclude: false,
        cache: undefined,
        extname: '',
        fs: fs,
        dynamicPartials: true,
        jsTruthy: false,
        dateFormat: '%A, %B %-e, %Y at %-l:%M %P %z',
        locale: '',
        trimTagRight: false,
        trimTagLeft: false,
        trimOutputRight: false,
        trimOutputLeft: false,
        greedy: true,
        tagDelimiterLeft: '{%',
        tagDelimiterRight: '%}',
        outputDelimiterLeft: '{{',
        outputDelimiterRight: '}}',
        attributeLeft: '${',
        attributeRight: '}',
        contentBlocksTag: 'content_blocks',
        preserveTimezones: false,
        strictFilters: false,
        strictVariables: false,
        ownPropertyOnly: true,
        lenientIf: false,
        globals: {},
        keepOutputType: false,
        operators: defaultOperators,
        memoryLimit: Infinity,
        parseLimit: Infinity,
        renderLimit: Infinity
    };
    function normalize(options) {
        var _a, _b;
        if (options.hasOwnProperty('root')) {
            if (!options.hasOwnProperty('partials'))
                options.partials = options.root;
            if (!options.hasOwnProperty('layouts'))
                options.layouts = options.root;
        }
        if (options.hasOwnProperty('cache')) {
            var cache = void 0;
            if (typeof options.cache === 'number')
                cache = options.cache > 0 ? new LRU(options.cache) : undefined;
            else if (typeof options.cache === 'object')
                cache = options.cache;
            else
                cache = options.cache ? new LRU(1024) : undefined;
            options.cache = cache;
        }
        options = __assign(__assign(__assign({}, defaultOptions), (options.jekyllInclude ? { dynamicPartials: false } : {})), options);
        if ((!options.fs.dirname || !options.fs.sep) && options.relativeReference) {
            console.warn('[LiquidJS] `fs.dirname` and `fs.sep` are required for relativeReference, set relativeReference to `false` to suppress this warning');
            options.relativeReference = false;
        }
        options.root = normalizeDirectoryList(options.root);
        options.partials = normalizeDirectoryList(options.partials);
        options.layouts = normalizeDirectoryList(options.layouts);
        options.outputEscape = options.outputEscape && getOutputEscapeFunction(options.outputEscape);
        if (!options.locale) {
            options.locale = (_b = (_a = getDateTimeFormat()) === null || _a === void 0 ? void 0 : _a().resolvedOptions().locale) !== null && _b !== void 0 ? _b : 'en-US';
        }
        if (options.templates) {
            options.fs = new MapFS(options.templates);
            options.relativeReference = true;
            options.root = options.partials = options.layouts = '.';
        }
        return options;
    }
    function getOutputEscapeFunction(nameOrFunction) {
        if (nameOrFunction === 'escape')
            return escape;
        if (nameOrFunction === 'json')
            return misc.json;
        assert(isFunction(nameOrFunction), '`outputEscape` need to be of type string or function');
        return nameOrFunction;
    }
    function normalizeDirectoryList(value) {
        var list = [];
        if (isArray(value))
            list = value;
        if (isString(value))
            list = [value];
        return list;
    }

    function whiteSpaceCtrl(tokens, options) {
        var inRaw = false;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (!isDelimitedToken(token))
                continue;
            if (!inRaw && token.trimLeft) {
                trimLeft(tokens[i - 1], options.greedy);
            }
            if (isTagToken(token)) {
                if (token.name === 'raw')
                    inRaw = true;
                else if (token.name === 'endraw')
                    inRaw = false;
            }
            if (!inRaw && token.trimRight) {
                trimRight(tokens[i + 1], options.greedy);
            }
        }
    }
    function trimLeft(token, greedy) {
        if (!token || !isHTMLToken(token))
            return;
        var mask = greedy ? BLANK : INLINE_BLANK;
        while (TYPES[token.input.charCodeAt(token.end - 1 - token.trimRight)] & mask)
            token.trimRight++;
    }
    function trimRight(token, greedy) {
        if (!token || !isHTMLToken(token))
            return;
        var mask = greedy ? BLANK : INLINE_BLANK;
        while (TYPES[token.input.charCodeAt(token.begin + token.trimLeft)] & mask)
            token.trimLeft++;
        if (token.input.charAt(token.begin + token.trimLeft) === '\n')
            token.trimLeft++;
    }

    var Tokenizer = /** @class */ (function () {
        function Tokenizer(input, operators, file, range) {
            if (operators === void 0) { operators = defaultOptions.operators; }
            this.input = input;
            this.file = file;
            this.rawBeginAt = -1;
            this.p = range ? range[0] : 0;
            this.N = range ? range[1] : input.length;
            this.opTrie = createTrie(operators);
            this.literalTrie = createTrie(literalValues);
        }
        Tokenizer.prototype.readExpression = function () {
            return new Expression(this.readExpressionTokens());
        };
        Tokenizer.prototype.readExpressionTokens = function () {
            var expressionTokens, operator, operand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.p < this.N)) return [3 /*break*/, 7];
                        if (!this.match('${')) return [3 /*break*/, 2];
                        this.p += 2;
                        expressionTokens = this.readExpressionTokens();
                        return [5 /*yield**/, __values(expressionTokens)];
                    case 1:
                        _a.sent();
                        this.assert(this.peek() === '}', "expected \"}\" at the end of dynamic expression");
                        this.p++;
                        return [3 /*break*/, 0];
                    case 2:
                        operator = this.readOperator();
                        if (!operator) return [3 /*break*/, 4];
                        return [4 /*yield*/, operator];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 4:
                        operand = this.readValue();
                        if (!operand) return [3 /*break*/, 6];
                        return [4 /*yield*/, operand];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 6: return [2 /*return*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        Tokenizer.prototype.readOperator = function () {
            this.skipBlank();
            var end = this.matchTrie(this.opTrie);
            if (end === -1)
                return;
            return new OperatorToken(this.input, this.p, (this.p = end), this.file);
        };
        Tokenizer.prototype.matchTrie = function (trie) {
            var node = trie;
            var i = this.p;
            var info;
            while (node[this.input[i]] && i < this.N) {
                node = node[this.input[i++]];
                if (node['end'])
                    info = node;
            }
            if (!info)
                return -1;
            if (info['needBoundary'] && isWord(this.peek(i - this.p)))
                return -1;
            return i;
        };
        Tokenizer.prototype.readFilteredValue = function () {
            var begin = this.p;
            if (this.match('$')) {
                this.p += 2;
                var dynamicExpression = this.readExpression();
                this.assert(dynamicExpression.valid(), "invalid value expression: ".concat(this.snapshot()));
                this.assert(this.peek() === '}', "expected \"}\" at the end of dynamic expression");
                this.p++;
                return new FilteredValueToken(dynamicExpression, [], this.input, begin, this.p, this.file);
            }
            var initial = this.readExpression();
            this.assert(initial.valid(), "invalid value expression: ".concat(this.snapshot(), " : ").concat(JSON.stringify(initial)));
            var filters = this.readFilters();
            return new FilteredValueToken(initial, filters, this.input, begin, this.p, this.file);
        };
        Tokenizer.prototype.readFilters = function () {
            var filters = [];
            while (true) {
                var filter = this.readFilter();
                if (!filter)
                    return filters;
                filters.push(filter);
            }
        };
        Tokenizer.prototype.readFilter = function () {
            var _this = this;
            this.skipBlank();
            if (this.end())
                return null;
            this.assert(this.peek() === '|', "expected \"|\" before filter");
            this.p++;
            var begin = this.p;
            var name = this.readIdentifier();
            if (!name.size()) {
                this.assert(this.end(), "expected filter name");
                return null;
            }
            var args = [];
            this.skipBlank();
            if (this.peek() === ':') {
                do {
                    ++this.p;
                    var arg = this.readFilterArg();
                    arg && args.push(arg);
                    this.skipBlank();
                    this.assert(this.end() || this.peek() === ',' || this.peek() === '|', function () { return "unexpected character ".concat(_this.snapshot()); });
                } while (this.peek() === ',');
            }
            return new FilterToken(name.getText(), args, this.input, begin, this.p, this.file);
        };
        Tokenizer.prototype.readFilterArg = function () {
            var key = this.readValue();
            if (!key)
                return;
            this.skipBlank();
            if (this.peek() !== ':')
                return key;
            ++this.p;
            var value = this.readValue();
            return [key.getText(), value];
        };
        Tokenizer.prototype.readTopLevelTokens = function (options) {
            if (options === void 0) { options = defaultOptions; }
            var tokens = [];
            while (this.p < this.N) {
                var token = this.readTopLevelToken(options);
                tokens.push(token);
            }
            whiteSpaceCtrl(tokens, options);
            return tokens;
        };
        Tokenizer.prototype.readTopLevelToken = function (options) {
            var tagDelimiterLeft = options.tagDelimiterLeft, outputDelimiterLeft = options.outputDelimiterLeft;
            if (this.rawBeginAt > -1)
                return this.readEndrawOrRawContent(options);
            // Use toLowerCase() to make case-insensitive
            var input = this.input.slice(this.p).toLowerCase();
            if (input.startsWith('<!doctype')) {
                return this.readDOCTYPEToken();
            }
            if (this.match('{{content_blocks.${'))
                return this.readContentBlocksToken(options);
            if (this.match(tagDelimiterLeft))
                return this.readTagToken(options);
            if (this.match(outputDelimiterLeft))
                return this.readOutputToken(options);
            return this.readHTMLToken([tagDelimiterLeft, outputDelimiterLeft]);
        };
        Tokenizer.prototype.readDOCTYPEToken = function () {
            var begin = this.p;
            while (this.p < this.N && this.input[this.p] !== '>') {
                this.p++;
            }
            this.p++; // Include the closing '>'
            return new HTMLToken(this.input, begin, this.p, this.file);
        };
        Tokenizer.prototype.readHTMLToken = function (stopStrings) {
            var _this = this;
            var begin = this.p;
            while (this.p < this.N) {
                if (stopStrings.some(function (str) { return _this.match(str); }))
                    break;
                ++this.p;
            }
            return new HTMLToken(this.input, begin, this.p, this.file);
        };
        Tokenizer.prototype.readTagToken = function (options) {
            var _a = this, file = _a.file, input = _a.input;
            var begin = this.p;
            if (this.readToDelimiter(options.tagDelimiterRight) === -1) {
                throw this.error("tag ".concat(this.snapshot(begin), " not closed"), begin);
            }
            var token = new TagToken(input, begin, this.p, options, file);
            if (token.name === 'raw')
                this.rawBeginAt = begin;
            return token;
        };
        Tokenizer.prototype.readContentBlocksToken = function (options) {
            var _a = this, file = _a.file, input = _a.input;
            var begin = this.p;
            this.p += '{{content_blocks.'.length;
            if (this.input[this.p] === '$' && this.input[this.p + 1] === '{') {
                this.p += 2;
                var filename = '';
                while (this.p < this.N && !(this.input[this.p] === '}' && this.input[this.p + 1] === '}')) {
                    filename += this.input[this.p];
                    this.p++;
                }
                if (this.input[this.p] === '}' && this.input[this.p + 1] === '}') {
                    this.p += 3;
                }
                else {
                    throw this.error('Tag not closed properly');
                }
                var token = new TagToken(input, begin, this.p, options, file);
                //@ts-ignore  
                token.filename = filename;
                return token;
            }
            else {
                throw this.error('Dynamic part not properly enclosed in ${}');
            }
        };
        Tokenizer.prototype.readToDelimiter = function (delimiter, respectQuoted) {
            if (respectQuoted === void 0) { respectQuoted = false; }
            this.skipBlank();
            while (this.p < this.N) {
                if (respectQuoted && (this.peekType() & QUOTE)) {
                    this.readQuoted();
                    continue;
                }
                ++this.p;
                if (this.rmatch(delimiter))
                    return this.p;
            }
            return -1;
        };
        Tokenizer.prototype.readOutputToken = function (options) {
            if (options === void 0) { options = defaultOptions; }
            var _a = this, file = _a.file, input = _a.input;
            var outputDelimiterRight = options.outputDelimiterRight;
            var begin = this.p;
            if (this.readToDelimiter(outputDelimiterRight, true) === -1) {
                throw this.error("output ".concat(this.snapshot(begin), " not closed"), begin);
            }
            return new OutputToken(input, begin, this.p, options, file);
        };
        Tokenizer.prototype.readEndrawOrRawContent = function (options) {
            var tagDelimiterLeft = options.tagDelimiterLeft, tagDelimiterRight = options.tagDelimiterRight;
            var begin = this.p;
            var leftPos = this.readTo(tagDelimiterLeft) - tagDelimiterLeft.length;
            while (this.p < this.N) {
                if (this.readIdentifier().getText() !== 'endraw') {
                    leftPos = this.readTo(tagDelimiterLeft) - tagDelimiterLeft.length;
                    continue;
                }
                while (this.p <= this.N) {
                    if (this.rmatch(tagDelimiterRight)) {
                        var end = this.p;
                        if (begin === leftPos) {
                            this.rawBeginAt = -1;
                            return new TagToken(this.input, begin, end, options, this.file);
                        }
                        else {
                            this.p = leftPos;
                            return new HTMLToken(this.input, begin, leftPos, this.file);
                        }
                    }
                    if (this.rmatch(tagDelimiterLeft))
                        break;
                    this.p++;
                }
            }
            throw this.error("raw ".concat(this.snapshot(this.rawBeginAt), " not closed"), begin);
        };
        Tokenizer.prototype.readLiquidTagTokens = function (options) {
            if (options === void 0) { options = defaultOptions; }
            var tokens = [];
            while (this.p < this.N) {
                var token = this.readLiquidTagToken(options);
                token && tokens.push(token);
            }
            return tokens;
        };
        Tokenizer.prototype.readLiquidTagToken = function (options) {
            this.skipBlank();
            if (this.end())
                return;
            var begin = this.p;
            this.readToDelimiter('\n');
            var end = this.p;
            return new LiquidTagToken(this.input, begin, end, options, this.file);
        };
        Tokenizer.prototype.error = function (msg, pos) {
            if (pos === void 0) { pos = this.p; }
            return new TokenizationError(msg, new IdentifierToken(this.input, pos, this.N, this.file));
        };
        Tokenizer.prototype.assert = function (pred, msg, pos) {
            if (!pred)
                throw this.error(typeof msg === 'function' ? msg() : msg, pos);
        };
        Tokenizer.prototype.snapshot = function (begin) {
            if (begin === void 0) { begin = this.p; }
            return JSON.stringify(ellipsis(this.input.slice(begin, this.N), 32));
        };
        /**
         * @deprecated use #readIdentifier instead
         */
        Tokenizer.prototype.readWord = function () {
            return this.readIdentifier();
        };
        Tokenizer.prototype.readIdentifier = function () {
            this.skipBlank();
            var begin = this.p;
            while (!this.end() && isWord(this.peek()))
                ++this.p;
            return new IdentifierToken(this.input, begin, this.p, this.file);
        };
        Tokenizer.prototype.readNonEmptyIdentifier = function () {
            var id = this.readIdentifier();
            return id.size() ? id : undefined;
        };
        Tokenizer.prototype.readTagName = function () {
            this.skipBlank();
            // Handle inline comment tags
            if (this.input[this.p] === '#')
                return this.input.slice(this.p, ++this.p);
            return this.readIdentifier().getText();
        };
        Tokenizer.prototype.readHashes = function (jekyllStyle) {
            var hashes = [];
            while (true) {
                var hash = this.readHash(jekyllStyle);
                if (!hash)
                    return hashes;
                hashes.push(hash);
            }
        };
        Tokenizer.prototype.readHash = function (jekyllStyle) {
            this.skipBlank();
            if (this.peek() === ',')
                ++this.p;
            var begin = this.p;
            var name = this.readNonEmptyIdentifier();
            if (!name)
                return;
            var value;
            this.skipBlank();
            var sep = jekyllStyle ? '=' : ':';
            if (this.peek() === sep) {
                ++this.p;
                value = this.readValue();
            }
            return new HashToken(this.input, begin, this.p, name, value, this.file);
        };
        Tokenizer.prototype.remaining = function () {
            return this.input.slice(this.p, this.N);
        };
        Tokenizer.prototype.advance = function (step) {
            if (step === void 0) { step = 1; }
            this.p += step;
        };
        Tokenizer.prototype.end = function () {
            return this.p >= this.N;
        };
        Tokenizer.prototype.readTo = function (end) {
            while (this.p < this.N) {
                ++this.p;
                if (this.rmatch(end))
                    return this.p;
            }
            return -1;
        };
        Tokenizer.prototype.readValue = function () {
            this.skipBlank();
            var begin = this.p;
            var variable = this.readLiteral() || this.readQuoted() || this.readRange() || this.readNumber();
            var props = this.readProperties(!variable);
            if (!props.length)
                return variable;
            return new PropertyAccessToken(variable, props, this.input, begin, this.p);
        };
        Tokenizer.prototype.readScopeValue = function () {
            this.skipBlank();
            var begin = this.p;
            var props = this.readProperties();
            if (!props.length)
                return undefined;
            return new PropertyAccessToken(undefined, props, this.input, begin, this.p);
        };
        Tokenizer.prototype.readProperties = function (isBegin) {
            if (isBegin === void 0) { isBegin = true; }
            var props = [];
            while (true) {
                if (this.peek() === '[') {
                    this.p++;
                    var prop = this.readValue() || new IdentifierToken(this.input, this.p, this.p, this.file);
                    this.assert(this.readTo(']') !== -1, '[ not closed');
                    props.push(prop);
                    continue;
                }
                if (isBegin && !props.length) {
                    var prop = this.readNonEmptyIdentifier();
                    if (prop) {
                        props.push(prop);
                        continue;
                    }
                }
                if (this.peek() === '.' && this.peek(1) !== '..') { // skip range syntax
                    this.p++;
                    var prop = void 0;
                    if (this.peek() === '$' && this.peek(1) === '{') {
                        this.p += 2; // skip "${"
                        var start = this.p;
                        while (this.p < this.N && this.input[this.p] !== '}') {
                            this.p++;
                        }
                        prop = new IdentifierToken(this.input, start, this.p, this.file);
                        this.assert(this.input[this.p] === '}', "expected \"}\" at the end of dynamic property expression");
                        this.p++; // skip "}"
                    }
                    else {
                        prop = this.readNonEmptyIdentifier();
                    }
                    if (!prop)
                        break;
                    props.push(prop);
                    continue;
                }
                break;
            }
            return props;
        };
        Tokenizer.prototype.readNumber = function () {
            this.skipBlank();
            var decimalFound = false;
            var digitFound = false;
            var n = 0;
            if (this.peekType() & SIGN)
                n++;
            while (this.p + n <= this.N) {
                if (this.peekType(n) & NUMBER) {
                    digitFound = true;
                    n++;
                }
                else if (this.peek(n) === '.' && this.peek(n + 1) !== '.') {
                    if (decimalFound || !digitFound)
                        return;
                    decimalFound = true;
                    n++;
                }
                else
                    break;
            }
            if (digitFound && !isWord(this.peek(n))) {
                var num = new NumberToken(this.input, this.p, this.p + n, this.file);
                this.advance(n);
                return num;
            }
        };
        Tokenizer.prototype.readLiteral = function () {
            this.skipBlank();
            var end = this.matchTrie(this.literalTrie);
            if (end === -1)
                return;
            var literal = new LiteralToken(this.input, this.p, end, this.file);
            this.p = end;
            return literal;
        };
        Tokenizer.prototype.readRange = function () {
            this.skipBlank();
            var begin = this.p;
            if (this.peek() !== '(')
                return;
            ++this.p;
            var lhs = this.readValueOrThrow();
            this.p += 2;
            var rhs = this.readValueOrThrow();
            ++this.p;
            return new RangeToken(this.input, begin, this.p, lhs, rhs, this.file);
        };
        Tokenizer.prototype.readValueOrThrow = function () {
            var _this = this;
            var value = this.readValue();
            this.assert(value, function () { return "unexpected token ".concat(_this.snapshot(), ", value expected"); });
            return value;
        };
        Tokenizer.prototype.readQuoted = function () {
            this.skipBlank();
            var begin = this.p;
            if (!(this.peekType() & QUOTE))
                return;
            ++this.p;
            var escaped = false;
            while (this.p < this.N) {
                ++this.p;
                if (this.input[this.p - 1] === this.input[begin] && !escaped)
                    break;
                if (escaped)
                    escaped = false;
                else if (this.input[this.p - 1] === '\\')
                    escaped = true;
            }
            return new QuotedToken(this.input, begin, this.p, this.file);
        };
        Tokenizer.prototype.readFileNameTemplate = function (options) {
            var outputDelimiterLeft, htmlStopStrings, htmlStopStringSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputDelimiterLeft = options.outputDelimiterLeft;
                        htmlStopStrings = [',', ' ', outputDelimiterLeft];
                        htmlStopStringSet = new Set(htmlStopStrings);
                        _a.label = 1;
                    case 1:
                        if (!(this.p < this.N && !htmlStopStringSet.has(this.peek()))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.match(outputDelimiterLeft)
                                ? this.readOutputToken(options)
                                : this.readHTMLToken(htmlStopStrings)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
        Tokenizer.prototype.match = function (word) {
            for (var i = 0; i < word.length; i++) {
                if (word[i] !== this.input[this.p + i])
                    return false;
            }
            return true;
        };
        Tokenizer.prototype.rmatch = function (pattern) {
            for (var i = 0; i < pattern.length; i++) {
                if (pattern[pattern.length - 1 - i] !== this.input[this.p - 1 - i])
                    return false;
            }
            return true;
        };
        Tokenizer.prototype.peekType = function (n) {
            if (n === void 0) { n = 0; }
            return this.p + n >= this.N ? 0 : TYPES[this.input.charCodeAt(this.p + n)];
        };
        Tokenizer.prototype.peek = function (n) {
            if (n === void 0) { n = 0; }
            return this.p + n >= this.N ? '' : this.input[this.p + n];
        };
        Tokenizer.prototype.skipBlank = function () {
            while (this.peekType() & BLANK)
                ++this.p;
        };
        return Tokenizer;
    }());

    var ParseStream = /** @class */ (function () {
        function ParseStream(tokens, parseToken) {
            this.handlers = {};
            this.stopRequested = false;
            this.tokens = tokens;
            this.parseToken = parseToken;
        }
        ParseStream.prototype.on = function (name, cb) {
            this.handlers[name] = cb;
            return this;
        };
        ParseStream.prototype.trigger = function (event, arg) {
            var h = this.handlers[event];
            return h ? (h.call(this, arg), true) : false;
        };
        ParseStream.prototype.start = function () {
            this.trigger('start');
            var token;
            while (!this.stopRequested && (token = this.tokens.shift())) {
                if (this.trigger('token', token))
                    continue;
                if (isTagToken(token) && this.trigger("tag:".concat(token.name), token)) {
                    continue;
                }
                var template = this.parseToken(token, this.tokens);
                this.trigger('template', template);
            }
            if (!this.stopRequested)
                this.trigger('end');
            return this;
        };
        ParseStream.prototype.stop = function () {
            this.stopRequested = true;
            return this;
        };
        return ParseStream;
    }());

    var TemplateImpl = /** @class */ (function () {
        function TemplateImpl(token) {
            this.token = token;
        }
        return TemplateImpl;
    }());

    var Tag = /** @class */ (function (_super) {
        __extends(Tag, _super);
        function Tag(token, remainTokens, liquid) {
            var _this = _super.call(this, token) || this;
            _this.name = token.name;
            _this.liquid = liquid;
            _this.tokenizer = token.tokenizer;
            return _this;
        }
        return Tag;
    }(TemplateImpl));

    /**
     * Key-Value Pairs Representing Tag Arguments
     * Example:
     *    For the markup `, foo:'bar', coo:2 reversed %}`,
     *    hash['foo'] === 'bar'
     *    hash['coo'] === 2
     *    hash['reversed'] === undefined
     */
    var Hash = /** @class */ (function () {
        function Hash(markup, jekyllStyle) {
            var e_1, _a;
            this.hash = {};
            var tokenizer = new Tokenizer(markup, {});
            try {
                for (var _b = __values(tokenizer.readHashes(jekyllStyle)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var hash = _c.value;
                    this.hash[hash.name.content] = hash.value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        Hash.prototype.render = function (ctx) {
            var hash, _a, _b, key, _c, _d, _e, e_2_1;
            var e_2, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        hash = {};
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 10]);
                        _a = __values(Object.keys(this.hash)), _b = _a.next();
                        _g.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        key = _b.value;
                        _c = hash;
                        _d = key;
                        if (!(this.hash[key] === undefined)) return [3 /*break*/, 3];
                        _e = true;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, evalToken(this.hash[key], ctx)];
                    case 4:
                        _e = _g.sent();
                        _g.label = 5;
                    case 5:
                        _c[_d] = _e;
                        _g.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, hash];
                }
            });
        };
        return Hash;
    }());

    function createTagClass(options) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(token, tokens, liquid) {
                var _this = _super.call(this, token, tokens, liquid) || this;
                if (isFunction(options.parse)) {
                    options.parse.call(_this, token, tokens);
                }
                return _this;
            }
            class_1.prototype.render = function (ctx, emitter) {
                var hash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Hash(this.token.args).render(ctx)];
                        case 1:
                            hash = (_a.sent());
                            return [4 /*yield*/, options.render.call(this, ctx, emitter, hash)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            };
            return class_1;
        }(Tag));
    }

    function isKeyValuePair(arr) {
        return isArray(arr);
    }

    var Filter = /** @class */ (function () {
        function Filter(name, options, args, liquid) {
            this.name = name;
            this.handler = isFunction(options)
                ? options
                : (isFunction(options === null || options === void 0 ? void 0 : options.handler) ? options.handler : identify);
            this.raw = !isFunction(options) && !!(options === null || options === void 0 ? void 0 : options.raw);
            this.args = args;
            this.liquid = liquid;
        }
        Filter.prototype.render = function (value, context) {
            var argv, _a, _b, arg, _c, _d, _e, _f, _g, e_1_1;
            var e_1, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        argv = [];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 8, 9, 10]);
                        _a = __values(this.args), _b = _a.next();
                        _j.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        arg = _b.value;
                        if (!isKeyValuePair(arg)) return [3 /*break*/, 4];
                        _d = (_c = argv).push;
                        _e = [arg[0]];
                        return [4 /*yield*/, evalToken(arg[1], context)];
                    case 3:
                        _d.apply(_c, [_e.concat([_j.sent()])]);
                        return [3 /*break*/, 6];
                    case 4:
                        _g = (_f = argv).push;
                        return [4 /*yield*/, evalToken(arg, context)];
                    case 5:
                        _g.apply(_f, [_j.sent()]);
                        _j.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [4 /*yield*/, this.handler.apply({ context: context, liquid: this.liquid }, __spreadArray([value], __read(argv), false))];
                    case 11: return [2 /*return*/, _j.sent()];
                }
            });
        };
        return Filter;
    }());

    var Value = /** @class */ (function () {
        /**
         * @param str the value to be valuated, eg.: "foobar" | truncate: 3
         */
        function Value(input, liquid) {
            var _this = this;
            this.filters = [];
            var token = typeof input === 'string'
                ? new Tokenizer(input, liquid.options.operators).readFilteredValue()
                : input;
            this.initial = token.initial;
            this.filters = token.filters.map(function (_a) {
                var name = _a.name, args = _a.args;
                return new Filter(name, _this.getFilter(liquid, name), args, liquid);
            });
        }
        Value.prototype.value = function (ctx, lenient) {
            var val, _a, _b, filter, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        lenient = lenient || (ctx.opts.lenientIf && this.filters.length > 0 && this.filters[0].name === 'default');
                        return [4 /*yield*/, this.initial.evaluate(ctx, lenient)];
                    case 1:
                        val = _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _a = __values(this.filters), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        filter = _b.value;
                        return [4 /*yield*/, filter.render(val, ctx)];
                    case 4:
                        val = _d.sent();
                        _d.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, val];
                }
            });
        };
        Value.prototype.getFilter = function (liquid, name) {
            var impl = liquid.filters[name];
            assert(impl || !liquid.options.strictFilters, function () { return "undefined filter: ".concat(name); });
            return impl;
        };
        return Value;
    }());

    var Output = /** @class */ (function (_super) {
        __extends(Output, _super);
        function Output(token, liquid) {
            var _this = this;
            var _a;
            _this = _super.call(this, token) || this;
            var tokenizer = new Tokenizer(token.input, liquid.options.operators, token.file, token.contentRange);
            _this.value = new Value(tokenizer.readFilteredValue(), liquid);
            var filters = _this.value.filters;
            var outputEscape = liquid.options.outputEscape;
            if (!((_a = filters[filters.length - 1]) === null || _a === void 0 ? void 0 : _a.raw) && outputEscape) {
                filters.push(new Filter(toString.call(outputEscape), outputEscape, [], liquid));
            }
            return _this;
        }
        Output.prototype.render = function (ctx, emitter) {
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.value.value(ctx, false)];
                    case 1:
                        val = _a.sent();
                        emitter.write(val);
                        return [2 /*return*/];
                }
            });
        };
        return Output;
    }(TemplateImpl));

    var HTML = /** @class */ (function (_super) {
        __extends(HTML, _super);
        function HTML(token) {
            var _this = _super.call(this, token) || this;
            _this.str = token.getContent();
            return _this;
        }
        HTML.prototype.render = function (ctx, emitter) {
            return __generator(this, function (_a) {
                emitter.write(this.str);
                return [2 /*return*/];
            });
        };
        return HTML;
    }(TemplateImpl));

    var LookupType;
    (function (LookupType) {
        LookupType["Partials"] = "partials";
        LookupType["Layouts"] = "layouts";
        LookupType["Root"] = "root";
    })(LookupType || (LookupType = {}));
    var Loader = /** @class */ (function () {
        function Loader(options) {
            this.options = options;
            if (options.relativeReference) {
                var sep = options.fs.sep;
                assert(sep, '`fs.sep` is required for relative reference');
                var rRelativePath_1 = new RegExp(['.' + sep, '..' + sep, './', '../'].map(function (prefix) { return escapeRegex(prefix); }).join('|'));
                this.shouldLoadRelative = function (referencedFile) { return rRelativePath_1.test(referencedFile); };
            }
            else {
                this.shouldLoadRelative = function (_referencedFile) { return false; };
            }
            this.contains = this.options.fs.contains || (function () { return true; });
        }
        Loader.prototype.lookup = function (file, type, sync, currentFile) {
            var fs, dirs, _a, _b, filepath, _c, e_1_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fs = this.options.fs;
                        dirs = this.options[type];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, 9, 10]);
                        _a = __values(this.candidates(file, dirs, currentFile, type !== LookupType.Root)), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        filepath = _b.value;
                        if (!sync) return [3 /*break*/, 3];
                        _c = fs.existsSync(filepath);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fs.exists(filepath)];
                    case 4:
                        _c = _e.sent();
                        _e.label = 5;
                    case 5:
                        if (_c)
                            return [2 /*return*/, filepath];
                        _e.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: throw this.lookupError(file, dirs);
                }
            });
        };
        Loader.prototype.candidates = function (file, dirs, currentFile, enforceRoot) {
            var _a, fs, extname, referenced, dirs_1, dirs_1_1, dir, e_2_1, dirs_2, dirs_2_1, dir, referenced, e_3_1, filepath;
            var e_2, _b, e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.options, fs = _a.fs, extname = _a.extname;
                        if (!(this.shouldLoadRelative(file) && currentFile)) return [3 /*break*/, 8];
                        referenced = fs.resolve(this.dirname(currentFile), file, extname);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        dirs_1 = __values(dirs), dirs_1_1 = dirs_1.next();
                        _d.label = 2;
                    case 2:
                        if (!!dirs_1_1.done) return [3 /*break*/, 5];
                        dir = dirs_1_1.value;
                        if (!(!enforceRoot || this.contains(dir, referenced))) return [3 /*break*/, 4];
                        // the relatively referenced file is within one of root dirs
                        return [4 /*yield*/, referenced];
                    case 3:
                        // the relatively referenced file is within one of root dirs
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        dirs_1_1 = dirs_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (dirs_1_1 && !dirs_1_1.done && (_b = dirs_1.return)) _b.call(dirs_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        _d.trys.push([8, 13, 14, 15]);
                        dirs_2 = __values(dirs), dirs_2_1 = dirs_2.next();
                        _d.label = 9;
                    case 9:
                        if (!!dirs_2_1.done) return [3 /*break*/, 12];
                        dir = dirs_2_1.value;
                        referenced = fs.resolve(dir, file, extname);
                        if (!(!enforceRoot || this.contains(dir, referenced))) return [3 /*break*/, 11];
                        return [4 /*yield*/, referenced];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11:
                        dirs_2_1 = dirs_2.next();
                        return [3 /*break*/, 9];
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 15];
                    case 14:
                        try {
                            if (dirs_2_1 && !dirs_2_1.done && (_c = dirs_2.return)) _c.call(dirs_2);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 15:
                        if (!(fs.fallback !== undefined)) return [3 /*break*/, 17];
                        filepath = fs.fallback(file);
                        if (!(filepath !== undefined)) return [3 /*break*/, 17];
                        return [4 /*yield*/, filepath];
                    case 16:
                        _d.sent();
                        _d.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        };
        Loader.prototype.dirname = function (path) {
            var fs = this.options.fs;
            assert(fs.dirname, '`fs.dirname` is required for relative reference');
            return fs.dirname(path);
        };
        Loader.prototype.lookupError = function (file, roots) {
            var err = new Error('ENOENT');
            err.message = "ENOENT: Failed to lookup \"".concat(file, "\" in \"").concat(roots, "\"");
            err.code = 'ENOENT';
            return err;
        };
        return Loader;
    }());

    var Parser = /** @class */ (function () {
        function Parser(liquid) {
            this.liquid = liquid;
            this.cache = this.liquid.options.cache;
            this.fs = this.liquid.options.fs;
            this.parseFile = this.cache ? this._parseFileCached : this._parseFile;
            this.loader = new Loader(this.liquid.options);
            this.parseLimit = new Limiter('parse length', liquid.options.parseLimit);
        }
        Parser.prototype.parse = function (html, filepath) {
            // Remove automatic DOCTYPE conversion
            html = String(html.replace(/(?<!\{\{content_blocks\.)\$\{([^}]+)\}/g, '$1'));
            var tokenizer = new Tokenizer(html, this.liquid.options.operators, filepath);
            var tokens = tokenizer.readTopLevelTokens(this.liquid.options);
            return this.parseTokens(tokens);
        };
        Parser.prototype.parseTokens = function (tokens) {
            var token;
            var templates = [];
            var errors = [];
            while ((token = tokens.shift())) {
                try {
                    templates.push(this.parseToken(token, tokens));
                }
                catch (err) {
                    if (this.liquid.options.catchAllErrors)
                        errors.push(err);
                    else
                        throw err;
                }
            }
            if (errors.length)
                throw new LiquidErrors(errors);
            return templates;
        };
        Parser.prototype.parseToken = function (token, remainTokens) {
            try {
                if (isTagToken(token)) {
                    var TagClass = this.liquid.tags[token.name];
                    assert(TagClass, "tag \"".concat(token.name, "\" not found"));
                    return new TagClass(token, remainTokens, this.liquid, this);
                }
                if (isOutputToken(token)) {
                    return new Output(token, this.liquid);
                }
                return new HTML(token);
            }
            catch (e) {
                if (LiquidError.is(e))
                    throw e;
                throw new ParseError(e, token);
            }
        };
        Parser.prototype.parseStream = function (tokens) {
            var _this = this;
            return new ParseStream(tokens, function (token, tokens) { return _this.parseToken(token, tokens); });
        };
        Parser.prototype._parseFileCached = function (file, sync, type, currentFile) {
            var cache, key, tpls, task, taskOrTpl, _a, err_1;
            if (type === void 0) { type = LookupType.Root; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cache = this.cache;
                        key = this.loader.shouldLoadRelative(file) ? currentFile + ',' + file : type + ':' + file;
                        return [4 /*yield*/, cache.read(key)];
                    case 1:
                        tpls = _b.sent();
                        if (tpls)
                            return [2 /*return*/, tpls];
                        task = this._parseFile(file, sync, type, currentFile);
                        if (!sync) return [3 /*break*/, 3];
                        return [4 /*yield*/, task];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = toPromise(task);
                        _b.label = 4;
                    case 4:
                        taskOrTpl = _a;
                        cache.write(key, taskOrTpl);
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, taskOrTpl];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        err_1 = _b.sent();
                        cache.remove(key);
                        throw err_1;
                    case 8: return [2 /*return*/];
                }
            });
        };
        Parser.prototype._parseFile = function (file, sync, type, currentFile) {
            var filepath, _a, _b;
            if (type === void 0) { type = LookupType.Root; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.loader.lookup(file, type, sync, currentFile)];
                    case 1:
                        filepath = _c.sent();
                        _a = this.parse;
                        if (!sync) return [3 /*break*/, 2];
                        _b = this.fs.readFileSync(filepath);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.fs.readFile(filepath)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, _a.apply(this, [_b, filepath])];
                }
            });
        };
        return Parser;
    }());

    (function (TokenKind) {
        TokenKind[TokenKind["Number"] = 1] = "Number";
        TokenKind[TokenKind["Literal"] = 2] = "Literal";
        TokenKind[TokenKind["Tag"] = 4] = "Tag";
        TokenKind[TokenKind["Output"] = 8] = "Output";
        TokenKind[TokenKind["HTML"] = 16] = "HTML";
        TokenKind[TokenKind["Filter"] = 32] = "Filter";
        TokenKind[TokenKind["Hash"] = 64] = "Hash";
        TokenKind[TokenKind["PropertyAccess"] = 128] = "PropertyAccess";
        TokenKind[TokenKind["Word"] = 256] = "Word";
        TokenKind[TokenKind["Range"] = 512] = "Range";
        TokenKind[TokenKind["Quoted"] = 1024] = "Quoted";
        TokenKind[TokenKind["Operator"] = 2048] = "Operator";
        TokenKind[TokenKind["FilteredValue"] = 4096] = "FilteredValue";
        TokenKind[TokenKind["Delimited"] = 12] = "Delimited";
    })(exports.TokenKind || (exports.TokenKind = {}));

    function isDelimitedToken(val) {
        return !!(getKind(val) & exports.TokenKind.Delimited);
    }
    function isOperatorToken(val) {
        return getKind(val) === exports.TokenKind.Operator;
    }
    function isHTMLToken(val) {
        return getKind(val) === exports.TokenKind.HTML;
    }
    function isOutputToken(val) {
        return getKind(val) === exports.TokenKind.Output;
    }
    function isTagToken(val) {
        return getKind(val) === exports.TokenKind.Tag;
    }
    function isQuotedToken(val) {
        return getKind(val) === exports.TokenKind.Quoted;
    }
    function isLiteralToken(val) {
        return getKind(val) === exports.TokenKind.Literal;
    }
    function isNumberToken(val) {
        return getKind(val) === exports.TokenKind.Number;
    }
    function isPropertyAccessToken(val) {
        return getKind(val) === exports.TokenKind.PropertyAccess;
    }
    function isWordToken(val) {
        return getKind(val) === exports.TokenKind.Word;
    }
    function isRangeToken(val) {
        return getKind(val) === exports.TokenKind.Range;
    }
    function getKind(val) {
        return val ? val.kind : -1;
    }

    var typeGuards = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isDelimitedToken: isDelimitedToken,
        isOperatorToken: isOperatorToken,
        isHTMLToken: isHTMLToken,
        isOutputToken: isOutputToken,
        isTagToken: isTagToken,
        isQuotedToken: isQuotedToken,
        isLiteralToken: isLiteralToken,
        isNumberToken: isNumberToken,
        isPropertyAccessToken: isPropertyAccessToken,
        isWordToken: isWordToken,
        isRangeToken: isRangeToken
    });

    var Context = /** @class */ (function () {
        function Context(env, opts, renderOptions, _a) {
            if (env === void 0) { env = {}; }
            if (opts === void 0) { opts = defaultOptions; }
            if (renderOptions === void 0) { renderOptions = {}; }
            var _b = _a === void 0 ? {} : _a, memoryLimit = _b.memoryLimit, renderLimit = _b.renderLimit;
            var _c, _d, _e, _f, _g;
            /**
             * insert a Context-level empty scope,
             * for tags like `{% capture %}` `{% assign %}` to operate
             */
            this.scopes = [{}];
            this.registers = {};
            this.sync = !!renderOptions.sync;
            this.opts = opts;
            this.globals = (_c = renderOptions.globals) !== null && _c !== void 0 ? _c : opts.globals;
            this.environments = isObject(env) ? env : Object(env);
            this.strictVariables = (_d = renderOptions.strictVariables) !== null && _d !== void 0 ? _d : this.opts.strictVariables;
            this.ownPropertyOnly = (_e = renderOptions.ownPropertyOnly) !== null && _e !== void 0 ? _e : opts.ownPropertyOnly;
            this.memoryLimit = memoryLimit !== null && memoryLimit !== void 0 ? memoryLimit : new Limiter('memory alloc', (_f = renderOptions.memoryLimit) !== null && _f !== void 0 ? _f : opts.memoryLimit);
            this.renderLimit = renderLimit !== null && renderLimit !== void 0 ? renderLimit : new Limiter('template render', performance.now() + ((_g = renderOptions.renderLimit) !== null && _g !== void 0 ? _g : opts.renderLimit));
        }
        Context.prototype.getRegister = function (key) {
            return (this.registers[key] = this.registers[key] || {});
        };
        Context.prototype.setRegister = function (key, value) {
            return (this.registers[key] = value);
        };
        Context.prototype.saveRegister = function () {
            var _this = this;
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            return keys.map(function (key) { return [key, _this.getRegister(key)]; });
        };
        Context.prototype.restoreRegister = function (keyValues) {
            var _this = this;
            return keyValues.forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return _this.setRegister(key, value);
            });
        };
        Context.prototype.getAll = function () {
            return __spreadArray([this.globals, this.environments], __read(this.scopes), false).reduce(function (ctx, val) { return __assign(ctx, val); }, {});
        };
        /**
         * @deprecated use `_get()` or `getSync()` instead
         */
        Context.prototype.get = function (paths) {
            return this.getSync(paths);
        };
        Context.prototype.getSync = function (paths) {
            return toValueSync(this._get(paths));
        };
        Context.prototype._get = function (paths) {
            var scope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof paths === 'string') {
                            paths = paths.split('.');
                        }
                        scope = this.findScope(paths[0]);
                        return [4 /*yield*/, this._getFromScope(scope, paths)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        };
        /**
         * @deprecated use `_get()` instead
         */
        Context.prototype.getFromScope = function (scope, paths) {
            return toValueSync(this._getFromScope(scope, paths));
        };
        Context.prototype._getFromScope = function (scope, paths, strictVariables) {
            var i;
            if (strictVariables === void 0) { strictVariables = this.strictVariables; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isString(paths))
                            paths = paths.split('.');
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < paths.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, readProperty(scope, paths[i], this.ownPropertyOnly)];
                    case 2:
                        scope = _a.sent();
                        if (strictVariables && isUndefined(scope)) {
                            throw new InternalUndefinedVariableError(paths.slice(0, i + 1).join('.'));
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, scope];
                }
            });
        };
        Context.prototype.push = function (ctx) {
            return this.scopes.push(ctx);
        };
        Context.prototype.pop = function () {
            return this.scopes.pop();
        };
        Context.prototype.bottom = function () {
            return this.scopes[0];
        };
        Context.prototype.spawn = function (scope) {
            if (scope === void 0) { scope = {}; }
            return new Context(scope, this.opts, {
                sync: this.sync,
                globals: this.globals,
                strictVariables: this.strictVariables
            }, {
                renderLimit: this.renderLimit,
                memoryLimit: this.memoryLimit
            });
        };
        Context.prototype.findScope = function (key) {
            for (var i = this.scopes.length - 1; i >= 0; i--) {
                var candidate = this.scopes[i];
                if (key in candidate)
                    return candidate;
            }
            if (key in this.environments)
                return this.environments;
            return this.globals;
        };
        return Context;
    }());
    function readProperty(obj, key, ownPropertyOnly) {
        obj = toLiquid(obj);
        if (isNil(obj))
            return obj;
        if (isArray(obj) && key < 0)
            return obj[obj.length + +key];
        var value = readJSProperty(obj, key, ownPropertyOnly);
        if (value === undefined && obj instanceof Drop)
            return obj.liquidMethodMissing(key);
        // Support Braze's operation
        if (key === 'first' && isArray(obj)) {
            // @ts-ignore
            return obj[0];
        }
        else if (key === 'last' && isArray(obj)) {
            // @ts-ignore
            return obj[obj.length - 1];
        }
        if (isFunction(value))
            return value.call(obj);
        if (key === 'size')
            return readSize(obj);
        else if (key === 'first')
            return readFirst(obj);
        else if (key === 'last')
            return readLast(obj);
        return value;
    }
    function readJSProperty(obj, key, ownPropertyOnly) {
        if (ownPropertyOnly && !Object.hasOwnProperty.call(obj, key) && !(obj instanceof Drop))
            return undefined;
        return obj[key];
    }
    function readFirst(obj) {
        if (isArray(obj))
            return obj[0];
        return obj['first'];
    }
    function readLast(obj) {
        if (isArray(obj))
            return obj[obj.length - 1];
        return obj['last'];
    }
    function readSize(obj) {
        if (obj.hasOwnProperty('size') || obj['size'] !== undefined)
            return obj['size'];
        if (isArray(obj) || isString(obj))
            return obj.length;
        if (typeof obj === 'object')
            return Object.keys(obj).length;
    }

    var BlockMode;
    (function (BlockMode) {
        /* store rendered html into blocks */
        BlockMode[BlockMode["OUTPUT"] = 0] = "OUTPUT";
        /* output rendered html directly */
        BlockMode[BlockMode["STORE"] = 1] = "STORE";
    })(BlockMode || (BlockMode = {}));

    var abs = argumentsToValue(Math.abs);
    var at_least = argumentsToValue(Math.max);
    var at_most = argumentsToValue(Math.min);
    var ceil = argumentsToValue(Math.ceil);
    var divided_by = argumentsToValue(function (dividend, divisor, integerArithmetic) {
        if (integerArithmetic === void 0) { integerArithmetic = false; }
        return integerArithmetic ? Math.floor(dividend / divisor) : dividend / divisor;
    });
    var floor = argumentsToValue(Math.floor);
    var minus = argumentsToValue(function (v, arg) { return v - arg; });
    var modulo = argumentsToValue(function (v, arg) { return v % arg; });
    var times = argumentsToValue(function (v, arg) { return v * arg; });
    function round(v, arg) {
        if (arg === void 0) { arg = 0; }
        v = toValue(v);
        arg = toValue(arg);
        var amp = Math.pow(10, arg);
        return Math.round(v * amp) / amp;
    }
    function plus(v, arg) {
        v = toValue(v);
        arg = toValue(arg);
        return Number(v) + Number(arg);
    }

    var mathFilters = /*#__PURE__*/Object.freeze({
        __proto__: null,
        abs: abs,
        at_least: at_least,
        at_most: at_most,
        ceil: ceil,
        divided_by: divided_by,
        floor: floor,
        minus: minus,
        modulo: modulo,
        times: times,
        round: round,
        plus: plus
    });

    var url_decode = function (x) { return decodeURIComponent(stringify(x)).replace(/\+/g, ' '); };
    var url_encode = function (x) { return encodeURIComponent(stringify(x)).replace(/%20/g, '+'); };
    var cgi_escape = function (x) { return encodeURIComponent(stringify(x))
        .replace(/%20/g, '+')
        .replace(/[!'()*]/g, function (c) { return '%' + c.charCodeAt(0).toString(16).toUpperCase(); }); };
    var uri_escape = function (x) { return encodeURI(stringify(x))
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']'); };
    var rSlugifyDefault = /[^\p{M}\p{L}\p{Nd}]+/ug;
    var rSlugifyReplacers = {
        'raw': /\s+/g,
        'default': rSlugifyDefault,
        'pretty': /[^\p{M}\p{L}\p{Nd}._~!$&'()+,;=@]+/ug,
        'ascii': /[^A-Za-z0-9]+/g,
        'latin': rSlugifyDefault,
        'none': null
    };
    function slugify(str, mode, cased) {
        if (mode === void 0) { mode = 'default'; }
        if (cased === void 0) { cased = false; }
        str = stringify(str);
        var replacer = rSlugifyReplacers[mode];
        if (replacer) {
            if (mode === 'latin')
                str = removeAccents(str);
            str = str.replace(replacer, '-').replace(/^-|-$/g, '');
        }
        return cased ? str : str.toLowerCase();
    }
    function removeAccents(str) {
        return str.replace(/[àáâãäå]/g, 'a')
            .replace(/[æ]/g, 'ae')
            .replace(/[ç]/g, 'c')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[ð]/g, 'd')
            .replace(/[ñ]/g, 'n')
            .replace(/[òóôõöø]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ýÿ]/g, 'y')
            .replace(/[ß]/g, 'ss')
            .replace(/[œ]/g, 'oe')
            .replace(/[þ]/g, 'th')
            .replace(/[ẞ]/g, 'SS')
            .replace(/[Œ]/g, 'OE')
            .replace(/[Þ]/g, 'TH');
    }

    var urlFilters = /*#__PURE__*/Object.freeze({
        __proto__: null,
        url_decode: url_decode,
        url_encode: url_encode,
        cgi_escape: cgi_escape,
        uri_escape: uri_escape,
        slugify: slugify
    });

    var join = argumentsToValue(function (v, arg) {
        var array = toArray(v);
        var sep = arg === undefined ? ' ' : arg;
        var complexity = array.length * (1 + sep.length);
        this.context.memoryLimit.use(complexity);
        return array.join(sep);
    });
    var last$1 = argumentsToValue(function (v) { return isArray(v) ? last(v) : ''; });
    var first = argumentsToValue(function (v) { return isArray(v) ? v[0] : ''; });
    var reverse = argumentsToValue(function (v) {
        var array = toArray(v);
        this.context.memoryLimit.use(array.length);
        return __spreadArray([], __read(array), false).reverse();
    });
    function sort(arr, property) {
        var values, array, array_1, array_1_1, item, _a, _b, _c, _d, e_1_1;
        var e_1, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    values = [];
                    array = toArray(arr);
                    this.context.memoryLimit.use(array.length);
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 8, 9, 10]);
                    array_1 = __values(array), array_1_1 = array_1.next();
                    _f.label = 2;
                case 2:
                    if (!!array_1_1.done) return [3 /*break*/, 7];
                    item = array_1_1.value;
                    _b = (_a = values).push;
                    _c = [item];
                    if (!property) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.context._getFromScope(item, stringify(property).split('.'), false)];
                case 3:
                    _d = _f.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _d = item;
                    _f.label = 5;
                case 5:
                    _b.apply(_a, [_c.concat([
                            _d
                        ])]);
                    _f.label = 6;
                case 6:
                    array_1_1 = array_1.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (array_1_1 && !array_1_1.done && (_e = array_1.return)) _e.call(array_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, values.sort(function (lhs, rhs) {
                        var lvalue = lhs[1];
                        var rvalue = rhs[1];
                        return lvalue < rvalue ? -1 : (lvalue > rvalue ? 1 : 0);
                    }).map(function (tuple) { return tuple[0]; })];
            }
        });
    }
    function sort_natural(input, property) {
        var propertyString = stringify(property);
        var compare = property === undefined
            ? caseInsensitiveCompare
            : function (lhs, rhs) { return caseInsensitiveCompare(lhs[propertyString], rhs[propertyString]); };
        var array = toArray(input);
        this.context.memoryLimit.use(array.length);
        return __spreadArray([], __read(array), false).sort(compare);
    }
    var size = function (v) { return (v && v.length) || 0; };
    function map(arr, property) {
        var results, array, array_2, array_2_1, item, _a, _b, e_2_1;
        var e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    array = toArray(arr);
                    this.context.memoryLimit.use(array.length);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    array_2 = __values(array), array_2_1 = array_2.next();
                    _d.label = 2;
                case 2:
                    if (!!array_2_1.done) return [3 /*break*/, 5];
                    item = array_2_1.value;
                    _b = (_a = results).push;
                    return [4 /*yield*/, this.context._getFromScope(item, stringify(property), false)];
                case 3:
                    _b.apply(_a, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    array_2_1 = array_2.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (array_2_1 && !array_2_1.done && (_c = array_2.return)) _c.call(array_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, results];
            }
        });
    }
    function sum(arr, property) {
        var sum, array, array_3, array_3_1, item, data, _a, _b, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    sum = 0;
                    array = toArray(arr);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 8, 9, 10]);
                    array_3 = __values(array), array_3_1 = array_3.next();
                    _d.label = 2;
                case 2:
                    if (!!array_3_1.done) return [3 /*break*/, 7];
                    item = array_3_1.value;
                    _a = Number;
                    if (!property) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.context._getFromScope(item, stringify(property), false)];
                case 3:
                    _b = _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _b = item;
                    _d.label = 5;
                case 5:
                    data = _a.apply(void 0, [_b]);
                    sum += Number.isNaN(data) ? 0 : data;
                    _d.label = 6;
                case 6:
                    array_3_1 = array_3.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (array_3_1 && !array_3_1.done && (_c = array_3.return)) _c.call(array_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, sum];
            }
        });
    }
    function compact(arr) {
        var array = toArray(arr);
        this.context.memoryLimit.use(array.length);
        return array.filter(function (x) { return !isNil(toValue(x)); });
    }
    function concat(v, arg) {
        if (arg === void 0) { arg = []; }
        var lhs = toArray(v);
        var rhs = toArray(arg);
        this.context.memoryLimit.use(lhs.length + rhs.length);
        return lhs.concat(rhs);
    }
    function push(v, arg) {
        return concat.call(this, v, [arg]);
    }
    function unshift(v, arg) {
        var array = toArray(v);
        this.context.memoryLimit.use(array.length);
        var clone = __spreadArray([], __read(array), false);
        clone.unshift(arg);
        return clone;
    }
    function pop(v) {
        var clone = __spreadArray([], __read(toArray(v)), false);
        clone.pop();
        return clone;
    }
    function shift(v) {
        var array = toArray(v);
        this.context.memoryLimit.use(array.length);
        var clone = __spreadArray([], __read(array), false);
        clone.shift();
        return clone;
    }
    function slice(v, begin, length) {
        if (length === void 0) { length = 1; }
        v = toValue(v);
        if (isNil(v))
            return [];
        if (!isArray(v))
            v = stringify(v);
        begin = begin < 0 ? v.length + begin : begin;
        this.context.memoryLimit.use(length);
        return v.slice(begin, begin + length);
    }
    function where(arr, property, expected) {
        var values, token, arr_1, arr_1_1, item, _a, _b, e_4_1;
        var e_4, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    values = [];
                    arr = toArray(arr);
                    this.context.memoryLimit.use(arr.length);
                    token = new Tokenizer(stringify(property)).readScopeValue();
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    arr_1 = __values(arr), arr_1_1 = arr_1.next();
                    _d.label = 2;
                case 2:
                    if (!!arr_1_1.done) return [3 /*break*/, 5];
                    item = arr_1_1.value;
                    _b = (_a = values).push;
                    return [4 /*yield*/, evalToken(token, this.context.spawn(item))];
                case 3:
                    _b.apply(_a, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    arr_1_1 = arr_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (arr_1_1 && !arr_1_1.done && (_c = arr_1.return)) _c.call(arr_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, arr.filter(function (_, i) {
                        if (expected === undefined)
                            return isTruthy(values[i], _this.context);
                        return equals(values[i], expected);
                    })];
            }
        });
    }
    function where_exp(arr, itemName, exp) {
        var filtered, keyTemplate, array, array_4, array_4_1, item, value, e_5_1;
        var e_5, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    filtered = [];
                    keyTemplate = new Value(stringify(exp), this.liquid);
                    array = toArray(arr);
                    this.context.memoryLimit.use(array.length);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    array_4 = __values(array), array_4_1 = array_4.next();
                    _c.label = 2;
                case 2:
                    if (!!array_4_1.done) return [3 /*break*/, 5];
                    item = array_4_1.value;
                    return [4 /*yield*/, keyTemplate.value(this.context.spawn((_b = {}, _b[itemName] = item, _b)))];
                case 3:
                    value = _c.sent();
                    if (value)
                        filtered.push(item);
                    _c.label = 4;
                case 4:
                    array_4_1 = array_4.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_5_1 = _c.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (array_4_1 && !array_4_1.done && (_a = array_4.return)) _a.call(array_4);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, filtered];
            }
        });
    }
    function group_by(arr, property) {
        var map, token, arr_2, arr_2_1, item, key, e_6_1;
        var e_6, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    map = new Map();
                    arr = toArray(arr);
                    token = new Tokenizer(stringify(property)).readScopeValue();
                    this.context.memoryLimit.use(arr.length);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    arr_2 = __values(arr), arr_2_1 = arr_2.next();
                    _b.label = 2;
                case 2:
                    if (!!arr_2_1.done) return [3 /*break*/, 5];
                    item = arr_2_1.value;
                    return [4 /*yield*/, evalToken(token, this.context.spawn(item))];
                case 3:
                    key = _b.sent();
                    if (!map.has(key))
                        map.set(key, []);
                    map.get(key).push(item);
                    _b.label = 4;
                case 4:
                    arr_2_1 = arr_2.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_6_1 = _b.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (arr_2_1 && !arr_2_1.done && (_a = arr_2.return)) _a.call(arr_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, __spreadArray([], __read(map.entries()), false).map(function (_a) {
                        var _b = __read(_a, 2), name = _b[0], items = _b[1];
                        return ({ name: name, items: items });
                    })];
            }
        });
    }
    function group_by_exp(arr, itemName, exp) {
        var map, keyTemplate, arr_3, arr_3_1, item, key, e_7_1;
        var e_7, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    map = new Map();
                    keyTemplate = new Value(stringify(exp), this.liquid);
                    arr = toArray(arr);
                    this.context.memoryLimit.use(arr.length);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    arr_3 = __values(arr), arr_3_1 = arr_3.next();
                    _c.label = 2;
                case 2:
                    if (!!arr_3_1.done) return [3 /*break*/, 5];
                    item = arr_3_1.value;
                    return [4 /*yield*/, keyTemplate.value(this.context.spawn((_b = {}, _b[itemName] = item, _b)))];
                case 3:
                    key = _c.sent();
                    if (!map.has(key))
                        map.set(key, []);
                    map.get(key).push(item);
                    _c.label = 4;
                case 4:
                    arr_3_1 = arr_3.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_7_1 = _c.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (arr_3_1 && !arr_3_1.done && (_a = arr_3.return)) _a.call(arr_3);
                    }
                    finally { if (e_7) throw e_7.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, __spreadArray([], __read(map.entries()), false).map(function (_a) {
                        var _b = __read(_a, 2), name = _b[0], items = _b[1];
                        return ({ name: name, items: items });
                    })];
            }
        });
    }
    function find(arr, property, expected) {
        var token, array, array_5, array_5_1, item, value, e_8_1;
        var e_8, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = new Tokenizer(stringify(property)).readScopeValue();
                    array = toArray(arr);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    array_5 = __values(array), array_5_1 = array_5.next();
                    _b.label = 2;
                case 2:
                    if (!!array_5_1.done) return [3 /*break*/, 5];
                    item = array_5_1.value;
                    return [4 /*yield*/, evalToken(token, this.context.spawn(item))];
                case 3:
                    value = _b.sent();
                    if (equals(value, expected))
                        return [2 /*return*/, item];
                    _b.label = 4;
                case 4:
                    array_5_1 = array_5.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_8_1 = _b.sent();
                    e_8 = { error: e_8_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (array_5_1 && !array_5_1.done && (_a = array_5.return)) _a.call(array_5);
                    }
                    finally { if (e_8) throw e_8.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }
    function find_exp(arr, itemName, exp) {
        var predicate, array, array_6, array_6_1, item, value, e_9_1;
        var e_9, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    predicate = new Value(stringify(exp), this.liquid);
                    array = toArray(arr);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    array_6 = __values(array), array_6_1 = array_6.next();
                    _c.label = 2;
                case 2:
                    if (!!array_6_1.done) return [3 /*break*/, 5];
                    item = array_6_1.value;
                    return [4 /*yield*/, predicate.value(this.context.spawn((_b = {}, _b[itemName] = item, _b)))];
                case 3:
                    value = _c.sent();
                    if (value)
                        return [2 /*return*/, item];
                    _c.label = 4;
                case 4:
                    array_6_1 = array_6.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_9_1 = _c.sent();
                    e_9 = { error: e_9_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (array_6_1 && !array_6_1.done && (_a = array_6.return)) _a.call(array_6);
                    }
                    finally { if (e_9) throw e_9.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }
    function uniq(arr) {
        arr = toValue(arr);
        this.context.memoryLimit.use(arr.length);
        var u = {};
        return (arr || []).filter(function (val) {
            if (hasOwnProperty.call(u, String(val)))
                return false;
            u[String(val)] = true;
            return true;
        });
    }
    function sample(v, count) {
        if (count === void 0) { count = 1; }
        v = toValue(v);
        if (isNil(v))
            return [];
        if (!isArray(v))
            v = stringify(v);
        this.context.memoryLimit.use(count);
        var shuffled = __spreadArray([], __read(v), false).sort(function () { return Math.random() - 0.5; });
        if (count === 1)
            return shuffled[0];
        return shuffled.slice(0, count);
    }

    var arrayFilters = /*#__PURE__*/Object.freeze({
        __proto__: null,
        join: join,
        last: last$1,
        first: first,
        reverse: reverse,
        sort: sort,
        sort_natural: sort_natural,
        size: size,
        map: map,
        sum: sum,
        compact: compact,
        concat: concat,
        push: push,
        unshift: unshift,
        pop: pop,
        shift: shift,
        slice: slice,
        where: where,
        where_exp: where_exp,
        group_by: group_by,
        group_by_exp: group_by_exp,
        find: find,
        find_exp: find_exp,
        uniq: uniq,
        sample: sample
    });

    function date(v, format, timezoneOffset) {
        var _a, _b, _c;
        var size = ((_a = v === null || v === void 0 ? void 0 : v.length) !== null && _a !== void 0 ? _a : 0) + ((_b = format === null || format === void 0 ? void 0 : format.length) !== null && _b !== void 0 ? _b : 0) + ((_c = timezoneOffset === null || timezoneOffset === void 0 ? void 0 : timezoneOffset.length) !== null && _c !== void 0 ? _c : 0);
        this.context.memoryLimit.use(size);
        var date = parseDate(v, this.context.opts, timezoneOffset);
        if (!date)
            return v;
        format = toValue(format);
        format = isNil(format) ? this.context.opts.dateFormat : stringify(format);
        return strftime(date, format);
    }
    function date_to_xmlschema(v) {
        return date.call(this, v, '%Y-%m-%dT%H:%M:%S%:z');
    }
    function date_to_rfc822(v) {
        return date.call(this, v, '%a, %d %b %Y %H:%M:%S %z');
    }
    function date_to_string(v, type, style) {
        return stringify_date.call(this, v, '%b', type, style);
    }
    function date_to_long_string(v, type, style) {
        return stringify_date.call(this, v, '%B', type, style);
    }
    function stringify_date(v, month_type, type, style) {
        var date = parseDate(v, this.context.opts);
        if (!date)
            return v;
        if (type === 'ordinal') {
            var d = date.getDate();
            return style === 'US'
                ? strftime(date, "".concat(month_type, " ").concat(d, "%q, %Y"))
                : strftime(date, "".concat(d, "%q ").concat(month_type, " %Y"));
        }
        return strftime(date, "%d ".concat(month_type, " %Y"));
    }
    function parseDate(v, opts, timezoneOffset) {
        var date;
        var defaultTimezoneOffset = timezoneOffset !== null && timezoneOffset !== void 0 ? timezoneOffset : opts.timezoneOffset;
        var locale = opts.locale;
        v = toValue(v);
        if (v === 'now' || v === 'today') {
            date = new LiquidDate(Date.now(), locale, defaultTimezoneOffset);
        }
        else if (isNumber(v)) {
            date = new LiquidDate(v * 1000, locale, defaultTimezoneOffset);
        }
        else if (isString(v)) {
            if (/^\d+$/.test(v)) {
                date = new LiquidDate(+v * 1000, locale, defaultTimezoneOffset);
            }
            else if (opts.preserveTimezones && timezoneOffset === undefined) {
                date = LiquidDate.createDateFixedToTimezone(v, locale);
            }
            else {
                date = new LiquidDate(v, locale, defaultTimezoneOffset);
            }
        }
        else {
            date = new LiquidDate(v, locale, defaultTimezoneOffset);
        }
        return date.valid() ? date : undefined;
    }

    var dateFilters = /*#__PURE__*/Object.freeze({
        __proto__: null,
        date: date,
        date_to_xmlschema: date_to_xmlschema,
        date_to_rfc822: date_to_rfc822,
        date_to_string: date_to_string,
        date_to_long_string: date_to_long_string
    });

    /**
     * String related filters
     *
     * * prefer stringify() to String() since `undefined`, `null` should eval ''
     */
    var rCJKWord = /[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/gu;
    // Word boundary followed by word characters (for detecting words)
    var rNonCJKWord = /[^\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\s]+/gu;
    function append(v, arg) {
        assert(arguments.length === 2, 'append expect 2 arguments');
        var lhs = stringify(v);
        var rhs = stringify(arg);
        this.context.memoryLimit.use(lhs.length + rhs.length);
        return lhs + rhs;
    }
    function prepend(v, arg) {
        assert(arguments.length === 2, 'prepend expect 2 arguments');
        var lhs = stringify(v);
        var rhs = stringify(arg);
        this.context.memoryLimit.use(lhs.length + rhs.length);
        return rhs + lhs;
    }
    function lstrip(v, chars) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        if (chars) {
            chars = escapeRegExp(stringify(chars));
            return str.replace(new RegExp("^[".concat(chars, "]+"), 'g'), '');
        }
        return str.replace(/^\s+/, '');
    }
    function downcase(v) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.toLowerCase();
    }
    function upcase(v) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return stringify(str).toUpperCase();
    }
    function remove(v, arg) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.split(stringify(arg)).join('');
    }
    function remove_first(v, l) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.replace(stringify(l), '');
    }
    function remove_last(v, l) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        var pattern = stringify(l);
        var index = str.lastIndexOf(pattern);
        if (index === -1)
            return str;
        return str.substring(0, index) + str.substring(index + pattern.length);
    }
    function rstrip(str, chars) {
        str = stringify(str);
        this.context.memoryLimit.use(str.length);
        if (chars) {
            chars = escapeRegExp(stringify(chars));
            return str.replace(new RegExp("[".concat(chars, "]+$"), 'g'), '');
        }
        return str.replace(/\s+$/, '');
    }
    function split(v, arg) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        var arr = str.split(stringify(arg));
        // align to ruby split, which is the behavior of shopify/liquid
        // see: https://ruby-doc.org/core-2.4.0/String.html#method-i-split
        while (arr.length && arr[arr.length - 1] === '')
            arr.pop();
        return arr;
    }
    function strip(v, chars) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        if (chars) {
            chars = escapeRegExp(stringify(chars));
            return str
                .replace(new RegExp("^[".concat(chars, "]+"), 'g'), '')
                .replace(new RegExp("[".concat(chars, "]+$"), 'g'), '');
        }
        return str.trim();
    }
    function strip_newlines(v) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.replace(/\r?\n/gm, '');
    }
    function capitalize(str) {
        str = stringify(str);
        this.context.memoryLimit.use(str.length);
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    function replace(v, pattern, replacement) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.split(stringify(pattern)).join(replacement);
    }
    function replace_first(v, arg1, arg2) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.replace(stringify(arg1), arg2);
    }
    function replace_last(v, arg1, arg2) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        var pattern = stringify(arg1);
        var index = str.lastIndexOf(pattern);
        if (index === -1)
            return str;
        var replacement = stringify(arg2);
        return str.substring(0, index) + replacement + str.substring(index + pattern.length);
    }
    function truncate(v, l, o) {
        if (l === void 0) { l = 50; }
        if (o === void 0) { o = '...'; }
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        if (str.length <= l)
            return v;
        return str.substring(0, l - o.length) + o;
    }
    function truncatewords(v, words, o) {
        if (words === void 0) { words = 15; }
        if (o === void 0) { o = '...'; }
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        var arr = str.split(/\s+/);
        if (words <= 0)
            words = 1;
        var ret = arr.slice(0, words).join(' ');
        if (arr.length >= words)
            ret += o;
        return ret;
    }
    function normalize_whitespace(v) {
        var str = stringify(v);
        this.context.memoryLimit.use(str.length);
        return str.replace(/\s+/g, ' ');
    }
    function number_of_words(input, mode) {
        var str = stringify(input);
        this.context.memoryLimit.use(str.length);
        input = str.trim();
        if (!input)
            return 0;
        switch (mode) {
            case 'cjk':
                // Count CJK characters and words
                return (input.match(rCJKWord) || []).length + (input.match(rNonCJKWord) || []).length;
            case 'auto':
                // Count CJK characters, if none, count words
                return rCJKWord.test(input)
                    ? input.match(rCJKWord).length + (input.match(rNonCJKWord) || []).length
                    : input.split(/\s+/).length;
            default:
                // Count words only
                return input.split(/\s+/).length;
        }
    }
    function array_to_sentence_string(array, connector) {
        if (connector === void 0) { connector = 'and'; }
        this.context.memoryLimit.use(array.length);
        switch (array.length) {
            case 0:
                return '';
            case 1:
                return array[0];
            case 2:
                return "".concat(array[0], " ").concat(connector, " ").concat(array[1]);
            default:
                return "".concat(array.slice(0, -1).join(', '), ", ").concat(connector, " ").concat(array[array.length - 1]);
        }
    }

    var stringFilters = /*#__PURE__*/Object.freeze({
        __proto__: null,
        append: append,
        prepend: prepend,
        lstrip: lstrip,
        downcase: downcase,
        upcase: upcase,
        remove: remove,
        remove_first: remove_first,
        remove_last: remove_last,
        rstrip: rstrip,
        split: split,
        strip: strip,
        strip_newlines: strip_newlines,
        capitalize: capitalize,
        replace: replace,
        replace_first: replace_first,
        replace_last: replace_last,
        truncate: truncate,
        truncatewords: truncatewords,
        normalize_whitespace: normalize_whitespace,
        number_of_words: number_of_words,
        array_to_sentence_string: array_to_sentence_string
    });

    var filters = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, htmlFilters), mathFilters), urlFilters), arrayFilters), dateFilters), stringFilters), misc);

    var default_1 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.key = _this.tokenizer.readIdentifier().content;
            _this.tokenizer.assert(_this.key, 'expected variable name');
            _this.tokenizer.skipBlank();
            _this.tokenizer.assert(_this.tokenizer.peek() === '=', 'expected "="');
            _this.tokenizer.advance();
            _this.value = new Value(_this.tokenizer.readFilteredValue(), _this.liquid);
            return _this;
        }
        default_1.prototype.render = function (ctx) {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = ctx.bottom();
                        _b = this.key;
                        return [4 /*yield*/, this.value.value(ctx, this.liquid.options.lenientIf)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var MODIFIERS = ['offset', 'limit', 'reversed'];
    var default_1$1 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            var variable = _this.tokenizer.readIdentifier();
            var inStr = _this.tokenizer.readIdentifier();
            var collection = _this.tokenizer.readValue();
            if (!variable.size() || inStr.content !== 'in' || !collection) {
                throw new Error("illegal tag: ".concat(token.getText()));
            }
            _this.variable = variable.content;
            _this.collection = collection;
            _this.hash = new Hash(_this.tokenizer.remaining());
            _this.templates = [];
            _this.elseTemplates = [];
            var p;
            var stream = parser.parseStream(remainTokens)
                .on('start', function () { return (p = _this.templates); })
                .on('tag:else', function (tag) { assertEmpty(tag.args); p = _this.elseTemplates; })
                .on('tag:endfor', function (tag) { assertEmpty(tag.args); stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () { throw new Error("tag ".concat(token.getText(), " not closed")); });
            stream.start();
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var r, collection, _a, continueKey, hash, modifiers, scope, collection_1, collection_1_1, item, e_1_1;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        r = this.liquid.renderer;
                        _a = toEnumerable;
                        return [4 /*yield*/, evalToken(this.collection, ctx)];
                    case 1:
                        collection = _a.apply(void 0, [_c.sent()]);
                        if (!!collection.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                    case 3:
                        continueKey = 'continue-' + this.variable + '-' + this.collection.getText();
                        ctx.push({ continue: ctx.getRegister(continueKey) });
                        return [4 /*yield*/, this.hash.render(ctx)];
                    case 4:
                        hash = _c.sent();
                        ctx.pop();
                        modifiers = this.liquid.options.orderedFilterParameters
                            ? Object.keys(hash).filter(function (x) { return MODIFIERS.includes(x); })
                            : MODIFIERS.filter(function (x) { return hash[x] !== undefined; });
                        collection = modifiers.reduce(function (collection, modifier) {
                            if (modifier === 'offset')
                                return offset(collection, hash['offset']);
                            if (modifier === 'limit')
                                return limit(collection, hash['limit']);
                            return reversed(collection);
                        }, collection);
                        ctx.setRegister(continueKey, (hash['offset'] || 0) + collection.length);
                        scope = { forloop: new ForloopDrop(collection.length, this.collection.getText(), this.variable) };
                        ctx.push(scope);
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 10, 11, 12]);
                        collection_1 = __values(collection), collection_1_1 = collection_1.next();
                        _c.label = 6;
                    case 6:
                        if (!!collection_1_1.done) return [3 /*break*/, 9];
                        item = collection_1_1.value;
                        scope[this.variable] = item;
                        return [4 /*yield*/, r.renderTemplates(this.templates, ctx, emitter)];
                    case 7:
                        _c.sent();
                        if (emitter['break']) {
                            emitter['break'] = false;
                            return [3 /*break*/, 9];
                        }
                        emitter['continue'] = false;
                        scope.forloop.next();
                        _c.label = 8;
                    case 8:
                        collection_1_1 = collection_1.next();
                        return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (collection_1_1 && !collection_1_1.done && (_b = collection_1.return)) _b.call(collection_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        ctx.pop();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));
    function reversed(arr) {
        return __spreadArray([], __read(arr), false).reverse();
    }
    function offset(arr, count) {
        return arr.slice(count);
    }
    function limit(arr, count) {
        return arr.slice(0, count);
    }

    var default_1$2 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid, parser) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            _this.templates = [];
            _this.variable = _this.readVariableName();
            while (remainTokens.length) {
                var token = remainTokens.shift();
                if (isTagToken(token) && token.name === 'endcapture')
                    return _this;
                _this.templates.push(parser.parseToken(token, remainTokens));
            }
            throw new Error("tag ".concat(tagToken.getText(), " not closed"));
        }
        default_1.prototype.render = function (ctx) {
            var r, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = this.liquid.renderer;
                        return [4 /*yield*/, r.renderTemplates(this.templates, ctx)];
                    case 1:
                        html = _a.sent();
                        ctx.bottom()[this.variable] = html;
                        return [2 /*return*/];
                }
            });
        };
        default_1.prototype.readVariableName = function () {
            var word = this.tokenizer.readIdentifier().content;
            if (word)
                return word;
            var quoted = this.tokenizer.readQuoted();
            if (quoted)
                return evalQuotedToken(quoted);
            throw this.tokenizer.error('invalid capture name');
        };
        return default_1;
    }(Tag));

    var default_1$3 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid, parser) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            _this.branches = [];
            _this.elseTemplates = [];
            _this.value = new Value(_this.tokenizer.readFilteredValue(), _this.liquid);
            _this.elseTemplates = [];
            var p = [];
            var elseCount = 0;
            var stream = parser.parseStream(remainTokens)
                .on('tag:when', function (token) {
                if (elseCount > 0) {
                    return;
                }
                p = [];
                var values = [];
                while (!token.tokenizer.end()) {
                    values.push(token.tokenizer.readValueOrThrow());
                    token.tokenizer.skipBlank();
                    if (token.tokenizer.peek() === ',') {
                        token.tokenizer.readTo(',');
                    }
                    else {
                        token.tokenizer.readTo('or');
                    }
                }
                _this.branches.push({
                    values: values,
                    templates: p
                });
            })
                .on('tag:else', function () {
                elseCount++;
                p = _this.elseTemplates;
            })
                .on('tag:endcase', function () { return stream.stop(); })
                .on('template', function (tpl) {
                if (p !== _this.elseTemplates || elseCount === 1) {
                    p.push(tpl);
                }
            })
                .on('end', function () {
                throw new Error("tag ".concat(tagToken.getText(), " not closed"));
            });
            stream.start();
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var r, target, _a, branchHit, _b, _c, branch, _d, _e, valueToken, value, e_1_1, e_2_1;
            var e_2, _f, e_1, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        r = this.liquid.renderer;
                        _a = toValue;
                        return [4 /*yield*/, this.value.value(ctx, ctx.opts.lenientIf)];
                    case 1:
                        target = _a.apply(void 0, [_h.sent()]);
                        branchHit = false;
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 14, 15, 16]);
                        _b = __values(this.branches), _c = _b.next();
                        _h.label = 3;
                    case 3:
                        if (!!_c.done) return [3 /*break*/, 13];
                        branch = _c.value;
                        _h.label = 4;
                    case 4:
                        _h.trys.push([4, 10, 11, 12]);
                        _d = (e_1 = void 0, __values(branch.values)), _e = _d.next();
                        _h.label = 5;
                    case 5:
                        if (!!_e.done) return [3 /*break*/, 9];
                        valueToken = _e.value;
                        return [4 /*yield*/, evalToken(valueToken, ctx, ctx.opts.lenientIf)];
                    case 6:
                        value = _h.sent();
                        if (!equals(target, value)) return [3 /*break*/, 8];
                        return [4 /*yield*/, r.renderTemplates(branch.templates, ctx, emitter)];
                    case 7:
                        _h.sent();
                        branchHit = true;
                        return [3 /*break*/, 9];
                    case 8:
                        _e = _d.next();
                        return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        _c = _b.next();
                        return [3 /*break*/, 3];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 16:
                        if (!!branchHit) return [3 /*break*/, 18];
                        return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                    case 17:
                        _h.sent();
                        _h.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$4 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            while (remainTokens.length) {
                var token = remainTokens.shift();
                if (isTagToken(token) && token.name === 'endcomment')
                    return _this;
            }
            throw new Error("tag ".concat(tagToken.getText(), " not closed"));
        }
        default_1.prototype.render = function () { };
        return default_1;
    }(Tag));

    var default_1$5 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            var tokenizer = _this.tokenizer;
            _this.file = parseFilePath(tokenizer, _this.liquid, parser);
            _this.currentFile = token.file;
            while (!tokenizer.end()) {
                tokenizer.skipBlank();
                var begin = tokenizer.p;
                var keyword = tokenizer.readIdentifier();
                if (keyword.content === 'with' || keyword.content === 'for') {
                    tokenizer.skipBlank();
                    // can be normal key/value pair, like "with: true"
                    if (tokenizer.peek() !== ':') {
                        var value = tokenizer.readValue();
                        // can be normal key, like "with,"
                        if (value) {
                            var beforeAs = tokenizer.p;
                            var asStr = tokenizer.readIdentifier();
                            var alias = void 0;
                            if (asStr.content === 'as')
                                alias = tokenizer.readIdentifier();
                            else
                                tokenizer.p = beforeAs;
                            _this[keyword.content] = { value: value, alias: alias && alias.content };
                            tokenizer.skipBlank();
                            if (tokenizer.peek() === ',')
                                tokenizer.advance();
                            continue; // matched!
                        }
                    }
                }
                /**
                 * restore cursor if with/for not matched
                 */
                tokenizer.p = begin;
                break;
            }
            _this.hash = new Hash(tokenizer.remaining());
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var _a, liquid, hash, filepath, childCtx, scope, _b, _c, _d, value, alias, _e, _f, _g, value, alias, collection, _h, collection_1, collection_1_1, item, templates, e_1_1, templates;
            var e_1, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = this, liquid = _a.liquid, hash = _a.hash;
                        return [4 /*yield*/, renderFilePath(this['file'], ctx, liquid)];
                    case 1:
                        filepath = (_k.sent());
                        assert(filepath, function () { return "illegal file path \"".concat(filepath, "\""); });
                        childCtx = ctx.spawn();
                        scope = childCtx.bottom();
                        _b = __assign;
                        _c = [scope];
                        return [4 /*yield*/, hash.render(ctx)];
                    case 2:
                        _b.apply(void 0, _c.concat([_k.sent()]));
                        if (!this['with']) return [3 /*break*/, 4];
                        _d = this['with'], value = _d.value, alias = _d.alias;
                        _e = scope;
                        _f = alias || filepath;
                        return [4 /*yield*/, evalToken(value, ctx)];
                    case 3:
                        _e[_f] = _k.sent();
                        _k.label = 4;
                    case 4:
                        if (!this['for']) return [3 /*break*/, 15];
                        _g = this['for'], value = _g.value, alias = _g.alias;
                        _h = toEnumerable;
                        return [4 /*yield*/, evalToken(value, ctx)];
                    case 5:
                        collection = _h.apply(void 0, [_k.sent()]);
                        scope['forloop'] = new ForloopDrop(collection.length, value.getText(), alias);
                        _k.label = 6;
                    case 6:
                        _k.trys.push([6, 12, 13, 14]);
                        collection_1 = __values(collection), collection_1_1 = collection_1.next();
                        _k.label = 7;
                    case 7:
                        if (!!collection_1_1.done) return [3 /*break*/, 11];
                        item = collection_1_1.value;
                        scope[alias] = item;
                        return [4 /*yield*/, liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile'])];
                    case 8:
                        templates = (_k.sent());
                        return [4 /*yield*/, liquid.renderer.renderTemplates(templates, childCtx, emitter)];
                    case 9:
                        _k.sent();
                        scope['forloop'].next();
                        _k.label = 10;
                    case 10:
                        collection_1_1 = collection_1.next();
                        return [3 /*break*/, 7];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (collection_1_1 && !collection_1_1.done && (_j = collection_1.return)) _j.call(collection_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 14: return [3 /*break*/, 18];
                    case 15: return [4 /*yield*/, liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile'])];
                    case 16:
                        templates = (_k.sent());
                        return [4 /*yield*/, liquid.renderer.renderTemplates(templates, childCtx, emitter)];
                    case 17:
                        _k.sent();
                        _k.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));
    /**
     * @return null for "none",
     * @return Template[] for quoted with tags and/or filters
     * @return Token for expression (not quoted)
     * @throws TypeError if cannot read next token
     */
    function parseFilePath(tokenizer, liquid, parser) {
        if (liquid.options.dynamicPartials) {
            var file = tokenizer.readValue();
            tokenizer.assert(file, 'illegal file path');
            if (file.getText() === 'none')
                return;
            if (isQuotedToken(file)) {
                // for filenames like "files/{{file}}", eval as liquid template
                var templates_1 = parser.parse(evalQuotedToken(file));
                return optimize(templates_1);
            }
            return file;
        }
        var tokens = __spreadArray([], __read(tokenizer.readFileNameTemplate(liquid.options)), false);
        var templates = optimize(parser.parseTokens(tokens));
        return templates === 'none' ? undefined : templates;
    }
    function optimize(templates) {
        // for filenames like "files/file.liquid", extract the string directly
        if (templates.length === 1 && isHTMLToken(templates[0].token))
            return templates[0].token.getContent();
        return templates;
    }
    function renderFilePath(file, ctx, liquid) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof file === 'string')
                        return [2 /*return*/, file];
                    if (Array.isArray(file))
                        return [2 /*return*/, liquid.renderer.renderTemplates(file, ctx)];
                    return [4 /*yield*/, evalToken(file, ctx)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }

    var default_1$6 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            var tokenizer = token.tokenizer;
            _this['file'] = parseFilePath(tokenizer, _this.liquid, parser);
            _this['currentFile'] = token.file;
            var begin = tokenizer.p;
            var withStr = tokenizer.readIdentifier();
            if (withStr.content === 'with') {
                tokenizer.skipBlank();
                if (tokenizer.peek() !== ':') {
                    _this.withVar = tokenizer.readValue();
                }
                else
                    tokenizer.p = begin;
            }
            else
                tokenizer.p = begin;
            _this.hash = new Hash(tokenizer.remaining(), _this.liquid.options.jekyllInclude);
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var _a, liquid, hash, withVar, renderer, filepath, saved, scope, _b, _c, templates;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this, liquid = _a.liquid, hash = _a.hash, withVar = _a.withVar;
                        renderer = liquid.renderer;
                        return [4 /*yield*/, renderFilePath(this['file'], ctx, liquid)];
                    case 1:
                        filepath = (_d.sent());
                        assert(filepath, function () { return "illegal file path \"".concat(filepath, "\""); });
                        saved = ctx.saveRegister('blocks', 'blockMode');
                        ctx.setRegister('blocks', {});
                        ctx.setRegister('blockMode', BlockMode.OUTPUT);
                        return [4 /*yield*/, hash.render(ctx)];
                    case 2:
                        scope = (_d.sent());
                        if (!withVar) return [3 /*break*/, 4];
                        _b = scope;
                        _c = filepath;
                        return [4 /*yield*/, evalToken(withVar, ctx)];
                    case 3:
                        _b[_c] = _d.sent();
                        _d.label = 4;
                    case 4: return [4 /*yield*/, liquid._parsePartialFile(filepath, ctx.sync, this['currentFile'])];
                    case 5:
                        templates = (_d.sent());
                        ctx.push(ctx.opts.jekyllInclude ? { include: scope } : scope);
                        return [4 /*yield*/, renderer.renderTemplates(templates, ctx, emitter)];
                    case 6:
                        _d.sent();
                        ctx.pop();
                        ctx.restoreRegister(saved);
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$7 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.variable = _this.tokenizer.readIdentifier().content;
            return _this;
        }
        default_1.prototype.render = function (context, emitter) {
            var scope = context.environments;
            if (!isNumber(scope[this.variable])) {
                scope[this.variable] = 0;
            }
            emitter.write(stringify(--scope[this.variable]));
        };
        return default_1;
    }(Tag));

    var default_1$8 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.candidates = [];
            var group = _this.tokenizer.readValue();
            _this.tokenizer.skipBlank();
            if (group) {
                if (_this.tokenizer.peek() === ':') {
                    _this.group = group;
                    _this.tokenizer.advance();
                }
                else
                    _this.candidates.push(group);
            }
            while (!_this.tokenizer.end()) {
                var value = _this.tokenizer.readValue();
                if (value)
                    _this.candidates.push(value);
                _this.tokenizer.readTo(',');
            }
            _this.tokenizer.assert(_this.candidates.length, function () { return "empty candidates: \"".concat(token.getText(), "\""); });
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var group, fingerprint, groups, idx, candidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, evalToken(this.group, ctx)];
                    case 1:
                        group = (_a.sent());
                        fingerprint = "cycle:".concat(group, ":") + this.candidates.join(',');
                        groups = ctx.getRegister('cycle');
                        idx = groups[fingerprint];
                        if (idx === undefined) {
                            idx = groups[fingerprint] = 0;
                        }
                        candidate = this.candidates[idx];
                        idx = (idx + 1) % this.candidates.length;
                        groups[fingerprint] = idx;
                        return [4 /*yield*/, evalToken(candidate, ctx)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$9 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid, parser) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            _this.branches = [];
            var p = [];
            parser.parseStream(remainTokens)
                .on('start', function () { return _this.branches.push({
                value: new Value(tagToken.args, _this.liquid),
                templates: (p = [])
            }); })
                .on('tag:elsif', function (token) {
                assert(!_this.elseTemplates, 'unexpected elsif after else');
                _this.branches.push({
                    value: new Value(token.args, _this.liquid),
                    templates: (p = [])
                });
            })
                .on('tag:else', function (tag) {
                assertEmpty(tag.args);
                assert(!_this.elseTemplates, 'duplicated else');
                p = _this.elseTemplates = [];
            })
                .on('tag:endif', function (tag) { assertEmpty(tag.args); this.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () { throw new Error("tag ".concat(tagToken.getText(), " not closed")); })
                .start();
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var r, _a, _b, _c, value, templates, v, e_1_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        r = this.liquid.renderer;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 9]);
                        _a = __values(this.branches), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        _c = _b.value, value = _c.value, templates = _c.templates;
                        return [4 /*yield*/, value.value(ctx, ctx.opts.lenientIf)];
                    case 3:
                        v = _e.sent();
                        if (!isTruthy(v, ctx)) return [3 /*break*/, 5];
                        return [4 /*yield*/, r.renderTemplates(templates, ctx, emitter)];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, r.renderTemplates(this.elseTemplates || [], ctx, emitter)];
                    case 10:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$a = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.variable = _this.tokenizer.readIdentifier().content;
            return _this;
        }
        default_1.prototype.render = function (context, emitter) {
            var scope = context.environments;
            if (!isNumber(scope[this.variable])) {
                scope[this.variable] = 0;
            }
            var val = scope[this.variable];
            scope[this.variable]++;
            emitter.write(stringify(val));
        };
        return default_1;
    }(Tag));

    var default_1$b = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.file = parseFilePath(_this.tokenizer, _this.liquid, parser);
            _this['currentFile'] = token.file;
            _this.args = new Hash(_this.tokenizer.remaining());
            _this.templates = parser.parseTokens(remainTokens);
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var _a, liquid, args, file, renderer, filepath, templates, html, blocks, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this, liquid = _a.liquid, args = _a.args, file = _a.file;
                        renderer = liquid.renderer;
                        if (!(file === undefined)) return [3 /*break*/, 2];
                        ctx.setRegister('blockMode', BlockMode.OUTPUT);
                        return [4 /*yield*/, renderer.renderTemplates(this.templates, ctx, emitter)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, renderFilePath(this.file, ctx, liquid)];
                    case 3:
                        filepath = (_d.sent());
                        assert(filepath, function () { return "illegal file path \"".concat(filepath, "\""); });
                        return [4 /*yield*/, liquid._parseLayoutFile(filepath, ctx.sync, this['currentFile'])];
                    case 4:
                        templates = (_d.sent());
                        // render remaining contents and store rendered results
                        ctx.setRegister('blockMode', BlockMode.STORE);
                        return [4 /*yield*/, renderer.renderTemplates(this.templates, ctx)];
                    case 5:
                        html = _d.sent();
                        blocks = ctx.getRegister('blocks');
                        // set whole content to anonymous block if anonymous doesn't specified
                        if (blocks[''] === undefined)
                            blocks[''] = function (parent, emitter) { return emitter.write(html); };
                        ctx.setRegister('blockMode', BlockMode.OUTPUT);
                        // render the layout file use stored blocks
                        _c = (_b = ctx).push;
                        return [4 /*yield*/, args.render(ctx)];
                    case 6:
                        // render the layout file use stored blocks
                        _c.apply(_b, [(_d.sent())]);
                        return [4 /*yield*/, renderer.renderTemplates(templates, ctx, emitter)];
                    case 7:
                        _d.sent();
                        ctx.pop();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$c = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.templates = [];
            var match = /\w+/.exec(token.args);
            _this.block = match ? match[0] : '';
            while (remainTokens.length) {
                var token_1 = remainTokens.shift();
                if (isTagToken(token_1) && token_1.name === 'endblock')
                    return _this;
                var template = parser.parseToken(token_1, remainTokens);
                _this.templates.push(template);
            }
            throw new Error("tag ".concat(token.getText(), " not closed"));
        }
        default_1.prototype.render = function (ctx, emitter) {
            var blockRender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockRender = this.getBlockRender(ctx);
                        if (!(ctx.getRegister('blockMode') === BlockMode.STORE)) return [3 /*break*/, 1];
                        ctx.getRegister('blocks')[this.block] = blockRender;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, blockRender(new BlockDrop(), emitter)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        };
        default_1.prototype.getBlockRender = function (ctx) {
            var _a = this, liquid = _a.liquid, templates = _a.templates;
            var renderChild = ctx.getRegister('blocks')[this.block];
            var renderCurrent = function (superBlock, emitter) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // add {{ block.super }} support when rendering
                            ctx.push({ block: superBlock });
                            return [4 /*yield*/, liquid.renderer.renderTemplates(templates, ctx, emitter)];
                        case 1:
                            _a.sent();
                            ctx.pop();
                            return [2 /*return*/];
                    }
                });
            };
            return renderChild
                ? function (superBlock, emitter) { return renderChild(new BlockDrop(function () { return renderCurrent(superBlock, emitter); }), emitter); }
                : renderCurrent;
        };
        return default_1;
    }(Tag));

    var default_1$d = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            _this.tokens = [];
            while (remainTokens.length) {
                var token = remainTokens.shift();
                if (isTagToken(token) && token.name === 'endraw')
                    return _this;
                _this.tokens.push(token);
            }
            throw new Error("tag ".concat(tagToken.getText(), " not closed"));
        }
        default_1.prototype.render = function () {
            return this.tokens.map(function (token) { return token.getText(); }).join('');
        };
        return default_1;
    }(Tag));

    var TablerowloopDrop = /** @class */ (function (_super) {
        __extends(TablerowloopDrop, _super);
        function TablerowloopDrop(length, cols, collection, variable) {
            var _this = _super.call(this, length, collection, variable) || this;
            _this.length = length;
            _this.cols = cols;
            return _this;
        }
        TablerowloopDrop.prototype.row = function () {
            return Math.floor(this.i / this.cols) + 1;
        };
        TablerowloopDrop.prototype.col0 = function () {
            return (this.i % this.cols);
        };
        TablerowloopDrop.prototype.col = function () {
            return this.col0() + 1;
        };
        TablerowloopDrop.prototype.col_first = function () {
            return this.col0() === 0;
        };
        TablerowloopDrop.prototype.col_last = function () {
            return this.col() === this.cols;
        };
        return TablerowloopDrop;
    }(ForloopDrop));

    var default_1$e = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid, parser) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            var variable = _this.tokenizer.readIdentifier();
            _this.tokenizer.skipBlank();
            var predicate = _this.tokenizer.readIdentifier();
            var collectionToken = _this.tokenizer.readValue();
            if (predicate.content !== 'in' || !collectionToken) {
                throw new Error("illegal tag: ".concat(tagToken.getText()));
            }
            _this.variable = variable.content;
            _this.collection = collectionToken;
            _this.args = new Hash(_this.tokenizer.remaining());
            _this.templates = [];
            var p;
            var stream = parser.parseStream(remainTokens)
                .on('start', function () { return (p = _this.templates); })
                .on('tag:endtablerow', function () { return stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () {
                throw new Error("tag ".concat(tagToken.getText(), " not closed"));
            });
            stream.start();
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var collection, _a, args, offset, limit, cols, r, tablerowloop, scope, idx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toEnumerable;
                        return [4 /*yield*/, evalToken(this.collection, ctx)];
                    case 1:
                        collection = _a.apply(void 0, [_b.sent()]);
                        return [4 /*yield*/, this.args.render(ctx)];
                    case 2:
                        args = (_b.sent());
                        offset = args.offset || 0;
                        limit = (args.limit === undefined) ? collection.length : args.limit;
                        collection = collection.slice(offset, offset + limit);
                        cols = args.cols || collection.length;
                        r = this.liquid.renderer;
                        tablerowloop = new TablerowloopDrop(collection.length, cols, this.collection.getText(), this.variable);
                        scope = { tablerowloop: tablerowloop };
                        ctx.push(scope);
                        idx = 0;
                        _b.label = 3;
                    case 3:
                        if (!(idx < collection.length)) return [3 /*break*/, 6];
                        scope[this.variable] = collection[idx];
                        if (tablerowloop.col0() === 0) {
                            if (tablerowloop.row() !== 1)
                                emitter.write('</tr>');
                            emitter.write("<tr class=\"row".concat(tablerowloop.row(), "\">"));
                        }
                        emitter.write("<td class=\"col".concat(tablerowloop.col(), "\">"));
                        return [4 /*yield*/, r.renderTemplates(this.templates, ctx, emitter)];
                    case 4:
                        _b.sent();
                        emitter.write('</td>');
                        _b.label = 5;
                    case 5:
                        idx++, tablerowloop.next();
                        return [3 /*break*/, 3];
                    case 6:
                        if (collection.length)
                            emitter.write('</tr>');
                        ctx.pop();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$f = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid, parser) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            _this.branches = [];
            _this.elseTemplates = [];
            var p = [];
            var elseCount = 0;
            parser.parseStream(remainTokens)
                .on('start', function () { return _this.branches.push({
                value: new Value(tagToken.args, _this.liquid),
                test: isFalsy,
                templates: (p = [])
            }); })
                .on('tag:elsif', function (token) {
                if (elseCount > 0) {
                    p = [];
                    return;
                }
                _this.branches.push({
                    value: new Value(token.args, _this.liquid),
                    test: isTruthy,
                    templates: (p = [])
                });
            })
                .on('tag:else', function () {
                elseCount++;
                p = _this.elseTemplates;
            })
                .on('tag:endunless', function () { this.stop(); })
                .on('template', function (tpl) {
                if (p !== _this.elseTemplates || elseCount === 1) {
                    p.push(tpl);
                }
            })
                .on('end', function () { throw new Error("tag ".concat(tagToken.getText(), " not closed")); })
                .start();
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var r, _a, _b, _c, value, test_1, templates, v, e_1_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        r = this.liquid.renderer;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 9]);
                        _a = __values(this.branches), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        _c = _b.value, value = _c.value, test_1 = _c.test, templates = _c.templates;
                        return [4 /*yield*/, value.value(ctx, ctx.opts.lenientIf)];
                    case 3:
                        v = _e.sent();
                        if (!test_1(v, ctx)) return [3 /*break*/, 5];
                        return [4 /*yield*/, r.renderTemplates(templates, ctx, emitter)];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                    case 10:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$g = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            emitter['break'] = true;
        };
        return default_1;
    }(Tag));

    var default_1$h = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            emitter['continue'] = true;
        };
        return default_1;
    }(Tag));

    var default_1$i = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            _this.tokenizer.skipBlank();
            if (!_this.tokenizer.end()) {
                _this.value = new Value(_this.tokenizer.readFilteredValue(), _this.liquid);
            }
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.value)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.value.value(ctx, false)];
                    case 1:
                        val = _a.sent();
                        emitter.write(val);
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$j = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            var tokens = _this.tokenizer.readLiquidTagTokens(_this.liquid.options);
            _this.templates = parser.parseTokens(tokens);
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.liquid.renderer.renderTemplates(this.templates, ctx, emitter)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));

    var default_1$k = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(tagToken, remainTokens, liquid) {
            var _this = _super.call(this, tagToken, remainTokens, liquid) || this;
            if (tagToken.args.search(/\n\s*[^#\s]/g) !== -1) {
                throw new Error('every line of an inline comment must start with a \'#\' character');
            }
            return _this;
        }
        default_1.prototype.render = function () { };
        return default_1;
    }(Tag));

    var default_1$l = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1(token, remainTokens, liquid, parser) {
            var _this = _super.call(this, token, remainTokens, liquid) || this;
            var tokenizer = _this.tokenizer;
            //@ts-ignore
            _this.file = token.filename; // Use the filename from the token
            _this.currentFile = token.file;
            _this.hash = new Hash(tokenizer.remaining());
            return _this;
        }
        default_1.prototype.render = function (ctx, emitter) {
            var _a, liquid, hash, filename, projectRoot, filepath, hashScope, templates;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, liquid = _a.liquid, hash = _a.hash;
                        return [4 /*yield*/, renderFilePath$1(this['file'], ctx, liquid)];
                    case 1:
                        filename = (_b.sent());
                        assert(filename, function () { return "illegal file path \"".concat(filename, "\""); });
                        projectRoot = process.cwd();
                        filepath = path.join(projectRoot, 'src', 'content_blocks', "".concat(filename, ".liquid"));
                        return [4 /*yield*/, hash.render(ctx)];
                    case 2:
                        hashScope = _b.sent();
                        // Merge the hash scope with the current context
                        __assign(ctx.environments, hashScope);
                        return [4 /*yield*/, liquid._parsePartialFile(filepath, ctx.sync, this['currentFile'])];
                    case 3:
                        templates = (_b.sent());
                        return [4 /*yield*/, liquid.renderer.renderTemplates(templates, ctx, emitter)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        };
        return default_1;
    }(Tag));
    function renderFilePath$1(file, ctx, liquid) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof file === 'string')
                        return [2 /*return*/, file];
                    if (Array.isArray(file))
                        return [2 /*return*/, liquid.renderer.renderTemplates(file, ctx)];
                    return [4 /*yield*/, evalToken(file, ctx)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }

    var tags = {
        'content_blocks': default_1$l,
        assign: default_1,
        'for': default_1$1,
        capture: default_1$2,
        'case': default_1$3,
        comment: default_1$4,
        include: default_1$6,
        render: default_1$5,
        decrement: default_1$7,
        increment: default_1$a,
        cycle: default_1$8,
        'if': default_1$9,
        layout: default_1$b,
        block: default_1$c,
        raw: default_1$d,
        tablerow: default_1$e,
        unless: default_1$f,
        'break': default_1$g,
        'continue': default_1$h,
        echo: default_1$i,
        liquid: default_1$j,
        '#': default_1$k
    };

    var hash = {
        property_accessor: function (hash, key) {
            return hash[key];
        }
    };

    var json$1 = {
        json_escape: function (x) { return JSON.stringify(x).slice(1, -1); }
    };

    var url = {
        'url_escape': function (x) { return encodeURI(x); },
        'url_param_escape': function (x) { return encodeURIComponent(x); }
    };

    var encoding = {
        'md5': function (x) {
            var hash = crypto.createHash('md5');
            hash.update(x);
            return hash.digest('hex');
        },
        'sha1': function (x) {
            var hash = crypto.createHash('sha1');
            hash.update(x);
            return hash.digest('hex');
        },
        'sha2': function (x) {
            var hash = crypto.createHash('sha256');
            hash.update(x);
            return hash.digest('hex');
        },
        'hmac_sha1': function (x, secretKey) {
            var hmac = crypto.createHmac('sha1', secretKey);
            hmac.update(x);
            return hmac.digest('hex');
        },
        'base64': function (x) { return Buffer.from(x, 'utf8').toString('base64'); }
    };

    var number = {
        'number_with_delimiter': function (x) { return x.toLocaleString(); }
    };

    var brazeFilters = __assign(__assign(__assign(__assign(__assign({}, hash), json$1), url), encoding), number);

    var rp = rp_;
    // Matches both direct URLs and Liquid variables/expressions
    var re = new RegExp("(\\{\\{.*?\\}\\}|https?://[^\\s]+)(\\s+(\\s|.)*)?$");
    var headerRegex = new RegExp(":headers\\s+(\\{(.|\\s)*?[^\\}]\\}([^\\}]|$))");
    var bodyRegex = new RegExp(":body\\s+(.+?)(?=\\s*:|$)", 's');
    var connectedContent = {
        parse: function (tagToken) {
            var _this = this;
            var match = tagToken.args.match(re);
            if (!match) {
                throw new Error("illegal token ".concat(tagToken.getText()));
            }
            this.url = match[1];
            var options = match[2];
            this.options = {};
            if (options) {
                var headersMatch = options.match(headerRegex);
                if (headersMatch != null) {
                    try {
                        this.options.headers = JSON.parse(headersMatch[1]);
                    }
                    catch (e) {
                        console.error('Headers JSON parse error:', e);
                        throw new Error("Headers JSON malformed in token ".concat(tagToken.getText()));
                    }
                }
                // Extract body parameter first if present
                var bodyMatch = options.match(bodyRegex);
                if (bodyMatch) {
                    this.options.body = bodyMatch[1].trim();
                }
                // Remove body and headers from options string before processing other parameters
                var remainingOptions = options.replace(headerRegex, '').replace(bodyRegex, '');
                remainingOptions.split(/\s+:/).forEach(function (optStr) {
                    if (optStr === '')
                        return;
                    var opts = optStr.split(/\s+/);
                    if (opts[0] === 'headers') {
                        console.error('Headers JSON malformed. Check your headers value');
                    }
                    // Skip body as it's already handled
                    if (opts[0] !== 'body' && opts[0]) {
                        _this.options[opts[0]] = opts.length > 1 ? opts[1] : true;
                    }
                });
            }
        },
        render: function (ctx, emitter) {
            return __awaiter(this, void 0, void 0, function () {
                var renderedUrl, method, cacheTTL, cache, contentType, headers, _a, _b, key, _c, _d, e_1_1, body, jsonBody, _e, _f, element, bodyElementSplit, _g, _h, e_2_1, rpOption, secrets, secret, res, jsonRes, error_1, requestError;
                var e_1, _j, e_2, _k;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0:
                            _l.trys.push([0, 22, , 23]);
                            return [4 /*yield*/, this.liquid.parseAndRender(this.url, ctx.getAll())];
                        case 1:
                            renderedUrl = _l.sent();
                            console.log('Rendered URL:', renderedUrl); // Debug log
                            method = (this.options.method || 'GET').toUpperCase();
                            cacheTTL = 300 * 1000;
                            if (method !== 'GET') {
                                cacheTTL = 0;
                            }
                            else {
                                cache = parseInt(this.options.cache, 10);
                                if (cache > 0) {
                                    cacheTTL = cache * 1000;
                                }
                                else if (cache === 0) {
                                    cacheTTL = 1;
                                }
                            }
                            contentType = this.options.content_type;
                            if (method === 'POST') {
                                contentType = this.options.content_type || 'application/x-www-form-urlencoded';
                            }
                            headers = {
                                'User-Agent': 'brazejs-client',
                                'Content-Type': contentType,
                                'Accept': this.options.content_type
                            };
                            if (!this.options.headers) return [3 /*break*/, 9];
                            _l.label = 2;
                        case 2:
                            _l.trys.push([2, 7, 8, 9]);
                            _a = __values(Object.keys(this.options.headers)), _b = _a.next();
                            _l.label = 3;
                        case 3:
                            if (!!_b.done) return [3 /*break*/, 6];
                            key = _b.value;
                            _c = headers;
                            _d = key;
                            return [4 /*yield*/, this.liquid.parseAndRender(this.options.headers[key], ctx.getAll())];
                        case 4:
                            _c[_d] = _l.sent();
                            _l.label = 5;
                        case 5:
                            _b = _a.next();
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_1_1 = _l.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (_b && !_b.done && (_j = _a.return)) _j.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 9:
                            body = this.options.body;
                            if (!this.options.body) return [3 /*break*/, 20];
                            if (!(method.toUpperCase() === 'POST' && contentType && contentType.toLowerCase().includes('application/json'))) return [3 /*break*/, 18];
                            jsonBody = {};
                            _l.label = 10;
                        case 10:
                            _l.trys.push([10, 15, 16, 17]);
                            _e = __values(this.options.body.split('&')), _f = _e.next();
                            _l.label = 11;
                        case 11:
                            if (!!_f.done) return [3 /*break*/, 14];
                            element = _f.value;
                            bodyElementSplit = element.split('=');
                            _g = jsonBody;
                            _h = bodyElementSplit[0];
                            return [4 /*yield*/, this.liquid.parseAndRender(bodyElementSplit[1], ctx.getAll())];
                        case 12:
                            _g[_h] = (_l.sent()).replace(/(?:\r\n|\r|\n|)/g, '');
                            _l.label = 13;
                        case 13:
                            _f = _e.next();
                            return [3 /*break*/, 11];
                        case 14: return [3 /*break*/, 17];
                        case 15:
                            e_2_1 = _l.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 17];
                        case 16:
                            try {
                                if (_f && !_f.done && (_k = _e.return)) _k.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                            return [7 /*endfinally*/];
                        case 17:
                            body = JSON.stringify(jsonBody);
                            return [3 /*break*/, 20];
                        case 18: return [4 /*yield*/, this.liquid.parseAndRender(this.options.body, ctx.getAll())];
                        case 19:
                            body = _l.sent();
                            _l.label = 20;
                        case 20:
                            rpOption = {
                                'resolveWithFullResponse': true,
                                method: method,
                                headers: headers,
                                body: body,
                                uri: renderedUrl,
                                cacheKey: renderedUrl,
                                cacheTTL: cacheTTL,
                                timeout: 2000,
                                followRedirect: true,
                                followAllRedirects: true,
                                simple: false,
                                json: true,
                                gzip: true // Auto-handle gzip
                            };
                            // Handle basic auth if present
                            if (this.options.basic_auth) {
                                secrets = ctx.environments['__secrets'];
                                if (!secrets)
                                    throw new Error('No secrets defined in context!');
                                secret = secrets[this.options.basic_auth];
                                if (!secret)
                                    throw new Error("No secret found for ".concat(this.options.basic_auth));
                                if (!secret.username || !secret.password)
                                    throw new Error("No username or password set for ".concat(this.options.basic_auth));
                                rpOption['auth'] = { user: secret.username, pass: secret.password };
                            }
                            console.log('Request options:', rpOption); // Debug log
                            return [4 /*yield*/, rp(rpOption)];
                        case 21:
                            res = _l.sent();
                            console.log('Response status:', res.statusCode); // Debug log
                            if (res.statusCode >= 200 && res.statusCode <= 299) {
                                jsonRes = typeof res.body === 'object' ? res.body : { body: res.body };
                                jsonRes.__http_status_code__ = res.statusCode;
                                ctx.environments[this.options.save || 'connected'] = jsonRes;
                            }
                            else {
                                ctx.environments[this.options.save || 'connected'] = {
                                    error: "Request failed with status ".concat(res.statusCode),
                                    status: res.statusCode,
                                    body: res.body
                                };
                            }
                            emitter.write('');
                            return [3 /*break*/, 23];
                        case 22:
                            error_1 = _l.sent();
                            requestError = error_1;
                            console.error('Connected Content Error:', requestError); // Debug log
                            ctx.environments[this.options.save || 'connected'] = {
                                error: requestError.message || 'Request failed',
                                status: requestError.statusCode
                            };
                            emitter.write('');
                            return [3 /*break*/, 23];
                        case 23: return [2 /*return*/];
                    }
                });
            });
        }
    };

    var AbortError = /** @class */ (function (_super) {
        __extends(AbortError, _super);
        function AbortError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = 'AbortError';
            _this.message = message + '';
            return _this;
        }
        return AbortError;
    }(Error));

    var re$1 = new RegExp("\\(('([^']*)'|\"([^\"]*)\")?\\)");
    var abortMessage = {
        parse: function (tagToken) {
            var match = tagToken.args.match(re$1);
            if (!match) {
                //@ts-ignore
                throw new Error("illegal token ".concat(tagToken.raw));
            }
            this.msg = match[2] || match[3] || 'message is aborted';
        },
        render: function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new AbortError(this.msg);
                });
            });
        }
    };

    var rp$1 = rp_;
    // Match the catalog_items tag syntax: catalog_items catalog_type post_uid
    var tagRegex = /^(\S+)\s+\{\{(.+?)\}\}$/;
    var catalogItems = {
        parse: function (tagToken) {
            var match = tagToken.args.match(tagRegex);
            if (!match) {
                throw new Error("Invalid catalog_items tag format: ".concat(tagToken.getText()));
            }
            this.catalogType = match[1];
            this.postUid = match[2].trim(); // Store the raw expression
            console.log('Parsed UID:', this.postUid); // Debug log
        },
        render: function (ctx, emitter) {
            return __awaiter(this, void 0, void 0, function () {
                var renderedCatalogType, renderedPostUid, authToken, response, error_1, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.liquid.parseAndRender(this.catalogType, ctx.getAll())];
                        case 1:
                            renderedCatalogType = _a.sent();
                            return [4 /*yield*/, this.liquid.evalValue(this.postUid, ctx)];
                        case 2:
                            renderedPostUid = _a.sent();
                            console.log('Rendered UID:', renderedPostUid);
                            if (!renderedPostUid) {
                                throw new Error("Failed to evaluate post UID: ".concat(this.postUid));
                            }
                            authToken = ctx.get(['braze_catalog_auth_token']);
                            if (!authToken) {
                                throw new Error('braze_catalog_auth_token not found in context');
                            }
                            console.log('theurl:', "https://rest.iad-01.braze.com/catalogs/".concat(renderedCatalogType, "/items/").concat(renderedPostUid));
                            return [4 /*yield*/, rp$1({
                                    method: 'GET',
                                    uri: "https://rest.iad-01.braze.com/catalogs/".concat(renderedCatalogType, "/items/").concat(renderedPostUid),
                                    headers: {
                                        'Authorization': "Bearer ".concat(authToken),
                                        'Content-Type': 'application/json'
                                    },
                                    json: true,
                                    timeout: 2000
                                })];
                        case 3:
                            response = _a.sent();
                            if (response === null || response === void 0 ? void 0 : response.items) {
                                ctx.push({ items: response.items });
                            }
                            else {
                                ctx.push({ items: [] });
                            }
                            emitter.write('');
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            err = error_1;
                            console.error('Request failed:', err.message);
                            ctx.push({ items: [] });
                            emitter.write('');
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
    };

    var tags$1 = {
        'connected_content': connectedContent,
        'abort_message': abortMessage,
        'catalog_items': catalogItems
        //'content_blocks': ContentBlockTag
    };

    var Liquid = /** @class */ (function () {
        function Liquid(opts) {
            if (opts === void 0) { opts = {}; }
            var _this = this;
            this.renderer = new Render();
            this.filters = {};
            this.tags = {};
            this.options = normalize(opts);
            // eslint-disable-next-line deprecation/deprecation
            this.parser = new Parser(this);
            forOwn(tags, function (conf, name) { return _this.registerTag(name, conf); });
            forOwn(filters, function (handler, name) { return _this.registerFilter(name, handler); });
            forOwn(brazeFilters, function (handler, name) { return _this.registerFilter(name, handler); });
            forOwn(tags$1, function (conf, name) { return _this.registerTag(name, conf); });
        }
        Liquid.prototype.parse = function (html, filepath) {
            var parser = new Parser(this);
            return parser.parse(html, filepath);
        };
        Liquid.prototype._render = function (tpl, scope, renderOptions) {
            var ctx = scope instanceof Context ? scope : new Context(scope, this.options, renderOptions);
            return this.renderer.renderTemplates(tpl, ctx);
        };
        Liquid.prototype.render = function (tpl, scope, renderOptions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toPromise(this._render(tpl, scope, __assign(__assign({}, renderOptions), { sync: false })))];
                });
            });
        };
        Liquid.prototype.renderSync = function (tpl, scope, renderOptions) {
            return toValueSync(this._render(tpl, scope, __assign(__assign({}, renderOptions), { sync: true })));
        };
        Liquid.prototype.renderToNodeStream = function (tpl, scope, renderOptions) {
            if (renderOptions === void 0) { renderOptions = {}; }
            var ctx = new Context(scope, this.options, renderOptions);
            return this.renderer.renderTemplatesToNodeStream(tpl, ctx);
        };
        Liquid.prototype._parseAndRender = function (html, scope, renderOptions) {
            var tpl = this.parse(html);
            return this._render(tpl, scope, renderOptions);
        };
        Liquid.prototype.parseAndRender = function (html, scope, renderOptions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toPromise(this._parseAndRender(html, scope, __assign(__assign({}, renderOptions), { sync: false })))];
                });
            });
        };
        Liquid.prototype.parseAndRenderSync = function (html, scope, renderOptions) {
            return toValueSync(this._parseAndRender(html, scope, __assign(__assign({}, renderOptions), { sync: true })));
        };
        Liquid.prototype._parsePartialFile = function (file, sync, currentFile) {
            return new Parser(this).parseFile(file, sync, LookupType.Partials, currentFile);
        };
        Liquid.prototype._parseLayoutFile = function (file, sync, currentFile) {
            return new Parser(this).parseFile(file, sync, LookupType.Layouts, currentFile);
        };
        Liquid.prototype._parseFile = function (file, sync, lookupType, currentFile) {
            return new Parser(this).parseFile(file, sync, lookupType, currentFile);
        };
        Liquid.prototype.parseFile = function (file, lookupType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toPromise(new Parser(this).parseFile(file, false, lookupType))];
                });
            });
        };
        Liquid.prototype.parseFileSync = function (file, lookupType) {
            return toValueSync(new Parser(this).parseFile(file, true, lookupType));
        };
        Liquid.prototype._renderFile = function (file, ctx, renderFileOptions) {
            var templates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._parseFile(file, renderFileOptions.sync, renderFileOptions.lookupType)];
                    case 1:
                        templates = (_a.sent());
                        return [4 /*yield*/, this._render(templates, ctx, renderFileOptions)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        };
        Liquid.prototype.renderFile = function (file, ctx, renderFileOptions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toPromise(this._renderFile(file, ctx, __assign(__assign({}, renderFileOptions), { sync: false })))];
                });
            });
        };
        Liquid.prototype.renderFileSync = function (file, ctx, renderFileOptions) {
            return toValueSync(this._renderFile(file, ctx, __assign(__assign({}, renderFileOptions), { sync: true })));
        };
        Liquid.prototype.renderFileToNodeStream = function (file, scope, renderOptions) {
            return __awaiter(this, void 0, void 0, function () {
                var templates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.parseFile(file)];
                        case 1:
                            templates = _a.sent();
                            return [2 /*return*/, this.renderToNodeStream(templates, scope, renderOptions)];
                    }
                });
            });
        };
        Liquid.prototype._evalValue = function (str, scope) {
            var value = new Value(str, this);
            var ctx = scope instanceof Context ? scope : new Context(scope, this.options);
            return value.value(ctx);
        };
        Liquid.prototype.evalValue = function (str, scope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toPromise(this._evalValue(str, scope))];
                });
            });
        };
        Liquid.prototype.evalValueSync = function (str, scope) {
            return toValueSync(this._evalValue(str, scope));
        };
        Liquid.prototype.registerFilter = function (name, filter) {
            this.filters[name] = filter;
        };
        Liquid.prototype.registerTag = function (name, tag) {
            this.tags[name] = isFunction(tag) ? tag : createTagClass(tag);
        };
        Liquid.prototype.plugin = function (plugin) {
            return plugin.call(this, Liquid);
        };
        Liquid.prototype.express = function () {
            var self = this; // eslint-disable-line
            var firstCall = true;
            return function (filePath, ctx, callback) {
                var _a, _b, _c;
                if (firstCall) {
                    firstCall = false;
                    var dirs = normalizeDirectoryList(this.root);
                    (_a = self.options.root).unshift.apply(_a, __spreadArray([], __read(dirs), false));
                    (_b = self.options.layouts).unshift.apply(_b, __spreadArray([], __read(dirs), false));
                    (_c = self.options.partials).unshift.apply(_c, __spreadArray([], __read(dirs), false));
                }
                self.renderFile(filePath, ctx).then(function (html) { return callback(null, html); }, callback);
            };
        };
        return Liquid;
    }());

    /* istanbul ignore file */
    var version = '10.16.1';

    exports.AssertionError = AssertionError;
    exports.AssignTag = default_1;
    exports.BlockTag = default_1$c;
    exports.BreakTag = default_1$g;
    exports.CaptureTag = default_1$2;
    exports.CaseTag = default_1$3;
    exports.CommentTag = default_1$4;
    exports.ContentBlocksTag = default_1$l;
    exports.Context = Context;
    exports.ContinueTag = default_1$h;
    exports.CycleTag = default_1$8;
    exports.DecrementTag = default_1$7;
    exports.Drop = Drop;
    exports.EchoTag = default_1$i;
    exports.Expression = Expression;
    exports.Filter = Filter;
    exports.ForTag = default_1$1;
    exports.Hash = Hash;
    exports.IfTag = default_1$9;
    exports.IncludeTag = default_1$6;
    exports.IncrementTag = default_1$a;
    exports.InlineCommentTag = default_1$k;
    exports.LayoutTag = default_1$b;
    exports.Liquid = Liquid;
    exports.LiquidError = LiquidError;
    exports.LiquidTag = default_1$j;
    exports.Output = Output;
    exports.ParseError = ParseError;
    exports.ParseStream = ParseStream;
    exports.RawTag = default_1$d;
    exports.RenderError = RenderError;
    exports.RenderTag = default_1$5;
    exports.TablerowTag = default_1$e;
    exports.Tag = Tag;
    exports.TagToken = TagToken;
    exports.Token = Token;
    exports.TokenizationError = TokenizationError;
    exports.Tokenizer = Tokenizer;
    exports.TypeGuards = typeGuards;
    exports.UndefinedVariableError = UndefinedVariableError;
    exports.UnlessTag = default_1$f;
    exports.Value = Value;
    exports.assert = assert;
    exports.createTrie = createTrie;
    exports.defaultOperators = defaultOperators;
    exports.defaultOptions = defaultOptions;
    exports.evalQuotedToken = evalQuotedToken;
    exports.evalToken = evalToken;
    exports.filters = filters;
    exports.isFalsy = isFalsy;
    exports.isTruthy = isTruthy;
    exports.tags = tags;
    exports.toPromise = toPromise;
    exports.toValue = toValue;
    exports.toValueSync = toValueSync;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=liquid.browser.umd.js.map
