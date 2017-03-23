frappe.ui.form.on("Item", "refresh", async function(frm) {
	
	// item.js loads Stock Levels only for non-fixed assets
	// also return if we ar enot viewing an item
	if (frm.doc.is_fixed_asset || frm.doc.__islocal)
		return;
	
	// sleep 1.5sec..  
	await sleep(1500);
	
	frappe.after_ajax(function() {
		// custom method
		frappe.call({
			"method" : "consoleerp_erpnext_client.api.item.item_warehouse_info",
			
			// takes two arguments., item and warehouse=None
			args : {
				item : frm.doc.name
			},
			
			callback : function(data){
				if (!data.message)
					return;
				
				var _currency = frappe.defaults.get_global_default('currency');
				// simplicity?
				var get_cost = function(warehouse){
					
					// var to hold empty/cost
					var cost;
					$.each(data.message, function(i, obj)
					{						
							if (obj.warehouse == warehouse){
								cost = obj.valuation_rate;
								// $.each breaks if returned false
								return false;
							}
					});
					// format currency read from sbkolate.com
					return format_currency(cost, currency= _currency);
				};
				
				// in .form-dashboard-section.custom, child .result --- iterating each children of .result
				$('.form-dashboard-section.custom .result').children().each(function(i, obj)
				{
					// etching warehouse val and modifying items col and graph col
					// warehouse -- 1st col, items col -- 2nd col, graph - 3rd
					// nth-child -- 1-indexed
					var warehouse = $(this).find('.row > div:nth-child(1) > a').attr('data-name');
					$(this).find('.row > div:nth-child(2)').addClass('col-sm-2').removeClass('col-sm-3');
					$(this).find('.row > div:nth-child(3)').addClass('col-sm-3').removeClass('col-sm-4');
	
					$(this).find('.row > div:nth-child(2)').after('<div class="col-sm-2 small" style="margin-top: 8px; white-space: nowrap;"><h6 class="uppercase" style="display: inline;">Cost</h6>&ensp;'+ get_cost(warehouse) +'</div>');
				});
			}
		});
	});
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
