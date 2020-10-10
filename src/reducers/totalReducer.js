
export default (state, action) => {
    console.log(action)
    switch (action.type) {
        //-----Handle Login----------
        case 'LOGIN':
            return {
                ...state,
                isLogin: true
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false
            };
        case "SENDING_REQUEST":
            return {
                ...state,
                loading: true
            };
        case 'REQUEST_FINISHED':
            return {
                ...state,
                loading: false
            };
        case "SET_PERMISSIONS":
            return {
                ...state,
                userPermissions:action.payload
            }
        //----- Handle Forms----------
        case "EDIT":
            if (action.payload === "user") {
                return {
                    ...state,
                    isEditUser:true
                };
            } else if (action.payload === "movie") {
                return {
                    ...state,
                    isEditMovie:true
                };
            } else {
                return {
                    ...state,
                    isEditMember:true
                };
            };
        case "FINISH_EDIT":
            if (action.payload === "user") {
                return {
                    ...state,
                    isEditUser:false
                };
            }else if (action.payload === "movie") {
                return {
                    ...state,
                    isEditMovie:false
                };
            } else {
                return {
                    ...state,
                    isEditMember:false
                };
            };
        
        //-----Handle Users----------
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            };
        case "SET_USER":
            let perm = action.payload.permissions.reduce((obj,item) => 
                Object.assign(obj,{[item.id]:item.value}),{});
            return {
                ...state,
                currentUser: action.payload,
                userPermissions:perm
            };
        case "EDIT_USER":
            return {
                ...state,
                editedUser: action.payload
            };
        case "ADD_USER":
            return {
                ...state, users: [...state.users, {...action.payload}]             
            };
        case "UPDATE_USER":
            let id = action.payload.id;
            let _users = [...state.users];
            let index = _users.findIndex( u => u.id == id);
            _users[index] = {...action.payload};
            return {
                ...state, users: _users             
            };
        case "DELETE_USER":
            let deleteId = action.payload;
            let deleteUsers = [...state.users];
            deleteUsers = deleteUsers.filter(u => u.id !== deleteId);

            return {
                ...state, users: deleteUsers
            }; 
        
        //-----Handle Movies----------
        case "SET_MOVIES":
            return {
                ...state,
                movies: action.payload
            };
        case "DELETE_MOVIE":
            let deleteMovieId = action.payload;
            let deleteMovies = [...state.movies];
            deleteMovies = deleteMovies.filter(m => m.id !== deleteMovieId);
            return {
                ...state, movies: deleteMovies
            }; 
        case "EDIT_MOVIE":
            return {
                ...state,
                currentMovie: action.payload
            };
        case "UPDATE_MOVIE":
            let movieId = action.payload.id;
            let _movies = [...state.movies];
            let movieIndex = _movies.findIndex( m => m.id == movieId);

            let tmpMovie = {...action.payload};
            if(typeof tmpMovie.genres === "string" ) {
                let gen = tmpMovie.genres.split(",");
                tmpMovie.genres = gen;
            }
            _movies[movieIndex] = {...tmpMovie};
            return {
                ...state, movies: _movies             
            };
        case "ADD_MOVIE":
            let addedMovie = {...action.payload};
            let newGen = addedMovie.genres.split(",");
            addedMovie.genres = newGen;

            return {
                ...state, movies: [...state.movies, {...addedMovie}]             
            };

        //-----Handle Members----------
        case "SET_MEMBERS":
            return {
                ...state,
                members: action.payload
            };
        case "EDIT_MEMBER":
            return {
                ...state,
                currentMember: action.payload
            };
        case "DELETE_MEMBER":
            let deleteMemberId = action.payload;
            let deleteMembers = [...state.members];
            deleteMembers = deleteMembers.filter(m => m.id !== deleteMemberId);
            return {
                ...state, members: deleteMembers
            };
        case "ADD_MEMBER":
            return {
                ...state, members: [...state.members, {...action.payload}]             
            };
        case "UPDATE_MEMBER":
            let memberId = action.payload.id;
            let _members = [...state.members];
            let memberIndex = _members.findIndex( u => u.id == memberId);
            _members[memberIndex] = {...action.payload};
            return {
                ...state, members: _members              
            };

        //-----Handle Subscriptions----------
        case "SET_SUBSCRIPTIONS":
            return {
                ...state,
                subscriptions: action.payload
            };
        case "ADD_SUBSCRIBE":
            let newSubsc = [...state.subscriptions];
            newSubsc.push(action.payload);
            return {
                ...state, subscriptions: newSubsc            
            };
        case "UPDATE_SUBSCRIBE":
            let subscId = action.payload.id;
            let _subsc = [...state.subscriptions];
            let subscIndex = _subsc.findIndex( s => s.id == subscId);

            let tmpSubsc = {...action.payload.data};
            
            _subsc[subscIndex].movies.push(tmpSubsc);
            return {
                ...state, subscriptions: _subsc             
            };
        case "DELETE_SUBSC_MOVIE":
            let subsMovieId = action.payload;
            let movieSubs = state.subscriptions.map(sub => ({...sub,
                movies:sub.movies.filter(s => s.movieId !== subsMovieId)}))
                .filter(sub => sub.movies.length > 0)
            return {
                ...state,
                subscriptions:movieSubs
            };
        case "DELETE_SUBSC_MEMBER":
            let subsMemberId = action.payload;
            let memberSubs = state.subscriptions.filter( m => m.memberId !== subsMemberId)
            return {
                ...state,
                subscriptions:memberSubs
            };
        default:
            return state;
    }
} 