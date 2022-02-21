import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  BackHandler,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const input = useRef();
  const clientId = 'GiKgACkGG1Oiy0JGKqzB7K_zs6BIfh2T24G1RfxHkRM';
  const [photo, setPhoto] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);

  useEffect(() => {
    GetAllPhotos();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const GetAllPhotos = () => {
    fetch(`https://api.unsplash.com/photos?per_page=20`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Client-ID ${clientId}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setAllPhotos(json);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const SearchPhotos = search => {
    fetch(
      `https://api.unsplash.com/search/photos?per_page=20&query=${search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Client-ID ${clientId}`,
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setPhoto(json.results);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const NextScreen = (username, large, full) => {
    navigation.navigate('ViewPhotoScreen', {
      userName: username,
      Picture: large,
      cover: full,
    });
  };
  const backSearchScreen = () => {
    setFocus(false);
    input.current.clear();
  };

  const resetText = () => {
    setFocus(true);
    input.current.clear();
  };

  return (
    <SafeAreaView style={styles.container}>
      {!focus && search.length == 0 ? (
        <View style={{marginTop: 24, marginHorizontal: 20}}>
          <Text style={styles.Head}>Unsplash</Text>
          <Text style={styles.wall}>WallPapers</Text>
        </View>
      ) : null}

      <View style={styles.textContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => backSearchScreen()}>
            <Icon
              name={focus || search.length > 0 ? 'arrowleft' : 'search1'}
              size={focus || search.length > 0 ? 25 : 20}
              color={focus || search.length > 0 ? '#FFFFFF' : '#3B3B3B'}
            />
          </TouchableOpacity>
          <TextInput
            ref={input}
            value={search}
            placeholder="Search"
            placeholderTextColor={'#3B3B3B'}
            style={styles.mobileValue}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onChangeText={query => {
              SearchPhotos(query), setSearch(query);
            }}
          />
        </View>
        {search.length > 0 ? (
          <TouchableOpacity onPress={() => resetText()}>
            <Icon name="close" size={20} color="#3B3B3B" />
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={search.length == 0 ? allPhotos : photo}
        renderItem={({item}) => (
          <View style={{flex: 1, margin: 10}}>
            <TouchableOpacity
              onPress={() =>
                NextScreen(
                  item.user?.username,
                  item.user?.profile_image?.large,
                  item.urls?.full,
                )
              }>
              <Image
                style={{
                  width: '100%',
                  height: 300,
                  borderRadius: 6,
                  resizeMode: 'cover',
                }}
                source={{uri: item.urls?.full}}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  mobileValue: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regulardf',
    padding: 10,
    color: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
    backgroundColor: '#191919',
    height: 45,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
});
export default HomeScreen;
