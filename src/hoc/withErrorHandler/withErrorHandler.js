import React from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {

    return (props) => {

        const [error, errorNotifiedHandler] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal
                    backdropClick={errorNotifiedHandler}
                    display={error}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} >  </WrappedComponent>
            </Aux>
        );
    }

};

export default withErrorHandler;