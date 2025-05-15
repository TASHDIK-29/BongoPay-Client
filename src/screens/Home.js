import React, { useContext, useState } from "react";
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
import { AuthContext } from "../../provider/UserProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useMoneyMap from "../hooks/useMoneyMap";

const HomeScreen = ({ navigation }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [Balance, setBalance] = useState("");

    const { user } = useContext(AuthContext);
    // console.log("User details from home ->", user);

    const handleBalance = async () => {

        const axiosPublic = useAxiosPublic();
        const res = await axiosPublic.get(`/checkBalance?userEmail=${user.email}`);
        console.log(res.data);
        setBalance(res.data.balance);

        setIsClicked(!isClicked);
    }


    



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.homecontainer}>
                <View style={styles.homeheader}>
                    <TouchableOpacity
                        style={styles.balancebtn}
                        onPress={() => handleBalance()}
                    >
                        {
                            isClicked ?
                                <Text style={styles.btntxt}>{Balance}</Text>
                                :
                                <Text style={styles.btntxt}>Balance</Text>
                        }
                    </TouchableOpacity>
                    <Image
                        style={styles.bodycomponent}
                        source={IconLogo.logo}
                    />
                </View>
                <View style={styles.homebody}>
                    <View></View>
                    <View style={styles.componentpair}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CashOut")}
                        >
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

                        {/* Send Money */}
                        <TouchableOpacity
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
                        <TouchableOpacity
                        onPress={() => navigation.navigate("Save")}
                        >
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Request")}
                        >
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.requestmoney}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Map")}
                        >
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.moneymap}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => navigation.navigate("Mapping",
                                { obj }
                            )}
                        >
                            <Image
                                style={styles.bodycomponent}
                                source={IconLogo.moneymap}
                            />
                        </TouchableOpacity> */}
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
