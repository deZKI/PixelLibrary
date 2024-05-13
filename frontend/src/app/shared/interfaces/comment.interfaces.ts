import {User} from "./user.interfaces";

export interface CommentBase {
  id: number
  user: User
  text: string
  created_at: string
  edited_at: string
  rating: number
  edited: boolean
}


export interface BookComment extends CommentBase {

}
