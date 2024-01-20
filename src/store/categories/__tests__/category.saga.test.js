import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { call } from 'typed-redux-saga/macro';
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../category.saga';
import { CATEGORIES_ACTION_TYPES } from '../category.types';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from '../category.action';
import { throwError } from 'redux-saga-test-plan/providers';

describe('Category saga tests', () => {
    it('categoriesSaga', () => {
        testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone();
    });

    it('onFetchCategories', () => {
        testSaga(onFetchCategories)
            .next()
            .takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
            .next()
            .isDone();
    });

    it('fetchCategoriesAsync success', () => {
        const mockCategoriesArray = [
            {
                id: 1, name: 'Category 1'
            },
            {
                id: 2, name: 'Category 2'
            }
        ];

        return expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCategoriesAndDocuments), mockCategoriesArray]
            ])
            .put(fetchCategoriesSuccess(mockCategoriesArray))
            .run();
    });

    it('fetchCategoriesAsync failure', () => {
        const mockError = new Error('An error ocurred');

        return expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCategoriesAndDocuments), throwError(mockError)]
            ])
            .put(fetchCategoriesFailed(mockError))
            .run();
    });
});