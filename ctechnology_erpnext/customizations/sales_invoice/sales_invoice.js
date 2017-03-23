frappe.ui.form.on('Sales Invoice', {
	// add_fetches and query filters
	onload : function(frm) {
		frm.add_fetch('customer', 'consoleerp_is_pos', 'is_pos');
	}	
});