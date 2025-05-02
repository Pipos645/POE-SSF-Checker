(async function () {
    // Helper to wait
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // Scroll to bottom to load all items
    let prevHeight = 0;
    let sameCount = 0;
    while (sameCount < 3) {
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(1000);
        const currHeight = document.body.scrollHeight;
        if (currHeight === prevHeight) {
            sameCount++;
        } else {
            sameCount = 0;
            prevHeight = currHeight;
        }
    }

    // Extract data
    const items = Array.from(document.querySelectorAll('div.item'));
    const data = items.map(item => {
        const name = item.querySelector('div.name > span > a')?.textContent.trim() || 'N/A';
        const tier = item.querySelector('div.grouping')?.textContent.trim() || 'N/A';
        return { name, tier };
    });

    console.log(`Extracted ${data.length} items`);

    // Convert to CSV
    const csv = 'Name,Tier\n' + data.map(d => `"${d.name}","${d.tier}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poe_uniques.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})();
