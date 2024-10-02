import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMoreProps, PostProps } from '../../../types/posts'
import postImage1 from './../../../assets/post/post.jpg'
import postImage2 from './../../../assets/post/post2.jpg'
import postImage3 from './../../../assets/post/post3.jpg'
import postImage4 from './../../../assets/post/post4.jpg'
import postImage5 from './../../../assets/post/post5.jpg'
import postImage6 from './../../../assets/post/post6.jpg'
import postImage7 from './../../../assets/post/post7.jpg'
import postImage8 from './../../../assets/post/post8.jpg'
import postImage9 from './../../../assets/post/post9.jpg'
import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addReactionUsersAll, scrollToTopCallBack } from '../../../utils/utils'
import { Tags, ThumbsDown, ThumbsUp } from 'lucide-react'
import { m } from 'framer-motion'
import { scale } from '../../../variants/variants'

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = memo(({post, getPostsByTag, posts, setPosts}: PostProps) => {

  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation()
  const navigate = useNavigate()
  const postImages = [postImage1, postImage2, postImage3, postImage4, postImage5, postImage6, postImage7, postImage8, postImage9]

  return (<m.div
            variants={scale}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            >
            <Card className='post'>
                <CardMedia
                  className='post__image'
                  component="img"
                  height="250"
                  image={postImages[Math.floor(Math.random() * postImages.length)]}
                  alt="pen"
                  onClick={() => scrollToTopCallBack(navigate('/posts/' + post.id))}
                />
                <CardHeader
                className='post__header'
                  title={<h2 onClick={() => scrollToTopCallBack(navigate('/posts/' + post.id))} className='post__header-title'>{post.title}</h2> }
                  subheader={<p className='post__header-desc'>{post.body}</p>}
                />
                <CardActions disableSpacing>
                      <IconButton onClick={() => addReactionUsersAll(post.id, post.reactions, post.isLiked, post.isDisliked, true, posts, setPosts)} aria-label="add to favorites">
                        <ThumbsUp color={post.isLiked ? "green" : "grey"} />
                      </IconButton>
                      {post.reactions.likes}
                      <IconButton onClick={() => addReactionUsersAll(post.id, post.reactions, post.isLiked, post.isDisliked, false, posts, setPosts)} aria-label="remove out favorites">
                        <ThumbsDown color={post.isDisliked ? "red" : "grey"} />
                      </IconButton>
                      {post.reactions.dislikes}
                      <ExpandMore
                        expand={expanded}
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label={t('more')}
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <div className='post__tags'>
                    <Tags />
                    {post.tags.map((tag: string) => <span onClick={() => getPostsByTag(tag)} key={tag}>#{tag}</span>)}
                  </div>
                </Collapse>
            </Card>
          </m.div>);
})
export default Post;