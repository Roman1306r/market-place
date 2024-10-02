export interface PostsCommentsProps {
	id: number | string | undefined
}

export interface IComment {
	body: string,
	id: number,
	likes: number,
	isLiked: boolean,
	postId: number,
	user: {
		id: number,
		fullName: string,
		username: string
	}
}


export interface CommentsServer {
	total: number,
	limit: number,
	skip: number,
	comments: IComment[]
}

export interface CommValues  {
    comm: string
}
export interface NewComment {
	body: string,
	postId: number,
	userId: number,
}