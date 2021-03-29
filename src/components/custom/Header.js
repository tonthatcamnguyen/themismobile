import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  Touch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import images from '../../res/images/index';
import Sizes from '../../res/values/Sizes';
import stylesHeader from '../../res/values/styles/custom/stylesHeader';
import BottomSheet from '../custom/BottomSheet';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{title: 2019}, {title: 2020}, {title: 2021}],
    };
    this.modal = React.createRef();
  }

  render() {
    return (
      <View style={stylesHeader.allView}>
        <View style={stylesHeader.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{
              width: Sizes.h30,
              height: Sizes.h30,
              paddingVertical: Sizes.h10 - 1,
            }}>
            <Image
              style={{
                height: Sizes.h16,
                width: Sizes.h16,
                alignContent: 'center',
              }}
              source={images.menuHeader}
            />
          </TouchableOpacity>
          <Image
            style={stylesHeader.logoThemis}
            source={images.themis}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => this.props.onPressRight()}
            style={{
              width: Sizes.h20,
              height: Sizes.h30,
              paddingVertical: Sizes.h10 - 1,
            }}>
            <Image
              style={stylesHeader.rightHeader}
              source={images.rightHeader}
            />
          </TouchableOpacity>
          <BottomSheet
            ref={this.modal}
            data={this.state.data}
            isYear={true}
            title="Chọn năm"
          />
        </View>
      </View>
    );
  }
}
