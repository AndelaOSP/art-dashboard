import React from 'react';

const errorMessage = (error, success, handleFileDownload) => {
  if (!success.fail && !error) {
    return null;
  }

  if (success.fail) {
    return (
      <span className="error-guide">
        Please download{' '}
        <a href="# " onClick={() => handleFileDownload(success.file)}>
          this file
        </a> {' '}, fix errors and upload again.
      </span>
    );
  }

  return (
    <span className="error-guide">
      Please contact the admin for help.
    </span>
  );
};

export default errorMessage;
