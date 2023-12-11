import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Receipt21} from 'iconsax-react-native';
import {fontType, colors} from '../theme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../utils/formatDate';

const ItemTantangan = ({item}) => {
  const navigation = useNavigation();

  // Menentukan sumber gambar dengan URI yang telah diverifikasi
  const imageSource = {
    uri: item?.image,
    headers: {Authorization: 'someAuthToken'},
    priority: FastImage.priority.high,
  };
  return (
    <View style={{...itemhorizontal.carditem, marginLeft: 16}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailTantangan', {blogId: item.id})
        }>
        <ImageBackground
          style={itemhorizontal.cardImage}
          source={imageSource}
          borderRadius={10}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={itemhorizontal.cardcontent}>
            <View style={itemhorizontal.cardInfo}>
              <Text style={itemhorizontal.cardtitle}>{item?.title}</Text>
              <Text style={itemhorizontal.cardtext}>
                {formatDate(item?.createdAt)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
export default ItemTantangan;

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
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
