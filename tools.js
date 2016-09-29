function init_tools (content) {
    var toggle_empty_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 7 7, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4, m -46 10, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4, m -46 10, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4" fill="transparent" stroke="lightgray" stroke-linecap="round" stroke-linejoin="round"/>';
    var toggle_empty_tool = {
        id: 'toggle-empty',
        description: 'Show/hide the empty cell indicator',
        select: function (ns, params) {
            ns.show_empty = !ns.show_empty;
        },
        icon_toolbar: toggle_empty_icon,
        icon_mouse: toggle_empty_icon,
    }

    var toggle_bold_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 5 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 43 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M 19 20, l 7 -7, v 4, h 7, v -4, l 7 7, l -7 7, v -4, h -7, v 4, l -7 -7" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    var toggle_bold_tool = {
        id: 'toggle-bold',
        description: 'Toggle bold',
        select: function (ns) {
        },
        work: function (ns, table, targets) {
            console.log('toggle bold');
        },
        icon_toolbar: toggle_bold_icon,
        icon_mouse: toggle_bold_icon,
    };
    return [
        toggle_empty_tool,
        toggle_bold_tool
    ];
}
