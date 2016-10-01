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
            [{text: 'pen', editing: false, bold: false}, {text: '', editing: false, bold: false}],
            [{text: '', editing: false, bold: false}, {text: 'apple', editing: false, bold: false}],
            [{text: 'pen', editing: false, bold: false}, {text: '', editing: false, bold: false}],
            [{text: '', editing: false, bold: false}, {text: 'pineapple', editing: false, bold: false}],
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
            click_col: function (col) {
                if (this.mouse_tool == null) {
                    this.edit_reset();
                    this.del_col(col);
                } else {
                    var target_cells = [];
                    for (var i = 0; i < this.table.length; i++) {
                        target_cells.push(this.table[i][col]);
                    }
                    this.mouse_tool.work(this.ns, this.table, target_cells);
                }
            },
            click_row: function (row) {
                if (this.mouse_tool == null) {
                    this.edit_reset();
                    this.del_row(row);
                } else {
                    this.mouse_tool.work(this.ns, this.table, this.table[row]);
                }
            },
            click_all: function () {
                if (this.mouse_tool == null) {
                    this.mouse_reset();
                } else {
                    var target_cells = [];
                    for (var i = 0; i < this.table.length; i++) {
                        target_cells = target_cells.concat(this.table[i]);
                    }
                    this.mouse_tool.work(this.ns, this.table, target_cells);
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
                for (var i = 0; i < this.table.length; i++) {
                    this.table[i].push(new_cell());
                }
            },
            del_col: function (col) {
                if (this.table[0].length == 1) {
                    return;
                }
                for (var i = 0; i < this.table.length; i++) {
                    this.table[i].splice(col, 1);
                }
            },
            add_row: function () {
                var table_width = this.table[0].length;
                var new_row = [];
                for (var i = 0; i < table_width; i++) {
                    new_row.push(new_cell());
                }
                this.table.push(new_row);
            },
            del_row: function (row) {
                if (this.table.length == 1) {
                    return;
                }
                this.table.splice(row, 1);
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
}
