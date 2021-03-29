import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Sizes from '../../res/values/Sizes';
import SearchBar from './SearchBar'
import YearScreen from './YearSrceen'
import TotalScreen from './TotalScreen'


export default class MenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTab: 1,
    };
  }
  render() {
    const {idTab} = this.state;
    return (
        <View style={{flex:1,marginTop: Sizes.h16,
          marginHorizontal: Sizes.h16}}> 
        <View
        style={{
          height: Sizes.h36, 
          flexDirection: 'row',
          backgroundColor: '#F5F5F5',
          borderRadius: 10,     
          marginBottom: Sizes.h16,
        }}>
        <TouchableOpacity
          onPress={() => this.setState({idTab: 1})}
          style={[idTab == 1 ? styles.tabItemChoose : styles.tabItemBasic,{flex:1}]}>
          <Text
            style={{
              fontSize: Sizes.h14,
              color: idTab == 1 ? 'black' : '#8C8C8C',
            }}>
            Tổng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({idTab: 2})}
          style={[idTab == 2 ? styles.tabItemChoose : styles.tabItemBasic,{flex: 1}]}>
          <Text
            style={{
              fontSize: Sizes.h14,
              color: idTab == 2 ? 'black' : '#8C8C8C',
            }}>
            Năm trước
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({idTab: 3})}
          style={[idTab == 3 ? styles.tabItemChoose : styles.tabItemBasic, {flex:1}]}>
          <Text
            style={{
              fontSize: Sizes.h14,
              color: idTab == 3? 'black' : '#8C8C8C',
            }}>
            Năm nay
          </Text>
        </TouchableOpacity> 
         
      </View>
       <SearchBar/> 
        {this.state.idTab === 1 ? 
          <TotalScreen/> : this.state.idTab === 2 ? <YearScreen/> : <YearScreen/>}
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