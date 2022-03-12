import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './Menu';
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import AppointmentsRecords from '../screens/AppointmentsRecords';
import Account from '../screens/Authentication/Account';
import Register from '../screens/Authentication/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import CallScreen from '../screens/CallScreen';
//Dependants
import Dependants from '../screens/Dependants/Dependants';
import DependantsAdding from '../screens/Dependants/DependantsAdding';
//import SelectDependant from '../screens/SelectDependant';
//Pharmacy
import PharmacyOrders from '../screens/Pharmarcy/PharmacyOrders';
import Pharmacy from '../screens/Pharmarcy/Landing';
import Category from '../screens/Pharmarcy/CategoryLanding';
import PharmacyCart from '../screens/Pharmarcy/PharmacyCart';

//Medical Records
import MedicalRecords from '../screens/MedicalRecords';

//import Camera from '../screens/Camera';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import {nowTheme} from '../constants';
import {tabs} from '../constants';

import Header from '../components/Header';

//Consultations
import FindDoctor from '../screens/Consultations/FindDoctor';
import BookDoctor from '../screens/Consultations/BookDoctor';
import SelectLocation from '../screens/Consultations/SelectLocation';
import Profile from '../screens/Consultations/Profile';
//import SelectDependant from '../screens/Consultations/SelectDependant';

const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppointmentRecordsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Appointments"
        component={AppointmentsRecords}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Appointments"
              tabs={tabs.appointments}
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function PharmacyStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Pharmacy"
        component={Pharmacy}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Pharmacy"
              navigation={navigation}
              search
              scene={scene}
              back={true}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
    </Stack.Navigator>
  );
}

function PharmacyOrdersStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="PharmacyOrders"
        component={PharmacyOrders}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Pharmacy Orders"
              tabs={tabs.pharmacyOrders}
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function PhamarcyCategoryStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Pharmacy"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Category"
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              title="Category"
              navigation={navigation}
              scene={scene}
              back={true}
              search
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
        children={() => (
          <Category
            category={props.route.params.category}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}

function PharmacyCartStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Your Cart"
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Your Cart Details"
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
        children={() => <PharmacyCart navigation={props.navigation} />}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Home"
              tabs={tabs.medical}
              navigation={navigation}
              scene={scene}
              navigateTo={true}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
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

function DependantsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Dependants"
        component={Dependants}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Dependants" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AddDependantsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Add Dependant"
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Add Dependant Details"
              navigation={navigation}
              scene={scene}
              back={true}
              //tabs={tabs.dependantsRecords}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
        children={() => (
          <DependantsAdding
            dependantProfileImage={props.route}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
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
      headerMode="screen">
      <Stack.Screen
        name="MedicalRecords"
        component={MedicalRecords}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Medical Records"
              navigation={navigation}
              scene={scene}
              tabs={tabs.medicalRecords}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

//Consultations

function FindDoctorStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Find a Doctor"
        component={FindDoctor}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Find a Doctor"
              search
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function BookDoctorStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Book a Doctor"
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Book a Doctor"
              navigation={navigation}
              search
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
        children={() => (
          <BookDoctor
            selectedSpecialist={props.route.params.selectedSpecialist}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}

function SelectLocationStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Select Dr's Location"
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Select Dr's Location"
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
        children={() => (
          <SelectLocation
            specialist={props.route.params.routeName}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}

/*function LoginStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Login"
        children={() => (
          <LoginScreen
            username={props.route.params.username}
            password={props.route.params.password}
            specialistName={props.route.params.specialistName}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}*/

/*function SelectDependantStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Select Dependant"
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Select Dependant"
              navigation={navigation}
              scene={scene}
              back={true}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
        children={() => (
          <SelectDependant
            bookingDetails={props.route.params.bookingDetails}
            navigation={props.navigation}
          />
        )}
      />
    </Stack.Navigator>
  );
}*/

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen
        name="AppointmentRecords"
        component={AppointmentRecordsStack}
      />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="PharmacyOrders" component={PharmacyOrdersStack} />
      <Drawer.Screen name="Pharmacy" component={PharmacyStack} />
      <Drawer.Screen
        name="PharmacyCategory"
        component={PhamarcyCategoryStack}
      />
      <Drawer.Screen name="PharmacyCart" component={PharmacyCartStack} />

      <Drawer.Screen name="Dependants" component={DependantsStack} />
      <Drawer.Screen name="AddDependants" component={AddDependantsStack} />
      <Drawer.Screen name="MedicalRecords" component={MedicalRecordsStack} />

      <Drawer.Screen name="FindDoctor" component={FindDoctorStack} />
      <Drawer.Screen name="BookDoctor" component={BookDoctorStack} />
      <Drawer.Screen name="SelectLocation" component={SelectLocationStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
}
//  <Drawer.Screen name="Login" component={LoginStack} />
//  <Drawer.Screen name="SelectDependant" component={SelectDependantStack} />
//<Drawer.Screen name="PhamarcyOrderRecipient" component={PhamarcyOrderRecipientStack} />
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

      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{headerLeft: null}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Call"
        component={CallScreen}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="IncomingCall"
        component={IncomingCallScreen}
        options={{headerLeft: null}}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Register" component={RegisterStack} />
    </Stack.Navigator>
  );
}

/*<Stack.Screen name="Camera" component={CameraStack} />*/
// <Stack.Screen name="Login" component={LoginScreen} />
