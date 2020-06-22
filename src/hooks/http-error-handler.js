import { useState, useEffect } from 'react';

const useHttpErrorHandler = (axios) => {

    const [error, setError] = useState(false);

    const interceptorReq = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const interceptorRes = axios.interceptors.response.use(res => res, err => {
        setError(err)
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(interceptorReq);
            axios.interceptors.response.eject(interceptorRes);
        }
    }, [interceptorReq, interceptorRes, axios]);

    const errorNotifiedHandler = () => {
        setError(null);
    }

    return [error, errorNotifiedHandler];
};

export default useHttpErrorHandler;