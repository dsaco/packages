import React, { createRef } from 'react';
import { createPortal } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';

import { Container } from './common';
import type { IRef, Options } from './common';

export type MaskOptions = Omit<Options, 'id'>;

export class Mask {
  private static ref: React.RefObject<IRef> = createRef<IRef>();
  private static key = 0;

  static init() {
    if (!Mask.ref.current) {
      const root = createRoot(document.createElement('div'));
      root.render(createPortal(<Container ref={Mask.ref} />, document.body));
    }
  }

  static add(options: MaskOptions) {
    const id = Mask.key++;
    Mask.ref.current?.add(
      Object.assign(options, {
        id,
      })
    );
  }
}
