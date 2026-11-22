import '../../global.css';
// Registra a tarefa do GPS no escopo do módulo: o sistema acorda o app só para rodá-la.
import '@/gps/rastreamento';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorDeTema, useTema } from '@/lib/provedor-de-tema';
import { TEMA_DA_NAVEGACAO } from '@/lib/tema';
import { ProvedorDeSessao, useSessao } from '@/sessao/provedor-de-sessao';

void SplashScreen.preventAutoHideAsync();

const clienteDeConsultas = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });

const estilos = StyleSheet.create({ raiz: { flex: 1 } });

/**
 * Base de execução (documento 03 §1): fontes e tema carregados antes de esconder a splash,
 * status bar sempre clara sobre a faixa escura, e os provedores que todas as telas usam.
 */
export default function Layout(): ReactNode {
  return (
    <GestureHandlerRootView style={estilos.raiz}>
      <SafeAreaProvider>
        <QueryClientProvider client={clienteDeConsultas}>
          <ProvedorDeTema>
            <ProvedorDeSessao>
              <Casca />
            </ProvedorDeSessao>
          </ProvedorDeTema>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function Casca(): ReactNode {
  const { esquema, carregado } = useTema();
  const { situacao } = useSessao();
  const [fontesProntas, erroDasFontes] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_400Regular,
  });
  /** Fonte que falhou não segura a splash: o app abre com a fonte do sistema. */
  const pronto = (fontesProntas || erroDasFontes !== null) && carregado && situacao !== 'carregando';
  const logado = situacao === 'ativa';

  useEffect(() => {
    if (pronto) void SplashScreen.hideAsync();
  }, [pronto]);

  if (!pronto) return null;
  return (
    <ThemeProvider value={TEMA_DA_NAVEGACAO[esquema]}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Sem sessão, só o login existe; com sessão, o login some e o app abre no Início. */}
        <Stack.Protected guard={logado}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!logado}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
