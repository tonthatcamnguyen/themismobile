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
import Size from '../../res/values/Sizes';

const ReturnTitle = (idx) => {
  switch (idx) {
    case 0:
      return 'Approved/time sheet:';
      break;
    case 1:
      return 'Hệ số trách nhiệm:';
      break;
    case 2:
      return 'Tính đúng hạn:';
      break;
    case 3:
      return 'Hiệu quả:';
      break;
    case 4:
      return 'Thái độ:';
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
  return(
    <View
        //key={index}
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderColor: '#F5F5F5',
          paddingVertical: Size.h10,
        }}>
        <Text style={{fontSize: Size.h14, color: '#595959'}}>
  
          {title}
        </Text>
        <Text style={{color: '#595959', fontSize: Size.h14}}>
          {value}
        </Text>
      </View>
  )
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
            backgroundColor: 'white',
            borderRadius: Size.s2 * 4,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '90%'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: Size.h16,
                fontWeight: '500',
                color: '#262626',
              }}>
              {data.MilestoneKhoan}{' '}
            </Text>
            </View>
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
            <LineItem title= {ReturnTitle(0)} value ={data.SoApproved}/>
            <LineItem title= {ReturnTitle(1)} value ={data.HeSoTrachNhiem}/>
            <LineItem title= {ReturnTitle(2)} value ={data.TinhDungHanThoiGian}/>
            <LineItem title= {ReturnTitle(3)} value ={data.CongViecHoanThanhHieuQua}/>
            <LineItem title= {ReturnTitle(4)} value ={data.ThaiDoHopTac}/>
              
            
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});
ItemGroup.defaultProps = {};
export default ItemGroup;
