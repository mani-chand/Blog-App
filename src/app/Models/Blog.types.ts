export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
}

export interface newPost {
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostsResponse {
    filter(arg0: (blog: any) => boolean): PostsResponse;
    posts: Post[];
    total:number;
    skip:number;
    limit:number;
}
