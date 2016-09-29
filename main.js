function main () {
    Vue.directive('focus', {
        bind: function () {
            var object = this.el;
            Vue.nextTick(function() {
                object.focus();
            });
        }
    });

    Vue.partial('toggle-bold-icon', '<path d="M 5 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 43 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M 19 20, l 7 -7, v 4, h 7, v -4, l 7 7, l -7 7, v -4, h -7, v 4, l -7 -7" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><rect width="60" height="40" fill="transparent" stroke="black"/>');

    vm = new Vue({
        el: '#app',
        data: {
            table: [
                [{content: 'apple', editing: false}],
                [{content: 'pen', editing: false}],
                [{content: 'pineapple', editing: false}],
            ],
            show_empty: true,
            mouse_tool: 'toggle-bold-icon',
        },
        methods: {
            edit: function (cell) {
                cell.editing = true;
            },
            edit_done: function (cell) {
                cell.editing = false;
            },
            add_col: function () {
                for (var i = 0; i < this.table.length; i++) {
                    this.table[i].push({content: '', editing: false});
                }
            },
            add_row: function () {
                var table_width = this.table[0].length;
                var new_row = [];
                for (var i = 0; i < table_width; i++) {
                    new_row.push({content: '', editing: false});
                }
                this.table.push(new_row);
            },
            toggle_empty: function () {
                this.show_empty = !this.show_empty;
            },
            mousemove: function (evt) {
                var icon = document.getElementById('mouse-icon');
                icon.style.top = (evt.clientY - 25) + 'px';
                icon.style.left = (evt.clientX + 5) + 'px';
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
