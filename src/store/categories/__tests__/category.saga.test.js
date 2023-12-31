import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { call } from 'typed-redux-saga/macro';
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../category.saga';
import { CATEGORIES_ACTION_TYPES } from '../category.types';

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
});