'use client';

import dynamic from 'next/dynamic';
import { CardViewModel } from '../../../../../models/view-models/card.view-model';

const AppCard = dynamic(
  () => import('../../../../../components/AppCard/AppCard'),
  { ssr: false }
);

interface ContentProps {
  card: CardViewModel;
}

export default function Content({ card }: ContentProps) {
  return (
    <div>
      <AppCard
        card={card}
        wrapperClassName="h-dvh"
        showCreateYourCard
        enableSharing
        showElementsOnlyInBirthday
      />
    </div>
  );
}
