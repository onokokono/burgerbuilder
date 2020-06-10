import * as actionTypes from '../actions/actionTypes';
import auth from './auth';

describe('Auth reducer', () => {
    it('should return the initial state', () => {
        expect(auth(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should save token and UID to state', () => {
        expect(auth({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, { type: actionTypes.AUTH_SUCCESS, idToken: 'some token', userId: 'some UID' })).toEqual({
            token: 'some token',
            userId: 'some UID',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

});