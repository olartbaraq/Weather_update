import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Platform, SafeAreaView, PermissionsAndroid, 
    StatusBar, ToastAndroid, ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { APIKEY } from '@env'
import axios from 'axios';
import HomescreenUI from '../components/HomescreenUI';


const Homepage = () => {

    const [currentLongitude, setCurrentLongitude] = useState('...');
    const [currentLatitude, setCurrentLatitude] = useState('...');
    const [locationStatus, setLocationStatus] = useState('');
    const [weatherValue, setWeatherValue] = useState(null);
    const [loading, setLoading] = useState(true);


   
    
    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {

            const currentLongitude = JSON.stringify(position.coords.longitude);

            const currentLatitude = JSON.stringify(position.coords.latitude);

            setCurrentLongitude(currentLongitude);

            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
    };

      const subscribeLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
     
            const currentLongitude = JSON.stringify(position.coords.longitude);

            const currentLatitude = JSON.stringify(position.coords.latitude);

            setCurrentLongitude(currentLongitude);

            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
    };
    
    useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocation();
          } else {
            try {
                if (Platform.Version <= 29) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getOneTimeLocation();
                        subscribeLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } else {
                        getOneTimeLocation();
                        subscribeLocation();
                } 
                } catch (err) {
                    ToastAndroid.showWithGravityAndOffset(
                        `${err}`,
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        100,
                    );
                    }
                }
                };
        requestLocationPermission();
        return () => {
          Geolocation.clearWatch(watchID);
        };
    }, []);


    useEffect(() => {
      const getWeatherValue = async () => {
        try{
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${currentLatitude}&lon=${currentLongitude}&appid=${APIKEY}`

            const weatherResponse = await axios.get(url);
            setWeatherValue(weatherResponse?.data);
            setLoading(false)
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                'Error fetching weather data',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                100,
            );
        }
      }
      getWeatherValue()
    }, [currentLatitude, currentLongitude])
    
    

  return (
    <>
        {Platform.OS === 'ios' ? (
            <SafeAreaView>
                <StatusBar
                    animated={true}
                    backgroundColor="#30A2C5"
                />
            {loading ? (
            <LinearGradient
                TestID='gradient'
                style={styles.mainUI}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={[ '#30A2C5','#00242F']}
            >
                <View style={styles.container2}>
                    <ActivityIndicator animating={true} size="large" color="#FFF" />
                </View>
            </LinearGradient>) 
        : (
            <HomescreenUI weatherValue={weatherValue} currentLatitude={currentLatitude} currentLongitude={currentLongitude} />
        )}
            </SafeAreaView>
        ): (
            <>
                <StatusBar
                    animated={true}
                    backgroundColor="#30A2C5"
                />
                {loading ? (<LinearGradient
                    TestID='gradient'
                    style={styles.mainUI}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={[ '#30A2C5','#00242F']}
                >
                    <View style={styles.container2}>
                        <ActivityIndicator animating={true} size="large" color="#FFF" />
                    </View>
                </LinearGradient>) 
                : (
                    <HomescreenUI weatherValue={weatherValue} currentLatitude={currentLatitude} currentLongitude={currentLongitude} />
                )}
            </>
        )}
    </>
  );
};

const styles = StyleSheet.create({

    container2: {
       height: hp('100%'),
       width: wp('100%'),
    },
});


export default Homepage;