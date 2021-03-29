import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { createAppContainer } from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import Login from '../components/login/Login';
import Produces from '../components/product/ProductScreen';
import { Item } from 'native-base';
import ProfileDrawer from '../components/Drawermenu/ProfileDrawer';
import DashboardProject from '../components/DashboardProject/DashboardProject';
import Dashboard from '../components/dashboard/Dasboard';
import Business from '../components/business/Business';
import businessEmpContainer from './bussinessEmp/businessEmpContainer'
import homeContainer from './home/homeContainer'
import Header from '../components/custom/Header';
import BusinessDetail from '../components/business/BusinessIncomDetail';
import BusinessReport from '../components/businessReport/BusinessReport';
import TransferOfRights from '../components/transfer_of_rights/TransferOfRights';
import FilterdashboardProject from '../components/filterDashboardProject/FilterdashboardProject';
import ProductScreenContainer from "../containers/postProjectScreenContainer";
import loginContainer from '../containers/loginContainer';
import ProjectReport from "../components/projectReport/ProjectReport";
import ProductDetialContainer  from "../containers/postProjectDetailContainer";
import DashboardProjContainer from "../containers/DashboardProjContainer";
import fillterProjectReportContainer from "../containers/fillterProjectReportContainer";
import fillterDashboardProjectContainer from "../containers/filterDashboardProjectContainer";
import ProjectReportContainer from "../containers/ProjectReportContainer";
import dashboardContainer from '../containers/dashboard/dashboardContainer'
import dashboardBusinessContainer from './dashboardBusiness/dashboardBusinessContainer';
import businessReportContainer from './businessReport/businessReportContainer';

const Drawer = createDrawerNavigator(
  {
    homeContainer: {
      screen: homeContainer,
    },
    TAB: {
      screen: Header,
    },
    DashboardProjContainer: {
      screen: DashboardProjContainer,
    },  
    Produces:{
      screen:ProductScreenContainer
    },
    Dashboard: {
      screen: dashboardContainer,
    },
    DashboardBusiness: {
      screen: dashboardBusinessContainer,
    },
  },
  {
    headerMode: 'none',
    contentComponent: (props) => <ProfileDrawer {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.7,
  },
);

const DRAWER = createAppContainer(Drawer);

const RootStack = createStackNavigator(
  {
    Login: {
      screen: loginContainer,
    },
    Header:{
      screen:DRAWER,
    },
    Business: {
      screen: businessEmpContainer,
    },
    BusinessDetail: {
      screen: BusinessDetail,
    },
    ProjectReport:{
      screen:ProjectReportContainer,
    },
    ProductDetialContainer:{
      screen:ProductDetialContainer,
    },
    TransferOfRights:{
      screen:TransferOfRights
    },
    FilterdashboardProject: {
      screen: fillterDashboardProjectContainer,
    },
    FillterProjectReport:{
      screen:fillterProjectReportContainer,
    },
    BusinessReport: {
      screen: businessReportContainer,
    },
   
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions:
      Platform.OS === 'android'
        ? {
          ...TransitionPresets.SlideFromRightIOS,
        }
        : {},
  },
);

export default createAppContainer(RootStack);
