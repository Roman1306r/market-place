import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TabPanelProps} from "../../../../types/login.ts";

function TabPanel(props: TabPanelProps) {

    const { children, value, index, ...other } = props;

    return (<div
                role="tabpanel"
                hidden={value !== index}
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
}
export default TabPanel;