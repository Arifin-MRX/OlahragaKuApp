import React , {useEffect, useState, useCallback, useRef}from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator, RefreshControl
} from 'react-native';
import {colors, fontType} from '../../theme';
import {ProfileData} from '../../../data';
import {Logout, GalleryEdit} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import ItemTantangan from '../../components/ItemTantangan';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import FastImage from 'react-native-fast-image';
 import {formatDate} from '../../utils/formatDate';
 import ActionSheet from 'react-native-actions-sheet';

export default function Profile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const actionSheetRef = useRef(null);

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  useEffect(() => {
    const user = auth().currentUser;
    const fetchBlogData = () => {
      try {
        if (user) {
          const userId = user.uid;
          const blogCollection = firestore().collection('tantangan');
          const query = blogCollection.where('authorId', '==', userId);
          const unsubscribeBlog = query.onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBlogData(blogs);
            setLoading(false);
          });

          return () => {
            unsubscribeBlog();
          };
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
              fetchBlogData();
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchBlogData();
    fetchProfileData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('tantangan')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  const handleLogout = async () => {
    try {
      closeActionSheet();
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.containerProfil}>
          <View style={styles.lingkaran}>
            {/* <Image source={ProfileData.image} style={styles.profileImage} /> */}
            <FastImage
            style={styles.profileImage}
            source={{
              uri: profileData?.photoUrl,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
            <GalleryEdit
              style={styles.iconGaleri}
              color={colors.black()}
              variant={'Bold'}
              size={20}
            />
          </View>
          <Text style={styles.name}>{profileData?.fullName}</Text>
          <Text style={styles.email}>{profileData?.email}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddTantangan')}>
          <View style={styles.editButton}>
            <Text style={styles.editButtonText}>Tambah Tantangan</Text>
          </View>
        </TouchableOpacity>
        <View style={{paddingVertical: 10, gap: 10}}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.blue()} />
          ) : (
            blogData.map((item, index) => <ItemTantangan item={item} key={index} />)
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
    marginBottom: 10,
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
