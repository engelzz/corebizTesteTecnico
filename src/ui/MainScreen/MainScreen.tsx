import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthorName, Container, Title } from "./styles";
import { useMainScreenController } from "./useMainScreenController";

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../app/entities/ScreenTypes";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImageDetailScreen'>;
type MainScreenRouteProp = RouteProp<RootStackParamList, 'ImageDetailScreen'>;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export function MainScreen({ navigation }: Props) {
  const {query, setQuery, photos, fetchNextPage, refetch, resetPhotos } = useMainScreenController();
  return (
      <Container>
        <Text>Welcome!</Text>
  
        <TextInput
          style={{ width: 300 , margin: 10, marginTop: 20 ,padding: 8 , height: 40, backgroundColor: '#CED4DA', borderColor: 'gray', borderWidth: 1, borderRadius: 36, color: '#111'}}
          placeholder="Enter your name"
          placeholderTextColor={'#fff'}
					value={query}
					onChangeText={(text) => {
						setQuery(text)
					}}
          onSubmitEditing={() => {
						resetPhotos()
						refetch()
					}}
        />
  
        <FlatList 
          data={photos}
          keyExtractor={(image) => image.id}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.7}
	          renderItem={({ item }) => (
            <View style={{ padding: 20 }}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('ImageDetailScreen', {
                  image: item,
                })}
                >
                <Image 
                  source={{ uri: item.urls.small }} 
									style={{width: '100%', minWidth: 300, height: 200, borderRadius: 8, marginTop: 10}}
                />
              </TouchableOpacity>
               
               <Title 
							 	numberOfLines={1}
							 >
								{(item.description ?? item.alt_description ?? '').toUpperCase()} </Title>

               <AuthorName>{item.likes} Likes</AuthorName>
            </View>
           )}
        />
  
      </Container>
    );
  }