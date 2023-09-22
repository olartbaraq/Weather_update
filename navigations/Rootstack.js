import 'react-native-gesture-handler';
import React, {useEffect} from 'react'
import BackgroundColor from 'react-native-background-color';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Bottomtab } from '../navigations'
import { UserLocation } from '../screens'

const Stack = createStackNavigator();


const Rootstack = () => {

    const theme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          border: "transparent",
          background: '#fff',
        }
      }
      useEffect(() => {
        BackgroundColor.setColor('#FFFFFF');
    }, []);

  return (
    <>
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                initialRouteName='bottomtab'
                screenOptions={{
                    header: () => null
                }}
            >
                <Stack.Screen name="bottomtab" component={Bottomtab} />

                <Stack.Screen name="UserLocation" component={UserLocation} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
  );
};

export default Rootstack;