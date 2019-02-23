import React from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {Theme} from "../theme";
import {Text} from "native-base";
import {DrawerItems} from "react-navigation";

export const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={{height: StatusBar.currentHeight, backgroundColor: 'teal'}}/>
        <Text style={{
            textAlign: 'center',
            fontSize: 30,
            color: Theme.mainColor}
        }>Home Finance</Text>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
