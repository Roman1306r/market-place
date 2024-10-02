import React, { useState } from 'react';
import {Children, GlobalContent} from "../../types/context.ts";
import {Admin} from "../../types/login.ts";
import {initialValues} from "../../data/data.ts";
import { IPayment, IProduct } from '../../types/products.ts'

export const AppContext = React.createContext<GlobalContent>({
  isAuth: false,
  setIsAuth: () => {},
  preloader: true,
  setPreloader: () => {},
  basket: initialValues.initialBasket,
  setBasket: () => {},
  admin: initialValues.initialUser,
  setAdmin: () => {},
  path: '',
  setPath: () => {},
  favorite: initialValues.initialFavorite,
  setFavorite: () => {},
  toPayment: initialValues.initialPayment,
  setToPayment: () => {}
});

export const AppProvider =({children} : Children) => {
  const [preloader, setPreloader] = useState<boolean>(true)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [basket, setBasket] = useState<IProduct[]>(initialValues.initialBasket)
  const [favorite, setFavorite] = useState<IProduct[]>(initialValues.initialFavorite)
  const [toPayment, setToPayment] = useState<IPayment>(initialValues.initialPayment)
  const [admin, setAdmin] = useState<Admin>(initialValues.initialUser)
  const [path, setPath] = useState<string>('')

  return (<AppContext.Provider
            value={{isAuth, setIsAuth, preloader, setPreloader, basket, setBasket, admin, setAdmin, path, setPath, favorite, setFavorite, toPayment, setToPayment}}>{children}
        </AppContext.Provider>)
}
