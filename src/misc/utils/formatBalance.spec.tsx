import {formatBalance, formatBalanceAlternative} from './formatBalance';

describe('Balance Formatter', () => {
    describe('Precision 12', () => {

        it.each([
                [0, "0"],
                [1, "0.000000000001"],
                [10, "0.00000000001"],
                [100, "0.0000000001"],
                [1000, "0.000000001"],
                [10000, "0.00000001"],
                [100000, "0.0000001"],
                [1000000, "0.000001"],
                [10000000, "0.00001"],
                [100000000, "0.0001"],
                [1000000000, "0.001"],
                [10000000000, "0.01"],
                [100000000000, "0.1"],
                [1000000000000, "1"],
                [1123456789012, "1"], // TODO: probably add few decimals from frac part
                [11123456789012, "11"], //TODO: decimals from frac part
                [123123456789012, "123"], //TODO: decimals too
                // Thousands
                [4123123456789012, "4,12K"],
                [4123123456789012, "4,12K"],
                [45123123456789012, "45,12K"],
                [456123123456789012, "456,12K"],
                //Millions
                [7456123123456789012, "7,45M"],
                [78456123123456789012, "78,45M"],
                [789456123123456789012, "789,45M"],
                // Billions
                [1789456123123456789012, "1,78B"],
                [12789456123123456789012, "12,78B"],
                [123789456123123456789012, "123,78B"],
                // Trillions
                [2123789456123123456789012, "2,12T"],
                [23123789456123123456789012, "23,12T"],
                [234123789456123123456789012, "234,12T"],
                // And More which are not supported - we just return MAX unit and the rest
                [5234123789456123123456789012, "5234T"],
                [56234123789456123123456789012, "56234T"],
                [567234123789456123123456789012, "567234T"],
                [5678234123789456123123456789012, "5678234T"],
                [56789234123789456123123456789012, "56789234T"],
                [567890234123789456123123456789012, "567890234T"],
                [5678901234123789456123123456789012, "5678901234T"],
                [56789012234123789456123123456789012, "56789012234T"],
                [567890123234123789456123123456789012, "567890123234T"],
                [5678901234234123789456123123456789012, "5678901234234T"],
                [56789012345234123789456123123456789012, "56789012345234T"],
                // and max u128
                [340282366920938463463374607431768211450, "340282366920938T"],
            ]
        )
        ("should convert balance to correct form", (value,expected) => {
            let precision = 12;
            let decimals = 2;
            expect(formatBalance(value, precision, decimals)).toBe(expected)
            expect(formatBalanceAlternative(value, precision, decimals)).toBe(expected)
        });
    });
});

export {}