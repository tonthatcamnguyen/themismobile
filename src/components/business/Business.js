import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Paragraph, Title } from 'react-native-paper';
import Sizes from '../../res/values/Sizes';
import images from '../../res/images';
import stylesBusiness from '../../res/values/styles/business/stylesBusiness';

import Pie from 'react-native-pie';
import ListContent from './ListContent';
import ItemContent from './ItemContent';

// export class ChartPie extends React.Component {
//   render() {
//     return (
//       <View style={stylesBusiness.chart}>
//         <Pie
//           alignContent="center"
//           radius={90}
//           innerRadius={50}
//           dividerSize={3}
//           strokeCap={'butt'}
//           sections={[
//             {
//               percentage: 60,
//               color: '#FA541C',
//             },
//             {
//               percentage: 40,
//               color: '#4DD077',
//             },
//           ]}
//         />
//         <View style={stylesBusiness.gauge}>
//           <Text style={stylesBusiness.gaugeText}>{this.props.value}M</Text>
//         </View>
//       </View>
//     );
//   }
// }
export default class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      DataNamNay: [],
      DataNamTruoc: []
    };
  }
  componentDidMount() {
    let DataFull=[]
    if (this.props.responseBusinessEmp != null) {
      DataFull=this.props.responseBusinessEmp
      if(this.props.responseBusinessEmp.data != null)
      // console.log("dataaaaaaaaaaaa", this.props.responseBusinessEmp.data.namNay.lists)
      this.setState({ DataNamNay: this.props.responseBusinessEmp.data.namNay.lists,  DataNamTruoc: this.props.responseBusinessEmp.data.namTruoc.lists, }, () => {
        let arrDataList = [];
        arrDataList.push(this.currencyFormat(DataFull.data.kdTong.thuNhapTheoCongThuc)
        )
        arrDataList.push(this.currencyFormat(DataFull.data.kdTong.thuNhapLuyKeDaTra)
        )
        arrDataList.push(this.currencyFormat(DataFull.data.kdTong.thuNhapConDuocTra)
        )
        arrDataList.push(this.currencyFormat(DataFull.data.kdTong.soChiKyNay)
        )
        this.setState({ dataList: arrDataList })
      })
    }
    
    

  }

  componentDidUpdate(prevProps) {

  }

  //Function Format Money
  currencyFormat = (num) => {
    if (num == 0) {
      return '0';
    } else {
      return parseInt(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };

  navigateThisYear = () => {
    
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {/* <Card style={{ borderRadius: 9 }}>
            <Title style={stylesBusiness.title}>
              Thu nhập theo công thức khoán
            </Title>
            <ChartPie value={this.state.DataFull != null ? this.state.DataFull.data.namNay.lists[0].ThuNhapTheoCongThucKhoan : "null"} />
            <View style={stylesBusiness.thisYear}>
              <View style={stylesBusiness.imgThisYear}>
                <Image source={images.rectangleOrange} />
                <Text style={stylesBusiness.txtThisYear}>Thu nhập năm nay</Text>
              </View>
              <Text style={{fontSize: Sizes.h14}}>30M</Text>
            </View>
            <View style={stylesBusiness.lastYear}>
              <View style={stylesBusiness.imgLastYear}>
                <Image source={images.rectangleGreen} />
                <Text style={stylesBusiness.txtLastYear}>
                  Thu nhập năm trước
                </Text>
              </View>
              <Text style={{ fontSize: Sizes.h14 }}>90M</Text>
            </View>
          </Card> */}
          <View style={stylesBusiness.income}>

            {this.state.dataList != "" && ListContent.map((item, index) => {
              return (
                <ItemContent
                  key={index}
                  item={item}
                  value={this.state.dataList[index]}
                />
              );
            })}
          </View>
          <Card style={{
            borderRadius: 6, marginTop: Sizes.h16 / 2, borderTopWidth: 1,
            borderTopColor: '#FA541C'
          }}>
            <View style={stylesBusiness.joined}>
              <Title style={stylesBusiness.title}>
                Thu nhập và dự án năm trước
              </Title>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('BusinessDetail', {
                    type: 'nam truoc', data: this.state.DataNamTruoc
                  })
                }>
                <Text style={stylesBusiness.txtSeeAll}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card
            style={{
              borderRadius: 6,
              marginTop: Sizes.h16,
              marginBottom: Sizes.h16,
              borderTopWidth: 1,
              borderTopColor: '#2EB553'
            }}>
            <View style={stylesBusiness.joined}>
              <Title style={stylesBusiness.title}>
                Thu nhập và dự án năm nay
              </Title>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('BusinessDetail', {
                    type: 'nam nay', data: this.state.DataNamNay
                  })
                }>
                <Text style={stylesBusiness.txtSeeAll}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView >
    );
  }
}
