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
      return 'Actual end date:';
      break;
    case 1:
      return 'Doanh số:';
      break;
    case 2:
      return 'CP triển khai:';
      break;
    case 3:
      return 'LN BASE:';
      break;
    case 4:
      return 'K khoán:';
      break;
    case 5:
      return 'Quỹ khoán:';
      break;
    case 6:
      return 'Lương cứng thực chi:';
      break;
    case 7:
      return 'Quỹ khoán còn lại:';
      break;
    case 8:
      return 'Lương khoán đã chi:';
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
      //key={index}
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
    <View key={data.id} style={{marginBottom: Size.h16 / 2}}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsShowDetail(!isShowDetail);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}>
        <View
          style={{
            paddingHorizontal: Size.h16,
            paddingVertical: Size.s10 + 1,
            backgroundColor: 'white',
            borderRadius: Size.s2 * 4,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '90%'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  fontSize: Size.h14,
                  fontWeight: '500',
                  color: '#595959',
                }}>
                {data.MilestoneKhoan}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
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
              <LineItem title={ReturnTitle(0)} value={data.ActualEndDate} />
              <LineItem
                title={ReturnTitle(1)}
                value={data.DoanhSo.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
              />
              <LineItem
                title={ReturnTitle(2)}
                value={data.ChiPhiTrienKhai.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
              />
              <LineItem
                title={ReturnTitle(3)}
                value={Math.ceil(data.LoiNhuanBase)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              />
              <LineItem title={ReturnTitle(4)} value={data.KKhoanBook} />
              <LineItem
                title={ReturnTitle(5)}
                value={Math.ceil(data.QuyKhoanBook)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              />
              <LineItem
                title={ReturnTitle(6)}
                value={Math.ceil(data.LuongCungDaTraTrongKy)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              />
              <LineItem
                title={ReturnTitle(7)}
                value={Math.ceil(data.QuyKhoanConLai)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              />
              <LineItem
                title={ReturnTitle(8)}
                value={data.LuongKhoanMileStoneDaChi.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
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
