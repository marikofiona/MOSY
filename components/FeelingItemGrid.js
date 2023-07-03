// import React from 'react';
// import { StyleSheet, Image, TouchableOpacity, FlatList, Text, View } from 'react-native';

// const FeelingItemGrid = ({ feelingItems, onFeelingSelection }) => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={feelingItems}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={4}
//         contentContainerStyle={styles.gridContainer}
//         showsVerticalScrollIndicator={true}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.itemContainer} onPress={() => onFeelingSelection(item.id)}>
//             <Image source={item.image} style={styles.feelingImage} />
//             <Text style={styles.feelingText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
   
//     flex:1,
//   },
//   gridContainer: {
//     alignItems: 'flex-start',
//     justifyContent: 'space-evenly',
//     paddingHorizontal: 16,
//   },
//   itemContainer: {
//     alignItems: 'center',
    
//   },
//   feelingImage: {
    
//     width: 40,
//     height: 40,
//     marginHorizontal: 20,
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   feelingText: {
//     fontSize: 11,
//     textAlign: 'center',
//     marginHorizontal: 5,
//   },
// });

// export default FeelingItemGrid;
