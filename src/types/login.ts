import React from "react";
import {User} from "./clients.ts";

export type LoginValues = {
    username: string,
    password: string
}

export type Admin = {
    id: number,
    address: {
        address: string,
        city: string,
        coordinates: {
            lat: number,
            lng: number
        },
        country: string,
        postalCode: string,
        state: string,
        stateCode: string
    },
    age: number,
    bank: {
        cardExpire: string,
        cardNumber: string,
        cardType: string,
        currency: string,
        iban: string
    },

    birthDate: string,
    bloodGroup: string,
    company: {
        title: string,
        department: string,
        name: string
        address: {
            address: string,
            city: string,
            coordinates: {
                lat: number,
                lng: number
            },
            country: string,
            postalCode: string,
            state: string,
            stateCode: string
        }
    },

    crypto: {
        coin: string,
        network: string,
        wallet: string
    },

    ein: string,
    email: string,
    eyeColor: string,
    firstName: string,
    gender: string,
    hair: {
        color: string,
        type: string
    },
    height: number,
    image: string,
    ip: string,
    lastName: string,
    macAddress: string,
    maidenName: string,
    password: string,
    phone: string,
    role: string,
    ssn: string,
    university: string,
    userAgent: string,
    username: string,
    weight: number
}

export type DataAdmin = {
    SEANS: number,
    data: Admin
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type AdminInfoProps = {
    user: User
}

export interface ICartProduct {
    discountPercentage: number,
    discountedTotal: number,
    id: number,
    price: number,
    quantity: number,
    thumbnail: string,
    title: string,
    total: number
}

export interface ICart {
    id: number,
    discountedTotal: number,
    total: number,
    totalProducts: number,
    totalQuantity: number,
    userId: number,
    products: ICartProduct[]
}

export interface CartServer {
    limit: number,
    skip: number,
    total: number,
    carts: ICart[]
}