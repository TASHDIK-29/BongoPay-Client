import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";

import { styles } from "../constants/Styles";
import { IconLogo } from "../constants/IconLogo";

const SettingsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.inboxheader}>
                <Text style={styles.inboxheadtxt}>Settings</Text>
                <Image source={IconLogo.logo} style={styles.logo} />
            </View>

            <ScrollView>
                <View style={styles.inbox}>
                    <View style={styles.inboxmsgbox}>
                        <Text style={styles.inboxtxt}>Full Name:</Text>
                        <Text style={styles.btntxt}>
                            {/* parse fullname from server */}
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Text style={styles.inboxtxt}>Mail:</Text>
                        <Text style={styles.btntxt}>
                            {/* parse mail from server */}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;
