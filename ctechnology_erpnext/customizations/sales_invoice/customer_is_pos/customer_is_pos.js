customer : function(frm) {
	setTimeout(function(){
		frappe.db.get_value("Customer", {name : frm.doc.customer}, "consoleerp_is_pos", function(val) {
			frm.set_value("is_pos", val);		
		});
	}, 500);
}