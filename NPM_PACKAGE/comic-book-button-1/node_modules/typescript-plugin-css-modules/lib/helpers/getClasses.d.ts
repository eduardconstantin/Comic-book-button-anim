import Processor from 'postcss/lib/processor';
import { CSSExports } from 'icss-utils';
import tsModule from 'typescript/lib/tsserverlibrary';
import { Options } from '../options';
import { Logger } from './logger';
export declare const enum FileType {
    css = "css",
    less = "less",
    sass = "sass",
    scss = "scss",
    styl = "styl"
}
export declare const getFileType: (fileName: string) => FileType;
export declare const getClasses: ({ css, fileName, logger, options, processor, compilerOptions, }: {
    css: string;
    fileName: string;
    logger: Logger;
    options: Options;
    processor: Processor;
    compilerOptions: tsModule.CompilerOptions;
}) => CSSExports;
