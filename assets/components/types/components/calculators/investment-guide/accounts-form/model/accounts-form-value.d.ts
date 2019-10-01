export interface IAccountsFormValue {
    /**
     * The flag enables mortgage account.
     */
    mortgage?: boolean;
    /**
     * The flag enables TFSA account.
     */
    tfsa?: boolean;
    /**
    * The flag enables RRSP account.
    */
    rrsp?: boolean;
    /**
    * The flag enables Non Registered account.
    */
    nonRegistered?: boolean;
}
export declare enum AccountsFormValueKey {
    mortgage = "mortgage",
    tfsa = "tfsa",
    rrsp = "rrsp",
    nonRegistered = "nonRegistered"
}
