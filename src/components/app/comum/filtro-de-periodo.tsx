import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ATALHOS, deslocar, ehHoje, periodoDoAtalho, rotuloDoPeriodo, type Periodo } from '@/lib/periodo';
import { useCores } from '@/lib/provedor-de-tema';
import { cn } from '@/lib/utils';

const TAMANHO_DO_ICONE = 22;

/**
 * Filtro de datas: as setas andam um período para trás ou para frente (nunca depois de hoje) e os
 * atalhos trocam o tamanho. Alvos de 48 px, para usar de luva.
 */
export function FiltroDePeriodo(props: {
  readonly periodo: Periodo;
  aoMudar(periodo: Periodo): void;
  readonly atalhos?: readonly ('hoje' | 'ontem' | 'semana' | 'mes')[];
}): ReactNode {
  const { periodo, aoMudar } = props;
  const cores = useCores();
  const hoje = new Date();
  const noFim = ehHoje(periodo, hoje);
  const atalhos = ATALHOS.filter(
    (item) => props.atalhos === undefined || props.atalhos.includes(item.atalho),
  );
  return (
    <View className="gap-3">
      <Card className="flex-row items-center">
        <Seta rotulo="Período anterior" aoTocar={() => aoMudar(deslocar(periodo, -1, hoje))}>
          <ChevronLeft color={cores.foreground} size={TAMANHO_DO_ICONE} />
        </Seta>
        <View className="flex-1 flex-row items-center justify-center gap-2" accessibilityLiveRegion="polite">
          <CalendarDays color={cores.brandText} size={18} strokeWidth={2} />
          <Text className="font-semibold text-heading">{rotuloDoPeriodo(periodo, hoje)}</Text>
        </View>
        <Seta
          rotulo="Próximo período"
          desabilitada={noFim}
          aoTocar={() => aoMudar(deslocar(periodo, 1, hoje))}
        >
          <ChevronRight color={noFim ? cores.border : cores.foreground} size={TAMANHO_DO_ICONE} />
        </Seta>
      </Card>
      <View className="flex-row gap-2" accessibilityRole="radiogroup">
        {atalhos.map(({ atalho, rotulo }) => {
          const alvo = periodoDoAtalho(atalho, hoje);
          const ativo = alvo.de === periodo.de && alvo.ate === periodo.ate;
          return (
            <Pressable
              key={atalho}
              accessibilityRole="radio"
              accessibilityState={{ selected: ativo }}
              onPress={() => aoMudar(alvo)}
              className={cn(
                'h-10 flex-1 items-center justify-center rounded-full border',
                ativo ? 'border-primary bg-primary' : 'border-input bg-card',
              )}
            >
              <Text
                className={cn('text-sm', ativo ? 'font-semibold text-primary-foreground' : 'text-foreground')}
              >
                {rotulo}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function Seta(props: {
  readonly rotulo: string;
  readonly desabilitada?: boolean;
  aoTocar(): void;
  readonly children: ReactNode;
}): ReactNode {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.rotulo}
      accessibilityState={{ disabled: props.desabilitada === true }}
      disabled={props.desabilitada === true}
      onPress={props.aoTocar}
      className="h-12 w-12 items-center justify-center active:opacity-60"
    >
      {props.children}
    </Pressable>
  );
}
