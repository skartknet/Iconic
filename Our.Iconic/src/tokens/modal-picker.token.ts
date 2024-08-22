import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export type MyModalData = {
    headline: string;
}

export type MyModalValue = {
    myData: string;
}

export const ICONIC_MODALPICKER_TOKEN = new UmbModalToken<MyModalData, MyModalValue>('Our.Iconic.ModalPicker', {
    modal: {
        type: 'sidebar',
        size: 'small'
    }
});