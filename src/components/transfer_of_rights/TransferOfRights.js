import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default class TransferOfRights extends React.Component {
  constructor() {
    super();
    this.state = {
      remember: false,
      lanhdao: false,
      nhanvien: false,
      quantri: false,
      data: [
        {
          title: 'Lãnh đạo Fis',
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba'
        },
        {
          title: 'Nhân Viên',
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        },
        {
          title: 'Quản trị dự án',
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
        },
      ],
    };
  }


  onPressRemember = () => {
    this.setState({
      remember: !this.state.remember,

    });
  };


  render() {
    return (
      <SafeAreaView style={styles.AllView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={images.back}
            />
          </TouchableOpacity>
          <Text
            style={{ color: '#262626', fontWeight: '500', fontSize: Sizes.h16 }}>
            Đổi quyền
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{ color: '#1890FF', fontSize: Sizes.h16 }}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Body}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id}
            renderItem={(item) => {
              console.log('item', item);
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    this.onPressRemember('item', item.item.id);
                    console.log("ID ddaay", item.item.id);
                  }}>
                  <Text style={styles.title}>{item.item.title}</Text>
                  <Icon
                    style={styles.iconBox}
                    name={this.state.remember ? 'dot-circle' : 'circle'}
                  />
                </TouchableOpacity>
              );
            }}
          // extraData={selectedId}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  AllView: {
    flex: 1,
    //backgroundColor: '#E5E5E5',
  },
  header: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: Sizes.h16,
    justifyContent: 'space-between'
  },
  Body: {
    //backgroundColor:'#E5E5E5',
    flexWrap: 'wrap',
    padding: Sizes.h16 / 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Sizes.h16,
    paddingVertical: Sizes.h10 + 1,
    marginVertical: Sizes.h16 / 2,
    marginHorizontal: Sizes.h16 / 2,
    borderRadius: Sizes.h16 / 2,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Sizes.h14,
    color: '#595959',
  },
  iconBox: {
    fontSize: 16,
    color: '#597EF7',
  },
});
