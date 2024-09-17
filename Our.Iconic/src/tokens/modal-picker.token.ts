import { UmbModalToken } from "@umbraco-cms/backoffice/modal";
import { Icon, Package } from "../models";

export type ModalPickerData = {
    packages?: Package[];

    // Indicates whether the icons to display are from the filtered ones or all the icons in the package.
    showFilteredOnly?: boolean;
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