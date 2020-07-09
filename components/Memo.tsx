import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Memo = () => {
    const [memo, setMemo] = useState('');
    const [memoList, setMemoList] = useState<string[]>([]);
    const countRef = useRef(false);

    const changeMemo = useCallback(text => {
        setMemo(text);
    }, []);

    const submitInput = useCallback(() => {
        if (!memo || !memo.trim()) {
            alert('빈 메모는 입력하실 수 없습니다.');
            setMemo('');
        }
        else if (memoList.includes(memo)) {
            alert('이미 입력된 메모입니다.');
            setMemo('');
        }
        else {
            setMemoList((prevMemoList) => {
                return [...prevMemoList, memo];
            });
            setMemo('');
        }
    }, [memo]);

    const deleteMemo = useCallback(m => () => {
        Alert.alert(
            '경고',
            '정말 삭제하시겠습니까?',
            [{
                text: '취소',
                style: 'cancel',
            }, {
                text: '삭제',
                onPress: () => { setMemoList(memoList.filter(memo => memo !== m)) }
            }]
        );
    }, [memoList]);

    const clearMemo = useCallback(() => {
        Alert.alert(
            '경고',
            '정말 초기화하시겠습니까?',
            [{
                text: '취소',
                style: 'cancel',
            }, {
                text: '초기화',
                onPress: () => { setMemoList([]) },
            }],
        );
    }, []);

    useEffect(() => {
        async function dataFetch () {
            const data = await AsyncStorage.getItem('todos');
            const parsedData = JSON.parse(data || '[]');
            setMemoList(parsedData);
        }
        dataFetch();
    }, []);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            AsyncStorage.setItem('todos', JSON.stringify(memoList));
        }
    }, [memoList]);

    return (
        <SafeAreaView style={styles.containers}>
            <ScrollView>
                <View style={styles.inlineWrapper}>
                    <TextInput defaultValue={memo} onChangeText={changeMemo} style={styles.input}/>
                    <Button onPress={submitInput} title="입력"/>
                </View>
                {memoList.map(m => {
                    return (
                        <View key={m} style={styles.listView}>
                            <Text style={styles.list}>{m}</Text>
                            <Button onPress={deleteMemo(m)} title="삭제"/>
                        </View>
                    )
                })}
                <View style={styles.margin}>
                    <Button onPress={clearMemo} title="초기화" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'skyblue',
    },
    inlineWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 370,
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        padding: 10,
    },
    listView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 5,
    },
    list: {
        width: 350,
        backgroundColor: '#f9ffdd',
        textAlignVertical: 'center',
        padding: 5,
    },
    margin: {
        marginBottom: 10,
    },
});

export default Memo;