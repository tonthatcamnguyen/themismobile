import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import Header from '../custom/Header';
import Sizes from '../../res/values/Sizes';
import Business from '../business/Business';
import Produces from '../product/ProductScreen';
import BottomSheetFilter from '../custom/BottomSheetFilter';
import Select from '../custom/Select';
import images from '../../res/images/index';
import ProductScreenContainer from '../../containers/postProjectScreenContainer';

export default class homeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTab: 1,
      isShowFilter: false,
      listYear: [],
      listQuarterYear: [],
      listQuarterYearAll: [],
      dataBusiness: null,
      valueChooseYear: '',
      valueChooseQuarter: '',
    };
    this.YearRef = React.createRef();
    this.QuarterRef = React.createRef();
  }
  componentDidMount() {
    this.props.getKyTinhKhoanAction();

    this.props.getNamtinhkhoanAction();

    this.props.getBusinessEmpAction();
  }
  async componentDidUpdate(prevProps) {
    // if (
    //   this.props.loadingBusinessEmp != prevProps.loadingBusinessEmp &&
    //   !this.props.loadingBusinessEmp
    // ) {
    //   if (this.props.errorBusinessEmp != null) {
    //     Alert.alert('Thông báo', 'Không thể kết nối');
    //   } else if (this.props.responseBusinessEmp != null) {
    //     this.setState({ dataBusiness: this.props.responseBusinessEmp });
    //   }
    // }

    if (
      (this.props.dataNam !== null) &
      (this.props.dataNam !== prevProps.dataNam)
    ){
      let rs = [];
      for (let i = 0; i < this.props.dataNam.NAM_TINH_KHOAN.length; i++) {
        rs.push({id: i, label: this.props.dataNam.NAM_TINH_KHOAN[i]});
      }
      await this.setState({
        listYear: rs,
      });
    }
   
    if (
      (this.props.dataKy !== null) &
      (this.props.dataKy !== prevProps.dataKy) 
    ) {
      for (const item of prevProps.dataKy) {
        item.label = item.TenKyTinhKhoan;
      }
      await this.setState({
        listQuarterYearAll: prevProps.dataKy,
      });
    }
  }

  onPressFilter = () => {
    const input = {

    }
    this.props.getBusinessEmpAction(input)

  }

  ///////////////////////
  render() {
    const {idTab} = this.state;
    return (
      <View style={{ flex: 1, backgroundColor:'#FAFAFA'}}>
        <SafeAreaView/>
        <Header
          navigation={this.props.navigation}
          onPressRight={() => this.setState({isShowFilter: true})}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: Sizes.h16,
            paddingTop: Sizes.h16,
          }}>
          <View
            style={{
              height: Sizes.h36,
              width: '100%',
              flexDirection: 'row',
              backgroundColor: '#F5F5F5',
              borderRadius: 10,
              marginBottom: Sizes.h16,
            }}>
            <TouchableOpacity
              onPress={() => this.setState({idTab: 1})}
              style={idTab == 1 ? styles.tabItemChoose : styles.tabItemBasic}>
              <Text
                style={{
                  fontSize: Sizes.h14,
                  color: idTab == 1 ? 'black' : '#8C8C8C',
                }}>
                Sản xuất
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({idTab: 2})}
              style={idTab == 2 ? styles.tabItemChoose : styles.tabItemBasic}>
              <Text
                style={{
                  fontSize: Sizes.h14,
                  color: idTab == 2 ? 'black' : '#8C8C8C',
                }}>
                Kinh doanh
              </Text>
            </TouchableOpacity>
          </View>

          {idTab == 1 ? (
            <ProductScreenContainer {...this.props} />
          ) : (
            <Business {...this.props} data={this.state.dataBusiness} />
          )}
        </View>
        <Modal animationType="slide" visible={this.state.isShowFilter}>
          <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: Sizes.h16,
                borderBottomWidth: 0.25,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({isShowFilter: false})}>
                <Image source={images.xFilter} />
              </TouchableOpacity>

              <Text style={{fontSize: Sizes.h16, fontWeight: 'bold'}}>
                Filter
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({ isShowFilter: false }, () => { this.onPressFilter })}>
                <Text style={{ color: '#597EF7' }}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: Sizes.h16}}>
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
                    () => idTab == 2 && this.QuarterRef.current.clearSelected(),
                  );
                }}
              // multiple

              />
              {idTab == 2 && (
                <Select
                  disabled={this.state.valueChooseYear == '' ? true : false}
                  ref={this.QuarterRef}
                  style={{marginTop: Sizes.h16}}
                  placeholder="Chọn quý"
                  listItem={this.state.listQuarterYear}
                  value={this.state.valueChooseQuarter}
                  onChooseItem={(item) => {
                    this.setState({valueChooseQuarter: item});
                  }}
                  // multiple
                />
              )}
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

  tabItemBasic: {width: '50%', justifyContent: 'center', alignItems: 'center'},
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

    //backgroundColor:"red"
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
