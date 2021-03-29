import { StyleSheet } from "react-native";
import Sizes from '../../Sizes'

export default stylesLogin = StyleSheet.create({
    allView: {
     
      alignItems: 'center',
      backgroundColor: '#FAFAFA',
    },
    header: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: Sizes.s45,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: Sizes.s20,
    },
 
    logoThemis:{
        resizeMode:'center',
        width:Sizes.s90 + 5,
        paddingVertical: Sizes.s2
    },
    rightHeader:{
       height: Sizes.h20,
       width:Sizes.h20,
       alignContent:'center'
    }
  });
  
