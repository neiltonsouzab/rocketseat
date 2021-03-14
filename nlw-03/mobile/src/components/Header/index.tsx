import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  const handleGoBackToAppHomePage = useCallback(() => {
    navigation.navigate('OrphanagesMap');
  }, []);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#15B6D6" />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomePage}>
          <Feather name="x" size={24} color="#FF669D" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 44,

    backgroundColor: '#F9FAFC',
    borderBottomWidth: 1,
    borderColor: '#DDE3F0',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: '#8FA7B3',
  }
})

export default Header;