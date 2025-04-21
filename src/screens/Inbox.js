import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";

import { styles } from "../constants/Styles";
import { IconLogo } from "../constants/IconLogo";
import { Colors } from "../constants/Colors";

const InboxScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inboxheader}>
                <Text style={styles.inboxheadtxt}>Inbox</Text>
                <Image source={IconLogo.logo} style={styles.logo} />
            </View>
            <ScrollView>
                <View style={styles.inbox}>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Welcome to{" "}
                            <Text
                                style={[styles.btntxt, { color: Colors.brand }]}
                            >
                                BonoPay
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Account created sussecfully
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Received money
                            <Text style={styles.btntxt}> 5000</Text>{" "}
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Cash Out</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> QRCode</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Send Money</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Add Money</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Mobile Recharge</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Payment</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Pay Bill</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Savings</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Loan</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Request Money</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Let's explore{" "}
                            <Text style={styles.btntxt}> Money Map</Text>
                        </Text>
                    </View>
                    <View style={styles.inboxmsgbox}>
                        <Image
                            source={IconLogo.inboxi}
                            style={styles.lefticon}
                        />
                        <Text style={styles.inboxtxt}>
                            Give us usage
                            <Text style={styles.btntxt}> Feedback</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InboxScreen;
