import React from 'react';
import { StyleSheet } from 'react-native';
import ClearIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RainyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SunnyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CloudyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FileIcon from 'react-native-vector-icons/MaterialIcons';
import HazeIcon from 'react-native-vector-icons/Fontisto';

const Icons = ({name}) => {
    switch(name) {
        case 'Clear':
            return <ClearIcon name="weather-cloudy" size={40} color="#000" />
            break;
        case 'Clouds':
            return <CloudyIcon name="weather-partly-cloudy" size={40} color="#000" />
            break;
        case 'Haze':
            return <HazeIcon name="day-haze" size={40} color="#000" />
            break;
        case 'cloudy':
            return <ClearIcon name="weather-cloudy" size={20} color="#000" />
            break;
        case 'Rain':
            return <RainyIcon name="weather-pouring" size={40} color="#000" />
            break;
        case 'rainy':
            return <RainyIcon name="weather-pouring" size={20} color="#000" />
            break;
        case 'rainy2':
            return <RainyIcon name="weather-pouring" size={70} color="#000" />
            break;
        case 'sunny':
            return <SunnyIcon name="weather-sunny" size={20} color="#000" />
            break;
        case 'home-circle-outline-blue':
            return <HomeIcon name="home-circle-outline" size={25}  color="#034273" />
            break;
        case 'home-circle-outline-red':
            return <HomeIcon name="home-circle-outline" size={25}  color="#FB6A0F" /> 
            break;
        case 'file-text-blue':
            return <FileIcon name="history" size={25}  color="#034273" />
            break;
        case 'file-text-red':
            return <FileIcon name="history" size={25}  color="#FB6A0F" />
            break;

        
        default:
            return <Icon name="chevron-left" size={30} color="#000" />
    }
}

export default Icons;