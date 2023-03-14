import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
const image = {
  uri: "https://cdn.pixabay.com/photo/2017/11/04/21/09/textile-2918844__340.jpg",
};

export default function App() {
  const [grocery, setGrocery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [groceryList, setGroceryList] = useState([]);

  const handleAddGrocery = () => {
    if (grocery !== "" && quantity !== "") {
      setGroceryList([
        ...groceryList,
        { key: Math.random().toString(), grocery: grocery, quantity: quantity },
      ]);
      setGrocery("");
      setQuantity("");
    }
  };

  const handleRemoveGrocery = (key) => {
    Alert.alert(
      "Delete Item",
      "Do you wish to delete this from the shopping list?",
      [
        {
          text: "Delete",
          onPress: () =>
            setGroceryList(groceryList.filter((item) => item.key !== key)),
        },
        {
          text: "Cancel",
          onPress: () => Alert.alert("Canceled!"),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => Alert.alert("Dismissed"),
      }
    );
  };

  const renderGroceryItem = ({ item }) => (
    <View style={styles.groceryItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.groceryText}>{item.grocery}</Text>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
      <Button
        title=" X "
        onPress={() => handleRemoveGrocery(item.key)}
        color="#f5605d"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={image}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Carmelo's Shopping List!</Text>
        </View>
      </ImageBackground>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Grocery"
          value={grocery}
          onChangeText={(text) => setGrocery(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
        <Button title="   +   " onPress={handleAddGrocery} color="lightgreen" />
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
    backgroundColor: '#faf6e3',
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  list: {
    flex: 1,
  },
  groceryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: "#ebe5cc",
  },
  itemInfo: {
    flex: 1,
    flexDirection: "row",
  },
  groceryText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    color: "gray",
    marginLeft: 10,
  },
});
