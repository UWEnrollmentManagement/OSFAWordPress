        var EFCCalculatorAddress;
        var errrorFound;

        var INDEPENDENT_ADDRESS = "/efc_utils/financial-aid-estimator/uw/full/independent.php";
        var DEPENDENT_ADDRESS = "/efc_utils/financial-aid-estimator/uw/full/dependent.php";


        function enableEFCButton() {
            $("#calculateEFC").css('opacity', 1).removeAttr('disabled');
        }

        function disableEFCButton() {
            $("#calculateEFC").css('opacity',.5).attr('disabled', 'disabled');
        }

        function displayResult(result) {
            $("#dependency-result").html(result);
        }

        $( function() {
            $("#calculateDependency").click(function() {
                errorFound = false;

                EFCCalculatorAddress = DEPENDENT_ADDRESS;
                displayResult("You are a dependent student.");

                $('#dependencyCalculator p.error').remove();

                $('#dependencyCalculator li').each(function() {
                    var checked = $(this).find('input[type=radio]:checked');

                    if (checked.length == 0 && $(this).find('input[type=radio]').length >= 1) {
                        errorFound = true;

                        $(this).append('<p class="error" style="color:red">Please select an option.</p>');
                    }

                    if (checked.val() == "yes") {
                        EFCCalculatorAddress = INDEPENDENT_ADDRESS;
                        displayResult("You are an independent student.");
                    }
                });

                if (errorFound) {
                    disableEFCButton();
                    displayResult("&nbsp;");
                } else {
                    enableEFCButton();
                }
            });

            $("#calculateEFC").click(function() {
                location.href = EFCCalculatorAddress;
            });

        });
