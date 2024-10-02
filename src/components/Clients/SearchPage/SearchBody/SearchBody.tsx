import React, { ChangeEvent, memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { scrollToTop } from "../../../../utils/utils";
import {SearchBodyProps, User} from "../../../../types/clients.ts";
import Pagination from '@mui/material/Pagination';
import { UserX } from 'lucide-react'

const SearchBody = memo(({foundUsers, deleteUser, isFilter} : SearchBodyProps) => {

    const {t} = useTranslation();
    const [pagination, setPagination] = useState({pageCount: 10, directive: 0})

    function switchPage(_event: ChangeEvent<unknown>, page: number) {
        scrollToTop()
        const directive: number = --page * pagination.pageCount
        setPagination({...pagination, directive})
    }

    return (<div className="search__body">
                {foundUsers?.users?.length
                ? foundUsers.users.filter((_u: User, i) => i >= pagination.directive && i < pagination.directive + pagination.pageCount).map((user: User) =><NavLink key={user.id} to={'/clients/' + user?.id}>
                    <List>
                        <ListItem
                            secondaryAction={
                                <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => deleteUser(event, user?.id)} edge="end" aria-label="delete">
                                    <UserX />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={user?.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user?.firstName + ' ' + user?.lastName}
                            />
                        </ListItem>
                    </List>
                </NavLink>)
                : <div className="not-finded">
                        {!isFilter
                            ? <Alert severity="info">{t('searchInfoText')}</Alert>
                            : <Alert severity="info">{t('filterInfoText')}</Alert>
                        }
                    </div>}
                {foundUsers?.users?.length > pagination.pageCount && <div className='search__pagination'><Pagination onChange={(event, page) => switchPage(event, page)} count={Math.ceil(foundUsers.total / pagination.pageCount)} shape="rounded" /></div>}
            </div>);
})
export default SearchBody;