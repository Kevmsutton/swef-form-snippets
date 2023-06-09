var flow_fields = [
        'cf_942[]',
        'cf_944[]',
        'cf_946[]',
        'cf_948[]',
        'company',
        'cf_950',
        'cf_952',
        'cf_954',
        'cf_1028',
        'cf_956',
        'cf_958',
        'cf_960',
        'cf_962',
        'cf_964',
        'cf_966',
        'cf_1022',
        'cf_968',
        'cf_970',
        'cf_1044',
        'cf_972',
        'cf_974'
    ]

    function resetFlow() {
        var fields = flow_fields;
        for (var i = 0; i < fields.length; i++) {
            var input = document.querySelector('[name="' + fields[i] + '"]');
            if (input) {
                disableInput(input);
            }
        }
    }

    function enableInput(input) {
        input.parentNode.parentNode.classList.remove('hide__field');
        input.removeAttribute('disabled');
    }

    function disableInput(input) {
        input.parentNode.parentNode.classList.add('hide__field');
        input.setAttribute('disabled', 'disabled');
    }

    function generalListener() {
        var next = this.parentNode.parentNode.nextElementSibling;
        if (this.name == 'cf_940') {
            removeAllEvets();
            // resetFlow();

            if (this.value == 'No') {
                flow1();
            } else {
                flow2();
            }
            return;
        }

        if(this.name === "cf_938[]") {
            if(this.value !== "Other") {
                disableInput(document.querySelector('[name="cf_1024"]'));
                next = next.nextElementSibling
            }
        }

        if (next) {
            next.classList.remove('hide__field');
            var input = next.querySelector('input, select, textarea');
            if (input) {
                input.removeAttribute('disabled');
            }
        }
    }

    function removeAllEvets() {
        var inputs = document.querySelectorAll('input, select, textarea');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeEventListener('change', generalListener);
        }
    }

    function flow1() {

        var fields = [
            'cf_942[]',
            'cf_944[]',
            'cf_946[]',
            'cf_948[]',
            'cf_1026',
        ]

        var input = document.querySelector('[name="cf_942[]"]');
        enableInput(input);

        for (var i = 0; i < fields.length; i++) {
            var input = document.querySelector('[name="' + fields[i] + '"]');
            if (input) {
                input.setAttribute('next-pos', i + 1);
                input.addEventListener('change', function () {
                    var pos = this.getAttribute('next-pos');
                    var next = document.querySelector('[name="' + fields[pos] + '"]')

                    if (this.name == 'cf_946[]') {
                        if (this.value == 'Yes') {
                            enableInput(next);
                        } else {
                            disableInput(next);
                        }
                        return;
                    }

                    if(this.name === "cf_948[]") {
                        if(this.value !== "Other") {
                            disableInput(document.querySelector('[name="cf_1026"]'));
                            next = next.nextElementSibling
                        }
                    }

                    enableInput(next);
                });
            }
        }

    }

    function flow2() {
        var fields = [
            'company',
            'cf_950',
            'cf_952',
            'cf_954',
            'cf_1028',
            'cf_956',
            'cf_958',
            'cf_960',
            'cf_962',
            'cf_964',
            'cf_966',
            'cf_1022',
            'cf_968',
            'cf_970',
            'cf_1044',
            'cf_972',
            'cf_974'
        ];

        var input = document.querySelector('[name="company"]');
        enableInput(input);
        disableInput(document.querySelector('[name="cf_942[]"]'));
        disableInput(document.querySelector('[name="cf_948[]"]'));

        for (var i = 0; i < fields.length; i++) {
            var input = document.querySelector('[name="' + fields[i] + '"]');
            if (input) {
                input.setAttribute('next-pos', i + 1);
                input.addEventListener('change', function () {
                    var pos = this.getAttribute('next-pos');

                    if (this.name == "cf_968" && this.value == "No") {
                        disableInput(document.querySelector('[name="cf_970"]'));
                        disableInput(document.querySelector('[name="cf_1044"]'));
                        pos++;
                    }

                    if (this.name == "cf_970" && this.value != "Other") {
                        disableInput(document.querySelector('[name="cf_1044"]'));
                        pos++;
                    }

                    if(this.name === "cf_954") {
                        if(this.value != "Other") {
                            disableInput(document.querySelector('[name="cf_1028"]'));
                            pos++;
                        }
                    }

                    var next = document.querySelector('[name="' + fields[pos] + '"]')

                    if (next) {
                        enableInput(next);
                    }
                });
            }
        }
    }


    var inputs = document.querySelectorAll('input, select, textarea');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', generalListener);
    }

    window.onload = function () {
        var N = navigator.appName,
            ua = navigator.userAgent,
            tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, "-?"];
        var browserName = M[0];
        var form = document.getElementById("__vtigerWebForm"),
            inputs = form.elements;
        form.onsubmit = function () {
            var required = [],
                att, val;
            for (var i = 0; i < inputs.length; i++) {
                att = inputs[i].getAttribute("required");
                val = inputs[i].value;
                type = inputs[i].type;
                if (type == "email") {
                    if (val != "") {
                        var elemLabel = inputs[i].getAttribute("label");
                        var emailFilter = /^[_/a-zA-Z0-9]+([!"#$%&()*+,./:;<=>?\^_`{|}~-]?[a-zA-Z0-9/_/-])*@[a-zA-Z0-9]+([\_\-\.]?[a-zA-Z0-9]+)*\.([\-\_]?[a-zA-Z0-9])+(\.?[a-zA-Z0-9]+)?$/;
                        var illegalChars = /[\(\)\<\>\,\;\:\"\[\]]/;
                        if (!emailFilter.test(val)) {
                            alert("For " + elemLabel + " field please enter valid email address");
                            return false;
                        } else if (val.match(illegalChars)) {
                            alert(elemLabel + " field contains illegal characters");
                            return false;
                        }
                    }
                }
                if (att != null) {
                    if (val.replace(/^\s+|\s+$/g, "") == "") {
                        required.push(inputs[i].getAttribute("label"));
                    }
                }
            }
            if (required.length > 0) {
                alert("The following fields are required: " + required.join());
                return false;
            }
            var numberTypeInputs = document.querySelectorAll("input[type=number]");
            for (var i = 0; i < numberTypeInputs.length; i++) {
                val = numberTypeInputs[i].value;
                var elemLabel = numberTypeInputs[i].getAttribute("label");
                if (val != "") {
                    var intRegex = /^[+-]?\d+$/;
                    if (!intRegex.test(val)) {
                        alert("For " + elemLabel + " field please enter valid number");
                        return false;
                    }
                }
            }
            var dateTypeInputs = document.querySelectorAll("input[type=date]");
            for (var i = 0; i < dateTypeInputs.length; i++) {
                dateVal = dateTypeInputs[i].value;
                var elemLabel = dateTypeInputs[i].getAttribute("label");
                if (dateVal != "") {
                    var dateRegex = /^[1-9][0-9]{3}-(0[1-9]|1[0-2]|[1-9]{1})-(0[1-9]|[1-2][0-9]|3[0-1]|[1-9]{1})$/;
                    if (!dateRegex.test(dateVal)) {
                        alert("For " + elemLabel + " field please enter valid date in required format");
                        return false;
                    }
                }
            }
            var inputElems = document.getElementsByTagName("input");
            var totalFileSize = 0;
            for (var i = 0; i < inputElems.length; i++) {
                if (inputElems[i].type.toLowerCase() === "file") {
                    var file = inputElems[i].files[0];
                    if (typeof file !== "undefined") {
                        var totalFileSize = totalFileSize + file.size;
                    }
                }
            }
            if (totalFileSize > 52428800) {
                alert("Maximum allowed file size including all files is 50MB.");
                return false;
            }
        };
    }
