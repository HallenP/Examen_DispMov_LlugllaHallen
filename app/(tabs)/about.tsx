import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Tab() {
  return (
    <View className='flex-1'>
      <View className='flex flex-col items-center justify-center mt-8'>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/26481508?v=4' }}
          className='w-24 h-24'
        />
        
        
        <Text className='text-2xl font-bold mt-4'>@HallenP</Text>
      </View>

      <View className='flex flex-col items-center mt-8'>
        <Text className='text-xl font-bold'>Sobre mí</Text>
        <Text className='text-justify mt-4'>
          Soy un estudiante de Ingeniería en Sistemas de Información con experiencia en ciberseguridad y desarrollo de software.
        </Text>
      </View>

      <View className='p-4'>
        <Text className='text-xl font-bold mt-8'>Habilidades</Text>
        <View className='flex flex-row flex-wrap mt-4 gap-4'>
          <Text className='bg-blue-500 text-white px-4 py-2 rounded-full mr-2'>React</Text>
          <Text className='bg-blue-500 text-white px-4 py-2 rounded-full mr-2'>React Native</Text>
          <Text className='bg-blue-500 text-white px-4 py-2 rounded-full mr-2'>Node.js</Text>
          <Text className='bg-blue-500 text-white px-4 py-2 rounded-full mr-2'>Ciberseguridad</Text>
        </View>
      </View>

      <View className='p-4 flex flex-col items-start'>
        <Text className='text-xl font-bold mt-2'>Contacto</Text>
        <View className='flex flex-row items-center gap-4 mt-8'>
          <Ionicons name='logo-github' size={24} color='black' />
          <Text className='text-xl font-bold text-blue-500 underline' onPress={() => Linking.openURL('https://github.com/HallenP')}>GitHub</Text>
        </View>

        <View className='flex flex-row items-center gap-4 mt-8'>
          <Ionicons name='logo-linkedin' size={24} color='blue' />
          <Text className='text-xl font-bold text-blue-500 underline' onPress={() => Linking.openURL('https://www.linkedin.com/in/hallen-lluglla-delgado-887814243/')}>LinkedIn</Text>
        </View>
      </View>
    </View>
  );
}


//source={require('../assets/images/icon.png')}