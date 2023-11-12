import * as React from 'react';
import { Home ,Profile, Bookmark, ItemLatihanOtotPerut} from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
// export default function App() {
//     return (<Home/>);
// }
import Router from './src/navigation/Router';
export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
    // <ItemLatihanOtotPerut/>
  );
}