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
        if (tools[i].options) {
            for (var j = 0; j < tools[i].options.length; j++) {
                for (var k = 0; k < tools[i].options[j].length; k++) {
                    Vue.partial(
                        tools[i].id + '-option-' + tools[i].options[j][k].value,
                        tools[i].options[j][k].icon
                    );
                }
            }
        }
    }

    var new_cell = function () {
        return {
            text: '',
            editing: false,
            bold: false,
            color: '',
            background: '#FFFFFF',
            hover: false,
        };
    };

    var data = {
        table: [
            [new_cell(), new_cell(), new_cell()],
            [new_cell(), new_cell(), new_cell()],
            [new_cell(), new_cell(), new_cell()],
        ],
        show_empty: true,
        mouse_tool: null,
        tools: tools,
        editing_cell: null,
        tool_values: {},
    };
    data.ns = data;

    vm = new Vue({
        el: '#app',
        data: data,
        methods: {
            click_cell: function (cell) {
                if (this.mouse_tool === null) {
                    this.edit_cell(cell);
                } else {
                    this.mouse_tool.work(this.ns, [cell]);
                }
            },
            click_col: function (col) {
                if (this.mouse_tool === null) {
                    this.edit_reset();
                    this.del_col(col);
                } else {
                    var target_cells = [];
                    for (var i = 0; i < this.table.length; i++) {
                        target_cells.push(this.table[i][col]);
                    }
                    this.mouse_tool.work(this.ns, target_cells);
                }
            },
            click_row: function (row) {
                if (this.mouse_tool === null) {
                    this.edit_reset();
                    this.del_row(row);
                } else {
                    this.mouse_tool.work(this.ns, this.table[row]);
                }
            },
            click_all: function () {
                if (this.mouse_tool === null) {
                    this.mouse_reset();
                } else {
                    var target_cells = [];
                    for (var i = 0; i < this.table.length; i++) {
                        target_cells = target_cells.concat(this.table[i]);
                    }
                    this.mouse_tool.work(this.ns, target_cells);
                }
            },
            hover_col: function (col, hover) {
                if (this.mouse_tool === null) {
                    return;
                }
                this.table.forEach(function (cell_row) {
                    cell_row[col].hover = hover;
                });
            },
            hover_row: function (row, hover) {
                if (this.mouse_tool === null) {
                    return;
                }
                this.table[row].forEach(function (cell) {
                    cell.hover = hover;
                });
            },
            hover_all: function (hover) {
                if (this.mouse_tool === null) {
                    return;
                }
                this.table.forEach(function (cell_row) {
                    cell_row.forEach(function (cell) {
                        cell.hover = hover;
                    });
                });
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
            append_col: function () {
                for (var i = 0; i < this.table.length; i++) {
                    this.table[i].push(new_cell());
                }
            },
            prepend_col: function () {
                for (var i = 0; i < this.table.length; i++) {
                    this.table[i].unshift(new_cell());
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
            append_row: function () {
                var table_width = this.table[0].length;
                var new_row = [];
                for (var i = 0; i < table_width; i++) {
                    new_row.push(new_cell());
                }
                this.table.push(new_row);
            },
            prepend_row: function () {
                var table_width = this.table[0].length;
                var new_row = [];
                for (var i = 0; i < table_width; i++) {
                    new_row.push(new_cell());
                }
                this.table.unshift(new_row);
            },
            del_row: function (row) {
                if (this.table.length == 1) {
                    return;
                }
                this.table.splice(row, 1);
            },
            mousemove: function (evt) {
                var icon = document.getElementById('mouse-icon');
                icon.style.top = (evt.clientY - 30) + 'px';
                icon.style.left = (evt.clientX + 10) + 'px';
            },
            select_tool: function (tool, value) {
                this.edit_reset();
                if (!tool.work) {
                    // the tool cannot be picked up
                    // -> put it down
                    this.mouse_reset();
                } else if (tool === this.mouse_tool &&
                          (value === undefined || value === this.mouse_tool.value)) {
                    // the user selects the same tool (with same value if it has)
                    // -> put it down
                    this.mouse_reset();
                } else {
                    // pick it up
                    this.mouse_tool = tool;
                }

                if (tool.select) {
                    var r = tool.select(this.ns, value);
                    if (r) {
                        for (var key in r) {
                            Vue.set(vm.tool_values, key, r[key]);
                        }
                    }
                }
            },
        },
    });
}
