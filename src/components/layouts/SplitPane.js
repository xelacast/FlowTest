import React from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Workspace from '../organisms/workspace/Workspace';
import AppNavBar from 'components/molecules/appNavBar';
import WorkspaceDirectory from '../organisms/workspaceDirectory/WorkspaceDirectory';

const SplitPane = () => {
  return (
    <main className='h-full'>
      <Allotment>
        <Allotment.Pane preferredSize={'450px'} minSize={450}>
          <div className='flex text-xs'>
            <AppNavBar />
            <WorkspaceDirectory />
          </div>
        </Allotment.Pane>
        <Allotment.Pane>
          <Workspace />
        </Allotment.Pane>
      </Allotment>
    </main>
  );
};

export default SplitPane;
