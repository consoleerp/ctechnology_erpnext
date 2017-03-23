consoleerp_item_total_qty : function(frm, cdt, cdn) {
	// updated on total qty
	var child_doc = locals[cdt][cdn];
	if (child_doc.consoleerp_item_total_qty > child_doc.qty) // if tot qty > req. qty -- available		
		frappe.model.set_value(cdt, cdn, "consoleerp_item_availability", "Available");
	else if (!child_doc.consoleerp_item_total_qty || child_doc.consoleerp_item_total_qty <= 0) // if qty not avaialbe
		frappe.model.set_value(cdt, cdn, "consoleerp_item_availability", "Not Available");
	else
	{
		// the case where av. qty < req. qty
		frappe.model.set_value(cdt, cdn, "consoleerp_item_availability", child_doc.consoleerp_item_total_qty + " Available. " + (child_doc.qty - child_doc.consoleerp_item_total_qty) + " needed more.");		
	}
}