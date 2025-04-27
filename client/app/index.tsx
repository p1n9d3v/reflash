import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LoginScreen from './LoginScreen';
import '../firebase/firebase';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <LoginScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});