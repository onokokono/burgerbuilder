import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import css from './Modal.module.css';


const Modal = props => {
    return (
        <Aux>
            <Backdrop backdropClick={props.backdropClick} display={props.display} />
            <div
                style={{
                    transform: props.display ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.display ? '1' : '0'
                }}
                className={css.Modal}>
                {props.children}
            </div>
        </Aux>
    );
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.display !== prevProps.display && nextProps.children !== prevProps.children);