import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./Menu";
import Analytics from "../screens/Home/Analytics";
import Onboarding from "../screens/Onboarding";
import AppointmentsRecords from "../screens/AppointmentsRecords";
import Account from "../screens/Authentication/Account";

import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import CallScreen from "../screens/CallScreen";

//Ambulance
import RequestAmbulance from "../screens/Ambulance/RequestAmbulance";

//Medical Records
import MedicalRecords from "../screens/MedicalRecords";

//Messaging
import Messaging from "../screens/Messaging/Messaging";

//import Camera from '../screens/Camera';
import IncomingCallScreen from "../screens/IncomingCallScreen";
import { nowTheme } from "../constants";
import { tabs } from "../constants";

import Header from "../components/Header";

//Consultations
import Profile from "../screens/Consultations/Profile";
//import SelectDependant from '../screens/Consultations/SelectDependant';

//Authentication
import Register from "../screens/Authentication/RegisterScreen";
import Login from "../screens/Authentication/LoginScreen";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={AppointmentsRecords}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              navigation={navigation}
              scene={scene}
              tabs={tabs.appointments}
            /> //navigateTo={true}
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

function AnalyticsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Analytics"
              tabs={tabs.medical}
              navigation={navigation}
              scene={scene}
            /> //navigateTo={true}
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
        children={() => (
          <Profile
            details={props.route.params.details}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}

/*function CameraStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
}*/

function MedicalRecordsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="MedicalRecords"
        //component={MedicalRecords}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Medical Records"
              navigation={navigation}
              scene={scene}
              tabs={tabs.medicalRecords}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
        children={() =>
          typeof props.route.params !== "undefined"
            ? (
              <MedicalRecords
                details={props.route.params.details}
                navigation={props.navigation}
              />
            )
            : (
              <MedicalRecords
                //details={}
                navigation={props.navigation}
              />
            )}
      />
    </Stack.Navigator>
  );
}

function RequestAmbulanceStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Request Ambulance"
        component={RequestAmbulance}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Request Ambulance"
              searchPickupLocation
              searchDestination
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

function MessagingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Messaging"
        component={Messaging}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Messaging"
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

//Authentication
function AccountStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Account"
              tabs={tabs.account}
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function RegisterStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function MainStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Main"
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="MedicalRecords" component={MedicalRecordsStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Messaging" component={MessagingStack} />
      <Drawer.Screen name="Main" component={MainStack} />
      <Drawer.Screen name="Analytics" component={AnalyticsStack} />

      <Drawer.Screen
        name="RequestAmbulance"
        component={RequestAmbulanceStack}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Call"
        component={CallScreen}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="IncomingCall"
        component={IncomingCallScreen}
        options={{ headerLeft: null }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Register" component={RegisterStack} />
      <Stack.Screen name="LoginAuth" component={LoginStack} />
    </Stack.Navigator>
  );
}

/*<Stack.Screen name="Camera" component={CameraStack} />*/
// <Stack.Screen name="Login" component={LoginScreen} />
