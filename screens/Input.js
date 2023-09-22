import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Platform, SafeAreaView, TextInput, ToastAndroid, ActivityIndicator, TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { APIKEY } from '@env'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Input = () => {

  const navigation = useNavigation();

  const [city, setCityName] = useState('')
  const [weatherValue, setWeatherValue] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    if (loading === false && weatherValue !== null) {
      // Both loading and weatherValue have been updated
      setTimeout(() => {
        navigation.navigate('UserLocation', { loading, weatherValue });
      }, 100);
    }
  }, [loading, weatherValue]);

    console.log('Updated weatherValue:', weatherValue);
    console.log('Updated loading:', loading);

  const checkCityHandler = async () => {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`

    try{
      console.log('City:', city);

      const weatherResponse = await axios.get(url);

      console.log('Weather Data:', weatherResponse?.data);

      setWeatherValue(weatherResponse?.data);
      setLoading(false)

    } catch (error) {
      console.log(error);
      setTimeout(() => {
        switch (error.message) {
          case 'Request failed with status code 404':
            ToastAndroid.showWithGravityAndOffset(
              `City not found`,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              100,
            );
        }
      }, 100);
    }


  }

  return (
    <View>
        <LinearGradient
          TestID='gradient'
          style={styles.mainUI}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[ '#30A2C5','#00242F']}
        >
          <View style={styles.container}>
              <View style={styles.userInput}>
                <Text style={styles.textWhite}>Kindly Enter your city name</Text>
                <TextInput
                  style={styles.input}
                  value={city}
                  onChangeText={text => setCityName(text)}
                  placeholder='Lagos'
                />
                <TouchableOpacity
                  style={styles.checkButton}
                  onPress={checkCityHandler}
                >
                  <Text style={styles.text}>Enter City</Text>
                </TouchableOpacity>
              </View>
          </View>
        </LinearGradient>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center'

  },

  userInput: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    width: wp('80%'),
    height: hp('5%'),
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingLeft: wp('2%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('3%'), 
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },

 checkButton: {
    backgroundColor: '#fff',
    width: wp('70%'),
    height: hp('7%'),
    marginVertical: hp('3%'),
    marginHorizontal: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  text: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: hp('2%'),
    fontWeight: '500'
  },

  textWhite: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: hp('2%'),
    fontWeight: '500',
    marginBottom: hp('5%'),
  }

})

export default Input;