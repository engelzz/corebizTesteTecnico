import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMainScreenController } from "./useMainScreenController";

export function MainScreen() {
  const {query, setQuery, handleSearch, isFetching, photos, navigation, handleRefecth} = useMainScreenController();

  return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
  
        <TextInput
          style={{ width: 300 , margin: 10, marginTop: 20 ,padding: 8 , height: 40, backgroundColor: '#CED4DA', borderColor: 'gray', borderWidth: 1, borderRadius: 36, color: '#111'}}
          placeholder="Enter your name"
          placeholderTextColor={'#fff'}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
  
        {isFetching ? (
          <ActivityIndicator size='small' color="#000" />
        ) : (
        <FlatList 
          data={photos}
          keyExtractor={(item) => item.id}
          onEndReached={handleRefecth}
          onEndReachedThreshold={0.7}
           renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('ImageDetailScreen', {
                  photoUrl: item.urls.small,
                  photoAuthor: item.user.name,
                  photoDescription: item.description || item.alt_description,
                  photoCategory: item.asset_type,
                  photoLikes: item.likes,
                  authorBio: item.user.bio,
                  authorPortifolio: item.user.portifolio_url,
                  location: item.user.location
                })}
                
                >
                <Image source={{ uri: item.urls.small }} style={styles.photo} />
              </TouchableOpacity>
               
               <Text numberOfLines={1} style={styles.photoTitle}>{(item.description || item.alt_description).toUpperCase()}</Text>
               <Text style={styles.photoAuthor}>{item.likes} Likes</Text>
            </View>
           )}
        />
      )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F3F5',
      alignItems: 'center',
      paddingTop: 80, 
    },
    title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
    },
    list: { paddingBottom: 20 },
    photoContainer: { padding: 20,},
    photo: { width: '100%', minWidth: 300, height: 200, borderRadius: 8, marginTop: 10 },
    photoTitle: { marginTop: 10, fontSize: 18, fontWeight: '600', color: '#111' },
    photoAuthor: { fontSize: 12, color: '#222', marginTop: 5, fontWeight: '800' },
  });
