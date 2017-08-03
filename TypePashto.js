/*
Pashto Keyboard
Version: 1.0
This Javascript module is developed to ease typing pashto in web forms without the need to change the system language or where
there is no Pashto Keyboard installed on a PC.
*/

var shift_is_pressed = false;
var ctrl_is_pressed = false;

var pashto_keyboard = {
    // pashto keyboard map based on Afghanistan Official Pashto Keyboard Layout
    pashto_code_and_characters: {
		'104':'ا',
		'102':'ب',
		'shift+70':'پ',
		'106':'ت',
		'shift+74':'ټ',
		'101':'ث',
		'91':'ج',
		'112':'ح',
		'105':'ه',
		'111':'خ',
		'shift+80':'څ',
		'shift+79':'ځ',
		'93':'چ',
		'110':'د',
		'98':'ذ',
		'118':'ر',
		'99':'ز',
		'shift+67':'ژ',
		'shift+77':'ړ',
		'44':'و',
		'115':'س',
		'97':'ش',
		'shift+65':'ښ',
		'119':'ص',
		'113':'ض',
		'shift+88':'ط',
		'122':'ظ',
		'117':'ع',
		'121':'غ',
		'116':'ف',
		'114':'ق',
		'59':'ک',
		'39':'ګ',
		'108':'م',
		'107':'ن',
		'shift+75':'ڼ',
		'103':'ل',
		'100':'ی',
		'shift+83':'ۍ',
		'shift+68':'ي',
		'120':'ې',
		'32':' ',
        '49':'۱',
        '50':'۲',
        '51':'۳',
        '52':'۴',
        '53':'۵',
        '54':'۶',
        '55':'۷',
        '56':'۸',
        '57':'۹',
        '48':'۰',
        ',':',',
        '-':'-',
    },
}

pashto_keyboard.init = function () {
    var Inputs = document.getElementsByTagName('INPUT');
    for (var i = 0; i < Inputs.length; i++) {
        if (Inputs[i].type.toLowerCase() == 'text' && (Inputs[i].lang.toLowerCase() == 'ps-af')) {
            new pashto_keyboard.KeyObject(Inputs[i]);
        }
    }
}

pashto_keyboard.key_downed = function(e){
    if (e.key == 'Shift')
        shift_is_pressed = true;
    
    if (e.ctrlKey)
        ctrl_is_pressed = true;
}

pashto_keyboard.key_up = function(e){
    if (e.key == 'Shift')
        shift_is_pressed = false;

    if (e.ctrlKey)
        ctrl_is_pressed = false;
}

pashto_keyboard.KeyObject = function (input) {
    input.pashto = true;

    input.style.textAlign = "right";;
    input.style.direction = "rtl";;

    Convert = function (e) {
        if (!ctrl_is_pressed)
        {
            if (e == null)
                e = window.event;

            var eElement = e.target || e.originalTarget || e.srcElement;
            var key_code = e.charCode.toString();
            var pashto_char = null;

            if (shift_is_pressed)
                pashto_char = pashto_keyboard.pashto_code_and_characters["shift+"+key_code];
            else
                pashto_char = pashto_keyboard.pashto_code_and_characters[key_code];
            
            if (pashto_char != undefined) 
            {
                var text = $(eElement).val();
                text = text.slice(0, eElement.selectionStart) + pashto_char + text.slice(eElement.selectionEnd);
                var index = eElement.selectionStart;
                $(eElement).val(text)
                eElement.selectionStart = eElement.selectionEnd = index + 1;

                if (e.preventDefault)
                    e.preventDefault();

                e.returnValue = false;
            }
            return true;
        }
    }

    input.onkeypress = Convert;
    input.onkeydown = pashto_keyboard.key_downed;
    input.onkeyup = pashto_keyboard.key_up;
}

if (window.attachEvent) {
    window.attachEvent('onload', pashto_keyboard.init)
} else if (window.addEventListener) {
    window.addEventListener('load', pashto_keyboard.init, false)
}
