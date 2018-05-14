import MessageViewModel from "../viewmodels/MessageViewModel";
import MessagesViewModel from "../viewmodels/MessagesViewModel";
import ErrorViewModel from "../viewmodels/error/ErrorViewModel";
import ChatService from "../services/ChatService";

import * as chatPayloads from "../payloads/ChatPayloads";
import MessagesModel from "../models/MessagesModel";
import MessageModel from "../models/MessageModel";


export default class ChatManager {

    service: ChatService;

    constructor() {
        this.service = new ChatService();
    }

    async fetchMessages(
        payload: chatPayloads.fetchChatMessagesPayloadType
    ): Promise<MessagesViewModel | ErrorViewModel> {

        let response = await this.service.fetchMessages(payload);
        var viewModel: MessagesViewModel | ErrorViewModel = null;

        if (response instanceof MessagesModel) {
            viewModel = new MessagesViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }

        return viewModel;
    }

    async sendMessage(
        payload: chatPayloads.sendChatMessagePayloadType
    ): Promise<MessageViewModel| ErrorViewModel> {

       let response = await this.service.sendMessage(payload);
        var viewModel: MessageViewModel | ErrorViewModel = null;

        if (response instanceof MessageModel) {
            viewModel = new MessageViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }

        return viewModel;
    }



}