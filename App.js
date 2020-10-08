import * as React from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

function App() {
  const [isReady, setIsReady] = React.useState(false);
  const splash = () => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  };

  if (!isReady) {
    return (
      <LottieView
        style={{backgroundColor: '#14213D'}}
        source={require('./src/assets/splash_screen/inicial.json')}
        autoPlay
        speed={0.7}
        loop={false}
        onAnimationFinish={splash}
      />
    );
  }
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
