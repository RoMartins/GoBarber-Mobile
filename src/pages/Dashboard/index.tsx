import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../Hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dash</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
