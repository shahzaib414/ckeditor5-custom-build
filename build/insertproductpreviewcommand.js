"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = __importDefault(require("@ckeditor/ckeditor5-core/src/command"));
var InsertProductPreviewCommand = /** @class */ (function (_super) {
    __extends(InsertProductPreviewCommand, _super);
    function InsertProductPreviewCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertProductPreviewCommand.prototype.execute = function (id) {
        var _this = this;
        this.editor.model.change(function (writer) {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            _this.editor.model.insertContent(writer.createElement('productPreview', { id: id }));
        });
    };
    InsertProductPreviewCommand.prototype.refresh = function () {
        var model = this.editor.model;
        var selection = model.document.selection;
        var allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'productPreview');
        this.isEnabled = allowedIn !== null;
    };
    return InsertProductPreviewCommand;
}(command_1.default));
exports.default = InsertProductPreviewCommand;
//# sourceMappingURL=insertproductpreviewcommand.js.map