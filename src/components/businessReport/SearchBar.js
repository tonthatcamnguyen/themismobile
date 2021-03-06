// Import react
import React from 'react'

// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Animated,
  Easing
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
import images from '../../res/images';
import Sizes from '../../res/values/Sizes';

const { Value, timing } = Animated

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// Declare component 
class SearchBar extends React.Component {
  
  constructor(props){
    super(props)

    // state
    this.state = {
      isFocused: false,
      keyword: ''
    }

    // animation values
    this._input_box_translate_x = new Value(-width)
    this._back_button_opacity = new Value(0)
    this._content_translate_y = new Value(height)
    this._content_opacity = new Value(0)
    this.text_opacity = new Value(1)
  }

  _onFocus = () => {
    // update state
    this.setState({isFocused: true})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }
    const text_opacity_config = {
        duration: 200,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()
    timing(this.text_opacity, text_opacity_config).start()

    // force focus
    this.refs.input.focus()

  }

  _onBlur = () => {
    // update state
    this.setState({isFocused: false})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: -width,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const text_opacity_config = {
        duration: 200,
        toValue: 1,
        easing: Easing.inOut(Easing.ease)
      }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()
    timing(this.text_opacity, text_opacity_config).start()

    // force blur
    this.refs.input.blur();

  }
  
  render(){
    return (
      <>
        <SafeAreaView style={styles.header_safe_area}>
         
          <View style={styles.header}>
            <View style={styles.header_inner}>
   
              <TouchableWithoutFeedback
                activeOpacity={1}
                underlayColor={"#ccd0d5"}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <Icon name="search" size={22} color="#000000" />
              </TouchableWithoutFeedback>
              <Animated.View
                style={[ styles.input_box, {transform: [{translateX: this._input_box_translate_x}] } ]}
              >
                <Animated.View style={{opacity: this._back_button_opacity}}>
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"#ccd0d5"}
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <Icon name="chevron-left" size={22} color="#000000" />
                  </TouchableHighlight>
                </Animated.View>
                <TextInput 
                  ref="input"
                  placeholder="Nh???p t??n t??i kho???n" 
                  clearButtonMode="always" 
                  value={this.state.keyword}
                  onChangeText={(value) => this.setState({keyword: value}) }
                  style={styles.input}
                />
              </Animated.View>
               <Animated.Text onPress={this._onFocus} style={{color:'#595959', fontSize:Sizes.h16, opacity:this.text_opacity, flex:1}}>T??m ki???m account</Animated.Text>
            </View>
          </View>
        </SafeAreaView>
{/* 
        <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{translateY: this._content_translate_y }] }]}>
          <SafeAreaView style={styles.content_safe_area}>
            <View style={styles.content_inner}>
              <View style={styles.separator} />
              {
                this.state.keyword === ''
                ?
                  <View style={styles.image_placeholder_container}>
                    <Image 
                      source={images.Rectangle3} 
                      style={styles.image_placeholder}
                    />
                    <Text style={styles.image_placeholder_text}>
                      Enter a few words{"\n"}
                      to search on Facebook
                    </Text>
                  </View>
                :
                  <ScrollView>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 1</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 2</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 3</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 4</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 5</Text>
                    </View>
                  </ScrollView>
              }
            </View>
          </SafeAreaView>
        </Animated.View> */}
      </>
    )
  }
}

export default SearchBar

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000
  },
  header: {
    height: 50,
    paddingHorizontal: Sizes.h16/2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: Sizes.h16
  },
  
  header_inner: {
    flex:1,
    overflow: 'hidden',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 8,
  },
  search_icon_box: {
    width:35,
    height: 35,
    borderRadius: 40,
    // backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_box: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    
    // top:0,
    // left:0,
    backgroundColor: 'white',
    width: width - 10
  },
  back_icon_box: {
    width: 20,
    height: 20,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // marginRight: Sizes.h20
  },
  input: {
    flex: 1,
    height: 38,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    fontSize: 15,
    paddingLeft: 16,
    marginLeft: 10
  },
  content: {
    width: width,
    height: height,
    position:'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
    // backgroundColor: 'red'
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white'
  },
  content_inner: {
    flex: 1,
    paddingTop: 50
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb'
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%'
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center'
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16
  },
  item_icon: {
    marginRight: 15
  }
})