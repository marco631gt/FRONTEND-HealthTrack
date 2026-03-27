import { useState } from "react";
import { Alert } from "react-native";

export const useForm = () => {
  //Definicion de nuestros estados
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');


  // Function to trigger the action button btn
  const handleBtnHello = () => {
    //Empty space validation
    if (name.trim() === '' || lastName.trim() === '' || email.trim() === '') {
      Alert.alert('Error', 'Please, all fields are required');
      return;
    }

    if(!email.includes('@')){
            Alert.alert('Error', 'Email not valid');
            return;
        }

    //Show alerts with hello message
    Alert.alert('Welcome:!', `Hello, ${name} and your Last Name is ${lastName} with the email ${email}`);


    //Clean
    setName('');
    setlastName('');
    setEmail('');

  }

  //Structure
  return {
    name,
    setName,
    lastName,
    setlastName,
    email,
    setEmail,
    handleBtnHello
  }
}


