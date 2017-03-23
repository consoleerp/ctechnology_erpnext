
// Quotation Item

// Item Total Qty
frappe.ui.form.on('Quotation Item', {
	{% include 'ctechnology_erpnext/customizations/Quotation/item_total_qty/item_total_qty.js' %},
	{% include 'ctechnology_erpnext/customizations/Quotation/item_availability_text/item_availability_text.js' %}
});