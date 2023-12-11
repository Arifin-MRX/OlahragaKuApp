
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ArrowLeft, AddSquare, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddTantangan = () => {
  const dataCategory = [
    {id: 1, name: 'Burpee and Jump Exercise', nameimage: 'Burpee_and_Jump_Exercise', banyak:'20 kali'},
    {id: 2, name: 'Jumping Jack Exercise', nameimage: 'Jumping_Jack_Excercise',banyak:'30 kali'},
    {id: 3, name: 'Cobras Exercises', nameimage: 'Cobras_exercises',banyak:'15 kali'},
    {id: 4, name: 'Frog Press Exercise', nameimage: 'Frog_press_excercise', banyak:'21 kali'},
    {
      id: 5,
      name: 'Inchworm Workout Exercise',
      nameimage: 'Inchworm_workout_excercise',
      banyak:'20 kali'
    },
    {id: 6, name: 'Jumping Squats Exercise', nameimage: 'Jumping_squats_excercise',banyak:'25 kali'},
    {id: 7, name: 'Lunge Exercise', nameimage: 'Lunge_Excercise',banyak:'15 kali'},
    {
      id: 8,
      name: 'Military Push-Ups Exercise',
      nameimage: 'Military_Push_Ups_Exercise',
      banyak:'30 kali'
    },
    {id: 9, name: 'Punches Animation', nameimage: 'Punches_Animation',banyak:'20 kali'},
    {
      id: 10,
      name: 'Reverse Crunches Exercise',
      nameimage: 'Reverse_Crunches_Excercise'
      ,banyak:'20 kali'
    },
    {
      id: 11,
      name: 'Seated Abs Circle Exercise',
      nameimage: 'Seated_Abs_Circle_Excercise'
      ,banyak:'25 kali'

    },
    {id: 12, name: 'Seated Abs Circles', nameimage: 'Seated_abs_circles' ,banyak:'20 kali'},
    {
      id: 13,
      name: 'Shoulder Stretch Exercise',
      nameimage: 'Shoulder_Stretch_Excercise'
      ,banyak:'23 kali'
    },
    {
      id: 14,
      name: 'Single Leg Hip Rotation Exercise',
      nameimage: 'single_leg_hip_rotation_exercise'
      ,banyak:'20 kali'
    },
    {id: 15, name: 'Split Jump Exercise', nameimage: 'Split_Jump_Exercise' ,banyak:'22 kali'},
    {id: 16, name: 'Squat Kick Animation', nameimage: 'Squat_Kick_Animation',banyak:'20 kali'},
    {
      id: 17,
      name: 'Staggered Push-Ups Exercises',
      nameimage: 'Staggered_push_ups_excercises'
      ,banyak:'30 kali'
    },
    {
      id: 18,
      name: 'Step Up On Chair Exercise',
      nameimage: 'Step_Up_On_Chair_Excercise'
      ,banyak:'20 kali'
    },
    {id: 19, name: 'T Plank Animation', nameimage: 'T_Plank_Animation',banyak:'20 kali'},
    {
      id: 20,
      name: 'T Plank Exercise for Home',
      nameimage: 'T_Plank_Exercise_for_Home',
      banyak:'25 kali'
    },
    {
      id: 21,
      name: 'Wide Arm Push-Up Exercise',
      nameimage: 'Wide_arm_push_up_excercise'
      ,banyak:'22 kali'
    },
  ];

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: [],
  });
  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleChange = (key, value) => {
    setBlogData(prevBlogData => {
      if (key === 'category') {
        const updatedCategories = prevBlogData.category.includes(value)
          ? prevBlogData.category.filter(category => category !== value)
          : [...prevBlogData.category, value];

        return {
          ...prevBlogData,
          category: updatedCategories,
        };
      }

      return {
        ...prevBlogData,
        [key]: value,
      };
    });
  };
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleUpload = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`blogimages/${filename}`);

    setLoading(true);
    try {
      await reference.putFile(image);
      const url = await reference.getDownloadURL();
      await firestore().collection('tantangan').add({
        title: blogData.title,
        category: blogData.category,
        image: url,
        createdAt: new Date(),
      });
      setLoading(false);
      console.log('Tantangan berhasil ditambahkan');
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Tambah Tantangan</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontType['Poppins-regular'],
              color: colors.grey(0.6),
            }}>
            Olahraga
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const isSelected = blogData.category.some(
                category => category.id === item.id,
              );
              const bgColor = isSelected
                ? colors.darkModeBlue()
                : colors.grey(0.08);
              const color = isSelected ? colors.white() : colors.grey();

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChange('category', item)}
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {image ? (
          <View style={{position: 'relative'}}>
            <FastImage
              style={{width: '100%', height: 127, borderRadius: 5}}
              source={{
                uri: image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: colors.blue(),
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={colors.white()}
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.borderDashed,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color={colors.grey(0.6)} variant="Linear" size={42} />
              <Text
                style={{
                  fontFamily: fontType['Pjs-Regular'],
                  fontSize: 12,
                  color: colors.grey(0.6),
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      )}
    </View>
  );
};

export default AddTantangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType['Poppins-rold'],
    fontSize: 16,
    color: colors.black(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.blue(),
    borderRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Poppins-semibold'],
    color: colors.white(),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Poppins-semibold'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Poppins-regular'],
    color: colors.black(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Poppins-regular'],
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Poppins-medium'],
  },
});
