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

    tools.forEach(function (tool) {
        Vue.partial(tool.id + '-toolbar', tool.icon_toolbar);
        Vue.partial(tool.id + '-mouse', tool.icon_mouse);
        [].concat.apply([], tool.options).forEach(function (option) {
            Vue.partial(
                tool.id + '-option-' + option.value,
                option.icon
            );
        });
    });

    var new_cell = function (text) {
        return {
            text: text === undefined ? '' : text + '',
            editing: false,
            bold: false,
            color: '#000000',
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
        output: '',
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
                    this.mouse_tool.work(
                        this.ns,
                        this.table.map(function (elem) {
                            return elem[col];
                        })
                    );
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
                    this.mouse_tool.work(
                        this.ns,
                        [].concat.apply([], this.table)
                    );
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
                this.table.forEach(function (cell_row) {
                    cell_row.push(new_cell());
                });
            },
            prepend_col: function () {
                this.table.forEach(function (cell_row) {
                    cell_row.unshift(new_cell());
                });
            },
            del_col: function (col) {
                if (this.table[0].length == 1) {
                    return;
                }
                this.table.forEach(function (cell_row) {
                    cell_row.splice(col, 1);
                });
            },
            append_row: function () {
                var new_row = [];
                this.table[0].forEach(function (cell) {
                    new_row.push(new_cell());
                });
                this.table.push(new_row);
            },
            prepend_row: function () {
                var new_row = [];
                this.table[0].forEach(function (cell) {
                    new_row.push(new_cell());
                });
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
