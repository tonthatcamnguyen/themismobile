import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';

export default class ProfileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <SafeAreaView style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
        <View style={styles.header}>
          <Image
            style={{ width: Sizes.s90, height: Sizes.s35 }}
            source={images.themis}
          />
        </View>
        <View style={styles.ViewAll}>
          <View style={styles.Users}>
            <Image
              style={{ width: Sizes.s50, height: Sizes.s50 }}
              source={images.ic_users}
            />
            <Text
              style={{
                fontSize: Sizes.h14,
                paddingTop: Sizes.h16,
                color: '#262626',
              }}>
              Tôn Thất Cẩm Nguyên
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('TransferOfRights')
              }>
              <Text
                style={{
                  color: '#597EF7',
                  fontSize: Sizes.h12,
                  paddingTop: Sizes.s7 + 1,
                  paddingBottom: Sizes.h16,
                }}>
                Lãnh đạo Fis
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('homeContainer')}>
            <View style={styles.Home}>
              <Image
                style={{ marginTop: Sizes.s10 + 4, marginLeft: Sizes.h16 }}
                source={images.icon_Home}
              />
              <Text
                style={{
                  paddingTop: Sizes.s10 + 1,
                  fontSize: 14,
                  color: '#595959',
                  paddingBottom: Sizes.s10 + 1,
                  paddingLeft: Sizes.h16,
                  paddingRight: Sizes.s120 - 3,
                }}>
                Trang chủ
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.viewBodyPage}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ marginTop: Sizes.s10 + 4, marginLeft: Sizes.h16 }}
                  source={images.ic_clock}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                    paddingTop: Sizes.s10 + 1,
                    paddingBottom: Sizes.s10 + 1,
                    paddingLeft: Sizes.h16,
                    paddingRight: Sizes.s100 + 10,
                  }}>
                  Dashboard
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DashboardBusiness')
              }>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{
                    marginTop: Sizes.s10 + 4,
                    marginLeft: Sizes.h16,
                    marginRight: Sizes.h16,
                  }}
                  source={images.business}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                    paddingTop: Sizes.s10 + 1,
                    paddingBottom: Sizes.s10 + 1,
                    paddingRight: Sizes.s120 - Sizes.h12,
                    borderTopWidth: 1,
                    borderColor: '#F5F5F5',
                  }}>
                  Kinh doanh
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DashboardProjContainer')
              }>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{
                    marginTop: Sizes.s10 + 4,
                    marginLeft: Sizes.h16,
                    marginRight: Sizes.h16,
                  }}
                  source={images.ic_project}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#595959',
                    paddingTop: Sizes.s10 + 1,
                    paddingBottom: Sizes.s10 + 1,
                    paddingRight: Sizes.s140,
                    borderTopWidth: 1,
                    borderColor: '#F5F5F5',
                  }}>
                  Dự án
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            //onPress={() => this.logOut()}
            //onPress={() => this.toggleModal()}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <View style={styles.Home}>
              <Image
                style={{ marginTop: Sizes.s10 + 4, marginLeft: Sizes.h16 }}
                source={images.ic_logout23}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#595959',
                  paddingTop: Sizes.s10 + 1,
                  paddingBottom: Sizes.s10 + 1,
                  paddingLeft: Sizes.h16,
                  paddingRight: Sizes.s120 - 8,
                }}>
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Bạn có chắc chắn muốn đăng xuất</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#FFFFFF" }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                    this.props.navigation.replace('Login');
                  }}
                >
                  <Text style={styles.textStyle}>Tôi đồng ý</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton2, backgroundColor: "#FFFFFF" }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle2}>Không</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

        </View>

        <Image style={styles.logoFPT} source={images.ic_fpt_is} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  ViewAll: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    backgroundColor: '#FAFAFA',
    //justifyContent:'center',
    // alignItems: 'center',
    padding: Sizes.h16,
  },
  header: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    paddingTop: Sizes.s40 + 1,
    paddingBottom: Sizes.s7 + 1,
  },
  Users: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',

    paddingTop: Sizes.h16,
    borderRadius: Sizes.s7 + 1,
    paddingLeft: Sizes.s45,
    paddingRight: Sizes.s45,
  },
  Home: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.s7 + 1,
    marginTop: Sizes.s7 + 1,
  },
  viewBodyPage: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.s7 + 1,
    marginTop: Sizes.s7 + 1,
  },

  logoFPT: {
    backgroundColor: '#FAFAFA',
    width: Sizes.s120 - 10,
    height: Sizes.s35 - 2,
    alignSelf: 'center',
    marginBottom: Sizes.h16,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
    padding: Sizes.h16,
  }, modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: Sizes.h16 / 2,
    padding: Sizes.h16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    width: '100%',
    //backgroundColor: "#F194FF",
    borderRadius: Sizes.h16 / 2,
    padding: 10,
    //elevation: 2
  },
  openButton2: {
    width: '100%',
    //backgroundColor: "#F194FF",
    borderRadius: Sizes.h16 / 2,
    padding: 10,
    //elevation: 2,
    marginTop: Sizes.h12
  },
  textStyle: {
    color: "#F5222D",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle2: {
    color: "#1890FF",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: Sizes.h12,
    textAlign: "center",
    color: "#8C8C8C"
  }
});
