import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import {Container,CssBaseline,TextField,Button,Typography } from '@material-ui/core';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';
import firebaseDb from '../../firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header:{
        fontFamily:"Jolly Lodger",
        letterSpacing:10
      },
    headerLong:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5
    },
    btnPrimary:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.secondary.dark,
        backgroundColor:pellet.palette.primary.light,
        '&:hover' :{background:pellet.palette.primary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    },
    btnSecondary:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.default.main,
        backgroundColor:pellet.palette.secondary.light,
        '&:hover' :{background:pellet.palette.secondary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    }
}));

const MovieFormComp = (props) => {
    const [state,dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [inputs, setInputs] = useState({name:"",
                                          image:"",
                                          premiered:"",
                                          genres:[],
                                          id:""
                                        });
                                
    let {movieId} = useParams(); 

    useEffect(() => {
        if(state.isEditMovie){
            
            let inp = { name:state.currentMovie.name,
                        genres:state.currentMovie.genres,
                        image:state.currentMovie.image,
                        premiered:state.currentMovie.premiered,
                        id:movieId
                        }
            
            setInputs(inp);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const returnBack = () => {
        history.push("/movies");
    }

    const handleUser = (movie) => {
        if (state.isEditMovie) {
            firebaseDb.child(`movies/${movieId}`).set(movie,
                err =>
                {
                    console.log(err);
                })
        } else {
            firebaseDb.child('movies').push(movie,
                err =>
                {
                    console.log(err);
                })
        }
        dispatch({type:"FINISH_EDIT",payload:"movie"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        let NewDate = new Date(inputs.premiered).getFullYear();  
        let preDate =  state.isEditMovie ? inputs.premiered :  NewDate;
       
        let newMovie;
        state.isEditMovie ?
        newMovie = {id:movieId,
                    name:inputs.name,
                    genres:inputs.genres,
                    premiered: preDate,
                    image:inputs.image} 
        :
        newMovie = {name:inputs.name,
                    genres:inputs.genres.split(','),
                    premiered: preDate,
                    image:inputs.image}

        handleUser(newMovie);
        setInputs({name:"",genres:[],
                   premiered:"",image:""});
        returnBack();           
    }

return state.isLogin? (
        <Container component="div" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" 
                            className={state.isEditMovie ? classes.headerLong : classes.header}>
                    {state.isEditMovie ?
                        "Edit Movie - " +  inputs.name :
                        "Add New Movie"
                    }
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="genres"
                        label="Genres"
                        id="genres"
                        value={inputs.genres}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="image"
                        label="Image Url"
                        id="image"
                        value={inputs.image}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="premiered"
                        label="Premiered"
                        id="premiered"
                        value={inputs.premiered}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={clsx(classes.submit,classes.btnPrimary)}>
                            {state.isEditMovie ? "Update": "Save"}
                    </Button>
                    <Button className={classes.btnSecondary}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={returnBack}>
                            Cancel
                    </Button>
                </form>
            </div>
        </Container>
        
    ) : <div></div>;
}

export default MovieFormComp;