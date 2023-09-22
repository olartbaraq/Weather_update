import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Homepage, Input } from '../screens';
import Icons from '../utils/Icons';



const Tab = createBottomTabNavigator();

function Bottomtab() {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === 'Homepage') {
              iconName = focused ? 'home-circle-outline-red' : 'home-circle-outline-blue';
            } else if (route.name === 'Input') {
              iconName = focused ? 'file-text-red' : 'file-text-blue';
            } 
            return <Icons name={iconName} />;
        }
    })}
    initialRouteName='Homepage'
    >
      <Tab.Screen 
        name="Homepage" 
        component={Homepage} 
        options={{
            headerShown: false,
            tabBarLabel: 'Home',
            }}
        />

        <Tab.Screen 
        name="Input" 
        component={Input} 
        options={{
            headerShown: false,
            tabBarLabel: 'Input',
            }}
        />

    </Tab.Navigator>
  );
}

export default Bottomtab;