import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Receipt21, Clock, Message} from 'iconsax-react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../theme';
import {formatDate} from '../utils/formatDate';

const ItemTantangan = ({item}) => {
  const navigation = useNavigation();
  const defaultimage =
    'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
  // Mendefinisikan fungsi untuk mendapatkan URI gambar yang telah diverifikasi
  const getImageUri = url => {
    // Menentukan ekstensi gambar yang diizinkan (misal: jpg, jpeg, png)
    const allowedExtensions = ['jpg', 'jpeg', 'png'];

    // Mengecek apakah URL gambar didefinisikan
    if (!url) {
      // Mengembalikan URL gambar default jika URL tidak didefinisikan
      return defaultimage;
    }

    // Mendapatkan ekstensi file dari URL
    const ext = url.split('.').pop().toLowerCase();

    // Mengecek apakah ekstensi gambar diizinkan
    if (allowedExtensions.includes(ext)) {
      return url;
    } else {
      // Mengembalikan URL gambar default jika ekstensi tidak diizinkan
      return defaultimage;
    }
  };

  // Mendapatkan URI gambar yang telah diverifikasi
  const imageUri = getImageUri(item.image);

  // Menentukan sumber gambar dengan URI yang telah diverifikasi
  const imageSource = {
    uri: imageUri,
    headers: {Authorization: 'someAuthToken'},
    priority: FastImage.priority.high,
  };
  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('DetailTantangan', {blogId: item.id})}>
      <FastImage
        style={styles.cardImage}
        source={imageSource}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}>
          <View style={{gap: 5, flex: 1}}>
            <Text style={styles.cardTitle}>{item?.title}</Text>
          </View>
          <Receipt21 color={colors.grey(0.6)} variant="Linear" size={20} />
        </View>
        <View style={styles.cardInfo}>
          <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
          <Text style={styles.cardText}>{formatDate(item?.createdAt)}</Text>
          <Message size={10} variant="Linear" color={colors.grey(0.6)} />
          {/* <Text style={styles.cardText}>{item?.totalComments}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemTantangan;

const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: colors.blue(0.03),
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.6),
  },
  cardImage: {
    width: 94,
    height: 94,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
