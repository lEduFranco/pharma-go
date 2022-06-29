// ACTION TYPES
export const Types = {
  SET_COORDINATES: "user/SET_COORDINATES",
};

// reducer
const initialState = {
  coordinates: {
    latitude: null,
    longitude: null,
  },
};

const location = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload.data,
      };
    default:
      return state;
  }
};

export default location;

// Action Creators
export const Creators = {
  setCoordinates: (data) => ({
    type: Types.SET_COORDINATES,
    payload: { data },
  }),
};
