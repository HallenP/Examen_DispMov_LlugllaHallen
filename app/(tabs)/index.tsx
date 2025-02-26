 import { useState } from 'react';
import { View, TextInput, Text, Button, FlatList, Platform } from 'react-native';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/utils';
import BubbleMessage from '@/components/BubbleMessage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function TabChat() {
  const { messages, error, input, setInput, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: (error) => console.error(error, 'ERROR'),
  });

  // ✅ Función para subir un archivo TXT
  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
        copyToCacheDirectory: true,
      });

      if (file.canceled || !file.assets || file.assets.length === 0) {
        console.log('Selección de archivo cancelada o inválida.');
        return;
      }

      const fileUri = file.assets[0].uri;
      console.log('Archivo seleccionado:', fileUri);

      let fileContent = '';

      if (Platform.OS === 'web') {
        const response = await fetch(fileUri);
        fileContent = await response.text();
      } else {
        fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
      }

      console.log('Contenido del archivo:', fileContent);

      if (!fileContent.trim()) {
        alert('El archivo está vacío.');
        return;
      }

      // ✅ Agrega el contexto de "caso legal" antes de enviarlo
      const caseText = `analista, evalúe el siguiente caso:\n\n${fileContent}`;

      setInput(caseText);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeño delay para actualizar el estado
      handleSubmit();
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };

  if (error) return <Text>{error.message}</Text>;

  return (
    <View className="flex flex-col h-full p-4">
      
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <BubbleMessage message={item.content} type={item.role} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      
      <View className="flex flex-row w-full items-center space-x-2">
        <Button title="📂 " onPress={handleFileUpload} />

        <TextInput
          className="flex-1 border p-2"
          placeholder="Escribe un mensaje..."
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={() => handleSubmit()}
          multiline
        />

        <Button title=" Enviar" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
}



/* import { useState } from 'react';
import { View, TextInput, Text, Button, FlatList, Platform, Image } from 'react-native';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/utils';
import BubbleMessage from '@/components/BubbleMessage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export default function TabChat() {
  const { messages, error, input, setInput, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: (error) => console.error(error, 'ERROR'),
  });

  const [imageUri, setImageUri] = useState<string | null>(null);

  // 📂 Manejo de Archivos de Texto
  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
        copyToCacheDirectory: true,
      });

      if (file.canceled || !file.assets || file.assets.length === 0) {
        console.log('Selección de archivo cancelada o inválida.');
        return;
      }

      const fileUri = file.assets[0].uri;
      console.log('Archivo seleccionado:', fileUri);

      let fileContent = '';
      if (Platform.OS === 'web') {
        const response = await fetch(fileUri);
        fileContent = await response.text();
      } else {
        fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
      }

      console.log('Contenido del archivo:', fileContent);
      if (!fileContent.trim()) {
        alert('El archivo está vacío.');
        return;
      }
      setInput(fileContent);
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };

  // 📷 Manejo de Imágenes y Extracción de Texto
  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('Selección de imagen cancelada.');
        return;
      }

      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      console.log('Imagen seleccionada:', selectedImageUri);

      const formData = new FormData();
      formData.append('file', {
        uri: selectedImageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch('https://2txt.vercel.app/api/extract-text', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log('Texto extraído:', data.text);

      if (data.text) {
        setInput(data.text);
      } else {
        alert('No se pudo extraer texto de la imagen.');
      }
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
    }
  };

  if (error) return <Text>{error.message}</Text>;

  return (
    <View className="flex flex-col h-full p-4">
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <BubbleMessage message={item.content} type={item.role} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginBottom: 10 }} />}

      <View className="flex flex-row w-full items-center space-x-2">
        <Button title="📂 Subir TXT" onPress={handleFileUpload} />
        <Button title="🖼️ Subir Imagen" onPress={handleImageUpload} />
      </View>

      <TextInput
        className="flex-1 border p-2"
        placeholder="Escribe un mensaje..."
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={() => handleSubmit()}
        multiline
      />

      <Button title="Enviar" onPress={() => handleSubmit()} />
    </View>
  );
}
*/