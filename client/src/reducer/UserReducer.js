export const initialState = false;
export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload
    }
    return state;
}