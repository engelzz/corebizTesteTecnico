import { NavigationContainer } from '@react-navigation/native';
import { Router } from './app/router/router';

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}