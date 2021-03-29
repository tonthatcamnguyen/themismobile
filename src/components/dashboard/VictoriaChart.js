import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Sizes from '../../res/values/Sizes';
import images from '../../res/images'
import Speedometer from 'react-native-speedometer-chart';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryGroup,
    VictoryAxis,
  } from 'victory-native';



export default class SpeedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }
  render() {
    return (    
        <View>
        <View style={styles.titleView}>
              <Text
                style={{
                  color: '#262626',
                  fontSize: Sizes.h16,
                  fontWeight: '500',
                }}>
                Quỹ khoán theo đơn vị
              </Text>
            </View>
            <View style={styles.allValueChart}>
              <View style={{alignItems: 'center', paddingTop: Sizes.s30}}>
                <Text style={{fontSize: Sizes.h10, color: '#262626' }}>
                  Billions
                </Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>100</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>80</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>60</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>40</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>20</Text>
                <Text style={{fontSize: Sizes.h10, color: '#8C8C8C'}}>0</Text>
                <TouchableOpacity
                  style={{
                    paddingTop: Sizes.h16/2,
                    paddingBottom: 16,
                    paddingLeft: Sizes.h10,
                    paddingRight: Sizes.h10,
                  }}>
                  <Image source={images.buttum1} />
                </TouchableOpacity>
              </View>
              <View style={styles.chart}>
                <VictoryChart
                  height={200}
                  width={300}
                  domainPadding={30}
                  animate={{duration: 1000}}>
                  <VictoryAxis />
                  <VictoryGroup
                    height={120}
                    offset={9}
                    crossAxis={false}
                    colorScale={['#1890FF', '#2EB553', '#FA541C']}>
                    
                    <VictoryBar
                      cornerRadius={{top: 2}}
                      data={[
                        {x: 'FIS-BANK', y: 20},
                        {x: 'FIS-ENT', y: 30},
                        {x: 'FIS-TDC', y: 70},
                      ]}
                    />
                    
                    <VictoryBar
                      cornerRadius={{top: 2}}
                      data={[
                        {x: 'FIS-BANK', y: 50},
                        {x: 'FIS-ENT', y: 40},
                        {x: 'FIS-TDC', y: 50},
                      ]}
                    />
                    <VictoryBar
                      cornerRadius={{top: 2}}
                      data={[
                        {x: 'FIS-BANK', y: 30},
                        {x: 'FIS-ENT', y: 20},
                        {x: 'FIS-TDC', y: 100},
                      ]}
                    />
                  </VictoryGroup>
                </VictoryChart>
               
              </View>
              <View  style={{ alignItems: 'flex-end',paddingTop: Sizes.h16 + 2, paddingRight: Sizes.h14, }}>
                <Image source={images.dot_price_1} />
                <Text style={{ fontSize: Sizes.h10, color: '#262626',paddingTop: Sizes.s5,paddingBottom: Sizes.s5}}>
                  Quỹ khoán
                </Text>
                <Image source={images.dot_price_2} />
                <Text  style={{ fontSize: Sizes.h10,color: '#262626',paddingTop: Sizes.s5,paddingBottom: Sizes.s5,  }}>
                  Đã chi
                </Text>
                <Image source={images.dot_price_3} />
                <Text  style={{fontSize: Sizes.h10, color: '#262626',paddingTop: Sizes.s5, paddingBottom: Sizes.s5 }}>
                  Còn lại
                </Text>

                <TouchableOpacity
                  style={{ paddingTop: Sizes.h16, paddingBottom: Sizes.s7,  paddingLeft: Sizes.s5, paddingRight: Sizes.S5}}>
                  <Image source={images.buttum2} />
                </TouchableOpacity>
              </View>
            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    titleView: {
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: Sizes.s7 + 1,
        borderTopLeftRadius: Sizes.s7 + 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Sizes.h16,
        padding: Sizes.h16,
      },
      titlePrice: {
        // width: '100%',
        borderBottomRightRadius: Sizes.s7 + 1,
        borderBottomLeftRadius: Sizes.s7 + 1,
        marginTop: Sizes.s2 - 1,
        paddingHorizontal: Sizes.h16,
        paddingTop: Sizes.h16/2,
        paddingBottom: Sizes.h16,
      },
      chart: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: Sizes.s120,
        paddingTop: Sizes.h16,
      },
      allValueChart: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '100%',
        justifyContent: 'center',
        // marginBottom: Sizes.s15,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        marginTop: Sizes.s2 - 1,
      },
   

})
