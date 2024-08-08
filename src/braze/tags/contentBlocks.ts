
import { Liquid, Context, TagToken } from '../..';
import {TagImplOptions} from '../../template/tag-options-adapter'
import { resolve, join } from 'path';
import { promises as fs } from 'fs';

const identifier = /[\w-]+[?]?/;
const attribute = new RegExp(`^\\s*content_blocks\\s*\\$\\{\\s*(${identifier.source})\\s*\\}\\s*$`);

// Directory where content blocks are stored
const contentBlocksDirectory = './src/content_blocks';

const renderContentBlocks = async (liquid: Liquid, ctx: Context, fileName: string) => {
  const filePath = join(contentBlocksDirectory, fileName);

  // Read the template file
  let templateContent;
  try {
    templateContent = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    throw new Error(`Could not read file at ${filePath}`);
  }

  // Parse and render the template content
  const template = await liquid.parse(templateContent);
  return liquid.renderer.renderTemplates(template, ctx);
};

const contentBlocksTag: TagImplOptions = {
  parse: function (tagToken: TagToken) {
    //@ts-ignore
    const match = tagToken.value.match(attribute);
    if (!match) {
      //@ts-ignore
      throw new Error(`Illegal token ${tagToken.raw}`);
    }
    this.variable = match[1]; // Extract the variable name
  },
  render: async function (ctx: Context) {
    if (!this.variable) {
      throw new Error(`No variable name found in tag`);
    }

    // Get the variable value from the context
    const fileName = ctx.get(this.variable);
    if (typeof fileName !== 'string') {
      throw new Error(`Variable ${this.variable} is not a string`);
    }

    try {
      const html = await renderContentBlocks(this.liquid, ctx, fileName);
      return html;
    } catch (err) {
      //@ts-ignore
      throw new Error(`Error rendering content blocks: ${err.message}`);
    }
  }
};

export default contentBlocksTag;