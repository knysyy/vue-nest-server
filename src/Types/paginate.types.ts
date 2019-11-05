import { Exclude } from 'class-transformer';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
