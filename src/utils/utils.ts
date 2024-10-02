import {DeepRequired, FieldErrorsImpl, FieldValues, GlobalError} from "react-hook-form";
import {NavigateFunction} from "react-router-dom";
import {ClientValues, User} from "../types/clients.ts";
import { restApi } from '../api/api.ts'
import { IPost, PostsServer } from '../types/posts.ts'
import { IProduct } from '../types/products.ts'

export function returnCorrectAmountSymbols(string = '', amount: number) {
    return string.length > amount ? string.slice(0, amount) + '...' : string
}

export function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function returnCorrectAmountNumbers(num: number, amoutSymbols: number) {
  return +num.toFixed(amoutSymbols)
}


export function scrollToTop() {
  window.scrollTo({top: 0, behavior: "smooth"})
}

export function scrollToTopCallBack(fn: any) {
  window.scrollTo({top: 0, behavior: "smooth"})
  return function () {
    fn()
  }
}

export function checkWritingNum(n: number, isIndex: boolean = false) {
    if(isIndex) n++
    return n < 10 ? `0${n}` : n
}



export const checkFieldsFormAbout = (errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
}) => !!(errors.name || errors.email || errors.message || errors.check);

export const checkFieldsFormLogin = (errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
}) => !!(errors.username || errors.password);



//login
export function timeoutExit(SEANS: number, refreshToken: string, navigate: NavigateFunction, fn: (refreshToken: string) => void, setIsAuth: (isAuth: boolean) => void) {
    const timeout = setTimeout(() => {
        const isWentOn: boolean = confirm('Время авторизации истекло. Вы хотите продолжить сеанс?')
        if(isWentOn) fn(refreshToken)
        else {
            setIsAuth(false)
            navigate('/login')
        }
        clearTimeout(timeout)
    }, SEANS * 1000 * 60)
}

export function createNewClientObject(data: ClientValues) {
    return {
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        phone: data.phone,
        age: Number(data.age),
        address: {
            country: data.country,
            city: data.city
        },
        company: {
            name: data.company,
            title: data.major
        },
        userAgent: data.userAgent,
        ip: data.ip
    }
}

export async function getCurrentUser(id: number, setState: (editUser: User) => void) {
    const response = await restApi.getSingleUser(id)
    setState(response)
}


export function a11yPropsFilter(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export function addReactionUsersAll(id: number, reactions: {likes: number, dislikes: number}, isLiked: boolean, isDisliked: boolean, isAdd: boolean, posts:  PostsServer, setPosts: (posts:  PostsServer) => void) {
    if(isLiked && isAdd || isDisliked && !isAdd) return
    const foundedIndex = posts.posts.findIndex((c) => c.id === id)
    const {posts: postsArray} = posts
    logicAddReaction(isAdd, isDisliked, isLiked, postsArray[foundedIndex], reactions)
    setPosts( {...posts, posts: postsArray})
}
export function addReactionUser(reactions: {likes: number, dislikes: number}, isLiked: boolean, isDisliked: boolean, isAdd: boolean, post: IPost, setPost: (post: IPost) => void) {
    if(isLiked && isAdd || isDisliked && !isAdd) return
    const founded = JSON.parse(JSON.stringify(post))
    logicAddReaction(isAdd, isDisliked, isLiked, founded, reactions)
    setPost(founded)
}

function logicAddReaction(isAdd: boolean, isDisliked: boolean, isLiked: boolean, founded: IPost, reactions: {likes: number, dislikes: number}) {
    if(isAdd && isDisliked) {
        founded.reactions.dislikes = --reactions.dislikes
        founded.isDisliked = false
        founded.reactions.likes = ++reactions.likes
        founded.isLiked = true
    }
    if(!isAdd && isLiked) {
        founded.reactions.likes = --reactions.likes
        founded.isLiked = false
        founded.reactions.dislikes =++reactions.dislikes
        founded.isDisliked = true
    }
    if(isAdd && !isDisliked) {
        founded.reactions.likes = ++reactions.likes
        founded.isLiked = true
    }
    if(!isAdd && !isLiked) {
        founded.reactions.dislikes =++reactions.dislikes
        founded.isDisliked = true
    }
}


export function getDateToday() {
    const date = new Date()
    return {
        date: checkWritingNum(date.getDate()),
        month: checkWritingNum(+date.getMonth() + 1),
        year: date.getFullYear()
    }
}

export function getCorrectDate(date: string) {
    const added = new Date(date)
    return `${checkWritingNum(added.getDate())}.${checkWritingNum(+added.getMonth() + 1)}.${added.getFullYear()}    ${checkWritingNum(added.getHours())}:${checkWritingNum(added.getMinutes())}:${checkWritingNum(added.getSeconds())}`
}


export const createProduct = (data: IProduct) => {
    return {	
        inBasket: false,
        id: Date.now(),
        availabilityStatus: '',
        description: data.description,
        title: data.title,
        amount: Number(data.amount),
        brand: data.brand,
        minimumOrderQuantity: 1,
        tags: [''],
        sku: '',
        category: data.category,
        meta: {
            barcode: '3417342002384',
            createdAt: String(new Date()),
            qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
            updatedAt: String(new Date())
        },
        stock: Number(data.amount),
        rating: 4.5,
        weight: Number(data.weight),
        dimensions: {
            depth: Number(data.dimensions.depth),
            width: Number(data.dimensions.width),
            height: Number(data.dimensions.height)
        },
        reviews: [],
        price: Number(data.price),
        discountPercentage: Number(data.discountPercentage),
        returnPolicy: data.returnPolicy,	
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        images: ['https://cdn.pixabay.com/photo/2017/03/02/19/46/camera-2112207_1280.png'],
        thumbnail: 'https://cdn.pixabay.com/photo/2017/03/02/19/46/camera-2112207_1280.png',
    }
}