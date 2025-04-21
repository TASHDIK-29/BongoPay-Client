import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

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

const SendMoney = () => {
    const [email, setEmail] = useState(""); // Receiver's email
    const [amount, setAmount] = useState(""); // Amount to send

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Send Money</Text>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>
                                    Receiver's Email
                                </Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.person}
                                    />
                                    <TextInput
                                        placeholder="Enter receiver's email"
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
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
                            >
                                <Text style={styles.btntxt}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SendMoney;
