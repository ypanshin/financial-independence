export var AccountType;
(function (AccountType) {
    AccountType["mortgage"] = "mortgage";
    AccountType["tfsa"] = "tfsa";
    AccountType["rrsp"] = "rrsp";
    AccountType["nonRegistered"] = "nonRegistered";
})(AccountType || (AccountType = {}));
;
export const AccountLabel = {
    [AccountType.mortgage]: 'Mortgage',
    [AccountType.tfsa]: 'TFSA',
    [AccountType.rrsp]: 'RRSP',
    [AccountType.nonRegistered]: 'Non Registered',
};
export const AccountColor = {
    [AccountType.mortgage]: '#7189bf',
    [AccountType.tfsa]: '#df7599',
    [AccountType.rrsp]: '#ffc785',
    [AccountType.nonRegistered]: '#72d6c9',
};
