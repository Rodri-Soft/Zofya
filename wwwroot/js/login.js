var urlServer = "https://localhost:7004";


$("#register-link").click(function (event) {
    $("#pills-register").addClass("show");
    $("#pills-register").addClass("active");

    $("#pills-login").removeClass("show");
    $("#pills-login").removeClass("active");

    $("#tab-register").addClass("active");
    $("#tab-register").attr("aria-selected", "true");

    $("#tab-login").removeClass("active");
    $("#tab-login").attr("aria-selected", "false");
});

function addCustomer() {

    var registerFullname = $("#validationCustom-register-fullname").val();
    var registerPhone = $("#validationCustom-register-phone").val();
    var registerEmail = $("#validationCustom-register-email").val();
    var registerPassword = $("#validationCustom-register-password").val();
    var registerRePassword = $("#validationCustom-register-repassword").val();    
    var registerAgree = $('#registerCheck').prop('checked');

    registerAgree = String(registerAgree);

    var customer = {

        "email": registerEmail,
        "fullname": registerFullname,
        "password": registerPassword,
        "rePassword": registerRePassword,
        "phone": registerPhone,
        "agree" : registerAgree               
    };    

    $.ajax({

        method: "POST",
        url: urlServer+"/Login",
        cache: false,
        processData: false,
        contentType: "application/json",                    
        data: JSON.stringify(customer)

    }).done(function (data) {
        
        if(data.correct){

            var successMessages = data.message;
            showAlert(successMessages, false);

            var fields = ["email", "fullname", "password", "rePassword", "phone", "agree"];
            showCorrectFields(fields);

            $("#validationCustom-register-fullname").val("");
            $("#validationCustom-register-fullname").removeClass("active");
            $("#validationCustom-register-fullname").removeClass("is-valid");

            $("#validationCustom-register-phone").val("");
            $("#validationCustom-register-phone").removeClass("active");
            $("#validationCustom-register-phone").removeClass("is-valid");

            $("#validationCustom-register-email").val("");
            $("#validationCustom-register-email").removeClass("active");
            $("#validationCustom-register-email").removeClass("is-valid");
            
            $("#validationCustom-register-password").val("");
            $("#validationCustom-register-password").removeClass("active");
            $("#validationCustom-register-password").removeClass("is-valid");

            $("#validationCustom-register-repassword").val("");              
            $("#validationCustom-register-repassword").removeClass("active");              
            $("#validationCustom-register-repassword").removeClass("is-valid");              
            
        } else {            
            
            var errorMessages = data.message;
            var errorFields = data.field;
            
            showAlert(errorMessages, true);            
            showMistakesField(errorFields);
                                            
        }

    }).fail( function( jqXHR, textStatus, errorThrown) {

        var errorMessages = [];

        if (jqXHR.status === 0) {
            
            var message = 'Not connect: Verify Network.';
            console.error(message);
            errorMessages.push(message);
            showAlert(errorMessages);
    
        } else if (jqXHR.status == 404) {
            
            var message = 'Requested page not found [404]';
            console.error(message);
            errorMessages.push(message);
            showAlert(errorMessages);
    
        } else if (jqXHR.status == 500) {
    
            var message = 'Internal Server Error [500].';
            console.error(message);
            errorMessages.push(message);
            showAlert(errorMessages);
    
        } else if (textStatus === 'parsererror') {
    
            var message = 'Requested JSON parse failed.';
            console.error(message);
            errorMessages.push(message);
            showAlert(errorMessages);
    
        } else if (textStatus === 'timeout') {
    
            var message = 'Time out error.';
            console.error(message);
            errorMessages.push(message);
            showAlert(errorMessages);
    
        } else if (textStatus === 'abort') {
    
            var message = 'Ajax request aborted.';
            console.error(message);
            errorMessages.push(message);
            showAlert(errorMessages);
    
        } else {
            
            var message = 'Uncaught Error: ' + jqXHR.responseText;
            console.error(message);            
    
        }            
        
    });
    
}

async function showAlert(errorMessages, isErrorAlert) {

    const registerForm = $("#form-register");
    var alerts = [];

    if(isErrorAlert){
        document.getElementById("button-addCustomer").setAttribute("disabled", "");        
    }

    errorMessages.forEach(message => {
                
        const alert = document.createElement('DIV');
        alert.textContent = message;
        alert.classList.add('alert');
        if(isErrorAlert){            
            alert.classList.add('alert-danger');
        }else{
            alert.classList.add('alert-success');
        }
        
        registerForm.append(alert);

        alerts.push(alert);

    });

    try {             

        const result = await Promise.all([removeAlerts(alerts), enableRegisterButton(isErrorAlert)]);        

    } catch (e) {
        console.error(e);
    }    

}

function removeAlerts(alerts) {

    setTimeout(() => {

        alerts.forEach(alert => {
            alert.remove();
        });                       

    }, 5000);  
}

function enableRegisterButton(isErrorAlert) {
    if(isErrorAlert){
        setTimeout(() => {

            document.getElementById("button-addCustomer").removeAttribute("disabled");                            
    
        }, 2500);  
    }
}

function showMistakesField(errorFields) {        
    
    var fields = ["email", "fullname", "password", "rePassword", "phone", "agree"];

    //Show fields with errors    
    errorFields.forEach(field => {

        switch (field) {

            case 'email':

                $("#validationCustom-register-email").removeClass("is-valid");                                            
                $("#validationCustom-register-email").addClass("is-invalid");
                                    
                var fieldIndex = fields.findIndex(f => f === 'email');                    
                fields.splice(fieldIndex, 1);                    

                break;  

            case 'rePassword': 

                $("#validationCustom-register-repassword").removeClass("is-valid");
                $("#validationCustom-register-repassword").addClass("is-invalid");

                var fieldIndex = fields.findIndex(f => f === 'rePassword');
                fields.splice(fieldIndex, 1);

                break;

            case 'agree':

                $("#registerCheck").removeClass("is-valid");
                $("#registerCheck").addClass("is-invalid");

                var fieldIndex = fields.findIndex(f => f === 'agree');
                fields.splice(fieldIndex, 1);

                break;
            
            default:               
                break;
        }                
    });   
       

    showCorrectFields(fields);

}

function showCorrectFields(fields) {


    // Show fields without errors
    fields.forEach(field => {

        switch (field) {

            case 'email':
                $("#validationCustom-register-email").removeClass("is-invalid");                                            
                $("#validationCustom-register-email").addClass("is-valid");                

                break;  

            case 'rePassword': 
                $("#validationCustom-register-repassword").removeClass("is-invalid");
                $("#validationCustom-register-repassword").addClass("is-valid");               

                break;
            
            case 'fullname':
                $("#validationCustom-register-fullname").removeClass("is-invalid");
                $("#validationCustom-register-fullname").addClass("is-valid");               

                break;

            case 'password':
                $("#validationCustom-register-password").removeClass("is-invalid");
                $("#validationCustom-register-password").addClass("is-valid");     
                
                break;

            case 'phone':
                $("#validationCustom-register-phone").removeClass("is-invalid");
                $("#validationCustom-register-phone").addClass("is-valid");     
                
                break;

            case 'agree':
                $("#registerCheck").removeClass("is-invalid");
                $("#registerCheck").addClass("is-valid");
                break;

            default:               
                break;
        }      
    });
}




