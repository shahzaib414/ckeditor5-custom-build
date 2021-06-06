"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactCKEditor = exports.CKEditor = void 0;
var ckeditor_1 = __importDefault(require("./ckeditor"));
exports.CKEditor = ckeditor_1.default;
var ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
Object.defineProperty(exports, "ReactCKEditor", { enumerable: true, get: function () { return ckeditor5_react_1.CKEditor; } });
//# sourceMappingURL=index.js.map