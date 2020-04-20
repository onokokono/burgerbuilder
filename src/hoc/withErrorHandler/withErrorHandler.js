import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        constructor() {
            super();

            this.state = {
                error: null
            }

        }

        componentWillMount() {
            this.interceptorReq = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.interceptorRes = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.interceptorReq);
            axios.interceptors.response.eject(this.interceptorRes);
        }

        errorNotifiedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        backdropClick={this.errorNotifiedHandler}
                        display={this.state.error}>

                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} >  </WrappedComponent>
                </Aux>
            );
        }

    }

};

export default withErrorHandler;