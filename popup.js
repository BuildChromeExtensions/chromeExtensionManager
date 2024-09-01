// https://developer.chrome.com/docs/extensions/reference/api/management#method-getAll
chrome.management.getAll((extensionDetails) => {
    for (const extension of extensionDetails) {
        const id = extension.id;
        const enabled = extension.enabled
        const description = extension.description
        const version = extension.version;
        const name = extension.name;
        const option = document.createElement('option');
        option.value = id;
        option.title = description;
        if (enabled) {
            option.textContent = `✅ ${name} (${version})`;
        } else {
            option.textContent = `❌ ${name} (${version})`;
        }

        // add option to select in UI
        const select = document.getElementById('extensions');
        select.appendChild(option);
    }
})

// https://developer.chrome.com/docs/extensions/reference/api/notifications#type-NotificationOptions
document.querySelector('form').onsubmit = async function (e) {
    e.preventDefault();

    // Get Form details
    const action = e.target.action.value
    const extensionId = e.target.extensionId.value;
    const extension = await chrome.management.get(extensionId);

    // User confirmation
    const result = confirm(`Do you want to ${action} ${extension.name}?`);

    // Perform Action
    if (result) {
        switch (action) {
            case "enable":
                chrome.management.setEnabled(extensionId, true);
                alert(`Enabled ${extension.name}! Reopen the extension.`)
                break;
            case "disable":
                chrome.management.setEnabled(extensionId, false);
                alert(`Disabled ${extension.name}! Reopen the extension.`)
                break;
            case "uninstall":
                chrome.management.uninstall(extensionId, { showConfirmDialog: true });
                alert(`Uninstalled ${extension.name}! Reopen the extension.`)
                break;
            default:
                break;
        }

    }
}