import { userReducer, INITIAL_STATE } from '../user.reducer';
import { signInSuccess, signOutSuccess, signInFailed, signOutFailed, signUpFailed } from '../user.action';

describe('User reducer tests', () => {
    it('should sign in a user successfully', () => {
        const currentUser = {
            createdAt: '20/01/2022',
            displayName: 'testName',
            email: 'test@example.com'
        };
        const expectedState = {
            ...INITIAL_STATE,
            currentUser
        };

        expect(userReducer(INITIAL_STATE, signInSuccess(currentUser))).toEqual(expectedState);
    });

    it('should successfully sign out a user', () => {
        const currentUser = {
            createdAt: '20/01/2022',
            displayName: 'testName',
            email: 'test@example.com'
        };
        const expectedState = {
            ...INITIAL_STATE,
            currentUser: null
        };

        const mockState = {
            ...INITIAL_STATE,
            currentUser
        };

        expect(userReducer(mockState, signOutSuccess())).toEqual(expectedState);
    });

    it('should get an error on sign in', () => {
        const error = new Error('Something went wrong');
        const expectedState = {
            ...INITIAL_STATE,
            error,
        };

        expect(userReducer(INITIAL_STATE, signInFailed(error))).toEqual(expectedState);
    });

    it('should get an error on sign out', () => {
        const error = new Error('Something went wrong');
        const expectedState = {
            ...INITIAL_STATE,
            error,
        };

        expect(userReducer(INITIAL_STATE, signOutFailed(error))).toEqual(expectedState);
    });

    it('should get an error on sign up', () => {
        const error = new Error('Something went wrong');
        const expectedState = {
            ...INITIAL_STATE,
            error,
        };

        expect(userReducer(INITIAL_STATE, signUpFailed(error))).toEqual(expectedState);
    })
});