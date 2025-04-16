import React from 'react';
import { Engine } from 'reactylon/web';
import { Scene } from 'reactylon';
import Content from './Content';
import { HavokPlugin } from '@babylonjs/core/Physics/v2/Plugins/havokPlugin';

type AppProps = {
    havok: unknown;
}

const App: React.FC<AppProps> = ({ havok }) => {

    return (
        <Engine antialias>
            <Scene onSceneReady={scene => scene.createDefaultCameraOrLight(true, undefined, true)} physicsOptions={{
                plugin: new HavokPlugin(true, havok)
            }}>
                <Content />
            </Scene>
        </Engine>
    )
}

export default App;