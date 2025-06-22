// in src/App.tsx
import { Admin, Resource, defaultTheme } from 'react-admin';
import { CustomDataProvider } from '../admin/CustomDataProvider';
import { QueryClient } from '@tanstack/react-query';
import { UserCreate, UserEdit, UserList } from '../components/UserTable';
import { deepmerge } from '@mui/utils';

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

const myTheme = deepmerge(defaultTheme, {
    palette: {
        primary: "#212121",
        secondary: "#F5145F",
        error: "#FF0000",
        contrastThreshold: 0,
        tonalOffset: 0.0,
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
});

export const AdminApp = () => (
    <Admin dataProvider={CustomDataProvider} queryClient={queryClient} theme={myTheme} basename='/admin'>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    </Admin>
);