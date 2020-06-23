
const siteurl = 'http://wptest.me'

/* Configurazione passata da backend */
/*
$config = [
	'API_CATEGORIES_URL' => $api_url . 'categories/',
	'API_PRODUCTS_URL' => $api_url . 'products/',
	'API_PRODUCT_URL' => $api_url . 'product/',
	'API_REVIEWS_URL' => $api_url . 'reviews/',
	'API_VARIATIONS_URL' => $api_url . 'product-variations/',
	'API_CHECKOUT_URL' => $api_url . 'proceed-checkout/',
	'CURRENCY' => get_woocommerce_currency_symbol(),
	'SHOP_NAME' => $site_name,
];
*/

let apiurl = siteurl + '/wp-json/pwacommerce/'
var GLOBAL = {
	OFFINE: false,
	API_PRODUCTS_URL: apiurl + 'products',
	API_PRODUCT_URL: apiurl + 'product',
	API_CATEGORIES_URL: apiurl + 'categories'
}
export default GLOBAL