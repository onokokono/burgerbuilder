import React, { useState, useEffect } from 'react';

const asyncComponent = (importedComponent) => {
    return props => {

        const [component, setComponent] = useState(null);

        useEffect(() => {
            importedComponent()
                .then(result => setComponent(result.default));
        }, [importedComponent])


        const C = component;

        return C ? <C {...this.props} /> : null;
    }
};

export default asyncComponent;