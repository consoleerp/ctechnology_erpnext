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
					// cost					
					frappe.model.set_value(cdt, cdn, "consoleerp_cost", data.message[0].valuation_rate);	
					// actual_qty -- available qty
					frappe.model.set_value(cdt, cdn, "consoleerp_actual_qty", data.message[0].available_qty);
					
					// profit					
					calculate_total_profit(frm);
				}
			});
		});
}

// calculates total profit and puts in footer field
function calculate_total_profit(frm){
	
	setTimeout(function(){	
		var profit = 0;
		
		$.each(frm.doc.items, function(i, obj) {
			try {
				var child_profit = (obj.rate - (obj.consoleerp_cost * obj.conversion_factor)) * obj.qty;
				
				if (child_profit != null)
					profit += child_profit;
			} catch(err) {}
		});
		
		// set_value
		frm.set_value("consoleerp_profit", profit);
	}, 1000);
}