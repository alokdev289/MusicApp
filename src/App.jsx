// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, {useState, useEffect} from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   ActivityIndicator,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import { setupPlayer, addTrack } from '../musicPlayerServices';
// import MusicPlayer from './screens/MusicPlayer';




// function App(): JSX.Element {
// const [isPlaying, setIsPlaying]= useState(false)

// async function setup() {
//   let isSetup = await setupPlayer()

//   if (isSetup){
//     await addTrack()
//   }
//   setIsPlaying(isSetup)
// }
// useEffect(()=>{
//   setup()
// },[])

// if(!isPlaying){
//   return(
//     <SafeAreaView >
//       <ActivityIndicator/>
//   </SafeAreaView>
//   )
// }

//   return (
// <View style={styles.container}>
//   <StatusBar barStyle={'light-content'}/>
//   <MusicPlayer/>

// </View>
//   );
// }

// const styles = StyleSheet.create({
// container:{
//   flex:1
// }
// });

// export default App;


import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

async function onSignIn(user) {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
}

export default function App() {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <View>
      <Button
        title="Sign In"
        onPress={() =>
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          })
        }
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
    </View>
  );
}