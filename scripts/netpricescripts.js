var getVars = location.search.replace('?', '').split('&').map(function(val){
    return val.split('=');
});

$(function() {
    for (var i = 0; i<getVars.length; i++) {
        switch(getVars[i][0]) {
            case 'efc':
                $('input[name=EFC]').val(getVars[i][1]);
                break;
            case 'spouseParentIncome':
                $('input[name=p_income').val(getVars[i][1]);
                break;
            case 'numInHousehold':
                $('input[name=fam_size]').val(getVars[i][1]);
                break;
        }
    }
});

$(document).ready(function() {
    var obj = {
        rules: {
            EFC: {
                digits: true
            },
            fam_size: {
                digits: true
            },
            p_income: {
                digits: true
            },
            gpa: {
                max: 4.0,
                number: true
            }
        },
        messages: {
            gpa: "Please enter a value equal to or less than 4.0"
        }
    }

    $("#awardForm").validate(obj);

    // Qtip tooltips options
    // By suppling no content attribute, the library uses each elements title attribute by default
    $('a[title]').qtip({
        content: {
            text: false // Use each elements title attribute
        },
        position: {
            corner: {
                target: 'rightMiddle',
                tooltip: 'leftMiddle'
            }
        },
        style: {
            tip: true,
            name: 'cream'
        }
    });
});


function makeNum(field) {
    // This function ensures that the value in a field is a number ready for use in calculating award

    var formField;
    var existingValue;
    formField = eval("document.awardForm." + field);

    existingValue = formField.value;
    formField.value = parseInt(formField.value);
}

function formatCurrency(strValue) {
    if(strValue == 0) {
        return '$0.00';
    }
    strValue = strValue.toString().replace(/\$|\,/g,'');
    dblValue = parseFloat(strValue);

    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
    dblValue = Math.round(dblValue*100+0.50000000001);
    dblValue = Math.round(dblValue/100).toString();
    for (var i = 0; i < Math.round((dblValue.length-(1+i))/3); i++){
        if(dblValue.length >= 4)
            dblValue = dblValue.substring(0,dblValue.length-(3*i+3))+','+dblValue.substring(dblValue.length-(4*i+3));
        else
            dblValue = dblValue.substring(0,dblValue.length-(3*i+3))+dblValue.substring(dblValue.length-(4*i+3));
    }
    return (((blnSign)?'':'-') + '$' + dblValue + '.00');
}


// These are the data sets that determine award amounts.
// EDIT BELOW HERE!

// Cost of attendance figures
var COA_SEA = 27034;
var COA_SEA_other = 49338;
var COA_BOT = 27586;
var COA_BOT_other = 49890;
var COA_TAC = 27733;
var COA_TAC_other = 50037;

var TUI_SEA = 11839;
var TUI_BOT = 11758;
var TUI_TAC = 11905;

// This array details PEll award amounts.  Array key is max EFC to qualify for given award amount.

var ary_PELL = new Array();
ary_PELL[001]   = 5730;
ary_PELL[100] 	= 5680;
ary_PELL[200]	= 5580;
ary_PELL[300]	= 5480;
ary_PELL[400] 	= 5380;
ary_PELL[500] 	= 5280;
ary_PELL[600] 	= 5180;
ary_PELL[700] 	= 5080;
ary_PELL[800] 	= 4980;
ary_PELL[900] 	= 4880;
ary_PELL[1000] 	= 4780;
ary_PELL[1100] 	= 4680;
ary_PELL[1200] 	= 4580;
ary_PELL[1300] 	= 4480;
ary_PELL[1400] 	= 4380;
ary_PELL[1500] 	= 4280;
ary_PELL[1600] 	= 4180;
ary_PELL[1700] 	= 4080;
ary_PELL[1800] 	= 3980;
ary_PELL[1900] 	= 3880;
ary_PELL[2000] 	= 3780;
ary_PELL[2100] 	= 3680;
ary_PELL[2200] 	= 3580;
ary_PELL[2300] 	= 3480;
ary_PELL[2400] 	= 3380;
ary_PELL[2500] 	= 3280;
ary_PELL[2600] 	= 3180;
ary_PELL[2700] 	= 3080;
ary_PELL[2800] 	= 2980;
ary_PELL[2900] 	= 2880;
ary_PELL[3000] 	= 2780;
ary_PELL[3100] 	= 2680;
ary_PELL[3200] 	= 2580;
ary_PELL[3300] 	= 2480;
ary_PELL[3400] 	= 2380;
ary_PELL[3500] 	= 2280;
ary_PELL[3600] 	= 2180;
ary_PELL[3700] 	= 2080;
ary_PELL[3800] 	= 1980;
ary_PELL[3900] 	= 1880;
ary_PELL[4000] 	= 1780;
ary_PELL[4100] 	= 1680;
ary_PELL[4200] 	= 1580;
ary_PELL[4300] 	= 1480;
ary_PELL[4400] 	= 1380;
ary_PELL[4500] 	= 1280;
ary_PELL[4600] 	= 1180;
ary_PELL[4700] 	= 1080;
ary_PELL[4800] 	= 980;
ary_PELL[4900] 	= 880;
ary_PELL[5000] 	= 780;
ary_PELL[5100] 	= 680;
ary_PELL[5157]  = 602;


//  This array defines State Need Grants award guidelines.
// ary[family size][income] is the format
var ary_SNG = new Array();

ary_SNG[1] = new Array();
ary_SNG[1][22000] = 10344;
ary_SNG[1][24000] = 7240;
ary_SNG[1][26000] = 6723;
ary_SNG[1][28500] = 6206;
ary_SNG[1][30500] = 5172;

ary_SNG[2] = new Array();
ary_SNG[2][28500] = 10344;
ary_SNG[2][31500] = 7240;
ary_SNG[2][34000] = 6723;
ary_SNG[2][37000] = 6206;
ary_SNG[2][40000] = 5172;

ary_SNG[3] = new Array();
ary_SNG[3][35000] = 10344;
ary_SNG[3][38500] = 7240;
ary_SNG[3][42000] = 6723;
ary_SNG[3][46000] = 6206;
ary_SNG[3][49500] = 5172;

ary_SNG[4] = new Array();
ary_SNG[4][42000] = 10344;
ary_SNG[4][46000] = 7240;
ary_SNG[4][50500] = 6723;
ary_SNG[4][54500] = 6206;
ary_SNG[4][58500] = 5172;

ary_SNG[5] = new Array();
ary_SNG[5][48500] = 10344;
ary_SNG[5][53500] = 7240;
ary_SNG[5][58500] = 6723;
ary_SNG[5][63000] = 6206;
ary_SNG[5][68000] = 5172;

ary_SNG[6] = new Array();
ary_SNG[6][55500] = 10344;
ary_SNG[6][61000] = 7240;
ary_SNG[6][66500] = 6723;
ary_SNG[6][72000] = 6206;
ary_SNG[6][77500] = 5172;

ary_SNG[7] = new Array();
ary_SNG[7][56500] = 10344;
ary_SNG[7][62500] = 7240;
ary_SNG[7][68000] = 6723;
ary_SNG[7][73500] = 6206;
ary_SNG[7][79500] = 5172;

ary_SNG[8] = new Array();
ary_SNG[8][58000] = 10344;
ary_SNG[8][63500] = 7240;
ary_SNG[8][69500] = 6723;
ary_SNG[8][75000] = 6206;
ary_SNG[8][81000] = 5172;

ary_SNG[9] = new Array();
ary_SNG[9][59000] = 10344;
ary_SNG[9][65000] = 7240;
ary_SNG[9][71000] = 6723;
ary_SNG[9][77000] = 6206;
ary_SNG[9][83000] = 5172;

ary_SNG[10] = new Array();
ary_SNG[10][60500] = 10344;
ary_SNG[10][66500] = 7240;
ary_SNG[10][72500] = 6723;
ary_SNG[10][78500] = 6206;
ary_SNG[10][84500] = 5172;



// This array defines SEOG awards
/*var ary_SEOG = new Array();
 ary_SEOG[100] = new Array();
 ary_SEOG[4995] = new Array();
 ary_SEOG[0]["WA"] 		= 600;
 ary_SEOG[0]["nonresident"] 	= 3000;
 ary_SEOG[5157]["WA"] 		= 210;
 ary_SEOG[5157]["nonresident"] = 210;*/

// This array defines loan awards.
// Array is ary[LOAN TYPE][YEAR][DEPENDENT] = AWARD
var ary_Perkins = new Array();
ary_Perkins[1] = new Array();
ary_Perkins[1]["Dependent"] = 1000;
ary_Perkins[1]["Independent"] = 2000;

ary_Perkins[2] = new Array();
ary_Perkins[2]["Dependent"] = 1000;
ary_Perkins[2]["Independent"] = 2000;

ary_Perkins[3] = new Array();
ary_Perkins[3]["Dependent"] = 1000;
ary_Perkins[3]["Independent"] = 2000;

ary_Perkins[4] = new Array();
ary_Perkins[4]["Dependent"] = 1000;
ary_Perkins[4]["Independent"] = 2000;

var ary_Stafford = new Array();
ary_Stafford[1] = new Array();
ary_Stafford[1]["Dependent"] = 3500;
ary_Stafford[1]["Independent"] = 3500;

ary_Stafford[2] = new Array();
ary_Stafford[2]["Dependent"] = 4500;
ary_Stafford[2]["Independent"] = 4500;

ary_Stafford[3] = new Array();
ary_Stafford[3]["Dependent"] = 5500;
ary_Stafford[3]["Independent"] = 5500;

ary_Stafford[4] = new Array();
ary_Stafford[4]["Dependent"] = 5500;
ary_Stafford[4]["Independent"] = 5500;

var ary_Unsub_Stafford = new Array();
ary_Unsub_Stafford[1] = new Array();
ary_Unsub_Stafford[1]["Dependent"] =2000;
ary_Unsub_Stafford[1]["Independent"] = 6000;

ary_Unsub_Stafford[2] = new Array();
ary_Unsub_Stafford[2]["Dependent"] = 2000;
ary_Unsub_Stafford[2]["Independent"] = 6000;

ary_Unsub_Stafford[3] = new Array();
ary_Unsub_Stafford[3]["Dependent"] = 2000;
ary_Unsub_Stafford[3]["Independent"] = 7000;

ary_Unsub_Stafford[4] = new Array();
ary_Unsub_Stafford[4]["Dependent"] = 2000;
ary_Unsub_Stafford[4]["Independent"] = 7000;


// EDIT ABOVE HERE!

/*
 Some rules about calculating this financial estimate:
 COA = Cost of Attendence.  Differs by in/out of state.
 EFC = Expected Family Conribution, via outside calculator
 FN = Financial need. This COA - EFC.
 Equity = Eligibility in terms of loans. Smallest calue of (0.61 * COA) or FN

 Awards are given in this order:
 1) Equity
 - PELL
 - State Need
 - SEOG
 - Tuition Exemption, only for WA residents
 2) FN
 - Loans
 - Work Study
 */

function calcAward() {
    // first, let's get what we need out of the form.
    var Equity;
    var FN;
    var tmpFN;
    var tmp_Equity;
    var EFC;
    var PELL;
    var STATE_NEED;
    var SEOG;
    var GRANTS;
    var WORK_STUDY;
    var debug;
    var status;
    var PELL_EFC
    var preX;
    var LOWNEED;
    var purpEligible = false;

    // Next, lets see if we are ready to calculate or not.
    var errorStr = "";
    if (document.awardForm.EFC.value == "") {errorStr += "Please specify an EFC value in #1.\n"}
    if (document.awardForm.state.value == "") {errorStr += "Please specify your residency in #2.\n"}
    if (document.awardForm.dependent.value == "") {errorStr += "Please specify your dependency in #3.\n"}
    if (document.awardForm.married.value == "") {errorStr += "Please specify your marital status in #4.\n"}
    if (document.awardForm.grade.value == "") {errorStr += "Please specify your grade level in #5.\n"}
    if (document.awardForm.fam_size.value == "") {errorStr += "Please specify your family size in #6.\n"}
    if (document.awardForm.p_income.value == "") {errorStr += "Please specify your family income in #7.\n"}
    if (document.awardForm.campus.value == "") {errorStr += "Please specify your campus in #8.\n"}
    if ($('#gpalist').is(":visible") && document.awardForm.gpa.value == "") {errorStr += "Please specify your GPA in #9.\n"}

    if (errorStr == "" ) {
        var studentGPA = $('input[name="gpa"]').val();
        if (studentGPA >= 3.4 && studentGPA != "") {
            $('#purpGoldList').show(1000);
            purpEligible = true;
        }


        //debug = true;
        debug = false;
        status = "Overview of calculation values:\n";

        EFC = 0;
        EFC = document.awardForm.EFC.value;
        LOWNEED = false;

        status += "EFC: " + EFC + "\n";

        // Determine tuition by campus
        if(document.awardForm.campus.value == "SEA")
            TUITION = TUI_SEA;
        else if(document.awardForm.campus.value == "BOT")
            TUITION = TUI_BOT;
        else if(document.awardForm.campus.value == "TAC")
            TUITION = TUI_TAC;


        // In-state or out-of-state COA?
        if (document.awardForm.state.value == "WA") {
            if(document.awardForm.campus.value == "SEA"){
                COA = COA_SEA;
            }else if(document.awardForm.campus.value == "BOT"){
                COA = COA_BOT;
            }else if(document.awardForm.campus.value == "TAC"){
                COA = COA_TAC;
            }
        }
        if (document.awardForm.state.value == "OTHER") {
            if(document.awardForm.campus.value == "SEA"){
                COA = COA_SEA_other;
            }else if(document.awardForm.campus.value == "BOT"){
                COA = COA_BOT_other;
            }else if(document.awardForm.campus.value == "TAC"){
                COA = COA_TAC_other;
            }
        }

        var ary_PLUS = new Array();
        ary_PLUS[1] = new Array();
        ary_PLUS[1]["Dependent"] = COA;
        ary_PLUS[1]["Independent"] = 0;

        ary_PLUS[2] = new Array();
        ary_PLUS[2]["Dependent"] = COA;
        ary_PLUS[2]["Independent"] = 0;

        ary_PLUS[3] = new Array();
        ary_PLUS[3]["Dependent"] = COA;
        ary_PLUS[3]["Independent"] = 0;

        ary_PLUS[4] = new Array();
        ary_PLUS[4]["Dependent"] = COA;
        ary_PLUS[4]["Independent"] = 0;

        status += "COA: " + COA + "\n";
        status += "State: " + document.awardForm.state.value + "\n";

        FN = COA - EFC;
        if (FN < 0) FN = 0;
        if (FN <= 100) LOWNEED = true;
        status += "FN: " + FN + "\n";
        status += "LOWNEED: " + LOWNEED + "\n";

        // Make sure we've got Equity correct
        //if (Equity > FN) { Equity = FN;}

        var familySize;
        familySize = document.awardForm.fam_size.value;
        if (familySize > 20) familySize = 20;

        var pIncome = 0;
        var preX = 0;
        for (var x in ary_SNG[familySize]) {
            if (x >= Number(document.awardForm.p_income.value) && preX < Number(document.awardForm.p_income.value) && document.awardForm.state.value == "WA") {
                pIncome = x;
                //break;
            }
            preX = x;
        }

        if(pIncome == 0)
            sNeed = 0;
        else
            sNeed = ary_SNG[familySize][pIncome];

        var pellE = 0;
        preX = 0;
        PELLx = 001;
        // Positive Equity.  We turn first to Pell Grant
        for (var x in ary_PELL) {
            //if(debug) (alert (x + " >= " + document.awardForm.p_income.value + " && " + preX + " < " + document.awardForm.p_income.value);
            if (x >= Number(document.awardForm.EFC.value) && preX < Number(document.awardForm.EFC.value)) {
                PELLx = x;
                //break;
            }
            preX = x;
        }
        pellE = ary_PELL[PELLx];


        //alert(sNeed);

        if (document.awardForm.state.value == "WA") {
            if (EFC < 5701)
                Equity = 0.61 * COA;
            else if ((EFC > 5700) && (sNeed > 0)){
                Equity = TUITION;
                if(document.awardForm.campus.value == "SEA")
                    Equity += 228;
            }
            else if (((EFC > 5700) && (EFC <= 7000)) && (sNeed <= 0))
                Equity = 0.50 * COA;

            else if (((EFC > 7000) && (EFC <=10000)) && (sNeed <= 0))
                Equity = 0.30 * COA;

            else if (((EFC > 10000) && (EFC <= 14000)) && (sNeed <= 0))
                Equity = .10 * COA;
        }

        status += "Equity: " + Equity + "\n";

        // Next, we address equity:
        // Equity is eligibility for grants only. Grants are awarded in this order:
        // PELL, SNG, SEOG, Tuition Exemption
        // Award amounts are then deducted from BOTH FN and Equity.
        // We'll use tmp_Equity to track current unfilled equity
        tmp_Equity = Equity;
        tmpFN = FN;

        PELL = 0;
        STATE_NEED = 0;
        SEOG = 0;
        var UNIV_GRANT = 0;
        var TUITION_EXEMPTION = 0;
        var Perkins = 0;
        var Stafford = 0;
        var Unsub_Stafford = 0;
        var Plus = 0;
        var WorkStudy = 0;
        var PELLx = 001;
        var STATE_NEEDx = 0;
        var purpGoldScholarship = 0;

        // if student is a nonresident in Bothell campus with GPA >= 3.4, they are eligible for the Purple and Gold Award
        if (purpEligible) {
            purpGoldScholarship = 7500;
        }

        if (!LOWNEED) {
            if (tmp_Equity > 0) {
                if (Number(document.awardForm.EFC.value) <= 5157) {
                    preX = 0;
                    PELLx = 001;
                    // Positive Equity.  We turn first to Pell Grant
                    for (var x in ary_PELL) {
                        //if(debug) (alert (x + " >= " + document.awardForm.p_income.value + " && " + preX + " < " + document.awardForm.p_income.value);
                        if (x >= Number(document.awardForm.EFC.value) && preX < Number(document.awardForm.EFC.value)) {
                            PELLx = x;
                            //break;
                        }
                        preX = x;
                    }
                    PELL = ary_PELL[PELLx];
                    if (tmp_Equity < PELL) PELL = tmp_Equity;
                    tmp_Equity = tmp_Equity - PELL;
                    tmpFN = tmpFN - PELL;
                    //status += "PELL_EFC: " + PELL_EFC + "\n";
                    status += "PELL: " + PELL + "\n";
                    //status += "New Equity: " + tmp_Equity + "\n";
                }

                // Next we Evaluate State Need Grant
                if (tmp_Equity > 0) {
                    preX = -1;
                    STATE_NEEDx = 0;
                    //STATE_NEED = ary_SNG[document.awardForm.fam_size.value][document.awardForm.p_income.value];

                    var familySize;
                    familySize = document.awardForm.fam_size.value;
                    if (familySize > 20) familySize = 20;

                    for (var x in ary_SNG[familySize]) {
                        //if(debug) (alert (x + " >= " + document.awardForm.p_income.value + " && " + preX + " < " + document.awardForm.p_income.value);
                        //alert(preX + " >= " + document.awardForm.p_income.value);
                        //alert(preX >= document.awardForm.p_income.value);
                        if (x >= Number(document.awardForm.p_income.value) && preX < Number(document.awardForm.p_income.value) && document.awardForm.state.value == "WA") {
                            STATE_NEEDx = x;
                            //break;
                        }
                        preX = x;
                    }
                }
                if (STATE_NEEDx > 0) STATE_NEED = ary_SNG[familySize][STATE_NEEDx];
                //alert ("x:" + x + "\n" + "income:" + document.awardForm.p_income.value + "\n award:" + ary_SNG[document.awardForm.fam_size.value][x] + "\n" + "STATE_NEED" + STATE_NEED);
                if (tmp_Equity < STATE_NEED) STATE_NEED = tmp_Equity;
                tmp_Equity = tmp_Equity - STATE_NEED;
                tmpFN = tmpFN - STATE_NEED;
                status += "STATE_NEED: " + STATE_NEED + "\n";
                //status += "New Equity: " + tmp_Equity + "\n"

                // SEOG Grants

                if(document.awardForm.EFC.value == 0){
                    if(document.awardForm.state == "WA") {
                        SEOG = 210;
                    }
                    else if(document.awardForm.state == "OTHER"){
                        SEOG = 3000;
                    }
                }
                else if(document.awardForm.EFC.value > 0 || document.awardForm.EFC.value < 5198){
                    SEOG = 210;
                }

                //if (tmp_Equity < SEOG) SEOG = tmp_Equity;
                tmp_Equity = tmp_Equity - SEOG;
                tmpFN = tmpFN - SEOG;
                status += "SEOG: " + SEOG + "\n";

                //status += "New Equity: " + tmp_Equity + "\n"

                /*		// Next item: Tuition Exemption
                 alert(tmp_Equity);
                 if (tmp_Equity > 0 && Number(document.awardForm.EFC.value) <= 2000) {
                 if (document.awardForm.state.value == "WA" && Number(document.awardForm.EFC.value) <= 5500) {
                 TUITION_EXEMPTION = TUITION;
                 }
                 }
                 if (tmp_Equity < TUITION_EXEMPTION) {TUITION_EXEMPTION = tmp_Equity;}
                 tmp_Equity = tmp_Equity - TUITION_EXEMPTION; alert(tmp_Equity);
                 tmpFN = tmpFN - TUITION_EXEMPTION;
                 status += "TUITION_EXEMPTION: " + TUITION_EXEMPTION + "\n";

                 // Final item: University Grant
                 // Must be: WA resident
                 // Same max as tuition exemption, capped by unmet equity.
                 // NOT ElIGIBLE: FROSH

                 if (document.awardForm.state.value == "WA" && document.awardForm.grade.value > 1 && EFC <= 6000) {
                 UNIV_GRANT = 18000;
                 }
                 if (tmp_Equity < UNIV_GRANT) {UNIV_GRANT = tmp_Equity;}*/
                UNIV_GRANT = tmp_Equity;
                tmpFN = tmpFN - UNIV_GRANT;
                status += "UNIV_GRANT: " + UNIV_GRANT + "\n";
                status += "\n"+"Grants completed:\n"+"Equity:" + tmp_Equity + "\n";
                status += "Financial Need: " + tmpFN + "\n";
            } else if(document.awardForm.state.value == "OTHER"){
                //SEOG
                if(EFC <= 5157)
                    SEOG = 210;
                //PELL
                if (Number(document.awardForm.EFC.value) <= 5157) {
                    preX = 0;
                    PELLx = 001;
                    for (var x in ary_PELL) {
                        if (x >= Number(document.awardForm.EFC.value) && preX < Number(document.awardForm.EFC.value)) {
                            PELLx = x;
                        }
                        preX = x;
                    }
                    PELL = ary_PELL[PELLx]
                }
                tmpFN = tmpFN - (SEOG + PELL);
            }


            // Next we deal with remaining FN by awarding loans

            if (tmpFN > 0) {

                // Work Study
                // EFC = 0
                // MAX: $3,000 for frosh; $3,000 soph+
                // Capped by FN unmet
                if (Number(document.awardForm.EFC.value) == 0) {
                    if (document.awardForm.grade.value == 1) {WorkStudy = 3000;}
                    if (document.awardForm.grade.value > 1) {WorkStudy = 3000;}
                    if (tmpFN < WorkStudy) {WorkStudy = tmpFN;}
                    tmpFN = tmpFN - WorkStudy;
                }


                // Time to calculate loan amounts.


                if (tmpFN > 0 && Number(document.awardForm.EFC.value) <= 1000) {
                    Perkins = eval("ary_Perkins[" + document.awardForm.grade.value + "]['" + document.awardForm.dependent.value + "']");
                    if(document.awardForm.dependent.value == 'Independent'){
                        if(((document.awardForm.married.value == 'yes') && (document.awardForm.fam_size.value == 2)) || ((document.awardForm.married.value == 'no') && (document.awardForm.fam_size.value == 1)))
                            Perkins = 1000;
                        else if(((document.awardForm.married.value == 'yes') && (document.awardForm.fam_size.value > 2)) || ((document.awardForm.married.value == 'no') && (document.awardForm.fam_size.value > 1)))
                            Perkins = 1000;
                    }

                    if(document.awardForm.state.value == "OTHER"){
                        Perkins = 4000;
                    }

                    if (tmpFN < Perkins) Perkins = tmpFN;
                    tmpFN = tmpFN - Perkins;
                }
                if (tmpFN > 0) {
                    Stafford = eval("ary_Stafford[" + document.awardForm.grade.value + "]['" + document.awardForm.dependent.value + "']");
                    if (tmpFN < Stafford) Stafford = tmpFN;
                    tmpFN = tmpFN - Stafford;

                }
                // why is this checking for tmpFN to be both above 0 and 100?
                //if (tmpFN > 0 && tmpFN >= 100) {
                if (tmpFN > 0) {
                    Unsub_Stafford = eval("ary_Unsub_Stafford[" + document.awardForm.grade.value + "]['" + document.awardForm.dependent.value + "']");
                    if (tmpFN < Unsub_Stafford) Unsub_Stafford = tmpFN;
                    tmpFN = tmpFN - Unsub_Stafford;
                }

                if (tmpFN > 0) {
                    Plus = eval("ary_PLUS[" + document.awardForm.grade.value + "]['" + document.awardForm.dependent.value + "']");
                    if (tmpFN < Plus) Plus = tmpFN;
                    tmpFN = tmpFN - Plus;
                }

                status += "\n"+"Loan Overview:\n";
                status += "Work Study: " + WorkStudy + "\n";
                status += "Perkins: " + Perkins + "\n";
                status += "Stafford: " + Stafford + "\n";
                status += "Unsub_Stafford: " + Unsub_Stafford + "\n";
                status += "Plus: " + Plus + "\n";
                status += "FN: " + tmpFN + "\n";

            }
        } else {
            // LOW NEED CALC
            // EFC <= $100
            // Based on COA, not FN or Equity.

            var lowneed_unsub_Stafford = new Array();
            lowneed_unsub_Stafford[1] = new Array();
            lowneed_unsub_Stafford[1]["Dependent"] = 5500;
            lowneed_unsub_Stafford[1]["Independent"] = 9500;

            lowneed_unsub_Stafford[2] = new Array();
            lowneed_unsub_Stafford[2]["Dependent"] = 6500;
            lowneed_unsub_Stafford[2]["Independent"] = 10500;

            lowneed_unsub_Stafford[3] = new Array();
            lowneed_unsub_Stafford[3]["Dependent"] = 7500;
            lowneed_unsub_Stafford[3]["Independent"] = 12500;

            lowneed_unsub_Stafford[4] = new Array();
            lowneed_unsub_Stafford[4]["Dependent"] = 7500;
            lowneed_unsub_Stafford[4]["Independent"] = 12500;

            Unsub_Stafford = eval("lowneed_unsub_Stafford[" + document.awardForm.grade.value + "]['" + document.awardForm.dependent.value + "']");
            status += "lowneed_unsub_Stafford[" + document.awardForm.grade.value + "]['" + document.awardForm.dependent.value + "']\n\n";
            if (document.awardForm.dependent.value == "Dependent") Plus = COA - Unsub_Stafford;
            status += "Unsub Stafford: " + Unsub_Stafford + "\n";
            status += "Plus: " + Plus + "\n";

        }

        Plus = Plus - purpGoldScholarship;
        if (Plus < 0) Plus = 0;


        if (debug) {alert(status);}


        // Last of all tasks: update the webpage to reflect the relevant awards:
        var fld_purpGold = document.getElementById("purpGold");
        var fld_pell = document.getElementById("pell");
        var fld_state = document.getElementById("state_");
        var fld_othergrants = document.getElementById("othergrants");
        var fld_workstudy = document.getElementById("workstudy");
        var fld_perkins = document.getElementById("perkins");
        var fld_stafford = document.getElementById("stafford");
        var fld_ustafford = document.getElementById("ustafford");
        var fld_plus = document.getElementById("plus");
        var fld_eligibility = document.getElementById("eligibility");
        var fld_CostofAt = document.getElementById("CostofAt");
        var fld_ecpectfc = document.getElementById("ecpectfc");
        var fld_fin_need_amt = document.getElementById("fin_need_amt");
        var fld_net_CostofAt = document.getElementById("net_CostofAt");
        var fld_ecpectgrants = document.getElementById("ecpectgrants");
        var fld_netCost = document.getElementById("netCost");
        //var fld_campus1 = document.getElementById("campus1");
        //var fld_campus2 = document.getElementById("campus2");

        fld_purpGold.innerHTML = formatCurrency(purpGoldScholarship);
        fld_pell.innerHTML = formatCurrency(PELL);
        fld_state.innerHTML = formatCurrency(STATE_NEED);
        fld_othergrants.innerHTML = formatCurrency(UNIV_GRANT + SEOG);
        fld_workstudy.innerHTML = formatCurrency(WorkStudy);
        fld_perkins.innerHTML = formatCurrency(Perkins);
        fld_stafford.innerHTML = formatCurrency(Stafford);
        fld_ustafford.innerHTML = formatCurrency(Unsub_Stafford);
        fld_plus.innerHTML = formatCurrency(Plus);
        fld_eligibility.innerHTML = formatCurrency(eval (PELL + STATE_NEED + SEOG + UNIV_GRANT + WorkStudy + Perkins + Stafford + Unsub_Stafford + Plus + purpGoldScholarship));
        fld_CostofAt.innerHTML = formatCurrency(COA);
        fld_ecpectfc.innerHTML = formatCurrency(EFC);
        fld_fin_need_amt.innerHTML = formatCurrency(FN);
        fld_net_CostofAt.innerHTML = formatCurrency(COA);
        fld_ecpectgrants.innerHTML = formatCurrency(PELL + STATE_NEED + SEOG + UNIV_GRANT + purpGoldScholarship);
        fld_netCost.innerHTML = formatCurrency(COA - (PELL + STATE_NEED + SEOG + UNIV_GRANT + purpGoldScholarship));
        //fld_campus1.innerHTML = document.awardForm.campus.value;
        //fld_campus2.innerHTML = document.awardForm.campus.value;

        document.getElementById('estimatedAward').scrollIntoView();
        return false;
    } else {
        alert (errorStr);
        return false;
    }

    return false;
}

// function used to either display GPA input field or alert ineligibility of international student
function onOptChange() {
    var selectedCampus = document.getElementsByName('campus')[0].value;
    var selectedResidency = document.getElementsByName('state')[0].value;

    // if student is non-resident of Bothell campus, then display GPA input field
    if (selectedCampus == 'BOT' && selectedResidency == 'OTHER') $('#gpalist').show(200);
    else $('#gpalist').hide(200);

    /*
     if (document.awardForm.state.value == "INTERNATIONAL") {
     alert("International students are not eligible for financial aid through the University of Washington's Office of Student Financial Aid.  Information for International students is linked below");
     */
    // if student is International, then display alert
    if (selectedResidency == "INTERNATIONAL") {
        jConfirm("International students are not eligible for financial aid through the University of Washington's Office of Student Financial Aid. Would you like to be redirected to more information?", "Not Eligible", function(clickedOK) {
            if (clickedOK) window.open("http://www.washington.edu/students/gencat/front/International.html");
        });
    }
}