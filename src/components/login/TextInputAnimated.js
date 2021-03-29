import  Sizes  from '../../res/values/Sizes';
import React, { Component } from 'react';
import {
   TextInput,
   Animated,
   StyleSheet,
   Image,
   TouchableOpacity,
   View,
   Platform,
   Alert,
} from 'react-native';
import images from '../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome5'

const BASE_SIZE = 16; //text size and padding size
const VIEW_HEIGHT = BASE_SIZE * 3.5; //chiều cao của view tổng
export default class TextInputAnimated extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isFocused: false,
         hidePassword: true,
         labelHeight: 0,
      };
      this.textInput = React.createRef();
   }

   UNSAFE_componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
   }

   handleFocus = () => {
      this.setState({ isFocused: true });
   };

   handleBlur = () => {
      this.setState({ isFocused: false });
   };

   componentDidUpdate() {
      Animated.timing(this._animatedIsFocused, {
         toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
         duration: 200,
         useNativeDriver: false,
      }).start();
   }

   render() {
      const { label, ...props } = this.props;
      const { isFocused, labelHeight } = this.state;
      const centerLabel = (VIEW_HEIGHT - labelHeight - 2) / 2;
      const labelStyle = {
         color: this.props.disabled ? 'gray' : 'gray',
         
         textAlignVertical: 'top',
         position: 'absolute',
         left: BASE_SIZE,
         top: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [centerLabel, BASE_SIZE / 2],
         }),
         fontSize: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [BASE_SIZE, BASE_SIZE * 0.8125],
         }),
         // backgroundColor: '#00000036',
      };
      return (
         <TouchableOpacity
            activeOpacity={1}
            {...props}
            onPress={() => {
               this.props.isPicker ? null : this.textInput.current.focus();
               this.props.onPress();
            }}
            style={[
               styles.container,
               isFocused && {
                  borderColor: '#9F50CA',
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: {
                     width: 0,
                     height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  backgroundColor: 'white',
               },
               this.props.disabled && { backgroundColor: 'gray' },
               this.props.style,
            ]}>
            {/* //////label floating///// */}
            <Animated.Text
               onLayout={(event) => {
                  labelHeight === 0 &&
                     this.setState({ labelHeight: event.nativeEvent.layout.height });
               }}
               style={[labelStyle, this.props.styleLabel]}>
               {label}
            </Animated.Text>
            {this.props.isPassword ? (
               ///text input có icon ẩn hiện pass/////
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     style={[styles.textInput, isFocused && { width: '80%' }]}
                     onFocus={this.handleFocus}
                     secureTextEntry={this.state.hidePassword}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <>
                        <TouchableOpacity
                           style={{
                              position: 'absolute',
                              right: BASE_SIZE + Sizes.s30,
                              // marginVertical: BASE_SIZE
                           }}
                           onPress={() => this.props.onPressClear()}>
                           <Image
                              resizeMode="contain"
                              style={{ width: Sizes.h14, height: Sizes.h14}}
                              source={images.clearTxtInput}
                           />
                        </TouchableOpacity>
                        <View
                           style={{
                              width: 1,
                              height: Sizes.h24,
                              backgroundColor: 'gray',
                              position: 'absolute',
                              right: BASE_SIZE*2+5 ,
                           }}
                        />
                     </>
                  ) : null}

                  <TouchableOpacity
                     style={{ position: 'absolute', right: BASE_SIZE }}
                     onPress={() => {
                        this.setState({ hidePassword: !this.state.hidePassword });
                     }}>
                     <Icon
                        resizeMode="contain"
                        style={{ color:'gray', width: Sizes.h16, height: Sizes.h16 }}
                        size={Sizes.h14}
                        name={
                           !this.state.hidePassword ? 'eye-slash' : 'eye'
                        }
                     />
                  </TouchableOpacity>
               </>
            ) : this.props.isHideInput ? (
               ///text input hide text/////
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     editable={!this.props.disabled}
                     style={[
                        styles.textInput,
                        this.props.disabled && { color: 'gray' },
                     ]}
                     secureTextEntry={this.state.hidePassword}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <TouchableOpacity
                        style={{
                           position: 'absolute',
                           right: BASE_SIZE / 2,
                        }}
                        onPress={() => this.props.onPressClear()}>
                        <Image
                           resizeMode="contain"
                           style={{ width: Sizes.h32 * 2, height: Sizes.h32 * 2 }}
                           source={images.ic_menu}
                        />
                     </TouchableOpacity>
                  ) : null}
               </>
            ) : this.props.isPicker ? (
               //textinput disable edit tích hợp vào picker
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     editable={false}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     style={[styles.textInput, { color: 'black' }]}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  <View style={{ position: 'absolute', right: BASE_SIZE }}>
                     <Image
                        resizeMode="contain"
                        style={{
                           width: Sizes.h48,
                           height: Sizes.h48,
                           tintColor: 'gray',
                        }}
                        source={images.ic_menu}
                     />
                  </View>
               </>
            ) : this.props.isCardId ? (
               //textinput nhập id bank card
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     style={[styles.textInput, isFocused && { width: '85%' }]}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <>
                        <TouchableOpacity
                           style={{
                              position: 'absolute',
                              right: BASE_SIZE + Sizes.h48,
                           }}
                           onPress={() => this.props.onPressClear()}>
                           <Image
                              resizeMode="contain"
                              style={{ width: Sizes.h32 * 2, height: Sizes.h32 * 2 }}
                              source={images.ic_menu}
                           />
                        </TouchableOpacity>
                        <View
                           style={{
                              width: 1,
                              height: Sizes.h24,
                              backgroundColor: 'gray',
                              position: 'absolute',
                              right: BASE_SIZE + Sizes.h48 + Sizes.s5,
                           }}
                        />
                     </>
                  ) : null}

                  <View style={{ position: 'absolute', right: BASE_SIZE }}>
                     <Image
                        resizeMode="contain"
                        style={{ width: Sizes.s35, height: Sizes.s35 }}
                        source={images.ic_menu}
                     />
                  </View>
               </>
            ) : (
               //text input nhập chữ bình thường////////////
               <>
                  <TextInput
                     {...props}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     
                     maxLength={100}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     editable={!this.props.disabled}
                     style={[
                        styles.textInput,
                        this.props.disabled && { color: 'gray' },
                     ]}
                     style={styles.textInput}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <TouchableOpacity
                        style={{
                           position: 'absolute',
                           right: BASE_SIZE ,
                           paddingTop: Sizes.h10
                        }}
                        onPress={() => this.props.onPressClear()}>
                        <Image
                           resizeMode="contain"
                           style={{ width: Sizes.h16, height: Sizes.h16 }}
                           source={images.clearTxtInput}
                        />
                     </TouchableOpacity>
                  ) : null}
               </>
            )}
         </TouchableOpacity>
      );
   }
}
TextInputAnimated.defaultProps = {
   onPress: () => {},
};
const styles = StyleSheet.create({
   container: {
      borderColor: 'gray',
      borderRadius: BASE_SIZE / 2,
      borderWidth: 1,
      marginHorizontal: BASE_SIZE,
      paddingHorizontal: BASE_SIZE,
      paddingVertical: BASE_SIZE,
      height: VIEW_HEIGHT,
      justifyContent: 'center',
   },
   textInput: {
      width: '85%',
      position: 'absolute',
      left: BASE_SIZE,
      bottom: Platform.OS === 'ios' ? BASE_SIZE / 2 : BASE_SIZE / 2 - 5,
      // top: BASE_SIZE / 2,
      fontSize: BASE_SIZE,
      padding: 0,
      borderWidth: 0,
      // marginVertical: Sizes.h16,
      //  backgroundColor: '#00000036',
   },
});
