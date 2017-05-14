frappe.ui.form.on('Sales Invoice', {
	// add_fetches and query filters
	refresh : function(frm) {
				
		// has_qty set_query
		// if its checked, only items with qty will be returned
		frm.set_query("item_code", "items", function(doc, cdt, cdn) {
			var d = locals[cdt][cdn];			
			if (frm.doc.consoleerp_hasqty == 1) {
				
				if (!d.warehouse){
					show_alert("Warehouse not selected for the row. Not Filtering based on stock");					
					return { };
				}
				
				return { 
					query : "ctechnology_erpnext.customizations.queries.hasqty_item_query",
					filters : {"warehouse" : d.warehouse}
				}
			} else {
				// return no filters
				return { }
			}
		});
			
		// header sales person
		frm.set_query('consoleerp_sales_person', function(doc){
			return {
				filters : {'consoleerp_territory' : frm.doc.consoleerp_territory}
			}
		});
		// detail
		// Sales Team set query
		frm.set_query('sales_person', 'sales_team', function(doc, cdt, cdn) {
			return {
				filters : {'consoleerp_territory' : frm.doc.consoleerp_territory}
			}
		});
				
		// av qty onload from prev document
		// if Sales Invoice is made from Sales Order, av. qty needs to be updated
		if (frm.doc.__islocal && frm.doc.items.length > 0 && frm.doc.items[0].item_code) {			
			frappe.after_ajax(function() {			
				$.each(frm.doc.items, function(i, item) {
					// defined in sales_invoice/item_detail
					item_detail(frm, item.doctype, item.name);
				});
			});
		}
	},
	
	before_save : function(frm)
	{		
		// header salesman
		// takes header salesman and puts into table below
		headerSalesman(frm);
		
		// remarks
		frm.doc.remarks = frm.doc.consoleerp_description;
	},
	
	validate : function(frm) {		
	
		// calculate profit again on save
		calculate_total_profit(frm);	
	},
	
	additional_discount_percentage: function(frm) {
		calculate_total_profit(frm);	
	},
	discount_amount: function(frm) {
		calculate_total_profit(frm);	
	},
	
	// mode of payment per territory
	{% include 'ctechnology_erpnext/customizations/sales_invoice/mode_of_payment_per_territory/mode_of_payment_per_territory.js' %},
	// customer is pos
	{% include 'ctechnology_erpnext/customizations/sales_invoice/customer_is_pos/customer_is_pos.js' %}
	
});


// Child
frappe.ui.form.on('Sales Invoice Item', {
	// when a new row is added
	items_add : function(frm, cdt, cdn) {
		// set header warehouse-> detail
		frappe.model.set_value(cdt, cdn, "warehouse", frm.doc.consoleerp_warehouse);
		
		// profit // from item_detail.js
		calculate_total_profit(frm);
	},
	
	// when item is removed // calc profit
	items_remove : calculate_total_profit,
	rate : calculate_total_profit,
	qty : calculate_total_profit,
	
	// cost + header warehouse
	item_code : function(frm, cdt, cdn) {
		// fetch details about the item for the detail // also does profit calc
		item_detail(frm, cdt,cdn);		
		
		// set header warehouse-> detail
		frappe.model.set_value(cdt, cdn, "warehouse", frm.doc.consoleerp_warehouse);
	},
	
	warehouse : function(frm, cdt, cdn) {
		// fetch details about the item for the detail // also does profit calc
		item_detail(frm, cdt,cdn);		
		
	}
});

// supporting functions
// item_detail
{% include 'ctechnology_erpnext/customizations/sales_invoice/item_detail/item_detail.js' %}
// header salesman
{% include 'ctechnology_erpnext/customizations/sales_invoice/header_salesman/header_salesman.js' %}

// Other App Includes
// territory_setup
{% include 'consoleerp_erpnext_client/customizations/territory_branch/custom_scripts/sales_invoice.js' %}
// advanced_search
{% include 'consoleerp_erpnext_client/customizations/advanced_item_search/item_search.js' %}
// item stock detail
{% include 'consoleerp_erpnext_client/customizations/item_stock_detail/item_stock_detail.js' %}
// item stock validation
{% include 'consoleerp_erpnext_client/customizations/item_stock_validation/item_stock_validation.js' %}