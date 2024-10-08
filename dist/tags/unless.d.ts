import { Liquid, Tag, Value, TopLevelToken, Template, Emitter, Context, TagToken } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    branches: {
        value: Value;
        test: (val: any, ctx: Context) => boolean;
        templates: Template[];
    }[];
    elseTemplates: Template[];
    constructor(tagToken: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, unknown, unknown>;
}
