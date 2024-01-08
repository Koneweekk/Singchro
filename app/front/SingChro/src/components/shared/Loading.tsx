import {StyleSheet, View, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Loading = ():JSX.Element => {
  return(
    <View style={[styles.container, {transform: [{scale: 1.5}]}]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default Loading

