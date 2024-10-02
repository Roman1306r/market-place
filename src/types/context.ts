import {Admin} from "./login.ts";
import { IPayment, IProduct } from './products.ts'

export type Children = {
    children: JSX.Element | JSX.Element[]
}



export type GlobalContent = {
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void,
    preloader: boolean,
    setPreloader: (preloader: boolean) => void,
    basket: IProduct[],
    setBasket: (basket: IProduct[]) => void,
    admin: Admin,
    setAdmin: (admin: Admin) => void,
    path: string,
    setPath: (path: string) => void,
    favorite: IProduct[],
    setFavorite: (favorite: IProduct[]) => void,
    toPayment: IPayment,
    setToPayment: (toPayment: IPayment) => void
}



