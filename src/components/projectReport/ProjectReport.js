import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import ChartDonut from './ChartDonut';
import { ListBusinessReport } from '../business/ListBusinessDetail';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';
import ItemProjectReport from './ItemProjectReport';
import ListProjectReport from './ListProjectReport';
import { ScrollView } from 'react-native-gesture-handler';
import ItemAccordingToTheProject from './ItemAccordingToTheProject';
import ItemProjectReportII from './ItemProjectReportII';
import Snackbar from 'react-native-snackbar';
import BottomShetprojectReport from './BottomShetprojectReport';


export default class ProjectReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDV: null,
      valueChose: null,
      Listdata: [],
      listMilestone: [],
      ListTongDuAn: [],
      ListLuongKhoanChiTra: [],
      listAllInforItem: [],
      quyKhoan: 0,
      quyKhoanThuctes: 0,
      loiNhuanBase: 0,
      doanhso: 0,
      quykhoancanam: 0,
      percentQuykhoan: 0,
      loinhuandenhientai: 0,
      loinhuancanam: 0,
      percentloinhuan: 0,
      doanhSoThucTe: 0,
      percentdoanhso: 0,
    };
    //console.log('percen',this.state.percentQuykhoan);
    this.modal = React.createRef();
  }

  componentDidMount() {
    this.props.getquantrithongtinduanAction();
  }

  filterByProject(ProjectName) {
    if (this.props.data !== null) {
      let newArr = [];
      this.props.data.lists.map((item) => {
        let all = item.all;
        all.list.forEach((itemAll) => {
          if (itemAll.TenDuAn === ProjectName) {
            newArr.push(itemAll);
          }
        });
      });
      //console.log(newArr)
      this.setState({ listMilestone: newArr });
    }
  }

  async componentDidUpdate(prevProps) {
    let listNameProject = [];
    if ((this.props.data !== null) & (this.props.data !== prevProps.data)) {
      //console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaa', this.props.data.lists);
      const dataProjectReport = this.props.data.lists;
      dataProjectReport.forEach((elementdata) => {
        let a = elementdata.all;
        a.list.forEach((element) => {
          listNameProject.push({
            id: element.id,
            title: element.TenDuAn,
            value: element.DoanhSo,
          });
        });
      });

      let newDataInfo = [];
      newDataInfo.push(this.props.data.moreInfo);
      let arrayAll = [];
      let sumLungKhoanChiTra = 0;
      let sumQuyKhoan = 0;
      let sumLuongCungThucChi = 0;
      let quyKhoanTT = 0;
      let sumLoiNhuanbase = 0;
      let sumDoanhSo = 0;
      let sumquykhoancanam = 0;
      let sumloinhuanhientai = 0;
      let sumloinhuancanam = 0;
      let sumdoanhsodenHientai = 0;
      let percentloinhuan = 0;
      dataProjectReport.forEach((element) => {
        (sumLungKhoanChiTra += element.all.luongKhoan),
          (sumQuyKhoan += element.all.quyKhoan),
          (sumLuongCungThucChi += element.all.luongCungThucChi);
        quyKhoanTT += element.all.quyKhoanThucTe;
        sumLoiNhuanbase += element.all.lnBase;
        sumDoanhSo += element.all.doanhSoCaNam;
        sumquykhoancanam += element.all.quyKhoanCaNam;
        sumloinhuanhientai += element.all.loiNhuanThucTe;
        sumloinhuancanam += element.all.loiNhuanCaNam;
        sumdoanhsodenHientai += element.all.doanhSoThucTe;
        //console.log(quyKhoanTT);
      });
      arrayAll.push({
        luongKhoan: this.common.convertSoTienThanhChuTat(sumLungKhoanChiTra),
        quyKhoan: sumQuyKhoan,
        luongCungThucChi: sumLuongCungThucChi,
      });
      //console.log('dddaayyyyyyyynnnnnnnneffffff', sumDoanhSo);

      await this.setState({
        Listdata: listNameProject,
        ListTongDuAn: newDataInfo,
        listAllInforItem: arrayAll,
        quyKhoan: sumQuyKhoan,
        quyKhoanThuctes: quyKhoanTT,
        quykhoancanam: sumquykhoancanam,
        percentQuykhoan: (quyKhoanTT / sumquykhoancanam) * 100,
        loiNhuanBase: sumLoiNhuanbase,
        doanhso: sumDoanhSo,
        loinhuandenhientai: sumloinhuanhientai,
        loinhuancanam: sumloinhuancanam,
        percentloinhuan: (sumloinhuanhientai / sumloinhuancanam) * 100,
        doanhSoThucTe: sumdoanhsodenHientai,
        percentdoanhso: (sumdoanhsodenHientai / sumDoanhSo) * 100,
      });
    }

    if ((this.props.error !== null) & (this.props.error !== prevProps.error)) {
      Snackbar.show({
        text: this.props.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
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
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        {/* ///////////////////////////////////Header/////////////////////////// */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={images.back} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Chi tiết dự án</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('FillterProjectReport')
            }>
            <Image source={images.Vector} />
          </TouchableOpacity>
        </View>
        {/* ////////////////////////////////////////////////////////////////////// */}
        <ScrollView>
          <View style={styles.viewAll}>
            <View style={styles.chartDunnut}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <Image
                    style={{ marginTop: Sizes.s7, marginRight: Sizes.h12 }}
                    source={images.dot_blue1}
                  />
                  <Text style={{ color: '#595959', fontSize: Sizes.h14 }}>
                    KH đến hiện tại
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <Image
                    style={{ marginTop: Sizes.s7, marginRight: Sizes.h12 }}
                    source={images.dot_blue2}
                  />
                  <Text style={{ color: '#595959', fontSize: Sizes.h14 }}>
                    KH cả năm
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '26.5%', marginTop: Sizes.h16 }}>
                    <ChartDonut percentage={this.state.percentdoanhso} />
                  </View>
                  <View
                    style={{
                      width: '73%',
                      marginLeft: Sizes.h16,
                      borderBottomWidth: 1,
                      borderColor: '#F5F5F5',
                      paddingRight: Sizes.h16,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        //backgroundColor: 'blue',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: Sizes.h24,
                      }}>
                      <Text
                        style={{
                          color: '#595959',
                          fontSize: Sizes.h16,
                          fontWeight: '500',
                        }}>
                        Doanh số
                      </Text>
                      <Text
                        style={{
                          color: '#595959',
                          fontSize: Sizes.h16,
                          fontWeight: '500',
                        }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.doanhSoThucTe,
                        )}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.s5 }}>
                      <Text style={{ color: '#597EF7' }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.doanhSoThucTe,
                        )}
                        /
                      </Text>
                      <Text style={{ color: '#D6E4FF' }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.doanhso,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '26.5%', marginTop: Sizes.h16 }}>
                    <ChartDonut percentage={this.state.percentloinhuan} />
                  </View>
                  <View
                    style={{
                      width: '73%',
                      marginLeft: Sizes.h16,
                      borderBottomWidth: 1,
                      borderColor: '#F5F5F5',
                      paddingRight: Sizes.h16,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        //backgroundColor: 'blue',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: Sizes.h24,
                      }}>
                      <Text
                        style={{
                          color: '#595959',
                          fontSize: Sizes.h16,
                          fontWeight: '500',
                        }}>
                        Lợi nhuận BASE
                      </Text>
                      <Text
                        style={{
                          color: '#595959',
                          fontSize: Sizes.h16,
                          fontWeight: '500',
                        }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.loiNhuanBase,
                        )}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.s5 }}>
                      <Text style={{ color: '#597EF7' }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.loinhuandenhientai,
                        )}
                        /
                      </Text>
                      <Text style={{ color: '#D6E4FF' }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.loinhuancanam,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '26.5%', marginTop: Sizes.h16 }}>
                    <ChartDonut percentage={this.state.percentQuykhoan} />
                  </View>
                  <View
                    style={{
                      width: '73%',
                      marginLeft: Sizes.h16,
                      paddingRight: Sizes.h16,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        //backgroundColor: 'blue',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: Sizes.h24,
                      }}>
                      <Text
                        style={{
                          color: '#595959',
                          fontSize: Sizes.h16,
                          fontWeight: '500',
                        }}>
                        Quỹ Khoán
                      </Text>
                      <Text
                        style={{
                          color: '#595959',
                          fontSize: Sizes.h16,
                          fontWeight: '500',
                        }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.quyKhoan,
                        )}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.s5 }}>
                      <Text style={{ color: '#597EF7' }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.quyKhoanThuctes,
                        )}
                        /
                      </Text>
                      <Text style={{ color: '#D6E4FF' }}>
                        {this.common.convertSoTienThanhChuTat(
                          this.state.quykhoancanam,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* //////////////////////////////////EndChart/////////////////////////// */}
            <View style={{ width: '100%', marginTop: Sizes.h16 }}>
              {this.state.ListTongDuAn.map((item, index) => (
                <ItemProjectReport key={item.id} data={item} />
              ))}
            </View>
            <View style={{ width: '100%' }}>
              {this.state.listAllInforItem.map((item, index) => (
                <ItemProjectReportII key={item.id} data={item} />
              ))}
            </View>

            <View
              style={{
                width: '100%',
                paddingHorizontal: Sizes.h16,
                marginBottom: Sizes.h16,
                paddingVertical: Sizes.s10,
                backgroundColor: 'white',
                borderRadius: Sizes.s2 * 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Sizes.h16 / 2,
              }}>
              {this.state.valueDV != null ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    flex: 1,
                    fontSize: Sizes.h16,
                    fontWeight: '500',
                    color: '#000000',
                  }}>
                  {this.state.valueDV.title}(
                  {this.state.valueDV.value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  )
                </Text>
              ) : (
                <View style={{ width: '70%' }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: Sizes.h16,
                      fontWeight: '500',
                      color: '#000000',
                    }}>
                    Chọn tên dự án
                  </Text>
                </View>
              )}
              <TouchableOpacity onPress={() => this.modal.current.open()}>
                <Text style={{ color: '#1890FF', fontSize: Sizes.h14 }}>
                  Thay đổi
                </Text>
              </TouchableOpacity>
            </View>
            <BottomShetprojectReport
              ref={this.modal}
              title="Chọn dự án muốn chọn"
              data={this.state.Listdata}
              onChangeValue={(value) => {
                this.filterByProject(value.title);
                this.setState({ valueDV: value });
              }}
            />
            {/* ////////////////////////////////////////////////////////// */}
            {/* <ScrollView> */}

            <View style={{ width: '100%' }}>
              {this.state.listMilestone?.length
                ? this.state.listMilestone.map((item) => (
                  <ItemAccordingToTheProject key={item.id} data={item} />
                ))
                : null}
            </View>
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: Sizes.h16,
  },
  titleHeader: {
    fontSize: Sizes.h16,
    fontWeight: '500',
  },
  viewAll: {
    height: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: Sizes.h16,
    paddingBottom: Sizes.h65,
  },
  chartDunnut: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.h16 / 2,
    padding: Sizes.h16,
  },
});
