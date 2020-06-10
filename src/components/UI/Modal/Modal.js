import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import css from './Modal.module.css';


class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState ) {
        return nextProps.display !== this.props.display || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop backdropClick={this.props.backdropClick} display={this.props.display} />
                <div
                    style={{
                        transform: this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.display ? '1' : '0'
                    }}
                    className={css.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;