export const updateObject = (oldObject, updatedProperty) => {
    return {
        ...oldObject,
        ...updatedProperty
    };
}

export const isInputValid = (value, validator) => {
    let isValid = true;
    if (validator) {
        if (validator.required) isValid = value.trim() !== '' && isValid;
        if (validator.maxLength) isValid = value.trim().length <= validator.maxLength && isValid;
        if (validator.minLength) isValid = value.trim().length >= validator.minLength && isValid;
    }
    return isValid;
}