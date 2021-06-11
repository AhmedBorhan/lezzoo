import { ADD_ITEM, GET_ITEMS, GET_MORE_ITEMS, ITEM_LOADING, DELETE_ITEM } from '../actions/actionType';

const initialState = {
	items: [],
  count:0,
	loading: false
};

const ItemReducer = (state = initialState, action) => {
	switch (action.type) {
		case ITEM_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ITEMS:
			return {
				...state,
				items: action.data.data,
        count: action.data.count,
				loading: false
			};
		case GET_MORE_ITEMS:
			return {
				...state,
				items: state.items.concat(action.data.data),
				loading: false
			};
		case ADD_ITEM:
			return {
				...state,
				items: [ action.data, ...state.items ]
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter((items) => items.ITEM_id !== action.data)
			};
		default:
			return state;
	}
};

export default ItemReducer;
