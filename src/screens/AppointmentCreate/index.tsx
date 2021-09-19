import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { CategorySelect } from '../../components/CategorySelect';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Background } from '../../components/Background';
import { GuildProps } from '../../components/Guild';
import { Guilds } from '../Guilds';

import { COLLECTION_APPOINTMENT } from '../../configs/storage';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

export function AppointmentCreate({ navigation }: Props) {
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  function handleCategoryChange(categoryId: string) {
    setCategory(categoryId);
  }

  function handleModalVisibility(visible = true) {
    setModalVisible(visible);
  }

  function handleModalSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setModalVisible(false);
  }

  /**
   * Save appointment.
   */
  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(COLLECTION_APPOINTMENT, JSON.stringify([...appointments, newAppointment]));

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" navigation={navigation} />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18, }
            ]}>
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategoryChange}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={() => handleModalVisibility(true)}>
              <View style={styles.select}>

                {
                  guild.icon ?
                    <GuildIcon guildId={guild.id} iconId={guild.icon} /> :
                    <View style={styles.selectImage} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>

                <Feather name="chevron-right" color={theme.colors.heading} size={18} />

              </View>
            </RectButton>

            <View style={styles.formField}>
              <View>
                <Text style={styles.label}>Dia e mês</Text>
                <View style={styles.formColumn}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                  />
                  <Text style={styles.formFieldDivider}> / </Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMonth}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Horário</Text>
                <View style={styles.formColumn}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                  />
                  <Text style={styles.formFieldDivider}> : </Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.formField, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.formFieldHint}>Max. 100 caracteres</Text>
            </View>

            <TextArea
              maxLength={100}
              multiline
              numberOfLines={5}
              autoCorrect
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={modalVisible} closeModal={() => handleModalVisibility(false)}>
        <Guilds handleSelect={handleModalSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}