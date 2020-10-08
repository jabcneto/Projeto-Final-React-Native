import * as React from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

function App() {
  const [isReady, setIsReady] = React.useState(false);
  if (!isReady) {
    return (
      <LottieView
        source={require('./src/assets/splash_screen/inicial.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => setIsReady(true)}
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
