import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Receipt21,
} from 'iconsax-react-native';
import {fontType, colors} from '../theme';
import FastImage from 'react-native-fast-image';

const ItemTantangan = ({item, onPress}) => {
  return (
    <View style={{...itemhorizontal.carditem, marginLeft: 16}}>
      <ImageBackground
        style={itemhorizontal.cardImage}
        source={item.image}
        borderRadius={10}
          resizeMode={FastImage.resizeMode.cover}>
        <View style={itemhorizontal.cardcontent}>
          <View style={itemhorizontal.cardInfo}>

            <Text style={itemhorizontal.cardtitle}>{item.description}</Text>
            <Text style={itemhorizontal.cardtext}>{item.createdAt}</Text>
          </View>
          <View>
            <View style={itemhorizontal.cardIcon}>
              <TouchableOpacity onPress={onPress}>
                <Receipt21 color={colors.black()} variant={variant} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const Tantangan = ({data}) => {
    const [bookmark, setbookmark] = useState([]);
    const tooggleBookmark = (id) => {
        if (bookmark.includes(id)) {
            setbookmark(bookmark.filter((item) => item !== id));
        } else {
            setbookmark([...bookmark, id]);
        }
    };
    renderItem = ({item}) => {
        variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
        return (
          <ItemTantangan 
                item={item}
                variant={variant}
                onPress={() => tooggleBookmark(item.id)}
                />
        );
    };
    return (
        <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={item => renderItem({...item})}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        contentContainerStyle={{paddingHorizontal: 24}}
        horizontal
        showsHorizontalScrollIndicator={false}
        />
    );
};
export default Tantangan;

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
