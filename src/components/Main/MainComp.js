import React,{useEffect,useContext,useState} from 'react';
import {Route,Switch} from 'react-router-dom';
//import Context from '../../context/context';
//import utils from '../../Utils/utils'

import NavBarComp from '../NavBar/NavDrawer';
import MoviesComp from '../Movies/MoviesComp';
import MembersComp from '../Members/MembersComp';
//import UsersComp from '../Users/UsersComp';
import LoginComp from '../Log/LoginComp';
//import UserFormComp from '../Forms/UserFormComp';
import MovieFormComp from '../Forms/MovieFormComp';
import MemberFormComp from '../Forms/MemberFormComp';

function MainComp() {
  //const [state,dispatch] = useContext(Context)
  const [_users] =  useState([]);                                     
  
  // useEffect(() => {
  //   //dispatch({ type: 'SET_USERS', payload: _users });
  //   //dispatch({type:"SET_SUBSCRIPTIONS" , payload:subsc})

  //   let resp;
  //     const getAllMembers = async() => {
  //       resp = await utils.getAll('https://jsonplaceholder.typicode.com/users',"members");
  //       dispatch({type:"SET_MEMBERS", payload:resp});
  //     }
  //     getAllMembers();
      
  //     const getAllMovies = async() => {
  //       resp = await utils.getAll('https://api.tvmaze.com/shows',"movies");
  //       dispatch({type:"SET_MOVIES", payload:resp});
  //     }
  //     getAllMovies();  
  // },[])

  return (
      <div>
        <NavBarComp />
          <Switch>
             <Route exact path="/" component={LoginComp} />
            {/*<Route path="/updateUser/:userId" component={UserFormComp} /> */}
            <Route path="/updateMovie/:movieId" component={MovieFormComp} />
           <Route path="/updateMember/:memberId" component={MemberFormComp} />
            <Route path="/members/:memberId" component={MembersComp} />
            <Route path="/movies/:movieId" component={MoviesComp} /> 
            <Route path="/movies" component={MoviesComp} />
             <Route path="/members" component={MembersComp} />
            {/*<Route path="/addUser" component={UserFormComp} />*/}
            <Route path="/addMovie" component={MovieFormComp} />
            <Route path="/addMember" component={MemberFormComp} />
            {/*<Route path="/users" component={UsersComp} />   */}
          </Switch>
      </div>
  );
}

export default MainComp;