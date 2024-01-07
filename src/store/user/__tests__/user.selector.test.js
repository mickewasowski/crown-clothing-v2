import { selectCurrentUser } from '../user.selector';

const mockState = {
    user: {
        currentUser: {
            createdAt: '20/01/2023',
            displayName: 'testUser',
            email: 'test@example.com'
        }
    }
}

describe('User selector tests', () => {
    it('should get the current user', () => {
        const currentUser = selectCurrentUser(mockState);

        expect(currentUser).toEqual(mockState.user.currentUser);
    });
});