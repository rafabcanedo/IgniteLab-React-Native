import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Logo from '../assets/logo_primary.svg';

// Import Components
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe Email e Senha.');
    }

    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
      setIsLoading(false);

      if (error.code === 'auth/invalid-email') {
        return Alert.alert('Login', 'Email ou senha inválido!');
      }

      if (error.code === 'auth/wrong-password') {
        return Alert.alert('Login', 'Email ou senha inválido!');
      }

      if (error.code === 'auth/user-not-found') {
        return Alert.alert('Login', 'Usuário não cadastrado.')
      }

      return Alert.alert('Login', 'Não foi possível acessar.')
    });
  }

 return(
  <VStack flex={1} alignItems="center" bg="gray.500" px={8} pt={24}>

    <Logo />

    <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
      Acesse sua conta
    </Heading>

    <Input 
     mb={4}
     placeholder="Email"
     InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
     onChangeText={setEmail}
    />
    <Input 
     mb={8}
     placeholder="Password"
     InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
     secureTextEntry
     onChangeText={setPassword}
    />

    <Button 
     title="Login"
     w="full"
     onPress={handleSignIn}
     isLoading={isLoading}
    />

  </VStack>
 );
}