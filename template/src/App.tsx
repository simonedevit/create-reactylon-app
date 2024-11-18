import React from 'react';
import { Engine } from 'reactylon/web';
import { Scene } from 'reactylon';
import Content from './Content';

const App: React.FC = () => {

    return (
        <Engine antialias>
            <Scene onSceneReady={scene => scene.createDefaultCameraOrLight(true, undefined, true)}>
                <Content />
            </Scene>
        </Engine>
    )
}

export default App;