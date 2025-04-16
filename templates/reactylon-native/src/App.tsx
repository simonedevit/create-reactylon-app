import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { NativeEngine } from 'reactylon/mobile';
import { Scene } from 'reactylon';
import type { ArcRotateCamera, Camera } from '@babylonjs/core';
import Content from './Content';

const App = () => {

    const [camera, setCamera] = useState<Camera>();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <NativeEngine camera={camera}>
                        <Scene
                            onSceneReady={(scene) => {
                                scene.createDefaultCameraOrLight(true, undefined, true);
                                (scene.activeCamera as ArcRotateCamera).pinchPrecision = 300;
                                setCamera(scene.activeCamera as Camera);
                            }}
                        >
                            <Content />
                        </Scene>
                    </NativeEngine>
                </View>
            </SafeAreaView>
        </>
    );
};

export default App;