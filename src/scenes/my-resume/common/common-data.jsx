const resumePartDefaults = [
    {
        type: 1,
        name: 'About Me',
    },
    {
        type: 2,
        name: 'Skills',
    },
    {
        type: 3,
        name: 'Experiences'
    },
    {
        type: 4,
        name: 'Education'
    }
]

const selectColorCoverImage = [
    {
        value: 'rgb(255, 0, 0)',
        label: 'Red'
    },
    {
        value: 'rgb(26, 188, 156)',
        label: 'Gray'
    }
]

const selectCoverImage = [
    {
        value: 'binary.jpg',
        label: 'Binary'
    },
    {
        value: 'routine.jpg',
        label: 'Routine'
    },
]

const selectTextInput = [
    {
        value: 1,
        label: 'Field Input'
    },
    {
        value: 2,
        label: 'Quill Text Editor'
    },
]

const selectLayout = [
    {
        value: 1,
        label: '1/4 line'
    },
    {
        value: 2,
        label: '1/2 line'
    },
    {
        value: 3,
        label: '3/4 line'
    },
    {
        value: 4,
        label: '1 line'
    },

]

const layoutSettingDefault = { textContent: '', fontWeight: 100, fontSize: 16, layout: 4, typeTextInput: 1 }

const textBoxDefault = {
    textItemList: [layoutSettingDefault],
    layoutSize: 2
}

const contentItemDefault = {
    contentItemList : [textBoxDefault],
}

const constant = {
    action: {
        delete: 'delete',
        undo: 'undo'
    }
}

export { resumePartDefaults, selectColorCoverImage, selectCoverImage, selectLayout, layoutSettingDefault, textBoxDefault, contentItemDefault, constant, selectTextInput }