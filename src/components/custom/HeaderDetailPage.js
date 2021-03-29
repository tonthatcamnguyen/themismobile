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

export default class HeaderDetailPage extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <View>
        <View style={stylesHeader.headerDetailPage}>
          <TouchableOpacity
            onPress={() => this.props.goBack()}
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
          <View></View>
        </View>
      </View>
    );
  }
}
