import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../../theme";

const AddTantangan = () => {
    const dataCategory = [
        { id: 1, name: "Burpee and Jump Exercise" },
        { id: 2, name: "Jumping Jack Exercise" },
        { id: 3, name: "Cobras Exercises" },
        { id: 4, name: "Frog Press Exercise" },
        { id: 5, name: "Inchworm Workout Exercise" },
        { id: 6, name: "Jumping Squats Exercise" },
        { id: 7, name: "Lunge Exercise" },
        { id: 8, name: "Military Push-Ups Exercise" },
        { id: 9, name: "Punches Animation" },
        { id: 10, name: "Reverse Crunches Exercise" },
        { id: 11, name: "Seated Abs Circle Exercise" },
        { id: 12, name: "Seated Abs Circles" },
        { id: 13, name: "Shoulder Stretch Exercise" },
        { id: 14, name: "Single Leg Hip Rotation Exercise" },
        { id: 15, name: "Split Jump Exercise" },
        { id: 16, name: "Squat Kick Animation" },
        { id: 17, name: "Staggered Push-Ups Exercises" },
        { id: 18, name: "Step Up On Chair Exercise" },
        { id: 19, name: "T Plank Animation" },
        { id: 20, name: "T Plank Exercise for Home" },
        { id: 21, name: "Wide Arm Push-Up Exercise" },
      ];
      
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    categories: [],
    totalLikes: 0,
    totalComments: 0,
  });
  const handleChange = (key, value) => {
    setBlogData((prevBlogData) => {
      // Jika kunci adalah "category", toggle kategori yang dipilih dalam array
      if (key === "category") {
        const categoryIndex = prevBlogData.categories.findIndex(
          (category) => category.id === value.id
        );

        // Jika kategori sudah dipilih, hapus; sebaliknya, tambahkan
        const updatedCategories =
          categoryIndex !== -1
            ? [
                ...prevBlogData.categories.slice(0, categoryIndex),
                ...prevBlogData.categories.slice(categoryIndex + 1),
              ]
            : [...prevBlogData.categories, value];

        return {
          ...prevBlogData,
          categories: updatedCategories,
        };
      }

      // Jika kunci bukan "category", perbarui state langsung
      return {
        ...prevBlogData,
        [key]: value,
      };
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Tambah Tantangan</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Image"
            value={image}
            onChangeText={(text) => setImage(text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontType["Pjs-Regular"],
              color: colors.grey(0.6),
            }}
          >
            Olahraga 
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const isSelected = blogData.categories.some(
                (category) => category.id === item.id
              );
              const bgColor = isSelected ? colors.darkModeBlue() : colors.grey(0.08);
              const color = isSelected ? colors.white() : colors.grey();

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange("category", { id: item.id, name: item.name })
                  }
                  style={[category.item, { backgroundColor: bgColor }]}
                >
                  <Text style={[category.name, { color: color }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType["Pjs-Bold"],
    fontSize: 16,
    color: colors.black(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: "flex-end",
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
    fontFamily: fontType["Poppins-semibold"],
    color: colors.white(),
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType["Poppins-semibold"],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType["Pjs-Regular"],
    color: colors.black(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType["Pjs-Regular"],
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
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
    fontFamily: fontType["Pjs-Medium"],
  },
});
