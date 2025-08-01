import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Header = ({ user, navigation }) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigation.navigate('Login')
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userName}>{user && user.firstName}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        paddingTop: 10,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 2,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212529',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    logoutText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
})

export default Header 