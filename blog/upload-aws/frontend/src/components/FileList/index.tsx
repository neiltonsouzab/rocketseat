import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink, MdMoodBad } from 'react-icons/md';

import { useFiles } from '../../context/file';

import { Container, FileInfo, Preview } from './styles';

const FileList: React.FC = () => {
  const { uploadedFiles: files, deleteFile } = useFiles();

  if (!files.length) {
    return (
      <span>
        <MdMoodBad 
          style={{ marginLeft: '45%', marginTop: 10 }}
          size={24}
          color="#d5d2d2"
        />
      </span>
    )
  }

  return (
    <Container>
      {files.map(file => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.preview} />

            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}{' '}
                {!!file.url && (
                  <button onClick={e => deleteFile(file.id)}>Excluir</button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar 
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159C1' },
                  text: {
                    fontSize: 16,
                  }
                }}
                strokeWidth={10}
                text={String(file.progress)}
                value={file.progress || 0}
              />
            )}

            {file.url && (
              <a 
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}

            {file.uploaded && <MdCheckCircle size={24} color="#78E5D5" /> }

            {file.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}

export default FileList;