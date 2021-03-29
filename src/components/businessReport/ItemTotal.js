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
import size from "../../res/size";
const ReturnTitle = (idx) => {
  switch (idx) {
    case 0:
      return 'Bộ phận:';
      break;
    case 1:
      return 'Dự án năm trước:';
      break;
    case 2:
      return 'Dự án năm nay:';
      break;
    case 3:
      return 'Thu nhập lũy kế đã trả:';
      break;
    case 4:
      return 'Thu nhập còn được trả:';
      break;
    case 5:
      return 'Lương khoán chi trả đợt này:';
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
const currencyFormat = (num) => {
  if (num == 0) {
    return '0';
  } else {
    return parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
};

const ItemGroup = ({ data, indexItem }) => {

 
  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <View style={{ marginBottom: Size.h16 / 2 }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: Size.h16,
                fontWeight: 'bold',
                color: '#595959',
                // paddingBottom: Size.h16 / 2
              }}>
              {data.AM} ({data.ACCAM})
            </Text>
            {isShowDetail ? (
              <Image source={images.imgUp} />
            ) : (
              <Image source={images.imgDown} />
            )}
          </View>

          <View >
            {isShowDetail ?
              <View style={{ marginBottom: Size.h16 }}>
                {/* key={data.id} */}
                <View
                  style={{
                    // paddingHorizontal: Size.h16,
                    backgroundColor: '#FFFFFF',
                    borderRadius: Size.s2 * 4,
                    marginTop: Size.h16/2
                  }}>
                  <View
                    style={{
                      flex: 1,
                    }}>
                  <View
                      style={{
                        flexDirection: 'row',
                        borderTopWidth: 1,
                        justifyContent: 'space-between',
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}>
                        Bộ phận:
                       </Text>
                      <Text style={{ paddingTop: size.s10 - 3, color: '#595959', fontSize: Size.h14, fontWeight:'bold' }} numberOfLines={1}>
                        {data.Khoi}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        // flex: 1,
                        justifyContent: 'space-between',
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}>
                        Dự án năm trước:
                       </Text>
                      <Text style={{ paddingTop: size.s10 - 3, color: '#595959', fontSize: Size.h14 }} numberOfLines={1}>
                        {currencyFormat(data.TienHopDongKyTruoc)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}>
                        {' '}
                       Dự án năm nay: 
                       </Text>
                      <Text style={{ color: '#595959', fontSize: Size.h14 }}>
                        {currencyFormat(data.TienHopDongKyMoi)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}> Thu nhập lũy kế đã trả:</Text>

                      <Text style={{ color: '#595959', fontSize: Size.h14 }}>
                        {currencyFormat(data.LuongKhoanLuyKeDaTraKyTruoc)}
                      </Text>
                    </View>
                    <View

                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}>
                        {' '}
                      Thu nhập còn được trả:
                       </Text>
                      <Text style={{ color: '#595959', fontSize: Size.h14 }}>
                        {currencyFormat(data.LuongKhoanLuyKeDaTraKyTruoc)}

                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}>
                        {' '}
                     Thu nhập còn được trả:
                       </Text>
                      <Text style={{ color: '#595959', fontSize: Size.h14 }}>
                        {currencyFormat(data.ThuNhapConLai)}

                      </Text>
                    </View>

                    <View

                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        paddingVertical: Size.h10,
                      }}>
                      <Text style={{ fontSize: Size.h14, color: '#595959' }}>
                        {' '}
                  Lương khoán chi trả kì này:
                       </Text>
                      <Text style={{ color: '#595959', fontSize: Size.h14 }}>
                        {currencyFormat(data.ThuNhapTraTrongKy)}

                      </Text>
                    </View>
                  </View>
                </View>

              </View> : null}
          </View>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
// ItemGroup.defaultProps = {
//   ACCAM: '',
//   Khoi: '',
//   TienHopDongKyTruoc: '',
//   TienHopDongKyMoi: '',
//   TongThuNhapDuKien: '',
//   LuongKhoanLuyKeDaTraKyTruoc: '',
//   ThuNhapConLai: '',
//   ThuNhapTraTrongKy: '',

// };
export default ItemGroup;
