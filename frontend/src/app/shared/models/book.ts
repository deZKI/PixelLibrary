import {Author} from "./authors";

export interface Book {
  title: string
  thumbnail: string
  authors: Author[]
  rating: number
}
