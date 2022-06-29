// ACTION TYPES
export const Types = {
  SET_LIST: "healthPlans/SET_LIST",
};

// reducer
const initialState = {
  list: null,
};

const healthPlans = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LIST:
      return {
        ...state,
        list: action.payload.data,
      };
    default:
      return state;
  }
};

export default healthPlans;

// Action Creators
export const Creators = {
  setList: (data) => ({
    type: Types.SET_LIST,
    payload: { data },
  }),
};
