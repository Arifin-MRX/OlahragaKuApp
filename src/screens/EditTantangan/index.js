import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import axios from 'axios';

const EditTantangan = ({ route }) => {
  const { blogId } = route.params;
  const dataCategory = [
    { id: 1, name: 'Burpee and Jump Exercise', nameimage: 'Burpee_and_Jump_Exercise', banyak: '20 kali' },
    { id: 2, name: 'Jumping Jack Exercise', nameimage: 'Jumping_Jack_Excercise', banyak: '30 kali' },
    { id: 3, name: 'Cobras Exercises', nameimage: 'Cobras_exercises', banyak: '15 kali' },
    { id: 4, name: 'Frog Press Exercise', nameimage: 'Frog_press_excercise', banyak: '21 kali' },
    {
      id: 5,
      name: 'Inchworm Workout Exercise',
      nameimage: 'Inchworm_workout_excercise',
      banyak: '20 kali'
    },
    { id: 6, name: 'Jumping Squats Exercise', nameimage: 'Jumping_squats_excercise', banyak: '25 kali' },
    { id: 7, name: 'Lunge Exercise', nameimage: 'Lunge_Excercise', banyak: '15 kali' },
    {
      id: 8,
      name: 'Military Push-Ups Exercise',
      nameimage: 'Military_Push_Ups_Exercise',
      banyak: '30 kali'
    },
    { id: 9, name: 'Punches Animation', nameimage: 'Punches_Animation', banyak: '20 kali' },
    {
      id: 10,
      name: 'Reverse Crunches Exercise',
      nameimage: 'Reverse_Crunches_Excercise',
      banyak: '20 kali'
    },
    {
      id: 11,
      name: 'Seated Abs Circle Exercise',
      nameimage: 'Seated_Abs_Circle_Excercise',
      banyak: '25 kali'
    },
    { id: 12, name: 'Seated Abs Circles', nameimage: 'Seated_abs_circles', banyak: '20 kali' },
    {
      id: 13,
      name: 'Shoulder Stretch Exercise',
      nameimage: 'Shoulder_Stretch_Excercise',
      banyak: '23 kali'
    },
    {
      id: 14,
      name: 'Single Leg Hip Rotation Exercise',
      nameimage: 'single_leg_hip_rotation_exercise',
      banyak: '20 kali'
    },
    { id: 15, name: 'Split Jump Exercise', nameimage: 'Split_Jump_Exercise', banyak: '22 kali' },
    { id: 16, name: 'Squat Kick Animation', nameimage: 'Squat_Kick_Animation', banyak: '20 kali' },
    {
      id: 17,
      name: 'Staggered Push-Ups Exercises',
      nameimage: 'Staggered_push_ups_excercises',
      banyak: '30 kali'
    },
    {
      id: 18,
      name: 'Step Up On Chair Exercise',
      nameimage: 'Step_Up_On_Chair_Excercise',
      banyak: '20 kali'
    },
    { id: 19, name: 'T Plank Animation', nameimage: 'T_Plank_Animation', banyak: '20 kali' },
    {
      id: 20,
      name: 'T Plank Exercise for Home',
      nameimage: 'T_Plank_Exercise_for_Home',
      banyak: '25 kali'
    },
    {
      id: 21,
      name: 'Wide Arm Push-Up Exercise',
      nameimage: 'Wide_arm_push_up_excercise',
      banyak: '22 kali'
    },
  ];
  const [blogData, setBlogData] = useState({
    title: '',
    category: [],
    image: null, // tambahkan image di state
  });
  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogById();
  }, [blogId]);

  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://6569ec96de53105b0dd7e0b9.mockapi.io/olahragakuapp/olahraga/${blogId}`,
      );
  
      const categoryData = response.data.category || []; // Gunakan nilai default array jika undefined
      setBlogData({
        title: response.data.title,
        category: categoryData,
        image: response.data.image,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://6569ec96de53105b0dd7e0b9.mockapi.io/olahragakuapp/olahraga/${blogId}`, {
        title: blogData.title,
        category: blogData.category,
        image: blogData.image, // gunakan image dari state
      });

      setLoading(false);
      navigation.navigate('Profile');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Edit blog</Text>
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
          <TextInput
            placeholder="Image"
            value={blogData.image}
            onChangeText={text => handleChange('image', text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontType['Pjs-Regular'],
              color: colors.grey(0.6),
            }}>
            Category
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
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
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

export default EditTantangan;

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
    fontFamily: fontType['Pjs-Bold'],
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
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
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
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
    fontFamily: fontType['Pjs-Medium'],
  },
});