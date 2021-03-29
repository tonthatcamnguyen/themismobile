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
import Speedometer from 'react-native-speedometer-chart';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis,
  Bar,
} from 'victory-native';
import Pie from 'react-native-pie';
import Snackbar from 'react-native-snackbar';

export default class DashboardProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: '',
      QuykhoanDonvi: 0,
      QuykhoanDonviDachi: 0,
      QuykhoanDonviConlai: 0,
      QuykhoanDA: 0,
      QuykhoanDADachi: 0,
      QuykhoanDAConlai: 0,
      TongLuongKhoanChitra: 0,
      DuAnDuongQuy: 0,
      DuAnAmQuy: 0,
      QuyDuongTuongUng: 0,
      QuyAmTuongUng: 0,
    };
  }

  componentDidMount() {
    this.props.postDashboardProjectAction();
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.data !== null) & (this.props.data !== prevProps.data)) {
      //console.log('data DashboardProject', this.props.data);

      const dataBaocaokhoan = this.props.data;
      let quykhoanduan = 0;
      let quykhoanDADachi = 0;
      let quykhoanDAConlai = 0;
      let QuykhoanDV = 0;
      let QuykhoanDVdachi = 0;
      let QuykhoanDvConlai = 0;
      let duanduongquy = 0;
      let duanamquy = 0;
      let duanquyduongtuongung = 0;
      let duanamquytuongung = 0;
      let Luongkhoanchitra = 0;
      dataBaocaokhoan.forEach((elementQKDA) => {
        elementQKDA.listChartBP.forEach((elment) => {
          quykhoanduan += elment.quyKhoanDA;
          quykhoanDADachi += elment.quyKhoanDADaChi;
          quykhoanDAConlai += elment.quyKhoanDAConLai;
          QuykhoanDV += elment.quyKhoanDV;
          QuykhoanDVdachi += elment.quyKhoanDVDaChi;
          QuykhoanDvConlai += elment.quyKhoanDVConLai;
          duanduongquy += elment.duAnDuongQuy;
          duanamquy += elment.duAnAmQuy;
          duanquyduongtuongung += elment.quyKhoanDADuong;
          duanamquytuongung += elment.quyKhoanDAAm;
          Luongkhoanchitra += elment.luongKhoanChiTra;
        });
      });

      //console.log('quykhoanDA', quykhoanDADachi.toFixed(2));

      this.setState({
        QuykhoanDonvi: QuykhoanDV,
        QuykhoanDonviDachi: QuykhoanDVdachi,
        QuykhoanDonviConlai: QuykhoanDvConlai,
        QuykhoanDA: quykhoanduan,
        QuykhoanDADachi: quykhoanDADachi,
        QuykhoanDAConlai: quykhoanDAConlai,
        DuAnDuongQuy: duanduongquy,
        DuAnAmQuy: duanamquy,
        QuyAmTuongUng: duanamquytuongung,
        QuyDuongTuongUng: duanquyduongtuongung,
        TongLuongKhoanChitra: Luongkhoanchitra,
      });
    }
    if ((this.props.error !== null) & (this.props.error !== prevProps.error)) {
      Snackbar.show({
        text: this.props.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  common={
    percentageStr: "%",
    convertSoTienThanhChu(money){
        if (money > 1000000000) {
            var tien = money / 1000000000;
            return tien.toFixed(2) + " Tỷ";
        } else if (money > 100000000) {
            var tien = tien / 100000000;
            return tien.toFixed(1) + " Trăm triệu";
        } else if (money > 1000000) {
            var tien = tien / 1000000;
            return tien.toFixed(1) + " Triệu";
        }
        return money;
    },
    convertSoTienThanhChuTat(money){
        if (money > 1000000000) {
            var tien = parseFloat(money) / 1000000000;
            return tien.toFixed(2) + " B";
        } else if (money > 1000000) {
            var tien = parseFloat(money) / 1000000;
            return tien.toFixed(1) + " M";
        }
        return  money;
    },
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Image style={{marginTop: Sizes.h20}} source={images.menu_alt_03} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Dự án</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('FilterdashboardProject');
            }}>
            <Image style={{marginTop: Sizes.h18}} source={images.Vector} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.viewAll}>
            <View style={styles.speedChart}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingTop: Sizes.h16,
                  paddingBottom: Sizes.h42,
                }}>
                <Image
                  style={{height: 12, marginTop: 3, marginRight: 8}}
                  source={images.dot1}
                />
                <Text style={{fontSize: 12, color: '#595959'}}>
                  KH đến hiện tại
                </Text>
                <Image
                  style={{
                    height: 12,
                    marginTop: 3,
                    marginRight: 8,
                    marginLeft: 24,
                  }}
                  source={images.dot2}
                />
                <Text style={{fontSize: 12, color: '#595959'}}>
                  Kế hoạch cả năm
                </Text>
              </View>
              <Speedometer
                value={300}
                totalValue={1000}
                size={Sizes.s200}
                outerColor="#D6E4FF"
                internalColor="#597EF7"
                showLabels
                labelStyle={{color: 'blue'}}
                labelFormatter={(number) => `${number}B`}
                showPercent
                percentStyle={{color: 'red'}}
              />
              <Text
                style={{
                  fontSize: Sizes.h14,
                  paddingTop: 16,
                  paddingBottom: Sizes.s35,
                }}>
                Lợi nhuận base
              </Text>
            </View>
            <View style={styles.titleView}>
              <Text
                style={{
                  color: '#595959',
                  fontSize: Sizes.h16,
                  fontWeight: '500',
                }}>
                Báo cáo khoán
              </Text>
            </View>
            <View style={styles.titlePrice}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#F5F5F5',
                  paddingBottom: Sizes.s7 + 1,
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14, color: '#595959'}}>Qũy khoán</Text>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View></View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FA541C',
                    }}>
                    {this.common.convertSoTienThanhChuTat(this.state.QuykhoanDonvi)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  </Text>
                  <Text
                    style={{fontSize: 14, color: '#2EB553'}}
                    numberOfLines={0}
                    ellipsizeMode="head">
                    {this.common.convertSoTienThanhChuTat(this.state.QuykhoanDA)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#F5F5F5',
                  paddingBottom: Sizes.s7 + 1,
                  paddingTop: Sizes.s7 + 1,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                  }}>
                  Đã chi
                </Text>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View></View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FA541C',
                    }}>
                    {this.common.convertSoTienThanhChuTat(this.state.QuykhoanDonviDachi)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#2EB553',
                    }}>
                    {this.common.convertSoTienThanhChuTat(this.state.QuykhoanDADachi)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#F5F5F5',
                  paddingBottom: Sizes.s7 + 1,
                  paddingTop: Sizes.s7 + 1,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                  }}>
                  Còn lại
                </Text>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View></View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FA541C',
                    }}>
                    {this.common.convertSoTienThanhChuTat(this.state.QuykhoanDonviConlai)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#2EB553',
                    }}>
                    {this.common.convertSoTienThanhChuTat(this.state.QuykhoanDAConlai)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: Sizes.s10,
                  justifyContent: 'flex-end',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={{marginTop: Sizes.s10}} source={images.dot5} />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#595959',
                      marginLeft: Sizes.s7,
                      marginTop: Sizes.s2+1,
                    }}>
                    khoán đơn vị
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginLeft: Sizes.h16}}>
                  <Image style={{marginTop: Sizes.s10}} source={images.dot7} />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#595959',
                      marginLeft: Sizes.s7,
                      marginTop: Sizes.s2 + 1,
                    }}>
                    khoán dự án
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: Sizes.s7 + 1,
                  justifyContent: 'flex-end',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={{marginTop: Sizes.s7}} source={images.dot5} />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#595959',
                      marginLeft: Sizes.s7 + 1,
                      marginTop: Sizes.s2 + 1,
                    }}>
                    khoán đơn vị
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginLeft: Sizes.h16}}>
                  <Image style={{marginTop: Sizes.s7}} source={images.dot7} />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#595959',
                      marginLeft: Sizes.s7 + 1,
                      marginTop: Sizes.s2 + 1,
                    }}>
                    khoán dự án
                  </Text>
                </View>
              </View>
            </View>
            {/* ///////////////////////////chartviewgroup////////////////////////// */}
            <View style={styles.titleView}>
              <Text
                style={{
                  color: '#262626',
                  fontSize: Sizes.h16,
                  fontWeight: '500',
                }}>
                Quỹ khoán theo đơn vị
              </Text>
            </View>
            <View style={styles.allValueChart}>
              <View style={{alignItems: 'center', paddingTop: Sizes.h16}}>
                <Text style={{fontSize: Sizes.h10, color: '#262626'}}>
                  Billions
                </Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>100</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>80</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>60</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>40</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>20</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>0</Text>
                <TouchableOpacity
                  style={{
                    paddingTop: Sizes.h16,
                    paddingBottom: Sizes.s7,
                    paddingLeft: Sizes.h10,
                    paddingRight: Sizes.h10,
                  }}>
                  <Image source={images.buttum1} />
                </TouchableOpacity>
              </View>
              <View style={styles.chart}>
                <VictoryChart
                  height={180}
                  width={300}
                  domainPadding={30}
                  animate={{duration: 1000}}
                  >
                  <VictoryAxis />
                  <VictoryGroup
                    height={200}
                    offset={9}
                    crossAxis={false}
                    colorScale={['#1890FF', '#2EB553', '#FA541C']}
                   >
                    <VictoryBar
                      cornerRadius={{top: 2}}
                      data={[
                        {x: 'FIS-BANK', y: 20},
                        {x: 'FIS-ENT', y: 30},
                        {x: 'FIS-TDC', y: 70},
                      ]}
                      dataComponent={
                        <Bar
                          events={{
                            onPress: (evt) =>
                              Alert.alert(`(${evt.clientX}, ${evt.clientY})`),
                          }}
                        />
                      }
                    />
                    <VictoryBar
                      cornerRadius={{top: 2}}
                      data={[
                        {x: 'FIS-BANK', y: 50},
                        {x: 'FIS-ENT', y: 40},
                        {x: 'FIS-TDC', y: 50},
                      ]}
                      dataComponent={
                        <Bar
                          events={{
                            onPress: (evt) =>
                              Alert.alert(`(${evt.clientX}, ${evt.clientY})`),
                          }}
                        />
                      }
                    />
                    <VictoryBar
                      cornerRadius={{top: 2}}
                      data={[
                        {x: 'FIS-BANK', y: 30},
                        {x: 'FIS-ENT', y: -20},
                        {x: 'FIS-TDC', y: 45},
                      ]}
                      dataComponent={
                        <Bar
                          events={{
                            onPress: (evt) =>
                              Alert.alert(`(${evt.clientX}, ${evt.clientY})`),
                          }}
                        />
                      }
                    />
                  </VictoryGroup>
                </VictoryChart>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  paddingTop: Sizes.h16 + 2,
                  paddingRight: Sizes.h14,
                }}>
                <Image source={images.dot_price_1} />
                <Text
                  style={{
                    fontSize: Sizes.h10,
                    color: '#262626',
                    paddingTop: Sizes.s5,
                    paddingBottom: Sizes.s5,
                  }}>
                  Quỹ khoán
                </Text>
                <Image source={images.dot_price_2} />
                <Text
                  style={{
                    fontSize: Sizes.h10,
                    color: '#262626',
                    paddingTop: Sizes.s5,
                    paddingBottom: Sizes.s5,
                  }}>
                  Đã chi
                </Text>
                <Image source={images.dot_price_3} />
                <Text
                  style={{
                    fontSize: Sizes.h10,
                    color: '#262626',
                    paddingTop: Sizes.s5,
                    paddingBottom: Sizes.s5,
                  }}>
                  Còn lại
                </Text>

                <TouchableOpacity
                  style={{
                    paddingTop: Sizes.h16,
                    paddingBottom: Sizes.s7,
                    paddingLeft: Sizes.s5,
                    paddingRight: Sizes.S5,
                  }}>
                  <Image source={images.buttum2} />
                </TouchableOpacity>
              </View>
            </View>
            {/* //////////////////////////////////////////////////////////////// */}

            {/* //////////////////////////////////dunutChart///////////////////////// */}
            <View style={styles.chartPieView}>
              <Text
                style={{
                  fontWeight: '500',
                  color: '#262626',
                }}>
                Lương khoán chi trả
              </Text>
            </View>
            <View style={styles.dunnutChart}>
              <Pie
                radius={90}
                innerRadius={55}
                sections={[
                  {
                    percentage: 50,
                    color: '#FF7A45',
                  },
                  {
                    percentage: 30,
                    color: '#2F54EB',
                  },
                  {
                    percentage: 10,
                    color: '#1890FF',
                  },
                  {
                    percentage: 10,
                    color: '#4DD077',
                  },
                ]}
                dividerSize={4}
                strokeCap={'butt'}
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>
                  {this.common.convertSoTienThanhChuTat(this.state.TongLuongKhoanChitra)}
                </Text>
              </View>
              {/* <VictoryPie
                colorScale={['#FF7A45', '#2F54EB', '#1890FF', '#4DD077']}
                padding={100}
                innerRadius={45}
                padAngle={2}
                data={[{y: 45}, {y: 30}, {y: 10}, {y: 10}]}
              /> */}
            </View>
            <View style={styles.preciousView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    marginRight: Sizes.h12,
                    marginTop: Sizes.s7,
                  }}
                  source={images.dot_pr1}
                />
                <Text style={styles.preciousTxt}>Fis ERP</Text>
              </View>
              <Text style={styles.preciousTxt2}>800.000</Text>
            </View>
            <View style={styles.preciousView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    marginRight: Sizes.h12,
                    marginTop: Sizes.s7,
                  }}
                  source={images.dot_pro2}
                />
                <Text style={styles.preciousTxt}>Fis GMC</Text>
              </View>
              <Text style={styles.preciousTxt2}>800.000</Text>
            </View>
            <View style={styles.preciousView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    marginRight: Sizes.h12,
                    marginTop: Sizes.s7,
                  }}
                  source={images.dot_pro3}
                />
                <Text style={styles.preciousTxt}>Fis FPS</Text>
              </View>
              <Text style={styles.preciousTxt2}>800.000</Text>
            </View>
            <View style={styles.preciousView2}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    marginRight: Sizes.h12,
                    marginTop: Sizes.s7,
                  }}
                  source={images.dot_pro5}
                />
                <Text style={styles.preciousTxt}>Fis FSB</Text>
              </View>
              <Text style={styles.preciousTxt2}>800.000</Text>
            </View>
            {/* ////////////////////////////////////////////// */}
            <View
              style={{
                width: '100%',
                marginTop: Sizes.h16,
                padding: Sizes.h16,
                backgroundColor: '#FFFFFF',
                borderRadius: Sizes.h16 / 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{marginRight: Sizes.h16, marginTop: Sizes.s2}}
                source={images.ic_bag}
              />
              <View style={{width: '80%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: Sizes.h16,
                    paddingBottom: Sizes.h16 / 2,
                  }}>
                  <Text style={{color: '#262626', fontWeight: '500'}}>
                    Dự án dương quỹ
                  </Text>
                  <Text style={{color: '#2EB553'}}>
                    {this.state.DuAnDuongQuy}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#F5F5F5',
                    justifyContent: 'space-between',
                    paddingRight: Sizes.h16,
                    paddingTop: Sizes.h16 / 2,
                  }}>
                  <Text style={{color: '#595959', fontSize: Sizes.h14}}>
                    Quỹ dương tương ứng
                  </Text>
                  <Text style={{color: '#595959', fontSize: Sizes.h14}}>
                    {this.common.convertSoTienThanhChuTat(this.state.QuyDuongTuongUng)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                marginTop: Sizes.h16,
                padding: Sizes.h16,
                backgroundColor: '#FFFFFF',
                borderRadius: Sizes.h16 / 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{marginRight: Sizes.h16, marginTop: Sizes.s2}}
                source={images.ic_bag_2}
              />
              <View style={{width: '80%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: Sizes.h16,
                    paddingBottom: Sizes.h16 / 2,
                  }}>
                  <Text style={{color: '#262626', fontWeight: '500'}}>
                    Dự án âm quỹ
                  </Text>
                  <Text style={{color: '#FA541C'}}>{this.state.DuAnAmQuy}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#F5F5F5',
                    justifyContent: 'space-between',
                    paddingRight: Sizes.h16,
                    paddingTop: Sizes.h16 / 2,
                  }}>
                  <Text style={{color: '#595959', fontSize: Sizes.h14}}>
                    Quỹ âm tương ứng
                  </Text>
                  <Text style={{color: '#595959', fontSize: Sizes.h14}}>
                    -{this.common.convertSoTienThanhChuTat(-this.state.QuyAmTuongUng)}
                  </Text>
                </View>
              </View>
            </View>

            {/* ///////viewdongAll//// */}
          </View>
        </ScrollView>
        {/* ////////////////////////////////////////////////Buttumfooter//////////////////// */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: Sizes.h16,
            paddingTop: Sizes.h16,
            backgroundColor: '#FFFFFF',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProjectReport')}
            style={{
              backgroundColor: '#1890FF',
              width: '100%',
              alignItems: 'center',
              paddingVertical: Sizes.h10,
              borderRadius: Sizes.h16 / 2,
              marginBottom: Sizes.h10,
            }}>
            <Text style={{color: '#FFFFFF', fontSize: Sizes.h16}}>
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        {/* //////////////////////////////////////////////////////////////////////// */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  viewAll: {
    height: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: Sizes.h16,
    paddingBottom: Sizes.s80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingLeft: Sizes.h16,
    paddingRight: Sizes.h16,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: '500',
    paddingTop: Sizes.h10,
    paddingBottom: Sizes.h10 + 1,
  },
  speedChart: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.s7 + 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: Sizes.h16,
    paddingRight: Sizes.h16,
  },
  titleView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.h16,
    borderTopRightRadius: Sizes.s7 + 1,
    borderTopLeftRadius: Sizes.s7 + 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Sizes.s7 + 1,
    padding: Sizes.h16,
  },
  titlePrice: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderBottomRightRadius: Sizes.s7 + 1,
    borderBottomLeftRadius: Sizes.s7 + 1,
    marginTop: Sizes.s2 - 1,
    paddingHorizontal: Sizes.h16,
    paddingTop: Sizes.s7 + 1,
    paddingBottom: Sizes.h16,
  },
  chart: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: Sizes.s100,
    paddingTop: Sizes.h16,
  },
  allValueChart: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    justifyContent: 'center',
    marginBottom: Sizes.s15,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginTop: Sizes.s2 - 1,
  },
  chartPieView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: Sizes.s2,
    padding: Sizes.h16,
  },
  dunnutChart: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s2 / 2,
    paddingVertical: Sizes.s20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gauge: {
    position: 'absolute',
    //width: Sizes.s70,
    height:Sizes.s70,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:"red",
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontWeight: 'bold',
    fontSize: Sizes.h16,
  },
  preciousView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s2 / 2,
    flexDirection: 'row',
    padding: Sizes.h16,
    justifyContent: 'space-between',
  },
  preciousTxt: {
    color: '#595959',
    fontSize: Sizes.h14,
    fontStyle: 'normal',
  },
  preciousTxt2: {
    fontSize: Sizes.h14,
    fontStyle: 'normal',
    color: '#595959',
  },
  preciousView2: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: Sizes.s2 / 2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    padding: Sizes.h16,
    justifyContent: 'space-between',
  },
});
