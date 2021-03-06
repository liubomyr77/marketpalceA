import { types } from "mobx-state-tree";
import { ChatModel } from './ChatModel'; 
import { asyncModel } from "../utils";
import Api from "../../api";
import {  ChatCollectionSchema } from "../schemas";


 export const ChatStore = types.model('Chat', {
    items: types.array(types.reference(ChatModel)),
    fetch: asyncModel(fetchChats),
 })
 .views(store => ({
     getById(id) {
        return store.items.find((i) =>  i.id === id);
     },
 }))
 .actions((store) => ({
    runInAction(cb) {
     cb(store);
    },
    handleMessage(message) {
         if(message.type === 'ADD') {
            const chat =  store.getById(message.message.chatId);
 
            if (typeof chat !=='undefined') {
                console.log(message.message);
                chat.messages.addMessage(message.message);         
            }
        }         
    },
 }));

 function fetchChats () {
     return async function fetchChatFlow(flow, store) {
         const res = await Api.Chats.getList();
        const result = flow.merge(res.data, ChatCollectionSchema);

        store.runInAction((self) => {
            self.items = result;
        });

     };
 }