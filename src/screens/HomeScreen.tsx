import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {useAuth} from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const {user, logout} = useAuth();
  const scheme = useColorScheme();

  return (
    <View style={[styles.container, scheme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, scheme === 'dark' && styles.titleDark]}>
        Welcome
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>
        <Text style={[styles.label, styles.fieldSpacing]}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>
      <TouchableOpacity style={styles.primaryBtn} onPress={logout}>
        <Text style={styles.primaryBtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#E1D4C1',
    justifyContent: 'center',
  },
  containerDark: {
    backgroundColor: '#1b1714',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2F2A26',
    marginBottom: 24,
    textAlign: 'center',
  },
  titleDark: {
    color: '#f3f3f3',
  },
  card: {
    borderWidth: 1,
    borderColor: '#D7C5B3',
    backgroundColor: '#F3E8D9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#6B625B',
  },
  value: {
    fontSize: 16,
    color: '#2F2A26',
    fontWeight: '600',
  },
  fieldSpacing: {
    marginTop: 12,
  },
  primaryBtn: {
    backgroundColor: '#6B4F37',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
