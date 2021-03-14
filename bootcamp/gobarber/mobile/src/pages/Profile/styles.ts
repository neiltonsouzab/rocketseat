import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 164px;
  height: 164px;
  border-radius: 87px;

  align-self: center;
`;
