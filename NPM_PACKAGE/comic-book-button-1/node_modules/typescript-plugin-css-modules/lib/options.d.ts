/// <reference types="less" />
import { Options as SassOptions } from 'sass';
import tsModule from 'typescript/lib/tsserverlibrary';
import { DotenvConfigOptions } from 'dotenv/types';
import { CSSExports } from 'icss-utils';
import stylus from 'stylus';
import { Logger } from './helpers/logger';
declare type StylusRenderOptions = Parameters<typeof stylus>[1];
export interface PostcssOptions {
    excludePlugins?: string[];
    useConfig?: boolean;
}
export interface RendererOptions {
    less?: Partial<Less.Options>;
    sass?: Partial<SassOptions>;
    stylus?: Partial<StylusRenderOptions>;
}
export interface Options {
    classnameTransform?: ClassnameTransformOptions;
    customMatcher?: string;
    customRenderer?: string;
    customTemplate?: string;
    dotenvOptions?: DotenvConfigOptions;
    namedExports?: boolean;
    postcssOptions?: PostcssOptions;
    /** @deprecated To align with other projects. */
    postCssOptions?: PostcssOptions;
    rendererOptions?: RendererOptions;
}
export declare type ClassnameTransformOptions = 'asIs' | 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly';
export interface CustomRendererOptions {
    fileName: string;
    logger: Logger;
    compilerOptions: tsModule.CompilerOptions;
}
export declare type CustomRenderer = (css: string, options: CustomRendererOptions) => string;
export interface CustomTemplateOptions {
    classes: CSSExports;
    fileName: string;
    logger: Logger;
}
export declare type CustomTemplate = (dts: string, options: CustomTemplateOptions) => string;
export {};
