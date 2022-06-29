// ACTION TYPES
export const Types = {
  SET_USER_ID: "user/SET_USER_ID",
  SET_USER_DATA: "user/SET_USER_DATA",
  SET_USER_PROFILE: "user/SET_USER_PROFILE",
  SET_USER_ADDRESS: "user/SET_USER_ADDRESS",
  SET_USER_PROFILE_ALLERGIES: "user/SET_USER_PROFILE_ALLERGIES",
  SET_USER_PROFILE_DISEASES: "user/SET_USER_PROFILE_DISEASES",
};

// reducer
const initialState = {
  id: null,
  data: {
    email: "",
    senha: "",
    tipoUsuario: "",
    id: "",
  },
  profile: {
    birthDate: "",
    name: "",
    cpf: "",
    phone: "",
    sexo: "",
    bloodGroup: "",
    preexistingCondition: "",
    specialNeed: "",
    weight: "",
    height: "",
    allergies: [],
    usaMarcapasso: true,
    proteseOrtopedica: true,
    alteracoesCardiacas: true,
    familyDiseases: [],
    cancerRegion: "",
    rareDisease: "",
    physicalActivityPractice: true,
    physicalActivityFrequency: true,
    smokeCigarette: true,
    averageCigaretteSmoke: "",
    alcoholConsumes: true,
    frequencyAlcoholConsumption: "",
    drugUser: true,
    healthPlanId: "",
    healthPlan: null,
    userId: "",
    id: "",
  },
  address: {
    userId: "",
    logradouro: "",
    numero: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    id: "",
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER_ID:
      return {
        ...state,
        id: action.payload.data,
      };
    case Types.SET_USER_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case Types.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload.data,
      };
    case Types.SET_USER_ADDRESS:
      return {
        ...state,
        address: action.payload.data,
      };
    default:
      return state;
  }
};

export default user;

// Action Creators
export const Creators = {
  setUserId: (data) => ({
    type: Types.SET_USER_ID,
    payload: { data },
  }),
  setUserData: (data) => ({
    type: Types.SET_USER_DATA,
    payload: { data },
  }),
  setUserProfile: (data) => ({
    type: Types.SET_USER_PROFILE,
    payload: { data },
  }),
  setUserAddress: (data) => ({
    type: Types.SET_USER_ADDRESS,
    payload: { data },
  }),
};
