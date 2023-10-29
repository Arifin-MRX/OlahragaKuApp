import React from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import {colors, fontType} from '../../theme';
import {ototperut} from '../../theme/img';
import {ArrowLeft} from 'iconsax-react-native';
import ItemOtotPerut from '../../components/ItemOtotPerut';
const Latihan = item => {
  return (
    <View style={{marginHorizontal: 20, marginTop: 10}}>
      <View style={styles.cardItem}>
        <Image
          source={item.image}
          style={{width: 70, height: 70, borderRadius: 20}}
        />
        <View>
          <Text
            style={{
              fontFamily: fontType['Poppins-semibold'],
              fontSize: 15,
            }}>
            {item.title}
          </Text>
          <Text style={{fontFamily: fontType['Poppins-Regular'], fontSize: 14}}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
};
const ItemLatihanOtotPerut = () => {
  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground source={ototperut} style={{height: 250, width: '100%'}}>
        <View style={styles.header}>
          <TouchableOpacity>
            <ArrowLeft color={colors.white()} variant="Linear" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Oto Perut</Text>
        </View>
      </ImageBackground>
      <View style={styles.boxlist}>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Mulai</Text>
        </TouchableOpacity>
        <ScrollView>
          <ItemOtotPerut />
        </ScrollView>
      </View>
    </View>
  );
};
export {Latihan, ItemLatihanOtotPerut};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 20,
  },
  title: {
    fontFamily: fontType['Poppins-semibold'],
    fontSize: 20,
    color: colors.white(),
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 20,
    marginVertical: 10,
    padding: 10,
    backgroundColor: colors.white(),
    borderRadius: 20,
    shadowColor: colors.black(0.1),
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    shadowColor: colors.blue(0.2),
  },
  button: {
    backgroundColor: colors.blue(), // Ganti dengan warna latar belakang yang Anda inginkan
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontFamily: fontType['Poppins-semibold'],
    fontSize: 18,
    color: colors.white(),
  },
  boxlist: {
    flex: 1,
    backgroundColor: colors.white(),
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
});
