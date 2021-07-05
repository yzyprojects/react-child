import './App.css';
import {BrowserRouter,Route, Link} from 'react-router-dom'
import Index from './pages/index'
import Test from './pages/test'

function App() {
  console.log('=====window.__POWERED_BY_QIANKUN__:', window.__POWERED_BY_QIANKUN__)

  return (
    <BrowserRouter  basename={window.__POWERED_BY_QIANKUN__ ? '/react-app' : '/'}>
      <Link to='/index'>首页</Link>
      <Link to="/test/">列表</Link>
      <Route path="/test/" component={Test} />
      <Route path="/index/" component={Index} />
    </BrowserRouter>
  );
}

export default App;
