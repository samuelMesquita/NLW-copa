import { Center, StatusBar, NativeBaseProvider  } from 'native-base';

import { useFonts ,Roboto_700Bold ,Roboto_500Medium ,Roboto_400Regular } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/Theme'
import { Loading } from './src/components/Loading';
import SingIn from './src/screens/SignIn';



export default function App() {
  const [fontLoaded] = useFonts({Roboto_700Bold ,Roboto_500Medium ,Roboto_400Regular});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
     
      <Center flex={1} bgColor='gray.900'>
        {
          fontLoaded ? <SingIn/> :<Loading/>
        }
      </Center>
    </NativeBaseProvider>
  );
}

