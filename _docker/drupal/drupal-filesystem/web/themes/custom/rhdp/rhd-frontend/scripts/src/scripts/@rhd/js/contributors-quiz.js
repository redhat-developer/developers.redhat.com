$(document).ready(function () {
    $("input[type='radio']").on("click", function (event) {
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a1") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a1")) {
            $('.result-title').text("Lucky you! You're both a Most Valuable Contributor (MVC) & Developer on the Street (DOTS).");
            $('.result-text').text("Based upon your selections above, you should sign up to be both a MVC and DOTS.");
        }
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a1") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a2")) {
            $('.result-title').text("Way to go! You're a match with being a Most Valuable Contributor (MVC).");
            $('.result-text').text("Based upon your selections above, you should sign up to be a MVC.");
        }
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a2") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a1")) {
            $('.result-title').text("That’s awesome! You're both a General Contributor & Developer on the Street (DOTS).");
            $('.result-text').text("Based upon your selections above, you should sign up to be both a General Contributor and DOTS.");
        }
        if (($('input[type="radio"][name="Q1"]:checked').attr("value") == "q1a2") && ($('input[type="radio"][name="Q2"]:checked').attr("value") == "q2a2")) {
            $('.result-title').text("You would be great as a General Contributor.");
            $('.result-text').text("Based upon your selections above, you should sign up to be a General Contributor.");
        }
        if (($('input[type="radio"][name="Q1"]').is(':checked')) && ($('input[type="radio"][name="Q2"]').is(':checked'))) {
            $("div.answer-block").show();
        }
    });
});
