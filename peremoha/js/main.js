Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function calc_war(obj_name) {
    let from_date = new Date(war.dateStart);
    let today = new Date();
    let diff_days = Math.floor((today - from_date) / (1000 * 3600 * 24));
    let icons_killed = '';
    let icon_killed = `<img src="icons/${obj_name}-killed.png"/>`;
    let icon = `<img src="icons/${obj_name}.png"/>`;
    let total_icons = Math.ceil(war.data[obj_name].total / war.data[obj_name].divider);
    let killed_icons = Math.ceil(war.data[obj_name].killed / war.data[obj_name].divider);
    let left_icons = total_icons - killed_icons;
    for (i = 0; i < killed_icons; i++) {
        icons_killed += icon_killed;
    }
    for (i = 0; i < left_icons; i++) {
        icons_killed += icon;
    }
    $('#' + obj_name + ' .infographic').html(icons_killed);
    $('#' + obj_name + ' .lead .killed').text(war.data[obj_name].killed);
    $('#' + obj_name + ' .lead .total').text(war.data[obj_name].total);
    $('#' + obj_name + ' .lead .daysOfWar').text(diff_days);
    let left2kill = war.data[obj_name].total - war.data[obj_name].killed;
    let killed_per_day = (war.data[obj_name].killed / diff_days).toFixed(1);
    let war_end_in_days = Math.round(left2kill / killed_per_day);
    $('#' + obj_name + ' .lead .killedPerDay').text(killed_per_day);
    $('#' + obj_name + ' .lead .warEndInDays').text(war_end_in_days);
    $('#' + obj_name + ' .lead .warEndDate').text(today.addDays(war_end_in_days).toLocaleDateString("en-GB"));
    return war_end_in_days;
}

$(document).ready(function () {
    let endDay, currentDaysLeft;
    for (let instrument in war.data) {
        currentDaysLeft = calc_war(instrument);
        if (endDay === undefined || (endDay > currentDaysLeft && currentDaysLeft > 0)) {
            endDay = currentDaysLeft;
        }
    }

    let endDate = new Date();
    endDay = endDate.addDays(endDay);
    $(".war-end-countdown.ua")
        .countdown(endDay, function (event) {
            $(this).text(
                event.strftime('%D днів %H:%M:%S')
            );
        });
    $(".war-end-countdown.en")
        .countdown(endDay, function (event) {
            $(this).text(
                event.strftime('%D days %H:%M:%S')
            );
        });

    if (window.location.hash === '#en') {
        $('[lang="en"]').show();
        $('[lang="ua"]').hide();
    } else if (window.location.hash === '#ua') {
        $('[lang="ua"]').show();
        $('[lang="en"]').hide();
    } else {
        $('[lang="en"]').hide();
    }

    $('.switch-lang').click(function () {
        $('[lang="ua"]').toggle();
        $('[lang="en"]').toggle();
    });
    let lastUpdate = new Date(war.lastUpdate)
    $("#lastUpdate").html(lastUpdate.toLocaleDateString("en-GB"))
});
