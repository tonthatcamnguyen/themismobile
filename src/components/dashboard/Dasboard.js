import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import images from '../../res/images/index'
import Sizes from '../../res/values/Sizes';
import Header from '../../components/custom/Header';
import SpeedChart from './SpeedChart';
import VictoriaChart from './VictoriaChart';
import ContractFund from './ContractFund';
import ListBusinesFund from './ListBusinessFund';
import Select from '../custom/Select'

export default class Dashboard extends Component {
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
      donVi: [],
      boPhanFilter: [],
      daChi: [],
    };
    // const item = this.state;
    this.YearRef = React.createRef();
    this.QuarterRef = React.createRef();
    this.DepartmentRef = React.createRef();
    this.UnitRef = React.createRef();
  }
  componentDidMount() {
    this.props.donViAction();
    this.props.donViBoPhanAction();
    this.props.loiNhuanBaseAction();
    this.props.donViKDDAAction();
    this.props.getNamtinhkhoanAction()
    this.props.getKyTinhKhoanAction()
  }

  async componentDidUpdate(prevProps) {
    let LNBaseFull = []
    if ((this.props.dataLNBase?.length) && (this.props.dataLNBase !== prevProps.dataLNBase)) {


      LNBaseFull = this.props.dataLNBase
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
    // Quy khoan don vi 
    let dv = []
    if ((this.props.dataDV?.length) && (this.props.dataDV !== prevProps.dataDV)) {
      dv = this.props.dataDV
      // console.log('AAAAAAAAAAAAA', dv); 
    }
    let tong = 0;
    this.state.boPhanFilter.forEach((item) => {
      this.props.dataDV.forEach(itemDV => {
        itemDV.listDVBP.forEach(itemBPDV => {
          if (itemBPDV.BoPhan === item.tenFisX)
            tong += itemBPDV.totalQuyKhoanDVConLai
        })
      })
    })

  }


  componentWillUnmount() {
    console.log('stop');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Image style={{ marginTop: Sizes.h20 }} source={images.menu_alt_03} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Dasboard</Text>
          <TouchableOpacity onPress={() => this.setState({ isShowFilter: true })}>
            <Image style={{ marginTop: Sizes.h18 }} source={images.Vector} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.viewAll}>
            <SpeedChart value={this.state.LNBase} />
            <View style={{ flexDirection: 'row', paddingVertical: Sizes.h16 }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  padding: 16,
                  borderRadius: 10,
                  marginRight: 16,
                }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Quỹ khoán
                </Text>
                <View
                  style={{
                    backgroundColor: '#E6F7FF',
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: Sizes.h10 - 2,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#1890FF',
                      fontSize: Sizes.s20 - 2,
                      paddingVertical: Sizes.h10 - 2,
                    }}>
                    19.65{' B'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  padding: 16,
                  borderRadius: 8,
                }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Đã Chi
                </Text>
                <View
                  style={{
                    backgroundColor: '#EBFAEF',
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: Sizes.h10 - 2,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#2EB553',
                      fontSize: Sizes.s20 - 2,
                      paddingVertical: Sizes.h10 - 2
                    }}>
                    35.63{' B'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  padding: Sizes.h16,
                  borderRadius: 8,
                  marginLeft: Sizes.h16,
                }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Còn lại
                </Text>
                <View
                  style={{
                    backgroundColor: '#FFF2E8',
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: Sizes.h10 - 2,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FA541C',
                      fontSize: Sizes.s20 - 2,
                      paddingVertical: Sizes.h10 - 2
                    }}>
                    -15.98{' B'}
                  </Text>
                </View>
              </View>
            </View>
            <VictoriaChart />
            {ListBusinesFund.map((item) => (
              <ContractFund key={item.id} data={item} />
            ))}
          </View>
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
        </ScrollView>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  viewAll: {
    padding: Sizes.h16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    paddingLeft: Sizes.h16,
    paddingRight: Sizes.h16,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: '500',
    paddingTop: Sizes.h10,
    paddingBottom: Sizes.h10 + 1,
  },
});


