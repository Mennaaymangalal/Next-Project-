import { CommentI } from "./Comment"
import { UserI } from "./UserI"

export interface PostI {
    _id: string
    body: string
    image: string
    user: UserI
    createdAt: string
    comments: CommentI[]
    id: string
  }