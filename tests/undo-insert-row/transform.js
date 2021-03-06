const expect = require('expect');

module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');
    
    const initial = value.change({ save: false })
        .moveToRangeOf(cursorBlock)
        .value;

    value = initial.change()
        .call(plugin.changes.insertRow)
        .value;

    value = value.change().undo().value;

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('Col 1, Row 1');

    return value;
};
