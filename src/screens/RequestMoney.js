import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput,
} from "react-native";

import { styles } from "../constants/Styles";
import { IconLogo } from "../constants/IconLogo";
import { Colors } from "../constants/Colors";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/UserProvider";

const RequestMoney = ({ navigation }) => {
    const [requestEmail, setRequestEmail] = useState(""); // Agent's email
    const [amount, setAmount] = useState(""); // Amount to send

    const { user } = useContext(AuthContext);
    const userEmail = user.email;
    // console.log(userEmail);

    const handleRequest = async () => {

        if (userEmail == requestEmail) {
            return alert("Restricted Transition.");
        }

        const axiosPublic = useAxiosPublic();
        const res = await axiosPublic.post('/MoneyRequest', { userEmail, requestEmail, amount });
        console.log(res.data);

        if (res.data.message) {
            alert(res.data.message);
        }
        else if (res.data.request) {
            alert("Money Request Successful.");
            navigation.navigate("HomeTabs");
        }
        else if (!res.data.request) {
            alert("User not found.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Request Money</Text>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>
                                    Friend's Email
                                </Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.person}
                                    />
                                    <TextInput
                                        placeholder="Enter friend's email"
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        value={requestEmail}
                                        onChangeText={(text) => setRequestEmail(text)}
                                    />
                                </View>
                            </View>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>Amount</Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.person}
                                    />
                                    <TextInput
                                        placeholder="Enter amount"
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        value={amount}
                                        keyboardType="numeric"
                                        onChangeText={(text) => setAmount(text)}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.loginbtn}
                                // handle onPress with backend logic
                                onPress={() => handleRequest()}
                            >
                                <Text style={styles.btntxt}>Request</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RequestMoney;
