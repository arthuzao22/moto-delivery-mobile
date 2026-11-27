import { useRef, useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, type TextInput } from 'react-native';
import { ehErroDaApi } from '@/api/erro-da-api';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { DESENVOLVEDORA, NOME_DO_PRODUTO } from '@/lib/marca';
import { useSessao } from '@/sessao/provedor-de-sessao';

/**
 * Entrar com e-mail e senha (documento 04 M1). O motoboy recebeu o convite por e-mail e criou a
 * senha na página pública do painel; aqui ele só entra.
 */
export default function Login(): ReactNode {
  const { entrar } = useSessao();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const campoSenha = useRef<TextInput>(null);
  const preenchido = email.trim() !== '' && senha !== '';

  const enviar = async (): Promise<void> => {
    if (!preenchido || enviando) return;
    setEnviando(true);
    setErro(null);
    try {
      await entrar({ email, senha });
    } catch (falha) {
      setErro(ehErroDaApi(falha) ? falha.message : 'Não deu certo. Tente de novo.');
      setEnviando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FaixaDoTopo titulo={NOME_DO_PRODUTO} />
      <ScrollView contentContainerClassName="gap-6 px-4 py-8" keyboardShouldPersistTaps="handled">
        <View className="gap-2">
          <Text variante="titulo">Entrar</Text>
          <Text variante="secundario">Use o e-mail e a senha que você criou pelo convite.</Text>
        </View>
        <Input
          rotulo="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="username"
          returnKeyType="next"
          onSubmitEditing={() => campoSenha.current?.focus()}
        />
        <Input
          ref={campoSenha}
          rotulo="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={() => void enviar()}
        />
        {erro ? (
          <View accessibilityLiveRegion="polite" className="rounded-2xl border border-destructive p-4">
            <Text className="text-destructive">{erro}</Text>
          </View>
        ) : null}
        <Text variante="secundario" className="text-center text-xs">
          {NOME_DO_PRODUTO} · Desenvolvido por {DESENVOLVEDORA}
        </Text>
      </ScrollView>
      <BarraDeAcao>
        <Button disabled={!preenchido || enviando} onPress={() => void enviar()}>
          <Text>{enviando ? 'Entrando…' : 'Entrar'}</Text>
        </Button>
      </BarraDeAcao>
    </KeyboardAvoidingView>
  );
}
