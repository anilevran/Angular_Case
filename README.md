/app/environments/config dosyasına apiKey'i ekleyerek kullanabilirsiniz.

Karşılaştığım bazı hatalar:

- İkinci sayfa için verilen endpointte(/storeInfo) image ve minimum tutar bilgisi olmadığı için, ilk sayfada
veriyi api'dan çekerken indexledim. Detay sayfasına giderken bu index bilgisi ve mağaza id'si ile 
navigate oluyor. Mağaza id'si ile /storeInfo endpointinden bilgileri çekip daha sonra ilk endpointte
index bilgisini skip parametresi olarak kullandım ve limiti 1 verdim. Daha sonra bu iki cevabı birleştirip,
onu state'e kaydettim. Bilgiler eksik olduğundan dolayı ve endpointte 
herhangi başka bir filtreleme parametresi olmadığından dolayı, böyle bir çözüm buldum.


Tasarımda bulunan ancak api'da eşleşmeyen veya bu bilgilerle üretemeyeceğim bazı verileri statik olarak bıraktım. Listesi:
1. Sayfa
- Header texti adres: sadece geolocation bilgileri ile adresi üretebilmek için openstreet veya google maps gibi bir api kullanmam gerektiği için, bu kısım statik
- Tahmini varış süresi: bunun hesaplamak için de aynı şekilde yukarıdaki apilardan birini kullanmam gerektiği için aynı şekilde statik
- Orwi Puan: api'da veri yok
- Kupon: api'da veri yok

2. Sayfa
- Bu sayfadaki verileri başta bahsettiğim gibi ilk sayfanın verisi ile birleştirdim. Bu yüzden image ve min sepet tutarı gözüküyor, varış zamanı statik.
- Authentication olmadığı için userla ilgili olan kısımlarda statik(isim,puanım vb.).


Ekstra olarak cihaz'ın lokasyon verisi ve verideki lokasyon bilgileri ile "haversin" formülünü kullanarak uzaklığı dinamik olarak hesapladım.