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

const SignUpScreen = ({ navigation }) => {
    const [eye, setEye] = useState(IconLogo.eye);
    const [show, setShow] = useState(false);
    const [cshow, csetShow] = useState(false);
    const [ceye, csetEye] = useState(IconLogo.eye);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Create New Account</Text>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>Full Name</Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.person}
                                    />
                                    <TextInput
                                        placeholder="enter full name"
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                </View>
                            </View>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>
                                    Email Username
                                </Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.mail}
                                    />
                                    <TextInput
                                        placeholder="enter email or username"
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>Password</Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.lock}
                                    />
                                    <TextInput
                                        placeholder=" * * * * * * * * "
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        secureTextEntry={!show}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: "60%",
                                            transform: [{ translateY: -12 }],
                                            zIndex: 1,
                                        }}
                                        onPress={() => {
                                            setShow(!show);
                                            setEye(
                                                !show
                                                    ? IconLogo.eyeoff
                                                    : IconLogo.eye
                                            );
                                        }}
                                    >
                                        <Image
                                            style={styles.righticon}
                                            source={eye}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>
                                    Confirm Password
                                </Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.lock}
                                    />
                                    <TextInput
                                        placeholder=" * * * * * * * * "
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        style={styles.input}
                                        secureTextEntry={!cshow}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: "60%",
                                            transform: [{ translateY: -12 }],
                                            zIndex: 1,
                                        }}
                                        onPress={() => {
                                            csetShow(!cshow);
                                            csetEye(
                                                !cshow
                                                    ? IconLogo.eyeoff
                                                    : IconLogo.eye
                                            );
                                        }}
                                    >
                                        <Image
                                            style={styles.righticon}
                                            source={ceye}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.loginbtn}
                                
                                // handle this onPress using backend logic
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={styles.btntxt}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.dontbtn}
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={styles.donttxt}>
                                    Already have an account?
                                    <Text style={styles.dontbtn}>Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
