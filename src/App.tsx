
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SystemOverview from './pages/SystemOverview';
import BackendApps from './pages/BackendApps';
import UserFlow from './pages/UserFlow';
import AIPipeline from './pages/AIPipeline';
import Deployment from './pages/Deployment';
import APIReference from './pages/APIReference';
import DatabaseDesign from './pages/DatabaseDesign';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="system-overview" element={<SystemOverview />} />
          <Route path="backend-apps" element={<BackendApps />} />
          <Route path="user-flow" element={<UserFlow />} />
          <Route path="ai-pipeline" element={<AIPipeline />} />
          <Route path="deployment" element={<Deployment />} />
          <Route path="api-reference" element={<APIReference />} />
          <Route path="database-design" element={<DatabaseDesign />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;