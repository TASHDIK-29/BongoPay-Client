import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { IconLogo } from "../constants/IconLogo";
import { AuthContext } from "../../provider/UserProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SettingsScreen = () => {

    const { user, setUser } = useContext(AuthContext);

    const handleSwitch = async () => {
        const axiosPublic = useAxiosPublic();
        const res = await axiosPublic.patch('/switchToAgent', {userEmail: user.email});
        // console.log(res.data);

        if(res.data.user)
        {
            alert("Congratulations , You have become an agent of BongoPay.")
            setUser(res.data.user);
        }
    }

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
                        <Text style={styles.inboxtxt}>Name : {user.fullName}</Text>
                        <Text style={styles.btntxt}>
                            {/* parse fullname from server */}
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Text style={styles.inboxtxt}>Mail : {user.email}</Text>
                        <Text style={styles.btntxt}>
                            {/* parse mail from server */}
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Text style={styles.inboxtxt}>Role : {user.type}</Text>
                        <Text style={styles.btntxt}>
                            {/* parse mail from server */}
                        </Text>
                    </View>

                    {
                        user.type == "User" &&
                        <TouchableOpacity
                            style={styles.loginbtn}
                            // handle onPress with backend logic
                            onPress={() => handleSwitch()}
                        >
                            <Text style={styles.btntxt}>Switch To Agent</Text>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;
