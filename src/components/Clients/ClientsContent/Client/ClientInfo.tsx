import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { memo, useState } from "react";
import { a11yProps } from "../../../../utils/utils.ts";
import Basic from '../../../Login/Me/Basic.tsx';
import Adress from '../../../Login/Me/Adress.tsx';
import Appearance from '../../../Login/Me/Appearance.tsx';
import Company from '../../../Login/Me/Company.tsx';
import Private from '../../../Login/Me/Private.tsx';
import Finans from '../../../Login/Me/Finans.tsx';
import {TabPanelProps} from "../../../../types/login.ts";
import {ClientInfoProps} from "../../../../types/clients.ts";
import ClientPosts from './ClientPosts.tsx'
import { Badge } from '@mui/material'
import Cart from '../../../Login/Me/Cart.tsx'
import { ShoppingCart } from 'lucide-react'
import Delivery from '../../../Login/Me/Delivery.tsx'

const TabPanel = memo((props: TabPanelProps) => {

  const { children, value, index, ...other } = props;

  return (<div role="tabpanel" hidden={value !== index}
              id={`vertical-tabpanel-${index}`}
              aria-labelledby={`vertical-tab-${index}`}
              {...other}
            >
                {value === index && (
                  <Box sx={{ p: 3  }}>
                    <Typography component={'span'}>{children}</Typography>
                  </Box>
                )}
          </div>);
})

const tabStyle = {
  alignItems: 'flex-start'
}

const ClientInfo = memo(({user, post} : ClientInfoProps) => {

  const {t} = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      event.preventDefault()
      setValue(newValue);
  };

  const scrollDown = () => window.innerWidth < 768 ? window.scrollTo({top: 800, behavior: 'smooth'}) : false

  return (<div className="client__info">
            <Box
                sx={{ display: 'flex', minHeight: 200, minWidth: '100%' }} className="client__info-tabs"
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: 'divider', flex: '0 0 30%', marginTop: '30px'}}
                  className="client__info-tabs-left"
                >
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('basicInfo')} {...a11yProps(0)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('address')} {...a11yProps(1)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('appearance')} {...a11yProps(2)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('company')} {...a11yProps(3)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('private')} {...a11yProps(4)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('finans')} {...a11yProps(5)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={<span className='post__badge'><Badge className='badge' badgeContent={post.length} color="success"></Badge> {t('Статьи')}</span>} {...a11yProps(6)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={<span>{t('purchases')} <ShoppingCart size={15} /></span>} {...a11yProps(7)} />
                  <Tab onClick={scrollDown} sx={tabStyle} label={t('delivery')} {...a11yProps(8)} />
                </Tabs>
                <Box className="client__info-tabs-right" sx={{ flex: '0 0 70%'}}>
                  <TabPanel value={value} index={0}>
                      <Basic user={user} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                      <Adress user={user} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                      <Appearance user={user} />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                      <Company user={user} />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                      <Private user={user} />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                      <Finans user={user} />
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                      <ClientPosts post={post} />
                  </TabPanel>
                  <TabPanel value={value} index={7}>
                      <Cart />
                  </TabPanel>
                  <TabPanel value={value} index={8}>
                      <Delivery />
                  </TabPanel>
                </Box>
              </Box>
          </div>);
})
export default ClientInfo;