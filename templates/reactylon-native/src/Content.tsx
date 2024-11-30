import React, { useEffect, useRef } from 'react';
import { Mesh, ArcRotateCamera, Tools } from '@babylonjs/core';
import { useScene } from 'reactylon';

const Content: React.FC = () => {

    const scene = useScene();
    const boxRef = useRef<Mesh>(null);

    useEffect(() => {
        (scene.activeCamera as ArcRotateCamera).beta = Tools.ToRadians(70);
        function rotation() {
            boxRef.current!.rotation.y += 0.01;
        }
        scene.registerBeforeRender(rotation);
        return () => scene.unregisterBeforeRender(rotation);
    }, []);

    return (
        <box ref={boxRef} name="box" options={{ size: 0.25 }} />
    );
};

export default Content;