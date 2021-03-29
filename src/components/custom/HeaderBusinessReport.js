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

export default class HeaderBusinessReport extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <View>
        <View style={stylesHeader.headerDetailPage}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{paddingRight: Sizes.h18}}>
            <Image source={images.back} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Sizes.h16,
              fontWeight: 'bold',
              paddingRight: Sizes.h20,
            }}>
            {this.props.title}
          </Text>
          <TouchableOpacity onPress={() => this.props.onPressRight()}>
            <Image
              style={stylesHeader.rightHeader}
              source={images.rightHeader}
              //onPress
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
