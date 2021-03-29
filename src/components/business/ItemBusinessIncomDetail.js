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
import size from '../../res/size';
import Size from '../../res/values/Sizes';


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

const ItemGroup = forwardRef((props, ref) => {
  let value = props.value
  const { data, year } = props;
  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <View style={{ marginBottom: Size.h16 }}>
      {/* key={data.id} */}
      <View
        style={{
          paddingHorizontal: Size.h16,
          // paddingVertical: Size.s10,
          backgroundColor: '#FFFFFF',
          borderRadius: Size.s2 * 4,
        }}>

        <View
          style={{
            flex: 1,
            paddingVertical: Size.h12,
          }}>


          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: '#F5F5F5',
              paddingBottom: Size.h10,
            }}>
            <Text style={{ fontSize: Size.h16, color: '#595959', fontWeight: 'bold' }}>
              {' '}
                Tên dự án:
                </Text>
            <Text style={{justifyContent:"flex-end", paddingLeft: Size.s10, color: '#595959', fontSize: Size.h16, fontWeight: 'bold', flex: 1 }} ellipsizeMode="tail" numberOfLines={1}>
              {data.TenDuAn}
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
            <Text style={{ fontSize: Size.h14, color: '#595959', paddingRight: Size.h14, }}>
              {' '}
                Khách hàng:
                </Text>

            <Text style={{ paddingTop: size.s10 - 3, color: '#595959', fontSize: Size.h14, flex : 1  }} numberOfLines={1}>
              {data.TenKhachHang}
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
                Loại sản phẩm:
                </Text>
            <Text style={{ color: '#595959', fontSize: Size.h14 }}>
              {data.LoaiSanPham}
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
            <Text style={{ fontSize: Size.h14, color: '#595959' }}> Doanh số:</Text>

            <Text style={{ color: '#595959', fontSize: Size.h14 }}>
              {currencyFormat(year === "nam truoc" ?  data.PLHTDoanhSo :  data.PLDoanhSo) }
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
               LN Base:
                </Text>
            <Text style={{ color: '#595959', fontSize: Size.h14 }}>
              {currencyFormat(year === "nam truoc" ?  data.PLHTLoiNhuanBase :  data.PLLoiNhuanBase) }
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
              Thu nhập dự kiến:
                </Text>
            <Text style={{ color: '#595959', fontSize: Size.h14 }}>
            {currencyFormat(year === "nam truoc" ?  data.PLHTTongThuNhapDuKien :  data.PLTongThuNhapDuKien) }
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
          Thu nhập theo công thức:
                </Text>
            <Text style={{ color: '#595959', fontSize: Size.h14 }}>
              {currencyFormat(year === "nam truoc" ? data.PLHTThuNhapTheoCongThuc : data.ThuNhapTheoCongThucKhoan)}
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
});
ItemGroup.defaultProps = {
  TenKhachHang: '',
  LoaiSanPham: '',
  DoanhSo: '',
  LoiNhuan: '',
  TongThuNhapDuKien: '',
  ThuNhapTheoCongThucKhoan: ''
};
export default ItemGroup;
