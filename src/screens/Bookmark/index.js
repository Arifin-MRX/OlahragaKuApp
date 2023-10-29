import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Add, Clock, Receipt21} from 'iconsax-react-native';
import {TantanganList} from '../../../data';
import {fontType, colors} from '../../theme';
const Bookmark = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorit</Text>
        <Add color={colors.black()} variant="Linear" size={24} />
      </View>
      <FlatList
        style={styles.container}
        data={TantanganList}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.box}>
            <ImageBackground
              style={styles.cardImage}
              source={item.image}></ImageBackground>
            <View style={styles.boxinfo}>
              <View>
                <View>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Clock
                      size={12}
                      variant="Linear"
                      color={colors.grey(0.6)}
                    />
                    <Text style={styles.cardText}>{item.createdAt}</Text>
                  </View>
                </View>
              </View>
              <Receipt21  size={20} variant="Linear" color={colors.black(0.6)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Bookmark; // Export default seperti yang sudah Anda lakukan

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    gap: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Poppins-semibold'],
    color: colors.black(),
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 20,
    fontFamily: fontType['Poppins-medium'],
    color: colors.black(),
    letterSpacing: -0.3,
  },
  cardImage: {
    width: 90,
    height: 100,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  box: {
    marginHorizontal: 30,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
    backgroundColor: colors.grey(0.1),
    borderRadius: 20,
  },
  boxinfo: {
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
});
