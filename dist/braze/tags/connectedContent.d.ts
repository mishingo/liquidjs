import { Liquid, TopLevelToken, TagToken, Context, Tag } from '../..';
export default class extends Tag {
    private url;
    private options;
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid);
    render(ctx: Context): Generator<unknown, void, unknown>;
}
