import { createSelector } from 'reselect';

const getContacts = state => state.list;

const getSearchValue = state => state.searchValue;

const getSearchedContacts = createSelector(
    [getContacts, getSearchValue],
    (contacts, searchValue) => {
        return contacts.filter(contact =>
            contact.name && contact
                .name
                .toLowerCase()
                .startsWith(searchValue.toLowerCase())
        )
    }
);

export const makeGetSearchedContacts = () => getSearchedContacts;

export const makeGetMessages = chatId => {
    console.log(chatId);
    return () => {
        const getMessagesByChatId = state => state[chatId];

        const getMessages = createSelector(
            [getMessagesByChatId], messages => messages
        );

        return getMessages;
    };
};




