import { ValueToken, Liquid, Tag, Emitter, Hash, TagToken, TopLevelToken, Context, Template } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    variable: string;
    args: Hash;
    templates: Template[];
    collection: ValueToken;
    constructor(tagToken: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, void, unknown>;
}
