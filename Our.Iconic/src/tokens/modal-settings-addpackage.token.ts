import { UmbModalToken } from "@umbraco-cms/backoffice/modal";
import { Package } from "../models";

export type AddPackageModalData = {
    package?: Package;
}

export type AddPackageModalValue = {
    package: Package;
}

export const ICONIC_SETTINGS_ADDPACKAGE_TOKEN = new UmbModalToken<AddPackageModalData, AddPackageModalValue>('Our.Iconic.Settings.AddPackageModal', {
    modal: {
        type: 'sidebar',
        size: 'medium'
    }
});