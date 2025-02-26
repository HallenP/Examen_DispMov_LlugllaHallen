import { View, Text } from 'react-native';

interface BubbleMessageProps {
  message: string;
  type: string;
}

export default function BubbleMessage({ message, type }: BubbleMessageProps) {
  return (
    <View className={`flex ${type === 'user' ? 'flex-row-reverse' : 'flex-row'} justify-start items-center p-2 rounded-lg my-2`}>
      <Text className='text-2xl'>{type === 'user' ? '🙍‍♂️' : '🤖'}</Text>
      <Text className={`text-lg ${type === 'user' ? 'text-white bg-green-500' : 'text-black bg-gray-200'} p-2 rounded-lg`}>
        {message}
      </Text>
    </View>
  );
}


/*import { View, Text, Image } from 'react-native';

interface BubbleMessageProps {
  message: string;
  type: string;
}

export default function BubbleMessage({ message, type }: BubbleMessageProps) {
  return (
    <View className={`flex ${type === 'user' ? 'flex-row-reverse' : 'flex-row'} justify-start items-center p-2 rounded-lg my-2`}>
      <Image
        source={type === 'user' 
          ? require('./assets/user.png')  // img usuario
          : require('./assets/bot.png')}  // img bot
        style={{ width: 30, height: 30, borderRadius: 15, marginRight: type === 'user' ? 0 : 8, marginLeft: type === 'user' ? 8 : 0 }}
      />
      <Text className={`text-lg ${type === 'user' ? 'text-white bg-green-500' : 'text-black bg-gray-200'} p-2 rounded-lg`}>
        {message}
      </Text>
    </View>
  );
}
*/