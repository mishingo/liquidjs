declare const _default: {
    number_with_delimiter: (x: string) => string;
    md5: (x: string) => string;
    sha1: (x: string) => string;
    sha2: (x: string) => string;
    hmac_sha1: (x: string, secretKey: string) => string;
    base64: (x: string) => string;
    url_escape: (x: string) => string;
    url_param_escape: (x: string) => string;
    json_escape: (x: string) => string;
    property_accessor: (hash: object, key: string) => any;
};
export default _default;
