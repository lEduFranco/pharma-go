import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Alarms from "../pages/Alarms";
import AppointmentAlarm from "../pages/Alarms/AppointmentAlarm";
import ExamAlarm from "../pages/Alarms/ExamAlarm";
import MedicineAlarm from "../pages/Alarms/MedicineAlarm";
import NewAppointmentAlarm from "../pages/Alarms/NewAppointmentAlarm";
import NewExamAlarm from "../pages/Alarms/NewExamAlarm";
import NewMedicineAlarm from "../pages/Alarms/NewMedicineAlarm";
import Caregivers from "../pages/Caregivers";
import EditCaregiver from "../pages/Caregivers/EditCaregiver";
import NewCaregiver from "../pages/Caregivers/NewCaregiver";
import Configurations from "../pages/Configurations";
import Exams from "../pages/Exams";
import EditExam from "../pages/Exams/EditExam";
import NewExam from "../pages/Exams/NewExam";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Pharmacy from "../pages/Pharmacy";
import NewReceipt from "../pages/Pharmacy/NewReceipt";
import Receipt from "../pages/Pharmacy/Receipt";
import Products from "../pages/Products";
import Profile from "../pages/Profile";

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="Configurations" component={Configurations} />
    <App.Screen name="Pharmacy" component={Pharmacy} />
    <App.Screen name="Receipt" component={Receipt} />
    <App.Screen name="NewReceipt" component={NewReceipt} />
    <App.Screen name="Alarms" component={Alarms} />
    <App.Screen name="AppointmentAlarm" component={AppointmentAlarm} />
    <App.Screen name="ExamAlarm" component={ExamAlarm} />
    <App.Screen name="MedicineAlarm" component={MedicineAlarm} />
    <App.Screen name="NewAppointmentAlarm" component={NewAppointmentAlarm} />
    <App.Screen name="NewExamAlarm" component={NewExamAlarm} />
    <App.Screen name="NewMedicineAlarm" component={NewMedicineAlarm} />
    <App.Screen name="Caregivers" component={Caregivers} />
    <App.Screen name="EditCaregiver" component={EditCaregiver} />
    <App.Screen name="NewCaregiver" component={NewCaregiver} />
    <App.Screen name="Products" component={Products} />
    <App.Screen name="Exams" component={Exams} />
    <App.Screen name="EditExam" component={EditExam} />
    <App.Screen name="NewExam" component={NewExam} />
    <App.Screen name="Map" component={Map} />
  </App.Navigator>
);

export default AppRoutes;
