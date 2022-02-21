import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import WallPaperManager from '@ajaybhatia/react-native-wallpaper-manager';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const ViewPhotoScreen = ({navigation, route}) => {
  const clientId = 'GiKgACkGG1Oiy0JGKqzB7K_zs6BIfh2T24G1RfxHkRM';
  const [user, setUser] = useState([]);
  const {userName, Picture, cover} = route.params;
  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch(`https://api.unsplash.com/users/${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Client-ID ${clientId}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setUser(json);
        // console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const wallpaper = cover => {
    WallPaperManager.setWallpaper({uri: cover, screen: 'home'}, res =>
      console.log(res),
    );
    setToastMsg('Wallpaper Updated Successfully');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={{uri: cover}}>
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
            style={styles.HeadContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => wallpaper(cover)}>
              <Text style={styles.Head}>Set as WallPaper</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
            style={styles.footerContainer}>
            <Image style={styles.userPic} source={{uri: Picture}} />
            <View>
              <Text style={styles.wall}>{userName}</Text>
              <Text style={styles.follow}>
                {user.followers_count > 1000
                  ? (user.followers_count / 1000).toFixed(1) + 'K'
                  : user.followers_count}{' '}
                Followers
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  imageBackground: {
    flex: 1,
  },
  Head: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'OpenSans-ExtraBold',
    textTransform: 'uppercase',
  },
  wall: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  follow: {
    color: '#AFAFAF',
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  HeadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  userPic: {
    marginRight: 10,
    height: 46,
    width: 46,
    borderRadius: 46,
  },
});
export default ViewPhotoScreen;
