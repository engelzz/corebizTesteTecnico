import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GoBackIcon } from "../../assets/icons/goBackIcon";
import { ProfileIcon } from "../../assets/icons/profileIcon";
import { useImageDetailsController } from "./useImageDetailsController";

interface ImageDetailsScreenProps {
  route: { params: {
    photoUrl: string;
    photoTitle: string;
    photoAuthor: string;
    photoDescription: string;
    photoCategory: string;
    photoLikes: number;
    authorBio: string;
    authorPortifolio: string;
    location: string
  } }; 
}

export function ImageDetailsScreen({route}: ImageDetailsScreenProps) {
  const { navigation } = useImageDetailsController();
  console.log('route', route.params);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}
    >
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '80%'}}>
          <GoBackIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL(`${route.params.authorPortifolio}`)}>
         <ProfileIcon/>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: route.params.photoUrl }} style={styles.photo} />

      <View style={{paddingHorizontal: 20, width: '100%'}}>
        <Text style={styles.photoTitle}>{route.params.photoDescription.toUpperCase() || 'Essa foto não possui descrição'}</Text>

        <Text style={{color: '#111', fontWeight: '800', marginTop: 4}}>{route.params.photoAuthor}</Text>
        
        <View style={{ marginTop: 20, gap: 8 }}>
          <Text>{route.params.authorBio}</Text>

          <Text>Categoria da Foto - {route.params.photoCategory.toUpperCase()}</Text>    

          <Text>Localização - {route.params.location || 'Localização desconhecida'}</Text>

          <Text style={{color: '#111', fontWeight: '800'}}>Likes - {route.params.photoLikes || '0'}</Text>
        </View>
        
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginVertical: 10, padding: 10 }}>
        <Text style={{ color: '#111', fontWeight: '800'}}>R$ 100,00</Text>

        <TouchableOpacity 
          style={{ backgroundColor: '#087F5B', borderRadius: 8, height: 30, marginTop: 10, width: 100, alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style={{ color: '#222'}}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F3F5',
      paddingTop: 80, 
    },
    title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    photoContainer: { marginBottom: 15, padding: 20,},
    photo: { width: '100%', height: 400, borderRadius: 8, marginTop: 10, padding: 20 },
    photoTitle: { marginTop: 10, fontSize: 18, fontWeight: '600', color: '#111' },
});