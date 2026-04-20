/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Layout from './components/Layout';
import ProblemView from './views/ProblemView';
import CoursesView from './views/CoursesView';

export default function App() {
  const [currentView, setCurrentView] = useState('problem');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'problem' ? <ProblemView /> : <CoursesView />}
    </Layout>
  );
}

