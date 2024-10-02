
export interface ServerProducts {
	total: number,
	limit: number,
	skip: number,
	products: IProduct[]
}


export type ProductProps = {
	product: IProduct
  }
  
  
export interface IProduct {
	amount: number,
	inBasket: boolean,
	id: number,
	availabilityStatus: string,
	brand: string,
	category: string,
	description: string,
	dimensions: {
		depth: number,
		width: number,
		height: number
	},
	discountPercentage: number,
	images: string[],
	meta: {
		barcode: string,
		createdAt: string,
		qrCode: string,
		updatedAt: string
	},
	minimumOrderQuantity: number,
	price: number,
	rating: number,
	returnPolicy: string,
	reviews: {
		comment: string,
		date: string,
		rating: number,
		reviewerEmail: string,
		reviewerName: string
	}[],
	shippingInformation: string,
	sku: string,
	stock: number,
	tags: string[],
	thumbnail: string,
	title: string,
	warrantyInformation: string,
	weight: number
}

export interface ProductPageProps {
	setProductTitle: (productTitle: string) => void
	setDeleted: (deleted: number) => void
}

export interface IRating {
	average: number,
	amount: number,
	isCompleted: boolean,
	isCollapse: boolean,
	reviews: IReview[] 
}

export interface IReview {
	rating: number,
	comment: string,
	date: string,
	reviewerName: string,
	reviewerEmail: string
}

export interface ReviewProps {
	rev: IReview,
	rating: IRating
	setRating: (rating: IRating) => void
}

export interface BasketProps {
	product: IProduct,
	i: number,
	deleteProduct: (id: number) => void
}

export interface CatalogSearchProps {
	seacrhParams: SearchParams,
	setSearchParams: (seacrhParams: SearchParams) => void,
	setIsShrink: (isShrink: boolean) => void
}

interface SearchParams {
	search: string,
	sortBy: string
}

export interface FieldsParams {
	stock: number,
	price: number,
	title: string
}



export interface IPayment {
	products: IProduct[],
	delivery: string | number
}