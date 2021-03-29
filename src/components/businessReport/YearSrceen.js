import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import ItemYearGroup from './ItemYear';


export default class YearScreen extends Component {
  state = {
    listData: []
  }
  componentDidMount() {
    const { data } = this.props
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAA', data);
  }
  componentDidUpdate(prevProps) {
    if (this.props !== null && prevProps !== this.props) {

      const { data } = this.props
      this.setState({ listData: data }, () => console.log('YearScreen', (this.state.listData)))
    }
  }
  render() {
    const { data } = this.props

    return (
      <View style={{ flex: 1 }}>
        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexgrow: 1 }}>
          {this.props.data?.lists?.map((item,index)=><Text>cccc</Text>)}
        </ScrollView> */}
        <FlatList
          // ListEmptyComponent = {() => <Text>Loading</Text>}
          data={data}
          renderItem={({ item, index }) => {
            return <ItemYearGroup data={item} />
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

    );
  }
}
