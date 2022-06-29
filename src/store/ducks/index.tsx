import { combineReducers } from "redux";

import alarms from "./alarms";
import allergies from "./allergies";
import auth from "./auth";
import caregivers from "./caregivers";
import exams from "./exams";
import examTypes from "./examTypes";
import familyDiseases from "./familyDiseases";
import healthPlans from "./healthPlans";
import howToUse from "./howToUse";
import instructionUses from "./instructionUses";
import location from "./location";
import medicalSpecialties from "./medicalSpecialties";
import pharmacy from "./pharmacy";
import user from "./user";

export default combineReducers({
  user,
  auth,
  location,
  caregivers,
  medicalSpecialties,
  instructionUses,
  examTypes,
  alarms,
  pharmacy,
  howToUse,
  exams,
  allergies,
  familyDiseases,
  healthPlans,
});
