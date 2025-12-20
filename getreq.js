(async function() {
    // المفتاح الخاص بك (Master Key)
    const MASTER_KEY = '$2a$10$p4hYOLvv1Tke6XbifI094.J3xYXyYwTO3HGlGtusf7aL5Mb/N5rEq';
    
    console.log('🔍 جاري تجميع بيانات localStorage...');
    
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
    }

    if (Object.keys(allData).length === 0) {
        console.log('⚠️ لا توجد بيانات لرفعها.');
        return;
    }

    // تجهيز كائن البيانات والبيانات الوصفية
    const payload = {
        data: allData,
        metadata: {
            extractedAt: new Date().toISOString(),
            url: window.location.href,
            totalItems: localStorage.length
        }
    };

    console.log('🚀 جاري الرفع إلى JSONBin...');

    try {
        const response = await fetch('https://api.jsonbin.io/v3/b', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY,
                'X-Bin-Private': 'true' // ليكون الصندوق خاصاً بك فقط
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('🎉 تم الرفع بنجاح!');
            console.log('🔗 معرف الصندوق (Bin ID):', result.metadata.id);
            console.log('📋 يمكنك العثور عليه في حسابك تحت اسم "bins".');
        } else {
            console.error('❌ فشل الرفع:', result.message || response.statusText);
        }
    } catch (error) {
        console.error('❌ خطأ في الاتصال:', error);
    }
})();
