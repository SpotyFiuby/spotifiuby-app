import {View, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import styles from './styles';

const EditProfileScreen = () => {
  return (
    <View style = {styles.container}>
      <View style= {{margin:20}}>
        <View style= {{alignItems: 'center'}}>
          <TouchableOpacity onPress= {() => {}}>
            <View style = {{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
              <ImageBackground
                source= {{ uri: 'https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png'}}
                style= {{height: 100, width: 100}}
                imageStyle= {{borderRadius: 15}}
              >
                <View>
                  <Icon name='camera' size={35} color='#fff' style={{
                    opacity: 0.5,
                  }}/>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
};

export default EditProfileScreen;