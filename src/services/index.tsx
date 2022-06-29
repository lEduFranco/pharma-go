import axios from "axios";

const api = axios.create({
  baseURL: `https://pharmago-api.azurewebsites.net/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// pharmaGo user id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
// new one: 104df504-3f1f-4f3b-8ed3-c05e3590026b

// USER
export const getEmailValidation = async (email: string): Promise<string> => {
  const response = await api.get(`/Usuario/EmailValidate/${email}`);

  return response.data;
};

export const postLogin = async (
  params: object
): Promise<{
  email: string;
  senha: string;
  tipoUsuario: string;
  id: string;
}> => {
  const response = await api.post(`/Usuario/Logar`, params);

  return response.data;
};

export const postCreateUser = async (
  params: object
): Promise<{
  email: string;
  senha: string;
  tipoUsuario: string;
}> => {
  const response = await api.post(`/Usuario/CreateUser`, params);

  return response.data;
};

export const putUser = async (
  userId: string,
  params: string
): Promise<object> => {
  const response = await api.put(`/Usuario/${userId}`, params);
  console.log(response.data);
  return response.data;
};

// PROFILE
export const getProfileByUserId = async (
  userId: string
): Promise<{
  birthDate: string;
  name: string;
  cpf: string;
  phone: string;
  sexo: string;
  bloodGroup: string;
  preexistingCondition: string;
  specialNeed: string;
  userId: string;
  id: string;
}> => {
  const response = await api.get(`/Perfil/GetByUserId/${userId}`);

  return response.data;
};

export const postProfile = async (params: object): Promise<object> => {
  const response = await api.post(`/Perfil`, params);

  return response.data;
};

export const putProfile = async (
  profileId: string,
  params: string
): Promise<object> => {
  const response = await api.put(`/Perfil/${profileId}`, params);

  return response.data;
};

// ADDRESS
export const getAddressByUserId = async (userId: string): Promise<boolean> => {
  const response = await api.get(`/Enderecos/GetByUserId/${userId}`);

  return response.data;
};

export const postAddress = async (params: object): Promise<boolean> => {
  const response = await api.post(`/Enderecos`, params);

  return response.data;
};

export const putAddress = async (
  id: string,
  params: string
): Promise<boolean> => {
  const response = await api.put(`/Enderecos/${id}`, params);

  return response.data;
};

// CAREGIVERS
export const getCaregiversByUserId = async (
  userId: string
): Promise<object> => {
  const response = await api.get(`/Caregiver/GetByUserId/${userId}`);
  return response.data;
};

export const postCaregiver = async (params: string): Promise<object> => {
  const response = await api.post(`/Caregiver/`, params);
  return response.data;
};

export const putCaregiver = async (
  caregiverId: string,
  params: string
): Promise<void> => {
  const response = await api.put(`/Caregiver/${caregiverId}`, params);
  return response.data;
};

export const deleteCaregiver = async (caregiverId: string): Promise<object> => {
  const response = await api.delete(`/Caregiver/${caregiverId}`);
  return response.data;
};

// EXAMS
export const getExamsByUserId = async (userId: string): Promise<object> => {
  const response = await api.get(`/Exam/GetByUserId/${userId}`);
  return response.data;
};

export const postExam = async (params: string): Promise<object> => {
  const response = await api.post(`/Exam/Adicionar`, params);
  return response.data;
};

export const postExamImage = async (img: string): Promise<object> => {
  const response = await api.post(`/Exam/Imagem`, img);
  return response.data;
};

export const putAddExamImage = async (
  caregiverId: string,
  file: string
): Promise<void> => {
  const response = await api.put(`/Exam/${caregiverId}`, file);
  return response.data;
};

export const deleteExam = async (examId: string): Promise<object> => {
  const response = await api.delete(`/Exam/${examId}`);
  return response.data;
};

// PHARMACY
export const getPharmacyByUserId = async (userId: string): Promise<object> => {
  const response = await api.get(`/Pharmacy/GetByUserId/${userId}`);
  return response.data;
};

export const postPharmacy = async (params: string): Promise<object> => {
  const response = await api.post(`/Pharmacy/`, params);
  return response.data;
};

export const putPharmacy = async (
  caregiverId: string,
  params: string
): Promise<object> => {
  const response = await api.put(`/Pharmacy/${caregiverId}`, params);
  return response.data;
};

export const deletePharmacy = async (caregiverId: string): Promise<object> => {
  const response = await api.delete(`/Pharmacy/${caregiverId}`);
  return response.data;
};

// ALERTS: APPOINTMENT
export const getAppointmentAlertsByUserId = async (
  userId: string
): Promise<object> => {
  const response = await api.get(`/AlarmAppointment/GetByUserId/${userId}`);
  return response.data;
};

export const postAppointmentAlert = async (params: string): Promise<object> => {
  const response = await api.post(`/AlarmAppointment/`, params);
  return response.data;
};

export const putAppointmentAlert = async (
  alertId: string,
  params: string
): Promise<object> => {
  const response = await api.put(`/AlarmAppointment/${alertId}`, params);
  return response.data;
};

export const deleteAppointmentAlert = async (
  alertId: string
): Promise<object> => {
  const response = await api.delete(`/AlarmAppointment/${alertId}`);
  return response.data;
};

// ALERTS: EXAM
export const getExamAlertsByUserId = async (
  userId: string
): Promise<object> => {
  const response = await api.get(`/AlarmExam/GetByUserId/${userId}`);
  return response.data;
};

export const postExamAlert = async (params: string): Promise<object> => {
  const response = await api.post(`/AlarmExam/`, params);
  return response.data;
};

export const putExamAlert = async (
  alertId: string,
  params: string
): Promise<object> => {
  const response = await api.put(`/AlarmExam/${alertId}`, params);
  return response.data;
};

export const deleteExamAlert = async (alertId: string): Promise<object> => {
  const response = await api.delete(`/AlarmExam/${alertId}`);
  return response.data;
};

// ALERTS: MEDICINE
export const getMedicineAlertsByUserId = async (
  userId: string
): Promise<object> => {
  const response = await api.get(`/AlarmMedicine/GetByUserId/${userId}`);
  return response.data;
};

export const postMedicineAlert = async (params: string): Promise<object> => {
  const response = await api.post(`/AlarmMedicine/`, params);
  return response.data;
};

export const putMedicineAlert = async (
  alertId: string,
  params: string
): Promise<object> => {
  const response = await api.put(`/AlarmMedicine/${alertId}`, params);
  return response.data;
};

export const deleteMedicineAlert = async (alertId: string): Promise<object> => {
  const response = await api.delete(`/AlarmMedicine/${alertId}`);
  return response.data;
};

// AUX TYPES: ALLERGIES
export const getAllergies = async (): Promise<object> => {
  const response = await api.get(`/Allergy/`);
  return response.data;
};

export const putAllergiesProfile = async (
  profileId: string,
  params: string
): Promise<object> => {
  const response = await api.put(
    `/Allergy/PerfilAllergyListEdit/${profileId}`,
    params
  );

  return response.data;
};

// AUX TYPES: HEALTH PLANS
export const getHealthPlans = async (): Promise<object> => {
  const response = await api.get(`/HealthPlan/`);
  return response.data;
};

// AUX TYPES: HOW TO USE
export const getHowToUse = async (): Promise<object> => {
  const response = await api.get(`/HowToUse/`);
  return response.data;
};

// AUX TYPES: EXAM TYPES
export const getExamTypes = async (): Promise<object> => {
  const response = await api.get(`/ExamType/`);
  return response.data;
};

// AUX TYPES: FAMILY DISEASES
export const getFamilyDiseases = async (): Promise<object> => {
  const response = await api.get(`/FamilyDiseases/`);
  return response.data;
};

export const putFamilyDiseasesProfile = async (
  profileId: string,
  params: string
): Promise<object> => {
  const response = await api.put(
    `/FamilyDiseases/FamilyDiseasesPerfilListEdit/${profileId}`,
    params
  );

  return response.data;
};

// AUX TYPES: INSTRUCTION USE
export const getInstructionUses = async (): Promise<object> => {
  const response = await api.get(`/InstructionUse/`);
  return response.data;
};

// AUX TYPES: MEDICAL SPECIALTIES
export const getMedicalSpecialties = async (): Promise<object> => {
  const response = await api.get(`/MedicalSpecialty/`);
  return response.data;
};
