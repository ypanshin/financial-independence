export declare const getInvestmentGuideValueConstraints: (presence?: boolean) => {
    amount: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
        };
    };
    investmentHorizon: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            onlyInteger: boolean;
            greaterThan: number;
            lessThan: number;
        };
    };
    marginalTaxRate: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
            lessThan: number;
        };
    };
    horizonMarginalTaxRate: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
            lessThan: number;
        };
    };
    horizonEffectiveTaxRate: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
            lessThan: number;
        };
    };
    inflationRate: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
            lessThan: number;
        };
    };
    mortgageRate: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
            lessThan: number;
        };
    };
    mortgageBalance: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
        };
    };
    mortgageAmortization: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            onlyInteger: boolean;
            greaterThan: number;
            lessThan: number;
        };
    };
    investmentRate: {
        presence: {
            allowEmpty: boolean;
        };
        numericality: {
            greaterThan: number;
            lessThan: number;
        };
    };
    mortgage: {
        accounts: {};
    };
    nonRegistered: {
        accounts: {};
    };
    rrsp: {
        accounts: {};
    };
    tfsa: {
        accounts: {};
    };
};
