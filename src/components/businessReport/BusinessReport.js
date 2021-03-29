import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import HeaderBusinessReport from '../custom/HeaderBusinessReport';
import Select from '../custom/Select';
import images from '../../res/images/index'
import { Item, Icon, Input } from 'native-base'
import ItemGroup from './ItemTotal';
import Sizes from '../../res/values/Sizes';
import YearScreen from './YearSrceen';
import TotalScreen from './TotalScreen';
export default class BusinessReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTab: 1,
      isShowFilter: false,
      listYear: [],
      listQuarterYear: [],
      listQuarterYearAll: [],
      valueChooseYear: '',
      valueChooseQuarter: '',
      valueChooseUnitList: '',
      listDepartment: [],
      unitList: [],
      departmentList: [],
      filterACAM: [],
      filterPrjAc: [],
      tabNamNay: [],
      tabNamTruoc: [],
      tabTong: []
    };
    this.YearRef = React.createRef();
    this.QuarterRef = React.createRef();
    this.ContractFundRef = React.createRef();
    this.DepartmentRef = React.createRef();
    this.UnitRef = React.createRef();
  }
  async componentDidMount() {
    this.props.donViBoPhanAction();
    this.props.getNamtinhkhoanAction()
    this.props.getKyTinhKhoanAction()
    this.props.detailBusinessAction()
    this.props.detailYearsAction()
    this.searchPrjAC("")
    this.searchACCAM(" ")
  }



  searchACCAM(textToSearch) {

    if (this.state.idTab === 1) {
      this.setState({
        filterACAM: textToSearch !== "" ? this.state.tabTong.filter(
          item => item.ACCAM.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.AM !== undefined &&
            item.AM.toLowerCase().includes(textToSearch.toLowerCase())
        ) : this.state.tabTong
      }, () => console.log('object', this.props.dataDetail)
      );
    } else if (this.state.idTab === 2) {

      this.setState({
        tabNamTruoc: textToSearch !== "" ? this.state.listNamTruocTemp.filter(
          item => item.TenDuAn?.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.ACCAM !== undefined &&
            item.ACCAM.toLowerCase().includes(textToSearch.toLowerCase())) : this.state.listNamTruocTemp
      })

    } else
      this.setState({
        tabNamNay: textToSearch !== "" ? this.state.listNamNayTemp.filter(
          item => item.TenDuAn?.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.ACCAM !== undefined &&
            item.ACCAM.toLowerCase().includes(textToSearch.toLowerCase())) : this.state.listNamNayTemp
      })
  };


  async componentDidUpdate(prevProps) {
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
    if ((this.props.dataDetail !== null) && (this.props.dataDetail !== prevProps.dataDetail)) {
      //  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA', this.props.dataDetail);
      const tong = this.props.dataDetail.lists
      this.setState({ tabTong: tong, filterACAM: tong })
    }

    if ((this.props.dataDetailYear !== null) && (this.props.dataDetailYear !== prevProps.dataDetailYear)) {
      let data = this.props.dataDetailYear
      let startYear = null;
      var endYear = null;
      if (data.moreInfo && data.moreInfo.length > 0) {
        var [day, month, year] = data.moreInfo[0].split("/");
        startYear = new Date(year, month - 1, day);

        var [day, month, year] = data.moreInfo[1].split("/");
        endYear = new Date(year, month - 1, day);
      }
      var namTruoc = data.lists;
      var namNay = data.lists;
      if (startYear) {
        namTruoc = data.lists.filter(function (item) {
          var [day, month, year] = item.NgayKy.split("/");
          let ngayKy = new Date(year, month - 1, day);
          return ngayKy <= startYear;
        });
        this.setState({ tabNamTruoc: namTruoc, listNamTruocTemp: namTruoc })
      }
      if (endYear) {
        namNay = data.lists.filter(function (item) {
          var [day, month, year] = item.NgayKy.split("/");
          let ngayKy = new Date(year, month - 1, day);
          return (startYear <= ngayKy && ngayKy <= endYear);
        });
        this.setState({ tabNamNay: namNay, listNamNayTemp: namNay })

      }
    }
  }
  render() {
    const { idTab } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        <HeaderBusinessReport
          title={'Chi tiết kinh doanh'}
          {...this.props}
          onPressRight={() => this.setState({ isShowFilter: true })}
        />
        <View
          style={{ flex: 1, marginTop: Sizes.h16, marginHorizontal: Sizes.h16 }}>
          <View
            style={{
              height: Sizes.h36,
              flexDirection: 'row',
              backgroundColor: '#F5F5F5',
              borderRadius: 10,
              marginBottom: Sizes.h16,
            }}>
            <TouchableOpacity
              onPress={() => this.setState({ idTab: 1, txt: "" })}
              style={[
                idTab == 1 ? styles.tabItemChoose : styles.tabItemBasic,
                { flex: 1 },
              ]}>
              <Text
                style={{
                  fontSize: Sizes.h14,
                  color: idTab == 1 ? 'black' : '#8C8C8C',
                }}>
                Tổng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ idTab: 2, txt: "" })}
              style={[
                idTab == 2 ? styles.tabItemChoose : styles.tabItemBasic,
                { flex: 1 },
              ]}>
              <Text
                style={{
                  fontSize: Sizes.h14,
                  color: idTab == 2 ? 'black' : '#8C8C8C',
                }}>
                Năm trước
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ idTab: 3, txt: "" })}
              style={[
                idTab == 3 ? styles.tabItemChoose : styles.tabItemBasic,
                { flex: 1 },
              ]}>
              <Text
                style={{
                  fontSize: Sizes.h14,
                  color: idTab == 3 ? 'black' : '#8C8C8C',
                }}>
                Năm nay
              </Text>
            </TouchableOpacity>
          </View>
          <Item style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: Sizes.h16 }}>
            <Icon style={{ paddingLeft: Sizes.h16 / 2 }} name="search" size={18} alignment='center' color={"#333333"}
            />
            <Input style={{ paddingRight: Sizes.h16 }}
              placeholder={idTab === 1 ? "Tìm kiếm account" : "Tìm kiếm account và dự án"}
              onChangeText={text => {
                this.setState({ txt: text })
                this.searchACCAM(text)
              }}
              value={this.state.txt}
            />
          </Item>
          {this.state.idTab === 1 ?
            <TotalScreen data={
              this.state.filterACAM
            } />
            : this.state.idTab === 2 ? (
              <YearScreen type="nam truoc" data={this.state.tabNamTruoc} />
            ) : (
              <YearScreen data={this.state.tabNamNay} />

            )}
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
              <Select
                ref={this.ContractFundRef}
                style={{ marginTop: Sizes.h16 }}
                placeholder="Lọc quỹ khoán theo"
                listItem={this.state.listContractFund}
                onChooseItem={(item) => { }}
              // multiple
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabItemBasic: { width: '50%', justifyContent: 'center', alignItems: 'center' },
  tabItemChoose: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  tapScreen: {
    flexDirection: 'row',
    marginTop: Sizes.h16,
    marginBottom: Sizes.h16,
    width: Sizes.s340,
    height: Sizes.s35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },

  productButtom: {
    width: 185,
    height: Sizes.s30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  businessButtom: {
    width: 185,
    height: Sizes.s30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});
