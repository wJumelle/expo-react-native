import { Button, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Collapsible } from '@/components/Collapsible';

import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

const audioSource = require('../../assets/audio/strange.mp3');

export default function TabTwoScreen() {
  const [localSound, setLocalSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(audioSource);
    setLocalSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return localSound
      ? () => {
          console.log('Unloading Sound');
          localSound.unloadAsync();
        }
      : undefined;
  }, [localSound]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="music.house.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Audio en local</ThemedText>
      </ThemedView>
      <ThemedText>C'est ici qu'on teste les fichiers audios en local.</ThemedText>

      <Collapsible title="Audio à distance">
        <View style={styles.audioContainer}>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  audioContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  audioController: {
    flexGrow: 1,
  }
});
