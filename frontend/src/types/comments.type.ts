import {CommentUserType} from "./comment-user.type";
import {CommentActionType} from "./comment-action.type";

export type CommentsType = {
  id: string;
  text: string;
  date: string;
  likesCount: number;
  dislikesCount: number;
  user: CommentUserType;
  userAction?: CommentActionType | null;
}
