function main () {
    Vue.directive('focus', {
        bind: function () {
            var object = this.el;
            Vue.nextTick(function() {
                object.focus();
            });
        }
    });

    var tools = init_tools();

    for (var i = 0; i < tools.length; i++) {
        Vue.partial(tools[i].id + '-toolbar', tools[i].icon_toolbar);
        Vue.partial(tools[i].id + '-mouse', tools[i].icon_mouse);
    }

    var data = {
        table: [
            [{text: 'apple', editing: false, bold: false}],
            [{text: 'pen', editing: false, bold: false}],
            [{text: 'pineapple', editing: false, bold: false}],
        ],
        show_empty: true,
        mouse_tool: null,
        tools: tools,
        editing_cell: null,
    };
    data.ns = data;

    var new_cell = function () {
        return {text: '', editing: false, bold: false};
    };

    vm = new Vue({
        el: '#app',
        data: data,
        methods: {
            click_cell: function (cell) {
                if (this.mouse_tool == null) {
                    this.edit_cell(cell);
                } else {
                    this.mouse_tool.work(this.ns, this.table, [cell]);
                }
            },
            edit_cell: function (cell) {
                this.edit_reset();
                this.editing_cell = cell;
                this.editing_cell.editing = true;
            },
            edit_reset: function () {
                if (this.editing_cell != null) {
                    this.editing_cell.editing = false;
                }
            },
            mouse_reset: function () {
                this.edit_reset();
                this.mouse_tool = null;
            },
            add_col: function () {
                this.edit_reset();
                for (var i = 0; i < this.table.length; i++) {
                    this.table[i].push(new_cell());
                }
            },
            add_row: function () {
                this.edit_reset();
                var table_width = this.table[0].length;
                var new_row = [];
                for (var i = 0; i < table_width; i++) {
                    new_row.push(new_cell());
                }
                this.table.push(new_row);
            },
            mousemove: function (evt) {
                var icon = document.getElementById('mouse-icon');
                icon.style.top = (evt.clientY - 25) + 'px';
                icon.style.left = (evt.clientX + 5) + 'px';
            },
            select_tool: function (tool) {
                this.edit_reset();
                if (!tool.work || tool == this.mouse_tool) {
                    // the tool cannot be picked up
                    // or the user selects the same tool
                    // -> put it down
                    this.mouse_reset();
                } else {
                    this.mouse_tool = tool;
                }
                tool.select(this.ns);
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
