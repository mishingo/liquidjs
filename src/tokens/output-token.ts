import { DelimitedToken } from './delimited-token'
import { NormalizedFullOptions } from '../liquid-options'
import { TokenKind } from '../parser'

/*
export class OutputToken extends DelimitedToken {
  public constructor (
    input: string,
    begin: number,
    end: number,
    options: NormalizedFullOptions,
    file?: string
  ) {
    const { trimOutputLeft, trimOutputRight, outputDelimiterLeft, outputDelimiterRight } = options
    const valueRange: [number, number] = [begin + outputDelimiterLeft.length, end - outputDelimiterRight.length]
    super(TokenKind.Output, valueRange, input, begin, end, trimOutputLeft, trimOutputRight, file)
  }
}
*/

export class OutputToken extends DelimitedToken {
  public constructor (
    input: string,
    begin: number,
    end: number,
    options: NormalizedFullOptions,
    file?: string
  ) {
    const { trimOutputLeft, trimOutputRight, outputDelimiterLeft, outputDelimiterRight } = options
    const valueRange: [number, number] = [begin + outputDelimiterLeft.length, end - outputDelimiterRight.length]

    // Extract the content within the delimiters
    let content = input.slice(valueRange[0], valueRange[1]).trim();

    // Check for and handle `${}` syntax
    const regex = /\$\{([^}]+)\}/g;
    content = content.replace(regex, (match, p1) => p1.trim());

    // Use the modified content in the parent constructor
    super(TokenKind.Output, [begin + outputDelimiterLeft.length, begin + outputDelimiterLeft.length + content.length], content, begin, end, trimOutputLeft, trimOutputRight, file)
  }
}
