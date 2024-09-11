import { UmbModalToken } from "@umbraco-cms/backoffice/modal";
import { Icon, Package } from "../models";

export type ModalPickerData = {
    packages?: Package[];
}

export type ModalPickerValue = {
    value?: Icon;
}

export const ICONIC_MODALPICKER_TOKEN = new UmbModalToken<ModalPickerData, ModalPickerValue>('Our.Iconic.ModalPicker', {
    modal: {
        type: 'sidebar',
        size: 'small'
    }
});