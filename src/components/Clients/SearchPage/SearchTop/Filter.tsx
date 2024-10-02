import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import React, { memo, useState } from "react"
import { useTranslation } from 'react-i18next'
import { FilterProps, IPropsControl } from "../../../../types/clients.ts"
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { a11yPropsFilter } from '../../../../utils/utils.ts'
import TabPanel from './TabPanel.tsx'
import Control from './FormControl/FormControl.tsx'
import FormSelect from './FormControl/FormSelect.tsx'
import { filterLabels } from '../../../../data/data.ts'

const Filter = memo(({ indicator, foundUsers, open, filterUsers }: FilterProps) => {

    const { t } = useTranslation()
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) =>  setValue(newValue)
    const [props, setProps] = useState<IPropsControl>({gender: 'any', role: 'any', city: 'any', department: 'any'})

    function change(event: React.ChangeEvent<HTMLInputElement>, param: string) {
        switch (param) {
            case 'gender':
                setProps({...props, gender: event.target.value})
                filterUsers('gender', event.target.value, false)
                break;
            case 'role':
                setProps({...props, role: event.target.value})
                filterUsers('role', event.target.value, false)
                break;
            case 'city':
                setProps({...props, city: event.target.value})
                filterUsers('city', event.target.value, 'address')
                break;
            case 'department':
                setProps({...props, department: event.target.value})
                filterUsers('department', event.target.value, 'company')
                break;
        }
    }

    return (<>
                <div className="filter__header">
                    <Box sx={{width: '100%'}}>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab  label={t('gender')} {...a11yPropsFilter(0)} />
                                <Tab  label={t('role')} {...a11yPropsFilter(1)} />
                                <Tab  label={t('city')} {...a11yPropsFilter(2)} />
                                <Tab  label={t('department')} {...a11yPropsFilter(3)} />
                            </Tabs>
                        </AppBar>
                            <TabPanel value={value} index={0} >
                                <Control param='gender' value={props.gender} setValue={change} labels={filterLabels.gender} />
                            </TabPanel>
                            <TabPanel value={value} index={1} >
                                <Control param='role' value={props.role} setValue={change} labels={filterLabels.role} />
                            </TabPanel>
                            <TabPanel value={value} index={2} >
                                <FormSelect param='city' value={props.city} setValue={change} labels={filterLabels.city} />
                            </TabPanel>
                            <TabPanel value={value} index={3} >
                                <FormSelect param='department' value={props.department} setValue={change} labels={filterLabels.department} />
                            </TabPanel>
                    </Box>
                </div>
                <div className="filter__medium">
                    <Collapse in={open}>
                        {indicator > 0 && <Alert severity="success">{foundUsers?.total} {t('searchSuccessText')}</Alert>}
                        {indicator < 0 && <Alert severity="error">{t('searchErrorText')}</Alert>}
                    </Collapse>
                </div>
            </>)
})
export default Filter