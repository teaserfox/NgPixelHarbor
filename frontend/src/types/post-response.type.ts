import {PostType} from "./post.type";

export type PostsResponseType = {
  count: number;
  pages: number;
  items: PostType[];
};
