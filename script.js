// ==UserScript==
// @name         Fix H&R stock
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofix filling various acquired date and uncheck box 5 on H&R Block
// @author       PrincipleZ
// @match        https://taxes.hrblock.com/*
// @require  	 http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/eduardolundgren/jquery-simulate/master/jquery.simulate.js
// @grant        GM_addStyle
// @run-at      document-idle
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
waitForKeyElements("#XImage241", runScript);
waitForKeyElements("#XCheckBoxNoncoveredSecurity",onPageScript);
var currentEle = 1;
function runScript(){
    'use strict';

    var hrefs = new Array();
    var elements = $("tr");
    if (currentEle < elements.length){
        let a = $(elements[currentEle]).find("div[data-header='Action']")
        console.log(currentEle);
        console.log($(elements[currentEle]));
        console.log(a);
        a.click();
    }

}

function onPageScript(){
    currentEle++;
    const checkBox = $("#XCheckBoxNoncoveredSecurity");
    console.log(checkBox.prop('checked'));
    if (checkBox.prop('checked') == "true" || checkBox.prop('checked')){
        console.log('here');
        checkBox.click();
        checkBox.trigger("click");
    }
    const dateAcqInput = $("#XFormatTextBoxDATEACQ_INPUT");
    console.log(dateAcqInput.prop('value'));
    if (dateAcqInput.prop('value') == "") {
        const dateAcqSelectInput = $("#XListBoxDATEACQ_LIST-shdo");
        console.log(dateAcqSelectInput.val());
        while(dateAcqSelectInput.val() != "Various - held short-term"){
           triggerKeyEvents("#XListBoxDATEACQ_LIST-shdo", 40, false, false);
        }
    }
    $("a[title='Next']").click();
}

function triggerKeyEvents(field, keyCode, shiftKey, ctrlKey) {

    field = $(field);

    shiftKey = Boolean(shiftKey);

    ctrlKey = Boolean(ctrlKey);



    field.simulate("keydown", { keyCode: keyCode,

                                ctrlKey: ctrlKey,

                                shiftKey: shiftKey });

//     field.simulate("keypress", { keyCode: keyCode,

//                                  ctrlKey: ctrlKey,

//                                  shiftKey: shiftKey });


    field.simulate("keyup", { keyCode: keyCode,

                              ctrlKey: ctrlKey,

                              shiftKey: shiftKey });

}
