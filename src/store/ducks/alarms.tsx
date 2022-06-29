// ACTION TYPES
export const Types = {
  SET_APPOINTMENTS_LIST: "alarms/SET_APPOINTMENTS_LIST",
  SET_SELECTED_APPOINTMENT: "alarms/SET_SELECTED_APPOINTMENT",
  SET_NEW_APPOINTMENT_LOADING: "alarms/SET_NEW_APPOINTMENT_LOADING",
  SET_EDIT_APPOINTMENT_LOADING: "alarms/SET_EDIT_APPOINTMENT_LOADING",
  SET_DELETE_APPOINTMENT_LOADING: "alarms/SET_DELETE_APPOINTMENT_LOADING",

  SET_EXAMS_LIST: "alarms/SET_EXAM_LIST",
  SET_SELECTED_EXAM: "alarms/SET_SELECTED_EXAM",
  SET_NEW_EXAM_LOADING: "alarms/SET_NEW_EXAM_LOADING",
  SET_EDIT_EXAM_LOADING: "alarms/SET_EDIT_EXAM_LOADING",
  SET_DELETE_EXAM_LOADING: "alarms/SET_DELETE_EXAM_LOADING",

  SET_MEDICINES_LIST: "alarms/SET_MEDICINE_LIST",
  SET_SELECTED_MEDICINE: "alarms/SET_SELECTED_MEDICINE",
  SET_NEW_MEDICINE_LOADING: "alarms/SET_NEW_MEDICINE_LOADING",
  SET_EDIT_MEDICINE_LOADING: "alarms/SET_EDIT_MEDICINE_LOADING",
  SET_DELETE_MEDICINE_LOADING: "alarms/SET_DELETE_MEDICINE_LOADING",
};

// reducer
const initialState = {
  appointmentsList: null,
  selectedAppointment: {
    item: null,
    index: null,
  },
  newAppointmentLoading: false,
  editAppointmentLoading: false,
  deleteAppointmentLoading: false,

  examsList: null,
  selectedExam: {
    item: null,
    index: null,
  },
  newExamLoading: false,
  editExamLoading: false,
  deleteExamLoading: false,

  medicinesList: null,
  selectedMedicine: {
    item: null,
    index: null,
  },
  newMedicineLoading: false,
  editMedicineLoading: false,
  deleteMedicineLoading: false,
};

const alarms = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointmentsList: action.payload.data,
      };
    case Types.SET_SELECTED_APPOINTMENT:
      return {
        ...state,
        selectedAppointment: action.payload.data,
      };
    case Types.SET_NEW_APPOINTMENT_LOADING:
      return {
        ...state,
        newAppointmentLoading: action.payload.data,
      };
    case Types.SET_EDIT_APPOINTMENT_LOADING:
      return {
        ...state,
        editAppointmentLoading: action.payload.data,
      };
    case Types.SET_DELETE_APPOINTMENT_LOADING:
      return {
        ...state,
        deleteAppointmentLoading: action.payload.data,
      };
    case Types.SET_EXAMS_LIST:
      return {
        ...state,
        examsList: action.payload.data,
      };
    case Types.SET_SELECTED_EXAM:
      return {
        ...state,
        selectedExam: action.payload.data,
      };
    case Types.SET_NEW_EXAM_LOADING:
      return {
        ...state,
        newExamLoading: action.payload.data,
      };
    case Types.SET_EDIT_EXAM_LOADING:
      return {
        ...state,
        editExamLoading: action.payload.data,
      };
    case Types.SET_DELETE_EXAM_LOADING:
      return {
        ...state,
        deleteExamLoading: action.payload.data,
      };
    case Types.SET_MEDICINES_LIST:
      return {
        ...state,
        medicinesList: action.payload.data,
      };
    case Types.SET_SELECTED_MEDICINE:
      return {
        ...state,
        selectedMedicine: action.payload.data,
      };
    case Types.SET_NEW_MEDICINE_LOADING:
      return {
        ...state,
        newMedicineLoading: action.payload.data,
      };
    case Types.SET_EDIT_MEDICINE_LOADING:
      return {
        ...state,
        editMedicineLoading: action.payload.data,
      };
    case Types.SET_DELETE_MEDICINE_LOADING:
      return {
        ...state,
        deleteMedicineLoading: action.payload.data,
      };
    default:
      return state;
  }
};

export default alarms;

// Action Creators
export const Creators = {
  setAppointmentsList: (data) => ({
    type: Types.SET_APPOINTMENTS_LIST,
    payload: { data },
  }),
  setSelectedAppointment: (data) => ({
    type: Types.SET_SELECTED_APPOINTMENT,
    payload: { data },
  }),
  setNewAppointmentLoading: (data) => ({
    type: Types.SET_NEW_APPOINTMENT_LOADING,
    payload: { data },
  }),
  setEditAppointmentLoading: (data) => ({
    type: Types.SET_EDIT_APPOINTMENT_LOADING,
    payload: { data },
  }),
  setDeleteAppointmentLoading: (data) => ({
    type: Types.SET_DELETE_APPOINTMENT_LOADING,
    payload: { data },
  }),
  setExamsList: (data) => ({
    type: Types.SET_EXAMS_LIST,
    payload: { data },
  }),
  setSelectedExam: (data) => ({
    type: Types.SET_SELECTED_EXAM,
    payload: { data },
  }),
  setNewExamLoading: (data) => ({
    type: Types.SET_NEW_EXAM_LOADING,
    payload: { data },
  }),
  setEditExamLoading: (data) => ({
    type: Types.SET_EDIT_EXAM_LOADING,
    payload: { data },
  }),
  setDeleteExamLoading: (data) => ({
    type: Types.SET_DELETE_EXAM_LOADING,
    payload: { data },
  }),
  setMedicinesList: (data) => ({
    type: Types.SET_MEDICINES_LIST,
    payload: { data },
  }),
  setSelectedMedicine: (data) => ({
    type: Types.SET_SELECTED_MEDICINE,
    payload: { data },
  }),
  setNewMedicineLoading: (data) => ({
    type: Types.SET_NEW_MEDICINE_LOADING,
    payload: { data },
  }),
  setEditMedicineLoading: (data) => ({
    type: Types.SET_EDIT_MEDICINE_LOADING,
    payload: { data },
  }),
  setDeleteMedicineLoading: (data) => ({
    type: Types.SET_DELETE_MEDICINE_LOADING,
    payload: { data },
  }),
};
