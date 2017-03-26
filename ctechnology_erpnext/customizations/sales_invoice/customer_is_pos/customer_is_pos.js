customer : function(frm) {
	frappe.after_ajax(function(){
		frappe.db.get_value("Customer", {name : frm.doc.customer}, "consoleerp_is_pos", function(val) {
			if (val != null)
				frm.set_value("is_pos", val.consoleerp_is_pos);
			});
	});
}