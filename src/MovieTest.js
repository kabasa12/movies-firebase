import React from 'react'
import firebaseDb from './firebase'

function MovieTest (props) {
    
    const deleteMovie = () => {
        props.deleteMovie(props.movie.id);
    //     firebaseDb.firestore().collection('movies').doc(props.movie.id).delete().then(() => {
    //       console.log("Delete Successfully" + props.movie.id) })
    //     .catch(err => console.log(err))
    }
    
    return (
        <div>
            <div>{props.movie.name}</div>
            <div><img src={props.movie.image} /></div>
            <div>{props.movie.premiered}</div>
            <div>
              <ul>
                {props.movie.genres.map((g,i) => {
                  return(
                    <li key={i}>{g}</li>
                  )
                })}
              </ul>
            </div>
            <div>
              <input type="button" value="Delete" onClick={deleteMovie} />
            </div>
          </div>
    )
}

export default MovieTest;