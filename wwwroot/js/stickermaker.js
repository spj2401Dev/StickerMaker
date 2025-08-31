window.printStickerPages = () => {
    console.log('Print function called - checking for content...');
    
    const mainContainer = document.getElementById('print-only-stickers');
    const bgContainer = document.getElementById('print-only-background-stickers');
    
    if (!mainContainer || mainContainer.children.length === 0) {
        alert('No main stickers to print. Please generate stickers first.');
        return;
    }
    
    const hasBackground = bgContainer && bgContainer.children.length > 0;
    
    if (hasBackground) {
        console.log('Both containers have content - setting up 2-page print');
        mainContainer.style.pageBreakAfter = 'always';
        try { mainContainer.style.breakAfter = 'page'; } catch {}
        bgContainer.style.pageBreakBefore = 'auto';
        try { bgContainer.style.breakBefore = 'auto'; } catch {}
    } else {
        mainContainer.style.pageBreakAfter = 'auto';
        try { mainContainer.style.breakAfter = 'auto'; } catch {}
    }
   
    const originalTitle = document.title;
    const pageCount = hasBackground ? '2 pages' : '1 page';
    document.title = `Sticker Sheets (${pageCount}) - ${new Date().toLocaleDateString()}`;
    
    console.log(`Printing ${pageCount}...`);
    
    window.print();
    
    setTimeout(() => {
        document.title = originalTitle;
        
        mainContainer.style.pageBreakAfter = '';
        try { mainContainer.style.breakAfter = ''; } catch {}
        if (bgContainer) {
            bgContainer.style.pageBreakBefore = '';
            try { bgContainer.style.breakBefore = ''; } catch {}
        }

    }, 1000);
};

window.printStickerPage = (pageType = "main") => {
    console.log('Single page print function called for:', pageType);
    
    let containerSelector = pageType === "background" ? '#print-only-background-stickers' : '#print-only-stickers';
    const printContainer = document.querySelector(containerSelector);
    
    if (!printContainer || printContainer.children.length === 0) {
        alert('No stickers to print. Please generate stickers first.');
        return;
    }

    const otherContainer = pageType === "background" ? 
        document.getElementById('print-only-stickers') : 
        document.getElementById('print-only-background-stickers');
    
    if (otherContainer) {
        otherContainer.style.display = 'none';
    }

    printContainer.style.pageBreakAfter = 'auto';
    printContainer.style.pageBreakBefore = 'auto';
    try { printContainer.style.breakAfter = 'auto'; } catch {}
    try { printContainer.style.breakBefore = 'auto'; } catch {}
    
    const originalTitle = document.title;
    const pageTypeName = pageType === "background" ? "Background" : "Main";
    document.title = `Sticker Sheet - ${pageTypeName} (1 page) - ${new Date().toLocaleDateString()}`;
    
    window.print();
    
    setTimeout(() => {
        document.title = originalTitle;
        if (otherContainer) {
            otherContainer.style.display = '';
        }
        // Reset page breaks
        printContainer.style.pageBreakAfter = '';
        printContainer.style.pageBreakBefore = '';
        try { printContainer.style.breakAfter = ''; } catch {}
        try { printContainer.style.breakBefore = ''; } catch {}
        console.log('Single page print completed');
    }, 1000);
};

window.debugPrintContainers = () => {
    console.log('=== PRINT CONTAINER DEBUG ===');
    
    const mainContainer = document.getElementById('print-only-stickers');
    const bgContainer = document.getElementById('print-only-background-stickers');
    
    console.log('Main container found:', !!mainContainer);
    if (mainContainer) {
        console.log('Main container children:', mainContainer.children.length);
        console.log('Main container in DOM:', document.contains(mainContainer));
        console.log('Main pageBreakAfter:', getComputedStyle(mainContainer).pageBreakAfter, 'breakAfter:', getComputedStyle(mainContainer).breakAfter);
    }
    
    console.log('Background container found:', !!bgContainer);
    if (bgContainer) {
        console.log('Background container children:', bgContainer.children.length);
        console.log('Background container in DOM:', document.contains(bgContainer));
        console.log('BG pageBreakBefore:', getComputedStyle(bgContainer).pageBreakBefore, 'breakBefore:', getComputedStyle(bgContainer).breakBefore);
    } else {
        console.log('Background container not rendered in DOM (no background image)');
    }
    
    console.log('=== END DEBUG ===');
    
    return {
        mainFound: !!mainContainer,
        mainCount: mainContainer?.children.length || 0,
        bgFound: !!bgContainer,
        bgCount: bgContainer?.children.length || 0
    };
};

window.debugShowPrintContainer = () => {
    const printContainer = document.getElementById('print-only-stickers');
    if (printContainer) {
        printContainer.style.cssText = `
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 10000 !important;
            border: 3px solid red !important;
            background: yellow !important;
            pointer-events: auto !important;
            display: block !important;
            margin: 20px auto !important;
        `;
        
        console.log('Main print container visible with red border');
        
        setTimeout(() => {
            printContainer.style.cssText = `
                position: absolute !important;
                top: -200vh !important;
                left: -200vw !important;
                opacity: 0 !important;
                visibility: hidden !important;
                z-index: -999 !important;
                border: none !important;
                background: white !important;
                pointer-events: none !important;
            `;
        }, 8000);
    }
};

window.debugShowBackgroundContainer = () => {
    const bgContainer = document.getElementById('print-only-background-stickers');
    if (bgContainer) {
        bgContainer.style.cssText = `
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 10000 !important;
            border: 3px solid orange !important;
            background: lightblue !important;
            pointer-events: auto !important;
            display: block !important;
            margin: 20px auto !important;
        `;
        
        console.log('Background container visible with orange border');
        
        setTimeout(() => {
            bgContainer.style.cssText = `
                position: absolute !important;
                top: -400vh !important;
                left: -400vw !important;
                opacity: 0 !important;
                visibility: hidden !important;
                z-index: -999 !important;
                border: none !important;
                background: white !important;
                pointer-events: none !important;
            `;
        }, 8000);
    } else {
        console.log('Background container not found - not rendered in DOM');
    }
};

window.testPrintLayout = () => {
    const result = debugPrintContainers();
    
    console.log('Test Results:');
    console.log('- Will print', result.mainCount > 0 && result.bgCount > 0 ? '2 pages' : '1 page');
    console.log('- Main stickers:', result.mainCount);
    console.log('- Background stickers:', result.bgCount);
    console.log('- Background container in DOM:', result.bgFound);
    
    return result.mainCount > 0;
};
