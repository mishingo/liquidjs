import { TopLevelToken, Liquid, Token, Template, Tokenizer, Emitter, TagToken, Context, Tag } from '..';
import { Parser } from '../parser';
export type ParsedFileName = Template[] | Token | string | undefined;
export default class extends Tag {
    private file;
    private currentFile?;
    private hash;
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, void, unknown>;
}
export declare function parseFilePath(tokenizer: Tokenizer, liquid: Liquid, parser: Parser): ParsedFileName;
export declare function renderFilePath(file: ParsedFileName, ctx: Context, liquid: Liquid): IterableIterator<unknown>;
