import { useEffect } from 'react'
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import EntryForm from '../components/EntryForm'
import EntryItem from '../components/EntryItem'
import Spinner from '../components/Spinner'
import { getEntries, reset } from '../features/entries/entrySlice'
import { loadUser, logout } from '../features/auth/authSlice'

const DashboardScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const {entries, isError, isLoading, message} = useSelector((state) => state.entries)
    
    useEffect(() => {
        dispatch(loadUser())
    }, [])
    
    const {user} = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (!user) {
            navigation.navigate('Login')
            return
        }
        dispatch(getEntries())
        return () => {
            dispatch(reset())
        }
    }, [user, dispatch])

    useEffect(() => {
        if (isError) {
            console.log('Error:', message)
        }
    }, [isError, message])

    const handleLogout = () => {
        dispatch(logout())
        navigation.navigate('Login')
    }

    return(
        <SafeAreaView style={styles.container}>
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

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>

                    {/* Entry Form */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Create New Entry</Text>
                        <View style={styles.formContainer}>
                            <EntryForm />
                        </View> 
                    </View>
                    
                    {/* Entries List */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Entries</Text>
                            {entries?.length > 0 && (
                                <Text style={styles.entryCount}>{entries.length} entries</Text>
                            )}
                        </View>
                        
                       {entries?.length > 0 ? (
                            <View style={styles.entriesContainer}>
                                {entries.slice().reverse().map((entry, index) => (
                                    <EntryItem key={entry.id} entry={entry} />
                                ))}
                          </View>
                          
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No entries yet</Text>
                                <Text style={styles.emptySubtext}>Create your first entry to get started</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
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
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        flex: 1,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: '700',
        color: '#007bff',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 15,
    },
    entryCount: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    quickActionsContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    actionButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    entriesContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    loadingContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#6c757d',
        fontWeight: '500',
    },
    errorContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    errorText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#dc3545',
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
    },
    emptyContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
    },
})

export default DashboardScreen
