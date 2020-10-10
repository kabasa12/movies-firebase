import React,{useReducer} from 'react';
import Context from './context';
import totalReducer from '../reducers/totalReducer';


const ContextProvider = (props) => {

    const initialState = {
        isLogin: false,
        users:[],
        loading:true,
        currentUser:{},
        isEditUser:false,
        editedUser:{},
        movies:[],
        members:[],
        currentMovie:{},
        isEditMovie:false,
        currentMember:{},
        subscriptions:[],
        isEditMember:false,
        currentSubsc:{},
        userPermissions:{}
    };
    
    const [state,dispatch] = useReducer(totalReducer,initialState)

    return(
        <Context.Provider value={[state,dispatch]}>
             {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;