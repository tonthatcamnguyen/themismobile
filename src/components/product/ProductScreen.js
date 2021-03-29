import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';
import Pie from 'react-native-pie';
import ActivityRings from 'react-native-activity-rings';
import {VictoryPie, VictoryChart, VictoryAxis} from 'victory-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

export default class Produces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: '',
      SoDA: 0,
      ThaiDo: 0,
      Khoiluong: 0,
      TienDo: 0,
      ChatLuong: 0,
      Quy1: 0,
      Quy2: 0,
      Quy3: 0,
      Quy4: 0,
      Total: 0,
      PercentQuy1: 0,
      PercentQuy2: 0,
      PercentQuy3: 0,
      PercentQuy4: 0,
    };
  }

  componentDidMount() {
    this.props.postProjectHomeAction();
    this.props.getKyTinhKhoanAction();
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.data !== null) & (this.props.data !== prevProps.data)) {
      //console.log('data san xuat', this.props.data.lists);
      this.setState({
        SoDA: this.props.data.moreInfo.SoDA,
      });
    }

    if ((this.props.error !== null) & (this.props.error !== prevProps.error)) {
      Snackbar.show({
        text: this.props.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    if (
      (this.props.dataky !== null) &
      (this.props.dataKy !== prevProps.dataKy)
    ) {
      //console.log('data Kỳ', this.props.dataKy);
      await this.setState({
        DataKy: this.props.dataKy,
      });
    }
    if (
      (this.props.errorKy !== null) &
      (this.props.errorKy !== prevProps.errorKy)
    ) {
      Snackbar.show({
        text: this.props.errorKy,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    if (!this.props.dataKy?.length || !this.props.data?.lists?.length) return;
    const dataKy = this.props.dataKy;
    const dataSX = this.props.data.lists;
    
    let tongListtd = 0;
    let TongthaiDoHopTac = 0;
    dataSX.forEach((itemSX) => {
      itemSX.list.forEach((item) => {
        if (item.ThaiDoHopTac > 0) {
          tongListtd++;
        }
        TongthaiDoHopTac += item.ThaiDoHopTac;
      });
    });
    var thaiDoHopTac = TongthaiDoHopTac / tongListtd;

    let TongListKL = 0;
    let Tongkhoiluong = 0;
    dataSX.forEach((itemSX) => {
      itemSX.list.forEach((item) => {
        if (item.KhoiLuongCongViec > 0) {
          TongListKL++;
        }
        Tongkhoiluong += item.KhoiLuongCongViec;
      });
    });
    var khoiLuong = Tongkhoiluong / TongListKL;

    let TonglistTDH = 0;
    let TongTiendo = 0;
    dataSX.forEach((itemTD) => {
      itemTD.list.forEach((item) => {
        if (item.TinhDungHanThoiGian > 0) {
          TonglistTDH++;
        }
        TongTiendo += item.TinhDungHanThoiGian;
      });
    });
    var Tiendo = TongTiendo / TonglistTDH;

    let TonglistCL = 0;
    let Tongchatluong = 0;
    dataSX.forEach((itemCL) => {
      itemCL.list.forEach((item) => {
        if (item.CongViecHoanThanhHieuQua > 0) {
          TonglistCL++;
        }
        Tongchatluong += item.CongViecHoanThanhHieuQua;
      });
    });

    var Chatluong = Tongchatluong / TonglistCL;
    let array = [0, 0, 0, 0];
    dataKy.forEach((item) => {
      dataSX.forEach((itemSx) => {
        itemSx?.list.forEach((itemss) => {
          if (itemss.KyTinhKhoan == item.id)
            array[item.Quy] += itemss.DuLieuChiTra;
        });
      });
    });
    this.setState({
      Quy1: array[0],
      Quy2: array[1],
      Quy3: array[2],
      Quy4: array[3],
      Total: array[0] + array[1] + array[2] + array[3],
      PercentQuy1:
        Math.ceil((array[0] / (array[0] + array[1] + array[2] + array[3])) * 100),
      PercentQuy2:
        Math.ceil((array[1] / (array[0] + array[1] + array[2] + array[3])) * 100),
      PercentQuy3:
        Math.ceil((array[2] / (array[0] + array[1] + array[2] + array[3])) * 100),
      PercentQuy4:
        Math.ceil((array[3] / (array[0] + array[1] + array[2] + array[3])) * 100),
      ThaiDo: thaiDoHopTac.toPrecision(3),
      Khoiluong: khoiLuong.toPrecision(3),
      TienDo: Tiendo.toPrecision(3),
      ChatLuong: Chatluong.toPrecision(3),
    });
  }

  common = {
    percentageStr: '%',
    convertSoTienThanhChu(money) {
      if (money > 1000000000) {
        var tien = money / 1000000000;
        return tien.toFixed(2) + ' Tỷ';
      } else if (money > 100000000) {
        var tien = tien / 100000000;
        return tien.toFixed(1) + ' Trăm triệu';
      } else if (money > 1000000) {
        var tien = tien / 1000000;
        return tien.toFixed(1) + ' Triệu';
      }
      return money;
    },
    convertSoTienThanhChuTat(money) {
      if (money > 1000000000) {
        var tien = parseFloat(money) / 1000000000;
        return tien.toFixed(2) + ' B';
      } else if (money > 1000000) {
        var tien = parseFloat(money) / 1000000;
        return tien.toFixed(1) + ' M';
      }
      return money;
    },
  };
  render() {
    const TienDo = this.state.TienDo;
    const KhoiLuong = this.state.Khoiluong;
    const ChatLuong = this.state.ChatLuong;
    const ThaiDo = this.state.ThaiDo;

    const activityData = [
      {
        label: 'Tiến Độ',
        value: TienDo / 20,
        color: '#FA541C',
        backgroundColor: '#D9DBDB',
      },
      {
        label: 'Khối Lượng',
        value: KhoiLuong / 20,
        color: '#1890FF',
        backgroundColor: '#D9DBDB',
      },
      {
        label: 'Chất Lượng',
        value: ChatLuong / 20,
        color: '#2EB553',
        backgroundColor: '#D9DBDB',
      },
      {
        label: 'Thái độ',
        value: ThaiDo / 20,
        color: '#FAAD14',
        backgroundColor: '#D9DBDB',
      },
    ];
    const activityConfig = {
      width: 220,
      height: 200,
      radius: 40,
      ringSize: 5,
    };
    return (
      <SafeAreaView>
        <View style={styles.allView}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.chartView}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#262626',
                  marginTop: Sizes.h16,
                  marginLeft: Sizes.h16,
                }}>
                Lương khoán được nhận
              </Text>
            </View>

            <View style={styles.dunnutChart}>
              <Pie
                radius={85}
                innerRadius={50}
                sections={[
                  {
                    percentage: this.state.PercentQuy4,
                    color: '#FF7A45',
                  },
                  {
                    percentage: this.state.PercentQuy1,
                    color: '#2F54EB',
                  },
                  {
                    percentage: this.state.PercentQuy2,
                    color: '#1890FF',
                  },
                  {
                    percentage: this.state.PercentQuy3,
                    color: '#4DD077',
                  },
                ]}
                dividerSize={3}
                strokeCap={'butt'}
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>
                  {this.common
                    .convertSoTienThanhChuTat(this.state.Total)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                </Text>
              </View>
            </View>

            <View style={styles.preciousView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    margin: Sizes.h18,
                  }}
                  source={images.dot_pr1}
                />
                <Text style={styles.preciousTxt}>Quý 1</Text>
              </View>
              <Text style={styles.preciousTxt2}>
                {this.state.Quy1.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
              </Text>
            </View>
            <View style={styles.preciousView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    margin: Sizes.h18,
                  }}
                  source={images.dot_pro2}
                />
                <Text style={styles.preciousTxt}>Quý 2</Text>
              </View>
              <Text style={styles.preciousTxt2}>
                {this.state.Quy2.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
              </Text>
            </View>
            <View style={styles.preciousView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    margin: Sizes.h18,
                  }}
                  source={images.dot_pro3}
                />
                <Text style={styles.preciousTxt}>Quý 3</Text>
              </View>
              <Text style={styles.preciousTxt2}>
                {this.state.Quy3.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
              </Text>
            </View>
            <View style={styles.preciousView2}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    margin: Sizes.h18,
                  }}
                  source={images.dot_pro5}
                />
                <Text style={styles.preciousTxt}>Quý 4</Text>
              </View>
              <Text style={styles.preciousTxt2}>
                {this.state.Quy4.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                )}
              </Text>
            </View>

            <View style={styles.titleText}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#262626',
                  marginTop: Sizes.h16,
                  marginLeft: Sizes.h16,
                  marginBottom: Sizes.s7,
                }}>
                Đánh giá tổng quát
              </Text>
            </View>

            <View style={styles.evalueView}>
              <View style={styles.titleEvalueView}>
                <View style={styles.titileView}>
                  <View style={styles.dotView}>
                    <Image
                      style={{
                        marginRight: Sizes.h12,
                      }}
                      source={images.newimage1}
                    />
                    <Text>Khối lượng: {this.state.Khoiluong} Đ</Text>
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Image
                      style={{
                        marginTop: Sizes.h26,
                        marginLeft: Sizes.h18,
                        marginRight: Sizes.h12,
                      }}
                      source={images.newimage2}
                    />
                    <Text style={{paddingTop: Sizes.h20}}>
                      Tiến độ: {this.state.TienDo} Đ
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Image
                      style={{
                        marginTop: Sizes.h26,
                        margin: Sizes.h18,
                        marginRight: Sizes.h12,
                      }}
                      source={images.newimage3}
                    />
                    <Text style={{paddingTop: Sizes.h20}}>
                      Chất lượng: {this.state.ChatLuong} Đ
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Image
                      style={{
                        marginTop: Sizes.h12,
                        marginLeft: Sizes.h18,
                        marginRight: Sizes.h12,
                      }}
                      source={images.newimage4}
                    />
                    <Text style={{paddingTop: Sizes.s7}}>
                      Thái độ: {this.state.ThaiDo} Đ
                    </Text>
                  </View>
                </View>

                <View style={styles.ringChartView}>
                  <ActivityRings data={activityData} config={activityConfig} />
                </View>
                <View
                  style={{
                    width: Sizes.h20 + 3,
                    height: Sizes.h200,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                  }}></View>
              </View>
            </View>

            <View style={styles.totalProjectView}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#262626',
                  paddingTop: Sizes.h16,
                  paddingLeft: Sizes.h16,
                }}>
                Dự án đã tham gia
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ProductDetialContainer')
                }>
                <Text
                  style={{
                    color: '#597EF7',
                    paddingTop: Sizes.h16,
                    //paddingLeft: Sizes.s120,
                    paddingBottom: Sizes.s7 + 2,
                  }}>
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ballTotalView}>
              <View>
                <Image
                  style={{
                    marginTop: Sizes.h24,
                    marginBottom: Sizes.h24,
                    marginLeft: Sizes.h30,
                  }}
                  source={images.icons_projt}
                />
                <Text
                  style={{
                    position: 'absolute',
                    paddingTop: Sizes.s70,
                    paddingLeft: Sizes.s80 + 2,
                    fontSize: Sizes.s45,
                    color: '#FFFFFF',
                  }}>
                  {this.state.SoDA}
                </Text>
              </View>
              <Image
                style={{marginLeft: Sizes.s35}}
                source={images.Rectangle_209}
              />
              <Text
                numberOfLines={2}
                style={{
                  fontSize: Sizes.h14,
                  marginTop: Sizes.s10,
                  marginLeft: Sizes.h10,
                  marginRight: Sizes.h20,
                  paddingRight: Sizes.s40,
                }}>
                {this.state.SoDA} Job {'\n'}complete
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  allView: {
    width: '100%',
    //flex:1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#FAFAFA',
  },

  productButtom: {
    width: Sizes.s160 + 8,
    height: Sizes.s30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  businessButtom: {
    width: Sizes.s160 + 8,
    height: Sizes.s30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  chartView: {
    width: Sizes.s340,
    height: Sizes.s45,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: Sizes.s2,
  },
  dunnutChart: {
    width: Sizes.s340,
    height: Sizes.s200,
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s2,
    paddingVertical: Sizes.s20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gauge: {
    position: 'absolute',
    width: Sizes.s100,
    //height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  preciousView: {
    width: Sizes.s340,
    height: Sizes.s45,
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preciousView2: {
    width: Sizes.s340,
    height: Sizes.s45,
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preciousTxt: {
    paddingTop: Sizes.h16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    //paddingRight: Sizes.s180,
  },
  preciousTxt2: {
    paddingTop: Sizes.h14,
    paddingRight: Sizes.h16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
  },
  titleText: {
    width: Sizes.s340,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: Sizes.h16,
    //marginBottom: Sizes.h16 / 2,
  },
  evalueView: {
    width: Sizes.s340,
    paddingRight: Sizes.h16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: Sizes.s2,
  },
  totalProjectView: {
    width: Sizes.s340,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: Sizes.h16,
    marginBottom: Sizes.s2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Sizes.h16,
  },
  titleEvalueView: {
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s7,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
  },
  titileView: {
    width: Sizes.s160,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    paddingBottom: Sizes.h30,
  },
  ringChartView: {
    width: Sizes.s160,
    backgroundColor: '#FFFFFF',
    transform: [{rotate: '180deg'}],
    paddingRight: Sizes.s160,
    //paddingLeft: 90,
  },
  ballTotalView: {
    width: Sizes.s340,
    backgroundColor: '#FFFFFF',
    marginBottom: Sizes.s70,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'red',
    marginTop: Sizes.h26,
    marginLeft: Sizes.h18,
  },
});
