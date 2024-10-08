import { Metadata } from 'next';
import { cache } from 'react';
import { createCardServerService } from '../../../services/server/card.server-service';
import Content from './components/Content/Content';
import { API_URLS } from '../../../constants/api-urls';

interface CardPageProps {
  params: { cardSlug: string };
}

const getCard = cache(async (cardSlug: string) => {
  return await createCardServerService().getBySlug(cardSlug);
});

export async function generateMetadata({
  params
}: CardPageProps): Promise<Metadata> {
  const card = await getCard(params.cardSlug);

  return {
    title: `Cartão para ${card.birthdayPersonName} | Cartão Aniversário`,
    openGraph: {
      images: API_URLS.card.thumbnail(card.slug)
    },
    twitter: {
      images: API_URLS.card.thumbnail(card.slug)
    }
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const card = await getCard(params.cardSlug);
  return <Content card={card} />;
}
