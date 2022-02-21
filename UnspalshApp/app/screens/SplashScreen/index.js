import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SplashScreen = props => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.navigation.navigate('HomeScreen');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.Head}>Unsplash</Text>
        <Text style={styles.wall}>WallPapers</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent:'center',
    backgroundColor: '#101010',
  },
  Head: {
    color: '#FFFFFF',
    fontSize: 40,
    fontFamily: 'OpenSans-Light',
  },
  wall: {
    color: '#FFFFFF',
    fontSize: 40,
    fontFamily: 'OpenSans-ExtraBold',
  },
});

export default SplashScreen;
