import React, {Component} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Sizes from '../../res/values/Sizes';
import images from '../../res/images/index';

const itemTransferOfRight = (props) => {
  const styleCustom = (id) => {
    if (id % 2 == 0 || id == 0) {
      return {
        marginBottom: Sizes.h16 / 2,
        marginRight: Sizes.h16 / 2,
        marginTop: Sizes.h16 / 2,
      };
    } else {
      return {
        marginBottom: Sizes.h16 / 2,
        marginLeft: Sizes.h16 / 2,
        marginTop: Sizes.h16 / 2,
      };
    }
  };
  return (
    <View
      style={[
        {
          height: Sizes.s160 + Sizes.s2 * 2,
          width: Sizes.s160 + Sizes.s2,
          backgroundColor: 'white',
          borderRadius: Sizes.s2 * 4,
          //  padding: Sizes.s20
        },
        styleCustom(props.item.id),
      ]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Sizes.h14,
          paddingTop: Sizes.h16,
        }}>
        <Image source={props.item.images} />
        <Text
          style={{
            fontSize: Sizes.h14,
            textAlign: 'center',
            paddingVertical: Sizes.h16 / 2,
          }}>
          {props.item.label}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: Sizes.h16}}>
          {props.item.value} VND
        </Text>
      </View>
    </View>
  );
};
export default itemTransferOfRight;
