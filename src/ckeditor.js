/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Mention from "@ckeditor/ckeditor5-mention/src/mention.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from '@ckeditor/ckeditor5-list/src/list';

class Editor extends ClassicEditor {}

Editor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  },
  language: "en",
};
// Plugins to include in the build.
Editor.builtinPlugins = [
  Heading,
  List,
  Autoformat,
  Code,
  CodeBlock,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Strikethrough,
  Underline,
  Bold,
];

export default Editor;
