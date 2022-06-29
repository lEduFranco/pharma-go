// ACTION TYPES
export const Types = {
  SET_AUTH_TYPE: "auth/SET_AUTH_TYPE",
  SET_SIGNUP_STEP: "auth/SET_SIGNUP_STEP",
  SET_SIGNUP_ERROR: "auth/SET_SIGNUP_ERROR",
  SET_EMAIL: "auth/SET_EMAIL",
  SET_PASSWORD: "auth/SET_PASSWORD",
  SET_USER_TYPE: "auth/SET_USER_TYPE",
  SET_BIRTH_DATE: "auth/SET_BIRTH_DATE",
  SET_NAME: "auth/SET_NAME",
  SET_CPF: "auth/SET_CPF",
  SET_PHONE: "auth/SET_PHONE",
  SET_SEX: "auth/SET_SEX",
  SET_BLOOD_TYPE: "auth/SET_BLOOD_TYPE",
  SET_PREEXISTING_CONDITIONS: "auth/SET_PREEXISTING_CONDITIONS",
  SET_SPECIAL_NEEDS: "auth/SET_SPECIAL_NEEDS",
  SET_STREET: "auth/SET_STREET",
  SET_NUMBER: "auth/SET_NUMBER",
  SET_COMPLEMENT: "auth/SET_COMPLEMENT",
  SET_CEP: "auth/SET_CEP",
  SET_DISTRICT: "auth/SET_DISTRICT",
  SET_CITY: "auth/SET_CITY",
  SET_STATE: "auth/SET_STATE",
};

// reducer
const initialState = {
  type: {
    signin: true,
    signup: false,
  },
  signupStep: 1,
  signupError: false,
  email: "",
  password: "",
  userType: "",
  birthDate: "",
  name: "",
  cpf: "",
  phone: "",
  sex: "",
  bloodType: "",
  preexistingConditions: "",
  specialNeeds: "",
  street: "",
  number: "",
  complement: "",
  cep: "",
  district: "",
  city: "",
  state: "",
};

const auth = (
  state = initialState,
  action: { type: any; payload: { data: any } }
): object => {
  switch (action.type) {
    case Types.SET_AUTH_TYPE:
      return {
        ...state,
        type: action.payload.data,
      };
    case Types.SET_SIGNUP_STEP:
      return {
        ...state,
        signupStep: action.payload.data,
      };
    case Types.SET_SIGNUP_ERROR:
      return {
        ...state,
        signupError: action.payload.data,
      };
    case Types.SET_EMAIL:
      return {
        ...state,
        email: action.payload.data,
      };
    case Types.SET_PASSWORD:
      return {
        ...state,
        password: action.payload.data,
      };
    case Types.SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload.data,
      };
    case Types.SET_BIRTH_DATE:
      return {
        ...state,
        birthDate: action.payload.data,
      };
    case Types.SET_NAME:
      return {
        ...state,
        name: action.payload.data,
      };
    case Types.SET_CPF:
      return {
        ...state,
        cpf: action.payload.data,
      };
    case Types.SET_PHONE:
      return {
        ...state,
        phone: action.payload.data,
      };
    case Types.SET_SEX:
      return {
        ...state,
        sex: action.payload.data,
      };
    case Types.SET_BLOOD_TYPE:
      return {
        ...state,
        bloodType: action.payload.data,
      };
    case Types.SET_PREEXISTING_CONDITIONS:
      return {
        ...state,
        preexistingConditions: action.payload.data,
      };
    case Types.SET_SPECIAL_NEEDS:
      return {
        ...state,
        specialNeeds: action.payload.data,
      };
    case Types.SET_STREET:
      return {
        ...state,
        street: action.payload.data,
      };
    case Types.SET_NUMBER:
      return {
        ...state,
        number: action.payload.data,
      };
    case Types.SET_COMPLEMENT:
      return {
        ...state,
        complement: action.payload.data,
      };
    case Types.SET_CEP:
      return {
        ...state,
        cep: action.payload.data,
      };
    case Types.SET_DISTRICT:
      return {
        ...state,
        district: action.payload.data,
      };
    case Types.SET_CITY:
      return {
        ...state,
        city: action.payload.data,
      };
    case Types.SET_STATE:
      return {
        ...state,
        state: action.payload.data,
      };
    default:
      return state;
  }
};

export default auth;

// Action Creators
export const Creators = {
  setAuthType: (data: object): { type: string; payload: { data: object } } => ({
    type: Types.SET_AUTH_TYPE,
    payload: { data },
  }),
  setSignupStep: (
    data: number
  ): { type: string; payload: { data: number } } => ({
    type: Types.SET_SIGNUP_STEP,
    payload: { data },
  }),
  setSignupError: (
    data: boolean
  ): { type: string; payload: { data: boolean } } => ({
    type: Types.SET_SIGNUP_ERROR,
    payload: { data },
  }),
  setEmail: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_EMAIL,
    payload: { data },
  }),
  setPassword: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_PASSWORD,
    payload: { data },
  }),
  setUserType: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_USER_TYPE,
    payload: { data },
  }),
  setBirthDate: (
    data: string
  ): { type: string; payload: { data: string } } => ({
    type: Types.SET_BIRTH_DATE,
    payload: { data },
  }),
  setName: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_NAME,
    payload: { data },
  }),
  setCPF: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_CPF,
    payload: { data },
  }),
  setPhone: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_PHONE,
    payload: { data },
  }),
  setSex: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_SEX,
    payload: { data },
  }),
  setBloodType: (
    data: string
  ): { type: string; payload: { data: string } } => ({
    type: Types.SET_BLOOD_TYPE,
    payload: { data },
  }),
  setPreexistingConditions: (
    data: string
  ): { type: string; payload: { data: string } } => ({
    type: Types.SET_PREEXISTING_CONDITIONS,
    payload: { data },
  }),
  setSpecialNeeds: (
    data: string
  ): { type: string; payload: { data: string } } => ({
    type: Types.SET_SPECIAL_NEEDS,
    payload: { data },
  }),
  setStreet: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_STREET,
    payload: { data },
  }),
  setNumber: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_NUMBER,
    payload: { data },
  }),
  setComplement: (
    data: string
  ): { type: string; payload: { data: string } } => ({
    type: Types.SET_COMPLEMENT,
    payload: { data },
  }),
  setCEP: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_CEP,
    payload: { data },
  }),
  setDistrict: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_DISTRICT,
    payload: { data },
  }),
  setCity: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_CITY,
    payload: { data },
  }),
  setState: (data: string): { type: string; payload: { data: string } } => ({
    type: Types.SET_STATE,
    payload: { data },
  }),
};
