$(function () {
    var colors = ['rgb(255,80,80)',
        'rgb(255,150,0)',
        'rgb(255,230,0)',
        'rgb(180,255,0)',
        'rgb(0,255,0)',
        'rgb(0,255,180)',
        'rgb(0,255,255)',
        'rgb(0,128,255)',
        'rgb(128,0,255)',
        'rgb(255,0,255)'
    ];

    var content = [
        [{'content': '8'}, {'content': '1'}, {'content': '6'}],
        [{'content': '3'}, {'content': ''}, {'content': '7'}],
        [{'content': '4'}, {'content': '9'}, {'content': '2'}],
    ];

    $('#toggle-empty').click(function () {
        var empty_cells = $('#tbody > tr:nth-child(n+3):not(:last-child) > td:nth-child(n+3):not(:last-child):empty');
        if ($('.hidden').length == 0) {
            empty_cells.addClass('hidden');
        } else {
            empty_cells.removeClass('hidden');
        }
    });

    $('#dump-json').click(function () {
        $('#output').text(JSON.stringify(content, null, '  '));
    });

    $(document).click(function () {
        var editing = $('#tbody textarea');
        console.log(editing);
        /* write all textarea back */
        for (var i = 0; i < editing.length; i++) {
            var textarea = $(editing[i]);
            var row = $(textarea.parent().parent()).prevAll().length - 2;
            var col = $(textarea.parent()).prevAll().length - 2;
            console.log(textarea, row, col);
            content[row][col].content = textarea.val();
            $(textarea.parent()).html(content[row][col].content.replace(/\n/g, '<br>'));
        }
        return false;
    });

    $('#tbody').on('click', 'textarea', function () {
        /* prevent bluring on click */
        return false;
    });
    $('#tbody').on('click', 'tr:nth-child(n+3):not(:last-child) > td:nth-child(n+3):not(:last-child)', function () {
        console.log('user cell');
        var row = $($(this).parent()).prevAll().length - 2;
        var col = $(this).prevAll().length - 2;
        $(this).html('<textarea>'+ content[row][col].content +'</textarea>');
        $(this).find('textarea').focus();
        return false;
    });

    $('#tbody').on('click', 'tr:first-child > td:last-child', function () {
        // var col = $(this).prevAll().length - 2;
        // console.log('col adder:', col);
        for (var i = 0; i < content.length; i++) {
            content[i].push({'content': ''});
        }
        $('#tbody > tr').append('<td></td>');
        return false;
    });

    $('#tbody').on('click', 'tr:last-child > td:first-child', function () {
        // var row = $($(this).parent()).prevAll().length - 2;
        // console.log('row adder:', row);
        var new_row = [];
        for (var j = 0; j < content[0].length; j++) {
            new_row.push({'content': ''});
        }
        content.push(new_row);
        $('#tbody').append('<tr>'+ '<td></td>'.repeat(content[0].length + 3) +'</tr>');
        return false;
    });

    $('#tbody').on('click', 'tr:first-child > td:nth-child(n+3):not(:last-child)', function () {
        var col = $(this).prevAll().length - 2;
        console.log('col selector:', col);
        return false;
    });

    $('#tbody').on('click', 'tr:nth-child(n+3):not(:last-child) > td:first-child', function () {
        var row = $($(this).parent()).prevAll().length - 2;
        console.log('row selector:', row);
        return false;
    });

    render(content);
});

function render (content) {
    var row = content.length;
    var col = Math.max.apply(null, content.map(function (elem) {
        return elem.length;
    }));
    /* append col operator and an padding row */
    $('#tbody').append('<tr>'+ '<td></td>'.repeat(col + 3) +'</tr>');
    $('#tbody').append('<tr>'+ '<td></td>'.repeat(col + 3) +'</tr>');
    for (var i = 0; i < row; i++) {
        var tr_body = '<td></td><td></td>'; // row operator and padding col
        for (var j = 0; j < col; j++) {
            tr_body += '<td>'+ content[i][j].content +'</td>';
        }
        tr_body += '<td></td>';
        $('#tbody').append('<tr>'+ tr_body +'</tr>');
    }
    $('#tbody').append('<tr>'+ '<td></td>'.repeat(col + 3) +'</tr>');
}
