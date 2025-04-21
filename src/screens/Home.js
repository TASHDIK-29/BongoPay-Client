import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

import { styles } from "../constants/Styles";
import { IconLogo } from "../constants/IconLogo";

const HomeScreen = ({ navigation }) => {
    const [balance, setBalance] = useState("Balance");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.homecontainer}>
                <View style={styles.homeheader}>
                    <TouchableOpacity
                        style={styles.balancebtn}
                        // handle this onPress using backend logic to fetch balance from server
                    >
                        <Text style={styles.btntxt}>{balance}</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.bodycomponent}
                        source={IconLogo.logo}
                    />
                </View>
                <View style={styles.homebody}>
                    <View></View>
                    <View style={styles.componentpair}>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.cashout}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.qrcode}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            // handle this onPress using backend logic
                            onPress={() => navigation.navigate("Send")}
                        >
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.sendmoney}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.componentpair}>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.addmoney}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.mobilerecharge}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.payment}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.componentpair}>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.paybill}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.savings}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.loan}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.componentpair}>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.requestmoney}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.moneymap}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.feedback}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
