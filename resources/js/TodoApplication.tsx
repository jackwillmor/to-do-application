import React from 'react';
import Tasks from './components/Tasks';

function TodoApplication() {
  return (
    <div className="App">
      <Tasks initialProjectId={1} title="To-Do Application" />
    </div>
  );
}

export default TodoApplication;
