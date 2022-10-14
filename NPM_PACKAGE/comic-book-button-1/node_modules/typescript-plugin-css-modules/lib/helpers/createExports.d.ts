import { CSSExports } from 'icss-utils';
import { Options } from '../options';
import { Logger } from './logger';
export declare const createExports: ({ classes, fileName, logger, options, }: {
    classes: CSSExports;
    fileName: string;
    logger: Logger;
    options: Options;
}) => string;
