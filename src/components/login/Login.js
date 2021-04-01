import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../res/images/index';
import Sizes from '../../res/values/Sizes';
import TextInputAnimated from './TextInputAnimated';

const LoginButton = ({ onPress, title, navigation }) => (
  <TouchableOpacity onPress={() => onPress()} style={styles.loginContainer}>
    <Text style={styles.loginBtn}>{title}</Text>
  </TouchableOpacity>
);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: 'maipt@fpt.comvn',
      isCheck: false,
    };
  }

  componentDidMount() {
    TouchID.isSupported()
      .then(biometryType => {

        // const config = {
        //   title: 'Authentication Required',
        //   cancelButton: 'Cancel',
        // }
        // FingerprintScanner.authenticate(config)
        //   .then(() => this.onPressLogin())
        //   .catch((error) => alert(error.message))

        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.loadingLogin !== prevProps.loadingLogin &&
      !this.props.loadingLogin
    ) {
      if (this.props.errorLogin !== null) {
        console.log('ERR');
      } else if (this.props.responseLogin !== null) {
        this.props.navigation.navigate('Header');
      }
    }
  }
  onToggleCheck = () =>
    this.setState({
      isCheck: !this.state.isCheck,
    });
  onPressLogin = () => {
    // this.props.onPostLoginAction({
    //   user: this.state.username,
    // });
    this.props.navigation.navigate("homeContainer")
  };

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <ImageBackground
          imageStyle={{
            borderBottomLeftRadius: Sizes.h18,
            borderBottomRightRadius: Sizes.h18,
          }}
          style={styles.bgrLogin}
          source={images.bgrLogin}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.login}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: Sizes.s160 - 5,
                  height: Sizes.s60 + 5,
                }}
                source={images.themis}
              />
              <TextInputAnimated
                style={{ marginTop: Sizes.h16 }}
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                onPressClear={() => this.setState({ email: '' })}
                label="Email"
              />
              <TextInputAnimated
                style={{ marginTop: Sizes.h16 }}
                label="Nhập mật khẩu"
                isPassword
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                onPressClear={() => this.setState({ password: '' })}
              />
              <TouchableWithoutFeedback onPress={this.onToggleCheck}>
                <View style={styles.checkContainer}>
                  <Icon
                    name={this.state.isCheck ? 'check-square' : 'square'}
                    size={Sizes.h14}
                    color="#1890FF"
                  />
                  <Text style={styles.textCheckLogin}>Ghi nhớ đăng nhập</Text>
                </View>
              </TouchableWithoutFeedback>
              <LoginButton
                title="Đăng nhập"
                onPress={() => this.onPressLogin()}
              />
              <Button title="AA" onPress={() => {
                const config = {
                  title: 'Authentication Required',
                  cancelButton: 'Cancel',
                }
                FingerprintScanner.authenticate(config)
                  .then(() => this.onPressLogin())
                  .catch((error) => alert(error.message))

              }}></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <Text
          style={{ fontSize: Sizes.h12, textAlign: 'center', color: '#8C8C8C', }}>
          Copyright by FPT - Infomation System
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bgrLogin: {
    flex: 1,
    width: Sizes.s340 + 35,
    height: Sizes.s200 * 2 + 6,
    paddingHorizontal: Sizes.h16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    color: 'white',
    // fontWeight: 'bold',
    paddingHorizontal: Sizes.s120 - 2,
    paddingVertical: Sizes.h10,
    fontSize: Sizes.h16,
  },
  loginContainer: {
    backgroundColor: '#597EF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.h14,
    borderRadius: 5,
    marginTop: Sizes.h16,
  },
  checkContainer: {
    flexDirection: 'row',
    marginTop: Sizes.h16,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Sizes.h16,
  },
  textCheckLogin: {
    width: '100%',
    // color: '#F5A33E',
    // fontStyle: 'italic',
    paddingStart: 10,
    fontSize: Sizes.h14,
  },
  login: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: Sizes.h52 + 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
