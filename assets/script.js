/**
 * CRITERIA
 */

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// current day is displayed in header after paragraph: A simple calendar app...
var m = moment().format('LLLL');
$("#currentDay").text(m);

// time blocks for business hour. 
// time block is color-coded to indicate whether it is in the past, present, or future
function blockColor() {
    var hour = moment().hour();

    $(".time-block").each(function() {
        var currentHr = parseInt($(this).attr("id"));

        if (currentHr > hour) {
            $(this).addClass("future");
        } else if (currentHr === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    })
};


// click save button for that time block and save on local storage
$(".saveBtn").on('click', function() {

    var time = $(this).siblings(".hour").text();
    var description = $(this).siblings(".toDo").val();
    localStorage.setItem(time, description);
});

// refresh the page, saved events persist
function persist() {
    $(".hour").each(function() {
        var currentDescription = localStorage.getItem($(this).text());

        if (currentDescription !== null) {
            $(this).siblings(".toDo").val(currentDescription);
        }
    })
}



blockColor();
persist();