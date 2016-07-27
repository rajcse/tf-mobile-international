/**
 * Handles 402 response and upsell flow
 * @return {[type]} [description]
 */
class AppStoreAPI {
    constructor() {
        /* THE STORE IS NOT AVAILABLE YET 
        if (!window.store) {
            return console.warn('Store not available');
        }

        // Let's set a pretty high verbosity level, so that we see a lot of stuff
        // in the console (reassuring us that something is happening).
        //store.verbosity = store.INFO;
        window.store.verbosity = window.store.DEBUG;
        window.store.validator = "https://api.fovea.cc:1982/check-purchase";

        // We register a dummy product. It's ok, it shouldn't
        // prevent the store "ready" event from firing.
        window.store.register({
            id:    'unlimited_standard_report_27_78_month_mobile',
            alias: 'standard subscription',
            type:  window.store.PAID_SUBSCRIPTION
        });
        
        // We need to register all the available skus from accounts service
        window.store.register({
            id:    'unlim_std_report_27_78_month',
            alias: 'Person Subscription',
            type:  window.store.PAID_SUBSCRIPTION
        });
        
        window.store.register({
            id:    'unlim_phone_179_1mo',
            alias: 'Phone Subscription',
            type:  window.store.PAID_SUBSCRIPTION
        });
        
        window.store.register({
            id:    'premium_person_report_19_99',
            alias: 'Premium Person Report',
            type:  window.store.CONSUMABLE
        });

        // When there is a product update
        window.store.when('product').updated(function (p) {
            if (p.owned){
                location.reload(true);
            } else if (p.canPurchase) {
                // Not sure why a product update would trigger a purchase?
                console.log('TRYING TO BUY!');
                window.store.order('unlimited_standard_report_27_78_month_mobile');
            }
        });

        window.store.when('unlimited_standard_report_27_78_month_mobile').approved(function(p) {
            console.log('verify subscription!!!!!!!!');
            p.verify();
        });
        window.store.when('unlimited_standard_report_27_78_month_mobile').verified(function(p) {
            console.log('subscription verified!!!!!!!!');
            p.finish();
        });
        window.store.when('unlimited_standard_report_27_78_month_mobile').unverified(function(p) {
            console.log('subscription unverified!!!!!!!!!');
        });
        window.store.when('unlimited_standard_report_27_78_month_mobile').updated(function(p) {
            if (p.owned) {
                console.log('You are a lucky subscriber!');
                location.reload(true);
            }
            else {
                console.log('You are NOT subscribed!');
            }
        });

        // Log all errors
        window.store.error(function(error) {
            log('ERROR ' + error.code + ': ' + error.message);
        });

        // When every goes as expected, it's time to celebrate!
        // The 'ready' event should be welcomed with music and fireworks,
        window.store.ready(function() {
            console.log('\\o/ STORE READY \\o/');
        });

        console.log('refresh');
        // After we've done our setup, we tell the store to do
        // it's first refresh. Nothing will happen if we do not call window.store.refresh()
        window.store.refresh();
        
    }
    
    purchaseSubscription(product) {
        console.log(product);        
        window.store.order(product.sku);
    }
    THE STORE IS NOT AVAILABLE YET */
}

let appStoreAPI = new AppStoreAPI();

export default appStoreAPI;