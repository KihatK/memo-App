import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Info = () => {
    return (
        <View style={styles.containers}>
            <Text>
                이 앱은 해야할 일은 저장하거나 지울 때 사용하는 앱입니다.
            </Text>
            <Text>
                Made by Kihat
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
});

export default Info;