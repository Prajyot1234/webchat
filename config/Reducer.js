export const initialState = {
    theme : "light" ,
}

export const reducer = ( state , action ) => {
    switch (action.type) {
        case "SET_THEME":
            return(
                {
                    ...state,
                    theme : action.theme,
                }
            );
    
        default:
            return state ;
    }
}

export default reducer;