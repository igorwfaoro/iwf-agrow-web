import FieldsMap from '@/app/app/(index)/components/tabs/FieldsMap/FieldsMap';
import FieldsProvider from '@/app/app/(index)/contexts/FieldsContext';
import Tabs, { TabItem } from '@/components/Tabs/Tabs';
import FieldsList from './components/tabs/FieldsList/FieldsList';

interface AppPageProps {}

export default function AppPage({}: AppPageProps) {
  const tabs: TabItem[] = [
    {
      key: 'fields-list',
      label: 'Campos',
      component: <FieldsList />
    },
    {
      key: 'fields-map',
      label: 'Mapa',
      component: <FieldsMap />
    }
  ];

  return (
    <div>
      <FieldsProvider>
        <Tabs tabs={tabs} />
      </FieldsProvider>
    </div>
  );
}
