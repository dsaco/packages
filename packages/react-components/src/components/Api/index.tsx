export type { Options, ContentProps } from './common';
import { Gallery } from './Gallery';
export type { GalleryOptions } from './Gallery';
import { Confirm } from './Confirm';
export type { ConfirmOptions } from './Confirm';
import { Mask } from './Mask';
export type { MaskOptions } from './Mask';
import { Preview } from './Preview';
export type { PreviewOptions } from './Preview';
export class Api {
  static init() {
    Gallery.init();
    Confirm.init();
    Mask.init();
    // Preview.init();
  }
  static gallery = Gallery.preview;
  static confirm = Confirm.confirm;
  static mask = Mask.add;
  // static preview = Preview.open;
}

if (typeof window !== 'undefined') {
  Api.init();
}
