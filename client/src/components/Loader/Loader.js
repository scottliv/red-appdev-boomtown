import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loader = () => (
    <div>
        <CircularProgress
            size={100}
            thickness={5}
            style={{ backgroundColor: '#fff' }}
        />
    </div>
);

export default Loader;
