import { ValueToken, Liquid, Value, Emitter, TagToken, TopLevelToken, Context, Template, Tag } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    value: Value;
    branches: {
        values: ValueToken[];
        templates: Template[];
    }[];
    elseTemplates: Template[];
    constructor(tagToken: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, void, unknown>;
}
