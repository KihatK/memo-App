import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Home = () => {
    return (
        <View style={styles.containers}>
            <Text onPress={() => Actions.info()} style={styles.style}>
                정보
            </Text>
            <Text onPress={() => Actions.memo()}>
                메모
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    style: {
        marginBottom: 30,  
    },
})

export default Home;