import { createSelector } from 'reselect';

export function getUser(state) {
    return state.user;
}

export function getAdmin(state) {
    return state.admin;
}

export const getToken = createSelector(getUser, (user) => user && user.token);

export const getIdentity = createSelector(getUser, (user) => user && user.identity);

export const getAdminToken = createSelector(getAdmin, (admin) => admin && admin.hash);


export default {
    getToken,
    getIdentity,
    getAdminToken
}
