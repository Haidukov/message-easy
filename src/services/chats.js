import * as firebase from 'firebase';
import BaseRepository from './base-repository';

class ChatsService extends BaseRepository {
    getChatById(id) {
        return this.db.collection('chats').doc(id).get();
    }

    async newChat(userIds) {
        const newChat =  await this.db.collection('chats').add({
            userIds
        });
        this.db.collection('chats').doc(newChat.id).collection('messages');
        return newChat;
    }

    subscribeToChatsList(userId, callback) {
         const query = this.db
             .collection('users')
             .doc(userId);
         this._unsubscribeChatsList = query.onSnapshot(snapshot => {
             const data = snapshot.data();
             const chats = data ? data.chats : [];
             callback(chats);
         });
    }

    unsubscribeFromChatsList() {
        this._unsubscribeChatsList && this._unsubscribeChatsList();
    }

    async hasChatWith(userId, otherId) {
        const chats = await this.db
            .collection('chats')
            .where('userIds', 'array-contains', userId)
            .get();
        let result;
        chats.forEach(chat => {
            const { userIds } = chat.data();
            result = userIds && userIds.includes(otherId);
        });
        return result;
    }

    addChatToUser(userId, chatId) {
        return this.db.collection('users').doc(userId).set({
            chats: firebase.firestore.FieldValue.arrayUnion(chatId)
        }, { merge: true });
    }

    async sendMessage(chatId, message) {
        if (message.content) {
            await this.db
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add({ ...message, timestamp: this.getTimestamp() });
        }
    }

    subscribeToMessages(chatId, callback) {
        const query = this.db
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp');
        this._unsubscribeMessages = query.onSnapshot(snapshot => callback(snapshot.docs.map(doc => doc.data())));
    }

    unsubscribeFromMessagesList() {
        this._unsubscribeMessages && this._unsubscribeMessages();
    }
}

export default new ChatsService();
