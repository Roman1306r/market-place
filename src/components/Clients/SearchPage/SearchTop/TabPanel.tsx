import { TabPanelProps } from "../../../../types/clients.ts"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { memo } from 'react'

const TabPanel = memo((props: TabPanelProps) => {

    const { children, value, index, ...other } = props;

    return (<div
              role="tabpanel"
              hidden={value !== index}
              id={`full-width-tabpanel-${index}`}
              aria-labelledby={`full-width-tab-${index}`}
              {...other}
            >
                {value === index && (
                  <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                  </Box>
                )}
            </div>);
})
export default TabPanel