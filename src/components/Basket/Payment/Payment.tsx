import { useCallback, useEffect, useRef, useState } from 'react'
import Card from './Card'
import CForm from './CForm'
import './style.scss'
import useCustomContext from '../../../hooks/useCustomContext'
import { Alert, Button, ButtonGroup, Collapse, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { Check, MoveLeft } from 'lucide-react'
import { scrollToTopCallBack } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'
import { payment } from '../../../data/data'
import { useTranslation } from 'react-i18next'

const Payment = () => {
	
	const { t } = useTranslation();
	const {toPayment, setPreloader} = useCustomContext()
	const [sum, setSum] = useState(0);
	const navigate = useNavigate()
	const [state, setState] = useState(payment);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);
    const [isError, setIsError] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if(toPayment.products.length === 1 && !toPayment.products[0].amount) setSum(Number(toPayment.products.reduce((cur, acc) =>  cur + acc.price, 0).toFixed(2)))
		else setSum(Number(toPayment.products.reduce((cur, acc) =>  cur + (acc.price * acc.amount), 0).toFixed(2)))
		window.addEventListener('load', () => toPayment.products.length < 1 ? scrollToTopCallBack(navigate('/basket')) : false)
	}, [])

    const updateStateValues = useCallback(
        (keyName: string | number, value: any) => {
            setState({
                ...state,
                [keyName]: value || payment[keyName as keyof typeof payment]
            });
        },
        [state]
    );

    let formFieldsRefObj: any = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef(),
        cardCvv: useRef()
    };

    let focusFormFieldByKey = (key: string) => {
        formFieldsRefObj[key as keyof typeof formFieldsRefObj].current.focus();
    };

    let cardElementsRef = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef()
    };

    let onCardFormInputFocus = (_event: any, inputName: string) => {
        const refByName: any = cardElementsRef[inputName as keyof typeof cardElementsRef];
        setCurrentFocusedElm(refByName);
    };

    let onCardInputBlur = useCallback(() => {
        setCurrentFocusedElm(null);
    }, []);

	function pay() {
		if(!state.cardMonth || !state.cardYear || state.cardCvv.length < 3 || state.cardHolder.length < 3 || state.cardNumber.includes('#') || state.cardNumber.length < 19) return setIsError(true)
		if(isError) setIsError(false)
		setPreloader(true)
		return new Promise((resolve, _reject) => {
				setTimeout(() => {
					setOpen(true)
				  	setPreloader(false);
					resolve(true)
				}, 3000)
		});
	}
	
	return (<div className='basket__payment'>
				<h1>{t('pay')}</h1>
				<div className='basket__payment-body'>
					<div className='info'>
						<Alert className='alert' icon={false} severity="success">{toPayment.products.length === 1 ? <>{toPayment.products.length + t('oneGood') + Number(sum) + ' $'}</> : <>{toPayment.products.length + t('manyGoods') + Number(sum) + ' $'}</> }</Alert>
						<Alert className='alert' icon={false} severity="success">{t('delivery')} : <span className="free">{typeof toPayment.delivery === 'string' ? t(String(toPayment.delivery)) : toPayment.delivery + ' $'}</span></Alert>
						<Alert className='alert' icon={false} severity="success">{t('totalSum')} : <span className='free'>{typeof toPayment.delivery === 'number' ? (Number(sum) + Number(toPayment.delivery)).toFixed(2) : sum} $</span></Alert>	
						<div className='info__products'>
							<div className='info__products-item header'>
								<div>№</div>
								<div>{t('nameProduct')}</div>
								<div>{t('amount')}</div>
								<div>{t('priceOne')} </div>
							</div>
							{toPayment.products.map((p, index) => <div className='info__products-item' key={p.id}>
																		<div>{index + 1}</div>
																		<div onClick={() => scrollToTopCallBack(navigate(`/catalog/${p.category}/${p.id}`))}>{p.title}</div>
																		<div>{p.amount || 1}</div>
																		<div>{p.price} $</div>
																	</div> )}
						</div>
					</div>
					<Dialog
								open={open}
								onClose={() => scrollToTopCallBack(navigate('/catalog'))}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
								sx={{cursor: 'pointer'}}
								>
									<DialogTitle id="alert-dialog-title">
										{t('successOrder')}
									</DialogTitle>
									<DialogActions>
										<Button color='inherit' onClick={() => scrollToTopCallBack(navigate('/login'))}>{t('toPA')}</Button>
										<Button variant='contained' color='success' onClick={() => scrollToTopCallBack(navigate('/catalog'))} autoFocus>{t('confirm')}</Button>
									</DialogActions>
					</Dialog>
					<CForm
						cardMonth={state.cardMonth}
						cardYear={state.cardYear}
						onUpdateState={updateStateValues}
						cardNumberRef={formFieldsRefObj.cardNumber}
						cardHolderRef={formFieldsRefObj.cardHolder}
						cardDateRef={formFieldsRefObj.cardDate}
						onCardInputFocus={onCardFormInputFocus}
						onCardInputBlur={onCardInputBlur}
					>
						<Card
							cardNumber={state.cardNumber}
							cardHolder={state.cardHolder}
							cardMonth={state.cardMonth}
							cardYear={state.cardYear}
							cardCvv={state.cardCvv}
							isCardFlipped={state.isCardFlipped}
							currentFocusedElm={currentFocusedElm}
							onCardElementClick={focusFormFieldByKey}
							cardNumberRef={cardElementsRef.cardNumber}
							cardHolderRef={cardElementsRef.cardHolder}
							cardDateRef={cardElementsRef.cardDate}
						></Card>
					</CForm>
				</div>
				<Collapse sx={{margin: '20px 0'}} in={isError}>
					<Alert variant="filled" severity="error">{t('errorValidation')}</Alert>
				</Collapse>
				<ButtonGroup size='large' fullWidth variant="contained" color='success' aria-label="Basic button group">
						<Button sx={{gap: '20px'}} onClick={() => scrollToTopCallBack(navigate('/basket/delivery'))}><MoveLeft /> {t('delivery')}</Button>
						<Button onClick={pay} sx={{gap: '20px'}} >{t('willPay')} <Check /></Button>
				</ButtonGroup>
			</div>);
}
export default Payment;