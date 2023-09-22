import React from 'react'
import { View, StyleSheet, Platform, SafeAreaView, PermissionsAndroid, 
    StatusBar, ToastAndroid, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute  } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomescreenUI from '../components/HomescreenUI';


const UserLocation = () => {

    const route = useRoute();

    const { loading, weatherValue } = route.params;

    console.log({ loading, weatherValue })


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
            <HomescreenUI weatherValue={weatherValue} currentLatitude={weatherValue?.coord?.lat} currentLongitude={weatherValue?.coord?.lon} />
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
                    <HomescreenUI weatherValue={weatherValue} currentLatitude={weatherValue?.coord?.lat} currentLongitude={weatherValue?.coord?.lon} />
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

export default UserLocation