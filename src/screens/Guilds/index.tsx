import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';

import { Divider } from '../../components/Divider';
import { Loading } from '../../components/Loading';
import { Guild, GuildProps } from '../../components/Guild';

import { styles } from './styles';
import { api } from '../../services/api';

type Props = {
  handleSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {
        loading ?
          <Loading /> :
          <FlatList
            data={guilds}
            style={styles.guilds}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
            renderItem={({ item }) => (
              <Guild data={item} onPress={() => handleSelect(item)} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Divider isCentered />}
            ListHeaderComponent={() => <Divider isCentered />}
          />
      }
    </View>
  );
}