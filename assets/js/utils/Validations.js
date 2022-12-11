const NAMES = 'áéíóúÁÉÍÓÚabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ. ';

const ALPHANUMERIC = 'abcdefghijklmnñopqrstuvwxyzáéíóúÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789@._, ';
const TEXT = '0123456789áéíóúÁÉÍÓÚabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ.,;()\'\'- #/ ';
const DIGITS = '0123456789';
const TEL = '0123456789-()';
const NUMBERS = '0123456789.';

setInputs();

function setInputs() {
    let attribute = ['onkeyup', 'onkeypress', 'onkeydown'];
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++)
        for (let j = 0; j < attribute.length; j++)
            inputs[i].setAttribute(attribute[j], 'this.value = remove(this.value, this.name)');
}

function remove(value, inputName) {
    let VALIDATE_TO = '';
    let output = '';
    switch (inputName) {
        case 'received_by':
        case 'name':
        case 'owner':
        case 'first_surname':
        case 'second_surname':
        case 'nombreU':
        case 'paternoU':
        case 'maternoU':
            VALIDATE_TO = NAMES;
            break;

        case 'address':
        case 'emailU':
            VALIDATE_TO = ALPHANUMERIC;
            break;

        case '':

            VALIDATE_TO = TEXT;
            break;

        case 'inpQuantity':
        case 'phone':
        case 'phoneU':
        case 'zipcode':
            VALIDATE_TO = DIGITS;
            break;

        case '':
            VALIDATE_TO = TEL;
            break;

        case 'price':
            VALIDATE_TO = NUMBERS;
            break;
    }

    for (let i = 0; i < value.length; i++)
        if (VALIDATE_TO.indexOf(value.charAt(i)) !== -1)
            output += value.charAt(i);
    return output;
}