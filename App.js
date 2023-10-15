import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextBase,
  TextInput,
} from 'react-native';
import {
  Notification,
  Receipt21,
  Clock,
  Message,
  SearchNormal,
} from 'iconsax-react-native';
import {fontType, colors} from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.Headers}>
        <Text style={styles.title}>OlahragaKu</Text>
        <Notification color={colors.black()} varian="linear" size={25} />
      </View>
      <ScrollView>
        <View style={styles.conten}>
          <View>
            <Text>Hallo, Selamat Datang 👋</Text>
            <Text style={styles.namaprofil}>Mohammad Harifin</Text>
          </View>
          <Image
            source={require('./src/assets/img/34.jpg')}
            style={{width: 40, height: 50, borderRadius: 20}}
          />
        </View>
        <View style={styles.boxSearch}>
          <SearchNormal color={colors.black()} variant="Linear" size={20} />
          <TextInput size={14} placeholder="search" color={colors.black()} />
        </View>
        <View style={styles.terbaru}>
          <Text style={styles.titleterbaru}>Tantangan</Text>
          <Text style={styles.lihatsemua}>Lihat Semua</Text>
        </View>
        <ListTantangan />
        <View style={itemolaraga.textcontent}>
          <Text style={styles.titleterbaru}>Olahraga</Text>
          <Text style={styles.lihatsemua}>Lihat Semua</Text>
        </View>
        <ListOlahraga />
      </ScrollView>
    </View>
  );
}

const ListTantangan = () => {
  return (
    <View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={{...itemhorizontal.carditem, marginLeft: 16}}>
          <ImageBackground
            resizeMode="cover"
            style={itemhorizontal.cardImage}
            borderRadius={10}
            // style ={{width: 140, height: 167, borderRadius: 20, marginHorizontal: 20, overflow: 'hidden'}}
            source={require('./src/assets/img/lari.jpg')}>
            <View style={itemhorizontal.cardcontent}>
              <View style={itemhorizontal.cardInfo}>
                <Text style={itemhorizontal.cardtitle}>1 Jam</Text>
                <Text style={itemhorizontal.cardtext}>Oct 10, 2023</Text>
              </View>
              <View>
                <View style={itemhorizontal.cardIcon}>
                  <Receipt21
                    color={colors.black()}
                    variant="Linear"
                    size={20}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{...itemhorizontal.carditem, marginLeft: 16}}>
          <ImageBackground
            resizeMode="cover"
            style={itemhorizontal.cardImage}
            borderRadius={10}
            // style ={{width: 140, height: 167, borderRadius: 20, marginHorizontal: 20, overflow: 'hidden'}}
            source={require('./src/assets/img/pull.jpg')}>
            <View style={itemhorizontal.cardcontent}>
              <View style={itemhorizontal.cardInfo}>
                <Text style={itemhorizontal.cardtitle}>30 Menit</Text>
                <Text style={itemhorizontal.cardtext}>Oct 10, 2023</Text>
              </View>
              <View>
                <View style={itemhorizontal.cardIcon}>
                  <Receipt21
                    color={colors.black()}
                    variant="Linear"
                    size={20}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{...itemhorizontal.carditem, marginLeft: 16}}>
          <ImageBackground
            resizeMode="cover"
            style={itemhorizontal.cardImage}
            borderRadius={10}
            // style ={{width: 140, height: 167, borderRadius: 20, marginHorizontal: 20, overflow: 'hidden'}}
            source={require('./src/assets/img/satu.jpg')}>
            <View style={itemhorizontal.cardcontent}>
              <View style={itemhorizontal.cardInfo}>
                <Text style={itemhorizontal.cardtitle}>15 menit</Text>
                <Text style={itemhorizontal.cardtext}>Oct 10, 2023</Text>
              </View>
              <View>
                <View style={itemhorizontal.cardIcon}>
                  <Receipt21
                    color={colors.black()}
                    variant="Linear"
                    size={20}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{...itemhorizontal.carditem, marginLeft: 16}}>
          <ImageBackground
            resizeMode="cover"
            style={itemhorizontal.cardImage}
            borderRadius={10}
            // style ={{width: 140, height: 167, borderRadius: 20, marginHorizontal: 20, overflow: 'hidden'}}
            source={require('./src/assets/img/gym.jpg')}>
            <View style={itemhorizontal.cardcontent}>
              <View style={itemhorizontal.cardInfo}>
                <Text style={itemhorizontal.cardtitle}>10 menit</Text>
                <Text style={itemhorizontal.cardtext}>Oct 10, 2023</Text>
              </View>
              <View>
                <View style={itemhorizontal.cardIcon}>
                  <Receipt21
                    color={colors.black()}
                    variant="Linear"
                    size={20}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

const ListOlahraga = () => {
  return (
    <ScrollView>
      <View style={itemolaraga.carditem}>
        <ImageBackground
          style={itemolaraga.cardImage}
          borderRadius={10}
          source={require('./src/assets/img/ototperut.jpg')}>
          <View style={itemolaraga.cardcontent}>
            <View style={itemolaraga.cardInfo}>
              <Text style={itemolaraga.cardtitle}>Latihan Otot Perut</Text>
            </View>
            <View>
              <View style={itemhorizontal.cardIcon}>
                <Receipt21 color={colors.white()} variant="Linear" size={30} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={itemolaraga.carditem}>
        <ImageBackground
          style={itemolaraga.cardImage}
          borderRadius={10}
          source={require('./src/assets/img/dada.jpg')}>
          <View style={itemolaraga.cardcontent}>
            <View style={itemolaraga.cardInfo}>
              <Text style={itemolaraga.cardtitle}>Latihan Otot Perut</Text>
            </View>
            <View>
              <View style={itemhorizontal.cardIcon}>
                <Receipt21 color={colors.white()} variant="Linear" size={30} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={itemolaraga.carditem}>
        <ImageBackground
          style={itemolaraga.cardImage}
          borderRadius={10}
          source={require('./src/assets/img/lengan.jpg')}>
          <View style={itemolaraga.cardcontent}>
            <View style={itemolaraga.cardInfo}>
              <Text style={itemolaraga.cardtitle}>Latihan Otot Perut</Text>
            </View>
            <View>
              <View style={itemhorizontal.cardIcon}>
                <Receipt21 color={colors.white()} variant="Linear" size={30} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={itemolaraga.carditem}>
        <ImageBackground
          style={itemolaraga.cardImage}
          borderRadius={10}
          source={require('./src/assets/img/bahudanpunggung.jpg')}>
          <View style={itemolaraga.cardcontent}>
            <View style={itemolaraga.cardInfo}>
              <Text style={itemolaraga.cardtitle}>Latihan Otot Perut</Text>
            </View>
            <View>
              <View style={itemhorizontal.cardIcon}>
                <Receipt21 color={colors.white()} variant="Linear" size={30} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
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
});

const itemhorizontal = StyleSheet.create({
  carditem: {
    width: 140,
  },
  cardImage: {
    width: '100%',
    height: 167,
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
    fontSize: 14,
    fontFamily: fontType['Poppins-bold'],
    color: colors.white(),
  },
  cardtext: {
    fontSize: 8,
    fontFamily: fontType['Poppins-regular'],
    color: colors.white(),
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
    marginHorizontal:20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});
