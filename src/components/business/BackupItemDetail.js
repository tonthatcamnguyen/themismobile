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
  import images from '../../res/images/index';
  import Size from '../../res/values/Sizes';
  
  const ReturnTitle = (idx) => {
    switch (idx) {
      case 0:
        return 'Doanh số:';
        break;
      case 1:
        return 'Lợi nhuận Base:';
        break;
      case 2:
        return 'Thu nhập dự kiến:';
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
  
  const ItemGroup = forwardRef((props, ref) => {
    const {data} = props;
    const [isShowDetail, setIsShowDetail] = useState(false);
    return (
      <View key={data.id} style={{marginBottom: Size.h16}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsShowDetail(!isShowDetail);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }}>
          <View
            style={{
              paddingHorizontal: Size.h16,
              paddingVertical: Size.s10,
              backgroundColor: '#FFFFFF',
              borderRadius: Size.s2 * 4,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: Size.h16,
                  fontWeight: 'bold',
                  color: '#595959',
                }}>
                {data.label}{' '}
              </Text>
              {isShowDetail ? (
                <Image source={images.imgUp} />
              ) : (
                <Image source={images.imgDown} />
              )}
            </View>
  
            {isShowDetail && (
              <View
                style={{
                  flex: 1,
                  paddingVertical: Size.h12,
                }}>
                {data.value.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{fontSize: Size.h14, color: '#595959'}}>
                        {' '}
                        {ReturnTitle(index)}{' '}
                      </Text>
                      <Text style={{color: '#595959', fontSize: Size.h14}}>
                        {data.value[index]}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  });
  ItemGroup.defaultProps = {};
  export default ItemGroup;
  