import { Product } from "./Product";

export type Order = Product & {size:('S'|'M'|'L'|'XL')};