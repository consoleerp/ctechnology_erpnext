frappe.ui.form.on("Purchase Invoice", {
	refresh: function(frm) {
		frappe.after_ajax(function() {
			
			// if any prev doc exists
			prev_doc_exists = (frm.doc.items.length > 0 && (frm.doc.items[0].po_detail || frm.doc.items[0].pr_detail) );
			
			if (!prev_doc_exists) {
				// if prev doc doesnt exist, when the item_code is changed in the detail, set rate = 0 when all ajax queries are done
				frappe.ui.form.on("Purchase Invoice Item", {
					item_code: function(frm, cdt, cdn) {
						frappe.after_ajax(function() {
							frappe.model.set_value(cdt, cdn, "rate", 0);
						});
					}
				});
			}
		});
	}
});