import { useDispatch } from 'react-redux'
import { deleteEntry } from '../features/entries/entrySlice'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native' 

const EntryItem = ({entry}) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteEntry(entry.id))
    }
    return(
        <View style={styles.container}>
            <Text>{entry.title}</Text>
            <Text>{entry.content}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
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
})

export default EntryItem