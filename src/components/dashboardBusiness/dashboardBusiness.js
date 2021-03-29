import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';
import Speedometer from 'react-native-speedometer-chart';
import Select from '../custom/Select'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis,
} from 'victory-native';
import Pie from 'react-native-pie';

export default class DashboardBusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFilter: false,
      listYear: [],
      listQuarterYear: [],
      listQuarterYearAll: [],
      valueChooseYear: '',
      valueChooseQuarter: '',
      valueChooseUnitList: '',
      listDepartment: [],
      LNBase: [],
      unitList: [],
      departmentList: [],
    };
    this.YearRef = React.createRef();
    this.QuarterRef = React.createRef();
    // this.FollowRef = React.createRef();
    this.DepartmentRef = React.createRef();
    this.UnitRef = React.createRef();
  }
  componentDidMount() {

    this.props.donViBoPhanAction();
    this.props.lnBaseKDAction();
    this.props.getNamtinhkhoanAction()
    this.props.getKyTinhKhoanAction()

  }

  async componentDidUpdate(prevProps) {
    let LNBaseFull = []
    if ((this.props.dataLNBaseKD?.length) && (this.props.dataLNBaseKD !== prevProps.dataLNBaseKD)) {

      LNBaseFull = this.props.dataLNBaseKD
      if (LNBaseFull !== null) {
        let arrDataList = [];
        arrDataList.push(LNBaseFull[0].LNBaseKeHoachNam)
        arrDataList.push(LNBaseFull[0].LNBaseKeHoachHienTai)
        this.setState({ LNBase: arrDataList })
      }
    }
    //Năm tính khoán
    if (
      (this.props.dataNam !== null) &&
      (this.props.dataNam !== prevProps.dataNam)
    ) {

      let rs = [];
      for (let i = 0; i < this.props.dataNam.NAM_TINH_KHOAN.length; i++) {
        rs.push({ id: i, label: this.props.dataNam.NAM_TINH_KHOAN[i] });
      }
      this.setState({
        listYear: rs,
      });
    }
    //Kỳ tính khoán
    if (
      (this.props.dataKy !== null) &&
      (this.props.dataKy !== prevProps.dataKy)
    ) {
      const newData = this.props.dataKy.map(item => ({ ...item, label: item.TenKyTinhKhoan }))

      this.setState({
        listQuarterYearAll: newData,
      });

    }
    //Đơn vị bộ phận
    if ((this.props.dataDVBP !== null) && (this.props.dataDVBP !== prevProps.dataDVBP)) {
      const listDepmt = this.props.dataDVBP.map(item => ({ ...item, label: item.TenFisX }))
      this.setState({
        unitList: listDepmt
      }, () =>
        console.log())
    }
  }

  render() {
    const value = this.state.LNBase
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        <SafeAreaView />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Image style={{ marginTop: Sizes.h20 }} source={images.menu_alt_03} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Kinh Doanh</Text>
          <TouchableOpacity onPress={() => this.setState({ isShowFilter: true })}>
            <Image style={{ marginTop: Sizes.h18 }} source={images.Vector} />
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
                  style={{ height: 12, marginTop: 3, marginRight: 8 }}
                  source={images.dot1}
                />
                <Text style={{ fontSize: 12, color: '#595959' }}>
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
                <Text style={{ fontSize: 12, color: '#595959' }}>
                  Kế hoạch cả năm
                </Text>
              </View>
              <Speedometer
                value={value[1] != undefined ? value[1].toFixed(2) : 0}
                totalValue={value[0] != undefined ? value[0].toFixed(2) : 0}
                size={Sizes.s240}
                outerColor="#D6E4FF"
                internalColor="#597EF7"
                showLabels
                labelStyle={{ color: 'blue' }}
                labelFormatter={(number) => `${number}B`}
                showPercent={false}
                percentStyle={{ color: 'red' }}
              />
              <Text style={{ fontWeight: 'bold', color: '#597EF7', fontSize: Sizes.s14, marginBottom: Sizes.h16 }}>{value[1] != undefined ? value[1].toFixed(2) + ' B' : 0 + ' B'}</Text>
              <Text
                style={{
                  fontSize: Sizes.h14,
                  fontWeight: 'bold',
                  paddingBottom: Sizes.s40,
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
                <Text style={{ fontSize: 14, color: '#595959' }}>Qũy khoán</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FA541C',
                      marginRight: Sizes.h80,
                    }}>
                    8.60B
                  </Text>
                  <Text style={{ fontSize: 14, color: '#2EB553' }}>1.08B</Text>
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
                <Text style={{ fontSize: 14, color: '#595959' }}>Đã chi</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FA541C',
                      marginRight: Sizes.h80,
                    }}>
                    1.97B
                  </Text>
                  <Text style={{ fontSize: 14, color: '#2EB553' }}>1.38B</Text>
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
                <Text style={{ fontSize: 14, color: '#595959' }}>Còn lại</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FA541C',
                      marginRight: Sizes.h80,
                    }}>
                    6.38B
                  </Text>
                  <Text style={{ fontSize: 14, color: '#2EB553' }}>-0.3B</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: Sizes.s7 + 1,
                  justifyContent: 'flex-end',
                }}>
                <Image style={{ marginTop: Sizes.s7 }} source={images.dot5} />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                    marginLeft: Sizes.s7 + 1,
                    marginTop: Sizes.s2 + 1,
                  }}>
                  khoán đơn vị
                </Text>
                <Image
                  style={{ marginTop: Sizes.s7, marginLeft: Sizes.h16 }}
                  source={images.dot7}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                    marginLeft: Sizes.s7 + 1,
                    marginTop: Sizes.s2 + 1,
                  }}>
                  khoán kinh doanh
                </Text>
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
              <View style={{ alignItems: 'center', paddingTop: Sizes.h16 }}>
                <Text style={{ fontSize: Sizes.h10, color: '#262626' }}>
                  Billions
                </Text>
                <Text style={{ fontSize: Sizes.h10, color: '#8C8C8C' }}>100</Text>
                <Text style={{ fontSize: Sizes.h10, color: '#8C8C8C' }}>80</Text>
                <Text style={{ fontSize: Sizes.h10, color: '#8C8C8C' }}>60</Text>
                <Text style={{ fontSize: Sizes.h10, color: '#8C8C8C' }}>40</Text>
                <Text style={{ fontSize: Sizes.h10, color: '#8C8C8C' }}>20</Text>
                <Text style={{ fontSize: Sizes.h10, color: '#8C8C8C' }}>0</Text>
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
                  animate={{ duration: 1000 }}>
                  <VictoryAxis />
                  <VictoryGroup
                    height={200}
                    offset={9}
                    crossAxis={false}
                    colorScale={['#1890FF', '#2EB553', '#FA541C']}>
                    <VictoryBar
                      cornerRadius={{ top: 2 }}
                      data={[
                        { x: 'FIS-BANK', y: 20 },
                        { x: 'FIS-ENT', y: 30 },
                        { x: 'FIS-TDC', y: 70 },
                      ]}
                    />
                    <VictoryBar
                      cornerRadius={{ top: 2 }}
                      data={[
                        { x: 'FIS-BANK', y: 50 },
                        { x: 'FIS-ENT', y: 40 },
                        { x: 'FIS-TDC', y: 50 },
                      ]}
                    />
                    <VictoryBar
                      cornerRadius={{ top: 2 }}
                      data={[
                        { x: 'FIS-BANK', y: 30 },
                        { x: 'FIS-ENT', y: 20 },
                        { x: 'FIS-TDC', y: 100 },
                      ]}
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
                radius={85}
                innerRadius={44}
                sections={[
                  // {
                  //   percentage: 50,
                  //   color: '#FF7A45',
                  // },
                  {
                    percentage: 100,
                    color: '#2F54EB',
                  },
                  // {
                  //   percentage: 10,
                  //   color: '#1890FF',
                  // },
                  // {
                  //   percentage: 10,
                  //   color: '#4DD077',
                  // },
                ]}
                dividerSize={4}
                strokeCap={'butt'}
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>0.00B</Text>
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
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{
                    marginRight: Sizes.h12,
                    marginTop: Sizes.s7,
                  }}
                  source={images.dot_pr1}
                />
                <Text style={styles.preciousTxt}>Fis ERP</Text>
              </View>
              <Text style={styles.preciousTxt2}>0.00 B</Text>
            </View>
            {/* <View style={styles.preciousView}>
              <View style={{ flexDirection: 'row' }}>
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
              <View style={{ flexDirection: 'row' }}>
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
              <View style={{ flexDirection: 'row' }}>
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
            </View> */}
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
                style={{ marginRight: Sizes.h16, marginTop: Sizes.s2 }}
                source={images.ic_bag}
              />
              <View style={{ width: '80%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: Sizes.h16,
                    paddingBottom: Sizes.h16 / 2,
                  }}>
                  <Text style={{ color: '#262626', fontWeight: '500' }}>
                    Cán bộ dương quỹ
                  </Text>
                  <Text style={{ color: '#2EB553' }}>3</Text>
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
                  <Text style={{ color: '#595959', fontSize: Sizes.h14 }}>
                    Quỹ dương tương ứng
                  </Text>
                  <Text style={{ color: '#595959', fontSize: Sizes.h14 }}>
                    0.38 B
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
                style={{ marginRight: Sizes.h16, marginTop: Sizes.s2 }}
                source={images.ic_bag_2}
              />
              <View style={{ width: '80%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: Sizes.h16,
                    paddingBottom: Sizes.h16 / 2,
                  }}>
                  <Text style={{ color: '#262626', fontWeight: '500' }}>
                    Cán bộ âm quỹ
                  </Text>
                  <Text style={{ color: '#FA541C' }}>12</Text>
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
                  <Text style={{ color: '#595959', fontSize: Sizes.h14 }}>
                    Quỹ âm tương ứng
                  </Text>
                  <Text style={{ color: '#595959', fontSize: Sizes.h14 }}>
                    -0.67 B
                  </Text>
                </View>
              </View>
            </View>

            {/* ///////viewdongAll//// */}
          </View>
        </ScrollView>
        {/* ////////////////////////////////////////////////Buttomfooter//////////////////// */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: Sizes.h16,
            paddingTop: Sizes.h16,
            // backgroundColor: 'tr',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("BusinessReport")}
            style={{
              backgroundColor: '#1890FF',
              width: '100%',
              alignItems: 'center',
              paddingVertical: Sizes.h10,
              borderRadius: Sizes.h16 / 2,
              marginBottom: Sizes.h10,
            }}
            onPress={() => this.props.navigation.navigate('BusinessReport')}>
            <Text style={{ color: '#FFFFFF', fontSize: Sizes.h16 }}>
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        {/* //////////////////////////////////////////////////////////////////////// */}
        <Modal animationType="slide" visible={this.state.isShowFilter}>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: Sizes.h16,
                borderBottomWidth: 0.25,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({ isShowFilter: false })}>
                <Image source={images.xFilter} />
              </TouchableOpacity>

              <Text style={{ fontWeight: 'bold', fontSize: Sizes.h16 }}>Filter</Text>
              <TouchableOpacity
                onPress={() => this.setState({ isShowFilter: false })}>
                <Text style={{ fontSize: Sizes.h14, color: '#597EF7' }}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: Sizes.h16 }}>
              <Select
                ref={this.YearRef}
                placeholder="Chọn năm"
                listItem={this.state.listYear}
                value={this.state.valueChooseYear}
                onChooseItem={(item) => {
                  this.setState(
                    {
                      valueChooseYear: item,

                      listQuarterYear: this.state.listQuarterYearAll.filter(
                        (x) => x.NamTinhKhoan == item.label,
                      ),
                    },
                    () => {
                      this.QuarterRef.current.clearSelected();
                    }
                  );
                }}
              />
              <Select
                disabled={this.state.valueChooseYear == '' ? true : false}
                ref={this.QuarterRef}
                style={{ marginTop: Sizes.h16 }}
                placeholder="Chọn quý"
                listItem={this.state.listQuarterYear}
                value={this.state.valueChooseQuarter}
                onChooseItem={(item) => {
                  this.setState({ valueChooseQuarter: item });
                }}
              />
              <Select
                disabled={this.state.valueChooseQuarter == '' ? true : false}
                ref={this.UnitRef}
                style={{ marginTop: Sizes.h16 }}
                placeholder="Đơn vị"
                listItem={this.state.unitList}
                onChooseItem={(list) => {
                  const clone = []
                  if (list.length) {
                    list.forEach(item => {
                      clone.push(...item.listDepartment.map(itemS => ({ ...itemS, label: itemS.tenFisX })))
                    })
                  }
                  // console.log(clone)
                  this.setState({ valueChooseUnitList: list, departmentList: clone });
                }}
                multiple
              />
              <Select
                disabled={this.state.valueChooseUnitList == '' ? true : false}
                ref={this.DepartmentRef}
                style={{ marginTop: Sizes.h16 }}
                placeholder="Bộ phận"
                listItem={this.state.departmentList}
                onChooseItem={(list) => {
                  this.setState({ boPhanFilter: list })
                  console.log(list)
                }}
                multiple
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  viewAll: {
    height: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: Sizes.h16,
    paddingBottom: Sizes.h65,
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
    width: Sizes.s50,
    alignItems: 'center',
    justifyContent: 'center',
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
