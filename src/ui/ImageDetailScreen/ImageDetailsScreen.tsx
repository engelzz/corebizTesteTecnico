import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { GoBackIcon } from "../../assets/icons/goBackIcon";

import { ImageObject } from "../../app/entities/ImageResponse";
import { ProfileIcon } from "../../assets/icons/profileIcon";
import { Container, PhotoTitle } from "./styles";

interface ImageDetailsScreenProps {
  route: { params: {
    image: ImageObject
  } }; 
}

export function ImageDetailsScreen({route}: ImageDetailsScreenProps) {
  const navigation = useNavigation();
	const image = route.params.image;
	const isPortfolioNotAvailable = image.user.social.portfolio_url === null || undefined;

	console.log(image);
  return (
    <Container 
      contentContainerStyle={{alignItems: 'center'}}
    >
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '80%'}}>
          <GoBackIcon />
        </TouchableOpacity>

        <TouchableOpacity 
					disabled={isPortfolioNotAvailable}
					onPress={() => Linking.openURL(`${image.user.social.portfolio_url}`)}
					style={isPortfolioNotAvailable && ({ opacity: 0.1})}
				>
         <ProfileIcon/>
        </TouchableOpacity>
      </View>

      <Image  
        source={{ uri: image.urls.small }}  
        style={{ width: '100%', minWidth: 300, height: 400, borderRadius: 8, marginTop: 10, padding: 20}} 
      />

      <View style={{paddingHorizontal: 20, width: '100%'}}>
        <PhotoTitle>{image.description ?? image.alt_description ?? ''}</PhotoTitle>

        <Text style={{color: '#111', fontWeight: '800', marginTop: 4}}>{image.user.name}</Text>
        
        <View style={{ marginTop: 20, gap: 8 }}>
          <Text>{image.user.bio ?? 'Esse perfil não possui biografia'}</Text>

          <Text>Categoria da foto - {image.asset_type.toUpperCase()?? 'Não possui localização'}</Text>    

          <Text>Localização - {image?.location?.name || 'Localização desconhecida'}</Text>

          <Text style={{color: '#111', fontWeight: '800'}}>Likes - {image.likes || '0'}</Text>
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
    </Container>
  )
}
