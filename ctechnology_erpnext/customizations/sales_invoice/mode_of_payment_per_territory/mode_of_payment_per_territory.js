// Mode of payment per territory
consoleerp_territory : function(frm, cdt, cdn) {
	// ref
	var xdoc = frm.doc;
	
	// if territory is null, return
	if (!xdoc.consoleerp_territory || !xdoc.is_pos)
		return;
	
	frappe.after_ajax(function() {
		frappe.call({
			'method' : 'frappe.client.get_value',
			args : {
				doctype: "Mode of Payment",
				filters : {
					"consoleerp_territory" : xdoc.consoleerp_territory
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
}