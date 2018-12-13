import React from 'react';

const errorMessage = (error, success, handleFileDownload) => {
  if (!success.fail && !error) {
    return null;
  }

  if (success.hasOwnProperty('fail')) {
    return (
      <span className="error-guide">
        Please download
        <a href={success.file} onClick={() => handleFileDownload(success.file)}>
          this file
        </a> {' '}, fix errors and upload again.
      </span>
    );
  }

  return (
    <span className="error-guide">
      Please confirm the file is well formatted and try uploading again.
    </span>
  );
};

export default errorMessage;
