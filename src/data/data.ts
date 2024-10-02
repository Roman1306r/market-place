import image1 from './../assets/main/image1.jpg'
import image2 from './../assets/main/image2.jpg'
import image3 from './../assets/main/image3.jpg'
import image4 from './../assets/main/image4.jpg'
import image5 from './../assets/main/image5.jpg'
import image6 from './../assets/main/image6.jpg'
import image7 from './../assets/main/image7.jpg'
import image8 from './../assets/main/image8.jpg'
import image9 from './../assets/main/image9.jpg'
import image10 from './../assets/main/image10.jpg'
import image11 from './../assets/main/image11.jpg'
import image12 from './../assets/main/image12.jpg'
import image13 from './../assets/main/image13.jpg'
import image14 from './../assets/main/image14.jpg'
import image15 from './../assets/main/image15.jpg'
import image16 from './../assets/main/image16.jpg'
import image17 from './../assets/main/image17.jpg'
import image18 from './../assets/main/image18.jpg'
import image19 from './../assets/main/image19.jpg'
import image20 from './../assets/main/image20.jpg'
import image21 from './../assets/main/image21.jpg'
import image22 from './../assets/main/image22.jpg'
import image23 from './../assets/main/image23.jpg'
import image24 from './../assets/main/image24.jpg'
import SpaIcon from '@mui/icons-material/Spa';
import GirlIcon from '@mui/icons-material/Girl';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import ChairIcon from '@mui/icons-material/Chair';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LaptopIcon from '@mui/icons-material/Laptop';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import WatchIcon from '@mui/icons-material/Watch';
import NetworkWifi2BarIcon from '@mui/icons-material/NetworkWifi2Bar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Github, Mail, Phone } from 'lucide-react'


export const navHeader = [
    {
        id: 1,
        title: 'Каталог',
        link: '/catalog',
        isPopover: true
    },
    {
        id: 2,
        title: 'О компании',
        link: '/about',
        isPopover: false
    },
    {
        id: 3,
        title: 'Клиенты',
        link: '/clients',
        isPopover: false
    },
    {
        id: 4,
        title: 'Статьи',
        link: '/posts',
        isPopover: false
    },
    {
        id: 5,
        title: 'Контакты',
        link: '/contacts',
        isPopover: false
    },
]

export const contacts = [
    {
        id: 1,
        title: 'phone',
        body: '+375292999827',
        option: 'phone'
    },
    {
        id: 2,
        title: 'Email',
        body: 'ivanovroc@gmail.com',
        option: 'email'
    },
    {
        id: 3,
        title: 'GitHub',
        body: 'Roman1306r',
        option: 'git'
    },
    {
        id: 4,
        title: 'city',
        body: 'vtb',
        option: null
    },
    {
        id: 5,
        title: 'country',
        body: 'rb',
        option: null
    }
]
export const main = {
    sliderInfo: [
        {
            id: 1,
            title: 'beauty',
            image: image1,
            sale: 10,
            langId: 'sliderBeauty',
            description: 'Откройте мир настоящей красоты с нашими уникальными продуктами! Мечтаете о сияющей коже, роскошных волосах и идеальном макияже? Мы отбираем только лучшие товары с натуральными ингредиентами и эффективными формулами. Нас выбирают за качество.'
        },
        {
            id: 2,
            title: 'fragrances',
            image: image2,
            sale: 7,
            langId: 'sliderFragrances',
            description: 'Откройте мир утонченных ароматов с нашими эксклюзивными парфюмами! Будь то нежные цветочные ноты, чувственные восточные ароматы или свежие цитрусовые аккорды — у нас найдется парфюм для каждого случая и настроения. Выбирайте из коллекции, созданной лучшими парфюмерами мира, и наслаждайтесь долгим звучанием каждого аромата.'
        },
        {
            id: 3,
            title: 'furniture',
            image: image3,
            sale: 5,
            langId: 'sliderFurniture',
            description: 'Преобразите свой дом с нашей стильной и качественной мебелью! Наши изделия сочетают в себе современный дизайн, удобство и долговечность, создавая идеальную атмосферу уюта и комфорта. Закажите сейчас и наслаждайтесь стильной обстановкой каждый день!'
        },
        {
            id: 4,
            title: 'groceries',
            image: image4,
            sale: 15,
            langId: 'sliderGroceries',
            description: 'Мы предлагаем только самое лучшее: от органических овощей и фруктов до свежего мяса и молочных изделий, которые придадут вашим блюдам неповторимый вкус и пользу. Наши продукты проходят строгий контроль качества, обеспечивая вам и вашим близким здоровое и вкусное питание.'
        },
        {
            id: 5,
            title: 'home-decoration',
            image: image5,
            sale: 8,
            langId: 'sliderHomeDecoration',
            description: 'Каждый элемент создан, чтобы добавить вашему интерьеру неповторимый шарм и уют. Наши украшения помогут создать атмосферу, в которой вам будет приятно находиться каждый день. Закажите сейчас и превратите свой дом в место, где красота встречается с комфортом!'
        },
        {
            id: 6,
            title: 'kitchen-accessories',
            image: image6,
            sale: 20,
            langId: 'sliderKitchenAccessories',
            description: 'Обновите вашу кухню с нашими стильными и функциональными аксессуарами! Мы предлагаем широкий ассортимент высококачественных изделий, которые превратят ваш кулинарный процесс в удовольствие. Делайте каждый момент на кухне особенным с продукцией, которая объединяет дизайн и практичность.'
        },
        {
            id: 7,
            title: 'laptops',
            image: image7,
            sale: 13,
            langId: 'sliderLaptops',
            description: 'Откройте мир безграничных возможностей с нашими современными ноутбуками! Мы предлагаем лучшие модели, которые сочетают в себе мощность, стиль и инновации. Наши ноутбуки идеально подходят для работы, учебы и развлечений, обеспечивая потрясающую производительность и надежность.'
        },
        {
            id: 8,
            title: 'mens-shirts',
            image: image8,
            sale: 30,
            langId: 'sliderMensShirts',
            description: 'Пополните свой гардероб стильными и элегантными мужскими рубашками, которые подчеркнут вашу индивидуальность и безупречный вкус. Наши рубашки изготовлены из высококачественных тканей, обеспечивающих комфорт и долговечность.'
        },
        {
            id: 9,
            title: 'mens-shoes',
            image: image9,
            sale: 33,
            langId: 'sliderMensShoes',
            description: 'Каждая пара обуви создана с вниманием к деталям, чтобы обеспечить вам безупречный стиль и удобство в любой ситуации. Высококачественные материалы, элегантный дизайн и превосходная отделка делают наши туфли идеальными для офиса, деловых встреч и особых мероприятий.'
        },
        {
            id: 10,
            title: 'mens-watches',
            image: image10,
            sale: 23,
            langId: 'sliderMensWatches',
            description: 'Добавьте штрих элегантности и статусности в свой образ с нашими мужскими часами! Выбирайте мужские часы, которые станут не просто аксессуаром, а отражением вашего статуса и стиля.'
        },
        {
            id: 11,
            title: 'mobile-accessories',
            image: image11,
            sale: 13,
            langId: 'sliderMobileAccessories',
            description: 'Выберите из широкого ассортимента цветов и дизайнов, чтобы подчеркнуть свою индивидуальность и сделать использование телефона еще более комфортным и приятным. Откройте для себя новые возможности с аксессуарами, которые дополнят и улучшат ваш мобильный опыт.'
        },
        {
            id: 12,
            title: 'motorcycle',
            image: image12,
            sale: 40,
            langId: 'sliderMotorcycle',
            description: 'Почувствуйте силу и динамику на дороге, наслаждайтесь превосходным управлением и безопасностью. Выбирайте мотоцикл, который станет вашим верным спутником в покорении новых горизонтов и придаст каждому дню неповторимый драйв.'
        },
        {
            id: 13,
            title: 'skin-care',
            image: image13,
            sale: 10,
            langId: 'sliderSkinCare',
            description: 'Откройте секрет сияющей и здоровой кожи с нашими премиальными средствами по уходу за кожей! Наши продукты разработаны с использованием новейших технологий и натуральных ингредиентов, чтобы подарить вашей коже безупречное увлажнение, питание и защиту.'
        },
        {
            id: 14,
            title: 'smartphones',
            image: image14,
            sale: 18,
            langId: 'sliderSmartphones',
            description: 'Мы предлагаем широкий выбор моделей, которые удовлетворят любые ваши потребности — от флагманских устройств с мощными процессорами и невероятными камерами до доступных смартфонов с отличным функционалом и надежностью.'
        },
        {
            id: 15,
            title: 'sports-accessories',
            image: image15,
            sale: 33,
            langId: 'sliderSportsAccessories',
            description: 'Повышайте эффективность тренировок, отслеживайте прогресс и наслаждайтесь каждым моментом своей активности с продукцией, которая объединяет стиль и функциональность. С нашими аксессуарами для спорта вы всегда будете на шаг впереди!'
        },
        {
            id: 16,
            title: 'sunglasses',
            image: image16,
            sale: 23,
            langId: 'sliderSunglasses',
            description: 'Наши очки — это не просто аксессуар, а инвестиция в ваше зрение и стиль. Благодаря высококачественным линзам с защитой от ультрафиолета и модным оправам, они подойдут как для работы, так и для отдыха. Они подчеркнут вашу индивидуальность и обеспечат комфортное зрение в любых условиях.'
        },
        {
            id: 17,
            title: 'tablets',
            image: image17,
            sale: 10,
            langId: 'sliderTablets',
            description: 'Подберите лучший вариант планшета для вас - гарантия от 3 месяцев, AMOLED и RETINA дисплеи, премиум сегмент.'
        },
        {
            id: 18,
            title: 'tops',
            image: image18,
            sale: 5,
            langId: 'sliderTops',
            description: 'Наши топы подчеркивают достоинства вашей фигуры, оставаясь при этом легкими и удобными в носке. Изготовленные из высококачественных материалов, наши топы отлично подойдут как для повседневной носки, так и для особых случаев.'
        },
        {
            id: 19,
            title: 'vehicle',
            image: image19,
            sale: 15,
            langId: 'sliderVehicle',
            description: 'Просторный салон, продуманные детали и современная мультимедийная система делают каждую поездку настоящим удовольствием. Этот автомобиль создан для тех, кто ценит стиль, качество и надежность.'
        },
        {
            id: 20,
            title: 'womens-bags',
            image: image20,
            sale: 19,
            langId: 'sliderWomensBags',
            description: 'Просторные и функциональные, наши сумки позволят вам иметь под рукой все необходимое, будь то деловая встреча или прогулка по городу. Разнообразие моделей и цветов удовлетворит самые изысканные вкусы.'
        },
        {
            id: 21,
            title: 'womens-dresses',
            image: image21,
            sale: 25,
            langId: 'sliderWomensDresses',
            description: 'Будь то романтический вечер или деловая встреча, в нашем ассортименте вы найдете платье, которое идеально подойдет именно вам. Высококачественные ткани и безупречный крой обеспечат комфорт и уверенность в каждом движении. '
        },
        {
            id: 22,
            title: 'womens-jewellery',
            image: image22,
            sale: 12,
            langId: 'sliderWomensJewellery',
            description: 'С нашими украшениями вы всегда будете в центре внимания, ощущая себя уверенно и привлекательно. Выберите то, что подчеркнет вашу красоту и добавит шарма в каждый день!'
        },
        {
            id: 23,
            title: 'womens-shoes',
            image: image23,
            sale: 22,
            langId: 'sliderWomensShoes',
            description: 'Каждая пара создана с учетом последних модных тенденций, чтобы вы могли чувствовать себя уверенно и выглядеть безупречно в любой ситуации. Наша обувь подчеркнет вашу индивидуальность и станет незаменимым элементом вашего гардероба.'
        },
        {
            id: 24,
            title: 'womens-watches',
            image: image24,
            sale: 5,
            langId: 'sliderWomensWatches',
            description: 'Будь то классические часы для деловых встреч или изысканные модели для вечерних выходов, они подчеркнут вашу индивидуальность и добавят изюминку любому образу. Выбирая наши женские часы, вы подчеркиваете свой вкус и уверенность в себе.'
        },
    ],
    aboutInfo: [
        {
            id: 1,
            num: 4,
            desc: 'На рынке боле 4 лет',
            langId: 'howYears'
        },
        {
            id: 2,
            num: 200,
            desc: 'Более 200 товаров',
            langId: 'howGaranty'
        },
        {
            id: 3,
            num: 3,
            desc: 'Доставка до 3 дней',
            langId: 'howDiverly'
        },
        {
            id: 4,
            num: 24,
            desc: '24 категории товаров',
            langId: 'howСategory'
        },
    ]
}
export const catalog = {
    categories: [
        {
            id: 1,
            title: 'beauty',
            amount: 5,
            icon: SpaIcon
        },
        {
            id: 2,
            title: 'fragrances',
            amount: 5,
            icon: SanitizerIcon
        },
        {
            id: 3,
            title: 'furniture',
            amount: 5,
            icon: ChairIcon
        },
        {
            id: 4,
            title: 'groceries',
            amount: 27,
            icon: LunchDiningIcon
        },
        {
            id: 5,
            title: 'home-decoration',
            amount: 5,
            icon: FormatPaintIcon
        },
        {
            id: 6,
            title: 'kitchen-accessories',
            amount: 30,
            icon: RestaurantIcon
        },
        {
            id: 7,
            title: 'laptops',
            amount: 5,
            icon: LaptopIcon
        },
        {
            id: 8,
            title: 'mens-shirts',
            amount: 5,
            icon: CheckroomIcon
        },
        {
            id: 9,
            title: 'mens-shoes',
            amount: 5,
            icon: DoNotStepIcon
        },
        {
            id: 10,
            title: 'mens-watches',
            amount: 6,
            icon: WatchIcon
        },
        {
            id: 11,
            title: 'mobile-accessories',
            amount: 14,
            icon: NetworkWifi2BarIcon
        },
        {
            id: 12,
            title: 'motorcycle',
            amount: 5,
            icon: TwoWheelerIcon
        },
        {
            id: 13,
            title: 'skin-care',
            amount: 3,
            icon: GirlIcon
        },
        {
            id: 14,
            title: 'smartphones',
            amount: 16,
            icon: StayCurrentPortraitIcon
        },
        {
            id: 15,
            title: 'sports-accessories',
            amount: 17,
            icon: SportsBasketballIcon
        },
        {
            id: 16,
            title: 'sunglasses',
            amount: 5,
            icon: WbSunnyIcon
        },
        {
            id: 17,
            title: 'tablets',
            amount: 3,
            icon: TabletMacIcon
        },
        {
            id: 18,
            title: 'tops',
            amount: 5,
            icon: CheckroomIcon
        },
        {
            id: 19,
            title: 'vehicle',
            amount: 5,
            icon: DirectionsCarIcon
        },
        {
            id: 20,
            title: 'womens-bags',
            amount: 5,
            icon: ShoppingBagIcon
        },
        {
            id: 21,
            title: 'womens-dresses',
            amount: 5,
            icon: CheckroomIcon
        },
        {
            id: 22,
            title: 'womens-jewellery',
            amount: 3,
            icon: DiamondIcon
        },
        {
            id: 23,
            title: 'womens-shoes',
            amount: 5,
            icon: DoNotStepIcon
        },
        {
            id: 24,
            title: 'womens-watches',
            amount: 5,
            icon: WatchIcon
        },
    ],
}

export const payment = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false
};



export const delivery = [
    {
        id: 1, 
        langTitle: 'zoneDelivery',
        sum1: 'to300',
        sum2: 'from300to1000',
        sum3: 'from1000',
    },
    {
        id: 2, 
        langTitle: 'vtbRegion',
        sum1: 25,
        sum2: 'free',
        sum3: 'free',
    },
    {
        id: 3, 
        langTitle: 'mskRegion',
        sum1: 50,
        sum2: 30,
        sum3: 'free',
    },
    {
        id: 4, 
        langTitle: 'mogRegion',
        sum1: 50,
        sum2: 30,
        sum3: 'free'
    },
    {
        id: 5, 
        langTitle: 'grodRegion',
        sum1: 50,
        sum2: 30,
        sum3: 'free'
    },
    {
        id: 6, 
        langTitle: 'brestRegion',
        sum1: 70,
        sum2: 50,
        sum3: 'free'
    },
    {
        id: 7, 
        langTitle: 'gomRegion',
        sum1: 70,
        sum2: 50,
        sum3: 'free'
    },
    {
        id: 8, 
        langTitle: 'pickup',
        sum1: 'free',
        sum2: 'free',
        sum3: 'free',
    }
]

export const initialValues = {
    initialUser: {
        id: 1,
        address: {
            address: '',
            city: '',
            coordinates: {
                lat: 1,
                lng: 1
            },
            country: '',
            postalCode: '',
            state: '',
            stateCode: ''
        },
        age: 1,
        bank: {
            cardExpire: '',
            cardNumber: '',
            cardType: '',
            currency: '',
            iban: ''
        },

        birthDate: '',
        bloodGroup: '',
        company: {
            title: '',
            department: '',
            name: '',
            address: {
                address: '',
                city: '',
                coordinates: {
                    lat: 1,
                    lng: 1
                },
                country: '',
                postalCode: '',
                state: '',
                stateCode: ''
            }
        },

        crypto: {
            coin: '',
            network: '',
            wallet: ''
        },

        ein: '',
        email: '',
        eyeColor: '',
        firstName: '',
        gender: '',
        hair: {
            color: '',
            type: ''
        },
        height: 1,
        image: '',
        ip: '',
        lastName: '',
        macAddress: '',
        maidenName: '',
        password: '',
        phone: '',
        role: '',
        ssn: '',
        university: '',
        userAgent: '',
        username: '',
        weight: 1
    },
    initialBasket: [],
    initialFavorite: [],
    initialPayment: {
        products: [],
        delivery: ''
    },
    initialUsersServer: {
        users: [],
        total: 0,
        limit: 0,
        skip: 0
    },
    initialTag: [],
    initialPosts: {
        total: 0,
        skip: 0,
        limit: 0,
        posts: []
    },
    initialPost: {
        id: 0,
        title: '',
        reactions: {
            likes: 0,
            dislikes: 0
        },
        userId: 0,
        views: 0,
        tags: [],
        body: '',
        isLiked: false,
        isDisliked: false
    },
    initialComments: {
        total: 0,
        skip: 0,
        limit: 0,
        comments: []
    }
}


export const filterLabels = {
    gender: ['female', 'male'],
    role: ['admin', 'moderator', 'user'],
    city: ['Phoenix', 'Houston', 'Washington', 'Seattle', 'Jacksonville', 'Fort Worth', 'Indianapolis', 'San Antonio', 'New York', 'Denver', 'Columbus', 'San Jose', 'San Diego', 'Chicago', 'Philadelphia', 'Dallas', 'Los Angeles', 'San Francisco', 'Charlotte', 'Austin'],
    department: ['Engineering', 'Support', 'Research and Development', 'Human Resources', 'Product Management', 'Marketing', 'Services', 'Accounting', 'Training', 'Legal', 'Sales', 'Business Development']
}


export const actionsSpeedDial = [
    { icon: Github, name: 'Github', link: 'https://github.com/Roman1306r', isNewTab: true },
    { icon: Mail, name: 'Email', isNewTab: false },
    { icon: Phone, name: 'phone', isNewTab: false }
];

