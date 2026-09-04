/* UI-only constants (the actual brand/service/technician data now lives on the backend) */
let SERVICES_SEED = []; // populated from GET /api/services at startup

const STATUS_STAGES = ['Booked','Received','Diagnosed','In Progress','Quality Check','Ready','Completed'];
const STATUS_ICON = {Booked:'&#10003;',Received:'&#10003;',Diagnosed:'&#10003;','In Progress':'&#9679;','Quality Check':'&#9675;',Ready:'&#9675;',Completed:'&#9733;',Cancelled:'&#10005;'};
