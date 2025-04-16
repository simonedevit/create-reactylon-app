import ReactDOM from 'react-dom/client';
import HavokPhysics from '@babylonjs/havok';
import App from './App';
import './index.css';

(async () => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    const havok = await HavokPhysics();
    root.render(<App havok={havok} />);
})();
