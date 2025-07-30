import { useDispatch, useSelector } from 'react-redux'
import { deleteEntry } from '../features/entries/entrySlice'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native' 

const EntryItem = ({entry}) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.entries)

    const handleDelete = () => {
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => dispatch(deleteEntry(entry.id)),
                },
            ]
        )
    }
    return(
        <View style={styles.container}>
            <Text>{entry.title}</Text>
            <Text>{entry.content}</Text>
            <TouchableOpacity 
                style={[styles.deleteButton, isLoading && styles.deleteButtonDisabled]} 
                onPress={handleDelete}
                disabled={isLoading}
            >
                <Text style={styles.deleteButtonText}>
                    {isLoading ? 'Deleting...' : 'Delete'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        marginBottom: 8,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButtonDisabled: {
        backgroundColor: '#ccc',
    },
})

export default EntryItem