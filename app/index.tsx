import React, { useState, useEffect } from "react";
import LoginScreen from './views/LoginScreen';
import DoctorDashboardScreen from './views/DoctorDashboardScreen';
import { getItem } from "./services/storageService";
import PatientDashboardScreen from './views/PatientDashboardScreen';

export default function Index() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const profile = await getItem('user_profile');
      if (profile?.role) setUserRole(profile.role);
    };
    checkSession();
  }, []);

  if (userRole === 'Doctor') {
    return <DoctorDashboardScreen />;
  }
  
  if (userRole === 'Patient') {
    return <PatientDashboardScreen />; 
  }

  return <LoginScreen />;
}