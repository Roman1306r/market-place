import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { useState } from "react";
import { a11yProps } from "../../../../utils/utils";
import TabPanel from "../TabPanel/TabPanel.tsx";
import Basic from "../Basic.tsx";
import Adress from "../Adress.tsx";
import Appearance from "../Appearance.tsx";
import Company from "../Company.tsx";
import Private from "../Private.tsx";
import Finans from "../Finans.tsx";
import useCustomContext from "../../../../hooks/useCustomContext.ts";
import Cart from '../Cart.tsx'
import Add from '../Add.tsx'
import Delivery from '../Delivery.tsx'

const BoxContainer = () => {

    const { t } = useTranslation();
    const [value, setValue] = useState(0);
    const {admin} = useCustomContext()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    const scrollDown = () => window.innerWidth < 768 ? window.scrollTo({top: 400, behavior: 'smooth'}) : false
    
    return (<Box className="login__me-box" sx={{ display: 'flex', minHeight: 200, marginBottom: '60px' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    className='login__me-tabs'
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', flex: '0 0 20%', marginTop: '30px', justifyContent: 'flex-start' }}
                >
                    <Tab onClick={scrollDown} label={t('basicInfo')} {...a11yProps(0)} />
                    <Tab onClick={scrollDown} label={t('address')} {...a11yProps(1)} />
                    <Tab onClick={scrollDown} label={t('appearance')} {...a11yProps(2)} />
                    <Tab onClick={scrollDown} label={t('company')} {...a11yProps(3)} />
                    <Tab onClick={scrollDown} label={t('private')} {...a11yProps(4)} />
                    <Tab onClick={scrollDown} label={t('finans')} {...a11yProps(5)} />
                    <Tab onClick={scrollDown} label={t('purchases')} {...a11yProps(6)} />
                    <Tab onClick={scrollDown} label={t('newProduct')} {...a11yProps(7)} />
                    <Tab onClick={scrollDown} label={t('delivery')} {...a11yProps(8)} />
                </Tabs>
                <TabPanel value={value} index={0}><Basic user={admin} /></TabPanel>
                <TabPanel value={value} index={1}><Adress user={admin} /></TabPanel>
                <TabPanel value={value} index={2}><Appearance user={admin} /></TabPanel>
                <TabPanel value={value} index={3}><Company user={admin} /></TabPanel>
                <TabPanel value={value} index={4}><Private user={admin} /></TabPanel>
                <TabPanel value={value} index={5}><Finans user={admin} /></TabPanel>
                <TabPanel value={value} index={6}><Cart /></TabPanel>
                <TabPanel value={value} index={7}><Add /></TabPanel>
                <TabPanel value={value} index={8}><Delivery /></TabPanel>
            </Box>);
}
export default BoxContainer;