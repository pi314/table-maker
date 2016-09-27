Vue.directive('focus', {
    bind: function () {
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});


function main () {
    vm = new Vue({
        el: '#app',
        data: {
            table: [
                [{content: 'apple', editing: false}],
                [{content: 'pen', editing: false}],
                [{content: 'pineapple', editing: false}],
            ],
        },
        methods: {
            edit: function (cell) {
                cell.editing = true;
            },
            edit_done: function (cell) {
                cell.editing = false;
            },
        },
    });

    // $(document).click(function () {
    //     var editing = $('#tbody textarea');
    //     console.log(editing);
    //     #<{(| write all textarea back |)}>#
    //     for (var i = 0; i < editing.length; i++) {
    //         var textarea = $(editing[i]);
    //         var row = $(textarea.parent().parent()).prevAll().length - 2;
    //         var col = $(textarea.parent()).prevAll().length - 2;
    //         console.log(textarea, row, col);
    //         content[row][col].content = textarea.val();
    //         $(textarea.parent()).html(content[row][col].content.replace(/\n/g, '<br>'));
    //     }
    //     return false;
    // });
    //
    // $('#tbody').on('click', 'textarea', function () {
    //     #<{(| prevent bluring on click |)}>#
    //     return false;
    // });
    // $('#tbody').on('click', 'tr:nth-child(n+3):not(:last-child) > td:nth-child(n+3):not(:last-child)', function () {
    //     console.log('user cell');
    //     var row = $($(this).parent()).prevAll().length - 2;
    //     var col = $(this).prevAll().length - 2;
    //     $(this).html('<textarea>'+ content[row][col].content +'</textarea>');
    //     $(this).find('textarea').focus();
    //     return false;
    // });
    //
    // $('#tbody').on('click', 'tr:first-child > td:last-child', function () {
    //     // var col = $(this).prevAll().length - 2;
    //     // console.log('col adder:', col);
    //     for (var i = 0; i < content.length; i++) {
    //         content[i].push({'content': ''});
    //     }
    //     $('#tbody > tr').append('<td></td>');
    //     return false;
    // });
    //
    // $('#tbody').on('click', 'tr:last-child > td:first-child', function () {
    //     // var row = $($(this).parent()).prevAll().length - 2;
    //     // console.log('row adder:', row);
    //     var new_row = [];
    //     for (var j = 0; j < content[0].length; j++) {
    //         new_row.push({'content': ''});
    //     }
    //     content.push(new_row);
    //     $('#tbody').append('<tr>'+ '<td></td>'.repeat(content[0].length + 3) +'</tr>');
    //     return false;
    // });
    //
    // $('#tbody').on('click', 'tr:first-child > td:nth-child(n+3):not(:last-child)', function () {
    //     var col = $(this).prevAll().length - 2;
    //     console.log('col selector:', col);
    //     return false;
    // });
    //
    // $('#tbody').on('click', 'tr:nth-child(n+3):not(:last-child) > td:first-child', function () {
    //     var row = $($(this).parent()).prevAll().length - 2;
    //     console.log('row selector:', row);
    //     return false;
    // });
    //
    // init_tools(content);
    // render(content);
}
