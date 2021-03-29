import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Item, Icon, Input } from 'native-base'
import HeaderDetailPage from '../custom/HeaderDetailPage';
import Sizes from '../../res/values/Sizes';
import ItemBusinessIncomDetail from './ItemBusinessIncomDetail';

export default class BusinessDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterMaDuAn: [],
      // DataContent: [],
    };

    this.modal = React.createRef();
  }

  
  async componentDidMount() {
    this.searchMaDuAn(" ")
  }

  searchMaDuAn(textToSearch) {  
    let list = this.props.navigation.state.params.data
   // console.log('aaaaaaaaa', list);
   
    this.setState({
      filterMaDuAn: list.filter(item => 
        item.MaDuAn.toLowerCase().includes(textToSearch.toLowerCase()) || 
        item.TenDuAn !== undefined && 
        item.TenDuAn.toLowerCase().includes(textToSearch.toLowerCase())
      ),
    },() => console.log('ccc',this.state.filterMaDuAn)
    );             
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <SafeAreaView/> */}
        <HeaderDetailPage
          goBack={() => this.props.navigation.goBack()}
          title={
            this.props.navigation.state.params.type === 'nam truoc'
              ? 'Thu nhập và dự án năm trước '
              : 'Thu nhập và dự án năm nay'
          }
        />
        <View style={{ paddingTop: Sizes.h16/2, flex: 1, paddingHorizontal: Sizes.h16}}>
          <Item style={{backgroundColor:'white', borderRadius:8, marginBottom: Sizes.h16 }}>
            <Icon style={{paddingLeft: Sizes.h16}}  name="search" size={20} alignment='center' color={"#333333"}
            />
            <Input style={{paddingRight: Sizes.h16}} placeholder="Tìm kiếm" onChangeText={text => this.searchMaDuAn(text)} 
            />
          </Item>
          {/*----------------------- */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
              }}>
            </View>
            <View>
            {this.state.filterMaDuAn.map((item) => (
              <ItemBusinessIncomDetail data={item} year={this.props.navigation.state.params.type} />
            ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
