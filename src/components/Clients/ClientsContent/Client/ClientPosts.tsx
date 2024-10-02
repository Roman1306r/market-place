import { returnCorrectAmountSymbols, scrollToTopCallBack } from "../../../../utils/utils.ts";
import { useTranslation } from 'react-i18next';
import {ClientPostsProps, Post} from "../../../../types/clients.ts";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material'
import { memo } from 'react'

const ClientPosts = memo(({post}: ClientPostsProps) => {

    const {t} = useTranslation();
    const navigate = useNavigate()

    return (<div>
                <h2 style={{marginBottom: "30px"}}>{t('Статьи')}</h2>
                {!!post.length ?
                            <TableContainer className='table' component={Paper}>
                                <Table aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            {window.innerWidth > 767 && <TableCell variant="head" align="left">ID</TableCell>} 
                                            <TableCell variant="head" align="left">{t('nameProduct')}</TableCell>
                                            <TableCell variant="head" align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {post.map((p: Post) => {
                                        return  <TableRow key={p.id}>
                                                            {window.innerWidth > 767 && <TableCell variant="footer" align="left" className="order__number">{p.id}</TableCell>} 
                                                            <TableCell variant="footer" align="left">{returnCorrectAmountSymbols(p?.title, 50)}</TableCell>
                                                            <TableCell variant="footer" align="right"><Button onClick={() => scrollToTopCallBack(navigate('/posts/' + p?.id))} color="success" size="small" variant="text" >{t('look')}</Button></TableCell>
                                            </TableRow>
                                    }) || ''}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            : <Alert icon={false} variant="outlined" severity="success">{t('notPosts')}</Alert>}
            </div>);
})
export default ClientPosts;