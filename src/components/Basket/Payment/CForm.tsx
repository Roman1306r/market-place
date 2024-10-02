import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next'

const currentYear = new Date().getFullYear();

const monthsArr = Array.from({ length: 12 }, (_x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});

const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

const CForm = memo(({
    cardMonth,
    cardYear,
    onUpdateState,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    onCardInputFocus,
    onCardInputBlur,
    cardCvv,
    children
}: any) => {

    const [cardNumber, setCardNumber] = useState('');
	const {t} = useTranslation();

    const handleFormChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
        onUpdateState(name, value);
    };

    const onCardNumberChange = (event: { target: { value: any; name: any } }) => {
        let { value, name } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }
        setCardNumber(cardNumber.trimRight());
        onUpdateState(name, cardNumber);
    };

    const onCvvFocus = () => {
        onUpdateState('isCardFlipped', true);
    };

    const onCvvBlur = () => {
        onUpdateState('isCardFlipped', false);
    };

    return (<div className="card-form">
                <div className="card-list">{children}</div>
                <div className="card-form__inner">
                    <div className="card-input">
                        <label htmlFor="cardNumber" className="card-input__label">
                            {t('cardNumber')}
                        </label>
                        <input
                            type="tel"
                            name="cardNumber"
                            className="card-input__input"
                            autoComplete="off"
                            onChange={onCardNumberChange}
                            maxLength={19}
                            ref={cardNumberRef}
                            onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
                            onBlur={onCardInputBlur}
                            value={cardNumber}
                        />
                    </div>

                    <div className="card-input">
                        <label htmlFor="cardName" className="card-input__label">
                            {t('cartHolder')}
                        </label>
                        <input
                            type="text"
                            className="card-input__input"
                            autoComplete="off"
                            name="cardHolder"
                            maxLength={20}
                            onChange={handleFormChange}
                            ref={cardHolderRef}
                            onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
                            onBlur={onCardInputBlur}
                        />
                    </div>

                    <div className="card-form__row">
                        <div className="card-form__col">
                            <div className="card-form__group">
                                <label
                                    htmlFor="cardMonth"
                                    className="card-input__label"
                                >
                                    {t('expires')}
                                </label>
                                <select
                                    className="card-input__input -select"
                                    value={cardMonth}
                                    name="cardMonth"
                                    onChange={handleFormChange}
                                    ref={cardDateRef}
                                    onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                    onBlur={onCardInputBlur}
                                >
                                    <option value="" disabled>
                                        {t('month')}
                                    </option>

                                    {monthsArr.map((val, index) => (
                                        <option key={index} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="cardYear"
                                    className="card-input__input -select"
                                    value={cardYear}
                                    onChange={handleFormChange}
                                    onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                    onBlur={onCardInputBlur}
                                >
                                    <option value="" disabled>
                                        {t('year')}
                                    </option>

                                    {yearsArr.map((val, index) => (
                                        <option key={index} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-form__col -cvv">
                            <div className="card-input">
                                <label
                                    htmlFor="cardCvv"
                                    className="card-input__label"
                                >
                                    CVV
                                </label>
                                <input
                                    type="tel"
                                    className="card-input__input"
                                    maxLength={3}
                                    autoComplete="off"
                                    name="cardCvv"
                                    onChange={handleFormChange}
                                    onFocus={onCvvFocus}
                                    onBlur={onCvvBlur}
                                    ref={cardCvv}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
})
export default CForm;