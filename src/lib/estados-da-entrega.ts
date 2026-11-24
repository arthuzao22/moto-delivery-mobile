import {
  AlertTriangle,
  Bike,
  CheckCircle2,
  Circle,
  MapPin,
  Package,
  PackageX,
  SearchX,
  Store,
  Undo2,
  XCircle,
  type LucideIcon,
} from 'lucide-react-native';
import type { VarianteDaEtiqueta } from '@/components/ui/badge';

export interface AparenciaDeEstado {
  readonly rotulo: string;
  readonly variante: VarianteDaEtiqueta;
  readonly icone: LucideIcon;
}

/**
 * Os estados da entrega como o painel web mostra (features/entregas/estados.ts): laranja só onde
 * alguém precisa agir agora; o resto em tons neutros. Estado novo da API aparece neutro.
 */
const ESTADOS: Readonly<Record<string, AparenciaDeEstado>> = {
  no_local_coleta: { rotulo: 'No restaurante', variante: 'contorno', icone: Store },
  coletada: { rotulo: 'Coletada', variante: 'contorno', icone: Package },
  a_caminho: { rotulo: 'A caminho', variante: 'contorno', icone: Bike },
  no_local_entrega: { rotulo: 'No cliente', variante: 'contorno', icone: MapPin },
  cliente_ausente: { rotulo: 'Cliente ausente', variante: 'atencao', icone: AlertTriangle },
  aguardando_decisao: { rotulo: 'Aguardando decisão', variante: 'atencao', icone: AlertTriangle },
  retornando: { rotulo: 'Retornando', variante: 'atencao', icone: Undo2 },
  entregue: { rotulo: 'Entregue', variante: 'neutro', icone: CheckCircle2 },
  devolvida: { rotulo: 'Devolvida', variante: 'apagado', icone: PackageX },
  cancelada: { rotulo: 'Cancelada', variante: 'apagado', icone: XCircle },
  extraviada: { rotulo: 'Extraviada', variante: 'apagado', icone: SearchX },
};

export function aparenciaDoEstado(status: string): AparenciaDeEstado {
  return ESTADOS[status] ?? { rotulo: status, variante: 'neutro', icone: Circle };
}

export const FORMAS_DE_PAGAMENTO: Readonly<Record<string, string>> = {
  pago_online: 'Pago online',
  dinheiro: 'Dinheiro',
  cartao_maquininha: 'Cartão',
  pix_na_entrega: 'Pix',
  misto: 'Misto',
};
