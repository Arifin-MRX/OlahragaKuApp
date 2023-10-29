import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, fontType } from '../../theme';
import { ProfileData } from '../../../data';
import { Logout,GalleryEdit } from 'iconsax-react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.containerProfil}>
        <View style={styles.lingkaran}>
          <Image source={ProfileData.image} style={styles.profileImage} />
          <GalleryEdit style={styles.iconGaleri} color={colors.black()} variant={'Bold'} size={20} />
        </View>
        <Text style={styles.name}>{ProfileData.name}</Text>
        <Text style={styles.email}>{ProfileData.email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Logout color={colors.white()} variant={'Bold'} size={20} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  containerProfil: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  lingkaran: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.blue(),
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fontType['Poppins-bold'],
  },
  email: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
    fontFamily: fontType['Poppins-light'],
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.blue(),
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  editButtonText: {
    color: 'blue',
    fontSize: 16,
    fontFamily: fontType['Poppins-reguler'],
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20, // Jarak dari bawah
    right: 20, // Jarak dari kanan
    backgroundColor: '#C70039', // Ganti warna sesuai preferensi
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  iconGaleri: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.white(),
    borderRadius: 5,
    padding: 10,
  },
});
