// ACTION TYPES
export const Types = {
  SET_LIST: "caregivers/SET_LIST",
  SET_SELECTED: "caregivers/SET_SELECTED",
  SET_NEW_LOADING: "caregivers/SET_NEW_LOADING",
  SET_EDIT_LOADING: "caregivers/SET_EDIT_LOADING",
  SET_DELETE_LOADING: "caregivers/SET_DELETE_LOADING",
};

// reducer
const initialState = {
  list: null,
  selected: {
    item: null,
    index: null,
  },
  newLoading: false,
  editLoading: false,
  deleteLoading: false,
};

const caregivers = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LIST:
      return {
        ...state,
        list: action.payload.data,
      };
    case Types.SET_SELECTED:
      return {
        ...state,
        selected: action.payload.data,
      };
    case Types.SET_NEW_LOADING:
      return {
        ...state,
        newLoading: action.payload.data,
      };
    case Types.SET_EDIT_LOADING:
      return {
        ...state,
        editLoading: action.payload.data,
      };
    case Types.SET_DELETE_LOADING:
      return {
        ...state,
        deleteLoading: action.payload.data,
      };
    default:
      return state;
  }
};

export default caregivers;

// Action Creators
export const Creators = {
  setList: (data) => ({
    type: Types.SET_LIST,
    payload: { data },
  }),
  setSelected: (data) => ({
    type: Types.SET_SELECTED,
    payload: { data },
  }),
  setNewLoading: (data) => ({
    type: Types.SET_NEW_LOADING,
    payload: { data },
  }),
  setEditLoading: (data) => ({
    type: Types.SET_EDIT_LOADING,
    payload: { data },
  }),
  setDeleteLoading: (data) => ({
    type: Types.SET_DELETE_LOADING,
    payload: { data },
  }),
};
