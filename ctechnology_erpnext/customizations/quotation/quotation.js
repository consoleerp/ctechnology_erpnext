
// Quotation Item

// Item Total Qty
frappe.ui.form.on('Quotation Item', {
	
	// item_total_qty
	{% include 'ctechnology_erpnext/customizations/Quotation/item_total_qty/item_total_qty.js' %},
	
	// item availability text
	{% include 'ctechnology_erpnext/customizations/Quotation/item_availability_text/item_availability_text.js' %}
});