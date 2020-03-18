import * as ActionTypes from './action-types';
import UsersFunctionsService from '../../../services/users-functions';
import ChatService from '../../../services/chats';
import firebase from 'firebase';
import { Message } from '../../../models/Message';
import Notifications from '../../../services/toast-notification';

export const addContactRequest = () => ({
    type: ActionTypes.ADD_CONTACT_REQUEST
});

export const addContactSuccess = () => ({
    type: ActionTypes.ADD_CONTACT_SUCCESS,
});

export const addContactFailed = () => ({
    type: ActionTypes.ADD_CONTACT_FAILED,
});

export const fetchChats = chats => async (dispatch, getState) => {
    const { auth: { currentUser } } = getState();
};

export const fetchChatsRequest = () => ({
    type: ActionTypes.FETCH_CHATS_REQUEST
});

export const fetchChatsSuccess = chats => ({
    type: ActionTypes.FETCH_CHATS_SUCCESS,
    payload: chats
});

export const fetchChatsFailed = () => ({
    type: ActionTypes.FETCH_CHATS_FAILED
});

export const searchContact = searchValue => ({
    type: ActionTypes.SEARCH_CONTACT,
    payload: searchValue
});

export const fetchMesssagesRequest = chatId => ({
    type: ActionTypes.FETCH_MESSAGES_REQUEST,
    payload: chatId
});

export const fetchMessagesSuccess = ({ messages, chatId }) => ({
    type: ActionTypes.FETCH_MESSAGES_SUCCESS,
    payload: { messages, chatId }
});

export const fetchMessagesFailed = chatId => ({
    type: ActionTypes.FETCH_MESSAGES_FAILED,
    payload: chatId
});

export const subscribeChats = userId => async dispatch => {
    ChatService.subscribeToChatsList(userId, async chatIds => {
        dispatch(fetchChatsRequest());
        try {
            const chatsPromises = chatIds
                .map(id => ChatService.getChatById(id));

            const chatsDocs = await Promise.all(chatsPromises);

            const chats = chatsDocs
                .filter(chatDoc => chatDoc.exists)
                .map(chatDoc => ({ ...chatDoc.data(), id: chatDoc.id}) );


            const usersPromises = chats
                .flatMap(chat => chat.userIds)
                .filter(id => id !== userId)
                .map(userId => UsersFunctionsService.getUserById(userId));

            const users = await Promise.all(usersPromises);

            users.forEach(user => {
                user.name = user.name || 'No name';
            });

            const imgPromises = users.map(user => {
                const { photoURL } = user;
                if (!photoURL) return null;

                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(photoURL);
                return imageRef.getDownloadURL();
            });

            const imgs = await Promise.all(imgPromises);
            dispatch(fetchChatsSuccess(users.map(
                (user, index) => ({
                    ...user,
                    photoURL: imgs[index],
                    chatId: chats.find(chat => chat.userIds.includes(user.id)).id
                }))));
        } catch (e) {
            Notifications.showError('Failed to fetch chats');
            dispatch(fetchChatsFailed());
        }
    });
};

export const unsubscribeChats = () => {
    return () => ChatService.unsubscribeFromChatsList();
};

export const addContactByPhoneNumber = phoneNumber => async (dispatch, getState) => {
    dispatch(addContactRequest());

    try {
        const otherUser = await UsersFunctionsService.getUserByPhoneNumber(phoneNumber);

        const { auth: { currentUser } } = getState();

        const exists = await ChatService.hasChatWith(currentUser.uid, otherUser.id);
        if (exists) {
            Notifications.showWarning('You have this contact already');
            dispatch(addContactFailed());
            return;
        }

        const newChat = await ChatService.newChat([currentUser.uid, otherUser.id]);

        await Promise.all([
            ChatService.addChatToUser(currentUser.uid, newChat.id),
            ChatService.addChatToUser(otherUser.id, newChat.id)
        ]);
        dispatch(addContactSuccess());
        Notifications.showSuccess('You have added a new contact');
    } catch (e) {
        dispatch(addContactFailed());
        Notifications.showError('Failed to add contact');
    }
};

export const sendMessage = ({ chatId, messageText }) => async (dispatch, getState) => {

    const { auth: { currentUser } } = getState();

    const message = new Message(currentUser.uid, messageText);

    await ChatService.sendMessage(chatId, message);
};

export const subscribeToMessages = chatId => dispatch => {
    dispatch(fetchMesssagesRequest(chatId));
    try {
        ChatService.subscribeToMessages(chatId, messages => {
            dispatch(fetchMessagesSuccess({ chatId, messages }));
        });
    }
     catch (e) {
        Notifications.showError('Failed to load messages');
        dispatch(fetchMessagesFailed(chatId));
    }
};

export const unsubscribeFromMessages = () => {
    return () => ChatService.unsubscribeFromMessagesList();
};
