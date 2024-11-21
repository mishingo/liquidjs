import { Value, Liquid, TopLevelToken, TagToken, Context, Tag } from '../..';
export default class extends Tag {
    value: Value;
    options: Record<string, any>;
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid);
    render(ctx: Context): AsyncGenerator<unknown, void | string, unknown>;
}
