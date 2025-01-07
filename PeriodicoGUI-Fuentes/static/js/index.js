(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                var validity = form.checkValidity();
                var temas = document.getElementsByClassName("tema").length;;
                if (validity === false ) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if(temas == 1){
                    event.preventDefault();
                    event.stopPropagation();
                    $("#mensajeNinguno").show();
                }else{
                    $("#mensajeNinguno").hide();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function repetido(valTopic) {
    var exists = false;
    var cantidad   = 0;
    $(".tema").each(function () {
        if($(this).val() == valTopic){
            cantidad++; 
        }
    })
    if(cantidad > 1){
        exists = true;
        $("#newTopicValue").val("")
    }
    return exists;
}

$(document).ready(function () {
    $(".removeTopic").click(function () {
        $(this).parent().parent().remove();
    });

    $("#newTopic").click(function () {
        $("#calcular").prop("disabled", true);
        $(this).prop("disabled", true);
        $(".removeTopic").prop("disabled", true);
        var newRow = $("#example").clone().appendTo('tbody');
        newRow.removeClass("d-none");
        newRow.find(".newTopicLabel").attr("id", "newTopicValue");
        $("#mensajeNinguno").hide();


        $(".addTopic").on("click", function () {
            var element = $("#newTopicValue");
            var valTopic = element.val();
            if (valTopic == "" || repetido(valTopic)) {
                element.addClass("is-invalid");
                element.next(".invalid-feedback").show()
                return;
            } else {
                element.next(".invalid-feedback").hide();
                element.parent().parent().find("#max").attr("name", "max" + valTopic).attr("id", "max" + valTopic).attr("required", "true");
                element.parent().parent().find("#min").attr("name", "min" + valTopic).attr("id", "min" + valTopic).attr("required", "true");
                element.parent().parent().find("#potencial").attr("name", "potencial" + valTopic).attr("id", "potencial" + valTopic).attr("required", "true");;
                element.parent().parent().removeAttr("id");
                element.parent().append(valTopic);

                element.removeClass("newTopicLabel");
                element.removeAttr("id");
                element.addClass("d-none");
                $(this).removeClass("addTopic btn-success").addClass("removeTopic btn-danger").text("Eliminar");
                $(".removeTopic").on("click", function () {
                    $(this).parent().parent().remove();
                });
                $("#calcular").prop("disabled", false);
                $(".removeTopic").prop("disabled", false);
                $("#newTopic").prop("disabled", false);
                $("input[name^='max']").on("change", function () {
                    var divInvalid = $(this).next(".invalid-feedback"); 
                    divInvalid.hide();
                    $(this).removeClass("is-invalid");
                    var name = $(this).attr("name");
                    var topicName = name.split("max")[1];
                    var minVal = $("#min"+topicName).val();
                    var maxVal = $(this).val();
                    if(minVal == "" || maxVal == ""){
                        return;
                    }
                    if(minVal > maxVal){
                        divInvalid.show();
                        $(this).addClass("is-invalid").val("");
                    }
                })
            
                $("input[name^='min']").on("change", function () {
                    var divInvalid = $(this).next(".invalid-feedback"); 
                    divInvalid.hide();
                    $(this).removeClass("is-invalid");
                    var name = $(this).attr("name");
                    var topicName = name.split("min")[1];
                    var maxVal = $("#max"+topicName).val();
                    var minVal = $(this).val();
                    if(minVal == "" || maxVal == ""){
                        return;
                    }
                    if(minVal > maxVal){
                        divInvalid.show();
                        $(this).addClass("is-invalid").val("");
                    }
                })
            }

        })
    });

    $("input[name^='max']").on("change", function () {
        var divInvalid = $(this).next(".invalid-feedback"); 
        divInvalid.hide();
        $(this).removeClass("is-invalid");
        var name = $(this).attr("name");
        var topicName = name.split("max")[1];
        var minVal = $("#min"+topicName).val();
        var maxVal = $(this).val();
        if(minVal == "" || maxVal == ""){
            return;
        }
        if(minVal > maxVal){
            divInvalid.show();
            $(this).addClass("is-invalid").val("");
        }
    })

    $("input[name^='min']").on("change", function () {
        var divInvalid = $(this).next(".invalid-feedback"); 
        divInvalid.hide();
        $(this).removeClass("is-invalid");
        var name = $(this).attr("name");
        var topicName = name.split("min")[1];
        var maxVal = $("#max"+topicName).val();
        var minVal = $(this).val();
        if(minVal == "" || maxVal == ""){
            return;
        }
        if(minVal > maxVal){
            divInvalid.show();
            $(this).addClass("is-invalid").val("");
        }
    })
})