// Take inspiration from this Medium Post: https://medium.com/@djoepramono/how-to-validate-javascript-object-better-with-typescript-e43314d97f9c
// Thanks Djoe Pramono I really need to study better Type Guards :)

export interface InvalidData {
    errorMessage: string;
}

export const InvalidData = class implements InvalidData {
    public constructor(public errorMessage: string) {}
}

// Invalid or T
export type InvalidOr<T> = InvalidData | T;

// Validate take a type T and return T or an InvalidData
export type Validate<T> = (t: T) => InvalidOr<T>;

// Type Guard
type IsInvalidTypeGuard<T> = (value: InvalidOr<T>) => value is InvalidData;

export const isInvalid: IsInvalidTypeGuard<{}> = (value): value is InvalidData => {
    return (value as InvalidData).errorMessage !== undefined;
}

export const checkCF = (cf: string) : InvalidOr<boolean> => {
    return cf && cf.length === 16 ? true : false;
}

export const wellFormattedCF = (cf: string): InvalidOr<boolean> => {
    var regex  = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
    return regex.test(cf);
}

export const checkLength = (value: string, min: number = 0, max: number = 0): InvalidOr<boolean>  => {
    const result = {min: min === 0 ? true : false, max: max === 0 ? true : false};
    if(value && (min === 0 || (min > 0 && value.length >= min))) {
        result.min = true;
    } else {
        result.min = false;
    }

    if(value && (max === 0 || (max > 0 && value.length <= max))) {
        result.max = true;
    } else {
        result.max = false;
    }

    return result.min && result.max;
}

export const checkMinLenght = (subject: string, length: number) : InvalidOr<boolean> => {
    return subject && subject.length >= length ? true : false;
}

