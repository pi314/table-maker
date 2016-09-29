function init_tools (content) {
    var toggle_empty_icon = '<defs><linearGradient id="gradient1"><stop offset="0%" stop-color="white" stop-opacity="0"/><stop offset="100%" stop-color="white"/></linearGradient></defs><text text-anchor="start" x="5" y="25" fill="black" font-size="20">(empty)</text><rect width="60" height="40" fill="url(#gradient1)" stroke="black"/>';
    var toggle_empty_tool = {
        id: 'toggle-empty',
        description: 'Show/hide the (empty) indicator',
        select: function (ns, params) {
            ns.show_empty = !ns.show_empty;
        },
        icon_toolbar: toggle_empty_icon,
        icon_mouse: toggle_empty_icon,
    }

    var toggle_bold_icon = '<path d="M 5 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 43 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M 19 20, l 7 -7, v 4, h 7, v -4, l 7 7, l -7 7, v -4, h -7, v 4, l -7 -7" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><rect width="60" height="40" fill="transparent" stroke="black"/>';
    var toggle_bold_tool = {
        id: 'toggle-bold',
        description: 'Toggle bold',
        stateless: false,
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
