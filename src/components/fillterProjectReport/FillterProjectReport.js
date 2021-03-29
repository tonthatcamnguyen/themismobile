import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';
import BottomSheetFilterProjectReport from './BottomSheetFilterProjectReport';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheetYear from './BottomSheetYear';
import Select from './Select';

export default class FillterProjectReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idTab: 1,
      isShowFilter: false,
      listYear: [],
      listUnit: [
        {id: 1, label: 'Tất cả các đơn vị'},
        {id: 2, label: 'đơn vị 1'},
        {id: 3, label: 'đơn vị 2'},
        {id: 4, label: 'đơn vị 3'},
      ],
      listTeam: [
        {id: 1, label: 'Tất cả các bộ phận'},
        {id: 2, label: 'bộ phận 2'},
        {id: 3, label: 'bộ phận 3'},
        {id: 4, label: 'bộ phận 4'},
      ],
      listContractFund: [
        {id: 1, label: 'Tất cả'},
        {id: 2, label: 'Quỹ khoán 1'},
        {id: 3, label: 'Quỹ khoán 2'},
        {id: 4, label: 'Quỹ khoán 3'},
      ],
      valueChoseYear: null,
      valueChoseUnit: null,
      valueChoseTeam: null,
      valueChoseFund: null,
    };
    this.YearRef = React.createRef();
    this.UnitRef = React.createRef();
    this.TeamRef = React.createRef();
    this.FundRef = React.createRef();
  }

  componentDidMount() {
    this.props.getNamtinhkhoanAction();
  }

  async componentDidUpdate(prevProps) {
    if (
      (this.props.dataNam !== null) &
      (this.props.dataNam !== prevProps.dataNam)
    ) {
      console.log('data nam', this.props.dataNam);
      let rs = [];
      for (let i = 0; i < this.props.dataNam.NAM_TINH_KHOAN.length; i++) {
        rs.push({id: i, label: this.props.dataNam.NAM_TINH_KHOAN[i]});
      }
      await this.setState({
        listYear: rs,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={images.back} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Filter</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{color: '#597EF7', fontSize: Sizes.h14}}>Đồng ý</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Select
            ref={this.YearRef}
            placeholder="Chọn năm"
            listItem={this.state.listYear}
            onChooseItem={(item) => {
              this.setState(
                {
                  valueChoseYear:item,
                  valueChoseUnit:'',
                  valueChoseTeam:'',
                  valueChoseFund:'',
                },
                //() => this.TeamRef.current.clearSelected(),
              );
            }}
            // multiple
          />
          <Select
            disabled={this.state.valueChoseTeam == null ? true : false}
            ref={this.UnitRef}
            style={{marginTop: Sizes.h16}}
            placeholder="Đơn vị "
            value={this.state.valueChoseUnit}
            listItem={this.state.listUnit}
            onChooseItem={(item) => {
              this.setState({
                valueChoseUnit: item,
              });
            }}
            // multiple
          />
          <Select
            disabled={this.state.valueChoseTeam == null ? true : false}
            ref={this.TeamRef}
            style={{marginTop: Sizes.h16}}
            placeholder="Bộ phận "
            value={this.state.valueChoseTeam}
            listItem={this.state.listTeam}
            onChooseItem={(item) => {
              this.setState({
                valueChoseTeam: item,
              });
            }}
            // multiple
          />
          <Select
            disabled={this.state.valueChoseTeam == null ? true : false}
            ref={this.FundRef}
            style={{marginTop: Sizes.h16}}
            placeholder="Lọc quỹ khoán theo "
            value={this.state.valueChoseFund}
            listItem={this.state.listContractFund}
            onChooseItem={(item) => {
              this.setState({
                valueChoseFund: item,
              });
            }}
            // multiple
          />
        </View>
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
    // borderWidth:1,
    // borderBottomColor:'#8C8C8C'
  },
  titleHeader: {
    fontFamily: 'Roboto',
    fontSize: Sizes.h16,
    fontWeight: '500',
  },
  body: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    marginTop: 1,
    padding: Sizes.h16,
  },
});
