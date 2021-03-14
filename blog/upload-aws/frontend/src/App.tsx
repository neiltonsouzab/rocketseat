import React from 'react';

import GlobalStyle from './styles/global';

import { FileProvider } from './context/file';

import Upload from './components/Upload';
import FileList from './components/FileList';

import { Container, Content } from './styles';

const App: React.FC = () => {
  return (
    <FileProvider>
      <Container>
        <Content>
          <Upload />
          <FileList />
        </Content>
        <GlobalStyle />
      </Container>
    </FileProvider>
  );
}

export default App;