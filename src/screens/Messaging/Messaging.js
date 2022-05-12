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

//const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidHdpbGlnaHQtdG9vdGgtNiJ9.te1QiHdRu0hSeblxER4qsz7TeYgSuJ5bQRG5jmt8vzU';

const user = {
  id: 'Tkay',
  name: ' Tkay Delvin',
  image:
    'https://firebasestorage.googleapis.com/v0/b/donewithit-db.appspot.com/o/profile%2FpGtmAg0hYVeIEvVeqYhcaNcIXVd2%2F0.9o2dszeq9t?alt=media&token=076f603e-87c8-4427-b968-834f09c40924',
};

const chatClient = StreamChat.getInstance('dpp7uvz8ubya');
const userToken = chatClient.devToken('Tkay');
const connectUserPromise = chatClient.connectUser(user, userToken); //connects to the server socket, to get real time updates

const channel = chatClient.channel('messaging', 'channel_id');

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

export default function Messaging() {
  const [ready, setReady] = useState();

  useEffect(() => {
    const initChat = async () => {
      await connectUserPromise;
      console.log('Connected');
      await channel.watch();
      setReady(true);
    };

    initChat();

    //whenever component un-mounts, close connection to prevent memory leaks
    return () => chatClient.disconnectUser();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ChannelScreen channel={channel} />
    </SafeAreaProvider>
  );
}
