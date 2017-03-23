
// Quotation Item

// Item Total Qty
frappe.ui.form.on('Quotation Item', {
	
	// item_total_qty
	{% include 'ctechnology_erpnext/customizations/Quotation/item_total_qty/item_total_qty.js' %},
	
	// item availability text
	{% include 'ctechnology_erpnext/customizations/Quotation/item_availability_text/item_availability_text.js' %}
});

// Support Methods
{% include 'ctechnology_erpnext/customizations/quotation/item_availability_text/method.js' %}

// Other App Includes
// territory_setup
{% include 'consoleerp_erpnext_client/customizations/territory_branch/custom_scripts/quotation.js' %}
// advanced_search
{% include 'consoleerp_erpnext_client/customizations/advanced_item_search/item_search.js' %}