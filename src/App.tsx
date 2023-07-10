import MainRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider } from './context/ThemeContext';
import { AppContextProvider } from './context/AppContext';
import { MenuLateral } from './components/MenuLateral';

export default function App(): any {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppThemeProvider>
          <MenuLateral>
            <MainRoutes />
          </MenuLateral>
        </AppThemeProvider>
      </BrowserRouter>
    </AppContextProvider>
  );
}