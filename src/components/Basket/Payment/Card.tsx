import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, memo } from 'react';
import { useTranslation } from 'react-i18next'
import {
    CSSTransition,
    TransitionGroup,
    SwitchTransition
} from 'react-transition-group';
import bg from './../../../assets/payment/cardBg/3.jpeg'
import mastercard from './../../../assets/payment/another/mastercard.png'

const Card = memo(({
    cardHolder,
    cardNumber,
    cardMonth,
    cardYear,
    cardCvv,
    isCardFlipped,
    currentFocusedElm,
    onCardElementClick,
    cardNumberRef,
    cardHolderRef,
    cardDateRef
}: any) => {
    const [style, setStyle] = useState(null);
    const { t } = useTranslation();
    
    const outlineElementStyle = (element: { offsetWidth: any; offsetHeight: any; offsetLeft: any; offsetTop: any }) => {
        return element
            ? {
                  width: `${element.offsetWidth}px`,
                  height: `${element.offsetHeight}px`,
                  transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`
              }
            : null;
    };

    useEffect(() => {
        if (currentFocusedElm) {
            const style: any = outlineElementStyle(currentFocusedElm.current);
            setStyle(style);
        }
    }, [currentFocusedElm]);

    const maskCardNumber = (cardNumber: string) => {
        let cardNumberArr = cardNumber.split('');
        cardNumberArr.forEach((_val, index) => {
            if (index > 4 && index < 14) {
                if (cardNumberArr[index] !== ' ') {
                    cardNumberArr[index] = '*';
                }
            }
        });

        return cardNumberArr;
    };

    return (<div className={'card-item ' + (isCardFlipped ? '-active' : '')}>
                <div className="card-item__side -front">
                    <div
                        className={`card-item__focus ${
                            currentFocusedElm ? `-active` : ``
                        }`}
                        style={style || undefined}
                    />
                    <div className="card-item__cover">
                        <img
                            alt=""
                            src={bg}
                            className="card-item__bg"
                        />
                    </div>
                    <div className="card-item__wrapper">
                        <div className="card-item__top">
                            <div className="card-item__type">
                                <img
                                    alt={'mastercard'}
                                    src={mastercard}
                                    className="card-item__typeImg"
                                />
                            </div>
                        </div>
                        <label
                            className="card-item__number"
                            ref={cardNumberRef}
                            onClick={() => onCardElementClick('cardNumber')}
                        >
                            <TransitionGroup
                                className="slide-fade-up"
                                component="div"
                            >
                                {cardNumber ? (
                                    maskCardNumber(cardNumber).map((val, index) => (
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={250}
                                            key={index}
                                        >
                                            <div className="card-item__numberItem">
                                                {val}
                                            </div>
                                        </CSSTransition>
                                    ))
                                ) : (
                                    <CSSTransition
                                        classNames="slide-fade-up"
                                        timeout={250}
                                    >
                                        <div className="card-item__numberItem">
                                            #
                                        </div>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </label>
                        <div className="card-item__content">
                            <label
                                className="card-item__info"
                                onClick={() => onCardElementClick('cardHolder')}
                                ref={cardHolderRef}
                            >
                                <div className="card-item__holder">{t('cartHolder')}</div>
                                <div className="card-item__name">
                                    <TransitionGroup
                                        component="div"
                                        className="slide-fade-up"
                                    >
                                        {cardHolder === 'FULL NAME' ? (
                                            <CSSTransition
                                                classNames="slide-fade-up"
                                                timeout={250}
                                            >
                                                <div>{t('fullName')}</div>
                                            </CSSTransition>
                                        ) : (
                                            cardHolder
                                                .split('')
                                                .map((val: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined, index: Key | null | undefined) => (
                                                    <CSSTransition
                                                        timeout={250}
                                                        classNames="slide-fade-right"
                                                        key={index}
                                                    >
                                                        <span className="card-item__nameItem">
                                                            {val}
                                                        </span>
                                                    </CSSTransition>
                                                ))
                                        )}
                                    </TransitionGroup>
                                </div>
                            </label>
                            <div
                                className="card-item__date"
                                onClick={() => onCardElementClick('cardDate')}
                                ref={cardDateRef}
                            >
                                <label className="card-item__dateTitle">
                                    {t('expires')}
                                </label>
                                <label className="card-item__dateItem">
                                    <SwitchTransition in-out>
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={200}
                                            key={cardMonth}
                                        >
                                            <span>
                                                {!cardMonth ? 'MM' : cardMonth}{' '}
                                            </span>
                                        </CSSTransition>
                                    </SwitchTransition>
                                </label>
                                /
                                <label
                                    htmlFor="cardYear"
                                    className="card-item__dateItem"
                                >
                                    <SwitchTransition out-in>
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={250}
                                            key={cardYear}
                                        >
                                            <span>
                                                {!cardYear
                                                    ? 'YY'
                                                    : cardYear
                                                        .toString()
                                                        .substr(-2)}
                                            </span>
                                        </CSSTransition>
                                    </SwitchTransition>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-item__side -back">
                    <div className="card-item__cover">
                        <img
                            alt="bg"
                            src={bg}
                            className="card-item__bg"
                        />
                    </div>
                    <div className="card-item__band" />
                    <div className="card-item__cvv">
                        <div className="card-item__cvvTitle">CVV</div>
                        <div className="card-item__cvvBand">
                            <TransitionGroup>
                                {cardCvv.split('').map((_val: any, index: Key | null | undefined) => (
                                    <CSSTransition
                                        classNames="zoom-in-out"
                                        key={index}
                                        timeout={250}
                                    >
                                        <span>*</span>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </div>
                        <div className="card-item__type">
                            <img
                                alt="mastercard"
                                src={mastercard}
                                className="card-item__typeImg"
                            />
                        </div>
                    </div>
                </div>
            </div>);
})
export default Card;