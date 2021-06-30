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
var plugin_1 = __importDefault(require("@ckeditor/ckeditor5-core/src/plugin"));
var utils_1 = require("@ckeditor/ckeditor5-widget/src/utils");
var widget_1 = __importDefault(require("@ckeditor/ckeditor5-widget/src/widget"));
var insertproductpreviewcommand_1 = __importDefault(require("./insertproductpreviewcommand"));
var ProductPreviewEditing = /** @class */ (function (_super) {
    __extends(ProductPreviewEditing, _super);
    function ProductPreviewEditing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ProductPreviewEditing, "requires", {
        get: function () {
            return [widget_1.default];
        },
        enumerable: false,
        configurable: true
    });
    ProductPreviewEditing.prototype.init = function () {
        this._defineSchema();
        this._defineConverters();
        this.editor.commands.add('insertProduct', new insertproductpreviewcommand_1.default(this.editor));
    };
    ProductPreviewEditing.prototype._defineSchema = function () {
        var schema = this.editor.model.schema;
        schema.register('productPreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',
            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
            allowAttributes: ['id']
        });
    };
    ProductPreviewEditing.prototype._defineConverters = function () {
        var editor = this.editor;
        var conversion = editor.conversion;
        var renderProduct = editor.config.get('products').productRenderer;
        // <productPreview> converters ((data) view → model)
        conversion.for('upcast').elementToElement({
            view: {
                name: 'section',
                classes: 'product'
            },
            model: function (viewElement, _a) {
                var modelWriter = _a.writer;
                // Read the "data-id" attribute from the view and set it as the "id" in the model.
                return modelWriter.createElement('productPreview', {
                    id: parseInt(viewElement.getAttribute('data-id'))
                });
            }
        });
        // <productPreview> converters (model → data view)
        conversion.for('dataDowncast').elementToElement({
            model: 'productPreview',
            view: function (modelElement, _a) {
                var viewWriter = _a.writer;
                // In the data view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="..."></section>
                return viewWriter.createEmptyElement('section', {
                    class: 'product',
                    'data-id': modelElement.getAttribute('id')
                });
            }
        });
        // <productPreview> converters (model → editing view)
        conversion.for('editingDowncast').elementToElement({
            model: 'productPreview',
            view: function (modelElement, _a) {
                var viewWriter = _a.writer;
                // In the editing view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="...">
                //     <div class="product__react-wrapper">
                //         <ProductPreview /> (React component)
                //     </div>
                // </section>
                var id = modelElement.getAttribute('id');
                // The outermost <section class="product" data-id="..."></section> element.
                var section = viewWriter.createContainerElement('section', {
                    class: 'product',
                    'data-id': id
                });
                // The inner <div class="product__react-wrapper"></div> element.
                // This element will host a React <ProductPreview /> component.
                var reactWrapper = viewWriter.createRawElement('div', {
                    class: 'product__react-wrapper'
                }, function (domElement) {
                    // This the place where React renders the actual product preview hosted
                    // by a UIElement in the view. You are using a function (renderer) passed as
                    // editor.config.products#productRenderer.
                    renderProduct(id, domElement);
                });
                viewWriter.insert(viewWriter.createPositionAt(section, 0), reactWrapper);
                return utils_1.toWidget(section, viewWriter, { label: 'product preview widget' });
            }
        });
    };
    return ProductPreviewEditing;
}(plugin_1.default));
exports.default = ProductPreviewEditing;
//# sourceMappingURL=ProductPreviewEditing.js.map