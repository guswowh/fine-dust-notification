import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Router from './routes/Router';
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';
import store from './store/index';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <Router />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
