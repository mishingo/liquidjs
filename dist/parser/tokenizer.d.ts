import { FilteredValueToken, TagToken, HTMLToken, HashToken, QuotedToken, LiquidTagToken, OutputToken, ValueToken, Token, RangeToken, FilterToken, TopLevelToken, OperatorToken, LiteralToken, IdentifierToken, NumberToken } from '../tokens';
import { Trie, TokenizationError } from '../util';
import { Operators, Expression } from '../render';
import { NormalizedFullOptions } from '../liquid-options';
import { FilterArg } from './filter-arg';
export declare class Tokenizer {
    input: string;
    file?: string | undefined;
    p: number;
    N: number;
    private rawBeginAt;
    private opTrie;
    private literalTrie;
    constructor(input: string, operators?: Operators, file?: string | undefined, range?: [number, number]);
    readExpression(): Expression;
    readExpressionTokens(): IterableIterator<Token>;
    readOperator(): OperatorToken | undefined;
    matchTrie<T>(trie: Trie<T>): number;
    readFilteredValue(): FilteredValueToken;
    readExpressionFromString(expression: string): Expression;
    readFilters(): FilterToken[];
    readFilter(): FilterToken | null;
    readFilterArg(): FilterArg | undefined;
    readTopLevelTokens(options?: NormalizedFullOptions): TopLevelToken[];
    readTopLevelToken(options: NormalizedFullOptions): TopLevelToken;
    readHTMLToken(stopStrings: string[]): HTMLToken;
    readTagToken(options: NormalizedFullOptions): TagToken;
    readContentBlocksToken(options: NormalizedFullOptions): TagToken;
    readToDelimiter(delimiter: string, respectQuoted?: boolean): number;
    readOutputToken(options?: NormalizedFullOptions): OutputToken;
    readEndrawOrRawContent(options: NormalizedFullOptions): HTMLToken | TagToken;
    readLiquidTagTokens(options?: NormalizedFullOptions): LiquidTagToken[];
    readLiquidTagToken(options: NormalizedFullOptions): LiquidTagToken | undefined;
    error(msg: string, pos?: number): TokenizationError;
    assert(pred: unknown, msg: string | (() => string), pos?: number): void;
    snapshot(begin?: number): string;
    /**
     * @deprecated use #readIdentifier instead
     */
    readWord(): IdentifierToken;
    readIdentifier(): IdentifierToken;
    readNonEmptyIdentifier(): IdentifierToken | undefined;
    readTagName(): string;
    readHashes(jekyllStyle?: boolean): HashToken[];
    readHash(jekyllStyle?: boolean): HashToken | undefined;
    remaining(): string;
    advance(step?: number): void;
    end(): boolean;
    readTo(end: string): number;
    readValue(): ValueToken | undefined;
    readScopeValue(): ValueToken | undefined;
    private readProperties;
    readNumber(): NumberToken | undefined;
    readLiteral(): LiteralToken | undefined;
    readRange(): RangeToken | undefined;
    readValueOrThrow(): ValueToken;
    readQuoted(): QuotedToken | undefined;
    readFileNameTemplate(options: NormalizedFullOptions): IterableIterator<TopLevelToken>;
    match(word: string): boolean;
    rmatch(pattern: string): boolean;
    peekType(n?: number): number;
    peek(n?: number): string;
    skipBlank(): void;
}
