import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  ArrowLeft,
  Like1,
  Receipt21,
  Message,
  Share,
  More,
} from 'iconsax-react-native';
import imageSources from '../../components/imageSources';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {fontType, colors} from '../../theme';
import {formatDate} from '../../utils/formatDate';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ActionSheet from 'react-native-actions-sheet';
import auth from '@react-native-firebase/auth';

const DetailTantangan = ({route}) => {
  const {blogId} = route.params;
  const userId = auth().currentUser.uid;
  const [iconStates, setIconStates] = useState({
    liked: {variant: 'Linear', color: colors.grey(0.6)},
    bookmarked: {variant: 'Linear', color: colors.grey(0.6)},
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  // useEffect(() => {
  //   getBlogById();
  // }, [blogId]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('tantangan')
      .doc(blogId)
      .onSnapshot(documentSnapshot => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setSelectedBlog(blogData);
        } else {
          console.log(`Blog with ID ${blogId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [blogId]);

  // const getBlogById = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://6569ec96de53105b0dd7e0b9.mockapi.io/olahragakuapp/olahraga/${blogId}`,
  //     );
  //     setSelectedBlog(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditTantangan', {blogId});
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('tantangan')
        .doc(blogId)
        .delete()
        .then(() => {
          console.log('Tantangan berhasil dihapus!');
        });
      if (selectedBlog?.image) {
        const imageRef = storage().refFromURL(selectedBlog?.image);
        await imageRef.delete();
      }
      console.log('Tantangan berhasil dihapus!');
      closeActionSheet();
      setSelectedBlog(null);
      setLoading(false)
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? colors.blue()
            : colors.grey(0.6),
      },
    }));
  };

  const Kategori = () => {
    const selectedCategory = selectedBlog?.category || []; // Ambil data kategori dari selectedBlog
    console.log(selectedCategory);
    return (
      <View style={{marginHorizontal: 20, marginTop: 10}}>
        {selectedCategory.map((category, index) => (
          <View key={index} style={styles.cardItem}>
            <FastImage
              source={imageSources[category?.nameimage]}
              // source={category?.nameimage}
              // source={require(`../../assets/latihan/${category.nameimage}.gif`)}
              style={{width: 70, height: 70, borderRadius: 20}}
            />
            <View>
              <Text
                style={{
                  fontFamily: fontType['Poppins-semibold'],
                  fontSize: 15,
                }}>
                {category?.name}
              </Text>
              <Text
                style={{
                  fontFamily: fontType['Poppins-Regular'],
                  fontSize: 14,
                }}>
                {category?.banyak}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

const imageSource = {
  uri: selectedBlog?.image,
  headers: { Authorization: 'someAuthToken' },
  priority: FastImage.priority.high,
};
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.grey(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color={colors.grey(0.6)}
              variant="Linear"
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color={colors.blue()} />
        </View>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 62,
            paddingBottom: 54,
          }}>
          <FastImage
            style={styles.image}
            source={imageSource}
            resizeMode={FastImage.resizeMode.cover}></FastImage>

          <View style={styles.boxlist}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={styles.category}>{selectedBlog?.category.name}</Text>
              <Text style={styles.date}>
                {formatDate(selectedBlog?.createdAt)}
              </Text>
            </View>
            <Text style={styles.title}>{selectedBlog?.title}</Text>
            <ScrollView>
              {/* menampilkan semua data pada kategori */}
              <Kategori />
            </ScrollView>
          </View>
        </Animated.ScrollView>
      )}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              fontFamily: fontType['Poppins-medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['Poppins-medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Poppins-medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

export default DetailTantangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.white(),
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: colors.white(),
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 'auto',
    borderTopLeftRadius: 15, // Radius atas kiri
    borderTopRightRadius: 15, // Radius atas kanan
  },
  info: {
    color: colors.grey(0.6),
    fontFamily: fontType['Poppins-memiBold'],
    fontSize: 12,
  },
  category: {
    color: colors.blue(),
    fontFamily: fontType['Poppins-memiBold'],
    fontSize: 12,
  },
  date: {
    color: colors.grey(0.6),
    fontFamily: fontType['Poppins-medium'],
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Poppins-mold'],
    color: colors.black(),
    marginTop: 10,
  },
  content: {
    color: colors.grey(),
    fontFamily: fontType['Poppins-medium'],
    fontSize: 10,
    lineHeight: 20,
    marginTop: 15,
  },
  boxlist: {
    flex: 1,
    backgroundColor: colors.white(),
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 10,
    backgroundColor: colors.white(),
    borderRadius: 20,
    shadowColor: colors.black(0.1),
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowColor: colors.blue(0.2),
  },
});
