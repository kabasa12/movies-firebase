import React,{useContext, useState} from 'react';
import Context from '../../context/context';
import LogFormComp from '../Forms/LogFormComp';
import firebaseDb from '../../firebase';

function LoginComp() {
  const [state,dispatch] = useContext(Context)

  const handleLogin = (userName,password) => {

    firebaseDb.child('users').on('value', snapshot => {
      let val = snapshot.val();
      Object.keys(val).forEach(u => {
        if(val[u].userName === userName && val[u].password === password){
          dispatch({type:"LOGIN"});
          dispatch({type:"SET_USER",payload:{...val[u],id:u}})
        }
      });
    });
  }

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }

  return !state.isLogin ? (
    <div>
        <LogFormComp type="Login" handleLogin={handleLogin}/>
    </div>
  ) : (
    <div>
        <LogFormComp type="Logout" handleLogout={handleLogout}/>
    </div>
  );
}

export default LoginComp;