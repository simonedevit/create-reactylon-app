import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import HavokPhysics from '@babylonjs/havok';

(async () => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    const havok = await HavokPhysics();
    root.render(<App havok={havok} />);
})();
