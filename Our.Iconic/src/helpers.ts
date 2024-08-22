function isExternalUri(uri: string): boolean {
    return uri.indexOf("://") > -1;
}


export { isExternalUri };


