import React, {useEffect, useState,useCallback} from 'react';
import {Animated} from 'react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator, RefreshControl
} from 'react-native';
import {Notification, SearchNormal} from 'iconsax-react-native';
import {fontType, colors, img} from '../../theme';;
import axios from 'axios';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import ItemTantangan from '../../components/Tantangan';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataBlog = async () => {
    try {
      const response = await axios.get(
        'https://6569ec96de53105b0dd7e0b9.mockapi.io/olahragakuapp/olahraga',
      );
      setBlogData(response.data);
      setLoading(false)
    } catch (error) {
        console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataBlog()
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, [])
  );
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Durasi animasi dalam milidetik
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <View style={styles.Headers}>
        <Text style={styles.title}>OlahragaKu</Text>
        <Notification color={colors.black()} varian="linear" size={25} />
      </View>
      <ScrollView  showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.conten}>
          <Animated.View style={{opacity: fadeAnim}}>
            <Text>Hallo, Selamat Datang 👋</Text>
            <Text style={styles.namaprofil}>Mohammad Harifin</Text>
          </Animated.View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Animated.Image
              source={require('../../assets/img/34.jpg')}
              style={{
                width: 40,
                height: 50,
                borderRadius: 20,
                opacity: fadeAnim,
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity >
          <View style={styles.boxSearch}>
            <SearchNormal color={colors.black()} variant="Linear" size={20} />
            <TextInput size={14} placeholder="search" color={colors.black()} />
          </View>
        </TouchableOpacity>
        <View style={styles.terbaru}>
          <Text style={styles.titleterbaru}>Tantangan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Bookmark')}>
            <Text style={styles.lihatsemua}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardTantangan}>
        <ListTantangan />
        </View>
        <View style={itemolaraga.textcontent}>
          <Text style={styles.titleterbaru}>Olahraga</Text>
        </View>
        <ListOlahraga />
      </ScrollView>
    </Animated.View>
  );
}

const ListTantangan = () => {
  const [blogData, setBlogData] = useState([]);
  const getDataBlog = async () => {
    try {
      const response = await axios.get(
        'https://6569ec96de53105b0dd7e0b9.mockapi.io/olahragakuapp/olahraga',
      );
      setBlogData(response.data);
    } catch (error) {
        console.error(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, [])
  );
  return (
    <FlatList
    data={blogData}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.itemtantangan}
    renderItem={({ item, index }) => <ItemTantangan item={item} key={index} />}
    keyExtractor={(item) => item.id.toString()}
  />
  );
};

const ListOlahraga = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemLatihanOtotPerut')}>
        <View style={itemolaraga.carditem}>
          <ImageBackground
            style={itemolaraga.cardImage}
            borderRadius={10}
            source={require('../../assets/img/ototperut.jpg')}>
            <View style={itemolaraga.cardcontent}>
              <View style={itemolaraga.cardInfo}>
                <Text style={itemolaraga.cardtitle}>Latihan Otot Perut</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemLatihanOtotDada')}>
        <View style={itemolaraga.carditem}>
          <ImageBackground
            style={itemolaraga.cardImage}
            borderRadius={10}
            source={require('../../assets/img/dada.jpg')}>
            <View style={itemolaraga.cardcontent}>
              <View style={itemolaraga.cardInfo}>
                <Text style={itemolaraga.cardtitle}>Latihan Otot dada</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemLatihanOtotLengan')}>
        <View style={itemolaraga.carditem}>
          <ImageBackground
            style={itemolaraga.cardImage}
            borderRadius={10}
            source={require('../../assets/img/lengan.jpg')}>
            <View style={itemolaraga.cardcontent}>
              <View style={itemolaraga.cardInfo}>
                <Text style={itemolaraga.cardtitle}>Latihan Otot lengan</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemLatihanOtotBahudanPunggung')}>
        <View style={itemolaraga.carditem}>
          <ImageBackground
            style={itemolaraga.cardImage}
            borderRadius={10}
            source={require('../../assets/img/bahudanpunggung.jpg')}>
            <View style={itemolaraga.cardcontent}>
              <View style={itemolaraga.cardInfo}>
                <Text style={itemolaraga.cardtitle}>
                  Latihan Otot bahu & penggung
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const itemolaraga = StyleSheet.create({
  textcontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  carditem: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 123,
  },
  cardcontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    maxWidth: '70%',
  },
  cardtitle: {
    fontSize: 18,
    fontFamily: fontType['Poppins-bold'],
    color: colors.white(),
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  Headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Poppins-bold'],
    color: colors.black(),
  },
  conten: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  namaprofil: {
    fontSize: 20,
    fontFamily: fontType['Poppins-bold'],
    color: colors.black(),
  },
  terbaru: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titleterbaru: {
    fontSize: 16,
    fontFamily: fontType['Poppins-semibold'],
    color: colors.black(),
  },
  lihatsemua: {
    fontSize: 12,
    fontFamily: fontType['Poppins-reguler'],
    color: colors.blue(),
  },
  boxSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F6FF',
    opacity: 0.5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  itemtantangan: {
    paddingVertical: 10,
    gap: 10,
    flexDirection: 'row',
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardTantangan: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
