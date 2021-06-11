import { ADD_STORE, GET_STORES, GET_MORE_STORES, STORE_LOADING, DELETE_STORE } from '../actions/actionType';

const initialState = {
	stores: [],
  count:0,
	loading: false
};

const StoreReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_STORES:
			return {
				...state,
				stores: action.data.data,
        count: action.data.count,
				loading: false
			};
		case GET_MORE_STORES:
			return {
				...state,
				stores: state.stores.concat(action.data),
				loading: false
			};
		case ADD_STORE:
			return {
				...state,
				stores: [ action.data, ...state.stores ]
			};
		case DELETE_STORE:
			return {
				...state,
				stores: state.stores.filter((stores) => stores.store_id !== action.data)
			};
		default:
			return state;
	}
};

export default StoreReducer;
