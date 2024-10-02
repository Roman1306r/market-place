import { IconButtonProps } from '@mui/material'
import { AutocompleteGetTagProps } from '@mui/material'

export interface ITag {
	name: string,
    slug: string,
    url: string
}
export interface PostsServer {
	total: number,
    skip: number,
    limit: number,
	posts: IPost[]
}
export interface TagsProps {
	getPostsByTag: (tag: string) => void
}
export interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

export interface PostAllProps {
    getPostsByTag: (tag: string) => void,
    setPosts: (responce: PostsServer) => void,
    posts: PostsServer
}

export interface IPost {
    id: number,
    title: string,
    reactions: {
        likes: number,
        dislikes: number
    },
    userId: number,
	body: string,
    views: number,
    isLiked: boolean,
    isDisliked: boolean,
    tags: string[]
}
export interface PostProps {
    posts: PostsServer,
    setPosts: (posts: PostsServer) => void,
	post: IPost,
	getPostsByTag: (tag: string) => void,
}
export interface PostOneProps {
    setTitleOpenedPost: (titleOpenedPost: string) => void,
    posts: PostsServer,
    setPosts: (posts: PostsServer) => void,
    getPostsByTag: (tag: string) => void
}

export interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}




export interface SearchValues {
    search: string
}
export interface NewValues {
    title: string,
    desc: string
}
export interface PostsHeaderProps {
    posts: PostsServer,
    setPosts: (posts: PostsServer) => void
}


export interface IPostAdd {
    title: string,
    reactions: {
        likes: number,
        dislikes: number
    },
    userId: number,
	body: string,
    views: number,
    tags: string[]
}

export interface CustomHookProps {
	setTags: (tags: string[]) => void
}

export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
	label: string;
}

export interface PostsSearchProps {
    setIsOpen: (isOpen: boolean) => void
}

export interface PostsNewProps {
    setIsOpen: (isOpen: boolean) => void,
}

export interface PostsSortProps {
    setIsOpen: (isOpen: boolean) => void,
    posts: PostsServer,
    setPosts: (posts: PostsServer) => void
}

export interface DrawerProps {
    foundedPosts: PostsServer,
    setOpenDrawer: (openDrawer: boolean) => void,
    setFoundedPosts: (foundedPosts: PostsServer) => void
}

export interface IPropSort {
    id: boolean,
    views: boolean,
    likes: boolean,
    dislikes: boolean
}