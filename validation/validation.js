function delValidation() {
    document.getElementById("name").value = "";
    document.getElementById("company").value = "";
    document.getElementById("name").disabled = true;
    document.getElementById("company").disabled = true;
}

function onBlur() {

    document.getElementById("name").disabled = false;
    document.getElementById("company").disabled = false;
}