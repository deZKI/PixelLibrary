import {Author} from "./authors.interfaces";
import {CommentBase} from "./comment.interfaces";

export interface Tag {
  id: number
  name: string
}

export interface Book {
  id: number
  title: string
  thumbnail: string
  authors: Author[]
  rating: number
  price: number
}

export interface BookDetail extends Book {
  tags: Tag[]
  comments: CommentBase[]
  release_date: string
  description: string
  page_count: number
  file?: string
  in_basket?: boolean
  in_wishes?: boolean
}

export interface UserItemResponse {
  id: number
  book: Book
}
