// ACTION TYPES
export const Types = {
  SET_LIST: "instructionUses/SET_LIST",
};

// reducer
const initialState = {
  list: null,
};

const instructionUses = (state = initialState, action) => {
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

export default instructionUses;

// Action Creators
export const Creators = {
  setList: (data) => ({
    type: Types.SET_LIST,
    payload: { data },
  }),
};
