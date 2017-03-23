var item_detail = async function(frm, cdt, cdn) {	
	// cur_frm -- global variable for current_form

	item = frappe.model.get_value(cdt, cdn, "item_code");
	warehouse = frappe.model.get_value(cdt, cdn, "warehouse");
	if (!item || !warehouse) {		
		return;	
	}
	
	frappe.after_ajax(function(){
		frappe.call({
				"method": "consoleerp_erpnext_client.api.item.item_warehouse_info",
				args: {
					item: item,
					warehouse: warehouse
				},
				callback: function(data) {
					if (data.message == null || (data.message.constructor === Array && data.message.length == 0))
					{
						data.message = [{"valuation_rate" : null, "available_qty" : 0}];						
					}					
					frappe.model.set_value(cdt, cdn, "consoleerp_cost", data.message[0].valuation_rate);	
					frappe.model.set_value(cdt, cdn, "consoleerp_actual_qty", data.message[0].available_qty);	
				}
			});
		});
}