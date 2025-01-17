﻿window.tabBlazor = {

    preventDefaultKey: (element, event, keys) => {
        element.addEventListener(event, (e) => {
            if (keys.includes(e.key)) {
                e.preventDefault();
            }
        });
    },


    navigateTable: (td, key) => {
        var tr = td.closest('tr');
        var pos = td.cellIndex;
        var moveToRow;


        if (key == 'ArrowUp') {
            moveToRow = tr.parentNode.rows[tr.rowIndex - 2];
        }
        else if (key == 'ArrowDown') {
            moveToRow = tr.parentNode.rows[tr.rowIndex];
        }
        else {
            moveToRow = tr;
        }

        if (!moveToRow) {
            return;
        }

        if (key == 'ArrowLeft') {
            pos = pos - 1;
        }
        else if (key == 'ArrowRight') {
            pos = pos + 1;
        }

        var moveToCell = moveToRow.cells[pos];
        if (!moveToCell) {
            return;
        }

        var focusElement = Array.from(moveToCell.getElementsByTagName("*")).find(x => x.tabIndex >= 0);

        if (focusElement) {
            focusElement.focus();
            if (focusElement.select) {
                focusElement.select();
            }
        }
        else {
            //Try next
            window.tabBlazor.navigateTable(moveToCell, key);
        }
    },

    scrollToFragment: (elementId) => {
        var element = document.getElementById(elementId);

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    },

    showPrompt: (message, defaultValue) => {
        return prompt(message, defaultValue);
    },

    showAlert: (message) => {
        return alert(message);
    },

    windowOpen: (url, name, features, replace) => {
        window.open(url, name, features, replace);
        return "";
    },

    redirect: (url) => {
        window.open(url);
        return "";
    },

    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text)
    },

    disableDraggable: (container, element) => {

        element.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            container['draggable'] = false;
        });

        element.addEventListener("mouseup", (e) => {
            container['draggable'] = true;
        });

        element.addEventListener("mouseleave", (e) => {
            container['draggable'] = true;
        });
    },

    setPropByElement: (element, property, value) => {
        element[property] = value;
        return "";
    },



    clickOutsideHandler: {
        addEvent: function (elementId, dotnetHelper) {
            window.addEventListener("click", (e) => {
                var element = document.getElementById(elementId);
                if (e != null && element != null) {
                    if (e.target.isConnected == true && e.target !== element && (!element.contains(e.target))) {
                        dotnetHelper.invokeMethodAsync("InvokeClickOutside");
                    }
                }
            });
        }
    }
}
