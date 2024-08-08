import AssignTag from './assign';
import ForTag from './for';
import CaptureTag from './capture';
import CaseTag from './case';
import CommentTag from './comment';
import IncludeTag from './include';
import RenderTag from './render';
import DecrementTag from './decrement';
import CycleTag from './cycle';
import IfTag from './if';
import IncrementTag from './increment';
import LayoutTag from './layout';
import BlockTag from './block';
import RawTag from './raw';
import TablerowTag from './tablerow';
import UnlessTag from './unless';
import BreakTag from './break';
import ContinueTag from './continue';
import EchoTag from './echo';
import LiquidTag from './liquid';
import InlineCommentTag from './inline-comment';
import type { TagClass } from '../template/tag';
import ContentBlockTag from './content_block';
export declare const tags: Record<string, TagClass>;
export { ContentBlockTag, AssignTag, ForTag, CaptureTag, CaseTag, CommentTag, IncludeTag, RenderTag, DecrementTag, IncrementTag, CycleTag, IfTag, LayoutTag, BlockTag, RawTag, TablerowTag, UnlessTag, BreakTag, ContinueTag, EchoTag, LiquidTag, InlineCommentTag };
