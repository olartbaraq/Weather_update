import React from 'react'
import { View, Text, StyleSheet, Platform, SafeAreaView, PermissionsAndroid, 
    StatusBar, FlatList, ToastAndroid, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import numeral from 'numeral';
import Icons from '../utils/Icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




const HomescreenUI = ({currentLatitude, currentLongitude, weatherValue}) => {

    const cardDays = [
        {id: 1, day: 'Sunday', temp: 10, icon: 'rainy'},
        {id: 2, day: 'Monday', temp: 8, icon: 'sunny'},
        {id: 3, day: 'Tuesday', temp: 3, icon: 'cloudy'},
        {id: 4, day: 'Thursday', temp: 5, icon: 'rainy'},
        {id: 5, day: 'Friday', temp: 9, icon: 'sunny'}
    ]

    const formattedLat = numeral(currentLatitude).format('0.0000');
    const formattedLong = numeral(currentLongitude).format('0.0000');

    const getDateandTime = (timezone) => {

        const timezoneOffsetInSeconds = (timezone);

        const timezoneOffsetInMilliseconds = timezoneOffsetInSeconds * 1000;
    
        const currentDate = new Date();

        const adjustedDate = new Date(currentDate.getTime() + timezoneOffsetInMilliseconds);

        const inputDateString = adjustedDate;

        const date = new Date(inputDateString);

        const padZero = (num) => (num < 10 ? `0${num}` : num);

        const day = padZero(date.getDate());
        const month = padZero(date.getMonth() + 1);
        const year = date.getFullYear();

        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());

        const amOrPm = hours < 12 ? "am" : "pm";

        const adjustedHours = hours > 12 ? hours - 12 : hours;

        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${adjustedHours}:${minutes} ${amOrPm}`;

        const result = `Date: ${formattedDate}, Time: ${formattedTime}`;

        return (result);
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
                <View style={styles.mainElements}>
                    <Text style={styles.date}>{getDateandTime(weatherValue?.timezone_offset || weatherValue?.timezone)}</Text>
                    {typeof(weatherValue?.timezone) == 'string' ? (
                        <Text style={styles.place}>{weatherValue?.timezone}</Text>
                    ): (<Text style={styles.place}>{weatherValue?.name}/{weatherValue?.sys?.country}</Text>)}
                    <Text style={styles.city}>Latitude: {formattedLat}</Text>
                    <Text style={styles.city}>Longitude: {formattedLong}</Text>
                    <View style={styles.circle}>
                        {
                            (weatherValue?.current?.weather?.slice(0,1)?.map((value) => (
                                <View key={value.id}>
                                    <Icons name={value.main}/>
                                </View>
                            ))) || (
                                weatherValue?.weather?.slice(0,1)?.map((value) => (
                                    <View key={value.id}>
                                        <Icons name={value.main}/>
                                    </View>
                            )))
                            }
                        <Text style={styles.temp}>{(weatherValue?.current?.temp) || (weatherValue?.main?.temp)}°F</Text>
                    </View>
                </View>

                <View style={styles.all_column}>
                    <View style={styles.firstRow}>
                        <View style={styles.firstColumn}>
                            <Text style={styles.header}>Wind Speed</Text>
                            <Text style={styles.value}>{(weatherValue?.current?.wind_speed) || (weatherValue?.wind?.speed)} mph</Text>
                        </View>

                        <View style={styles.secondColumn}>
                            <Text style={styles.header}>Pressure</Text>
                            <Text style={styles.value}>{(weatherValue?.current?.pressure) || (weatherValue?.main?.pressure)} miles</Text>
                        </View>
                    </View>

                    <View style={styles.firstRow}>
                        <View style={styles.firstColumn}>
                            <Text style={styles.header}>Humidity</Text>
                            <Text style={styles.value}>{(weatherValue?.current?.humidity) || (weatherValue?.main?.humidity)}%</Text>
                        </View>

                        <View style={styles.secondColumn}>
                            <Text style={styles.header}>Weather</Text>
                            {
                            (weatherValue?.current?.weather?.slice(0,1)?.map((value) => (
                                <View key={value.id}>
                                <Text style={styles.value}>{value.description}</Text>
                                </View>
                            ))) || (
                                weatherValue?.weather?.slice(0,1)?.map((value) => (
                                    <View key={value.id}>
                                        <Text style={styles.value}>{value.description}</Text>
                                    </View>
                            )))
                            }
                            
                        </View>
                    </View>
                    
                </View>
            </View>
        </LinearGradient>

        <View style={styles.daysCard}>
            <Text style={styles.daysText}>The Next 5 days</Text>
            <FlatList 
                data={cardDays}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({item: card}) => (
                    <View style={styles.wholeCard}>
                        <View style={styles.wholeEachCard}>
                            <Text style={styles.weekday}>{card.day}</Text>
                            <View style={styles.eachCard}>
                                <Icons name={card.icon} />
                                <Text>{card.temp}°C</Text>
                            </View>
                        </View>

                    </View>
                )}
            />
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
       height: hp('70%'),
       width: wp('100%'),
    },

    container2: {
       height: hp('100%'),
       width: wp('100%'),
    },

    daysCard: {
        backgroundColor: '#F2F2F2',
        borderTopRightRadius: hp('5%'),
        borderTopLeftRadius:hp('5%'),
        marginTop: hp('-5%'),
        height: hp('35%'),
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('2%'),
    },

    daysText: {
        marginTop: hp('3%'),
        fontFamily: 'Roboto',
        fontSize: hp('2%'),
        fontWeight: '700',
        color: '#000'
    },

    wholeCard: {
        marginTop: hp('3%'),
    },

    wholeEachCard: {
        marginHorizontal: wp('3%'),
    },

    eachCard: {
        borderWidth: 1,
        borderRadius: hp('2%'),
        borderColor: '#000',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('6%'),
        width: wp('15%'),
        paddingVertical: hp('1%'),
    },

    weekday: {
        color: '#000',
        fontFamily: 'Roboto',
        fontSize: hp('2%'),
        fontWeight: '500',
        alignSelf: 'center',
    },

    mainElements: {
        flexDirection: 'column',
        height: hp('30%'),
        marginVertical: hp('5%'),
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    circle: {
        backgroundColor: '#FFFFFF',
        height: hp('19%'),
        width: wp('40%'),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      
    },

    date: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: hp('2%'),
    },

    place: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: hp('4%'),
        fontWeight: 'bold',
    },

    city: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: hp('2%'),
        marginBottom: hp('1%'),
    },

    temp: {
        color: '#000',
        fontFamily: 'Roboto',
        fontSize: hp('3%'),
    },

    all_column: {
        flexDirection: 'column',
        height: hp('25'),
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    firstRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('60%'),
    },

    firstColumn: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    secondColumn: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: hp('2%'),
    },

    value: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: hp('2%'),
        fontWeight: '800'
    }

});

export default HomescreenUI