import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BorderlessButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  title: string;
  action?: ReactNode;
  navigation: NativeStackNavigationProp<any, any>;
}

export function Header({ title, action, navigation }: Props) {
  const { secondary100, secondary40, heading } = theme.colors;

  function handleBackClick() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleBackClick}>
        <Feather name="arrow-left" color={heading} size={24} />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        action ?
          <View>
            {action}
          </View> :
          <View style={{ width: 24 }} />
      }
    </LinearGradient>
  );
}