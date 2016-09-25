function init_tools (content) {
    $('#toggle-empty').click(function () {
        var empty_cells = $('#tbody > tr:nth-child(n+3):not(:last-child) > td:nth-child(n+3):not(:last-child):empty');
        if ($('.hidden').length == 0) {
            empty_cells.addClass('hidden');
        } else {
            empty_cells.removeClass('hidden');
        }
    });

    $('#export-json').click(function () {
        $('#output').text(JSON.stringify(content));
    });
}
