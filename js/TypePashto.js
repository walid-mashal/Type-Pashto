/*
Auto Type Pashto
Version: 1.0
This Javascript module is developed to ease typing pashto in web forms without the need to change the system language or where
there is no Pashto Keyboard installed on a PC. This module assumes the keyboard structure as that of the built-in Pashto keyboard 
added to linux, windows and other Operating Systems.
*/

let shiftIsPressed = false;
let ctrlIsPressed = false;

const pashtoKeyboard = {
    pashtoCodeMap: {
        '104': 'ا', 'shift+71': 'أ', '102': 'ب', 'shift+70': 'پ', 'shift+72': 'آ', 
        'shift+76': 'ة', 'shift+78': 'ډ', '106': 'ت','shift+74': 'ټ', '101': 'ث', 
        '91': 'ج', '112': 'ح', '105': 'ه', '111': 'خ', 'shift+80': 'څ', 'shift+90': 'ئ',
        'shift+86': 'ء', 'shift+79': 'ځ', '93': 'چ', '110': 'د', '98': 'ذ', '118': 'ر',
        '99': 'ز', 'shift+67': 'ژ', '109': 'ړ', 'shift+77': 'ؤ', '44': 'و', '115': 'س',
        '97': 'ش', 'shift+65': 'ښ', '119': 'ص', '113': 'ض', 'shift+88': 'ې', '122': 'ظ',
        '117': 'ع', '121': 'غ', '116': 'ف', '114': 'ق', '59': 'ک', '39': 'ګ', '108': 'م',
        '107': 'ن', 'shift+75': 'ڼ', '103': 'ل', '100': 'ی', 'shift+83': 'ۍ', 'shift+68': 'ي',
        '120': 'ط', '32': ' ', '49': '۱', '50': '۲', '51': '۳','52': '۴', '53': '۵', 
        '54': '۶', '55': '۷', '56': '۸', '57': '۹', '48': '۰', ',': ',', '-': '-',
    },

    init() {
        const elements = document.querySelectorAll('input[type="text"][lang="ps-af"], textarea[lang="ps-af"], div[contenteditable="true"][lang="ps-af"]');
        elements.forEach((element) => this.bindPashtoTyping(element));
    },

    bindPashtoTyping(element) {
        element.style.textAlign = 'right';
        element.style.direction = 'rtl';

        element.addEventListener('keypress', (e) => this.handleKeyPress(e, element));
        element.addEventListener('keydown', this.handleKeyDown);
        element.addEventListener('keyup', this.handleKeyUp);
    },

    handleKeyDown(e) {
        if (e.key === 'Shift') shiftIsPressed = true;
        if (e.ctrlKey) ctrlIsPressed = true;
    },

    handleKeyUp(e) {
        if (e.key === 'Shift') shiftIsPressed = false;
        if (!e.ctrlKey) ctrlIsPressed = false;
    },

    handleKeyPress(e, element) {
        if (!ctrlIsPressed) {
            const keyCode = e.charCode || e.keyCode;
            const keyStr = shiftIsPressed ? 'shift+' + keyCode : keyCode.toString();
            const pashtoChar = this.pashtoCodeMap[keyStr];

            if (pashtoChar) {
                this.insertTextAtCaret(element, pashtoChar);
                e.preventDefault();
            }
        }
    },

    insertTextAtCaret(element, char) {
        if (!element.isContentEditable) {
            const { selectionStart, selectionEnd, value } = element;
            element.value = value.slice(0, selectionStart) + char + value.slice(selectionEnd);
            element.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else {
            const sel = window.getSelection();
            const { anchorOffset, focusOffset } = sel;
            const content = element.textContent;
            element.textContent = content.slice(0, anchorOffset) + char + content.slice(focusOffset);

            const range = document.createRange();
            range.setStart(element.firstChild, anchorOffset + 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
};

window.addEventListener('load', pashtoKeyboard.init.bind(pashtoKeyboard));
