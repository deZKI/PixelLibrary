import {Author} from "./authors.interfaces";
import {CommentBase} from "./comment.interfaces";

export interface Tag {
  id: number
  name: string
}

export interface BookInterfaces {
  id: number
  title: string
  thumbnail: string
  authors: Author[]
  rating: number
}

export interface BookDetail extends BookInterfaces {
  tags: Tag[]
  comments: CommentBase[]
  release_date: string
  description: string
  price: number
  page_count: number
  file?: string
}
