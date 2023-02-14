import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';


export default function App() {
  const [grocery, setGrocery] = useState('');
  const [quantity, setQuantity] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const handleAddGrocery = () => {
    if (grocery !== '' && quantity !== '') {
      setGroceryList([...groceryList, { key: Math.random().toString(), grocery: grocery, quantity: quantity }]);
      setGrocery('');
      setQuantity('');
    }
  };

  const handleRemoveGrocery = key => {
    setGroceryList(groceryList.filter(item => item.key !== key));
  };

  const renderGroceryItem = ({ item }) => (
    <View style={styles.groceryItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.groceryText}>{item.grocery}</Text>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
      <Button title="Remove" onPress={() => handleRemoveGrocery(item.key)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Carmelo's Shopping List!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Grocery"
          value={grocery}
          onChangeText={text => setGrocery(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={text => setQuantity(text)}
        />
        <Button title="Add" onPress={handleAddGrocery} />
      </View>
      <FlatList
        data={groceryList}
        renderItem={renderGroceryItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  list: {
    flex: 1,
  },
  groceryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  groceryText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 10,
  },
});