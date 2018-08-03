//Bind to class elements using jquery and trigger line clamp.js

$(function() {
    //get all lineclamp items 'line-clamp-*'
    var $clampItems = $("[class^='line-clamp-']");
    $clampItems.each(function() {
        var $tmpItem = $(this);
        var testClass = $tmpItem.attr("class");
        var lineCountArray = testClass.split("-");
        //Grab last item from class and use as numebr of lines to clamp parse as int
        var testLineCount = parseInt(lineCountArray[lineCountArray.length - 1], 10);
        //only run if we have a number of lines to clamp
        if(!isNaN(testLineCount)) {
            //limit line clamp from 1 to 10 lines
            if(testLineCount <= 10 && testLineCount >= 1) {
                $clamp($tmpItem.get(0), {clamp: testLineCount, useNativeClamp: true});
            }
        } 
    });
  });
  