import { useLocalSearchParams } from 'expo-router';
import AppointmentDetailsScreen from '../../views/AppointmentDetailsScreen';

export default function AppointmentPage() {
    const { id } = useLocalSearchParams();
    // ID que viene de la URL al componente de la vista
    return <AppointmentDetailsScreen appointmentId={id} />;
}