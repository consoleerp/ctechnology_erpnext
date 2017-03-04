/*
		Has Qty (Show items which has balance qty only)
		Territory Mode of Payment
		Cost per Warehouse in Sales Invoice Item
		Custom Warehouse field (Header)
		Custom Av. Qty (Sales Invoice Item)
*/


frappe.ui.form.on("Sales Invoice", {
	refresh : function(frm, cdt, cdn) {
		// console.dir(cur_frm.fields_dict.items.grid.get_field("item_code"));

		frm.set_query("item_code", "items", function(doc, cdt, cdn) {
			var d = locals[cdt][cdn];			
			if (frm.doc.consoleerp_hasqty == 1) {
				
				if (!d.warehouse){
					show_alert("Warehouse not selected for the row. Not Filtering based on stock");					
					return;
				}
				
				return { 
					query : "ctechnology_erpnext.controllers.queries.hasqty_item_query",
					filters : {"warehouse" : d.warehouse}
				}
			} else {
				return { }
			}
		});


		// territory -- user model warehouse query
		frm.set_query("consoleerp_warehouse", function(doc) {
			return {
				filters : { "consoleerp_territory" : doc.consoleerp_territory }
			};
		});
		
		
		
		// av qty onload from prev document
		if (frm.doc.__islocal && frm.doc.items.length > 0 && frm.doc.items[0].item_code) {
			show_alert("LOCAL : " + frm.doc.__islocal);
			show_alert("Item Length  : " + frm.doc.items.length);
			
			frappe.after_ajax(function() {			
				$.each(frm.doc.items, function(i, item) {
					cust_fetch_item_cost_with_warehouse(frm, item.doctype, item.name);
				});
			});
		}
	},
	
	// Mode of payment per territory
	consoleerp_territory : function(frm, cdt, cdn) {
			
		// ref
		var xdoc = frm.doc;
		
		// if territory is null, return
		if (!xdoc.territory || !xdoc.is_pos)
			return;
		
		frappe.after_ajax(function() {
			frappe.call({
				'method' : 'frappe.client.get_value',
				args : {
					doctype: "Mode of Payment",
					filters : {
						"consoleerp_territory" : frm.doc.consoleerp_territory
					},
					fieldname : ["name", "type"],
					as_dict: true
				},
				callback: function(data) {
					if (!data.message)
						return;
												
					// clear payments table in Sales Invoice
					xdoc.payments = [];
					// add new child; payment-- is the doc obj
					var payment = frappe.model.add_child(xdoc, "Sales Invoice Payment", "payments");
					payment.mode_of_payment = data.message.name;
					payment.amount = xdoc.rounded_total;
					// set as Cash type by default
					payment.type = data.message.type;
					
					// defined in /erpnext/public/js/controllers/accounts.js
					get_payment_mode_account(frm, data.message.name, function(account){
						payment.account = account;		
						refresh_field("payments");
					});
				}
			});
		});
	},
	
	validate : function(frm) {
		frm.doc.territory = frm.doc.consoleerp_territory;
	},
	
	// Header Warehouse
	consoleerp_warehouse : function(frm, cdt, cdn) {
		$.each(frm.doc.items, function(i, child_doc){			
			frappe.model.set_value("Sales Invoice Item", child_doc.name, "warehouse", frm.doc.consoleerp_warehouse);
		});
	}
	
});



frappe.ui.form.on('Sales Invoice Item', {
	items_add : function(frm, cdt, cdn) {
		frappe.model.set_value(cdt, cdn, "warehouse", frm.doc.consoleerp_warehouse);
	},
	
	// cost + header warehouse
	item_code : function(frm, cdt, cdn) {
		cust_fetch_item_cost_with_warehouse(frm, cdt,cdn);		
		updateHeaderWarehouse(frm, cdt, cdn);
	},
	warehouse : function(frm, cdt, cdn) {
		cust_fetch_item_cost_with_warehouse(frm, cdt,cdn);		
	}
});


var updateHeaderWarehouse = function(frm, cdt, cdn) {
	frappe.after_ajax(function() {
		frappe.model.set_value(cdt, cdn, "warehouse", frm.doc.consoleerp_warehouse);
	});
}

		
var cust_fetch_item_cost_with_warehouse = async function(frm, cdt, cdn) {
	// null val
	frappe.model.set_value(cdt, cdn, "consoleerp_cost", null);
	// return if not updating stock
	// cur_frm -- global variable for current_form
	if (!cur_frm.doc.update_stock) {
		
		return;
	}

	item = frappe.model.get_value(cdt, cdn, "item_code");
	warehouse = frappe.model.get_value(cdt, cdn, "warehouse");
	if (!item || !warehouse) {		
		return;	
	}
	
	frappe.after_ajax(function(){
		frappe.call({
				"method": "ctechnology_erpnext.api.item_warehouse_valuationrate",
				args: {
					item: item,
					warehouse: warehouse
				},
				callback: function(data) {
					if (data.message == null || (data.message.constructor === Array && data.message.length == 0))
					{
						data.message = [{"valuation_rate" : null, "actual_qty" : 0}];						
					}					
					frappe.model.set_value(cdt, cdn, "consoleerp_cost", data.message[0].valuation_rate);	
					frappe.model.set_value(cdt, cdn, "consoleerp_actual_qty", data.message[0].actual_qty);	
				}
			});
		});
}