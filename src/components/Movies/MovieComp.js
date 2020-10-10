import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import {Link,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Collapse} from '@material-ui/core';
import {Button,Typography,Grid,List,ListItem,IconButton,Tooltip} from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarsIcon from '@material-ui/icons/Stars';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import pellet from '../../Utils/pellet';
import firebaseDb from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardMediaOne:{
    height:250
  },
  cardContent: {
    flexGrow: 1,
  }
}));

function  MovieComp (props) {
  const [state,dispatch] = useContext(Context);
  const [_genres,set_Genres] = useState("");
  const [subs,setSeubs] = useState([]);
  //const [movie_id,setMovieId] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    //setMovieId(props.movie.id);
    let genMount = true;
    
    let tmp="";
    if(genMount) {
      if(props.movie.genres){
        tmp = props.movie.genres.join();
      } else {
        tmp = props.movie.genres;
      }
      
      set_Genres(tmp);
    }
    
    return () => {genMount = false;
    console.log('unmounted!') } 
  },[])

  const handleExpandClick = () => {
    firebaseDb.child('subscriptions').on('value', snapshot => {
      let val = snapshot.val();
      let userSubs = [];
      let keysMember = Object.keys(val);
      let valuesMember = Object.values(val)

      for(let i=0; i<keysMember.length;i++){
        if(valuesMember[i].movies){
          let movieval = Object.values(valuesMember[i].movies);
          for(let j=0; j<movieval.length; j++){
            if(movieval[j].movieId === props.movie.id) {
              userSubs.push({memberId:keysMember[i],
                            member:valuesMember[i].name,
                            watchedDate:movieval[j].watchedDate})
            }
          }
        }
      }
      setSeubs([...userSubs])
    })
    setExpanded(!expanded);
  };

  const deleteMovie = () => {
    const deleteMovieSubs = () => {
      firebaseDb.child('subscriptions').on('value', snapshot => {
      let val = snapshot.val();
        Object.keys(val).forEach(member => {
          let delMember = member;
          if(val[member].movies) {
            let movieval = Object.values(val[member].movies)
            let movieKeys = Object.keys(val[member].movies)
            for(let i=0; i<movieKeys.length; i++){
              if(movieval[i].movieId === props.movie.id){
                firebaseDb.child(`subscriptions/${delMember}/movies/${movieKeys[i]}`).remove(
                    err => {
                              if(err)
                                  console.log(err);
                          })
              }
            }
          }
        })
      })
    }
    deleteMovieSubs();

    firebaseDb.child(`movies/${props.movie.id}`).remove(
        err =>
        {
            if(err)
                console.log(err);
            // else
            //   setMovieId('')
        })
    props.deleteHandle();
  }

  const showEditMovieForm = () => {
    dispatch({type:"EDIT",payload:"movie"});
    dispatch({type:"EDIT_MOVIE" ,payload:props.movie});
    history.push(`/updateMovie/${props.movie.id}`);
  }

  const goBack = () => {
    history.push("/members");
  }

  let oneMovie = props.movieId ? "oneMovie" : "";
  let media = props.movieId ? classes.cardMediaOne:classes.cardMedia;
  return state.userPermissions.viewMovies? (
      <Grid className={oneMovie}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={media}
              image={props.movie.image}
              alt={props.movie.name}
              title={props.movie.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h5">
                {props.movie.name} - {props.movie.premiered}
              </Typography>
              <Typography variant="body2" component="h2">
                Geners
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {_genres}
              </Typography>
            </CardContent>
          </CardActionArea>
          {props.movieId ?
          <CardActions disableSpacing>
            <Button size="small" color="secondary" onClick={goBack}>
              Back To Subscriptions
            </Button>
            <Tooltip title="Show Subscriptions">
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
              </IconButton>
            </Tooltip>
          </CardActions>
          :
          <CardActions disableSpacing>
            {state.userPermissions.updateMovies ?
            <Tooltip title="Edit Movie">
              <IconButton aria-label="Edit Movie" onClick={showEditMovieForm}>
                <EditIcon />
              </IconButton>
            </Tooltip> : '' }
            {state.userPermissions.deleteMovies ?
            <Tooltip title="Delete Movie">
              <IconButton aria-label="Delete Movie" onClick={deleteMovie}>
                <DeleteIcon style={{color:`${red[600]}`}}/>
              </IconButton>
            </Tooltip> : '' }
            <Tooltip title="Show Subscriptions">
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
              </IconButton>
            </Tooltip>
          </CardActions>
          }
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardContent}>
              <Typography variant="body2" component="h2">Subscriptions Watched</Typography>
              <List>
                { 
                  subs.map((sub,i) => {
                    return (
                      <ListItem key={i}><StarsIcon />
                      <Link to={`/members/${sub.memberId}`}>{sub.member}</Link> - {sub.watchedDate}</ListItem>
                    )
                  })
                }
              </List>
            </CardContent>
          </Collapse>
        </Card> 
       </Grid>
    ) : <div>
          <Grid container>
              <Button size="small" color="secondary" onClick={goBack}>
                      Back To Subscriptions
              </Button>
          </Grid>
        </div>;
}

export default MovieComp;
