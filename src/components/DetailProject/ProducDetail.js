import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import Header from '../custom/Header';
import HeaderDetailPage from '../custom/HeaderDetailPage';
import Sizes from '../../res/values/Sizes';
import ListProductDetail from './ListProductDetail';
import ItemProductDetail from './ItemProductDetail';
import Snackbar from 'react-native-snackbar';
import BottomSheetDetailProject from './BottomSheetDetailProject';
import {log} from 'react-native-reanimated';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDV: null,
      ListNameDA: [],
      ListMilestoneKhoan: [],
      ListMilestone: [],
    };

    this.modal = React.createRef();
  }

  componentDidMount() {
    this.props.postProjectDetailAction();
  }

  filterByProject(projectName) {
    if (this.props.data !== null) {
      this.props.data.lists.map((item) => {
        if (item.info.tenDuAn === projectName) {
          this.setState({ListMilestone: item.list});
          
        }
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.data !== null) & (this.props.data !== prevProps.data)) {
      console.log('data prductDetail', this.props.data.lists);

      const dataProject = this.props.data.lists;

      let arrayNamePJ = [];
      dataProject.forEach((itemName) => {
        let a = itemName.info;
        arrayNamePJ.push({
          title: a.tenDuAn,
          value: a.duLieuChiTra
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        });
      });

      let Milestone = [];
      dataProject.forEach((itemMilestone) => {
        let b = itemMilestone.list;
        b.forEach((item) => {
          Milestone.push({label: item.MilestoneKhoan, title: item.TenDuAn});
        });
      });


      this.setState({
        ListNameDA: arrayNamePJ,
        ListMilestoneKhoan: Milestone,
      });
    }
    if ((this.props.error !== null) & (this.props.error !== prevProps.error)) {
      Snackbar.show({
        text: this.props.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderDetailPage
          goBack={() => this.props.navigation.goBack()}
          title={'Dự án đã tham gia'}
        />
        <View style={{padding: Sizes.h16, flex: 1}}>
          <View
            style={{
              paddingHorizontal: Sizes.h16,
              marginBottom: Sizes.h16,
              paddingVertical: Sizes.s10,
              backgroundColor: 'white',
              borderRadius: Sizes.s2 * 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {this.state.valueDV != null ? (
              <View style={{width: '75%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: Sizes.h16,
                    fontWeight: '500',
                    color: '#000000',
                  }}>
                  {this.state.valueDV.title}({this.state.valueDV.value})
                </Text>
              </View>
            ) : (
              <View style={{width: '70%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: Sizes.h16,
                    fontWeight: '500',
                    color: '#000000',
                  }}>
                  Chọn tên dự án muốn xem
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={() => this.modal.current.open()}>
              <Text style={{color: '#1890FF', fontSize: Sizes.h14}}>
                Thay đổi
              </Text>
            </TouchableOpacity>
          </View>
          {/* ----------------------- */}
          <BottomSheetDetailProject
            ref={this.modal}
            title="Chọn tên dự án muốn xem"
            data={this.state.ListNameDA}
            onChangeValue={(value) => {
              this.setState({valueDV: value}, () =>
                this.filterByProject(value.title),
              );
            }}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {this.state.ListMilestone.map((item) => (
              <ItemProductDetail key={item.id} data={item} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}
