import React, { useState, useCallback } from "react";
import { FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { Divider } from "../../components/Divider";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";

import { COLLECTION_APPOINTMENT } from "../../configs/storage";

import { styles } from "./styles";
import { Loading } from "../../components/Loading";
import { useFocusEffect } from "@react-navigation/core";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

export function Home({ navigation }: Props) {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appoinments, setAppointments] = useState<AppointmentProps[]>([]);

  function handleCategoryChange(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(appointmentSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { appointmentSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  /**
   * fetch appointments from storage.
   */
  async function fetchAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const storageAppoint: AppointmentProps[] = storage ? JSON.parse(storage) : [];

    if (category) {
      setAppointments(storageAppoint.filter(item => item.category === category));
    } else {
      setAppointments(storageAppoint);
    }

    setLoading(false);
  }

  /**
   * focus effect for every screen load.
   * callback to fetch appointments
   * if category changes, callback are called again.
   */
  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategoryChange}
          hasCheckBox={true}
        />

        {
          loading ?
            <Loading /> :
            <>
              <ListHeader title="Partidas Agendadas" subtitle={`Total de ${appoinments.length}`} />
              <FlatList
                style={styles.matches}
                data={appoinments}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Divider />}
                contentContainerStyle={{ paddingBottom: 69 }}
                renderItem={({ item }) => (
                  <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
                )}
              />
            </>
        }
      </View>
    </Background>
  );
}