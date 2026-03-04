import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useAuth} from '../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [secure, setSecure] = useState(true);
  const scheme = useColorScheme();

  const onLogin = async () => {
    setError(null);
    try {
      await login({email, password});
    } catch (e: any) {
      setError(e.message ?? 'Login failed');
    }
  };

  return (
    <View style={[styles.container, scheme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, scheme === 'dark' && styles.titleDark]}>
        Welcome Back
      </Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="enter your email"
          style={[styles.input, scheme === 'dark' && styles.inputDark]}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            placeholder="enter your password"
            style={[styles.input, styles.passwordInput, scheme === 'dark' && styles.inputDark]}
          />
          <TouchableOpacity
            onPress={() => setSecure(s => !s)}
            style={styles.eyeButton}
            accessibilityRole="button"
            accessibilityLabel="Toggle password visibility">
            <Icon name={secure ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6B625B" />
          </TouchableOpacity>
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.primaryBtn} onPress={onLogin}>
        <Text style={styles.primaryBtnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Go to Signup</Text>
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight:'bold',
    color: '#0a0a0aff',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7C5B3',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F3E8D9',
    color: '#2F2A26',
  },
  inputDark: {
    backgroundColor: '#1e1e1e',
    color: '#f3f3f3',
    borderColor: '#2a2a2a',
  },
  passwordRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 42,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
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
  linkBtn: {
    alignItems: 'center',
    marginTop: 12,
  },
  linkText: {
    color: '#6B4F37',
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: '#8B3A3A',
    marginBottom: 6,
    textAlign: 'center',
  },
});

export default LoginScreen;
