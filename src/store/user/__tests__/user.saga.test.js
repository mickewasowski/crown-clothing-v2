import { expectSaga, testSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "../user.types";
import { userSagas, onCheckUserSession, onGoogleSignInStart, onEmailSignInStart, onSignUpStart, onSignUpSuccess, onSignOutStart, isUserAuthenticated, signInWithGoogle, signInWithEmail, signUp, signInAfterSignUp, signOut, getSnapshotFromUserAuth } from '../user.saga';
import { signInFailed, signOutFailed, signUpFailed, signInSuccess } from '../user.action';
import { signInAuthUserWithEmailAndPassword, signOutUser, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../../utils/firebase/firebase.utils';

describe('User saga tests', () => {
    it('userSagas', () => {
        testSaga(userSagas)
        .next()
        .all([
            call(onCheckUserSession),
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onSignUpStart),
            call(onSignUpSuccess),
            call(onSignOutStart),
          ])
        .next()
        .isDone();
    });

    it('onCheckUserSession', () => {
        testSaga(onCheckUserSession)
            .next()
            .takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
            .next()
            .isDone();
    });

    it('onGoogleSignInStart', () => {
        testSaga(onGoogleSignInStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
            .next()
            .isDone();
    });

    it('onEmailSignInStart', () => {
        testSaga(onEmailSignInStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
            .next()
            .isDone();
    });

    it('email and password signIn failed', () => {
        const mockError = new Error('An error ocurred!');
        const mockEmail = 'test@example.com';
        const mockPassword = 'somePassword';

        return expectSaga(signInWithEmail, { payload: { email: mockEmail, password: mockPassword } })
        .provide([
            [call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword), throwError(mockError)]
        ])
        .put(signInFailed(mockError))   
        .run();
    });

    it('onSignUpStart', () => {
        testSaga(onSignUpStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
            .next()
            .isDone();
    });

    it('onSignUpSuccess', () => {
        testSaga(onSignUpSuccess)
            .next()
            .takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
            .next()
            .isDone();
    });

    it('signInAfterSignUp', () => {
        const mockUser = {
            createdAt: new Date(),
            email: 'test@example.com'
        }
        const mockDetails = {
            displayName: 'testUser',
        }
        testSaga(signInAfterSignUp, { payload: { user: mockUser, additionalDetails: mockDetails }})
            .next()
            .call(getSnapshotFromUserAuth, mockUser, mockDetails)
            .next()
            .isDone();
    })

    it('signUp failed', () => {
        const mockError = new Error('An error ocurred!');
        const mockEmail = 'test@example.com';
        const mockPassword = 'somePassword';
        const mockDisplayName = 'testUser';

        return expectSaga(signUp, { payload: { email: mockEmail, password: mockPassword, displayName: mockDisplayName }})
            .provide([
                [call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword), throwError(mockError)]
            ])
            .put(signUpFailed(mockError))
            .run();
    });

    it('onSignOutStart', () => {
        testSaga(onSignOutStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
            .next()
            .isDone();
    });
    
    it('signOut failed', () => {
        const mockError = new Error('An error ocurred!');

        return expectSaga(signOut)
            .provide([
                [call(signOutUser), throwError(mockError)]
            ])
            .put(signOutFailed(mockError))
            .run();
    });

    it('getSnapshotFromUserAuth', () => {
        const mockUserAuth = {
            id: 1,
            name: 'testName'
        };
        const mockAditionalDetails = { displayName: 'displayName' };
        const mockUserSnapshot = {
            id: 1,
            data: () => ({ displayName: mockAditionalDetails.displayName })
        }

        return expectSaga(getSnapshotFromUserAuth, mockUserAuth, mockAditionalDetails)
            .provide([
                [call(createUserDocumentFromAuth, mockUserAuth, mockAditionalDetails), mockUserSnapshot]
            ])
            .put(signInSuccess({ id: mockUserSnapshot.id, ...mockUserSnapshot.data() }))
            .run();
    });

    it('signInWithGoogle', () => {
        const mockUser = {
            id: 1,
            name: 'testName'
        }
        const mockGoogleVal = { user: mockUser };
        return expectSaga(signInWithGoogle)
            .provide([
                [call(signInWithGooglePopup), mockGoogleVal]
            ])
            .call(getSnapshotFromUserAuth, mockUser)
            .run();
    });

    it('signInWithGoogle failed', () => {
        const mockError = new Error('An error ocurred!');

        return expectSaga(signInWithGoogle)
            .provide([
                [call(signInWithGooglePopup), throwError(mockError)]
            ])
            .put(signInFailed(mockError))
            .run();
    });

    it('signInWithEmail', () => {

    });

    it('isUserAuthenticated', () => {
    
    });

    it('signUp', () => {
    
    });
    
    it('signOut', () => {
    
    });
});