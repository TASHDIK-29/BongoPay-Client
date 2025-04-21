import { Colors } from "./Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
        alignItems: "center",
        justifyContent: "center",
    },

    form: {
        width: "90%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.formbg,
        borderRadius: 10,
        padding: 20,
        gap: 20,
        padding: 50,
    },

    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: Colors.brand_1,
        fontSize: 30,
        fontWeight: "500",
    },
    logo: {
        width: 60,
        height: 60,
    },
    loginbtn: {
        backgroundColor: Colors.brand,
        height: 50,
        width: 256,
        justifyContent: "center",
        borderRadius: 32,
    },
    createbtn: {
        backgroundColor: Colors.brand_1,
        height: 50,
        width: 256,
        justifyContent: "center",

        borderRadius: 32,
    },
    btntxt: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },

    submitformwithlabel: {
        alignItems: "flex-start",
    },
    submitforminput: {
        width: 300,
        alignItems: "center",
        backgroundColor: Colors.inputbg,
        flexDirection: "row",
        borderRadius: 32,
        alignItems: "center",
    },
    inputlabel: {
        fontSize: 16,
        color: Colors.label,
        textAlign: "center",
        marginLeft: 16,
        marginBottom: 5,
    },
    input: {
        width: 230,
        color: Colors.inputtxt,
        height: 50,
        borderRadius: 32,
    },
    lefticon: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 5,
    },
    righticon: {
        height: 15,
        width: 20,
        marginRight: 10,
        marginLeft: 5,
    },

    donttxt: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "200",
    },
    dontbtn: {
        color: Colors.brand_1,
        fontSize: 16,
        fontWeight: "500",
    },
    homecontainer: {
        width: 300,
        height: 600,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    homeheader: {
        width: "100%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    homebody: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: 10,
    },
    bodycomponent: {
        width: 90,
        height: 90,
    },
    componentpair: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    balancebtn: {
        width: 150,
        height: 50,
        borderColor: Colors.brand,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inboxheader: {
        flexDirection: "row",
        height: 70,
        width: "90%",
        alignItems: "center",
        marginTop: 42,
        justifyContent: "space-between",
    },
    inbox: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    },

    inboxmsgbox: {
        width: 350,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.formbg,
        padding: 20,
    },

    inboxheadtxt: {
        fontSize: 30,
        fontWeight: "600",
        color: Colors.white,
        textAlign: "center",
    },
    inboxtxt: {
        fontSize: 18,
        color: Colors.gray,
        fontWeight: "300",
    },
});
