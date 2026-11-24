import { Bike, Coffee, MoonStar, Radar, type LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatarHora } from '@/lib/datas';
import { useCores } from '@/lib/provedor-de-tema';
import { cn } from '@/lib/utils';

export type EstadoDoTurno = 'sem_turno' | 'disponivel' | 'pausa' | 'em_rota';

const SITUACAO: Readonly<
  Record<EstadoDoTurno, { titulo: string; texto: string; icone: LucideIcon; ativo: boolean }>
> = {
  sem_turno: {
    titulo: 'Fora do turno',
    texto: 'Inicie o turno para receber ofertas.',
    icone: MoonStar,
    ativo: false,
  },
  disponivel: {
    titulo: 'Aguardando ofertas',
    texto: 'Quando chegar uma rota, o celular toca e vibra.',
    icone: Radar,
    ativo: true,
  },
  pausa: {
    titulo: 'Em pausa',
    texto: 'Você não recebe ofertas enquanto estiver em pausa.',
    icone: Coffee,
    ativo: false,
  },
  em_rota: { titulo: 'Em rota', texto: 'Você está com uma rota em andamento.', icone: Bike, ativo: true },
};

const TAMANHO_DO_ICONE = 24;

/** O estado do turno em destaque: ícone, título, uma frase e, com turno aberto, desde quando. */
export function SituacaoDoTurno(props: {
  readonly estado: EstadoDoTurno;
  readonly abertoEm: string | null;
  readonly aviso?: string;
}): ReactNode {
  const { titulo, texto, icone: Icone, ativo } = SITUACAO[props.estado];
  const cores = useCores();
  return (
    <Card className="gap-3 p-4">
      <View className="flex-row items-center gap-3">
        <View
          className={cn(
            'h-12 w-12 items-center justify-center rounded-2xl',
            ativo ? 'bg-primary/10' : 'bg-secondary',
          )}
        >
          <Icone color={ativo ? cores.brandText : cores.muted} size={TAMANHO_DO_ICONE} strokeWidth={2} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text variante="titulo">{titulo}</Text>
          {props.abertoEm === null ? null : (
            <Badge rotulo={`Turno aberto às ${formatarHora(props.abertoEm)}`} variante="contorno" />
          )}
        </View>
      </View>
      <Text variante="secundario">{props.aviso === undefined ? texto : `${texto} ${props.aviso}`}</Text>
    </Card>
  );
}
