window.printStickerPages = () => {
    
    const mainContainer = document.getElementById('print-only-stickers');
    const bgContainer = document.getElementById('print-only-background-stickers');
    
    if (!mainContainer) {
        alert('Main stickers not found. Please generate stickers first.');
        return;
    }
    
    if (mainContainer.children.length === 0) {
        alert('No stickers to print. Please generate stickers first.');
        return;
    }
    
    const hasBackground = bgContainer && bgContainer.children.length > 0;
    
    if (hasBackground) {
        console.log('Printing 2-page job: Main stickers + Background stickers');
    } else {
        console.log('Printing 1-page job: Main stickers only');
        if (bgContainer) {
            bgContainer.style.display = 'none';
        }
    }
    
    const originalTitle = document.title;
    const pageCount = hasBackground ? '2 pages' : '1 page';
    document.title = `Sticker Sheets (${pageCount}) - ${new Date().toLocaleDateString()}`;
    
    
    window.print();
    
    setTimeout(() => {
        document.title = originalTitle;
        if (bgContainer) {
            bgContainer.style.display = '';
        }
    }, 1000);
};

window.printStickerPage = (pageType = "main") => {
    
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
    
    const originalTitle = document.title;
    const pageTypeName = pageType === "background" ? "Background" : "Main";
    document.title = `Sticker Sheet - ${pageTypeName} - ${new Date().toLocaleDateString()}`;
    
    window.print();
    
    setTimeout(() => {
        document.title = originalTitle;
        if (otherContainer) {
            otherContainer.style.display = '';
        }
    }, 1000);
};

window.debugPrintContainers = () => {
    console.log('=== PRINT CONTAINER DEBUG ===');
    
    const mainContainer = document.getElementById('print-only-stickers');
    const bgContainer = document.getElementById('print-only-background-stickers');
    
    console.log('Main container found:', !!mainContainer);
    if (mainContainer) {
        console.log('Main container children:', mainContainer.children.length);
        if (mainContainer.children.length > 0) {
            const firstSticker = mainContainer.children[0];
            console.log('First sticker style:', firstSticker.getAttribute('style'));
            const img = firstSticker.querySelector('img');
            if (img) {
                console.log('Image src length:', img.src.length);
                console.log('Image complete:', img.complete);
            }
        }
    }
    
    console.log('Background container found:', !!bgContainer);
    if (bgContainer) {
        console.log('Background container children:', bgContainer.children.length);
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
    }
};