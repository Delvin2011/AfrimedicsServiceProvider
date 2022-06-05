import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StreamChat} from 'stream-chat';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
} from 'stream-chat-react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {withNavigation} from '@react-navigation/compat';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectConnectionDetails} from '../../redux/user/user-selectors';
import {selectCurrentUser} from '../../redux/user/user-selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
//const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidHdpbGlnaHQtdG9vdGgtNiJ9.te1QiHdRu0hSeblxER4qsz7TeYgSuJ5bQRG5jmt8vzU';
const chatClient = StreamChat.getInstance('dpp7uvz8ubya');
var channel = '';
const ChannelScreen = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <ChatOverlayProvider bottomInset={bottom} topInset={0}>
      <SafeAreaView>
        <Chat client={chatClient}>
          {/* Setting keyboardVerticalOffset as 0, since we don't have any header yet */}
          <Channel channel={channel} keyboardVerticalOffset={0}>
            <View style={StyleSheet.absoluteFill}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    </ChatOverlayProvider>
  );
};

function Messaging({connectionDetails, currentUser}) {
  const {patientDetails} = connectionDetails;
  const {userID, Name, channelConn} = patientDetails;
  const {id, displayName, profileURL} = currentUser;

  const user = {
    id: id,
    name: displayName,
    image: profileURL,
  };

  const userToken = chatClient.devToken(id);
  const chatUser = (async () => {
    await AsyncStorage.getItem('chatUser');
  })();

  //  console.log(connectUserPromise);
  const [ready, setReady] = useState();
  useEffect(() => {
    const connectUserPromise = chatClient.connectUser(user, userToken); //connects to the server socket, to get real time updates
    channel = chatClient.channel('messaging', channelConn);
    const initChat = async () => {
      await connectUserPromise;
      console.log('Connected');
      await channel.watch();
      setReady(true);
      //await AsyncStorage.setItem('chatUser', connectUserPromise.ToS);
    };
    if (!connectUserPromise._j) initChat();

    //whenever component un-mounts, close connection to prevent memory leaks
    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ChannelScreen channel={channel} chatClient={chatClient} />
    </SafeAreaProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  connectionDetails: selectConnectionDetails, //to show or hide the cart.
  currentUser: selectCurrentUser,
});

export default withNavigation(connect(mapStateToProps, null)(Messaging));
