window.onload = function() {

    Array.apply(null, document.querySelectorAll('.neon-js-border')).forEach(function(parent) {
        var neonBorder = new NeonBorder();
        neonBorder.addNeonBorder(parent);
    });

    var menuSelected = document.querySelector('.neon-left__item--selected');

    Array.apply(null, document.querySelectorAll('.neon-left-menu > li')).forEach(function(item, index) {

        item.addEventListener('click', function(event) {
            var selectedMenu = document.querySelector('.menu--selected');
            var itemHeight = parseInt(getComputedStyle(selectedMenu).height);

            selectedMenu.classList.remove('menu--selected');
            event.target.classList.add('menu--selected');
            menuSelected.style.transform = 'translate(0,' + (index * (itemHeight + 15) + 12) + 'px)';

        })

    });

    var copyButton = document.querySelector('.copy-button');

    var copyToClipboard = function(str) {
        var el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        var selected =
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)     // Store selection if found
                : false;                                    // Mark as false to know no selection existed before
        el.select();
        document.execCommand('copy');

        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
// Copy - only works as a result of a user action (e.g. click events)

    };

    function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
                copyToClipboard(rawFile.responseText)
                /*copyButton.setAttribute('data-clipboard-text', rawFile.responseText);*/
            }
        };
        rawFile.send(null);
    }



    copyButton.addEventListener('click', function(e) {
        readTextFile('../assets/image/Tastebuds.svg');
        // textArea.select();
        // document.execCommand("copy");
    })

};