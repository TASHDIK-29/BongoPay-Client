import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";

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

const LoginScreen = ({ navigation }) => {
    const [eye, setEye] = useState(IconLogo.eye);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { setUser } = useContext(AuthContext);


    const handleLogin = async () => {

        const loginInfo = {
            email, password
        }

        console.log(loginInfo);

        try {
            const axiosPublic = useAxiosPublic();
            const res = await axiosPublic.post('/login', loginInfo);
            // console.log("Response from server:", res.data);

            if (res.data.password && res.data.isUser) {
                // ToDo : Token save here
                setEmail("");
                setPassword("");

                setUser(res.data.user)
                navigation.navigate("HomeTabs");
            }
            else if (!res.data.isUser)
                alert("Please Sign Up first.")
            else if (!res.data.password)
                alert("Please provide valid password")


        } catch (error) {
            console.log("Login error:", error.message);

            if (error.response) {
                console.log("Server responded with:", error.response.data);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Account Login</Text>

                            <View style={styles.submitformwithlabel}>
                                <Text style={styles.inputlabel}>
                                    Email or Username
                                </Text>
                                <View style={styles.submitforminput}>
                                    <Image
                                        style={styles.lefticon}
                                        source={IconLogo.person}
                                    />
                                    <TextInput
                                        placeholder="Enter your email or username"
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
                                        placeholder="Enter your password"
                                        placeholderTextColor={
                                            Colors.inputplaceholder
                                        }
                                        secureTextEntry={!show}
                                        style={styles.input}
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

                            <TouchableOpacity
                                style={styles.loginbtn}
                                // handle this onPress using backend logic
                                onPress={() => handleLogin()}
                            >
                                <Text style={styles.btntxt}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.dontbtn}
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text style={styles.donttxt}>
                                    Don't have an account?
                                    <Text style={styles.dontbtn}>SignUp</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
