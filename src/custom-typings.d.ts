interface Window {
  store: any;
  __INITIAL_STATE__: any;
}

declare var nodeRequire: any;

declare module 'vue-meta' {
  const meta: any;
  export = meta;
}

declare module 'marked' {
  const marked: any;
  export = marked;
}

declare module 'file-saver' {
  const saveAs: any;
  export const saveAs;
}

declare module 'html-docx-js/dist/html-docx' {
  const htmlDocx: any;
  export = htmlDocx;
}
