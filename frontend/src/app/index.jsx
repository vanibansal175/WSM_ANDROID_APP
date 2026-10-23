import * as Device from 'expo-device';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function Homescreen() {
    return (
        <SafeAreaView>
            <Text style={css.title}>Washing Machine</Text>
        </SafeAreaView>
    );
}

const css = StyleSheet.create({
    title: {
        color: 'cyan',
    },
});

export default Homescreen;
