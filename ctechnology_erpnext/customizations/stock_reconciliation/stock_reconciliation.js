frappe.ui.form.on("Stock Reconciliation", {
	refresh: function(frm, cdt, cdn) {
		
		frappe.after_ajax(function() {
			// set detail warehouse field- readonly
			$.grep(cur_frm.fields_dict["items"].grid.docfields, function(e){
						return e.fieldname === "warehouse";
			})[0].read_only = 1;
		});
	},
	consoleerp_warehouse: function(frm, cdt, cdn) {
		$.each(frm.doc.items, function(i, row) {
			frappe.model.set_value(row.doctype, row.name, 'warehouse', frm.doc.consoleerp_warehouse);
		});
	}
});

frappe.ui.form.on("Stock Reconciliation Item", {
	items_add: function(frm, cdt, cdn) {
		frappe.model.set_value(cdt, cdn, 'warehouse', frm.doc.consoleerp_warehouse);
	}
});