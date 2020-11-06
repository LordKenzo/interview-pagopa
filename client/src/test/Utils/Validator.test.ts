import {checkLength} from '../../app/Utils/Validator';

describe('Utils test suite', () => {

    test('Check fixed 10 length', () => {
        const result = checkLength('0123456789', 10, 10);
        expect(result).toBe(true);
    });

    test('Check range 0-10 length', () => {
        const result = checkLength('012349', 0, 10);
        expect(result).toBe(true);
    });

    test('Check range min 80 length', () => {
        const result = checkLength('0123456789012345678901234567890123456789012345678901234567890123456789012345678901234', 80);
        expect(result).toBe(true);
    });

    test('Not in range 12-20 length', () => {
        const result = checkLength('01234567891', 12, 20);
        expect(result).toBeFalsy();
    });

    test('Not min 10 length', () => {
        const result = checkLength('0123456', 10);
        expect(result).toBeFalsy();
    });

});