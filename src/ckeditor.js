/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
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
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';

import ProductPreviewEditing from "./ProductPreviewEditing";

class Editor extends ClassicEditor {
}

Editor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "link",
      "|",
      "insertTable"
    ],
  },
  language: "en",
};
// Plugins to include in the build.
Editor.builtinPlugins = [
  Heading,
  List,
  Markdown,
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
  Table,
  TableToolbar,
  Link,
  AutoLink,
  ProductPreviewEditing
];

export default Editor;
