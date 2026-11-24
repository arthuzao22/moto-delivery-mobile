import { Banknote, PackageCheck, TrendingUp } from 'lucide-react-native';
import { useMemo, type ReactNode } from 'react';
import { View } from 'react-native';
import { useCaixa, useExtrato, useHistorico } from '@/api/dinheiro-do-motoboy';
import { CartaoDeMetrica } from '@/components/app/comum/cartao-de-metrica';
import { ultimosDias } from '@/lib/datas';
import { formatarReais } from '@/lib/dinheiro';

/**
 * O dia em números, como os cards de métrica do painel: quantas entregas fez, quanto ganhou e quanto
 * dinheiro de clientes está com ele. Valores prontos da API.
 */
export function MetricasDoDia(): ReactNode {
  const hoje = useMemo(() => ultimosDias(1, new Date()), []);
  const historico = useHistorico(hoje);
  const extrato = useExtrato(hoje);
  const caixa = useCaixa();
  const emMaos = caixa.data?.emMaos ?? null;
  return (
    <View className="gap-3">
      <View className="flex-row gap-3">
        <CartaoDeMetrica
          rotulo="Entregas hoje"
          icone={PackageCheck}
          valor={historico.data === undefined ? null : String(historico.data.resumo.entregues)}
        />
        <CartaoDeMetrica
          rotulo="Ganhos hoje"
          icone={TrendingUp}
          valor={extrato.data === undefined ? null : formatarReais(extrato.data.total)}
        />
      </View>
      <CartaoDeMetrica
        rotulo="Dinheiro de clientes em mãos"
        icone={Banknote}
        valor={emMaos === null ? null : formatarReais(emMaos)}
        destaque={emMaos !== null && emMaos !== '0.00'}
        detalhe="A acertar no fim do turno"
      />
    </View>
  );
}
