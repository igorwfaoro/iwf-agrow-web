'use client';

import AppCard, {
  AppCardModel
} from '../../../../../components/AppCard/AppCard';
import { useCardContext } from '../../../../contexts/CardContext';

interface PreviewProps {}

export default function Preview({}: PreviewProps) {
  const {
    form: { watch }
  } = useCardContext();

  const card: AppCardModel = watch();

  return (
    <div>
      <h4 className="text-xl font-bold text-center">Prévia</h4>
      <AppCard
        card={card}
        wrapperClassName='h-[70vh] border-2 border-primary'
        rounded
      />
    </div>
  );
}
