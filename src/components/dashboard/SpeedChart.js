import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Sizes from '../../res/values/Sizes';
import images from '../../res/images'
import Speedometer from 'react-native-speedometer-chart';



export default class SpeedChart extends Component {

  constructor(props){
    super(props);
  }

 
  componentDidUpdate(){
  }

  render() {
    const {value} = this.props  
    return (
      <View style={styles.speedChart}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: Sizes.h16,
            paddingBottom: Sizes.h42,
          }}>
          <Image
            style={{ height: 12, marginTop: 3, marginRight: 8 }}
            source={images.dot1}
          />
          <Text style={{ fontSize: 12, color: '#595959' }}>
            KH đến hiện tại
            </Text>
          <Image
            style={{
              height: 12,
              marginTop: 3,
              marginRight: 8,
              marginLeft: 24,
            }}
            source={images.dot2}
          />
          <Text style={{ fontSize: 12, color: '#595959' }}>
            Kế hoạch cả năm
          </Text>
        </View>
        <Speedometer
          value={value[1] != undefined ? value[1].toFixed(2) : 0}
          totalValue={value[0] != undefined ? value[0].toFixed(2) : 0}
          // value={80}
          // totalValue={100}
          size={Sizes.s240}
          outerColor="#D6E4FF"
          internalColor="#597EF7"
          showLabels
          labelStyle={{ color: 'blue' }}
          labelFormatter={(number) => `${number} B`}
          showPercent={false}
          percentStyle={{ color: 'red' }}
          showIndicator={false}
        />
        <Text style={{fontWeight:'bold', color:'#597EF7', fontSize:Sizes.s14, marginBottom:Sizes.h16}}>{value[1] != undefined ? value[1].toFixed(2) +' B' : 0 +' B'}</Text>
        <Text
          style={{
            fontSize: Sizes.h14,
            fontWeight: 'bold',
            paddingBottom: Sizes.s40,
          }}>
          Lợi nhuận base
          </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  speedChart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Sizes.h16,
  },

})
