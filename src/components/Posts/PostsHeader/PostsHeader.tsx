import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { memo, useState } from 'react'
import Collapse from "@mui/material/Collapse";
import TabPanel from './TabPanel';
import { a11yPropsFilter } from '../../../utils/utils'
import SearchIcon from '@mui/icons-material/Search';
import Search from './Search/Search'
import New from './New/New'
import { PostsHeaderProps } from '../../../types/posts'
import Sort from './Sort/Sort'
import { Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ArrowDownWideNarrow, MessageSquareDiff } from 'lucide-react'

const PostsHeader = memo(({posts, setPosts} : PostsHeaderProps) => {

	const [value, setValue] = useState(0);
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue);
	
	return (<div className='posts__body-all-header'>
					<Box sx={{ width: '100%' }}>
						<AppBar className='appBar' sx={{width: '30%', margin: '0 auto'}} position="static">
							<Tabs
								onClick={() => setIsOpen(true)}
								value={value}
								onChange={handleChange}
								indicatorColor="secondary"
								textColor="inherit"
								variant="fullWidth"
								aria-label="full width tabs example"
								>
								<Tab label={<Tooltip title={t('search')}><SearchIcon  color="inherit" /></Tooltip>} {...a11yPropsFilter(0)} />
								<Tab label={<Tooltip title={t('sort')}><ArrowDownWideNarrow /></Tooltip>} {...a11yPropsFilter(1)} />
								<Tab label={<Tooltip title={t('add')}><MessageSquareDiff /></Tooltip>} {...a11yPropsFilter(2)} />
							</Tabs>
						</AppBar>
						<Collapse in={isOpen}>
							<TabPanel value={value} index={0} >
								<Search setIsOpen={setIsOpen} />
							</TabPanel>
							<TabPanel value={value} index={1} >
								<Sort setPosts={setPosts} posts={posts} setIsOpen={setIsOpen} />
							</TabPanel>
							<TabPanel value={value} index={2} >
								<New setIsOpen={setIsOpen} />
							</TabPanel>
						</Collapse>
					</Box>
			</div>);
})
export default PostsHeader;
