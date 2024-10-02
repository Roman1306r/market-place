import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import {checkFieldsFormAbout} from "../../../utils/utils.ts";
import {FormValues} from "../../../types/about.ts";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { m } from 'framer-motion'
import { cardVariants, cardVariants3, variantDuration } from '../../../variants/variants.ts'

const AboutForm = () => {

    const {t} = useTranslation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const [open, setOpen] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = useCallback((_data: FormValues) => {
        setOpen(true);
        reset()
    }, [])
    
    return (
            <article className='about__form'>
                <div className='about__form-desc'>
                    <m.h2
                        variants={cardVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                    >{t('aboutFormTitle')}</m.h2>
                    <m.p
                        variants={variantDuration}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                    >{t('aboutFormDesc')}</m.p>
                </div>
                <Dialog
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						sx={{cursor: 'pointer'}}
						>
							<DialogTitle id="alert-dialog-title">
                                {t('successAboutForm')}
                            </DialogTitle>
                            <DialogActions>
                                <Button variant='contained' color='success' onClick={() => setOpen(false)}>{t('close')}</Button>
                            </DialogActions>	
				</Dialog>
                <m.form 
                    variants={cardVariants3}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    className="about__form-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="about__form-body-error">
                        <Collapse in={checkFieldsFormAbout(errors)}>
                            <Alert variant="filled" severity="error">{t('required')}</Alert>
                        </Collapse>
                    </div>
                    <div className='about__form-body-container'>
                        <TextField focused sx={{color: 'white'}} fullWidth {...register("name", {required: true, maxLength: 80})} color="success"
                               id="outlined-basic" label={<span>{t('name') + '*'}</span>} variant="outlined"/>
                        <TextField focused fullWidth  {...register("email", {required: true, pattern: /^\S+@\S+$/i})} color="success"
                               id="outlined-basic" label={<span>{'Email*'}</span> } variant="outlined"/>
                    </div>
                    <TextField multiline rows={4} className='message' focused fullWidth  {...register("message", {required: true, maxLength: 400})} color="success"
                               id="outlined-basic" label={<span style={{color: 'white'}}>{t('message') + '*'}</span> } variant="outlined"/>
                    <div className='about__form-body-check'>
                        <Checkbox {...register("check", {required: true})} defaultChecked color="success" />
                        <p>{t('agreeAbout')}</p>
                    </div>
                    <input value={t('submit')} className='about__form-body-submit' type="submit" />
                </m.form>
            </article>);
}
export default AboutForm;