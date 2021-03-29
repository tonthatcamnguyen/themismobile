import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';
import Size from '../../res/values/Sizes';

const ReturnTitle = (idx) => {
  switch (idx) {
    case 0:
      return 'Số cán bộ';
      break;
    case 1:
      return 'Approved time sheet:';
      break;
    default:
      break;
  }
};
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LineItem = ({title, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
        paddingVertical: Size.h10,
      }}>
      <Text style={{fontSize: Size.h14, color: '#595959'}}>{title}</Text>
      <Text style={{color: '#595959', fontSize: Size.h14}}>{value}</Text>
    </View>
  );
};

const ItemGroup = forwardRef((props, ref) => {
  const {data} = props;
  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <View key={data.id} style={{marginBottom: Size.h16/2}}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsShowDetail(!isShowDetail);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}>
        <View
          style={{
            paddingHorizontal: Size.h16,
            paddingVertical: Size.s10,
            backgroundColor: 'white',
            borderRadius: Size.s2 * 4,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  fontSize: Size.h16,
                  fontWeight: '500',
                  color: '#262626',
                  fontSize:Sizes.h16
                }}>
                Tổng số dự án
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginRight: Size.s10,
                  fontSize: Size.h14,
                  fontWeight: '500',
                  color: '#FA541C',
                }}>
                {data.lsDuAn}
              </Text>
              {isShowDetail ? (
                <Image source={images.imgUp} />
              ) : (
                <Image source={images.imgDown} />
              )}
            </View>
          </View>

          {isShowDetail && (
            <View
              style={{
                flex: 1,
                paddingVertical: Size.h12,
              }}>
              <LineItem
                title={ReturnTitle(0)}
                value={(data.lsNV)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              />
              <LineItem
                title={ReturnTitle(1)}
                value={(data.sumAproved)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});
ItemGroup.defaultProps = {};
export default ItemGroup;
