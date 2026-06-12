import {CommentActionType} from "./comment-action.type";

export type CommentUserActionType = {
  comment: string;
  action: CommentActionType;
}
