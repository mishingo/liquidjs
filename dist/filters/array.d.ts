import { FilterImpl } from '../template';
import type { Scope } from '../context';
export declare const join: (this: unknown, v: any[], arg: string) => any;
export declare const last: (this: unknown, v: any) => any;
export declare const first: (this: unknown, v: any) => any;
export declare const reverse: (this: unknown, v: any[]) => any;
export declare function sort<T>(this: FilterImpl, arr: T[], property?: string): IterableIterator<unknown>;
export declare function sort_natural<T>(this: FilterImpl, input: T[], property?: string): any[];
export declare const size: (v: string | any[]) => number;
export declare function map(this: FilterImpl, arr: Scope[], property: string): IterableIterator<unknown>;
export declare function sum(this: FilterImpl, arr: Scope[], property?: string): IterableIterator<unknown>;
export declare function compact<T>(this: FilterImpl, arr: T[]): any[];
export declare function concat<T1, T2>(this: FilterImpl, v: T1[], arg?: T2[]): (T1 | T2)[];
export declare function push<T>(this: FilterImpl, v: T[], arg: T): T[];
export declare function unshift<T>(this: FilterImpl, v: T[], arg: T): T[];
export declare function pop<T>(v: T[]): T[];
export declare function shift<T>(this: FilterImpl, v: T[]): T[];
export declare function slice<T>(this: FilterImpl, v: T[] | string, begin: number, length?: number): T[] | string;
export declare function where<T extends object>(this: FilterImpl, arr: T[], property: string, expected?: any): IterableIterator<unknown>;
export declare function where_exp<T extends object>(this: FilterImpl, arr: T[], itemName: string, exp: string): IterableIterator<unknown>;
export declare function group_by<T extends object>(this: FilterImpl, arr: T[], property: string): IterableIterator<unknown>;
export declare function group_by_exp<T extends object>(this: FilterImpl, arr: T[], itemName: string, exp: string): IterableIterator<unknown>;
export declare function find<T extends object>(this: FilterImpl, arr: T[], property: string, expected: string): IterableIterator<unknown>;
export declare function find_exp<T extends object>(this: FilterImpl, arr: T[], itemName: string, exp: string): IterableIterator<unknown>;
export declare function uniq<T>(this: FilterImpl, arr: T[]): T[];
export declare function sample<T>(this: FilterImpl, v: T[] | string, count?: number): T | string | (T | string)[];
