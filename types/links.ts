import type {
    AnchorHTMLAttributes, JSXElementConstructor
} from 'react';

export type LinkLike =
    | JSXElementConstructor<AnchorHTMLAttributes<HTMLAnchorElement>>
    | 'a';
