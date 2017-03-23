item_code : function(frm, cdt, cdn) {
	// child doc ref
	var child_doc = locals[cdt][cdn];
	frappe.call({
		method : "consoleerp_erpnext_client.api.item.item_warehouse_info",
		args : {
			item : child_doc.item_code
		},
		callback : function(r){
			if (!r.message || r.message == "not_stock_item") // reference the python method
			{
				frappe.model.set_value(cdt, cdn, "consoleerp_item_total_qty", null);
				return;
			}
			
			var total = 0;
			$.each(r.message, function(i, obj) {
				total += obj.actual_qty - obj.reserved_qty - obj.reserved_qty_for_production;
			});
			
			// put the value
			frappe.model.set_value(cdt, cdn, "consoleerp_item_total_qty", total);
		}
	});
}