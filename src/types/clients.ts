import React, { ChangeEvent } from "react";

export type User = {
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

export type UsersServer = {
    users: User[],
    total: number,
    limit: number,
    skip: number
}
export type Disabled = {
    btn: boolean,
    all: boolean
}
export type ClientSidebarProps = {
    disabled: Disabled,
    setSuccess: (success: string | null) => void,
    users: UsersServer,
    setUsers: (users: UsersServer) => void,
    switchPage: (event: ChangeEvent<unknown>, page: number) => void,
    pagination: {skip: number, limit: number},
}
export type SearchPageProps = {
    disabled: Disabled,
    setDisabled: (disabled: Disabled) => void
}
export type SearchBodyProps = {
    foundUsers: UsersServer,
    deleteUser: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void,
    isFilter: boolean
}
export type SearchTopProps = {
    req: string,
    setReq: (req: string) => void,
    searchUsers: () => void,
    indicator: number,
    foundUsers: UsersServer,
    open: boolean
}
export type FilterProps = {
    indicator: number,
    foundUsers: UsersServer,
    open: boolean,
    filterUsers: (key: string, value: string, isNested?: boolean | string) => Promise<void>
}

export type UsersProps = {
    users: User[]
}
export type Post = {
    id: number,
    title: string,
    reactions: {
        likes: number,
        dislikes: number
    },
    userId: number,
    views: number,
    tags: string[]
}
export type ClientPostsProps = {
    post: Post[],
}

export type ClientsProps = {
    setUsers: (users: UsersServer) => void,
    users: UsersServer,
    setError: (error: string | null) => void,
    setSuccess: (success: string | null) => void,
}
export type ClientInfoProps = {
    user: User,
    post: Post[],
}

export type FormClientProps = {
    setError: (error: string | null) => void,
    setSuccess: (success: string | null) => void,
    users: User[],
    setDisabled: (disabled: Disabled) => void,
    disabled: Disabled
}

export type ClientValues = {
    firstname: string,
    lastname: string,
    username: string,
    phone: string,
    age: string,
    country: string,
    city: string,
    company: string,
    major: string,
    userAgent: string,
    ip: string
}

export type NewClient = {
    firstName: string,
    lastName: string,
    username: string,
    phone: string,
    age: number | string,
    address: {
        country: string,
        city: string
    },
    company: {
        name: string,
        title: string
    },
    userAgent: string,
    ip: string
}


export interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

export interface ControlProps {
    value: string,
    setValue: (event: React.ChangeEvent<HTMLInputElement>, param: string) => void,
    labels: string[],
    param: string
}

export interface IPropsControl {
    gender: string,
    role: string,
    city: string,
    department: string
}