import { Options } from '../options';
import { isCSSFn, isRelativeCSSFn } from './cssExtensions';
import { Logger } from './logger';
interface Matchers {
    isCSS: isCSSFn;
    isRelativeCSS: isRelativeCSSFn;
}
export declare const createMatchers: (logger: Logger, options?: Options) => Matchers;
export {};
