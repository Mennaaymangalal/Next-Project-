import { PostI } from "./Post";


export interface PostsSliceInitStat{
    posts: PostI[] ;
    postsIsLoading: boolean ;
    post: PostI | null ;
    postIsLoading : boolean ;
} 