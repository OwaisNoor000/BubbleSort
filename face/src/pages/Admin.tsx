// in src/App.tsx
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { CustomDataProvider } from '../admin/CustomDataProvider';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            structuralSharing: false,
        },
        mutations: {
            retryDelay: 10000,
        },
    },
});


export const AdminApp = () => (
    <Admin dataProvider={CustomDataProvider} queryClient={queryClient}>
        <Resource name="get_users" list={ListGuesser} />
    </Admin>
);