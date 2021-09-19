import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, View, Alert, Share, Platform } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { Divider } from '../../components/Divider';
import { ButtonIcon } from '../../components/ButtonIcon';

import { api } from '../../services/api';

import BannerBackground from '../../assets/banner.png';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Loading } from '../../components/Loading';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

type Params = {
  appointmentSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails({ navigation }: Props) {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { appointmentSelected } = route.params as Params;

  /**
   * fetch guild widget informations from discord.
   */
  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${appointmentSelected.guild.id}/widget.json`);
      setWidget(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle click on share invitation button.
   */
  function handleShareInvitation() {
    const message = Platform.OS === 'ios' ? `Junte-se a ${appointmentSelected.guild.name}` : widget.instant_invite;
    Share.share({ message, url: widget.instant_invite });
  }

  /**
   * Handle click on open guild button.
   */
  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        navigation={navigation}
        action={
          widget.instant_invite ?
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton> :
            null
        }
      />

      <ImageBackground
        source={BannerBackground}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointmentSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{appointmentSelected.description}</Text>
        </View>
      </ImageBackground>

      {
        loading ?
          <Loading /> :
          <>
            <ListHeader title="Jogadores" subtitle={`Total de ${widget.members.length}`} />
            <FlatList
              data={widget.members || []}
              style={styles.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (<Member data={item} />)}
              ItemSeparatorComponent={() => <Divider isCentered />}
            />
          </>
      }

      <View style={styles.footer}>
        {
          widget.instant_invite ?
            <ButtonIcon title="Entrar na Partida" onPress={handleOpenGuild} /> :
            null
        }
      </View>
    </Background>
  );
}