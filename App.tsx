import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './components/Home';
import Info from './components/Info';
import Memo from './components/Memo';

export default function App() {
    return (
        <Router>
            <Stack key="root">
                <Scene key="home" component={Home} title="홈"/>
                <Scene key="info" component={Info} title="정보"/>
                <Scene key="memo" component={Memo} title="메모"/>
            </Stack>
        </Router>
    );
}
