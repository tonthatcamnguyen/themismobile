import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
  } from 'react';
  import {
    View,
    Text,
    Modal,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import images from '../../res/images';
  import Sizes from '../../res/values/Sizes';
  
  const BottomSheetYear = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [selectItem, setSelectItem] = useState('')
    const time = 350;
    const modalHeight = props.modalHeight;
    const animation = new Animated.Value(modalHeight);
   
  
    useImperativeHandle(ref, () => ({
      open: () => {
        onShow();
      },
      close: () => {
        onHide();
      },
    }));
    const slideUp = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: time,
        useNativeDriver: true
      }).start()
    }
    const slideDown = () => {
      Animated.timing(animation, {
        toValue: modalHeight,
        duration: time,
        useNativeDriver: true
      }).start()
    }
    const onShow = () => {
      setShow(true)
    }
    const onHide = () => {
      slideDown()
      setTimeout(() => {
        setShow(false)
      }, time)
    }
    const renderItems = ({ item, index }) => (
      <TouchableOpacity onPress={() => { props.onChangeValue(item); setSelectItem(item); setShow(false) }} style={{
        padding: Sizes.h16, borderBottomWidth: 1,
        borderColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
      }}>
       {props.isYear ? <Text>{item.title}</Text>: <Text>{item.title} {item.value}</Text>}
        {selectItem===item ? <Image source={images.check} style={{ width: Sizes.h16, height: Sizes.h16, resizeMode: 'contain' }} />:null}
      </TouchableOpacity>
    )
    useEffect(() => {
      show ? slideUp() : onHide()
    }, [show])
  
    return (
      <Modal visible={show} transparent statusBarTranslucent animationType='fade'>
        <TouchableWithoutFeedback onPress={onHide}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modal, { height: modalHeight, transform: [{ translateY: animation }] }]}> 
                <View style={styles.title}>
                  {/* <Image style={{backgroundColor:'red', }} source={images.clearTxtInput}/> */}
                  
                  <Text style={styles.txtTitle}>{props.title}</Text>
                </View>
                <FlatList
                  data={props.data}
                  renderItem={renderItems}
                  keyExtractor={(item, index) => index}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  })
  
  export default BottomSheetYear
  BottomSheetYear.defaultProps = {
    modalHeight: Dimensions.get('window').height * 0.4,
    data: [],
    onPress:()=>{}
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      flex: 1,
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: 'white',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12
    },
    title: {
      height: Sizes.h65,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#F5F5F5',
      flexDirection: 'row'
    },
    txtTitle:{
      fontSize:Sizes.h16,
      fontWeight: 'bold',
      paddingVertical: Sizes.h20
    },
  })