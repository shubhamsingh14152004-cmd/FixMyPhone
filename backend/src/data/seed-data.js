const BRAND_SEED = [
 {name:'Apple', tier:'premium', series:[
   {name:'iPhone', models:['iPhone 17 Pro Max','iPhone 17 Pro','iPhone 17','iPhone Air','iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16','iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15 Plus','iPhone 15','iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14 Plus','iPhone 14','iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13','iPhone 13 mini','iPhone 12 Pro Max','iPhone 12 Pro','iPhone 12','iPhone 12 mini','iPhone 11 Pro Max','iPhone 11 Pro','iPhone 11','iPhone XS Max','iPhone XS','iPhone XR','iPhone X','iPhone 8 Plus','iPhone 8']}
 ]},
 {name:'Samsung', tier:'premium', series:[
   {name:'Galaxy S Series', models:['Galaxy S25 Ultra','Galaxy S25+','Galaxy S25','Galaxy S24 Ultra','Galaxy S24+','Galaxy S24','Galaxy S23 Ultra','Galaxy S23+','Galaxy S23','Galaxy S22 Ultra','Galaxy S22','Galaxy S21 Ultra','Galaxy S21']},
   {name:'Galaxy Z Fold Series', models:['Galaxy Z Fold6','Galaxy Z Fold5','Galaxy Z Fold4']},
   {name:'Galaxy Z Flip Series', models:['Galaxy Z Flip6','Galaxy Z Flip5','Galaxy Z Flip4']},
   {name:'Galaxy A Series', models:['Galaxy A55','Galaxy A35','Galaxy A25','Galaxy A15','Galaxy A05']},
   {name:'Galaxy M Series', models:['Galaxy M55','Galaxy M35','Galaxy M15']},
   {name:'Galaxy F Series', models:['Galaxy F55','Galaxy F15']}
 ]},
 {name:'OnePlus', tier:'mid', series:[
   {name:'Flagship Series', models:['OnePlus 13','OnePlus 12','OnePlus 11']},
   {name:'Nord Series', models:['OnePlus Nord 4','OnePlus Nord 3']},
   {name:'CE Series', models:['OnePlus Nord CE 4','OnePlus Nord CE 4 Lite']}
 ]},
 {name:'Xiaomi', tier:'mid', series:[
   {name:'Xiaomi Series', models:['Xiaomi 14','Xiaomi 13']},
   {name:'Redmi Series', models:['Redmi 13','Redmi 12']},
   {name:'Redmi Note Series', models:['Redmi Note 13 Pro+','Redmi Note 13 Pro','Redmi Note 13']},
   {name:'POCO Series', models:['POCO X6 Pro','POCO F6','POCO M6']}
 ]},
 {name:'Google', tier:'premium', series:[
   {name:'Pixel Series', models:['Pixel 9 Pro','Pixel 9','Pixel 8 Pro','Pixel 8']},
   {name:'Pixel A Series', models:['Pixel 8a','Pixel 7a']},
   {name:'Pixel Fold Series', models:['Pixel 9 Pro Fold','Pixel Fold']}
 ]},
 {name:'Vivo', tier:'mid', series:[
   {name:'X Series', models:['Vivo X100','Vivo X90']},
   {name:'V Series', models:['Vivo V30','Vivo V29']},
   {name:'Y Series', models:['Vivo Y200','Vivo Y28']},
   {name:'T Series', models:['Vivo T3']},
   {name:'iQOO', models:['iQOO 12','iQOO Neo 9']}
 ]},
 {name:'OPPO', tier:'mid', series:[
   {name:'Find Series', models:['OPPO Find X7']},
   {name:'Reno Series', models:['OPPO Reno 12','OPPO Reno 11']},
   {name:'A Series', models:['OPPO A79','OPPO A59']},
   {name:'F Series', models:['OPPO F25']}
 ]},
 {name:'Realme', tier:'mid', series:[
   {name:'GT Series', models:['Realme GT 6']},
   {name:'Number Series', models:['Realme 12 Pro+','Realme 12']},
   {name:'P Series', models:['Realme P1']},
   {name:'Narzo Series', models:['Realme Narzo 70']},
   {name:'C Series', models:['Realme C67']}
 ]},
 {name:'Motorola', tier:'mid', series:[
   {name:'Razr', models:['Motorola Razr 50 Ultra','Motorola Razr 50']},
   {name:'Edge', models:['Motorola Edge 50 Pro']},
   {name:'Moto G', models:['Moto G84','Moto G54']},
   {name:'Moto E', models:['Moto E14']}
 ]},
 {name:'Nothing', tier:'mid', series:[
   {name:'Phone Series', models:['Nothing Phone 2','Nothing Phone 1']},
   {name:'Phone (a) Series', models:['Nothing Phone 2a']}
 ]},
 {name:'Sony', tier:'mid', series:[{name:'Xperia Series', models:['Xperia 1 VI','Xperia 10 VI']}]},
 {name:'ASUS', tier:'mid', series:[
   {name:'ROG Phone', models:['ROG Phone 8']},
   {name:'Zenfone', models:['Zenfone 11 Ultra']}
 ]},
 {name:'Nokia', tier:'budget', series:[{name:'Smartphones', models:['Nokia G42','Nokia X30','Nokia C32']}]},
 {name:'Honor', tier:'mid', series:[
   {name:'Magic Series', models:['Honor Magic 6 Pro']},
   {name:'Number Series', models:['Honor 90']},
   {name:'X Series', models:['Honor X9b']}
 ]},
 {name:'Huawei', tier:'mid', series:[{name:'Smartphones', models:['Huawei P60','Huawei Nova 12']}]},
 {name:'Infinix', tier:'budget', series:[
   {name:'Note Series', models:['Infinix Note 40 Pro']},
   {name:'GT Series', models:['Infinix GT 20 Pro']},
   {name:'Hot Series', models:['Infinix Hot 40']},
   {name:'Zero Series', models:['Infinix Zero 30']}
 ]},
 {name:'Tecno', tier:'budget', series:[
   {name:'Phantom', models:['Tecno Phantom X2']},
   {name:'Camon', models:['Tecno Camon 30']},
   {name:'Pova', models:['Tecno Pova 6']},
   {name:'Spark', models:['Tecno Spark 20']}
 ]},
 {name:'Lenovo', tier:'budget', series:[{name:'Smartphones', models:['Lenovo Legion Y70']}]},
 {name:'ZTE', tier:'budget', series:[
   {name:'Axon', models:['ZTE Axon 60']},
   {name:'Nubia', models:['Nubia Z60 Ultra']},
   {name:'RedMagic', models:['RedMagic 9 Pro']}
 ]},
 {name:'Lava', tier:'budget', series:[{name:'Smartphones', models:['Lava Blaze 3']}]},
 {name:'Micromax', tier:'budget', series:[{name:'Smartphones', models:['Micromax IN 2c']}]}
];

const SERVICES_SEED = [
 {id:'screen', name:'Screen Replacement', desc:'Cracked, broken or damaged display.', icon:'&#128241;', time:'60–90 Minutes', warrantyDays:90, range:{budget:[1500,3200],mid:[2500,6000],premium:[5500,26000]}},
 {id:'battery', name:'Battery Replacement', desc:'Battery draining quickly, swelling or poor battery health.', icon:'&#128267;', time:'30–45 Minutes', warrantyDays:180, range:{budget:[900,1700],mid:[1500,2700],premium:[2500,6500]}},
 {id:'charging-port', name:'Charging Port Repair', desc:'Phone not charging or loose charging connection.', icon:'&#128268;', time:'30–60 Minutes', warrantyDays:90, range:{budget:[600,1300],mid:[1000,1900],premium:[1800,4000]}},
 {id:'camera', name:'Camera Repair', desc:'Front or rear camera problems.', icon:'&#128248;', time:'45–75 Minutes', warrantyDays:90, range:{budget:[900,2000],mid:[1500,3400],premium:[3000,9000]}},
 {id:'speaker', name:'Speaker Repair', desc:'Low, distorted or non-working speaker.', icon:'&#128266;', time:'30–45 Minutes', warrantyDays:90, range:{budget:[500,1100],mid:[800,1700],premium:[1500,3400]}},
 {id:'microphone', name:'Microphone Repair', desc:'Microphone not working properly.', icon:'&#127908;', time:'30–45 Minutes', warrantyDays:90, range:{budget:[500,1100],mid:[800,1700],premium:[1500,3100]}},
 {id:'water-damage', name:'Water Damage Repair', desc:'Diagnosis and repair for liquid-damaged devices.', icon:'&#128167;', time:'24–48 Hours', warrantyDays:0, range:{budget:[1200,2800],mid:[2000,4300],premium:[3500,8800]}},
 {id:'software', name:'Software Repair', desc:'Software errors, boot loops, update problems and system issues.', icon:'&#128187;', time:'30–60 Minutes', warrantyDays:30, range:{budget:[500,1100],mid:[700,1400],premium:[1000,2400]}},
 {id:'back-glass', name:'Back Glass / Housing Repair', desc:'Damaged rear glass or housing.', icon:'&#129517;', time:'90–120 Minutes', warrantyDays:90, range:{budget:[1200,2400],mid:[1800,3600],premium:[3500,8800]}},
 {id:'faceid', name:'Face ID / Biometric Repair', desc:'Supported biometric and sensor-related repairs.', icon:'&#128274;', time:'60–120 Minutes', warrantyDays:60, range:{budget:[1500,2900],mid:[2200,4300],premium:[4000,12000]}},
 {id:'network', name:'Network / Signal Repair', desc:'Mobile network, Wi-Fi or Bluetooth problems.', icon:'&#128246;', time:'45–90 Minutes', warrantyDays:60, range:{budget:[700,1500],mid:[1000,2100],premium:[1800,4100]}},
 {id:'other', name:'Other Hardware Repair', desc:'Describe your problem — our technicians will diagnose and quote it.', icon:'&#128295;', time:'Varies — after diagnosis', warrantyDays:30, range:{budget:[500,3000],mid:[500,3000],premium:[500,5000]}}
];

const TECH_SEED = [
 {name:'Arjun Mehta', phone:'9820011223', email:'arjun@fixmyphone.com', specialization:'Apple & iOS Devices', experience:'6 years', status:'Active'},
 {name:'Sana Iqbal', phone:'9820011224', email:'sana@fixmyphone.com', specialization:'Samsung & Android Flagships', experience:'5 years', status:'Active'},
 {name:'Rohit Verma', phone:'9820011225', email:'rohit@fixmyphone.com', specialization:'Board-level & Water Damage', experience:'8 years', status:'Active'},
 {name:'Priya Nair', phone:'9820011226', email:'priya@fixmyphone.com', specialization:'Software & Data Recovery', experience:'4 years', status:'Active'},
 {name:'Karan Shah', phone:'9820011227', email:'karan@fixmyphone.com', specialization:'Budget Android Devices', experience:'3 years', status:'On Leave'}
];

module.exports = { BRAND_SEED, SERVICES_SEED, TECH_SEED };
