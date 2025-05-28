import type { FC, ForwardRefExoticComponent, SVGProps } from 'react';
import type { LucideIcon } from 'lucide-react'

export type RIconType =
    | string
    | LucideIcon
    | FC<SVGProps<SVGSVGElement>>
    | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
