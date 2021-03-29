import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import ItemGroup from './ItemTotal'
import { ScrollView } from 'react-native-gesture-handler';

export default class TotalScreen extends Component {
  state = {
    listData: []
  }


  componentDidUpdate(prevProps) {
    if (this.props !== null && prevProps !== this.props) {
      const { data } = this.props
      this.setState({ listData: data }, () => console.log('TotalScreen', (this.state.listData)))
    }
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexgrow: 1 }}>
          {this.props.data?.lists?.map((item,index)=><Text>cccc</Text>)}
        </ScrollView> */}
        <FlatList
          // ListEmptyComponent = {() => <Text>Loading</Text>}
          data={this.props.data}
          renderItem={({ item, index }) => {
            return <ItemGroup data={item} indexItem={index} />
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

    );
  }
}
