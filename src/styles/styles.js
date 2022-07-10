import { StyleSheet } from "react-native";

export default StyleSheet.create({
    viewContainer: {
        margin: 5,
        padding: 5
    },
    row: {
        flex: 1,
        padding: 6,
        flexDirection: 'row',
      },
      box: {
        backgroundColor: '#e26a00',
        flex: 1 / 2,
        margin: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1f1f1f',
        shadowOffset: {width: 3, height: 2},
      },
      text: {
        color: '#1f1f1f',
        fontSize: 18,
        fontWeight: 'bold',
      },
      textFocus: {
        color: 'white',
        marginTop: 10,
        fontSize: 24,
      },
      textSubHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
      },
      textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 10
      },
      textLeft: {
        textAlign: 'left'
      }
});